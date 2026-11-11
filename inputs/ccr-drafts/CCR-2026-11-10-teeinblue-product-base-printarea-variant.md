# Context Change Request: product-base — printarea và setup custom printarea theo variant, gộp từ CBS-046 (khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `product-base`
- **Ticket:** `QA-3416 (dev TIB-4726 không dùng làm nguồn)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon đã có CHK-05-011 / KB-080 cho phần toggle và click ô Custom Printareas, còn phần "không có bước map option ↔ layer" và "gắn artwork ở Campaign" chưa có; có thể làm sai giả định khi viết case cho variant, artwork. Proposal gốc CBS-046 không điền mức gấp (mục 4.4 để trống), đây là đề xuất khi chuyển khuôn, operator xác nhận.

# Khối A — Hành vi

Nguồn gốc chung: lấy từ knowledge QA local (product_facts.md), không phải quan sát trực tiếp của agent soạn CCR. Không có TC nào kiểm hai claim này (QA-3416 là issue về basic shapes, không test print area). Không gắn ticket ship; đo trên staging, build không rõ; production không rõ.

### CLAIM-01

- **Statement:** Mapping variant sang artwork chỉ xảy ra khi printarea được đặt tên trùng option value; với product base chuẩn (apparel, option Color/Size thật) printarea đặt tên theo vị trí in (ví dụ "4″×4″", "2″×3″"), không theo màu, nên một campaign nhiều variant Color vẫn dùng chung một artwork cho mỗi printarea.
- **Object / feature:** product-base/printarea-definition
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (Product Base → Printarea, Campaign); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến, suy luận từ ghi chú và quan sát), 2026-10-23; không phải PO/Dev
- **Locator:** product_facts FACT-163; apps/tib/knowledge/tib_mcp_notes.md L188 (case cũ printarea tên "test1"/"test3" khớp option value tự đặt); QA-3416 B3. Mục tự ghi là suy luận từ ghi chú và quan sát product base chuẩn, không có TC. Không đề xuất coi đây là rule đã chứng minh.
- **OQ:** NEEDS_CONFIRMATION — Quy tắc "mapping variant sang artwork chỉ xảy ra khi printarea đặt tên trùng option value, còn product base chuẩn dùng chung một artwork cho mỗi printarea" có đúng với build hiện tại không? Nguồn chỉ là suy luận của QA, không có TC. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-163] **Print area ↔ Shopify variant:** mapping variant → artwork chỉ xảy ra khi printarea ĐƯỢC ĐẶT TÊN TRÙNG option value (case cũ ở `tib_mcp_notes.md` L188, printarea tên "test1"/"test3" khớp option value tự đặt) — với product base chuẩn (apparel, option Color/Size thật như Gildan 18000), printarea đặt tên theo VỊ TRÍ IN (vd "4″×4″", "2″×3″" = kích thước/vùng in), KHÔNG theo màu — nên 1 campaign có nhiều variant Color vẫn dùng CHUNG 1 artwork cho mỗi printarea (không tách artwork theo màu). Đừng giả định "mỗi Color có artwork riêng" khi không thấy printarea đặt tên theo màu.
  ```

### CLAIM-02

- **Statement:** Setup custom print area không đi qua bước "map variant option vào layer": luồng đúng là Product base, bảng Variants, bật "enable custom printarea" cho các variant cần, rồi sang Campaign và gắn artwork vào printarea vừa bật; không có bước map variant option với layer.
- **Object / feature:** product-base/variant-catalog
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (Product Base → Variants; Campaign); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến, sửa trực tiếp; model trước đó đoán sai), 2026-10-29; không phải PO/Dev
- **Locator:** product_facts FACT-180; QA-3416. Canon gần: KB-045, KB-080 (PO xác nhận 2026-09-13), CHK-05-011 cho phần "bật toggle + click ô Custom Printareas"; phần "không có bước map option ↔ layer" và "gắn artwork ở Campaign" là mới, không thay thế các item đó. Không có TC kiểm riêng.
- **OQ:** NEEDS_CONFIRMATION — Luồng setup custom printarea (bật "enable custom printarea" ở bảng Variants rồi gắn artwork ở Campaign, không có bước map option với layer) có đúng với build hiện tại không? Nguồn là QA sửa trực tiếp, chưa ship rõ, không có TC. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-180] **Setup custom print area KHÔNG qua "map variant option vào layer"** (model trước giả định sai) — đúng luồng: Product base → bảng Variants → bật "enable custom printarea" cho (các) variant cần → sang Campaign, gắn artwork vào printarea vừa bật. Không có bước map variant option ↔ layer nào cả; xem thêm FACT-163 (mapping variant→artwork theo TÊN printarea trùng vùng in, không theo màu).
  ```
