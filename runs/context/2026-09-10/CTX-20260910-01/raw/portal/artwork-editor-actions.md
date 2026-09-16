# Artwork editor — actions, print effects, bulk, duplicate&link, template (RAW)

| | |
|---|---|
| Environment | **staging** `https://staging-portal.teeinblue.com` |
| Account / store | **Linh explorer** — `linh-explorer.myshopify.com` (JWT `sub=273`, `user_id=266`), plan **Blue (Test)** |
| Object | artwork **"QA - All layers explore v2"** (1600x1600, PNG_RGB) |
| knowledge_kind | `OBSERVED_CURRENT` |

> **Nhãn account:** mọi block trong file này lấy từ `Linh explorer / linh-explorer`. Xem mục cuối "Sai account đã xảy ra" để biết ngoại lệ duy nhất.


## 1. Layer action bar (khi có layer được chọn)

Bar này nằm trong panel `.panel.panel-sticky-header.panel--layer` (đầu panel danh sách layer), xuất hiện ngay khi chọn ≥1 layer.

Nội dung nguyên văn khi chọn **1 layer**:

```text
Deselect
1 selected
Group (Ctrl/Cmd+G)
Ungroup (Ctrl/Cmd+Shift+G)
Copy to clipboard
Duplicate
Duplicate & Link options
Delete
```

| Nút | Trạng thái khi chọn 1 layer |
|---|---|
| `Deselect` | enabled |
| `Group (Ctrl/Cmd+G)` | enabled |
| `Ungroup (Ctrl/Cmd+Shift+G)` | **disabled** |
| `Copy to clipboard` | enabled |
| `Duplicate` | enabled |
| `Duplicate & Link options` | enabled |
| `Delete` | enabled |

- **KHÔNG có nút "…" / overflow menu** trên layer action bar trong build này. Tìm bằng `[class*=more]`, `[class*=ellipsis]`, `.alab-action__more` trong `.dialog-artwork-editor` → `found: 0` ở cả 5 tổ hợp selection. `NOT_VERIFIED` cho mọi mục menu "…" mà brief giả định.
- Screenshot: `raw/portal/shots/bulk-single-text-layer.png`

## 2. Bulk actions (chọn nhiều layer)

Chọn nhiều layer bằng click row đầu rồi Ctrl/Cmd+click các row sau.

**Kết quả: action bar KHÔNG đổi theo số lượng hay theo loại layer.** Với 1, 2 và 3 layer chọn, danh sách nút y hệt nhau; chỉ số đếm `N selected` đổi. `Ungroup (Ctrl/Cmd+Shift+G)` luôn **disabled** ở mọi tổ hợp đã thử (không có group nào tồn tại).

Cái **thực sự đổi** theo loại layer là canvas toolbar (`.qte-field .qinline-label` hiển thị / `.qoverflow-menu`):

| Tổ hợp | `data-type` các layer | Toolbar hiện ra | `N selected` | Nút bar |
|---|---|---|---|---|
| single text layer | `text` | `Transform` · `Align` · `Print Effects` · `Roboto(regular)` | 1 selected | Deselect · Group (Ctrl/Cmd+G) · Ungroup (Ctrl/Cmd+Shift+G) _(disabled)_ · Copy to clipboard · Duplicate · Duplicate & Link options · Delete |
| 2 text layers | `curve-text`, `text` | `Transform` · `Align` · `Print Effects` · `Roboto(regular)` | 2 selected | Deselect · Group (Ctrl/Cmd+G) · Ungroup (Ctrl/Cmd+Shift+G) _(disabled)_ · Copy to clipboard · Duplicate · Duplicate & Link options · Delete |
| 2 image layers | `photo`, `static-photo` | `Transform` · `Align` · `Print Effects` | 2 selected | Deselect · Group (Ctrl/Cmd+G) · Ungroup (Ctrl/Cmd+Shift+G) _(disabled)_ · Copy to clipboard · Duplicate · Duplicate & Link options · Delete |
| 2 form elements | `color`, `toggle` | `Align` | 2 selected | Deselect · Group (Ctrl/Cmd+G) · Ungroup (Ctrl/Cmd+Shift+G) _(disabled)_ · Copy to clipboard · Duplicate · Duplicate & Link options · Delete |
| mixed text + image + form | `addon-charge`, `static-photo`, `text` | `Transform` · `Align` · `Print Effects` | 3 selected | Deselect · Group (Ctrl/Cmd+G) · Ungroup (Ctrl/Cmd+Shift+G) _(disabled)_ · Copy to clipboard · Duplicate · Duplicate & Link options · Delete |

Ghi chú nguyên văn `.qoverflow-menu` (chuỗi liền, gồm cả danh sách font-size ẩn):

- **single text layer** → `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- **2 text layers** → `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- **2 image layers** → `Print Effects`
- **2 form elements** → ``
- **mixed text + image + form** → `Print Effects`

- `2 form elements` (`color`,`toggle`): toolbar chỉ còn `Align`, không có Transform / Print Effects.
- Screenshots: `raw/portal/shots/bulk-*.png`

## 3. Print Effects

Nút `Print Effects` nằm trên canvas toolbar (`.qte-field > .qinline.qpopover`), chỉ hiện khi có layer được chọn.

**Popover khi click (nguyên văn):**

```text
Select a layout to auto-generate shape cut symmetrically:
1×2
1×3
1×4
2×1
2×3
Customize
 Effect layers only appear on Order Design as production guides for your print provider.
```

DOM: `.qfield-container.sc-layout-screen`, mỗi preset là `.shape-cut-layout-option`; preset cuối là `.shape-cut-layout-option--customize`.

Preset layout: `1×2` · `1×3` · `1×4` · `2×1` · `2×3` · `Customize`

**Sau khi click `Customize` (nguyên văn):**

```text
Layouts
Custom layout
Set rows and columns, then click the cells where the shape cut should appear.
Rows
Columns
Grid 3×3
+
+
+
+
★
+
+
+
+
0 shape cut
Cancel
Apply layout
```

- Render ở `popover` (không phải modal riêng).
- Control: 2 input `number` (Rows, Columns), lưới cell click được, nút `Cancel` và `Apply layout` (**disabled** khi `0 shape cut`).

### Emboss — `NOT_VERIFIED`

Brief nói Print Effects = Shape Cut cũ + thêm **emboss**. Trên build staging này:

| Layer type thử | Nút Print Effects | Nội dung popover |
|---|---|---|
| Single-line Text | có | Select a layout to auto-generate shape cut symmetrically: / 1×2 / 1×3 / 1×4 / 2×1 / 2×3 / Customize /  Effect  |
| Static Image | có | Select a layout to auto-generate shape cut symmetrically: / 1×2 / 1×3 / 1×4 / 2×1 / 2×3 / Customize /  Effect  |
| Static Vector | có | Select a layout to auto-generate shape cut symmetrically: / 1×2 / 1×3 / 1×4 / 2×1 / 2×3 / Customize /  Effect  |
| Word Cloud | có | Select a layout to auto-generate shape cut symmetrically: / 1×2 / 1×3 / 1×4 / 2×1 / 2×3 / Customize /  Effect  |

- Popover Print Effects của cả 4 type đều **chỉ có shape-cut layout**; tìm chuỗi `emboss` (case-insensitive) trong `document.body.innerText` → **0 kết quả** (`bodyEmbossLines: []`).
- Cũng không tìm thấy chuỗi `3rd-party` / `third-party` nào trong popover (`thirdPartyLines: []`) → **không quan sát được UI nào nói emboss phụ thuộc 3rd-party service**.
- Kết luận: **`NOT_VERIFIED`** — không khẳng định emboss không tồn tại; chỉ ghi nhận không tìm thấy nó ở surface Print Effects trên account/plan này. Lý do có thể (chưa xác minh): gated theo plan `Blue (Test)`, theo layer type khác, hoặc chỉ bật khi đã cấu hình service.
- Đối chiếu Extras › 3rd-party Services: xem mục 5.

Screenshots: `raw/portal/shots/print-effects-popover.png`, `raw/portal/shots/print-effects-customize.png`

## 4. Duplicate & Link options — ma trận theo layer type

**Cách phân biệt (đã xác minh, KHÔNG phải icon 🔗):** bản sao do `Duplicate & Link options` tạo ra có config panel rút gọn còn đúng 2 accordion **`LINKED LAYER`** + **`EXTRA`**, nội dung:

```text
LINKED LAYER
This layer is linked to another layer. Design and personalization are synced from it.
Source layer:
Text layer
```

Bản sao **không** linked thì giữ nguyên bộ accordion đầy đủ của chính nó (`DESIGN SETTINGS` / `POPULATE VALUES` / `PERSONALIZATION SETTINGS` / `CONDITIONAL SETTING` / `EXTRA`).

> Trong build này **layer row KHÔNG hiện icon chain 🔗** cho bản linked — icon row luôn là `la-eye · la-unlock · la-pen · la-copy · la-trash-alt`. Đừng dùng icon để nhận biết.

Mỗi type được đo **2 lần liên tiếp**; chỉ nhận kết quả khi 2 lần trùng nhau, lệch nhau thì đánh `UNSTABLE_NOT_VERIFIED`.

| Layer type | `data-type` | Nút có mặt | Kết quả | Tên bản sao |
|---|---|---|---|---|
| Single-line Text | `text` | yes | **LINKED** | Text layer copy |
| Paragraph › Normal | `paragraph` | yes | **LINKED** | Paragraph copy |
| Paragraph › Custom Shape | `shape-text` | yes | **PLAIN_COPY** | Custom Shape copy |
| Curve Text | `curve-text` | yes | **LINKED** | Curve text layer copy |
| Other › Warp Text | `warp-text` | yes | **LINKED** | Warp text copy |
| Other › Spiral Text | `spiral-text` | yes | **PLAIN_COPY** | Spiral layer copy |
| Static Image | `static-photo` | yes | **LINKED** | 2_tay_xanh_cheo_nhau copy |
| Clipart Category › 1 Clipart Category | `clipart-category` | yes | **LINKED** | 2_tay_xanh_cheo_nhau copy |
| Clipart Category › Group of clipart categories | `group-clipart-categories` | yes | **LINKED** | 2_tay_xanh_cheo_nhau copy |
| Photo Upload › Single Upload | `photo` | yes | **LINKED** | 2_tay_xanh_cheo_nhau copy |
| Photo Upload › Multiple Uploads | `multiple-uploads` | yes | **PLAIN_COPY** | 2_tay_xanh_cheo_nhau copy |
| Text to Image (AI) | `text-to-image` | yes | **PLAIN_COPY** | 2_tay_xanh_cheo_nhau copy |
| Dynamic Clipart by Text › Manual Placement | `dynamic-by-text` | yes | **PLAIN_COPY** | 2_tay_xanh_cheo_nhau copy |
| Dynamic Clipart by Text › Auto Placement | `clipart-frame` | yes | **PLAIN_COPY** | Dynamic Clipart by Text copy |
| Static Vector | `static-vector` | yes | **LINKED** | qa-vector copy |
| Vector Category | `vector-category` | yes | **LINKED** | qa-vector copy |
| Vector Upload | `vector-upload` | yes | **LINKED** | qa-vector copy |
| Street Maps | `maps` | yes | **LINKED** | Maps layer copy |
| Route Maps | `route-maps` | yes | **LINKED** | Route Maps layer copy |
| Star Maps | `star-maps` | yes | **PLAIN_COPY** | Star Maps layer copy |
| Moon Phase | `moon-phase` | yes | **LINKED** | Moon phase layer copy |
| Scrabble › Cross Word | `scrabble-crossword` | yes | **LINKED** | Scrabble copy |
| Scrabble › Single-line | `scrabble-single-line` | yes | **LINKED** | Scrabble copy |
| Word Search | `word-search` | yes | **LINKED** | Word Search copy |
| Word Cloud | `word-cloud` | yes | **LINKED** | Word Cloud copy |
| Song Search | `song-search` | yes | **PLAIN_COPY** | Song search copy |
| Calendar | `calendar` | yes | **LINKED** | Calendar copy |
| QR Code | `qr-code` | yes | **PLAIN_COPY** | QR Code layer copy |
| Clock | `clock` | yes | **LINKED** | Clock layer copy |
| Toggle Switch | `toggle` | yes | **PLAIN_COPY** | Toggle copy |
| Additional Option | `additional-option` | yes | **PLAIN_COPY** | Additional option copy |
| Addon Charge | `addon-charge` | yes | **PLAIN_COPY** | Addon charge copy |
| JSON List | `json-list` | yes | **PLAIN_COPY** | JSON List copy |
| Font | `font` | yes | **PLAIN_COPY** | Font copy |
| Color | `color` | yes | **PLAIN_COPY** | Color copy |

Tổng: **20 type tạo bản LINKED**, **15 type chỉ tạo bản copy độc lập** dù nút vẫn tên "Duplicate & Link options".

Nhóm **PLAIN_COPY** (nút có nhưng không link): `Paragraph › Custom Shape` · `Other › Spiral Text` · `Photo Upload › Multiple Uploads` · `Text to Image (AI)` · `Dynamic Clipart by Text › Manual Placement` · `Dynamic Clipart by Text › Auto Placement` · `Star Maps` · `Song Search` · `QR Code` · `Toggle Switch` · `Additional Option` · `Addon Charge` · `JSON List` · `Font` · `Color`

## 5. Template — các thao tác trên thanh Template

Thanh template nằm trong panel trái, text `Template:` + tên template hiện hành. Các control (đọc từ DOM):

| Control | Selector | Mở ra gì |
|---|---|---|
| template dropdown (la-caret-down) | `i.la-caret-down` | Bulk Fulfill ⟂ Campaigns ⟂ Assets ⟂ Store Settings ⟂ Extras ⟂ Organization ⟂ All ⟂ Default template |
| template shared settings (la-cog) | `i.la-cog` | Template Settings: / Display Template options as: / Dropdown List / Radio Button / Radio / Note: if a template includes a thumbnail image, the Templat |
| add template (la-plus) | `i.la-plus` | Add new / Import from artwork |
| template hide/show (btn-set-invisible) | `button[class*=btn-set-invisible]` | _không mở menu (hành động thực thi ngay)_ |
| template edit (la-pencil-alt) | `i.la-pencil-alt` | Edit - Default template / Save / Cancel / Name / Thumbnail / Browse / Extra charge for this template |
| template duplicate (la-copy) | `button:has(i.la-copy)` | _không mở menu (hành động thực thi ngay)_ |
| template more (alab-action__more) | `button.alab-action__more` | Convert to Global Template |

### Nguyên văn các dialog/menu template

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu`

```text
Bulk Fulfill
```

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu`

```text
Campaigns
```

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu`

```text
Assets
```

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu nav`

```text
Store Settings
```

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu`

```text
Extras
```

**template dropdown (la-caret-down)** → `navbar-item navbar-item--has-submenu`

```text
Organization
```

**template dropdown (la-caret-down)** → `vue3-treeselect__menu-container`

```text
All
```

**template dropdown (la-caret-down)** → `v-popper__inner`

```text
Default template
```

**template shared settings (la-cog)** → `vm--modal`

```text
Template Settings:
Display Template options as:
Dropdown List
Radio Button
Radio
Note: if a template includes a thumbnail image, the Template options will show as Image Radio instead
Label of template options:
Placeholder text for template options:
Show selected template on cart/checkout

Display the selected template option as a line item property on Shopify orders. Format: "Label: Template name". This setting only applies to artworks with multiple templates.

Done
```

**add template (la-plus)** → `v-popper__inner`

```text
Add new
Import from artwork
```

**template edit (la-pencil-alt)** → `vm--modal`

```text
Edit - Default template
Save
Cancel
Name
Thumbnail
Browse
Extra charge for this template
```

**template more (alab-action__more)** → `v-popper__inner`

```text
Convert to Global Template
```

- `template duplicate (la-copy)`: **không mở dialog** — bấm là nhân bản ngay, tạo `Default template copy` (quan sát ở lần probe sau: tên template hiện hành đổi thành `Default template copy`).
- `template hide/show`: nút có class `btn-set-invisible--disabled` → **disabled** khi artwork chỉ có template mặc định.
- Menu `…` (`button.alab-action__more`) chỉ có đúng **1 mục: `Convert to Global Template`**. **KHÔNG quan sát thấy** `Delete`, `Change position`, `Edit shared settings` trong menu này → `NOT_VERIFIED` cho 3 mục đó (Edit shared settings thực tế là nút `la-cog` riêng, không nằm trong `…`).
- Các thao tác trên chỉ được **mở ra để đọc**, không confirm/áp dụng (trừ duplicate template xảy ra ngay khi click — xem mục Mutations).

## 6. Extras › 3rd-party Services (đối chiếu cho emboss)

URL: `https://staging-portal.teeinblue.com/extras/extra-services`

```text
3rd-party Services
Connect Teeinblue with your 3rd-party service's account (connection applies for all stores of this Teeinblue account).
Maps
Gen AI Effects
Remove Background
Cutout.Pro
ImagenHub
Upload limit settings
Canva
Connect Mapbox account

Create a Mapbox account and connect it here to use the Maps feature in Artwork. Read How to use Maps feature.

Mapbox Access token:
Map service for searching location:
Mapbox
Google
The maximum Mapbox file render is 2056px. You can find more detailed information about Mapbox static images  here.
Save
```

Tabs: 

- Tìm `emboss` trong toàn trang này: `[]`
## 7. Persistence — artwork chỉ tồn tại sau `Save & Close`

Đây là phát hiện quan trọng nhất về cách evidence tồn tại.

**Add / edit / delete layer trong editor KHÔNG gọi API.** Đo bằng `page.on('requestfinished')` lọc `staging-api.teeinblue.com` + `staging-graphql.teeinblue.com`:

| ACT | Hành động | Network entries (mapped / polling / unrelated / unknown) |
|---|---|---|
| `ACT-01-01-001` | Add Single-line Text layer | 0 / 0 / 0 / 0 |
| `ACT-01-01-002` | Mở config panel + bung accordion | 0 / 0 / 0 / 1 |
| `ACT-02-01-001` | Add Static Image (qua asset picker) | 1 / 0 / 0 / 2 |
| `ACT-03-01-001` | Duplicate & Link options | 0 / 0 / 0 / 0 |
| `ACT-04-01-001` | Delete layer (nút trash trên row) | 0 / 0 / 0 / 0 |
| `ACT-05-01-001` | Save & Close với **35 layer** | 0 / 0 / 0 / 0 — **BỊ CHẶN bởi validation** |
| `ACT-05-01-002` | Save & Close với **27 layer** (đã loại type chặn) | `POST /api/artworks` → **201**, `POST /v1/graphql` → 200 |

Hệ quả: mọi thao tác add→capture→delete trong một session chưa save **không để lại dấu vết nào** trong DB. Artwork test tạo trước đó không persist là vì lý do này, không phải vì lỗi.

### 7.1 Save bị chặn — nguyên văn validation

`Save & Close` với đủ 35 layer → editor **không đóng**, toast hiện (nguyên văn):

```text
Template - Default template:
2_tay_xanh_cheo_nhau:
- Select one clipart category is required
2_tay_xanh_cheo_nhau:
- Select a group of clipart categories is required
2_tay_xanh_cheo_nhau:
- GenAI service is required
2_tay_xanh_cheo_nhau:
- GenAI service is required
2_tay_xanh_cheo_nhau:
- Select a source text option is required
- Select one clipart category is required
Dynamic Clipart by Text:
- Select one clipart category is required
- Select a source text option is required
qa-vector:
- Select one vector category is required
Font:
- Select one font category is required
```

### 7.2 Type không save được nếu để nguyên default

Xác định bằng cách loại dần rồi save lại (từng type được test riêng khi cần):

| Layer type | Thông báo chặn save |
|---|---|
| `Clipart Category › 1 Clipart Category` | `Select one clipart category is required` |
| `Clipart Category › Group of clipart categories` | `Select a group of clipart categories is required` |
| `Text to Image (AI)` | `GenAI service is required` |
| `Photo Upload › Multiple Uploads` | `GenAI service is required` — xác minh riêng lẻ: add 1 layer type này rồi save → editor không đóng, toast đúng message này |
| `Dynamic Clipart by Text › Manual Placement` | `Select one clipart category is required` + `Select a source text option is required` |
| `Dynamic Clipart by Text › Auto Placement` | `Select one clipart category is required` + `Select a source text option is required` |
| `Vector Category` | `Select one vector category is required` |
| `Font` | `Select one font category is required` |

Đối chứng: `Static Image` và `Photo Upload › Single Upload` add riêng lẻ rồi save → editor đóng, save thành công, không toast.

> Đây là **`OBSERVED_CURRENT`**, không phải confirmed requirement. Chỉ mới quan sát ở trạng thái default (chưa cấu hình gì trong config panel) — chưa test xem cấu hình đủ field thì có save được không.

### 7.3 Artwork mẫu đã lưu

- **Artwork id `4085`**, tên `QA - All layers explore v2`, 1600x1600, `design_format: "rgb"`, `schema_version: 2`.
- Chứa **27 layer**, mỗi type một layer, gồm toàn bộ TEXT / VECTOR / MAPS / PUZZLES / OTHERS / FORM ELEMENTS + `Static Image` + `Photo Upload › Single Upload`.
- Đã đóng editor, mở lại từ `/artworks` và đếm được đúng 27 `li.artwork-layer-item`. `data-type` sau khi reload (thứ tự trên panel, trên xuống dưới):
  `color`, `json-list`, `addon-charge`, `additional-option`, `toggle`, `clock`, `qr-code`, `calendar`, `song-search`, `word-cloud`, `word-search`, `scrabble-single-line`, `scrabble-crossword`, `moon-phase`, `star-maps`, `route-maps`, `maps`, `vector-upload`, `static-vector`, `photo`, `static-photo`, `spiral-text`, `warp-text`, `curve-text`, `shape-text`, `paragraph`, `text`.
- Layer data nằm trong response `POST /api/artworks` ở `data[0].layers[]` (template `Default template`, `id: "template-495233"`), khớp với ghi nhận của api-explorer là cột `artworks.templates` jsonb.
- Screenshot: `raw/portal/shots/artwork-4085-reopened.png`. Network: `raw/network/ACT-05-01-002.json`.
- **8 type không có mặt trong artwork 4085** (xem 7.2) — nếu cần mẫu cho các type đó phải cấu hình field bắt buộc trước.

## 8. Artwork list — menu thao tác trên từng artwork

Trên `/artworks`, mỗi `.artwork-item` có 4 nút: `la-search-plus` (preview) · `la-pencil` (edit details) · `la-copy` (duplicate) · `la-ellipsis-h`.

Menu `la-ellipsis-h` (nguyên văn):

```text
Import to Translation
Mark as archive
Delete artwork
```

`Delete artwork` → dialog confirm (nguyên văn):

```text
Confirm
Are you sure to remove QA - All layers explore v2?
Remove
Cancel
```

## 9. Mutations đã thực hiện (để chủ store biết)

Toàn bộ trên `Linh explorer / linh-explorer.myshopify.com` (staging), theo mutation policy được cấp.

| Việc | Trạng thái |
|---|---|
| Tạo artwork `QA - All layers explore v2` | **GIỮ LẠI** — id `4085`, 27 layer, là artwork mẫu theo yêu cầu |
| 2 artwork trùng tên do probe save tạo ra (id `4083`, `4084`) | **ĐÃ XOÁ** qua `Delete artwork` → `Remove` |
| Upload 1 file SVG `qa-vector.svg` (200x200) vào Vector library | **CÒN LẠI** — cần thiết vì vector library rỗng, không add được layer VECTOR nếu không có asset. Xoá nếu không cần. |
| Duplicate template → tạo `Default template copy` khi probe nút `la-copy` trên thanh template | **KHÔNG persist** — session đó không save |
| Artwork `Poster - Woman and dog clipart` (id `4081`) | **KHÔNG ĐỤNG TỚI** |

## 10. Sai account đã xảy ra — và đã chặn

Một lần đăng nhập lại qua Playwright MCP dựa vào autofill của browser profile đã vào **nhầm account**: `Linh Pham` / `linh-tib-staging.myshopify.com` (plan Enterprise Test). Xử lý:

- Trên account sai chỉ thực hiện **navigate `/artworks` và đọc danh sách** — **không tạo / sửa / xoá gì**.
- Không có evidence nào trong hai file output này lấy từ account đó.
- Từ đó chuyển hẳn sang script Node đọc `TIB_STAGING_EMAIL` / `TIB_STAGING_PASSWORD` từ `.env`, **fill cả ô email lẫn password** (không dựa autofill), và hard-fail nếu không đúng: `store === linh-explorer.myshopify.com` **và** `jwt.sub === "273"` **và** `jwt.user_id === 266` **và** sidebar hiện `Linh explorer`. Mọi batch trong run này đều in dòng `VERIFIED {"store":"linh-explorer.myshopify.com","jwtSub":"273","userId":"266","displayName":"Linh explorer","plan":"Blue (Test)"}` trước khi thao tác.
- Việc verify chạy lại ở **mỗi lần re-login** (token TTL ~15 phút, `ensureSession()` tự login lại khi còn <180s).
