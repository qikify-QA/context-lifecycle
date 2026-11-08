# CBS-006 CLAIM-14 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-14` | TIB-5584 — không đổi: lock và display setting (Preview / Design only / Form only) của Group vẫn cascade xuống mọi layer con; ẩn rồi hiện Group không làm mất lock của con | portal — layer panel + EXTRA 'Display this layer on' · api — PUT /api/artworks/{id} (`layer_display`) · storefront — form/preview sau sync | `test_case` — PASS TC-TIB-6061, TC-TIB-6062 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / layer-common-config (KB-012: field 'Display this layer on:' — canon chưa nói gì về cascade từ Group) | `ADD` |

## Phần 1b
| `CLAIM-14` | `artwork` | `layer-common-config` | seller (store owner / staff) trên portal | portal, api, storefront | không có (liên quan KB-012) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6061, TC-TIB-6062
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050 · https://staging-portal.teeinblue.com/artworks?id=5057
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6061 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : lock Group "Name" thì icon khoá hiện ở Group và cả ICON/LINE2/LINE1; kéo LINE2 trên canvas không đổi vị trí (x=507,y=230 trước/sau). Ẩn rồi hiện lại Group: 4 dòng vẫn lock. Bỏ lock Group: kéo LINE2 được (507,230 thành 587,270). Không Save ở case này nên không có request API ghi.
  TC-TIB-6062 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5057 (Group "Form" có mục EXTRA > "Display this layer on" trong editor) / campaign #3050 , storefront tib-211-cp-p1d-aw-p1d-display-design-only . Đặt "None (personalization option still available)" (Form only) qua editor, Save: PUT /api/artworks/5057 => 200, Group và FT1/FT2 layer_display="form_only"; sync campaign (POST /api/campaigns/3050/sync => 200): form có FT1/FT2/FT3, preview chỉ vẽ FT3. Đặt "Order Design only" (Design only), Save: PUT => 200, Group + FT1/FT2 layer_display="design_only"; sync => 200: form chỉ còn FT3, preview chỉ FT3. Lưu ý: editor ghi giá trị display vào cả Group lẫn từng con. Khi fixture chỉ đặt layer_display ở Group (qua JSON, con null) storefront không áp cascade (form vẫn có FT1/FT2); đường này seller không tạo được qua editor. Phần order design (print file) của Design only chưa kiểm vì case không yêu cầu đặt order.
  ```
- **File đính kèm cho claim này:** không có
