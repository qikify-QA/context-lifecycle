# Models — catalog & trang chi tiết model

Ngày xác nhận: 2026-08-30, tài khoản "HUB 1". Route: `/models` (list),
`/models/{owner}%2F{model-slug}[%2Fedit]` (detail). Đây là ghi chú từ
khảo sát thực tế portal — kiến thức nền sản phẩm/API xem
[imgh.md](imgh.md).

## List page (`/models`)

**37 model tổng** — filter theo type tách rõ:
- All: 37
- Image To Image (`?type=image-to-image`): 13
- Text To Image (`?type=text-to-image`): 24

Phân trang 12/trang, param `?page=N`. Search có quick-filter preset: Nano
banana, Gpt image, Flux, Seedream, Google, Openai, Remove background,
Upscale.

**Filter theo owner** (dropdown "All owners", param `?owner=<slug>`) —
14 owner với số model kèm theo (đếm này **không lọc theo type đang chọn**,
là tổng số biến thể của owner đó across cả 2 type + main/edit variant):

| Owner | Số lượng |
|---|---|
| Black Forest Labs | 10 |
| Google | 10 |
| OpenAI | 9 |
| Teeinblue | 7 |
| Recraft | 6 |
| ByteDance | 5 |
| Microsoft | 3 |
| Reve | 3 |
| xAI | 3 |
| Bria | 1 |
| Ideogram | 1 |
| remove.bg | 1 |
| SculptOK | 1 |
| Upscayl | 1 |

## Model "nội bộ" Teeinblue (owner = Teeinblue, 7 model)

Đây là các thao tác xử lý ảnh Teeinblue tự vận hành, wrap qua ImagenHub
như 1 "model" bình thường để dùng chung trong Template/Batch/Design:

| Model | Slug | Cost | Mô tả |
|---|---|---|---|
| Image edits | `teeinblue/image-edits` | ~1cr | Image edits operations via the Teeinblue image-effects service |
| Upscaler for AI Image | `teeinblue/upscaler_imageAI` | ~5cr | Cho ảnh art/draw/fiction/AI, không dùng cho ảnh thực tế |
| Resize Image | `teeinblue/resize-image` | ~1cr | Resize giữ tỉ lệ (aspect-preserving) |
| Remove background on color | `teeinblue/remove-background-on-color` | ~4cr | Xoá nền theo màu (mới cập nhật 2026-08 — xem announcement banner trên portal: "cleaner, more consistent edges on solid-color/two-tone backgrounds") |
| Face cutout | `teeinblue/facecutout` | ~1cr | Face cutout of TIB |
| Remove Background | `teeinblue/remove-background` | ~10cr | Remove background dùng chính engine Teeinblue |
| Upscaler TIB | `teeinblue/upscaler` | ~2cr | Upscaler of TIB |

## Model đáng chú ý khác (không phải Teeinblue)

- `sculptok/depth-map` (~40cr, image-to-image) — "Generates a grayscale
  depth-map from a flat image, for embossed/relief print layers" — model
  ngách rõ ràng phục vụ POD (in nổi/relief).
- `upscayl-standard-4x` (~10cr) — open-source upscaler Upscayl.
- Dòng **Recraft** (6 model: v3/v3 Vector/v4/v4 Vector/v4 Pro/v4 Pro
  Vector) — chuyên vector/illustration, không thấy nhắc trong `imgh.md`.
- Dòng **Reve** (Reve Edit/Remix/Create) — model mới, cũng chưa có trong
  `imgh.md`.
- Nhiều model có cả bản **base** (text-to-image, VD `openai/gpt-image-2`)
  và bản **`/edit`** (image-to-image, VD `openai/gpt-image-2/edit`) — 2
  entry riêng biệt trong catalog, không gộp chung.

## Trang chi tiết Model (`/models/{owner}%2F{slug}`)

Cấu trúc chung (test với `google/nano-banana-2-lite`):

- Breadcrumb: `Models > {Owner} > {Model name}` — click Owner để filter
  list theo `?owner=`.
- Header: slug đầy đủ (`owner/model-slug`) + nút copy, badge type
  (text-to-image/image-to-image) + cost ước tính, nút **Schema** (xem
  JSON schema thô của input/output).
- 3 tab: **Playground** (mặc định), **Examples**, **{ } API**.

### Tab Playground
- Chọn **provider** phục vụ model này qua 1 button riêng cạnh Input (VD
  "fal.ai", hoặc "Auto" nếu để hệ thống tự chọn) — đúng khái niệm "ép
  provider cụ thể" trong docs. Đổi provider có thể đổi luôn field schema
  hiển thị (khác provider có thể nhận param khác nhau cho cùng 1 model).
- Toggle **Form / JSON** — xem phần "Quirk: variables" bên dưới.
- Form hiển thị **đầy đủ input schema** dưới dạng field control tương ứng
  kiểu dữ liệu: text/textarea (Prompt — placeholder gợi ý sẵn cú pháp
  `{{name}}` để thêm biến, **là tính năng chung của mọi model chứ không
  riêng gì Template** — bất kỳ field prompt nào cũng nhận biến), checkbox
  (VD "Limit Generations", "Sync Mode"), combobox (Output Format,
  Thinking Level, Safety Tolerance), spinbutton (Seed, Number of Images),
  button-picker riêng cho **Aspect Ratio** (mặc định **"Auto"** — chính là
  Dynamic Upload Ratio, xuất hiện ngay ở model page chứ không chỉ khi gắn
  Template).
- Nút hành động: **Reset**, và tuỳ ngữ cảnh:
  - Vào thẳng từ `/models` (không gắn template): **"Save as Template"** +
    **"Run (~X credits)"**.
  - Vào qua 1 template có sẵn (`?template={id}`): **"Update
    \"<tên template>\""** + **"Run (~X credits)"**.
- Khu **Result** bên phải: status (`idle` → `running` → `completed`/
  `error`), toggle Preview/JSON, khu **Logs** realtime.
- Mỗi lần bấm **Run** đều tạo 1 task mới, luôn được ghi lại đầy đủ trong
  **Task History** (`/tasks`) — dù chạy trực tiếp từ Model hay từ Template
  (xem [task-history.md](task-history.md)), gồm cả cost/duration/status
  thật và full raw request đã gửi cho provider.

### Tab Examples
Trống với model test (`google/nano-banana-2-lite`) — không phải model
nào cũng có example được thêm sẵn.

### Tab { } API
3 sub-tab: **Authentication** (mẫu header `Authorization: Bearer
YOUR_API_KEY` + link tạo key), **Schema**, **API Reference** — tài liệu
code tự sinh riêng cho từng model, không cần rời trang.

## Quirk: field required (VD Seed) không có default, không tự báo rõ

Test trên `google/nano-banana-2-lite`: field **Seed** đánh dấu bắt buộc
(`*`) nhưng spinbutton để trống mặc định. Bấm **Run** lần đầu (đã điền
Prompt đầy đủ) → không chạy, chỉ hiện text nhỏ `"Seed is required."` ngay
dưới field — không có toast/alert nổi bật, không auto-scroll/focus vào
field lỗi. Dễ bỏ sót nếu form dài nhiều field. Fix: điền số bất kỳ (test
dùng `42`) rồi Run lại bình thường.

## GPT-image-2.5 (Sunburst & Flare) — bản `/edit` dùng `size` enum, KHÔNG có Auto

Ngày xác nhận: **2026-09-23** (IGH-233 / Testlane IGH-011, chạy thật trên
staging). Áp dụng cho `gpt-image-2.5-sunburst/edit` và
`gpt-image-2.5-flare/edit` (image-to-image) — cả hai hành xử giống hệt nhau.

- ⚠️ **Field `size` là dropdown enum cố định 31 giá trị, KHÔNG có `auto`.**
  Verify 2 đường độc lập: JSON thô qua nút **Schema** ở header, và mở dropdown
  Size trên UI *kể cả sau khi đã upload ảnh input*. Hệ quả: **không tạo được
  template ratio = Auto** cho 2 model này, nên mọi case Dynamic Upload Ratio
  gắn vào chúng đều không thoả precondition. Đối chứng trên cùng staging:
  `gpt-image-1.5/edit` **có** "Auto" → Dynamic Upload Ratio là tính năng thật,
  chỉ chưa bật cho dòng GPT-image-2.5 `/edit`. (Lưu ý: nút button-picker
  "Aspect Ratio — Auto" mô tả ở mục Tab Playground bên trên **không phải model
  nào cũng có**; dòng này dùng dropdown `size` thay thế.)
- 31 giá trị = **3 size vuông + 14 cặp landscape/portrait đối xứng** — mọi size
  ngang đều tồn tại bản xoay tương ứng (WxH ↔ HxW). Mặc định vẫn là
  `1024x1024`, giữ nguyên sau reload.
- 5 size portrait mới thêm ở đợt này (26 → 31 entry): `672x1008`, `1024x2048`,
  `1920x2880`, `1440x2880`, `1920x3840`.
- **Giá của cặp twin bằng nhau** — cùng quality thì `1008x672` và `672x1008`
  ước tính cùng số credit (đã đối chiếu ở cả `low` lẫn `medium`).
- **Output phụ thuộc provider** (đo kích thước ảnh ra thật, không đọc UI):
  - `fal-ai` → trả **đúng** size đã chọn (chọn `1024x2048` → ảnh 1024×2048).
  - `replicate` → giữ đúng **orientation dọc** nhưng trả **size 9:16 của riêng
    Replicate** (đo thật: 1152×2048). Dev xác nhận đây là **expected, không
    phải bug**, và UI **không** hiện cảnh báo nào khi chọn provider này — đừng
    báo bug oan cho cả 2 điểm này.
- Credit đo thật: `1024x2048` quality `low` = **2 credits**.

## Runs đã verify thực tế (2026-08-30)

Chạy trực tiếp từ trang Model (không qua Template), mỗi model 1 provider
khác nhau — tất cả `completed`, cost đúng số credit ước tính trước khi Run:

| Model | Provider | Prompt | Cost | Kết quả |
|---|---|---|---|---|
| `google/nano-banana-2-lite` | fal-ai | "A minimalist ceramic mug with a small mountain line-art design, product photo on white background" | 5 credits | Ảnh mug ceramic đúng mô tả, nền trắng sạch |
| `xai/grok-imagine-image` | xai | "A cute cartoon fox mascot logo, flat vector style, simple shapes, orange and white colors" | 2 credits | Logo cáo flat vector đúng chuẩn mascot |
| `recraft-ai/recraft-4` | recraft | "A cozy coffee shop illustration, digital art style, warm colors, cup of latte on wooden table" | 4 credits | Ảnh latte ấm cúng, thiên photorealistic hơn "digital art style" yêu cầu (đáng lưu ý nếu cần strict style adherence) |

Cả 3 đều dùng provider **Auto**/mặc định model gợi ý sẵn (không đổi tay),
log lifecycle nhất quán mọi lần chạy (model lẫn template):
`request started → processing started → calling provider X → provider X
succeeded → task completed`.

Related: [imgh.md](imgh.md), [portal-sitemap.md](portal-sitemap.md),
[template.md](template.md), [task-history.md](task-history.md).
