# Context Change Request: translation-spechub-scope-propagation — đối chiếu spec-hub cho phạm vi Dynamic Translations và tốc độ propagate

- **Product:** `teeinblue`
- **Object:** `translation`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — CLAIM-02 cung cấp bằng chứng mới cho CONFLICT-001 đang mở (Dynamic Translation của Product base name có propagate lên storefront hay không); CLAIM-03 có thể làm sai nhãn "IMMEDIATE" đang publish cho Product Page Content. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 150).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Dynamic Translations chỉ phủ: tên option title trong form personalization, tên product base và tên variant. Các chữ khác trên trang sản phẩm (nút, thông báo, lỗi) được dịch ở trang Product Page Content riêng, dùng mô hình lưu trữ/API khác (full English default + sparse override theo semantic key, so với Dynamic Translations dùng key = chuỗi nguồn tự do, POST /translations/bulk).
- **Object / feature:** translation/dynamic-translations
- **Quan hệ với canon:** `ADD` (củng cố KB-019 — LOW, "2 mô hình lưu trữ/API khác nhau")
- **Scope:** owner (merchant), portal (trang Dynamic Translations, Product Page Content)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:dynamic-translations-scope`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=150, rule id `dynamic-translations-scope` (feature `dynamic-translations`)
- **OQ:** NEEDS_CONFIRMATION — Dev xác nhận đúng phạm vi và cơ chế tách 2 trang như spec-hub mô tả, khớp với KB-019 không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  dynamic-translations-scope: "Dynamic translations cover option titles in the personalization form, product base names and variant names. Other texts on the product page are translated in the separate product page content settings."
  ```

### CLAIM-02

- **Statement:** (Bằng chứng mới cho CONFLICT-001 đang mở) Theo rule `dynamic-translations-scope` của spec-hub, Dynamic Translation của **product base name nằm trong phạm vi được thiết kế để hoạt động** — tức nếu merchant nhập bản dịch tên product base, nó phải propagate lên storefront. Điều này ngược hướng với KB-016 (quan sát QA: Dynamic Translation của Product base name KHÔNG propagate lên storefront).
- **Object / feature:** translation/dynamic-translations
- **Quan hệ với canon:** `CONTRADICTS KB-016` (CONFLICT-001 đang mở, status UNRESOLVED) — không tự chọn phe, chỉ bổ sung bằng chứng
- **Scope:** owner (merchant), buyer (storefront)
- **Đã ship:** `UNKNOWN` (spec-hub nói phạm vi thiết kế, không phải log quan sát thực tế chạy có propagate hay không)
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:dynamic-translations-scope`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=150, rule id `dynamic-translations-scope`
- **OQ:** CONFLICT (bổ sung bằng chứng cho CONFLICT-001 đã có, không tạo conflict mới) — Product base name có thực sự nằm trong luồng propagate Dynamic Translation hay có một nhánh code riêng không chạy cho trường hợp này? Side A (đã có): KB-016, quan sát QA trực tiếp trên staging không thấy propagate / Side B (mới): spec-hub `dynamic-translations-scope` nói product base name thuộc phạm vi thiết kế của feature. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  dynamic-translations-scope: "Dynamic translations cover option titles in the personalization form, product base names and variant names."
  ```

### CLAIM-03

- **Statement:** Khi setting/texts/custom code của store Shopify đổi, Teeinblue push thay đổi lên store **ở nền (background)**, storefront nhận được thay đổi "shortly after" (không phải tức thời đồng bộ cùng lúc save).
- **Object / feature:** translation/product-page-content-translation
- **Quan hệ với canon:** `CONTRADICTS KB-015` (KB-015 hiện ghi "propagate lên storefront: IMMEDIATE, server-side rendered, không qua API client-visible", LOW)
- **Scope:** owner (merchant), buyer (storefront)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:product-page-settings-sync`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=150, rule id `product-page-settings-sync` (feature `product-page-settings`)
- **OQ:** NEEDS_CONFIRMATION — "IMMEDIATE" trong KB-015 có đang mô tả đúng độ trễ thực tế không, hay nên sửa thành "push nền, storefront nhận sau một khoảng ngắn" theo spec-hub? Hai cách diễn đạt có thể cùng đúng (nền nhưng rất nhanh) — cần Dev xác nhận có đáng kể trễ không để quyết định có cần sửa KB-015. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product-page-settings-sync: "When a Shopify store's settings, texts or custom code change, Teeinblue pushes them to the store in the background, so the storefront shows the change shortly after saving."
  ```
