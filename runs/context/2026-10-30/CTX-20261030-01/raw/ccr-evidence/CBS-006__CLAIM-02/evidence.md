# CBS-006 CLAIM-02 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-02` | TIB-5584 — ẩn/hiện Group chỉ đổi cờ `visible` của Group, không ghi đè cờ của layer con: hiện Group lại thì con có cờ ON hiện lại, con tự ẩn (cờ OFF) vẫn ẩn; Save + reload giữ nguyên cờ riêng của Group và từng con (PUT /api/artworks/{id} trả 200, con giữ `visible=true`) | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6045, TC-TIB-6046, TC-TIB-6047, TC-TIB-6049 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-save-persist (KB-055: `visible` là 1 trong 7 field có ở mọi layer — claim này thêm ngữ nghĩa cho field đó) | `ADD` |

## Phần 1b
| `CLAIM-02` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-055) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6045, TC-TIB-6046, TC-TIB-6047, TC-TIB-6049
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6045 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ẩn Group "Name" thì canvas chỉ còn OUTSIDE, 3 dòng con dimmed, mắt con ON màu amber. API: PUT /api/artworks/5050 => 200, payload Group "Name" visible=false, LINE1/LINE2/ICON visible=true (không bị đổi/xoá key) - khớp.
  TC-TIB-6046 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : LINE2 OFF, Group tắt rồi bật lại - LINE1 và ICON hiện, LINE2 vẫn ẩn (mắt gạch chéo); không dòng nào dimmed. API: PUT /api/artworks/5050 => 200, Group visible=true, LINE1=true, ICON=true, LINE2=false. Mở lại editor sau Save: trạng thái giữ nguyên (screenshot sau reload).
  TC-TIB-6047 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : API PUT /api/artworks/5050 => 200, payload Group "Name" visible=false, ICON=false, LINE1/LINE2/OUTSIDE=true. Sau reload: Group OFF, ICON OFF, LINE1/LINE2 ON (amber, dimmed), canvas chỉ còn OUTSIDE - khớp lúc Save.
  TC-TIB-6049 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ICON OFF, Group tắt rồi bật lại - ICON vẫn ẩn, LINE1/LINE2/OUTSIDE hiển thị. API: PUT /api/artworks/5050 => 200, ICON visible=false, Group visible=true, LINE1/LINE2=true. Sau reload trạng thái không đổi.
  ```
- **File đính kèm cho claim này:** không có
