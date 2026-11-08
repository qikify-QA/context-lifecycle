# CBS-017__CLAIM-19

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-19` | Bản copy AW 1.0 (#5187, duplicate của #2164): PUT /api/artworks/5187 trả 500 kể cả khi Save không đổi gì — ngược với câu "Saving it once rewrites it to the new schema" trong context local | portal · api (PUT /api/artworks/{id}) | `KHÔNG CÓ NGUỒN` — TC-TIB-6332 actualResult ghi 500, chưa rõ nguyên nhân, chưa có bug | artwork/artwork-save-persist (KB-145, CHK-018..CHK-020 v6 theo results CBS-007) | `UNKNOWN` |

## Phần 1b

| `CLAIM-19` | `artwork` | `artwork-save-persist` | owner/staff | portal · api | KB-145 (v6 theo results CBS-007, chưa đọc được nội dung) |

## Phần 5.1

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6332 (Testlane task TIB-220); artwork #5187; context local teeinblue/TIB automation/context/artwork.md → Paragraph multi-stroke (TIB-5580 / TIB-220), gạch "Fixture gotcha"`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — chưa có bug, chưa dev nào xem log`
- **Trích nguyên văn:**
  ```
  Save artwork: PUT /api/artworks/5187 → 500 {"message":"Server Error"} kể cả khi chỉ mở lại editor và Save không đổi gì (artwork chưa có version nào đã lưu). Vì vậy không kiểm được payload "chỉ stroke_width đổi 3 → 6" và không so được preview storefront sau đổi.
  Chưa xác định 500 có liên quan TIB-5580 hay do dữ liệu AW 1.0 của bản copy này; cần dev xem log. Không tự coi là bug của ticket.
  Context local (artwork.md): "Saving it once rewrites it to the new schema, so duplicate per retest."
  ```
- **File đính kèm cho claim này:** `không có`
