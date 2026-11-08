# CBS-016__CLAIM-13 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 dev_doc (CCR khai po_dev_confirm; xếp lại dev_doc): comment 'Context / logic changes' #55257 là mô tả thay đổi của PR #4044 (Root cause / Change / Tests / Notes) do dev sửa PR viết — mô tả kỹ thuật thay đổi code, không phải PO/business sign-off (CCR 4.1). Có locator + link focusedCommentId + authored_on 2026-10-21 + trích nguyên văn; authored_by chauptm ≠ người gửi (QA, u-00df51f9…). teeinblue supersede_policy.allow_dev_doc_supersede=false → normalizer hạ OBSERVED_CURRENT (§3, như CBS-011). Viết 2026-10-21, PR merge 2026-10-22 15:44; không có test case nào kiểm được: TC-TIB-6653 Blocked (không có order render trước deploy). Nguồn không đọc lại được (Jira chưa authorize) — dựa trích dẫn CCR.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-13` | TIB-5606 — preview/order design đã render trước deploy không tự cập nhật; phải regenerate design bị ảnh hưởng | portal (Orders → Re-generate design) · api (regenerate design) | `po_dev_confirm` — "Already-rendered previews/order designs (e.g. users/29106/artworks/6ad88a95861b5.png) do not update themselves; regenerate the affected designs after deploy." — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render; order (regenerate design) | `ADD` |
| `CLAIM-13` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | không có (S0 ở CBS-008, chưa nạp) |

## CCR 5.1 (nguyên văn)

### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Notes"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev)
- **Trích nguyên văn:**
  ```
  "Already-rendered previews/order designs (e.g. users/29106/artworks/6ad88a95861b5.png) do not update themselves;
  regenerate the affected designs after deploy."
  ```
- **File đính kèm cho claim này:** không có
