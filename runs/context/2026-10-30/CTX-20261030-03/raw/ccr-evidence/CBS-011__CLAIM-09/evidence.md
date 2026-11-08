# CBS-011__CLAIM-09

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-09` | TIB-5558 — "Hide this layer on first load" tắt, nguồn chưa trả lời: layer hiện; option của layer hiện ở cả hai trường hợp bật/tắt | storefront | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | sdk / storefront-buyer-facing | `ADD` |

## Phần 1b

| `CLAIM-09` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-09

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Hiding layers by condition (storefront)" → "Before the buyer answers (source option still empty)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "Before the buyer answers (source option still empty):
   - "Hide this layer on first load" off: the layer is shown.
   - "Hide this layer on first load" on: the layer is hidden on the artwork. With OR it stays hidden
     until every visible source option is answered with a non-matching value. With AND it shows as
     soon as one source is answered with a non-matching value.
   - The layer's own personalization option is shown either way."
  ```
- **File đính kèm cho claim này:** `không có`
