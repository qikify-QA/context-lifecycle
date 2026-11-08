### CLAIM-06

- **Statement:** "Default" = sinh ảnh y như trước thay đổi: GPT → 1 trong 1024×1024 / 1536×1024 / 1024×1536 gần tỉ lệ layer nhất; Gemini nano_banana_31 → không gửi size (default của provider); nano_banana_pro → 2K; Flux (2 field trống) → size theo tỉ lệ layer. Layer có sẵn trước deploy mở ra ở Default, Save không thêm key size nào
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront generate); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-02, TC-20, TC-25 bước 1, TC-26 PASS 2026-10-27, staging, build không ghi lại. GPT Default chỉ chạy layer 3:2; 1:1, 2:3 chưa chạy riêng. Khớp artwork KB-114 (Flux theo tỉ lệ layer). Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-03)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (mô tả Default theo provider)
- **Trích nguyên văn:**
  ```
  TC-02 | ✅ AI — existing layer opens with Default, save adds no size key | artwork <id> `layer-<id>` (Gemini Single Output): Default selected; Save & Close unchanged → layer JSON has no `*_resolution` / `flux_output_*`
  TC-20 | ✅ AI — GPT Default → nearest fixed size | 3:2 MU-G Default (request `gpt_resolution null`, gpt-image-2) → 1536×1024 | 1:1 / 2:3 not run separately (same code path)
  TC-25 | ✅ AI — Flux Default vs picked | Default (flux_size null, flux_pro) → 1216×816 (ratio 1.490); 1200×800 → exactly 1200×800
  TC-26 | ✅ AI — Gemini Default | Pro → 2048×2048; 3.1: request has no size (`gemini_resolution null`) → 1024×1024
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - **GPT, Default**: one of 3 fixed sizes, 1024×1024, 1536×1024 or 1024×1536, whichever is closest to the layer ratio.
  - **Gemini nano_banana_31, Default**: no size is sent and Gemini uses its own default. This is not the same as picking any value.
  - **Gemini nano_banana_pro, Default**: stays at 2K, the same as before.
  - **Flux, Default**: the width/height fields are left empty and the size comes from the layer ratio, as before.
  ```

