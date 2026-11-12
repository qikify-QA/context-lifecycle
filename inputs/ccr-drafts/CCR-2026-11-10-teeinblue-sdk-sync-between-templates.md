# Context Change Request: sdk — sync giữa template, toggle Product Page Settings, ngưỡng ảnh Photo Upload, Cross-sell (gộp từ 1 Proposal khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `sdk`
- **Ticket:** `QA-3286, TIB-5284, QA-3350, TIB-5241, QA-3399`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon sdk thiếu coverage cho sync lựa chọn buyer giữa template, ngưỡng ảnh Photo Upload và route, cấp store của toggle. CLAIM-06 (default `false` của toggle) lệch với KB-026 (ghi toggle "checked" ở cả hai store explorer) nhưng chưa rõ do schema hay do đã bật tay, nên chưa chặn test. Proposal gốc CBS-048 không ghi mức gấp.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Sync lựa chọn của buyer giữa các template match theo Option title cộng personalization type và settings; Layer name không phải tiêu chí (Layer name khác nhau vẫn sync, không cần TC riêng).
- **Object / feature:** sdk/MỚI: sync-selection-between-templates (phạm vi Thuộc: sync selection của buyer giữa các option cùng title ở các template khác nhau, quan hệ với default của seller, Global Template, Global Option, cross-type mismatch; Không thuộc: cấu hình toggle, thuộc product-page-settings-config)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (chọn, nhập giá trị), store owner (cấu hình option); storefront, portal (Live Preview trong artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đính chính trực tiếp, 2026-08-25; không phải PO/Dev
- **Locator:** QA-3286 (dev TIB-5284), result QA-3286 webkit 2026-08-25. Không có TC kiểm riêng ca "Layer name khác nhau vẫn sync" (ca âm Layer-name đã bị bỏ khỏi bộ TC). Phát biểu trước đó của user (Layer name + Option title + type) bị đính chính ngày này. (CCR cũ: CBS-048 CLAIM-01)
- **OQ:** NEEDS_CONFIRMATION — Sync buyer giữa template match theo Option title cộng personalization type và settings, Layer name không phải tiêu chí, có đúng không (không có TC kiểm riêng ca Layer name khác nhau, phát biểu trước đó đã bị đính chính)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-001] **Sync customer's selection between templates KHÔNG match theo Layer name.** Chỉ cần **Option title + personalization type/settings** giống nhau; Layer name khác không phải một negative case và không cần test riêng. User sửa trực tiếp ở QA-3286 ngày 2026-08-25.
  result_QA-3286_webkit_2026-08-25.md: Matching is based on Option title plus personalization type/settings. Layer name mismatch is intentionally not a test axis per the latest PO/QA correction.
  ```

### CLAIM-02

- **Statement:** "Sync giữa template" (`sync_between_templates`, sync-by-option-title) chỉ đồng bộ selection của buyer; default value do seller đặt là độc lập theo từng layer và template (hai template không dùng Global Template: đổi default ở A không đổi B).
- **Object / feature:** sdk/MỚI: sync-selection-between-templates (liên quan: artwork, default value của Color layer)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner (default value), buyer (selection); portal (artwork editor, Live Preview), storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy (tick [AI]); câu "sync chỉ là selection của buyer, default độc lập" do QA chốt 2026-09-11; chưa có PO/Dev xác nhận
- **Locator:** QA-3350 TC-42 PASS 2026-09-11 staging (spec CLI), sau lần TIB-5241 giao QA cuối 2026-08-28; QA-3286 TC-01 PASS 2026-09-04 staging, Chromium (sync selection A→B). Build không ghi lại. BR-12 của QA-3350 (viết 2026-09-03) từng viết sai, một lượt test và bug sai đã rút lại. (CCR cũ: CBS-048 CLAIM-02)
- **Căn cứ expected:** KHÔNG CÓ (expected do QA chốt 2026-09-11 sau khi BR-12 viết sai; không có PO/Dev)
- **Trích nguyên văn:**
  ```
  - [FACT-002] **⚠️ "Sync giữa template" = sync SELECTION CỦA BUYER, KHÔNG PHẢI default value của seller (user chốt 2026-09-11, QA-3350 TC-41/42).** Cơ chế `sync_between_templates`/"sync-by-option-title" chỉ đồng bộ **giá trị buyer đã chọn** giữa các option cùng title ở các template khác nhau … **Default value (giá trị seller set sẵn trước khi buyer chọn) là ĐỘC LẬP theo từng layer/từng template** — KHÔNG tự sync qua cơ chế này, TRỪ KHI layer đó dùng chung **Global Option** … hoặc **Global Template** …
  QA-3350 TC-42: Đổi default 1 template KHÔNG ảnh hưởng template kia (mỗi layer giữ default riêng). ✅ AI — verified 2026-09-10/11 (spec CLI pass): hai layer default khác nhau độc lập cả hai chiều.
  QA-3286 TC-01: B's input and canvas show exactly `Alice`; no default/stale value flashes after the destination finishes rendering. ✅ AI — Re-confirmed Chromium 2026-09-04
  ```

### CLAIM-03

- **Statement:** Ngoại lệ Global Template: local template kế thừa default của Global Template layer (layer replica không ghi field default riêng, kế thừa lúc render, seller không override được ở local); default "đồng bộ" chỉ qua cơ chế này, không qua sync-by-option-title.
- **Object / feature:** sdk/MỚI: sync-selection-between-templates (liên quan: artwork, Global Template)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (artwork editor, Live Preview)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI], không có tick [QA]), 2026-09-11
- **Locator:** QA-3350 TC-41 PASS 2026-09-11 staging (REPL tay và spec CLI), sau lần TIB-5241 giao QA cuối 2026-08-28; build không ghi lại. (CCR cũ: CBS-048 CLAIM-03)
- **Căn cứ expected:** KHÔNG CÓ (expected do QA viết; không có PO/Dev)
- **Trích nguyên văn:**
  ```
  QA-3350 TC-41 — Global Template: default value set trên GT Color layer → local template kế thừa. Local template's Color option hiện swatch `#D0021B` ở trạng thái `active` + `checked` (kế thừa qua global layer id, không ghi field riêng). Seller không override được ở local (row replica không có nút edit). ✅ AI — verified 2026-09-11: GT layer default `#D0021B` → local "Template 1" Live Preview swatch active+checked; replica layer has no own `default_value` (references GT). Fixture restored to null.
  ```

### CLAIM-04

- **Statement:** Ngoại lệ Global Option: các layer liên kết cùng một Global Option dùng chung default của GO (đổi default ở GO thì mọi layer liên kết đều nhận).
- **Object / feature:** sdk/MỚI: sync-selection-between-templates (liên quan: global-option, default value)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (artwork editor, Global Options)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI], không có tick [QA]), 2026-09-11
- **Locator:** QA-3350 TC-24, TC-26 PASS 2026-09-11 staging (full-suite regression, 48 pass, 3 flaky-then-pass, 0 fail), sau lần TIB-5241 giao QA cuối 2026-08-28; build không ghi lại. TC-24, TC-26 là propagate GO → layer; chưa có TC kiểm riêng giữa hai template khác nhau. (CCR cũ: CBS-048 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ (expected do QA viết; không có PO/Dev)
- **Trích nguyên văn:**
  ```
  QA-3350 TC-24 — GO default wins for a linked layer (render): The element renders Green (the GO default), not Blue (the old local value) and not black ✅ AI — GO default wins for a linked layer, renders on the field (not black)
  QA-3350 TC-26 — Changing the GO default propagates to all linked layers: Every linked layer now renders Orange as its pre-selection default ✅ AI — changing the GO default propagates to every linked layer
  ```

### CLAIM-05

- **Statement:** Cross-type mismatch khi sync: hai template không phải Global Template có Color option cùng title nhưng khác Color type (A = Solid, B = Color Sequence); buyer chọn màu ở A rồi chuyển sang B thì B không đổi gì (giữ default riêng, không blank, không lỗi, không cross-apply).
- **Object / feature:** sdk/MỚI: sync-selection-between-templates
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront, portal (Live Preview trong artwork editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI (tick [AI]); QA chốt kỳ vọng (a) 2026-09-11; không phải PO/Dev
- **Locator:** QA-3350 TC-56 PASS 2026-09-11 staging (spec CLI), sau lần TIB-5241 giao QA cuối 2026-08-28; build không ghi lại. QA chọn phương án (a) không đổi trong 3 phương án (a) không đổi, (b) blank, (c) báo lỗi; chưa có PO/Dev xác nhận. KHÔNG coi là hành vi PO đã duyệt. (CCR cũ: CBS-048 CLAIM-05)
- **Căn cứ expected:** KHÔNG CÓ (expected do QA chọn phương án (a) 2026-09-11; không có PO/Dev)
- **OQ:** NEEDS_CONFIRMATION — Khi hai template có Color option cùng title nhưng khác Color type thì B không đổi (phương án a) có phải hành vi PO/Dev chọn không (QA chọn trong 3 phương án a, b, c, chưa ai xác nhận)? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-003] **Cross-type mismatch khi sync selection giữa template (user chốt 2026-09-11, QA-3350 TC-56):** 2 template non-GT có Color option **cùng title** nhưng **khác Color type** (A = Solid, B = Color Sequence) → buyer chọn màu ở A rồi switch sang B: **B KHÔNG ĐỔI GÌ** — giữ nguyên state/default riêng của nó (không blank, không báo lỗi, không cross-apply). User chọn phương án (a) "không đổi gì" trong 3 phương án (a) không đổi / (b) blank / (c) báo lỗi.
  TC-56 ✅ AI — spec CLI pass 2026-09-11: after switch B shows `checkedValue="5838"` (own sequence default), `err=null`, `fieldPresent=true`, 3 options — unchanged, no crash/blank.
  ```

### CLAIM-06

- **Statement:** Toggle tên nội bộ `sync_between_templates`, nhãn "Sync customer's selection between same title options", `default_value: false`, description "What customers select or type in an option will be applied for all other options (in all templates) having the same Option title and Personalization."
- **Object / feature:** sdk/product-page-settings-config
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (Store Settings, Product Page Settings)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay trên staging, 2026-09-10; không phải PO/Dev
- **Locator:** QA-3286, `product_facts.md` FACT-054. QA-3286 TC-09 [QA] 2026-09-11 chỉ kiểm hành vi khi toggle OFF, không kiểm tên field, default_value hay description. Production không rõ. Canon liên quan KB-026 (ghi toggle "checked" ở cả hai store explorer) và KB-038 (INFERRED, `instance.config` có key `sync_between_templates`); chưa giải thích khác biệt: `default_value` false là schema còn hai store đã bật tay, hay mặc định đã đổi. KHÔNG coi `default_value: false` là đúng hiện hành. (CCR cũ: CBS-048 CLAIM-06)
- **OQ:** CONFLICT — default_value của toggle sync_between_templates là false hay mặc định hiện hành đã đổi, vì hai store explorer đã bật tay? — Người trả lời: Dev. Side A: FACT-054 ghi default_value false (KB-038 INFERRED, instance.config có key sync_between_templates) / Side B: KB-026 ghi toggle checked ở cả hai store explorer.
- **Trích nguyên văn:**
  ```
  - [FACT-054] Toggle tên nội bộ **`sync_between_templates`**, nhãn *"Sync customer's selection between same title options"*, `default_value: false`, description: *"What customers select or type in an option will be applied for all other options (in all templates) having the same Option title and Personalization."*
  ```

### CLAIM-07

- **Statement:** Toggle "Sync customer's selection between same title options" nằm ở route `/product-page-settings` của portal (không phải `/general-settings`; route `/settings` trả 404).
- **Object / feature:** sdk/product-page-settings-config
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay trên staging, 2026-09-10; không phải PO/Dev
- **Locator:** QA-3286, `product_facts.md` FACT-055. Chỉ là QA đo trên staging, production không rõ; KHÔNG coi tên route là spec. Canon liên quan: KB-023. (CCR cũ: CBS-048 CLAIM-07)
- **OQ:** NEEDS_CONFIRMATION — Toggle nằm ở route /product-page-settings (không phải /general-settings) có đúng trên production không (chỉ là QA đo trên staging)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-055] **Nằm ở route `/product-page-settings`** của portal. KHÔNG phải `/general-settings`; route `/settings` trả **404**
  ```

### CLAIM-08

- **Statement:** Toggle `sync_between_templates` ở cấp store (instance), không phải cấp artwork hay campaign: tắt nó ở một store ảnh hưởng mọi session đang test sync trên store đó.
- **Object / feature:** sdk/product-page-settings-config
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay trên staging, 2026-09-10; không phải PO/Dev
- **Locator:** QA-3286, `product_facts.md` FACT-056. KHÔNG coi "cấp STORE" là spec; production không rõ. Canon liên quan: KB-023 (trang theo store đang active). (CCR cũ: CBS-048 CLAIM-08)
- **OQ:** NEEDS_CONFIRMATION — Toggle sync_between_templates ở cấp store (instance) có đúng không (chỉ là QA ghi nhận, production không rõ)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-056] **Cấp STORE (instance)**, không phải cấp artwork/campaign ⇒ tắt nó trên store test là mọi session khác đang test sync ra kết quả rác. Muốn test case "Sync OFF" thì xin cửa sổ ngắn khi không ai chạy, hoặc dùng store cô lập.
  ```

### CLAIM-09

- **Statement:** Photo Upload (storefront) có ngưỡng kích thước ảnh tối thiểu: ảnh nhỏ bị chặn kèm thông báo "Cannot upload because the image is too small. Please upload a bigger image" (400×400 bị từ chối, 2000×2000 được nhận); ngưỡng chính xác chưa dò ra, chưa biết theo pixel tuyệt đối hay theo kích thước layer.
- **Object / feature:** sdk/storefront-buyer-facing (liên quan: artwork, field 'Set minimum size' mà canon artwork chưa test; KB-046 khác: GenAI Multiple Uploads, thông báo "filesize field must be at least 10000")
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo tay, 2026-09-07; không phải PO/Dev
- **Locator:** `product_facts.md` FACT-051; không gắn ticket hay TC. Chỉ là hai điểm đo (layer trong fixture rộng 400px); chưa biết cùng cơ chế hay khác cơ chế với validation filesize của KB-046; cần hỏi Dev nếu viết TC về ranh giới. KHÔNG coi 400×400 là ngưỡng thật. Thông báo chỉ nói "bigger", không nêu ngưỡng. (CCR cũ: CBS-048 CLAIM-09)
- **OQ:** OPEN_ISSUE — Ngưỡng kích thước ảnh tối thiểu của Photo Upload là bao nhiêu, tính theo pixel tuyệt đối hay theo kích thước layer, và có cùng cơ chế với validation filesize của KB-046 không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-051] **⚠️ Photo Upload có NGƯỠNG KÍCH THƯỚC TỐI THIỂU — ảnh nhỏ bị chặn kèm thông báo "Cannot upload because the image is too small. Please upload a bigger image" (đo 2026-09-07).** 400×400 bị từ chối; 2000×2000 được nhận. Chưa dò ra ngưỡng chính xác, và **chưa biết ngưỡng theo pixel tuyệt đối hay theo kích thước layer** (layer trong fixture rộng 400px) — cần hỏi dev nếu viết TC về ranh giới này.
  ```

### CLAIM-10

- **Statement:** Teeinblue chỉ có duy nhất một feature tên "Cross-sell Personalization" (Store Settings, Product Page Settings, field `field__cross_sell_personalization`): link một main product với một product khác hoặc một collection (metafield Shopify `tib.cross_sell.product`, `tib.cross_sell.collection`); KB help center không nhắc feature riêng tên "addon product".
- **Object / feature:** sdk/product-page-settings-config
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner, buyer; portal, storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) đo và tra KB help center, 2026-10-21; không phải PO/Dev
- **Locator:** QA-3399; `product_facts.md` FACT-151; KB help center "How to add Cross-sell Personalization to your campaigns". QA-3399 TC-24 bị ⏭️ skip (QA quyết định 2026-10-21) nên không phải bằng chứng PASS. KB help center còn nhắc "Display on" và nút "Add metafields" mà mục không đề cập. Nếu REQ nào tách "popup cross-sell" và "popup addon product" thành hai bề mặt, cần hỏi lại Dev/PO. Canon liên quan: KB-028 (checkbox 'Show Cross-sell Personalization' unchecked ở cả hai store). KHÔNG coi "chỉ có một feature" là đã chứng minh. (CCR cũ: CBS-048 CLAIM-10)
- **OQ:** NEEDS_CONFIRMATION — Cross-sell Personalization có phải feature duy nhất (không có popup addon product riêng) không, vì KB help center còn nhắc Display on và nút Add metafields (TC-24 bị skip)? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-151] **Teeinblue chỉ có DUY NHẤT 1 feature tên "Cross-sell Personalization"** (Store Settings → Product Page Settings → mục "Cross-sell Personalization", field `field__cross_sell_personalization`): link 1 main product với 1 product khác HOẶC 1 collection (metafield Shopify `tib.cross_sell.product` / `tib.cross_sell.collection`). KB … không nhắc feature nào riêng tên "addon product" — nếu REQ nào tách "popup cross-sell" và "popup addon product" thành 2 bề mặt khác nhau, cần hỏi lại dev/PO
  QA-3399 TC-24: ⏭️ QA — quyết định skip toàn bộ 2026-10-21 … Không raise bug — chưa quan sát được hành vi thật ở row cross-sell/addon nên không có cơ sở kết luận pass/fail
  ```
