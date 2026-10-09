# Task History (`/tasks`)

Ngày xác nhận: 2026-08-31, tài khoản "HUB 1". Route: `/tasks` (list),
`/tasks/{id}` (detail — trang riêng, không phải lightbox). Kiến thức nền
API xem [imgh.md](imgh.md) (mục Image Generation, task lifecycle
`created → processing → success/error`).

## Trang list (`/tasks`)

Bảng: **Task** (ảnh thumbnail + model slug + tên provider, badge "+N
steps" nếu có post-processing) / **Template** (tên template nếu task chạy
từ template, `-` nếu chạy trực tiếp từ Model hoặc từ Design) / **Status**
/ **Post-processing** (badge Success/Error riêng, tách biệt với Status
chính) / **Est. Cost** (số credit hoặc "Your key" nếu dùng BYOK, có thể
kết hợp `"Your key +3 credits"` khi main dùng BYOK nhưng post-processing
vẫn trừ credit hệ thống) / **Duration** / **Time**.

Search: "Search by model or template...". Phân trang: chỉ **Previous/
Next** (không có số trang) — khớp thiết kế cursor-based pagination trong
docs, không phải offset-based như Templates/Models list.

## Filter panel (4 submenu — nhiều hơn Templates chỉ có 2)

| Submenu | Giá trị |
|---|---|
| **Status** | All / Created / Processing / Success / Error (radio, mỗi giá trị có dot màu riêng: xám/cam/xanh lá/đỏ) |
| **Model** | Checkbox list có search, tất cả model từng dùng trong org |
| **Provider** | Checkbox list có search, tương tự Model |
| **Date range** | Chỉ 4 preset: Last hour / Last 24 hours / Last 7 days / Last 30 days — **không có custom date picker** |

Chọn filter → đổi URL query param ngay (VD `?status=error`), có nút
**Clear** riêng để bỏ filter đang áp.

## Trang chi tiết task (`/tasks/{id}`)

### Header
Task ID (copy được), status badge lớn (Success/Error), badge
"Post-processing: Success/Error" riêng nếu có bước phụ, nút **Restore**
(chưa rõ hành vi chính xác — có ở cả cấp task và từng bước trong
Processing chain, khả năng là "dùng lại ảnh này làm input mới" hoặc
"re-run từ bước này" — **chưa test**), nút **Download** (chỉ khi
Success).

### Output
Ảnh kết quả cuối + link mở ảnh gốc (signed URL, dạng
`https://sgp1.digitaloceanspaces.com/.../out/...?X-Amz-...&X-Amz-Expires=3600`
— hết hạn sau 1 giờ đúng như docs mô tả). Task Error hiện `"No output
images."` thay vì ảnh.

### Processing chain — 2 cách hiển thị song song

1. **Dạng visual timeline** (ảnh thumbnail nối tiếp nhau bằng mũi tên):
   `In` (ảnh input gốc, nếu có) → `G` (Generate — model chính, kèm tên
   hiển thị đẹp VD "Nano Banana Pro Edit(Gemini 3.0)", cost, duration,
   nút Restore riêng) → `1`, `2`, `3`... (từng post-processing step, cùng
   thông tin tương tự). Mỗi thumbnail bấm vào mở ảnh gốc tab mới.
2. **Dạng bảng** ngay bên dưới: cột **Step** (Generate/Step 1/Step 2...)
   / **Model** (slug + tên provider) / **Status** (Success/**Client
   Error**) / **Code** (HTTP-like code, VD `200` — **quan trọng: task
   Error vẫn có Code 200**, nghĩa là lỗi nằm trong response body do
   provider trả về, không phải lỗi tầng HTTP) / **Cost** / **Time**
   (duration) / **Sent** (timestamp).

### Details panel
Model (tên hiển thị đẹp), **Cost** (breakdown rõ ràng, VD `"3 credits: 0
generation + 3 post-processing"`), **Source** (Your key / X Credits),
Duration, Created, Task ID (copy được). Nếu task chạy từ 1 template
(`template_id`), panel có thêm dòng **Template** ngay dưới Model, link
thẳng tới `/templates/{id}` — task chạy trực tiếp từ Model/Design không
có dòng này.

### Input panel
Hiện **toàn bộ raw request params** đã gửi cho provider — `prompt` (full
text, không rút gọn), `image_urls`, `aspect_ratio`, `image_size`, v.v.
Đây là chỗ soi được **prompt thật sự** backend dùng cho 1 tính năng, VD:
- Prompt "Clone" của Design dùng kỹ thuật chroma-key green-screen (xem
  [design.md](design.md) mục "Cơ chế nội bộ").
- Nhiều template TIB thật trong org test có prompt cực kỳ chi tiết/phức
  tạp (VD 1 template "Sugar Skull Folk" biến ảnh pet thành nhân vật Día de
  los Muertos — prompt dài hàng nghìn từ với negative prompt riêng) —
  hữu ích để hiểu độ phức tạp prompt engineering thật của khách hàng TIB.

### Logs
Chi tiết hơn Playground logs — với task có post-processing, log đánh số
rõ từng bước: `post-processing 1/3 (teeinblue/upscaler) started/finished`
... Task Error hiện thẳng lý do provider từ chối, VD: `"provider google
declined: This request was blocked by the model's content policy. Try a
different photo or prompt."` — đúng message thân thiện cũng hiện ở banner
đầu trang chi tiết.

## ⚠️ Cơ chế quan trọng: post-processing lỗi giữa chừng → dừng chain, trả ảnh cuối cùng thành công

Soi task `019fa459-b843-734f-91e8-e8305768d1a2` (template `Test
post-processing - RMBG`, 2 post-processing step: `teeinblue/upscaler` →
`bria/remove-background`) — task này **Status: Success** nhưng
**Post-processing: Failed**. Chi tiết:

- **Generate** chạy OK, ra ảnh Pixar-style bình thường.
- **Step 1 (`teeinblue/upscaler`)** lỗi: `Client Error`, **Code 401**,
  message *"Provider rejected the API key (401/403)"* — do key provider
  bị revoke/hết hạn tại thời điểm đó. Cost hiện **"0 credits — refunded"**
  (step lỗi tự động hoàn credit, không tính phí).
- **Step 2 (`bria/remove-background`)** **không hề chạy** — chỉ hiện tên
  model, không có status/cost/time. Chain dừng ngay khi 1 step lỗi, các
  step sau bị bỏ qua hoàn toàn, không thử tiếp.
- **Output cuối cùng = ảnh từ Generate** (ảnh trước khi vào post-processing)
  — hệ thống **fallback trả về kết quả thành công gần nhất** thay vì để
  cả task fail. Log xác nhận rõ: `"post-processing stopped; delivering
  last successful image"`.
- **Cost tổng = 0 credits** ("0 generation + 0 post-processing") dù có
  page Generate tốn credit bình thường trong trường hợp khác — ở đây do
  dùng BYOK (Source: Your key) nên generation vốn đã 0 credit hệ thống,
  cộng thêm post-processing bị refund → tổng 0.

**Ý nghĩa cho QA**: 1 pipeline nhiều post-processing step **không phải
tất-cả-hoặc-không-gì** — nếu step giữa chừng lỗi (VD do key hết hạn, rate
limit, network), user vẫn nhận được ảnh (chỉ thiếu các bước xử lý sau đó)
thay vì báo lỗi toàn bộ task. Muốn test coverage đầy đủ cho 1 template
nhiều post-processing step, cần test riêng case "step N lỗi" và assert:
(1) Status tổng vẫn Success, (2) Post-processing badge = Failed, (3)
Output = ảnh của step cuối cùng chạy thành công (không phải ảnh gốc,
không phải lỗi), (4) step lỗi + các step sau đó không bị tính phí.

Chi tiết panel còn có field **"API key"** (VD `[REDACTED]`) — tên API key cụ
thể đã dùng để gọi task này, hữu ích để trace request nào dùng key nào.

## Verify thực tế: task Batch/Design/Model runs trong session đều lên đúng

Tất cả run thật đã thực hiện trong các phiên trước (3 model run trực
tiếp, 1 template run, 2 batch run, 1 design run) đều xuất hiện chính xác
trong Task History với đúng cost/duration/status — xác nhận Task History
là nguồn ghi log đáng tin cậy cho mọi loại thao tác trên portal (Model
Playground / Template Run / Batch / Design đều log vào cùng 1 chỗ).

## Quirk nhỏ

Có 1 console error `401` ở `https://staging-api.imagenhub.ai/api/auth/me`
xuất hiện khi vào `/tasks` — **đã xác nhận không riêng gì trang này**,
cũng thấy y hệt ở `/mcp` (xem [mcp-setup.md](mcp-setup.md)), khả năng là
1 check phụ (refresh token?) chạy nền trên nhiều/mọi trang portal. Chưa
rõ ảnh hưởng chức năng gì (mọi trang vẫn hoạt động bình thường). Chưa
điều tra sâu.

## Chưa khám phá

- Nút **Restore** (cả cấp task và cấp từng step trong Processing chain)
  — chưa test bấm thử, sợ tạo task/side-effect ngoài ý muốn.
- Filter **Model**/**Provider** — chỉ xem list, chưa thử chọn + submit.
- Chưa test kết hợp nhiều filter cùng lúc (VD Status=Error + Date
  range=Last 7 days).

Related: [imgh.md](imgh.md), [model.md](model.md),
[template.md](template.md), [batch.md](batch.md), [design.md](design.md),
[portal-sitemap.md](portal-sitemap.md).
