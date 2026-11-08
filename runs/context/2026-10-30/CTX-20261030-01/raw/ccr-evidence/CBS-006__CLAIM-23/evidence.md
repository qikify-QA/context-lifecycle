# CBS-006 CLAIM-23 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-23` | TIB-5584 — linked template: cờ `visible` = null ở linked template kế thừa trạng thái từ global template, áp cho cả Group và layer thường (global ẩn thì linked cũng ẩn; global bật lại thì linked hiện lại) | portal — Artwork Editor (global template + linked template) · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6075, TC-TIB-6076 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-template-management (KB-046, CHK-009 'Convert to Global Template') — canon chưa nói về kế thừa visible | `ADD` |

## Phần 1b
| `CLAIM-23` | `artwork` | `artwork-template-management` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-046, CHK-009) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6075, TC-TIB-6076
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5058
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6075 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 (Global template + "LT-1 linked template"). Global ẩn Group "GT" rồi Save: PUT /api/artworks/5058 => 200, Global GT visible=false, GT1/GT2/GT3=true; LT-1 giữ visible=null cho cả 4 layer (kèm global_id). Mở LT-1: Group "GT" ở trạng thái ẩn (mắt gạch chéo), GT1/GT2 dimmed, canvas chỉ còn GT3. Global bật lại Group, Save (GT=true; LT-1 vẫn null): LT-1 hiện lại đủ GT1, GT2, GT3 và không dòng nào dimmed.
  TC-TIB-6076 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 : Global tắt layer thường GT3, Save: PUT /api/artworks/5058 => 200, Global GT3 visible=false, LT-1 giữ null. Mở LT-1: GT3 mắt gạch chéo (ẩn do kế thừa), các layer khác (GT, GT1, GT2) không bị ảnh hưởng.
  ```
- **File đính kèm cho claim này:** không có
