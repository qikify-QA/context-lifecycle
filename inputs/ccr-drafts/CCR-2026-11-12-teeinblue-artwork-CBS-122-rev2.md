# Context Change Request: artwork-mcp-update-archive — chuyển khuôn từ CBS-039 (status, update-artwork-tool, guard Artwork 1.0)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5488, QA-3425`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage tool MCP; Proposal gốc CBS-039 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Canon chưa có enum status hay guard MCP nên không có checklist publish chạy sai.

<!-- rev2 2026-11-12 của Proposal CBS-122: bổ sung nguồn tra được ở spec-hub, Testlane, Jira (chỉ đọc). Ship: TIB-5488 vẫn QA Review, PR #4050 còn mở (đọc 2026-11-12) nên CLAIM-01/02 giữ NOT_SHIPPED; guard schema 1.0 ship qua TIB-5572 (Done 2026-10-24). spec-hub feature mcp v3 không có rule nào về enum status, update trên Archived hay guard schema_version (ask log_id 228, 229, 230). Testlane QA-3425 TC-27 = TC-TIB-6943 đang skipped. -->

# Khối A — Hành vi

Cả ba claim là phép đo của AI trên staging, QA duyệt fact vào knowledge QA local, không phải Dev/PO. QA-3425 TC-27 chưa đạt tick PASS toàn phần: dòng 1 (artwork thường, Archived) ✅ AI 2026-10-26 và 2026-10-28; dòng 2 (artwork activate từ PSD) chưa chạy vì chưa có fixture PSD, lượt 2026-11-02 ⏭️. TIB-5488 còn QA Review, build không rõ.

### CLAIM-01

- **Statement:** Enum `status` của artwork khi gọi qua MCP: `0` là "Status Default" (Active), `1` là "Status Archive" (Archived).
- **Object / feature:** artwork/MỚI: mcp-artwork-tools (Thuộc: các MCP tool của Artwork server; Không thuộc: tool của object khác)
- **Quan hệ với canon:** `ADD` (canon chỉ có KB-047, UI menu archive, không nói enum)
- **Scope:** owner (merchant qua token MCP); api (get-artwork-tool, archive-artwork-tool)
- **Đã ship:** `NOT_SHIPPED`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** AI (chạy MCP trên staging, QA duyệt fact), 2026-10-26
- **Locator:** QA-3425 TC-27 (kết quả 2026-10-26 và 2026-10-28), knowledge QA local FACT-174. Phân tích yêu cầu trước đó ghi "chưa truy được" giá trị Archived. Chưa Dev/PO xác nhận enum.
- **OQ:** NEEDS_CONFIRMATION — Enum status artwork qua MCP (0 Active, 1 Archived) có đúng không (chưa Dev/PO xác nhận, chưa ship)? — Người trả lời: Dev.
- **Rule QA có chủ:** mã `FACT-174` · vai trò sở hữu: QA · ngày ghi nhận: 2026-10-26 · nơi mở lại được: Proposal CBS-122 CLAIM-01; task Testlane TIB-237 (QA-3425) (rev2: xếp S2 theo quyết định operator 2026-11-12, không cần đường dẫn repo QA)
- **Nguồn bổ sung (rev2, một phần):** `po_dev_confirm` · Dev · Jira TIB-5488 comment 55406 (2026-10-22) và comment 56569 (2026-11-05) · https://ownego.atlassian.net/browse/TIB-5488 · chỉ xác nhận `0` = Active (và 2 = Pending, 3 = Importing); không nói giá trị Archived nên không đủ S3 cho cả claim.
  > "lần ghi thành công đầu tiên trên artwork Pending (status 2, sau khi import xong) sẽ chuyển artwork sang Active (status 0)"
  > "Status 2 sau import là trạng thái chờ review, không phải bị kẹt: nó chỉ sang 0 sau lần `update-artwork-tool` đầu tiên."
- **Testlane (rev2):** QA-3425 TC-27 = TC-TIB-6943, status `skipped` (dòng 2 chưa chạy); không phải record PASS.
- **OQ (rev2):** Dev xác nhận giá trị `status` của artwork Archived khi đọc qua `get-artwork-tool` / `archive-artwork-tool` là `1` ("Status Archive") không? Các giá trị 0/2/3/4 đã có trong comment TIB-5488.
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
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev, 2026-10-22 (Jira TIB-5488 comment 55406, mục "Gợi ý test")
- **Locator:** Jira TIB-5488 comment 55406 "Summary cho QA" (2026-10-22), dòng Regression · https://ownego.atlassian.net/browse/TIB-5488 · PR https://github.com/qikify/teeinblue-api/pull/4050 | kèm: QA-3425 TC-27 = TC-TIB-6943 (Testlane, `skipped`), knowledge QA local FACT-175.
- **Ghi chú ship (rev2):** TIB-5488 vẫn `QA Review`, PR #4050 còn mở (đọc 2026-11-12) nên giữ `NOT_SHIPPED` theo ticket. Câu của Dev nằm ở mục Regression, tức hành vi có từ trước TIB-5488; operator cân nhắc đổi `Đã ship` nếu hành vi này coi là của tool cũ.
- **OQ (rev2):** Không cần cho nội dung claim. Chỉ còn câu ship: hành vi "update trên artwork Archived không đổi status" có từ trước TIB-5488 (đã live trên production) không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Dev, Jira TIB-5488 comment 55406, 2026-10-22:
  * Regression: `update-artwork-tool` trên artwork Active/Archived bình thường không đổi status; upload layer image / clipart qua MCP vẫn hoạt động như cũ.
  --- (trích cũ, giữ để đối chiếu) ---
  update-artwork-tool trên artwork Archived KHÔNG kích hoạt lại — archive rồi update 1 field nhỏ (name), status vẫn `1` sau update.
  archive rồi update: archive-artwork-tool → status=1 (Archive) → update-artwork-tool (name mới) → get-artwork-tool: status TRƯỚC=1 (Archive), SAU=1 (Archive) — KHÔNG bị kích hoạt lại, đúng expected
  ```

### CLAIM-03

- **Statement:** `update-artwork-tool` từ chối artwork `schema_version: 1` (Artwork 1.0) với lỗi `artwork.schema_version.not_2`: tool chỉ đọc được 1.0, không ghi; hướng dẫn dùng `bulk-convert-artworks-tool` hoặc convert tay trong portal; là hành vi thiết kế, không phải bug.
- **Object / feature:** artwork/MỚI: mcp-artwork-tools
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant qua token MCP); api (update-artwork-tool)
- **Đã ship:** `SHIPPED` (rev2: guard ship cùng TIB-5572, Done 2026-10-24; không phụ thuộc TIB-5488)
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** AI (chạy MCP trên staging, QA duyệt fact), 2026-10-26
- **Locator:** QA-3425 TC-27 (artwork 1.0 thử trên staging), knowledge QA local FACT-176. Phần "guard 1.0 giữ nguyên, chỉ đổi message" do Dev mô tả nằm ở CCR QA-3409 (TIB-5572), không nhân lại ở đây; trùng một phần phạm vi với CCR bulk-convert đang mở.
- **OQ:** NEEDS_CONFIRMATION — update-artwork-tool từ chối artwork schema_version 1 với lỗi artwork.schema_version.not_2 có đúng và còn hiện hành không (chưa ship, trùng một phần CCR bulk-convert đang mở)? — Người trả lời: Dev.
- **Rule QA có chủ:** mã `FACT-176` · vai trò sở hữu: QA · ngày ghi nhận: 2026-10-26 · nơi mở lại được: Proposal CBS-122 CLAIM-03; task Testlane TIB-237 (QA-3425) (rev2: xếp S2 theo quyết định operator 2026-11-12, không cần đường dẫn repo QA)
- **Nguồn bổ sung (rev2, phần lõi):** `po_dev_confirm` · Dev · Jira TIB-5572 comment 54642 (2026-10-15) · https://ownego.atlassian.net/browse/TIB-5572 · PR https://github.com/qikify/teeinblue-api/pull/4008 · xác nhận update/validate tool từ chối artwork 1.0 và message trỏ tới `bulk-convert-artworks-tool`. Không có mã lỗi `artwork.schema_version.not_2` và không nói "convert tay trong portal", nên cả claim chưa lên S3. Muốn S3 thì rút Statement về đúng câu của Dev, hoặc Dev xác nhận mã lỗi.
  > "* **config** — MCP instructions and the 1.0 guard messages in update/validate tools now point to the new tool."
  > "* [ ] Regression: MCP update/validate tools on a 1.0 artwork still refuse with a message pointing to the new tool; normal 2.0 edits unaffected."
- **OQ (rev2):** Dev xác nhận mã lỗi `update-artwork-tool` trả về khi artwork có `schema_version: 1` đúng là `artwork.schema_version.not_2`, và message có nhắc cách convert tay trong portal không?
- **Trích nguyên văn:**
  ```
  `update-artwork-tool` từ chối artwork `schema_version: 1` (Artwork 1.0) với lỗi `artwork.schema_version.not_2` — tool chỉ đọc được 1.0, không viết được. Hành vi design, cần `bulk-convert-artworks-tool` hoặc convert tay trong portal trước.
  ```
