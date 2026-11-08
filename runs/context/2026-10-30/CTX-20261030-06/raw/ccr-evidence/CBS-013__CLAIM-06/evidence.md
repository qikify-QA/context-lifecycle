# CBS-013__CLAIM-06

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-06` | Sửa + publish platform product → theo QA plan dev storefront thấy bản mới; quan sát: URL SDK v=1 vẫn bản cũ (last-modified 04:59:40 GMT) | storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7403 Fail retest 2026-10-28, BUG-439 | sdk/storefront-buyer-facing | ADD |

## Phần 1b

| `CLAIM-06` | `sdk` | `storefront-buyer-facing` | guest buyer (thay đổi do owner/staff làm trên portal) | storefront | không có |

## Phần 5.1

### CLAIM-06

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7403 (BUG-439); Jira TIB-5203 comment 55763 bước 6`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7403 actualResult: "Fail — Retest 2026-10-28: BUG-439 vẫn tái hiện cho platform product. … Actual: SDK vẫn gọi
  GET …/campaigns/9452881084657.json?shop=nprice1.myshopify.com&v=1 => "NAME", last-modified 04:59:40 GMT (cũ ~4.5 giờ),
  artworks[] còn key `global_options`. Link preload trên trang dùng v=1793179820 (version mới) trả "FIX5203B" …"
  Comment 55763 bước 6: "edit and save it in the portal, then reload its Shopify product page; the change shows."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7403 / BUG-439 (Testlane)`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7403 (passed)
