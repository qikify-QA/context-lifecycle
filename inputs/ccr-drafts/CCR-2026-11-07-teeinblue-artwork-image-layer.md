# Context Change Request: artwork-image-layer — gộp từ 6 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5521, TIB-5573, TIB-5561, QA-3435, TIB-5299, TIB-5470, QA-3406, TIB-5412`
- **Các khối có trong file:** `A, C`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-019: MEDIUM — Canon thiếu coverage cho fit của layer "No personalization"; không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay (QA phuongbb, 2026-11-01).
- CBS-023: MEDIUM — Canon thiếu coverage cho model Gemini, Resolution và backup model; không có checklist hay automation đang publish nào chạy sai, không chặn test P0/P1.
- CBS-024: MEDIUM — canon thiếu coverage cho field output size và check 4 MP (gap); CLAIM-23 chỉ là quan sát phụ, CHK-01-007, CHK-01-014 đã ở NEEDS_CONFIRMATION nên chưa đủ HIGH.
- CBS-025: MEDIUM — QA chọn MEDIUM (phuongbb, 2026-11-01): modal Bulk edit là gap coverage; riêng CHK-005 đang chạy sai vì expect không có menu overflow.
- CBS-029: MEDIUM — canon thiếu hoàn toàn tính năng đã ship (gap coverage); không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay.
- CBS-032: MEDIUM — Canon thiếu coverage cho so khớp tên của Dynamic Clipart by Text; không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay (QA phuongbb, 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Photo layer "No personalization" được coi là populated khi retrieval_value bật và customization_data có ảnh, bất kể nguồn (output photo, {{input}}, {{input.N}}); transformer API không phân biệt nguồn.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (cấu hình layer); api, storefront (SDK preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q4. Bổ trợ: QA-3402 TC-06/07 (nguồn photo), TC-09 (Photo Reposition), TC-10 (Multiple Uploads {{input.1}}), TC-11 (output effect) ✅ 2026-10-26 staging; nguồn {{input}} trần chưa kiểm. (CCR cũ: CBS-019 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Which populate sources make a layer 'populated' (contain): a photo source, and also Multiple Uploads {{input.N}}?"
  
  Q4 – Đồng ý. Layer được coi là populated khi retrieval_value bật và có ảnh trong customization_data, nguồn nào cũng tính: output của photo, {{input}} hay {{input.N}}. Transformer không phân biệt nguồn.
  ```

### CLAIM-02

- **Statement:** Photo layer "No personalization" bỏ qua "Direct upload style": ảnh mặc định thì fill (kéo giãn đúng box), populated thì contain (giữ tỉ lệ trong box), áp cho Mockup Editor, Campaign Editor, storefront preview và order design.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (Mockup/Campaign Editor) + buyer (storefront preview, order design); portal, storefront, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI chạy trên Chrome của QA), 2026-10-26
- **Locator:** QA-3402 (QA Hub task TIB-182): TC-01/02/03/04 trong result_QA-3402_B1_2026-10-26.md, build portal assets/index.xYTv-L4c.js; TC-06/07/08 trong result_QA-3402_B2-S1_2026-10-26.md, build portal assets/index.Bbf_djkK.js; SDK staging-sdk.teeinblue.com/shopify/app-v1.js (không có số version). Liên quan, không bị thay: KB-017. Số đo trong kết quả chỉ là bằng chứng của một lượt chạy, không phải giá trị chuẩn. (CCR cũ: CBS-019 CLAIM-02)
- **Căn cứ expected:** Dev summary Jira TIB-5521 comment 2026-10-06 (chauptm); CCR cũ ghi đây là ngữ cảnh và nói kết quả chạy theo rule này, không ghi rõ expected của TC lấy từ đâu
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — Mockup Editor shows the default image stretched over the whole wide box, white side borders kept; same bounds as Campaign Editor | Mockup Editor (campaign mockup [đã bỏ id], Preview artwork on) L-NP `image` 225×100 `preserveAspectRatio="none"` = box; Campaign Editor live preview identical (225×100, none)
  TC-02 | ✅ AI — Campaign Editor and storefront preview: image bounds = layer box, stretched
  TC-03 | ✅ AI — Order design: image reaches all four box edges, white side borders visible, stretched | Order [đã bỏ id] design 1654×1654: L-NP box (82,124)-(827,454) vs opaque bbox (83,124)-(827,455) (±1 px)
  TC-04 | ✅ AI — style Fill (cover) and style not set give the same result as Contain
  TC-06 | ✅ AI — populated layer with style Fill keeps the photo ratio in the preview | before upload L-POP = default image 321.75×143 `par=none`; after upload into S: L-POP image `preserveAspectRatio="xMidYMid meet"` in the 321.75×143 box → 80.4×143 visible (9:16), centred
  TC-07 | ✅ AI — style Contain gives the same result | L-POP-C (Contain) `xMidYMid meet`, identical to L-POP
  TC-08 | ✅ AI — order design: contained, not stretched | [đã bỏ id] POP: L-POP box (496,124)-(1240,455), opaque bbox (775,124)-(961,455) = 186×331, ratio 0.562 (9:16 = 0.5625), centre x 868 = box centre
  
  Ngữ cảnh (Dev summary, chauptm, Jira TIB-5521 comment 2026-10-06 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  **Rule:** a `No personalization` photo layer ignores its `Direct upload style` and picks the fit from `customization_data`:
  - **No** `customization_data` (default image) → **fill**: the image is stretched to the exact layer box.
  - **Has** `customization_data` (populated through retrieval value) → **contain**: the photo keeps its ratio and fits inside the box (or the placement-position box).
  ```

### CLAIM-03

- **Statement:** Mockup và ảnh product đẩy lên store dùng cùng NoPersonalizationPhotoTransformer nên theo cùng fit rule của photo layer "No personalization".
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: product-base, campaign)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (sync campaign); api, storefront (ảnh product trên store)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q1. Bổ trợ: TC-21 ✅ 2026-10-26 staging (ảnh product trên Shopify sau sync); mockup render riêng ở Mockups list chưa kiểm. Tên class là chi tiết code tại 2026-10-26, không phải oracle. (CCR cũ: CBS-019 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Do mockup generation and product images pushed to stores use the new fit rule?"
  
  Q1 – Đồng ý. Mockup (Mockups/PrintareaTransformer) và ảnh product đẩy lên store (PlatformProductTransformer, CampaignMockupLayerProjector) đều đi qua ArtworkTransformer → NewLayerArtworkTransformer → NoPersonalizationPhotoTransformer.
  ```

### CLAIM-04

- **Statement:** Sau fix TIB-5521 không có gì tự render lại: ảnh trên store đổi ở lần sync tới, order design đổi khi Re-generate, artwork thumbnail đổi khi save artwork, riêng SDK preview (Campaign Editor, storefront) đổi ngay khi SDK deploy.
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: order, campaign, sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; api, storefront, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q2. QA chưa kiểm chiều "trước sync/Re-generate/save thì KHÔNG đổi", chỉ thấy chiều ngược (TC-21, TC-22); không có đơn trước fix có layer ảnh mặc định trên staging. (CCR cũ: CBS-019 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Are existing product images on stores and existing order designs re-rendered automatically, or only on the next sync / Re-generate design?"
  
  Q2 – Đồng ý, cần nói thêm. Không có gì tự render lại. Ảnh trên store chỉ đổi ở lần sync tới, order design chỉ đổi khi Re-generate, thumbnail chỉ đổi khi save artwork. Riêng preview của SDK (Campaign Editor, storefront) thay đổi ngay khi SDK được deploy.
  ```

### CLAIM-05

- **Statement:** Artwork thumbnail do API render với customization_data rỗng nên layer "No personalization" hiện ảnh mặc định bị kéo giãn (fill).
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; api, portal (danh sách artwork)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q7. Bổ trợ: TC-22 ✅ 2026-10-26 staging. KB-090 nói về biến thể file thumbnail, không bị thay. (CCR cũ: CBS-019 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Does the artwork thumbnail follow the new rule?"
  
  Q7 – Đồng ý. Thumbnail do API render (ArtworkRenderer → ArtworkAdapter → ArtworkToLayerTransformer) với customization_data rỗng, nên layer dùng ảnh mặc định và bị kéo giãn (fill). Thumbnail cũ chỉ đổi khi save lại.
  ```

### CLAIM-06

- **Statement:** Linked copy ("Duplicate & Link") của photo layer "No personalization" dùng box, flip, rotate của chính nó, lấy ảnh, retrieval value, photo border, shadow từ layer gốc và không áp mask, color, cropper (API mask_enable = false; SDK xoá photo_editor, enable_cropper, masked_*, effects).
- **Object / feature:** artwork/layer-duplicate-link-copy (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (preview, order design); api, storefront, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q6. Bổ trợ: TC-12/13/14/15 ✅ 2026-10-26 staging. Liên quan, không bị thay: KB-045, KB-429; CHK-006 (OQ-artwork-081) vẫn NEEDS_CONFIRMATION. (CCR cũ: CBS-019 CLAIM-06)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Linked copy of a no-personalization layer: after the fix, does it take mask / color / cropper from the origin, from itself, or ignore them?"
  
  Q6 – C, không áp dụng. API luôn để mask_enable = false và không dùng color hay cropper. SDK xoá photo_editor, enable_cropper, masked_*, effects. Bản link lấy box, flip, rotate của chính nó. Ảnh, retrieval value, photo border và shadow lấy từ layer gốc.
  ```

### CLAIM-07

- **Statement:** Khác biệt có từ trước, TIB-5521 không đổi: API áp placement position của layer "No personalization" đã populated, SDK preview thì không.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront preview so với order design); api, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55637 mục Q3, cùng ý Dev summary 2026-10-06. Hành vi hiện tại, không phải expected. QA chưa tái hiện: TC-09 2026-10-26 không thấy khác biệt vị trí; không assert "preview khác design" tới khi có người tái hiện. (CCR cũ: CBS-019 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "The API applies the placement position of a populated no-personalization layer but the SDK preview does not — is this preview/design difference accepted for this release?"
  
  Q3 – Dev đề xuất A. Đây là khác biệt có từ trước, ticket này không đụng tới.
  
  Dev summary (chauptm, 2026-10-06):
  **Known difference, not changed by this ticket:** the API applies the placement position of a populated no-personalization layer, the SDK preview does not.
  ```

### CLAIM-08

- **Statement:** Layer "No personalization" không có ảnh mặc định và không có retrieval value thì SDK preview không vẽ gì (có từ trước).
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (Campaign Editor); storefront (SDK preview), portal (Campaign Editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55639 mục RQ6. Bổ trợ: TC-30 ✅ 2026-10-26 staging. Hành vi hiện tại có từ trước, không dùng làm expected. (CCR cũ: CBS-019 CLAIM-08)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Layer No personalization không có default image và không có retrieval value thì preview/design vẽ gì?"
  
  RQ6: Preview SDK: không render gì (A).
  ```

### CLAIM-09

- **Statement:** Với layer "No personalization" không có ảnh mặc định và không có retrieval value, job order design fail (RenderableObjectValidationException, sub layer url null); hành vi lỗi này có từ trước và TIB-5521 không đổi.
- **Object / feature:** artwork/MỚI: no-personalization-photo-render — Thuộc: render phía server và thời điểm render lại của photo layer "No personalization" (mockup, ảnh product đẩy lên store, job order design); Không thuộc: cấu hình layer và fit rule (layer-config-image), linked copy (layer-duplicate-link-copy), runtime SDK trên storefront (sdk) (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer đặt đơn, store owner xử lý đơn; api (order design job)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-10-26
- **Locator:** Jira TIB-5521 comment 55639 mục RQ6. Bổ trợ: TC-30 ✅ 2026-10-26 staging, render_failed "The url field is required." (chữ khác tên exception dev nêu). Không dùng làm expected: ứng viên bug cho ticket riêng, chưa ai nói đây là đúng. (CCR cũ: CBS-019 CLAIM-09)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA): "Layer No personalization không có default image và không có retrieval value thì preview/design vẽ gì?"
  
  Design API: hiện KHÔNG generate được — sub layer url null bị RenderableObjectValidationException, job fail. Hành vi này có từ trước TIB-5521, ticket không thay đổi flow này
  ```

### CLAIM-10

- **Statement:** Khi account dùng Nano Banana 2.1, Gemini effect trên Photo layer và Photo global option chỉ có Resolution 1K, 2K, 4K, không có 0.5K (512), giống Nano Banana Pro.
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, chạy bằng agent, kết quả [AI]), 2026-10-30
- **Locator:** QA-3442 TC-04 = TC-TIB-7905 PASS 2026-10-30; bổ trợ TC-06 = TC-TIB-7907 (Photo global option), TC-07 = TC-TIB-7908 (so sánh NB2, Pro); file results/result_QA-3442_independent_2026-10-30.md, portal index.BMgdZMSW.js (Last-Modified 2026-10-29 14:32:50 GMT). Mở rộng KB-017, không thay. Không suy rộng cho Clipart (xem CLAIM-11). (CCR cũ: CBS-023 CLAIM-02)
- **Căn cứ expected:** Jira TIB-5573, comment dev chinhdt 2026-10-26: "the effect shows the Resolution field with 1K / 2K / 4K, the same as Nano Banana Pro. 512 is not offered because 2.1 does not support it."
- **Trích nguyên văn:**
  ```
  TC-04 | ✅ AI — Photo Gemini Resolution on 2.1 = 1K / 2K / 4K, no 0.5K, panel identical to Pro |
  P-SQ on 2.1: `select#gemini_resolution` options `1K, 2K, 4K` (no 512). The panel reads "[Gemini] AI
  Effect, Prompt, Variable, Example Prompts, Resolution, Use Reference Image, Apply color to sketch
  result", identical to the list under Nano Banana Pro in the same run.
  
  TC-06 | ✅ AI — Photo GO on 2.1: 1K / 2K / 4K, 4K saved and kept | GO [đã bỏ id] edit page: `1K, 2K*, 4K`.
  
  TC-07 | ✅ AI — Nano Banana 2 = 0.5K/1K/2K/4K; Pro = 1K/2K/4K
  Bổ trợ — dev chinhdt, Jira TIB-5573, 2026-10-26: "the effect shows the **Resolution** field with **1K / 2K / 4K**, the same as Nano Banana Pro. 512 is not offered because 2.1 does not support it."
  ```

### CLAIM-11

- **Statement:** Khi account dùng Nano Banana 2.1, layer Text to Image và Multiple Uploads dùng Gemini có Resolution 1K, 2K, 4K, không có 0.5K (giống Pro), và để trống (unset) thì dùng default size của Google.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q2 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-12 = TC-TIB-7913, TC-21 = TC-TIB-7922 PASS 2026-10-30 trên portal index.CReWKeT2.js (Last-Modified 2026-10-30 07:06:14 GMT). Liên quan, không thay: KB-018, KB-019. (CCR cũ: CBS-023 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - Q2: Fixed. TIB-5561 reached dev before this ticket, so T2I / MU only showed the Resolution field for
  Nano Banana Pro and Nano Banana 2. 2.1 now gets it too, with 1K / 2K / 4K (no 0.5K, same as Pro).
  Unset = Google's default size. The PRs are updated, so please retest once the change is on staging.
  Bổ trợ — TC-12 (TC-TIB-7913) ✅ 2026-10-30, portal `index.CReWKeT2.js`: "Q2 fix on staging: T2I and MU on 2.1 show Resolution `Default / 1K / 2K / 4K` (no 0.5K)". TC-21 (TC-TIB-7922) ✅: "unset → no `gemini_resolution` sent, Google default 1264×848". `Default` là placeholder chọn được (= unset), không phải 0.5K.
  ```

### CLAIM-12

- **Statement:** Khi Photo layer có gemini_resolution 512 đã lưu và account chuyển sang Nano Banana 2.1, dropdown Resolution trống (không placeholder, không 0.5K), generate ở 2K, và giá trị 512 vẫn lưu tới khi merchant chọn giá trị khác rồi Save.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff (dropdown); buyer (kết quả generate); portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q4 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-09 = TC-TIB-7910, TC-19 = TC-TIB-7920, TC-20 = TC-TIB-7921 PASS 2026-10-30. (CCR cũ: CBS-023 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - Q4: The dropdown shows blank: 2.1's list has no 0.5K and no placeholder, so 512 matches nothing
  (it does not show 2K). Generation uses 2K. The stored 512 stays until the merchant picks another value
  and saves.
  Bổ trợ — TC-09 (TC-TIB-7910) ✅ 2026-10-30: "on 2.1 a saved 512 shows blank, stays 512 after Save; picking 1K stores 1K". TC-19 (TC-TIB-7920) và TC-20 (TC-TIB-7921) ✅: 512 trên 2.1 → master 2048×2048 (upload [đã bỏ id]). Dev 2026-10-26: "If 512 is still sent (e.g. via API/MCP), it falls back to the default 2K."
  ```

### CLAIM-13

- **Statement:** Gen AI effect giữa Photo và Clipart: chỉ layer clipart của Artwork 1.0 có Gen AI effect, còn ở Artwork 2.0 (mọi artwork hiện tại) chỉ Photo layer có, và layer Clipart Category không có mục Gen AI effect là đúng.
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** owner, staff; portal, storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời comment 56103 của QA (mục 2); comment id của câu trả lời không lấy được. Câu của dev so Photo với Clipart: không suy rộng thành Multiple Uploads hay Text to Image không có effect (KB-018 vẫn có "Image effects after generating"). Câu "Photo and Clipart layers" ngày 2026-10-26 đã bị dev sửa, không giữ. Gen AI effect trên clipart Artwork 1.0 chưa thử. Khớp KB-017, KB-087; có thể chạm artwork/clipart-category-storefront-behavior. (CCR cũ: CBS-023 CLAIM-11)
- **Trích nguyên văn:**
  ```
  2. Clipart: only the Artwork 1.0 clipart layer has the Gen AI effect. Artworks now all use Artwork 2.0,
  where only the Photo layer has it. So it's Photo only, and Clipart Category having no Gen AI effect
  section is expected.
  Bổ trợ — QA quan sát 2026-10-30 (TC-05 / TC-17, nay ⏭️): "CL-1 panel sections: Populate values / Personalization Settings / Conditional / Extra. No effects repeater." Storefront: "0 `image-filter-effects` / `derive` requests in 12 s" khi chọn clipart. Comment cũ hơn bị thay thế (dev 2026-10-26): "**Photo and Clipart layers:** with the Gemini model set to Nano Banana 2.1 …".
  ```

### CLAIM-14

- **Statement:** Field output size dưới provider trên layer Multiple Uploads (Single Output), layer Text to Image và global option Text to Image, theo model của account: GPT gpt-image-2 → "Resolution" Default / 1K (1024) / 2K (2048) / 4K (3840); Gemini nano_banana_pro → Default / 1K / 2K / 4K; nano_banana_31 → Default / 0.5K (512) / 1K / 2K / 4K; Flux 2 (Kontext 2) → "Flux output width (px)" + "Flux output height (px)" (number, trống); không có field nào khi Flux 1, GPT gpt-image-1.5, ImagenHub. Layer mới: "Default" được chọn sẵn
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình layer / GO); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 (task TIB-250) TC-01, 03, 04, 05, 07, 08 PASS 2026-10-27, staging, build không ghi lại. gpt-image-2.5-flare, 2.5-sunburst chưa kiểm. Field nằm sau Prompt / Example prompts, lệch chữ "under the provider" của dev. Bổ sung artwork KB-018, KB-019, KB-114, không thay. Danh sách model là tại 2026-10-27 (CCR cũ: CBS-024 CLAIM-01)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (mục New field under the provider)
- **Trích nguyên văn:**
  ```
  TC-01 | ✅ AI — GPT Resolution shown, Default/1K/2K/4K, Default selected | gpt-image-2: MU-G `select#gpt_resolution` options Default (disabled, selected) / 1K=1024 / 2K=2048 / 4K=3840 | Obs: the field sits after Prompt / Example prompts, not right below the GenAI service select
  TC-03 | ✅ AI — Gemini options per model | Nano Banana 2 (3.1): Default / 0.5K=512 / 1K / 2K / 4K; Pro: Default / 1K / 2K / 4K (no 0.5K); Default selected
  TC-04 | ✅ AI — Flux 2 shows the two size fields, Flux 1 none | Kontext 2: "Flux output width (px)", "Flux output height (px)", number inputs, empty; Kontext 1: no Flux fields
  TC-05 | ✅ AI — no field on gpt-image-1.5 / ImagenHub; 2K ignored | gpt-image-1.5: MU-G panel has no Resolution; T2I ImagenHub: no size field; storefront MU-G saved 2048 → request `gpt_resolution 2048`, model gpt-image-1.5 → master 1536×1024 (fixed size)
  TC-07 | ✅ AI — T2I layer fields per provider | gpt: Default/1K/2K/4K; gemini (3.1): Default/0.5K/1K/2K/4K; flux_kontext: width/height inputs; imagenhub: no field
  TC-08 | ✅ AI — T2I global option 2K persists | GO <id> edit page: Default (disabled) / 1K / 2K / 4K → 2K → "Global option has been updated successfully." → reload 2K
  Ngữ cảnh (Dev summary, chinhdt, Jira TIB-5561 comment 2026-10-26 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - New field under the provider:
    - **GPT** (gpt-image-2, gpt-image-2.5-flare, gpt-image-2.5-sunburst): *Resolution* 1K / 2K / 4K.
    - **Gemini nano_banana_pro**: *Resolution* 1K / 2K / 4K.
    - **Gemini nano_banana_31**: *Resolution* 0.5K / 1K / 2K / 4K.
    - **Flux v2**: *Flux output width (px)* and *Flux output height (px)*. Fill both or neither; minimum 256.
  ```

### CLAIM-15

- **Statement:** Field đi theo model hiện tại của account: GPT trên model không có resolution → field ẩn, giá trị đã lưu bị bỏ qua (size cố định như trước); Gemini pro ↔ 31 dùng chung 1 field, giá trị đã lưu giữ nguyên và được dùng; 0.5K lưu dưới 31 → generate 2K khi account ở pro (dropdown lúc đó không chọn gì)
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (kết quả generate); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q1. Bổ trợ TC-05, TC-06 PASS 2026-10-27; TC-06 thấy dropdown không chọn gì (không hiện Default, không hiện 2K) (CCR cũ: CBS-024 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "When the account switches its Gen AI model (e.g. Gemini pro → nano_banana_31, or GPT to gpt-image-1.5 which has no resolution), what does the layer show and use …?"
  - **Q1:** ok Q1. The field follows the current model. GPT on a model without resolution: the field is hidden and the value is ignored (fixed sizes as before). Gemini pro ↔ 31 share the same field, so the saved value stays and is used. A 0.5K value saved on 31 falls back to 2K on pro.
  ```

### CLAIM-16

- **Statement:** Validate Flux width/height: không có max riêng từng field (chỉ diện tích ≤ 4,000,000; 15625 = 4,000,000 / 256); < 256 hoặc chỉ điền 1 field → portal chặn khi Save bằng lỗi field, không gửi request; qua API/MCP chỉ 1 field → được nhận nhưng bỏ qua (size theo tỉ lệ layer)
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (portal) + client API/MCP; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q2. Bổ trợ TC-13, TC-14 PASS 2026-10-27. Phần API/MCP chỉ 1 field bị bỏ qua chưa kiểm (CCR cũ: CBS-024 CLAIM-07)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "For Flux width/height on Multiple uploads / Text-to-image: is the max per field 15625 …, is a value under 256 blocked in the input or rejected on save, and what happens (message) when only one of width / height is filled?"
  - **Q2:** Same as Single upload. There is no per-field max, only width × height ≤ 4,000,000 (15625 = 4,000,000 / 256). Under 256, or only one field filled, is blocked on Save by the portal as a field error, and no request is sent. Via API/MCP a single field is accepted but ignored, and the size comes from the layer ratio.
  ```

### CLAIM-17

- **Statement:** Flux width × height > 4,000,000 trên layer Multiple Uploads / Text to Image → server từ chối khi save artwork; biên là ≤ (2000×2000 lưu được); check trên mọi đường save (portal/REST và MCP). Portal không check trước, lỗi về từ server sau khi bấm Save, editor vẫn mở
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff + client API/MCP; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q4 (biên), Q7 (đường save); phần portal không check trước theo dev summary 2026-10-26. Bổ trợ TC-15, TC-31 PASS 2026-10-27. Chỉ chữ thông báo chờ PO (xem CLAIM-10), biên ≤ thì không (CCR cũ: CBS-024 CLAIM-08)
- **Trích nguyên văn:**
  ```
  - **Q4:** The boundary is ≤ (2000×2000 passes). "must be less than" is the existing Single upload message, reused unchanged. Agree with "must not exceed 4.000.000 px (4 Megapixel)". This also changes the Single upload message. **PO to confirm.**
  - **Q7:** Partly.
    - The 4 MP limit is checked on every save path: portal/REST and MCP, for both artworks and global options.
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - The portal does not check the 4 MP limit before saving. The error comes from the server after Save is clicked.
  ```

### CLAIM-18

- **Statement:** Known issue (chữ thông báo): thông báo 4 MP hiện là "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)" trên cả 3 nơi (toast artwork, toast GO T2I, GO Single upload) dù biên là ≤. Dev đồng ý đổi thành "must not exceed …" (cả Single upload) — PO chưa xác nhận, chưa ship lúc test
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-15, 16, 17 PASS 2026-10-27, staging, build không ghi lại; TC-19 tạm dừng chờ PO. Known issue, KHÔNG dùng làm expected. Chữ "must not exceed" dev đồng ý, PO chưa duyệt, chưa ship lúc test, không ghi là hành vi hiện tại. RA QA-3435 §0 theo lịch sử QA-3181 (TIB-5136) ghi Single upload là "must not exceed"; dev và TC-17 thấy "must be less than"; giữ cả hai (CCR cũ: CBS-024 CLAIM-10)
- **Căn cứ expected:** Jira TIB-5561 comment 55697 Q4, chinhdt 2026-10-27 ("must be less than" là thông báo có sẵn, dùng lại)
- **Trích nguyên văn:**
  ```
  TC-15 | ✅ AI — 4 MP boundary on save | … 2000×2001, 256×15626 → 422 "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)"; UI 2000×2001 → same toast, editor stays open
  TC-19 | ⏸️ AI — PO to confirm the message text (Q4) | current text on all 3 surfaces (artwork toast, T2I GO toast, Single upload GO): "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)" | Dev agreed "must not exceed …" (55697); not changed yet
  Dev (chinhdt, comment 55697, 2026-10-27, Q4) — xem CLAIM-08: "\"must be less than\" is the existing Single upload message, reused unchanged. Agree with \"must not exceed 4.000.000 px (4 Megapixel)\". … **PO to confirm.**"
  QA hỏi lại PO (phuongbb, comment 2026-10-27): "Proposed: **\"Flux dimension (width * height) must not exceed 4.000.000 px (4 Megapixel)\"** everywhere. OK?" — chưa có trả lời PO.
  ```

### CLAIM-19

- **Statement:** Đổi provider: giá trị ẩn của provider khác được giữ và bỏ qua (SDK chỉ gửi field của provider hiện tại), đổi lại thì giá trị cũ hiện lại; Flux size ẩn (kể cả > 4 MP) không chặn save
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (cấu hình) + buyer (request generate); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q10. Bổ trợ TC-10, TC-18 PASS 2026-10-27 (CCR cũ: CBS-024 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "After switching provider GPT ↔ Gemini (or model pro → 31), is the hidden resolution of the other provider cleared, or kept and ignored at generation?"
  - **Q10:** Kept and ignored. The portal keeps hidden values, and the SDK sends only the current provider's field, so switching back brings the old value back. Hidden Flux sizes don't block saving. Pro → 31 is the same field, so the value is used (see Q1/Q6).
  ```

### CLAIM-20

- **Statement:** Single upload Gen AI effect (regression, khác biệt có chủ đích): Resolution GPT / Gemini có 1K / 2K / 4K, KHÔNG có "Default"; GPT chọn sẵn 1K, Gemini chọn sẵn 2K
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-11 PASS 2026-10-27, staging, build không ghi lại. Liên quan artwork KB-017. _flows/layers-image-photo.md dòng 108 ghi Gemini có 0.5K ở effect (xem notes) (CCR cũ: CBS-024 CLAIM-13)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (Difference from Single upload)
- **Trích nguyên văn:**
  ```
  TC-11 | ✅ AI — Single upload effects keep 1K/2K/4K without Default | Gemini (<id> S-E): 1K/2K/4K, selected 2K; GPT (<id> SU-GPT): 1K/2K/4K, selected 1K
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - **Difference from Single upload**: the GPT and Gemini *Resolution* fields of the Single upload Gen AI effect have **no "Default" option**. They show **1K** (GPT) or **2K** (Gemini) pre-selected, because on that path an unset value really does generate at that size. … This difference is intended.
  ```

### CLAIM-21

- **Statement:** Known limitation: sau khi chọn 1 resolution, option "Default" bị disable, không chọn lại được; GPT/Gemini muốn quay lại output cũ chỉ còn cách tạo lại layer; Flux xoá cả 2 field → về output cũ (size theo tỉ lệ layer). PO chưa xác nhận chấp nhận cho release
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27; PO (trangdh) chưa trả lời phần chấp nhận release
- **Locator:** Jira TIB-5561 comment 55697 mục Q5. Bổ trợ TC-12 PASS 2026-10-27. Known limitation, KHÔNG dùng làm expected; chấp nhận cho release là câu của PO, chưa có trả lời, không coi là PO sign-off (CCR cũ: CBS-024 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Since "Default" cannot be re-selected after picking a value, how does a merchant get back to the pre-change output …? Is that acceptable for release?"
  - **Q5:** ok Q5. For GPT/Gemini, the only way back is to re-create the layer. For Flux, clearing both fields restores the old output. **PO to confirm release.**
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - After a resolution is picked, "Default" cannot be selected again from the dropdown. This is existing dropdown behaviour and is accepted for now.
  ```

### CLAIM-22

- **Statement:** Giá trị đã chọn được lưu (layer JSON `gpt_resolution "3840"` — chuỗi), giữ sau reload, giữ khi duplicate artwork; GO Text to Image giữ 2K sau reload; storefront generate dùng giá trị đó (T2I GPT 2K, layer 900×600 → 2048×1360)
- **Object / feature:** artwork/layer-config-image (liên quan: sdk, global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (lưu) + buyer (generate); portal · storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-08, 09, 27 PASS 2026-10-27, staging, build không ghi lại. Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-15)
- **Căn cứ expected:** KHÔNG CÓ cho phần lưu, reload, duplicate; phần kích thước TC-27 theo comment 55697 Q3
- **Trích nguyên văn:**
  ```
  TC-08 | ✅ AI — T2I global option 2K persists | GO <id> edit page: Default (disabled) / 1K / 2K / 4K → 2K → "Global option has been updated successfully." → reload 2K
  TC-09 | ✅ AI — 4K saved, reopened, kept on duplicate | MU-G 4K → JSON `gpt_resolution "3840"`; reopen 4K; MCP duplicate → artwork <id> MU-G `gpt_resolution 3840`
  TC-27 | ✅ AI — T2I GPT 2K | 900×600 → 2048×1360 (ratio 1.506, multiples of 16)
  ```

### CLAIM-23

- **Statement:** Validate giá trị cho phép (`gpt_resolution` 1024/2048/3840, `gemini_resolution` 512/1K/2K/4K) và Flux min 256 chỉ check ở server qua MCP; đường portal/REST chỉ dựa vào dropdown + rule min 256 của portal, server không check lại; 4 MP check trên mọi đường. Allowed list `gemini_resolution` của Text to Image trên MCP được thêm trong branch này
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `ADD`
- **Scope:** client API (REST) / MCP; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q7. Bổ trợ TC-30, TC-31 PASS 2026-10-27. "REST không check lại" là hành vi hiện tại dev mô tả, không phải rule PO chọn; giá trị lạ REST lưu được trong TC-31 là bằng chứng một lượt chạy, không phải danh sách chuẩn (CCR cũ: CBS-024 CLAIM-17)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Do artworks / global options saved via API / MCP with 'gpt_resolution', 'gemini_resolution', 'flux_output_width/height' on these layers go through the same validation (allowed values, 4 MP)?"
  - **Q7:** Partly.
    - The 4 MP limit is checked on every save path: portal/REST and MCP, for both artworks and global options.
    - Allowed values (`gpt_resolution` 1024/2048/3840, `gemini_resolution` 512/1K/2K/4K) and Flux min 256 are checked on the server **only via MCP**, the same as other layer fields.
    - On the portal/REST path, the values are limited by the dropdowns and by the portal's own min 256 rule. The server does not re-check them.
    - Text-to-image `gemini_resolution` had no allowed-value list on MCP. It was added in this branch.
  ```

### CLAIM-24

- **Statement:** Ô Flux width/height trên portal chỉ giữ số ("abc", `<script>…` → rỗng; "2e3", "２０００" → 2000; 10 000 chữ số → rỗng), Save với ô rỗng → lỗi field "… is required", không gửi request; tên GO chứa payload HTML/template hiện nguyên chữ, toast 4 MP trên trang GO không chứa tên GO
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-33 PASS 2026-10-27, staging, build không ghi lại (CCR cũ: CBS-024 CLAIM-19)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-33 | ✅ AI — Flux inputs keep only numbers; payload in GO name stays text | MU-F width: "abc" → "", `<script>alert(1)</script>` → "" (badInput), "2e3" → "2000", "２０００" → "2000", 10 000 digits → ""; layout unchanged; Save → "Flux output width (px) is required", no PUT. GO <id> renamed `"><img src=x onerror=console.log(1)>{{7*7}}` → shown literally; Flux 2000×2001 Save → toast "Something went wrong! Flux dimension … 4 Megapixel)"; `img[onerror]` 0, console.log 0, no "49" | GO-page toast does not include the GO name. GO name restored
  ```

### CLAIM-25

- **Statement:** Panel settings single-layer (LayerEditor, refactor sang `getLayerSchema`) vẫn có cho từng layer: AW1.0 text / clipart / group clipart / photo / moon phase giống production; chọn riêng 1 replica (không có `type`) → không mở panel trống, không lỗi console.
- **Object / feature:** artwork/layer-config-image
- **Quan hệ với canon:** `CONTRADICTS KB-085`
- **Scope:** store owner / staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-29, kết quả AI do máy chạy
- **Locator:** QA-3419 — TC-33, TC-34 trong `result_QA-3419_remaining_2026-10-29.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-29. Build staging `assets/index.acNZihq9.js` (panel đọc cho TC-33), `assets/index.BFN2fMjC.js` (TC-34); production (chỉ đọc) `index.13olohaV.js`. | TC-32 (AW2.0) ⏸️ một phần: 21 panel single-layer mở được, 7 type khớp production, 12–13 type chưa có baseline; không tính vào nguồn. Phiên bản artwork của KB-085 không rõ 1.0 hay 2.0, có thể chỉ khác scope. CHK-015 (READY) cùng nội dung KB-085. KB-002 ghi layer row có icon la-pen. Giữ cả hai phía (CCR cũ: CBS-025 CLAIM-23)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-33 | ✅ AI — AW1.0 text / clipart single-layer panels same as production | Staging [artwork id] vs prod [artwork id]: **clipart/clipart** "PERSONALIZATION: form_type, form_visibility · CLIPART SETTING: form_label, direct_clipart_style, clipart, default_value, input_hint, required, show_in_cart · CONDITIONAL · EXTRA: layer_display, custom_class, group_name" identical; **clipart/grouped_clipart** identical; **text/text** identical after turning off text_color / custom_font toggles on the staging copy (unsaved; prod layer has them off); **clipart/photo** with photo_editor image_cropper on both: same list; "Enable photo cropper" / "Remove background" hidden on both (deprecated, disabled); prod adds Gemini-effect sub-fields (its effect is gemini:image_filter), staging adds `photo_border_info`; **moon_phase/moon_phase** (same data editable true) same text …
  TC-34 | ✅ AI — replica without `type` selected alone: no blank panel, no console error | [artwork id] Local 1 replica R1 layer-[id] (saved data: only `id`, `global_id` — no `type`; MCP validate also warns "Layer has no type"). Select R1 → "1 selected", text toolbar (Roboto, 60), row actions only eye / lock (no pen = no settings panel, as product_facts L33 on the pre-refactor build); with T1's panel open, selecting R1 closes the panel (no empty panel); selecting R2 alone → 0 `.layer-panels`; console after selection: no messages
  Ngữ cảnh (dev summary, 2026-09-04 — không phải nguồn của claim): "Refactor: LayerEditor (panel settings của 1 layer) chuyển sang lấy schema qua hàm getLayerSchema dùng chung (layerSchema.js) thay cho switch/case cũ; hành vi single-layer editing kỳ vọng không đổi nhưng cần regression."
  Phía bên kia (canon): KB-085 / CHK-015 — trích ở Phần 3.
  ```

### CLAIM-26

- **Statement:** Cảnh báo thiếu key trong danh sách effect (đã có từ trước) mở rộng: ngoài Remove background (remover bên thứ ba thiếu key), Cutout.pro, ImagenHub, nay còn OpenAI / Flux / Gemini thiếu key, "Gen AI Effect" khi Default settings chưa có default provider, và Remove background khi chưa chọn remover nào; chữ không đổi; áp cho danh sách effect của layer Photo, Multiple uploads, Text to image và global option Photo, Text to image
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing-key warning in the Image effects list. Không có kết quả chạy có ngày (TC-32 chỉ có status passed trên Testlane). Liên quan artwork KB-017, KB-018, không thay (CCR cũ: CBS-029 CLAIM-18)
- **Trích nguyên văn:**
  ```
  - Before: covered Remove background (only when a third-party remover was chosen without its key), Cutout.pro and ImagenHub.
  - Now: also covers OpenAI, Flux and Gemini Gen AI effects without a key, "Gen AI Effect" when Default settings has no default provider, and Remove background when no remover is chosen at all. The message text is unchanged.
  - Where to see it: the effects list of the Photo, Multiple uploads and Text to image layer editors, and of the Photo and Text to image global option editors.
  Select Remove background with no remover chosen → warning names "Remove background" (new); with a Teeinblue remover → no warning.
  ```

### CLAIM-27

- **Statement:** Layer Dynamic Clipart by Text so khớp text buyer gõ với tên option clipart (origin_name/name) và group_name sau khi chuẩn hoá cả hai phía về Unicode NFC, nên tên lưu NFD khớp text gõ NFC và ngược lại, tên có ký tự đặc biệt khớp ngay lần gõ đầu, áp cho nguồn clipart và grouped_clipart.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk, asset-category)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (đặt tên clipart, cấu hình layer); storefront (SDK)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 "Context / logic changes" (mô tả kỹ thuật dev tự viết, PR teeinblue-sdk #2036; PR có thể đủ dev_doc nếu context builder đọc được). QA Hub TIB-139 TC-01/02/04/10 ở passed nhưng actualResult rỗng, không ngày chạy/build: không phải bằng chứng. Tên file/hàm là chi tiết code tại 2026-09-23, không phải oracle. Không dùng làm expected tới khi có người verify. (CCR cũ: CBS-032 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Root cause: the clipart name saved (e.g. via SVG filename upload) and the text typed by the buyer can use different Unicode Normalization Forms (e.g. NFD from a macOS filename vs NFC typed input) even though the characters render identically, so plain string equality (`===`) failed to match them.
  
  Fix (client-side only, in `teeinblue-sdk`):
  
  - `src/use/useCustomizationDataMapper.js` — `findByName` (used by `getClipartValue`/`getGroupedClipartValue` for the Dynamic Clipart by Text feature) now normalizes both the typed token and the option's `origin_name`/`name` to NFC before comparing.
  - `src/use/useClipartFrame.js` — `exactToken` now normalizes to NFC after trimming, so both the typed token and `option.name`/`group_name` compare consistently (covers both the `clipart` and `grouped_clipart` source types).
  - Added regression tests in both spec files covering an NFD-saved name against an NFC-typed value, and vice versa.
  
  - [ ] Clipart named with a special character (e.g. `Ô`, `Ê`, `ñ`, `ü`) matches on the very first typed entry, without needing to re-save the clipart name in the category — happy path for TIB-5412.
  - [ ] Clipart name saved via SVG filename upload from macOS (likely NFD) matches text typed on a standard keyboard (likely NFC).
  - [ ] Grouped clipart (`grouped_clipart` source type) also matches correctly when the group name or option name contains special characters.
  - [ ] A visually-identical but differently-normalized character typed by the buyer (e.g. pasted text vs typed text) resolves to the same clipart.
  ```

### CLAIM-28

- **Statement:** Sau khi chuẩn hoá NFC, tên ASCII vẫn khớp như cũ, so khớp vẫn phân biệt hoa thường (A và a là hai clipart khác nhau), và text rỗng hoặc chỉ có khoảng trắng không khớp clipart nào.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront (SDK)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 mục "Possible test cases". QA Hub TC-05/06/07 ở passed nhưng actualResult rỗng, không ngày chạy/build: không phải bằng chứng. Không dùng làm expected tới khi có người verify. (CCR cũ: CBS-032 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - [ ] Plain ASCII clipart names (existing behavior) still match exactly as before — no regression.
  - [ ] Case-sensitive matching still holds (e.g. `A` vs `a` still resolve to different cliparts) — normalization must not affect case sensitivity.
  - [ ] Empty/whitespace-only typed value still returns no match (unchanged behavior).
  ```

### CLAIM-29

- **Statement:** Khi nguồn là Group of Clipart Categories (grouped_clipart), group_name phải khớp giá trị retrieval_value; manual chỉ match group_name rồi lấy option mặc định đầu tiên; auto match group_name, sau đó khớp option.name thì lấy option đó, không khớp thì lấy option đầu tiên.
- **Object / feature:** artwork/layer-config-image (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner/staff (cấu hình layer); storefront (SDK), api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chauptm), 2026-09-30
- **Locator:** Jira TIB-5412 comment 52817, trả lời RQ1 (comment 52810). Dev nói đây là logic từ trước, TIB-5412 không đổi. Map manual/auto sang dynamic-by-text/clipart-frame là cách hiểu của QA theo KB-006/KB-007, dev không nói tên type; "option đầu tiên" chưa rõ theo thứ tự nào. TC-09 chưa viết lại, TC-10 không có kết quả chạy. Liên quan, không bị thay: KB-006, KB-007, KB-089, KB-077. (CCR cũ: CBS-032 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, comment 52810, 2026-09-30): "Với layer `grouped_clipart`: buyer gõ gì và so khớp với cái gì — `group_name` có bao giờ so khớp trực tiếp với text buyer gõ không, hay group chỉ khoanh vùng category con còn match thật vẫn là `option.name`?"
  
  @phuongbb với case grouped_clipart logic từ trước là thế này ạ:
  
  - group_name phải match với giá trị retrieval_value
    - manual: chỉ match group_name và default option đầu tiên
    - auto: match group_name
      - check match với option.name → lấy option này
      - không match với option → layer option đầu tiên
  ```

# Khối C — Guide, flow

| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_flows/layers-image-photo.md mục Image effects` | sửa | Đoạn cũ: "Resolution: OpenAI 1K (mặc định, không lưu key)/2K/4K; Gemini 0.5K/1K/2K/4K." → Đoạn mới: "Resolution: OpenAI 1K (mặc định, không lưu key)/2K/4K; Gemini tuỳ model Gemini của account (trang Gen AI Effects): Nano Banana 2.1 và Nano Banana Pro chỉ có 1K/2K/4K, không có 0.5K. Kiểm model của account trước khi đối chiếu danh sách." | Flow ghi một danh sách Gemini cho mọi model; claim trong file này cho thấy danh sách phụ thuộc model (từ CBS-023 CLAIM-02, CLAIM-03; CBS-024 CLAIM-13; TIB-5573, TIB-5561) |
| `_flows/personalization-populate-conditional.md mục Populate photo target` | sửa | Đoạn cũ: "Target `No personalization` không sinh field trên storefront; preview hiện placeholder target." → Đoạn mới: "Target `No personalization` không sinh field trên storefront; trước khi nguồn có ảnh, preview hiện ảnh mặc định của target (fill); sau khi buyer upload ở nguồn, target hiện ảnh từ nguồn (contain)." | Flow lệch với quan sát TC-06 và fit rule của claim No personalization trong file này (từ CBS-019 CLAIM-02; TIB-5521) |
