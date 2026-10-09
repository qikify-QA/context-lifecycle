# ImagenHub — tổng hợp tài liệu chính thức

Nguồn: https://docs.imagenhub.ai (đọc toàn bộ Guide + Teeinblue + MCP + API
Reference ngày 2026-08-27). Đây là kiến thức nền tảng về sản phẩm/API, không
phải quirk UI staging (xem các file khác trong `context/` cho phần đó).

## Tổng quan sản phẩm

ImagenHub là **Generative Media API** — gateway hợp nhất nhiều AI image
model (DALL-E 3, Flux, Stable Diffusion...) sau **một endpoint duy nhất**.

- Base URL (production): `https://api.imagenhub.ai/api`
- Bạn chọn model, ImagenHub tự route tới provider tốt nhất (hoặc bạn chỉ
  định provider cụ thể).
- Input format thống nhất bất kể model bên dưới.
- Billing: pay-per-request bằng credit (paid tier) hoặc rate-limit (free
  tier).
- Hỗ trợ BYOK (dùng key provider riêng) hoặc dùng subscription ImagenHub.
- Output ảnh trả về là URL **đã ký, hết hạn sau 1 giờ**.
  - ⚠️ Trên portal staging quy tắc này chỉ đúng với **ảnh full-size** (lightbox
    Run history, avatar template, ảnh input); **thumbnail là URL CDN công khai,
    không ký**. **IGH-261** đổi nhóm ảnh full-size sang URL công khai **không
    hết hạn** — đã có trên preview `public-image-urls` (đo 2026-10-01), chưa lên
    staging; cần dev xác nhận là thay đổi có chủ đích vì ảnh output khi đó xem
    được vĩnh viễn. Chi tiết: [template.md](template.md).

Site docs có 4 mục chính trên nav: **Guide**, **Teeinblue**, **MCP**,
**API Reference**.

## Authentication

Hai cơ chế song song:

| Method | Header | Dùng cho |
|---|---|---|
| API Key | `Authorization: Bearer sk_igh_...` | Programmatic access: `/process`, `/tasks/*`, `/models`, `/providers`, `/analytics/*` |
| JWT | `Authorization: Bearer eyJhbG...` | Dashboard/management: tạo template, quản lý API key, provider key, account |

- Login: `POST /auth/login` (email+password) → trả JWT.
- Refresh: `POST /auth/refresh`.
- OAuth: `GET /auth/{provider}` → callback `/auth/{provider}/callback` issue JWT.
- Một số endpoint catalog (`/models`, `/model-providers`) **public, không cần auth**.
- Lỗi: `401` thiếu/sai credential, `402` hết credit, `429` rate limited (free tier).

## Models & Providers

- **Model** = một AI model cụ thể (DALL-E 3, Flux Dev, SDXL...). Có `input`
  JSON schema (prompt, size, style...) và list `providers` kèm cost.
- **Provider** = bên thứ 3 host model (OpenAI, Fal.ai, Replicate...). Cùng
  1 model có thể có nhiều provider ở giá khác nhau.
- `GET /models` — list tất cả model, không cần auth.
- `GET /models/{id}` — chi tiết 1 model (input schema + providers).
- `GET /providers` — list provider (cần API key).
- `GET /model-providers` — mọi cặp model-provider kèm cost; filter bằng
  `?model_id=` hoặc `?provider_id=`.
- Routing khi gọi `/process`: tìm provider cho model → check có BYOK key
  không → route tới provider tốt nhất → transform input theo format
  provider → trả kết quả theo format thống nhất của ImagenHub. Có thể ép
  provider cụ thể bằng field `provider` trong body request.
- Input format mẫu: mỗi field là object `{ "type": "string", "content": "..." }`.

## Image Generation (`/process`)

```
POST /process
{
  "model_id": 1,              // HOẶC template_id (loại trừ nhau — cả 2 → 422)
  "prompt": { "type": "string", "content": "..." },
  "webhook_url": "...",        // optional, override default webhook cho request này
}
```

Task lifecycle: `created → processing → success` hoặc `→ error`.

- Polling: `GET /tasks/{id}` mỗi 1-2s tới khi `status` là `success`/`error`.
- Streaming (SSE): `GET /tasks/{id}/stream` — mỗi event là JSON task object,
  tự đóng khi tới `success`/`error`.
- Output khi success: `output` là mảng URL ảnh **ký, hết hạn 1 giờ** — phải
  download/serve ngay.
- Dùng template: truyền `template_id` thay vì `model_id` + toàn bộ param;
  `default_inputs` của template merge với request, giá trị request luôn
  ưu tiên hơn.
- Lỗi: `401` sai auth, `402` hết credit, `403` template không truy cập
  được, `422` validation lỗi, `429` rate limited.

## Webhooks

Hai loại **tách biệt hoàn toàn**, cấu hình ở 2 chỗ khác nhau nhưng chung
envelope + chữ ký:

### 1. Task callbacks
Báo 1 generation cụ thể xong (trả lời cho 1 request). Cấu hình ở portal
mục **Webhooks**: copy **signing secret**, set **default webhook URL**;
request có thể override bằng `webhook_url` trong body (`null` = tắt
callback cho request đó dù có default).

Payload mẫu:
```json
{
  "id": "evt_...",
  "type": "task.succeeded",   // hoặc "task.failed"
  "occurred_at": "2026-08-17T09:14:22+00:00",
  "data": {
    "task_id": "...", "url": "...", "status": "success",
    "post_processing_status": null, "model": "flux-schnell",
    "output": ["https://cdn.imagenhub.ai/outputs/.../0.png"],
    "error": null
  }
}
```
- `occurred_at` = lúc task xong, không phải lúc gửi attempt.
- Mọi key luôn có mặt (`null` nếu không áp dụng).
- `task.succeeded` vẫn có thể có `post_processing_status` báo hậu xử lý lỗi
  (ảnh vẫn có, nhưng không phải ảnh mong muốn).

### 2. Account alerts
Báo **điều kiện tài khoản** (không phải 1 generation) — kéo dài tới khi
được fix. Cấu hình ở portal mục **Alerts**, tối đa **10 channel**/account,
mỗi channel có URL riêng + list event riêng tick chọn.

2 loại channel:
| Kind | Nhận bởi | Body | Auth |
|---|---|---|---|
| HTTP endpoint | Server của bạn | Alert envelope nguyên bản | Standard Webhooks signature (org signing secret) |
| Lark | Group chat | Message card (editable) | Chữ ký riêng của Lark, nằm trong body |

Sự kiện subscribe được:
| Event | Báo gì | Gì clear nó |
|---|---|---|
| `task.failed` | 1 generation fail | Không gì cả — không phải condition, không tự hồi phục |
| `provider_key.insufficient_funds` | Key provider riêng hết tiền | Nạp tiền, clear khi generation kế tiếp thành công |
| `provider_key.invalid` | Key provider riêng bị reject | Thay key, clear khi generation kế tiếp thành công |
| `credits.exhausted` | Balance ImagenHub không đủ | Mua credit / chờ reset quota |

- `task.succeeded` **cố ý không** có trong list subscribe được của alert
  channel (đó là việc của task callback).
- Mỗi account condition gửi **đúng 2 lần** trong đời nó: lúc bắt đầu
  (`resolved_at: null`) và lúc hết (`resolved_at: <timestamp>`), cùng
  `alert_key` + `opened_at` để pair 2 event lại — không gửi gì ở giữa.
- Nếu condition bắt đầu và hết trước khi có channel subscribe → không nhận
  được event nào (không có recovery mồ côi).
- 1 event × N channel subscribe = N delivery riêng biệt (mỗi cái `id` +
  `webhook-id` riêng) — không collapse lại.
- Custom headers: tối đa 10 header/channel (để nhét bearer token...); các
  header hệ thống (`webhook-id`, `webhook-timestamp`, `webhook-signature`,
  `content-type`, `content-length`, `host`) không override được.
- **Test alert channel**: gửi sample message kèm `"test": true` ở top-level
  body — không lưu vào delivery board.

### Xác minh chữ ký (Standard Webhooks)
3 header: `webhook-id` (ổn định qua mọi retry), `webhook-timestamp`,
`webhook-signature` (HMAC-SHA256, có thể nhiều chữ ký cách nhau bởi space
khi đang rotate secret). Verify bằng lib `standardwebhooks` (JS/Python/Go/
Ruby/Java/C#/Rust/Elixir/PHP) trên **raw body** (chưa parse JSON).

### Delivery
- Retry 6 lần: ngay lập tức, +1p, +5p, +30p, +2h, +6h (~8.5 giờ tổng).
- Chỉ `2xx` tính là delivered (không follow redirect).
- At-least-once → dedupe theo `webhook-id`.
- Không đảm bảo thứ tự.
- Timeout response: **10 giây** — trả `2xx` ngay sau khi lưu event, xử lý
  sau (không block).
- Portal mục **Webhooks** hiện delivery count + failure rate 24h theo host.
- **Không nên phụ thuộc hoàn toàn vào webhook** — `GET /tasks/{id}` luôn là
  nguồn sự thật cuối cùng cho 1 task.

## Templates

Preset tái sử dụng: **model** + **default_inputs** (prompt prefix, size,
style...) + **extra input** (override riêng theo provider).

- Public (`user_id: null`) — mọi user dùng được, do hệ thống cung cấp.
- Private (`user_id: <bạn>`) — chỉ bạn thấy/dùng.
- `GET /templates` — list (private của bạn + toàn bộ public), hỗ trợ
  `?s=<search>` và `?page=`.
- `GET /templates/{id}` — chi tiết.
- Dùng trong `/process` qua `template_id`; `default_inputs` merge với
  request, giá trị request ưu tiên hơn.

## Organization

- Sign up tự tạo Organization, bạn là **Owner** ngay từ đầu.
- **Account** = login cá nhân, không sở hữu gì. **Organization** = sở hữu
  mọi thứ (template, media, credit, key). Rời org = mất quyền truy cập
  toàn bộ, không có "personal storage" theo account.
- 4 tab: **General** (đổi tên org, **Leave organization**), **Members**
  (roster + **Invite member**: email + role, link mời hạn 7 ngày, email
  match loose-case, không mời được người đã ở trong org, resend được khi
  còn pending), **Activity** (log hoạt động), **Roles** (ma trận quyền,
  **cố định, không tạo custom role được**).

| Area | Owner | Admin | Editor | Viewer |
|---|---|---|---|---|
| Templates | Manage | Manage | Manage | View |
| Generations | Manage | Manage | Manage | View |
| API keys | Manage | Manage | — | — |
| Billing | Manage | — | — | — |

- Credit balance còn lại **luôn visible cho mọi role** kể cả Viewer.
- Xoá org: liên hệ support, không tự phục vụ được.
- Rời org: template **không phục hồi lại được**.

## Analytics

- `GET /analytics/requests` — log chi tiết mọi API request (model,
  provider, status, cost, duration). Filter: `model_id`, `api_key_id`,
  `status` (`success`/`user_error`/`error`), `start`/`end` (default 24h),
  `sort_by` (`ended_at` default hoặc `duration`). Pagination cursor-based
  (`?limit=`, `?cursor=`).
- `GET /analytics/requests/filters` — lấy giá trị filter khả dụng (build UI
  dropdown).
- `GET /analytics/usage?timeframe=hour|day|week|month` — cost/request count
  theo bucket thời gian + `summary`.
- `GET /analytics/metrics?model_id=&timeframe=` — success/error count +
  latency percentile p50/p75/p90 cho 1 model.

## BYOK (Bring Your Own Keys)

- Lưu key provider riêng qua API (JWT auth), mã hoá **AES-256 at rest**,
  chỉ decrypt lúc gọi provider, **không bao giờ trả full key qua API**
  (list ra dạng masked `sk-proj-...abc`).
- `POST /provider-keys` `{ provider_id, key }` — 1 key/user/provider, key
  mới ghi đè key cũ.
- `GET /provider-keys` — list (masked).
- `DELETE /provider-keys/{id}` — soft-delete (giữ lại cho audit).
- Flow: request → check có BYOK key không → có thì dùng, tính theo giá
  provider trực tiếp; không có thì dùng system key, trừ credit ImagenHub.
- Benefit: giá trực tiếp từ provider (thường rẻ hơn ở volume lớn), rate
  limit cao hơn theo account riêng, tự fallback về key hệ thống nếu key
  riêng fail/hết token (**Fail-Safe**, không gián đoạn service).

## Rate Limits & Credits

- **Free tier**: giới hạn request/phút và /ngày, vượt → `429` +
  `{"error":{"type":"rate_limit_exceeded",...}}`, check header
  `Retry-After`. Header mọi response: `X-RateLimit-Limit-Minute`,
  `X-RateLimit-Remaining-Minute`, `X-RateLimit-Limit-Day`,
  `X-RateLimit-Remaining-Day`.
- **Paid tier**: không rate limit, trừ credit theo cost model-provider.
  Header: `X-Credits-Used`, `X-Credits-Remaining` (hoặc `"unlimited"`). Hết
  credit → `402` kèm `credit_limit`, `credits_used`, `resets_at`.
- Cost mỗi cặp model-provider xem ở field `cost` trong `GET /model-providers`.
- BYOK: cost tính vào tài khoản provider của bạn trực tiếp; ImagenHub credit
  vẫn có thể trừ tuỳ plan.
- Check balance nhanh: `GET /ping` (trả `key.credit_limit`,
  `key.credits_used`, `key.credits_remaining`, `user.tier`).

## Dynamic Upload Ratio (Auto ratio) — quan trọng cho Teeinblue

**Vấn đề giải quyết**: bình thường 1 template bị khoá cứng 1 aspect ratio →
muốn dùng lại (VD hiệu ứng "Van Gogh") cho nhiều size khác nhau (poster
dọc, avatar vuông, banner ngang) thì phải clone template 3 lần, dễ lệch.

**Giải pháp**: đặt ratio của template = **Auto** (thêm vào cuối dropdown
size của model, sau các ratio cố định) → template hết quan tâm shape cố
định trước, mà lấy shape từ chính ảnh input mỗi lần gọi.

Cách hoạt động:
1. Width/height của ảnh input đi kèm request.
2. ImagenHub chọn **ratio khả dụng gần nhất mà model đó hỗ trợ** —
   **orientation luôn giữ nguyên** (ảnh ngang vào → ra ngang, không bao giờ
   lật dọc bất ngờ).
3. Ratio đã resolve đó là ratio thật sự được generate.

Lưu ý quan trọng:
- **Snap tới option gần nhất, không tự bịa ra** — VD ảnh lạ 1000×1010 →
  snap về ratio vuông gần nhất, không lỗi.
- **Không có dimension → fallback về ratio mặc định của model**, vẫn chạy
  bình thường.
- Template ratio cố định **không bị ảnh hưởng gì**, hành vi y hệt trước.
- ⚠️ **Ratio cố định luôn thắng Auto** — nếu template set 1 size cụ thể
  (không phải Auto) thì size đó áp dụng, bỏ qua shape ảnh input. Nếu 1
  template Auto cứ ra ảnh vuông → **check lại xem có thật sự set Auto hay
  đang bị set nhầm về 1 size cố định**.
- `auto` phiên bản cũ (nghĩa "để provider tự chọn") đã **bị retire hoàn
  toàn**, thay bằng nghĩa mới "khớp shape ảnh gửi vào".
- Model kiểu **raw-dimension** (nhận width/height tự do, không có ratio
  list) → không có gì để Auto hook vào, dimension gửi vào **chính là**
  output size luôn.

### Dùng với Teeinblue
Đây chính là use case Auto được sinh ra: 1 artwork library Teeinblue có
layer đủ size khác nhau (portrait 2160×3840, square 2048×2048, print
1600×1600...) — dùng chung **1 template** ImagenHub nhờ Auto, không cần
tạo bản riêng cho từng shape.

Setup: trong Artwork Editor, tạo **Photo Upload layer** đúng ratio mong
muốn cho artwork đó (dọc/vuông/ngang tuỳ nghệ thuật) → mở personalization
settings của layer → gắn template ImagenHub vào mục **ImagenHub Template**
(Image effects). Sau đó tự động: khách upload ảnh vào layer → Auto snap
theo ratio gần nhất model hỗ trợ cho shape của layer đó → ảnh ra khớp với
artwork. Ratio set 1 lần ở layer, mọi ảnh khách upload sau đó tự khớp theo.

## Teeinblue Integration (5 trang riêng, mục "Teeinblue" trên nav)

ImagenHub là app quản lý AI model **độc lập**, tích hợp native vào
Teeinblue chứ không phụ thuộc nó.

Tính năng nổi bật khi tích hợp:
- **Multi-Model Templates** — gán model/prompt riêng cho từng template,
  chạy nhiều model song song.
- **Prompt Security** — prompt giấu trong data structure, **không lộ qua
  client-side console inspection**.
- **Flexible API Access** — dùng key provider riêng hoặc subscription
  ImagenHub.
- **Fail-Safe Redundancy** — key riêng hết token → tự fallback sang mạng
  ImagenHub, không gián đoạn.

### Bước setup đầy đủ
1. **Tạo API key** (ImagenHub Dashboard → **API Keys** → **Create Key**,
   optional set Credit Limit/Expiration, copy ngay vì **chỉ hiện 1 lần**)
   → paste vào **Teeinblue Portal → Extras → 3rd-party Services → GenAI
   Effect**.
2. **Chọn cách cấp quyền model**: BYOK (key provider riêng, tự kiểm soát
   billing/usage) hoặc ImagenHub Subscription (dùng ngay full model
   library, không cần quản lý credential riêng). Có Fail-Safe tự động
   nếu chọn BYOK mà hết token.
3. **Tạo Template** ở trang Templates của ImagenHub — trang này là "trung
   tâm chỉ huy": Organize (xem template + config), Edit (đổi prompt/model/
   setting), Monitor (xem output cũ trong detail view). Tạo mới: import
   từ preset hoặc **+ New Template** → chọn model → đặt tên, viết prompt,
   config (panel giống Teeinblue). Test bằng nút **Try it** → playground
   → upload ảnh → **Run**. ⚠️ Phải set đúng **Aspect Ratio** và
   **Resolution** trước khi dùng trong Teeinblue — ảnh hưởng trực tiếp
   chất lượng/composition output.
4. **Wire vào Teeinblue**: Artwork Editor → tạo **Photo Upload Layer** →
   mục **Gen AI Effect** → chọn **"[ImagenHub] AI Effect"** → chọn template
   đã tạo từ list.

Kết quả: mỗi Photo Upload Layer trong product gán được template riêng —
không còn giới hạn 1 model cho toàn store, mix & match tự do.

## MCP Server

Cùng 1 sản phẩm/account/credit/template/task với REST API, expose qua
Model Context Protocol để AI agent (Claude...) gọi trực tiếp bằng tool
thay vì viết HTTP request tay.

- Endpoint: `https://api.imagenhub.ai/mcp/imagenhub` (Streamable HTTP).
- Auth: API key (giống REST), agent không thấy key — MCP client giữ và gửi.
- 6 tool: `list-templates`, `get-template`, `list-models`, `generate-image`
  (async, trả task id `created`), `get-task` (poll tới `success`),
  `list-tasks` (xem lịch sử).
- Mỗi lần generate thành công vẫn trừ credit như REST API.
- Dùng MCP khi: muốn agent điều khiển ImagenHub hội thoại/tự trị, client
  đã hỗ trợ MCP sẵn (Claude Desktop, Claude Code...). Dùng REST khi: viết
  code app gọi trực tiếp, cần control chi tiết từng request.

## API Reference — endpoint map đầy đủ

Base URL: `https://api.imagenhub.ai/api`. Response luôn bọc trong
`{ "data": ... }`; list endpoint có thêm `meta` (pagination:
`current_page`, `last_page`, `per_page`, `total`).

Bảng lỗi chuẩn:
| Status | Type | Nghĩa |
|---|---|---|
| 401 | `unauthenticated` | Thiếu/sai credential |
| 402 | `credit_limit_exceeded` | Hết credit, kèm `resets_at` |
| 403 | `forbidden` | Không có quyền với resource |
| 404 | `not_found` | Resource không tồn tại |
| 422 | `validation_error` | Body request sai |
| 429 | `rate_limit_exceeded` | Free tier rate limit, check `Retry-After` |

Danh sách endpoint theo nhóm:
- **Utility**: `GET /ping`
- **Catalog**: `GET /models`, `GET /models/{id}`, `GET /providers`,
  `GET /model-providers`
- **Processing**: `POST /process`, `GET /tasks/{id}`,
  `GET /tasks/{id}/stream`
- **Templates**: `GET /templates`, `GET /templates/{id}`
- **Analytics**: `GET /analytics/requests`,
  `GET /analytics/requests/filters`, `GET /analytics/usage`,
  `GET /analytics/metrics`

## Sơ đồ trang docs (để tra cứu lại)

- `/guide/getting-started`, `/guide/quickstart`, `/guide/authentication`,
  `/guide/models-and-providers`, `/guide/image-generation`,
  `/guide/webhooks`, `/guide/templates`, `/guide/organization`,
  `/guide/analytics`, `/guide/byok`, `/guide/rate-limits`,
  `/guide/dynamic-upload-ratio`
- `/teeinblue/`, `/teeinblue/api-keys`, `/teeinblue/model-access`,
  `/teeinblue/templates`, `/teeinblue/integration`
- `/mcp/`, `/mcp/connecting`, `/mcp/tools`
- `/api/` (overview) + trang riêng cho từng endpoint

⚠️ **Quirk của chính doc site**: điều hướng trực tiếp (hard navigate/gõ
URL rồi Enter) vào bất kỳ sub-route nào trả về **404** dù title đúng — đây
là site SPA (VitePress-like), phải **click link trong app** (client-side
routing) thì nội dung mới render đúng trong `<main>`. Hard-reload để lại
`main` rỗng.
