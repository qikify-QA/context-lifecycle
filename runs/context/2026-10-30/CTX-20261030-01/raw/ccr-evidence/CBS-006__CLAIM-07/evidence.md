# CBS-006 CLAIM-07 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-07` | TIB-5584 — Group rỗng: toggle mắt không render gì và không tự đổi cờ của chính Group; layer panel không có tín hiệu riêng nào cho Group rỗng (khi OFF dòng chỉ mờ như mọi Group ẩn) | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6052, TC-TIB-6053 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-effective-visibility | `ADD` |

## Phần 1b
| `CLAIM-07` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6052, TC-TIB-6053
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5053
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6052 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5053 : tắt rồi bật lại Group "Empty" - mắt đổi đúng theo click, SOLO không đổi. API: PUT /api/artworks/5053 => 200, payload Group "Empty" visible=true, SOLO visible=true. Sau reload: Group vẫn ON, không bị hệ thống tự ghi đè.
  TC-TIB-6053 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5053 : dòng Group "Empty" chỉ có tên + mắt/khoá/caret/pen/copy/trash như Group thường, không có badge/icon/text cảnh báo "Group trống" ở cả trạng thái ON và OFF; khi OFF dòng chỉ mờ (opacity 0.3) như mọi Group ẩn bình thường.
  ```
- **File đính kèm cho claim này:** không có
