### CLAIM-05

- **Statement:** Trường model và gemini_model giả mạo trong request effect bị bỏ qua, server dùng model của account.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát qua agent, không ai xác nhận, 2026-10-30
- **Locator:** QA-3442 TC-33 = TC-TIB-7934, results/result_QA-3442_independent_2026-10-30.md §Bugs; quan sát 2 lần, TC-33 ⏭️ không phải PASS. Không coi là đảm bảo bảo mật. portal index.BMgdZMSW.js (Last-Modified 2026-10-29 14:32:50 GMT). (CCR cũ: CBS-023 CLAIM-13)
- **Trích nguyên văn:**
  ```
  On a layer saved at 1K, a forged 2K returned 2528×1696, reproduced 2/2 (uploads [đã bỏ id]). …
  The forged `model` is ignored. … It is probably not specific to 2.1.
  ```

