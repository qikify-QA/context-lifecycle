<!-- testlane knowledge KB-361 · kind=product · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/product/glossary.md · createdAt=2026-10-08T07:53:32.287Z · updatedAt=2026-10-08T09:38:06.987Z -->

# Glossary — Duos B2B (DUOS)

**Status:** draft

Thuật ngữ hay bị dùng lệch giữa docs, ticket, UI. Gặp chỗ mơ hồ mới thì thêm
dòng ở đây, file feature link sang thay vì giải thích lại.

| Term | Definition | Notes |
|---|---|---|
| Portal | Embedded app của Duos trong Shopify admin (merchant dùng) | Khác "admin panel" nội bộ |
| Admin panel | Trang quản trị nội bộ Filament của team Qikify (`staging-admin…`) | Shops → "Token and scopes", JSON editor `users.config` |
| Admin extension / Admin UI block | Extension của Duos hiện trong trang Company / Location của Shopify admin | Đổi role member, block credit info (DUOS-398) |
| CA | Customer Account (extension cho buyer) | |
| SDK | Phần storefront (theme app extension / script) | Registration form, Add to Quote |
| Company / Company Location | Đơn vị B2B của Shopify; role và credit gán theo **location** | Bulk đếm theo company — dễ lệch |
| Main contact | Contact chính của company trên Shopify | DUOS-406: không còn là role, hiển thị badge "Main Contact" |
| Admin / Senior Buyer / Junior Buyer | 3 default role Duos | Admin ↔ Shopify "Location admin"; Senior/Junior ↔ "Ordering only". Một số merchant đổi tên Admin thành "Location admin" (config DUOS-401) |
| Location admin / Ordering only | 2 contact role của Shopify B2B | Slug Flow: `location_admin` / `ordering_only` |
| Role template | Role (default hoặc custom) dùng làm mẫu trong Portal; publish cho company | Source of truth của permission (DUOS-405) |
| Member | Role fallback khi customer không có role Duos | `member` là `role_name` hợp lệ |
| Submission | Bản đăng ký từ registration form | Status `pending` / `completed` (UI "Approved") / `failed`; không có `rejected` |
| Flag ON / OFF | `enable_company_creation_on_submit` của store | ON: company tạo lúc submit |
| setup_incomplete | Submission có `company_id` + `company_creation_error` | Banner vàng |
| Permanent / one-time deal | Cách áp giá quote theo line item | Permanent cập nhật catalog; one-time qua draft order |
| Net terms | Payment term Net 7/15/30/45/60/90 | Credit chỉ áp cho Net |
| Outstanding balance / Used credit | Cùng một số (credit đã dùng) | Portal dùng "Outstanding balance", CA dùng "Used credit" |
| Pending / Waiting for Approval | Status shopping list chờ duyệt | Ticket dùng cả 2 tên — tên UI `Need confirm` |
| Legacy / Expiring token | Offline token vĩnh viễn (cũ) vs hết hạn ~60 phút + refresh ~90 ngày | Legacy chết từ 2027-01-01 |
| Early-bird | Merchant giữ giá ưu đãi cũ (trước modular pricing) | DUOS-333; khác "store đang trả giá cũ" của DUOS-431 |
| Custom plan | Mọi plan trả phí hiện tại (tên "Custom: xxxx") | Không dùng để phân biệt store giá cũ (DUOS-431) |
| Extension (trong pricing) | = module trả phí | "4 extensions ~5%" |
| Task QA Hub `DUOS-00N` vs issue Jira `DUOS-N` | Cùng prefix, khác hệ thống | Task DUOS-004 ≠ Jira DUOS-4 |
