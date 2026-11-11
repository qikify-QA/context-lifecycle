# Context Change Request: image-library-spechub-mockup-delete — đối chiếu spec-hub cho xoá mockup library đang dùng

- **Product:** `teeinblue`
- **Object:** `image-library`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — nếu CLAIM-02 đúng, checklist hiện tại (quan sát xoá 1 mockup không kiểm in-use) không còn đúng với hành vi sản phẩm, có thể làm test case sai hướng. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 147, 157).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Mockup library image đang được dùng ở bất kỳ mockup nào (product base, campaign hoặc store product) không xoá được; merchant thấy thông báo "The layer has already been used!". Xoá nhiều mockup cùng lúc cho phép merchant chọn gỡ luôn campaign mockup tạo từ base mockup, mỗi lần xoá ghi activity log.
- **Object / feature:** image-library/mockup-layer-library
- **Quan hệ với canon:** `ADD` (củng cố KB-063 — xoá nhiều mockup cùng lúc: kiểm in-use rồi xoá từng cái — hiện LOW)
- **Scope:** owner (merchant), portal (Media library, Product base/Campaign mockup editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:mockups-library-in-use`, `spec-hub:mockups-delete`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=147, rule id `mockups-library-in-use` (feature `mockups`) và `mockups-delete`
- **OQ:** NEEDS_CONFIRMATION — Quy tắc "đang dùng thì không xoá được" này có áp dụng đúng như vậy cho cả luồng xoá nhiều mockup cùng lúc (KB-063) không, hay chỉ cho luồng xoá 1 cái? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  mockups-library-in-use: "A mockup library image that is used in any mockup (product base, campaign or store product) cannot be deleted: the merchant sees 'The layer has already been used!'."
  mockups-delete: "Several mockups can be selected and deleted at once. When deleting base mockups, the merchant can also remove every campaign mockup made from them; otherwise those campaign mockups stay. Each deletion is written to the activity log of the base or campaign."
  ```

### CLAIM-02

- **Statement:** QA quan sát trên staging: xoá **một** mockup library image gửi `DELETE` không kèm body và **không gọi kiểm tra in-use** trước khi xoá — khác với mô tả ở CLAIM-01 ("đang dùng ở bất kỳ mockup nào thì không xoá được", không phân biệt xoá 1 hay nhiều).
- **Object / feature:** image-library/mockup-layer-library
- **Quan hệ với canon:** `CONTRADICTS KB-063` (và trái hướng với CLAIM-01 ở trên) — KB-062 hiện tại (LOW, quan sát QA)
- **Scope:** owner (merchant), portal, api (DELETE mockup)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN` (giữ nguyên quan sát QA cũ, không đổi — item này chỉ được đối chiếu lại ở đây để nêu conflict)
- **Người xác nhận, ngày nguồn:** QA, ngày quan sát gốc của KB-062 (xem canon)
- **Locator:** KB-062 hiện có (knowledge/products/teeinblue/image-library/features/mockup-layer-library/kb.json); đối chứng spec-hub rule `mockups-library-in-use` (log_id=147, log_id=157) nói ngược lại: mockup đang dùng ở bất kỳ đâu thì luôn bị chặn xoá, không có ngoại lệ cho xoá-1.
- **OQ:** CONFLICT — Xoá 1 mockup đang dùng có thực sự được server chặn (403/lỗi "already been used") giống như xoá nhiều cái, hay route xoá-1 là một exception/bug không kiểm in-use (KB-062)? Side A: spec-hub `mockups-library-in-use` (S2, code, không phân biệt số lượng) / Side B: QA đo trực tiếp route xoá-1 trên staging, DELETE không body, không thấy gọi kiểm tra. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  KB-062 (canon hiện tại): "Xoá một mockup: DELETE không body, không gọi kiểm tra in-use."
  mockups-library-in-use (spec-hub): "A mockup library image that is used in any mockup ... cannot be deleted: the merchant sees 'The layer has already been used!'."
  ```
