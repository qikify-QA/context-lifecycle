# CBS-006 CLAIM-20 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-20` | TIB-5584 — Campaign Editor preview theo effective visibility: Group ẩn thì preview trên mockup không có layer con của Group; Group hiện thì đủ layer, khớp canvas Artwork Editor | portal — Campaign Editor preview | `test_case` — PASS TC-TIB-6072 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | campaign / create-campaign-by-product-base (preview trong Campaign Editor) — canon campaign v3 STALE | `ADD` |

## Phần 1b
| `CLAIM-20` | `campaign` | `create-campaign-by-product-base` | seller (store owner / staff) trên portal | portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6072
- **Link:** https://staging-portal.teeinblue.com/campaigns/3043 · https://staging-portal.teeinblue.com/campaigns/3036
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6072 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Campaign Editor #3043 (artwork "TIB5584 AW-G1H group hidden", Group ẩn): preview trên mockup chỉ có OUTSIDE, không có LINE1/LINE2/ICON. Campaign #3036 (artwork "TIB5584 AW-G1", Group hiện): preview có đủ LINE1, LINE2, ICON, OUTSIDE - khớp canvas Artwork Editor. Dùng 2 campaign fixture (ẩn/hiện) thay cho việc đổi Group trên cùng artwork. Case chỉ xem preview nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có
