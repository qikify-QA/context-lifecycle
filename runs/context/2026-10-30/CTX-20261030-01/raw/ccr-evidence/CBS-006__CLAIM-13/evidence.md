# CBS-006 CLAIM-13 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-13` | TIB-5584 — Group đang ẩn thì không mở được chế độ chỉnh mask: quan sát trên staging là mục Mask và nút Edit mask biến mất khỏi quick toolbar (không còn trong DOM), KHÔNG phải hiện ở trạng thái disable như R16 trong file RA; hiện Group lại thì nút trở lại, enabled | portal — quick toolbar (Mask / Edit mask) | `KHÔNG CÓ NGUỒN` — TC-TIB-6060 PASS 2026-10-16 nhưng actualResult ghi nút bị ẩn hẳn, khác expected 'disable'; PO chưa chốt ẩn hay disable | artwork — Group Mask chưa có trong canon qa-knowledge; context local artwork.md → 'Group Mask' (2026-09-30: Group ẩn vẫn có Edit mask) đã lỗi thời | `ADD` |

## Phần 1b
| `CLAIM-13` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6060
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5052
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy; không có xác nhận PO)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6060 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5052 . Group "Masked" ON + chọn Group: quick toolbar có Transform/Align/Print Effects/Mask, nút "Edit mask" enabled (disabled=false). Group ẩn + chọn Group: toolbar chỉ còn "Align", mục Mask và nút "Edit mask" không còn trong DOM nên không có cách mở chế độ chỉnh mask. Bật lại Group: nút Edit mask xuất hiện, enabled. Không Save nên mask không bị đổi. Lưu ý cho PO: khi Group ẩn nút Edit mask bị ẩn hẳn khỏi toolbar thay vì hiển thị ở trạng thái disable như mô tả case; kết quả chức năng (không chỉnh mask được) đạt.
  ```
- **File đính kèm cho claim này:** không có
