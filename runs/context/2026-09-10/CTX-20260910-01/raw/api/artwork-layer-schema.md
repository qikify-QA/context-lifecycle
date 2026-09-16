# Artwork layer schema — UI control -> JSON field (staging)

`CTX-20260910-01` · producer `api-explorer` · env **staging** (`TIB_API_BASE`) · role: portal owner (`staff_id=273`, `user_id=266`, store `linh-explorer.myshopify.com`)

## Cách đọc / độ tin cậy

Ba nguồn evidence, **authority khác nhau** — cột `Source` cho biết field đến từ đâu:

| Source tag | Nghĩa | knowledge_kind |
|---|---|---|
| `OBSERVED(n/51)` | Key thực sự có mặt trong `artworks.templates` jsonb của artwork id 4081 đọc qua GraphQL. `n` = số layer chứa key | `OBSERVED_CURRENT` |
| `bundle-registry` | Field nằm trong 1 trong 2 bảng đăng ký layer-type của portal bundle (`tz`, `hS`) — đây là nguồn tốt nhất cho cột "layer type nào có" | `INFERRED` (từ code) |
| `bundle-descriptor` | Field có form-descriptor `{name,type,heading,default_value,options,dependency}` trong bundle — nguồn cho UI heading, kiểu widget, enum, default | `INFERRED` (từ code) |

**KHÔNG có OpenAPI/spec cho artwork** (§ đã thử, xem `artwork-api-surface.md`). Vì vậy **không field nào ở đây là `CONFIRMED_EXPECTED`**.
Chỉ 5 layer type được quan sát trên dữ liệu thật; phần còn lại là code-derived — xem "Coverage" ở cuối.

`default` là `default_value` khi portal **tạo mới** field, không phải "giá trị bắt buộc". Không suy `required`/`optional` từ bảng này.

## Bảng mapping

| UI control (heading) | JSON field | Kiểu | Giá trị hợp lệ | Default | Layer type nào có | Panel section | Source |
|---|---|---|---|---|---|---|---|
| — | `_global_option_quick_fill` | global_option_quick_fill | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Select additional options category | `additional_option` | additional_option | — | — | `additional-option` | Additional Option Setting, Personalization Settings | bundle-descriptor + bundle-registry |
| — | `addons` | addon_charge | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `align` | — | — | — | `curve-text`, `paragraph`, `shape-text`, `text` | — | bundle-registry + OBSERVED(12/51 layers) |
| Cell alignment | `align_horizontal` | string (enum) | `left`, `center`, `right` | center | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings | bundle-descriptor |
| — | `align_to` | string (enum) | — | artwork | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Cell alignment | `align_vertical` | string (enum) | `top`, `middle`, `bottom` | top | `paragraph`, `shape-text` | Design Settings | bundle-descriptor + bundle-registry |
| Allow customers to change sketch color | `allow_color_picker` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Apply color to sketch result | `apply_color_to_sketch_result` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `apply_for` | string (enum) | — | group | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Prefill default paragraph to customers input · Prefill default text to customer’s input | `autofill_default_value` | boolean | — | false | 9 types: `curve-text`, `paragraph`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `text`, `warp-text`, `word-cloud`, `word-search` | Personalization Setting | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| — | `autoscale_enabled` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(12/51 layers) |
| — | `autoscale_max_width` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(8/51 layers) |
| Select a clipart category | `background_clipart` | clipart | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| Allow customers to change cell background · Allow customers to change text background | `background_clipart_enabled` | boolean | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| — | `background_clipart_label` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| Enable cell background · Enable text background | `background_enabled` | boolean | — | true, false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| Default background image · Default cell background image | `background_image` | image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| Marker | `background_marker` | image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| — | `background_remover_image_support` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose a background remover service | `background_remover_name` | string (enum) | `remove.bg`, `cutout.pro`, `teeinblue` | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `background_remover_title` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Blend Mode | `blend_mode` | multiselect | `normal`, `darken`, `multiply`, `color-burn`, `lighten`, `screen`, `color-dodge`, `plus-lighter`, `overlay`, `soft-light`, `hard-light`, `difference`, `exclusion`, `hue`, `saturation`, `color` | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `blend_mode_warn` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Cart display template | `cart_template` | json_cart_template / value_template | — | {{name}}, {{title}} | `json-list`, `song-search` | Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry |
| — | `category_display_type` | string (enum) | `image`, `text`, `dropdown`, `radio`, `radio_button` | image | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Additional Charge | `charge_enabled` | boolean | — | true | `addon-charge` | Personalization Settings | bundle-descriptor + bundle-registry |
| Display sub-category of this category as | `children_display_type` | string (enum) | `0`, `1`, `2`, `3` | 0 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Select one clipart category · Select one color category · Select one font category · Select one vector category | `clipart` | clipart / color_category / font_category / vector | — | — | `clipart-category`, `color`, `font`, `vector-category` | Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry + OBSERVED(3/51 layers) |
| Clock style | `clock_style` | string (enum) | `digital`, `roman` | digital | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| — | `color` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(12/51 layers) |
| Select one color category | `color_category` | color_category | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization, Personalization Setting | bundle-descriptor |
| — | `color_display_type` | string (enum) | `radio`, `colorswatch` | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Color | `color_marker` | string (hex) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| — | `color_opacity` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(8/51 layers) |
| Color options | `color_option` | string (enum) | `color_category_option`, `color_picker_option`, `scheme_color` | color_picker_option | `color` | Personalization, Personalization Setting, Personalization Settings | bundle-descriptor + bundle-registry |
| Color sketch | `color_sketch` | string (hex) | — | #000000 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Color | `color_sketch_image_filter` | string (hex) | — | #000000 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Use shape’s color | `color_source` | boolean | — | shape | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| — | `contour_display` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `current_model` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `curve_enabled` | — | — | — | `curve-text` | — | bundle-registry |
| — | `curve_radius` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(4/51 layers) |
| — | `custom_class` | — | — | — | 29 types: `additional-option`, `addon-charge`, `calendar`, `clipart-category`, `clock`, `color`, `curve-text`, `font`, `group-clipart-categories`, `json-list`, `maps`, `moon-phase`, `paragraph`, `photo`, `qr-code`, `route-maps`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `song-search`, `spiral-text`, `star-maps`, `text`, `text-to-image`, `toggle`, `vector-category`, `vector-upload`, `warp-text`, `word-cloud` | Extra, Personalization settings | bundle-registry |
| — | `custom_font` | custom_font | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor + OBSERVED(12/51 layers) |
| Allow customers to change Font | `custom_font_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| Artwork size | `custom_size` | radio_boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Block rendering when preview and production file ratio mismatch exceeds (%) | `custom_threshold_face_cutout` | number | — | 4 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Paragraph option · Personalization Options · Personalization for this layer · Text option · Type of text path | `customization_type` | string (enum) | `no_customization`, `normal`, `global_option`, `linked` | true, no_customization, normal | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings, Personalization settings | bundle-descriptor + OBSERVED(13/51 layers) |
| Cutout.pro  API key | `cutout_pro_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `cutout_pro_api_key_instruction` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `cutout_pro_image_support` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `cutout_pro_instruction` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Use the photo's original size for both Preview & Production file (for FaceCutout) | `cutout_pro_master_only` | boolean | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Apply Photo Enhancer on | `cutout_pro_photo_enhancer_display` | string (enum) | `mockup_order`, `order` | mockup_order | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Default Location (Latitude, Longitude) | `default_location` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Clipart category’s default value · Default value · Default value (name) · Group’s default value · Pre-enable toggle · Select default value · Vector category’s default value | `default_value` | additional_option_default_value / addon_charge_default_value / boolean / clipart_default_value / color_default_value / colorpicker / grouped_clipart_default_value / grouped_color_default_value / json_default_value | — | true | `additional-option`, `addon-charge`, `clipart-category`, `color`, `group-clipart-categories`, `json-list`, `toggle`, `vector-category` | Additional Option Setting, Addon charge settings, Personalization Settings | bundle-descriptor + bundle-registry + OBSERVED(5/51 layers) |
| Clipart fit mode | `direct_clipart_style` | string (enum) | `contain`, `cover` | cover | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor + OBSERVED(8/51 layers) |
| Direct upload style · Fit mode | `direct_upload_style` | string (enum) | `contain`, `cover` | contain, cover | `photo` | Personalization Settings | bundle-descriptor + bundle-registry + OBSERVED(1/51 layers) |
| Cell direction · Direction · Text direction | `direction` | string (enum) | `out`, `in`, `vertical`, `horizontal`, `row`, `column` | column, out, vertical | `spiral-text` | Design Settings, General | bundle-descriptor + bundle-registry |
| — | `display_shadow` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Display text case | `display_text` | string (enum) | `lowercase`, `uppercase`, `capitalize` | uppercase | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Display Template options as · Display options as | `display_type` | string (enum) | `select`, `radio`, `radio_button`, `dropdown`, `image` | radio_button, select | `addon-charge` | Personalization Settings | bundle-descriptor + bundle-registry |
| Dynamic clipart source | `dynamic_clipart_type` | string (enum) | `clipart`, `grouped_clipart` | clipart | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization settings | bundle-descriptor |
| Personalization Options | `editable` | radio_boolean | — | true, false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| Image effects · Image effects after generating | `effect_title` | unknown | — | — | `photo`, `text-to-image` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `effects` | repeater | — | — | `photo`, `text-to-image` | Personalization Settings | bundle-descriptor + bundle-registry |
| Default elevation profile color | `elevation_profile_color` | colorpicker | — | — | `route-maps` | — | bundle-descriptor + bundle-registry |
| Allow customers to change elevation profile | `elevation_profile_enabled` | boolean | — | — | `route-maps` | — | bundle-descriptor + bundle-registry |
| “Elevation multipler” label | `elevation_profile_label` | string | — | Elevation multipler | `route-maps` | — | bundle-descriptor + bundle-registry |
| Default elevation profile size | `elevation_profile_size` | string (enum) | `small`, `medium`, `large` | — | `route-maps` | — | bundle-descriptor + bundle-registry |
| Display options on personalization form as | `elevation_profile_type` | string (enum) | `image`, `text`, `dropdown`, `radio`, `radio_button` | image | `route-maps` | — | bundle-descriptor + bundle-registry |
| Emboss service | `emboss_provider` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| ImagenHub template | `emboss_template_id` | imagenhub_template_id | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Enable contour | `enable_contour` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Enable photo cropper | `enable_cropper` | boolean | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Enable multiple selection | `enable_multiple_selection` | boolean | — | false | `addon-charge` | Personalization Settings | bundle-descriptor + bundle-registry |
| Remove paper background | `enable_transparent_bg` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `etsy_effect_warning` | title | — | — | `photo`, `text-to-image` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `etsy_listing_manual_production_partner` | etsy_production_partner_selector | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| All characters except | `except_chars` | tags | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| Delete orders after | `expired_time` | string (enum) | `0`, `30`, `90`, `180`, `365` | 0 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| The first day of the week | `first_day` | string (enum) | `1`, `0` | 1 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Fit mode | `fit_mode` | string (enum) | `contain`, `cover` | contain, cover | `photo` | Personalization Settings | bundle-descriptor + bundle-registry + OBSERVED(1/51 layers) |
| — | `flip_horizontal_enabled` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(18/51 layers) |
| — | `flip_vertical_enabled` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(18/51 layers) |
| Flux Kontext API key | `flux_kontext_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose model for Flux Kontext service | `flux_kontext_model` | string (enum) | `flux_max`, `flux_pro` | flux_pro | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Flux output height (px) | `flux_output_height` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Flux output width (px) | `flux_output_width` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `flux_v1_warning` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose Flux Kontext version | `flux_version` | string (enum) | `v1` | v1 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `flux_warning_change_version` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Select one font category | `font_category` | font_category | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| — | `font_category_instruction` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| — | `font_category_label` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Setting | bundle-descriptor |
| Character rules: | `font_character_config` | font_character_config | — | — | 11 types: `curve-text`, `paragraph`, `qr-code`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `spiral-text`, `text`, `warp-text`, `word-cloud`, `word-search` | Personalization Setting | bundle-descriptor + bundle-registry |
| Fonts used in the cloud | `fonts` | font_list | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Custom date format | `form_input_custom_date_format` | string | — | — | `curve-text`, `text` | — | bundle-descriptor + bundle-registry |
| Display in date format | `form_input_date_format` | multiselect | `MM/dd/yyyy`, `dd/MM/yyyy`, `dd-MM-yy`, `yyyy-MM-dd`, `yyyy/MM/dd`, `dd.MM.yyyy`, `MM.dd.yyyy`, `custom` | MM/dd/yyyy | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| — | `form_input_date_instruction` | title | — | — | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| Input text case · Text case | `form_input_textcase` | string (enum) | `none`, `lowercase`, `uppercase`, `capitalize` | none, uppercase | `curve-text`, `paragraph`, `shape-text`, `spiral-text`, `text`, `warp-text`, `word-cloud` | Personalization Setting | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| Input type | `form_input_type` | string (enum) | `text`, `number`, `date`, `custom` | text | 11 types: `curve-text`, `paragraph`, `qr-code`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `spiral-text`, `text`, `warp-text`, `word-cloud`, `word-search` | Personalization Setting | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| Option Title | `form_label` | string | — | Choose Quote - {{character}}, Enter a location | 30 types: `additional-option`, `addon-charge`, `calendar`, `clipart-category`, `clock`, `color`, `curve-text`, `font`, `group-clipart-categories`, `json-list`, `maps`, `moon-phase`, `paragraph`, `photo`, `qr-code`, `route-maps`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `song-search`, `spiral-text`, `star-maps`, `text`, `text-to-image`, `toggle`, `vector-category`, `vector-upload`, `warp-text`, `word-cloud`, `word-search` | Additional Option Setting, Personalization Setting, Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry + OBSERVED(11/51 layers) |
| Placeholder paragraph · Placeholder spiral text · Placeholder text | `form_placeholder` | string | — | — | 15 types: `addon-charge`, `curve-text`, `group-clipart-categories`, `json-list`, `paragraph`, `qr-code`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `song-search`, `spiral-text`, `text`, `warp-text`, `word-cloud`, `word-search` | Addon charge settings, Personalization Setting, Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry + OBSERVED(1/51 layers) |
| Clock option · Display options as · Personalization Options · Text option | `form_type` | string (enum) | `radio_button`, `radio`, `dropdown`, `image`, `text`, `linked`, `static`, `clipart`, `grouped_clipart`, `photo`, `maps`, `star_maps`, `route_maps`, `dynamic_by_text`, `crossword`, `single_line`, `vector`, `vector_upload`, `calendar`, `clock`, `moon_phase` | calendar, clock, crossword, moon_phase, radio_button, static, text | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Addon charge settings, General, Personalization | bundle-descriptor |
| Add a toggle to show/hide this layer | `form_visibility` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization, Personalization Setting | bundle-descriptor |
| Pre-enable toggle (show layer by default) | `form_visibility_value` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization, Personalization Setting | bundle-descriptor |
| Fulfilled key | `fulfilled_key` | string | — | — | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| Attach customer input for fulfillment | `fulfilled_key_enabled` | boolean | — | false | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| Gap (%) | `gap_percent` | number | — | 0 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings | bundle-descriptor |
| Gemini API key | `gemini_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose model for Gemini Nano Banana service | `gemini_model` | string (enum) | `nano_banana`, `nano_banana_pro`, `nano_banana_31` | nano_banana | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Resolution | `gemini_resolution` | string (enum) | — | 2K | `text-to-image` | — | bundle-descriptor + bundle-registry |
| — | `global_id` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(34/51 layers) |
| Select a global option | `global_option` | global_option_selector | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings, Personalization settings | bundle-descriptor + OBSERVED(9/51 layers) |
| OpenAI (GPT) Image API key | `gpt_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Remove background (transparent) | `gpt_background` | boolean | — | false | `text-to-image` | — | bundle-descriptor + bundle-registry |
| Choose model for OpenAI (GPT) Image service | `gpt_model` | string (enum) | `gpt-image-1`, `gpt-image-1.5`, `gpt-image-2` | gpt-image-1 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose quality for OpenAI (GPT) Image service | `gpt_quality` | string (enum) | `low`, `medium`, `high` | medium | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Resolution | `gpt_resolution` | string (enum) | — | 1024 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `group_id` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(45/51 layers) |
| Select a group of clipart categories · Select a group of color categories | `grouped_clipart` | grouped_clipart / grouped_color | — | — | `color`, `group-clipart-categories` | Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| — | `grouped_reposition` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(4/51 layers) |
| Show “Month Year” header | `header_enabled` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| — | `height` | — | — | — | `paragraph`, `shape-text`, `spiral-text`, `warp-text` | — | bundle-registry + OBSERVED(27/51 layers) |
| — | `id` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(51/51 layers) |
| Use Reference Image | `image_filter_enable_ref_img` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Prompt the style you want | `image_filter_prompt` | image_filter_prompt | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Choose a default AI service | `image_generation_name` | string (enum) | `gpt`, `flux_kontext`, `gemini` | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `image_generation_note` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| ImagenHub API key | `imagenhub_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| ImagenHub Template | `imagenhub_template` | imagenhub_template | — | — | `text-to-image` | Personalization Settings | bundle-descriptor + bundle-registry |
| Inner radius (enter number from 20) | `inner_radius` | number | — | 50 | `spiral-text` | Design Settings, General | bundle-descriptor + bundle-registry |
| Add instruction for customer | `input_hint` | string | — | — | 28 types: `additional-option`, `addon-charge`, `calendar`, `clipart-category`, `clock`, `color`, `curve-text`, `font`, `group-clipart-categories`, `json-list`, `maps`, `moon-phase`, `paragraph`, `qr-code`, `route-maps`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `song-search`, `spiral-text`, `star-maps`, `text`, `text-to-image`, `toggle`, `vector-category`, `warp-text`, `word-cloud`, `word-search` | Additional Option Setting, Addon charge settings, Personalization Setting, Personalization Settings, Personalization settings | bundle-descriptor + bundle-registry |
| Input style | `input_style` | string (enum) | `single`, `multiple` | single | `scrabble-crossword`, `word-cloud`, `word-search` | — | bundle-descriptor + bundle-registry |
| Label of template options | `label` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Language | `language_code` | language | — | en | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Display this layer on | `layer_display` | string (enum) | `preview_and_design`, `preview_only`, `design_only`, `form_only` | preview_and_design | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `left` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(39/51 layers) |
| — | `letter_spacing` | — | — | — | `paragraph`, `text` | — | bundle-registry |
| Light sketch | `light_sketch` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `line_height` | — | — | — | `paragraph`, `shape-text`, `spiral-text` | — | bundle-registry |
| — | `link_flux_kontext_get_key` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `link_gemini_get_key` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `link_gpt_get_key` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `link_imagen_get_key` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `locked` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(51/51 layers) |
| — | `lookup_value_helper` | lookup_value_helper | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Populate values | bundle-descriptor |
| Load song lyrics | `lyric_enabled` | boolean | — | false | `song-search` | Personalization Setting, Personalization settings | bundle-descriptor + bundle-registry |
| Mapbox Access token | `maps_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Default Location (Latitude, Longitude) | `maps_default_location` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, Design settings | bundle-descriptor |
| Default Map styles URL | `maps_default_style` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| — | `maps_instruction` | title | — | — | `maps` | — | bundle-descriptor + bundle-registry |
| Show Marker/Pin | `maps_marker_enable` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker height | `maps_marker_height` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker icon | `maps_marker_icon` | image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker last point icon | `maps_marker_last_icon` | image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker start point icon | `maps_marker_start_icon` | image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker width | `maps_marker_width` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Enable overlay on Maps editor | `maps_masked_editor_enable` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Google places api key (*) | `maps_place_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Map service for searching location | `maps_place_provider` | string (enum) | `mapbox`, `google` | mapbox | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Allow customers to change Location | `maps_seacher_enabled` | boolean | — | false | `moon-phase` | — | bundle-descriptor + bundle-registry |
| — | `maps_search_form_label` | string | — | Enter a location | `moon-phase` | — | bundle-descriptor + bundle-registry |
| — | `maps_search_placeholder` | string | — | Search location | `maps`, `moon-phase`, `star-maps` | — | bundle-descriptor + bundle-registry |
| Select a Map styles category | `maps_style` | maps | — | — | `maps`, `route-maps` | — | bundle-descriptor + bundle-registry |
| Allow customers to change map styles | `maps_style_enable` | boolean | — | — | `maps`, `route-maps` | — | bundle-descriptor + bundle-registry |
| “Select map style” label | `maps_style_label` | string | — | Select map style | `maps`, `route-maps` | — | bundle-descriptor + bundle-registry |
| — | `maps_time_label` | string | — | Pick a time | `star-maps` | — | bundle-descriptor + bundle-registry |
| Default zoom level | `maps_zoom` | number_step | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Enable marker | `marker_enabled` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Marker layout | `marker_layout` | string (enum) | `full`, `quarters` | full | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Mask types | `mask_type` | string (enum) | `wc_default_mask`, `wc_custom_mask` | wc_default_mask | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Apply mask image · Crop into a custom shape | `masked_enable` | boolean | — | false | `maps`, `photo`, `route-maps`, `star-maps` | Personalization Settings | bundle-descriptor + bundle-registry |
| Mask image · Shape image | `masked_url` | mask_image | — | — | `maps`, `photo`, `route-maps`, `star-maps` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `match_type` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Max | `max` | number | — | — | `curve-text`, `scrabble-single-line`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| Apply to photos smaller than (px) | `max_enhance_size` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `max_enhance_size_note` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Text character limit | `max_length` | number | — | — | `curve-text`, `paragraph`, `scrabble-single-line`, `shape-text`, `spiral-text`, `text`, `warp-text` | Personalization Setting | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| Maximum photos | `max_photos` | number | — | 3 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings | bundle-descriptor |
| Max words | `max_words` | number | — | 10, 30, 50 | `scrabble-crossword`, `word-cloud`, `word-search` | — | bundle-descriptor + bundle-registry |
| Min | `min` | number | — | — | `curve-text`, `scrabble-single-line`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| Min col/row | `min_grid` | number | — | 8 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Min height (px) | `min_height` | number | — | — | `photo` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `min_size_enable` | — | — | — | `photo` | Personalization Settings | bundle-registry |
| Min width (px) | `min_width` | number | — | — | `photo` | Personalization Settings | bundle-descriptor + bundle-registry |
| Moon color | `moon_color` | radio_image | `silver`, `gold`, `blue`, `red` | silver | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Moon type | `moon_type` | string (enum) | `round`, `heart`, `transparent` | round | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Prompt the result you want | `multi_image_prompt` | image_filter_prompt | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings | bundle-descriptor |
| GenAI service | `multi_image_provider` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings | bundle-descriptor |
| — | `name` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Addon charge settings, Personalization Settings | bundle-descriptor + OBSERVED(17/51 layers) |
| — | `note_cost_ref_img` | title | — | — | `text-to-image` | — | bundle-descriptor + bundle-registry |
| — | `note_gpt_background` | title | — | false | `text-to-image` | — | bundle-descriptor + bundle-registry |
| — | `note_output_size` | title | — | — | `text-to-image` | — | bundle-descriptor + bundle-registry |
| — | `note_output_size_imagenhub` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `note_price_flux` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Numeral style | `numeral_style` | string (enum) | `arabic`, `roman` | arabic | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Opacity | `opacity` | slider | — | 1 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `opened` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(12/51 layers) |
| Option display template | `option_template` | json_option_template | — | {{name}} | `json-list` | Personalization Settings | bundle-descriptor + bundle-registry |
| Option values | `options` | repeater | — | true | `addon-charge` | Addon charge settings, Personalization Settings | bundle-descriptor + bundle-registry |
| Output Type | `output_type` | string (enum) | `single`, `multiple` | single | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings | bundle-descriptor |
| — | `paragraph` | — | — | — | `paragraph`, `shape-text` | — | bundle-registry |
| Paragraph option · Type of text path | `path_type` | string (enum) | `paragraph`, `shape_text`, `spiral` | paragraph, spiral | `shape-text`, `spiral-text` | General | bundle-descriptor + bundle-registry |
| — | `photo_border` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(18/51 layers) |
| — | `photo_border_info` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `photo_border_type` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Photo upload endpoint | `photo_custom_endpoint` | string | — | — | `photo` | Personalization Settings | bundle-descriptor + bundle-registry |
| Upload editor | `photo_editor` | string (enum) | `static`, `image_cropper`, `image_placement` | static | `photo`, `vector-upload` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `photo_editor_warning` | title | — | — | `photo` | Personalization Settings | bundle-descriptor + bundle-registry |
| Add instruction for customer | `photo_hint` | string | — | — | `photo`, `vector-upload` | Personalization Settings | bundle-descriptor + bundle-registry |
| Show customer’s photo on live preview | `photo_replace` | boolean | — | true | `photo` | Personalization Settings | bundle-descriptor + bundle-registry |
| Max uploads per buyer per option (reset per hour) | `photo_upload_rate_limit` | number | — | 5 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Placeholder text for template options | `placeholder` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `points` | — | — | — | `warp-text` | — | bundle-registry |
| — | `portrait_sketch_warning` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Prefix | `prefix` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, Design settings, Personalization Setting | bundle-descriptor |
| Enable prefix/suffix | `prefix_suffix_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, Design settings, Personalization Setting | bundle-descriptor |
| Price per character | `price_per_letter` | prices_by_instance | — | — | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| Charge by Character count | `price_per_letter_enabled` | boolean | — | — | `curve-text`, `text`, `warp-text` | — | bundle-descriptor + bundle-registry |
| — | `product_display_type` | string (enum) | `radio`, `dropdown` | radio | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `raw_label` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(17/51 layers) |
| Removal.AI  API key | `removal_ai_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `removal_ai_des` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `removal_ai_des_1` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `remove_bg` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Remove.bg API key | `remove_bg_api_key` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `remove_bg_des` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Use the photo's original size for both Preview & Production file | `remove_bg_master_only` | boolean | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `remove_bg_tib_warn` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Remove line breaks | `remove_line_breaks_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, General | bundle-descriptor |
| — | `replace` | string (enum) | `skip`, `replace` | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Allow customers to reposition text | `reposition_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Mark this option as required | `required` | boolean | — | false | 20 types: `additional-option`, `addon-charge`, `calendar`, `clipart-category`, `clock`, `color`, `curve-text`, `font`, `group-clipart-categories`, `json-list`, `moon-phase`, `paragraph`, `photo`, `shape-text`, `spiral-text`, `text`, `text-to-image`, `vector-category`, `vector-upload`, `warp-text` | Additional Option Setting, Personalization Setting, Personalization Settings | bundle-descriptor + bundle-registry + OBSERVED(11/51 layers) |
| Select a source text option · Select a text option · Select an option · Source option | `retrieval_layer` | layer_selector | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General, Personalization settings, Populate values | bundle-descriptor |
| Populate values · Value · Value to populate · Values | `retrieval_value` | new_retrieval_value / retrieval_value / string | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General, Personalization settings, Populate values | bundle-descriptor |
| Populate Content from another option · Populate values from other options | `retrieval_value_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General, Populate values | bundle-descriptor |
| — | `retrieval_value_instruction` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | General | bundle-descriptor |
| Right to Left text | `right_to_left_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, Design settings, Personalization Setting | bundle-descriptor |
| — | `rotate` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(39/51 layers) |
| Upload GPX default | `route_maps_default_gpx` | gpx_upload | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Default line color | `route_maps_line_default_color` | string (hex) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Default line thickness | `route_maps_line_default_weight` | number | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Allow buyers to choose previous processed images | `save_uploaded_photos` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `schema_version` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(17/51 layers) |
| Show score | `score_enabled` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `seed` | increment_button | — | 0 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| — | `select_artwork` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `select_printarea` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `shadow_blur` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(26/51 layers) |
| — | `shadow_color` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(26/51 layers) |
| — | `shadow_display` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(39/51 layers) |
| — | `shadow_enabled` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(26/51 layers) |
| — | `shadow_offset_x` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(26/51 layers) |
| — | `shadow_offset_y` | — | — | — | `curve-text`, `text` | — | bundle-registry + OBSERVED(26/51 layers) |
| Enable custom shape | `shape_enabled` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Shape source | `shape_source` | string (enum) | `preset`, `custom` | preset | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Select a shape · Shape image | `shape_url` | mask_image / radio_image | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| Display the weekday name | `short_name_enabled` | radio_boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| Show option title | `show_form_label` | boolean | — | true | `toggle` | Personalization Settings | bundle-descriptor + bundle-registry |
| Show customization data on cart/checkout · Show selected template on cart/checkout | `show_in_cart` | boolean | — | false | 30 types: `additional-option`, `addon-charge`, `calendar`, `clipart-category`, `clock`, `color`, `curve-text`, `font`, `group-clipart-categories`, `json-list`, `maps`, `moon-phase`, `paragraph`, `photo`, `qr-code`, `route-maps`, `scrabble-crossword`, `scrabble-single-line`, `shape-text`, `song-search`, `spiral-text`, `star-maps`, `text`, `text-to-image`, `toggle`, `vector-category`, `vector-upload`, `warp-text`, `word-cloud`, `word-search` | Additional Option Setting, Personalization Setting, Personalization Settings | bundle-descriptor + bundle-registry + OBSERVED(9/51 layers) |
| Show outer circle | `show_outer_circle` | boolean | — | true | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |
| — | `size_display_type` | string (enum) | `radio`, `dropdown` | radio | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `skew_enabled` | — | — | — | `text` | — | bundle-registry |
| — | `skew_x` | — | — | — | `text` | — | bundle-registry |
| — | `skew_y` | — | — | — | `text` | — | bundle-registry |
| Create unique SKU for variants in platform | `sku_enabled` | boolean | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Change platform SKU prefix | `sku_prefix` | string | — | TEEINBLUE | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Dynamic clipart source | `source_type` | string (enum) | `clipart`, `grouped_clipart` | clipart | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization settings | bundle-descriptor |
| JSON File URL | `source_url` | json_url | — | https://cdn.teeinblue.com/examples/cities.json | `json-list` | Personalization Settings | bundle-descriptor + bundle-registry |
| Allow customers to show/hide Constellations | `star_maps_component_constellation` | boolean | — | — | `star-maps` | — | bundle-descriptor + bundle-registry |
| Show/hide Constellations label | `star_maps_component_constellation_label` | string | — | Constellations | `star-maps` | — | bundle-descriptor + bundle-registry |
| Allow customers to show/hide Constellations name | `star_maps_component_constellation_name` | boolean | — | — | `star-maps` | — | bundle-descriptor + bundle-registry |
| Show/hide Constellations name label | `star_maps_component_constellation_name_label` | string | — | Constellations name | `star-maps` | — | bundle-descriptor + bundle-registry |
| Allow customers to show/hide Grid lines | `star_maps_component_grid` | boolean | — | — | `star-maps` | — | bundle-descriptor + bundle-registry |
| Show/hide Grid lines label | `star_maps_component_grid_label` | string | — | Grid lines | `star-maps` | — | bundle-descriptor + bundle-registry |
| Allow customers to show/hide Milky Way | `star_maps_component_mw` | boolean | — | — | `star-maps` | — | bundle-descriptor + bundle-registry |
| Show/hide Milky Way label | `star_maps_component_mw_label` | string | — | Milky Way | `star-maps` | — | bundle-descriptor + bundle-registry |
| Default Star maps styles | `star_maps_default_style` | json | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings | bundle-descriptor |
| — | `star_maps_instruction` | title | — | — | `star-maps` | — | bundle-descriptor + bundle-registry |
| — | `stroke_color` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(12/51 layers) |
| — | `stroke_enabled` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(8/51 layers) |
| — | `stroke_width` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(12/51 layers) |
| Suffix | `suffix` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design Settings, Design settings, Personalization Setting | bundle-descriptor |
| — | `suggestion_tib_enhancer_note` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `sync` | string (enum) | — | all | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `teeinblue_x_removal_ai_for_subscription_allowed` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `teeinblue_x_removal_ai_for_subscription_not_allowed` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `teeinblue_x_removal_ai_warning` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Default URL/text · Default date · Default date (only for preview) · Default paragraph (only for preview) · Default spiral text (only for preview) · Default text · Default text (only for preview) · Default time (only for preview) · Default words (only for preview) | `text` | date / scrabble_input / string / time | — | 12:15 | `clock` | Design Settings, Design settings, General | bundle-descriptor + bundle-registry + OBSERVED(4/51 layers) |
| Allow customers to change Text Color · Allow customers to change Vector Color | `text_color_enabled` | boolean | — | false | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization, Personalization Setting | bundle-descriptor |
| — | `text_color_label` | string | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization, Personalization Setting | bundle-descriptor |
| — | `text_notice` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings, General | bundle-descriptor |
| — | `text_to_image_enable_ref_img` | — | — | — | `text-to-image` | — | bundle-registry |
| Prompt the image you want | `text_to_image_prompt` | image_filter_prompt | — | — | `text-to-image` | — | bundle-descriptor + bundle-registry |
| GenAI service | `text_to_image_provider` | string (enum) | — | — | `text-to-image` | — | bundle-descriptor + bundle-registry |
| — | `text_to_image_ref_img` | — | — | — | `text-to-image` | — | bundle-registry |
| — | `thumbnail` | thumbnail_image | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Addon charge settings, Personalization Settings | bundle-descriptor |
| Toggle label | `toggle_label` | string | — | — | `toggle` | Personalization Settings | bundle-descriptor + bundle-registry |
| — | `top` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(39/51 layers) |
| — | `type` | treeselect | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor + OBSERVED(17/51 layers) |
| — | `typography` | typography | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor + OBSERVED(12/51 layers) |
| Typography | `typography_mode` | string (enum) | `single`, `category` | single | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Font type | `typography_type` | string (enum) | `google`, `custom` | google | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor + OBSERVED(4/51 layers) |
| — | `unsupported_char_handling` | string (enum) | — | block | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `upload_clipart_setting` | string (enum) | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `upload_limit_title` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| Select a shape | `url` | radio_image | — | — | `paragraph`, `shape-text` | Design Settings, General | bundle-descriptor + bundle-registry + OBSERVED(27/51 layers) |
| — | `use_hd_layer` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(26/51 layers) |
| — | `vertical_offset` | — | — | — | `paragraph`, `shape-text` | Extra | bundle-registry |
| — | `visible` | — | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | OBSERVED(51/51 layers) |
| — | `warning` | flux_warning | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `warning_layer_output_size` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `warning_use_template_default_size` | title | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Personalization Settings | bundle-descriptor |
| Custom mask | `watercolor_mask` | mask_image_lib | — | — | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | — | bundle-descriptor |
| — | `width` | — | — | — | `paragraph`, `shape-text`, `spiral-text`, `warp-text` | — | bundle-registry + OBSERVED(39/51 layers) |
| Number of words | `word_count` | number | — | 200 | *(không có trong registry tz/hS — phạm vi layer type CHƯA xác định)* | Design settings | bundle-descriptor |

---

## 1. Enum `layer.type` — danh sách đầy đủ

Nguồn: hằng số `X` trong portal bundle (`assets/index.COwrfo4J.js`). **35 giá trị.** `INFERRED` từ code, chưa xác nhận bằng spec.

| Const | `type` value | Đã quan sát trên artwork 4081? |
|---|---|---|
| `TEXT` | `text` | **YES** |
| `CLIPART_CATEGORY` | `clipart-category` | **YES** |
| `GROUP_CLIPART_CATEGORIES` | `group-clipart-categories` | **YES** |
| `STATIC_PHOTO` | `static-photo` | **YES** |
| `PHOTO` | `photo` | no |
| `TEXT_TO_IMAGE` | `text-to-image` | no |
| `MULTIPLE_UPLOADS` | `multiple-uploads` | no |
| `DYNAMIC_BY_TEXT` | `dynamic-by-text` | no |
| `CLIPART_FRAME` | `clipart-frame` | no |
| `MAPS` | `maps` | no |
| `STAR_MAPS` | `star-maps` | no |
| `ROUTE_MAPS` | `route-maps` | no |
| `VECTOR_CATEGORY` | `vector-category` | no |
| `VECTOR_UPLOAD` | `vector-upload` | no |
| `STATIC_VECTOR` | `static-vector` | no |
| `PARAGRAPH` | `paragraph` | no |
| `SHAPE_TEXT` | `shape-text` | no |
| `WARP_TEXT` | `warp-text` | no |
| `SPIRAL_TEXT` | `spiral-text` | no |
| `CURVE_TEXT` | `curve-text` | no |
| `SCRABBLE_CROSSWORD` | `scrabble-crossword` | no |
| `SCRABBLE_SINGLE_LINE` | `scrabble-single-line` | no |
| `CALENDAR` | `calendar` | no |
| `CLOCK` | `clock` | no |
| `SONG_SEARCH` | `song-search` | no |
| `QR_CODE` | `qr-code` | no |
| `MOON_PHASE` | `moon-phase` | no |
| `ADDON_CHARGE` | `addon-charge` | no |
| `ADDITIONAL_OPTION` | `additional-option` | no |
| `WORD_SEARCH` | `word-search` | no |
| `WORD_CLOUD` | `word-cloud` | no |
| `TOGGLE` | `toggle` | no |
| `FONT` | `font` | no |
| `COLOR` | `color` | no |
| `JSON_LIST` | `json-list` | no |

> Layer **image tĩnh** trong data thật **không có key `type`** (34/51 layer). Đừng giả định `type` luôn tồn tại.
> `group` layer không lồng `layers[]`; quan hệ cha-con biểu diễn bằng `group_id` trên layer con (flat list).

## 2. Registry `layer type -> personalization field` (bảng `tz` trong bundle)

Đây là câu trả lời chính cho "field nào thuộc layer type nào" ở nhóm Personalization.

| `layer.type` | Personalization fields |
|---|---|
| `text` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_custom_date_format`, `form_input_date_format`, `form_input_date_instruction`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `fulfilled_key`, `fulfilled_key_enabled`, `input_hint`, `max`, `max_length`, `min`, `price_per_letter`, `price_per_letter_enabled`, `required`, `show_in_cart` |
| `clipart-category` | `clipart`, `custom_class`, `default_value`, `form_label`, `input_hint`, `required`, `show_in_cart` |
| `group-clipart-categories` | `custom_class`, `default_value`, `form_label`, `form_placeholder`, `grouped_clipart`, `input_hint`, `required`, `show_in_cart` |
| `photo` | `custom_class`, `direct_upload_style`, `effect_title`, `effects`, `etsy_effect_warning`, `fit_mode`, `form_label`, `masked_enable`, `masked_url`, `min_height`, `min_size_enable`, `min_width`, `photo_custom_endpoint`, `photo_editor`, `photo_editor_warning`, `photo_hint`, `photo_replace`, `required`, `show_in_cart` |
| `text-to-image` | `custom_class`, `effect_title`, `effects`, `etsy_effect_warning`, `form_label`, `gemini_resolution`, `gpt_background`, `imagenhub_template`, `input_hint`, `note_cost_ref_img`, `note_gpt_background`, `note_output_size`, `required`, `show_in_cart`, `text_to_image_enable_ref_img`, `text_to_image_prompt`, `text_to_image_provider`, `text_to_image_ref_img` |
| `maps` | `custom_class`, `form_label`, `input_hint`, `maps_instruction`, `maps_search_placeholder`, `maps_style`, `maps_style_enable`, `maps_style_label`, `masked_enable`, `masked_url`, `show_in_cart` |
| `star-maps` | `custom_class`, `form_label`, `input_hint`, `maps_search_placeholder`, `maps_time_label`, `masked_enable`, `masked_url`, `show_in_cart`, `star_maps_component_constellation`, `star_maps_component_constellation_label`, `star_maps_component_constellation_name`, `star_maps_component_constellation_name_label`, `star_maps_component_grid`, `star_maps_component_grid_label`, `star_maps_component_mw`, `star_maps_component_mw_label`, `star_maps_instruction` |
| `route-maps` | `custom_class`, `elevation_profile_color`, `elevation_profile_enabled`, `elevation_profile_label`, `elevation_profile_size`, `elevation_profile_type`, `form_label`, `input_hint`, `maps_style`, `maps_style_enable`, `maps_style_label`, `masked_enable`, `masked_url`, `show_in_cart` |
| `vector-category` | `clipart`, `custom_class`, `default_value`, `form_label`, `input_hint`, `required`, `show_in_cart` |
| `vector-upload` | `custom_class`, `form_label`, `photo_editor`, `photo_hint`, `required`, `show_in_cart` |
| `paragraph` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `max_length`, `required`, `show_in_cart` |
| `warp-text` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_date_format`, `form_input_date_instruction`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `fulfilled_key`, `fulfilled_key_enabled`, `input_hint`, `max`, `max_length`, `min`, `price_per_letter`, `price_per_letter_enabled`, `required`, `show_in_cart` |
| `spiral-text` | `custom_class`, `font_character_config`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `max_length`, `required`, `show_in_cart` |
| `shape-text` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `max_length`, `required`, `show_in_cart` |
| `curve-text` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_custom_date_format`, `form_input_date_format`, `form_input_date_instruction`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `fulfilled_key`, `fulfilled_key_enabled`, `input_hint`, `max`, `max_length`, `min`, `price_per_letter`, `price_per_letter_enabled`, `required`, `show_in_cart` |
| `scrabble-crossword` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `input_style`, `max_words`, `show_in_cart` |
| `scrabble-single-line` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `max`, `max_length`, `min`, `show_in_cart` |
| `word-search` | `autofill_default_value`, `font_character_config`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `input_style`, `max_words`, `show_in_cart` |
| `word-cloud` | `autofill_default_value`, `custom_class`, `font_character_config`, `form_input_textcase`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `input_style`, `max_words`, `show_in_cart` |
| `calendar` | `custom_class`, `form_label`, `input_hint`, `required`, `show_in_cart` |
| `song-search` | `cart_template`, `custom_class`, `form_label`, `form_placeholder`, `input_hint`, `lyric_enabled`, `show_in_cart` |
| `qr-code` | `custom_class`, `font_character_config`, `form_input_type`, `form_label`, `form_placeholder`, `input_hint`, `show_in_cart` |
| `moon-phase` | `custom_class`, `form_label`, `input_hint`, `maps_seacher_enabled`, `maps_search_form_label`, `maps_search_placeholder`, `required`, `show_in_cart` |
| `clock` | `custom_class`, `form_label`, `input_hint`, `required`, `show_in_cart`, `text` |
| `font` | `clipart`, `custom_class`, `form_label`, `input_hint`, `required`, `show_in_cart` |
| `color` | `clipart`, `color_option`, `custom_class`, `default_value`, `form_label`, `grouped_clipart`, `input_hint`, `required`, `show_in_cart` |
| `addon-charge` | `charge_enabled`, `custom_class`, `default_value`, `display_type`, `enable_multiple_selection`, `form_label`, `form_placeholder`, `input_hint`, `options`, `required`, `show_in_cart` |
| `toggle` | `custom_class`, `default_value`, `form_label`, `input_hint`, `show_form_label`, `show_in_cart`, `toggle_label` |
| `additional-option` | `additional_option`, `custom_class`, `default_value`, `form_label`, `input_hint`, `required`, `show_in_cart` |
| `json-list` | `cart_template`, `custom_class`, `default_value`, `form_label`, `form_placeholder`, `input_hint`, `option_template`, `required`, `show_in_cart`, `source_url` |

## 3. Registry `design field -> layer types` (bảng `hS` trong bundle)

| JSON field | Chỉ có ở layer type |
|---|---|
| `width` | `paragraph`, `shape-text`, `spiral-text`, `warp-text` |
| `height` | `paragraph`, `shape-text`, `spiral-text`, `warp-text` |
| `align` | `curve-text`, `paragraph`, `shape-text`, `text` |
| `align_vertical` | `paragraph`, `shape-text` |
| `line_height` | `paragraph`, `shape-text`, `spiral-text` |
| `letter_spacing` | `paragraph`, `text` |
| `paragraph` | `paragraph`, `shape-text` |
| `url` | `paragraph`, `shape-text` |
| `vertical_offset` | `paragraph`, `shape-text` |
| `path_type` | `shape-text`, `spiral-text` |
| `points` | `warp-text` |
| `inner_radius` | `spiral-text` |
| `direction` | `spiral-text` |
| `curve_enabled` | `curve-text` |
| `curve_radius` | `curve-text`, `text` |
| `autoscale_enabled` | `curve-text`, `text` |
| `autoscale_max_width` | `curve-text`, `text` |
| `skew_enabled` | `text` |
| `skew_x` | `text` |
| `skew_y` | `text` |
| `shadow_enabled` | `curve-text`, `text` |
| `shadow_color` | `curve-text`, `text` |
| `shadow_blur` | `curve-text`, `text` |
| `shadow_offset_x` | `curve-text`, `text` |
| `shadow_offset_y` | `curve-text`, `text` |
| `shadow_display` | `curve-text`, `text` |
| `price_per_letter_enabled` | `curve-text`, `text`, `warp-text` |
| `price_per_letter` | `curve-text`, `text`, `warp-text` |
| `fulfilled_key_enabled` | `curve-text`, `text`, `warp-text` |
| `fulfilled_key` | `curve-text`, `text`, `warp-text` |

## 4. Enum quan trọng (giá trị hợp lệ)

- **`customization_type`** — Paragraph option / Personalization Options / Personalization for this layer / Text option / Type of text path
  - `no_customization` (No personalization), `normal` (Create a new option), `global_option` (Use an existing global option), `linked` (Share with another layer)
- **`form_type`** — Clock option / Display options as / Personalization Options / Text option
  - `radio_button` (Inline Radio Button), `radio` (Radio), `dropdown` (Dropdown list), `image` (Thumbnail Images), `text` (Create a new option), `linked` (Share with another layer), `static` (No personalization), `clipart` (1 Clipart category), `grouped_clipart` (1 Group of Clipart categories), `photo` (Upload photo), `maps` (Maps), `star_maps` (Star maps), `route_maps` (Route maps), `dynamic_by_text` (Dynamic Clipart by text (Manual)), `crossword` (Crossword), `single_line` (Single line), `vector` (1 Vector category), `vector_upload` (Upload vector), `calendar` (Create a new option), `clock` (Create a new option), `moon_phase` (Create a new option)
- **`display_type`** — Display Template options as / Display options as
  - `select` (Dropdown List), `radio` (Radio Button), `radio_button` (Radio), `dropdown` (Dropdown list), `image` (Thumbnail Images)
- **`form_input_type`** — Input type
  - `text` (All characters (Aa Bb 123 @#$)), `number` (Only numbers (123)), `date` (Date picker), `custom` (Custom rules)
- **`form_input_textcase`** — Input text case / Text case
  - `none` (Normal), `lowercase` (lowercase), `uppercase` (UPPERCASE), `capitalize` (Capitalize Each Word)
- **`form_input_date_format`** — Display in date format
  - `MM/dd/yyyy` (MM/DD/YYYY), `dd/MM/yyyy` (DD/MM/YYYY), `dd-MM-yy` (DD-MM-YY), `yyyy-MM-dd` (YYYY-MM-DD), `yyyy/MM/dd` (YYYY/MM/DD), `dd.MM.yyyy` (DD.MM.YYYY), `MM.dd.yyyy` (MM.DD.YYYY), `custom` (Custom)
- **`typography_type`** — Font type
  - `google` (Google Fonts), `custom` (Custom Fonts)
- **`path_type`** — Paragraph option / Type of text path
  - `paragraph` (Normal), `shape_text` (Custom Shape), `spiral` (Spiral text)
- **`direction`** — Cell direction / Direction / Text direction
  - `out` (Begin at inner), `in` (Begin at outer), `vertical` (Vertical), `horizontal` (Horizontal), `row` (Horizontal), `column` (Vertical)
- **`moon_type`** — Moon type
  - `round` (Round (Original)), `heart` (Heart), `transparent` (Transparent)
- **`input_style`** — Input style
  - `single` (Single field (split words by space)), `multiple` (Multiple fields (each field supports multiple words))
- **`color_option`** — Color options
  - `color_category_option` (Pick a color from a Color category), `color_picker_option` (Show color picker), `scheme_color` (Color Sequence categories)
- **`photo_editor`** — Upload editor
  - `static` (Direct upload, no editor), `image_cropper` (Photo Cropper), `image_placement` (Photo Reposition)
- **`fit_mode`** — Fit mode
  - `contain` (Contain (scale to fit)), `cover` (Cover (scale to fill))
- **`direct_clipart_style`** — Clipart fit mode
  - `contain` (Contain (scale to fit)), `cover` (Fill (stretch to fit))
- **`direct_upload_style`** — Direct upload style / Fit mode
  - `contain` (Contain (scale to fit)), `cover` (Fill (stretch to fit))
- **`elevation_profile_size`** — Default elevation profile size
  - `small` (Small), `medium` (Medium), `large` (Large)
- **`elevation_profile_type`** — Display options on personalization form as
  - `image` (Thumbnail Images), `text` (Dropdown list of option name), `dropdown` (Dropdown list of option name + Thumbnail), `radio` (Inline button of option name), `radio_button` (Radio of option name)
- **`mask_type`** — Mask types
  - `wc_default_mask` (Use TIB's default masks), `wc_custom_mask` (Use custom masks)
- **`layer_display`** — *Display this layer on* (options qua hằng `jt`)
  - `preview_and_design` (Mockup Preview & Order design) · `preview_only` (Mockup Preview only) · `design_only` (Order Design only) · `form_only` (None — personalization option still available)
- **`shadow_display`** — OBSERVED value duy nhất: `mockup_order` (39/51 layer). `observed_count` cho giá trị này = 1 artwork ⇒ **LOW**, chưa phải enum đầy đủ.

## 5. Object lồng nhau (shape quan sát được)

```jsonc
// layer.typography  — Google font
{ "family": "string", "variant": "string", "size": number }

// layer.custom_font — Custom font (typography_type = "custom")
{ "family": "string", "url": "string (path, không phải URL tuyệt đối)", "size": number }

// layer.dependency — Conditional Setting (KHÔNG quan sát được trên artwork 4081; shape từ bundle `nz()`)
{ "show_by_default": boolean, "match_type": "all" | "any", "dependencies": [ { "element": "<layerId>", "value": any } ] }

// Populate values (section id `retrieval`)
{ "retrieval_value_enabled": boolean, "retrieval_layer": "<layerId>", "retrieval_value": "string",
  "retrieval_styles": { "font": {"enabled":bool,...}, "color": {...}, "background": {...}, "shape": {...} } }
// key hợp lệ của retrieval_styles = ["font","color","background","shape"] (hằng `rc` trong bundle)
```

## 6. Layer keys THỰC SỰ quan sát được (artwork 4081, 51 layer, 3 template)

`OBSERVED_CURRENT`, 1 artwork ⇒ `confidence: LOW`. Cột "kiểu" là kiểu JSON đã thấy.

| Key | Kiểu JSON đã thấy | Số layer có key |
|---|---|---|
| `align` | string | 12/51 |
| `autofill_default_value` | boolean | 4/51 |
| `autoscale_enabled` | boolean | 12/51 |
| `autoscale_max_width` | null | 8/51 |
| `clipart` | integer | 3/51 |
| `color` | string | 12/51 |
| `color_opacity` | null | 8/51 |
| `curve_radius` | number | 4/51 |
| `custom_font` | object | 12/51 |
| `customization_type` | string | 13/51 |
| `default_value` | null / string | 5/51 |
| `direct_clipart_style` | string | 8/51 |
| `direct_upload_style` | string | 1/51 |
| `fit_mode` | string | 1/51 |
| `flip_horizontal_enabled` | null | 18/51 |
| `flip_vertical_enabled` | null | 18/51 |
| `form_input_date_format` | string | 4/51 |
| `form_input_textcase` | string | 4/51 |
| `form_input_type` | string | 4/51 |
| `form_label` | string | 11/51 |
| `form_placeholder` | string | 1/51 |
| `fulfilled_key_enabled` | boolean | 4/51 |
| `global_id` | string | 34/51 |
| `global_option` | integer | 9/51 |
| `group_id` | null / string | 45/51 |
| `grouped_clipart` | integer | 4/51 |
| `grouped_reposition` | array | 4/51 |
| `height` | number | 27/51 |
| `id` | string | 51/51 |
| `left` | number / integer | 39/51 |
| `locked` | boolean | 51/51 |
| `max_length` | integer | 4/51 |
| `name` | string | 17/51 |
| `opened` | boolean | 12/51 |
| `photo_border` | null | 18/51 |
| `raw_label` | string | 17/51 |
| `required` | boolean | 11/51 |
| `rotate` | integer | 39/51 |
| `schema_version` | integer | 17/51 |
| `shadow_blur` | null | 26/51 |
| `shadow_color` | null | 26/51 |
| `shadow_display` | string | 39/51 |
| `shadow_enabled` | null | 26/51 |
| `shadow_offset_x` | null | 26/51 |
| `shadow_offset_y` | null | 26/51 |
| `show_in_cart` | boolean | 9/51 |
| `stroke_color` | string | 12/51 |
| `stroke_enabled` | null | 8/51 |
| `stroke_width` | integer | 12/51 |
| `text` | string | 4/51 |
| `top` | number / integer | 39/51 |
| `type` | string | 17/51 |
| `typography` | object | 12/51 |
| `typography_type` | string | 4/51 |
| `url` | string | 27/51 |
| `use_hd_layer` | null / boolean | 26/51 |
| `visible` | boolean | 51/51 |
| `width` | integer / number | 39/51 |

**Tham chiếu id sang bảng khác (observed):** `clipart` -> `clipart_categories.id` (int) · `grouped_clipart` -> `clipart_categories.id` (int) · `global_option` -> `global_options.id` (int) · `global_id` -> id của layer nguồn khi layer được share/link · `group_id` -> `layer.id` của layer `type:"group"`.

## 7. Template-level fields (observed)

`artworks.templates` = `jsonb`, **array**. Key mỗi template (observed 3/3):

| Key | Kiểu | Ghi chú |
|---|---|---|
| `id` | string | dạng `template-<n>` |
| `name` | string | |
| `url` | string | path ảnh nền template |
| `layers` | array<object> | flat, không lồng |
| `addons` | array | observed rỗng `[]` cả 3 template |
| `positions` | array<string> | z-order; phần tử `"template-layer"` là placeholder |
| `is_global` | boolean | observed `false` cả 3 |
| `charge_enabled` | boolean | observed `false` cả 3 |
| `shape_cut_layout` | (observed `null`) | |

> `addons`, `shape_cut_layout` chỉ thấy giá trị rỗng/null ⇒ **không kết luận được shape bên trong**. Ghi vào `unknowns`.

## 8. Coverage / giới hạn

- Chỉ **5/35** layer type có mặt trong dữ liệu thật: `text`, `static-photo`, `clipart-category`, `group-clipart-categories`, `group` (+ layer ảnh không có key `type`). 30 layer type còn lại **chỉ có evidence từ code bundle**, không có response mẫu.
- Artwork **"QA - All layers explore" KHÔNG tồn tại** trong dữ liệu: `GET /api/artworks` và GraphQL `artworks` đều trả **đúng 1 row** (id 4081). Nhiều khả năng layer được dựng trong editor nhưng **chưa save**. Đây là lý do chính khiến coverage layer type thấp.
- `artworks.templates` chỉ có **1 artwork** ⇒ mọi kết luận về always_present đều **không đạt ngưỡng** `observed_count >= 3`. **Không field nào được đánh `always_present`.**
- Không quan sát được: `dependency` (Conditional), `retrieval_*` (Populate values), `prefix/suffix`, `right_to_left_enabled`, `vertical_offset`, `group_name`, `custom_class`, `inner_radius`, `points`, `path_type`, `max_words`, `moon_type`, `maps_*` — tất cả đều là `INFERRED` từ bundle.
- Không có OpenAPI/JSON-schema ⇒ **không phân biệt được required vs optional**. Bảng trên không tuyên bố required.
- Chưa test role khác (staff hạn chế quyền), chưa test cross-tenant (`TIB_USER_B_*` không có trong `.env`).
