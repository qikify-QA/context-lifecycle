### CLAIM-03

- **Statement:** Known issue (server-side, có từ trước): Option title chứa ký tự NUL (U+0000) → artwork save trả HTTP 500 `{"message": "Server Error"}`, dữ liệu không đổi.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner / staff; api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), 2026-10-23, không ai xác nhận
- **Locator:** QA-3419 — TC-39 trong `result_QA-3419_security_2026-10-23.md` (TC ⏭️, quy về bug có sẵn BUG-3347-NUL) | Link: https://qa-hub.ownego.com/test-cases?task=TIB-059 | Ngày, build: 2026-10-23 (build `assets/index.BqS1iTCG.js`, API staging) | KNOWN ISSUE, KHÔNG dùng làm expected (Phần 4.2). Chưa file bug riêng (BUG-08 chỉ là draft, TC đánh ⏭️ quy về BUG-3347-NUL). Bổ trợ: TC-36 / TC-38 ✅ 2026-10-23, giá trị dài, unicode và chuỗi injection khác đều lưu nguyên văn, 200 (CCR cũ: CBS-025 CLAIM-26)
- **Trích nguyên văn:**
  ```
  TC-39 | ⏭️ — skipped: not a Bulk edit bug (NUL → HTTP 500 in the artwork save API, existing BUG-3347-NUL) | Option title `a` + U+0000 + `b` on T1 + T2, one request → **500** `{"message": "Server Error"}` in 436 ms; data unchanged
  ```
