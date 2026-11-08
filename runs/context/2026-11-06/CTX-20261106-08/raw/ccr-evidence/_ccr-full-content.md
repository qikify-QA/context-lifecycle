# Context Change Request: Teeinblue, sdk

**Tiêu đề task:** `[CCR] PROFILE_GAP — sdk — backfill cross-sell và giới hạn môi trường storefront`

Khuôn: bundled canonical `references/ccr-template.md` của skill `create-ccr`. Phụ lục: `context-lifecycle/knowledge/how-to-request/ccr-product-appendix.md`. Bản nháp local, chưa submit. Trích dẫn Jira lấy từ comment, đã bỏ thẻ định dạng; `[...]` trong trích dẫn là phần che tên account hoặc id theo yêu cầu.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đề xuất 1 CCR cho object này, vì CCR chạm cùng object sẽ bị lock. Mọi claim cùng product `teeinblue`. 

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `PROFILE_GAP`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: `sdk` · Feature: `MỚI: addon-charge-pricing`, `MỚI: checkout-ui-extensions`, `MỚI: form-artwork-navigation`, `MỚI: photo-upload-transport`, `MỚI: required-addon-validation`, `genai-personalization-runtime`, `storefront-buyer-facing`

**Quan sát được** `[AGENT]`

```
TIB-5418: Improve variant picker behavior in the Cross-sell popup (Done)
  - CLAIM-01: Cross-sell: set cả 2 metafield (collection và product) thì ưu tiên collection
  - CLAIM-02: Popup cross-sell không ảnh hưởng form chính
  - CLAIM-20: Variant picker cross-sell theo availability
  - CLAIM-21: Variant picker cross-sell theo availability (phần 2)
TIB-5539: [SDK] Handle 429 rate-limit responses in the storefront customize flow (Done)
  - CLAIM-03: Strava ở storefront (route maps, `strava-upload`) không test được trên staging
  - CLAIM-17: Thông báo 429 cho buyer
  - CLAIM-18: Thông báo 429 cho buyer (phần 2)
TIB-5551: [SDK] Fix preconnect hints Lighthouse reports as unused (Done)
  - CLAIM-04: `photo_endpoint=snap`: Portal không có setting; trên staging snap trùng URL photo-api
  - CLAIM-05: photo-api, upload CORS, preconnect cdn và photo-api vẫn là host production
  - CLAIM-06: Network timing: số headless chỉ tham khảo
không có ticket
TIB-5482: tiêu đề và status chưa tra
TIB-5349: tiêu đề và status chưa tra
  - CLAIM-09: Điều hướng form nhiều artwork trên storefront
  - CLAIM-10: Điều hướng form nhiều artwork trên storefront (phần 2)
TIB-5620: tiêu đề và status chưa tra
  - CLAIM-11: Đường upload ảnh: Vector Upload và mạng yếu (phần 2)
TIB-5583: Fix prompt variable reading translated option value instead of original (Done)
  - CLAIM-12: Prompt variable lấy giá trị gốc
  - CLAIM-13: Prompt variable lấy giá trị gốc (phần 2)
TIB-5510: Block checkout when a required addon product is missing from cart (Done)
  - CLAIM-14: Chặn ATC và checkout khi thiếu addon
  - CLAIM-15: Chặn ATC và checkout khi thiếu addon (phần 2)
  - CLAIM-16: Chặn ATC và checkout khi thiếu addon (phạm vi test)
TIB-5525: [Investigate] Move presigned photo uploads from Wasabi (us-east-1) to Cloudflare R2 to reduce upload timeouts (Done)
TIB-5652: tiêu đề và status chưa tra
TIB-5389: tiêu đề và status chưa tra
TIB-5341: tiêu đề và status chưa tra
TIB-5460: tiêu đề và status chưa tra
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
| `CLAIM-01` | loại: hành vi. Cross-sell: set cả 2 metafield (collection và product) thì ưu tiên collection | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-02` | loại: hành vi. Popup cross-sell không ảnh hưởng form chính | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-03` | loại: khác biệt môi trường. Strava ở storefront (route maps, `strava-upload`) không test được trên staging | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-04` | loại: khác biệt môi trường. `photo_endpoint=snap`: Portal không có setting; trên staging snap trùng URL photo-api | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-05` | loại: khác biệt môi trường. photo-api, upload CORS, preconnect cdn và photo-api vẫn là host production | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-06` | loại: khác biệt môi trường. Network timing: số headless chỉ tham khảo | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-09` | loại: hành vi. Điều hướng form nhiều artwork trên storefront | storefront | `po_dev_confirm` | sdk/MỚI: form-artwork-navigation | `ADD` |
| `CLAIM-10` | loại: hành vi. Điều hướng form nhiều artwork trên storefront (phần 2) | storefront | `po_dev_confirm` | sdk/MỚI: form-artwork-navigation | `ADD` |
| `CLAIM-11` | loại: hành vi. Đường upload ảnh: Vector Upload và mạng yếu (phần 2) | storefront | `po_dev_confirm` | sdk/MỚI: photo-upload-transport | `ADD` |
| `CLAIM-12` | loại: hành vi. Prompt variable lấy giá trị gốc | storefront | `po_dev_confirm` | sdk/genai-personalization-runtime | `ADD` |
| `CLAIM-13` | loại: hành vi. Prompt variable lấy giá trị gốc (phần 2) | storefront | `po_dev_confirm` | sdk/genai-personalization-runtime | `ADD` |
| `CLAIM-14` | loại: hành vi. Chặn ATC và checkout khi thiếu addon | storefront | `po_dev_confirm` | sdk/MỚI: required-addon-validation | `ADD` |
| `CLAIM-15` | loại: hành vi. Chặn ATC và checkout khi thiếu addon (phần 2) | storefront | `po_dev_confirm` | sdk/MỚI: required-addon-validation | `ADD` |
| `CLAIM-16` | loại: scope test. Chặn ATC và checkout khi thiếu addon (phạm vi test) | storefront | `po_dev_confirm` | sdk/MỚI: required-addon-validation | `ADD` |
| `CLAIM-17` | loại: hành vi. Thông báo 429 cho buyer | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-18` | loại: hành vi. Thông báo 429 cho buyer (phần 2) | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-20` | loại: hành vi. Variant picker cross-sell theo availability | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-21` | loại: hành vi. Variant picker cross-sell theo availability (phần 2) | storefront | `po_dev_confirm` | sdk/storefront-buyer-facing | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | sdk | storefront-buyer-facing | buyer, merchant | storefront | không có (liên quan product-page-settings-config KB-028) |
| `CLAIM-02` | sdk | storefront-buyer-facing | buyer | storefront | không có |
| `CLAIM-03` | sdk | storefront-buyer-facing | buyer | storefront | không có |
| `CLAIM-04` | sdk | storefront-buyer-facing | buyer, Dev/admin | storefront | không có |
| `CLAIM-05` | sdk | storefront-buyer-facing | buyer | storefront | không có |
| `CLAIM-06` | sdk | storefront-buyer-facing | buyer | storefront | không có |
| `CLAIM-09` | sdk | MỚI: form-artwork-navigation | không rõ | storefront | không có |
| `CLAIM-10` | sdk | MỚI: form-artwork-navigation | không rõ | storefront | không có |
| `CLAIM-11` | sdk | MỚI: photo-upload-transport | không rõ | storefront | liên quan KB-023 layer-config-vector (OBSERVED_CURRENT) |
| `CLAIM-12` | sdk | genai-personalization-runtime | không rõ | storefront | liên quan KB-115 layer-config-image (OBSERVED_CURRENT) |
| `CLAIM-13` | sdk | genai-personalization-runtime | không rõ | storefront | không có |
| `CLAIM-14` | sdk | MỚI: required-addon-validation | không rõ | storefront | không có |
| `CLAIM-15` | sdk | MỚI: required-addon-validation | không rõ | storefront | không có |
| `CLAIM-16` | sdk | MỚI: required-addon-validation | không rõ | storefront | không có |
| `CLAIM-17` | sdk | storefront-buyer-facing | không rõ | storefront | không có |
| `CLAIM-18` | sdk | storefront-buyer-facing | không rõ | storefront | không có |
| `CLAIM-20` | sdk | storefront-buyer-facing | không rõ | storefront | không có |
| `CLAIM-21` | sdk | storefront-buyer-facing | không rõ | storefront | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** storefront

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Feature | Loại | Staging | Production | Cách test trên staging | Nguồn và ngày |
|---|---|---|---|---|---|---|
| `CLAIM-03` | `sdk/storefront-buyer-facing` | `NOT_TESTABLE` (mức: Vế) | không test được Strava | không rõ | không test được; bỏ dòng Strava, ghi "not testable on staging", không tính blocked | QA 2026-10-27, TIB-5539 |
| `CLAIM-04` | `sdk/storefront-buyer-facing` | `DIFFERENT_VALUE` (mức: Case hoặc vế) | snap = photo-api cùng URL; chỉ Dev/admin set được | không rõ | chỉ verify HTML/preconnect | file local 2026-10-23 TIB-5551, kinh nghiệm vận hành, người chốt: QA |
| `CLAIM-05` | `sdk/storefront-buyer-facing` | `NOT_TESTABLE` (mức: Vế) | hai host này vẫn là production nên staging không kiểm được | kiểm trên production | không test được trên staging; phải kiểm trên production | file local 2026-10-22 TIB-5551, kinh nghiệm vận hành, người chốt: QA |
| `CLAIM-06` | `sdk/storefront-buyer-facing` | `ALTERNATIVE_SETUP` (mức: Vế) | số đo headless chỉ tham khảo | không rõ | kết luận theo Chrome thật (headed, hoặc người kiểm DevTools) | file local 2026-10-23 TIB-5551, kinh nghiệm vận hành, người chốt: QA |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5418 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5539 | không rõ | 2026-10-28 | Jira Done, chưa rõ ngày deploy |
| TIB-5551 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5482 | không rõ | không rõ | không rõ |
| TIB-5349 | không rõ | không rõ | không rõ |
| TIB-5620 | không rõ | không rõ | không rõ |
| TIB-5583 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5510 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5525 | không rõ | 2026-10-20 | Jira Done, chưa rõ ngày deploy |
| TIB-5652 | không rõ | không rõ | không rõ |
| TIB-5389 | không rõ | không rõ | không rõ |
| TIB-5341 | không rõ | không rõ | không rõ |
| TIB-5460 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 13; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: sdk/product-page-settings-config KB-028 (OBSERVED_CURRENT, cập nhật 2026-09-21): "Checkbox 'Show Cross-sell Personalization' (help: cho phép buyer cá nhân hoá và thêm 1 item phụ cùng sản phẩm chính) = unchecked trên cả store1 và store2.…"
  - CLAIM-02, CLAIM-03, CLAIM-04, CLAIM-05, CLAIM-06, CLAIM-09, CLAIM-10, CLAIM-11, CLAIM-12, CLAIM-13, CLAIM-14, CLAIM-15, CLAIM-16, CLAIM-17, CLAIM-18, CLAIM-20, CLAIM-21: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: cross-sell, metafield, collection
  - CLAIM-02: cross-sell popup, CampaignForm, main form
  - CLAIM-03: Strava, strava-upload
  - CLAIM-04: photo_endpoint, snap-api, snap
  - CLAIM-05: preconnect, photo-api, crossorigin, CORS
  - CLAIM-06: network timing, TTFB, connection reuse, headless
  - CLAIM-09: form-artwork-navigation
  - CLAIM-10: form-artwork-navigation
  - CLAIM-11: presigned-upload-network-resilience
  - CLAIM-12: prompt-variable-value-source
  - CLAIM-13: prompt-variable-value-source
  - CLAIM-14: required-addon-checkout-validation
  - CLAIM-15: required-addon-checkout-validation
  - CLAIM-16: required-addon-checkout-validation
  - CLAIM-17: sdk-429-shopper-message
  - CLAIM-18: sdk-429-shopper-message
  - CLAIM-20: storefront-variant-picker-availability
  - CLAIM-21: storefront-variant-picker-availability
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-11: #71 ngày 2026-10-28 mới hơn comment chinhdt #55699 ngày 2026-10-27 (liệt kê Vector Upload qua edge Worker). Claim theo #71.
- CLAIM-15: Mặc định toggle ở comment #55732 ngày 2026-10-27 bị comment #56209 ngày 2026-11-02 thay. Chỉ giữ vế scope.
- CLAIM-16: #100 ngày 2026-10-26 mới hơn Scenario B2 của comment phatnt #55071 (tạo 2026-10-19, sửa 2026-10-22). Claim theo #100.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-02` | phatnt (dev) | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-03` | QA | 2026-10-27 | `po_dev_confirm` |
| `CLAIM-04` | QA | 2026-10-23 | `po_dev_confirm` |
| `CLAIM-05` | QA | 2026-10-22 | `po_dev_confirm` |
| `CLAIM-06` | QA | 2026-10-23 | `po_dev_confirm` |
| `CLAIM-09` | huytv (dev) | 2026-09-30 | `po_dev_confirm` |
| `CLAIM-10` | QA | 2026-09-30 | `po_dev_confirm` |
| `CLAIM-11` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-12` | chinhdt (dev) | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-13` | QA | 2026-10-26 | `po_dev_confirm` |
| `CLAIM-14` | phatnt (dev) | 2026-10-27, 2026-10-30 | `po_dev_confirm` |
| `CLAIM-15` | QA | 2026-10-26, 2026-10-27, 2026-11-02, 2026-11-03 | `po_dev_confirm` |
| `CLAIM-16` | QA | 2026-10-26 | `po_dev_confirm` |
| `CLAIM-17` | huytv (dev) | 2026-10-23 | `po_dev_confirm` |
| `CLAIM-18` | QA | 2026-10-23 | `po_dev_confirm` |
| `CLAIM-20` | phatnt (dev) | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-21` | QA | 2026-10-15 | `po_dev_confirm` |

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
CLAIM-01: Khi set cả metafield collection và product cho cross-sell, collection được ưu tiên.
CLAIM-02: Popup cross-sell không ảnh hưởng form sản phẩm chính.
CLAIM-03: [NOT_TESTABLE] Môi trường test: Strava (`strava-upload`) không chạy được; Production: không rõ; Cách test: bỏ vế Strava, ghi "not testable on staging", không tính blocked.
CLAIM-04: [DIFFERENT_VALUE] Môi trường test: `photo_endpoint=snap` trỏ cùng URL photo-api, Portal không có setting, chỉ Dev/admin set được; Production: không rõ; Cách test: chỉ verify HTML và preconnect.
CLAIM-05: [NOT_TESTABLE] Môi trường test: photo-api, upload CORS, preconnect cdn và photo-api vẫn là host production; Production: kiểm được; Cách test: kiểm trên production.
CLAIM-06: [ALTERNATIVE_SETUP] Môi trường test: số đo preconnect, connection reuse, TTFB trên headless chỉ tham khảo; Production: không rõ; Cách test: kết luận theo Chrome thật.
CLAIM-09: Platform/Shopify product không có khái niệm Product Base nên tên đặt ở cấp product, nhưng vẫn có ô tên này. Cách render tên: seller để trống thì nav/section title là "Organic Cap 1", pill gallery là "Organic Cap 1/2"; nhập "Customize #{{index}} design" thì nav là "Customize #1 design", pill là "Customize #1/2 design"; nhập "My design" (không có {{index}}) thì nav là "My design 1", pill là "My design 1/2"; nhập "Design {{ index }}" (có space trong placeholder) thì nav là "Design 1", pill là "Design 1/2"; nhập toàn khoảng trắng thì coi như trống. Nav bar chỉ hiện số (#1); chỉ pill trên gallery hiện phân số (#1/2), và phân số đặt đúng vị trí {{index}}. Popup không có dòng "Note: Navigation will use Product Base as the menu name". Product Base mới thêm vào campaign có sẵn có nav mặc định tắt, đây là hành vi chủ định. Addon product, cross-sell và nút Personalize không có nav. Đổi toggle hoặc tên thì cache storefront được xoá ngay. Khi migration campaign cũ, campaign đang bật nav hoặc đã đặt tên được chép cài đặt xuống mọi Product Base, và storefront giữ y hệt như trước deploy. Với campaign nhiều Product Base, đổi variant sang Product Base khác thì nav bật/tắt và đổi tên theo Product Base đang chọn.
CLAIM-10: Toggle và tên menu lưu theo từng Product Base, không ở cấp campaign. Mỗi Product Base có popup Quick navigation riêng, không phải một popup liệt kê tất cả. Popup có ô "Menu Item's name", chỉ hiện khi toggle bật, giới hạn 255 ký tự. Ô tên auto-save khi blur hoặc Enter và có toast thông báo; gõ xong mà không blur/Enter rồi reload thì mất giá trị. Toggle và ô tên lưu độc lập; lưu lỗi thì revert về giá trị cũ. Với Dynamic Translation, key phải là nguyên cả chuỗi kể cả {{index}} (vd key "customize #{{index}}" có value "customize en #{{index}}"); key thiếu {{index}} thì mất số thứ tự, key chỉ là "customize" thì không dịch. Tên menu không tự xuất hiện trong danh sách Dynamic Translation, seller phải tự gõ key. Portal luôn hiển thị và lưu tên gốc của seller, không bị bản dịch ghi đè. Hàm xoá cache campaign dùng chung cho 3 flow: sửa artwork, đồng bộ ảnh sản phẩm Shopify/Etsy, lệnh sync campaign lên store. Nhiều {{index}} trong một chuỗi thì mọi vị trí đều được điền đúng index, vd "Design {{index}} of {{index}}" cho nav "Design 1 of 1". Tên dài trên nav mobile xuống dòng (wrap), không truncate/ellipsis. Thay đổi chỉ là form copy trên storefront, không chạm order, generated artwork hay print file. Sau khi xoá cache vẫn có thể còn layer cache khác. Product Base 1 artwork sau migration có nút toggle vẫn disabled nhưng giá trị ON đã migrate nằm sẵn, nên thêm artwork thứ 2 thì nav tự được enable mà seller không phải bật tay. Product Base cũ đã qua migration (ON dormant) khi thêm artwork thì nav ON; Product Base hoàn toàn mới thêm vào campaign thì nav OFF.
CLAIM-11: Vector Upload không đi Worker: field Vector Upload upload qua API vector-upload; chỉ khi store bật multiple file types và khách upload file không phải vector thì mới đi Worker. File vẫn lên R2 vì env storage chung là R2.
CLAIM-12: Nguồn điền được variable chỉ gồm Text, Additional Option, JSON List. Artwork template selector ("Choose a design") không phải là nguồn. Template merchant viết theo giá trị đã dịch sẽ hỏng sau deploy, đây là hành vi chủ định theo dev.
CLAIM-13: Phạm vi chỉ là option value; option title đã dịch nằm ngoài scope. Fix áp dụng cho mọi nơi dùng variable (mọi AI prompt, mọi ImagenHub template). Nguồn Global Option và JSON List cũng gửi giá trị gốc. Image swatch/color chỉ là kiểu hiển thị của Additional Option, không phải đường giá trị riêng. Đổi locale sau khi generate không làm ảnh bị stale. Dữ liệu order, design, export không đổi so với trước fix. "+ Variable" trong Portal editor không liệt kê template selector. Editor hiện "no matching layer: <name>" khi variable chỉ trỏ tới selector. Khi không có layer khớp, storefront gửi raw token (vd {{Design}}) cho provider, không chặn generation và không cảnh báo buyer; hành vi này được chấp nhận. Không có thông báo cho merchant về việc bỏ template selector khỏi nguồn.
CLAIM-14: _tib_addon_variant có format <variantId>:<rate>|<variantId>:<rate>; mỗi addon được kiểm riêng, nên một addon thiếu là chặn checkout. Dynamic Translations không bao gồm message hệ thống/validation của SDK. "Your selection is out of stock…" là key có sẵn out_of_stock_message (Portal › Product Page Content › Out of stock, hoặc window.teeinblue.outOfStockMessage).
CLAIM-15: rate lấy từ addon setting trong artwork layer. Addon direct-price không mang _tib_addon_variant nên Function không bao giờ kiểm. Edit Customization đổi _tib_customization_id và addon line đổi theo. Validation banner hiện ở trang checkout và Pay now không hoàn tất được. Function lỗi thì fail open (checkout thành công). "Unlisted" là trạng thái Unlisted product của Shopify. Ngoài scope: các trường hợp Function lỗi, draft order, POS, B2B. Message ở checkout dùng chung cho "missing" và "not enough quantity", chỉ có tiếng Anh vì Function runtime không có locale. Message ở ATC dịch được qua addon_unavailable_error. Availability của SDK là snapshot lúc page load. Tab cũ (addon bị archive sau khi load trang) không chặn ATC: Shopify trả 422 hoặc Layer 2 chặn ở checkout. Tab cũ mà addon đã có hàng lại thì vẫn chặn tới khi reload. SDK ATC block mặc định OFF, bật theo từng store bằng window.teeinblue.blockAtcUnavailableAddon = true trong theme.liquid; toggle này không có UI ở Portal, dev của merchant phải tự thêm snippet vào theme. Portal › Product Page Content / Translations › Addon Charge có addon_unavailable_error (cấp form, EN mặc định "…contact store support.") và addon_unavailable_message (cấp field, EN mặc định "The selected add-on is currently unavailable."). Fallback cấp field: snippet addonUnavailableMessage, rồi Portal addon_unavailable_message, rồi snippet addonUnavailableError, rồi Portal addon_unavailable_error, rồi EN. Fallback cấp form: snippet addonUnavailableError, rồi Portal addon_unavailable_error, rồi EN. Theme snippet ghi đè Portal.
CLAIM-16: Shop Pay và PayPal nằm ngoài scope QA.
CLAIM-17: Chỉ hiện message, không khoá nút, không retry, không countdown; nút ATC bật lại ngay sau lỗi, PO đã chấp nhận. Fallback single upload theo thứ tự edge, presigned, photo-upload; buyer thấy lỗi của route cuối. Ngoại lệ: edge GenAI (genai-uploads) trả 429 thì dừng luôn và hiện câu 429. Provider rate limit (poll HTTP 200 kèm error_message = rate_limit_exceeded) là nhánh khác, giữ câu rate_limit_exceeded. Key dịch nằm ở portal Translations → product page content → block General error messages.
CLAIM-18: Với Retry-After: dưới 60s hiện giây (số ít/nhiều), từ 60s trở lên làm tròn lên phút; giá trị 0, âm, rác, rỗng, HTTP-date đã qua hoặc >3600 thì hiện câu chung; số thập phân làm tròn lên; HTTP-date tương lai tính số giây còn lại. Endpoint có trả/expose Retry-After hay không là việc của backend, không do SDK quyết định.
CLAIM-20: First available là variant đầu tiên trong variants[] có availableForSale: true; sold out toàn bộ thì fallback variants[0]. Tổ hợp không tồn tại thì nhảy tới variant tồn tại "hợp lý nhất": ưu tiên còn hàng, giữ được nhiều lựa chọn khác của buyer nhất, bỏ các option cũ của product trước. Giá luôn là giá thật của variant, không bao giờ là $0.00. Buyer chọn variant tồn tại nhưng sold out thì giữ lựa chọn, hiện giá thật, CTA hiện "Sold out", không tự nhảy.
CLAIM-21: Mockup/ảnh sau auto-select theo logic mockup hiện có (mockup gán cho variant, không có thì load mockup đầu tiên), không có rule mockup mới. Entry point gồm mở popup, chọn product từ collection, đổi style/product. CampaignForm chính và Addon product thường không đổi. Phạm vi chỉ là cross-sell campaign popup, với 3 nguồn product: product base, SFP, Shopify product.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 32
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 32:
    ```
    - **Cross-sell:** set cả 2 metafield (collection và product) → ưu tiên collection. Popup cross-sell không ảnh hưởng form chính. Setup: `.claude/flows/storefront-sdk.md#Cross-sell`. (TIB-5418, 2026-10-15)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5418 comment #54647
- **Link:** https://ownego.atlassian.net/browse/TIB-5418?focusedCommentId=54647
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** phatnt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15:
    ```
    Main product form ngoài trang cá nhân hóa chính (CampaignForm, form sản phẩm chính) và Addon product thông thường hoàn toàn không bị ảnh hưởng.
    ```
  - rules/tib-product-behaviors.md dòng 32:
    ```
    - **Cross-sell:** set cả 2 metafield (collection và product) → ưu tiên collection. Popup cross-sell không ảnh hưởng form chính. Setup: `.claude/flows/storefront-sdk.md#Cross-sell`. (TIB-5418, 2026-10-15)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

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

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 57
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 57:
    ```
    | **`photo_endpoint=snap`** | Case/vế | Portal không có setting; chỉ Dev/admin set được. Trên staging snap = photo-api cùng URL → chỉ verify HTML/preconnect | 2026-10-23 TIB-5551 |
    ```
  - Jira TIB-5551 comment #53934, tinhpt (dev), 2026-10-09:
    ```
    The photo-api.teeinblue.com preconnect (or snap-api when the store's photo endpoint is snap) still has crossorigin.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 58
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 58:
    ```
    | **photo-api / upload CORS / preconnect cdn, photo-api** | Vế | Hai host này vẫn là production → phải kiểm trên production | 2026-10-22 TIB-5551 |
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 59
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 59:
    ```
    | **Network timing** (preconnect, connection reuse, TTFB) | Vế | Số headless chỉ tham khảo; kết luận theo Chrome thật (headed / người dùng kiểm DevTools) | 2026-10-23 TIB-5551 |
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5349; skill-rules-audit.md #15, #16, #17, #18, #19, #20, #22, #24, #25, #26 (rule `form-artwork-navigation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5349?focusedCommentId=52793
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-30
- **Người viết / người xác nhận:** huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #15):
    ```
    Sản phẩm Shopify/platform product vẫn đặt tên ở cấp product như cũ (không có khái niệm Product Base), nhưng cũng có ô tên này.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #16):
    ```
    Seller nhập | Thanh nav / tiêu đề section | Pill trên gallery (để trống) | Organic Cap 1 | Organic Cap 1/2 Customize #{{index}} design | Customize #1 design | Customize #1/2 design My design (không có {{index}}) | My design 1 | My design 1/2 Design {{ index }} (có khoảng trắng) | Design 1 | Design 1/2 Toàn khoảng trắng | Coi như để trống | Coi như để trống
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #17):
    ```
    Thanh nav chỉ hiện số (#1). Chỉ pill trên gallery mới hiện phân số (#1/2).
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #18):
    ```
    Dòng "Note: Navigation will use Product Base as the menu name" trong popup đã được bỏ.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #19):
    ```
    Product Base mới thêm vào campaign có sẵn thì navigation mặc định tắt, phải bật riêng.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #20):
    ```
    Addon product, cross-sell và nút Personalize không có thanh nav, giữ nguyên quyết định từ TIB-5223.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #22):
    ```
    Cache storefront: trước đây bật/tắt navigation xong, storefront có thể phải chờ tới 1 tiếng mới thấy thay đổi. Giờ đổi toggle hoặc tên thì cache được xoá ngay.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #24):
    ```
    Campaign cũ sau deploy: khi migrate, campaign đang bật navigation hoặc đã đặt tên sẽ được chép cài đặt đó xuống mọi Product Base. Storefront phải trông y như trước.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #25):
    ```
    Pill số thứ tự trên gallery: trước đây pill cắt số ở cuối label để ghép phân số. Giờ phân số nằm đúng chỗ {{index}}.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #26):
    ```
    Campaign nhiều Product Base trên storefront: thanh nav bật/tắt và đổi tên theo Product Base của variant đang chọn.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-10

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5349; skill-rules-audit.md #14, #21, #23, #27, #28, #29, #30, #31, #32, #33, #34, #35 (rule `form-artwork-navigation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5349
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #14, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Toggle + tên menu lưu per Product Base**, không còn ở cấp campaign. Popup Quick navigation có thêm ô `Menu Item's name`, chỉ hiện khi toggle bật, **auto-save khi blur hoặc Enter**, giới hạn **255 ký tự**. Toggle và ô tên **lưu độc lập**; lưu lỗi thì revert về giá trị cũ.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Giờ seller bật/tắt và đặt tên menu riêng cho từng Product Base trong campaign, ngay trong popup Quick navigation. Ô mới là "Menu Item's name", chỉ hiện khi toggle đang bật, tự lưu khi rời ô hoặc bấm Enter.
    ```
  - skill-rules-audit.md #21, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Dynamic Translation**: key phải là **nguyên cả chuỗi kể cả `{{index}}`** (vd key `customize #{{index}}` → value `customize en #{{index}}`). Key thiếu `{{index}}` → mất số thứ tự; key chỉ là `customize` → không dịch. Tên menu **không tự xuất hiện** trong danh sách Dynamic Translation, seller phải tự gõ key. Portal luôn hiển thị/lưu **tên gốc của seller**, không bị bản dịch ghi đè.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Dịch tên menu phải dùng nguyên cả chuỗi làm key, kể cả {{index}}. Ví dụ key customize #{{index}} → value customize en #{{index}}. Nếu chỉ thêm key customize thì tên sẽ không được dịch. Bản dịch thiếu {{index}} thì mất số thứ tự.
    ```
  - skill-rules-audit.md #23, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Hàm xoá cache campaign dùng chung** từng lỗi & dừng giữa chừng với campaign có store liên kết chưa đầy đủ (chưa publish xong). Hàm này dùng chung cho: **sửa artwork**, **đồng bộ ảnh sản phẩm Shopify/Etsy**, **lệnh sync campaign lên store** → 3 flow này phải regression.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Hàm xoá cache campaign dùng chung: hàm này từng bị lỗi và dừng giữa chừng với campaign có store liên kết chưa đầy đủ (chưa publish xong). Hàm được dùng cho: sửa artwork, đồng bộ ảnh sản phẩm Shopify/Etsy, và lệnh sync campaign lên store. Với các campaign đó, cache giờ được xoá đúng thay vì lỗi.
    ```
  - skill-rules-audit.md #27, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Mỗi Product Base có popup Quick navigation RIÊNG** (không phải 1 popup liệt kê hết các PB).
    ```
  - skill-rules-audit.md #28, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Nhiều `{{index}}` trong 1 chuỗi ⇒ điền đúng index vào TẤT CẢ vị trí.** Vd `Design {{index}} of {{index}}` → nav `Design 1 of 1`.
    ```
  - skill-rules-audit.md #29, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Tên dài trên nav mobile ⇒ xuống dòng (wrap)**, không truncate/ellipsis.
    ```
  - skill-rules-audit.md #30, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Auto-save có toast thông báo.**
    ```
  - skill-rules-audit.md #31, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Ticket KHÔNG chạm order / generated artwork / print file** — chỉ là form copy trên storefront. Bỏ nhóm regression đó khỏi scope.
    ```
  - skill-rules-audit.md #32, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Sau khi "xoá cache ngay" vẫn có thể còn layer cache khác** ⇒ case cache phải hard-reload + retry trước khi kết luận, đừng fail ngay lần đầu.
    ```
  - skill-rules-audit.md #33, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    **Thời điểm auto-save: theo dev — lưu khi RỜI Ô (blur) hoặc bấm Enter.** Gõ xong mà không blur/Enter rồi reload ⇒ **mất giá trị**. (Bản "gõ xong là save" đã bị bác.)
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Ô mới là "Menu Item's name", chỉ hiện khi toggle đang bật, tự lưu khi rời ô hoặc bấm Enter.
    ```
  - skill-rules-audit.md #34, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    **PB 1 artwork sau migration**: nút toggle **vẫn disabled**, nhưng giá trị ON đã được migrate nằm sẵn ⇒ **thêm artwork thứ 2 vào PB đó thì nav tự được enable**, seller không phải bật tay.
    ```
  - skill-rules-audit.md #35, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    PB **cũ** (đã qua migration, ON dormant) + thêm artwork ⇒ nav **ON**. / PB **mới toanh** thêm vào campaign ⇒ nav **OFF**.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Product Base mới thêm vào campaign có sẵn thì navigation mặc định tắt, phải bật riêng.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5620; skill-rules-audit.md #71 (rule `presigned-upload-network-resilience`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5620
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #71, rule `presigned-upload-network-resilience`, nguồn ghi: Dev xác nhận TIB-5620, 2026-10-28:
    ```
    **Vector Upload KHÔNG đi Worker** (Dev xác nhận TIB-5620, 2026-10-28): field Vector Upload upload qua API `vector-upload`; chỉ khi store bật multiple file types và khách upload file không phải vector thì mới đi Worker. Vẫn lên R2 vì env storage chung = R2 (staging đã set).
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5583; skill-rules-audit.md #84, #86 (rule `prompt-variable-value-source`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5583?focusedCommentId=54693
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** chinhdt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5583 comment #54693, chinhdt (dev), 2026-10-15 (dòng #84):
    ```
    Artwork template selector: prompt variables no longer resolve to the artwork template selector ("Choose a design" style dropdown). Only layers can fill a variable: Text, Additional Option and JSON List.
    ```
  - Jira TIB-5583 comment #54693, chinhdt (dev), 2026-10-15 (dòng #86):
    ```
    A seller who wrote their prompt or ImagenHub template against the translated value must now use the original value. This is the intended behaviour for this ticket.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5583; skill-rules-audit.md #87, #88, #89, #90, #91, #92, #93, #94, #95 (rule `prompt-variable-value-source`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5583
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #87, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Scope is the **option value** only. A translated **option title** is out of scope.
    ```
  - skill-rules-audit.md #88, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    The fix covers **every consumer** that uses variables (all AI prompts, all ImagenHub templates).
    ```
  - Jira TIB-5583 comment #54693, chinhdt, 2026-10-15, khớp một phần:
    ```
    Prompt variables, used in AI prompts and ImagenHub templates, read values from the buyer's choices on the form. This change covers two cases where a variable picked up the wrong value.
    ```
  - skill-rules-audit.md #89, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    **Global Option** and **JSON List** sources also send the original value.
    ```
  - skill-rules-audit.md #90, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Image swatch / color is only a display type of Additional Option, not a separate value path. No separate case needed.
    ```
  - skill-rules-audit.md #91, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Switching locale after generating does **not** make the image stale.
    ```
  - skill-rules-audit.md #92, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Order / design / export data: **unchanged** versus before the fix.
    ```
  - skill-rules-audit.md #93, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    Portal editor "+ Variable" does **not** list the template selector. The editor shows "no matching layer: <name>" when a variable refers only to the selector. The earlier answer "still lists" was corrected by the user on 2026-10-26 after checking it.
    ```
  - skill-rules-audit.md #94, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    When no layer matches, the storefront sends the **raw token** (e.g. `{{Design}}`) to the provider, does not block generation, and shows the buyer no warning. Accepted as-is (user, 2026-10-26).
    ```
  - skill-rules-audit.md #95, rule `prompt-variable-value-source`, nguồn ghi: PO/Dev, TIB-5583, 2026-10-26:
    ```
    No merchant communication about removing the template selector as a source.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5510; skill-rules-audit.md #104, #107, #108 (rule `required-addon-checkout-validation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5510?focusedCommentId=55732
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27, 2026-10-30
- **Người viết / người xác nhận:** phatnt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5510 comment #55732, phatnt (dev), 2026-10-27 (dòng #104):
    ```
    CÓ, Function kiểm tra độc lập TỪNG add-on variant một. Thuộc tính _tib_addon_variant lưu danh sách toàn bộ variant bắt buộc theo format: <variantId_1>:<rate_1>|<variantId_2>:<rate_2>. Function sẽ duyệt qua từng variant: Tính số lượng yêu cầu của từng add-on: parentQuantity * rate. Đối chiếu với child line item trong cart theo Variant ID và _tib_customization_id. Chỉ cần thiếu 1 trong các add-on (hoặc 1 add-on không đủ số lượng) -> Checkout sẽ BỊ CHẶN NGAY LẬP TỨC.
    ```
  - Jira TIB-5510 comment #56119, phatnt (dev), 2026-10-30 (dòng #107):
    ```
    Về Dynamic Translations (Extras > Dynamic Translations): Tính năng này chỉ áp dụng cho nội dung do merchant tự tạo (như Option Title/Name, Product Base Name, Variant Name), không hỗ trợ các System / Validation Error Messages cố định của app SDK nên thêm entry ở đây sẽ không có tác dụng ạ.
    ```
  - Jira TIB-5510 comment #56119, phatnt (dev), 2026-10-30 (dòng #108):
    ```
    Dòng này thuộc tính năng Out-of-stock có sẵn từ trước của app, dùng key out_of_stock_message. Cách dịch trên Portal: Vào Settings > Product Page Content / Translation > tìm mục Out of stock > chỉnh sửa trường "Out of stock message" (out_of_stock_message). https://prnt.sc/mMBRZt0TgNAy Cách cấu hình qua theme snippet: window.teeinblue.outOfStockMessage = "Lựa chọn của bạn hiện đã hết hàng. Vui lòng chọn tùy chọn khác.";
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-15

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5510; skill-rules-audit.md #96, #97, #98, #99, #101, #102, #103, #105, #106, #109, #110 (rule `required-addon-checkout-validation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5510
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26, 2026-10-27, 2026-11-02, 2026-11-03
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #96, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    `rate` comes from the addon setting in the artwork layer.
    ```
  - skill-rules-audit.md #97, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Direct-price addons do not carry `_tib_addon_variant` → never checked by the Function.
    ```
  - skill-rules-audit.md #98, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Edit Customization changes `_tib_customization_id` and the addon line follows it.
    ```
  - skill-rules-audit.md #99, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Validation banner shows on the checkout page; Pay now cannot complete. Function failure = fail open (checkout succeeds).
    ```
  - Jira TIB-5510 comment #55071, phatnt, 2026-10-19, khớp một phần:
    ```
    Trang Checkout của Shopify chặn đứng thanh toán. Hiển thị banner cảnh báo lỗi ở đầu trang checkout: The item "[Tên sản phẩm chính]" requires an attached add-on product. Please return to your cart, remove this item, and add it again. Không thể hoàn tất đặt hàng.
    ```
  - skill-rules-audit.md #101, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    "Unlisted" = Shopify's Unlisted product status.
    ```
  - Jira TIB-5510 comment #55071, phatnt, 2026-10-19, khớp một phần:
    ```
    Phân biệt đúng: Cho phép bán tiếp khi hết hàng (Continue selling when out of stock) hoặc sản phẩm Unlisted (Active nhưng ẩn catalog) thì vẫn cho phép ATC bình thường.
    ```
  - skill-rules-audit.md #102, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Out of scope: Function failure cases, draft order / POS / B2B.
    ```
  - skill-rules-audit.md #103, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Checkout message is shared by "missing" and "not enough quantity" and is English only (Function runtime has no locale). The ATC message is translatable via `addon_unavailable_error`.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Tại Lớp 1 (SDK - ATC): CÓ hỗ trợ dịch theo ngôn ngữ storefront qua khóa addon_unavailable_error trong cấu hình translation của Teeinblue hoặc window.teeinblue.addonUnavailableMessage. Tại Lớp 2 (Checkout Function): Hiện tại trả về message tiếng Anh từ Shopify Function Wasm (Shopify Functions Checkout Validation API chưa hỗ trợ resolve locale trực tiếp trong function runtime, đây là chuẩn chung của Shopify Function hiện nay).
    ```
  - skill-rules-audit.md #105, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    SDK availability is a page-load snapshot. A stale tab (addon archived after page load) does not block ATC: Shopify returns 422, or Layer 2 blocks at checkout. A stale tab where the addon came back in stock keeps blocking until reload. Stale-tab = the original bug path, so it must be a test case.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Nếu không reload trang cũ: Từ Có hàng -> Hết hàng/Draft: Khách bấm ATC sẽ bị Shopify API từ chối (422) hoặc bị Lớp 2 (Checkout Function) chặn đứng tại Checkout. Từ Hết hàng -> Có hàng: SDK ở tab cũ vẫn giữ cờ unavailable và chặn ATC cho đến khi khách F5 lại trang.
    ```
  - skill-rules-audit.md #106, rule `required-addon-checkout-validation`, nguồn ghi: Dev phatnt 2026-10-27, TIB-5510:
    ```
    Dev phatnt 2026-10-27: applies to all merchants, both layers in scope.
    ```
  - Jira TIB-5510 comment #55732, phatnt, 2026-10-27, khớp một phần:
    ```
    Scope: Áp dụng cho tất cả merchant (không hardcode riêng cho [store]).
    ```
  - skill-rules-audit.md #109, rule `required-addon-checkout-validation`, nguồn ghi: Dev 2026-11-02, TIB-5510:
    ```
    Dev 2026-11-02 (supersedes above): SDK ATC block now **default OFF**; enable per store with `window.teeinblue.blockAtcUnavailableAddon = true` in theme.liquid. Portal › Product Page Content / Translations › Addon Charge now has `addon_unavailable_error` (form-level, EN default "…contact store support.") and `addon_unavailable_message` (field-level, EN default "The selected add-on is currently unavailable."). Fallback field: snippet `addonUnavailableMessage` → Portal `addon_unavailable_message` → snippet `addonUnavailableError` → Portal `addon_unavailable_error` → EN. Form: snippet `addonUnavailableError` → Portal `addon_unavailable_error` → EN. Theme snippets override Portal, so remove them before testing Portal translation.
    ```
  - Jira TIB-5510 comment #56209, phatnt, 2026-11-02, khớp một phần:
    ```
    Mặc định: Tính năng chặn ATC ở tầng SDK hiện MẶC ĐỊNH TẮT (return false) cho toàn bộ store để không ảnh hưởng đến các merchant thông thường.
    ```
  - skill-rules-audit.md #110, rule `required-addon-checkout-validation`, nguồn ghi: User 2026-11-03, TIB-5510:
    ```
    User 2026-11-03: the toggle has no Portal UI; a merchant's dev must add the snippet to their theme. So the default-off state is not tested (no case for "no snippet → not blocked"). Run SDK ATC-block cases with the snippet `= true`.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-16

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5510; skill-rules-audit.md #100 (rule `required-addon-checkout-validation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5510
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #100, rule `required-addon-checkout-validation`, nguồn ghi: user/dev answers 2026-10-26, TIB-5510:
    ```
    Shop Pay / PayPal are out of QA scope.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-17

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5539; skill-rules-audit.md #111, #113, #114, #115 (rule `sdk-429-shopper-message`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5539?focusedCommentId=55557
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #111):
    ```
    2. Phạm vi "respect Retry-After". PO đã chấp nhận: chỉ hiện thông báo, không khoá nút, không retry, không đếm ngược. Ở add-to-cart, nút bật lại ngay sau lỗi (có test).
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #113):
    ```
    Route edge lỗi (kể cả 429) thì SDK chuyển sang presigned. Riêng edge GenAI (genai-uploads) khi 429 thì dừng luôn và hiện câu 429. Presigned (upload-url) lỗi thì chuyển sang photo-upload. Câu 429 chỉ hiện khi route cuối cũng trả 429. Nếu route cuối lỗi mạng thì hiện câu lỗi mạng sẵn có, lỗi 500 thì hiện câu lỗi upload chung.
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #114):
    ```
    Rate limit của provider là đường khác: upload ở trạng thái failed với error_message = rate_limit_exceeded (response poll vẫn HTTP 200). SDK hiện câu của key rate_limit_exceeded ("…Too many requests are being processed right now."). Đường này không đi qua nhánh mới và giữ nguyên.
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #115):
    ```
    Portal đã thêm request_rate_limited và request_rate_limited_retry_after trong block General error messages của product page content
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-18

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5539; skill-rules-audit.md #112, #116 (rule `sdk-429-shopper-message`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5539
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #112, rule `sdk-429-shopper-message`, nguồn ghi: PO chốt qua Slack + dev huytv, TIB-5539, 2026-10-23:
    ```
    `Retry-After`: <60s hiện giây (số ít/nhiều), ≥60s làm tròn lên phút; 0, âm, rác, rỗng, HTTP-date đã qua, >3600 → câu chung; thập phân làm tròn lên; HTTP-date tương lai tính số giây còn lại.
    ```
  - Jira TIB-5539 comment #55557, huytv, 2026-10-23, khớp một phần:
    ```
    Dưới 60 giây hiện số giây: "in 1 second", "in 45 seconds". Từ 60 giây trở lên làm tròn lên thành phút: 60s → "1 minute", 61s và 120s → "2 minutes", 3600s → "60 minutes".
    ```
  - skill-rules-audit.md #116, rule `sdk-429-shopper-message`, nguồn ghi: PO chốt qua Slack + dev huytv, TIB-5539, 2026-10-23:
    ```
    Endpoint có trả/expose `Retry-After` hay không là việc của backend, không do SDK quyết định → mock để test SDK parse, quan sát header thật riêng.
    ```
  - Jira TIB-5539 comment #55557, huytv, 2026-10-23, khớp một phần:
    ```
    Nếu backend không expose header qua CORS thì giá trị là null, buyer luôn thấy câu chung. Đúng như QA phân tích. Endpoint nào trả header và có expose hay không là phía backend, cần xác nhận với backend.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-20

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5418; skill-rules-audit.md #165, #166, #167 (rule `storefront-variant-picker-availability`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5418?focusedCommentId=54647
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** phatnt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #165):
    ```
    Bây giờ: Hệ thống sẽ tự tìm và chọn variant còn hàng đầu tiên. Nếu tất cả đều hết hàng thì mới fallback về variant đầu tiên.
    ```
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #166):
    ```
    Bây giờ: Khi tổ hợp option không tồn tại, hệ thống sẽ tự động chuyển sang variant có thật hợp lý nhất của sản phẩm đó: Ưu tiên chọn variant còn hàng. Giữ lại tối đa các lựa chọn khác mà khách vừa chọn (ví dụ giữ nguyên Size khách vừa bấm, chỉ tự động nhảy Color sang màu có hàng). Dọn sạch các option thừa của sản phẩm cũ (tránh lưu rác state khi đổi giữa sản phẩm có 3 option sang sản phẩm chỉ có 2 option). Giá luôn luôn hiển thị đúng giá tiền thực tế của sản phẩm, không bị nhảy về $0.00.
    ```
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #167):
    ```
    Khách chủ động bấm chọn variant hết hàng (Sold out): Nếu variant đó có tồn tại nhưng hết hàng (availableForSale: false), hệ thống vẫn giữ nguyên lựa chọn của khách, hiển thị đúng giá của variant đó và nút CTA hiện "Sold out". Hệ thống không tự ý nhảy sang variant khác
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-21

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5418; skill-rules-audit.md #168, #169, #170 (rule `storefront-variant-picker-availability`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5418
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #168, rule `storefront-variant-picker-availability`, nguồn ghi: dev phatnt comment 2026-10-15, TIB-5418:
    ```
    Mockup/image after auto-select follows the existing mockup logic (mockup assigned to the variant, else load the first mockup) — no new mockup rule.
    ```
  - skill-rules-audit.md #169, rule `storefront-variant-picker-availability`, nguồn ghi: dev phatnt comment 2026-10-15, TIB-5418:
    ```
    Entry points: open popup, pick product from a collection, switch style/product. Regression: main `CampaignForm` and regular Addon product must not change.
    ```
  - Jira TIB-5418 comment #54647, phatnt, 2026-10-15, khớp một phần:
    ```
    Main product form ngoài trang cá nhân hóa chính (CampaignForm, form sản phẩm chính) và Addon product thông thường hoàn toàn không bị ảnh hưởng.
    ```
  - skill-rules-audit.md #170, rule `storefront-variant-picker-availability`, nguồn ghi: QA lead confirmed (mục dev phatnt comment 2026-10-15), TIB-5418:
    ```
    Scope: only the cross-sell campaign popup (QA lead confirmed). Test must cover all 3 product sources: product base, SFP, Shopify product.
    ```
  - Jira TIB-5418 comment #54647, phatnt, 2026-10-15, khớp một phần:
    ```
    Toàn bộ can thiệp chỉ nằm cô lập trong 2 file component của Cross-sell:
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
