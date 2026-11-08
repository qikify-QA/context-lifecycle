# CBS-011__CLAIM-13

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-13` | TIB-5558 — điều kiện có source option đang bị ẩn (toggle tắt hoặc bị chính điều kiện của nó ẩn) = không khớp, nên layer Hide chỉ phụ thuộc option bị ẩn sẽ hiện; linked layer đi theo hiển thị cuối của layer gốc; điều kiện 2 cấp lan theo | storefront | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | sdk / storefront-buyer-facing; artwork / layer-duplicate-link-copy (linked layer) | `ADD` |

## Phần 1b

| `CLAIM-13` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

## Phần 5.1

### CLAIM-13

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Hiding layers by condition (storefront)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "A condition whose source option is hidden (switched off by its show/hide toggle, or hidden by its
  own condition) does not match. A Hide layer that depends only on hidden options is therefore shown.
  Linked layers follow the final visibility of the layer they are linked to."
  "Two-level: layer B (Show, "A is X") depends on option A, which is a Hide layer → when A is hidden by
  its condition, B is hidden too."
  ```
- **File đính kèm cho claim này:** `không có`
