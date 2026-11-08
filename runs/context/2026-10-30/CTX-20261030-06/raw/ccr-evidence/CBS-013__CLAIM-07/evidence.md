# CBS-013__CLAIM-07

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-07` | Đổi setting toàn store (PUT /api/instances/{id}/config) → theo QA plan dev áp dụng ngay; quan sát: config trong URL SDK v=1 và cả link preload vẫn giá trị cũ, chỉ v mới đúng | portal · storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7404 Fail retest 2026-10-28, BUG-440 | sdk/product-page-settings-config (KB-038); có thể làm SAI context local store-setting.md → "Instance config cache" (ghi PUT config xoá cache) | ADD |

## Phần 1b

| `CLAIM-07` | `sdk` | `product-page-settings-config` | guest buyer (setting do owner đổi) | storefront | KB-038 (liên quan, không thay thế) |

## Phần 5.1

### CLAIM-07

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7404 (BUG-440); Jira TIB-5203 comment 55763 bước 7`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7404 actualResult: "Fail — Retest 2026-10-28: BUG-440 vẫn tái hiện. … PUT /api/instances/520/config (09:31:41 UTC)
  => 200, body show_navigation_numbers=true. … Actual: SDK GET …/campaigns/15271489765617.json?shop=nprice1.myshopify.com&v=1
  => config.show_navigation_numbers=false (last-modified 05:29:56 GMT). Link preload v=1793179721 cũng trả false
  (entry 09:28:47). Chỉ URL với v mới (chưa từng gọi) trả true."
  Comment 55763 bước 7: "Reload the campaign page: the new setting applies right away."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7404 / BUG-440 (Testlane)`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7404 (passed)
