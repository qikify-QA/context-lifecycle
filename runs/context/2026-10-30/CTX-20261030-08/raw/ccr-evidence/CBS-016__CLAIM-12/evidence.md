# CBS-016__CLAIM-12 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 dev_doc (CCR khai po_dev_confirm; xếp lại dev_doc): comment 'Context / logic changes' #55257 là mô tả thay đổi của PR #4044 (Root cause / Change / Tests / Notes) do dev sửa PR viết — mô tả kỹ thuật thay đổi code, không phải PO/business sign-off (CCR 4.1). Có locator + link focusedCommentId + authored_on 2026-10-21 + trích nguyên văn; authored_by chauptm ≠ người gửi (QA, u-00df51f9…). teeinblue supersede_policy.allow_dev_doc_supersede=false → normalizer hạ OBSERVED_CURRENT (§3, như CBS-011). Viết 2026-10-21, PR merge 2026-10-22 15:44; không có test case nào kiểm được: TC-TIB-6652 không tới được nhánh fallback (emoji bị ô nhập storefront bỏ). Nguồn không đọc lại được (Jira chưa authorize) — dựa trích dẫn CCR. Thu hẹp về đúng quote: vế '(có thể vẫn lệch/mất chữ khi căn phải)' là suy luận của CCR, không nạp; 'giữ hành vi cũ' không có nghĩa là hành vi mong muốn (CCR 4.2).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-12` | TIB-5606 — run dùng font fallback (font khác font layer) giữ hành vi cũ của PNG renderer, không theo phép đo mới (có thể vẫn lệch/mất chữ khi căn phải) | api (PNG renderer, nhánh fallback) | `po_dev_confirm` — "Font fallback runs (different font) keep the previous behaviour." — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render | `ADD` |
| `CLAIM-12` | `artwork` | `text-color-sequence-render` | merchant/staff | api | không có (S0 ở CBS-008, chưa nạp) |

## CCR 5.1 (nguyên văn)

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Change"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev, người sửa PR teeinblue-api #4044)
- **Trích nguyên văn:**
  ```
  "Change: each segment's x position is now measured from its font run as one string (width(run so far) -
  width(segment)), and the total width (used for autoscale, canvas size and alignment) comes from the same measurement.
  A letter-colored render is now exactly as wide as the same text in one color. Font fallback runs (different font)
  keep the previous behaviour."
  ```
- **File đính kèm cho claim này:** không có
