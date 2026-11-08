# CBS-006 CLAIM-21 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-21` | TIB-5584 — R19 (đáp án Slack Q10a 2026-10-16, không ghi người trả lời): cascade áp cho Group trong Mockup Editor — trên staging 2026-10-16 Mockup Editor hiển thị layer phẳng, ẩn Group không làm layer con ngừng render; mockup đã render có tự cập nhật không (Q12) chưa chốt | portal — Mockup Editor (Product Base → mockup) | `KHÔNG CÓ NGUỒN` — TC-TIB-6073 actualResult Fail 2026-10-16, BUG-325; Testlane ghi passed nhưng không có lần chạy lại | product-base / mockup-attachment (KB-086: Edit mở 'Mockup Editor') — canon chưa nói Mockup Editor có Group hay không; image-library / mockup-layer-library có thể liên quan | `ADD` |

## Phần 1b
| `CLAIM-21` | `product-base` | `mockup-attachment` | seller (store owner / staff) trên portal | portal | không có (liên quan KB-086) |

## 5.1

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6073; BUG-325
- **Link:** không có (mockup #8156, Product Base 3385, staging)
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6073 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Ẩn Group "MKG" trong Mockup Editor không làm MK1/MK2 ngừng render. Actual: Mockup Editor của mockup #8156 (PB 3385 ) hiển thị MKG, MK3, MK2, MK1 phẳng (không có cấp Group), dòng MKG có icon cảnh báo "This layer's image is missing". Bấm mắt MKG chỉ làm biến mất chữ "MKG" trên canvas; MK1, MK2, MK3 vẫn hiển thị, không dimmed, mắt vẫn ON bình thường. Expected: MK1, MK2 ngừng render, dòng MK1/MK2 dimmed với mắt ON. Có thể Mockup Editor chưa hỗ trợ Group (cần PO xác nhận), nhưng kết quả hiện tại không khớp R19. Chưa kiểm bước Save + render lại mockup (không Save để giữ fixture). Đã tạo bug.
  ```
- **File đính kèm cho claim này:** không có
