# CBS-013__CLAIM-18

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-18` | Entry cache campaign / platform product nhỏ hơn ~8.5 lần; key mới {domain}_campaign_v2_{id}, key cũ bị bỏ qua, không cần flush; lệnh php artisan cache:memory-report (--domain) | db (Redis) · server CLI | `KHÔNG CÓ NGUỒN` — chỉ có mô tả dev (comment 55763), QA không xem được Redis / chạy lệnh | không khớp object nào trong registry (cache server-side), chưa rõ, cần agent tự đánh giá | UNKNOWN |

## Phần 1b

| `CLAIM-18` | không khớp registry — cache Redis phía server (mô tả bằng lời) | MỚI: campaign-payload-cache | không áp role (hạ tầng) | db | không có |

## Phần 5.1

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 (Rule under test; Test setup; Not for QA; For the developer at production deploy)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-27`
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "each cached campaign/platform-product entry is about 8.5x smaller" "the old cache entries are skipped automatically (new cache
  key), so no cache flush is needed." "`cache:memory-report` counts exactly one shop's live keys with `--domain` and ignores a shop
  whose domain ends with it" "run `php artisan cache:memory-report` on production and compare the "Campaign + platform product" live
  row and `used_memory`: the total should fall toward roughly 1/8 within an hour, with no spike in between."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Không có test case nào gắn với claim này (chỉ nguồn Jira).
