# CBS-015__CLAIM-04 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S1

**Đánh giá:** S1 (CCR khai test_case, hạ xuống): TC-TIB-7619 PASS nhưng actualResult không chứng minh hành vi expectedResult khẳng định ('canvas grow bao trọn toàn bộ text tràn, không bị cắt chữ'): text render chỉ cao ~22px thay vì cỡ 601 khai báo, có vẻ co theo box ~502 → nhiều khả năng text KHÔNG tràn box group, tức grow-path cho text chưa được kích hoạt; phần vượt printarea bị cắt. Có artifact (actualResult + ảnh Testlane) → OBSERVED_CURRENT/LOW + OQ NEEDS_CONFIRMATION (dev/PO: cỡ chữ ~22px có đúng không; grow-path text chưa kiểm). CCR 4.2(3): không ghi 22px thành hành vi đúng hay bug.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-04` | TIB-5633 — Text căn giữa tràn mép trong group: chữ không bị cắt trong vùng in, phần vượt mép printarea bị clip; generate ~55s (không bao gồm việc text render chỉ cao ~22px — xem 4.2) | api (design PNG) · storefront (nhập text personalize) | `test_case` — PASS TC-TIB-7619 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; artwork/layer-config-text (cỡ chữ trong box) — chưa rõ, cần agent tự đánh giá | `ADD` |
| `CLAIM-04` | artwork | MỚI: group-layer-order-design-render | merchant (design) · guest buyer (nhập text) | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7619
- **Link:** https://staging-portal.teeinblue.com/orders/4846 · https://staging-portal.teeinblue.com/artworks?id=6072
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7619: "Order #1134 (orders/4846), item #7668, personalize text "WWWWWWWWWWWWWWWWWW" (localStorage teeinblue-customizations có layer-969077 đúng giá trị): generate ~55 giây (03:33:23 -> 03:34:18), dưới ngưỡng. Design 12000x6000: text hiển thị bắt đầu x=11699, phần vượt mép 12000 bị cắt theo printarea (đúng kỳ vọng), không có chữ bị cắt trong vùng in; 250 ô còn nguyên (25.076.329 px hiển thị so với 25.073.500 của #1125). Lưu ý: text render rất nhỏ (cao ~22px, không phải cỡ 601 như khai báo) - có vẻ text bị co theo box ~502 rộng; ghi nhận để PO/dev xác nhận nếu cần."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7619 trên Testlane
