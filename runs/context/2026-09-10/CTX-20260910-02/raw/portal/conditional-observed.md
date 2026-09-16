# TASK 2 — Conditional setting (quan sát thật)

> **Evidence account:** `Linh explorer` · `linh-explorer.myshopify.com` · JWT `sub="273"`, `user_id=266`
> Artwork **4087** `QA - all layers v3`, staging. Tất cả là `OBSERVED_CURRENT` 2026-09-10.

## 1. Vị trí UI

Panel `CONDITIONAL SETTING` (`#step-5-personalize`) trong `.layer-panels`, xuất hiện ở layer đích.

```
Show this layer and its option when:
  ( ) All conditions match (AND)      <- input#match_type-all  value="all"   (default checked)
  ( ) Any conditions match (OR)       <- input#match_type-any  value="any"
  [ + Add conditions ]
```

Khi CHƯA có condition nào, panel còn hiện thêm dòng `No conditions`.
`#field__match_type` chỉ chứa **2** radio; **không có radio "No conditions"** — nó là label trạng thái, không phải lựa chọn thứ 3.

Sau khi thêm >= 1 condition, xuất hiện thêm toggle `Show this layer on first load`
(`#field__show_by_default`, `field--toggle`).

## 2. `+ Add conditions` — danh sách option NGUỒN chọn được

Mỗi condition là 1 block `.bg-dark` gồm:
- `Option:` + một `vue-multiselect` (`.multiselect`) chọn option nguồn, kèm nút `×` (`repeater-remove`) để xoá condition.
- Bên dưới là control giá trị, **phụ thuộc type của layer nguồn**.
- Giữa 2 condition hiển thị chữ **`AND`** (khi `match_type=all`) hoặc **`OR`** (khi `match_type=any`).

Mỗi option nguồn render dạng `<div>{Option Title}</div><small>{tên layer}</small>`.

### 2.1 Đúng 8 layer type xuất hiện được làm option nguồn

Điều kiện test: **cả 35 layer đều đã được đặt Option Title riêng** (`OPT <data-type>`), nên
danh sách dưới đây là danh sách đầy đủ, không phải do thiếu cấu hình.

| # | `data-type` layer nguồn | Toán tử hiển thị | Control giá trị |
|---|---|---|---|
| 1 | `toggle` | *(không có toán tử)* | `<select id="toggle" name="toggle">` → `true|On`, `false|Off` — **single value** |
| 2 | `additional-option` | `is any of:` | multi-select + `Select all`; hiện tại rỗng → hint `Set value to clipart to set dependency` |
| 3 | `addon-charge` | `is any of:` | multi-select + `Select all` + placeholder `Select options` |
| 4 | `json-list` | `is any of:` | multi-select + `Select all` + `Select item names` **+ ô `Or paste a list of names, separated by commas` + nút `Add`** |
| 5 | `font` | `is any of:` | multi-select + `Select all`; font category rỗng → hint `Set value to clipart to set dependency` |
| 6 | `vector-category` | `is any of:` | checkbox-image grid `#field__dependency_value_clipart_0` (`field--checkbox_image`) — 3 vector |
| 7 | `clipart-category` | `is any of:` | checkbox-image grid `#field__dependency_value_clipart_N` — 5 clipart |
| 8 | `group-clipart-categories` | `is any of:` | multi-select + `Select all` + placeholder `Select categories` |

**Toán tử chỉ có 2 dạng**: ngầm-bằng (`toggle`) và `is any of:` (7 type còn lại).
**Không có** `is none of`, `contains`, `>`, `<`, `is empty`, v.v.

### 2.2 27 layer type KHÔNG xuất hiện được trong danh sách option nguồn

`text` · `curve-text` · `paragraph` · `shape-text` · `warp-text` · `spiral-text` ·
`maps` · `route-maps` · `star-maps` · `moon-phase` ·
`word-search` · `word-cloud` · `song-search` · `calendar` · `qr-code` · `clock` ·
`scrabble-crossword` · `scrabble-single-line` ·
`static-photo` · `static-vector` · `vector-upload` ·
`photo` · `multiple-uploads` · `text-to-image` ·
`dynamic-by-text` · `clipart-frame` · **`color`**

Ghi chú quan sát được (không suy diễn nguyên nhân):
- `color` có personalization option đầy đủ (Option Title đặt được) nhưng **vẫn không xuất hiện**, trong khi `font` thì có.
- `vector-category` xuất hiện nhưng `vector-upload` thì không.
- `static-photo`, `static-vector`, `clipart-frame`, `dynamic-by-text` **không có field `Option Title`** (`#field__form_label` không tồn tại) → không có option để làm nguồn.

### 2.3 Ràng buộc khác quan sát được

- Option nguồn **đã dùng ở condition trước bị loại khỏi danh sách của condition sau**
  (condition #1 chọn `Add gift box / Toggle` → dropdown của condition #2 chỉ còn 7 mục, không còn Toggle).
- Layer đang cấu hình không tự trỏ vào chính nó (`paragraph` không có trong list của chính nó).
- Với `clipart-category`, **clipart đầu tiên được tick sẵn** ngay khi vừa chọn option nguồn (`checked = [true,false,false,false,false]`).

## 3. Kịch bản đã chạy

| ACT | Nội dung | Kết quả |
|---|---|---|
| `ACT-02-01-001` | Layer đích `paragraph`, condition #1 = `Add gift box (Toggle)` = `On` | OK, UI hiện `On/Off` select |
| `ACT-02-01-002` | Thêm condition #2 = `OPT clipart-category` `is any of` 2 clipart; `match_type = all` | Save & Close **SUCCESS**, không toast lỗi |
| `ACT-02-01-003` | Reload artwork → đổi sang `Any conditions match (OR)` + bật `Show this layer on first load` | Save & Close **SUCCESS** |
| `ACT-02-01-004` | Duyệt lần lượt 8 option nguồn trên layer `curve-text` để ghi toán tử/giá trị | Không save (bấm `Cancel`) |

Evidence: `shots/COND-01-toggle-source-on-off.png`, `shots/COND-02-two-conditions-AND.png`

Reload lại artwork sau save: condition giữ nguyên; label nút đổi `Select all` → `Deselect all`
và hiện hint `Set value to clipart to set dependency`.

## 4. JSON `dependency` thật (đọc lại qua GraphQL)

Query:
```
POST https://staging-graphql.teeinblue.com/v1/graphql
Authorization: Bearer <JWT>     # LƯU Ý: localStorage["teeinblue_token"] là JSON array
                                # [{"token":"<JWT>","expiredAt":<ms>}] — phải lấy [0].token,
                                # gửi nguyên chuỗi array sẽ bị "Invalid response from authorization hook"
{"query":"{ artworks(where:{id:{_eq:4087}}) { templates } }"}
```

Chỉ **1/35** layer có key `dependency` (layer `paragraph`, id `layer-859484`).
34 layer còn lại **không có key `dependency`** (không phải `null` — key vắng mặt).

### 4.1 Sau `ACT-02-01-002` — `All conditions match (AND)`, `Show this layer on first load` = OFF

```json
{
  "match_type": "all",
  "dependencies": [
    {
      "value": true,
      "element": "layer-919695"
    },
    {
      "value": [
        "users/266/cliparts/5999/260910_0aO7HVqegEpV7kq2_large.webp",
        "users/266/cliparts/5999/260910_AQlITGKGF7bcai8c_large.webp"
      ],
      "element": "layer-348502"
    }
  ],
  "show_by_default": false
}
```

### 4.2 Sau `ACT-02-01-003` — `Any conditions match (OR)`, `Show this layer on first load` = ON

```json
{
  "match_type": "any",
  "dependencies": [
    {
      "value": true,
      "element": "layer-919695"
    },
    {
      "value": [
        "users/266/cliparts/5999/260910_0aO7HVqegEpV7kq2_large.webp",
        "users/266/cliparts/5999/260910_AQlITGKGF7bcai8c_large.webp"
      ],
      "element": "layer-348502"
    }
  ],
  "show_by_default": true
}
```

### 4.3 Đọc được từ shape (OBSERVED, chưa confirm với dev)

- `dependency.match_type`: `"all"` | `"any"` — map 1-1 với 2 radio.
- `dependency.show_by_default`: boolean, **nằm TRONG `dependency`**, không phải field top-level của layer.
- `dependency.dependencies[]`: mỗi phần tử chỉ có **2 key**: `element` + `value`. **Không có key toán tử** —
  toán tử là hàm của type layer nguồn, không lưu trong JSON.
- `element` = **layer id** của layer nguồn (`layer-919695` = layer `toggle`, `layer-348502` = layer `clipart-category`),
  không phải option id.
- `value`:
  - `toggle` → boolean scalar (`true`).
  - `clipart-category` → **array các path clipart** (`users/<user_id>/cliparts/<category_id>/<file>_large.webp`),
    tức là lưu đường dẫn ảnh, không lưu clipart id.
- Chỉ 1 sample cho mỗi type nguồn → **không suy ra được** shape `value` của 6 type nguồn còn lại
  (`additional-option`, `addon-charge`, `json-list`, `font`, `vector-category`, `group-clipart-categories`). `NOT_VERIFIED`.

## 5. NOT_VERIFIED

- Hành vi runtime của condition trên storefront (layer thực sự ẩn/hiện) — chưa test, ngoài scope portal.
- Ý nghĩa chính xác của `show_by_default` khi render lần đầu — chỉ đọc được label UI.
- Có giới hạn số condition tối đa hay không — chỉ test tới 2 condition.
- Nested/grouped condition (AND lồng OR) — UI không có, nhưng chưa xác nhận là không hỗ trợ.
