# CBS-090 CLAIM-23

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Mọi biến trong prompt đều không khớp → không mở popover, bấm Run effects chạy thẳng, prompt giữ nguyên token
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-28
- **Locator:** QA-3406 TC-68 PASS 2026-10-28 build assets/index.OMERs7BG.js. Khớp đáp án QA đề xuất PENDING-16, PO CHƯA xác nhận (spec có thể đọc là popover rỗng) (CCR cũ: CBS-029 CLAIM-27)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-68 | ✅ AI — retest after fix: all-unmatched prompt runs directly on the first click | Var unmatched → first click on header Run effects: no popover (0 `.run-effects-variables-popover` elements), header disabled, progress `17%`; body `prompt: "Portrait of {{Hat}}"` → 202 `{"id":"<id>","status":"pending"}`; completed → image `<image>`; Undo → `<image>` | Gemini run 2. Direct run = PENDING-16 suggested answer (🟡 assumption, not PO-confirmed)
  ```
