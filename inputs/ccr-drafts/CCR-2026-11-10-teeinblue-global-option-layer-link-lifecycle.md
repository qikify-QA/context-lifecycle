# Context Change Request: global-option — vòng đời Global Option với layer và linked copy (gộp từ 1 Proposal khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `global-option`
- **Ticket:** `TIB-5265, QA-3345, TIB-5233, QA-3344, TIB-5274, QA-3347, TIB-4703, QA-3399, TIB-5110, TIB-5119, TIB-5226`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon global-option thiếu coverage cho chặn xoá GO đang dùng, linked copy × GO, Option Title trống, import options, retrieval_* khi hai layer cùng GO, dedup-render. CHK-01-009 (xoá GO) có thể chạy sai nếu thực hiện trên GO đang dùng (Used>0) nhưng canon chỉ quan sát xoá bản clone Used=0 nên chưa mâu thuẫn trực tiếp. Proposal gốc CBS-044 không ghi mức gấp.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Xoá Global Option đang được dùng (Used > 0) bị chặn cứng: modal "Caution: Option is in use — This option is being used in N layer(s) across artworks. You need to remove it from all artworks before deleting.", chỉ có nút `View artworks` và `Close`, không có đường xoá; phải gỡ GO khỏi mọi artwork trước. Ghi chú cũ "xoá GO đang dùng thì tự unlink, không chặn" (QA-3344 2026-08-26, BR-10 QA-3283/TIB-5226) đã bị bác bỏ.
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (trang /global-options)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy TC-49 (tick ✅ AI) trên staging; QA (Yến) xác nhận đúng trong chat cùng ngày, 2026-09-07
- **Locator:** QA-3345 (dev TIB-5265) TC-49 PASS 2026-09-07 staging, build không ghi lại, chạy với layer Warp Text của fixture (quan sát gốc B3 2026-09-04). Canon liên quan: KB-008 (chỉ quan sát xoá bản clone Used=0; không mâu thuẫn trực tiếp), CHK-01-009 (applicability ghi "xem risk KB-009 cho Used>0"). KHÔNG coi tên modal, N và nhãn nút là text chuẩn đã duyệt. (CCR cũ: CBS-044 CLAIM-01)
- **Căn cứ expected:** KHÔNG CÓ (expected của TC-49 do QA viết sau khi QA xác nhận trong chat 2026-09-07 "như thế là đúng. layer nào cũng thế"; không có comment PO/Dev)
- **OQ:** CONFLICT — Xoá Global Option đang dùng (Used > 0) bị chặn cứng hay tự unlink khỏi layer. Side A: BR-10 QA-3283/TIB-5226 và ghi chú QA-3344 2026-08-26 "unlinks its linked layers; it does not block deletion" / Side B: TC-49 QA-3345 2026-09-07 modal "Caution: Option is in use" chặn cứng, chỉ có View artworks và Close. Dev/PO xác nhận hành vi đúng? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-017] **✅ CHỐT 2026-09-07 (user, QA-3345 TC-49): xoá Global Option ĐANG ĐƯỢC DÙNG bị CHẶN CỨNG — và ĐÚNG NHƯ VẬY VỚI MỌI LOẠI LAYER.** User: *"như thế là đúng. layer nào cũng thế"*. Modal: *"Caution: Option is in use — This option is being used in N layer(s) across artworks. You need to remove it from all artworks before deleting."*, chỉ có `View artworks` / `Close`, **không có đường xoá**. … Không tồn tại trạng thái "layer trỏ tới GO đã bị xoá" — nhưng lý do là *bị chặn xoá*, KHÔNG phải *tự unlink*. … ~~(2026-08-26, QA-3344) "Xoá GO đang dùng thì GO bị gỡ khỏi các artwork, không bị chặn xoá" + BR-10 QA-3283/TIB-5226 "unlinks its linked layers; it does not block deletion"~~ — **SAI, đã bị bác bỏ 2026-09-07.**
  TC-49 (result_QA-3345_recheck_chromium_2026-09-07): ✅ AI — xoá GO đang được dùng bị chặn cứng, và đó là hành vi ĐÚNG cho mọi loại layer — modal *"Caution: Option is in use — This option is being used in 1 layer(s) across artworks. You need to remove it from all artworks before deleting."*, chỉ có `View artworks` / `Close`.
  ```

### CLAIM-02

- **Statement:** Việc chặn xoá GO đang dùng áp cho mọi loại layer (không riêng Warp Text); không tồn tại trạng thái "layer trỏ tới GO đã bị xoá", nên không cần TC fallback cho tham chiếu treo.
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (trang /global-options)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) xác nhận trong chat, 2026-09-07; không phải PO/Dev
- **Locator:** QA-3345 recheck chromium 2026-09-07, mục Bối cảnh, dòng TC-49. TC-49 chỉ chạy với layer Warp Text của fixture; chưa có TC cho Text, Clipart, Photo… Phần "mọi loại layer" chỉ là QA chốt miệng. Canon liên quan: KB-008. (CCR cũ: CBS-044 CLAIM-02)
- **OQ:** NEEDS_CONFIRMATION — "Chặn xoá áp cho mọi loại layer" chỉ là QA chốt miệng; TC-49 chỉ chạy với layer Warp Text, chưa có TC cho Text, Clipart, Photo; Dev có xác nhận áp cho mọi loại layer không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  User (Yến) 2026-09-07: "như thế là đúng. layer nào cũng thế" (nguồn: results/result_QA-3345_recheck_chromium_2026-09-07.md, mục Bối cảnh, dòng TC-49)
  - [FACT-017] … ⇒ **Không tồn tại** trạng thái "layer trỏ tới GO đã bị xoá" … Đừng viết TC fallback cho tham chiếu treo, và đừng viết expected result kiểu "deletion is not blocked".
  ```

### CLAIM-03

- **Statement:** Duplicate & Link × Global Option là tổ hợp được support: linked copy kế thừa phần personalization do GO điều khiển từ origin (không đánh undefined hay out-of-scope).
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner, buyer; portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-08-26; không phải PO/Dev
- **Locator:** QA-3344 TC-31 và QA-3345 TC-46 (BR-13) chưa có kết quả PASS (⏸️ Not run). Chưa có TC PASS, chưa có PO/Dev xác nhận; KHÔNG coi là hành vi đã duyệt. Canon liên quan: KB-017. (CCR cũ: CBS-044 CLAIM-03)
- **OQ:** NEEDS_CONFIRMATION — Duplicate & Link × Global Option được support (linked copy kế thừa personalization từ origin) chỉ là QA chốt, TC-31 và TC-46 chưa chạy, chưa có PO/Dev xác nhận; PO có xác nhận không? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-019] **Duplicate & Link × Global Option là tổ hợp ĐƯỢC SUPPORT:** linked copy kế thừa phần personalization do GO điều khiển từ origin. Không đánh undefined/out-of-scope. (User chốt 2026-08-26.)
  TC liên quan (chưa PASS): TC-31 … The linked copy inherits the origin's Global-Option-driven personalization (confirmed by QA 2026-08-26 — this combination is supported, not undefined). The storefront shows exactly one Word Cloud input, sourced from `GO-A`; the linked copy contributes no field of its own and renders the same words. **⏸️ AI — Not run**
  ```

### CLAIM-04

- **Statement:** Chỉ origin giữ Global Option; linked copy không bao giờ mang GO riêng: không có đường UI nào trên linked copy mở được picker GO (nếu mở được là bug).
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (Artwork Editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-08-26 (QA-3344); không phải PO/Dev
- **Locator:** QA-3344 TC-34 chưa có kết quả PASS (⏸️). Canon liên quan: KB-017. (CCR cũ: CBS-044 CLAIM-04)
- **OQ:** NEEDS_CONFIRMATION — Chỉ origin giữ Global Option, linked copy không mở được picker GO nào chỉ là QA chốt, TC-34 chưa chạy; Dev có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-020] **Chỉ ORIGIN giữ Global Option; linked copy KHÔNG bao giờ mang GO riêng.** Không có đường UI nào trên linked copy mở được picker GO — nếu mở được thì đó là bug. (User chốt 2026-08-26, QA-3344.)
  TC-34 … The origin is the only layer that can hold a Global Option (confirmed by QA 2026-08-26). The linked copy exposes no Personalization tab and no global-option picker by any route … **⏸️ AI —
  ```

### CLAIM-05

- **Statement:** Word Cloud nằm trong scope của TIB-5110 (Import options from artworks into Global Options) và TIB-5119 (copy data từ GO sang local option); thiếu Word Cloud trong hai danh sách đó là bug.
- **Object / feature:** global-option/MỚI: import-options-to-global-option (phạm vi Thuộc: import options từ artwork vào Global Options, copy data từ GO sang local option; Không thuộc: tạo, sửa, xoá GO tại trang /global-options)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-08-26; không phải PO/Dev
- **Locator:** TIB-5110, TIB-5119. Không có TC PASS kiểm riêng (QA-3344 là issue Word Cloud GO, chưa có TC cho import hay copy). Checklist import chưa có trong canon. (CCR cũ: CBS-044 CLAIM-05)
- **OQ:** NEEDS_CONFIRMATION — Word Cloud nằm trong scope của TIB-5110 và TIB-5119 chỉ là QA chốt, chưa có TC kiểm import hay copy; PO/Dev có xác nhận scope không? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-027] **Word Cloud NẰM TRONG scope của TIB-5110 (Import options from artworks into Global Options) và TIB-5119 (copy data từ GO sang local option).** Thiếu Word Cloud trong 2 danh sách đó là bug. (User chốt 2026-08-26.)
  ```

### CLAIM-06

- **Statement:** Option Title để trống ở Global Option là case fallback, không phải validate chặn: GO vẫn save được, storefront vẫn render field với tên mặc định của layer hoặc placeholder chung; nếu bị chặn bằng validation thì chính cái chặn đó là bug.
- **Object / feature:** global-option/global-option-instance-management
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner, buyer; portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-08-26; không phải PO/Dev
- **Locator:** QA-3344 TC-37 (Option Title trống) chưa có kết quả PASS. Chuỗi fallback chính xác chưa ghi lại. (CCR cũ: CBS-044 CLAIM-06)
- **OQ:** NEEDS_CONFIRMATION — Option Title trống ở Global Option là case fallback (GO vẫn save, storefront render tên mặc định) chỉ là QA chốt, TC-37 chưa PASS và chuỗi fallback chính xác chưa ghi lại; chuỗi fallback đúng là gì? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-028] **Option Title để trống ở Global Option là case FALLBACK, không phải validate chặn.** GO vẫn save được, storefront vẫn render field, lấy tên mặc định của layer hoặc placeholder chung. Nếu bị chặn bằng validation thì chính cái chặn đó là bug. (User chốt 2026-08-26.)
  ```

### CLAIM-07

- **Statement:** Warp Text có support Global Option, và đồng bộ GO nằm trong scope test của TIB-5265 (không tách issue riêng như Word Cloud).
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner, buyer; portal, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) chốt trong chat, 2026-08-26 (TIB-5265); không phải PO/Dev
- **Locator:** QA-3345 TC-46 (GO trên Warp Text origin) ⏸️ Not run. (CCR cũ: CBS-044 CLAIM-07)
- **OQ:** NEEDS_CONFIRMATION — Warp Text có support Global Option và đồng bộ GO nằm trong scope TIB-5265 chỉ là QA chốt, TC-46 chưa chạy; Dev có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-034] **Warp Text CÓ support Global Option, và GO sync nằm TRONG scope test của TIB-5265** (không tách issue riêng như Word Cloud). User chốt 2026-08-26.
  ```

### CLAIM-08

- **Statement:** Trước TIB-5274, filter dropdown "Source option" của "Populate Content from another option" đã có ở cả production lẫn staging: khi layer B đã cùng GO với A, ô nguồn của B rỗng ("List is empty") nên không chọn được A, chặn được chiều thuận (gán GO trước, cấu hình populate sau).
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal (Artwork Editor)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) và AI đo tay trên production và staging, 2026-09-08; không phải PO/Dev
- **Locator:** QA-3347 (dev TIB-5274); `product_facts.md` FACT-053. QA-3347 TC-03 ✅ AI 2026-09-07 chỉ phủ staging sau fix. Canon liên quan: KB-026. (CCR cũ: CBS-044 CLAIM-08)
- **OQ:** NEEDS_CONFIRMATION — Filter "Source option" của Populate Content from another option có sẵn ở cả production lẫn staging trước TIB-5274 chỉ là số đo tay của QA/AI, không có TC phủ production; Dev có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-053] **TIB-5274 "remove invalid populate khi 2 layer cùng GO" — so prod vs staging (đo 2026-09-08):** - **Filter dropdown lúc config có sẵn TỪ TRƯỚC ở CẢ prod LẪN staging** (không phải staging bỏ đi cái gì). Khi layer B đã ở cùng GO với A, ô "Source option" của "Populate Content from another option" trên B **rỗng hoàn toàn** ("List is empty") → không chọn được A. Chặn được **chiều thuận** (gán GO trước, cấu hình populate sau) — đúng như staging TC-03.
  ```

### CLAIM-09

- **Statement:** Filter đó không chặn chiều ngược (cấu hình populate trước khi hai layer cùng GO, rồi gán A và B vào cùng GO): dữ liệu lưu để lại `retrieval_layer`, `retrieval_value`, `retrieval_value_enabled` stale; UI giấu Source nhưng vẫn giữ Value; đây là data gây bug order "missing digit / wrong color" (trạng thái trước khi TIB-5274 lên production).
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal, api (artwork JSON), storefront (order)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến) và AI đo tay trên production, 2026-09-08; không phải TC, PO hay Dev
- **Locator:** TIB-5274; `product_facts.md` FACT-053. Đo: Save & Close không đổi gì thì `updated_at` nhảy lên (2026-09-08T06:09:59) nhưng `retrieval_*` còn nguyên. Hành vi này đã đổi sau khi TIB-5274 lên production 2026-09-17 (xem CLAIM-10). Canon liên quan: KB-026. (CCR cũ: CBS-044 CLAIM-09)
- **OQ:** NEEDS_CONFIRMATION — Chiều ngược (cấu hình populate trước rồi gán chung GO) để lại retrieval_* stale là số đo trước khi TIB-5274 lên production và đã đổi sau 2026-09-17 (CLAIM-10), không phải TC/PO/Dev; claim này còn đúng hay chỉ là trạng thái lịch sử? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - Filter đó **KHÔNG chặn chiều ngược** (cấu hình populate trước khi 2 layer ở normal → rồi gán A vào GO → gán B vào cùng GO). State này để lại `retrieval_layer`/`retrieval_value`/`retrieval_value_enabled` **stale trong data đã lưu**, UI giấu Source (hiện blank) nhưng vẫn giữ Value. Đây chính là data gây bug order "missing digit / wrong color".
  ```

### CLAIM-10

- **Statement:** TIB-5274: khi Save artwork, nếu layer A và B cùng Global Option thì strip `retrieval_layer`, `retrieval_value`, `retrieval_value_enabled` của B (A giữ nguyên); chỉ cộng thêm một bước dọn lúc save, không bỏ hành vi nào của production. Ghi chú "prod CHƯA có" trong FACT-053 là snapshot 2026-09-08, đã lỗi thời: TIB-5274 lên production 2026-09-17 và release-verification PASS.
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal, api (artwork JSON sau Save)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy TC-01 (staging 2026-09-07 ✅ AI; production 2026-09-17 PASS trong release-verification); QA duyệt ghi trên store QA, 2026-09-17
- **Locator:** QA-3347 TC-01 PASS 2026-09-17 production (deploy ghi tại kênh changelog 2026-09-17 10:01, build không ghi lại); staging 2026-09-07 (result B1 auto). Canon liên quan: KB-026. KHÔNG coi mô tả "prod chưa có TIB-5274" là hiện trạng. (CCR cũ: CBS-044 CLAIM-10)
- **Căn cứ expected:** TIB-5274, REQ chính "Strip populate khi Save" (theo bảng release-verification, mức High); comment hay mô tả gốc của ticket không có trong Proposal cũ nên không trích được; không có comment PO/Dev
- **OQ:** NEEDS_CONFIRMATION — Ghi chú "prod CHƯA có TIB-5274" trong FACT-053 là snapshot 2026-09-08 đã lỗi thời (TIB-5274 lên production 2026-09-17, release-verification PASS); Dev xác nhận hành vi strip retrieval_* khi Save hiện là canon và không còn bước nào khác của production bị đổi? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  | Strip populate khi Save (REQ chính, TC-01/03/11) | High | ✅ | ✅ | artwork test tạo qua API: A + B cùng GO #1, B có `retrieval_layer=A, retrieval_value={{value.capitalonly}}, retrieval_value_enabled=true` (GraphQL trước save xác nhận). Mở editor → Save & Close không sửa gì → PUT payload B **không còn 3 field retrieval_***; GraphQL sau save: B chỉ còn `customization_type=global_option, global_option=1`. Toast chỉ "Success — Your artwork has been updated" (silent, đúng BR).
  Staging TC-1: ✅ AI — Cleanup with the reverse-order recipe (populate configured before the GO) — layer B PUT payload = {"customization_type":"global_option","global_option":831} (no retrieval_* fields); layer A unchanged
  ```

### CLAIM-11

- **Statement:** N layer Text dùng chung một Global Option (cùng `global_option`, đều `visible:true`, chung một template): storefront dedup-render chỉ đúng một input `name="global-option-<id>"` (id của layer đầu theo thứ tự); layer thứ hai trở đi không có input hay label, buyer không bao giờ thấy field riêng cho chúng. Cùng cơ chế dedup-render với GO Addon Charge, không riêng một type.
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront (GraphQL, DOM)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy TC-20 (tick ✅ AI), 2026-10-19; BUG-04 (báo thiếu field cho layer 2) discard là not_a_bug
- **Locator:** QA-3399 (dev TIB-4703) TC-20 PASS 2026-10-19 staging (result TC20 dedup-verified; lần đầu B1 smoke2 2026-10-09), build không ghi lại. Chỉ kiểm với GO type Single-line Text trên một artwork; chưa biết "layer đầu theo thứ tự" có đúng cho mọi type GO (Clipart Category, Photo, Toggle…). KHÔNG coi là spec. Canon liên quan: KB-028 (không mâu thuẫn, canon đã nói dedupe theo GO id; claim thêm chi tiết "layer đầu"), CHK-02-009. (CCR cũ: CBS-044 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ (expected của TC-20 được sửa khớp hành vi quan sát sau khi chạy; không có comment PO/Dev)
- **OQ:** NEEDS_CONFIRMATION — Chưa biết "layer đầu theo thứ tự" có đúng cho mọi type GO (Clipart Category, Photo, Toggle...) vì chỉ kiểm GO Single-line Text trên một artwork; Dev có xác nhận quy tắc dedup-render cho mọi type không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-111] **Cơ chế dedup-render ở trên (Addon Charge) KHÔNG RIÊNG của type đó — cùng cơ chế áp dụng cho Global Option loại Text.** Xác nhận qua GraphQL: layer ("GOLayerA") và layer ("GOLayerB"), cả 2 `visible:true`, cùng `global_option`, nằm chung 1 template. Nhưng DOM storefront chỉ có ĐÚNG 1 input `name="global-option-<id>"` (`id` của layer ĐẦU theo thứ tự), không có input/label nào cho "GOLayerB" — buyer KHÔNG BAO GIỜ thấy field riêng cho layer thứ 2 trở đi trong cùng 1 GO, dù layer đó `visible:true` và cấu hình đầy đủ.
  TC-20: ✅ AI — DOM thật `?GOLayerA=Hello`: chỉ 1 input `global-option-<id>`, value="Hello".
  ```

### CLAIM-12

- **Statement:** Với GO dùng chung N layer chỉ có một field hiện ra (title lấy theo layer đầu) và field đó phản ánh giá trị dùng chung cho group: set giá trị qua field duy nhất đó (gõ tay hoặc URL prefill `?<title layer>=...`) là đã set cho mọi layer trong group (customization value `global-option-<id>` dùng chung). Đừng viết TC hay expected "mỗi layer dùng chung GO hiện một field riêng, cả N field đều ra giá trị X". Khoá prefill khớp là title của layer, không phải tên quản lý của GO.
- **Object / feature:** global-option/artwork-personalization-global-option-link
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy TC-20 (tick ✅ AI); FACT-112 do AI suy từ FACT-111 và đối chiếu kết quả 2026-10-09; ngày nguồn 2026-10-19
- **Locator:** QA-3399 TC-20 (REQ-06) PASS: 2026-10-09 (B1 smoke2): `?GOLayerA=Hello` và `?GOLayerB=World` đều ra giá trị ở cả hai layer; 2026-10-19 staging (TC20 dedup-verified). Build không ghi lại. Chỉ kiểm GO type Single-line Text. Canon liên quan: KB-029 (cùng hướng: giá trị áp cho mọi nơi dùng GO). (CCR cũ: CBS-044 CLAIM-12)
- **Căn cứ expected:** QA-3399 REQ-06 "1 param cập nhật mọi layer dùng chung GO" (theo kết quả TC-20); tài liệu REQ gốc không có trong Proposal cũ. Data TC-20 ban đầu ghi `?GOShared=Hello` (tên GO) sai, đã đề nghị QA sửa
- **OQ:** NEEDS_CONFIRMATION — FACT-112 do AI suy từ FACT-111, chỉ kiểm GO Single-line Text và tài liệu REQ-06 gốc không có trong Proposal; Dev/PO có xác nhận 1 param/field đặt giá trị cho mọi layer dùng chung GO, và khoá prefill là title của layer không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-112] **Đừng viết TC/expected kiểu "mỗi layer dùng chung GO hiện 1 field riêng, cả N field đều ra giá trị X"** — chỉ có 1 field hiện ra (title lấy theo layer đầu), và field đó phản ánh giá trị dùng chung cho group. Prefill/set giá trị qua field duy nhất này = coi như đã set cho MỌI layer trong group (customization value `global-option-<id>` dùng chung), không cần tìm field thứ 2 để verify "cả 2 layer đều ra Hello".
  Bằng chứng giá trị chung (2026-10-09): TC-20 | ✅ AI — `?GOLayerA=Hello` → field = "Hello", preview CẢ 2 layer (GOLayerA + GOLayerB) đều "Hello"; test tương tự `?GOLayerB=World` cũng ra "World" ở cả 2 layer → REQ-06 (1 param cập nhật mọi layer dùng chung GO) hoạt động đúng
  ```
