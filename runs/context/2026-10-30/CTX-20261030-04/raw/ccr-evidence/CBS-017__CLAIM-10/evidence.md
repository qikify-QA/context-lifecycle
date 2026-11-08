# CBS-017__CLAIM-10

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-10` | TIB-5580 — Global template: stroke_layers là field local của paragraph (override theo product được giữ); spiral / shape text vẫn 1 stroke | portal (global template) · api | `KHÔNG CÓ NGUỒN` — TC-TIB-6328 Blocked: fixture #5186 dựng qua API không render trong Artwork Editor; chỉ có mô tả dev comment 54782 | artwork/text-multi-stroke · artwork/artwork-template-management (chưa rõ, cần agent tự đánh giá); OQ-artwork-117 | `ADD` |

## Phần 1b

| `CLAIM-10` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | không có (S0, chưa nạp) |

## Phần 5.1

### CLAIM-10

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6328 (Testlane task TIB-220); comment dev chauptm id 54782 trên TIB-5580 (mục teeinblue-api và mục Possible test cases)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-16`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `dev chauptm (comment kỹ thuật, không phải dev_doc); test agent [AI] không chạy được — không ai xác nhận`
- **Trích nguyên văn:**
  ```
  Comment dev 54782 (2026-10-16): "`GlobalTemplateMerger` keeps `stroke_layers` as a local field for paragraph; spiral / shape text still don't get it." · teeinblue-sdk: "`stroke_layers` is a paragraph global-template local field." · Possible test cases: "Global template: per-product paragraph stroke stack override is kept; spiral / shape text still only have the single stroke."
  TC-TIB-6328 (actualResult 2026-10-21): Blocked — Fixture #5186 (artwork dùng global template, dựng qua API) không mở được trong Artwork Editor nên không thực hiện được các bước. Mở #5186 từ URL ?id=5186 và từ nút Edit trên card: modal editor chỉ hiện lớp overlay xám, không có panel layer / popover (đợi tới 15s); không có lỗi console (chỉ 404 gravatar) và không có request lỗi (mọi graphql 200, validate-default-value 204). Chưa xác định nguyên nhân (fixture API chưa từng mở bằng editor hay lỗi editor với global template) nên không kết luận Fail.
  ```
- **File đính kèm cho claim này:** `không có`
