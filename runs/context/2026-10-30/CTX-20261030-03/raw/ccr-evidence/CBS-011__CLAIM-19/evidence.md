# CBS-011__CLAIM-19

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-19` | TIB-5558 — màn Edit customization trong admin không áp điều kiện ẩn/hiện (cả Show lẫn Hide): field của layer đang bị Hide vẫn hiển thị (C12) | portal (order → Edit customization) | `KHÔNG CÓ NGUỒN` — case 7341 status passed nhưng actualResult rỗng; lượt [AI] cùng ngày thấy ngược (BUG-433) | order (chưa có feature Edit customization trong canon) | `ADD` |

## Phần 1b

| `CLAIM-19` | `order` | MỚI: edit-customization-admin | store owner / staff | portal | không có |

## Phần 5.1

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7341 (actualResult rỗng); BUG-433; RA C12`
- **Link:** `https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) đổi status tay, không ghi kết quả; RA C12 diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7341 actualResult: (rỗng)
  RA analysis_TIB-5558.md, C12: "Màn Edit customization trong admin không áp dụng điều kiện ẩn/hiện,
  kể cả với Show → Hide không thay đổi gì ở màn này. (Q5, Slack 2026-10-28)"
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7341 — actualResult: (rỗng)
