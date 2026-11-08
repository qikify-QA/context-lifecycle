# CBS-013__CLAIM-03

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-03` | TIB-5203 — artworks[] chỉ còn global_option_ids; global option đầy đủ nằm 1 lần ở top-level global_options | api | `KHÔNG CÓ NGUỒN` — TC-TIB-7396 Fail retest 2026-10-28 (BUG-437): URL SDK v=1 vẫn có artworks[].global_options; chỉ URL v mới đúng shape (TC-TIB-7507) | sdk/storefront-buyer-facing; global-option/artwork-personalization-global-option-link; mọi consumer đọc artworks[].global_options | ADD |

## Phần 1b

| `CLAIM-03` | `sdk` | `storefront-buyer-facing` | guest buyer (storefront SDK đọc) | api | không có |

## Phần 5.1

### CLAIM-03

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7396 (BUG-437); Jira TIB-5203 comment 55763 bước 4`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7396 actualResult: "Fail — Retest 2026-10-28: vẫn tái hiện trên URL SDK thật sự dùng. … artworks[0] (#5952)
  có cả `global_options` (1 phần tử) lẫn `global_option_ids`=[1125] … Phần fix: cùng endpoint với v mới … trả đúng
  shape: artworks[] chỉ có `global_option_ids` (AW-GO=[1125], AW-GO2=[1125,1126]), top-level 2 phần tử."
  Comment 55763: "Each entry in `artworks` now has only `global_option_ids` (no `global_options` list of its own);
  the full global options appear once, in the top-level `global_options`."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7396 (Testlane)`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7396 (passed), TC-TIB-7507 (passed)
