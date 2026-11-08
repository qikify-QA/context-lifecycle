# Context Change Request: sdk-genai-runtime — gộp từ 4 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `sdk`
- **Ticket:** `TIB-5573, TIB-5561, QA-3435, TIB-5554, TIB-5470, QA-3406`
- **Các khối có trong file:** `A, B`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-023: MEDIUM — Canon thiếu coverage cho model Gemini, Resolution và backup model; không có checklist hay automation đang publish nào chạy sai, không chặn test P0/P1.
- CBS-024: MEDIUM — canon thiếu coverage cho field output size và check 4 MP (gap); CLAIM-23 chỉ là quan sát phụ, CHK-01-007, CHK-01-014 đã ở NEEDS_CONFIRMATION nên chưa đủ HIGH.
- CBS-028: MEDIUM — QA chọn MEDIUM (phuongbb, 2026-11-01): phần lớn là gap coverage; riêng CHK-02-011 đang chạy sai vì expect model='nano_banana'.
- CBS-029: MEDIUM — canon thiếu hoàn toàn tính năng đã ship (gap coverage); không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Trên Nano Banana 2.1, layer Text to Image và Multiple Uploads có 1K, 2K, 4K đã lưu dưới Nano Banana 2 thì giá trị hiện ra và được gửi tới 2.1, còn 512 đã lưu hiện trống và bị bỏ qua, output theo default size của Google (không về 2K như Photo).
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q8 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-22 = TC-TIB-7923, TC-40 = TC-TIB-7941 PASS 2026-10-30 trên portal index.CReWKeT2.js (Last-Modified 2026-10-30 07:06:14 GMT). T2I với 512 chưa test, chỉ test Multiple Uploads. (CCR cũ: CBS-023 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - Q8: With the Q2 fix, a value saved under Nano Banana 2 shows in the 2.1 Resolution field and is
  applied: 1K / 2K / 4K are sent to 2.1. A saved 512 shows blank and is ignored (Google default size)
  until the merchant picks a value.
  Bổ trợ — TC-22 (TC-TIB-7923) ✅ 2026-10-30, portal `index.CReWKeT2.js`: "MU with 512 on 2.1: blank in the portal; generation completes at Google's default (1024×1024), not 512×512" (job [đã bỏ id]; status record vẫn ghi `gemini_resolution "512"`). TC-40 (TC-TIB-7941) ✅: MU đã lưu 2K hiện `2K` trên 2.1, request 2K. T2I với 512: chưa test.
  ```

### CLAIM-02

- **Statement:** Output size của Nano Banana 2.1 bằng Nano Banana 2 ở cùng resolution và tỉ lệ layer.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q3 (comment id 56094 theo RA QA-3442). Bổ trợ: TC-15 = TC-TIB-7916, TC-16 = TC-TIB-7917 PASS. Kích thước pixel đo được chỉ là quan sát một lần trên staging 2026-10-30, không phải oracle; chỉ đo 1:1 ở 1K, 2K, 4K và 3:2 ở 2K. (CCR cũ: CBS-023 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - Q3: Output size is the same as Nano Banana 2 today at the same resolution and layer ratio.
  Bổ trợ (quan sát, không phải oracle) — TC-15 (TC-TIB-7916) ✅: 1:1, 1K → 1024×1024, 4K → 4096×4096. TC-16 (TC-TIB-7917) ✅: "3:2 at 2K: 2.1 = NB2 = 2528×1696" (upload [đã bỏ id] NB2, [đã bỏ id] 2.1).
  ```

### CLAIM-03

- **Statement:** Fallback của Nano Banana 2.1 chỉ dùng cho outage: toggle "Auto-switch to a backup model" ON và 2.1 bị coi là down thì generate bằng Nano Banana 2 (nano_banana_31, backup đặt ở genai_model_fallbacks trong Admin > Settings), model đã lưu vẫn là 2.1 và ghi fallback_model; toggle OFF thì báo lỗi, không fallback; retirement chưa áp dụng cho 2.1.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), toggle do owner bật; storefront, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q1, Q7 (comment id 56094 theo RA QA-3442) và comment trả lời 56103 của QA (mục 1). Dev xác nhận bằng lời, QA chưa chạy cho 2.1: TC-27, 28, 39 ⏭️, TC-29 ⏸️, bảng genai_model_fallbacks chưa đọc được; không coi là đã test. Fallback model khác route fallback upload ảnh (KB-046) và fallback ID (KB-049, 050, 052), không gộp. (CCR cũ: CBS-023 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - Q1: Outage only, for now. With "Auto-switch to a backup model" ON and 2.1 counted as down,
  generation runs on Nano Banana 2, the saved model stays 2.1 and fallback_model is recorded; with the
  toggle OFF there is no fallback and the error is shown. Retirement does not apply yet: 2.1 has no
  retirement entry. If Google retires it later, the TIB-5554 migration + email runs with the successor
  chosen then. My earlier "retired or unavailable" wording was too loose.
  
  - Q7: Yes, the seeder maps 2.1 → Nano Banana 2 (nano_banana_31). Dev will run it on staging for testing.
  
  1. Fallback test: no need to re-test here. The fallback logic is unchanged from TIB-5554 and already
  covered there. Nano Banana 2.1 only needs its backup set up in Admin > Settings
  (`genai_model_fallbacks`: 2.1 → Nano Banana 2).
  QA chưa test cho 2.1: TC-27 / TC-28 / TC-39 ⏭️, TC-29 ⏸️ (cần quyền Admin > Settings).
  ```

### CLAIM-04

- **Statement:** Endpoint effect storefront customer-uploads/{id}/image-filter-effects/async dùng effect config do browser gửi (vd gemini_resolution) thay vì giá trị đã lưu trên layer; dev xác nhận đang tin request từ client vì không kiểm được request thuộc layer nào, và đề nghị bỏ qua lỗi kiểu này nếu không gây chết hệ thống.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Slack, tin chinhdt 2026-10-30 15:15 trả lời QA về bug TC-33 (không có permalink, chép từ ảnh chụp QA lưu; Phần 1 của CCR cũ ghi "không có nguyên văn trong repo" nhưng 5.1 có); QA ghi ở bugs/BUG-01.md và results/result_QA-3442_TC33-dev-accepted_2026-10-30.md; quan sát TC-33 = TC-TIB-7934. Cùng loại QA-3441 BUG-03. Không phải chính sách bảo mật đã duyệt cho mọi endpoint, cũng không có nghĩa không bao giờ là bug. CCR cũ ghi "theo dev cả derive" nhưng nguyên văn Slack không nêu derive; chưa thử derive trong run này, chỉ forge 2K trên layer 1K. Liên quan: KB-045, cùng dạng artwork KB-144. (CCR cũ: CBS-023 CLAIM-12)
- **Trích nguyên văn:**
  ```
  (Nguyên văn Slack, chinhdt, 2026-10-30 15:15:)
  Đúng rồi đấy ạ. Mình đang kiểu tin tưởng request từ client ạ. Vì mình cũng không thể check lại là request đến từ client thuộc layer nào trong artwork nào luôn ạ.
  Chắc bỏ qua lỗi kiểu này nếu nó không gây chết hệ thống thôi ạ.
  
  (Quan sát QA, run 2026-10-30, portal index.BMgdZMSW.js:)
  P-3x2 is saved and synced at `1K`. Request rewritten in the browser to `gemini_resolution:"2K"`
  (+ `model`/`gemini_model:"nano_banana_pro"`) → upload [đã bỏ id]: status `gemini_resolution "2K"`,
  `model nano_banana_21`, master **2528×1696** (2K). Expected 1K ≈ 1264×848. Repro 2: PH-1, upload
  [đã bỏ id], also 2528×1696
  ```

### CLAIM-05

- **Statement:** Trường model và gemini_model giả mạo trong request effect bị bỏ qua, server dùng model của account.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát qua agent, không ai xác nhận, 2026-10-30
- **Locator:** QA-3442 TC-33 = TC-TIB-7934, results/result_QA-3442_independent_2026-10-30.md §Bugs; quan sát 2 lần, TC-33 ⏭️ không phải PASS. Không coi là đảm bảo bảo mật. portal index.BMgdZMSW.js (Last-Modified 2026-10-29 14:32:50 GMT). (CCR cũ: CBS-023 CLAIM-13)
- **Trích nguyên văn:**
  ```
  On a layer saved at 1K, a forged 2K returned 2528×1696, reproduced 2/2 (uploads [đã bỏ id]). …
  The forged `model` is ignored. … It is probably not specific to 2.1.
  ```

### CLAIM-06

- **Statement:** "Default" = sinh ảnh y như trước thay đổi: GPT → 1 trong 1024×1024 / 1536×1024 / 1024×1536 gần tỉ lệ layer nhất; Gemini nano_banana_31 → không gửi size (default của provider); nano_banana_pro → 2K; Flux (2 field trống) → size theo tỉ lệ layer. Layer có sẵn trước deploy mở ra ở Default, Save không thêm key size nào
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront generate); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-02, TC-20, TC-25 bước 1, TC-26 PASS 2026-10-27, staging, build không ghi lại. GPT Default chỉ chạy layer 3:2; 1:1, 2:3 chưa chạy riêng. Khớp artwork KB-114 (Flux theo tỉ lệ layer). Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-03)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 (mô tả Default theo provider)
- **Trích nguyên văn:**
  ```
  TC-02 | ✅ AI — existing layer opens with Default, save adds no size key | artwork <id> `layer-<id>` (Gemini Single Output): Default selected; Save & Close unchanged → layer JSON has no `*_resolution` / `flux_output_*`
  TC-20 | ✅ AI — GPT Default → nearest fixed size | 3:2 MU-G Default (request `gpt_resolution null`, gpt-image-2) → 1536×1024 | 1:1 / 2:3 not run separately (same code path)
  TC-25 | ✅ AI — Flux Default vs picked | Default (flux_size null, flux_pro) → 1216×816 (ratio 1.490); 1200×800 → exactly 1200×800
  TC-26 | ✅ AI — Gemini Default | Pro → 2048×2048; 3.1: request has no size (`gemini_resolution null`) → 1024×1024
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - **GPT, Default**: one of 3 fixed sizes, 1024×1024, 1536×1024 or 1024×1536, whichever is closest to the layer ratio.
  - **Gemini nano_banana_31, Default**: no size is sent and Gemini uses its own default. This is not the same as picking any value.
  - **Gemini nano_banana_pro, Default**: stays at 2K, the same as before.
  - **Flux, Default**: the width/height fields are left empty and the size comes from the layer ratio, as before.
  ```

### CLAIM-07

- **Statement:** GPT với resolution đã chọn: ảnh theo tỉ lệ layer, mỗi cạnh làm tròn XUỐNG bội số 16, cạnh dài ≈ 1024 / 2048; 4K bị giới hạn ~8.29 MP của OpenAI (vuông 2880×2880, 3:2 ≈ 3520×2336, 3840 chỉ khi tỉ lệ ≥ 16:9); tỉ lệ > 3:1 bị kẹp về 3:1
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q3. Bổ trợ TC-21, 22, 27 PASS 2026-10-27. TC-21 thấy 1K 3:2 lệch tỉ lệ 1.6%, vượt ±1% dev "ok": quy tắc làm tròn và dung sai không cùng đúng, giữ cả hai. ±16 px, ±1% là mức test, không phải spec, không assert cho mọi tỉ lệ. Số đo QA không phải giá trị chuẩn trừ khi trùng số dev nêu (CCR cũ: CBS-024 CLAIM-04)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "GPT with a picked resolution: what tolerance on the longest side (1024 / 2048 / 3840 per the API schema) should QA accept?"
  - **Q3:** ok Q3 (±16 px, ratio ±1%). Each side is rounded **down** to a multiple of 16, so the output is never larger than the target. 4K is capped by OpenAI's ~8.29 MP area limit: square → 2880×2880, 3:2 → ~3520×2336. 3840 is reached only at ratios ≥ 16:9. Ratios above 3:1 are clamped to 3:1.
  ```

### CLAIM-08

- **Statement:** Gemini với resolution đã chọn: chỉ gửi tỉ lệ Gemini gần nhất + size, Gemini tự chọn pixel; vuông 512 / 1024 / 2048 / 4096; không vuông → tổng diện tích ≈ 0.25 / 1 / 4 / 16 MP (không phải cạnh dài)
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27
- **Locator:** Jira TIB-5561 comment 55697 mục Q9. Bổ trợ TC-23, 24, 28 PASS 2026-10-27. Non-square chỉ kiểm 3:2 ở 1K, 2K trên Pro; 0.5K, 4K non-square chưa kiểm (CCR cũ: CBS-024 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Gemini with a picked resolution: what output W×H should QA expect for 0.5K / 1K / 2K / 4K on a square and on a non-square (e.g. 3:2) layer?"
  - **Q9:** We send only the nearest Gemini aspect ratio and the size, and Gemini picks the pixels. Square: 512 / 1024 / 2048 / 4096. On non-square layers the longest side is larger. Please check the nearest ratio and a total of ≈ 0.25 / 1 / 4 / 16 MP, not the longest side.
  ```

### CLAIM-09

- **Statement:** Flux với width × height đã điền: ảnh ra đúng width × height
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer; storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-25 bước 2 PASS 2026-10-27, staging, build không ghi lại. Trả lời một phần OQ-sdk-040 (CHK-014) (CCR cũ: CBS-024 CLAIM-06)
- **Căn cứ expected:** Dev summary chinhdt, Jira TIB-5561 comment 2026-10-26 ("Flux: the image is generated at the exact width × height.")
- **Trích nguyên văn:**
  ```
  TC-25 | ✅ AI — Flux Default vs picked | Default (flux_size null, flux_pro) → 1216×816 (ratio 1.490); 1200×800 → exactly 1200×800
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26):
  - Flux: the image is generated at the exact width × height.
  ```

### CLAIM-10

- **Statement:** Thay đổi hành vi cho layer có sẵn: layer Text to Image giữ resolution Gemini chọn khi account ở nano_banana_pro, nay account ở nano_banana_31 → resolution đó được dùng (trước: bị bỏ qua), hiện trong dropdown. PO chưa xác nhận chấp nhận / T2I còn beta-only
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (layer T2I có sẵn); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-27; PO (trangdh) chưa trả lời phần chấp nhận và "T2I beta-only"
- **Locator:** Jira TIB-5561 comment 55697 mục Q6. Bổ trợ TC-28 PASS 2026-10-27. Dev mô tả hành vi; chấp nhận cho release và "Text to Image chỉ cho beta" là câu của PO, chưa có trả lời, không coi là PO sign-off (CCR cũ: CBS-024 CLAIM-16)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Existing Text-to-image layers with a Gemini resolution saved under nano_banana_pro will now use it on nano_banana_31 (before: ignored) — accepted change for live merchants?"
  - **Q6:** Only affects layers that saved a resolution on pro and then switched to 31. The value is visible in the dropdown. **PO to confirm** it is accepted, and that Text-to-image is beta-only.
  Ngữ cảnh (Dev summary, chinhdt, comment 2026-10-26, Known limitation):
  - A Text-to-image layer that still holds a Gemini resolution chosen while the account was on nano_banana_pro will now use that resolution when the account is on nano_banana_31. Before this change it was ignored.
  ```

### CLAIM-11

- **Statement:** Generate chỉ đọc model trong `private_config` của store owner; artwork và layer không lưu model; migration và email chỉ áp cho store owner, staff không nhận.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + staff + buyer (generate dùng model của owner); api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q12 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 (CCR cũ: CBS-028 CLAIM-03)
- **Trích nguyên văn:**
  ```
  Q12: Generation reads only the store owner's `private_config` model; artworks and layers do not store a model. The migration and the email go to the store owner only; staff accounts do not receive it.
  ```

### CLAIM-12

- **Statement:** Account còn ở model retired sau ngày shutdown (chỉ xảy ra khi bị ép, vd sửa DB, vì portal từ chối lưu): buyer thấy lỗi generate; không có cảnh báo / CTA cho seller, không tự fallback.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner; storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q8 (A: Error + seller warning/CTA · B: Plain failure (as dev limitation) · C: Auto-fallback) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Hành vi HIỆN TẠI dev chấp nhận, KHÔNG phải mong muốn (Phần 4.2); QA từng muốn cảnh báo seller (QA-3403 RQ3). TC-36, TC-47 (sau shutdown) chưa chạy, QA chưa thấy buyer, seller thấy gì (CCR cũ: CBS-028 CLAIM-14)
- **Trích nguyên văn:**
  ```
  Câu hỏi QA, các lựa chọn: A: Error + seller warning/CTA · B: Plain failure (as dev limitation) · C: Auto-fallback
  
  Q8: B. The daily migration moves every account on a retired model, including accounts with no model selected, to its nearest live successor before the shutdown date. An account can only end up on a retired model afterwards if someone forces it back (e.g. a direct DB edit), since the portal save refuses it with 422. In that case the buyer sees the generation error.
  ```

### CLAIM-13

- **Statement:** Sau migration sang `gpt-image-1.5`: Quality có low / medium / high (giá trị medium cũ vẫn hợp lệ); generate text-to-image nền trong suốt chạy được bằng `gpt-image-1.5`, không có `fallback_model`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + buyer; portal · storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-16 trong `result_QA-3408_B3-B4-after-migrate_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. (CCR cũ: CBS-028 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-16 | ✅ AI — model-dependent options valid on the successor | Quality options of `gpt-image-1.5`: low / medium* / high (medium valid). Portal Live preview, artwork [id] GPT text-to-image (transparent background) → `customer-uploads/[id]/image-filter-effects/status`: `model gpt-image-1.5`, `background transparent`, status 1 → 2, no `fallback_model`; field "✓ Image generated"
  ```

### CLAIM-14

- **Statement:** Toggle ON + model bị coi là down + có backup: generate chạy bằng backup cùng provider, effect của upload ghi `fallback_model` = backup thật sự dùng, model đã lưu không đổi. Thấy với GPT `gpt-image-1.5` → `gpt-image-2`, Gemini `nano_banana_31` → `nano_banana_pro`, Flux `flux_pro` → `flux_flex`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) + store owner (toggle); storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, QA tick tay
- **Locator:** QA-3408 — TC-25 (tick tay của QA) trong `result_QA-3408_QA-web_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày QA tick ✅). Build: không ghi; dev stub lỗi provider trên staging. | Dev stub lỗi provider cho GPT, Gemini, Flux và hạ ngưỡng trên staging, không phải sự cố thật. Quote chỉ ghi model và fallback_model; 'model đã lưu không đổi' nằm ở expected của TC-25 (CCR cũ: CBS-028 CLAIM-21)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-25 | ✅ QA — QA checked 2026-10-16 (dev stubbed errors for GPT, Gemini, Flux; toggle ON): customer_upload effect has model gpt-image-1.5 + fallback_model gpt-image-2. Same check also OK for Gemini nano_banana_31→nano_banana_pro and Flux flux_pro→flux_flex
  Expected của TC-25 (QA-3408 `03-testcases.md`): "Generation succeeds with `gpt-image-2`; effect has `fallback_model = gpt-image-2`; `gpt_model` still `gpt-image-1.5`; no email"
  ```

### CLAIM-15

- **Statement:** Trạng thái "down" dùng một bộ đếm chung cho mọi account trên cùng provider + model; lỗi `model_not_found` (GPT trả khi key không có quyền dùng model) không bao giờ được đếm.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account trên cùng model; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15
- **Locator:** Jira TIB-5554, comment 54687, mục Q7 | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54687 | Ngày, build: 2026-10-15 | Số ngưỡng ở claim liên quan là giá trị cấu hình lúc ship (CCR cũ: CBS-028 CLAIM-22)
- **Trích nguyên văn:**
  ```
  Q7: Dev will simulate the provider errors on staging and add a backup mapping for QA's own user only (per-user override in `genai_model_fallbacks`). The failure counter is still shared by all accounts on that model. `model_not_found` is never counted: GPT returns it when the key has no access to the model, which a backup on the same key would not fix.
  ```

### CLAIM-16

- **Statement:** Model bị coi là down khi trong cửa sổ 5 phút có ≥ 50 lần gọi lỗi và chiếm ≥ 50% số lần gọi model đó (đếm cả account bật lẫn tắt toggle); chỉ timeout / không phản hồi, 408, 5xx được đếm; 4xx (400, 401, 404, 429) không bao giờ; ngưỡng là biến env `GENAI_FALLBACK_*`.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account trên cùng model; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "When a model counts as down" + thresholds) | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-27, 28, 46 chưa chạy. 5 phút, 50 lỗi, 50% là giá trị cấu hình lúc ship (env), không phải hằng số sản phẩm (Phần 4.2) (CCR cũ: CBS-028 CLAIM-23)
- **Trích nguyên văn:**
  ```
  - **When a model counts as down:** one shared counter per provider + model, over all accounts' calls (toggle on or off). Inside a 5-minute window, at least 50 failed calls that are also at least 50% of the calls to that model. Only provider-side errors count: timeout / no response, 408 and 5xx. 4xx such as 400, 401, 404 and 429 (key, access, quota, rate limit) never count.
  - The thresholds are env settings (`GENAI_FALLBACK_WINDOW_SECONDS`, `_MIN_FAILURES`, `_FAILURE_RATE`, `_RETRY_AFTER_SECONDS`, `_INLINE_RETRY_MAX_SECONDS`).
  ```

### CLAIM-17

- **Statement:** Lần gọi làm model chuyển sang down được thử lại 1 lần trên backup trong cùng job nếu lỗi trong 60 s; 30 phút sau khi down, 1 request thử lại model gốc (thành công → mọi account opt-in quay về; lỗi → giữ backup thêm 30 phút); backup cũng lỗi → lỗi của backup, không có backup thứ hai; toggle OFF hoặc model không có backup → lỗi provider như cũ (vẫn được đếm).
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer + store owner opt-in; api · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "While a model is down", "Recovery", "Toggle off, or no backup", "Backup also fails") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-26, 29, 30, 31, 45 chưa chạy. 60 s, 30 phút là giá trị cấu hình lúc ship, không phải hằng số sản phẩm (Phần 4.2) (CCR cũ: CBS-028 CLAIM-24)
- **Trích nguyên văn:**
  ```
  - The call that tipped the model into "down" is retried once on the backup in the same job, if it failed within 60s.
  - **Recovery:** 30 minutes after the model went down, one request tries the original model again. Success switches every opted-in account back; another outage error keeps the backup for another 30 minutes.
  - **Toggle off, or no backup for that model:** behaves as before. The call fails with the provider error; it still counts towards the shared counter.
  - **Backup also fails:** the call fails with the backup's error. There is no second backup.
  ```

### CLAIM-18

- **Statement:** Backup nằm ở Admin > Settings `genai_model_fallbacks` (seeder `GenAiModelFallbacksSeeder`): `default` theo từng model + override theo user (`users: { <user id>: <model> }`) thắng `default`; danh sách default gồm cả `gpt-image-2` → `gpt-image-1.5`, `gpt-image-2.5-flare` ↔ `gpt-image-2.5-sunburst`, `nano_banana_pro` → `nano_banana_31`, `flux_max` → `flux_pro`, `flux_flex` → `flux_pro`; backup đã bị khai tử thì dùng successor của nó; failover áp cho image filter, text-to-image, multi-image generate.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** admin (cấu hình) + store owner opt-in; api · db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, đoạn mở đầu + "A retired backup") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) | TC-32 bước override theo user ⏸️ chưa test, TC-33, TC-35 chưa chạy. Danh sách cặp backup là giá trị cấu hình lúc ship (Phần 4.2) (CCR cũ: CBS-028 CLAIM-25)
- **Trích nguyên văn:**
  ```
  When a GenAI image model keeps failing for everyone (provider outage), accounts that opted in run their GenAI calls on a backup model of the same provider until the model recovers. Applies to image filter, text-to-image and multi-image generate.
  
  Each environment needs `php artisan db:seed --class=GenAiModelFallbacksSeeder` once after deploy. Backups are kept in Admin > Settings > `genai_model_fallbacks`: a `default` backup per model, plus optional per-user overrides (`users: { <user id>: <model> }`). Current defaults:
  
  - GPT: `gpt-image-1.5` ↔ `gpt-image-2`, `gpt-image-2.5-flare` ↔ `gpt-image-2.5-sunburst`
  - Gemini: `nano_banana_31` ↔ `nano_banana_pro`
  - Flux Kontext: `flux_pro` → `flux_flex`, `flux_max` → `flux_pro`, `flux_flex` → `flux_pro`
  
  - **A retired backup** follows its retirement successor (Part 1), so a stale mapping never points at a dead model.
  ```

### CLAIM-19

- **Statement:** Quay về model gốc có thể trễ tới 30 phút sau khi provider hồi phục; bộ đếm dùng chung nên một account gửi nhiều lần gọi lỗi có thể chuyển model sang backup cho mọi account opt-in; lần gọi treo không có client timeout chỉ được đếm sau khi TIB-5389 merge; deadline polling của Flux không tính là sập.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** mọi account opt-in; api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-15, không ai xác nhận
- **Locator:** Jira TIB-5554, comment 54520 (dev notes Part 2, mục "Known limitation") | Link: https://ownego.atlassian.net/browse/TIB-5554?focusedCommentId=54520 | Ngày, build: 2026-10-15 (ngày dev thêm phần Part 2 vào comment tạo 2026-10-14) (CCR cũ: CBS-028 CLAIM-26)
- **Trích nguyên văn:**
  ```
  - Switching back can lag up to 30 minutes after the provider recovers.
  - The counter is shared, so one account sending many failing calls can switch the model to its backup for all opted-in accounts.
  - A provider call that hangs without a client timeout is only counted once TIB-5389 (read timeouts) is merged. Flux's own polling deadline is not counted as an outage.
  ```

### CLAIM-20

- **Statement:** Storefront không đổi: effect vẫn chạy trên ảnh buyer upload, thiếu key vẫn lặng lẽ bỏ qua effect đó; buyer mua với layer có ảnh đã xử lý (đã Save) thì order design dùng ảnh đã xử lý
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Possible test cases và Notes. Không có kết quả chạy có ngày (TC-43, 44 chỉ có status passed trên Testlane) (CCR cũ: CBS-029 CLAIM-19)
- **Trích nguyên văn:**
  ```
  Storefront: buy with the processed layer image → order design uses the processed image.
  Storefront buyer upload with effects is unchanged (effects still run; a missing key still skips that effect silently).
  - **Release order:** API first, then portal. No SDK release is needed.
  ```

### CLAIM-21

- **Statement:** Storefront không bao giờ chạy effect lên ảnh mặc định của layer; populate target (TIB-5302) chỉ chạy effect của nó lên ảnh buyer upload vào layer nguồn, tới lúc đó hiển thị nguyên ảnh mặc định đã xử lý
- **Object / feature:** sdk/genai-personalization-runtime (liên quan: artwork)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q13, câu hỏi trong comment 54545. Trả lời một phần OQ-artwork-093 (artwork KB-120, populate-values). Không có kết quả chạy có ngày (TC-45 chỉ có status passed trên Testlane) (CCR cũ: CBS-029 CLAIM-20)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "For a Photo layer that is a populate target (TIB-5302), after the merchant saves a processed default image, does the storefront run the effects again on that already-processed image?"
  - **Q13:** No. The storefront never runs effects on a layer's default image. A populate target runs its effects only on the photo the buyer uploads to the source layer. Until then, it shows the processed default image as is.
  ```

# Khối B — Môi trường

| Claim ID | Feature | `type` | Staging | Production | Cách test trên staging | Người, ngày |
|---|---|---|---|---|---|---|
| `CLAIM-22` | sdk/genai-personalization-runtime | `ALTERNATIVE_SETUP` | Muốn test outage của Nano Banana 2.1 thì Dev chuyển 2.1 sang "down" theo yêu cầu rồi chuyển lại; không cần override per-user hay retirement entry. | không rõ | Nhờ Dev chuyển 2.1 sang down trên staging, chạy generate, rồi nhờ Dev chuyển lại. Chưa từng làm: Dev sau đó nói không cần test lại fallback cho 2.1. Nguyên văn (Jira TIB-5573, trả lời Q5): "- Q5: Same as TIB-5554: Dev switches 2.1 to "down" on staging on request and switches it back after. No per-user override or retirement entry is needed." | Dev (chinhdt), 2026-10-30 |
