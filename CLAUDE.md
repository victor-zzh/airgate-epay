# airgate-epay — Claude 开发指南

> 叠加在 monorepo 根 `../CLAUDE.md` 之上。完整流程见共享 skill **`develop-plugin`**；接口契约见 `../airgate-sdk/CLAUDE.md`。

- **插件身份**：id `payment-epay`，type `extension`，作用 = 支付渠道。
- 实现 `sdk.ExtensionPlugin`：提供支付相关 API / 回调处理；余额/订单落库等核心账务仍归 **core**，经 `Host.Invoke` 协作。

## 🚫 红线

- 只依赖 `airgate-sdk`，禁止 import core 内部；用 core 能力经 `Host.Invoke`/`InvokeStream`。
- `plugin.yaml` 由 `make manifest` 生成，不可手改。
- 支付回调/签名校验属敏感逻辑，改动务必配套测试，别绕过校验。
- 前端单 `index.js` → `web/dist/index.js`，用 `@doudou-start/airgate-theme`。

## 命令

`make dev`（独立调试）· `make manifest` · `make build` · `make ci` · `make release`
