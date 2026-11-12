# Context Change Request: artwork-mcp-update-archive — chuyển khuôn từ CBS-039 (status, update-artwork-tool, guard Artwork 1.0)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5488, QA-3425`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage tool MCP; Proposal gốc CBS-039 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Canon chưa có enum status hay guard MCP nên không có checklist publish chạy sai.

# Khối A — Hành vi

Cả ba claim là phép đo của AI trên staging, QA duyệt fact vào knowledge QA local, không phải Dev/PO. QA-3425 TC-27 chưa đạt tick PASS toàn phần: dòng 1 (artwork thường, Archived) ✅ AI 2026-10-26 và 2026-10-28; dòng 2 (artwork activate từ PSD) chưa chạy vì chưa có fixture PSD, lượt 2026-11-02 ⏭️. TIB-5488 còn QA Review, build không rõ.

### CLAIM-01

- **Statement:** Enum `status` của artwork khi gọi qua MCP: `0` là "Status Default" (Active), `1` là "Status Archive" (Archived).
- **Object / feature:** artwork/MỚI: mcp-artwork-tools (Thuộc: các MCP tool của Artwork server; Không thuộc: tool của object khác)
- **Quan hệ với canon:** `ADD` (canon chỉ có KB-047, UI menu archive, không nói enum)
- **Scope:** owner (merchant qua token MCP); api (get-artwork-tool, archive-artwork-tool)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI (chạy MCP trên staging, QA duyệt fact), 2026-10-26
- **Locator:** QA-3425 TC-27 (kết quả 2026-10-26 và 2026-10-28), knowledge QA local FACT-174. Phân tích yêu cầu trước đó ghi "chưa truy được" giá trị Archived. Chưa Dev/PO xác nhận enum.
- **OQ:** NEEDS_CONFIRMATION — Enum status artwork qua MCP (0 Active, 1 Archived) có đúng không (chưa Dev/PO xác nhận, chưa ship)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Enum status artwork — CONFIRMED bằng thực đo (archive-artwork-tool/get-artwork-tool): `0 = "Status Default"` (Active), `1 = "Status Archive"` (Archived).
  ```

### CLAIM-02

- **Statement:** `update-artwork-tool` trên artwork Archived không kích hoạt lại: archive rồi update một field nhỏ (name) thì status vẫn là `1`; update trên artwork Active giữ status `0`.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (update-artwork-tool)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI (chạy MCP trên staging, QA duyệt fact), 2026-10-26
- **Locator:** QA-3425 TC-27 dòng 1 ✅ AI (2026-10-26, lặp 2026-10-28), knowledge QA local FACT-175.
- **OQ:** NEEDS_CONFIRMATION — update-artwork-tool trên artwork Archived không kích hoạt lại (status giữ 1) có là hành vi chủ đích không (chưa ship, chỉ có kết quả TC)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  update-artwork-tool trên artwork Archived KHÔNG kích hoạt lại — archive rồi update 1 field nhỏ (name), status vẫn `1` sau update.
  archive rồi update: archive-artwork-tool → status=1 (Archive) → update-artwork-tool (name mới) → get-artwork-tool: status TRƯỚC=1 (Archive), SAU=1 (Archive) — KHÔNG bị kích hoạt lại, đúng expected
  ```

### CLAIM-03

- **Statement:** `update-artwork-tool` từ chối artwork `schema_version: 1` (Artwork 1.0) với lỗi `artwork.schema_version.not_2`: tool chỉ đọc được 1.0, không ghi; hướng dẫn dùng `bulk-convert-artworks-tool` hoặc convert tay trong portal; là hành vi thiết kế, không phải bug.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (update-artwork-tool)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI (chạy MCP trên staging, QA duyệt fact), 2026-10-26
- **Locator:** QA-3425 TC-27 (artwork 1.0 thử trên staging), knowledge QA local FACT-176. Phần "guard 1.0 giữ nguyên, chỉ đổi message" do Dev mô tả nằm ở CCR QA-3409 (TIB-5572), không nhân lại ở đây; trùng một phần phạm vi với CCR bulk-convert đang mở.
- **OQ:** NEEDS_CONFIRMATION — update-artwork-tool từ chối artwork schema_version 1 với lỗi artwork.schema_version.not_2 có đúng và còn hiện hành không (chưa ship, trùng một phần CCR bulk-convert đang mở)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  `update-artwork-tool` từ chối artwork `schema_version: 1` (Artwork 1.0) với lỗi `artwork.schema_version.not_2` — tool chỉ đọc được 1.0, không viết được. Hành vi design, cần `bulk-convert-artworks-tool` hoặc convert tay trong portal trước.
  ```
