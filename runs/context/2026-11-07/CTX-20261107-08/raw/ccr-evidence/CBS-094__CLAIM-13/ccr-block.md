### CLAIM-13

- **Statement:** Sau migration sang `gpt-image-1.5`: Quality có low / medium / high (giá trị medium cũ vẫn hợp lệ); generate text-to-image nền trong suốt chạy được bằng `gpt-image-1.5`, không có `fallback_model`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + buyer; portal · storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-16 trong `result_QA-3408_B3-B4-after-migrate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. (CCR cũ: CBS-028 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — model-dependent options valid on the successor | Quality options of `gpt-image-1.5`: low / medium* / high (medium valid). Portal Live preview, artwork [id] GPT text-to-image (transparent background) → `customer-uploads/[id]/image-filter-effects/status`: `model gpt-image-1.5`, `background transparent`, status 1 → 2, no `fallback_model`; field "✓ Image generated"
  ```

