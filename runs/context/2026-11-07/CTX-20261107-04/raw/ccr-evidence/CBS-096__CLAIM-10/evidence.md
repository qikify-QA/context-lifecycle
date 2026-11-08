# CBS-096 CLAIM-10 — block nguyên văn từ Proposal

### CLAIM-10

- **Statement:** Order design định dạng SVG (mọi layer gộp vào 1 file) có mọi id duy nhất trên toàn file, đều mang prefix svg-…-, 0 tham chiếu treo, cùng một id gốc xuất hiện dưới nhiều prefix khác nhau và màu đúng.
- **Object / feature:** order/MỚI: order-design-vector-render — Thuộc: order design PNG và SVG của vector layer có màu (tô màu, id trong file gộp, tham chiếu); Không thuộc: preview storefront (sdk/storefront-buyer-facing), file SVG nguồn (artwork/layer-config-vector), luồng Regenerate design và fulfillment (order/review-and-initiate-fulfillment-portal) (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff xử lý đơn, api (order design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-08
- **Locator:** QA-3394 TC-21, result_QA-3394_existing-templates_2026-10-08.md, staging, không ghi số build portal/SDK; file design render 2026-10-07, đã có prefix nên sau fix. Campaign chỉ có 1 Color option chung, chỉ chứng minh khi các layer cùng màu; "mỗi layer giữ màu riêng" chưa kiểm (TC-01, TC-03 ⏸️). (CCR cũ: CBS-031 CLAIM-06)
- **Căn cứ expected:** Dev summary, chauptm, Jira TIB-5501 comment 2026-09-29 (khi có màu, SVG gộp vào 1 SVG output ở vectorize, mọi id được thêm prefix)
- **Trích nguyên văn:**
  ```
  TC-21 | ✅ AI — order design SVG ([đã bỏ id], render 2026-10-07): mọi id duy nhất toàn file, đều prefix, không ref treo, màu đúng | `[đã bỏ id].svg`: 236 id / 236 unique, dup 0, 236 có prefix `svg-xxxxxxxx-`, 61 ref → dangling 0; `clipPath18` 4 biến thể `svg-020p6log-`, `svg-yjsfiutd-`, `svg-u3s3f54u-s75-`, `svg-r8ry74n4-s74-`; fill `#E40909` ×20
  ```
