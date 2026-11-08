# CBS-006 CLAIM-25 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-25` | TIB-5584 / TIB-5342 — PSD import có folder ẩn: artwork nhận Group ẩn, cờ của layer con giữ ON (mắt amber, dòng dimmed), canvas editor không vẽ nội dung Group (storefront / print file của artwork import CHƯA kiểm) | portal — Artworks > Import > PSD Single template · api — POST /api/artworks | `test_case` — PASS TC-TIB-6078 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork — chưa có feature PSD import trong canon | `ADD` |

## Phần 1b
| `CLAIM-25` | `artwork` | `MỚI: psd-import` | seller (store owner / staff) trên portal | portal, api | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6078
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5060
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6078 (chạy 2026-10-16, staging, [AI]) — actualResult: Import group-hidden.psd qua Artworks > Import > PSD Single template, tạo artwork #5060 "TIB-211 PSD hidden folder import": Group "HiddenFolder" mắt OFF; ChildText và ChildImage mắt ON màu amber, dòng dimmed (opacity 0.3); Outside bình thường; canvas không vẽ nội dung Group. API: POST /api/artworks => 201, response Group "HiddenFolder" visible=false, ChildText/ChildImage visible=true (kèm group_id), Outside visible=true - khớp.
  ```
- **File đính kèm cho claim này:** không có
