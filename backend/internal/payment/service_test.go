package payment

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"regexp"
	"strings"
	"testing"

	sqlmock "github.com/DATA-DOG/go-sqlmock"

	sdk "github.com/DouDOU-start/airgate-sdk/sdkgo"

	"github.com/DouDOU-start/airgate-epay/backend/internal/payment/provider"
)

// fakeHost 记录所有 Invoke 调用；invokeFn 可注入按序失败等行为。
type fakeHost struct {
	calls    []sdk.HostInvokeRequest
	invokeFn func(call int, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error)
}

func (h *fakeHost) Invoke(_ context.Context, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
	h.calls = append(h.calls, req)
	if h.invokeFn != nil {
		return h.invokeFn(len(h.calls), req)
	}
	return &sdk.HostInvokeResponse{Status: "ok"}, nil
}

func (h *fakeHost) InvokeStream(context.Context, sdk.HostStreamRequest) (sdk.HostStream, error) {
	return nil, errors.New("not implemented")
}

func testLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(io.Discard, nil))
}

// expectMarkPaidSelect 预置 markPaid 第 1 步的订单查询
func expectMarkPaidSelect(mock sqlmock.Sqlmock, amount, bonus float64, status string) {
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT id, user_id, amount, COALESCE(bonus_amount, 0), status, method, provider_id FROM payment_orders`)).
		WithArgs("AG_TEST_NO").
		WillReturnRows(sqlmock.NewRows(
			[]string{"id", "user_id", "amount", "bonus_amount", "status", "method", "provider_id"},
		).AddRow(int64(7), int64(42), amount, bonus, status, "alipay", "xunhu_1"))
}

func expectMarkPaidUpdate(mock sqlmock.Sqlmock) {
	mock.ExpectExec(regexp.QuoteMeta(`UPDATE payment_orders`)).
		WillReturnResult(sqlmock.NewResult(0, 1))
}

// expectPaidCountSelect 预置 notifyTopup 的"已支付订单数"查询（first_topup 判定）。
func expectPaidCountSelect(mock sqlmock.Sqlmock, paidCount int64) {
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT COUNT(*) FROM payment_orders WHERE user_id = $1 AND status = 'paid'`)).
		WithArgs(int64(42)).
		WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(paidCount))
}

// callsByMethod 按 method 过滤 host 调用。
func callsByMethod(host *fakeHost, method string) []sdk.HostInvokeRequest {
	var out []sdk.HostInvokeRequest
	for _, call := range host.calls {
		if call.Method == method {
			out = append(out, call)
		}
	}
	return out
}

func paidCallback() *provider.CallbackResult {
	return &provider.CallbackResult{
		OutTradeNo: "AG_TEST_NO",
		Status:     "paid",
		Amount:     100,
		Raw:        map[string]string{"trade_status": "SUCCESS"},
	}
}

func TestMarkPaidWithBonusCreditsCombinedAmountInOneCall(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 15, "pending")
	expectPaidCountSelect(mock, 0)
	expectMarkPaidUpdate(mock)

	if err := svc.markPaid(context.Background(), paidCallback()); err != nil {
		t.Fatalf("markPaid: %v", err)
	}
	// 本金+赠送必须合并成一次 update_balance：拆成两次会在两次调用之间出现"本金已到账、
	// 订单仍 pending"的中间态，一旦被 ExpirePendingOrders 判过期，赠送额度就永久丢失
	// 且无法通过回调重试恢复（见 markPaid 里的注释）。
	credits := callsByMethod(host, "users.update_balance")
	if len(credits) != 1 {
		t.Fatalf("update_balance calls = %d, want 1（本金+赠送必须合并为一次调用，不能拆成两次）", len(credits))
	}
	if key := credits[0].Payload["idempotency_key"]; key != "epay:AG_TEST_NO" {
		t.Fatalf("idempotency_key = %v, want epay:AG_TEST_NO", key)
	}
	if amt := credits[0].Payload["amount"]; amt != 115.0 {
		t.Fatalf("amount = %v, want 115 (100 本金 + 15 赠送)", amt)
	}
	if remark, _ := credits[0].Payload["remark"].(string); !strings.Contains(remark, "赠送") {
		t.Fatalf("remark = %q, want 包含「赠送」", remark)
	}
	// 入账成功后应通知充值事件：返利基数是实付本金（100），不含赠送；首单 first_topup=true
	notifies := callsByMethod(host, "users.notify_topup")
	if len(notifies) != 1 {
		t.Fatalf("notify_topup calls = %d, want 1", len(notifies))
	}
	if amt := notifies[0].Payload["paid_amount"]; amt != 100.0 {
		t.Fatalf("notify paid_amount = %v, want 100（实付本金，不含赠送）", amt)
	}
	if first := notifies[0].Payload["first_topup"]; first != true {
		t.Fatalf("notify first_topup = %v, want true", first)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

func TestMarkPaidWithoutBonusSingleEntry(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 0, "pending")
	expectPaidCountSelect(mock, 3)
	expectMarkPaidUpdate(mock)

	if err := svc.markPaid(context.Background(), paidCallback()); err != nil {
		t.Fatalf("markPaid: %v", err)
	}
	if credits := callsByMethod(host, "users.update_balance"); len(credits) != 1 {
		t.Fatalf("update_balance calls = %d, want 1（无赠送不应产生第二条流水）", len(credits))
	}
	// 已有 3 笔 paid 订单：first_topup 必须为 false
	notifies := callsByMethod(host, "users.notify_topup")
	if len(notifies) != 1 || notifies[0].Payload["first_topup"] != false {
		t.Fatalf("notify_topup = %+v, want 1 次且 first_topup=false", notifies)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

func TestMarkPaidInvokeFailureKeepsOrderPendingWithNoPartialCredit(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{invokeFn: func(int, sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
		return nil, errors.New("core unavailable")
	}}
	svc := &Service{logger: testLogger(), db: db, host: host}

	// 只预置 SELECT——入账失败后不应执行 UPDATE（订单保持 pending 等回调重试）。
	// 本金+赠送是同一次 Invoke，失败就是全失败，不存在"本金到账、赠送没到账"的中间态。
	expectMarkPaidSelect(mock, 100, 15, "pending")

	err = svc.markPaid(context.Background(), paidCallback())
	if err == nil || !strings.Contains(err.Error(), "入账失败") {
		t.Fatalf("markPaid err = %v, want 入账失败", err)
	}
	if len(host.calls) != 1 {
		t.Fatalf("invoke calls = %d, want 1", len(host.calls))
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations（入账失败不应标记 paid）: %v", err)
	}
}

// 充值事件通知失败：订单保持 pending 等回调重试（update_balance 幂等键保证重试不重复加钱）。
func TestMarkPaidNotifyTopupFailureKeepsOrderPending(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{invokeFn: func(call int, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
		if req.Method == "users.notify_topup" {
			return nil, errors.New("core internal error")
		}
		return &sdk.HostInvokeResponse{Status: "ok"}, nil
	}}
	svc := &Service{logger: testLogger(), db: db, host: host}

	// 预置 SELECT + COUNT，不预置 UPDATE——通知失败后不应标记 paid
	expectMarkPaidSelect(mock, 100, 0, "pending")
	expectPaidCountSelect(mock, 0)

	err = svc.markPaid(context.Background(), paidCallback())
	if err == nil || !strings.Contains(err.Error(), "充值事件通知失败") {
		t.Fatalf("markPaid err = %v, want 充值事件通知失败", err)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations（通知失败不应标记 paid）: %v", err)
	}
}

// first_topup 计数查询失败：订单保持 pending 等重试，不带着未知的首充判定继续。
func TestMarkPaidNotifyCountQueryFailureKeepsOrderPending(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 0, "pending")
	mock.ExpectQuery(regexp.QuoteMeta(`SELECT COUNT(*) FROM payment_orders`)).
		WillReturnError(errors.New("db down"))

	err = svc.markPaid(context.Background(), paidCallback())
	if err == nil || !strings.Contains(err.Error(), "已支付订单数") {
		t.Fatalf("markPaid err = %v, want 计数失败", err)
	}
	if notifies := callsByMethod(host, "users.notify_topup"); len(notifies) != 0 {
		t.Fatal("计数失败不应发通知")
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations（计数失败不应标记 paid）: %v", err)
	}
}

// core 返回业务 error 响应体（resp.Status=error）：与传输错误同样保持 pending 重试。
func TestMarkPaidNotifyRespErrorKeepsOrderPending(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{invokeFn: func(call int, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
		if req.Method == "users.notify_topup" {
			return &sdk.HostInvokeResponse{Status: "error", Payload: map[string]interface{}{"message": "boom"}}, nil
		}
		return &sdk.HostInvokeResponse{Status: "ok"}, nil
	}}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 0, "pending")
	expectPaidCountSelect(mock, 0)

	err = svc.markPaid(context.Background(), paidCallback())
	if err == nil || !strings.Contains(err.Error(), "充值事件通知失败") {
		t.Fatalf("markPaid err = %v, want 通知失败", err)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

// capability 未随包更新（manifest 错位）：与老 core 同样降级放行，不阻塞支付。
func TestMarkPaidNotifyCapabilityDeniedDegrades(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{invokeFn: func(call int, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
		if req.Method == "users.notify_topup" {
			return nil, errors.New(`rpc error: code = PermissionDenied desc = plugin "payment-epay" lacks host invoke capability for method "users.notify_topup"`)
		}
		return &sdk.HostInvokeResponse{Status: "ok"}, nil
	}}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 0, "pending")
	expectPaidCountSelect(mock, 0)
	expectMarkPaidUpdate(mock)

	if err := svc.markPaid(context.Background(), paidCallback()); err != nil {
		t.Fatalf("markPaid: %v（capability 拒绝应降级放行）", err)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

// 老 core 不支持 users.notify_topup：降级放行，支付照常完成。
func TestMarkPaidNotifyTopupUnsupportedDegrades(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{invokeFn: func(call int, req sdk.HostInvokeRequest) (*sdk.HostInvokeResponse, error) {
		if req.Method == "users.notify_topup" {
			return nil, errors.New("rpc error: code = Unimplemented desc = unknown host method: users.notify_topup")
		}
		return &sdk.HostInvokeResponse{Status: "ok"}, nil
	}}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 0, "pending")
	expectPaidCountSelect(mock, 0)
	expectMarkPaidUpdate(mock)

	if err := svc.markPaid(context.Background(), paidCallback()); err != nil {
		t.Fatalf("markPaid: %v（老 core 应降级放行，不能阻塞支付）", err)
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

func TestMarkPaidIdempotentWhenAlreadyPaid(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("sqlmock: %v", err)
	}
	defer func() { _ = db.Close() }()

	host := &fakeHost{}
	svc := &Service{logger: testLogger(), db: db, host: host}

	expectMarkPaidSelect(mock, 100, 15, "paid")

	if err := svc.markPaid(context.Background(), paidCallback()); err != nil {
		t.Fatalf("markPaid: %v", err)
	}
	if len(host.calls) != 0 {
		t.Fatalf("invoke calls = %d, want 0（已支付订单不应重复入账）", len(host.calls))
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Fatalf("sql expectations: %v", err)
	}
}

func TestUpsertPackageValidation(t *testing.T) {
	// 校验失败发生在任何 DB 访问之前，db 传 nil 即可
	svc := &Service{logger: testLogger(), minAmount: 1, maxAmount: 10000}

	cases := []struct {
		name    string
		in      UpsertPackageInput
		wantErr string
	}{
		{"金额为零", UpsertPackageInput{Amount: 0, BonusAmount: 5}, "必须大于 0"},
		{"金额为负", UpsertPackageInput{Amount: -10, BonusAmount: 0}, "必须大于 0"},
		{"赠送为负", UpsertPackageInput{Amount: 100, BonusAmount: -1}, "不能为负数"},
		{"低于单笔下限", UpsertPackageInput{Amount: 0.5, BonusAmount: 0}, "单笔限额"},
		{"超过单笔上限", UpsertPackageInput{Amount: 99999, BonusAmount: 0}, "单笔限额"},
		{"标题过长", UpsertPackageInput{Amount: 100, BonusAmount: 15, Title: strings.Repeat("超", 65)}, "过长"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			_, err := svc.UpsertPackage(context.Background(), tc.in)
			if err == nil || !strings.Contains(err.Error(), tc.wantErr) {
				t.Fatalf("err = %v, want 包含 %q", err, tc.wantErr)
			}
		})
	}
}
