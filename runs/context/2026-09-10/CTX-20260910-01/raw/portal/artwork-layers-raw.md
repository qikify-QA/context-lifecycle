# RAW harvest — artwork layer config (staging, store linh-explorer, artwork "QA - All layers explore" 1600x1600 PNG_RGB)
# Cách lấy: + Layer -> chọn type -> nút pen trên layer row -> bung 5 section accordion -> đọc .layer-panels

===== Single-line Text (data-type: text) =====
TOOLBAR: Roboto(regular) | font-size list (80..4800) | Print Effects
DESIGN SETTINGS: Default text (only for preview) · Enable prefix/suffix · Right to Left text
POPULATE VALUES: Browse values · Populate Content / Font (Must change from Google Font to Custom Font) / Color / Background
PERSONALIZATION: No personalization | Create a new option | Use an existing global option (+ Quick-fill) · Option Title · Placeholder text · Prefill default text to customer's input · Allow customers to reposition text · Input type: All characters / Only numbers (123) / Date picker / Custom rules · Input text case: Normal/lowercase/UPPERCASE/Capitalize Each Word · Text character limit · Charge by Character count · Add instruction · Mark as required · Show customization data on cart/checkout · Attach customer input for fulfillment · Custom class
CONDITIONAL: Show this layer and its option when: All conditions match (AND) / Any conditions match (OR) / No conditions · + Add conditions
EXTRA: Display this layer on (Mockup Preview & Order design / Mockup Preview only / Order Design only / None) · Group name

===== Paragraph — Normal (data-type: paragraph) =====
TOOLBAR: Roboto(regular) | font-size list | Print Effects
DESIGN SETTINGS: Default paragraph (only for preview) · Enable prefix/suffix · Right to Left text · **Remove line breaks**
POPULATE VALUES: Content / Font / Color / Background
CONDITIONAL: như trên
(PERSONALIZATION + EXTRA: lần capture đầu bị accordion toggle -> cần chạy lại)

===== Paragraph — Custom Shape (data-type: shape-text) =====
TOOLBAR: Roboto(regular) | font-size list | Print Effects
DESIGN SETTINGS: Default paragraph (only for preview) · **Select a shape** · Enable prefix/suffix
POPULATE VALUES: Content / Font / Color  (KHÔNG có Background)
PERSONALIZATION: "Paragraph option:" · No personalization / Create a new option / Use existing global (+Quick-fill) · Option Title · Placeholder paragraph · Prefill default paragraph · Input type: All characters / Custom rules (KHÔNG có Only numbers, Date picker) · Input text case · Text character limit · Add instruction · Mark as required · Show on cart/checkout · Custom class  (KHÔNG có Charge by Character count, KHÔNG có Attach for fulfillment)
CONDITIONAL: chuẩn
EXTRA: Display this layer on · **Vertical offset in order design** · Group name

===== Curve Text (data-type: curve-text) =====
TOOLBAR: Roboto(regular) | font-size list | Print Effects
DESIGN SETTINGS: Default text (only for preview) · Enable prefix/suffix · Right to Left text
POPULATE VALUES: Content / Font / Color / Background
CONDITIONAL: chuẩn
(PERSONALIZATION + EXTRA: cần chạy lại)

===== Warp Text (data-type: warp-text) =====
TOOLBAR: Roboto(regular) | **Warp** | Print Effects   (không có font-size list)
DESIGN SETTINGS: Default text (only for preview) · Enable prefix/suffix   (KHÔNG có Right to Left)
POPULATE VALUES: Content / Font / Color / Background
CONDITIONAL: chuẩn
(PERSONALIZATION + EXTRA: cần chạy lại)

===== Spiral Text (data-type: spiral-text) =====
TOOLBAR: Roboto(regular) | font-size list | Print Effects
DESIGN SETTINGS: Default spiral text (only for preview) · **Inner radius (enter number from 20)** · **Text direction: Begin at inner / Begin at outer** · Enable prefix/suffix
POPULATE VALUES: Content / Font / Color  (KHÔNG có Background)
PERSONALIZATION: "Type of text path:" · No personalization / Create a new option / Use existing global (+Quick-fill) · Option Title · Placeholder spiral text · Input type: All characters / Custom rules · Input text case · Text character limit · Add instruction · Mark as required · Show on cart/checkout · Custom class  (KHÔNG có Prefill, KHÔNG có Charge by Character count, KHÔNG có Attach for fulfillment)
CONDITIONAL: chuẩn
EXTRA: Display this layer on · Group name
