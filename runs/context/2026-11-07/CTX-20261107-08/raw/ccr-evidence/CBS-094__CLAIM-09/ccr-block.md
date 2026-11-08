### CLAIM-09

- **Statement:** Flux với width × height đã điền: ảnh ra đúng width × height
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-25 bước 2 PASS 2026-10-27, staging, build không ghi lại. Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-06)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 ("Flux: the image is generated at the exact width × height.")
- **Trích nguyên văn:**
  ```
  TC-25 | ✅ AI — Flux Default vs picked | Default (flux_size null, flux_pro) → 1216×816 (ratio 1.490); 1200×800 → exactly 1200×800
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - Flux: the image is generated at the exact width × height.
  ```

