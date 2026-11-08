# CBS-013__CLAIM-20

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-20` | Campaign editor portal (bước 12 mới): sửa setting campaign product (giá, title trên store), save → reload vẫn đủ product, variant, setting | portal | `KHÔNG CÓ NGUỒN` — chỉ có comment dev 55763 (cập nhật 2026-10-28), chưa có test case | campaign | ADD |

## Phần 1b

| `CLAIM-20` | `campaign` | MỚI: campaign-product-settings-save | owner / staff | portal | không có |

## Phần 5.1

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Jira TIB-5203 comment 55763 bước 12 (thêm khi sửa comment 2026-10-28)`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5203`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `tinhpt (dev)`
- **Trích nguyên văn:**
  ```
  "12. In the portal campaign editor, change a campaign product's settings (for example its price or the product's title on the
  store) and save. The save succeeds and the product row still shows its product, variants and settings after the page reloads."
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Không có test case nào gắn với claim này (chỉ nguồn Jira).
