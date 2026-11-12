# Context Change Request: artwork-mcp-import-tool — chuyển khuôn từ CBS-039 (import-artwork-json-tool)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5486, QA-3423`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage tool MCP mới; Proposal gốc CBS-039 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Chưa có canon về MCP tool nên không có checklist publish chạy sai.

# Khối A — Hành vi

Chưa có test case nào xác nhận: ở các lượt chạy tự động QA-3423 ngày 2026-11-02 tool trả "Tool [import-artwork-json-tool] not found" (TC-01, 02, 18, 19, 20 ⏸️ thiếu fixture; TC-22, 23 ⏭️ thiếu fixture quota; TC-25, 26 chưa có kết quả). Con số cap và quota là giá trị Dev nêu trong code (env, config), có thể đổi theo cấu hình, không phải spec cố định của PO.

### CLAIM-01

- **Statement:** `import-artwork-json-tool` giới hạn mỗi lần gọi: tối đa 20 `clipart_categories` và 20 `global_options` inline; mỗi category tối đa 50 item và không vượt cap clipart mỗi category (mặc định 300, hoặc theo `users.config.clipart_max_per_category`).
- **Object / feature:** artwork/MỚI: mcp-artwork-tools (Thuộc: các MCP tool của Artwork server, cap, quota, enum, guard; Không thuộc: tool của object khác như thumbnail/mockup). Chạm thêm asset-category (cap item mỗi category).
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (MCP Artwork server)
- **Đã ship:** `NOT_SHIPPED` (TIB-5486 còn QA Review, staging; production không rõ)
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5486 comment 55629 (https://ownego.atlassian.net/browse/TIB-5486?focusedCommentId=55629), trả lời RQ16 của QA-3423. Knowledge QA local FACT-170. Cap này độc lập với quota ngày. Chưa có TC xác nhận.
- **OQ:** NEEDS_CONFIRMATION — Cap mỗi lần gọi của import-artwork-json-tool (20 category, 20 global_options, 50 item mỗi category, cap clipart mỗi category) có đúng khi TIB-5486 ship không (Dev nêu ở comment, chưa có TC, chưa ship)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Giới hạn trong 1 lần gọi:
  tối đa 20 clipart category;
  tối đa 20 global option;
  mỗi category tối đa 50 item, và không vượt số clipart tối đa của 1 category (mặc định 300, hoặc theo users.config.clipart_max_per_category).
  ```

### CLAIM-02

- **Statement:** `import-artwork-json-tool` có quota mỗi ngày (cửa sổ 24h, đếm bằng Redis): `clipart_category` 1000 mỗi ngày (env `USER_RATE_LIMITER_CLIPART_CATEGORY_MAX_ATTEMPTS`), `clipart` 4000 mỗi ngày (env `USER_RATE_LIMITER_CLIPART_MAX_ATTEMPTS`); `global_option` không có quota theo ngày, chỉ cap 20 mỗi lần gọi.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools
- **Quan hệ với canon:** `ADD` (số 4000 và 1000 khớp asset-category KB-035 và KB-036 đo trên REST; phạm vi chung hay riêng xem CLAIM-03)
- **Scope:** owner (merchant qua token MCP); api (MCP), db (cột giới hạn clipart và clipart_category của users)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5486 comment 55629 (https://ownego.atlassian.net/browse/TIB-5486?focusedCommentId=55629), trả lời RQ16. Chưa có TC xác nhận.
- **OQ:** NEEDS_CONFIRMATION — Quota mỗi ngày của import-artwork-json-tool (1000 clipart_category, 4000 clipart) có đúng khi TIB-5486 ship không (chưa có TC, chưa ship)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Quota mỗi ngày (cửa sổ 24h, đếm bằng Redis):
  clipart_category: 1000/ngày (env USER_RATE_LIMITER_CLIPART_CATEGORY_MAX_ATTEMPTS);
  clipart: 4000/ngày (env USER_RATE_LIMITER_CLIPART_MAX_ATTEMPTS).
  global_option không có quota theo ngày, chỉ có cap 20 mỗi call.
  ```

### CLAIM-03

- **Statement:** Knowledge QA ghi quota clipart và clipart_category của import tool là "RIÊNG cho tool này, không phải baseline portal-api chung", nhưng Dev chỉ nêu số quota và tên env, không nói bộ đếm có dùng chung với REST (`POST /api/cliparts/svg`, `POST /api/clipart-categories`) hay không; số 4000 và 1000 trùng với x-ratelimit đo trên REST nên có thể là cùng một limiter.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools (chạm asset-category)
- **Quan hệ với canon:** `CONTRADICTS KB-035, KB-036` (canon: cùng resource `user_rate_limiter:clipart` limit 4000 và `user_rate_limiter:clipart_category` limit 1000 đo trên REST)
- **Scope:** owner (merchant); api (MCP và REST)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến), 2026-10-26
- **Locator:** Knowledge QA local FACT-171; vế "RIÊNG" là suy diễn của QA, không phải lời Dev/PO. Chưa ai gọi REST và MCP trên cùng account rồi so bộ đếm. Câu hỏi mở cho Dev: bộ đếm quota của MCP import có dùng chung với REST không.
- **OQ:** CONFLICT — Bộ đếm quota clipart và clipart_category của MCP import có dùng chung limiter với REST không? — Người trả lời: Dev. Side A: KB-035, KB-036 ghi cùng resource user_rate_limiter:clipart (4000) và user_rate_limiter:clipart_category (1000) đo trên REST / Side B: knowledge QA FACT-171 ghi quota là RIÊNG cho import tool (suy diễn của QA).
- **Trích nguyên văn:**
  ```
  Quota mỗi ngày (cửa sổ 24h, đếm bằng Redis) — RIÊNG cho tool này, không phải baseline portal-api chung 2026-10-06: `clipart_category` 1000/ngày, `clipart` 4000/ngày. `global_option` KHÔNG có quota theo ngày, chỉ cap 20/call.
  ```

### CLAIM-04

- **Statement:** Field `source` của category hoặc clipart tạo qua MCP luôn là "mcp" ở cả hai đường (`import-artwork-json-tool` và gọi trực tiếp `create-clipart-category-tool`), vì cả hai đều đi qua `ClipartCategoryCreator` với `ClipartCategorySource::Mcp`; field này không phân biệt được hai đường tạo.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools (chạm asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (MCP), db (cột source của clipart_categories)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5486 comment 55629 (https://ownego.atlassian.net/browse/TIB-5486?focusedCommentId=55629), trả lời RQ17. Knowledge QA local FACT-173. Chưa quan sát được trên dữ liệu: response của `create-clipart-category-tool` không trả field `source` (QA-3423 TC-32); câu hỏi mở: đọc `source` ở đâu (DB, GraphQL, UI) để kiểm.
- **OQ:** OPEN_ISSUE — Field source của category/clipart tạo qua MCP luôn là "mcp", và kiểm ở đâu (DB, GraphQL, UI) vì response create-clipart-category-tool không trả field source (chưa ship)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  RQ17 – Giá trị source: A
  Cả hai đường đều gọi ClipartCategoryCreator với ClipartCategorySource::Mcp, nên source đều là mcp.
  ```
