# Context Change Request: order — Re-generate design và Edit customization trên order đã đặt, gộp từ CBS-045 (khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `order`
- **Ticket:** `TIB-5385, QA-3353, TIB-5438, QA-3386`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon order chưa có item nào về Re-generate design; OQ-order-011 (Edit/View customization làm gì) đang NEEDS_CONFIRMATION và hỏi đúng điều này. Proposal gốc CBS-045 không điền mức gấp (mục 4.4 để trống), đây là đề xuất khi chuyển khuôn, operator xác nhận.

# Khối A — Hành vi

Nguồn gốc chung: lấy từ knowledge QA local (product_facts.md FACT-025), không phải quan sát trực tiếp của agent soạn CCR. Mọi lượt chạy trên staging; production không rõ; build không rõ. Không có xác nhận PO/Dev nào: "user chốt 2026-09-09" và "QA xác nhận 2026-10-14" đều là QA.

### CLAIM-01

- **Statement:** Re-generate design chỉ re-apply format/layout của artwork và không re-evaluate populate config: customization đã lưu lúc đặt hàng bị đóng băng, nên đổi Value/formula/GO/màu trên artwork sau khi đặt rồi Re-generate với mặc định "No, keep current artwork version" dựng lại bản render byte-identical đúng với số buyer đã nhập, và đây không phải bug.
- **Object / feature:** order/edit-customization-after-order — Gồm cả luồng Re-generate design trên order đã đặt (customization đã lưu, đóng băng, cách thay đổi artwork tới order cũ). Không thuộc: import đơn từ Shopify (order/shopify-order-import), review và gửi fulfill (order/review-and-initiate-fulfillment-portal), cấu hình populate trên artwork (artwork). Canon liên quan: OQ-order-011
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (Order details → Re-generate design); portal, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]; hành vi do QA xác nhận, không phải PO/Dev), 2026-09-09
- **Locator:** QA-3353 TC-76 PASS 2026-09-09, staging, build không rõ (sau lần TIB-5385 giao QA cuối 2026-09-07 10:23; TIB-5385 Passed 2026-09-11, Done 2026-09-15); result_QA-3353_review_2026-09-09.md; product_facts FACT-025. Ngày 2026-09-08 cùng TC từng ❌ AI rồi QA xác nhận hành vi là đúng. Canon order có OQ-order-011 hỏi đúng điều này, chưa từng được thử. Không đề xuất coi là PO đã duyệt.
- **Căn cứ expected:** KHÔNG CÓ (hành vi do QA xác nhận trong lúc chạy TC)
- **Trích nguyên văn:**
  ```
  - [FACT-025] **Order "Re-generate design" chỉ re-apply FORMAT/LAYOUT của artwork, KHÔNG re-evaluate populate config (user chốt 2026-09-09, QA-3353 TC-76).** Customization đã lưu lúc đặt hàng bị **đóng băng**; đổi Value/formula/GO/màu trên artwork SAU khi order đã đặt → Re-generate giữ mặc định **"No, keep current artwork version"** (từ "View customization") dựng lại **byte-identical** bản render cũ, đúng với số buyer đã nhập lúc đó. […] Mở rộng cho MỌI populate format, không riêng GO — khớp dòng "Order đã đặt giữ nguyên config GO..." ở dưới và `missed_cases` line 9. Byte-identical KHÔNG phải bug.
  Tick trên Jira (QA-3353 TC-76): ✅ AI — verified 2026-09-09 (product behaviour confirmed by user): a stored customization is FROZEN at order time. "Re-generate" only re-applies the artwork's format/layout, NOT a changed populate config, and does so against the buyer's originally stored number → design stays on the old computed value; byte-identical image is correct.
  ```

### CLAIM-02

- **Statement:** Mở "Edit customization" mà không sửa field nào rồi Save thì design không đổi (hash giữ nguyên), nên mask hoặc config artwork mới không lọt vào order cũ qua Edit customization; design chỉ đổi khi sửa field thật trong Edit customization rồi Save (BR-08).
- **Object / feature:** order/edit-customization-after-order — Gồm cả luồng Re-generate design trên order đã đặt (customization đã lưu, đóng băng, cách thay đổi artwork tới order cũ). Không thuộc: import đơn từ Shopify (order/shopify-order-import), review và gửi fulfill (order/review-and-initiate-fulfillment-portal), cấu hình populate trên artwork (artwork). Canon liên quan: OQ-order-011
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (Order details → Edit customization); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]; BR-08 do QA xác nhận trên web, không phải PO/Dev), 2026-10-14
- **Locator:** QA-3386 TC-41 PASS 2026-10-14 (recheck), staging, build không rõ (sau lần TIB-5438 giao QA cuối 2026-09-29 15:57; TIB-5438 Passed 2026-10-14, Done 2026-10-15); result_QA-3386_TC41_recheck_2026-10-14.md; 01-analysis.md QA-3386 BR-08; product_facts FACT-025. Lần 2026-10-08 cùng TC ⏸️ chờ xác nhận diễn giải rồi PENDING-07b được QA resolve 2026-10-14. Diễn giải cũ "thay đổi chỉ tới order cũ qua Edit customization" thiếu nhánh Re-generate "Yes" (xem CLAIM-03).
- **Căn cứ expected:** KHÔNG CÓ (BR-08 do QA xác nhận trên web 2026-10-14)
- **Trích nguyên văn:**
  ```
  QA-3386 TC-41 — [Edge] Order đã đặt (artwork KHÔNG override) → seller bật override + upload mask mới → mở Edit customization, KHÔNG sửa field nào, Save → design KHÔNG đổi (mask override mới KHÔNG tự lọt vào qua Edit customization) — expected/kết quả ghi trong bảng TC: Design output KHÔNG đổi (hash giữ nguyên) — mở Edit customization rồi Save mà không sửa field nào KHÔNG đưa mask override mới vào design (BR-08: Edit customization chỉ đưa thay đổi vào khi THỰC SỰ sửa field nào đó trong đó rồi Save; mask override là cấu hình artwork, không phải field của Edit customization).
  Tick trên Jira (QA-3386 TC-41): ✅ AI — khớp Expected mới (BR-08)
  ```

### CLAIM-03

- **Statement:** Re-generate design với radio "Yes. Upgrade latest artwork version." là đường đưa thay đổi của artwork (ví dụ mask override mới) vào order đã đặt, còn Re-generate giữ mặc định "No" thì không đổi gì.
- **Object / feature:** order/edit-customization-after-order — Gồm cả luồng Re-generate design trên order đã đặt (customization đã lưu, đóng băng, cách thay đổi artwork tới order cũ). Không thuộc: import đơn từ Shopify (order/shopify-order-import), review và gửi fulfill (order/review-and-initiate-fulfillment-portal), cấu hình populate trên artwork (artwork). Canon liên quan: OQ-order-011
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (Order details → Re-generate design); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến, xác nhận trên web), 2026-10-14; không phải PO/Dev
- **Locator:** 01-analysis.md QA-3386 §10 PENDING-07b (resolved 2026-10-14 dựa trên kết quả TC-40/TC-41 ngày 2026-10-08); QA-3386 TC-40 tick cuối ⏸️ AI chờ nguồn, không có TC chạy nhánh "Yes. Upgrade latest artwork version" và PASS; product_facts FACT-025 nhánh (b). Không đề xuất coi nhánh "Yes" đã có PASS.
- **OQ:** NEEDS_CONFIRMATION — Re-generate với radio "Yes. Upgrade latest artwork version." có thật sự đưa thay đổi artwork (vd mask override mới) vào order đã đặt không? Chưa có TC nào chạy nhánh này và PASS (liên quan OQ-order-011). — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  Thay đổi (kể cả artwork config như mask override) chỉ tới order cũ qua (a) sửa field thật trong **"Edit customization"** rồi Save, HOẶC (b) Re-generate chọn radio **"Yes. Upgrade latest artwork version."** — Re-generate giữ "No", hoặc mở Edit customization không sửa gì rồi Save, đều KHÔNG đổi (BR-08, QA xác nhận 2026-10-14, QA-3386 TC-40/TC-41
  01-analysis.md QA-3386 PENDING-07b — Resolved 2026-10-14 (QA trên web, dựa theo kết quả test thật TC-40/TC-41 ngày 2026-10-08): cơ chế đưa thay đổi artwork (mask override) vào order cũ đã đặt KHÔNG phải "Edit customization" tự nó (mở modal, không sửa field nào, Save → design KHÔNG đổi — hash giữ nguyên).
  ```
