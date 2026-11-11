# Context Change Request: font-spechub-naming-validation — đối chiếu spec-hub cho đặt tên trùng và validate file font

- **Product:** `teeinblue`
- **Object:** `font`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — chỉ làm rõ chi tiết, không phát hiện sai lệch nghiêm trọng. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 156).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Font mới được đặt tên theo tên file, loại bỏ ký tự đặc biệt (chỉ giữ chữ, số, khoảng trắng, dấu gạch ngang/gạch dưới); tên gốc (bên trong file font) được giữ lại riêng để merchant tự nhận diện trùng — hệ thống không tự chặn upload tên trùng, chỉ hỗ trợ merchant nhận ra bằng mắt qua tên gốc hiển thị.
- **Object / feature:** font/upload-custom-font
- **Quan hệ với canon:** `ADD` (củng cố KB-012 — LOW, "Upload trùng tên — không thấy uniqueness validation")
- **Scope:** owner (merchant), portal (trang Fonts)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]` + Jira TIB-1833 nhưng Jira đó (2024-02-21) nói về việc hiển thị tên gốc, không trực tiếp xác nhận KHÔNG CÓ validation trùng tên — phần "không chặn upload" suy ra gián tiếp từ cách rule diễn đạt ("so duplicates can be spotted" = con người tự nhận ra, không phải hệ thống tự chặn), nên giữ S2 cho phần suy luận này.
- **Mã rule:** `spec-hub:fonts-name`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=156, rule id `fonts-name` (feature `fonts`)
- **OQ:** NEEDS_CONFIRMATION — Xác nhận rõ: upload font trùng tên gốc có bị chặn ở bất kỳ tầng nào (client hoặc server) không, hay hoàn toàn cho qua và chỉ dựa vào merchant tự nhận ra qua tên gốc hiển thị? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  fonts-name: "A new font is named after its file name with special characters removed (only letters, numbers, spaces, dashes and underscores stay); the font's own internal name is kept as the original name so duplicates can be spotted. Renaming follows the same character rule."
  ```

### CLAIM-02

- **Statement:** Upload font sai định dạng: file không đọc được như font bị server từ chối với message "Invalid font file"; file đọc được nhưng không convert được thì "Failed to process font" — đây là message ở tầng server, khác với mô tả hiện tại của KB-013 ("chặn ở client, không có message rõ").
- **Object / feature:** font/upload-custom-font
- **Quan hệ với canon:** `CONTRADICTS KB-013`? (cần làm rõ, xem OQ — có thể không mâu thuẫn thật nếu .png bị chặn ở client trước khi chạm server)
- **Scope:** owner (merchant), portal, api (upload font)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:fonts-file-types`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=156, rule id `fonts-file-types` (feature `fonts`)
- **OQ:** NEEDS_CONFIRMATION — KB-013 quan sát file .png bị chặn ở client trước khi gửi lên server, nên chưa từng thấy message "Invalid font file"/"Failed to process font" của server. Có cách nào vượt qua chặn client (vd gửi trực tiếp API) để QA kiểm message thật của server không? Nếu kiểm được và khớp, đây không phải conflict mà chỉ là KB-013 thiếu quan sát ở nhánh server. — Người trả lời: Dev (hoặc QA tự kiểm lại qua API).
- **Trích nguyên văn:**
  ```
  fonts-file-types: "Custom fonts are uploaded as .ttf or .otf files. A file that can't be read as a font is refused with 'Invalid font file'; one that can't be converted with 'Failed to process font'."
  ```
