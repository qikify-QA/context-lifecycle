### CLAIM-19

- **Statement:** Một toggle duy nhất cho mọi provider GenAI, lưu thành 1 field `genai_auto_fallback`. Spec PO ghi "applies to the account's active AI service and model" — PO chưa chốt bên nào là ý định.
- **Object / feature:** sdk/MỚI: genai-model-settings — Thuộc: cài đặt model GenAI cấp account ở Extras > 3rd-party Services > Gen AI Effects, lưu và Validate key, retirement (migration, email, chặn lưu), toggle auto-switch, Admin > Settings của 2 bảng GenAI; Không thuộc: định tuyến model lúc generate và failover (genai-personalization-runtime), field GenAI service trên layer (artwork/layer-config-image)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-16, kết quả AI do máy chạy
- **Locator:** QA-3408 — TC-03 trong `result_QA-3408_B1-B2_2026-10-16.md` | Link: https://qa-hub.ownego.com/test-cases?task=TIB-207 | Ngày, build: 2026-10-16 (ngày chạy). Build: không ghi. | Câu hỏi PO PENDING-14 còn mở, không coi spec hay dev là ý định cuối (Phần 4.2). TC-03 ghi A-14 / PENDING-14 nên expected là assumption (CCR cũ: CBS-028 CLAIM-20)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-03 | ✅ AI — one toggle for all providers | Exactly 1 checkbox labelled "Auto-switch…" on the page; stored as a single field `genai_auto_fallback` | A-14 / PENDING-14
  Ngữ cảnh — dev notes (comment 54520, Part 2): "**New toggle** in Settings > Gen AI Effects: *"Auto-switch to a backup model during temporary outages"*. Off by default, one switch for all GenAI providers." · spec PO (description TIB-5554): "Activate scope: applies to the account's active AI service and model." — hai phía lệch, PO chưa chốt.
  ```
