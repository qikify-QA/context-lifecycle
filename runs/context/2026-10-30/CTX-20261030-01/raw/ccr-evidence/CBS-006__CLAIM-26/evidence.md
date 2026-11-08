# CBS-006 CLAIM-26 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-26` | TIB-5584 — không đổi (regression): artwork không có Group render như trước ở editor và storefront; mắt ON không màu amber, toggle từng layer đổi đúng | portal — Artwork Editor · storefront — buyer preview | `test_case` — PASS TC-TIB-6079 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace; sdk / storefront-buyer-facing | `ADD` |

## Phần 1b
| `CLAIM-26` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal, storefront | không có |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6079
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5038
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6079 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5038 (không Group): N1/N3 mắt ON bình thường (trắng, không amber), N2 mắt gạch chéo; toggle từng layer đổi đúng. API: PUT /api/artworks/5038 => 200, N1=true, N2=false, N3=true. Storefront tib5584-cp-ng1-aw-ng1 (campaign #3042 ): buyer preview có N1 và ảnh N3, không có N2 - khớp editor. Ghi chú: dòng layer tự ẩn (N2) hiển thị mờ như style layer ẩn thông thường; hai dòng ON không bị mờ. Không chạy lại sync campaign vì artwork Save với dữ liệu không đổi.
  ```
- **File đính kèm cho claim này:** không có
