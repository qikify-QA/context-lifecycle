# CBS-011__CLAIM-06

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-06` | TIB-5558 — vòng điều kiện giữa 2 layer Hide bị chặn khi Save, thông báo "Circular conditions between: …" giống từng chữ bản Show, không ghi data | portal (Save artwork) · api | `test_case` — PASS TC-TIB-7322 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / condition-cycle-validation; KB-072, KB-073; checklist condition-cycle-validation CHK-003, CHK-006 (khớp, chỉ mở rộng sang Hide) | `ADD` |

## Phần 1b

| `CLAIM-06` | `artwork` | `condition-cycle-validation` | store owner / staff | portal | `KB-072`, `KB-073` (artwork) |

## Phần 5.1

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7322`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "AW-HIDE-CIRC (#5883): đặt layer "QUOTE A" action Hide phụ thuộc "QUOTE B", layer "QUOTE B" action
  Hide phụ thuộc "QUOTE A" → bấm Save & Close: app chặn, hiện thông báo Template - Default template:
  Circular conditions between: QUOTE A > QUOTE B / QUOTE A: - Conditions haven't been finished /
  QUOTE B: - Conditions haven't been finished, editor không đóng. AW-SHOW-CIRC (#5886): làm đúng các
  bước trên với action Show → thông báo giống từng chữ và cũng không lưu được. Không có request ghi
  nào thành công: GraphQL đọc lại cả 2 artwork sau đó, layer "QUOTE A" và "QUOTE B" của cả #5883 lẫn
  #5886 vẫn có dependency = null"
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7322 — actualResult: Điều kiện vòng với action Hide bị chặn giống hệt Show.
AW-HIDE-CIRC (#5883): đặt layer "QUOTE A" action Hide phụ thuộc "QUOTE B", layer "QUOTE B" action Hide phụ thuộc "QUOTE A" → bấm Save & Close: app chặn, hiện thông báo Template - Default template: Circular conditions between: QUOTE A > QUOTE B / QUOTE A: - Conditions haven't been finished / QUOTE B: - Conditions haven't been finished, editor không đóng.
AW-SHOW-CIRC (#5886): làm đúng các bước trên với action Show → thông báo giống từng chữ và cũng không lưu được.
Không có request ghi nào thành công: GraphQL đọc lại cả 2 artwork sau đó, layer "QUOTE A" và "QUOTE B" của cả #5883 lẫn #5886 vẫn có dependency = null — dữ liệu không bị ghi.
Hành vi chặn và nội dung thông báo của Hide và Show giống nhau → đạt. Không đính kèm screenshot: lượt chạy này không có tool Artifact để upload ảnh.
