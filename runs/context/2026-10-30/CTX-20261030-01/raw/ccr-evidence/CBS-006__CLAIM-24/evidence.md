# CBS-006 CLAIM-24 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-24` | TIB-5584 — linked template: seller bật lại được Group đang ẩn do kế thừa; sau Save cờ ở linked thành `true` (hết kế thừa), global template vẫn ẩn | portal — Artwork Editor (linked template) · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6077 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-template-management | `ADD` |

## Phần 1b
| `CLAIM-24` | `artwork` | `artwork-template-management` | seller (store owner / staff) trên portal | portal, api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6077
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5058
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6077 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 : Global ẩn Group "GT" (LT-1 null, Group đang ẩn do kế thừa). Ở LT-1 bấm mắt Group "GT": bật được, các con hiện lại (hết dimmed). Save: PUT /api/artworks/5058 => 200, LT-1 Group "GT" visible=true (không còn null), Global GT vẫn visible=false. Sau reload LT-1 Group vẫn hiện; mở lại Global template: Group "GT" vẫn ẩn, không bị đổi.
  ```
- **File đính kèm cho claim này:** không có
