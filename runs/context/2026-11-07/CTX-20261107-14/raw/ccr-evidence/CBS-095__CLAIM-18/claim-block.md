### CLAIM-18

- **Statement:** Known issue (chữ thông báo): thông báo 4 MP hiện là "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)" trên cả 3 nơi (toast artwork, toast GO T2I, GO Single upload) dù biên là ≤. Dev đồng ý đổi thành "must not exceed …" (cả Single upload) — PO chưa xác nhận, chưa ship lúc test
- **Object / feature:** artwork/layer-config-image (liên quan: global-option)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-27
- **Locator:** QA-3435 TC-15, 16, 17 PASS 2026-10-27, staging, build không ghi lại; TC-19 tạm dừng chờ PO. Known issue, KHÔNG dùng làm expected. Chữ "must not exceed" dev đồng ý, PO chưa duyệt, chưa ship lúc test, không ghi là hành vi hiện tại. RA QA-3435 §0 theo lịch sử QA-3181 (TIB-5136) ghi Single upload là "must not exceed"; dev và TC-17 thấy "must be less than"; giữ cả hai (CCR cũ: CBS-024 CLAIM-10)
- **Căn cứ expected:** Jira TIB-5561 comment 55697 Q4, chinhdt 2026-10-27 ("must be less than" là thông báo có sẵn, dùng lại)
- **Trích nguyên văn:**
  ```
  TC-15 | ✅ AI — 4 MP boundary on save | … 2000×2001, 256×15626 → 422 "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)"; UI 2000×2001 → same toast, editor stays open
  TC-19 | ⏸️ AI — PO to confirm the message text (Q4) | current text on all 3 surfaces (artwork toast, T2I GO toast, Single upload GO): "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)" | Dev agreed "must not exceed …" (55697); not changed yet
  Dev (chinhdt, comment 55697, 2026-10-27, Q4) — xem CLAIM-08: "\"must be less than\" is the existing Single upload message, reused unchanged. Agree with \"must not exceed 4.000.000 px (4 Megapixel)\". … **PO to confirm.**"
  QA hỏi lại PO (phuongbb, comment 2026-10-27): "Proposed: **\"Flux dimension (width * height) must not exceed 4.000.000 px (4 Megapixel)\"** everywhere. OK?" — chưa có trả lời PO.
  ```
