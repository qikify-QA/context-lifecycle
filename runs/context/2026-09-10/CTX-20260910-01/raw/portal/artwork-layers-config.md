# Artwork editor — layer type config surface (RAW, verbatim)

| | |
|---|---|
| Environment | **staging** `https://staging-portal.teeinblue.com` |
| Account / store | **Linh explorer** — `linh-explorer.myshopify.com` (JWT `sub=273`, `user_id=266`), plan **Blue (Test)** |
| Object | artwork **"QA - All layers explore v2"**, size 1600x1600, design format PNG_RGB |
| Captured | 2026-09-10 |
| knowledge_kind | `OBSERVED_CURRENT` — nguyên văn UI tại thời điểm capture, KHÔNG phải requirement |

**Cách capture mỗi type:** `Layer` (góc dưới panel trái) → popup `.add-layer-popup` "Select a layer type" → item (+ submenu nếu có) → [asset picker nếu type yêu cầu] → layer row `li.artwork-layer-item` → nút `la-pen` (Edit config) → bung đủ các accordion `.layer-panel` → đọc `.layer-panels` innerText.

**Toàn bộ evidence trong file này lấy từ account `Linh explorer` / `linh-explorer.myshopify.com`.** Không có block nào lấy từ `linh-tib-staging`.

> **Persistence:** thêm/xoá layer trong editor không gọi API; artwork chỉ ghi vào DB khi bấm `Save & Close`. Bản đã lưu của artwork này là **id `4085`** (27 layer). 8 type bị validation chặn save ở trạng thái default nên KHÔNG có trong 4085 — chi tiết ở `artwork-editor-actions.md` §7.

## Index — display name → `data-type`

| Group | Layer type | `data-type` | Default layer name |
|---|---|---|---|
| TEXT | Single-line Text | `text` | Text layer |
| TEXT | Paragraph › Normal | `paragraph` | Paragraph |
| TEXT | Paragraph › Custom Shape | `shape-text` | Custom Shape |
| TEXT | Curve Text | `curve-text` | Curve text layer |
| TEXT | Other › Warp Text | `warp-text` | Warp text |
| TEXT | Other › Spiral Text | `spiral-text` | Spiral layer |
| IMAGE | Static Image | `static-photo` | 2_tay_xanh_cheo_nhau |
| IMAGE | Clipart Category › 1 Clipart Category | `clipart-category` | 2_tay_xanh_cheo_nhau |
| IMAGE | Clipart Category › Group of clipart categories | `group-clipart-categories` | 2_tay_xanh_cheo_nhau |
| IMAGE | Photo Upload › Single Upload | `photo` | 2_tay_xanh_cheo_nhau |
| IMAGE | Photo Upload › Multiple Uploads | `multiple-uploads` | 2_tay_xanh_cheo_nhau |
| IMAGE | Text to Image (AI) | `text-to-image` | 2_tay_xanh_cheo_nhau |
| IMAGE | Dynamic Clipart by Text › Manual Placement | `dynamic-by-text` | 2_tay_xanh_cheo_nhau |
| IMAGE | Dynamic Clipart by Text › Auto Placement | `clipart-frame` | Dynamic Clipart by Text |
| VECTOR | Static Vector | `static-vector` | qa-vector |
| VECTOR | Vector Category | `vector-category` | qa-vector |
| VECTOR | Vector Upload | `vector-upload` | qa-vector |
| MAPS & ASTRONOMY | Street Maps | `maps` | Maps layer |
| MAPS & ASTRONOMY | Route Maps | `route-maps` | Route Maps layer |
| MAPS & ASTRONOMY | Star Maps | `star-maps` | Star Maps layer |
| MAPS & ASTRONOMY | Moon Phase | `moon-phase` | Moon phase layer |
| PUZZLES | Scrabble › Cross Word | `scrabble-crossword` | Scrabble |
| PUZZLES | Scrabble › Single-line | `scrabble-single-line` | Scrabble |
| PUZZLES | Word Search | `word-search` | Word Search |
| PUZZLES | Word Cloud | `word-cloud` | Word Cloud |
| OTHERS | Song Search | `song-search` | Song search |
| OTHERS | Calendar | `calendar` | Calendar |
| OTHERS | QR Code | `qr-code` | QR Code layer |
| OTHERS | Clock | `clock` | Clock layer |
| FORM ELEMENTS | Toggle Switch | `toggle` | Toggle |
| FORM ELEMENTS | Additional Option | `additional-option` | Additional option |
| FORM ELEMENTS | Addon Charge | `addon-charge` | Addon charge |
| FORM ELEMENTS | JSON List | `json-list` | JSON List |
| FORM ELEMENTS | Font | `font` | Font |
| FORM ELEMENTS | Color | `color` | Color |

---

# TEXT

## Single-line Text

- **`data-type`** = `text`
- Default layer name: `Text layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Single-line-Text.png`
- Accordion sections rendered: **DESIGN SETTINGS** (72 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (592 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default text (only for preview):
Enable prefix/suffix
Right to Left text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Allow customers to reposition text
Input type:
All characters (Aa Bb 123 @#$)
Only numbers (123)
Date picker
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Charge by Character count
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Attach customer input for fulfillment
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

## Paragraph › Normal

- **`data-type`** = `paragraph`
- Default layer name: `Paragraph`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Paragraph-Normal.png`
- Accordion sections rendered: **DESIGN SETTINGS** (96 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (457 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (222 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default paragraph (only for preview):
Enable prefix/suffix
Right to Left text
Remove line breaks
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Paragraph option:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder paragraph:
Prefill default paragraph to customers input
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Vertical offset in order design:
Group name:
```
</details>

## Paragraph › Custom Shape

- **`data-type`** = `shape-text`
- Default layer name: `Custom Shape`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Paragraph-Custom-Shape.png`
- Accordion sections rendered: **DESIGN SETTINGS** (74 chars) · **POPULATE VALUES** (246 chars) · **PERSONALIZATION SETTINGS** (457 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (222 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default paragraph (only for preview):
Select a shape:
Enable prefix/suffix
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
PERSONALIZATION SETTINGS
Paragraph option:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder paragraph:
Prefill default paragraph to customers input
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Vertical offset in order design:
Group name:
```
</details>

## Curve Text

- **`data-type`** = `curve-text`
- Default layer name: `Curve text layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Curve-Text.png`
- Accordion sections rendered: **DESIGN SETTINGS** (72 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (557 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default text (only for preview):
Enable prefix/suffix
Right to Left text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input type:
All characters (Aa Bb 123 @#$)
Only numbers (123)
Date picker
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Charge by Character count
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Attach customer input for fulfillment
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

## Other › Warp Text

- **`data-type`** = `warp-text`
- Default layer name: `Warp text`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)WarpPrint Effects`
- Screenshot: `raw/portal/shots/layer-Other-Warp-Text.png`
- Accordion sections rendered: **DESIGN SETTINGS** (53 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (538 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default text (only for preview):
Enable prefix/suffix
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Text option:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input type:
All characters (Aa Bb 123 @#$)
Only numbers (123)
Date picker
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Charge by Character count
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Attach customer input for fulfillment
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

## Other › Spiral Text

- **`data-type`** = `spiral-text`
- Default layer name: `Spiral layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Other-Spiral-Text.png`
- Accordion sections rendered: **DESIGN SETTINGS** (143 chars) · **POPULATE VALUES** (246 chars) · **PERSONALIZATION SETTINGS** (415 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default spiral text (only for preview):
Inner radius (enter number from 20):
Text direction:
Begin at inner
Begin at outer
Enable prefix/suffix
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
PERSONALIZATION SETTINGS
Type of text path:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder spiral text:
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Input text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Text character limit:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>


---

# IMAGE

## Static Image

- **`data-type`** = `static-photo`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Static-Image.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (50 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload an image
Choose from clipart category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
Empty data
Loading..
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Clipart Category › 1 Clipart Category

- **`data-type`** = `clipart-category`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Clipart-Category-1-Clipart-Category.png`
- Accordion sections rendered: **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (471 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Clipart fit mode:
Contain (scale to fit)
Cover (stretch to fit)
Select one clipart category*:
Search
Search top-level category
 New category
Clipart category’s default value:
Show option to select default value
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload an image
Choose from clipart category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Clipart Category › Group of clipart categories

- **`data-type`** = `group-clipart-categories`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Clipart-Category-Group-of-clipart-categories.png`
- Accordion sections rendered: **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (473 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Clipart fit mode:
Contain (scale to fit)
Cover (stretch to fit)
Select a group of clipart categories*:
Search
Search top-level category
Group’s default value:
Show option to select default value
Placeholder text:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload an image
Choose from clipart category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Loading..
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Photo Upload › Single Upload

- **`data-type`** = `photo`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Photo-Upload-Single-Upload.png`
- Accordion sections rendered: **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (475 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Upload editor:
Direct upload, no editor
Photo Cropper
Photo Reposition
Direct upload style:
Contain (scale to fit)
Fill (stretch to fit)
Show customer’s photo on live preview
Set minimum size
Image effects:
Add new
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Photo Upload › Multiple Uploads

- **`data-type`** = `multiple-uploads`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Photo-Upload-Multiple-Uploads.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (442 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Option Title:
Output Type:
Single Output
Multiple Outputs (coming soon)
Maximum photos*:
Upload editor:
Direct upload, no editor
Photo Reposition
GenAI service*:
Select a service
Gemini
OpenAI
Flux
ImagenHub
Image effects after generating:
Add new
Fit mode:
Contain (scale to fit)
Fill (stretch to fit)
Show customer’s photo on live preview
Set minimum size
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Text to Image (AI)

- **`data-type`** = `text-to-image`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Text-to-Image-AI-.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (365 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Option Title:
GenAI service*:
Select a service
[Gemini] Text to image
[OpenAI] Text to image
[Flux] Text to image
[ImagenHub] Text to image
Image effects after generating:
Add new
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Dynamic Clipart by Text › Manual Placement

- **`data-type`** = `dynamic-by-text`
- Default layer name: `2_tay_xanh_cheo_nhau`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/9","clicked \"Select 1 image\""]`
- Screenshot: `raw/portal/shots/layer-Dynamic-Clipart-by-Text-Manual-Placement.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (312 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Select a source text option*:
Select an option
Value to populate*:
Available Value
Dynamic clipart source:
1 Clipart category
1 Group Clipart category
Select one clipart category*:
Search
Search top-level category
 New category
Custom class:
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload an image
Choose from clipart category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
2_tay_xanh_cheo_nhau
1600x1600
Sep 9
top
1600x1600
Sep 9
hair
1600x1600
Sep 9
body
1600x1600
Sep 9
cat1
1600x1600
Sep 9
cat2
1562x1562
Sep 9
cat3
1562x1562
Sep 9
cat_mom_BG
1600x2400
Sep 9
white-bg
250x355
Sep 9
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Dynamic Clipart by Text › Auto Placement

- **`data-type`** = `clipart-frame`
- Default layer name: `Dynamic Clipart by Text`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Print Effects`
- Screenshot: `raw/portal/shots/layer-Dynamic-Clipart-by-Text-Auto-Placement.png`
- Accordion sections rendered: **DESIGN SETTINGS** (53 chars) · **PERSONALIZATION SETTINGS** (204 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default text:
Direction:
Horizontal
Vertical
Gap (%):
PERSONALIZATION SETTINGS
Dynamic clipart source:
1 Clipart category
1 Group of Clipart categories
Select one clipart category*:
Search
 New category
Select a source text option*:
Select an option
Value to populate*:
Custom class:
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>


---

# VECTOR

## Static Vector

- **`data-type`** = `static-vector`
- Default layer name: `qa-vector`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Print Effects`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/1","clicked \"Select 1 vector\""]`
- Screenshot: `raw/portal/shots/layer-Static-Vector.png`
- Accordion sections rendered: **POPULATE VALUES** (34 chars) · **PERSONALIZATION SETTINGS** (50 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES
Populate Color from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
qa-vector
200x200
Sep 10
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Vector Category

- **`data-type`** = `vector-category`
- Default layer name: `qa-vector`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Print Effects`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/1","clicked \"Select 1 vector\""]`
- Screenshot: `raw/portal/shots/layer-Vector-Category.png`
- Accordion sections rendered: **POPULATE VALUES** (34 chars) · **PERSONALIZATION SETTINGS** (405 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES
Populate Color from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Select one vector category*:
Search
Search top-level category
 New category
Vector category’s default value:
Show option to select default value
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
qa-vector
200x200
Sep 10
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Vector Upload

- **`data-type`** = `vector-upload`
- Default layer name: `qa-vector`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Print Effects`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["selected tile 1/1","clicked \"Select 1 vector\""]`
- Screenshot: `raw/portal/shots/layer-Vector-Upload.png`
- Accordion sections rendered: **POPULATE VALUES** (34 chars) · **PERSONALIZATION SETTINGS** (300 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
POPULATE VALUES
Populate Color from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Upload editor:
Direct upload, no editor
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
qa-vector
200x200
Sep 10
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>


---

# MAPS & ASTRONOMY

## Street Maps

- **`data-type`** = `maps`
- Default layer name: `Maps layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["picked category","NO_CONFIRM buttons=Select|Move to category|Reload|+ New category|Save"]`
- Screenshot: `raw/portal/shots/layer-Street-Maps.png`
- Accordion sections rendered: **DESIGN SETTINGS** (99 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (357 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default Location (Latitude, Longitude):
Default zoom level:
Default Map styles URL:
Show Marker/Pin
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS

Read How to use Maps feature.

Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
"Enter location" label:
"Search location" placeholder:
Apply mask image
Allow customers to change map styles
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
Empty data
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Route Maps

- **`data-type`** = `route-maps`
- Default layer name: `Route Maps layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["picked category","NO_CONFIRM buttons=Select|Move to category|Reload|+ New category|Save"]`
- Screenshot: `raw/portal/shots/layer-Route-Maps.png`
- Accordion sections rendered: **DESIGN SETTINGS** (142 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (329 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Upload GPX default:
Choose a .gpx file
Default zoom level:
Default line color:
Default line thickness:
Default Map styles URL:
Show Marker/Pin
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Apply mask image
Allow customers to change elevation profile
Allow customers to change map styles
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
Empty data
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Star Maps

- **`data-type`** = `star-maps`
- Default layer name: `Star Maps layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint EffectsHD`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["picked category","NO_CONFIRM buttons=Select|Move to category|Reload|+ New category|Save"]`
- Screenshot: `raw/portal/shots/layer-Star-Maps.png`
- Accordion sections rendered: **DESIGN SETTINGS** (67 chars) · **PERSONALIZATION SETTINGS** (524 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default Location (Latitude, Longitude):
Default Star maps styles:
1


PERSONALIZATION SETTINGS

Read How to use star maps feature.

Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
"Enter location" label:
"Search location" placeholder:
"Pick a time" placeholder:
Apply mask image
Allow customers to show/hide Constellations
Allow customers to show/hide Constellations name
Allow customers to show/hide Milky Way
Allow customers to show/hide Grid lines
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
Empty data
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>

## Moon Phase

- **`data-type`** = `moon-phase`
- Default layer name: `Moon phase layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `BorderPrint Effects`
- Add flow **requires an asset picker** before the layer exists. Resolution steps used: `["picked category","NO_CONFIRM buttons=Select|Move to category|Reload|+ New category|Save"]`
- Screenshot: `raw/portal/shots/layer-Moon-Phase.png`
- Accordion sections rendered: **DESIGN SETTINGS** (111 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (295 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default date:
Default Location (Latitude, Longitude):
Moon type:
Round (Original)
Heart
Transparent
Moon color:
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Allow customers to change Location
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

<details><summary>Asset picker dialog — verbatim</summary>

```text
Upload a vector
Choose from vector category
All
	
+ New category
All
Drag and drop, or click to upload!
Do not close this page while uploading.
Use the Reload button below after image uploaded.
 
Reload
Empty data
Show
20
50
100
250
500
entries
‹
›
Move to category
Select
```
</details>


---

# PUZZLES

## Scrabble › Cross Word

- **`data-type`** = `scrabble-crossword`
- Default layer name: `Scrabble`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)Print Effects`
- Screenshot: `raw/portal/shots/layer-Scrabble-Cross-Word.png`
- Accordion sections rendered: **DESIGN SETTINGS** (84 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (459 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (218 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default words (only for preview)*:
2/10
Anne
×
Bravo
×
Show score
Right to Left text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input style:
Single field (split words by space)
Multiple fields (each field supports multiple words)
Max words:
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Vertical offset (% of cell):
Group name:
```
</details>

## Scrabble › Single-line

- **`data-type`** = `scrabble-single-line`
- Default layer name: `Scrabble`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)Print Effects`
- Screenshot: `raw/portal/shots/layer-Scrabble-Single-line.png`
- Accordion sections rendered: **DESIGN SETTINGS** (133 chars) · **POPULATE VALUES** (286 chars) · **PERSONALIZATION SETTINGS** (380 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (218 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default text (only for preview)*:
Show score
Right to Left text
Cell direction:
Vertical
Horizontal
Cell alignment:
Left
Center
Right
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
Populate Background from another option
PERSONALIZATION SETTINGS
Personalization Options:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input type:
All characters (Aa Bb 123 @#$)
Only numbers (123)
Custom rules
Text character limit:
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Vertical offset (% of cell):
Group name:
```
</details>

## Word Search

- **`data-type`** = `word-search`
- Default layer name: `Word Search`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)Print Effects`
- Screenshot: `raw/portal/shots/layer-Word-Search.png`
- Accordion sections rendered: **DESIGN SETTINGS** (85 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (459 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (232 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default words (only for preview)*:
2/30
Anne
×
Bravo
×
Regenerate layout
Min col/row:
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Input style:
Single field (split words by space)
Multiple fields (each field supports multiple words)
Max words:
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Vertical offset (% of cell):
Custom class:
Group name:
```
</details>

## Word Cloud

- **`data-type`** = `word-cloud`
- Default layer name: `Word Cloud`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)Print Effects`
- Screenshot: `raw/portal/shots/layer-Word-Cloud.png`
- Accordion sections rendered: **DESIGN SETTINGS** (202 chars) · **(unnamed)** (0 chars) · **POPULATE VALUES** (146 chars) · **PERSONALIZATION SETTINGS** (518 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default words (only for preview)*:
Regenerate layout
Number of words:
Enable custom shape
Shape source:
Use pre-designed shapes
Upload your own shape
Select a shape:
Use shape’s color
Right to Left text
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Shape from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Prefill default text to customer’s input
Input style:
Single field (split words by space)
Multiple fields (each field supports multiple words)
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Text case:
Normal
lowercase
UPPERCASE
Capitalize Each Word
Max words:
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>


---

# OTHERS

## Song Search

- **`data-type`** = `song-search`
- Default layer name: `Song search`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Song-Search.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (247 chars) · **CONDITIONAL SETTING** (120 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Add instruction for customer:
Load song lyrics
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
```
</details>

## Calendar

- **`data-type`** = `calendar`
- Default layer name: `Calendar`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Heebo(regular)Print Effects`
- Screenshot: `raw/portal/shots/layer-Calendar.png`
- Accordion sections rendered: **DESIGN SETTINGS** (380 chars) · **POPULATE VALUES** (246 chars) · **PERSONALIZATION SETTINGS** (260 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default date (only for preview)*:
Language(require supported fonts):
English
The first day of the week:
Monday
Sunday
Display the weekday name:
Abbreviation (eg. “M”)
Truncation (eg. “Mon”)
Display text case:
lowercase
UPPERCASE
Capitalize Each Word
Show “Month Year” header
Right to Left text
Enable marker
Marker(support PNG/JPG/SVG):
Browse
Color(only work if marker uses SVG):
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
Populate Font from another option

Must change from Google Font to Custom Font to use this feature

Populate Color from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

## QR Code

- **`data-type`** = `qr-code`
- Default layer name: `QR Code layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Print Effects`
- Screenshot: `raw/portal/shots/layer-QR-Code.png`
- Accordion sections rendered: **DESIGN SETTINGS** (40 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (305 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default URL/text*:

Max 4296 characters.

POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Placeholder text:
Input type:
All characters (Aa Bb 123 @#$)
Custom rules
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>

## Clock

- **`data-type`** = `clock`
- Default layer name: `Clock layer`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `Roboto(regular)8010012014018024030036048060072096020002400300036004800Print Effects`
- Screenshot: `raw/portal/shots/layer-Clock.png`
- Accordion sections rendered: **DESIGN SETTINGS** (151 chars) · **POPULATE VALUES** (111 chars) · **PERSONALIZATION SETTINGS** (260 chars) · **CONDITIONAL SETTING** (120 chars) · **(unnamed)** (0 chars) · **EXTRA** (189 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
DESIGN SETTINGS
Default time (only for preview):
Show outer circle
Marker layout:
Full numbers (1–12)
Numbers at 3·6·9·12
Numeral style:
Arabic numerals
Roman numerals
POPULATE VALUES

Let this layer receive values populated from other options.

Browse values
Populate Content from another option
PERSONALIZATION SETTINGS
Personalization for this layer:
No personalization
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Display this layer on:
Mockup Preview & Order design
Mockup Preview only (hide on Order Design)
Order Design only (hide on Preview)
None (personalization option still available)
Group name:
```
</details>


---

# FORM ELEMENTS

## Toggle Switch

- **`data-type`** = `toggle`
- Default layer name: `Toggle`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-toggle-on` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Toggle-Switch.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (342 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS

A toggle layer that can be used as a condition for showing/hiding other layers

Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Show option title
Option Title:
Toggle label:
Pre-enable toggle
Add instruction for customer:
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>

## Additional Option

- **`data-type`** = `additional-option`
- Default layer name: `Additional option`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Additional-Option.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (556 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS

This additional option will appear on personalization form, but no layer will show up on artwork. You can use this feature to create extra options which other layers can depend on

Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Select additional options category:
Search
Search top-level category
 New category
Default value:
Show option to select default value
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>

## Addon Charge

- **`data-type`** = `addon-charge`
- Default layer name: `Addon charge`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Addon-Charge.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (501 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS
Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Option values*:
Attach
Attach
Add new
Default value:
Show option to select default value
Display options as:
Inline Radio Button
Radio
Dropdown list
Thumbnail Images
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Enable multiple selection
Not applicable when 'Display options as' is set to 'Dropdown list'.
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>

## JSON List

- **`data-type`** = `json-list`
- Default layer name: `JSON List`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-JSON-List.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (716 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS

This layer loads a list of options from a JSON file you provide. No layer shows up on the artwork — buyers search and pick from your list on the personalization form.

Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
JSON File URL:
Load preview
Placeholder text:
Option display template:
Available Value
Preview (using the first item from your JSON file)
New York City
Cart display template:
Available Value
Preview (using the first item from your JSON file)
New York City
Default value (name):
-- Select a default value --
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>

## Font

- **`data-type`** = `font`
- Default layer name: `Font`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Font.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (467 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS

This font option appears on the personalization form and can be reused by text-based layers through retrieval.

Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Select one font category*:
Search
Search top-level category
 New category
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Populate to other layers:
Select layers
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>

## Color

- **`data-type`** = `color`
- Default layer name: `Color`
- Layer-row icon buttons: `.la-eye` · `.la-unlock` · `.la-pen` · `.la-copy` · `.la-trash-alt`
- Canvas toolbar `.qoverflow-menu` (raw): `(empty)`
- Screenshot: `raw/portal/shots/layer-Color.png`
- Accordion sections rendered: **PERSONALIZATION SETTINGS** (493 chars) · **CONDITIONAL SETTING** (120 chars) · **EXTRA** (11 chars)

<details><summary>Config panel `.layer-panels` — verbatim</summary>

```text
PERSONALIZATION SETTINGS

This color option appears on the personalization form and can be reused by text-based layers through retrieval.

Personalization for this layer:
Create a new option
Use an existing global option
Quick-fill from a global option
Option Title:
Color options:
Solid Color category
Color Sequence categories
Color picker
Select default value:
 
Add instruction for customer:
Mark this option as required
Show customization data on cart/checkout
Populate to other layers:
Select layers
Custom class:
CONDITIONAL SETTING
Show this layer and its option when:
All conditions match (AND)
Any conditions match (OR)
No conditions
+ Add conditions
EXTRA
Group name:
```
</details>
