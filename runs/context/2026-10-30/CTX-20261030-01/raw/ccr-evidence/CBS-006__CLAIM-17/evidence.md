# CBS-006 CLAIM-17 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-17` | TIB-5584 — buyer preview trên storefront theo effective visibility: Group ẩn (con giữ cờ ON) thì preview chỉ còn layer ngoài Group, khớp canvas editor | storefront — buyer preview (SDK) | `test_case` — PASS TC-TIB-6068 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing (preview) | `ADD` |

## Phần 1b
| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6068
- **Link:** https://staging-portal.teeinblue.com/campaigns/3043
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6068 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Artwork #5046 "AW-G1H group hidden" / campaign #3043 (Group "Name" ẩn, con giữ cờ ON). Editor canvas và Campaign Editor chỉ có OUTSIDE; buyer preview trên storefront chỉ có OUTSIDE ở góc trên phải; đặt order Bogus #1084 (Confirmation #DUW8TDNMP) => orders/4666 , tải order design PNG #1084_7415_Front.png: chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. Ba bề mặt khớp nhau. API: POST /api/merchant/shopify/customization => 200 và POST /cart/add thành công khi Add to cart.
  ```
- **File đính kèm cho claim này:** không có
