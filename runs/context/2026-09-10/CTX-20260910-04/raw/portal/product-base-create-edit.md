# TASK-2 + TASK-3 — Create & Edit product base

`CTX-20260910-04` · staging · store `linh-explorer.myshopify.com` · sub 273 / user_id 266
Toàn bộ là **OBSERVED_CURRENT** 2026-09-10.

Fixture tạo trong run này: **product base `3203` — "QA - product base explore"** (giữ lại), bản sao **`3206` — "QA - product base explore copy"** (giữ lại), và `3202` "Example MUG" (đã archive rồi delete để lấy evidence lifecycle).

---

## 1. `/products/new` — New product

### Field

| Thứ tự | Label | Kiểu | Giá trị mặc định | Map sang field API |
| --- | --- | --- | --- | --- |
| 1 | `Product title` | text | **pre-fill sẵn giá trị thật `Example MUG`** (không phải placeholder) | `title` |
| 2 | `Internal name (optional)` | text | rỗng | `label` |
| 3 | `Internal tags (optional)` | text | rỗng | `internal_tags` |
| 4 | `Fulfillment provider` ⓘ | vue-multiselect, 32 option | chưa chọn, placeholder `Pick one fulfillment` | `fulfillment_id` |
| 5 | `Fulfillment catalog ID` ⓘ | text | rỗng | `fulfillment_linked_id` |
| 6 | `Description` ⓘ | rich text (TipTap) | rỗng | `description` (lưu HTML) |

Nút cuối form: `Advanced options` (**disabled**) · `Save`.

### Tooltip nguyên văn

| Field | Tooltip |
| --- | --- |
| Fulfillment provider | `Leave this field blank for "Others" provider` |
| Fulfillment catalog ID | `For imported product we do not allow to change this ID` |
| Description | `Leave it empty to use the Shopify default description. If campaign contains more than 1 product, should edit product description in teeinblue.` |

### Quan sát riêng

- **`Product title` pre-fill giá trị thật `Example MUG`.** Bấm Save mà không sửa gì → tạo được product base tên "Example MUG" (`ACT-02-01-001`, tạo ra id 3202).
- Sau khi chọn provider, **không có nút X để bỏ chọn** — không quay lại trạng thái "Others" (blank) từ UI form này được.
- `Advanced options` **disabled kể cả sau khi đã chọn provider** trên `/products/new`.
- **Không field nào có dấu bắt buộc** (`*`/`required`) trong DOM.

### Validation quan sát được

`ACT-02-02-001` — xoá sạch `Product title` (bàn phím) rồi Save, lặp **4 lần**, kết quả giống nhau:

```
POST /api/products   →  422
{"message":"Product title is required.","errors":{"title":["Product title is required."]}}
```

UI: toast góc phải trên, nội dung nguyên văn hai dòng:

```
Error
Product title is required.
```

Toast tự tắt nhanh (bắt được bằng MutationObserver, screenshot không kịp). **Không có inline error, không có highlight field.** Portal **không chặn ở client** — vẫn gửi request rồi hiển thị message của server.

> `required` của `title` mới chỉ thấy qua **một loại input** (chuỗi rỗng). Chưa thử whitespace-only, chuỗi rất dài, ký tự đặc biệt → `confidence: LOW`, xem `unknowns`.

### Tạo thành công (`ACT-02-03-001`)

```json
POST /api/products
{"title":"QA - product base explore","label":"QA PB Explore internal",
 "internal_tags":"qa-explore",
 "description":"<p>QA fixture product base for CTX-20260910-04 exploration.</p>",
 "design_format":null}
→ 201
{"user_id":266,"title":"...","label":"...","internal_tags":"qa-explore","description":"...",
 "design_format":null,"had_back":false,"enable_custom_printarea":false,
 "color_display_type":"radio","size_display_type":"radio","status":0,"id":3203}
```

Server tự set: `status = 0`, `had_back = false`, `enable_custom_printarea = false`, `color_display_type = size_display_type = "radio"`.
Khi bỏ trống `Internal name`, server set `label = title` (thấy ở 3202).
Sau khi tạo → redirect `/products/:id/edit` và hiện wizard onboarding `Step 1/3 Upload Mockup … Skip / Next` (ghi state qua `PUT /api/user/guide-config`).

---

## 2. `/products/:id/edit` — 4 section

Header: `Edit product` + nút `Logs`. Với product base đã được campaign dùng, header có thêm nút `Update campaign`.

### 2.1 Basic information

Giống form New, **thêm** `Thumbnail (optional)` (upload, nằm giữa Internal tags và Fulfillment provider).

Tooltip Thumbnail — **hai tooltip lồng nhau**:
- trên label: `Not work with SDK v2`
- trên icon ⓘ: `Maximum size of category thumbnail: 250x250 (in pixels)`

Nút `Save` của section **disabled cho tới khi có thay đổi**.

`ACT-03-01-001` — sửa `Internal tags` rồi Save:

```json
PUT /api/products/3203  → 200
{"title":"QA - product base explore","label":"QA PB Explore internal",
 "internal_tags":"qa-explore, ctx-20260910-04","fulfillment_id":null,
 "fulfillment_linked_id":null,"description":"<p>...</p>",
 "default_options":null,"design_format":null}
```

→ **Save gửi lại toàn bộ 8 field (full replace), không phải patch.** Khác hẳn Printareas/Variants (đi Hasura, chỉ gửi field đổi).

#### `Advanced options`

| Product base | Trạng thái nút |
| --- | --- |
| `3203` (tự tạo, `fulfillment_id = null`, `is_imported = false`) | **disabled** — không có tooltip, không có lý do hiển thị |
| `3181` (`Printify`, `is_imported = true`, catalog ID 492) | **enabled** |

Mở ra trên 3181: khối inline **`Required options (for merchOne, Printify, Printful, Myze and Printbelle)`** — editor JSON (1 dòng, giá trị `null`), map tới `products.default_options`.

→ Điều kiện enable là **INFERRED** (nhiều biến cùng khác nhau giữa 2 product base). Xem `unknowns`.

#### Field bị khoá trên product imported

`Fulfillment catalog ID` của 3181 có `disabled = true`, giá trị `492` — khớp tooltip *"For imported product we do not allow to change this ID"*.

### 2.2 Mockup

Nút: `Upload` · `Assign mockups` · nút refresh cạnh heading · nút `…`.

`ACT-06-01-001` — upload `test-data/mockups/poster.jpg` (1024×768, 17 217 bytes). Luồng **3 bước + 1 bước gán**:

1. `POST /api/users/266/temporary-files/upload-url` — `{"filename":"poster.jpg","filesize":17217,"mimetype":"image/jpeg"}` → 201, trả presigned URL
2. `PUT https://oe-cdn.sgp1.digitaloceanspaces.com/teeinblue-staging/temporary-files/2026-09-10/<file>.jpg?X-Amz-Signature=…` → 200 — **upload thẳng lên DigitalOcean Spaces, không qua backend teeinblue**
3. `POST /api/mockup-layers/by-temporary-file` — `{"temporary_file_id":"…","name":"poster","category_id":null}` → 201 (`name` = tên file bỏ đuôi)
4. `POST /api/products/3203/mockups` — `{"mockup_layer_ids":[4487]}` → 204

Media library modal: category bên trái (`All` / `TIB Mockups` / `+ New category`), dropzone `Drag and drop, or click to upload!`, cảnh báo `Do not close this page while uploading.` + `Use the Reload button below after image uploaded.`, nút `Reload`, `Move to category`, `Select N images`.
File input dropzone: `accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/webp"`, `multiple`.
Danh sách mockup layer phân trang **offset** `?page=1&per_page=20&sort=created_at&sort_type=desc`.

Sau khi gán, card mockup hiện trạng thái **`Rendering`** (preview đang sinh), kèm checkbox + `Edit` / `Duplicate mockup` / `More` / drag handle `Move`.

Modal `Assign mockups`: *"Select variants and mockups that should be shown together."* — hai cột `Select variants` (có `Select all`) và `Select mockups` (có `Select all`), `Cancel` / `Save`.

### 2.3 Printareas

Header: heading `Printareas`, link help → `https://support.teeinblue.com/en/article/printarea-of-product-base-1lf9m49`, nút `New printarea`. Với 3181 (Printify) có thêm nút **`Import from Printify`**.

Form thêm mới **mặc định collapse** (`height: 0`, `overflow: hidden`) — phải bấm `New printarea` mới mở. Giá trị mặc định: `Fulfilled key = "Front"`, `Display name` rỗng, `Width = 1400`, `Height = 1400` (2 ô này `type=number`).

Tooltip cột:

| Cột | Tooltip |
| --- | --- |
| `TIB` | `Printarea ID in Teeinblue system. Useful for support team.` |
| `Fulfilled key` | `The name of printarea that will be used when fulfilling orders. Must match the required name from print provider.` |
| `Display name` | `The name of printarea used internally in Teeinblue. Name it as you like but keep it short.` |

#### Hành vi quan sát được

| ACT | Việc làm | Kết quả |
| --- | --- | --- |
| `ACT-04-01-001` | Save form mặc định, để trống Display name | Tạo printarea `13959`. Payload **không có `display_name`** → DB `display_name = null`, bảng hiển thị fallback bằng `name` |
| `ACT-04-01-002` | Tạo printarea thứ 2 **trùng `Fulfilled key = "Front"`** | **Được chấp nhận**, tạo `13960`, không lỗi không cảnh báo. `position` tự tăng 1 → 2 |
| `ACT-04-02-001` | Click ô `Fulfilled key` để sửa | Hiện dialog `Warning` với nội dung là **i18n key chưa dịch: `product.printareas.edit_warning`**, nút `Got it` / `Do not show again`. Dialog hiện **mỗi lần** click sửa, không chỉ lần đầu |
| `ACT-04-02-002` | Đổi `Front` → `Back` | OK, `mutation update` chỉ gửi `{name: "Back"}` |
| `ACT-04-02-003` | Nhập chữ `abc` vào `Width` | Xem dưới |
| `ACT-04-02-004` | Đổi `Width` 1400 → 3000 | OK. Width gửi lên dạng **string** `"3000"` kèm `updated_at` do client tự set |
| `ACT-04-03-001` | Bấm `×` xoá printarea 13960 | **Xoá ngay, KHÔNG hỏi xác nhận** |

#### `ACT-04-02-003` — lỗi Postgres lọt ra UI (silent)

Ô Width trong inline editor là `type=text` (khác `type=number` của form thêm mới) → không chặn chữ ở client.

```
POST /v1/graphql   → HTTP 200
request : {"objects":{"width":"abc","updated_at":"2026-09-10 11:44:21"},"id":13960}
response: {"errors":[{"extensions":{"code":"data-exception","path":"$"},
                      "message":"invalid input syntax for type integer: \"abc\""}]}
```

UI: **không toast, không inline error, không đổi giá trị hiển thị, editor vẫn mở**. Dấu vết duy nhất là console `ApolloError: invalid input syntax for type integer: "abc"`. Lặp 2 lần, giống nhau.

Kèm theo: `POST /api/staff-activity-logs/printarea` với `{"width":"abc",…,"action":"update"}` vẫn trả **201** dù mutation thất bại → log được ghi lạc quan trước khi biết kết quả. Tuy vậy bản ghi `abc` **không xuất hiện** trong modal `Logs`.

#### Đường ghi dữ liệu printarea không đồng nhất

| Thao tác | Endpoint |
| --- | --- |
| Thêm | `POST /v1/graphql` — `mutation insert_printareas` (Hasura) |
| Sửa | `POST /v1/graphql` — `mutation update_printareas` (Hasura) |
| Xoá | `DELETE /api/printareas/:id` (REST, 204) |
| Ghi log | `POST /api/staff-activity-logs/printarea` (REST, 201) |

### 2.4 Variants

Toolbar: `⤒ Import` · `⤓ Export` · `Download template`.
Banner cảnh báo (đóng được bằng `×`):

```
DO NOT change the SKU of variants (for imported products).  It'll cause an error when sending orders to fulfill via Teeinblue.
DO NOT edit variants in Shopify admin.  All changes of variants must be done in this table below.
UPDATE CAMPAIGNS AFTER ANY CHANGES
```

Tooltip trên icon ⚠ cạnh heading `Variants`:

```
WARNING:
- DO NOT change the SKU of variants (for imported products), it'll cause an error when sending orders to fulfill.
- DO NOT change the variants in Shopify Products. All updates for variants must be done in Teeinblue.
```

Hàng dưới: `Delete selected` (disabled khi chưa chọn) · `Display settings` · toggle `Custom variant's printarea` ⓘ · `New variant`. Với 3181 có thêm nút **`Check stock`**.
Chú thích cuối bảng: `Hold Ctrl and click on row number to select and edit multiple variants`.

Cột bảng: `TIB Variant ID` · `Fulfilled SKU` (= `fulfillment_linked_id`) · `Color` · `Size` · `Color Hex` · `Weight` · `Price (USD)` · `Compared Price` · `Base cost` · `Available` · `Add to campaigns` · `Created at` · `Updated at`. Bật toggle custom printarea → chèn thêm cột `Custom Printareas` giữa `Base cost` và `Available`.

Mỗi cột có menu riêng: `Sort Ascending` · `Sort Descending` · ô filter · `Apply` · `Export Excel` · `Import Excel` · `Default` · `Back`.

#### Quick-add row

Mặc định collapse, mở bằng `New variant` (tooltip `Create new variant`). Ô: `SKU` · `Color` · `Size` · `#FFFFFF` (color picker) · `Weight` · `$ 0.00` · `$ Compare price` · `+ Add` · `Cancel`.

| ACT | Việc làm | Kết quả |
| --- | --- | --- |
| `ACT-05-01-001` | Bấm `Add` với tất cả ô trống | **Không gửi request nào.** Chặn ở client bằng cách tô **viền đỏ** (`border border-danger`) 4 ô: `SKU`, `Color`, `Size`, `Price`. **Không có text message, không có toast.** `Color Hex`, `Weight`, `Compare price` không bị tô → không bắt buộc |
| `ACT-05-01-002` | Thêm `QA-SKU-BLACK-M / Black / M / #000000 / 250 / 19.99 / 29.99` | Tạo variant `88621` |
| `ACT-05-01-003` | Thêm variant **trùng SKU** | Chặn, toast nguyên văn: `The SKU "QA-SKU-BLACK-M" already exists.` |
| `ACT-05-01-004` | Thêm `QA-SKU-WHITE-L / White / L / #FFFFFF / 24.50`, bỏ trống Weight + Compare | Tạo variant `88622` |

Payload insert (`ACT-05-01-002`):

```json
mutation insert($objects: [variants_insert_input!]!)
{"product_id":3203,"fulfillment_linked_id":"QA-SKU-BLACK-M","color_hex":"#000000",
 "color":"Black","size":"M","weight":"250","price":19.99,"available":true,
 "compare_at_price":29.99}
```

- `available: true` do client tự set, không có control nào trong quick-add row.
- `weight` gửi dạng **string**; bỏ trống → gửi `""` chứ không phải `null`.
- Bỏ trống Compare price → field `compare_at_price` **không có trong payload**.
- Payload **không có** `base_cost` và `printarea_id`.
- Nhập `24.50` → gửi `24.5`, bảng hiển thị `24.5`.

**Cơ chế chặn trùng SKU** (`ACT-05-01-003`): portal tự pre-check bằng query trước khi insert —

```graphql
query getVariant($fulfillmentLinkedId: String!, $productId: bigint!) {
  variants(where: {fulfillment_linked_id: {_eq: $fulfillmentLinkedId},
                   product_id: {_eq: $productId}}, limit: 1) { id }
}
```

→ phạm vi unique là **(product_id, fulfillment_linked_id)**, không phải toàn store. Xác nhận thêm bởi `ACT-07-03-001`: bản sao 3206 giữ nguyên SKU của 3203.

#### `staff-activity-logs/variant` trả 404

Mọi lần thêm variant, portal gọi `POST /api/staff-activity-logs/variant` và nhận **404** (endpoint printarea tương ứng trả 201). Variant vẫn được tạo thành công, UI không báo gì, lỗi chỉ nằm trong console. Hệ quả quan sát được: modal `Logs` **không có** bất kỳ sự kiện variant nào.

#### `Display settings` (`ACT-05-02-001`)

Modal `Display variant option on store` — *"Change display and re-order options on storefront. Only apply on storefront, not on Variants table."*

- Khối `COLOR`: `Edit label`, `Display 'Color' options as:` **Radio button / Color Swatch / Dropdown list**, danh sách giá trị kéo thả (`Black`, `White`)
- Khối `SIZE`: `Edit label`, `Display 'Size' options as:` **Radio button / Dropdown list**, danh sách (`M`, `L`)
- `Save` / `Close`

**Toàn bộ 5 radio đều `disabled` và không radio nào `checked`**, trong khi record product có `color_display_type = "radio"` và `size_display_type = "radio"`. Chỉ `Edit label` dùng được.

Save gửi 5 field một lượt, **không có** `color_display_type` / `size_display_type`:

```json
mutation update($id: bigint!, $objects: products_set_input!)
{"id":3203,"objects":{"color_custom_label":"Colour","colors_position":["Black","White"],
 "size_custom_label":null,"sizes_position":["M","L"],
 "product_options_position":["color","size"]}}
```

Query nạp modal lộ 7 field cấu hình: `color_custom_label`, `color_display_type`, `colors_position`, `product_options_position`, `size_custom_label`, `size_display_type`, `sizes_position`.

#### Toggle `Custom variant's printarea` (`ACT-05-03-001`)

Tooltip nguyên văn:

```
If variants have different printarea size, enable this feature to connect each variant to a specific printarea in the "Connect custom printarea" column. Suitable for multi-size products (poster, canvas, mug,…)
Read more
```

Bật → `mutation update {enable_custom_printarea: true}`, **lưu ngay, không cần bấm Save nào**. Bảng mọc cột `Custom Printareas` (tooltip gọi cột này là *"Connect custom printarea"* — lệch tên).

Ô của cột hiển thị `No printareas` cho cả 2 variant **mặc dù product base có printarea `Front` (13959)**. Click / double-click / Enter đều không mở editor → xem `unexplored_areas`.

#### Import / Export / Download template

| Nút | Kết quả |
| --- | --- |
| `Download template` | tải `product-variants-sample.xlsx` |
| `Export` | tải `product-3203-variants.csv` |

Cột của **cả hai** file giống hệt nhau và **khác cột trên bảng**:

```
SKU, Color Hex, Color, Size, Weight, Base Cost, Price, Compare price, Available
```

Nội dung export thực tế:

```csv
"SKU","Color Hex","Color","Size","Weight","Base Cost","Price","Compare price","Available"
"QA-SKU-BLACK-M","#000000","Black","M","250","","19.99","29.99","Available"
"QA-SKU-WHITE-L","#FFFFFF","White","L","","","24.5","","Available"
```

File export **không có** `TIB Variant ID` và không có cột printarea → round-trip export→import không giữ được id variant hay liên kết printarea. (Chưa chạy Import — xem `unexplored_areas`.)

Template là `.xlsx`, export là `.csv`; input `Import` nhận `accept=".csv, .xls, .xlsx"`.

---

## 3. Modal `Logs`

Tiêu đề = tên product base. Filter `Status:` với đúng **4 loại**, tất cả đều về printarea:

`All status` · `Printarea added` · `Printarea removed` · `Printarea name changed` · `Printarea size changed`

Nội dung ghi được trên 3203:

```
2026-09-10 07:46:51  Printarea removed       Back (3000x1400) (ID: 13960)
2026-09-10 07:45:44  Printarea size changed  Changed width from "1400" to "3000" (ID: 13960)
2026-09-10 07:42:57  Printarea name changed  Changed name from "Front" to "Back" (ID: 13960)
2026-09-10 07:40:37  Printarea added         Front (1400x1400) (ID: 13960)
2026-09-10 07:39:10  Printarea added         Front (1400x1400) (ID: 13959)
```

→ Logs **không ghi**: sửa Basic information, thêm/sửa/xoá variant, upload/gán mockup, đổi Display settings, bật toggle custom printarea. Lần đổi width thành `abc` (07:44:21) cũng **không có** trong log dù request log trả 201.

---

## 4. Lifecycle của product base (từ list)

| ACT | Thao tác | Endpoint | Xác nhận trước khi làm? |
| --- | --- | --- | --- |
| `ACT-07-01-001` | `Mark as archive` (3202) | `POST /api/products/3202/archive` → 200, `status: 0 → 1` | **Không** |
| `ACT-07-02-001` | `Delete product` (3202, đã archive) | `GET /api/products/3202/deletion-check` → `{"policy":"allowed","reason":null,"token":null}`, rồi `DELETE /api/products/3202` → 204 | **Có** — dialog `Delete Product` / `Are you sure you want to delete product Example MUG?` / `Delete` · `Cancel` |
| `ACT-07-03-001` | `Duplicate product` (3203) | `POST /api/products/3203/clone` → 200 | **Không** |

Response của `archive` lộ thêm 2 cột chưa thấy ở nơi khác: `variants_position`, `print_provider_id`.

Response của `clone` trả về **record NGUỒN (id 3203)**, không trả id bản sao. Portal không điều hướng sang bản sao, chỉ refetch list.

Bản sao `3206` giữ:

| Chép sang bản sao | Không đổi |
| --- | --- |
| `title` + hậu tố ` copy` | `label`, `internal_tags` (không thêm " copy") |
| printarea (id mới 13963) | |
| variant (id mới 88624/88625, **SKU giữ nguyên**) | |
| mockup (id mới 7874) | |
| `enable_custom_printarea`, `color_custom_label`, `colors_position`, `sizes_position`, `product_options_position` | |
