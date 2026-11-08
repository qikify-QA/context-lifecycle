### CLAIM-03

- **Statement:** Job migration đổi account đang ở model bị khai tử sang successor: GPT `gpt-image-1` → `gpt-image-1.5`, Gemini `nano_banana` → `nano_banana_31`; các cài đặt khác (API key, `gpt_quality`, Flux, `image_generation_name`, `background_remover_name`, toggle auto-switch) giữ nguyên; picker hiện successor được chọn, model cũ bị disable.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner (account bị migrate); api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 (QA Hub task TIB-207) — TC-07 (GPT), TC-14 (Gemini) trong `result_QA-3408_B3-B4-after-migrate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy, sau lượt migration dev chạy trên staging cùng ngày). Build: không ghi. | Dev chạy migration trên staging 2026-10-16; loại lượt chạy và migrate_at không chia sẻ với QA. Dev notes 54520 chỉ là ngữ cảnh, không phải nguồn (CCR cũ: CBS-028 CLAIM-01)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — GPT migrated to the successor; other settings unchanged | `GET /api/user`: `gpt_model` `gpt-image-1` → `gpt-image-1.5`; `gpt_quality` medium, `flux_kontext_model` flux_pro, `flux_version` v1, `image_generation_name` gpt, `background_remover_name` removal.ai, `genai_auto_fallback` true — unchanged; 10 API keys still set (same lengths). Picker: `gpt-image-1.5` checked, `gpt-image-1` disabled
  TC-14 | ✅ AI — Gemini migrated `nano_banana` → `nano_banana_31` | `gemini_model=nano_banana_31`; picker: `nano_banana_31` checked, `nano_banana` disabled | Migrated in the same run as GPT
  Ngữ cảnh (dev notes, chinhdt, comment 54520, 2026-10-14 — không phải nguồn của claim):
  - `gpt-image-1` → `gpt-image-1.5`, migrate from **2026-10-21** (shutdown 2026-10-23)
  - `nano_banana` → `nano_banana_31`, migrate from **2026-10-29** (shutdown 2026-10-31)
  - **Daily migration (00:00 UTC):** from the migrate date, an account on a retired model is switched to the successor. This includes accounts with an API key and no model selected (they were running the retired default). Other settings (API keys, quality, etc.) are unchanged.
  ```
