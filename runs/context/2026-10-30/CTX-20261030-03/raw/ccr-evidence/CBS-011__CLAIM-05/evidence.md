# CBS-011__CLAIM-05

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-05` | TIB-5558 — Artwork 1.0 không có dropdown (heading chuỗi liền, toggle cố định "Show this layer on first load"); convert 1.0→2.0 ra action Show (expected); paste layer Hide từ 2.0 sang 1.0 bị chặn "Cannot import layers from different artwork versions." | portal (editor AW 1.0, convert, copy/paste layer) | `test_case` — PASS TC-TIB-7319, TC-TIB-7320, TC-TIB-7321 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config | `ADD` |

## Phần 1b

| `CLAIM-05` | `artwork` | `conditional-setting-config` | store owner / staff | portal | không có |

## Phần 5.1

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7319, TC-TIB-7320, TC-TIB-7321`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7319: "Trên AW-OLD-1.0 (#5899, schema_version = 1), panel Conditional Setting của layer
  "QUOTE OLD" hiển thị heading là một chuỗi text liền "Show this layer and its option when:" — không
  tách thành dropdown + text như Artwork 2.0 … Nhãn toggle vẫn cố định "Show this layer on first load"."
  TC-TIB-7320: "Editor sau convert → Conditional Setting của layer "QUOTE OLD": dropdown Show/Hide đã
  xuất hiện và đang ở giá trị Show, heading "Show this layer and its option when:"; điều kiện "Pet 1
  Type is any of: Dog" và radio "All conditions match (AND)" giữ nguyên như trước convert."
  TC-TIB-7321: "mở AW-OLD-1.0 (#5899) rồi Ctrl+V: app hiện thông báo "Cannot import layers from
  different artwork versions." và danh sách layer của artwork 1.0 không đổi"
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7319 — actualResult: Artwork 1.0 không có lựa chọn Show/Hide. Trên AW-OLD-1.0 (#5899, schema_version = 1), panel Conditional Setting của layer "QUOTE OLD" hiển thị heading là một chuỗi text liền "Show this layer and its option when:" — không tách thành dropdown + text như Artwork 2.0, bấm vào chữ Show không mở danh sách nào; panel chỉ có 2 combobox và cả 2 đều thuộc khối điều kiện (Option "Pet 1 Type" / "is any of: Dog"), không có combobox action. Nhãn toggle vẫn cố định "Show this layer on first load".
TC-TIB-7320 — actualResult: Convert 1.0 → 2.0 giữ nguyên hành vi Show, đúng như mong đợi (không log bug).
Bấm "Convert to Artwork 2.0" trên AW-OLD-1.0-CONVERT (#5900) → dialog xác nhận "Convert to Artwork 2.0?" → Convert → Save & Close. API GraphQL xác nhận schema_version của #5900 đổi từ 1 sang 2.
Editor sau convert → Conditional Setting của layer "QUOTE OLD": dropdown Show/Hide đã xuất hiện và đang ở giá trị Show, heading "Show this layer and its option when:"; điều kiện "Pet 1 Type is any of: Dog" và radio "All conditions match (AND)" giữ nguyên như trước convert.
Storefront CP-OLD-1.0-CONVERT (tib-5558-cp-old-10-convert): Pet 1 Type = Dog → field layer-650004 và node artwork-layer--layer-650004 hiện; = Cat → cả hai biến mất. Đúng chiều Show.
Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
TC-TIB-7321 — actualResult: Paste layer Hide từ Artwork 2.0 sang Artwork 1.0 bị chặn. Copy layer text "QUOTE DOG" (action Hide, điều kiện "Pet 1 Type is Cat") từ AW-HIDE-1 (#5868) bằng nút "Copy to clipboard", mở AW-OLD-1.0 (#5899) rồi Ctrl+V: app hiện thông báo "Cannot import layers from different artwork versions." và danh sách layer của artwork 1.0 không đổi — vẫn đúng 2 layer "QUOTE OLD" và "Pet 1 Type", không có layer Hide nào được thêm.
