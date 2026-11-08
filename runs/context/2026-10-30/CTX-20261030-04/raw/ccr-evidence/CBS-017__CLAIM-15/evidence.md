# CBS-017__CLAIM-15

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-15` | TIB-5580 — Shadow paragraph áp 1 lần cho cả khối ở vectorize (dev comment) và API PNG (R14); preview / PNG / SVG không được lệch shadow (R10) | storefront (SDK) · api (PNG) · vectorize (SVG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6313 và TC-TIB-6335 Blocked (SDK staging chưa có code, không tải được SVG); editor ↔ PNG khớp chỉ là một phần case | artwork/text-multi-stroke · artwork/layer-print-effects (shadow paragraph TIB-5472, chưa rõ, cần agent tự đánh giá); OQ-artwork-118. Có thể làm SAI mô tả shadow per-line của TIB-5472 | `ADD` |

## Phần 1b

| `CLAIM-15` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | storefront · api | không có (S0, chưa nạp) |

## Phần 5.1

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6313, TC-TIB-6335 (Testlane task TIB-220); comment dev chauptm id 54782 (mục teeinblue-vectorize); RA analysis_TIB-5580.md R10, R14 (đáp án Slack Q2, thread ts 1792556100.094559)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5580?focusedCommentId=54782`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `dev chauptm (comment 2026-10-16, mô tả kỹ thuật); người trả lời Slack Q2 2026-10-21 chưa rõ PO hay QA (xem ⏳ ở 4.1); agent test-executor [AI] — không ai xác nhận có trích dẫn`
- **Trích nguyên văn:**
  ```
  Comment dev 54782 (2026-10-16), teeinblue-vectorize: "`ParagraphRenderer` interleaves stroke passes across lines (outermost of every line → … → innermost → all fills). Shadow is now applied once to the whole paragraph instead of per line."
  Đáp án Slack Q2 (2026-10-21, chép trong Nhật ký chốt của RA): "không được phép khác nhau"; "ko cần nghiệm thu lại 5472"; vòng 3: "a" (API PNG đã đổi sang áp shadow 1 lần, trong PR api #4016).
  TC-TIB-6335 (actualResult 2026-10-21): Blocked — Preview editor và PNG khớp nhau, nhưng preview storefront (SDK staging chưa vẽ multi-stroke paragraph) và SVG vectorize (không tải được) không có để so đủ 3 renderer. PNG order #1096 (portal orders/4749): cùng kiểu hình — 1 khối shadow cho cả paragraph (không lặp theo dòng), 3 vành đúng thứ tự, fill trên cùng; không thấy lệch shadow so với preview editor. Preview storefront chỉ vẽ 1 vành và không có shadow trong SVG preview (SDK VERSION 20260929); SVG vectorize không có đường tải trên portal.
  TC-TIB-6313 (actualResult 2026-10-21): Blocked — Không so được đủ 3 renderer: SDK storefront trên staging chưa có code TIB-5580 và không tìm được đường lấy SVG vectorize từ portal. PNG order design (order #1091, design 14184): khớp preview editor — 1 khối shadow cho cả paragraph, 2 vành đỏ → xanh dương. Không lệch giữa editor và PNG.
  ```
- **File đính kèm cho claim này:** `không có`
