import { useEffect, useState } from 'react';
import { cssVar } from '@doudou-start/airgate-theme';
import { api, type PackageItem } from './api';
import { formatRechargeCredit } from './money';
import { useToast } from './Toast';

/**
 * AdminPackagesPage 充值套餐管理（admin 页面）
 *
 * 配置「充 100 送 15」这类固定套餐档：
 *   - 用户端 RechargePage 点选套餐档下单才享赠送；自定义金额不赠送
 *   - 金额/赠送在下单时快照进订单，改/删套餐不影响在途订单
 *   - 赠送在支付回调入账时以独立幂等键（epay:<单号>:bonus）单独入一条流水
 */
export default function AdminPackagesPage() {
  const { toast, Toaster } = useToast();
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 编辑表单：null=收起；id=0 新增，>0 编辑
  const [form, setForm] = useState<{ id: number; amount: string; bonus: string; title: string; sort: string; enabled: boolean } | null>(null);

  const load = () => {
    setLoading(true);
    api.adminListPackages()
      .then((res) => setItems(res.list || []))
      .catch((e) => toast.error(`加载套餐失败: ${String((e as Error).message || e)}`))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openCreate = () => setForm({ id: 0, amount: '100', bonus: '15', title: '', sort: String(items.length * 10), enabled: true });
  const openEdit = (p: PackageItem) => setForm({
    id: p.id,
    amount: String(p.amount),
    bonus: String(p.bonus_amount),
    title: p.title,
    sort: String(p.sort_order),
    enabled: p.enabled,
  });

  const handleSave = async () => {
    if (!form) return;
    const amount = Number(form.amount);
    const bonus = Number(form.bonus);
    if (!amount || amount <= 0) {
      toast.error('套餐金额必须大于 0');
      return;
    }
    if (bonus < 0 || Number.isNaN(bonus)) {
      toast.error('赠送额度不能为负数');
      return;
    }
    setSaving(true);
    try {
      await api.adminUpsertPackage({
        id: form.id,
        amount,
        bonus_amount: bonus,
        title: form.title.trim(),
        enabled: form.enabled,
        sort_order: Number(form.sort) || 0,
      });
      toast.success(form.id ? '套餐已更新' : '套餐已创建');
      setForm(null);
      load();
    } catch (e) {
      toast.error(String((e as Error).message || e));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (p: PackageItem) => {
    try {
      await api.adminUpsertPackage({
        id: p.id,
        amount: p.amount,
        bonus_amount: p.bonus_amount,
        title: p.title,
        enabled: !p.enabled,
        sort_order: p.sort_order,
      });
      toast.success(p.enabled ? '套餐已停用' : '套餐已启用');
      load();
    } catch (e) {
      toast.error(String((e as Error).message || e));
    }
  };

  const handleDelete = async (p: PackageItem) => {
    if (!window.confirm(`确认删除套餐「充 ${p.amount} 送 ${p.bonus_amount}」？历史订单的赠送不受影响。`)) return;
    try {
      await api.adminDeletePackage(p.id);
      toast.success('套餐已删除');
      load();
    } catch (e) {
      toast.error(String((e as Error).message || e));
    }
  };

  return (
    <div style={containerStyle}>
      {Toaster}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={titleStyle}>充值套餐</h2>
          <p style={{ margin: '4px 0 0', color: cssVar('textSecondary'), fontSize: 13 }}>
            用户点选套餐档才享赠送；自定义金额充值不参与。赠送在支付成功后以独立流水入账。
          </p>
        </div>
        <button style={primaryBtnStyle} onClick={openCreate}>新增套餐</button>
      </div>

      {form && (
        <div style={{ ...panelStyle, marginBottom: 20 }}>
          <h3 style={sectionTitleStyle}>{form.id ? `编辑套餐 #${form.id}` : '新增套餐'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
            <label style={fieldStyle}>
              <span style={labelStyle}>充值金额（$）</span>
              <input type="number" min={1} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={inputStyle} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>赠送额度（$）</span>
              <input type="number" min={0} value={form.bonus} onChange={(e) => setForm({ ...form, bonus: e.target.value })} style={inputStyle} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>标题（可选，按钮悬浮提示）</span>
              <input type="text" maxLength={64} value={form.title} placeholder="如：限时特惠" onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ ...inputStyle, width: 200 }} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>排序（小在前）</span>
              <input type="number" value={form.sort} onChange={(e) => setForm({ ...form, sort: e.target.value })} style={{ ...inputStyle, width: 90 }} />
            </label>
            <label style={{ ...fieldStyle, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
              <span style={labelStyle}>启用</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...primaryBtnStyle, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleSave}>
                {saving ? '保存中...' : '保存'}
              </button>
              <button style={secondaryBtnStyle} onClick={() => setForm(null)}>取消</button>
            </div>
          </div>
        </div>
      )}

      <div style={panelStyle}>
        {loading ? (
          <p style={{ margin: 0, color: cssVar('textSecondary'), textAlign: 'center', padding: '24px 0' }}>加载中...</p>
        ) : items.length === 0 ? (
          <p style={{ margin: 0, color: cssVar('textSecondary'), textAlign: 'center', padding: '24px 0' }}>
            暂无套餐。点击右上角「新增套餐」创建第一个优惠档（用户端在配置前显示默认金额档）。
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['ID', '充值金额', '赠送', '用户实得', '标题', '排序', '状态', '操作'].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td style={tdStyle}>{p.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{formatRechargeCredit(p.amount)}</td>
                  <td style={{ ...tdStyle, color: p.bonus_amount > 0 ? cssVar('success') : cssVar('textTertiary') }}>
                    {p.bonus_amount > 0 ? `+${formatRechargeCredit(p.bonus_amount)}` : '—'}
                  </td>
                  <td style={tdStyle}>{formatRechargeCredit(p.amount + p.bonus_amount)}</td>
                  <td style={{ ...tdStyle, color: cssVar('textSecondary') }}>{p.title || '—'}</td>
                  <td style={tdStyle}>{p.sort_order}</td>
                  <td style={tdStyle}>
                    <span style={p.enabled ? statusOn : statusOff}>{p.enabled ? '启用中' : '已停用'}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={linkBtnStyle} onClick={() => openEdit(p)}>编辑</button>
                      <button style={linkBtnStyle} onClick={() => handleToggle(p)}>{p.enabled ? '停用' : '启用'}</button>
                      <button style={{ ...linkBtnStyle, color: cssVar('danger') }} onClick={() => handleDelete(p)}>删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ========== 样式（对齐插件其余页面的 token 用法） ==========

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '24px 24px 48px',
  color: cssVar('text'),
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: '-0.01em',
};

const panelStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  background: cssVar('bgSurface'),
  padding: '20px 24px',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 16px',
  fontSize: 13,
  fontWeight: 600,
  color: cssVar('textSecondary'),
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: cssVar('textSecondary'),
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  width: 130,
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 14,
  outline: 'none',
};

const primaryBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: cssVar('radiusMd'),
  background: cssVar('primary'),
  color: cssVar('textInverse'),
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  transition: cssVar('transition'),
};

const linkBtnStyle: React.CSSProperties = {
  padding: 0,
  border: 'none',
  background: 'none',
  color: cssVar('primary'),
  fontSize: 13,
  cursor: 'pointer',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  color: cssVar('textTertiary'),
  fontWeight: 500,
  fontSize: 12,
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
};

const tdStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
  verticalAlign: 'middle',
};

const statusOn: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: '2px 10px',
  borderRadius: 999,
  background: cssVar('primarySubtle'),
  color: cssVar('primary'),
};

const statusOff: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: '2px 10px',
  borderRadius: 999,
  background: cssVar('bgElevated'),
  color: cssVar('textTertiary'),
};
