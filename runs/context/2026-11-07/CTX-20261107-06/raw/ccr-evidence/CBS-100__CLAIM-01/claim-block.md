### CLAIM-01

- **Statement:** Check 4 MP áp cho save global option: GO Text to Image (Flux 2000×2001 → 422, 2000×2000 → 200) và GO Single upload có Gen AI effect Flux (mới — trước đây không check; 3000×2000 → 422 với key `data.effects.0.flux_output_width`)
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-16, TC-17 PASS 2026-10-27, staging, build không ghi lại. MU GO: N/A vì portal không có loại GO này (CLAIM-20) (CCR cũ: CBS-024 CLAIM-09)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 ("Any global option, including a Single upload global option with a Flux Gen AI effect"); biên theo comment 55697 Q4
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — T2I GO 4 MP check, two toasts | Flux 2000×2001 → PUT 422, toasts "Failed to save global option." + "Something went wrong! Flux dimension … 4 Megapixel)"; 2000×2000 → 200 | MU GO: N/A (see TC-08)
  TC-17 | ✅ AI — Single upload GO with Flux effect checked too | GO <id>: 1200×800 → 3000×2000 → 422 same message (`data.effects.0.flux_output_width`); 2000×2000 → 200
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - Any global option, including a **Single upload global option with a Flux Gen AI effect**, which was not checked before.
  ```
