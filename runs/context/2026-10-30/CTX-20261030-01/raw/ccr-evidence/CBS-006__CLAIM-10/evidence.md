# CBS-006 CLAIM-10 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-10` | TIB-5584 — chọn Group đang ẩn: canvas không có box drag/resize/rotate, quick toolbar chỉ còn mục Align (không Transform / Print Effects / Mask); 6 nút Align vẫn hiển thị, không disable nhưng bấm không đổi vị trí; hiện Group lại thì toolbar + Align hoạt động bình thường | portal — canvas toolbar + selection box | `test_case` — PASS TC-TIB-6058, TC-TIB-6059 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace — KB-042 (toolbar theo loại layer) thiếu điều kiện 'Group đang ẩn'; checklist dựa trên KB-042 có thể kỳ vọng sai cho Group ẩn | `ADD` |

## Phần 1b
| `CLAIM-10` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal | KB-042 (bổ sung điều kiện, không thay) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6058, TC-TIB-6059
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6058 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 , Group "Name" ẩn rồi chọn Group trên layer panel: canvas không có khung drag/resize/rotate (0 phần tử .drr/handle); quick toolbar chỉ còn mục "Align", không có Transform / Print Effects / Mask. Khi Group hiện thì toolbar đủ Transform, Align, Print Effects, Mask và có khung drag với handle resize/rotate. Ghi chú: mục "Align" vẫn hiển thị khi Group ẩn (xem TC-TIB-6059).
  TC-TIB-6059 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 . Group ẩn: bấm đủ 6 nút Align (Top/Left/Middle/Center/Bottom/Right) rồi Save, PUT /api/artworks/5050 => 200 với toạ độ không đổi (OUTSIDE 2200,400; LINE1 800,400; LINE2 800,900; ICON 800,1500). Group hiện: Align đủ 6 hướng chạy đúng, LINE1 trên canvas dịch Left x=477, Center x=612, Right x=747; Top y=105, Middle y=205, Bottom y=305. Lưu ý cho PO: khi Group ẩn, mục "Align" vẫn hiển thị và 6 nút không bị disable, chỉ là không có tác dụng (vị trí không đổi). Nếu spec yêu cầu nút bị disable thì cần xác nhận lại.
  ```
- **File đính kèm cho claim này:** không có
