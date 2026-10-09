# Design (`/design`) — Beta

Ngày xác nhận: 2026-08-30, tài khoản "HUB 1" trên staging-app.imagenhub.ai.
Chưa có trong docs.imagenhub.ai (xem [imgh.md](imgh.md)) — chỉ thấy khi
khảo sát trực tiếp sidebar portal (đánh dấu "Beta").

## Tổng quan

"Turn product photos into print files" — biến ảnh **mockup sản phẩm đã
in** thành file thiết kế phẳng, sẵn sàng in lại (dùng cho POD/TIB workflow:
lấy ảnh khách gửi/ảnh mockup cũ → tái tạo file gốc).

Pipeline (Step 0 tự động, Step 1-3 chọn model riêng từng bước):
1. **Step 0 — Crop**: tự động khoanh vùng design ra khỏi ảnh mockup, không
   cần chọn gì.
2. **Step 1 — Recreate artwork**: combobox "Choose a model" (mặc định thấy
   `google/gemini-3-pro-image/edit`), có toggle "Custom instructions".
3. **Step 2 — Upscale**: combobox "Choose an upscaler" (chưa có default,
   phải chọn tay).
4. **Step 3 — Cắt nền**: combobox "Choose a background remover" (chưa có
   default, phải chọn tay).
5. **Step 4 — Set print size**: nút preset, VD "tshirt (4500×5400)" — chỉ
   xuất hiện/fill sau khi đã chọn xong model ở Step 1 (trước đó là "Custom
   size" trống Width/Height).

**Design mission** (radio, ảnh hưởng Step 1):
- **Clone** (default) — khôi phục design gốc 1:1, y hệt ảnh input.
- **Redesign** — tạo design mới cùng theme/layout, artwork khác. (Chưa
  test — chỉ mới verify Clone.)

Cost hiển thị trên UI: "**15 credits/image** + finishing steps" (upscale +
background-remove cộng thêm riêng theo bước, giống cách Post-processing
steps cộng credit ở trang chi tiết Template thường — xem
[template.md](template.md)).

Upload tối đa 250 ảnh, nút "Add images". Nút "Process 0 images" disable
tới khi có ảnh + đã chọn đủ model cho các step cần thiết.

## Quirk: dropdown Step 2 (Upscaler) và Step 3 (Background remover) không lọc theo loại

Cả 2 combobox "Choose an upscaler" và "Choose a background remover" hiện
**y hệt cùng 1 danh sách đầy đủ mọi model image-editor** (`bria/remove-
background`, `ideogram/remove-background`, `removebg/remove-background`,
`teeinblue/facecutout`, `teeinblue/image-edits`, `teeinblue/remove-
background`, `teeinblue/remove-background-on-color`, `teeinblue/resize-
image`, `teeinblue/upscaler`, `teeinblue/upscaler_imageAI`, `upscayl-
standard-4x`) — **không lọc riêng theo đúng chức năng của step**. Người
dùng có thể lỡ chọn `teeinblue/facecutout` cho step "Upscale" hoặc
`teeinblue/upscaler` cho step "Cut out background" mà UI không cảnh báo
gì — cần biết trước tên model nào làm đúng việc gì (xem
[model.md](model.md) phần "Model nội bộ Teeinblue").

## Run test thực tế đã verify (2026-08-30)

Ảnh input: `tshirt-mockup.png` (áo thun trắng in graphic núi "Adventure
Awaits", tự generate bằng ImagenHub, lưu ở `test-data/images/`).
Config: mission **Clone**, Step 1 model `google/gemini-3-pro-image/edit`,
Step 2 upscaler `teeinblue/upscaler`, Step 3 bg-remover `removebg/remove-
background`, Step 4 size preset `tshirt (4500×5400)`.

Bấm Process → confirm dialog hiện chi tiết pipeline: *"Every photo goes
through Clone: google/gemini-3-pro-image/edit recreates the artwork, then
it's upscaled, the background is cut out, and it's sized for print. Up to
5 run at once."* + "Estimated cost: 15 credits — finishing steps bill
separately." → xác nhận chạy.

Khi đang chạy, UI hiện rõ **pipeline stage indicator** dạng chip nối tiếp:
`Generate → Upscale → Remove background → Resize` (chip đang chạy tô màu,
chip pending màu xám) + progress "N of 1 processed" — mất khoảng 40-50s
cho pipeline 4 bước trên 1 ảnh.

**Kết quả xuất sắc**: crop chính xác đúng vùng graphic in trên áo, tách
khỏi ảnh mockup, upscale, xoá nền sạch — ra đúng file thiết kế "Adventure
Awaits" phẳng, nền trong suốt, sẵn sàng in — đúng 100% mục đích tính năng
quảng cáo. Có nút Download riêng ảnh + "Download all (1)".

## Cơ chế nội bộ (soi qua Task History → xem [task-history.md](task-history.md))

Mở task vừa chạy trong Task History hé lộ pipeline thật đứng sau 4 step
UI:
- **Generate** (Step 1) = task chính, model hiển thị đẹp "Nano Banana Pro
  Edit(Gemini 3.0)" (tên UI của `google/gemini-3-pro-image/edit`).
- **Step 4 "Set print size" thực chất chạy qua `teeinblue/image-edits`**
  (không phải `teeinblue/resize-image` như có thể đoán từ tên) — map:
  Step 2 Upscale → `teeinblue/upscaler`, Step 3 Remove bg →
  `removebg/remove-background`, Step 4 Print size → `teeinblue/image-edits`,
  đúng thứ tự 3 post-processing step nối sau Generate.
- **Prompt "Clone" thật sự dùng kỹ thuật chroma-key**: model Generate
  không tạo nền trong suốt trực tiếp — prompt yêu cầu model render artwork
  lên **nền xanh lá pure green screen** ("place the artwork on a solid,
  uniform chroma-key green screen"), sau đó Step 3 (background remover)
  mới xoá nền xanh đó đi. Đây là lý do vì sao chọn đúng background remover
  ở Step 3 quan trọng — nó không chỉ "dọn nền ảnh chụp" mà đang xử lý đúng
  1 nền xanh lá chuẩn hoá do chính pipeline tạo ra.
- Prompt Clone đầy đủ rất chi tiết, ép model làm "copy machine" (sao chép
  y hệt font/layout/màu, không được sáng tạo lại) — đáng tham khảo nếu
  cần viết assertion về độ trung thực của output Clone.

## Việc cần làm tiếp nếu viết test cho flow này

- Đã có ảnh test mẫu trong `test-data/images/` (`tshirt-mockup.png`) — tự
  generate bằng ImagenHub, dùng lại được cho test sau.
- Cần xác nhận behavior khi upload > 250 ảnh, khi thiếu model ở 1 step.
- Cần test mission **Redesign** (chưa làm — chỉ mới test Clone).
- Cần verify cost thực tế trừ đúng bao nhiêu sau full pipeline (hiện chỉ
  biết ước tính hiển thị trước khi Process, chưa đối chiếu với Task
  history/Subscription credit balance).

Related: [imgh.md](imgh.md), [batch.md](batch.md),
[model.md](model.md), [template.md](template.md),
[portal-sitemap.md](portal-sitemap.md).
