package payment

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

// Package 充值套餐（固定档语义）：
// 用户点选套餐按钮 → 按 Amount 支付 → 到账 Amount + BonusAmount；
// 自定义金额输入不关联套餐、无赠送。
//
// 下单时把 bonus_amount 快照进订单，支付完成前套餐被改/删不影响已创建订单。
type Package struct {
	ID          int64     `json:"id"`
	Amount      float64   `json:"amount"`
	BonusAmount float64   `json:"bonus_amount"`
	Title       string    `json:"title"`
	Enabled     bool      `json:"enabled"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

const packageColumns = `id, amount, bonus_amount, title, enabled, sort_order, created_at, updated_at`

// ListActivePackages 用户端拉取：仅启用套餐，按 sort_order、金额排序
func (s *Service) ListActivePackages(ctx context.Context) ([]*Package, error) {
	return s.queryPackages(ctx, `
		SELECT `+packageColumns+` FROM payment_packages
		WHERE enabled = TRUE
		ORDER BY sort_order ASC, amount ASC
	`)
}

// ListAllPackages 管理端拉取：全量（含停用）
func (s *Service) ListAllPackages(ctx context.Context) ([]*Package, error) {
	return s.queryPackages(ctx, `
		SELECT `+packageColumns+` FROM payment_packages
		ORDER BY sort_order ASC, amount ASC
	`)
}

func (s *Service) queryPackages(ctx context.Context, query string) ([]*Package, error) {
	rows, err := s.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("查询套餐失败: %w", err)
	}
	defer func() { _ = rows.Close() }()

	out := make([]*Package, 0, 8)
	for rows.Next() {
		var p Package
		if err := rows.Scan(&p.ID, &p.Amount, &p.BonusAmount, &p.Title, &p.Enabled, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, &p)
	}
	return out, rows.Err()
}

// getActivePackage 下单路径使用：按 id 取启用中的套餐，不存在/已停用返回错误
func (s *Service) getActivePackage(ctx context.Context, id int64) (*Package, error) {
	var p Package
	err := s.db.QueryRowContext(ctx, `
		SELECT `+packageColumns+` FROM payment_packages
		WHERE id = $1 AND enabled = TRUE
	`, id).Scan(&p.ID, &p.Amount, &p.BonusAmount, &p.Title, &p.Enabled, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errors.New("套餐不存在或已下架，请刷新页面重试")
	}
	if err != nil {
		return nil, fmt.Errorf("查询套餐失败: %w", err)
	}
	return &p, nil
}

// UpsertPackageInput 管理端新增/编辑套餐入参。ID=0 表示新增。
type UpsertPackageInput struct {
	ID          int64   `json:"id"`
	Amount      float64 `json:"amount"`
	BonusAmount float64 `json:"bonus_amount"`
	Title       string  `json:"title"`
	Enabled     bool    `json:"enabled"`
	SortOrder   int     `json:"sort_order"`
}

// UpsertPackage 新增或更新套餐（管理端）
func (s *Service) UpsertPackage(ctx context.Context, in UpsertPackageInput) (*Package, error) {
	if in.Amount <= 0 {
		return nil, errors.New("套餐金额必须大于 0")
	}
	if in.BonusAmount < 0 {
		return nil, errors.New("赠送额度不能为负数")
	}
	if in.Amount < s.minAmount || in.Amount > s.maxAmount {
		return nil, fmt.Errorf("套餐金额需在单笔限额 %.2f ~ %.2f 之间", s.minAmount, s.maxAmount)
	}
	if len(in.Title) > 64 {
		return nil, errors.New("套餐标题过长（最多 64 字符）")
	}

	var p Package
	var err error
	if in.ID > 0 {
		err = s.db.QueryRowContext(ctx, `
			UPDATE payment_packages
			SET amount = $1, bonus_amount = $2, title = $3, enabled = $4, sort_order = $5, updated_at = NOW()
			WHERE id = $6
			RETURNING `+packageColumns+`
		`, in.Amount, in.BonusAmount, in.Title, in.Enabled, in.SortOrder, in.ID,
		).Scan(&p.ID, &p.Amount, &p.BonusAmount, &p.Title, &p.Enabled, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("套餐不存在")
		}
	} else {
		err = s.db.QueryRowContext(ctx, `
			INSERT INTO payment_packages (amount, bonus_amount, title, enabled, sort_order)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING `+packageColumns+`
		`, in.Amount, in.BonusAmount, in.Title, in.Enabled, in.SortOrder,
		).Scan(&p.ID, &p.Amount, &p.BonusAmount, &p.Title, &p.Enabled, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
	}
	if err != nil {
		return nil, fmt.Errorf("保存套餐失败: %w", err)
	}

	s.logger.Info("payment_package_upserted",
		"package_id", p.ID,
		"amount", p.Amount,
		"bonus_amount", p.BonusAmount,
		"enabled", p.Enabled,
	)
	return &p, nil
}

// DeletePackage 删除套餐（管理端）。历史订单已快照 bonus_amount，删除不影响在途订单。
func (s *Service) DeletePackage(ctx context.Context, id int64) error {
	res, err := s.db.ExecContext(ctx, `DELETE FROM payment_packages WHERE id = $1`, id)
	if err != nil {
		return fmt.Errorf("删除套餐失败: %w", err)
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return errors.New("套餐不存在")
	}
	s.logger.Info("payment_package_deleted", "package_id", id)
	return nil
}
