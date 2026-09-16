# TASK 1 — Artwork chứa đủ 35 layer type, save thành công

> **Evidence account:** `Linh explorer` · store `linh-explorer.myshopify.com` · plan Blue (Test)
> Verify: JWT `sub = "273"`, `user_id = 266`; sidebar hiển thị *Linh explorer / linh-explorer.myshopify.com / Blue (Test)*.
> Screenshot: `shots/VERIFY-account-linh-explorer.png`
> Environment: `https://staging-portal.teeinblue.com` (staging). Mọi số liệu dưới đây là `OBSERVED_CURRENT` ngày 2026-09-10.

## 1. Artwork

| Field | Value |
|---|---|
| **Artwork ID** | **4087** |
| Name | `QA - all layers v3` |
| Size | 1600 x 1600 |
| `design_format` | `rgb` (UI: PNG_RGB) |
| `updated_at` | `2026-09-10T08:44:39` |
| `current_version_id` | `null` |
| Template | 1 template (`Default template`), `templates[0].layers.length = 35` |
| Readback | GraphQL `{ artworks(where:{id:{_eq:4087}}) { id name templates } }` |

Save thành công ở **lần thử thứ 3** (`ACT-01-01-003`). Hai lần trước bị chặn bởi client-side validation — xem §3.

## 2. Danh sách 35 layer đã lưu (thứ tự trong `templates[0].layers`)

| # | UI path (Layer popup) | `data-type` | layer id trong DB | name đã lưu |
|---|---|---|---|---|
| 1 | Single-line Text | `text` | layer-832429 | Text layer |
| 2 | Curve Text | `curve-text` | layer-154358 | Curve text layer |
| 3 | Street Maps | `maps` | layer-546588 | Maps layer |
| 4 | Route Maps | `route-maps` | layer-723670 | Route Maps layer |
| 5 | Star Maps | `star-maps` | layer-824617 | Star Maps layer |
| 6 | Moon Phase | `moon-phase` | layer-973427 | Moon phase layer |
| 7 | Word Search | `word-search` | layer-545421 | Word Search |
| 8 | Word Cloud | `word-cloud` | layer-958361 | Word Cloud |
| 9 | Song Search | `song-search` | layer-890154 | Song search |
| 10 | Calendar | `calendar` | layer-464779 | Calendar |
| 11 | QR Code | `qr-code` | layer-263079 | QR Code layer |
| 12 | Clock | `clock` | layer-577561 | Clock layer |
| 13 | Toggle Switch | `toggle` | layer-919695 | Toggle |
| 14 | Additional Option | `additional-option` | layer-485540 | Additional option |
| 15 | Addon Charge | `addon-charge` | layer-719170 | Addon charge |
| 16 | JSON List | `json-list` | layer-985154 | JSON List |
| 17 | Font | `font` | layer-965490 | Font |
| 18 | Color | `color` | layer-465176 | Color |
| 19 | Static Image | `static-photo` | layer-197919 | 2_tay_xanh_cheo_nhau |
| 20 | Text to Image (AI) | `text-to-image` | layer-721741 | 2_tay_xanh_cheo_nhau |
| 21 | Static Vector | `static-vector` | layer-358359 | qa-vector |
| 22 | Vector Category | `vector-category` | layer-182438 | qa-vector |
| 23 | Vector Upload | `vector-upload` | layer-598282 | qa-vector |
| 24 | Paragraph ▸ Custom Shape | `shape-text` | layer-863715 | Custom Shape |
| 25 | Other ▸ Warp Text | `warp-text` | layer-606687 | Warp text |
| 26 | Other ▸ Spiral Text | `spiral-text` | layer-714935 | Spiral layer |
| 27 | Paragraph ▸ Normal | `paragraph` | layer-859484 | Paragraph |
| 28 | Scrabble ▸ Cross Word | `scrabble-crossword` | layer-605250 | Scrabble |
| 29 | Scrabble ▸ Single-line | `scrabble-single-line` | layer-679944 | Scrabble |
| 30 | Photo Upload ▸ Single Upload | `photo` | layer-570038 | 2_tay_xanh_cheo_nhau |
| 31 | Photo Upload ▸ Multiple Uploads | `multiple-uploads` | layer-965294 | 2_tay_xanh_cheo_nhau |
| 32 | Clipart Category ▸ 1 Clipart Category | `clipart-category` | layer-348502 | 2_tay_xanh_cheo_nhau |
| 33 | Clipart Category ▸ Group of clipart categories | `group-clipart-categories` | layer-817491 | 2_tay_xanh_cheo_nhau |
| 34 | Dynamic Clipart by Text ▸ Manual Placement | `dynamic-by-text` | layer-244735 | 2_tay_xanh_cheo_nhau |
| 35 | Dynamic Clipart by Text ▸ Auto Placement | `clipart-frame` | layer-347618 | Dynamic Clipart by Text |

35/35 `data-type` khác nhau — khớp đúng danh sách 35 type đã biết.

## 3. Type nào cần cấu hình gì mới save được

### 3.1 `ACT-01-01-001` — Save & Close khi 35 layer đều ở default → **BLOCKED**

Toast nguyên văn (một chuỗi, xuống dòng theo layer):

```
Template - Default template:
Font:
- Select one font category is required
2_tay_xanh_cheo_nhau:
- GenAI service is required
qa-vector:
- Select one vector category is required
2_tay_xanh_cheo_nhau:
- GenAI service is required
2_tay_xanh_cheo_nhau:
- Select one clipart category is required
2_tay_xanh_cheo_nhau:
- Select a group of clipart categories is required
2_tay_xanh_cheo_nhau:
- Select a source text option is required
- Select one clipart category is required
Dynamic Clipart by Text:
- Select one clipart category is required
- Select a source text option is required
```

Evidence: `shots/ACT-01-01-001-before.png`, `shots/ACT-01-01-001-after-validation-errors.png`
→ Đúng 8 type như dự đoán trong task.

### 3.2 `ACT-01-01-002` — Sau khi điền 8 field trên, Save lại → **vẫn BLOCKED** (requirement dây chuyền)

Toast nguyên văn:

```
Template - Default template:
2_tay_xanh_cheo_nhau:
- Prompt the image you want is required
2_tay_xanh_cheo_nhau:
- Prompt the result you want is required
```

**Phát hiện ngoài bảng trong task:** chọn GenAI service **làm xuất hiện thêm field bắt buộc mới**
(`field__text_to_image_prompt` cho `text-to-image`, `field__multi_image_prompt` cho `multiple-uploads`).
Ở trạng thái default (chưa chọn service) hai field prompt này **không tồn tại trong DOM**, nên
lần validate đầu không báo. Đây là validation 2 tầng, không phải 1 tầng.

### 3.3 `ACT-01-01-003` — Save & Close → **SUCCESS** (modal đóng, không toast lỗi, artwork id 4087)

### 3.4 Bảng tổng hợp cấu hình tối thiểu để save được

| `data-type` | Field bắt buộc | Giá trị đã dùng | Ghi chú |
|---|---|---|---|
| `font` | `Select one font category*` (`#field__clipart`) | `QA v3 Font Cat` | **phải tự tạo mới** — xem §4 |
| `vector-category` | `Select one vector category*` | `QA Vector Cat` (id 6007) | có sẵn |
| `clipart-category` | `Select one clipart category*` | `QA Clipart Cat` (id 5999) | có sẵn |
| `group-clipart-categories` | `Select a group of clipart categories*` (`#field__grouped_clipart`) | `[TIB] 3D Sitting Women - Sample Campaigns` (id 5992) | có sẵn |
| `text-to-image` | `GenAI service*` (`#text_to_image_provider`) **+** `Prompt the image you want` | `gemini` + `A watercolor portrait of a pet` | prompt chỉ xuất hiện SAU khi chọn service |
| `multiple-uploads` | `GenAI service*` (`#multi_image_provider`) **+** `Prompt the result you want` | `gemini` + `Blend the uploaded photos into one poster` | `Maximum photos*` tự có default `3` (min 2, max 3) nên không chặn |
| `dynamic-by-text` | `Select a source text option*` + `Value to populate*` + `Select one clipart category*` | `Pet name` (layer `text`) + `{{value}}` + `QA Clipart Cat` | `Value to populate` phải tự chèn, mặc định rỗng |
| `clipart-frame` | `Select one clipart category*` + `Select a source text option*` (+ `Value to populate*`) | `QA Clipart Cat` + `Pet name` | `Value to populate` **tự prefill `{{value}}`**, khác `dynamic-by-text` |

Điều kiện phụ: để có "source text option" thì layer `text` phải bật
`Personalization = Create a new option` và có `Option Title` (đã đặt `Pet name`).

## 4. Asset phải tạo mới trong run này

**Không có font category dùng được trong store.** GraphQL:

```json
{"f":[{"id":5998,"name":"QA Explore Fonts (renamed) copy","deleted_at":"2026-09-10T02:51:46","parent_id":null},
      {"id":5997,"name":"QA Explore Fonts (renamed)","deleted_at":"2026-09-10T02:50:58","parent_id":null}]}
```

Cả hai font category đều đã soft-delete. Query mà portal dùng để đổ dropdown:

```graphql
{ categories: clipart_categories(
    where: {type: {_eq: "font_category"}, deleted_at: {_is_null: true}, parent_id: {_is_null: true}}
    order_by: {created_at: desc} limit: 9999
  ) { id type parent_id label: name } }
```
→ response `{"data":{"categories":[]}}`

**Mutation đã thực hiện:** tạo font category `QA v3 Font Cat` bằng nút `+ New category` ngay trong
panel của layer Font (modal `Category`: Name / Custom class / Display options on personalization form as:
Thumbnail Images · Dropdown Option Name · Dropdown Option Name + Thumbnail · **Inline Radio Button** (default) · Radio).
Category này rỗng (`Available values:` trống).

Các asset khác đã có sẵn, không cần tạo: `QA Clipart Cat` (5999), `QA Vector Cat` (6007),
`[TIB] 3D Sitting Women - Sample Campaigns` (5992), 3 custom font (915 Dear Sans_Condensed Regular,
916 Bebas Neue, 917 QA Renamed Baginda).

## 5. Cơ chế quan sát được khi build (bổ sung cho note cũ)

- Popup `+ Layer` có **29 item**; 6 item có `i.la-angle-right` là parent. **Parent mở submenu bằng CLICK
  (không phải hover)** — submenu chèn thêm 2 `.add-layer-popup__item` ngay sau parent (29 → 31).
  Hover tổng hợp bằng `dispatchEvent` KHÔNG mở được submenu; real-mouse hover cũng không.
- 8 type mở image/vector picker khi add: `static-photo`, `text-to-image`, `static-vector`,
  `vector-category`, `vector-upload`, `photo`, `multiple-uploads`, `clipart-category`,
  `group-clipart-categories`, `dynamic-by-text`. Nút xác nhận đổi label theo số item đã tick
  (`Select` → `Select 1 image` / `Select 1 vector`).
- **Thêm 35 layer + sửa config: 0 request ghi.** Network chỉ có
  `GET /api/merchant/games/<game>/<base64-config>.json` (render preview),
  `GET /api/layer-image-categories?type=clipart|vector`,
  `POST /v1/graphql` + `POST /v1beta1/relay` (đọc category),
  `POST /api/merchant/gpx/generate-fake-customization`.
  Không có `POST/PUT /api/artworks*` cho tới khi `Save & Close` pass validation.
- Save & Close bị validation chặn **không phát sinh request nào** — validation thuần client-side.
