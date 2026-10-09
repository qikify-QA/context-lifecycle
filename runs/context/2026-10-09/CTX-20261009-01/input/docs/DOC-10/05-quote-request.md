<!-- testlane knowledge KB-351 · kind=feature-profile · tag=Quote · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/43a02fa0ed64c3cf92ed77b9569cc4524cc16aa8/kb/DUOS/features/05-quote-request.md · createdAt=2026-10-08T07:49:32.470Z · updatedAt=2026-10-08T11:17:09.233Z -->

# 5. B2B Quote Request

**Status:** draft

Tổng hợp ngày 2026-10-07 từ `references/apps/DUOS-quotation.md` (dựng
17/07/2026 từ toàn bộ issue Done trong Epic DUOS-125) và
`references/apps/DUOS.md` § 2 mục 3 (docs 09/07/2026). **Không đọc lại
từng ticket Jira** trong lượt này (đã có bản tổng hợp) và **chưa có task QA
Hub / test case riêng cho Quote** — mọi rule dưới đây là "theo ticket qua
reference", chưa có xác nhận QA. Đã đối chiếu inventory 2026-10-08 (store
`stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.9,
2.10, 2.11). Store có **0 quote** → quote detail, đàm phán, PDF thật,
storefront "Add to quote" và Quotes trong Customer Account **chưa verify**.

## Purpose

Buyer B2B gửi yêu cầu báo giá từ product / cart / catalog page; merchant báo
giá lại, hai bên đàm phán nhiều lượt; chốt xong convert thành order hoặc
draft order. Module trả phí "B2B Quote Request".

## Business Rules

### Lifecycle & đàm phán

- Chỉ B2B customer submit được; merchant set giá riêng từng line, custom
  discount, custom shipping fee riêng cho quote (DUOS-274, 297, 300). —
  DUOS-quotation.md § 2.
- Negotiation: buyer re-quote counter offer, seller accept hoặc gửi revised
  quote (DUOS-184). Buyer resubmit được cả quote đã reject/closed (replicate
  quotation). — DUOS-quotation.md.
- Reject: modal "Are you sure to reject this quote?" + text field optional
  (placeholder `E.g. I need better offer...`) + `[Cancel] [Confirm rejection]`;
  lý do lưu vào quote data + history (DUOS-185, 196). Reason optional có ở
  cả Portal lẫn Customer Account cho approve + reject (DUOS-213/214).
- Expiration: field `expires_at` **lưu UTC**, status `EXPIRED = 6`
  (DUOS-186, 195).
  ⚠ Lệch staging 2026-10-08: tab trang "Quote management" chỉ có "All" ·
  "Unread" · "Read" · "Replied" · "Accepted" · "Rejected" · "Deal closed" —
  **không có tab "Expired"**; quote hết hạn hiện ở tab nào chưa rõ
  (inventory/DUOS.md § 5 #18) — Need confirm.
- Reassign quote khi customer bị xoá, ghi vào history (DUOS-176).
- Requote email (DUOS-305).

### Price application — cấp LINE ITEM (corrected)

- Ban đầu 1 checkbox cho cả quote "Apply quote price to future orders of this
  company location" (DUOS-182) — **đã lỗi thời**; DUOS-215/216 chuyển xuống
  từng line item. Badge `EyeFirst` = one-time deal, `ProductCost` = permanent;
  popover đổi từng dòng; bulk "Set as permanent price" / "Set as one-time
  deal". — DUOS-quotation.md.
- Accept: line permanent → update B2B catalog price của đúng company location
  (gồm volume pricing + quantity rule minimum — DUOS-151, 174); line one-time
  → qua draft order (DUOS-187). CTA sau accept: `Create order` vs
  `Create draft order` (DUOS-183).

### Quantity rule & volume pricing

- Tôn trọng increment / minimum / maximum + volume pricing ở 3 nơi: request
  quote form (SDK), quote detail Portal, submitted quote detail (DUOS-178, 179).

### Add to Quote ở cart (DUOS-251) & modal

- Thêm toàn bộ cart; trùng sản phẩm → **cộng dồn** quantity; cart không bị
  clear; vi phạm quantity rule → inline error ("Minimum quantity of 10" /
  "Maximum quantity of 200" / "Can only add in increments of 20") + disable
  "Submit request". — DUOS-quotation-storefront-pdf.md.
- Tự mở quote modal sau "Add to quote" (DUOS-264); empty state có CTA
  configurable (button text + link) trong Quote settings (DUOS-394).

### Portal — "Quote management" & "Quote widget settings" (quan sát staging)

- Trang "Quote management" (row hub "Quote requests"): "Manage your quotes
  including: quote display, quote submission and more."; tab "All" ·
  "Unread" · "Read" · "Replied" · "Accepted" · "Rejected" · "Deal closed";
  empty "No quotations found"; section "Advanced settings": "Quote widget
  settings" và "Quote PDF template" (mỗi mục nút "Manage"). — quan sát
  staging 2026-10-08 (inventory/DUOS.md § 2.9).
- "Quote widget settings" (inventory/DUOS.md § 2.10, quan sát staging
  2026-10-08; chưa có business rule — § 5 #20, #31):
  - "Display button on which page:" checkbox {"Product page", "Cart page"}.
  - "Who will see this button:" {"B2B customers (default)" — luôn tick,
    disabled; "Not logged-in users" — "If enabled, they will be requested to
    register a B2B account inside quote request"}.
  - Section "Quote popup modal": checkbox "Show a button when quote is
    empty".
  - Section "Custom CSS selector": "Add to cart button selector", "Form
    selector" (text).
  - Section "Quote button display": "To ensure the quote button display on
    your store, please verify these steps:" (catalog cho company location;
    role có quyền request quote; theme trả phí → "contact our team").
  ⚠ Lệch staging 2026-10-08: "Display button on which page:" chỉ có Product
  page / Cart page — **không có collection/catalog page** (reference: "thêm
  từ product/catalog/cart page"; DUOS-263 "Add to quote from collection
  page") (inventory/DUOS.md § 5 #19) — Need confirm.

### History, PDF, payment info

- History log API Portal `/api/quotations/{id}/logs` và CA cùng format
  (DUOS-192, 194).
- Export PDF từ Portal + Customer Account (DUOS-211, 217); trang "Quote PDF
  template" vào từ "Advanced settings" của quote button settings (Design +
  Content + preview); translation PDF nằm ở trang Translations (DUOS-223, 224).
- Đường vào thật: "Quote management" › section "Advanced settings" › "Quote
  PDF template" › nút "Manage" (ticket ghi: "Advanced settings của quote
  button settings"); trang có nút "Back to Quotes" và 3 accordion "Design" ·
  "Content" · "Translations". Design: "Show logo", "Logo size", "Heading
  color" / "Text color" / "Background color" (reference ghi: màu
  Primary/Background/Text), "Header settings" / "Content settings" (Font
  family, Font size) (reference ghi: font Headings/Body). Content: "Quote
  info", "Customer info", "Product info", "Company info". Accordion
  "Translations" **nằm trong trang**: "To provide quote content in other
  languages, please add translations for quote fields in the Translations
  page." + nút "Go to translation" (reference ghi: "Go to Translations").
  Preview có cột "PRICE APPLICATION" ("One-time deal" / "Permanent price").
  — quan sát staging 2026-10-08 (inventory/DUOS.md § 2.11).
- Payment information: Subtotal, Shipping, Estimated tax, Total (DUOS-222).
- Portal tìm sản phẩm để thêm item vào quote (DUOS-276).

### Giới hạn đã biết

- Draft order không áp được net-term deposit (giới hạn Shopify).
- Theme B2B đã verify: Keystone/Kaleidoscope, Trade, Kettle (DUOS-207).

## Edge Cases

- Quote hỗn hợp permanent + one-time trong cùng quote — cần test, chưa có case.
- Quote của location bị revoke role khi có config
  `quotation.skip_reassign_on_revoke` (DUOS-400) — hành vi `Need confirm`.
- "Add to quote from collection page" (DUOS-263), "Hide price for not
  logged-in users" (DUOS-247), "[Portal] Create Quote" (DUOS-277) — đang To Do,
  chưa có rule.
- DUOS-422 "Fix layout in customer account" (QA Review) — nội dung chưa đọc,
  `Need confirm`.
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #18 (không có tab
  Expired), #19 (không có collection page) — xem dòng ⚠ ở Business Rules.
  Nghi lỗi #22 (403 Google Web Fonts ở Quote PDF template) — xem known
  issues.

## Testability Notes

- Chưa có task QA Hub cho Quote; task DUOS-006 (composer audit) có case smoke
  PDF + email quotation.
- Cẩn thận timezone khi test expiration (`expires_at` UTC).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `quote-request`.

## Related Jira Tickets

- [DUOS-125](https://ownego.atlassian.net/browse/DUOS-125) — Quotation, Epic (To Do) — epic gốc, danh sách issue con ở DUOS-quotation.md § 5.
- [DUOS-215](https://ownego.atlassian.net/browse/DUOS-215) / [DUOS-216](https://ownego.atlassian.net/browse/DUOS-216) — move price application xuống line item, Story (Done).
- [DUOS-251](https://ownego.atlassian.net/browse/DUOS-251) — [SDK] Add to quote button in cart page, Story (Done).
- [DUOS-394](https://ownego.atlassian.net/browse/DUOS-394) — Add CTA button to empty state of quote modal, Story (Done).
- [DUOS-422](https://ownego.atlassian.net/browse/DUOS-422) — Fix layout in customer account, Story (QA Review) — chưa đọc.

## Source

- `knowledge-work/references/apps/DUOS-quotation.md` (17/07/2026; phần Add to
  Quote / widget / PDF tách sang `DUOS-quotation-storefront-pdf.md` 2026-10-08),
  `references/apps/DUOS.md`, đọc 2026-10-07.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.9–2.11, § 5 #18–22, #31.
