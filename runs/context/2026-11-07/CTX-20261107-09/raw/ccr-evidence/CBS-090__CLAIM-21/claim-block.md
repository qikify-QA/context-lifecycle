# CBS-090 CLAIM-21

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Khác spec, chưa phân xử: build 2026-10-30 hiện hint `No valid default value. Enter one to run.` cho mọi field trống (kể cả option không có default); spec nói `No default value. Enter one to run.`
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-30; chưa ai xác nhận
- **Locator:** QA-3406 TC-61 tạm dừng 2026-10-30 build index.BMgdZMSW.js (không PASS); phía spec: description TIB-5470 mục Update: Prompt variables › Fields, 2026-10-26. Build 2026-10-28 còn hiện đúng chữ spec. Mâu thuẫn spec với build, giữ cả hai, KHÔNG dùng làm expected, chờ PO hoặc QA lead chọn (CCR cũ: CBS-029 CLAIM-25)
- **Trích nguyên văn:**
  ```
  TC-61 | ⏸️ AI — hint copy changed: `No valid default value. Enter one to run.` (spec: `No default value. Enter one to run.`); behaviour OK | Var nodef: `{{Nick}}` text, value ``, hint `No valid default value. Enter one to run.`, Run `disabled`, 0 POST.
  - **Hint copy changed:** the empty-field hint is now `No valid default value. Enter one to run.` in every case, including an option with no default at all (Nick). The spec (REQ-20, description 2026-10-26, reference image-20261026-054048.png) says `No default value. Enter one to run.`. This is a copy change made with the input-type fix, not a functional failure.
  Spec: "If neither exists, show `No default value. Enter one to run.`"
  ```
