# Object: Image Library (product: teeinblue) — Feature Summary
**Published context version:** 1

- **Object:** hai thư viện ảnh dùng chung của merchant: **image layer library** (ảnh cho layer Static Image của artwork) và **mockup layer library** (ảnh mockup gán cho product base). Đây là hai tập dữ liệu riêng, category cũng riêng; chúng chỉ dùng chung cơ chế upload, polling trạng thái xử lý và dialog xác nhận (KB-005, KB-006, KB-008, KB-009).
- **Không có trang Image Library độc lập:** sidebar và router của portal không có mục hay route nào cho thư viện ảnh (KB-001). Nút "TIB Library" trên danh sách Artworks là thư viện **artwork template** công khai, không thuộc object này (KB-002). Điểm vào thật (KB-003):
  - artwork editor > `+ Layer` > IMAGE > **Static Image** (picker), và icon **Replace image layer** trên dòng layer ảnh;
  - trang edit product base > section **Mockup** > **Upload** (media library modal).
- **Environment quan sát:** staging, role merchant-owner. **Toàn bộ knowledge là `OBSERVED_CURRENT`** (một item `INFERRED`), không có `CONFIRMED_EXPECTED`. Mọi check là BASELINE hoặc NONE và đều đang chờ xác nhận (xem `open-questions.md`).
- **Tham chiếu chéo (không chép lại):**
  - `product-base/features/mockup-attachment`: luồng gán mockup vào product base, card mockup sau khi gán, lịch sử bug upload.
  - `artwork/features/editor-layer-workspace`: popup chọn layer type.
  - `artwork/features/layer-config-image`: cấu hình layer ảnh sau khi thêm.
- **Upload dùng chung (KB-006, KB-007):** client xin presigned URL, PUT file thẳng lên object storage (host này chưa được xác nhận là host hợp lệ của môi trường, nên các item liên quan không làm oracle), gọi `by-temporary-file`, rồi tự poll khoảng mỗi 2 giây tới khi ảnh xử lý xong.
- **Validation file:**
  - `.svg` và `.txt` bị chặn ngay ở client với "You can't upload files of this type." (KB-008).
  - File không phải ảnh nhưng mang đuôi `.png` bị server trả 422 "This file type is not supported. Please upload a PNG, JPEG, GIF or WebP image." (KB-027, KB-055).
  - Không thấy giới hạn kích thước: file 27 MB vẫn được nhận (KB-028, KB-057).
- **5 conflict UNRESOLVED với knowledge đã publish của object khác** (OQ-image-library-001..005):
  - file giả `.png` trước đây kẹt "Rendering", nay bị 422;
  - giới hạn khoảng 3 file khi upload nhiều file: lần này 4/4 và 6/6 file raster đều được xử lý, nhưng chưa retest đúng điều kiện 5 file raster cùng lúc;
  - media library modal nay tự poll;
  - REST category và GraphQL clipart_categories trả hai tập id không giao nhau (chúng có phải hai tập dữ liệu khác nhau không vẫn là câu hỏi mở);
  - popup chọn layer type có thêm nhóm DESIGN ELEMENTS.

---

## image-layer-library — Thư viện ảnh cho Image layer

**Goal:** merchant upload, sắp xếp và chọn ảnh có sẵn để đặt vào layer Static Image (hoặc thay ảnh của layer ảnh) trong artwork editor.
**Entry points:** artwork editor > `+ Layer` > Static Image · icon Replace image layer ("Choose new image for these layers:").

**Capabilities quan sát được:**
1. **Picker và dữ liệu:**
   - Picker có 2 tab: "Upload an image" (mặc định) và "Choose from clipart category". Cột trái là category; bên phải là dropzone, Search, Reload và lưới ảnh (KB-014).
   - Danh sách qua GraphQL relay `layer_images_connection`, phân trang **cursor** 20/trang (chọn được 20/50/100/250/500), loại trừ file `.svg`/`.gpx` (KB-015, KB-034).
2. **Upload một hoặc nhiều file:**
   - Ảnh mới vào category đang chọn và hiện ở đầu lưới, đã được tick (KB-023, KB-024).
   - Upload 4/4 và 6/6 file raster đều thành công (KB-025).
   - Trùng tên vẫn được nhận (KB-026).
   - Kích thước gốc được giữ nguyên, ảnh xử lý ra `_large.webp` và `_thumbnail.webp` (KB-016).
3. **Category CRUD** (REST `/api/layer-image-categories`, type `clipart`):
   - Tạo, đổi tên và xoá đều có hiệu lực (KB-019, KB-021, KB-022).
   - Xoá category không xoá ảnh, ảnh chuyển thành không có category.
   - Đổi tên và xoá category ở thư viện này không có toast.
4. **Tìm và lọc:** Search lọc theo `name` ILIKE; lọc theo category (KB-018). Empty state:
   - search không khớp: "No data matched";
   - category rỗng: "Empty data", và dropzone vẫn upload được (KB-017).
5. **Đổi tên inline** qua popover Name, Save gửi `update_layer_images`, không có toast (KB-030).
6. **Move to category** cho các ảnh đang tick, qua `PUT /api/layer-images/move` (KB-032).
7. **Chọn ảnh vào layer:**
   - "Select 1 image" thêm một layer `static-photo` chưa lưu (KB-036).
   - Thêm layer không gửi request và mất khi rời editor không lưu. Ngược lại, mọi thao tác trên thư viện (upload, đổi tên, move, xoá, category) có hiệu lực ngay (KB-041).
8. **Xoá:**
   - Xoá một ảnh: confirm "Are you sure to remove <tên ảnh>". Request DELETE mang toàn bộ JSON artwork đang mở (KB-038).
   - Ảnh đang được artwork đang mở dùng: server trả 400 "This image has already been added to the current artwork.", UI hiện "Something went wrong!" (KB-039).
   - Xoá hàng loạt gọi `in-use` trước, rồi xoá từng ảnh (KB-040).

**Hành vi đáng chú ý, nghi là defect (chờ xác nhận):**
- Đổi tên ảnh thành chuỗi rỗng vẫn được nhận, card hiện "..." (KB-031).
- Tên category chỉ gồm khoảng trắng vẫn bật nút Create, rồi bị 422 (KB-020).
- Move không chọn category vẫn trả 200 (KB-033).
- Lựa chọn giữ lại khi sang trang khác, nên các nút bulk tác động lên ảnh không hiển thị trên trang (KB-035).
- In-use check chỉ xét artwork đang mở (KB-039).

**Chưa cover:**
- Thư viện rỗng hoàn toàn: câu hỏi mở từ artwork về picker rỗng như Vector mới được trả lời một phần (KB-017).
- Ảnh được artwork **đã lưu** khác dùng; "Select N" với N>1.
- Tab "Choose from clipart category"; đổi page size, lùi trang, search kết hợp category.
- Kéo-thả; GIF/WebP; cross-tenant; role/plan khác.

---

## mockup-layer-library — Thư viện ảnh mockup (media library modal)

**Goal:** merchant upload, sắp xếp và chọn ảnh mockup để gán cho product base.
**Entry points:** trang edit product base > section Mockup > Upload.

**Capabilities quan sát được:**
1. **Modal và dữ liệu:**
   - Modal không có tiêu đề hay tab. Cột trái có `All`, `TIB Mockups` và category của user (KB-043).
   - Dữ liệu qua REST `/api/mockup-layer-categories` và `/api/mockup-layers`, phân trang **offset/page** kiểu Laravel, khác cursor của image library (KB-044).
2. **TIB Mockups:** bộ mockup dựng sẵn, công khai, chỉ xem, không có dropzone và không xoá được (KB-045).
3. **Upload:**
   - Client gửi `filewidth`/`fileheight`. Trong lúc xử lý hiện "Generating..." kèm thanh tiến trình, và client tự poll tới khi xong (KB-052, KB-053).
   - Upload 4/4 file raster đều thành công (KB-054).
   - Hai bản ghi "fake-image" cũ vẫn ở trạng thái "Rendering" (KB-056).
4. **Category CRUD:**
   - Tạo, đổi tên và xoá đều có hiệu lực; đổi tên và xoá có toast "Success" (KB-048, KB-050, KB-051).
   - Xoá category không xoá mockup bên trong.
5. **Tìm và lọc:** search phía server (`s=`); không có kết quả thì hiện "Empty data" (KB-046, KB-047).
6. **Move to category:** các mockup vẫn được tick sau khi move (KB-059).
7. **Xoá:**
   - Xoá một mockup gọi DELETE thẳng, không qua in-use check (KB-062).
   - Xoá hàng loạt gọi `in-use` trước (KB-063).
8. **Không có UI đổi tên mockup** (KB-058).

**Hành vi đáng chú ý, nghi là defect (chờ xác nhận):**
- Confirm xoá một mockup ghi "Are you sure to remove ?", thiếu tên (KB-061).
- Bộ đếm hiện "Showing 1 to 0 of 0 entries" khi không có kết quả (KB-046, KB-047).
- Xoá một mockup bỏ qua in-use check (KB-062).
- Tên category chỉ gồm khoảng trắng vẫn bật nút Create (KB-049).

**Chưa cover:**
- Chọn hoặc gán mockup vào product base rồi xoá mockup đang dùng (bị chặn vì không được lưu trên product base có sẵn).
- Thư viện mockup rỗng hoàn toàn; phân trang quá trang 1.
- Move không chọn category; retest đúng điều kiện 5 file raster cùng lúc.
