# TASK-1 — UI inventory trang `/products` (Product Bases)

`CTX-20260910-04` · env staging · store `linh-explorer.myshopify.com` · account `Linh explorer` (sub 273 / user_id 266) · plan Blue (Test)
Toàn bộ nội dung dưới đây là **OBSERVED_CURRENT** tại 2026-09-10, không phải requirement.

## Định danh trang

| | |
| --- | --- |
| Route | `/products` |
| Sidebar | **Product Base** (nhóm gốc, không nằm trong submenu Campaigns) |
| Breadcrumb | `Home / Products` |
| Heading | `Product Bases` |

> Lệch tên: sidebar và heading gọi là **Product Base(s)**, breadcrumb và route gọi là **Products**.

## Header actions

| Control | Kiểu | Đích |
| --- | --- | --- |
| `+ Add Manual` | link | `/products/new` |
| `⤓ Import product` | button | mở modal *Import products from API-integrated Fulfillment* |

## Tab

`Active` (mặc định) · `Archived`

Khác biệt là điều kiện `products.status` trong query:

- Active → `where: {status: {_neq: "1"}}`
- Archived → `where: {status: {_eq: "1"}}`

## Bộ lọc

| Filter | Kiểu control | Giá trị quan sát được |
| --- | --- | --- |
| Search | textbox `Search`, khi có giá trị biến thành chip có nút `×` | lọc `title` bằng `_ilike "%...%"` |
| `Fulfillment` | radio 1 lựa chọn + `Clear` | 16 provider: PosterFlow · YenNH test std API · Partner print · Myze · Printbelle · MarketPrint · Shirtee · Merchize · Gelato · Printway · Printful · Printify · Dreamship · merchOne · Customcat · Shineon |
| `Internal name` | textbox `Find Internal name` | không có danh sách option sẵn |
| `Internal tags` | textbox `Find Internal tags` | không có danh sách option sẵn |
| `Usage` | radio + `Clear` | `Used` · `Unused` |

**Search chỉ khớp `title`** — xem `ACT-01-01-001`: gõ đúng nguyên văn Internal name (`QA PB Explore internal`) trả về `No data matched`.

## Ba danh sách provider KHÁC NHAU trong cùng một tính năng

| Nơi | Số provider | Ý nghĩa quan sát được |
| --- | --- | --- |
| Filter `Fulfillment` ở `/products` | 16 | có `Myze` |
| Modal `Import product` | 15 | **không** có `Myze` |
| Dropdown `Fulfillment provider` ở `/products/new` | 32 | thêm mkt csv 1/2, Hoplix, TeeAllOver, Prodigi, Gooten, Yoycol, Printeers, Teezily, Two Fifteen, Interest Print, Artsadd, My Shirts, Zootop Bear, Gearment, teelaunch |

## Chế độ hiển thị

Hai nút toggle bên phải hàng filter:

| Nút | Tooltip | Ghi chú |
| --- | --- | --- |
| `☰` | *(list — mặc định, đang active)* | render bảng |
| `▦` | `View as grid` | render card |

**Khác biệt giữa 2 chế độ**: grid hiển thị dòng `Showing 1 to 1 of 1 entries`; list **không** có dòng tổng số này, chỉ có `‹ ›`. Chế độ hiển thị không đi vào URL.

## Cột của bảng (list view)

| Cột hiển thị | Field GraphQL |
| --- | --- |
| MOCKUP | `mockups(limit: 2, order_by: {position: asc}) { preview_thumbnail thumbnail }` |
| TITLE / INTERNAL | `title` (link tới `/products/:id/edit`) + `label` |
| INTERNAL TAGS | `internal_tags` |
| FULFILLMENT | `fulfillment.display_name` |
| IMPORTED | `is_imported` (render nguyên văn `true`; product base tạo tay hiện **rỗng**, không phải `false`) |
| USED | `campaign_products_aggregate.aggregate.count` (product base chưa dùng hiện **rỗng**, không phải `0`) |
| CREATED AT | `created_at` |
| ACTION | — |

**Không cột nào sort được.** `cursor: auto` trên mọi `th`, không có icon sort. Thứ tự cố định `order_by: {id: desc}`.

## Row action

| Icon | Tooltip / nhãn | Hành vi quan sát được |
| --- | --- | --- |
| 🚀 `la-rocket` | `Update campaign` | **chưa chạy** — xem `skipped_actions` |
| ✏️ `la-pencil` | `Edit product` | link `/products/:id/edit` |
| ⧉ `la-copy` | `Duplicate product` | `ACT-07-03-001` — clone ngay, **không hỏi xác nhận** |
| `…` `la-ellipsis-h` | menu | xem dưới |

Menu `…` ở tab **Active**: `Mark as archive` · `Delete product` · `Import to Translation`
Menu `…` ở tab **Archived**: `Unarchive` · `Delete product` · `Import to Translation`

Không có checkbox chọn dòng → **không có bulk action** trên list này.

## Empty state — hai chuỗi khác nhau

| Tình huống | Chuỗi hiển thị |
| --- | --- |
| Tab Archived không có bản ghi | `Empty data` |
| Search/filter không khớp | `No data matched` |

## Phân trang

- Cơ chế **cursor** (`products_connection(first: $limit, ...)`, `pageInfo { hasNextPage hasPreviousPage startCursor endCursor }`), chỉ có `‹ ›`.
- `Show entries` select **bind đúng** (`value="20"` selected), option `20 / 50 / 100 / 250 / 500`.
- Khi chỉ có 1 trang: cả `‹` và `›` đều mang class `disabled`.

### Khác biệt so với ghi chú Pagination chung trong `knowledge/portal-pages.md`

`portal-pages.md` ghi *"trạng thái phân trang không nằm trong URL … URL đứng yên khi sang trang"* và xếp `/products` vào nhóm cursor.

**Quan sát 2026-09-10: `/products` CÓ đồng bộ state vào URL.** Đổi tab / gõ search / đổi page size đều ghi query string:

```
/products?tab=archived&limit=20&title=&cursor=&gridstate=1789039415661
/products?limit=20&title=QA+PB+Explore+internal&cursor=&gridstate=1789041849511
```

`cursor=` có mặt trong URL (rỗng ở trang 1). Cơ chế cursor vẫn giữ nguyên, nhưng nhận định "URL đứng yên" **không còn đúng với `/products`**. Chưa kiểm lại các trang khác trong run này → giữ cả hai nguồn, để reviewer xử lý.

## Modal `Import product`

- Tiêu đề: `Import products from API-integrated Fulfillment`
- Cột trái `Select a provider:` — 15 provider (thiếu `Myze` so với filter)
- Panel phải: logo provider, `View details`, link `Connect API` → `/fulfillments`
- Danh sách catalog: ô `Search`, mỗi item có ảnh + tên + nút `Import`
- Nguồn dữ liệu: `GET /api/fulfillments/37/catalogs?page=1&per_page=20` (fulfillment 37 = Merchize) — phân trang **offset** `page/per_page`, khác cursor của list chính
- `Showing 1 to 20 of 241 entries`; select page size **không bind** (`value=""` khi đọc lần đầu, sau đó `"20"`)
