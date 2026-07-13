// 与 core 后端 ext-user 入口通信的薄封装。
//
// core 把 JWT 存在 localStorage('token')，并通过 Authorization: Bearer 头发送，
// 而不是 cookie。插件前端是独立打包的 ESM bundle，没有共享 core 的 client.ts，
// 这里手动从 localStorage 取 token 拼到请求头里。
//
// 注意：所有 user 级路径都走 /api/v1/ext-user/payment-epay/...
// 回调路径不在前端使用。

const BASE = '/api/v1/ext-user/payment-epay';
const ADMIN_BASE = '/api/v1/ext/payment-epay';

interface CoreApiResp<T> {
  code: number;
  message: string;
  data?: T;
}

async function request<T>(method: string, path: string, body?: unknown, opts?: { admin?: boolean }): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const base = opts?.admin ? ADMIN_BASE : BASE;
  const resp = await fetch(base + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // core 统一响应格式：{code, message, data}
  // 插件 handler 直接返回业务 JSON，没经过 core 的 response.Success 包装
  // 这里同时兼容两种：先尝试解析 wrapper，没有 wrapper 就当裸 JSON
  const text = await resp.text();
  let raw: unknown = null;
  try {
    raw = text ? JSON.parse(text) : null;
  } catch {
    /* 非 JSON 响应 */
  }

  if (!resp.ok) {
    const wrapper = raw as CoreApiResp<unknown> | null;
    const errMsg =
      wrapper?.message ||
      (raw as { error?: string } | null)?.error ||
      `HTTP ${resp.status}`;
    if (resp.status === 401) {
      // core 一致行为：401 时清 token 并跳登录
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(errMsg);
  }

  // 如果返回结构是 core wrapper，解包拿 data；否则直接当业务体
  const wrapper = raw as CoreApiResp<T> | null;
  if (wrapper && typeof wrapper === 'object' && 'code' in wrapper && 'data' in wrapper) {
    if (wrapper.code !== 0) {
      throw new Error(wrapper.message || '请求失败');
    }
    return wrapper.data as T;
  }
  return raw as T;
}

export interface MethodInfo {
  key: string;
  label: string;
  icon: string;
  description?: string;
}

export interface Order {
  id: number;
  out_trade_no: string;
  user_id: number;
  /** 后端 admin 列表接口通过 LEFT JOIN users 填充；用户级接口为空。 */
  user_email?: string;
  /** 用户面向的支付方式：alipay / wxpay / qqpay */
  method: string;
  /** 实际承载这笔订单的 Provider 实例 ID */
  provider_id: string;
  /** 兼容老订单的字段，新订单等同 provider_id */
  channel?: string;
  amount: number;
  /** 下单时的套餐快照；非套餐订单为 0 / 缺省 */
  package_id?: number;
  bonus_amount?: number;
  status: 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled' | 'refunded';
  subject: string;
  payment_url?: string;
  /** 后端归一化后的二维码内容（支付宝/微信 schema 字符串或 URL） */
  qr_code_content?: string;
  paid_at?: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

// ============ 充值套餐 ============

export interface PackageItem {
  id: number;
  amount: number;
  bonus_amount: number;
  title: string;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ============ Provider 配置（admin） ============

export interface ProviderFieldDescriptor {
  key: string;
  label: string;
  type: string; // text / password / textarea / number / bool
  required?: boolean;
  placeholder?: string;
  description?: string;
}

export interface ProviderKindMeta {
  kind: string;
  name: string;
  description: string;
  supported_methods: string[];
  field_descriptors: ProviderFieldDescriptor[];
}

export interface ProviderItem {
  id: string;
  kind: string;
  name: string;
  enabled: boolean;
  config: Record<string, string>;
  supported_methods: string[];
  is_running: boolean;
}

export interface ProviderListResp {
  providers: ProviderItem[];
  kinds: ProviderKindMeta[];
}

export const api = {
  // ============ User ============

  /** 列出当前可用的支付方式（PayMethod，不是 Provider） */
  methods: () =>
    request<{ methods: MethodInfo[]; configured: boolean; message?: string }>(
      'GET', '/user/methods',
    ),

  createOrder: (input: { amount: number; method: string; subject?: string; package_id?: number }) =>
    request<Order>('POST', '/user/orders', input),

  /** 启用中的充值套餐（"充100送15"按钮数据源）；未配置套餐时返回空列表 */
  packages: () =>
    request<{ list: PackageItem[] }>('GET', '/user/packages'),

  listOrders: (limit = 50) =>
    request<{ list: Order[] }>('GET', `/user/orders?limit=${limit}`),

  getOrder: (outTradeNo: string) =>
    request<Order>('GET', `/user/orders/${encodeURIComponent(outTradeNo)}`),

  // ============ Admin: 订单 ============

  // email 为子串过滤（后端走 ILIKE %x%）；status='all' 或留空表示不过滤
  adminListOrders: (params: { page?: number; pageSize?: number; email?: string; status?: string } = {}) => {
    const qs = new URLSearchParams();
    qs.set('page', String(params.page ?? 1));
    qs.set('page_size', String(params.pageSize ?? 20));
    if (params.email && params.email.trim()) qs.set('email', params.email.trim());
    if (params.status && params.status !== 'all') qs.set('status', params.status);
    return request<AdminOrdersResp>('GET', `/admin/orders?${qs.toString()}`, undefined, { admin: true });
  },

  // ============ Admin: Provider 配置 ============

  adminListProviders: () =>
    request<ProviderListResp>('GET', '/admin/providers', undefined, { admin: true }),

  adminUpsertProvider: (input: {
    id: string;
    /** 编辑场景下携带的原 id；为空表示创建。后端检测到与 id 不同时会原子重命名 */
    original_id?: string;
    kind: string;
    enabled: boolean;
    config: Record<string, string>;
  }) =>
    request<{ ok: boolean; id?: string }>('POST', '/admin/providers', input, { admin: true }),

  adminDeleteProvider: (id: string) =>
    request<{ ok: boolean }>('DELETE', `/admin/providers/${encodeURIComponent(id)}`, undefined, { admin: true }),

  adminReloadProviders: () =>
    request<{ ok: boolean }>('POST', '/admin/providers/reload', {}, { admin: true }),

  // ============ Admin: 充值套餐 ============

  adminListPackages: () =>
    request<{ list: PackageItem[] }>('GET', '/admin/packages', undefined, { admin: true }),

  /** id=0 表示新增，>0 表示编辑 */
  adminUpsertPackage: (input: {
    id: number;
    amount: number;
    bonus_amount: number;
    title: string;
    enabled: boolean;
    sort_order: number;
  }) =>
    request<PackageItem>('POST', '/admin/packages', input, { admin: true }),

  adminDeletePackage: (id: number) =>
    request<{ ok: boolean }>('DELETE', `/admin/packages/${id}`, undefined, { admin: true }),
};

// ============ 站点品牌 ============
//
// 充值订单 subject 需要带站点名，多实例部署（ToB/ToC）不能写死品牌。
// 复用 core 的公开设置端点 /api/v1/settings/public（无需鉴权），
// 并镜像 core 前端 SiteSettingsProvider 的来源站覆盖规则：
// localStorage('ag_origin_site') 命中设置项 sites_branding 时优先用来源站品牌名。

let siteNamePromise: Promise<string> | null = null;

/** 返回当前实例的站点名；获取失败返回空串（调用方自行兜底），失败不缓存。 */
export function getSiteName(): Promise<string> {
  if (!siteNamePromise) {
    siteNamePromise = (async () => {
      const resp = await fetch('/api/v1/settings/public');
      const wrapper = (await resp.json()) as CoreApiResp<Record<string, string>>;
      const data = wrapper?.data || {};
      let brandName = '';
      try {
        const originSite = window.localStorage.getItem('ag_origin_site') || '';
        if (originSite && data.sites_branding) {
          const parsed = JSON.parse(data.sites_branding) as Record<string, { name?: string }>;
          brandName = parsed?.[originSite]?.name || '';
        }
      } catch {
        // sites_branding 非法 JSON / localStorage 不可用时回退全局站名
      }
      return brandName || data.site_name || '';
    })().catch(() => {
      siteNamePromise = null;
      return '';
    });
  }
  return siteNamePromise;
}

export interface OrderStats {
  total: number;
  paid: number;
  pending: number;
  expired: number;
  failed: number;
  cancelled: number;
  refunded: number;
  total_amount_paid: number;
  today_amount_paid: number;
}

export interface AdminOrdersResp {
  list: Order[];
  total: number;
  stats: OrderStats;
}
