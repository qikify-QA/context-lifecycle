### CLAIM-10

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5212; skill-rules-audit.md #36, #38 (rule `hd-preview-size-cap`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5212
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16, 2026-10-27
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #36, rule `hd-preview-size-cap`, nguồn ghi: dev xác nhận TIB-5212, comment 2026-10-27:
    ```
    **Batch HD cho multi-select** (dev xác nhận TIB-5212, comment 2026-10-27): chọn nhiều image layer khác ảnh → bật HD hàng loạt, tối đa `MASTER_LARGE_BATCH_LIMIT` (mặc định 10) ảnh khác nhau chưa ở HD mỗi lần bấm, endpoint `POST /layer-images/create-master-large/batch`. Vượt limit: toast info rồi toast lỗi tiêu đề "Something went wrong!", không layer nào đổi. Mỗi chu kỳ poll 2s có switch = 1 undo step; tắt HD = 1 step.
    ```
  - Jira TIB-5212 comment #55717, giangnth, 2026-10-27, khớp một phần:
    ```
    Batch HD is in scope for TIB-5212. The “Selected layers use different images…” tooltip came from an older fix that was only on staging and never went to dev; the current staging build replaces it with batch HD (max 10 different images per click).
    ```
  - skill-rules-audit.md #38, rule `hd-preview-size-cap`, nguồn ghi: người dùng xác nhận 2026-10-16; Dev xác nhận lại TIB-5212, 2026-10-27:
    ```
    **Layer "Import from a clipart category" ĐƯỢC bật HD** (người dùng xác nhận 2026-10-16). Khi import, hệ thống gọi `POST /api/layer-images/from-clipart` để convert clipart thành layer image (url `users/{id}/image-layers/...`), nên HD chạy bình thường. Điều kiện disable bên dưới (TIB-5195) **không áp dụng** cho flow này nữa, đừng kỳ vọng HD disabled cho layer clipart-category import. Dev xác nhận lại ở TIB-5212 (2026-10-27): HD phụ thuộc nơi ảnh nằm, ảnh pick từ clipart category được copy vào image library (TIB-5425) nên bật HD được; chỉ layer **cũ** còn trỏ thẳng vào clipart mới bị disable. Xem [[asset-copy-on-pick-dedup-key]].
    ```
  - Jira TIB-5212 comment #55717, giangnth, 2026-10-27, khớp một phần:
    ```
    HD depends on where the layer's image lives, not on the layer type. Images picked from a clipart category are now copied into the image library (TIB-5425), so HD is enabled for them. HD is disabled with “Cannot work with layers imported from clipart” only for older layers that still point at the clipart itself.
    ```
- **File đính kèm cho claim này:** không có

