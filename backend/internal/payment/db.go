package payment

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

// schemaSQL 包含支付插件自有表的建表语句。
//
// 我们刻意不使用 ent 之类的代码生成框架——核心原因：
//  1. 表结构稳定，手写 DDL 没有维护负担
//  2. 避免引入 ent 代码生成步骤，让构建链路更短
//  3. 余额相关查询直接走 raw SQL 与 core 表交互，不需要再生一份 ent client
//
// 表名前缀 payment_ 防止与 core 表冲突；金额统一 decimal(20,8) 与 core users.balance 对齐。
//
// 历史字段保留说明：
//   - channel 列（旧）：原本表示渠道类型，新代码不再写入但保留以兼容老订单查询；
//     新订单的 channel 列存的是 provider_id（与 provider_id 列冗余，便于过渡）
//   - method 列（新）：用户面向的支付方式（alipay/wxpay/qqpay 等）
//   - provider_id 列（新）：实际承载这笔订单的 Provider 实例 ID
//
// 升级时使用 ALTER TABLE IF NOT EXISTS 风格的 DO 块，第一次部署直接 CREATE，
// 已有部署可以多次执行无害。
//
//nolint:unused // 保留作为 payment_orders 表结构文档，与外部 migrate 工具对照
const schemaSQL = `
CREATE TABLE IF NOT EXISTS payment_orders (
    id              BIGSERIAL PRIMARY KEY,
    out_trade_no    VARCHAR(64) NOT NULL UNIQUE,
    user_id         BIGINT NOT NULL,
    channel         VARCHAR(32) NOT NULL DEFAULT '',
    method          VARCHAR(32) NOT NULL DEFAULT '',
    provider_id     VARCHAR(64) NOT NULL DEFAULT '',
    amount          DECIMAL(20,8) NOT NULL,
    status          VARCHAR(16) NOT NULL DEFAULT 'pending',
    subject         VARCHAR(255) NOT NULL DEFAULT '',
    client_ip       VARCHAR(64)  NOT NULL DEFAULT '',
    payment_url     TEXT NOT NULL DEFAULT '',
    qr_code_url     TEXT NOT NULL DEFAULT '',
    notify_payload  JSONB,
    extra           JSONB,
    paid_at         TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id     ON payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status      ON payment_orders(status);
CREATE INDEX IF NOT EXISTS idx_payment_orders_created_at  ON payment_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_payment_orders_method      ON payment_orders(method);
CREATE INDEX IF NOT EXISTS idx_payment_orders_provider    ON payment_orders(provider_id);

-- 老表升级：补 method/provider_id 列（已存在则跳过）
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payment_orders' AND column_name='method') THEN
        ALTER TABLE payment_orders ADD COLUMN method VARCHAR(32) NOT NULL DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payment_orders' AND column_name='provider_id') THEN
        ALTER TABLE payment_orders ADD COLUMN provider_id VARCHAR(64) NOT NULL DEFAULT '';
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS payment_refunds (
    id          BIGSERIAL PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES payment_orders(id),
    refund_no   VARCHAR(64) NOT NULL UNIQUE,
    amount      DECIMAL(20,8) NOT NULL,
    status      VARCHAR(16) NOT NULL DEFAULT 'pending',
    reason      TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payment_refunds_order_id ON payment_refunds(order_id);

CREATE TABLE IF NOT EXISTS payment_provider_configs (
    id          VARCHAR(64) PRIMARY KEY,
    kind        VARCHAR(64) NOT NULL,
    enabled     BOOLEAN     NOT NULL DEFAULT FALSE,
    config      JSONB       NOT NULL DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`

// openDB 打开 core 数据库连接，复用 lib/pq 驱动。
//
// 插件与 core 共用同一个 PostgreSQL 实例：core 表 (users / balance_logs) 与
// 插件自有表 (payment_orders / payment_refunds) 都在这个连接里读写。直接共用
// 数据库可以让"加余额 + 落账 + 改订单状态"在同一个事务里完成，保证原子性。
func openDB(dsn string) (*sql.DB, error) {
	if dsn == "" {
		return nil, errors.New("db_dsn 未配置")
	}
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("打开数据库失败: %w", err)
	}
	db.SetMaxOpenConns(20)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(30 * time.Minute)

	pingCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := db.PingContext(pingCtx); err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("数据库连通性检测失败: %w", err)
	}
	return db, nil
}

// migrate 创建插件自有表（订单 / 退款 / Provider 配置）。
//
// 不能用一次 db.Exec(schemaSQL) 执行整段 SQL：lib/pq 的 simple query 协议在
// 含混合 DDL + PL/pgSQL DO 块时会静默中断（前一段成功后续不执行），导致 v0.1.0
// 升级到 v0.2.0 时新表 payment_provider_configs 总是建不出来。
//
// 这里把每个 statement 单独 Exec，每段失败都明确记录，便于排查。
func migrate(db *sql.DB) error {
	statements := []struct {
		name string
		sql  string
	}{
		{"create payment_orders", `
CREATE TABLE IF NOT EXISTS payment_orders (
    id              BIGSERIAL PRIMARY KEY,
    out_trade_no    VARCHAR(64) NOT NULL UNIQUE,
    user_id         BIGINT NOT NULL,
    channel         VARCHAR(32) NOT NULL DEFAULT '',
    method          VARCHAR(32) NOT NULL DEFAULT '',
    provider_id     VARCHAR(64) NOT NULL DEFAULT '',
    amount          DECIMAL(20,8) NOT NULL,
    status          VARCHAR(16) NOT NULL DEFAULT 'pending',
    subject         VARCHAR(255) NOT NULL DEFAULT '',
    client_ip       VARCHAR(64)  NOT NULL DEFAULT '',
    payment_url     TEXT NOT NULL DEFAULT '',
    qr_code_url     TEXT NOT NULL DEFAULT '',
    notify_payload  JSONB,
    extra           JSONB,
    paid_at         TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`},
		// 老表升级：补 method/provider_id 列（已存在则跳过）
		{"alter payment_orders add method", `ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS method VARCHAR(32) NOT NULL DEFAULT ''`},
		{"alter payment_orders add provider_id", `ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS provider_id VARCHAR(64) NOT NULL DEFAULT ''`},

		{"index payment_orders user_id", `CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON payment_orders(user_id)`},
		{"index payment_orders status", `CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON payment_orders(status)`},
		{"index payment_orders created_at", `CREATE INDEX IF NOT EXISTS idx_payment_orders_created_at ON payment_orders(created_at)`},
		{"index payment_orders method", `CREATE INDEX IF NOT EXISTS idx_payment_orders_method ON payment_orders(method)`},
		{"index payment_orders provider", `CREATE INDEX IF NOT EXISTS idx_payment_orders_provider ON payment_orders(provider_id)`},

		{"create payment_refunds", `
CREATE TABLE IF NOT EXISTS payment_refunds (
    id          BIGSERIAL PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES payment_orders(id),
    refund_no   VARCHAR(64) NOT NULL UNIQUE,
    amount      DECIMAL(20,8) NOT NULL,
    status      VARCHAR(16) NOT NULL DEFAULT 'pending',
    reason      TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`},
		{"index payment_refunds order_id", `CREATE INDEX IF NOT EXISTS idx_payment_refunds_order_id ON payment_refunds(order_id)`},

		{"create payment_provider_configs", `
CREATE TABLE IF NOT EXISTS payment_provider_configs (
    id          VARCHAR(64) PRIMARY KEY,
    kind        VARCHAR(64) NOT NULL,
    enabled     BOOLEAN     NOT NULL DEFAULT FALSE,
    config      JSONB       NOT NULL DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`},
	}

	for _, s := range statements {
		if _, err := db.Exec(s.sql); err != nil {
			return fmt.Errorf("migrate step %q failed: %w", s.name, err)
		}
	}
	return nil
}
