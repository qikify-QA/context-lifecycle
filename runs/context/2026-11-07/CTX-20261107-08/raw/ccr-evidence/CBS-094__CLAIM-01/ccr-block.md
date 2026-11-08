### CLAIM-01

- **Statement:** Trên Nano Banana 2.1, layer Text to Image và Multiple Uploads có 1K, 2K, 4K đã lưu dưới Nano Banana 2 thì giá trị hiện ra và được gửi tới 2.1, còn 512 đã lưu hiện trống và bị bỏ qua, output theo default size của Google (không về 2K như Photo).
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q8 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-22 = TC-TIB-7923, TC-40 = TC-TIB-7941 PASS 2026-10-30 trên portal index.CReWKeT2.js (Last-Modified 2026-10-30 07:06:14 GMT). T2I với 512 chưa test, chỉ test Multiple Uploads. (CCR cũ: CBS-023 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - Q8: With the Q2 fix, a value saved under Nano Banana 2 shows in the 2.1 Resolution field and is
  applied: 1K / 2K / 4K are sent to 2.1. A saved 512 shows blank and is ignored (Google default size)
  until the merchant picks a value.
  Bổ trợ — TC-22 (TC-TIB-7923) ✅ 2026-10-30, portal `index.CReWKeT2.js`: "MU with 512 on 2.1: blank in the portal; generation completes at Google's default (1024×1024), not 512×512" (job [đã bỏ id]; status record vẫn ghi `gemini_resolution "512"`). TC-40 (TC-TIB-7941) ✅: MU đã lưu 2K hiện `2K` trên 2.1, request 2K. T2I với 512: chưa test.
  ```

