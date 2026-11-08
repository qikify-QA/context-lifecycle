### CLAIM-17

- **Statement:** Sau reload trang, template picker không được khôi phục ("Choose an option") dù localStorage vẫn giữ template, ảnh và position; chọn lại template thì ảnh và position đã giữ hiện lại đúng, không warning.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI]), 2026-10-22
- **Locator:** QA-3415 TC-35 trong result_QA-3415_TC35-rescoped_2026-10-22.md (expected đã đổi theo quyết định QA 2026-10-22), bằng chứng result_QA-3415_TC35-explain_2026-10-22.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Phần picker không khôi phục là quan sát có từ trước, cùng chiều KB-019 và CHK-027, không phải expected; phần position là mới. BUG-10 đã bị QA dismiss 2026-10-22. (CCR cũ: CBS-026 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-35 | ✅ AI — after reload + reselecting T2s: same photo, same position, no warning | Before reload T2s `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}` → reload (picker shows "Choose an option") → select T2s → `{x:-0.6333,y:-0.025,w:1.8667,h:1.05}`, preview `translate(-205.8225 -8.125)`, warning empty | Picker reset after reload = existing behaviour, out of scope (QA decision A)
  Từ lượt giải thích (2026-10-22):
  Conclusion: after any reload the template picker is never restored from localStorage (even without a template switch, scenario B); the data is kept and comes back as soon as the buyer picks the template again. Not caused by TIB-5566's keep / reset logic.
  ```
