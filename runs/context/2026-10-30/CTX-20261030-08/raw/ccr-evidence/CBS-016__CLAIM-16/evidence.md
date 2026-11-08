# CBS-016__CLAIM-16 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S1

**Đánh giá:** S1: CCR khai KHÔNG CÓ NGUỒN; quan sát 1 lần khi dựng fixture, ghi trong actualResult TC-TIB-6651 (Testlane). Chưa Dev/PO xác nhận thiết kế hay thiếu sót. Cùng quan sát với KB-157 (CBS-008) — re-observation cùng lượt chạy, không thêm nguồn mới.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-16` | Phát hiện phụ — layer Curve Text không có tuỳ chọn căn lề (layer lưu align center) | portal (artwork editor, layer Curve Text) | `KHÔNG CÓ NGUỒN` — quan sát 1 lần khi dựng fixture 2026-10-22, ghi trong actualResult TC-TIB-6651; chưa Dev/PO xác nhận thiết kế hay thiếu | artwork / layer-config-text (KB-157, CHK-009) | `UNKNOWN` |
| `CLAIM-16` | `artwork` | `layer-config-text` | merchant/staff (artwork editor) | portal | KB-157 |

## CCR 5.1 (nguyên văn)

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6651 actualResult (ghi chú lệch case)
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5268
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev/PO xác nhận
- **Trích nguyên văn:**
  ```
  "Lưu ý lệch case: layer Curve Text không có tuỳ chọn căn lề (luôn căn giữa), nên chạy với căn giữa, không dựng được
  căn phải."
  ```
- **File đính kèm cho claim này:** không có
