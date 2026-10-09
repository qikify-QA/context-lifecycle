<!-- testlane knowledge KB-352 · kind=feature-profile · tag=Quick Order · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/37e6ec5b0083026b736655f8335f2f684bcbb060/kb/DUOS/features/06-quick-order.md · createdAt=2026-10-08T07:49:54.133Z · updatedAt=2026-10-08T10:44:16.901Z -->

# 6. Quick Order CSV & SKU Order

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-2 (Epic), DUOS-15, 17, 181, 219, 265,
298, 342, 357, 361, 362 (description + comment) và `references/apps/DUOS-quick-order.md`
(tách từ `DUOS.md` § 2 mục 4 ngày 2026-10-08). Nhiều ticket gốc (DUOS-2, 15, 17, 181, 298) **trống** — rule nền
chỉ có ở reference/docs. **Chưa có task QA Hub riêng**. Đã đối chiếu
inventory 2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem
`inventory/DUOS.md` (§ 2.12, 2.13, 2.19). Trang cài đặt Portal đã quan sát
thật; phía buyer (Customer Account Quick order / CSV Upload) **chưa verify**
(không có tài khoản buyer).

## Purpose

Extension trong Customer Account cho buyer đặt hàng nhanh: nhập nhiều SKU
("Bulk add SKUs"), tìm theo tên/SKU, hoặc upload CSV theo template; có thể
tạo order / checkout hoặc draft order tuỳ setting. Module trả phí "Quick
order CSV & SKU Order".

## Business Rules

### Trang Quick order SKU (DUOS-219, Done 2025-10-10)

- Bỏ progress bar và heading "Provide the SKUs & quantities you wish to
  order:"; gộp "Download catalog" và "Bulk add SKUs" vào "More actions"; nút
  "Go to order summary" cạnh "Clear all"; thêm nút "Search SKU" mở modal; bảng
  order summary có nút "Back to SKUs". — DUOS-219 description. Theo ticket.
- Modal tìm sản phẩm (dùng chung Shopping list và Quick order SKU): title
  "Search products or SKUs", placeholder "Enter product name or SKU", hiện SKU
  kèm variants, nút primary "Add" (thay "Save"). — DUOS-219.
- Location không có catalog → lỗi "No catalog available for current location"
  khi tìm / thêm SKU. — DUOS-362 description + haild 2026-03-06.

### CSV upload

- Upload file theo template để tạo order hàng loạt (references/apps/DUOS.md).
- File quá lớn: có thông báo lỗi nhưng text + giới hạn chỉ có trong ảnh
  (DUOS-361) → `Need confirm`.

### Action after create order (DUOS-357, Done 2026-03-20)

- In-app setting "Action after customer's create order" (ticket ghi: "Action
  after customer create order") có thêm lựa chọn "Create draft order" (áp
  cho cả CSV Upload và SKU Order). Sau khi bấm "Create order": disable nút +
  success message. — DUOS-357 description (thuongnth 2026-02-27); label sửa
  theo quan sát staging 2026-10-08 (inventory/DUOS.md § 2.12, 2.13).
- UI quan sát staging 2026-10-08: radio "Action after customer's create
  order" = {"Add to cart", "Go to checkout", "Create draft order"} ở cả
  "Quick order with CSV Upload" và "Quick order with SKUs" (store đang chọn
  "Go to checkout"). Trang Shopping list cùng label nhưng **không có**
  "Create draft order" — xem [07-shopping-list.md](07-shopping-list.md).
  Ý nghĩa nghiệp vụ "Add to cart" / "Go to checkout" chưa có rule chốt
  (inventory/DUOS.md § 5 #23) — Need confirm.

### Portal — trang cài đặt (quan sát staging 2026-10-08)

- "Quick order with CSV Upload" (row hub "CSV Upload"), section "Settings":
  "Action after customer's create order" (radio như trên), "Allow customers
  to create Shopping List" ("Create a saved list from the selected variants
  & quantities." + "Learn more"); "Customer account settings": "Activate the
  CSV Upload block in Orders page" ("Watch tutorial", "Open theme editor").
  — inventory/DUOS.md § 2.12.
- "Quick order with SKUs" (row hub "SKU Order"), section "Quick order
  settings": "Show download catalog button" (checkbox, store đang bật),
  "Show bulk add SKU button" (checkbox, store đang bật), "Action after
  customer's create order", "Allow customers to create Shopping List";
  "Customer account settings": "Add quick order page", "Add quick order to
  main menu". 2 checkbox "Show download catalog button" / "Show bulk add SKU
  button" chưa có trong reference / rule (inventory/DUOS.md § 2.13, § 5 #24).
- QA comment (ngant 2026-03-09/10): khi **tắt** "Allow customers to create
  Shopping List" → thông báo "Draft order created" + disable nút (bug lúc đó:
  hiện "Go to checkout"); khi **bật** → vẫn hiện "Create shopping list", ẩn
  "Create order". Thêm bản dịch "Draft order created!" ở Portal. Theo ticket.

### Download catalog CSV

- Hỗ trợ catalog theo Shopify Market (DUOS-181) — file khác nhau tuỳ Market
  của buyer (references/apps/DUOS.md).
- Loại sản phẩm unlisted (DUOS-298) và theo product tag qua config
  `download_catalog_condition` (VD `{"type":"and","conditions":[{"type":"tag","operator":"not_in","value":[...]}]}`)
  do team set trong admin theo yêu cầu khách, không có UI. — DUOS-342 comment
  haptt + thuongnth 2026-02-24.

## Edge Cases

- Text chuẩn "Draft order created" hay "Draft order created!"? `Need confirm`
  (DUOS-357 ghi cả hai).
- Nhánh bật Shopping List: có success message không; nút "Go to checkout" còn
  ở đâu khi chọn draft order? `Need confirm`.
- Tìm SKU khớp chính xác hay một phần; không có kết quả hiển thị gì?
  `Need confirm` (DUOS-219 không nói).
- Giới hạn kích thước file CSV + text lỗi? `Need confirm` (DUOS-361 chỉ ảnh).
- Số variant trong CSV vượt giới hạn API (DUOS-97, To Do) — chưa xử lý.
- CSV payload chứa ký tự đặc biệt / formula — có case smoke trong task
  DUOS-006, chưa chạy.
- Tắt "Show download catalog button" / "Show bulk add SKU button" thì nút
  "Download catalog" / "Bulk add SKUs" trong "More actions" (DUOS-219) ẩn
  hay disable? Chưa có rule (inventory/DUOS.md § 5 #24) — `Need confirm`.

## Testability Notes

- Quick order phụ thuộc module đã subscribe; store chưa mua module thì không
  hiển thị (không phải bug) — references/apps/DUOS.md § 1.
- Store `stg-duos-plus-2` (2026-10-08): Free plan, "CSV Upload" / "SKU
  Order" Inactive — trang cài đặt vẫn mở và lưu được ("you can set up and
  save extension") nhưng không active trên store (inventory/DUOS.md § 2.2,
  § 5 #30).
- Regression bắt buộc khi đổi catalog: unlisted product, catalog theo market +
  location (DUOS-342 comment haptt).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `quick-order`.

## Related Jira Tickets

- [DUOS-2](https://ownego.atlassian.net/browse/DUOS-2) — Bulk Ordering/Quick order Tools, Epic (To Do) — trống.
- [DUOS-15](https://ownego.atlassian.net/browse/DUOS-15) — Quick Order with SKUs, Story (Done) — trống.
- [DUOS-17](https://ownego.atlassian.net/browse/DUOS-17) — CSV Upload, Story (Done) — trống.
- [DUOS-181](https://ownego.atlassian.net/browse/DUOS-181) — [BE] Support Market catalog when download csv, Story (Done) — trống.
- [DUOS-219](https://ownego.atlassian.net/browse/DUOS-219) — [FE] Search SKU by product name / Search product by SKU, Story (Done) — layout + modal.
- [DUOS-265](https://ownego.atlassian.net/browse/DUOS-265) — Update layout of product search/selection modal, Story (Done) — chỉ ảnh.
- [DUOS-298](https://ownego.atlassian.net/browse/DUOS-298) — Excluding products from downloadable catalog using unlisted status, Story (Done) — trống.
- [DUOS-342](https://ownego.atlassian.net/browse/DUOS-342) — Exclude products from the CSV download using product tags, Story (Done) — config.
- [DUOS-357](https://ownego.atlassian.net/browse/DUOS-357) — Convert CSV/SKU to draft order, Story (Done).
- [DUOS-361](https://ownego.atlassian.net/browse/DUOS-361) — [CA] Improve Upload CSV file, Task (Done).
- [DUOS-362](https://ownego.atlassian.net/browse/DUOS-362) — [FE] Show error msg when search SKU, Task (Done).

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07; `references/apps/DUOS.md`.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.12, 2.13, § 5 #23, #24.
