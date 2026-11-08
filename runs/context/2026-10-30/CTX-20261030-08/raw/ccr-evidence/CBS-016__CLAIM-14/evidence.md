# CBS-016__CLAIM-14 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 dev_doc (CCR khai po_dev_confirm; xếp lại dev_doc): comment 'Context / logic changes' #55257 là mô tả thay đổi của PR #4044 (Root cause / Change / Tests / Notes) do dev sửa PR viết — mô tả kỹ thuật thay đổi code, không phải PO/business sign-off (CCR 4.1). Có locator + link focusedCommentId + authored_on 2026-10-21 + trích nguyên văn; authored_by chauptm ≠ người gửi (QA, u-00df51f9…). teeinblue supersede_policy.allow_dev_doc_supersede=false → normalizer hạ OBSERVED_CURRENT (§3, như CBS-011). Viết 2026-10-21, PR merge 2026-10-22 15:44; không có test case nào kiểm được: TC-TIB-6654 Blocked (không có đường tải vector trên staging, URL .svg/.pdf/.eps 403). Nguồn không đọc lại được (Jira chưa authorize) — dựa trích dẫn CCR.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-14` | TIB-5606 — chỉ PNG renderer (teeinblue-api) đổi; SVG renderer teeinblue-vectorize không bị ảnh hưởng, rainbow trong SVG có hình glyph giống text 1 màu | api (vector export) | `po_dev_confirm` — "Only the PNG renderer (API) is changed. The SVG renderer in teeinblue-vectorize was checked and is not affected" — https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257 | artwork / text-color-sequence-render | `ADD` |
| `CLAIM-14` | `artwork` | `text-color-sequence-render` | merchant/staff | api | không có (S0 ở CBS-008, chưa nạp) |

## CCR 5.1 (nguyên văn)

### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** comment Jira 55257 trên TIB-5606, mục "Notes"
- **Link:** https://ownego.atlassian.net/browse/TIB-5606?focusedCommentId=55257
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-21
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chauptm (Dev)
- **Trích nguyên văn:**
  ```
  "Only the PNG renderer (API) is changed. The SVG renderer in teeinblue-vectorize was checked and is not affected: it
  lays out the glyphs of the whole string in one pass (font.forEachGlyph with kerning) and letter colors only change
  each glyph's fill. Rendering the reported layer there gives the same glyph geometry as the single-color text,
  positioned like the SDK preview — no change needed."
  ```
- **File đính kèm cho claim này:** không có
