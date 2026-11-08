# CBS-011__CLAIM-18

Trích từ Proposal CBS-011 (đóng băng 2026-10-30, file CCR-2026-10-28-conditional-setting-hide-action.md).

## Phần 1a

| `CLAIM-18` | TIB-5558 — Group layer không có Conditional Setting ở cấp Group trên UI: điều kiện Show/Hide đặt cho từng layer con; trái C14 trong RA ("Hide trên Group giống Show", dev, Slack 2026-10-28) | portal (panel layer settings của Group) · storefront · db/render | `KHÔNG CÓ NGUỒN` — case 7334 / 7335 có expected "Group ẩn/hiện theo điều kiện", actualResult viết tay không ghi ngày; BUG-436 còn gắn trên 7334; ngược C14 của dev | artwork / conditional-setting-config; KB-005 (33/35 layer type có accordion — không nói Group); có thể làm SAI case nào kỳ vọng đặt điều kiện ở cấp Group | `ADD` |

## Phần 1b

| `CLAIM-18` | `artwork` | `conditional-setting-config` | store owner / staff | portal | `KB-005` (artwork) |

## Phần 5.1

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7334 (bug BUG-436), TC-TIB-7335 — actualResult viết tay [QA]; RA C14`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) viết tay trên Testlane; Testlane không lưu ngày từng case`
- **Trích nguyên văn:**
  ```
  TC-TIB-7334 actualResult: "Chưa set được điều kiện cho toàn bộ Group mà cần set cho từng layer 1"
  TC-TIB-7335 actualResult: "chưa có hide cho cả group. cần thực hiện hide cho từng layer trong group"
  Phía ngược lại (RA analysis_TIB-5558.md, C14, diễn giải đáp án dev Slack 2026-10-28): "Hide trên
  Group layer: Group ẩn/hiện theo điều kiện Hide; cách các layer con đi theo Group giống hệt Show."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane actualResult (list_test_cases TIB-231, read-only 2026-10-30; status hiện tại không dùng làm căn cứ)

TC-TIB-7334 — actualResult: Chưa set được điều kiện cho toàn bộ Group mà cần set cho từng layer 1
TC-TIB-7335 — actualResult: chưa có hide cho cả group. cần thực hiện hide cho từng layer trong group
