# CBS-010__CLAIM-14

Strength: S1

## Dòng Phần 1a

| `CLAIM-14` | TIB-5496 — bulk Add gửi MỘT mutation insert chung cho mọi campaign được tick; khi mutation lỗi UI vẫn toast "Success – Variants are added to selected campaigns", bỏ tick mọi campaign, dữ liệu không ghi; nhánh lỗi một phần của RA R9 không dựng được | portal · api — POST /api/graphql | `KHÔNG CÓ NGUỒN` — case TC-TIB-5046 Fail 2026-10-09, BUG-265 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail; chưa có câu trả lời dev nhánh lỗi một phần có tồn tại không | product-base — MỚI: variant-add-to-campaigns; context local campaign.md đoạn "Bulk Add to Campaign sends ONE insert request" có thể SAI nếu BUG-265 được fix theo hướng tách request | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-14

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5046 (actualResult, Fail) · BUG-265 · RA analysis_TIB-5496.md R9
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5046: Fail — Khi request ghi bị lỗi, UI báo Success và bỏ tick mọi campaign. Actual: chặn (abort) request insert, tick CP-0 + CP-OFF rồi Add: modal vẫn mở nhưng toast "Success – Variants are added to selected campaigns", cả 2 campaign bị bỏ tick, dữ liệu không được ghi (CP-0 vẫn [V4, V7], CP-OFF vẫn [V1]); không có cảnh báo campaign lỗi. Expected: campaign thành công bỏ tick, campaign lỗi giữ tick kèm toast cảnh báo nêu số campaign lỗi. Giới hạn mô phỏng: bulk Add chỉ gửi 1 mutation insert chung nên không làm lỗi riêng 1 campaign được; dùng CP-0 + CP-OFF thay CP-K (CP-K đã đủ 4/4 sau case 5042, bị disable). Đã tạo bug BUG-265 kèm screenshot.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5046; BUG-265 trên Testlane


## Đánh giá

S1: actualResult TC-TIB-5046 Fail kèm screenshot. Testlane status passed không dùng. Hành vi báo Success khi lỗi là defect đang mở (normalizer cân nhắc KNOWN_DEFECT).
