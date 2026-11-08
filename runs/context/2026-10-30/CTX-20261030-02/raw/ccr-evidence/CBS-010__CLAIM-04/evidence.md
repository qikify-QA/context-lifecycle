# CBS-010__CLAIM-04

Strength: S1

## Dòng Phần 1a

| `CLAIM-04` | TIB-5496 — vùng chọn lẫn variant Unavailable: N chỉ đếm variant Available; RA/PO yêu cầu thêm hint "N available variants selected (X unavailable skipped)" — lúc chạy không có hint (C6, phần N + hint) | portal — modal Campaigns that use this product | `KHÔNG CÓ NGUỒN` — case TC-TIB-5030 Fail 2026-10-09 (thiếu hint), BUG-262 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns; vị trí hint còn treo (RA Q11), ca toàn bộ vùng chọn Unavailable còn treo (RA Q1) | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-04

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5030 (actualResult, Fail) · BUG-262 · comment dev Jira 53403 (Known limitations)
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05)
- **Trích nguyên văn:**
  ```
  TC-TIB-5030: Fail — Thiếu hint số variant bị bỏ qua. Actual: banner "Adding 2 variants..." (N=2), cột Variant status theo N=2 (CP-K 2/2, CP-0 0/2); không có hint nào về variant Unavailable bị bỏ qua. Expected: hint "2 available variants selected (2 unavailable skipped)". Đã tạo bug BUG-262 kèm screenshot.
  Comment dev tuanva 2026-10-05 (Known limitations): Nếu vùng chọn có cả variant Unavailable, modal chỉ nhận các variant đang Available. Số N trong banner là số variant Available đã chọn.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5030; BUG-262 trên Testlane


## Đánh giá

S1: actualResult TC-TIB-5030 là Fail kèm screenshot (artifact người gửi thu) → không có PASS nên không phải test_case S3. Comment dev tuanva 2026-10-05 "Known limitations" là comment kỹ thuật trong Jira (không phải dev_doc sinh từ source/changelog/PR diff; mô tả giới hạn chứ không xác nhận hành vi đúng; quote dạng diễn giải tiếng Việt, không mở được Jira để kiểm nguyên văn; CCR 4.1/4.2 nói rõ không coi là sign-off) → không lên S3. Testlane status passed không dùng làm căn cứ (actualResult vẫn Fail, không có ngày retest).
