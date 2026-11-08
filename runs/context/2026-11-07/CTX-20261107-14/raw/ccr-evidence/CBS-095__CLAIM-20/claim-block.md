### CLAIM-20

- **Statement:** Single upload Gen AI effect (regression, khác biệt có chủ đích): Resolution GPT / Gemini có 1K / 2K / 4K, KHÔNG có "Default"; GPT chọn sẵn 1K, Gemini chọn sẵn 2K
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-11 PASS 2026-10-27, staging, build không ghi lại. Liên quan artwork KB-017. _flows/layers-image-photo.md dòng 108 ghi Gemini có 0.5K ở effect (xem notes) (CCR cũ: CBS-024 CLAIM-13)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (Difference from Single upload)
- **Trích nguyên văn:**
  ```
  TC-11 | ✅ AI — Single upload effects keep 1K/2K/4K without Default | Gemini (<id> S-E): 1K/2K/4K, selected 2K; GPT (<id> SU-GPT): 1K/2K/4K, selected 1K
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - **Difference from Single upload**: the GPT and Gemini *Resolution* fields of the Single upload Gen AI effect have **no "Default" option**. They show **1K** (GPT) or **2K** (Gemini) pre-selected, because on that path an unset value really does generate at that size. … This difference is intended.
  ```
