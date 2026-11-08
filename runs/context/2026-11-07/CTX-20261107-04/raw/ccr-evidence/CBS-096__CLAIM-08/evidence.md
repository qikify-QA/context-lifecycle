# CBS-096 CLAIM-08 — block nguyên văn từ Proposal

### CLAIM-08

- **Statement:** Order design PNG (Re-generate sau fix) của các vector layer đã recolor có SVG trùng clipPath id tô kín màu mọi vector, không vùng trong suốt, bố cục giống preview storefront.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn (Re-generate design), api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-20, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; trạng thái deploy TIB-5350 không ghi. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). Đối chiếu artwork/layer-config-vector KB-418: fixture chỉ có static-vector báo "Line item cannot generate design" ở PNG_RGB, fixture TC-20 có thêm Word Cloud. (CCR cũ: CBS-031 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-20 | ✅ AI — order design PNG ([đã bỏ id], 37×52, regenerate sau fix, PNG_RGB) tô kín mọi vector, không vùng trong suốt, bố cục giống preview storefront | design `[đã bỏ id].png` 3552×4992; vùng 69/70/76/77/74 kín màu xanh của order | evidence/pass_TC-20_[đã bỏ id]_png.png · order chỉ có 1 màu chung (A=B)
  ```
