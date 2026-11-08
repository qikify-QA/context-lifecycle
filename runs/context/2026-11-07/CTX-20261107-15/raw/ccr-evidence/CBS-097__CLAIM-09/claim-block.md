### CLAIM-09

- **Statement:** Trong tab Re-order, click lại một dòng đang chọn thì bỏ chọn riêng dòng đó, click ra ngoài danh sách thì bỏ chọn tất cả.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Máy thao tác (visual-capture), chưa có người xác nhận, 2026-09-18
- **Locator:** Ảnh chụp tier B TC-22 trong result_QA-3352_B-visual_2026-09-18.md, ⏸️ chờ mắt nhìn, chưa ai tick. Quan sát, không dùng làm expected. (CCR cũ: CBS-033 CLAIM-06)
- **Trích nguyên văn:**
  ```
  b1: plain-click F05,F06,F07 — selected=F05,F06,F07 (3) · b2: click lại F06 — selected=F05,F07 (2, đúng expected) · b3: click ra ngoài list (tab header 'Re-order') — selected= (rỗng, đúng expected). Khớp expected cả 2 mốc.
  ```
