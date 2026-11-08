### CLAIM-14

- **Statement:** Toggle ON + model bị coi là down + có backup: generate chạy bằng backup cùng provider, effect của upload ghi `fallback_model` = backup thật sự dùng, model đã lưu không đổi. Thấy với GPT `gpt-image-1.5` → `gpt-image-2`, Gemini `nano_banana_31` → `nano_banana_pro`, Flux `flux_pro` → `flux_flex`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner (toggle); storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, QA tick tay
- **Locator:** QA-3408 — TC-25 (tick tay của QA) trong `result_QA-3408_QA-web_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày QA tick ✅). Build: không ghi; dev stub lỗi provider trên staging. | Dev stub lỗi provider cho GPT, Gemini, Flux và hạ ngưỡng trên staging, không phải sự cố thật. Quote chỉ ghi model và fallback_model; 'model đã lưu không đổi' nằm ở expected của TC-25 (CCR cũ: CBS-028 CLAIM-21)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-25 | ✅ QA — QA checked 2026-10-16 (dev stubbed errors for GPT, Gemini, Flux; toggle ON): customer_upload effect has model gpt-image-1.5 + fallback_model gpt-image-2. Same check also OK for Gemini nano_banana_31→nano_banana_pro and Flux flux_pro→flux_flex
  Expected của TC-25 (QA-3408 `03-testcases.md`): "Generation succeeds with `gpt-image-2`; effect has `fallback_model = gpt-image-2`; `gpt_model` still `gpt-image-1.5`; no email"
  ```

