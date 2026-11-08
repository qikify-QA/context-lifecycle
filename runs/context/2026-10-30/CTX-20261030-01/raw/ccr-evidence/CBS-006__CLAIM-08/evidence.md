# CBS-006 CLAIM-08 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-08` | TIB-5584 — Undo/Redo sau khi toggle mắt Group khôi phục đúng cờ riêng của từng layer con (con tự ẩn không bị bật lại) | portal — Artwork Editor (Undo/Redo) | `test_case` — PASS TC-TIB-6054 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace (Undo/Redo) + MỚI: group-layer-effective-visibility | `ADD` |

## Phần 1b
| `CLAIM-08` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6054
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6054 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 (LINE2 OFF, ẩn Group): Undo đưa Group về ON với LINE1/ICON ON, LINE2 vẫn OFF (không bị bật lại); Redo đưa Group về OFF, LINE1/ICON mắt ON màu amber (dimmed), LINE2 vẫn OFF. Ảnh chụp là trạng thái sau Redo.
  ```
- **File đính kèm cho claim này:** không có
