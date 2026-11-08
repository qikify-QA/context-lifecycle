# CBS-090 CLAIM-22

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Biến không khớp option nào (gõ sai, option bị đổi tên hoặc bị xoá → token cũ không còn khớp, `{{School.color}}`, biến JSON list, template selector): không có field, không chặn lượt chạy, token giữ nguyên trong prompt gửi provider (giống storefront); popover có cả biến khớp thì chỉ hiện field biến khớp
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-28
- **Locator:** Jira TIB-5470 comment 55851 dòng Q1 B, trả lời câu hỏi giangnth cùng ngày. Bổ trợ TC-67, 75, 76 PASS 2026-10-28 build index.OMERs7BG.js. "Option đổi tên thành không khớp" là hệ quả của Q1 B (PENDING-21), PO không nói riêng. Build trước 09:47 UTC 2026-10-28 sai (BUG-03), đã fix. Đối chiếu sdk KB-415: storefront JSON List điền được variable, câu hỏi của dev xếp JSON list vào nhóm biến portal không khớp; khác surface, không chọn phía (CCR cũ: CBS-029 CLAIM-26)
- **Trích nguyên văn:**
  ```
  Q1 B. Keep as spec: don't show unmatched variables, same as the storefront (left as is). A plain text field would not indicate to the user that the variable is unmatched.
  Câu hỏi của dev (giangnth, 2026-10-28):
  - Problem: the AI then gets the raw `{{Hat}}` text in its prompt (the storefront leaves it as is too). It still costs a provider call and counts toward the run limit, and it usually means a typo or a renamed or deleted layer. This also covers `{{School.color}}`, JSON list variables and the template selector.
  ...
  - A) Plain text field, required (dev suggestion) · B) Hide and run, as in the spec
  Spec: "Unmatched variables are not shown and do not block the run." · "if it is deleted, remove its field."
  ```
