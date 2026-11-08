# CBS-010__CLAIM-12

Strength: S1

## Dòng Phần 1a

| `CLAIM-12` | TIB-5496 — sau Add thành công: modal vẫn mở, tick campaign được bỏ, cột K/N cập nhật, campaign vừa đủ N/N chuyển disable (C4, phần modal) | portal — modal Campaigns that use this product | `KHÔNG CÓ NGUỒN` — chỉ là quan sát phụ trong actualResult TC-TIB-5052/5041 (expected của các case này không kiểm trạng thái modal); RA Q6 còn tranh chấp đóng hay giữ modal | product-base — MỚI: variant-add-to-campaigns | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-12

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5052 (actualResult, quan sát phụ) · description Jira TIB-5496 "After success" · comment dev Jira 53403
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05); huyen.chu (description, sửa cuối 2026-09-30)
- **Trích nguyên văn:**
  ```
  TC-TIB-5052: 25 campaign chuyển thành 4/4 available (checkbox disabled, tick được clear, modal vẫn mở).
  Description Jira: After success: Keep modal open. Update the Variant status column in the grid. Clear selection. Disable campaigns that now contain all selected variants.
  Comment dev tuanva 2026-10-05: Sau khi thành công, modal vẫn mở, cột Variant status cập nhật, bỏ chọn campaign, campaign vừa đủ N/N chuyển sang disable.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5052 trên Testlane


## Đánh giá

S1: chỉ là quan sát phụ trong actualResult TC-TIB-5052 (kèm screenshot); expectedResult của 5052/5041 không kiểm trạng thái modal nên test case không kiểm đúng hành vi claim. Description Jira (huyen.chu) + comment dev là Jira trần/comment kỹ thuật, không phải spec_doc/dev_doc; RA Q6 còn tranh chấp đóng hay giữ modal.
