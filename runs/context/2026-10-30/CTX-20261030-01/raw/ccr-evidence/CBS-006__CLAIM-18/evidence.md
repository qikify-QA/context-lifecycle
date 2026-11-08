# CBS-006 CLAIM-18 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-18` | TIB-5584 — print file (order design) PNG và PDF theo effective visibility: Group ẩn thì file không có nội dung Group, khớp editor và buyer preview | api — render order design · portal — order detail (tải design) | `test_case` — PASS TC-TIB-6068, TC-TIB-6069 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | order / review-and-initiate-fulfillment-portal (order design) — canon order v1 STALE, chưa có statement về render theo visibility | `ADD` |

## Phần 1b
| `CLAIM-18` | `order` | `review-and-initiate-fulfillment-portal` | seller (store owner / staff) xem order trên portal | api, portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6068, TC-TIB-6069
- **Link:** https://staging-portal.teeinblue.com/orders/4666 · https://staging-portal.teeinblue.com/orders/4669
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6068 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Artwork #5046 "AW-G1H group hidden" / campaign #3043 (Group "Name" ẩn, con giữ cờ ON). Editor canvas và Campaign Editor chỉ có OUTSIDE; buyer preview trên storefront chỉ có OUTSIDE ở góc trên phải; đặt order Bogus #1084 (Confirmation #DUW8TDNMP) => orders/4666 , tải order design PNG #1084_7415_Front.png: chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. Ba bề mặt khớp nhau. API: POST /api/merchant/shopify/customization => 200 và POST /cart/add thành công khi Add to cart.
  TC-TIB-6069 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Campaign #3043 (Group ẩn). PNG: order #1084 ( orders/4666 ), file #1084_7415_Front.png chỉ có OUTSIDE ở góc trên phải. PDF: để có định dạng PDF mình đổi Design format của artwork #5046 sang PDF (PUT /api/artworks/5046 => 200, design_format=pdf), sync campaign (POST /api/campaigns/3043/sync => 200), đặt order Bogus #1087 (Confirmation #UH8ZFDJ58, orders/4669 ), tải #1087_7418_Front.pdf (1 trang): chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. PNG và PDF khớp nhau và khớp editor. Sau test đã trả artwork 5046 về PNG_RGB và sync lại.
  ```
- **File đính kèm cho claim này:** không có
