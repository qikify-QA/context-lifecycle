# CBS-006 CLAIM-05 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-05` | TIB-5584 — layer panel khi Group ẩn: dòng con dimmed (opacity 0.3), mắt con đang ON hiện màu amber, mắt con OFF giữ icon gạch chéo; mắt con vẫn click được, không khoá, không tooltip — thay hoàn toàn phần Portal của TIB-5581 (khoá toggle + tooltip "show the group first") | portal — Artwork Editor layer panel | `test_case` — PASS TC-TIB-6050, TC-TIB-6057 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace (layer row icon) — canon chưa có trạng thái dimmed/amber; context local artwork.md còn ghi TIB-5581 | `ADD` |

## Phần 1b
| `CLAIM-05` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6050, TC-TIB-6057
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6050 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : khi Group "Name" ẩn, mắt LINE1 vẫn click được 2 lần (OFF rồi ON), không bị khoá/không tooltip chặn, canvas không vẽ thêm nội dung Group. API: PUT /api/artworks/5050 => 200, Group visible=false, LINE1/LINE2/ICON=true - khớp.
  TC-TIB-6057 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : khi Group "Name" ẩn, 3 dòng con dimmed (opacity 0.3), mắt LINE1/LINE2 (ON) màu amber rgb(201,169,78), mắt ICON (OFF) là icon gạch chéo; hover mắt LINE1 không có tooltip, con trỏ pointer, click đổi trạng thái LINE1 ngay (OFF rồi ON).
  ```
- **File đính kèm cho claim này:** không có
