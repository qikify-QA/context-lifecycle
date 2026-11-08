### CLAIM-14

- **Statement:** Field output size dưới provider trên layer Multiple Uploads (Single Output), layer Text to Image và global option Text to Image, theo model của account: GPT gpt-image-2 → "Resolution" Default / 1K (1024) / 2K (2048) / 4K (3840); Gemini nano_banana_pro → Default / 1K / 2K / 4K; nano_banana_31 → Default / 0.5K (512) / 1K / 2K / 4K; Flux 2 (Kontext 2) → "Flux output width (px)" + "Flux output height (px)" (number, trống); không có field nào khi Flux 1, GPT gpt-image-1.5, ImagenHub. Layer mới: "Default" được chọn sẵn
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình layer / GO); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 (task TIB-250) TC-01, 03, 04, 05, 07, 08 PASS 2026-10-27, staging, build không ghi lại. gpt-image-2.5-flare, 2.5-sunburst chưa kiểm. Field nằm sau Prompt / Example prompts, lệch chữ "under the provider" của dev. Bổ sung artwork KB-018, KB-019, KB-114, không thay. Danh sách model là tại 2026-10-27 (CCR cũ: CBS-024 CLAIM-01)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (mục New field under the provider)
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — GPT Resolution shown, Default/1K/2K/4K, Default selected | gpt-image-2: MU-G `select#gpt_resolution` options Default (disabled, selected) / 1K=1024 / 2K=2048 / 4K=3840 | Obs: the field sits after Prompt / Example prompts, not right below the GenAI service select
  TC-03 | ✅ AI — Gemini options per model | Nano Banana 2 (3.1): Default / 0.5K=512 / 1K / 2K / 4K; Pro: Default / 1K / 2K / 4K (no 0.5K); Default selected
  TC-04 | ✅ AI — Flux 2 shows the two size fields, Flux 1 none | Kontext 2: "Flux output width (px)", "Flux output height (px)", number inputs, empty; Kontext 1: no Flux fields
  TC-05 | ✅ AI — no field on gpt-image-1.5 / ImagenHub; 2K ignored | gpt-image-1.5: MU-G panel has no Resolution; T2I ImagenHub: no size field; storefront MU-G saved 2048 → request `gpt_resolution 2048`, model gpt-image-1.5 → master 1536×1024 (fixed size)
  TC-07 | ✅ AI — T2I layer fields per provider | gpt: Default/1K/2K/4K; gemini (3.1): Default/0.5K/1K/2K/4K; flux_kontext: width/height inputs; imagenhub: no field
  TC-08 | ✅ AI — T2I global option 2K persists | GO <id> edit page: Default (disabled) / 1K / 2K / 4K → 2K → "Global option has been updated successfully." → reload 2K
  Ngữ cảnh (Dev summary, chinhdt, Jira TIB-5561 comment 2026-10-26 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - New field under the provider:
    - **GPT** (gpt-image-2, gpt-image-2.5-flare, gpt-image-2.5-sunburst): *Resolution* 1K / 2K / 4K.
    - **Gemini nano_banana_pro**: *Resolution* 1K / 2K / 4K.
    - **Gemini nano_banana_31**: *Resolution* 0.5K / 1K / 2K / 4K.
    - **Flux v2**: *Flux output width (px)* and *Flux output height (px)*. Fill both or neither; minimum 256.
  ```
