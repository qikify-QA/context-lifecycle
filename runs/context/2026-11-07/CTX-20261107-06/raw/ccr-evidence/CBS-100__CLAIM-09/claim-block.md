### CLAIM-09

- **Statement:** Global Option có 0 effect: summary `Image effects (0)`, Run effects disabled, tooltip `Select a global option with image effects to run them.` (khác tooltip của layer Normal; spec không nói)
- **Object / feature:** global-option/artwork-personalization-global-option-link (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-28; chưa ai xác nhận
- **Locator:** QA-3406 TC-85 tạm dừng 2026-10-28 (không PASS), build sáng không ghi tên bundle. Spec không nói về GO 0 effect; giả định QA (cùng tooltip layer Normal) sai so với build. KHÔNG dùng làm expected (CCR cũ: CBS-029 CLAIM-30)
- **Trích nguyên văn:**
  ```
  TC-85 | ⏸️ AI — assumption (PENDING-17) differs: other tooltip | GO <id> effects `[]` → `Image effects (0)`, button `disabled`, tooltip `Select a global option with image effects to run them.` (expected same tooltip as Normal layer `Applies all effects to the current image and replaces it.`) | GO restored. Behaviour is reasonable; QA/PO to accept the copy
  ```
