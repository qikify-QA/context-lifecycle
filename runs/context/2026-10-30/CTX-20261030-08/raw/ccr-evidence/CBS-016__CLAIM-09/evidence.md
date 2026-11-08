# CBS-016__CLAIM-09 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S1

**Đánh giá:** S1: CCR khai KHÔNG CÓ NGUỒN; có artifact (actualResult Fail TC-TIB-6649 + ảnh + BUG-363 trên Testlane; status Testlane 'passed' lệch actualResult — không dùng status). Chưa Dev xác nhận lỗi mới hay cũ. Cùng quan sát với KB-154 (CBS-008, KNOWN_DEFECT, defect watch CHK-008) — re-observation cùng lượt chạy, không thêm nguồn mới. OQ-artwork-126 đã hỏi Dev. Không làm oracle (CCR 4.2).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-09` | TIB-5606 — rainbow + multi-stroke 3 lớp căn phải: Order Design PNG có sợi màu chữ vẽ đè lên lớp stroke ở mọi chỗ nối chữ (BUG-363, known defect); SDK preview sạch; đủ ký tự, 3 lớp đúng thứ tự. **Có thể làm SAI** check multi-stroke đang coi "rainbow takes multi-stroke normally" là oracle | api (Order Design PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-6649 actualResult Fail 2026-10-22, BUG-363 (status Testlane "passed" lệch actualResult); chưa có Dev xác nhận lỗi mới hay cũ | artwork / text-color-sequence-render (KB-154, CHK-008); text-multi-stroke checklist | `UNKNOWN` |
| `CLAIM-09` | `artwork` | `text-color-sequence-render` | merchant/staff | api | KB-154 |

## CCR 5.1 (nguyên văn)

### CLAIM-09

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6649 (actualResult Fail) · BUG-363
- **Link:** https://staging-portal.teeinblue.com/campaigns/3139/edit · https://staging-portal.teeinblue.com/orders/4762
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev xác nhận
- **Trích nguyên văn:**
  ```
  "Fail — Order Design PNG của rainbow + multi-stroke có đường chỉ màu chữ cắt ngang các lớp stroke ở chỗ nối giữa các
  chữ; SDK preview không có. Actual: ở mỗi chỗ nối chữ (E-l, l-i, i-z, z-a, a-b, b-e, e-t, t-h) xuất hiện sợi mảnh màu
  đỏ/xanh/vàng (màu của chữ) vẽ đè lên lớp stroke trắng và đen; thêm vài chấm lấm tấm trong chữ "l". Phóng 500% thấy rõ.
  Expected: 3 lớp stroke trắng/đen/xanh liền mạch, không bị cắt, giống SDK preview. Các phần còn lại đúng: đủ 9 ký tự,
  3 lớp stroke đúng thứ tự, căn phải không tràn (PNG ink 617–919, SDK 617–919, Locate 618–919)."
  ```
- **File đính kèm cho claim này:** không có (ảnh trong actualResult TC-TIB-6649 và BUG-363)
