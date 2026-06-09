import { useCallback, useEffect, useMemo, useState } from 'react';
import { cssVar } from '@doudou-start/airgate-theme';
import {
  api,
  type ProviderItem,
  type ProviderKindMeta,
} from './api';
import { useToast } from './Toast';

// pluginConfirm 走 core 暴露的统一 ConfirmModal（window.airgate.confirm 由 core
// PluginAPIBridge 在 ToastProvider 内挂载）。bridge 不可用时退回到原生 confirm，
// 避免插件被独立运行测试时静默失败。
type PluginConfirmOptions = { title?: string; danger?: boolean };
function pluginConfirm(message: string, options?: PluginConfirmOptions): Promise<boolean> {
  const w = window as unknown as {
    airgate?: { confirm?: (m: string, o?: PluginConfirmOptions) => Promise<boolean> };
  };
  if (w.airgate?.confirm) {
    return w.airgate.confirm(message, options);
  }
   
  return Promise.resolve(window.confirm(message));
}

/**
 * AdminProvidersPage 管理员配置支付服务商。
 *
 * 与 core 通用的「插件配置 modal」不同：
 *   - 这页是插件自己的 audience=admin 页面，可以做更复杂的 UI
 *   - 支持"按 Provider 类型动态生成表单字段"（field_descriptors 由后端 KindMeta 给出）
 *   - 支持同一种 Provider 配多个实例（例如 xunhu_main + xunhu_backup）
 *
 * 页面布局：
 *   左侧 / 顶部：已配置的 Provider 列表（卡片式）
 *   右侧 / 弹窗：编辑/新增表单
 */
export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [kinds, setKinds] = useState<ProviderKindMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const { toast, Toaster } = useToast();

  const reload = useCallback(() => {
    setLoading(true);
    setErr(null);
    api.adminListProviders()
      .then((res) => {
        setProviders(res.providers || []);
        setKinds(res.kinds || []);
      })
      .catch((e) => setErr(String(e?.message || e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(reload, [reload]);

  const handleAdd = (kindMeta: ProviderKindMeta) => {
    setEditing({
      mode: 'create',
      id: '',
      kind: kindMeta.kind,
      enabled: true,
      config: defaultConfigFor(kindMeta),
    });
  };

  const handleEdit = (item: ProviderItem) => {
    setEditing({
      mode: 'edit',
      id: item.id,
      originalId: item.id,
      kind: item.kind,
      enabled: item.enabled,
      config: { ...item.config },
    });
  };

  const handleDelete = async (id: string) => {
    if (!(await pluginConfirm(`确认删除服务商 ${id}？此操作无法撤销。`, { title: '删除服务商', danger: true }))) return;
    try {
      await api.adminDeleteProvider(id);
      toast.success(`已删除 ${id}`);
      reload();
    } catch (e) {
      toast.error('删除失败: ' + (e as Error).message);
    }
  };

  const handleToggle = async (item: ProviderItem) => {
    try {
      await api.adminUpsertProvider({
        id: item.id,
        kind: item.kind,
        enabled: !item.enabled,
        config: item.config,
      });
      toast.success(`${item.id} 已${!item.enabled ? '启用' : '禁用'}`);
      reload();
    } catch (e) {
      toast.error('操作失败: ' + (e as Error).message);
    }
  };

  if (loading) return <div style={containerStyle}><div style={hintStyle}>加载中...</div></div>;
  if (err) return <div style={containerStyle}><div style={{ ...hintStyle, color: cssVar('danger') }}>加载失败: {err}</div></div>;

  return (
    <div style={containerStyle}>
      {Toaster}

      {/* 添加新服务商区 */}
      <div style={panelStyle}>
        <h3 style={sectionTitleStyle}>添加服务商</h3>
        <p style={hintTextStyle}>
          每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。
        </p>
        <div style={kindGridStyle}>
          {kinds.map((k) => (
            <div key={k.kind} style={kindCardStyle}>
              <div style={{ fontWeight: 600, color: cssVar('text'), fontSize: 15 }}>{k.name}</div>
              <div style={{ fontSize: 12, color: cssVar('textSecondary'), marginTop: 6 }}>{k.description}</div>
              <div style={{ fontSize: 12, color: cssVar('textTertiary'), marginTop: 8 }}>
                支持: {k.supported_methods.map(methodLabel).join(' / ')}
              </div>
              <button style={{ ...primaryBtnStyle, marginTop: 12, width: '100%' }} onClick={() => handleAdd(k)}>
                + 添加
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 已配置实例列表 */}
      <div style={panelStyle}>
        <h3 style={sectionTitleStyle}>已配置的服务商实例</h3>
        {providers.length === 0 ? (
          <p style={emptyStyle}>暂未配置任何服务商。请在上方点「+ 添加」选择类型。</p>
        ) : (
          <div style={instancesGridStyle}>
            {providers.map((p) => (
              <div key={p.id} style={instanceCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: cssVar('text'), fontSize: 15 }}>{p.name || p.id}</div>
                    <div style={{ fontSize: 12, color: cssVar('textTertiary'), marginTop: 4, fontFamily: cssVar('fontMono') }}>
                      {p.id} · {p.kind}
                    </div>
                  </div>
                  <span style={p.is_running ? badgeOnStyle : badgeOffStyle}>
                    {p.is_running ? '运行中' : (p.enabled ? '已启用未就绪' : '已禁用')}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: cssVar('textSecondary'), marginTop: 12 }}>
                  支持: {p.supported_methods.map(methodLabel).join(' / ')}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button style={ghostBtnStyle} onClick={() => handleEdit(p)}>编辑</button>
                  <button style={ghostBtnStyle} onClick={() => handleToggle(p)}>{p.enabled ? '禁用' : '启用'}</button>
                  <button style={{ ...ghostBtnStyle, color: cssVar('danger') }} onClick={() => handleDelete(p.id)}>删除</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <EditModal
          editing={editing}
          kinds={kinds}
          onCancel={() => setEditing(null)}
          onSaved={(msg) => {
            setEditing(null);
            toast.success(msg);
            reload();
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}
    </div>
  );
}

// ============================================================================
// EditModal
// ============================================================================

interface EditingState {
  mode: 'create' | 'edit';
  id: string;
  /** 编辑场景下 admin 修改 ID 前的原值，提交时传给后端做原子重命名 */
  originalId?: string;
  kind: string;
  enabled: boolean;
  config: Record<string, string>;
}

function EditModal({
  editing,
  kinds,
  onCancel,
  onSaved,
  onError,
}: {
  editing: EditingState;
  kinds: ProviderKindMeta[];
  onCancel: () => void;
  onSaved: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const [state, setState] = useState<EditingState>(editing);
  const [saving, setSaving] = useState(false);

  const meta = useMemo(() => kinds.find((k) => k.kind === state.kind), [kinds, state.kind]);

  const handleSave = async () => {
    if (!meta) {
      onError('未知的服务商类型');
      return;
    }
    // 编辑场景下 ID 由后端 round-trip 回来；创建场景下 ID 留空让后端自动生成。
    // 必填校验
    for (const f of meta.field_descriptors) {
      if (f.required && !state.config[f.key]) {
        onError(`「${f.label}」必填`);
        return;
      }
    }
    // 编辑场景下检测到 ID 变化时，在 UI 上做一次显式确认，避免误触
    if (state.mode === 'edit' && state.originalId && state.id.trim() !== state.originalId) {
      const ok = await pluginConfirm(
        `确认将实例 ID 从「${state.originalId}」重命名为「${state.id.trim()}」？\n\n` +
          '所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，\n' +
          '已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。',
        { title: '重命名服务商 ID', danger: true },
      );
      if (!ok) return;
    }
    setSaving(true);
    try {
      const res = await api.adminUpsertProvider({
        id: state.id.trim(),
        original_id: state.originalId,
        kind: state.kind,
        enabled: state.enabled,
        config: state.config,
      });
      const finalID = res.id || state.id.trim();
      onSaved(state.mode === 'create' ? `已创建 ${finalID}` : `已更新 ${finalID}`);
    } catch (e) {
      onError('保存失败: ' + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={modalBackdropStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            {state.mode === 'create' ? '添加' : '编辑'}服务商 - {meta?.name || state.kind}
          </h3>
          <button style={modalCloseBtnStyle} onClick={onCancel}>×</button>
        </div>

        <div style={modalBodyStyle}>
          {/* 创建场景：可选填自定义 ID（留空则后端自动生成 {kind}_{N}）
              编辑场景：可改，后端检测到变化会在事务里原子重命名（同步更新历史订单的 provider_id 引用） */}
          <FormField
            label="实例 ID"
            description={
              state.mode === 'edit'
                ? '可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。'
                : '可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。'
            }
          >
            <input
              type="text"
              value={state.id}
              onChange={(e) => setState({ ...state, id: e.target.value })}
              placeholder={state.mode === 'create' ? '留空自动生成' : ''}
              style={{ ...inputStyle, fontFamily: cssVar('fontMono'), fontSize: 12 }}
            />
          </FormField>

          <FormField label="启用">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={state.enabled}
                onChange={(e) => setState({ ...state, enabled: e.target.checked })}
              />
              <span style={{ fontSize: 13, color: cssVar('textSecondary') }}>勾选后该服务商参与支付路由</span>
            </label>
          </FormField>

          {meta?.field_descriptors.map((f) => (
            <FormField key={f.key} label={f.label} description={f.description} required={f.required}>
              {f.type === 'textarea' ? (
                <textarea
                  value={state.config[f.key] || ''}
                  onChange={(e) => setState({ ...state, config: { ...state.config, [f.key]: e.target.value } })}
                  placeholder={f.placeholder}
                  style={{ ...inputStyle, minHeight: 120, fontFamily: cssVar('fontMono'), fontSize: 12 }}
                />
              ) : f.type === 'bool' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={state.config[f.key] === 'true'}
                    onChange={(e) => setState({ ...state, config: { ...state.config, [f.key]: e.target.checked ? 'true' : 'false' } })}
                  />
                </label>
              ) : f.type === 'method-multi' ? (
                <MethodMultiSelect
                  candidates={meta.supported_methods}
                  value={state.config[f.key] || ''}
                  onChange={(v) => setState({ ...state, config: { ...state.config, [f.key]: v } })}
                />
              ) : (
                <input
                  type={f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text'}
                  value={state.config[f.key] || ''}
                  onChange={(e) => setState({ ...state, config: { ...state.config, [f.key]: e.target.value } })}
                  placeholder={f.placeholder}
                  style={inputStyle}
                />
              )}
            </FormField>
          ))}
        </div>

        <div style={modalFooterStyle}>
          <button style={ghostBtnStyle} onClick={onCancel} disabled={saving}>取消</button>
          <button style={primaryBtnStyle} onClick={handleSave} disabled={saving}>
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * MethodMultiSelect 多选支付方式 checkbox 组。
 *
 * value 是逗号分隔字符串（"alipay,wxpay"），与后端 ConfigRecord.Config 的存储格式一致。
 * 候选项是该 Provider Kind 的 SupportedMethods（后端 KindMeta.supported_methods 给的）。
 *
 * 切换时：
 *   - 维护一个内部 Set
 *   - 输出排序按 candidates 顺序（保持稳定）
 *   - 空选择时输出空字符串，等同于"未配置"
 */
function MethodMultiSelect({
  candidates,
  value,
  onChange,
}: {
  candidates: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = new Set(value.split(',').map((s) => s.trim()).filter(Boolean));

  const toggle = (key: string) => {
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    // 按 candidates 顺序输出，保证稳定
    const next = candidates.filter((c) => selected.has(c)).join(',');
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {candidates.map((key) => {
        const checked = selected.has(key);
        return (
          <label
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              border: `1px solid ${checked ? cssVar('primary') : cssVar('glassBorder')}`,
              borderRadius: cssVar('radiusMd'),
              background: checked ? cssVar('primarySubtle') : cssVar('bg'),
              color: checked ? cssVar('primary') : cssVar('text'),
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: checked ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(key)}
              style={{ margin: 0 }}
            />
            {methodLabel(key)}
          </label>
        );
      })}
      {candidates.length === 0 && (
        <span style={{ fontSize: 12, color: cssVar('textTertiary') }}>该协议没有可选的支付方式</span>
      )}
    </div>
  );
}

function FormField({
  label,
  description,
  required,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={fieldLabelStyle}>
        {label}
        {required && <span style={{ color: cssVar('danger'), marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {description && <div style={fieldHintStyle}>{description}</div>}
    </div>
  );
}

// ============================================================================
// utils
// ============================================================================

function methodLabel(m: string): string {
  return ({ alipay: '支付宝', wxpay: '微信支付' } as Record<string, string>)[m] || m;
}

function defaultConfigFor(meta: ProviderKindMeta): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of meta.field_descriptors) {
    if (f.type === 'bool') out[f.key] = 'false';
    else out[f.key] = '';
  }
  return out;
}

// ============================================================================
// 样式
// ============================================================================

const containerStyle: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: '24px 24px 48px',
  color: cssVar('text'),
};

const hintStyle: React.CSSProperties = {
  padding: '40px 0',
  textAlign: 'center',
  color: cssVar('textSecondary'),
};

const hintTextStyle: React.CSSProperties = {
  margin: '4px 0 16px',
  fontSize: 13,
  color: cssVar('textSecondary'),
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 12px',
  fontSize: 14,
  fontWeight: 600,
  color: cssVar('text'),
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const panelStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  background: cssVar('bgSurface'),
  padding: 20,
  marginBottom: 20,
};

const kindGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 12,
};

const kindCardStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  padding: 16,
  background: cssVar('bgElevated'),
};

const instancesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 12,
};

const instanceCardStyle: React.CSSProperties = {
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  padding: 16,
  background: cssVar('bgElevated'),
};

const emptyStyle: React.CSSProperties = {
  color: cssVar('textTertiary'),
  textAlign: 'center',
  padding: '24px 0',
  fontSize: 14,
};

const badgeOnStyle: React.CSSProperties = {
  padding: '2px 8px',
  borderRadius: 4,
  background: cssVar('successSubtle'),
  color: cssVar('success'),
  fontSize: 11,
  fontWeight: 600,
};

const badgeOffStyle: React.CSSProperties = {
  ...badgeOnStyle,
  background: cssVar('warningSubtle'),
  color: cssVar('warning'),
};

const ghostBtnStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: 'transparent',
  color: cssVar('text'),
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 500,
};

const primaryBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: cssVar('radiusMd'),
  background: cssVar('primary'),
  color: cssVar('textInverse'),
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusMd'),
  background: cssVar('bgElevated'),
  color: cssVar('text'),
  fontSize: 13,
  boxSizing: 'border-box',
};

const fieldLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: cssVar('textSecondary'),
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const fieldHintStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 11,
  color: cssVar('textTertiary'),
};

const modalBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: 600,
  maxWidth: '92vw',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  background: cssVar('bgSurface'),
  border: `1px solid ${cssVar('glassBorder')}`,
  borderRadius: cssVar('radiusLg'),
  overflow: 'hidden',
};

const modalHeaderStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderBottom: `1px solid ${cssVar('glassBorder')}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const modalCloseBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: cssVar('textSecondary'),
  fontSize: 24,
  cursor: 'pointer',
  lineHeight: 1,
};

const modalBodyStyle: React.CSSProperties = {
  padding: 20,
  overflowY: 'auto',
  flex: 1,
};

const modalFooterStyle: React.CSSProperties = {
  padding: '12px 20px',
  borderTop: `1px solid ${cssVar('glassBorder')}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
};
