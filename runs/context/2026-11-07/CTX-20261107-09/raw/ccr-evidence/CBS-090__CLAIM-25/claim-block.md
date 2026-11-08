# CBS-090 CLAIM-25

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Giá trị nhập trong popover (kể cả giá trị đã lưu, hiện lại sau khi mở lại artwork) hiển thị như text thường: payload XSS / HTML không render, không chạy script; ô number / date loại bỏ payload
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-30 (TC-86), 2026-10-28 (TC-87)
- **Locator:** QA-3406 TC-86 PASS 2026-10-30 build assets/index.BMgdZMSW.js; TC-87 PASS 2026-10-28 build assets/index.OMERs7BG.js. Bổ trợ TC-88, TC-89, TC-50 PASS (CCR cũ: CBS-029 CLAIM-31)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-86 | ✅ AI — retest after BUG-01 2026-10-30: payloads stay text; number/date widgets reject them | Var nodef `{{Nick}}`: `<script>console.log('xss-test-QA')</script>`, `"><img src=x onerror=console.log('xss-test-QA')>`, `<b>bold</b>`, `<iframe src="https://example.com"></iframe>` → value equals the payload for each, Run enabled. New widgets: `{{Age}}` (number) = X2 → value ``, `{{Date}}` (date) = X1 → value ``, Run disabled. +0 `script/svg/iframe/img/b/style` in the document, 0 `img[src="x"]`, 0 `xss-test-QA` console logs
  TC-87 | ✅ AI — retest after fix: saved X2 re-rendered as text, gone after reload | Step 1: Cancel → reopen <id> in the SPA → Var nodef `{{Nick}}` value = literal X2, 0 `img` in popover, label `{{Nick}}`, 0 `img[src="x"]`, 0 `xss-test-QA` logs. Step 2: reload → `{{Nick}}` value `` + hint `No default value. Enter one to run.`, Run disabled, 0 `img[src="x"]`
  ```
