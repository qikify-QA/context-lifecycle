# CBS-091 CLAIM-19 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-19

- **Statement:** Known issue không do TIB-5504: với nguồn Photo Cropper, khi buyer thay ảnh thì option {{output}} bắt đầu ngay từ ảnh mới mà không chờ crop và effect của nguồn, nên effect nguồn chạy 2 lần và nếu lỗi thì option hiện ảnh mới trong khi nguồn vẫn hiện ảnh cũ.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3, đoạn "Known issue". Thấy 1 lần trong QA-3441 TC-24 (2026-10-29), không file bug. Dev không nêu key ticket riêng. Là known issue, không phải hành vi đúng, không dùng làm expected. (CCR cũ: CBS-022 CLAIM-12)
- **Trích nguyên văn:**
  ```
  **Known issue** (Photo Cropper source only, not caused by TIB-5504, separate ticket): when the buyer replaces the photo, the {{output}} option starts right away from the new photo, without waiting for the crop and the source's effect. So the source's effect runs twice, and if it fails, the option shows the new photo while the source still shows the old one.
  ```
