# CBS-016__CLAIM-17 — evidence (đóng băng từ Proposal CBS-016, 2026-10-31)

**Strength:** S1

**Đánh giá:** S1: CCR khai KHÔNG CÓ NGUỒN; quan sát phụ trong actualResult TC-TIB-6640, TC-TIB-6643 (không phải case kiểm hành vi này). Chưa Dev/spec. Cùng quan sát với sdk KB-066 (CBS-008 CLAIM-17) — re-observation cùng lượt chạy, không thêm nguồn mới. So tay với plan CBS-008 (dedup.mjs không so object khác): CBS-008__CLAIM-17 target_kb_ids [KB-015], không confirmation_source → không giao target, không cùng nguồn → không trùng theo luật §12.3a.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-17` | Phát hiện phụ — localStorage teeinblue-customizations chỉ còn ~10 entry gần nhất; entry cũ bị đẩy ra / ghi đè khi thêm nhiều product | storefront (localStorage) | `KHÔNG CÓ NGUỒN` — quan sát phụ trong actualResult TC-TIB-6640, TC-TIB-6643 ngày 2026-10-22, không phải case kiểm hành vi này; chưa Dev/spec | sdk / storefront-buyer-facing (KB-066, CHK-050..051) | `UNKNOWN` |
| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | KB-066 (sdk) |

## CCR 5.1 (nguyên văn)

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6640 · TC-TIB-6643 actualResult (ghi chú phụ)
- **Link:** https://nprice1.myshopify.com/products/cp-5606-script-c
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-22
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (agent QA); chưa Dev/spec
- **Trích nguyên văn:**
  ```
  TC-TIB-6640: "localStorage teeinblue-customizations không đọc được cho artwork 5258 vì entry này bị đẩy khỏi danh sách
  sau khi đặt thêm các line item khác (localStorage chỉ giữ 10 entry cuối); check ý 3 chỉ dựa vào request/response."
  TC-TIB-6643: "localStorage không đọc được cho line item này vì entry artwork 5256 bị ghi đè bởi line item emoji đặt
  ngay sau (cùng product)."
  ```
- **File đính kèm cho claim này:** không có
