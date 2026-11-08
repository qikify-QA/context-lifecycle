# Context Change Request: global-option — gộp từ 3 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `global-option`
- **Ticket:** `TIB-5561, QA-3435, TIB-5566, TIB-5470, QA-3406`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-024: MEDIUM — canon thiếu coverage cho field output size và check 4 MP (gap); CLAIM-23 chỉ là quan sát phụ, CHK-01-007, CHK-01-014 đã ở NEEDS_CONFIRMATION nên chưa đủ HIGH.
- CBS-026: MEDIUM — Canon thiếu coverage cho sync ảnh và position khi đổi template (gap); không có checklist hay automation đang publish nào chạy sai, không chặn test.
- CBS-029: MEDIUM — canon thiếu hoàn toàn tính năng đã ship (gap coverage); không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Check 4 MP áp cho save global option: GO Text to Image (Flux 2000×2001 → 422, 2000×2000 → 200) và GO Single upload có Gen AI effect Flux (mới — trước đây không check; 3000×2000 → 422 với key `data.effects.0.flux_output_width`)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-16, TC-17 PASS 2026-10-27, staging, build không ghi lại. MU GO: N/A vì portal không có loại GO này (CLAIM-20) (CCR cũ: CBS-024 CLAIM-09)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 ("Any global option, including a Single upload global option with a Flux Gen AI effect"); biên theo comment 55697 Q4
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — T2I GO 4 MP check, two toasts | Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200 | MU GO: N/A (see TC-08)
  TC-17 | ✅ AI — Single upload GO with Flux effect checked too | GO <id>: 1200×800 → 3000×2000 → 422 same message (`data.effects.0.flux_output_width`); 2000×2000 → 200
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - Any global option, including a **Single upload global option with a Flux Gen AI effect**, which was not checked before.
  ```

### CLAIM-02

- **Statement:** Known limitation: save global option lỗi → 2 toast: lỗi cụ thể ("Something went wrong! Flux dimension … 4 Megapixel)") + "Failed to save global option." (theo dev: mọi lỗi save trên trang này)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-16 PASS 2026-10-27, staging, build không ghi lại. Known limitation, KHÔNG dùng làm expected. "Mọi lỗi save trên trang này" chỉ theo dev summary 2026-10-26 (CCR cũ: CBS-024 CLAIM-11)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (Known limitation)
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — T2I GO 4 MP check, two toasts | Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - When a global option fails to save, two toasts appear: the specific error and a generic "Failed to save global option." This happens for every save error on that page, not only this one.
  ```

### CLAIM-03

- **Statement:** Portal không có loại global option Multiple Uploads (không tạo, sửa được trên portal); MCP tạo được một MU GO nhưng portal mở nó như form text
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (portal) + client MCP; portal · api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** QA-3435 ghi chú TC-08 (bước MU GO = N/A, không phải PASS). Phần portal không có MU GO khớp global-option KB-001 ("Multiple Uploads[Unavailable]"); phần MCP tạo được và portal mở như form text chưa có trong canon. Dev summary không nhắc MU GO. Chỉ là quan sát QA (CCR cũ: CBS-024 CLAIM-20)
- **Trích nguyên văn:**
  ```
  MU GO: N/A — portal has no Multiple Uploads GO type; an MCP-created MU GO (<id>) opened as a text form → deleted. Obs: MCP lets you create a MU GO the portal cannot edit
  Đối chiếu: dev summary (2026-10-26) chỉ nói "The same setting is added to the **Text-to-image** layer and its global option" — không nhắc MU GO. Canon `global-option` KB-001: "Multiple Uploads[Unavailable]".
  ```

### CLAIM-04

- **Statement:** Known limitation: global option đã lưu từ trước với Flux > 4 MP sẽ báo lỗi 4 MP ở lần save tiếp theo cho tới khi giảm size
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt) tự viết trong dev summary, 2026-10-26; không phải trả lời xác nhận
- **Locator:** Jira TIB-5561 dev summary 2026-10-26 mục Known limitation (không có comment id). QA chưa kiểm GO cũ. Known limitation, KHÔNG dùng làm expected (CCR cũ: CBS-024 CLAIM-21)
- **Trích nguyên văn:**
  ```
  - Global options already saved with a Flux size over 4 MP will show this error on their next save until the size is reduced.
  ```

### CLAIM-05

- **Statement:** Save (edit) global option ngày 2026-10-27 gửi request PUT (server trả 422 với lỗi validate `data.effects.0.flux_output_width`); `GET /api/global-options/{id}` tồn tại (GO của mình 200, GO account khác 403 "This action is unauthorized.", id không có 404)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `CONTRADICTS KB-006, KB-034`
- **Scope:** store owner/staff; api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-27; không có Dev, PO xác nhận
- **Locator:** Network ghi trong QA-3435 TC-16, TC-17 (PASS, nhưng TC không kiểm đường request) và TC-32 (tạm dừng). URL của PUT không ghi lại; chưa biết GraphQL có còn đi kèm không; có thể khác do build hoặc loại sửa (đổi title, đổi data effect). Canon hiện: KB-006 và KB-034 đang UNRESOLVED trong CONF-CBS-004-01 (OQ-global-option-022), cả hai ghi POST /api/graphql; CHK-01-007, CHK-01-014 đã hạ NEEDS_CONFIRMATION. Không đủ để sửa check khi chưa re-explore, không chọn phía (CCR cũ: CBS-024 CLAIM-23)
- **Trích nguyên văn:**
  ```
  TC-16 | … Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200
  TC-17 | … GO <id>: 1200×800 → 3000×2000 → 422 same message (`data.effects.0.flux_output_width`); 2000×2000 → 200
  TC-32 | ⏸️ AI — GET blocked (403); PUT to another account's GO not sent | `GET /api/global-options/{<id>}` → 403 "This action is unauthorized.", no data; missing <id> → 404; own <id> → 200
  Phía canon (giữ nguyên, không thay): `global-option` KB-006 (2026-09-15): "action Save KHÔNG gọi REST PUT /api/global-options/{id} mà gọi 1 GraphQL mutation do client tự dựng tên 'updateGlobalOption' … tới POST /api/graphql, trả 200."
  ```

### CLAIM-06

- **Statement:** Hành vi hiện tại có từ trước, không phải expected: trên staging (TIB-5416 tạm revert) Global Option photo layer dùng chung một position cho mọi template và giữ nguyên khi đổi template, trên layer khác tỉ lệ có thể trông bị giãn, là bug cũ do TIB-5416 sửa.
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-21
- **Locator:** Jira TIB-5566 comment 55235 mục Q9; dev summary 2026-10-21 (staging note). TC-24 chưa chạy. Có thể đã khác khi TIB-5416 lên; không suy ra gì cho production. Liên quan, không thay: global-option KB-029, CHK-02-004. (CCR cũ: CBS-026 CLAIM-17)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA (comment 55234): "On staging (TIB-5416 reverted), do Global Option photo layers still reset to the default position on every template switch, as in TIB-5220?"
  Q9: B — on staging (TIB-5416 reverted) Global Option photo layers share one position across templates, and it stays as-is on a template switch; on a layer of another ratio it may look stretched, which is the existing bug TIB-5416 fixes.
  Dev summary (chinhdt, 2026-10-21 — ngữ cảnh):
  - Global Option photo layers are not covered by this change. Per-layer positions for Global Options are handled in TIB-5416.

  **Staging note**: TIB-5416 has been temporarily reverted on staging (SDK `build-staging`) so this issue can be tested on its own.
  ```

### CLAIM-07

- **Statement:** Photo layer dùng Global Option: Global Option summary hiện `Run effects` cạnh `Image effects (N)` (N = số effect của GO), bên dưới liệt kê effect theo thứ tự trong GO dạng `[Effect name] · [Effect settings]`; bấm chạy effect của GO lên ảnh của chính layer này, GO không đổi
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-19
- **Locator:** description TIB-5470, mục Portal › Run effects, bullet Global Option (thêm 2026-10-19). Bổ trợ TC-82, TC-83, TC-84 PASS 2026-10-28. "GO không đổi" và "chạy lên ảnh của chính layer" là đọc spec cộng TC-83, spec không ghi nguyên chữ. TC-81 tạm dừng ([Effect settings] của Gemini cần so mockup) (CCR cũ: CBS-029 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - When a layer uses an existing **Global Option**:
    - Show `Run effects` next to `Image effects (N)` in the Global Option summary. N is the number of effects.
    - Below, list the effects in the order defined in the Global Option: `[Effect name] · [Effect settings]`
  ```

### CLAIM-08

- **Statement:** Với layer dùng Global Option, giá trị biến lưu theo layer, không lưu trên Global Option (hai layer dùng cùng GO giữ giá trị riêng; dữ liệu GO không đổi)
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-26
- **Locator:** description TIB-5470, mục Update: Prompt variables › Saved values. Bổ trợ TC-73 PASS 2026-10-28 build index.OMERs7BG.js (CCR cũ: CBS-029 CLAIM-29)
- **Trích nguyên văn:**
  ```
  - For Global Options, values are stored per layer, not on the Global Option.
  ```

### CLAIM-09

- **Statement:** Global Option có 0 effect: summary `Image effects (0)`, Run effects disabled, tooltip `Select a global option with image effects to run them.` (khác tooltip của layer Normal; spec không nói)
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-28; chưa ai xác nhận
- **Locator:** QA-3406 TC-85 tạm dừng 2026-10-28 (không PASS), build sáng không ghi tên bundle. Spec không nói về GO 0 effect; giả định QA (cùng tooltip layer Normal) sai so với build. KHÔNG dùng làm expected (CCR cũ: CBS-029 CLAIM-30)
- **Trích nguyên văn:**
  ```
  TC-85 | ⏸️ AI — assumption (PENDING-17) differs: other tooltip | GO <id> effects `[]` → `Image effects (0)`, button `disabled`, tooltip `Select a global option with image effects to run them.` (expected same tooltip as Normal layer `Applies all effects to the current image and replaces it.`) | GO restored. Behaviour is reasonable; QA/PO to accept the copy
  ```
