### CLAIM-18

- **Statement:** Backup nằm ở Admin > Settings `genai_model_fallbacks` (seeder `GenAiModelFallbacksSeeder`): `default` theo từng model + override theo user (`users: { <user id>: <model> }`) thắng `default`; danh sách default gồm cả `gpt-image-2` → `gpt-image-1.5`, `gpt-image-2.5-flare` ↔ `gpt-image-2.5-sunburst`, `nano_banana_pro` → `nano_banana_31`, `flux_max` → `flux_pro`, `flux_flex` → `flux_pro`; backup đã bị khai tử thì dùng successor của nó; failover áp cho image filter, text-to-image, multi-image generate.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** admin (cấu hình) + store owner opt-in; api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, đoạn mở đầu + "A retired backup") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-32 bước override theo user ⏸️ chưa test, TC-33, TC-35 chưa chạy. Danh sách cặp backup là giá trị cấu hình lúc ship (Phần 4.2) (CCR cũ: CBS-028 CLAIM-25)
- **Trích nguyên văn:**
  ```
  When a GenAI image model keeps failing for everyone (provider outage), accounts that opted in run their GenAI calls on a backup model of the same provider until the model recovers. Applies to image filter, text-to-image and multi-image generate.
  
  Each environment needs `php artisan db:seed --class=GenAiModelFallbacksSeeder` once after deploy. Backups are kept in Admin > Settings > `genai_model_fallbacks`: a `default` backup per model, plus optional per-user overrides (`users: { <user id>: <model> }`). Current defaults:
  
  - GPT: `gpt-image-1.5` ↔ `gpt-image-2`, `gpt-image-2.5-flare` ↔ `gpt-image-2.5-sunburst`
  - Gemini: `nano_banana_31` ↔ `nano_banana_pro`
  - Flux Kontext: `flux_pro` → `flux_flex`, `flux_max` → `flux_pro`, `flux_flex` → `flux_pro`
  
  - **A retired backup** follows its retirement successor (Part 1), so a stale mapping never points at a dead model.
  ```

