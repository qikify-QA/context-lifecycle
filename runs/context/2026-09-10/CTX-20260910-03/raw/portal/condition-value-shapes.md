# TASK 1 — `dependencies[].value` lưu dạng gì cho MỖI loại layer nguồn

> **Evidence account:** `Linh explorer` · `linh-explorer.myshopify.com` · JWT `sub="273"`, `user_id=266`
> **Object:** artwork **4087** `QA - all layers v3`, staging (`staging-portal.teeinblue.com`)
> **Ngày:** 2026-09-10 · `knowledge_kind: OBSERVED_CURRENT` · `current_behavior_only: true`
> **Layer đích dùng để thu thập:** `word-search` = `layer-545421` (chưa từng làm nguồn của ai)

## 0. Cách lấy evidence

1. Mở editor bằng click TÊN artwork ở `/artworks` (URL `?id=4087` KHÔNG tự mở modal).
2. Layer `word-search` → `la-pen` → panel `CONDITIONAL SETTING`.
3. `+ Add conditions` **8 lần**, mỗi lần chọn option nguồn đầu tiên còn lại trong dropdown
   (nguồn đã dùng bị loại khỏi dropdown sau) → đúng thứ tự 8 type.
4. Chọn 1 giá trị thật cho từng condition.
5. `Save & Close` **một lần** → `POST /api/artworks/4087/validate-default-value` (204) rồi
   `PUT /api/artworks/4087` (200).
6. Đọc lại: `POST https://staging-graphql.teeinblue.com/v1/graphql`,
   `Authorization: Bearer JSON.parse(localStorage.teeinblue_token)[0].token`,
   body `{"query":"{ artworks(where:{id:{_eq:4087}}) { templates } }"}`.

Request body của PUT và JSON đọc lại từ GraphQL **giống hệt nhau** (không có transform server-side).

## 1. Bảng 8 loại nguồn

| # | layer type nguồn | layer id | kiểu `value` | ví dụ giá trị nguyên văn | ghi chú |
|---|---|---|---|---|---|
| 1 | `toggle` | `layer-919695` | **boolean scalar** (KHÔNG bọc array) | `true` | control là `<select>` `true\|On` / `false\|Off`; là type nguồn DUY NHẤT không dùng array |
| 2 | `additional-option` | `layer-485540` | **array of numeric ID** | `[41709]` | `41709` = `cliparts.id` của item "AO Alpha" trong category `additional_option` id 6009. Item loại này có `url = null` nên không có path để lưu |
| 3 | `addon-charge` | `layer-719170` | **array of string option-id (id nội bộ của layer)** | `["id-957711"]` | id nằm trong chính layer: `layer.options = [{"id":"id-957711","name":"Option 1"}, …]`. KHÔNG phải id DB, KHÔNG phải tên |
| 4 | `json-list` | `layer-985154` | **array of NAME (string)** | `["New York City"]` | lấy từ `source_url = https://cdn.teeinblue.com/examples/cities.json`; item có cả `id` (`"city_001"`) lẫn `name` → portal lưu **name**, khớp `option_template = "{{name}}"`. UI có thêm ô "Or paste a list of names, separated by commas" ⇒ nhất quán với việc lưu name |
| 5 | `font` | `layer-965490` | **array of file path (url)** | `["users/266/cliparts/6011/6aa28827aba1d.woff2"]` | path file `.woff2` của font trong category, KHÔNG phải font id (41712) và KHÔNG phải tên ("QA Renamed Baginda") |
| 6 | `vector-category` | `layer-182438` | **array of file path (url)** | `["users/266/cliparts/6007/6aa21f42408e9.svg"]` | path `.svg` |
| 7 | `clipart-category` | `layer-348502` | **array of file path (url)** | `["users/266/cliparts/5999/260910_0aO7HVqegEpV7kq2_large.webp"]` | path `.webp` (bản `_large`) |
| 8 | `group-clipart-categories` | `layer-817491` | **array of numeric category ID** | `[5993]` | `5993` = `clipart_categories.id` của category con **"Body"** dưới group 5992. Đây là **category id**, không phải clipart id, không phải path |

### Tóm tắt theo kiểu

- **boolean scalar**: `toggle` (1/8)
- **array of numeric DB id**: `additional-option` (`cliparts.id`), `group-clipart-categories` (`clipart_categories.id`) (2/8)
- **array of string id nội bộ layer**: `addon-charge` (1/8)
- **array of tên hiển thị**: `json-list` (1/8)
- **array of đường dẫn file**: `font`, `vector-category`, `clipart-category` (3/8)

⇒ **Không có quy tắc chung.** 4 shape khác nhau cho 8 type nguồn.

## 2. `element` có LUÔN là layer id không?

**Có — trong toàn bộ 8 sample quan sát được, `element` luôn là `id` của layer nguồn**
(`"layer-919695"`, `"layer-485540"`, … dạng `layer-<6 chữ số>`), không bao giờ là option id,
clipart id hay tên.

Xác nhận thêm bằng 2 layer khác đã có `dependency` trên artwork này (`paragraph`, `clipart-category`)
— cũng chỉ chứa layer id.

**Chưa quan sát được trường hợp `element` KHÁC layer id.** Không có UI nào cho phép chọn nguồn
không phải layer (dropdown "Option:" chỉ liệt kê layer). Global Option gán vào layer vẫn hiển thị
dưới dạng layer trong dropdown → vẫn ra layer id. → `INFERRED` rằng `element` luôn là layer id;
để `CONFIRMED_EXPECTED` cần dev/spec.

## 3. JSON nguyên văn — `layer-545421` (`word-search`) sau `Save & Close`

```json
{
  "match_type": "all",
  "dependencies": [
    { "value": true,                                                              "element": "layer-919695" },
    { "value": [41709],                                                           "element": "layer-485540" },
    { "value": ["id-957711"],                                                     "element": "layer-719170" },
    { "value": ["New York City"],                                                 "element": "layer-985154" },
    { "value": ["users/266/cliparts/6011/6aa28827aba1d.woff2"],                   "element": "layer-965490" },
    { "value": ["users/266/cliparts/6007/6aa21f42408e9.svg"],                     "element": "layer-182438" },
    { "value": ["users/266/cliparts/5999/260910_0aO7HVqegEpV7kq2_large.webp"],    "element": "layer-348502" },
    { "value": [5993],                                                            "element": "layer-817491" }
  ],
  "show_by_default": false
}
```

(nguyên văn, chỉ căn lề lại cho dễ đọc; bản raw: `raw/portal/final-state-4087.json`,
request body PUT: `raw/network/_raw-ACT-01-02-002-put-request-body.json`)

Mỗi phần tử `dependencies[]` chỉ có **2 key**: `element` + `value`. **Không có key toán tử** —
toán tử (`is any of` hay so-sánh-bằng của toggle) là hàm của type layer nguồn, không lưu trong JSON.

## 4. Data đã phải tự tạo để chọn được giá trị

| Nguồn | Trạng thái trước | Việc đã làm | Kết quả |
|---|---|---|---|
| `additional-option` | layer chưa gán category; category `QA AddOpt Cat` (id **6009**) tồn tại nhưng **0 item** | (a) trong editor: `Select additional options category` → chọn `QA AddOpt Cat`, Save & Close; (b) `/additional-options?id=6009` → `Add new` 2 lần | tạo `cliparts` **41709 "AO Alpha"**, **41710 "AO Beta"** (`url = null`) |
| `font` | layer trỏ category `QA v3 Font Cat` (id **6011**) nhưng category **0 font**; 2 font category cũ (5997/5998) đã bị **soft-delete** (`deleted_at` ≠ null) nên không hiện trong treeselect | `/font-categories?id=6011` → `Add new` → chọn từ thư viện font đã upload | thêm `cliparts` **41712 "QA Renamed Baginda"**, **41713 "Bebas Neue"** vào 6011 |
| `addon-charge` | **đã có sẵn** `options: [{"id":"id-957711","name":"Option 1"},{"id":"id-113051","name":"Option 2"}]` | không cần tạo | — |
| `json-list` | **đã có sẵn** `source_url = https://cdn.teeinblue.com/examples/cities.json` (fetch trả 200, item có `id`+`name`) | không cần tạo | — |
| `vector-category` | category 6007 `QA Vector Cat`, 3 vector | không cần tạo | — |
| `clipart-category` | category 5999 `QA Clipart Cat`, 5 clipart | không cần tạo | — |
| `group-clipart-categories` | group 5992, category con: `Body`(3 clipart), `Hair`(0, có con `Black` 10 / `Red` 10) | không cần tạo | dropdown chỉ liệt kê **category con cấp 1**: `Body`, `Hair` |
| `toggle` | boolean, không cần data | — | — |

> Ghi chú: mô tả cũ trong `CTX-20260910-02` ("`addon-charge` chưa có option values", "`json-list`
> chưa có JSON URL") **không còn đúng** với state hiện tại của artwork 4087.

## 5. Chi tiết UI quan sát được khi chọn giá trị

| Nguồn | Control giá trị | Giá trị mặc định khi vừa chọn nguồn |
|---|---|---|
| `toggle` | `<select id="toggle">` — single value, không có toán tử | **rỗng** (`value=""`) → phải chọn tay |
| `additional-option` | `vue-multiselect` multi + `Select all` | rỗng |
| `addon-charge` | `vue-multiselect` multi + `Select all` + placeholder `Select options` | rỗng |
| `json-list` | `vue-multiselect` multi + `Select all` + `Select item names` + ô paste theo dấu phẩy + nút `Add` | rỗng |
| `font` | `vue-multiselect` multi + `Select all` | rỗng |
| `vector-category` | grid checkbox-image `#field__dependency_value_clipart_<n>` | **vector đầu tiên tự tick sẵn** |
| `clipart-category` | grid checkbox-image `#field__dependency_value_clipart_<n>` | **clipart đầu tiên tự tick sẵn** |
| `group-clipart-categories` | `vue-multiselect` multi + `Select all` + placeholder `Select categories` | rỗng |

`id` của checkbox trong 2 grid nhúng luôn đường dẫn file:
`dependency_value_clipart_6-users/266/cliparts/5999/260910_0aO7HVqegEpV7kq2_large.webp`
→ khớp với việc `value` lưu path.

## 6. Sau reload (`Cancel` → mở lại artwork)

8 condition giữ nguyên, đúng nguồn, đúng giá trị:
`Add gift box(On)` · `AO Alpha` · `Option 1` · `New York City` · `QA Renamed Baginda` ·
vector[0] checked · clipart[0] checked · `Body`.
Evidence: `shots/ACT-01-02-003-after-reload-8-conditions.png`.

## 7. NOT_VERIFIED

- **Multi-value shape**: mỗi condition chỉ chọn **1 giá trị** (trừ `clipart-category` trong sample cũ
  của `paragraph` có 2 path). Chưa xác nhận với `additional-option` / `addon-charge` / `json-list` /
  `font` / `group-clipart-categories` rằng chọn nhiều giá trị sẽ ra array nhiều phần tử — hợp lý
  nhưng **chưa quan sát**.
- **`toggle` với `false`**: chỉ test `true`. Chưa xác nhận `false` lưu thành `false` (boolean) hay `"false"` (string).
- Ý nghĩa runtime của từng shape trên storefront (khớp bằng path? bằng id?) — ngoài scope portal.
- Có giới hạn số condition tối đa hay không — mới test tới 8 (hết nguồn khả dụng).
- `element` có bao giờ khác layer id không — không có UI để tạo trường hợp đó (§2).
