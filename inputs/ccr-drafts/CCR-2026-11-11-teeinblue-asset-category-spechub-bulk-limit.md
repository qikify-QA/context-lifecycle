# Context Change Request: asset-category-spechub-bulk-limit — đối chiếu spec-hub cho giới hạn bulk-upload zip theo plan

- **Product:** `teeinblue`
- **Object:** `asset-category`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — nếu CLAIM-01 đúng, banner client đang hiển thị sai số cho merchant (2GB/10 file plan Blue không khớp bất kỳ tier nào ở code). Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 165).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Giới hạn dung lượng file zip khi bulk-upload clipart: tối đa 512 MB ở plan mặc định, 1024 MB ở Enterprise, 2024 MB ở shop beta; hàng đợi tối đa 5 (mặc định) hoặc 10 (Enterprise, beta) bulk-upload chờ xử lý cùng lúc, lỗi "Too many files in queue (max n)...". Số liệu này không khớp với banner tĩnh hiện tại ghi "plan Blue = 2GB / 10 file" — không có tier nào tên "Blue" trong code, và không tier nào có đúng cặp số (2GB, 10 file) cùng lúc (2024MB gần đúng 2GB nhưng đó là tier beta, không phải Blue; queue 10 khớp Enterprise/beta, không khớp default).
- **Object / feature:** asset-category/asset-category-bulk-upload
- **Quan hệ với canon:** `CONTRADICTS KB-022` (KB-022 hiện tại: LOW, nguồn banner tĩnh phía client, "plan Blue = 2GB / 10 file")
- **Scope:** owner (merchant), portal (bulk-upload zip)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub (đọc source code teeinblue-api), đối chứng Jira TIB-4831 (2026-03-20, "Increase the limit of Clipart bulk upload")
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=165, rule id `clipart-library-bulk-limits` (feature `clipart-library`), `sure: green`, `sources: [{kind: code}, {kind: jira, ref: "TIB-4831", when: "2026-03-20"}]`
- **OQ:** CONFLICT — Banner client ghi "plan Blue = 2GB / 10 file" có đang hiển thị sai (lỗi thời, không khớp tier thật), hay "Blue" là tên gọi nội bộ khác của một trong các tier default/Enterprise/beta mà spec-hub chưa map được? Side A: KB-022, banner tĩnh phía client quan sát trên staging / Side B: spec-hub `clipart-library-bulk-limits` (S3, code + Jira TIB-4831) liệt kê 3 tier default/Enterprise/beta, không có "Blue". — Người trả lời: Dev hoặc PO (ai đặt tên plan "Blue").
- **Trích nguyên văn:**
  ```
  clipart-library-bulk-limits: "A bulk upload ZIP can be at most 512 MB on default plans, 1024 MB on Enterprise and 2024 MB for beta shops; and only 5 (default) or 10 (Enterprise, beta) bulk uploads can wait in the queue at once ('Too many files in queue (max n). Please wait until some files are processed before trying again.')."
  ```

### CLAIM-02

- **Statement:** Daily limit tạo clipart/category/library image qua Open API hoặc bulk-upload đều tính vào một giới hạn chung của account (mặc định 1.000 clipart category, 4.000 clipart, 1.000 library image/24h). Đây là bằng chứng độc lập, cùng chiều với KB-567/KB-568 (asset-category-item-management) và với open-api KB-044/KB-049.
- **Object / feature:** asset-category/asset-category-item-management
- **Quan hệ với canon:** `ADD` (củng cố KB-567, KB-568 — hiện LOW/MEDIUM)
- **Scope:** owner (merchant), api, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub (đọc source code teeinblue-api), đối chứng Jira TIB-4223 (2025-10-28) và TIB-4963 (2026-07-23)
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=162, rule id `api-tokens-asset-limits` (feature `api-tokens`), `sure: green`
- **OQ:** NEEDS_CONFIRMATION — Cửa sổ đếm (rolling 24h hay reset cố định) vẫn chưa xác nhận — liên quan trực tiếp đến conflict CFL-003 giữa KB-567 và KB-568 đã mở từ trước; CLAIM này không đủ để phân xử CFL-003, chỉ xác nhận lại con số ngưỡng. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  api-tokens-asset-limits: "Each account can create at most 1,000 clipart categories, 4,000 cliparts and 1,000 library images in a 24-hour window, whether from the portal, the API or bulk uploads."
  ```
