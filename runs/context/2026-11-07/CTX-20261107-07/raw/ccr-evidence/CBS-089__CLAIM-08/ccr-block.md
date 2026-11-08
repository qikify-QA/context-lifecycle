### CLAIM-08

- **Statement:** Account có API key mà không chọn model: lưu Gen AI Effects lưu luôn model mặc định hiện tại (từ ngày migrate là `gpt-image-1.5` / `nano_banana_31`), không bao giờ để trống; không gửi field model thì model đã lưu giữ nguyên.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-05 trong `result_QA-3408_B2-B4-save-validate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy; staging đã qua ngày migrate). Build: không ghi. | Chỉ phía từ ngày migrate được test; phía trước ngày migrate chỉ có dev notes 54520 (CCR cũ: CBS-028 CLAIM-07)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-05 | ✅ AI — saving without a model stores the current default: stored `qa3408-nonlive` → save `gpt_model=""` → `gpt-image-1.5`; `null` → `gpt-image-1.5`; Gemini `""` → `nano_banana_31`; field absent → stored model unchanged. Never empty | GET /api/user `private_config.gpt_model` after each save (200) | Staging is past the migrate date (dev ran the migration), so the default is the successor
  Ngữ cảnh (dev notes, comment 54520, 2026-10-14): "**Default model follows the retirements:** when an account has an API key for GPT or Gemini but no model selected, the API uses `gpt-image-1` / `nano_banana` before the migrate date and the successor (`gpt-image-1.5` / `nano_banana_31`) from the migrate date. Nothing changes at deploy." — phía "trước ngày migrate" chưa được test.
  ```
