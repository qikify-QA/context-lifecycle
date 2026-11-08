# CBS-010__CLAIM-11

Strength: S0

## Dòng Phần 1a

| `CLAIM-11` | TIB-5496 — RA/PO (Q2): K đếm cả variant campaign đã có nhưng đang tắt (R7); Add bật lại (Mark Available) variant đã có nhưng đang tắt (R8). Lúc chạy không dựng được campaign có variant đang tắt: đặt Unavailable thì variant bị bỏ khỏi campaign | portal · db — cần dev dựng campaign có variant đang tắt | `KHÔNG CÓ NGUỒN` — TC-TIB-5035 actualResult rỗng (Testlane status passed không có bằng chứng chạy), TC-TIB-5044 skipped/Blocked 2026-10-09 — không dựng được precondition; RA Q10, Q12 còn treo | product-base — MỚI: variant-add-to-campaigns; canon qa-knowledge chưa có; NGƯỢC với context local campaign.md ("An Unavailable variant is dropped out of the campaign") — CCR không chọn phe | ADD |

## Block 5.1 (nguyên văn CCR)

### CLAIM-11

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5044 (actualResult, Blocked) · TC-TIB-5035 (actualResult rỗng) · RA analysis_TIB-5496.md R7/R8 (Q2, Slack 2026-10-08)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); người trả lời Q2 trong Slack không ghi tên
- **Trích nguyên văn:**
  ```
  TC-TIB-5044: Blocked — Precondition CP-OFF không khớp: V2 đang tắt không tồn tại trong campaign (cùng nguyên nhân với TC-TIB-5035). Campaign #2794 "TIB-169 CP-OFF" chỉ có V1 (92741) theo UI và API; Black/M (V2) không có dòng, kể cả Unavailable. Đặt Black/M thành "Unavailable" rồi Save thì variant bị bỏ khỏi campaign (không lưu dạng đang tắt), nên không dựng được precondition qua UI. Không chạy Add để tránh kết luận sai về việc "bật lại" variant; cần dev/DB dựng hộ CP-OFF có V2 ở trạng thái tắt.
  TC-TIB-5035: actualResult rỗng.
  RA R7: K = tổng số variant đã chọn mà campaign đã có, tính cả variant đang bật và đang tắt trong campaign. (Q2, Slack 2026-10-08) ▸ RA R8: Khi Add: thêm mới các variant campaign chưa có và tự động bật lại (Mark Available) các variant đã có nhưng đang tắt. (Q2, Slack 2026-10-08)
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5044 trên Testlane


## Đánh giá

S0: R7/R8 chỉ có lời kể trong file RA (Slack 2026-10-08, người trả lời không ghi tên) — không có artifact chứng minh: TC-TIB-5035 actualResult rỗng, TC-TIB-5044 skipped/Blocked (không dựng được precondition). Quan sát phụ của TC-TIB-5044 ("đặt Unavailable thì variant bị bỏ khỏi campaign") là hành vi của campaign editor, không phải claim này và không thuộc product-base → không nạp, nêu trong results.open_questions.
