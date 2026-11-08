# CBS-016__CLAIM-03 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-22 + build staging sau lần TIB-5606 giao QA cuối; đối chiếu Testlane TIB-230 (read-only 2026-10-31): actualResult khớp quote CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. Test chạy trước khi PR #4044 merge (15:44) và production chưa kiểm → shipped UNKNOWN, cần OQ chạy lại sau merge/production. Mọi PASS trên font thay thế (Dancing Script/Roboto/Heebo), staging không có Carattere. Nâng item S1 KB-147 (CBS-008) — cùng phát biểu, nguồn mạnh hơn.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-03` | TIB-5606 — rainbow căn giữa và căn trái: Locate Artwork + Order Design đủ ký tự, vị trí và độ rộng khớp SDK preview (lệch ≤1px) | portal (Locate artwork) · api (Order Design PNG) | `test_case` — PASS TC-TIB-6640 2026-10-22 staging [AI]; PASS TC-TIB-6641 2026-10-22 staging [AI] — build: staging @ 2026-10-22 14:20 — sau lần TIB-5606 giao QA cuối (2026-10-21 18:03); build hash: không rõ (QA không có quyền repo) | artwork / text-color-sequence-render | `UNKNOWN` |
| `CLAIM-03` | `artwork` | `text-color-sequence-render` | merchant/staff | portal · api | KB-146..KB-156 (chưa map từng id) |

## CCR 5.1 (nguyên văn)

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6640 · TC-TIB-6641
- **Link:** https://staging-portal.teeinblue.com/campaigns/3130/edit · https://staging-portal.teeinblue.com/campaigns/3131/edit
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA)
- **Trích nguyên văn:**
  ```
  TC-TIB-6640: "Căn giữa đúng: Locate Artwork ink 556–845 (trái 556px, phải 1400-845=555px), Order Design PNG 556–844,
  SDK preview 556–845; đủ 9 ký tự, không lệch phải. Pass trên Dancing Script, chưa kiểm được trên Carattere."
  TC-TIB-6641: "Căn trái đúng và không đổi: Locate Artwork ink 488–778, Order Design PNG 489–777, SDK preview 488–777;
  đủ 9 ký tự. Lưu ý: fixture đặt layer ở giữa printarea nên chữ bắt đầu ở x≈488, không sát mép trái printarea; chỉ đối
  chiếu theo SDK preview (khớp ≤1px)."
  ```
- **File đính kèm cho claim này:** không có
