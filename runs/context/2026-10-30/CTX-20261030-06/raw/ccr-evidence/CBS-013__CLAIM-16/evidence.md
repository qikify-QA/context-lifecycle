# CBS-013__CLAIM-16

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-16` | Response campaign / platform product không lộ token/secret của instance; có config.maps_api_key (Mapbox public token "pk.") | api | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7409 2026-10-28 ~06:00 UTC [AI] trước redeploy; maps_api_key chưa ai xác nhận được phép public | sdk/storefront-buyer-facing (KB-013: endpoint public) | ADD |

## Phần 1b

| `CLAIM-16` | `sdk` | `storefront-buyer-facing` | guest (unauthenticated) | api | KB-013 (liên quan, không thay thế) |

## Phần 5.1

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7409`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7409: "access_token=0, token=0, secret=0, password=0; api_key=1 → chỉ config.maps_api_key = Mapbox public token (tiền tố
  "pk.", loại token công khai dùng ở trình duyệt, có trong config merchant). Không lộ token/secret của instance. Cần dev/PO xác nhận
  maps_api_key được phép public (nếu chính sách là "không có key nào" thì đổi thành Fail)."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7409 (passed)
