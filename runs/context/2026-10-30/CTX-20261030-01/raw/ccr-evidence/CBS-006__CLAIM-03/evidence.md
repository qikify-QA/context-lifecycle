# CBS-006 CLAIM-03 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-03` | TIB-5584 — ẩn/hiện một layer con khi Group đang ON chỉ đổi cờ của đúng con đó; Group và các con khác không đổi | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6048 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-effective-visibility | `ADD` |

## Phần 1b
| `CLAIM-03` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6048
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6048 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ẩn LINE1 khi Group ON - Group và LINE2/ICON vẫn ON, không dòng nào dimmed. API: PUT /api/artworks/5050 => 200, LINE1 visible=false, Group/LINE2/ICON/OUTSIDE = true - khớp.
  ```
- **File đính kèm cho claim này:** không có
