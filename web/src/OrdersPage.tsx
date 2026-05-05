import { useEffect, useState } from 'react';
import { cssVar } from '@airgate/theme';
import { api, type Order } from './api';

/**
 * OrdersPage 用户充值记录列表
 */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    api.listOrders(100)
      .then((res) => setOrders(res.list || []))
      .catch((e) => setErr(String(e?.message || e)))
      .finally(() => setLoading(false));
  };

  useEffect(reload, []);

  if (loading) return <div style={containerStyle}><div style={hintStyle}>加载中...</div></div>;
  if (err) return <div style={containerStyle}><div style={{ ...hintStyle, color: cssVar('danger') }}>加载失败: {err}</div></div>;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
        {orders.length === 0 ? (
          <p style={emptyStyle}>暂无充值记录</p>
        ) : (
          <div style={tableWrapStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>订单号</th>
                  <th style={thStyle}>金额</th>
                  <th style={thStyle}>支付方式</th>
                  <th style={thStyle}>状态</th>
                  <th style={thStyle}>创建时间</th>
                  <th style={thStyle}>支付时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td style={tdStyle}><code style={codeStyle}>{o.out_trade_no}</code></td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>¥{o.amount.toFixed(2)}</td>
                    <td style={tdStyle}>{methodLabel(o.method)}</td>
                    <td style={{ ...tdStyle, color: statusColor(o.status), fontWeight: 600 }}>{statusLabel(o.status)}</td>
                    <td style={{ ...tdStyle, color: cssVar('textSecondary') }}>{formatTime(o.created_at)}</td>
                    <td style={{ ...tdStyle, color: cssVar('textSecondary') }}>{o.paid_at ? formatTime(o.paid_at) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function methodLabel(m: string): string {
  return ({ alipay: '支付宝', wxpay: '微信支付' } as Record<string, string>)[m] || m || '-';
}
function statusLabel(s: string): string {
  return ({
    pending: '待支付',
    paid: '已支付',
    expired: '已过期',
    failed: '失败',
    cancelled: '已取消',
    refunded: '已退款',
  } as Record<string, string>)[s] || s;
}
function statusColor(s: string): string {
  return ({
    pending: cssVar('warning'),
    paid: cssVar('success'),
    expired: cssVar('textTertiary'),
    failed: cssVar('danger'),
    cancelled: cssVar('textTertiary'),
    refunded: cssVar('textTertiary'),
  } as Record<string, string>)[s] || 'inherit';
}
function formatTime(t: string): string {
  try { return new Date(t).toLocaleString(); } catch { return t; }
}

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '24px 24px 48px',
  color: cssVar('text'),
};

const hintStyle: React.CSSProperties = {
  padding: '40px 0',
  textAlign: 'center',
  color: cssVar('textSecondary'),
};

const panelStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  background: cssVar('bgElevated'),
  padding: '8px 0',
  overflow: 'hidden',
};

const emptyStyle: React.CSSProperties = {
  color: cssVar('textTertiary'),
  textAlign: 'center',
  padding: '40px 0',
  fontSize: 14,
};

const tableWrapStyle: React.CSSProperties = {
  overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 16px',
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
  background: cssVar('bgSurface'),
  color: cssVar('textSecondary'),
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
  fontSize: 13,
  color: cssVar('text'),
  whiteSpace: 'nowrap',
};

const codeStyle: React.CSSProperties = {
  fontSize: 12,
  fontFamily: cssVar('fontMono'),
  color: cssVar('textSecondary'),
};
