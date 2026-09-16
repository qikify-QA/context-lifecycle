# TASK 3 — Populate values (quan sát thật)

> **Evidence account:** `Linh explorer` · `linh-explorer.myshopify.com` · JWT `sub="273"`, `user_id=266`
> Artwork **4087** `QA - all layers v3`, staging. Tất cả `OBSERVED_CURRENT` 2026-09-10.

## 0. Bản đồ field → key JSON

Panel `POPULATE VALUES` trên layer **nhận** giá trị. `id` của `.field` khớp thẳng key JSON:

| Field id trong DOM | Nhãn UI | Key trong `templates[].layers[]` |
|---|---|---|
| `field__lookup_value_helper` | `Browse values` | *(chỉ là helper, không lưu)* |
| `field__retrieval_value_enabled` | `Populate Content from another option` | `retrieval_value_enabled` |
| `field__retrieval_layer` | `Source option:` | `retrieval_layer` |
| `field__retrieval_value` | `Value:` + nút `+ Available Value` | `retrieval_value` |
| `field__retrieval_styles.font.enabled` | `Populate Font from another option` | `retrieval_styles.font.enabled` |
| `field__retrieval_styles.font.layer` | `Select a Font option:` | `retrieval_styles.font.layer` |
| `field__retrieval_styles.font.value` | `Values:` (input **disabled**, hiện `{{font}}`) | **KHÔNG được lưu** |
| `field__retrieval_styles.color.enabled` / `.layer` / `.value` | `Populate Color…` / `Select a Color option:` / `Values:` (`{{color}}`, disabled) | `retrieval_styles.color.enabled` / `.layer`; `.value` **không lưu** |
| `field__retrieval_styles.background.enabled` / `.layer` / `.value` | `Populate Background…` / `Select a Clipart category:` / `Values:` | `retrieval_styles.background.enabled` / `.layer` |
| `field__retrieval_styles.shape.enabled` / `.layer` / `.value` | `Populate Shape…` / `Select a Clipart category:` / `Values:` (`{{shape}}`, disabled) | `retrieval_styles.shape.enabled` / `.layer` |
| `field___populate_font_targets` (trên layer **Font**) | `Populate to other layers: Select layers` | **không có key riêng** — xem §6 |
| `field___populate_color_targets` (trên layer **Color**) | `Populate to other layers: Select layers` | **không có key riêng** — xem §6 |

## 1. `Browse values` — modal `Available values`

Mở bằng link `Browse values` (`#field__lookup_value_helper a`).
Header: *"Find the value format you need, then copy and paste it into the "Value" field."*
Có 1 dropdown chọn **13 nhóm nguồn**, footer `View more values and instructions`.

13 nhóm: `Street Maps` · `Star Maps` · `Text & Curve Text` · `QR code` · `Song search` ·
`Moon Phase - Date` · `Moon Phase - Location` · `JSON List` · `Route Maps` · `Clock` ·
`Clipart Category` · `Group of Clipart Categories` · `Calendar`

Nội dung nguyên văn (rút gọn phần mô tả dài):

- **Street Maps** — `{{lat}}, {{lng}}` (number) · `{{lat:dd}}, {{lng:dd}}` (Decimal Degrees) ·
  `{{lat:dms}}, {{lng:dms}}` (Degrees, Minutes, Seconds) · `{{lat:dmm}}, {{lng:dmm}}` (Degrees & Decimal Minutes) ·
  `{{name}}` (Search keyword) · `{{place_name}}` (full Location)
- **Star Maps** — như Street Maps **+** `{{time}}` — *"return the Date & time that buyers selected (eg. 2024-11-07T12:31). Use "Date picker" format to show date only."* (có nút `Format`)
- **Text & Curve Text** — xem §4
- **QR code** — `{{value}}`
- **Song search** — `{{title}}` · `{{artists}}` · `{{url}}` *(Spotify URL, can use with QR code)* · `{{duration}}` · `{{lyrics}}` *(must enable "Load song lyrics" in Song Search layer)*
- **Moon Phase - Date** — `{{date}}` (+ `Format`)
- **Moon Phase - Location** — `{{name}}` · `{{lat}}, {{lng}}`
- **JSON List** — `{{name}}` *(always present)* · `{{field}}` — *"replace field with any other key from your JSON items (eg. {{address}}, {{mascot}})… Load a preview on the JSON List layer to see the exact field names available."*
- **Route Maps** — `{{route_distance}}` / `:m` / `:mi` · `{{elevation_gain}}` / `:ft` · `{{elevation_loss}}` / `:ft` ·
  `{{route_start_point.lat}}, {{route_start_point.lng}}` · `{{route_end_point.lat}}, {{route_end_point.lng}}` ·
  `{{route_start_date}}` · `{{route_end_date}}`
- **Clock** — `{{time}}` (+ `Format`)
- **Clipart Category** — `{{name}}`
- **Group of Clipart Categories** — `{{name}}`
- **Calendar** — `{{date}}` (+ `Format`)

Evidence: `shots/POP-02-browse-values.png`

## 2. Layer Font & Color — nguồn của Populate

Layer `font` (`layer-965490`) và `color` (`layer-465176`) đã có sẵn trong artwork 4087.
Cả hai có mô tả riêng ở đầu panel PERSONALIZATION:

- Font: *"This font option appears on the personalization form and can be reused by text-based layers through retrieval."*
- Color: *"This color option appears on the personalization form and can be reused by text-based layers through retrieval."*

Layer Color có `Color options:` = `Solid` / `Color category` / `Color Sequence categories` / `Color picker`
(đã lưu `color_option: "color_picker_option"`).

## 3. `Populate Font` — cảnh báo Google Font vs Custom Font (`ACT-03-01-001`)

### 3.1 Khi layer đang để **Google Font** (mặc định `Roboto (regular)`)

- Toggle `Populate Font from another option` **bị disable**:
  `<label class="vue-js-switch disabled">` + `<input disabled>`.
- Ngay dưới nhãn có dòng cảnh báo nguyên văn:
  **`Must change from Google Font to Custom Font to use this feature`**
- Không có field `Select a Font option` nào được render (`field__retrieval_styles.font.layer` không tồn tại).

Evidence: `shots/POP-01-populate-values-google-font.png`

### 3.2 Sau khi đổi `Font type` sang **Custom Fonts**

Font picker trên toolbar: `Font type: ( ) Google Fonts  ( ) Custom Fonts`.
Ngay khi chọn `Custom Fonts` (chưa cần chọn font cụ thể):

- Dòng cảnh báo **biến mất hoàn toàn**.
- Toggle chuyển sang enable (`class="vue-js-switch"`, không còn `disabled`).
- Toolbar hiển thị `Empty fonts!!!` cho tới khi chọn font qua `+ Select a font`.

Bật toggle → xuất hiện `Select a Font option:` (chỉ có layer `Font`) và
`Values:` = input **disabled** giá trị `{{font}}`.

Evidence: `shots/POP-03-font-picker.png` (Google Fonts) · `shots/POP-04-custom-font-selected.png` (Custom Fonts)

### 3.3 Cơ chế lưu trong JSON

```json
"typography_type": "google",  // layer text (layer-832429) — vẫn Google Font
"typography":   { "size": 100, "family": "Roboto", "variant": "regular" },
"custom_font":  { "size": 100 }
```

```json
"typography_type": "custom",  // layer curve-text (layer-154358) — đã đổi Custom Font
"typography":   { "size": 100, "family": "Roboto", "variant": "regular" },
"custom_font":  { "url": "users/266/fonts/6aa21bae4fb5f.woff2", "size": 100, "family": "QA Renamed Baginda" }
```

→ Gate của Populate Font là `typography_type === "custom"` (OBSERVED, chưa confirm với dev).
Custom font dùng: `QA Renamed Baginda` (3 custom font có sẵn: `QA Renamed Baginda`, `Bebas Neue`, `Dear Sans_Condensed Regular`).

## 4. `Populate Content` giữa 2 layer text (`ACT-03-02-001`)

Layer nhận: `curve-text` (`layer-154358`). Bật `Populate Content from another option` →
xuất hiện `Source option:` + `Value:` + nút `+ Available Value`.

### 4.1 Danh sách `Source option` (13 mục, không mục nào disabled)

`Pet name / Text layer` · `OPT maps / Maps layer` · `OPT route-maps / Route Maps layer` ·
`OPT star-maps / Star Maps layer` · `OPT moon-phase (Moon Phase - Location) / Enter a location (Moon Phase - Location)` ·
`OPT moon-phase (Moon Phase - Date) / Moon phase layer (Moon Phase - Date)` ·
`OPT song-search / Song search` · `OPT calendar / Calendar` · `OPT qr-code / QR Code layer` ·
`OPT clock / Clock layer` · `OPT json-list / JSON List` ·
`OPT clipart-category / 2_tay_xanh_cheo_nhau` · `OPT group-clipart-categories / 2_tay_xanh_cheo_nhau`

Một layer `moon-phase` sinh ra **2 option nguồn** (Location và Date).

### 4.2 `+ Available Value` khi nguồn là layer Text — 11 template

```
{{value}}                                          - return the Value that buyers entered in the input field of the Text layer.
{{value.Xchar}}                                    - limit the characters of the value, replace X with the maximum number of characters you want. (eg. {{value.3char}}).
{{value.capitalonly}}                              - take only the capitalized characters from the value that buyers entered (eg. "JOhN Doe" -> "JOND").
{{value.initialofword}}                            - take the initial of each word that buyers entered (eg. "Amelia & michale" -> "A&m").
{{value.initialofword.exclsymbol}}                 - take the initial of each word without symbol that buyers entered (eg. "Amelia & michale" -> "Am").
{{value.initialofword.capitalize}}                 - take the initial of word that buyers entered and capitalize it (eg. "Amelia & michale" -> "A&M").
{{value.initialofword.capitalize.exclsymbol}}      - take the initial of word without symbol that buyers entered and capitalize it (eg. "Amelia & michale" -> "AM").
{{value.firstword}}                                - take the first word of the value that buyers entered (eg. "john Doe" -> "john").
{{value.lastword}}                                 - take the last word of the value that buyers entered (eg. "john Doe" -> "Doe").
{{value.context.<from>To<to>}}                     - convert the number that buyers entered from one time unit to another, replace <from> and <to> with year, month, week, day, hour, minute or second (eg. {{value.context.yearToMonth}} turns "40" into "480").   [có nút Format]
{{value.formula(<expression>)}}                    - calculate a new number from the value that buyers entered, replace <expression> with a formula that uses origin for their value and combines +, -, x, / and parentheses (eg. {{value.formula((origin+8)x20/3)}} turns "40" into "320").   [có nút Format]
```

Click 1 item → chèn nguyên văn vào input `#retrieval_value`. Đã chọn `{{value.firstword}}`.

## 5. `Populate Shape` ở Word Cloud (`ACT-03-03-001`)

Panel POPULATE VALUES của `word-cloud` chỉ có **2** toggle:
`Populate Content from another option` và `Populate Shape from another option`
(**không có** Font / Color / Background).

Bật `Populate Shape` → `Select a Clipart category:` với đúng **2** option:
`OPT clipart-category / 2_tay_xanh_cheo_nhau` và `OPT group-clipart-categories / 2_tay_xanh_cheo_nhau`.
`Values:` = input **disabled**, giá trị `{{shape}}`.

## 6. Chiều ngược lại: `Populate to other layers → Select layers` (`ACT-03-04-001`)

### 6.1 Trên layer **Font** (`#field___populate_font_targets`) — 9 target

Khi mọi layer text còn dùng Google Font, **cả 9 option đều `multiselect__option--disabled`**
(`data-select="false" data-deselect="false"`), mỗi option kèm dòng vàng
`<small class="d-block text-warning">Change this layer to Custom Fonts to populate font</small>`:

`Pet name / Text layer` · `OPT curve-text / Curve text layer` · `OPT calendar / Calendar` ·
`OPT shape-text / Custom Shape` · `OPT warp-text / Warp text` · `OPT spiral-text / Spiral layer` ·
`OPT paragraph / Paragraph` · `OPT scrabble-crossword / Scrabble` · `OPT scrabble-single-line / Scrabble`

Sau khi đổi `curve-text` sang Custom Font: **chỉ mục `OPT curve-text` hết disabled**, 8 mục còn lại vẫn disabled.

### 6.2 Trên layer **Color** (`#field___populate_color_targets`) — 12 target, không mục nào disabled

`Pet name / Text layer` · `OPT curve-text / Curve text layer` · `OPT calendar / Calendar` ·
`qa-vector / qa-vector` (layer `static-vector`) · `OPT vector-category / qa-vector` · `OPT vector-upload / qa-vector` ·
`OPT shape-text / Custom Shape` · `OPT warp-text / Warp text` · `OPT spiral-text / Spiral layer` ·
`OPT paragraph / Paragraph` · `OPT scrabble-crossword / Scrabble` · `OPT scrabble-single-line / Scrabble`

Layer type **không** nằm trong danh sách target của Color: `word-search`, `word-cloud`, `song-search`,
`qr-code`, `clock`, `maps`, `route-maps`, `star-maps`, `moon-phase`, `text-to-image`, `photo`,
`multiple-uploads`, `static-photo`, `clipart-category`, `group-clipart-categories`, `dynamic-by-text`,
`clipart-frame`, `json-list`, `toggle`, `additional-option`, `addon-charge`, `font`, `color`, `paragraph`(có).

Khi list rỗng, placeholder là `No compatible layer`.

### 6.3 Hai chiều là **cùng một dữ liệu**

- Sau khi bật `Populate Font/Color` **trên layer curve-text**, mở lại layer Font/Color thì
  `OPT curve-text / Curve text layer` **đã hiện sẵn dạng tag đã chọn** trong `Populate to other layers`.
- Chọn thêm `OPT paragraph / Paragraph` **từ phía layer Color** → sau khi save,
  layer `paragraph` (`layer-859484`) mọc ra `retrieval_styles.color`.

→ `Populate to other layers` **không sinh key riêng** trên layer Font/Color; nó ghi
`retrieval_styles.<style>` vào **layer đích**. Xác nhận bằng JSON ở §7 — layer `font` và `color`
sau khi save **không có bất kỳ key `retrieval_*` hay `_populate_*` nào**.

## 7. JSON `retrieval_*` / `retrieval_styles` thật (đọc lại qua GraphQL)

Query: `POST https://staging-graphql.teeinblue.com/v1/graphql`
body `{"query":"{ artworks(where:{id:{_eq:4087}}) { templates } }"}`

Chỉ **5/35** layer có key `retrieval_*`:

```json
[
  {
    "id": "layer-154358",
    "type": "curve-text",
    "name": "Curve text layer",
    "retrieval_layer": "layer-832429",
    "retrieval_value": "{{value.firstword}}",
    "retrieval_styles": {
      "font": {
        "layer": "layer-965490",
        "enabled": true
      },
      "color": {
        "layer": "layer-465176",
        "enabled": true
      },
      "background": {
        "enabled": false
      }
    },
    "retrieval_value_enabled": true
  },
  {
    "id": "layer-958361",
    "type": "word-cloud",
    "name": "Word Cloud",
    "retrieval_styles": {
      "shape": {
        "layer": "layer-348502",
        "enabled": true
      }
    }
  },
  {
    "id": "layer-859484",
    "type": "paragraph",
    "name": "Paragraph",
    "retrieval_styles": {
      "color": {
        "layer": "layer-465176",
        "enabled": true
      }
    }
  },
  {
    "id": "layer-244735",
    "type": "dynamic-by-text",
    "name": "2_tay_xanh_cheo_nhau",
    "retrieval_layer": "layer-832429",
    "retrieval_value": "{{value}}"
  },
  {
    "id": "layer-347618",
    "type": "clipart-frame",
    "name": "Dynamic Clipart by Text",
    "retrieval_layer": "layer-832429",
    "retrieval_value": "{{value}}"
  }
]
```

Layer **Font** và **Color** sau save (đầy đủ, không cắt) — **không có key retrieval nào**:

```json
{ "id": "layer-965490", "name": "Font", "type": "font", "locked": false, "clipart": 6011,
  "visible": true, "form_label": "OPT font", "layer_display": "form_only",
  "schema_version": 2, "customization_type": "normal" }
```
```json
{ "id": "layer-465176", "name": "Color", "type": "color", "locked": false,
  "visible": true, "form_label": "OPT color", "color_option": "color_picker_option",
  "layer_display": "form_only", "schema_version": 2, "customization_type": "normal" }
```

### 7.1 Đọc được từ shape (OBSERVED)

- `retrieval_layer` = **layer id của layer nguồn** (`layer-832429` = layer `text` "Pet name"), không phải option id.
- `retrieval_value` = chuỗi template nguyên văn (`{{value.firstword}}`, `{{value}}`).
- `retrieval_value_enabled` chỉ xuất hiện khi bật `Populate Content` qua panel POPULATE VALUES.
  `dynamic-by-text` và `clipart-frame` có `retrieval_layer`/`retrieval_value` **nhưng KHÔNG có**
  `retrieval_value_enabled` — chúng dùng chung 2 key này cho field `Select a source text option` /
  `Value to populate` ở panel PERSONALIZATION (xem Task 1), tức **2 UI khác nhau ghi chung 2 key**.
- `retrieval_styles` là object các style channel: `font` · `color` · `background` · `shape`.
  Mỗi channel chỉ có `{ layer, enabled }`.
- **`retrieval_styles.<channel>.value` KHÔNG được lưu**, dù UI có field `Values:` hiển thị
  `{{font}}` / `{{color}}` / `{{shape}}` — các input đó đều `disabled`, chỉ để hiển thị.
- Channel bật toggle nhưng chưa chọn layer nguồn → lưu `{"enabled": false}` (trường hợp `background`
  của `layer-154358`: đã bật toggle, không chọn source, save ra `enabled:false`, không có key `layer`).
- `clipart` trên layer Font = **6011** = id font category `QA v3 Font Cat` vừa tạo.

## 8. NOT_VERIFIED

- Hành vi runtime trên storefront (giá trị có thực sự được populate hay không) — ngoài scope portal.
- `retrieval_styles.background` với source đã chọn — chỉ quan sát được trạng thái `enabled:false`, chưa lưu được bản có `layer`.
- Ý nghĩa `Format` button cạnh `{{value.context…}}`, `{{value.formula…}}`, `{{time}}`, `{{date}}` — chưa mở.
- Populate khi layer nguồn bị xoá / đổi type — chưa test.
- `retrieval_styles` của các type khác (`shape-text`, `warp-text`, `spiral-text`, `scrabble-*`, `calendar`,
  `static-vector`, `vector-*`) — chưa dựng sample nào; chỉ 1 sample mỗi channel → `confidence: LOW`.
