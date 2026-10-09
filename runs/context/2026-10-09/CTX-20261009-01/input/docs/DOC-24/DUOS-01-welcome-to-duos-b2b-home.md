# DUOS — Inventory · Welcome to Duos B2B, (Home) … Get Duos Admin (admin panel nội bộ Filament)

> Phần **Welcome to Duos B2B, (Home) … Get Duos Admin (admin panel nội bộ Filament)** của inventory DUOS — tách từ `knowledge-work/inventory/DUOS.md` bằng `scripts/split-inventory.py`. Nguồn, route, môi trường, lịch sử build: `DUOS-00-overview.md`. Link `#…` trỏ sang file khác thì tìm theo id ở file tương ứng.

## 2. Feature (phần module)

### 2.1. Welcome to Duos B2B, (Home)

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: ✅ chạy đủ (chỉ đọc)
- **Vào bằng đường nào**: Admin › Apps › "Staging GetDous"
- **Nội dung** (đúng tên UI): nút "Help center"; card "Duos B2B app embed status" (badge `Disabled`, nút "Enable app", text "To display B2B registration form, please enable and save app embed block on Shopify Theme Editor."); "Setup guide" ("0 / 3 completed") 3 bước: "Set up B2B Company Registration form" (nút "Create form"), "Enable theme app extensions" (nút "Enable theme app extension"), "Explore all B2B extensions in Customer Account" (badge "Shopify's latest update", nút "Explore all extensions"); card "Onboarding call" — "Schedule your onboarding demo call", nút "Book a call", "Chat with us"; "Tutorials" 3 card ("Display B2B/Wholesale registration form", "Add Quick order with SKUs page", "Add Quick order with CSV Upload") nút "Watch tutorial"; select "Language:" {English, 日本語}.
- **Phụ thuộc**: theme app embed; "Book a call" hiện trên store Plus (reference: chỉ Plus/Advanced).
- **Liên kết**: [`kb/DUOS/features/12-portal-home-translations.md`](../kb/DUOS/features/12-portal-home-translations.md)
- **Nguồn**: staging `/` — 2026-10-08 · screenshot `DUOS-home.png`

### 2.2. B2B extensions hub

- **Tag QA Hub**: `Pricing` (gián tiếp — trạng thái theo gói)
- **Trạng thái trên staging**: ✅
- **Vào bằng đường nào**: sidebar "B2B extensions"
- **Nội dung**: alert "B2B extensions in Free plan are available for testing and setup only." + "With your current Free plan, you can set up and save extension. However, to activate this extension on your online store, please upgrade to the Premium plan." + nút "Upgrade plan". Tab: "All extensions (8)", "Company setup (2)", "Ordering (4)", "Finance & credit (2)", "Active (0)"; nút "Search and filter results". 8 row (badge `Inactive` cả 8): "B2B registration", "Credit limit", "Finance & payment", "Users & permissions", "Quote requests", "CSV Upload", "SKU Order", "Shopping list". Row bấm được (mở trang cài đặt) dù Inactive.
- **Phụ thuộc**: gói app (§ 2.17)
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Extension chưa subscribe bị disable ở List extensions, Notifications, Translate"
- **Nguồn**: staging `/extensions` — 2026-10-08 · `DUOS-extensions.png`

### 2.3. B2B Company management (B2B registration)

- **Tag QA Hub**: `B2B Registration`
- **Trạng thái trên staging**: 🟡 một phần — store chưa có form và submission; form builder / submission detail / Approve không xem được
- **Vào bằng đường nào**: B2B extensions › "B2B registration"
- **Nội dung**: header "B2B Company management", nút "Spam protection settings", "Help center"; alert "B2B Registration Form in Free plan are available for testing and setup only." (… "upgrade to the Premium plan", "Upgrade plan"); card "B2B/Wholesale Company registration form" (badge `0/1`, nút "Create form"); bảng submission: tab "All" · "Pending" · "Approved" · "Failed", "Search and filter results", "Sort the results"; empty state "No company submission found"; card "Notifications" ("Set up and manage notifications for you and your customers.", nút "Manage").
- **Phụ thuộc**: theme app embed (storefront); flag `enable_company_creation_on_submit` (§ 3)
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Status submission chỉ có `pending` / `completed` / `failed`", § "❓ Đang tranh chấp — Submission có Reject hay chỉ Delete" · task QA Hub DUOS-002, DUOS-004
- **Nguồn**: staging `/extensions/company-submissions` — 2026-10-08 · `DUOS-extensions-company-submissions.png`

### 2.4. Spam protection

- **Tag QA Hub**: `B2B Registration`
- **Trạng thái trên staging**: 🟡 — đang tắt; field key chỉ hiện khi bật, không bật để xem
- **Vào bằng đường nào**: B2B Company management › "Spam protection settings"
- **Setting**:

  | Setting | Kiểu / giá trị | Mặc định | Ghi chú |
  |---|---|---|---|
  | Enable reCAPTCHA | checkbox | tắt (store này) | help "Block spam and bot submissions on your B2B registration form." |
  | (site key / secret key) | — | — | không thấy khi tắt; theo BR có 2 field này |

  Section "Google reCAPTCHA v3"; info "Use a reCAPTCHA v3 key" — "Create a key on the Google reCAPTCHA admin and choose reCAPTCHA v3 — reCAPTCHA v2 keys are not supported. Add your storefront domain to the key's domain list."
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § ""Spam protection settings" — reCAPTCHA v3, không có ô min_score"
- **Nguồn**: staging `/extensions/company-submissions/settings` — 2026-10-08 · `DUOS-company-submissions-settings.png`

### 2.5. Credit management (Credit limit)

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Finance & Credit`)
- **Trạng thái trên staging**: 🟡 — không có transaction; không đổi credit limit để xem luồng ghi
- **Vào bằng đường nào**: B2B extensions › "Credit limit"
- **Nội dung**: header "Credit management" — "Monitor and manage B2B credit accounts, track outstanding balances, and assess credit risk across your customer"; tab "Company"; bảng: checkbox "Select all companies", cột "Company" · "Locations" · "Total credit limit" · "Action" (ô Action trống); liệt kê **mọi company Shopify** (Snowdevil, Powderbound — "1 location", "-"). Không có nút thêm company. Company detail: tab "Location", cột "Locations" · "Credit limit" (ô **spinbutton sửa inline**) · "Available credit" · "Outstanding balance" · nút icon mở location. Location detail: nút "Download statement"; 3 thẻ "Available credit" / "Outstanding balance" / "Credit limit" ($0); empty "No transactions found". Không thấy banner "Shopify Plus required for this feature" (store Plus).
- **Phụ thuộc**: Shopify Plus cho phần chặn checkout; Shopify Function validation (BR)
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "B2B Finance & Credit" · [`kb/DUOS/features/08-finance-credit.md`](../kb/DUOS/features/08-finance-credit.md)
- **Nguồn**: staging `/extensions/credit-limit…` — 2026-10-08 · `DUOS-credit-limit.png`. Console: `TypeError: Cannot read properties of null (reading 'field')` (ExtensionBundle) khi mở trang

### 2.6. Finance & payment

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: ✅ (trang cài đặt)
- **Vào bằng đường nào**: B2B extensions › "Finance & payment"
- **Setting** — "Which data to display:":

  | Setting | Kiểu | Mặc định | Ghi chú |
  |---|---|---|---|
  | Account overview | checkbox | bật | "Including: Order count, Total payments & Total purchases" |
  | Payment overview | checkbox | bật | "Including: Due amount, Due date & Total outstanding" |
  | Credit limit overview | checkbox | bật | "Including: Available credit, Credit limit & Used credit" |
  | Order history | checkbox | bật | "Show all order history with payment status and quick payment link" |
  | Financial ledger | checkbox | bật | "Show chronological log of every order transaction" |

  "Customer account settings": "Active Finance & payment overview extension" — nút "Watch tutorial", "Open theme editor".
- **Nguồn**: staging `/extensions/finance` — 2026-10-08 · `DUOS-finance.png`

### 2.7. Users & permission

- **Tag QA Hub**: `Company Member` (+ KB tag `Roles & Permissions`)
- **Trạng thái trên staging**: 🟡 — không chạy "Run bulk assign"
- **Vào bằng đường nào**: B2B extensions › "Users & permissions"
- **Nội dung**: h2 "Users & permission" + badge `Inactive`, "Let B2B buyers manage their their own company members with permissions to support specific workflows."; alert "Member and role extension in Free plan is available for testing and setup only."; alert "The Company member extension block is not activated yet." ("Please go to Customer account editor…", "Open theme editor", "Watch tutorial"); section "Roles & permissions": "View and manage available buyer roles for B2B companies" + nút "Manage roles"; "Apply admin role to:" radio {"Main contacts" (chọn), "Location admin"}, "Last synced at: Not synced yet", nút "Run bulk assign"; "Customer account settings" › "Preview" (ảnh "Company members extension block"). Không có màn danh sách member theo company.
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Bulk operations — Member role assignment" · task QA Hub DUOS-003
- **Nguồn**: staging `/extensions/company-members` — 2026-10-08 · `DUOS-company-members.png`

### 2.8. Roles & permissions

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Roles & Permissions`)
- **Trạng thái trên staging**: 🟡 — xem đủ 3 default role; modal tạo custom role chỉ xem bước 1; store chưa có custom role
- **Vào bằng đường nào**: Users & permission › "Manage roles"
- **Nội dung**: "Manage buyer roles globally and customize roles to your B2B client needs"; nút "Help center", "Create custom role"; tab "All 3" · "Default" · "Custom"; cột "Role" · "Type" · "Used in" · "Actions"; 3 row: "Admin" / "Senior buyer" / "Junior buyer" — `Default`, "All companies", nút icon xem. Modal "<Role>'s permissions": status "This is a default role. Its permissions are fixed and read-only. You can create a custom role based on this template to customize to your needs."; mọi checkbox disabled.
- **Nhóm permission** (đúng tên UI) và giá trị của 3 default role (✓ = checked):

  | Nhóm › permission | Admin | Senior buyer | Junior buyer |
  |---|---|---|---|
  | Order history › View the list of orders that all customers have placed | ✓ | — | — |
  | Order history › View their own orders for the company location | ✓ | ✓ | ✓ |
  | Shipping and billing › Edit billing and shipping addresses from their account | ✓ | — | — |
  | Finance & credit › View finance account / Make payments / View credit limit / View order history / View ledger | ✓ | ✓ | ✓ |
  | User management › View · Create/Edit/Delete | ✓ | (không có nhóm) | (không có nhóm) |
  | Role management › View · Create/Edit/Delete | ✓ | (không có nhóm) | (không có nhóm) |
  | Shopping list › View Shopping lists from all members in company location | ✓ | ✓ | — |
  | Shopping list › Create/Edit/Delete | ✓ | ✓ | ✓ |
  | Shopping list › Approve draft status list | ✓ | ✓ | (thay bằng "Submit shopping list for approval" ✓) |
  | Shopping list › Create order from approved shopping list | ✓ | ✓ | ✓ |
  | CSV upload › Create shopping list from CSV · Create order from CSV | ✓ ✓ | ✓ ✓ | ✓ — |
  | Quick order › Create shopping list from SKU · Create order from SKU | ✓ ✓ | ✓ ✓ | ✓ — |
  | Quotes › View quotations · Create and edit quotations · Create order from quotation | ✓ ✓ ✓ | ✓ ✓ ✓ | — ✓ — |
  | Purchase from online store › Complete purchases from online store | ✓ | ✓ | — |

- **Modal "Create custom role"** (bước 1): "Role name" (placeholder "Enter role name"), select "Select based role" {Admin (mặc định), Senior buyer, Junior buyer}, "Description" (placeholder "Enter role description (optional)"), nút "Close", "Next" (disabled khi trống). Accessible name của dialog là "535".
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Trang "Roles & permissions": default role chỉ xem…", § "Permission của Admin cố định…", § "3 default role…"
- **Nguồn**: staging `/extensions/company-members/roles-permissions` — 2026-10-08 · `DUOS-roles-permissions.png`

### 2.9. Quote management (Quote requests)

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Quote`)
- **Trạng thái trên staging**: 🟡 — 0 quote, không xem được quote detail / negotiation / PDF thật
- **Vào bằng đường nào**: B2B extensions › "Quote requests"
- **Nội dung**: "Quote management" — "Manage your quotes including: quote display, quote submission and more."; tab "All" · "Unread" · "Read" · "Replied" · "Accepted" · "Rejected" · "Deal closed"; empty "No quotations found"; section "Advanced settings": "Quote widget settings" (nút "Manage"), "Quote PDF template" (nút "Manage").
- **Liên kết**: [`references/apps/DUOS-quotation.md`](../references/apps/DUOS-quotation.md) · [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "B2B Quote Request"
- **Nguồn**: staging `/extensions/quotation` — 2026-10-08 · `DUOS-quotation.png`

### 2.10. Quote widget settings

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: ✅ (chỉ đọc)
- **Setting**:

  | Setting | Kiểu / giá trị | Giá trị store | Ghi chú |
  |---|---|---|---|
  | Display button on which page: | checkbox {Product page, Cart page} | Product page ✓, Cart page — | |
  | Who will see this button: | checkbox {B2B customers (default), Not logged-in users} | B2B ✓ (disabled), Not logged-in — | "If enabled, they will be requested to register a B2B account inside quote request" |
  | Show a button when quote is empty | checkbox | tắt | section "Quote popup modal" |
  | Add to cart button selector | text | trống | section "Custom CSS selector" |
  | Form selector | text | trống | |

  Section "Quote button display" có status "To ensure the quote button display on your store, please verify these steps:" (catalog cho company location; role có quyền request quote; theme trả phí → "contact our team"). Preview: nút "Add to cart" + "Add to quote".
- **Nguồn**: staging `/extensions/quotation/settings` — 2026-10-08 · `DUOS-quotation-settings.png`

### 2.11. Quote PDF template

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: ✅ (chỉ đọc)
- **Vào bằng đường nào**: Quote management › Advanced settings › "Quote PDF template" › "Manage"
- **Setting**: 3 accordion "Design" · "Content" · "Translations".
  - Design: "Show logo" ✓ (+ "Uploaded file"), "Logo size" slider 100, "Heading color" `#13115C`, "Text color" `#161616`, "Background color" `#FFFFFF`; "Header settings": Font family (Courier Prime), Font size 26; "Content settings": Font family (Cairo), Font size 14.
  - Content: "Quote info" {Quotation number, Created date, Valid days, Show shipping rate, Show discount}; "Customer info" {Contact person information, Company information, Shipping address, Payment terms}; "Product info" {Show SKU, Show variant, Show quantity, Show price application, Show unit price, Show total} — tất cả ✓; "Company info": "Enter store name", "Enter email address", "Enter phone number", "Enter store address", "Enter ZIP code", "Enter tax number".
  - Translations: "To provide quote content in other languages, please add translations for quote fields in the Translations page." + "Learn more", nút "Go to translation".
  - Preview: "QUOTE", "Quote No", "Issued date", "Valid for 30 days", "QUOTE FROM" / "QUOTE TO" / "SHIP TO", cột "DESCRIPTION" · "QTY" · "PRICE APPLICATION" ("One-time deal" / "Permanent price") · "UNIT PRICE" · "TOTAL", "SUBTOTAL" · "DISCOUNT" · "SHIPPING/HANDLE" · "TAX" · "GRAND TOTAL", "Terms & Conditions".
- **Nguồn**: staging `/extensions/quotation/template-pdf-preview` — 2026-10-08 · `DUOS-quotation-template-pdf-preview.png`. Console: 6× 403 `googleapis.com/webfonts/v1/webfonts`

### 2.12. Quick order with CSV Upload

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Quick Order`)
- **Trạng thái trên staging**: ✅ (trang cài đặt; phía buyer ❌ § 2.19)
- **Setting** ("Settings"):

  | Setting | Kiểu / giá trị | Giá trị store |
  |---|---|---|
  | Action after customer's create order | radio {Add to cart, Go to checkout, Create draft order} | Go to checkout |
  | Allow customers to create Shopping List | checkbox ("Create a saved list from the selected variants & quantities." + "Learn more") | tắt |

  "Customer account settings": "Activate the CSV Upload block in Orders page" — "Watch tutorial", "Open theme editor".
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § ""Action after customer create order" có lựa chọn "Create draft order""
- **Nguồn**: staging `/extensions/csv-upload` — 2026-10-08 · `DUOS-csv-upload.png`

### 2.13. Quick order with SKUs

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Quick Order`)
- **Trạng thái trên staging**: ✅ (trang cài đặt)
- **Setting** ("Quick order settings"):

  | Setting | Kiểu / giá trị | Giá trị store |
  |---|---|---|
  | Show download catalog button | checkbox | bật |
  | Show bulk add SKU button | checkbox | bật |
  | Action after customer's create order | radio {Add to cart, Go to checkout, Create draft order} | Go to checkout |
  | Allow customers to create Shopping List | checkbox | tắt |

  "Customer account settings": "Add quick order page", "Add quick order to main menu" — mỗi dòng "Watch tutorial" + "Open theme editor".
- **Nguồn**: staging `/extensions/sku` — 2026-10-08 · `DUOS-sku.png`

### 2.14. Shopping list

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Shopping List`)
- **Trạng thái trên staging**: 🟡 — 0 list, không xem được list detail / "Copy link"
- **Setting** ("Shopping list settings"):

  | Setting | Kiểu / giá trị | Giá trị store | Ghi chú |
  |---|---|---|---|
  | Save products to shopping list from | checkbox {Product page, Collection page} | cả hai tắt | |
  | Action after customer's create order | radio {Add to cart, Go to checkout} | Go to checkout | không có "Create draft order" |
  | Allow customers to save cart as Shopping List | checkbox | tắt | "Create the saved list from all items in the cart" |
  | Reset approved list to pending after order submission | checkbox | tắt | "Applies to junior buyers and any role without shopping list approval permission." + "Learn more" |

  "Customer account settings": "Add "Shopping List" page", "Add "Shopping List" to main menu". Nút header "Manage shopping lists" → bảng company ("Company" · "Locations" · "Action") → company › tab "Location", cột "Locations" · "Number of shopping list" · "Action". Không thấy setting reminder.
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "B2B Shopping List"
- **Nguồn**: staging `/extensions/shopping-list…` — 2026-10-08 · `DUOS-shopping-list.png`

### 2.15. Notifications

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Notifications`)
- **Trạng thái trên staging**: ✅ (chỉ đọc; switch không bấm)
- **Vào bằng đường nào**: sidebar "Notifications" (hoặc card "Notifications" › "Manage")
- **Nội dung** — 5 nhóm (nút trái): 

  | Nhóm | Admin notification | Customer notification |
  |---|---|---|
  | B2B submission | "New submission notification" — "Send internal notification email when receiving new B2B submissions." — nút "Read instruction", "Open Shopify Flow" | "B2B account created" — "Send email to customer when their B2B submission is approved." — "Read instruction", "Open Shopify Flow" |
  | Quotations | switch: "New quote submitted", "Quote accepted", "Quote rejected", "Quote re-quoted" | "Auto-response email", "Proposal email" — "Edit template" + switch |
  | Members & permissions | — | "Member added to location", "Member role updated" — "Edit template" + switch |
  | Shopping list | — | "Shopping list approved" ("…alert junior buyers…"), "Shopping list pending approval" ("…alert admin or senior buyers…") — "Edit template" + switch |
  | Credit limit | switch "Alert for "Low available credit" company" — "…falls below 20% of total limit." | "Credit limit assigned to a company location" — "Edit template" + switch |

  Switch không mang thuộc tính disabled trong accessibility tree (store Free plan). **Editor template** (`credit-assigned`): badge `Inactive` + nút "Activate"; field "Sender name:", "Sender email:", "Reply to email:", "Email template subject:" (`Important: Credit limit established for {location_name}`); "Available variables" ({customer_name}, {customer_email}, {shop_email}, {shop_name}, {company_name}, {location_name}, {credit_limit}, {currency_code}, {login_url}); editor Unlayer (Content / Blocks / Body). Footer mẫu: "…You received this email because you submitted a quote request to {shop_name}".
- **Phụ thuộc**: Shopify Flow cho nhóm B2B submission
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Notifications"
- **Nguồn**: staging `/notifications`, `/notifications/templates/0?type=credit-assigned` — 2026-10-08 · `DUOS-notifications.png`

### 2.16. Content & Translation (Translations)

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: 🟡 — store chỉ có English; nội dung từng tab không mở
- **Nội dung**: h1 "Content & Translation"; "English" `Default`; combobox locale disabled "No locale found"; tab "Registration form" · "CSV Upload" · "Bulk add SKUs" · "Members and roles" · "Shopping list" · "Quotation" + "More views" {"Finance & Credit", "Block checkout extension"}; "Translate and manage content for each market" / "Manage language translation, custom content for each market.", nút "Add language". Tab không disabled (store Free plan).
- **Nguồn**: staging `/translation` — 2026-10-08 · `DUOS-translation.png`

### 2.17. Subscription (Pricing)

- **Tag QA Hub**: `Pricing` · task DUOS-005
- **Trạng thái trên staging**: ✅ (chỉ đọc, store Free plan)
- **Nội dung**: "Subscription" — "See costs and savings with our usage calculator.", nút "Help Center". Card "Add items to your estimate" — checkbox **disabled** cả 6:

  | Nhóm | Item | Giá hiển thị (store Plus) | Mô tả |
  |---|---|---|---|
  | Company setup | Users & permissions | $150.00 | Let buyers manage members with roles |
  | Company setup | B2B Registration | $50.00 | Create B2B form, manage all submissions |
  | B2B ordering | B2B Quote request | $50.00 | Quote request and price negotiations |
  | B2B ordering | CSV & SKU Quick order | $100.00 | Support buyers order and re-order quickly |
  | B2B ordering | B2B Shopping list | $150.00 | Manage B2B shopping lists |
  | Finance & credit | B2B Finance & credit | $200.00 | Manage B2B credit accounts |

  Panel "Current subscription" — badge `Free`, "No items selected", "Subtotal" "-", "Total: $0 /mo", nút "Build my plan"; card "Get in touch with us" + "Contact sales". Không thấy "Select all", toggle Monthly/Yearly, giá gạch, banner trial / early partners.
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Pricing & Subscription" · [`open-questions/DUOS.md`](../open-questions/DUOS.md) § "Pricing (DUOS-430 / DUOS-431)"
- **Nguồn**: staging `/pricing` — 2026-10-08 · `DUOS-pricing.png`

### 2.18. Admin UI block trên trang Company location (Shopify admin)

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: 🟡 — extension được tải nhưng **không render nội dung**
- **Vào bằng đường nào**: Shopify admin › Customers › Companies › Snowdevil › location Snowdevil (vùng "Blocks"); trang company không thấy block Duos
- **Quan sát**: console: target `admin.company-location-details.block.render` (app `staging-getdous`); `404` `staging-api.getduos.io/api/admin-extensions/company-locations/<id>` + "Error fetching credit info: No query results for model [App\Models\CompanyLocation]."
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Admin UI block trên trang Company / Location chỉ hiển thị"
- **Nguồn**: staging Shopify admin — 2026-10-08 (console log)

### 2.19. Customer Account extensions (Company member, Quick order, Shopping list, Quotes, Finance & payment)

- **Tag QA Hub**: `Customer Account`, `Company Member`
- **Trạng thái trên staging**: ❌ không đi được — không có tài khoản buyer; Portal báo "The Company member extension block is not activated yet."
- **Liên kết**: task QA Hub DUOS-003 · [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Company member — Customer Account (DUOS-412)"
- **Nguồn**: staging Portal (thông báo trạng thái) — 2026-10-08

### 2.20. Storefront (registration form, Add to quote, Save to shopping list)

- **Tag QA Hub**: `B2B Registration`
- **Trạng thái trên staging**: ❌ — storefront password page; app embed `Disabled`; store chưa có form
- **Nguồn**: `stg-duos-plus-2.myshopify.com/password` — 2026-10-08

### 2.21. Checkout extension (Block checkout by permission / credit)

- **Tag QA Hub**: *chưa có task nào mang tag*
- **Trạng thái trên staging**: ❌ — cần buyer + cart; chỉ thấy tab dịch "Block checkout extension" (§ 2.16)
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Chặn checkout theo permission / theo credit chỉ chạy trên Shopify Plus"
- **Nguồn**: staging `/translation` — 2026-10-08

### 2.22. Shopify Flow (trigger / action của app)

- **Tag QA Hub**: *chưa có task nào mang tag* (KB tag `Roles & Permissions`)
- **Trạng thái trên staging**: ❌ không mở — chỉ thấy nút "Open Shopify Flow" ở Notifications › B2B submission
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Shopify Flow — Action "Assign role"", § "4 Shopify Flow trigger cho email notification"
- **Nguồn**: staging `/notifications` — 2026-10-08

### 2.23. Get Duos Admin (admin panel nội bộ Filament)

- **Tag QA Hub**: `Auth & Token` · task DUOS-001
- **Trạng thái trên staging**: 🟡 — chỉ thấy trang login: "Get Duos Admin", "Sign in", link "Sign in with Slack"
- **Liên kết**: [`business-rules/DUOS.md`](../business-rules/DUOS.md) § "Admin UI — Token and scopes"
- **Nguồn**: `staging-admin.getduos.io/admin/login` — 2026-10-08


## 5. Phát hiện lệch — Welcome to Duos B2B, (Home) … Get Duos Admin (admin panel nội bộ Filament)

### 5. Phát hiện lệch — build ngày 2026-10-08 (28 dòng thuộc module)

| # | Loại | Chi tiết | BR bị ảnh hưởng | Đề xuất |
|---|---|---|---|---|
| 1 | Hệ thống làm khác reference / business rule | § 2.17: trang "Subscription" (store Plus) hiển thị **Users & permissions $150.00**, **B2B Registration $50.00**, Quote $50, CSV & SKU Quick order $100, Shopping list $150, Finance & credit $200 — tức giá đợt Oct 2026 (DUOS-430) đã lên staging. `references/apps/DUOS.md` § 1 vẫn ghi U&P + Registration Free, Plus $69/$79/$99/$149. Checkbox U&P không còn "check sẵn, $0.00" | `business-rules/DUOS.md § "❓ Đang tranh chấp — User & Permission Free hay trả phí"` | báo PO: staging đã chạy giá trả phí trong khi rule còn tranh chấp; sửa reference § 1 khi PO chốt |
| 2 | Hệ thống làm khác business rule | § 2.17: store Free plan → CTA **"Build my plan"**, badge `Free`, "No items selected" — rule ghi CTA "Build my subscription" | `business-rules/DUOS.md § "Store Free plan: bỏ chọn mọi item, badge "Free", CTA "Build my subscription""` | sửa label trong rule qua `update-business-rules` (hoặc hỏi Dev nếu là regression) |
| 3 | Reference/KB nói có, staging không thấy | § 2.17: không có "Select all", panel "Estimate" toggle Monthly/Yearly, giá gạch, banner early-bird/trial — panel tên "Current subscription". KB `10-pricing-plans.md` mô tả theo DUOS-329 (Mar 2026). Có thể do store Free + Plus (SuggestedPlans không hiện cho Plus — KB-002) | — | sửa KB 10; hỏi Dev toggle Monthly/Yearly còn không |
| 4 | Copy UI lệch mô hình giá | § 2.2, 2.3, 2.7: alert "…please upgrade to the **Premium plan**" — mô hình hiện tại là modular (không có "Premium plan") | — | hỏi PO/Dev sửa copy (Minor) |
| 5 | Hệ thống làm khác business rule (cần xác minh thêm) | Store Free plan, 8 extension `Inactive`: row ở List extensions vẫn mở được + alert "you can set up and save extension"; switch ở Notifications **không mang thuộc tính disabled**; tab Translations không disabled (§ 2.2, 2.15, 2.16). Chưa bấm switch để thử | `business-rules/DUOS.md § "Extension chưa subscribe bị disable ở List extensions, Notifications, Translate"` | hỏi Dev: "disable" nghĩa là Inactive trên storefront hay khoá UI Portal? |
| 6 | Hệ thống làm khác business rule | § 2.15 editor template: vẫn có field **"Reply to email:"** riêng bên cạnh "Sender name:" / "Sender email:" — rule nói sender email merchant chuyển thành reply-to và **bỏ field "reply to" riêng** | `business-rules/DUOS.md § "Sender email của merchant chuyển thành reply-to"` | hỏi Dev/PO — UI chưa cập nhật hay rule sai |
| 7 | KB sai tên UI | § 2.15 B2B submission: Admin = "**New submission notification**" ("Send internal notification email when receiving new B2B submissions."), Customer = "B2B account created" ("Send email to customer when their B2B submission is approved.") — cả hai chỉ có "Read instruction" + "Open Shopify Flow" (không switch/template trong app). KB `09-notifications.md` ghi "New B2B submission" + text DUOS-171 | — | sửa KB 09 |
| 8 | KB sai tên UI | § 2.15 Members & permissions: "**Member added to location**", "**Member role updated**" (KB/DUOS-309 ghi "Members added to location", "Members' role updated") | — | sửa KB 09 |
| 9 | Nghi lỗi nội dung | § 2.15 template "Credit limit assigned to a company location": footer mẫu "You received this email because you submitted a quote request to {shop_name}" — sai ngữ cảnh credit | — | hỏi Dev (Minor) |
| 10 | Hệ thống làm khác business rule (label) | § 2.8 modal "Create custom role": select tên **"Select based role"** (rule: "Select base role to duplicate"); có thêm "Description" (optional) và nút "Next" (2 bước). Accessible name dialog = "535" | `business-rules/DUOS.md § "Trang "Roles & permissions": default role chỉ xem, custom role tạo từ base role và publish theo company"` | sửa label trong rule; log a11y Minor |
| 11 | Hệ thống làm khác business rule | § 2.8 nhóm permission thật: Order history · Shipping and billing · **Finance & credit** · User management · **Role management** · Shopping list · **CSV upload** · **Quick order** · **Quotes** · Purchase from online store. Rule liệt kê "Quick order CSV", "Quick order SKU", thiếu Finance & credit / Role management / Quotes (ghi chú rule: chưa đối chiếu trang mới) | `business-rules/DUOS.md § "Permission của Admin cố định; Order history + Shipping and billing luôn disabled"` | chạy `update-business-rules` với danh sách nhóm theo § 2.8 |
| 12 | Reference nói khác hệ thống | § 2.8 Junior buyer: **không** có "Create order from CSV" / "Create order from SKU" / "Complete purchases from online store"; có "Create order from approved shopping list", "Submit shopping list for approval"; Quotes: "Create and edit quotations" ✓ nhưng "View quotations" —. `references/apps/DUOS.md` § 2 mục 1 ghi Junior "tạo Shopping List/order từ CSV & Bulk SKU" | `business-rules/DUOS.md § "3 default role Admin / Senior Buyer / Junior Buyer map sang Shopify contact role"` | sửa reference § 2; hỏi Dev tổ hợp Quotes của Junior (tạo được mà không xem được?) |
| 13 | Reference/KB lệch tên UI | § 2.7: h2 "**Users & permission**" (row hub "Users & permissions"); khối bulk là "Apply admin role to:" {Main contacts, Location admin} + "**Run bulk assign**", không có tiêu đề "Bulk assign admin role" như reference § 2 mục 1; default role hiển thị "Senior buyer" / "Junior buyer" (chữ thường) | — | sửa reference § 2 + KB 01 |
| 14 | Không xác minh được | § 2.3: tab submission All / Pending / Approved / Failed (khớp rule status) nhưng store **không có submission** → không kiểm được có nút Reject hay chỉ bulk Delete | `business-rules/DUOS.md § "❓ Đang tranh chấp — Submission có Reject hay chỉ Delete"` | kiểm lại trên `staging-duos-ngant-3` (có submission) ở lần build sau |
| 15 | Không xác minh được | § 2.4: chỉ thấy "Enable reCAPTCHA" (tắt); site key / secret key không hiện khi tắt; h1 trang là "Spam protection" (nút vào là "Spam protection settings") | `business-rules/DUOS.md § ""Spam protection settings" — reCAPTCHA v3, không có ô min_score"` | không đổi rule; xác minh field khi có quyền bật thử |
| 16 | KB nói có, staging không thấy / khác | § 2.5: **không có nút "+ Add company"** và modal "Add credit limit"; bảng liệt kê sẵn mọi company Shopify; credit limit sửa **inline (spinbutton)** ở company detail; nút location là "**Download statement**" (KB: "Download statements"); company detail cột "Locations" (KB: "Location") | — | sửa KB 08; hỏi Dev flow gán credit hiện tại |
| 17 | Hệ thống làm khác business rule | § 2.18: Admin UI block ở trang location **không render gì**; console 404 `api/admin-extensions/company-locations/<id>` "No query results for model [App\Models\CompanyLocation]". Rule: location chưa có limit → "No credit limit has been assigned to this company yet." | `business-rules/DUOS.md § "Admin UI block trên trang Company / Location chỉ hiển thị"` | hỏi Dev: location chưa sync DB thì block lỗi im lặng — bug hay do store Free? |
| 18 | Reference nói có, Portal không có tab | § 2.9: tab Quote management = All / Unread / Read / Replied / Accepted / Rejected / Deal closed — **không có "Expired"** dù reference/BR có status `EXPIRED = 6` | `business-rules/DUOS.md § "Hạn quote `expires_at` lưu UTC"` | hỏi Dev quote hết hạn hiện ở tab nào |
| 19 | Reference nói có, staging không thấy | § 2.10: "Display button on which page:" chỉ {Product page, Cart page} — không có collection/catalog page (reference § 2 mục 3: "thêm từ product/catalog/cart page"; KB 05: "Add to quote from collection page" DUOS-263) | — | hỏi Dev DUOS-263 còn không; sửa reference |
| 20 | Hệ thống có, reference chưa nhắc | § 2.10: "Who will see this button:" có "Not logged-in users" (yêu cầu đăng ký B2B trong quote request); "Custom CSS selector" (Add to cart button selector, Form selector) | — | thêm vào `DUOS-quotation.md` § 2 |
| 21 | Reference lệch tên UI | § 2.11: Design dùng "Heading color" / "Text color" / "Background color" + "Header settings"/"Content settings" (reference: "màu Primary/Background/Text", "font Headings/Body"); trang **có** accordion "Translations" chứa nút "Go to translation" (reference: "Go to Translations", nói translation không nằm trong trang) | — | sửa `DUOS-quotation.md` § 2 |
| 22 | Nghi lỗi môi trường | § 2.11: 6× HTTP 403 tới Google Web Fonts API khi mở Quote PDF template — danh sách font có thể không tải | — | hỏi Dev (API key staging) |
| 23 | Hệ thống làm khác business rule (label) | § 2.12, 2.13, 2.14: label thật "**Action after customer's create order**" (rule: "Action after customer create order"); CSV/SKU có {Add to cart, Go to checkout, Create draft order}; **Shopping list không có "Create draft order"** | `business-rules/DUOS.md § ""Action after customer create order" có lựa chọn "Create draft order""` | sửa label trong rule; ghi rõ không áp cho Shopping list |
| 24 | Hệ thống có, reference chưa nhắc | § 2.13: "Show download catalog button", "Show bulk add SKU button" | — | thêm vào reference § 2 mục 4 |
| 25 | Hệ thống làm khác business rule (phạm vi) | § 2.14: checkbox re-approval tên "**Reset approved list to pending after order submission**", help "Applies to junior buyers and any role without shopping list approval permission." — rule không nêu giới hạn role | `business-rules/DUOS.md § "Re-approval: list Approved về Pending ngay khi order được submit"` | chạy `update-business-rules` bổ sung phạm vi role + label |
| 26 | Hệ thống có, reference chưa nhắc | § 2.14: "Save products to shopping list from" {Product page, Collection page}, "Allow customers to save cart as Shopping List", trang "Manage shopping lists" (company › location › "Number of shopping list"); không thấy setting reminder (KB 07 / DUOS-341) | — | thêm vào reference § 2 mục 4; hỏi Dev reminder bật ở đâu |
| 27 | KB sai tên UI | § 2.1: Setup guide bước 3 là "Explore all B2B extensions in Customer Account" (KB 12: "Add B2B quick order extensions to Customer Account"); card app embed chỉ có "Enable app", không thấy "Check status" | — | sửa KB 12 |
| 31 | Feature chưa có business rule | § 2.6 Finance & payment ("Which data to display:"), § 2.10 Quote widget settings, § 2.11 Quote PDF template, § 2.16 Content & Translation, § 2.1 Home | — | chạy `update-business-rules` khi có ticket chạm feature |
