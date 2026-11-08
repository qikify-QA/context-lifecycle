# CBS-090 CLAIM-01

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Nút Run effects hiện ở góc phải header "Image effects" của Photo layer customization Normal trên store không phải Etsy; không hiện cho layer Linked / No customization, không hiện trên store Etsy. "Always visible" của spec = luôn hiện dù đã cấu hình effect hay chưa (disabled tới khi có), không phải hiện cho mọi loại layer/store
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (artwork editor); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng Q1, chấp nhận implementation trong dev doc 2026-10-08. Phần "không hiện cho Global option" của dev doc bị spec 2026-10-19 đảo lại, không đưa vào canon. Bổ trợ TC-01 PASS 2026-10-15; Linked và No customization kiểm ở TC-80 (tạm dừng, 2/4 layer); Etsy chưa kiểm (TC-03 not-run) (CCR cũ: CBS-029 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Spec says the Run effects button is 'Always visible', but it is hidden for Global option / Linked / No customization Photo layers and on Etsy stores. Which is correct?"
  Q1: Accept the implementation. "Always visible" in the spec meant visible whether or not effects are configured (disabled until then), not across all layer types or stores.
  Implementation được chấp nhận (dev doc, giangnth, 2026-10-08):
  A **Run effects** button sits on the "Image effects" heading of a Photo layer whose customization type is Normal. It is not shown for Global option / Linked / No customization layers, nor on Etsy stores.
  (Phần "Global option" bị spec 2026-10-19 đảo lại — xem CLAIM-02.)
  ```
