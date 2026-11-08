# CBS-013__CLAIM-05

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-05` | Sửa artwork + sync campaign → theo QA plan dev reload storefront thấy bản mới trong vài giây; quan sát: URL SDK …/campaigns/{id}.json?shop=…&v=1 vẫn trả bản cũ (Cloudflare HIT, max-age=14400), link preload v=<version mới> và v mới trả đúng | storefront · api | `KHÔNG CÓ NGUỒN` — TC-TIB-7402 Fail retest 2026-10-28, BUG-446 | sdk/storefront-buyer-facing; campaign; context local storefront-sdk.md → "CDN cache on campaign / platform-product JSON" | ADD |

## Phần 1b

| `CLAIM-05` | `sdk` | `storefront-buyer-facing` | guest buyer (thay đổi do owner/staff làm trên portal) | storefront | không có |

## Phần 5.1

### CLAIM-05

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7402 (BUG-446); Jira TIB-5203 comment 55763 bước 5`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]; mô tả expected: tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7402 actualResult: "Fail — Retest 2026-10-28: BUG-446 vẫn tái hiện, storefront (URL SDK v=1) không hiện bản mới.
  … Actual: SDK vẫn gọi GET …/campaigns/15271489765617.json?shop=nprice1.myshopify.com&v=1 => text "NAME"
  (last-modified 05:29:56 GMT, 09:29:01). Trang còn link preload v=1793179721 (version mới) trả "FIX5203A" …"
  Comment 55763 bước 5: "Reload the product page: the change shows (a few seconds for the queue at most), not the old version."
  ```
- **File đính kèm cho claim này:** `ảnh chụp đính kèm trên TC-TIB-7402 / BUG-446 (Testlane)`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7402 (passed)
