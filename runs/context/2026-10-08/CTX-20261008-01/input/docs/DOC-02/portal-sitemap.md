# Portal sitemap — toàn bộ trang đã khảo sát

Ngày xác nhận: 2026-08-30, tài khoản "HUB 1" ([REDACTED]) trên
`https://staging-app.imagenhub.ai`. Đăng nhập bằng Email/Password form
(không có session Chrome sẵn như TIB — phải gõ password thật, chỉ làm sau
khi user xác nhận tường minh trong chat, không tự ý gõ dù có sẵn trong
`.env`).

## Sidebar đầy đủ (khớp docs, trừ 2 mục Beta mới)

| Nhóm | Trang | Route |
|---|---|---|
| Chính | Dashboard | `/dashboard` |
| | Models | `/models` |
| | Templates | `/templates` |
| | **Batch** (Beta) | `/batch` — xem [batch.md](batch.md) |
| | **Design** (Beta) | `/design` — xem [design.md](design.md) |
| | Task history | `/tasks` |
| Dev | API Keys | `/api-keys` |
| | Provider Keys (BYOK) | `/provider-keys` |
| | Webhooks | `/webhooks` |
| | Alerts | `/alerts` |
| | AI Assistant (MCP) | `/mcp` |
| Account | Organization | `/settings/organization/general` (tab General/Members/Activity/Roles) |
| | Feature Requests | `/feature-requests` — **đang lỗi**, xem [known-bugs.md](known-bugs.md) |
| | Subscription | `/subscription` |

## Ghi nhận theo từng trang

- **Dashboard**: "Good morning, HUB" — greeting theo org name. Card Active
  plan + Credits remaining, "Recently Used" (model gần dùng), "Latest
  generations" (load async, có `Loading...` thoáng qua lúc đầu).
- **Models** (`/models`): **37 model** tổng, 12/trang, filter theo
  All/Image-to-Image/Text-to-Image + owner. Có model nội bộ Teeinblue
  (`teeinblue/image-edits` ~1cr, `teeinblue/upscaler_imageAI` ~5cr,
  `teeinblue/resize-image` ~1cr, `teeinblue/remove-background`) và model
  ngách như `sculptok/depth-map` (~40cr, "grayscale depth-map... for
  embossed/relief print layers" — rõ ràng phục vụ POD).
- **Templates** (`/templates`): **123 template** trong org này, nhiều cái
  đặt tên `[TIB] ...` / `Test DUR - ...` / `Test Dynamic Upload Ratio ...`
  — dữ liệu test có chủ đích cho tính năng Dynamic Upload Ratio + TIB
  integration (xem [imgh.md](imgh.md)).
- **Task history** (`/tasks`): bảng đầy đủ Task/Template/Status/
  Post-processing/Est. Cost/Duration/Time. Cột **Est. Cost** phân biệt rõ
  nguồn credit: `"4 Credits"` (trừ credit ImagenHub) vs `"Your key"` (dùng
  BYOK provider key, không trừ credit ImagenHub) vs kết hợp `"Your key
  +10 credits"` (main model dùng BYOK, nhưng post-processing step vẫn trừ
  credit hệ thống) — khớp chính xác cơ chế BYOK + Fail-Safe trong docs.
  Có cả status `Error` (VD Flux/Google task lỗi do key/provider) để test
  negative case.
- **API Keys** (`/api-keys`) & **Provider Keys** (`/provider-keys`): đã
  verify tạo/xoá thật cả 2 — xem [api-provider-keys.md](api-provider-keys.md).
  Đính chính: key mới tạo có prefix `sk_igh_...` đúng docs, 4 key cũ
  `sk_test_...` chỉ là quy ước đặt tên cũ trước đây, không phải khác biệt
  môi trường. Provider Keys: 3 key BYOK healthy sẵn có — Flux, Google,
  remove.bg, khớp với các task "Your key" thấy ở Task history; thêm key
  cho provider đã có sẽ ghi đè, không tạo dòng mới.
- **Webhooks** (`/webhooks`) & **Alerts** (`/alerts`): đã khám phá sâu +
  verify tạo/xoá channel thật, xem [webhooks-alerts.md](webhooks-alerts.md).
  ⚠️ Phát hiện: token webhook.site của org test đã hết hạn (404) — mọi
  webhook/alert đang trỏ URL đó hiện không hoạt động thật sự.
- **AI Assistant (MCP)** (`/mcp`): đã khám phá sâu cả 3 tab, xem
  [mcp-setup.md](mcp-setup.md). **Lưu ý khác docs**: endpoint MCP ở
  staging là `https://staging-api.imagenhub.ai/mcp` (không có suffix
  `/imagenhub` như docs mô tả cho prod) — môi trường staging dùng path
  ngắn hơn. Claude Desktop cần bridge `mcp-remote` (chỉ nói stdio).
- **Organization**: org "HUB 1", 4 tab đúng docs — đã khám phá sâu, xem
  [organization.md](organization.md) (roster 6 member, quirk tên leak
  Shopify GID, audit log Activity đã verify, ma trận Roles khớp docs).
  Chưa thử đổi tên/leave/invite/change role thật (tránh phá dữ liệu chung
  org test hoặc tự khoá quyền).
- **Subscription** (`/subscription`) & **Plans** (`/pricing`): đã khám
  phá sâu, xem [subscription-pricing.md](subscription-pricing.md) — Pro
  Plan $19/month (2,000 credit/tháng), Overage limit pay-as-you-go
  ($0.01/credit, max $30/tháng), modal Buy credits 6 gói. Bonus credits
  giảm dần đúng theo mỗi lần chạy test generation (2,301 → 2,280 qua
  nhiều session) — xác nhận credit tracking hoạt động đúng real-time.

## Trạng thái khảo sát (cập nhật 2026-08-31)

**Cả 14 trang trong sidebar đã ghé qua ít nhất 1 lần** (bảng đầu file).
13/14 có file riêng chi tiết; ngoại lệ:
- **Dashboard** (`/dashboard`) — mới chỉ ghi chú nhẹ ở mục trên, chưa có
  file riêng (trang khá đơn giản: greeting + card credits + 2 widget
  Recently Used/Latest generations, không có form/action gì để test sâu
  hơn).
- **Feature Requests** (`/feature-requests`) — **không thể khảo sát sâu
  hơn** vì trang lỗi 500 vĩnh viễn, xem [known-bugs.md](known-bugs.md).

## Hành động cụ thể còn lại chưa test (trong các trang đã khám phá)

Đều là hành động rủi ro cao / cần dữ liệu thật không có sẵn — chủ đích
bỏ qua để không phá org test dùng chung hoặc tự khoá quyền/tốn tiền thật:

| Hành động | Trang | Lý do bỏ qua |
|---|---|---|
| Rotate signing secret | Webhooks | Bị chính Claude Code chặn (phá signature verification hiện tại) |
| Submit Provider Key thật | Provider Keys | Không có key thật provider nào để test an toàn |
| Manage billing (Stripe portal) | Subscription | Có thể đổi/huỷ subscription thật, lộ thông tin thẻ |
| Buy credits thật | Subscription | Thanh toán thật |
| Bật Overage limit thật | Subscription | Có thể phát sinh phí thật ($0.01/credit) |
| Downgrade Pro → Free | Pricing | Mất quyền lợi Pro của org dùng chung |
| Leave organization | Organization | Không thể tự undo dễ dàng |
| Change role / Remove member thật | Organization | Rủi ro tự khoá quyền hoặc xoá nhầm người thật |
| Gửi invite email thật | Organization | Spam email người thật |
| Import (clone) public template | Templates | Chưa cần thiết, tránh thêm rác vào 123 template hiện có |
| Mission **Redesign** | Design | Mới test Clone, chưa test Redesign |
| Nút **Restore** | Task History | Chưa rõ hành vi chính xác, sợ side-effect ngoài ý muốn |
| Upload > 250 ảnh | Batch/Design | Boundary test chưa làm |

Nếu bạn muốn, mình có thể bắt đầu test 1 trong các mục trên (ưu tiên cái
ít rủi ro nhất trước, VD **Design mission Redesign** hoặc **Restore
button** ở Task History).

Related: [imgh.md](imgh.md), [batch.md](batch.md), [design.md](design.md),
[model.md](model.md), [template.md](template.md),
[api-provider-keys.md](api-provider-keys.md), [organization.md](organization.md),
[webhooks-alerts.md](webhooks-alerts.md), [subscription-pricing.md](subscription-pricing.md),
[mcp-setup.md](mcp-setup.md), [known-bugs.md](known-bugs.md).
