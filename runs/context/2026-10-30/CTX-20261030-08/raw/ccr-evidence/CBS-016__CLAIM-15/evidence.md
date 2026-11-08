# CBS-016__CLAIM-15 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S0

**Đánh giá:** S0: chỉ có đáp án Q2 của QA (chienct) trên Slack — không phải PO/Dev, CCR 4.1 nói không tính; comment dev chỉ nói PNG renderer đổi, không liệt kê ảnh nào dùng PNG renderer; chưa test. Không artifact quan sát → không nạp. CBS-008 cũng S0.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-15` | TIB-5606 — ảnh bị ảnh hưởng chỉ gồm Locate Artwork + Order Design; thumbnail, mockup server-side, ảnh product không đổi | api (thumbnail, mockup render) · storefront (ảnh product) | `KHÔNG CÓ NGUỒN` — chỉ có đáp án Q2 của QA (chienct) trên Slack 2026-10-22, không phải PO/Dev; comment dev chỉ nói PNG renderer đổi, không liệt kê ảnh nào dùng PNG renderer; chưa test | artwork / text-color-sequence-render; campaign; mockup | `ADD` |
| `CLAIM-15` | `artwork` | `text-color-sequence-render` | merchant/staff · buyer | api · storefront | không có (S0 ở CBS-008, chưa nạp) |

## CCR 5.1 (nguyên văn)

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** RA analysis_TIB-5606.md → "Nhật ký chốt" Q2 (đáp án Slack của QA) · comment Jira 55257
- **Link:** không có (Slack #req-chienct ts 1792640378.627569)
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** chienct (QA) trả lời trong thread của QA — không phải PO/Dev
- **Trích nguyên văn:**
  ```
  Slack (QA): "2. chỉ locate artwork và order design"
  Dev (chỉ nói renderer, không liệt kê ảnh): "Only the PNG renderer (API) is changed."
  ```
- **File đính kèm cho claim này:** không có
