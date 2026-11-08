# Context Change Request: artwork-populate-values — gộp từ 2 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5577, TIB-5504, QA-3441`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-021: MEDIUM — Ảnh hưởng coverage; canon chưa có checklist nào về dùng chung call nên không có checklist đang publish chạy sai (QA phuongbb, 2026-11-01).
- CBS-022: MEDIUM — Ảnh hưởng coverage của luồng populate {{output}}; không checklist đang publish nào chạy sai vì CHK-022 nói về {{input}} và CHK-023 chưa có expected (QA phuongbb xác nhận 2026-11-01).

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Hai populated option dùng chung 1 lần gọi effect (1 lượt, cả hai nhận kết quả) khi cùng ảnh và cùng toàn bộ thiết lập effect: effect type, prompt đã điền biến, template, remove background; riêng kích thước layer theo các claim về kích thước.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api (customer-uploads/{id}/derive)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-27
- **Locator:** Jira TIB-5577 comment giangnth "Dev answers for QA-3434", câu "ok Q2" (QA ghi id 55689). Bổ trợ: QA-3434 TC-15 ✅ 2026-10-28 staging (khác prompt hoặc thêm remove background thì gọi riêng); TC-13 ⏸️ phần "trừ 1 lượt" không đo được với gray_scale. Vế kích thước layer trong quote đã được dev sửa 2026-10-29, xem claim KHÔNG CÓ NGUỒN cùng ticket. (CCR cũ: CBS-021 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, 2026-10-26): "Q2. "Same effect on the same photo shares one call": does "same effect" mean
  the same effect type only, or the same type **and** the same settings (prompt / ImagenHub template / colour / size)?"
  
  Trả lời (giangnth, 2026-10-27): "ok Q2. Two options share one call only when the whole effect setup is the same:
  effect type, prompt with its variables filled in, template, remove background, and the layer size for Direct
  upload / Cropper layers. Two layers with different sizes get separate calls and separate charges."
  ```

### CLAIM-02

- **Statement:** Effect Gen AI trên layer Direct upload hoặc Cropper: hai layer khác kích thước thì gọi riêng, mỗi call trừ 1 lượt.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-27
- **Locator:** Jira TIB-5577 comment giangnth (QA ghi id 55689). Quote nói chung cho layer Direct upload / Cropper, không giới hạn Gen AI; giới hạn Gen AI đến từ lời sửa 2026-10-29 không có link. Bổ trợ: QA-3434 TC-14 ✅ 2026-10-29 staging, SDK app-v1.js Last-Modified 2026-10-29 01:58:10 GMT, chỉ Gemini trên Direct upload, chưa có Cropper; chưa chạy lại trên build 2026-10-29 08:21:05 GMT. Tên field size trong body derive không phải hợp đồng API. (CCR cũ: CBS-021 CLAIM-02)
- **Trích nguyên văn:**
  ```
  Câu hỏi (QA phuongbb, 2026-10-26): "Q2. "Same effect on the same photo shares one call": does "same effect" mean
  the same effect type only, or the same type **and** the same settings (prompt / ImagenHub template / colour / size)?"
  
  "...and the layer size for Direct upload / Cropper layers. Two layers with different sizes get separate calls and
  separate charges."
  ```

### CLAIM-03

- **Statement:** Effect có bật dùng kích thước layer: hai layer khác kích thước thì gọi riêng, mỗi call trừ 1 lượt.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), seller bật công tắc ở portal; storefront, api, portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth, QA phuongbb chuyển lời), 2026-10-29
- **Locator:** Lời dev sửa câu Q2, QA phuongbb dán lại khi làm QA-3434; kênh gốc không rõ, không có trên Jira TIB-5577, không có link. Chỉ là "đã nghe dev nói", không dùng làm expected. Tên công tắc trên portal chưa biết; không có test case. (CCR cũ: CBS-021 CLAIM-03)
- **Trích nguyên văn:**
  ```
  "TC-14 / điểm cần quyết về gray_scale: gray_scale đang chạy đúng. Câu trả lời Q2 trước đó của dev viết chưa đủ, nên
  sửa lại như sau.
  
  Hai layer dùng chung 1 lần gọi khi cùng ảnh và cùng thiết lập effect. Kích thước layer chỉ được tính vào thiết lập
  trong các trường hợp sau:
  
  - Effect Gen AI (Gemini, GPT, Flux, ImagenHub…) trên layer Direct upload hoặc Cropper, hoặc effect có bật dùng kích
    thước layer: khác kích thước thì gọi riêng, mỗi lần trừ 1 lượt. Đây là trường hợp s3 / s4 trong lần chạy Gemini
    ngày 29/10.
  - Effect Gen AI trên layer Photo Reposition không bật dùng kích thước layer: khác kích thước vẫn gọi chung.
  - Contour cut: khác chiều rộng thì gọi riêng. Cùng chiều rộng mà khác chiều cao thì gọi chung.
  - Các effect còn lại (gray_scale, remove background, watercolor, sketch…): ảnh kết quả không phụ thuộc kích thước,
    nên luôn gọi chung. Vì vậy s1, s2, s3 trong lần chạy gray_scale ngày 27/10 chỉ gọi 1 lần là đúng."
  
  Phần nói về claim này: "hoặc effect có bật dùng kích thước layer: khác kích thước thì gọi riêng, mỗi lần trừ 1 lượt".
  ```

### CLAIM-04

- **Statement:** Effect Gen AI trên layer Photo Reposition không bật dùng kích thước layer: hai layer khác kích thước vẫn gọi chung 1 call.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth, QA phuongbb chuyển lời), 2026-10-29
- **Locator:** Lời dev sửa câu Q2, QA phuongbb dán lại khi làm QA-3434; kênh gốc không rõ, không có trên Jira TIB-5577, không có link. Chỉ là "đã nghe dev nói", không dùng làm expected. Không có test case. (CCR cũ: CBS-021 CLAIM-04)
- **Trích nguyên văn:**
  ```
  "- Effect Gen AI trên layer Photo Reposition không bật dùng kích thước layer: khác kích thước vẫn gọi chung."
  ```

### CLAIM-05

- **Statement:** Contour cut: khác chiều rộng thì gọi riêng, cùng chiều rộng khác chiều cao thì gọi chung.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth, QA phuongbb chuyển lời), 2026-10-29
- **Locator:** Lời dev sửa câu Q2, QA phuongbb dán lại khi làm QA-3434; kênh gốc không rõ, không có trên Jira TIB-5577, không có link. Chỉ là "đã nghe dev nói", không dùng làm expected. Không có test case. Có thể chạm layer-print-effects (KB-391 về photo_border contour cut, không bị thay). (CCR cũ: CBS-021 CLAIM-05)
- **Trích nguyên văn:**
  ```
  "- Contour cut: khác chiều rộng thì gọi riêng. Cùng chiều rộng mà khác chiều cao thì gọi chung."
  ```

### CLAIM-06

- **Statement:** gray_scale trên các layer khác kích thước (400×400 và 400×300) dùng chung 1 call, body derive không có size.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, chạy bằng AI trên Chrome của QA), 2026-10-27
- **Locator:** QA-3434 TC-64 (Testlane task TIB-246), ✅ chạy 2026-10-27 22:46 +07 staging; results/result_QA-3434_TC14-TC64_2026-10-29.md, lần chạy gốc results/result_QA-3434_GenAI_2026-10-27.md. Build SDK của PR TIB-5300/5577/5578, Last-Modified/ETag không ghi lại; chưa chạy lại trên build 2026-10-29 08:21:05 GMT. Phần "không phải bug" chỉ có lời dev 2026-10-29 không link. Số 400×400, 400×300 là dữ liệu fixture; tên field không phải hợp đồng API. (CCR cũ: CBS-021 CLAIM-06)
- **Căn cứ expected:** KHÔNG CÓ (căn cứ duy nhất là lời dev 2026-10-29 do QA chuyển lại, không có link; câu Jira Q2 đọc rộng còn ngược với expected này)
- **Trích nguyên văn:**
  ```
  Expected TC-64: "Exactly one gray `derive` (body has no `size`) serves s1, s2 and s3; all three show the same
  result image URL" (pre: SHARE s1, s2 Direct 400×400, s3 Direct 400×300, all gray-scale).
  
  Kết quả: "✅ AI — gray_scale on 400×400 and 400×300 layers → one shared call (run 2026-10-27, dev confirmed
  2026-10-29 as intended) | 2026-10-27 SHARE PX-1: one gray `derive` (body `effects=[{"type":"teeinblue:gray_scale"}]`,
  no `size`); s1, s2 (400×400) and s3 (400×300) all `…SBvuj8RrFvYcU4Aa_large.png`"
  
  Cùng lần chạy 2026-10-27: "The `teeinblue:gray_scale` derive body is `effects=[{"type":"teeinblue:gray_scale"}]&field_id=…`
  with no size. P6 (t1–t6, 300…350 px) sends **one** `derive` for PX-1 and all six targets get the same
  `…yrVVPqocZ35JWOyS_large.png`."
  ```

### CLAIM-07

- **Statement:** Các effect không phụ thuộc kích thước khác (remove background, watercolor, sketch…) luôn gọi chung dù layer khác kích thước.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront); storefront, api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth, QA phuongbb chuyển lời), 2026-10-29
- **Locator:** Lời dev sửa câu Q2, QA phuongbb dán lại khi làm QA-3434; kênh gốc không rõ, không có trên Jira TIB-5577, không có link. Chỉ là "đã nghe dev nói", không dùng làm expected. Không có test case cho các effect này đứng riêng; danh sách effect chỉ là ví dụ, không đầy đủ. (CCR cũ: CBS-021 CLAIM-07)
- **Trích nguyên văn:**
  ```
  "- Các effect còn lại (gray_scale, remove background, watercolor, sketch…): ảnh kết quả không phụ thuộc kích thước,
    nên luôn gọi chung."
  ```

### CLAIM-08

- **Statement:** Option chained {{output}} có effect riêng bắt đầu từ ảnh đã xử lý xong của nguồn và chỉ chạy effect riêng, còn effect của nguồn chạy 1 lần cho mỗi ảnh dù có bao nhiêu option chained dùng nó.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront và api (derive)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Tài liệu "Change & test cases — reuse source effects and carry crop/reposition to chained populate options" (v1, "Generated from the branch diff (sdk + api)"), Jira TIB-5504 comment 56020, mục "Chained {{output}} option reuses the source's processed photo". Bổ trợ: QA-3441 TC-01, 02, 03, 08 ✅ AI 2026-10-29 staging. Trả lời một phần OQ-artwork-093 và CHK-023 (populate-values), chỉ cho trường hợp {{output}}. (CCR cũ: CBS-022 CLAIM-01)
- **Trích nguyên văn:**
  ```
  - Now:
    - The chained option starts from the source's finished photo and runs only its own effects.
    - The source's effects run once per photo, however many chained options use it.
    - The chained option shows exactly the source's look (same Gen AI result), plus its own effects.
  ```

### CLAIM-09

- **Statement:** Hai option chained {{output}} cùng một nguồn chỉ dùng chung 1 call effect riêng khi setup y hệt (cùng effect, cùng layer type và kích thước, cùng effect nguồn), khác bất kỳ điểm nào thì mỗi option 1 call.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront và api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q7 (trả lời Q7 trong comment 56055 của QA). Bổ trợ: QA-3441 TC-05, TC-06 ✅ AI 2026-10-29 staging. (CCR cũ: CBS-022 CLAIM-02)
- **Trích nguyên văn:**
  ```
  - **Q7:** Q7 A. One shared call when both options have exactly the same setup (same effects, same layer type and size, same source effects). Any difference → one call each.
  ```

### CLAIM-10

- **Statement:** Theo dev, option Photo Reposition {{output}} có effect riêng đi theo vị trí nguồn khi tỷ lệ rộng/cao của kết quả lệch không quá 0.05 so với ảnh nguồn, ngoài khoảng đó giữ vị trí mặc định.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q5. Liên quan layer-config-image (Photo Reposition). QA chạy staging 2026-10-29 thấy lệch: TC-28 ❌ AI, khung option 400×400 khác khung nguồn 400×300 thì không đi theo kể cả lệch 0.04/0.05; TC-26 ✅ chỉ khi khung cùng tỷ lệ; TC-27 ⏸️; mốc 1.049/1.051 chưa chạy. Bug draft BUG-02 chưa file, dev chưa trả lời. Không dùng làm expected tới khi phân xử xong TC-28, giữ cả hai phía. Khoảng 1.28–1.38 chỉ là ví dụ. (CCR cũ: CBS-022 CLAIM-03)
- **Trích nguyên văn:**
  ```
  - **Q5:** Not exact. The option follows when its result's width/height ratio is within 0.05 of the source photo's (e.g. a 4:3 photo = 1.33 follows for 1.28–1.38). B&W / gray scale follow; a Gen AI 1:1 result on a 4:3 photo keeps the default position.
  ```

### CLAIM-11

- **Statement:** Layer ảnh No personalization được populate {{output}} từ nguồn Photo Cropper nhận ảnh đã crop.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q9 (phần Crop). Bổ trợ: QA-3441 TC-38 ✅ AI 2026-10-29 staging. (CCR cũ: CBS-022 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - **Q9:** Crop: yes by code (the layer gets the source's own current photo), not tested on UI — no staging camp has this setup.
  ```

### CLAIM-12

- **Statement:** Layer ảnh No personalization được populate {{output}} từ nguồn Photo Reposition có dữ liệu vị trí đi theo nguồn, kể cả khi nguồn di chuyển sau đó, và order render dùng vị trí này, còn preview storefront không vẽ vị trí đó mà vẫn fit ảnh vào khung layer.
- **Object / feature:** artwork/populate-values (liên quan: order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront) và order design render, storefront và api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56059, dòng Q9 (phần Position). Bổ trợ: QA-3441 TC-38 ✅ AI 2026-10-29 staging, đơn test. Lệch preview và bản in là đã biết, không do TIB-5504. (CCR cũ: CBS-022 CLAIM-05)
- **Trích nguyên văn:**
  ```
  Position: the layer's data follows the source position (also on later moves, since TIB-5504) and the order render uses it, but the storefront preview does not draw it — it keeps the photo fit to the layer box. This is the known preview vs print mismatch, not changed by TIB-5504; out of scope here.
  ```

### CLAIM-13

- **Statement:** TIB-5504 chỉ hỗ trợ chain 1 cấp; chain 2 cấp cấu hình được trên portal nhưng không được hỗ trợ, không test và nằm ngoài phạm vi.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** owner/staff (cấu hình portal) và buyer, portal và storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ2 (trả lời RQ2 trong comment 56063 của QA). TC-56 ⏭️: chain 2 cấp vẫn chạy trên staging nhưng không có nghĩa là được hỗ trợ, không viết expected cho chain nhiều cấp. (CCR cũ: CBS-022 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - **RQ2:** Not designed for it. A 2-level chain can be set up (the portal allows it), but only 1 level is supported and tested. Please test 1 level only; deeper chains are out of scope for TIB-5504.
  ```

### CLAIM-14

- **Statement:** Effect riêng của nguồn lỗi thì nguồn hiện lỗi của chính nó, option {{output}} để trống, không bắt đầu và không có lỗi riêng.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3 (câu 1). Bổ trợ: QA-3441 TC-57 ✅ AI 2026-10-29 staging, lỗi giả lập trong trang (ép HTTP 500 hoặc status 3), không phải lỗi thật từ provider. (CCR cũ: CBS-022 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - **RQ3:** B (not A). If the source's own effect fails, the source shows its own error and the {{output}} option stays empty — it never starts, so no extra error on it.
  ```

### CLAIM-15

- **Statement:** Nguồn đang thay ảnh cũ bằng ảnh mới mà lỗi thì option {{output}} giữ kết quả của ảnh cũ.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3 (câu 2). Bổ trợ: QA-3441 TC-62 ✅ AI 2026-10-29 staging, lỗi giả lập trong trang. (CCR cũ: CBS-022 CLAIM-08)
- **Trích nguyên văn:**
  ```
  If the source is replacing an older photo and fails, the option keeps the result of the older photo.
  ```

### CLAIM-16

- **Statement:** Effect riêng của option chained lỗi thì lỗi và nút Try again hiện trên option nguồn, Add to Cart vẫn bị chặn.
- **Object / feature:** artwork/populate-values (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3 (câu 3). Bổ trợ: QA-3441 TC-46, TC-58 ✅ AI 2026-10-29 staging, lỗi giả lập trong trang. Phần Add to Cart bị chặn khi lỗi chưa được test riêng. (CCR cũ: CBS-022 CLAIM-09)
- **Trích nguyên văn:**
  ```
  If the option's own effect fails, the error + Try again show on the source option, and Add to Cart stays blocked.
  ```

### CLAIM-17

- **Statement:** Reload trang khi option chained đang processing thì không resume, option chạy lại từ đầu bằng call mới và không dùng kết quả job cũ.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ4. Bổ trợ: QA-3441 TC-61 ✅ AI 2026-10-29 staging. (CCR cũ: CBS-022 CLAIM-10)
- **Trích nguyên văn:**
  ```
  - **RQ4:** B. Nothing is resumed: after a reload, the option runs again from the start (a new call; the old job's result is not used).
  ```

### CLAIM-18

- **Statement:** Effect của nguồn được gửi trong một field riêng cạnh effect riêng của option, server chỉ dùng chúng khi nguồn chưa có kết quả full-size, còn lại bắt đầu từ kết quả của nguồn.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront client gọi server), api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ11. Bổ trợ: QA-3441 TC-01, 14, 17 ✅ AI 2026-10-29 staging; TC-15 ⏸️, TC-16 chưa chạy. Tên source_effects, source_base=output và đường dẫn derive là thứ QA đọc trong network, dev không nêu tên, chỉ là quan sát, không phải hợp đồng API. (CCR cũ: CBS-022 CLAIM-11)
- **Trích nguyên văn:**
  ```
  - **RQ11:** A, in a separate field. The source's effects are sent next to the option's own effects, and the server uses them only when the source has no full-size result yet; otherwise it starts from the source's result.
  ```

### CLAIM-19

- **Statement:** Known issue không do TIB-5504: với nguồn Photo Cropper, khi buyer thay ảnh thì option {{output}} bắt đầu ngay từ ảnh mới mà không chờ crop và effect của nguồn, nên effect nguồn chạy 2 lần và nếu lỗi thì option hiện ảnh mới trong khi nguồn vẫn hiện ảnh cũ.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3, đoạn "Known issue". Thấy 1 lần trong QA-3441 TC-24 (2026-10-29), không file bug. Dev không nêu key ticket riêng. Là known issue, không phải hành vi đúng, không dùng làm expected. (CCR cũ: CBS-022 CLAIM-12)
- **Trích nguyên văn:**
  ```
  **Known issue** (Photo Cropper source only, not caused by TIB-5504, separate ticket): when the buyer replaces the photo, the {{output}} option starts right away from the new photo, without waiting for the crop and the source's effect. So the source's effect runs twice, and if it fails, the option shows the new photo while the source still shows the old one.
  ```
