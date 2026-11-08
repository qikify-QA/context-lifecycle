# CBS-090 CLAIM-18

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Field theo input type của option: text → ô text, Only numbers → ô number (chữ bị loại, field trống), Date picker → ô date, option layer → chọn trong item của nó. Đổi input type của option khi đã có giá trị lưu: field dùng type mới, giá trị lưu không hợp lệ bị bỏ → field trống + hint, Run disabled tới khi nhập giá trị hợp lệ
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-30
- **Locator:** QA-3406 (task TIB-193) TC-59, TC-74 PASS 2026-10-30, staging build assets/index.BMgdZMSW.js, kết quả retest BUG-01. Kết cục "giá trị lưu không hợp lệ thành trống" khớp đáp án đề xuất PENDING-20, PO chưa xác nhận riêng; fallback về default hợp lệ chưa thử. Build trước 2026-10-29 sai (BUG-01), đã fix (CCR cũ: CBS-029 CLAIM-22)
- **Căn cứ expected:** Spec TIB-5470 mục Update: Prompt variables, huyen.chu 2026-10-26: "The field follows the option's input type." và "use the updated input type and validate the saved value". Phần giá trị không hợp lệ thành trống: KHÔNG CÓ (PENDING-20)
- **Trích nguyên văn:**
  ```
  TC-59 | ✅ AI — retest after BUG-01 2026-10-30 build index.BMgdZMSW.js: Age is a number input that rejects `abc`, Date is a date picker | Var types popover (first open after load): `{{Name}}` `<input type="text">` `Anna`; `{{Age}}` `<input type="number">` `30`; `{{Date}}` `<input type="date">` `2026-10-28`; `{{Color}}` `<select>` `blue|Blue`, `red|Red`. Set `abc` in `{{Age}}`: value `` (browser drops it), hint `No valid default value. Enter one to run.`, popover Run effects `disabled=true`.
  TC-74 | ✅ AI — retest after BUG-01 2026-10-30 build index.BMgdZMSW.js: after Name → Only numbers, `Kai` is not used, field is empty with a hint, Run disabled until a number | … Step 2, Age back to number, Name → Only numbers (radio `number`, unsaved): `{{Name}}` `<input type="number">` value ``, hint `No valid default value. Enter one to run.`, popover Run effects `disabled=true`; `{{Age}}` number `45`. Typed `Kai` → value ``, Run disabled; `7` → value `7`, no hint, Run enabled
  Spec (description, Update: Prompt variables, huyen.chu 2026-10-26): "The field follows the option's input type." · "If the option changes (input type or name), use the updated input type and validate the saved value; if it is deleted, remove its field."
  ```
