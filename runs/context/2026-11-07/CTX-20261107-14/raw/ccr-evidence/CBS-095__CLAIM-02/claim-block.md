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
