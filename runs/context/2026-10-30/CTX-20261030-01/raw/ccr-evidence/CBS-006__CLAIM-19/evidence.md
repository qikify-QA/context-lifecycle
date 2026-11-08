# CBS-006 CLAIM-19 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-19` | TIB-5584 — Shape cut / emboss: ẩn Group thì print file không còn nội dung Group và các bản emboss/shape-cut ở cell khác — CHƯA kiểm được | api — render order design (layout shape-cut / emboss) | `KHÔNG CÓ NGUỒN` — TC-TIB-6070 actualResult rỗng; TC-TIB-6071 actualResult Blocked 2026-10-16 (Product Base 3385 không có layout emboss) | order / review-and-initiate-fulfillment-portal; product-base / printarea-definition (layout) | `ADD` |

## Phần 1b
| `CLAIM-19` | `order` | `review-and-initiate-fulfillment-portal` | seller (store owner / staff) xem order trên portal | api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6070, TC-TIB-6071
- **Link:** https://staging-portal.teeinblue.com/orders/4668
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Blocked)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6070 — actualResult: (rỗng)
  TC-TIB-6071 (chạy 2026-10-16, staging, [AI]) — actualResult: Blocked - Data không có layout emboss nên không đánh giá được vế "layout emboss của layer ngoài Group vẫn đúng". Order Bogus #1086 (Confirmation #04HRDGQ3N, orders/4668 ) từ campaign #3041 / artwork #5043 . Order item chỉ có 1 file design PNG 1400x1400 (không có file/lớp emboss riêng). Vế đạt được: print file chỉ có EM2 (layer ngoài Group), không có EM1 của Group "Emb" ẩn. Vế chưa kiểm được: không có layout emboss nào trong output, nhiều khả năng Product Base 3385 không có cell layout emboss. Việc cần làm: dùng Product Base có layout emboss rồi chạy lại để đối chiếu phần emboss của EM2. Không tự đánh pass vì thiếu bằng chứng vế emboss.
  Dev QA plan bước 16 (comment #54766, 2026-10-16): "Its content, and the emboss/shape-cut copies in the other cells, are **not** in the print file."
  ```
- **File đính kèm cho claim này:** không có
