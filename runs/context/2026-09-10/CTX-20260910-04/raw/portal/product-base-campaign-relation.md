# TASK-4 — Quan hệ product base ↔ campaign ↔ artwork

`CTX-20260910-04` · staging · store `linh-explorer.myshopify.com` · **OBSERVED_CURRENT** 2026-09-10.

Chỉ ghi cái quan sát trực tiếp. Phần nào chưa chạy được thì nằm ở `unexplored_areas` / `skipped_actions`, không suy diễn.

## Dữ liệu trong store lúc explore

| Object | Trạng thái |
| --- | --- |
| Campaign `2592` — `[Sample campaign] Woman and Dog Clipart - Poster` | Unpublished, type `Customizer`, internal tag `Sample Campaigns` |
| Product base `3181` — `Vertical Framed Poster` | `is_imported = true`, Printify, catalog ID 492, cột `Used = 1` |
| Product base `3203` / `3206` (fixture của run này) | `campaign_products = []` |

## Product base được chọn ở đâu khi tạo campaign

`/campaigns/new` **không** có chỗ chọn product base — form chỉ có `Campaign title` + `Internal tags (optional)` + `Save`. Breadcrumb của trang là `Campaign by Product Bases`.

Việc gắn product base diễn ra ở **`/campaigns/:id/edit`**:

- Khối `Available Products:` liệt kê các product base đã gắn (ở campaign 2592: `Vertical Framed Poster`), có drag handle để đổi thứ tự.
- Nút `Add more product` mở modal **`Select your product`**.
- URL của trang edit mang product base đang xem: `/campaigns/2592/edit?product-id=3181`.
- Khi chưa gắn product base nào, panel preview hiện: `Add a product base in STEP 1: ADD PRODUCTS & ARTWORKS to preview here.`

Sidebar `Campaigns` có 2 mục con: **`by Product Base`** và **`by Shopify Products`** — hai loại campaign khác nhau; product base chỉ liên quan loại thứ nhất.
Trang `/campaigns` có chú thích: `This campaign type uses Product Bases to create a new Shopify product.  Learn more`.

### Modal `Select your product`

- Bộ lọc: ô `Search`, `Internal name: Any`, `Internal tags: Any`
- Mỗi card: ảnh mockup, **title** (đậm), **internal name**, tên fulfillment (in nghiêng)
- Product base đã gắn hiện nhãn **`✓ Added`**
- Phân trang `‹ ›`

**Không có điều kiện lọc bỏ product base "chưa sẵn sàng"**: cả `3203` (không fulfillment provider) lẫn `3202` (lúc đó chưa có mockup / printarea / variant nào) đều xuất hiện và chọn được.

## Ràng buộc khi product base đã được campaign dùng

### Xoá — bị chặn ở server, có endpoint kiểm tra riêng

Luồng xoá product base gọi `GET /api/products/:id/deletion-check` trước khi `DELETE`.

| Product base | Kết quả deletion-check |
| --- | --- |
| `3202` (không campaign nào dùng) | `{"policy":"allowed","reason":null,"token":null}` |
| `3181` (1 campaign dùng) | `{"policy":"blocked","reason":"IN_CAMPAIGNS","token":null}` |

Kết quả của `3181` lấy bằng **probe read-only** (`fetch` GET trong trang, dùng chính session đang đăng nhập) — evidence `raw/network/OBS-deletion-check-3181.json`. **Không** bấm `Delete product` trên 3181 vì nằm trong `forbidden_actions`.

→ **Chưa quan sát được portal hiển thị gì khi gặp `policy: blocked`** (toast? dialog? nội dung ra sao?). Xem `unknowns`.

Shape response có sẵn field `token` (null ở cả 2 trường hợp) → có thể tồn tại luồng xoá cần token xác nhận. Chưa quan sát được.

### Sửa — KHÔNG bị chặn, chỉ có cảnh báo bằng chữ

Trên product base `3181` (đang được campaign dùng), mọi control sửa vẫn mở bình thường: Basic information sửa được, printarea sửa/xoá được, variant thêm được. Cơ chế cảnh báo quan sát được chỉ gồm:

1. Banner trong section Variants: `UPDATE CAMPAIGNS AFTER ANY CHANGES`
2. Dialog khi sửa printarea: title `Warning`, nội dung là **i18n key chưa dịch `product.printareas.edit_warning`** — nghĩa là đúng chỗ đáng lẽ giải thích rủi ro sửa printarea của product base đang dùng thì người dùng chỉ thấy một chuỗi kỹ thuật
3. Nút `Update campaign` xuất hiện thêm ở header trang edit **và** ở cột Action của dòng trong `/products` (icon 🚀, tooltip `Update campaign`) — chỉ với product base đã được campaign dùng

Không thấy dialog nào chặn, không thấy field nào bị disable **vì lý do đang-được-campaign-dùng**. (Field `Fulfillment catalog ID` bị disable trên 3181 là do `is_imported`, theo tooltip, không phải do campaign.)

### Nguồn dữ liệu "đang được dùng"

Query nạp trang edit và list đều kéo:

```graphql
campaign_products {
  id
  campaign { id status campaign_instances(where: {instance: {deleted_at: {_is_null: true}}}) { id need_sync } }
}
campaign_products_aggregate { aggregate { count } }
```

`campaign_instances.need_sync` là cờ điều khiển nút `Update campaign`; cột `Used` trên list là `campaign_products_aggregate.aggregate.count`.

## Artwork

Trong run này **không** quan sát được liên kết trực tiếp product base ↔ artwork ở bất kỳ surface nào của `/products`:

- Trang `/products/:id/edit` không có section artwork
- Modal `Select your product` không nhắc artwork
- Chuỗi duy nhất nối 2 khái niệm là câu trong campaign editor: `Add a product base in STEP 1: ADD PRODUCTS & ARTWORKS to preview here.` → gợi ý product base và artwork gặp nhau **trong campaign**, không phải trên product base

Chưa đi vào STEP 1 của campaign editor → xem `unexplored_areas`.
