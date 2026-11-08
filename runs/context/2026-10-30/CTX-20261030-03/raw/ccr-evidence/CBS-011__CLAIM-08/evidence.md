# CBS-011__CLAIM-08

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-08` | TIB-5558 — Hide + "Hide this layer on first load" bật, buyer chưa chọn gì: layer ẩn trên artwork, option vẫn hiện trên form; OR: còn ẩn tới khi mọi nguồn đang hiện trả lời không khớp; AND: hiện ngay khi một nguồn trả lời không khớp | storefront (first load + form) | `test_case` — PASS TC-TIB-7331, TC-TIB-7332, TC-TIB-7333 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / layer-condition-value-binding (show_by_default giờ mang nghĩa "hide on first load" khi action = hide) | `ADD` |

## Phần 1b

| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7331, TC-TIB-7332, TC-TIB-7333 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl · https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl-or · https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl-and`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7331: "CP-HIDE-FL, first load chưa chọn gì: layer "QUOTE DOG" (layer-620016) không vẽ trên
  artwork, còn field "QUOTE DOG" vẫn hiện trên form (form có Pet 1 Type + QUOTE DOG) — ngược chiều
  Show như mong đợi."
  TC-TIB-7332: "CP-HIDE-FL-OR: first load → layer (layer-620020) ẩn; Pet 1 = Dog, Pet 2 chưa trả lời →
  vẫn ẩn; Pet 2 = Dog (mọi nguồn đều không khớp) → layer hiện."
  TC-TIB-7333: "CP-HIDE-FL-AND: first load → layer (layer-620024) ẩn; Pet 1 = Dog (không khớp), Pet 2
  chưa trả lời → layer hiện ngay."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 3 case trên Testlane`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7331 — actualResult: CP-HIDE-FL, first load chưa chọn gì: layer "QUOTE DOG" (layer-620016) không vẽ trên artwork, còn field "QUOTE DOG" vẫn hiện trên form (form có Pet 1 Type + QUOTE DOG) — ngược chiều Show như mong đợi. Phần editor (toggle "Hide this layer on first load" bật) đã đạt từ lượt trước. Link: CP-HIDE-FL, Artwork #5890.
TC-TIB-7332 — actualResult: CP-HIDE-FL-OR: first load → layer (layer-620020) ẩn; Pet 1 = Dog, Pet 2 chưa trả lời → vẫn ẩn; Pet 2 = Dog (mọi nguồn đều không khớp) → layer hiện. Field "QUOTE DOG" hiện xuyên suốt trên form theo C7. Link: CP-HIDE-FL-OR.
TC-TIB-7333 — actualResult: CP-HIDE-FL-AND: first load → layer (layer-620024) ẩn; Pet 1 = Dog (không khớp), Pet 2 chưa trả lời → layer hiện ngay. Field "QUOTE DOG" hiện xuyên suốt trên form. Link: CP-HIDE-FL-AND.
