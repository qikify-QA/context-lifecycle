# Context Change Request: sdk — Reposition của buyer (gộp từ 1 Proposal khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `sdk`
- **Ticket:** `TIB-4355, TIB-5309, TIB-5541, TIB-5265, QA-3374, QA-3356, QA-3410`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon sdk không có feature nào cho Reposition của buyer (gap coverage). CLAIM-04 có thể làm sai nhãn control "Enable Text Reposition on main gallery" trong KB-026 và checklist `product-page-settings-config.json` (đang publish); chưa chứng minh sai chạy thật nên chưa HIGH. Proposal gốc CBS-047 không ghi mức gấp.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Curve Text không support Reposition: "Text Reposition" (popup, gallery) chỉ áp cho Single-line Text (GraphQL `type: "text"`); Curve Text là type riêng `"curve-text"`, không có affordance reposition nào (không nút, không drag box) ở cả hai cơ chế; đây là hành vi có từ trước, không phải regression của TIB-4355. Đừng dùng `curve_radius != null` làm proxy cho Curve Text, đọc field `type`.
- **Object / feature:** sdk/MỚI: buyer-reposition (phạm vi Thuộc: cơ chế Reposition của buyer trên storefront gồm nút, popup, kéo thả, lưu vị trí, linked copy; Không thuộc: toggle cấu hình ở product-page-settings-config, ngoài các claim nêu rõ bên dưới)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) xác nhận trong chat, 2026-10-02; không phải PO/Dev
- **Locator:** QA-3374 TC-61 (bug draft discard not_a_bug, 2026-10-02). TC-61 chỉ phủ Single-line Text, scope đã loại Curve Text. Production check đầu tiên dùng nhầm fixture (type text có field legacy `curve_radius`). Chưa ai xác nhận đây là ý định thiết kế hay giới hạn hiện tại. (CCR cũ: CBS-047 CLAIM-01)
- **OQ:** OPEN_ISSUE — Curve Text không có Reposition là ý định thiết kế hay giới hạn hiện tại của sản phẩm? Chưa ai xác nhận, TC-61 chỉ phủ Single-line Text. — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-116] **Curve Text KHÔNG support Reposition — QA xác nhận 2026-10-02 (QA-3374, TC-61).** "Text Reposition" (popup/gallery ở trên) chỉ áp dụng cho **Single-line Text** (GraphQL `type: "text"`). Curve Text là type riêng, literal `"curve-text"` (khác `"text"`) — layer này không có bất kỳ affordance reposition nào (không nút, không drag box) ở cả 2 cơ chế, và đây là hành vi ĐÚNG từ trước, không phải regression của TIB-4355.
  ```

### CLAIM-02

- **Statement:** Cơ chế Reposition của buyer (nút, popup, kéo thả, Save, validate; áp cho mọi loại layer, không riêng Text) chỉ tồn tại và chỉ test được trên storefront; Portal (Artwork Editor, Live preview, Personalization Settings) chỉ có công tắc BẬT/TẮT "Allow customers to reposition…". Việc nút hiện/ẩn khác nhau giữa 2 sub-mode của Admin là nhiễu, không phải bằng chứng.
- **Object / feature:** sdk/MỚI: buyer-reposition (liên quan: artwork, toggle personalization reposition)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner (portal: chỉ công tắc), buyer (storefront: cơ chế thật); portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-09-25; không phải PO/Dev
- **Locator:** QA-3374; TC-01..05 chỉ test công tắc Portal. Không có TC kiểm điều này. Nút seller "Re-position" trong Artwork Editor (CLAIM-07) là cơ chế khác (seller đặt baseline), không mâu thuẫn nhưng cần phân biệt. (CCR cũ: CBS-047 CLAIM-02)
- **OQ:** NEEDS_CONFIRMATION — Ranh giới "Portal chỉ có công tắc BẬT/TẮT Reposition, cơ chế thật chỉ test được trên storefront" có đúng không, khi nút seller "Re-position" trong Artwork Editor (CLAIM-07) cũng nằm trong Portal? Chưa PO/Dev nào xác nhận. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-118] **⚠️ Reposition (TIB-4355 và các tính năng Reposition khác — Text/Photo cũ) KHÔNG test được trong Portal, kể cả tab "Live preview".** User chốt thẳng 2026-09-25 (QA-3374): **Portal chỉ có công tắc BẬT/TẮT** ("Allow customers to reposition…" trong Personalization Settings — phần này TC-01..05 đã test đúng, giữ nguyên). **Toàn bộ cơ chế Reposition thật (nút, popup, kéo/thả, Save, validate) chỉ tồn tại và chỉ test được trên STOREFRONT.** … Việc thấy nút hiện/ẩn khác nhau giữa 2 sub-mode của Admin là nhiễu, không phải bằng chứng.
  ```

### CLAIM-03

- **Statement:** Popup Reposition đứng riêng (toggle "Enable Reposition on main gallery" = OFF) chỉ liệt kê target đã được buyer customize, không phải mọi field đang bật Reposition: fixture có 6 field bật Reposition (Text, Clipart Category, 2 Group of Clipart, 2 Vector) nhưng popup `.tee-reposition-targets__item` chỉ hiện 2; 4 field còn lại buyer chưa chọn hoặc chưa gõ nên chưa có gì để reposition; field bật Reposition nhưng còn rỗng hoặc mặc định không xuất hiện trong popup là hành vi đúng.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (popup Reposition)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat sau khi AI check production, 2026-10-07; không phải PO/Dev
- **Locator:** QA-3374 TC-24, release-verification 2026-10-07/08 (production, campaign fixture "reposition cliparts"). Expected gốc của TC-24 nói "MỌI target đã bật reposition" nên TC-24 PASS không chứng minh claim này. Staging cho thấy 6 target trong popup (khác 2/6 ở production), chưa giải thích được (do customize hay do build). (CCR cũ: CBS-047 CLAIM-03)
- **OQ:** NEEDS_CONFIRMATION — Popup Reposition chỉ liệt kê target đã customize có đúng cả ở staging không? Staging hiện 6 target trong popup còn production chỉ 2, chưa giải thích được (do customize hay do build). — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-119] **Popup Reposition đứng riêng (toggle "Enable Reposition on main gallery" = OFF) chỉ liệt kê target ĐÃ ĐƯỢC CUSTOMIZE, không phải mọi field đang bật Reposition — QA xác nhận 2026-10-07 (QA-3374, TC-24).** Fixture có 6 field bật Reposition (Text, Clipart Category, 2 Group of Clipart, 2 Vector) nhưng popup `.tee-reposition-targets__item` chỉ hiện **2** — đúng vì 4 field còn lại buyer **chưa customize** (chưa chọn/chưa gõ) nên chưa có gì để reposition, không phải thiếu target/regression.
  TC-24: … Popup chỉ hiện 2 `.tee-reposition-targets__item` trong khi trang có 6 field bật Reposition — **QA chốt 2026-10-07: đúng hành vi**
  ```

### CLAIM-04

- **Statement:** Toggle "Enable Reposition on main gallery" (Portal, Store Settings, Product Page Settings) đổi hẳn cơ chế UI Reposition: BẬT thì không có nút "Reposition" riêng, nút và khung kéo thả hiện trực tiếp trên ảnh chính (main gallery, mockup) khi đang customize layer đó; TẮT thì có nút "Reposition" riêng cạnh option, mở popup. Thiếu nút khi setting đang BẬT là bình thường.
- **Object / feature:** sdk/product-page-settings-config
- **Quan hệ với canon:** `CONTRADICTS KB-026`
- **Scope:** store owner (cấu hình), buyer (storefront); portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) giải thích trực tiếp 2026-09-25 (QA-3374), xác nhận lại 2026-10-16 (QA-3410); không phải PO/Dev
- **Locator:** QA-3374 TC-24 production 2026-10-07 chỉ thấy nhánh OFF mở popup. Canon: KB-026 (2026-09-21) ghi nhãn control là "Enable Text Reposition on main gallery" = unchecked ở cả hai store explorer, cùng nhãn trong checklist `sdk/checklists/product-page-settings-config.json` (khoảng dòng 119) — nghi lệch nhãn so với "Enable Reposition on main gallery"; chưa có xác nhận nhãn nào đúng ở build hiện tại. Không chọn phía. Tên class DOM không phải contract ổn định. (CCR cũ: CBS-047 CLAIM-04)
- **OQ:** CONFLICT — Nhãn đúng của toggle ở build hiện tại là gì? Side A: FACT-120 (QA, 2026-09-25 và 2026-10-16) gọi là "Enable Reposition on main gallery" / Side B: KB-026 (2026-09-21) và checklist `sdk/checklists/product-page-settings-config.json` ghi "Enable Text Reposition on main gallery". — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-120] **⚠️ "Enable Reposition on main gallery" (Portal → Store Settings → Product Page Settings) đổi HẲN cơ chế UI của Reposition — user giải thích trực tiếp 2026-09-25 (QA-3374).** BẬT (mặc định ON ở store staging) → **KHÔNG có nút "Reposition" riêng**; khi đang customize layer đó, nút + khung kéo/thả hiện **trực tiếp trên ảnh chính (main gallery/mockup)**. TẮT → có nút "Reposition" riêng (mở popup). Trước khi kết luận "thiếu nút Reposition" cho bất kỳ layer nào, **luôn kiểm toggle này trước** — thiếu nút KHI setting đang BẬT là bình thường
  Phía canon (giữ nguyên, không thay): KB-026: "... 'Enable Text Reposition on main gallery' = unchecked; ..."
  ```

### CLAIM-05

- **Statement:** Với Clipart Category, Group of Clipart Category, Vector Category, affordance Reposition (toggle ON) không phải nút hay badge riêng: chọn xong giá trị radio thì artwork tương ứng tự động được select trên main gallery (resize handle quanh artwork, toolbar zoom-in, zoom-out, rotate, flip, move-layer hiện trực tiếp trên canvas, đè lên ảnh mockup); kéo hoặc resize làm trực tiếp trên canvas đã select. Hai bản ghi trước cùng ngày ("thiếu affordance", "mockup trắng, off-screen") đã được QA đính chính là SAI.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (main gallery canvas)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) gửi screenshot có mũi tên chỉ, đính chính bản AI sai buổi chiều, 2026-09-25; không phải PO/Dev
- **Locator:** QA-3374; BUG-01 đã retract. Không có TC kiểm riêng, TC-08 cần retest theo cơ chế này. (CCR cũ: CBS-047 CLAIM-05)
- **OQ:** NEEDS_CONFIRMATION — Với Clipart/Group of Clipart/Vector Category, việc tự select artwork trên main gallery khi chọn giá trị radio có phải là control Reposition chính thức không? Chỉ dựa trên screenshot QA, không có TC, TC-08 cần retest. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - **⚠️ Sửa lại 2026-09-25 tối (QA gửi screenshot có mũi tên chỉ, cùng ngày — bản buổi chiều ở trên SAI):** Clipart Category/Group of Clipart Category/Vector Category (C1/G1/V1) **KHÔNG thiếu affordance** … Chọn xong giá trị radio → artwork tương ứng **tự động được select ngay trên main gallery** (resize handle quanh artwork + toolbar zoom-in/zoom-out/rotate/flip/move-layer hiện trực tiếp trên canvas, đè lên ảnh mockup) — đây CHÍNH LÀ control reposition cho nhóm Category (kéo/resize làm trực tiếp trên canvas, không qua nút/badge riêng).
  ```

### CLAIM-06

- **Statement:** Static Image và Static Vector (toggle ON) có component riêng `.tee-static-reposition` (tên, thumbnail, badge, text "Reposition", click được) nằm ngay trong panel form, không chỉ xuất hiện khi hover main gallery.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (DOM panel form)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI đọc DOM bằng REPL, 2026-09-25 (setting đang ON); không phải TC, PO hay Dev
- **Locator:** QA-3374. BUG-12 (Static-vector bật Reposition không render field nào trên storefront) bị QA skip 2026-10-29 vì issue đã Done, chưa kết luận. Tên class DOM không phải contract ổn định. (CCR cũ: CBS-047 CLAIM-06)
- **OQ:** NEEDS_CONFIRMATION — Static Image/Static Vector bật Reposition có thật sự render component `.tee-static-reposition` trong panel form không, khi BUG-12 (Static-vector bật Reposition không render field nào) chưa được kết luận? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - **Verify 2026-09-25 (setting đang ON):** DOM của Static Image/Static Vector (S1/S2) có hẳn 1 component riêng `.tee-static-reposition` (name+thumb+badge, text "Reposition", click được) nằm NGAY TRONG panel form — không phải chỉ xuất hiện khi hover main gallery.
  ```

### CLAIM-07

- **Statement:** Seller đặt vị trí Reposition mặc định (baseline) cho layer nguồn trong Artwork Editor: layer Clipart Category và Group of Clipart Categories có nút "Re-position" (trong Personalization Settings) mở panel Transform để seller set rotate và vị trí (top-left, x, y) làm baseline trước khi buyer tự kéo thêm trên storefront. Khác hẳn cơ chế của buyer (CLAIM-02): đây là việc seller thiết kế artwork, hành động hợp lệ trong Portal.
- **Object / feature:** sdk/MỚI: buyer-reposition (liên quan: artwork, editor-layer-workspace KB-042 nói về Transform trên canvas toolbar)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (Artwork Editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) xác nhận qua web, 2026-10-16; không phải PO/Dev
- **Locator:** QA-3410 (TIB-5541) phân tích BR-07, PENDING đã confirmed 2026-10-16. QA-3410 TC-19 (kéo baseline) ⏸️ chưa kết luận: Form Mode:Preview không persist, cần QA hoặc Dev xác nhận cách vào đúng Live preview. Ranh giới giữa CLAIM-02 ("Portal chỉ có công tắc") và claim này chưa ai (PO/Dev) xác nhận. (CCR cũ: CBS-047 CLAIM-07)
- **OQ:** NEEDS_CONFIRMATION — Nút "Re-position" của seller trong Artwork Editor có hoạt động như mô tả không (TC-19 chưa kết luận, cần xác nhận cách vào đúng Live preview)? Ranh giới với "Portal chỉ có công tắc" (CLAIM-02) chưa được PO/Dev xác nhận. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - **Cơ chế SELLER đặt vị trí Reposition MẶC ĐỊNH (baseline) cho layer nguồn — khác hẳn cơ chế BUYER … (QA xác nhận 2026-10-16, QA-3410/TIB-5541).** Trong Artwork Editor, layer Clipart Category và Group of Clipart Categories có nút **Re-position** (`<button class="btn btn-xs btn-secondary" type="button">Re-position</button>`); bấm vào mở panel **Transform** cho seller set rotate + vị trí (top-left/x,y) làm baseline mặc định trước khi buyer tự kéo thêm trên storefront.
  TC-19: ⏸️ AI — ĐÃ tìm đúng nút Re-position, nhưng Form Mode:Preview không persist — cần thử lại ở Live preview
  ```

### CLAIM-08

- **Statement:** Kích hoạt Reposition của Clipart Category (toggle ON): chọn giá trị radio khác giá trị đang checked (chọn lại đúng giá trị cũ không bắn `change`) thì khoảng 400ms sau `.tee-drr` và `.tee-layer-reposition` hiện; control biến mất sau khi mở rồi đóng cart drawer (Add to cart), phải chọn lại một giá trị mới mỗi lần muốn kéo tiếp.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (DOM)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI và QA verify tay qua REPL, 2026-09-27 (staging); không phải PO/Dev
- **Locator:** QA-3374, result TC08 manualverify 2026-10-05. Không có TC kiểm riêng cơ chế kích hoạt; tick TC-08 trên Jira là ❌ từ lượt script cold-start flaky. Mới verify tay một campaign. Tên class DOM không phải contract ổn định. (CCR cũ: CBS-047 CLAIM-08)
- **OQ:** NEEDS_CONFIRMATION — Cơ chế kích hoạt Reposition của Clipart Category (chọn giá trị khác, ~400ms, biến mất sau Add to cart) có đúng ở mọi campaign và là hành vi thiết kế không? Mới verify tay một campaign, không có TC riêng. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-121] **✅ TC-08 verify tay xong 2026-09-27:** kích hoạt = chọn giá trị radio KHÁC giá trị đang checked (chọn lại đúng giá trị cũ KHÔNG bắn `change`, control không hiện lại) → ~400ms sau `.tee-drr` + `.tee-layer-reposition` hiện. Control **biến mất sau khi mở/đóng cart drawer (Add to cart)** — phải chọn lại 1 giá trị mới mỗi lần muốn kéo tiếp.
  ```

### CLAIM-09

- **Statement:** Vị trí layer Clipart Category (ảnh, clipart) lưu trên server dạng tỉ lệ `{a,h,w,x,y}`: x_ratio = dx_px / chiều rộng ô kéo `.tee-drr` của chính layer đó, y_ratio = dy_px / chiều cao ô kéo (không theo artwork hay stage area, không phải px tuyệt đối); baseline (kéo delta=0) lưu `{x:0,y:0,w:1,h:1,a:0}`. Đo trên production: ô 51.40625x51.40625px, kéo +40px, +25px thì server lưu `{x:0.7781, y:0.4863}`.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront, api (POST customization)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy TC-08 trên production sau khi QA duyệt ghi thật, 2026-10-08; không phải PO/Dev
- **Locator:** QA-3374 TC-08 PASS 2026-10-08 production, build không ghi lại (TIB-4355 Done 2026-10-05, QA báo "lên production" 2026-10-07, chưa có xác nhận kỹ thuật độc lập về thứ tự deploy SDK/API/Portal). Chưa đo ô không vuông; hệ số chỉ khớp 4 số lẻ trong một phép đo, KHÔNG coi là công thức chính thức. Verdict release-verification toàn bộ là INCONCLUSIVE (3/8 TC xác nhận PASS). (CCR cũ: CBS-047 CLAIM-09)
- **Căn cứ expected:** KHÔNG CÓ (expected của TC-08 do QA viết: "Vị trí đã lưu trên server thay đổi đúng bằng delta đã kéo, quy đổi đúng theo đơn vị canonical artwork"; không có comment PO/Dev)
- **OQ:** NEEDS_CONFIRMATION — Công thức lưu vị trí tỉ lệ (delta / kích thước ô kéo của layer) có đúng cho ô không vuông và theo build production hiện hành không? Mới khớp 4 số lẻ trong một phép đo, build không ghi lại, verdict release-verification là INCONCLUSIVE. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  | TC-08 | High | pass | **PASS** | 2026-10-08, ghi thật. Mở popup Reposition field "Cat 3d", kéo `.tee-drr` +40px x/+25px y màn hình (box layer lúc đó 51.40625×51.40625px, vuông) → Save → confirm → bấm nút SDK thật `#teeAtcButton`. Server (`POST .../shopify/customization` 201) lưu `layer-602753-position: {x:0.7781, y:0.4863, w:1, h:1, a:0}` — khớp CHÍNH XÁC `40/51.40625` và `25/51.40625` (4 số lẻ). Baseline (delta=0, cùng cách đo) → server lưu đúng `{x:0,y:0}`. Đơn vị lưu = tỉ lệ delta/kích-thước-box-layer (không phải artwork-area, không phải px tuyệt đối)
  ```

### CLAIM-10

- **Statement:** Vị trí Text layer lưu dạng px tuyệt đối (vd `layer-830011-position` x=1550), khác hẳn Clipart Category và Image layer lưu tỉ lệ 0 đến 1 (CLAIM-09); đừng generalize "vị trí lưu px" từ Text sang Category hay Image layer.
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI và QA đo tay (TC-37 `layer-830011-position`, staging), 2026-09-27; không phải PO/Dev
- **Locator:** QA-3374 result once2 2026-09-26, once3 2026-09-27. Không có TC kiểm riêng đơn vị lưu của Text. (CCR cũ: CBS-047 CLAIM-10)
- **OQ:** NEEDS_CONFIRMATION — Text layer lưu vị trí px tuyệt đối (khác Clipart Category/Image lưu tỉ lệ 0 đến 1) có phải là hành vi chủ ý và còn đúng ở build hiện tại không? Chỉ đo tay trên staging, không có TC riêng. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  **Vị trí layer Clipart Category (ảnh/clipart) lưu trên server dạng TỈ LỆ 0–1** `{a,h,w,x,y}` … — **KHÁC HẲN Text layer** (TC-37, `layer-830011-position`) lưu **px tuyệt đối** (x=1550). Đừng generalize "vị trí lưu px" từ Text sang Category/Image layer.
  ```

### CLAIM-11

- **Statement:** Linked copy có base size hoặc vị trí khác origin: reposition và scale sync theo tỉ lệ tương ứng áp lên kích thước gốc của chính copy (vd origin 751.63x751.63, copy 503.96x503.96, ratio ~0.67: kéo origin x1.39 thì copy cũng x1.39 so với base của nó), không kéo copy về bằng kích thước tuyệt đối của origin; rotate thì y hệt. Câu "linked layer hành xử y hệt origin" (TIB-5265) vẫn đúng cho rotate, background, Global Option, ẩn hiện nhưng không áp cho position và scale khi base size khác nhau.
- **Object / feature:** sdk/MỚI: buyer-reposition (liên quan: artwork, linked layer; CCR khác đang mở QA-3356, QA-3410 cùng vùng)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (client canvas, design file)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đính chính trong chat, AI tự kiểm bằng đo pixel cùng ngày, 2026-10-05 (QA-3374 / BUG-215); không phải TC, PO hay Dev
- **Locator:** QA-3374 bug draft TC-38 (mục Re-verify SCALE 2026-10-05). TC-38 ✅ QA 2026-10-06 test linked copy cùng kích thước nên không phủ ca base size khác nhau. Mới đo một fixture (tỉ lệ ~0.67). (CCR cũ: CBS-047 CLAIM-11)
- **OQ:** NEEDS_CONFIRMATION — Linked copy có base size khác origin sync position/scale theo tỉ lệ tương ứng (không "y hệt origin" như TIB-5265) có được Dev xác nhận là hành vi đúng không? Mới đo một fixture (~0.67), TC-38 test copy cùng kích thước. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-142] **QA: *"nếu ban đầu vị trí/kích thước của linked khác với origin như bạn đang setup, thì nó sẽ scale/dịch chuyển theo tỉ lệ tương ứng chứ không phải y hệt origin nhé (trừ rotate)"*.** … sync đúng nghĩa là copy scale theo **cùng hệ số tỉ lệ** origin đang đổi, áp lên **kích thước gốc của chính copy** — không phải copy bị kéo về bằng kích thước tuyệt đối của origin. Câu cũ "linked layer hành xử y hệt origin" (TIB-5265/PR#3713) vẫn đúng cho rotate/background/GO/ẩn-hiện, nhưng áp "y hệt" sang position/scale khi 2 layer có base size khác nhau là suy diễn sai
  ```

### CLAIM-12

- **Statement:** Client-side canvas (Artwork editor "Live preview", cùng engine với storefront customizer buyer thao tác): linked copy sync scale đúng theo tỉ lệ tương ứng, real-time (kéo origin x1.39 thì copy cũng x1.39 so với base của chính nó).
- **Object / feature:** sdk/MỚI: buyer-reposition
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), store owner (Live preview); storefront, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** AI tự tay verify (kéo resize thật, không save), 2026-10-05; không phải TC, PO hay Dev
- **Locator:** QA-3374 bug draft TC-38. Chỉ verify SCALE trong admin Live preview; bản ghi sau cùng ngày nói POSITION trên storefront thật cũng cần đo lại. (CCR cũ: CBS-047 CLAIM-12)
- **OQ:** NEEDS_CONFIRMATION — Sync scale của linked copy trên storefront thật (POSITION và SCALE) có đúng như trong admin Live preview không? Mới verify SCALE trong Live preview, POSITION trên storefront cần đo lại. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - **Client-side canvas (Artwork editor "Live preview", cùng engine với storefront customizer buyer thao tác):** sync scale ĐÚNG theo tỉ lệ tương ứng, real-time — kéo origin ×1.39 thì copy cũng ×1.39 so với base của chính nó. Đã tự tay verify (Template 3, không save).
  ```

### CLAIM-13

- **Statement:** Server-side design-file render (file PNG thật dùng để in, `order_item_artworks.url`, sinh sau checkout) áp transform của nguồn cho linked copy đúng (cùng kích thước, cùng rotate, chỉ khác vị trí in trên áo). Bản ghi FACT-143 cũ (2026-10-05) nói ngược lại ("server KHÔNG áp transform, copy rơi về default") là lỗi thời: cùng ngày đo pixel đã đảo ngược, BUG-215 Passed 2026-10-06; FACT-143 trong `product_facts.md` local cần sửa.
- **Object / feature:** sdk/MỚI: buyer-reposition (liên quan: CCR khác đang mở QA-3410 mục parity preview, file in)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); api (server-side design-file render), storefront (checkout preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (Yến) tự test và tick ✅ QA, 2026-10-06 (AI trước đó đọc ảnh sai và đã nhận sai); không phải PO/Dev
- **Locator:** QA-3374 TC-38 PASS 2026-10-06 staging (result QA-web 2026-10-07; BUG-215 passed_at 2026-10-06), build không ghi lại. Đo pixel 2026-10-05: tỉ lệ copy/origin 0.6701 so với mặc định 0.6706. Chưa kiểm lại trên production sau fix. KHÔNG coi mô tả "server render không áp transform" là hiện hành.
- **Căn cứ expected:** Tiền lệ TIB-5421 "Flip setting not applied to linked layers in render file" (ghi trong expected của TC-38); không có comment PO/Dev
- **OQ:** CONFLICT — Server-side design-file render có áp transform của nguồn cho linked copy không? Side A: FACT-143 cũ (2026-10-05) ghi server KHÔNG áp transform, copy rơi về default / Side B: TC-38 PASS 2026-10-06 (BUG-215 Passed) đo pixel cho thấy copy nhận đúng transform; chưa kiểm lại trên production sau fix. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  | TC-38 | ✅ QA — BUG-215 Passed 2026-10-06 — QA tự test, đo lại bbox: nguồn+copy cùng 167×173px, cùng rotate ~44°, chỉ lệch vị trí in khác trên áo — linked copy nhận đúng transform nguồn trong render file. AI trước đó đọc ảnh sai, đã nhận sai (xem thread). | — | web 10:15 |
  BUG-215 (Hub) — TC-38 "Linked copy of a repositioned Vector Category layer ignores position/scale in design file and server preview" — state: passed, passed_at 2026-10-06T05:23:05Z
  Bản ghi cũ cần xem lại (FACT-143): "Server-side design-file render … KHÔNG áp transform đã sync đúng ở client — copy rơi về default (không scale), dù order data chỉ có override cho origin."
  ```
