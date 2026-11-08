# CBS-096 CLAIM-09 — block nguyên văn từ Proposal

### CLAIM-09

- **Statement:** Việc order design PNG áp đúng clipPath giống preview thuộc ticket riêng TIB-5350 (hỗ trợ clipPath khi chuyển SVG sang ảnh), không phải code của TIB-5501.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn, api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-08
- **Locator:** Jira TIB-5501 comment 53757, trả lời Q1 của QA (comment 53673, 2026-10-07). Chỉ xác nhận clipPath PNG thuộc TIB-5350, không nói gì về hành vi hay trạng thái deploy của TIB-5350. (CCR cũ: CBS-031 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Hỏi (QA, comment 53673, 2026-10-07): "For the reported SVGs (colored vector layers relying on clipPath), what is the expected order design in PNG format: identical to the preview, or is the clipPath limitation still expected there?"
  Đáp: @phuongbb Q1 resolved in issue https://ownego.atlassian.net/browse/TIB-5350
  ```
