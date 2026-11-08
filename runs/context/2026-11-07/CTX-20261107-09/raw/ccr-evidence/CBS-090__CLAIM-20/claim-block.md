# CBS-090 CLAIM-20

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Giá trị chỉ gồm khoảng trắng (space, tab) bị coi là trống: Run effects của popover vẫn disabled
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-28
- **Locator:** QA-3406 TC-63 PASS 2026-10-28 build assets/index.OMERs7BG.js; spot check PASS 2026-10-30 build assets/index.BMgdZMSW.js. Spec chỉ nói "until every field has a value"; khớp đáp án QA đề xuất PENDING-19, PO CHƯA xác nhận (CCR cũ: CBS-029 CLAIM-24)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-63 | ✅ AI — retest after fix: whitespace-only keeps Run disabled | `"   "` → disabled; `"\t"` → disabled; `" \t "` → disabled (hint shown each time) | Set via native setter + `input` event; line-break case not re-run (first run: input strips it)
  TC-63 | ✅ AI — retest after BUG-01 2026-10-30: whitespace-only keeps Run disabled | Var nodef `{{Nick}}` = `"   "` → Run disabled | Spot check (spaces only)
  ```
