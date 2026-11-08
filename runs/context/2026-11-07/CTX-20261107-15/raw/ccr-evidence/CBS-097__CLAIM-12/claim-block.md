### CLAIM-12

- **Statement:** Kéo một dòng trong tab Re-order không đổi so với trước fix: dòng được thả nằm ngay dưới dòng đích.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (automation, [AI]), chưa có người kiểm tay, 2026-09-18 (PASS) và 2026-09-28 (FAIL)
- **Locator:** TC-07: result_QA-3352_trial-TC-07_auto_2026-09-18.md (✅ lượt chạy thử 2026-09-18) và ghi chú review spec trong qna.json (❌ lượt sau, ghi nhận 2026-09-28, ở bước thả xuống cuối); Jira không tick TC-07. Chi tiết "modal ~900px, ≥13 field phải cuộn" là giải thích của máy cho lượt FAIL, chưa xác nhận; cần người kiểm tay để phân biệt giới hạn widget với cách giả lập chuột. (CCR cũ: CBS-033 CLAIM-09)
- **Trích nguyên văn:**
  ```
  TC-07 | ✅ AI — Single-row drag unchanged (regression) | after drag F12 below F03 (dom) = F01,F02,F03,F12,F04,F05,F06,F07,F08,F09,F10,F11,F13,F14,F15<br>after wheel: {"scrollTop":0,"lastRow":[849,900],"modalBottom":900}<br>after drag F05 to bottom (dom) = F01,F02,F03,F12,F04,F06,F07,F08,F09,F10,F11,F13,F14,F15,F05
  TC-07 :x: FAIL đúng như mô tả — bước 2 "drag F05 drop to bottom" luôn dừng NGAY TRƯỚC hàng vốn cuối cùng (F15), không bao giờ vượt qua được nó, thử 3 cách nhắm tọa độ khác nhau đều vậy. Có thể là giới hạn thật của widget Re-order (không có khu thả sau hàng cuối) hoặc do cách giả lập chuột — cần người kiểm bằng tay thật trên browser để phân biệt.
  Ngữ cảnh (dev summary 2026-09-07): "portal override lại hàm cập nhật danh sách khi thả nên chỉ ảnh hưởng luồng multi-drag, kéo 1 dòng không đổi."
  ```
