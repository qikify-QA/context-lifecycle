# Context Change Request: open-api-spechub-rate-limit — đối chiếu spec-hub cho rate limit và daily limit

- **Product:** `teeinblue`
- **Object:** `open-api`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — không ảnh hưởng checklist đang publish (các KB liên quan đang ở oracle BASELINE, không STRONG); chỉ làm giàu/nâng độ tin cậy quan sát hiện có bằng nguồn code-level từ spec-hub (nội bộ team, đọc trực tiếp source code teeinblue-api). Người gửi: operator, qua phiên tra cứu `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 144, 152).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Open API cho phép tối đa 60 request/phút/account (toàn Open API, không phân biệt route), và việc tạo clipart categories/cliparts/library images qua Open API tính vào daily limit chung của account: mặc định 1.000 clipart category, 4.000 clipart, 1.000 library image mỗi 24 giờ (áp dụng chung cho portal, API và bulk upload); vượt ngưỡng trả lỗi "Reach the limit ... Wait until ... to try again or contact support to increase."
- **Object / feature:** open-api/open-api-asset-upload
- **Quan hệ với canon:** `ADD` (củng cố KB-010 — header quota quan sát trên staging — và KB-044, KB-049 — CONFIRMED_EXPECTED mức MEDIUM từ Jira TIB-5536 comment dev — bằng nguồn độc lập đọc trực tiếp source code)
- **Scope:** owner (merchant), api (mọi route /openapi/v1)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub (dịch vụ spec nội bộ, đọc source code teeinblue-api), đối chứng Jira TIB-4223 (2025-10-28) và TIB-4963 (2026-07-23)
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=144 (câu hỏi "What is the daily limit counting window...") và log_id=152, rule id `api-tokens-asset-limits` (feature `api-tokens`) và `open-api-rate` (feature `open-api`), `sure: green`, `sources: [{kind: code}, {kind: jira, ref: "TIB-4223", when: "2025-10-28"}, {kind: jira, ref: "TIB-4963", when: "2026-07-23"}]`. Rule `open-api-rate` riêng chỉ có `sources: [{kind: code}]` không ngày — không dùng làm authored_on, chỉ trích phần trùng nội dung với `api-tokens-asset-limits` để tham chiếu. Cửa sổ tính (rolling 24h hay reset nửa đêm) spec-hub không nói rõ — giữ nguyên là điểm chưa xác nhận (xem OQ).
- **OQ:** NEEDS_CONFIRMATION — Cửa sổ đếm daily limit là rolling 24h từ lần tạo đầu tiên hay reset cố định theo giờ (liên quan OQ hiện có về mốc bắt đầu cửa sổ, và conflict CFL-003 với asset-category KB-567/568)? Spec-hub không phân biệt rõ. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  api-tokens-asset-limits: "Each account can create at most 1,000 clipart categories, 4,000 cliparts and 1,000 library images in a 24-hour window, whether from the portal, the API or bulk uploads. Support can set different limits per account. Over the limit the request fails with 'Reach the limit ... Wait until ... to try again or contact support to increase.'"
  open-api-rate: "The API allows 60 requests a minute per account."
  ```

### CLAIM-02

- **Statement:** Header quota (`x-ratelimit-limit`, `x-ratelimit-remaining`) có mặt trên response thành công/lỗi validation của route thật, không có trên 401/302/405 và 404 của route không tồn tại — khớp với cơ chế daily-limit nêu ở CLAIM-01, không phải một rate-limit riêng.
- **Object / feature:** open-api/open-api-asset-upload
- **Quan hệ với canon:** `ADD` (làm giàu KB-010, KB-011 — hiện LOW/MEDIUM, chỉ dựa trên quan sát staging)
- **Scope:** owner (merchant), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có ngày/Jira nên không đủ điều kiện S3 theo `contracts/qa-context-contract.md` dòng 156-163 (`authored_on` phải là ngày nguồn nghiệp vụ, không phải ngày truy vấn)
- **Mã rule:** `spec-hub:open-api-rate`, `spec-hub:api-tokens-see-limits`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api, không có xác nhận PO/Dev riêng cho chi tiết header)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=144, rule id `api-tokens-see-limits` ("Merchants can see, for cliparts, clipart categories and library images, their daily limit, how many are left and how long until it resets.")
- **OQ:** NEEDS_CONFIRMATION — Header `x-ratelimit-*` trên Open API có đúng là cách hiển thị daily-limit (không phải cơ chế riêng), và có luôn đồng bộ với số liệu trong `api-tokens-see-limits` không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  api-tokens-see-limits: "Merchants can see, for cliparts, clipart categories and library images, their daily limit, how many are left and how long until it resets."
  ```
