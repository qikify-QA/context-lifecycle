# CBS-017__CLAIM-18

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-18` | TIB-5580 — Buyer chèn stroke_layers vượt giới hạn (4 entry, width "abc") vào POST customization: API trả 201 và echo nguyên payload chèn; localStorage và PNG order không bị ảnh hưởng | api (POST /api/merchant/shopify/customization) · storefront (localStorage) · api (PNG order) | `KHÔNG CÓ NGUỒN` — case TC-TIB-6338 failed, BUG-357; chưa ai phân xử nên từ chối hay bỏ qua (OQ-artwork-111) | artwork/text-multi-stroke; context local artwork.md dòng "A buyer cannot inject strokes" nói ngược với RA | `UNKNOWN` |

## Phần 1b

| `CLAIM-18` | `artwork` | `text-multi-stroke` | guest buyer | api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6338 (Testlane task TIB-220, status skipped, actualResult Fail); BUG-357; order #1100 (portal orders/4756); RA analysis_TIB-5580.md Section 5 (đáp án Slack Q6 "Có validate")`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI] — không ai phân xử. ⏳ CHỜ BẠN (câu cho PO, OQ-artwork-111): buyer chèn stroke_layers vượt giới hạn vào POST customization — server nên TỪ CHỐI (4xx) hay được phép NHẬN rồi bỏ qua khi render? BUG-357 hiện đã fix, đóng hay để Known Issue (ticket đã Done 2026-10-22)?`
- **Trích nguyên văn:**
  ```
  Fail — API customization nhận và lưu stroke_layers do buyer chèn (4 entry và width "abc"), không từ chối cũng không loại bỏ.
  Actual: POST /api/merchant/shopify/customization với stroke_layers 4 entry → 201, response echo đủ 4 entry; với width "abc" → 201, response echo width "abc".
  Expected: bị từ chối hoặc payload thừa/sai kiểu bị bỏ; response không có entry thứ 4 / width sai kiểu.
  Phần còn lại đạt: localStorage teeinblue-customizations không chứa stroke_layers chèn; PNG order #1100 (orders/4756) chỉ có đúng 3 vành theo artwork, không có vành thứ 4, không dùng giá trị chèn.
  Đã tạo bug BUG-357 kèm screenshot.
  ```
- **File đính kèm cho claim này:** `không có`
