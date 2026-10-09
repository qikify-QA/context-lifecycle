<!-- testlane knowledge KB-359 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/product/overview.md · createdAt=2026-10-08T07:52:56.702Z · updatedAt=2026-10-08T09:38:07.802Z -->

# Product Overview — Duos B2B (DUOS)

**Status:** draft

## App là gì

Shopify app giúp merchant mở rộng từ B2C sang B2B, dựa trên Shopify B2B
primitives (Company, Company Location, catalog / giá riêng theo company,
payment term) và Customer Account extensions. **Không chỉ chạy trên Shopify
Plus**: từ 04/2026 (Epic DUOS-377) mọi plan dùng được; chỉ 2 tính năng chặn
checkout cần Plus. Trước đó (DUOS-123, 2025) app khoá non-Plus — thông tin cũ
nói "chỉ Plus" đã lỗi thời.

## Ai dùng, ở đâu

- **Merchant** — Portal (embedded app trong Shopify admin), Admin UI extension
  trên trang Company / Location, Shopify Flow (trigger + action của app).
- **Buyer B2B** — storefront (registration form, Add to Quote, Save to
  shopping list) và Customer Account (Company member, Quick Order, Shopping
  list, My Quotes, Finance & credit). Khách DTC vào trang B2B thấy banner "B2B
  account required."
- **Team Qikify** — admin panel nội bộ (Filament) để xem shop, token, sửa
  `users.config` (custom config theo merchant).

## Nhóm tính năng

Modular pricing — merchant trả theo module (bảng giá hiện hành và lịch sử:
[../features/10-pricing-plans.md](../features/10-pricing-plans.md)):

1. **User & Permission** — role mặc định Admin / Senior Buyer / Junior Buyer +
   custom role, đồng bộ sang contact role Shopify, Flow action assign role,
   chặn checkout theo quyền.
2. **B2B Registration** — form builder, submission, approve → tạo company,
   reCAPTCHA / rate limit / VAT validation.
3. **B2B Quote Request** — báo giá, đàm phán, convert order / draft order, PDF.
4. **Quick order CSV & SKU Order** — đặt nhanh theo SKU / CSV.
5. **B2B Shopping List** — list đã lưu, duyệt theo role, reminder.
6. **B2B Finance & Credit** — credit limit, ledger, chặn vượt hạn mức.

Kèm: Notifications, Translations (EN + JP), Dashboard/Home, App Logo, Crisp chat.
Staging 2026-10-08 không có mục / route Dashboard riêng — chỉ Home "Welcome
to Duos B2B," (inventory/DUOS.md § 1, § 5 #28; xem
[../features/12-portal-home-translations.md](../features/12-portal-home-translations.md)).

## Đặc thù cần nhớ khi test

- Nhiều hành vi bật theo **custom config từng merchant** (Ironwear, Ca'
  Pietra, GrowerHouse, Vacasa…) trong `users.config`, không có UI Portal.
- Tính năng của module chưa mua bị ẩn — không phải bug.
- Nhiều tính năng gọi Shopify qua queue (Horizon) → kết quả bất đồng bộ.
- Mốc 01/01/2027: token legacy bị Shopify từ chối (DUOS-399).

## Source

- `references/apps/DUOS.md` (docs đọc 09/07/2026), `DUOS-quotation.md`.
- Jira DUOS (Epic + story), QA Hub project DUOS — đọc 2026-10-07.
- Help docs: https://duos-b2b-documentation.gitbook.io/duos-b2b-wholesale
- `inventory/DUOS.md` (build 2026-10-08, store `stg-duos-plus-2`, Free plan).
