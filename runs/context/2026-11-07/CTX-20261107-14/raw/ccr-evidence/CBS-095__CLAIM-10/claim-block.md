### CLAIM-10

- **Statement:** Khi account dùng Nano Banana 2.1, Gemini effect trên Photo layer và Photo global option chỉ có Resolution 1K, 2K, 4K, không có 0.5K (512), giống Nano Banana Pro.
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, chạy bằng agent, kết quả [AI]), 2026-10-30
- **Locator:** QA-3442 TC-04 = TC-TIB-7905 PASS 2026-10-30; bổ trợ TC-06 = TC-TIB-7907 (Photo global option), TC-07 = TC-TIB-7908 (so sánh NB2, Pro); file results/result_QA-3442_independent_2026-10-30.md, portal index.BMgdZMSW.js (Last-Modified 2026-10-29 14:32:50 GMT). Mở rộng KB-017, không thay. Không suy rộng cho Clipart (xem CLAIM-11). (CCR cũ: CBS-023 CLAIM-02)
- **Căn cứ expected:** Jira TIB-5573, comment dev chinhdt 2026-10-26: "the effect shows the Resolution field with 1K / 2K / 4K, the same as Nano Banana Pro. 512 is not offered because 2.1 does not support it."
- **Trích nguyên văn:**
  ```
  TC-04 | ✅ AI — Photo Gemini Resolution on 2.1 = 1K / 2K / 4K, no 0.5K, panel identical to Pro |
  P-SQ on 2.1: `select#gemini_resolution` options `1K, 2K, 4K` (no 512). The panel reads "[Gemini] AI
  Effect, Prompt, Variable, Example Prompts, Resolution, Use Reference Image, Apply color to sketch
  result", identical to the list under Nano Banana Pro in the same run.
  
  TC-06 | ✅ AI — Photo GO on 2.1: 1K / 2K / 4K, 4K saved and kept | GO [đã bỏ id] edit page: `1K, 2K*, 4K`.
  
  TC-07 | ✅ AI — Nano Banana 2 = 0.5K/1K/2K/4K; Pro = 1K/2K/4K
  Bổ trợ — dev chinhdt, Jira TIB-5573, 2026-10-26: "the effect shows the **Resolution** field with **1K / 2K / 4K**, the same as Nano Banana Pro. 512 is not offered because 2.1 does not support it."
  ```
