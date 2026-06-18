package provider

import (
	"context"
	"net/url"
	"strconv"
	"strings"
)

// ZPAY 支付实现。
//
// ZPAY 的开发文档说明其兼容易支付接口：页面跳转支付使用
// submit.php，凭证为 pid + key，签名为 MD5(sorted params + key)，
// 异步通知字段为 trade_status=TRADE_SUCCESS。
//
// 本实现采用 submit.php 收银台链接，不在创建订单时调用上游预下单接口。
// 好处是订单创建链路不依赖第三方 API 响应，用户端直接把收银台 URL 渲染成二维码或打开。

func init() {
	Register(KindEpayZpay, buildZpay)
	RegisterKindMeta(KindMeta{
		Kind:             KindEpayZpay,
		Name:             "ZPAY支付",
		Description:      "ZPAY/易支付兼容接口，PID + Key，生成 submit.php 收银台链接并通过 MD5 回调验签",
		SupportedMethods: []string{MethodAlipay, MethodWxpay},
		FieldDescriptors: []FieldDescriptor{
			{Key: "pid", Label: "PID（商户 ID）", Type: "text", Required: true},
			{Key: "key", Label: "Key（商户密钥）", Type: "password", Required: true},
			{Key: "gateway", Label: "支付网关 URL", Type: "text",
				Placeholder: defaultZpayGateway,
				Description: "ZPAY 支付网关根 URL，不含 /submit.php；留空默认 https://zpayz.cn"},
			{Key: "cid", Label: "支付渠道 ID", Type: "text",
				Description: "可选。ZPAY 后台渠道 ID，多个用英文逗号分隔；留空则由 ZPAY 随机调用"},
			{Key: "enabled_methods", Label: "启用的支付方式", Type: "method-multi", Required: true,
				Description: "勾选该商户号在 ZPAY 上签约/启用的子通道；至少选一个"},
		},
	})
}

const defaultZpayGateway = "https://zpayz.cn"

func buildZpay(id string, enabled bool, config map[string]string) (Provider, error) {
	gateway := strings.TrimRight(strings.TrimSpace(config["gateway"]), "/")
	if gateway == "" {
		gateway = defaultZpayGateway
	}
	return &zpayProvider{
		id:             id,
		enabled:        enabled,
		pid:            strings.TrimSpace(config["pid"]),
		key:            strings.TrimSpace(config["key"]),
		gateway:        gateway,
		cid:            strings.TrimSpace(config["cid"]),
		enabledMethods: parseEnabledMethods(config["enabled_methods"], []string{MethodAlipay, MethodWxpay}),
	}, nil
}

type zpayProvider struct {
	id             string
	enabled        bool
	pid            string
	key            string
	gateway        string
	cid            string
	enabledMethods []string
}

func (p *zpayProvider) ID() string   { return p.id }
func (p *zpayProvider) Name() string { return "ZPAY支付 (" + p.id + ")" }
func (p *zpayProvider) Kind() string { return KindEpayZpay }
func (p *zpayProvider) SupportedMethods() []string {
	if len(p.enabledMethods) == 0 {
		return []string{MethodAlipay, MethodWxpay}
	}
	return p.enabledMethods
}
func (p *zpayProvider) Enabled() bool {
	return p.enabled && p.pid != "" && p.key != "" && p.gateway != ""
}

func (p *zpayProvider) CreateOrder(_ context.Context, in CreateOrderInput) (*CreateOrderResult, error) {
	if !p.Enabled() {
		return nil, ErrProviderDisabled
	}
	zpayType, ok := zpayMethodMap[in.Method]
	if !ok {
		return nil, ErrUnsupportedMethod
	}

	params := url.Values{}
	params.Set("pid", p.pid)
	params.Set("type", zpayType)
	params.Set("out_trade_no", in.OutTradeNo)
	params.Set("notify_url", in.NotifyURL)
	params.Set("return_url", in.ReturnURL)
	params.Set("name", in.Subject)
	params.Set("money", strconv.FormatFloat(in.Amount, 'f', 2, 64))
	if p.cid != "" {
		params.Set("cid", p.cid)
	}

	sign := signCaihong(params, p.key)
	params.Set("sign", sign)
	params.Set("sign_type", "MD5")

	paymentURL := p.gateway + "/submit.php?" + params.Encode()
	return &CreateOrderResult{
		PaymentURL: paymentURL,
		Raw:        flattenForm(params),
	}, nil
}

func (p *zpayProvider) VerifyCallback(_ context.Context, req CallbackRequest) (*CallbackResult, error) {
	if !p.Enabled() {
		return nil, ErrProviderDisabled
	}
	form := req.Form
	gotSign := form.Get("sign")
	if gotSign == "" {
		return nil, ErrInvalidSignature
	}
	wantSign := signCaihong(form, p.key)
	if !strings.EqualFold(gotSign, wantSign) {
		return nil, ErrInvalidSignature
	}

	amount, _ := strconv.ParseFloat(form.Get("money"), 64)
	status := "pending"
	if form.Get("trade_status") == "TRADE_SUCCESS" {
		status = "paid"
	}
	return &CallbackResult{
		OutTradeNo: form.Get("out_trade_no"),
		Status:     status,
		ChannelTxn: form.Get("trade_no"),
		Amount:     amount,
		Raw:        flattenForm(form),
		Reply:      "success",
		ReplyType:  "text",
	}, nil
}

var zpayMethodMap = map[string]string{
	MethodAlipay: "alipay",
	MethodWxpay:  "wxpay",
}

var _ Provider = (*zpayProvider)(nil)
