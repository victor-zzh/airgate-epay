import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { cssVar } from '@airgate/theme';
import { api, type Order, type MethodInfo } from './api';

/**
 * RechargePage 充值页面（用户级独立页面）
 *
 * 流程：
 *   1. 加载时拉取可用支付方式（PayMethod，对用户友好的"支付宝/微信/QQ"按钮）
 *   2. 用户选择金额（预设按钮 / 自定义输入） + 选择支付方式 → 「立即支付」
 *   3. 后端 service 通过 Router 自动选一个能服务此 method 的 Provider 实例
 *   4. 创建订单成功 → 渲染收款二维码并轮询订单状态
 *   5. 状态变 paid → 切换到成功页面，提示「余额已到账」
 *   6. 用户可点「再次充值」回到第 1 步
 */
export default function RechargePage() {
  const [methods, setMethods] = useState<MethodInfo[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsErr, setMethodsErr] = useState<string | null>(null);

  const [amount, setAmount] = useState<number>(30);
  const [method, setMethod] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [order, setOrder] = useState<Order | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);

  // 1) 拉可用支付方式
  useEffect(() => {
    api.methods()
      .then((res) => {
        setMethods(res.methods || []);
        if (res.methods?.length) setMethod(res.methods[0].key);
      })
      .catch((e) => setMethodsErr(String(e?.message || e)))
      .finally(() => setMethodsLoading(false));
  }, []);

  // 2) 订单状态轮询
  useEffect(() => {
    if (!order || order.status !== 'pending') {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }
    const tick = async () => {
      try {
        const next = await api.getOrder(order.out_trade_no);
        setOrder(next);
      } catch {
        /* 静默失败，下次重试 */
      }
    };
    pollRef.current = window.setInterval(tick, 3000);
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [order?.out_trade_no, order?.status]);

  // 3) 订单创建后把付款链接渲染成二维码（dataURL，可直接 <img src=...>）
  // 优先使用渠道返回的 qr_code_content（虎皮椒/微信原生二维码 schema），没有则用 payment_url
  useEffect(() => {
    if (!order) {
      setQrDataUrl(null);
      return;
    }
    const target = order.qr_code_content || order.payment_url;
    if (!target) {
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(target, { width: 240, margin: 2, errorCorrectionLevel: 'M' })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [order?.payment_url, order?.qr_code_content]);

  const handleSubmit = async () => {
    setError(null);
    if (!method) {
      setError('请选择支付方式');
      return;
    }
    if (!amount || amount <= 0) {
      setError('请输入有效金额');
      return;
    }
    setSubmitting(true);
    try {
      const o = await api.createOrder({ amount, method, subject: 'AirGate 余额充值' });
      setOrder(o);
      // 不再 window.open 跳转新窗口；二维码会由上面的 useEffect 自动渲染到当前页
    } catch (e) {
      setError(String((e as Error).message || e));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setError(null);
  };

  // ========== 渲染 ==========

  if (methodsLoading) {
    return <div style={containerStyle}><div style={hintStyle}>加载中...</div></div>;
  }
  if (methodsErr) {
    return <div style={containerStyle}><div style={{ ...hintStyle, color: cssVar('danger') }}>加载支付方式失败: {methodsErr}</div></div>;
  }
  if (methods.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={panelStyle}>
          <p style={{ color: cssVar('textSecondary'), margin: 0, textAlign: 'center' }}>
            充值功能暂未开放，请联系管理员。
          </p>
        </div>
      </div>
    );
  }

  // 已创建订单：付款引导态
  if (order) {
    if (order.status === 'paid') {
      return (
        <div style={containerStyle}>
          <h2 style={titleStyle}>充值成功</h2>
          <div style={panelStyle}>
            <p style={{ margin: 0, color: cssVar('text') }}>
              订单 <code style={inlineCodeStyle}>{order.out_trade_no}</code> 已支付，金额{' '}
              <strong style={{ color: cssVar('success') }}>¥{order.amount.toFixed(2)}</strong> 已入账。
            </p>
            <button style={{ ...primaryBtnStyle, marginTop: 20 }} onClick={handleReset}>再次充值</button>
          </div>
        </div>
      );
    }
    if (order.status === 'pending') {
      return (
        <div style={containerStyle}>
          <h2 style={titleStyle}>扫码付款</h2>
          <div style={qrPanelStyle}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="付款二维码" style={qrImageStyle} />
            ) : (
              <div style={{ ...qrImageStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVar('textTertiary') }}>
                生成二维码中...
              </div>
            )}
            <div style={qrAmountStyle}>¥ {order.amount.toFixed(2)}</div>
            <div style={{ color: cssVar('textSecondary'), fontSize: 13 }}>
              请使用 {methodLabel(order.method)} 扫码完成付款
            </div>
            <div style={{ marginTop: 8, color: cssVar('textTertiary'), fontSize: 12 }}>
              订单号：<code style={inlineCodeStyle}>{order.out_trade_no}</code>
            </div>
            <p style={{ textAlign: 'center', color: cssVar('textTertiary'), fontSize: 13, marginTop: 20, marginBottom: 0 }}>
              支付完成后本页将自动跳转到结果页（每 3 秒检查一次）
            </p>
            {order.payment_url && (
              <p style={{ textAlign: 'center', fontSize: 12, marginTop: 8, marginBottom: 0 }}>
                扫码不便？{' '}
                <a href={order.payment_url} target="_blank" rel="noreferrer" style={{ color: cssVar('primary'), textDecoration: 'none' }}>
                  点此在新窗口打开付款页 →
                </a>
              </p>
            )}
            <button style={{ ...secondaryBtnStyle, marginTop: 20 }} onClick={handleReset}>取消</button>
          </div>
        </div>
      );
    }
    // expired / failed / cancelled
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>订单已{statusLabel(order.status)}</h2>
        <div style={panelStyle}>
          <p style={{ margin: 0, color: cssVar('textSecondary') }}>
            订单号：<code style={inlineCodeStyle}>{order.out_trade_no}</code>
          </p>
          <button style={{ ...primaryBtnStyle, marginTop: 20 }} onClick={handleReset}>重新发起</button>
        </div>
      </div>
    );
  }

  // 默认态：金额 + 渠道选择 + 提交
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>账户充值</h2>

      <div style={panelStyle}>
        <section>
          <h3 style={sectionTitleStyle}>选择金额</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[10, 30, 50, 100, 200, 500].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v)}
                style={amount === v ? amountBtnActive : amountBtn}
              >
                ¥{v}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, color: cssVar('textSecondary'), fontSize: 13 }}>
            <span>自定义金额</span>
            <input
              type="number"
              min={1}
              max={10000}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={inputStyle}
            />
            <span>元</span>
          </div>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>选择支付方式</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {methods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMethod(m.key)}
                style={method === m.key ? channelCardActive : channelCard}
                title={m.description}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {error && <p style={{ color: cssVar('danger'), marginTop: 16, fontSize: 13 }}>{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          style={{ ...primaryBtnStyle, marginTop: 24, width: '100%', opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? '处理中...' : '立即支付'}
        </button>
      </div>
    </div>
  );
}

function methodLabel(m: string): string {
  switch (m) {
    case 'alipay': return '支付宝';
    case 'wxpay': return '微信支付';
    default: return m;
  }
}

function statusLabel(s: string): string {
  switch (s) {
    case 'expired': return '过期';
    case 'failed': return '失败';
    case 'cancelled': return '取消';
    case 'refunded': return '退款';
    default: return s;
  }
}

// ========== 样式 ==========
// 使用 SDK 的设计 token，对齐 openai 插件的视觉风格：
//   - 卡片：bgSurface + glassBorder + radiusLg
//   - 输入：bg 背景 + glassBorder + radiusMd
//   - 文字：text / textSecondary / textTertiary 三级层次

const containerStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '24px 24px 48px',
  color: cssVar('text'),
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 22,
  fontWeight: 600,
  color: cssVar('text'),
  letterSpacing: '-0.01em',
};

const hintStyle: React.CSSProperties = {
  padding: '40px 0',
  textAlign: 'center',
  color: cssVar('textSecondary'),
};

const panelStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  background: cssVar('bgSurface'),
  padding: '24px',
};

const sectionStyle: React.CSSProperties = {
  marginTop: 28,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 12px',
  fontSize: 13,
  fontWeight: 600,
  color: cssVar('textSecondary'),
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const amountBtn: React.CSSProperties = {
  minWidth: 88,
  padding: '12px 18px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bg'),
  color: cssVar('text'),
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 500,
  transition: cssVar('transition'),
};

const amountBtnActive: React.CSSProperties = {
  ...amountBtn,
  borderColor: cssVar('primary'),
  background: cssVar('primarySubtle'),
  color: cssVar('primary'),
  fontWeight: 600,
};

const channelCard: React.CSSProperties = {
  minWidth: 140,
  padding: '16px 24px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: cssVar('transition'),
};

const channelCardActive: React.CSSProperties = {
  ...channelCard,
  borderColor: cssVar('primary'),
  background: cssVar('primarySubtle'),
  color: cssVar('primary'),
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  width: 140,
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 14,
  outline: 'none',
};

const primaryBtnStyle: React.CSSProperties = {
  padding: '12px 28px',
  border: 'none',
  borderRadius: cssVar('radiusMd'),
  background: cssVar('primary'),
  color: cssVar('textInverse'),
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: '10px 24px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const qrPanelStyle: React.CSSProperties = {
  padding: '28px 24px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: cssVar('bgSurface'),
};

const qrImageStyle: React.CSSProperties = {
  width: 240,
  height: 240,
  background: cssVar('bgElevated'),
  padding: 8,
  borderRadius: cssVar('radiusMd'),
};

const qrAmountStyle: React.CSSProperties = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: cssVar('text'),
  fontFamily: cssVar('fontMono'),
  letterSpacing: '-0.02em',
};

const inlineCodeStyle: React.CSSProperties = {
  fontFamily: cssVar('fontMono'),
  fontSize: '0.9em',
  padding: '1px 6px',
  borderRadius: 4,
  background: cssVar('bg'),
  color: cssVar('textSecondary'),
};
