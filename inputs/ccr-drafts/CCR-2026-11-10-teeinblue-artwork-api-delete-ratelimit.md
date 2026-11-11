# Context Change Request: artwork-api-delete-ratelimit — chuyển khuôn từ CBS-036 (phần xoá và rate limit)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage API xoá artwork; Proposal gốc CBS-036 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Canon KB-061 chưa nói rate limit có thực thi nên không có checklist đang publish chạy sai.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Artwork đang gắn campaign thì không xoá được: `DELETE /api/artworks/{id}` trả 403 với trang HTML "Forbidden" của Laravel (không phải JSON), còn artwork không gắn campaign thì xoá được (204).
- **Object / feature:** artwork/artwork-list-management
- **Quan hệ với canon:** `ADD` (KB-047 chỉ có dialog xác nhận xoá trên UI, không nói bị chặn)
- **Scope:** owner (merchant); api (REST DELETE), db (bảng liên kết artwork với campaign)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-07
- **Locator:** Knowledge QA local FACT-049, QA đo tay bằng API trên staging, đối chứng 1 artwork có row liên kết campaign (403) với 2 artwork không có row (204); không ticket, không test case, build không rõ. Chưa thử lại. Ghi chú từ khuôn cũ (mục Không đề xuất): không coi 403 và trang HTML là hành vi PO/Dev chủ đích, đó mới là quan sát; câu "nên có thông báo tử tế khi xoá artwork đang dùng" trong nguồn là kỳ vọng của QA, chưa ai xác nhận. Câu hỏi mở cho Dev/PO: 403 HTML có phải thiết kế không, và UI portal phải hiện thông báo gì khi xoá artwork đang gắn campaign.
- **OQ:** OPEN_ISSUE — 403 HTML khi xoá artwork đang gắn campaign có phải thiết kế không, và UI portal phải hiện thông báo gì trong trường hợp này (nguồn chỉ là quan sát của QA, chưa ship rõ)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Artwork ĐANG GẮN CAMPAIGN thì không xoá được — `DELETE /api/artworks/{id}` trả 403 (đo 2026-09-07). Trả về trang HTML "Forbidden" của Laravel, không phải JSON, nên log lỗi trông như hỏng auth/CORS chứ không giống "bị chặn có chủ đích". Đo đối chứng: aw#3797 (1 row `campaign_artwork_printareas`) → 403; aw#3804 và #3808 (0 row) → 204.
  ```

### CLAIM-02

- **Statement:** API artwork có rate limit: POST tạo artwork liên tiếp (4 artwork trong hai lượt sát nhau) trả 429 "Too Many Requests" dạng trang HTML, ngưỡng và cửa sổ chưa đo.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `CONTRADICTS KB-061` (KB-061, 2026-09-10, INFERRED: header liệt kê tên các header rate-limit nhưng chưa đủ evidence kết luận có rate limit thực thi)
- **Scope:** owner (merchant); api (REST POST /api/artworks)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-07
- **Locator:** Knowledge QA local FACT-050, QA đo khi dựng fixture trên staging, không ticket, không test case. Ghi chú từ khuôn cũ: không coi đây là spec rate limit, ngưỡng và cửa sổ chưa đo, chỉ là hiện tượng khi dựng fixture; chưa Dev xác nhận.
- **OQ:** CONFLICT — Rate limit của API artwork có thực thi không, và ngưỡng, cửa sổ là bao nhiêu (đo tay của QA, chưa Dev xác nhận)? — Người trả lời: Dev. Side A: KB-061 (INFERRED) chưa đủ evidence kết luận có rate limit thực thi / Side B: QA đo POST liên tiếp trả 429 trang HTML.
- **Trích nguyên văn:**
  ```
  API artwork có rate limit — POST liên tiếp trả 429 "Too Many Requests" (đo 2026-09-07). Dựng 4 artwork hai lượt sát nhau là dính; cũng là trang HTML, không phải JSON.
  ```

### CLAIM-03

- **Statement:** `DELETE /api/artworks/{id}` là soft delete: row vẫn còn trong GraphQL với `deleted_at` được set, nên query thiếu filter `deleted_at:{_is_null:true}` thấy cả bản đã xoá.
- **Object / feature:** artwork/artwork-list-management
- **Quan hệ với canon:** `ADD` (OQ-artwork-016, NEEDS_CONFIRMATION: chưa xác nhận soft hay hard delete)
- **Scope:** owner (merchant); api (REST DELETE, GraphQL artworks), db (artworks.deleted_at)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-09-07
- **Locator:** Ghi chú quyết định QA local (mục DEC-PRE), quan sát khi dựng và dọn fixture bằng API. Ghi chú từ khuôn cũ: không coi là xác nhận của Dev; phần "user chốt 2026-09-07" trong nguồn chỉ là quyết định không sửa các call site query cũ, không phải xác nhận hành vi sản phẩm. Trả lời cho OQ-artwork-016 chỉ ở mức quan sát.
- **OQ:** NEEDS_CONFIRMATION — DELETE artwork là soft delete (set deleted_at) hay hard delete (nguồn chỉ là quan sát khi dọn fixture, không có Dev xác nhận; liên quan OQ-artwork-016)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  `DELETE /api/artworks/{id}` là **soft delete** — row vẫn còn trong GraphQL, chỉ set `deleted_at`; query thiếu `deleted_at:{_is_null:true}` thấy cả xác chết.
  ```
