### CLAIM-09

- **Statement:** Validate key với model retired trả not-valid, `code: model_retired` kèm thông báo retired (không phải lỗi key sai); không chọn model thì key được validate với model mặc định hiện tại.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-06, TC-22 trong `result_QA-3408_B2-B4-save-validate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Model retired được gửi trong request validate, không đặt được model retired đã lưu qua save trên staging (CCR cũ: CBS-028 CLAIM-08)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-06 | ✅ AI — Validate key with no model is valid against the current default: request without `model` → `{"valid":true,"message":"API key and model are valid!"}`; `model:""` → same | POST /api/user/openai-key/validate 200
  TC-22 | ✅ AI — Validate key with a retired model returns not-valid with the retired message, not a bad-key error: GPT `model=gpt-image-1` → `{"valid":false,"code":"model_retired","message":"GPT Image 1 has been retired. Select GPT Image 1.5 or another model."}`; Gemini `model=nano_banana` → `code:model_retired`, "Nano Banana (Gemini 2.5 Flash) has been retired. Select Nano Banana 2 (Gemini 3.1 Flash) or another model." | POST /api/user/openai-key/validate 200 | Retired model sent in the validate request (a stored retired model cannot be set through save on staging)
  ```
