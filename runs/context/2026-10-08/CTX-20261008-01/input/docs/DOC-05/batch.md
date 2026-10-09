# Batch (`/batch`) — Beta

Ngày xác nhận: 2026-08-30, tài khoản "HUB 1" trên staging-app.imagenhub.ai.
Chưa có trong docs.imagenhub.ai (xem [imgh.md](imgh.md)) — chỉ thấy khi
khảo sát trực tiếp sidebar portal (đánh dấu "Beta").

## Tổng quan

"Edit photos in batch with AI" — áp **1 template** cho nhiều ảnh cùng lúc.

Flow: chọn template (combobox "Choose a template") → Add images (drag/drop/
paste/browse, tối đa **250 ảnh**) → Process and download.

- Xử lý **5 ảnh/lần** dù upload nhiều hơn (chạy tuần tự theo batch nhỏ).
- Use case liệt kê trên UI: apply 1 template to all images, remove
  backgrounds in bulk, add natural shadows, align products consistently,
  change background colors, add reflections, add/remove watermarks.
- Không giới hạn loại template cụ thể — bất kỳ template nào "edits images"
  dùng được, không riêng background removal. Combobox chọn template chỉ
  liệt kê template có model dạng `/edit` hoặc model xử lý ảnh đơn bước
  (RMBG, Upscale, Face-cutout...) — khớp với quirk tương tự ở
  [design.md](design.md) (dropdown Upscaler/Background remover).
- Bấm **Process N images** → có **confirm dialog riêng** hiện tên
  template + cost ước tính trước khi chạy thật (dễ bỏ sót nếu chỉ nhìn
  accessibility snapshot ở viewport hẹp — dialog vẫn render dưới dạng
  overlay, phải chụp full page mới thấy).
- Mỗi ảnh sau khi xử lý có toggle **Before/After**, nút **Download** riêng
  + nút **"Download all (N)"** ở góc trên cho tải hàng loạt.

## Run test thực tế đã verify (2026-08-30)

Template: `Test user` (removebg/remove-background, 24 credits/ảnh). Upload
2 ảnh test (`tshirt-mockup.png`, `sneaker-blue-bg.jpg` — generate bằng
chính ImagenHub, lưu ở `test-data/images/`) → **Process 2 images** →
confirm "Estimated cost: 48 credits" → cả 2 xử lý xong, xoá nền chính
xác, tải về được từng ảnh hoặc tải gộp.

## Việc cần làm tiếp nếu viết test cho flow này

- Đã có ảnh test mẫu trong `test-data/images/` (`tshirt-mockup.png`,
  `sneaker-blue-bg.jpg`) — tự generate bằng ImagenHub, dùng lại được cho
  test sau.
- Cần xác nhận behavior khi upload > 250 ảnh.
- Cần verify cost thực tế trừ đúng bao nhiêu sau khi Process (hiện chỉ
  biết ước tính hiển thị trước khi Process, chưa đối chiếu với Task
  history/Subscription credit balance).

Related: [imgh.md](imgh.md), [design.md](design.md),
[portal-sitemap.md](portal-sitemap.md).
