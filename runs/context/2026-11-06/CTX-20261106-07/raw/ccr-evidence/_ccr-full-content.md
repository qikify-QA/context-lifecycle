# Context Change Request: Teeinblue, artwork

**Tiêu đề task:** `[CCR] CONFLICT — artwork — backfill quyết định layer, render, mask và Strava`

Khuôn: bundled canonical `references/ccr-template.md` của skill `create-ccr`. Phụ lục: `context-lifecycle/knowledge/how-to-request/ccr-product-appendix.md`. Bản nháp local, chưa submit. Trích dẫn Jira lấy từ comment, đã bỏ thẻ định dạng; `[...]` trong trích dẫn là phần che tên account hoặc id theo yêu cầu.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đề xuất 1 CCR cho object này, vì CCR chạm cùng object sẽ bị lock. Mọi claim cùng product `teeinblue`. 

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `CONFLICT`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: `artwork` · Feature: `MỚI: artwork-ref-render-dedup`, `editor-layer-workspace`, `layer-config-image`, `layer-config-maps-astronomy`, `layer-config-others`, `layer-config-text`, `layer-config-vector`, `layer-print-effects`

**Quan sát được** `[AGENT]`

```
TIB-5534: [MCP] Layer schema: document custom_font family and Roboto default typography (Done)
  - CLAIM-01: Calendar layer có font mặc định Heebo, khác các layer text-like (Roboto)
TIB-5538: [UID] Fix default text enlarged after deleting custom text (Done)
  - CLAIM-02: Text/paragraph rỗng cho design trống; default text chỉ hiện ở storefront preview
TIB-5525: [Investigate] Move presigned photo uploads from Wasabi (us-east-1) to Cloudflare R2 to reduce upload timeouts (Done)
  - CLAIM-03: Multiple Uploads kiểu Multiple Outputs không tự ra design, không có property cart, cần layer khác populate value
TIB-5512: Layer image master upload fails for unsupported extensions (svg, pdf, heic, bin, jpe) (Done)
  - CLAIM-04: Upload .svg qua Static Vector tạo vector layer; image picker ẩn SVG là chủ đích; artwork có SVG phải đổi Design format
  - CLAIM-05: Design format PDF dùng cho layer Photo, order ra PDF có ảnh nhúng, không cần đổi format
TIB-5539: [SDK] Handle 429 rate-limit responses in the storefront customize flow (Done)
  - CLAIM-07: Strava trong Route Maps không test được trên staging
TIB-5357: tiêu đề và status chưa tra
TIB-5212: tiêu đề và status chưa tra
  - CLAIM-09: HD preview: size cap và điều kiện nút HD
  - CLAIM-10: HD preview: size cap và điều kiện nút HD (phần 2)
  - CLAIM-14: Toolbar effect theo giao capability của selection
TIB-5465: tiêu đề và status chưa tra
  - CLAIM-11: ImagenHub template variable: đồng bộ và cảnh báo (phần 2)
TIB-5516: tiêu đề và status chưa tra
  - CLAIM-12: Photo border: custom_shape vẽ canvas client, bỏ pre-render
TIB-5389: tiêu đề và status chưa tra
  - CLAIM-13: Text to Image: moderation (phần 2)
  - CLAIM-19: Text to Image: moderation
TIB-4823: tiêu đề và status chưa tra
TIB-5033: tiêu đề và status chưa tra
không có ticket
TIB-5353: tiêu đề và status chưa tra
```

- Nguồn: tổng hợp từ `rules/tib-product-behaviors.md`, `rules/env-capabilities.md`, Jira và Testlane. KHÔNG PHẢI quan sát trực tiếp của người soạn CCR trên môi trường thật.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 0 lần do người soạn CCR tự verify. Lượt chạy test ghi ở 5.1.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Đợt backfill này không chạy lại gì trên staging hay production. Các vế chưa có TC PASS ghi ở từng claim trong 5.1.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | loại: hành vi. Calendar layer có font mặc định Heebo, khác các layer text-like (Roboto) | portal · api (MCP schema) | `po_dev_confirm` | artwork/layer-config-others | `ADD` |
| `CLAIM-02` | loại: hành vi. Text/paragraph rỗng cho design trống; default text chỉ hiện ở storefront preview | storefront · render | `po_dev_confirm` | artwork/layer-config-text | `ADD` |
| `CLAIM-03` | loại: hành vi. Multiple Uploads kiểu Multiple Outputs không tự ra design, không có property cart, cần layer khác populate value | portal · storefront · render | `po_dev_confirm` | artwork/layer-config-image | `CONTRADICTS` |
| `CLAIM-04` | loại: hành vi. Upload .svg qua Static Vector tạo vector layer; image picker ẩn SVG là chủ đích; artwork có SVG phải đổi Design format | portal · render | `po_dev_confirm` | artwork/layer-config-vector | `ADD` |
| `CLAIM-05` | loại: hành vi. Design format PDF dùng cho layer Photo, order ra PDF có ảnh nhúng, không cần đổi format | render | `po_dev_confirm` | artwork/layer-config-image | `ADD` |
| `CLAIM-07` | loại: khác biệt môi trường. Strava trong Route Maps không test được trên staging | portal | `po_dev_confirm` | artwork/layer-config-maps-astronomy | `ADD` |
| `CLAIM-09` | loại: hành vi. HD preview: size cap và điều kiện nút HD | portal | `po_dev_confirm` | artwork/layer-config-image | `ADD` |
| `CLAIM-10` | loại: hành vi. HD preview: size cap và điều kiện nút HD (phần 2) | portal | `po_dev_confirm` | artwork/layer-config-image | `ADD` |
| `CLAIM-11` | loại: hành vi. ImagenHub template variable: đồng bộ và cảnh báo (phần 2) | portal | `po_dev_confirm` | artwork/layer-config-image | `ADD` |
| `CLAIM-12` | loại: hành vi. Photo border: custom_shape vẽ canvas client, bỏ pre-render | render | `po_dev_confirm` | artwork/layer-print-effects | `ADD` |
| `CLAIM-13` | loại: hành vi. Text to Image: moderation (phần 2) | storefront | `po_dev_confirm` | artwork/layer-config-image | `ADD` |
| `CLAIM-14` | loại: hành vi. Toolbar effect theo giao capability của selection | portal | `po_dev_confirm` | artwork/editor-layer-workspace | `ADD` |
| `CLAIM-19` | loại: hành vi. Text to Image: moderation | storefront | `po_dev_confirm` | artwork/layer-config-image | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | artwork | layer-config-others | merchant (owner/staff) | portal | không có (liên quan KB-033, không nói về font) |
| `CLAIM-02` | artwork | layer-config-text | buyer | storefront | không có |
| `CLAIM-03` | artwork | layer-config-image | merchant, buyer | portal+storefront | KB-018 (artwork/layer-config-image) |
| `CLAIM-04` | artwork | layer-config-vector | merchant (owner/staff) | portal | không có (một phần quan sát trùng image-library KB-015, KB-008) |
| `CLAIM-05` | artwork | layer-config-image | merchant (owner/staff) | portal | không có |
| `CLAIM-07` | artwork | layer-config-maps-astronomy | merchant, buyer | storefront | không có |
| `CLAIM-09` | artwork | layer-config-image | không rõ | portal | không có |
| `CLAIM-10` | artwork | layer-config-image | không rõ | portal | không có |
| `CLAIM-11` | artwork | layer-config-image | không rõ | portal | liên quan KB-115 (OBSERVED_CURRENT) |
| `CLAIM-12` | artwork | layer-print-effects | không rõ | render | liên quan KB-391 (OBSERVED_CURRENT) |
| `CLAIM-13` | artwork | layer-config-image | không rõ | storefront | liên quan KB-114 (OBSERVED_CURRENT) |
| `CLAIM-14` | artwork | editor-layer-workspace | không rõ | portal | không có |
| `CLAIM-19` | artwork | layer-config-image | không rõ | storefront | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** portal · render · storefront

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Feature | Loại | Staging | Production | Cách test trên staging | Nguồn và ngày |
|---|---|---|---|---|---|---|
| `CLAIM-07` | `artwork/layer-config-maps-astronomy` | `NOT_TESTABLE` (mức: Vế) | không test được (Route Maps `strava-upload`) | không rõ | không test được; bỏ dòng Strava, ghi "not testable on staging", không tính blocked | QA 2026-10-27, TIB-5539 |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5534 | không rõ | 2026-10-12 | Jira Done, chưa rõ ngày deploy |
| TIB-5538 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5525 | không rõ | 2026-10-20 | Jira Done, chưa rõ ngày deploy |
| TIB-5512 | không rõ | 2026-10-15 | Jira Done, chưa rõ ngày deploy |
| TIB-5539 | không rõ | 2026-10-28 | Jira Done, chưa rõ ngày deploy |
| TIB-5357 | không rõ | không rõ | không rõ |
| TIB-5212 | không rõ | không rõ | không rõ |
| TIB-5465 | không rõ | không rõ | không rõ |
| TIB-5516 | không rõ | không rõ | không rõ |
| TIB-5389 | không rõ | không rõ | không rõ |
| TIB-4823 | không rõ | không rõ | không rõ |
| TIB-5033 | không rõ | không rõ | không rõ |
| TIB-5353 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 12; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: artwork/layer-config-others KB-033 (OBSERVED_CURRENT, cập nhật 2026-09-10): "calendar có DESIGN SETTINGS phong phú nhất trong nhóm OTHERS: 'Default date (only for preview)*:', 'Language(require supported fonts): English', 'The first day of the week: Monday/Sunday', 'Display the weekday name: Abbreviation/Truncation', 'Display text case…"
  - CLAIM-03: artwork/layer-config-image KB-018 (OBSERVED_CURRENT, cập nhật 2026-09-10): "multiple-uploads là 1/13 type KHÔNG có accordion POPULATE VALUES (xem boundary KB-010). PERSONALIZATION SETTINGS riêng: 'Output Type: Single Output/Multiple Outputs (coming soon)', 'Maximum photos*' (default quan sát được = 3, min 2 max 3 theo evidence capture…"
  - CLAIM-03: artwork/populate-values KB-118 (OBSERVED_CURRENT, cập nhật 2026-09-25): "Khi seller bật 'Populate Content from another option' trên layer photo thường ('body'), chọn Source option = layer Multiple Uploads ('top', Maximum photos=3) (role owner/staff, env staging, artwork 4416), 'Available Value' picker hiển thị đúng 4 token verbatim…"
  - CLAIM-04: image-library/image-layer-library KB-015 (OBSERVED_CURRENT, cập nhật 2026-10-26): "Khi mở image picker ở merchant-owner/staging, quan sát thấy client gọi POST /api/graphql/relay (operation getData) query layer_images_connection(first: 20) với điều kiện deleted_at null, master không ILIKE '%.svg' và '%.gpx', sắp theo id giảm dần, phân trang c…"
  - CLAIM-04: image-library KB-008 (OBSERVED_CURRENT, cập nhật 2026-10-26): "Khi chọn file .svg hoặc .txt qua file chooser của image picker hoặc media library modal ở merchant-owner/staging, quan sát thấy file hiện thành một dòng trong danh sách upload với thông báo 'You can't upload files of this type.' và không có request mạng nào ch…"
  - CLAIM-02, CLAIM-05, CLAIM-07, CLAIM-09, CLAIM-10, CLAIM-11, CLAIM-12, CLAIM-13, CLAIM-14, CLAIM-19: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: Heebo, typography, Roboto, default font, font mặc định, Calendar
  - CLAIM-02: default text, text mặc định, rỗng, empty, paragraph, populate, font_size
  - CLAIM-03: Multiple Uploads, Multiple Outputs, multiple-uploads, output_type, populate
  - CLAIM-04: svg, vector, static-vector, design format, Line item cannot generate, image picker
  - CLAIM-05: design format, PDF, Photo, design_format
  - CLAIM-07: Strava, strava-upload, Route Maps
  - CLAIM-09: hd-preview-size-cap
  - CLAIM-10: hd-preview-size-cap
  - CLAIM-11: imagenhub-template-variable-sync
  - CLAIM-12: photo-border-prerender-client-render
  - CLAIM-13: text-to-image-genai-layer
  - CLAIM-14: toolbar-effect-capability-intersection
  - CLAIM-19: text-to-image-genai-layer
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-01: File local 2026-10-08 (Heebo) mới hơn mô tả TIB-5534 tạo 2026-10-06 ("calendar was Heebo", đổi example sang Roboto). Claim theo file local. TC-TIB-4858 có expected ngược lại nhưng không có ngày nên không so được.
- CLAIM-02: File local 2026-10-14 (design trống) mới hơn mô tả TIB-5538 tạo 2026-10-07 ("should fall back to its default text"). Claim theo file local. Jira không cho biết ngày sửa mô tả.
- CLAIM-03: Canon KB-018 ngày 2026-09-10 ghi "Multiple Outputs (coming soon)"; file local 2026-10-14 mô tả option dùng được. Claim theo nguồn mới nhất là file local. teeinblue không cho CCR ghi đè canon: builder giữ cả hai phía.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-08 | `po_dev_confirm` |
| `CLAIM-02` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-03` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-04` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-05` | QA | 2026-10-14 | `po_dev_confirm` |
| `CLAIM-07` | QA | 2026-10-27 | `po_dev_confirm` |
| `CLAIM-09` | giangnth (dev) | 2026-10-27 | `po_dev_confirm` |
| `CLAIM-10` | QA | 2026-10-16, 2026-10-27 | `po_dev_confirm` |
| `CLAIM-11` | QA | 2026-10-21 | `po_dev_confirm` |
| `CLAIM-12` | chauptm (dev) | 2026-10-09 | `po_dev_confirm` |
| `CLAIM-13` | QA | 2026-10-18 | `po_dev_confirm` |
| `CLAIM-14` | giangnth (dev) | 2026-10-27 | `po_dev_confirm` |
| `CLAIM-19` | không ghi tên | 2026-10-18 | `po_dev_confirm` |

Họ xác nhận chính xác điều gì: xem trích nguyên văn ở 5.1.

**Cần người xác nhận:**

- không có

## 4.2 KHÔNG đề xuất điều gì?

```
- Số liệu trong trích dẫn (limit, ngưỡng, cap thử nghiệm) là số tại thời điểm nguồn, không phải giá trị của mọi môi trường.
- feature_key và object_key ghi MỚI chỉ là đề xuất tên.
- Không đề xuất ghi đè canon. Claim CONTRADICTS giữ cả hai phía.
- Hướng dẫn test trong file local (hỏi cap thực tế, tên account, id data) không phải rule sản phẩm.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
CLAIM-01: Layer Calendar có font mặc định là Heebo; các layer text-like khác dùng Roboto.
CLAIM-02: Text/paragraph rỗng cho design trống; default text chỉ hiện ở storefront preview. Đúng cả với paragraph vừa là buyer field vừa được populate. Chỉ nhập khoảng trắng thì preview và design đều trống. Nguồn populate bị xoá thì value "" đè lên chỗ buyer sửa và preview về default text.
CLAIM-03: Layer Multiple Uploads kiểu Multiple Outputs không tự ra design và không có property cart; cần một layer khác populate value từ nó.
CLAIM-04: Upload file .svg trong artwork editor qua "+ Layer > VECTOR > Static Vector" tạo vector layer. Image picker ẩn SVG là chủ đích. Artwork có SVG phải đổi Design format; để mặc định thì order lỗi "Line item cannot generate design".
CLAIM-05: Design format PDF dùng được cho layer Photo; order ra file PDF có ảnh nhúng.
CLAIM-07: [NOT_TESTABLE] Môi trường test: Strava trong Route Maps (`strava-upload`) không chạy được; Production: không rõ; Cách test: bỏ vế Strava, ghi "not testable on staging", không tính blocked.
CLAIM-09: Tooltip "Selected layers use different images…" không còn là hành vi hiện tại.
CLAIM-10: Multi-select có batch HD: chọn nhiều image layer khác ảnh thì bật HD hàng loạt, mỗi lần bấm tối đa MASTER_LARGE_BATCH_LIMIT (mặc định 10) ảnh khác nhau chưa ở HD, qua endpoint POST /layer-images/create-master-large/batch. Vượt limit thì hiện toast info rồi toast lỗi tiêu đề "Something went wrong!", không layer nào đổi. Mỗi chu kỳ poll 2s có switch tính là 1 undo step; tắt HD là 1 step. Layer "Import from a clipart category" bật được HD: khi import, hệ thống gọi POST /api/layer-images/from-clipart để convert clipart thành layer image (url users/{id}/image-layers/...), nên HD chạy bình thường. HD phụ thuộc nơi ảnh nằm: ảnh pick từ clipart category được copy vào image library nên bật HD được; chỉ layer cũ còn trỏ thẳng vào clipart mới bị disable.
CLAIM-11: ImagenHub là dịch vụ xử lý ảnh bằng AI nên effect của nó chỉ áp dụng cho photo upload; Clipart layer không có setting "Image effects". Warning theo từng field và nút "+ variable" trong prompt không nhận title của layer Global Option mà lấy layer name, nên SDK không tìm được variable; lỗi này có cả trên prod. Warning box ở đầu canvas thì match theo title của Global Option.
CLAIM-12: Không dùng pre-render; custom_shape được vẽ bằng canvas ở client (A4), vì file pre-render dùng ratio mặc định 0.1 nên bỏ qua size.
CLAIM-13: Portal không có setting reference image cho layer Text-to-Image ở mọi provider, và buyer cũng không upload được reference image trên storefront. SDK vẫn đọc text_to_image_enable_ref_img / text_to_image_ref_img, nhưng portal không đặt được giá trị cho hai key này. "Use Reference Image" chỉ có ở Gen AI image effect (*:image_filter).
CLAIM-14: Shadow ở trạng thái mixed: toggle Off trừ khi mọi layer bật; color đen, blur/X/Y rỗng, Display trống; đổi 1 thuộc tính chỉ ghi thuộc tính đó. Photo Border ở trạng thái mixed: hiện default; bật toggle ghi đè toàn bộ (type, color, size, display, line) lên mọi layer; đổi 1 thuộc tính cũng bật border cho mọi layer. Mỗi thay đổi là 1 undo step; ô số lưu theo từng phím (gõ "12" là 2 step). Ẩn cả 3 field khi selection có layer customization type Linked. Chọn 1 group (2.0) thì ẩn Photo Border. Artwork 1.0 cùng rule, trừ Shadow trên paragraph chỉ có ở 2.0.
CLAIM-19: Prompt do merchant cố định, buyer chỉ có nút Generate.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 24; TC-TIB-4853 (task TIB-171)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-4853
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-08
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 24:
    ```
    - **Calendar layer font mặc định là Heebo** (các layer text-like khác Roboto). Issue đổi font nhóm text-like mà description nói calendar đổi → nêu điểm lệch cho PO/Dev, không đánh fail. (người dùng 2026-10-08, TIB-5534)
    ```
  - Testlane TC-TIB-4853, actualResult:
    ```
    PASSED — calendar keeping Heebo is by design (calendar layer's default font is Heebo, confirmed by QA owner 2026-10-08).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 25; TC-TIB-5719, TC-TIB-5725, TC-TIB-5760 (task TIB-198)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5719
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 25:
    ```
    - **Text / paragraph rỗng → design trống.** Default text chỉ ở storefront preview. Đúng cả với paragraph vừa là buyer field vừa được populate. Chỉ nhập khoảng trắng → preview và design đều trống. Nguồn populate bị xoá → value "" đè lên chỗ buyer sửa → preview về default text. Kiểm size ở trạng thái rỗng qua `font_size` trong payload line item. (người dùng 2026-10-14, TIB-5538)
    ```
  - Testlane TC-TIB-5719, actualResult:
    ```
    Design blank, byte-identical to never-touched design; no enlarged text. Confirmed by user: empty paragraph → not rendered in design → correct.
    ```
  - Testlane TC-TIB-5760, actualResult:
    ```
    Confirmed by user: after clearing, preview shows default text and an empty paragraph is not rendered in the design → correct.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 26
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 26:
    ```
    - **Multiple Uploads kiểu Multiple Outputs** không tự ra design, không có property cart; cần một layer khác populate value từ nó. Cách dựng: `.claude/flows/layers-image-photo.md` + `personalization-populate-conditional.md`. (người dùng 2026-10-14, TIB-5525)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 27; TC-TIB-5705, TC-TIB-5710 (task TIB-197)
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-5705
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 27:
    ```
    - **Upload .svg trong artwork editor tạo vector layer**; image picker ẩn SVG là chủ đích. Artwork có SVG phải đổi Design format, để mặc định thì order lỗi "Line item cannot generate design". Design format PDF cho layer Photo, order ra PDF có ảnh nhúng, không cần đổi format. Lỗi khi save SVG có raster: `.claude/flows/artwork-editor.md`. (người dùng 2026-10-14, TIB-5512)
    ```
  - Testlane TC-TIB-5705, expectedResult:
    ```
    SVG is added as a Vector layer (not an image layer), renders in editor, persists after reload; no NotSupportedException.
    ```
  - Testlane TC-TIB-5705, expectedResult (note):
    ```
    Note: SVG → vector layer confirmed by user (2026-10-14). SVG hidden from the image layer picker is therefore by design.
    ```
  - Testlane TC-TIB-5710, actualResult:
    ```
    Earlier SVG orders with the default PNG_RGB format (#ins58-2939/#ins58-2943) → "Line item cannot generate design".
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 27
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-14
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 27:
    ```
    - **Upload .svg trong artwork editor tạo vector layer**; image picker ẩn SVG là chủ đích. Artwork có SVG phải đổi Design format, để mặc định thì order lỗi "Line item cannot generate design". Design format PDF cho layer Photo, order ra PDF có ảnh nhúng, không cần đổi format. Lỗi khi save SVG có raster: `.claude/flows/artwork-editor.md`. (người dùng 2026-10-14, TIB-5512)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 54
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 54:
    ```
    | **Strava** (Route Maps `strava-upload`) | Vế | Bỏ dòng Strava, ghi "not testable on staging"; không blocked | người dùng 2026-10-27 TIB-5539 |
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5212; skill-rules-audit.md #37 (rule `hd-preview-size-cap`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5212?focusedCommentId=55717
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27
- **Người viết / người xác nhận:** giangnth (dev)
- **Trích nguyên văn:**
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #37):
    ```
    The “Selected layers use different images…” tooltip came from an older fix that was only on staging and never went to dev; the current staging build replaces it with batch HD (max 10 different images per click).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-10

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5212; skill-rules-audit.md #36, #38 (rule `hd-preview-size-cap`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5212
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16, 2026-10-27
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #36, rule `hd-preview-size-cap`, nguồn ghi: dev xác nhận TIB-5212, comment 2026-10-27:
    ```
    **Batch HD cho multi-select** (dev xác nhận TIB-5212, comment 2026-10-27): chọn nhiều image layer khác ảnh → bật HD hàng loạt, tối đa `MASTER_LARGE_BATCH_LIMIT` (mặc định 10) ảnh khác nhau chưa ở HD mỗi lần bấm, endpoint `POST /layer-images/create-master-large/batch`. Vượt limit: toast info rồi toast lỗi tiêu đề "Something went wrong!", không layer nào đổi. Mỗi chu kỳ poll 2s có switch = 1 undo step; tắt HD = 1 step.
    ```
  - Jira TIB-5212 comment #55717, giangnth, 2026-10-27, khớp một phần:
    ```
    Batch HD is in scope for TIB-5212. The “Selected layers use different images…” tooltip came from an older fix that was only on staging and never went to dev; the current staging build replaces it with batch HD (max 10 different images per click).
    ```
  - skill-rules-audit.md #38, rule `hd-preview-size-cap`, nguồn ghi: người dùng xác nhận 2026-10-16; Dev xác nhận lại TIB-5212, 2026-10-27:
    ```
    **Layer "Import from a clipart category" ĐƯỢC bật HD** (người dùng xác nhận 2026-10-16). Khi import, hệ thống gọi `POST /api/layer-images/from-clipart` để convert clipart thành layer image (url `users/{id}/image-layers/...`), nên HD chạy bình thường. Điều kiện disable bên dưới (TIB-5195) **không áp dụng** cho flow này nữa, đừng kỳ vọng HD disabled cho layer clipart-category import. Dev xác nhận lại ở TIB-5212 (2026-10-27): HD phụ thuộc nơi ảnh nằm, ảnh pick từ clipart category được copy vào image library (TIB-5425) nên bật HD được; chỉ layer **cũ** còn trỏ thẳng vào clipart mới bị disable. Xem [[asset-copy-on-pick-dedup-key]].
    ```
  - Jira TIB-5212 comment #55717, giangnth, 2026-10-27, khớp một phần:
    ```
    HD depends on where the layer's image lives, not on the layer type. Images picked from a clipart category are now copied into the image library (TIB-5425), so HD is enabled for them. HD is disabled with “Cannot work with layers imported from clipart” only for older layers that still point at the clipart itself.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5465; skill-rules-audit.md #39, #40 (rule `imagenhub-template-variable-sync`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5465
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #39, rule `imagenhub-template-variable-sync`, nguồn ghi: người dùng xác nhận 2026-10-21, TIB-5465:
    ```
    ImagenHub is an AI photo-processing service, so its effect applies **only to photo uploads**. A Clipart layer has no "Image effects" setting.
    ```
  - skill-rules-audit.md #40, rule `imagenhub-template-variable-sync`, nguồn ghi: dev xác nhận 2026-10-21, TIB-5465:
    ```
    the per-field warning and the "+ variable" button in the prompt do not recognise the **title of a Global Option layer**. They take the layer name, so the SDK cannot find the variable. This bug also exists on prod. The warning box at the top of the canvas does match by the Global Option title.
    ```
  - Jira TIB-5465 comment #55232, chinhdt, 2026-10-21, khớp một phần:
    ```
    A Global Option layer counts as a match through the Global Option's own title.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5516; skill-rules-audit.md #68, #69 (rule `photo-border-prerender-client-render`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5516?focusedCommentId=53942
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
- **Người viết / người xác nhận:** chauptm (dev)
- **Trích nguyên văn:**
  - Jira TIB-5516 comment #53942, chauptm (dev), 2026-10-09 (dòng #68):
    ```
    The pre-rendered file from the A1/A2 variant (photo-borders/{artwork_id}/{layer}-{hash}.png, generated through POST photo-border-masks) is removed. The SDK now draws the custom_shape border from the mask on a canvas, with no request to the server. This is option A4 in the description.
    ```
  - Jira TIB-5516 comment #53942, chauptm (dev), 2026-10-09 (dòng #69):
    ```
    Why the file was dropped: the API rendered it without the layer's ratio, so it always used the default 0.1 and ignored the border size.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5389; skill-rules-audit.md #171 (rule `text-to-image-genai-layer`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5389
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-18
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #171, rule `text-to-image-genai-layer`, nguồn ghi: người dùng chốt, TIB-5389, 2026-10-18:
    ```
    Portal hiện **không có setting reference image** cho layer Text-to-Image ở mọi provider, và buyer cũng không upload được reference image trên storefront. SDK vẫn đọc `text_to_image_enable_ref_img` / `text_to_image_ref_img`, nhưng portal không đặt được giá trị cho hai key này. Người dùng đã chốt: không viết case reference image cho Text-to-Image. "Use Reference Image" chỉ có ở Gen AI image effect (`*:image_filter`).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5212; skill-rules-audit.md #172, #173, #174, #175, #176 (rule `toolbar-effect-capability-intersection`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5212?focusedCommentId=55717
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27
- **Người viết / người xác nhận:** giangnth (dev)
- **Trích nguyên văn:**
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #172):
    ```
    Shadow: the toggle shows Off unless all layers have it on; color shows black, blur/X/Y are empty, Display has nothing selected. Changing one property changes only that property on every layer; the rest stay per layer.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #173):
    ```
    Photo Border: mixed properties show their default values. Turning the Border toggle on writes all shown values (type, color, size, display, line) to every layer, so individual settings are replaced. Changing one property changes only that property but also turns the border on for every selected layer.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #174):
    ```
    Each change is 1 undo step for all affected layers. Number fields (X, Y, blur, border size) save on every keystroke, so typing “12” is 2 steps (same as before).
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #175):
    ```
    Linked layers (correction): the three fields are hidden whenever the selection contains a layer with customization type Linked (not only newly linked ones). Global Template replica layers: no special rule, they behave as a single layer did before. Artwork 1.0: in scope with the same rules, except Shadow on paragraph is 2.0 only. (correction) In Artwork 2.0, selecting a single group hides Photo Border (the group border owns it); Shadow and HD still show.
    ```
  - Jira TIB-5212 comment #55717, giangnth (dev), 2026-10-27 (dòng #176):
    ```
    Artwork 1.0: in scope with the same rules, except Shadow on paragraph is 2.0 only.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-19

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** TIB-5389; skill-rules-audit.md A63
- **Link:** https://ownego.atlassian.net/browse/TIB-5389
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-18
- **Người viết / người xác nhận:** không ghi tên
- **Trích nguyên văn:**
  - skill-rules-audit.md A63, rule `text-to-image-genai-layer`, nguồn ghi: Cập nhật TIB-5389 (2026-10-18); dòng này không ghi ai chốt:
    ```
    Prompt do merchant cố định, buyer chỉ có nút Generate. Muốn test moderation thì phải tạo một layer riêng chứa prompt vi phạm.
    ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

không có

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật
- [x] Đã ghi build/ngày update hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi từ khoá tra canon
- [x] Mỗi claim có đúng 1 dòng ở Phần 1a, 1 dòng ở Phần 1b, 1 block ở Phần 5.1
- [x] Cột nguồn ghi đúng 1 trong 5 trạng thái
- [x] Phần 2a và 2b đã điền
- [x] Không còn placeholder
