# CBS-013__CLAIM-13

Trích từ Proposal CBS-013 (đóng băng 2026-10-30, file CCR-2026-10-28-campaign-payload-v2-cache.md, sourceTask TIB-257).

## Phần 1a

| `CLAIM-13` | Publish / re-publish campaign thành công, storefront vẫn chạy | portal · storefront | `KHÔNG CÓ NGUỒN` — PASS TC-TIB-7408 2026-10-28 ~06:00 UTC [AI] trước redeploy, chưa chạy lại | campaign (multi-store launch) | ADD |

## Phần 1b

| `CLAIM-13` | `campaign` | MỚI: campaign-publish-multi-store | owner / staff | portal | không có |

## Phần 5.1

### CLAIM-13

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `Testlane TIB-257 · TC-TIB-7408`
- **Link:** `https://qa-hub.ownego.com/test-cases?task=TIB-257`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
- **Người viết / người xác nhận:** `test-executor [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7408: "Re-publish CP-CACHE (Update cho Nprice1 trong Multi-store launch): POST /api/campaigns/3270/sync => 200, link
  storefront tib5203-cp-cache còn nguyên, metafield version đổi (1793166073). Storefront tải đủ form (Name/Dog/Color A1), reload
  4 lần giống hệt … Lưu ý: không thấy toast trong ảnh chụp (dialog launch vẫn mở)."
  ```
- **File đính kèm cho claim này:** `không có`

## Testlane (list_test_cases TIB-257, read-only 2026-10-30; status hiện tại không dùng làm căn cứ — Testlane không lưu ngày chạy từng case, ngày/lượt lấy từ CCR)

Case: TC-TIB-7408 (passed)
