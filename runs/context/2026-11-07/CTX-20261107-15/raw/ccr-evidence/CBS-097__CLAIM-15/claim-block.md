### CLAIM-15

- **Statement:** Fix của TIB-5354 chỉ nằm trong portal (tab Re-order, ghi đè hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng multi-drag); API và SDK không đổi, và fork vue-draggable upstream chưa được sửa.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), mô tả kỹ thuật dev tự viết, 2026-09-07
- **Locator:** Jira TIB-5354 dev summary (comment 2026-09-07) mục "Code changes" và "Known limitations"; PR teeinblue-portal #3613. Danh sách kéo thả nhiều dòng khác dùng cùng fork: chưa rõ, context builder tự đánh giá. Tên class, thư viện là chi tiết code tại 2026-09-07, không phải oracle. (CCR cũ: CBS-033 CLAIM-12)
- **Trích nguyên văn:**
  ```
  API
  - Không thay đổi
  SDK
  - Không thay đổi
  Portal
  - Artwork editor > panel Form > tab Re-order (danh sách kéo thả thứ tự field của form): sửa lỗi khi chọn nhiều dòng rồi kéo cả cụm sang vị trí khác.
  - Nguyên nhân: thư viện kéo thả (fork vue-draggable, chế độ multi-drag) sắp xếp index theo chuỗi thay vì theo số; portal override lại hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng luồng multi-drag, kéo 1 dòng không đổi.
  - Chưa sửa ở upstream fork vue-draggable (không có quyền), fix nằm trong portal.
  ```
