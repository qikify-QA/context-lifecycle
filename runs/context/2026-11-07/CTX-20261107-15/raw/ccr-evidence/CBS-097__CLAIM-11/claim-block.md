### CLAIM-11

- **Statement:** Giới hạn đã biết, không thuộc fix và không phải hành vi mong muốn: cụm cao (nhiều dòng) thả sát mép trên hoặc dưới có thể rơi về đầu hoặc cuối danh sách thay vì đúng chỗ con trỏ, cụm vẫn nguyên và đúng thứ tự.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (tuanva), mô tả kỹ thuật dev tự viết, 2026-09-07; ảnh chụp do máy, chưa có người xác nhận, 2026-09-18
- **Locator:** Jira TIB-5354 dev summary (comment 2026-09-07) mục "Known limitations"; ảnh chụp TC-10, TC-11 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chưa tick. Giới hạn của thư viện; việc QA chấm PASS là quyết định chấm test, không phải sign-off sản phẩm. Tên thư viện chỉ là chi tiết code tại 2026-09-07, không phải oracle. (CCR cũ: CBS-033 CLAIM-08)
- **Trích nguyên văn:**
  ```
  - Vị trí thả do thư viện SortableJS quyết định theo ghost của cả cụm; khi cụm cao (nhiều dòng) và thả sát mép trên/dưới, cụm có thể rơi về đầu/cuối danh sách. Đây là hành vi sẵn có của thư viện, không thuộc phạm vi fix này.
  TC-10: kéo, thả tại đỉnh danh sách (cuộn lên top trước) — DOM: F06..F16 rồi F01..F05,F17..F20 — đúng known-limitation, cụm 11 hàng nguyên vẹn đúng thứ tự, không mất hàng nào
  TC-11: cuộn xuống đáy rồi kéo thả tại điểm cuối cùng — DOM: F01,F02,F03,F15..F20,F04..F14 — đúng known-limitation, cụm 11 hàng dồn về cuối, nguyên vẹn đúng thứ tự
  ```
