### CLAIM-03

- **Statement:** Fallback của Nano Banana 2.1 chỉ dùng cho outage: toggle "Auto-switch to a backup model" ON và 2.1 bị coi là down thì generate bằng Nano Banana 2 (nano_banana_31, backup đặt ở genai_model_fallbacks trong Admin > Settings), model đã lưu vẫn là 2.1 và ghi fallback_model; toggle OFF thì báo lỗi, không fallback; retirement chưa áp dụng cho 2.1.
- **Object / feature:** sdk/genai-personalization-runtime
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (guest), toggle do owner bật; storefront, db
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (chinhdt), 2026-10-30
- **Locator:** Jira TIB-5573, comment chinhdt 2026-10-30, trả lời Q1, Q7 (comment id 56094 theo RA QA-3442) và comment trả lời 56103 của QA (mục 1). Dev xác nhận bằng lời, QA chưa chạy cho 2.1: TC-27, 28, 39 ⏭️, TC-29 ⏸️, bảng genai_model_fallbacks chưa đọc được; không coi là đã test. Fallback model khác route fallback upload ảnh (KB-046) và fallback ID (KB-049, 050, 052), không gộp. (CCR cũ: CBS-023 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - Q1: Outage only, for now. With "Auto-switch to a backup model" ON and 2.1 counted as down,
  generation runs on Nano Banana 2, the saved model stays 2.1 and fallback_model is recorded; with the
  toggle OFF there is no fallback and the error is shown. Retirement does not apply yet: 2.1 has no
  retirement entry. If Google retires it later, the TIB-5554 migration + email runs with the successor
  chosen then. My earlier "retired or unavailable" wording was too loose.
  
  - Q7: Yes, the seeder maps 2.1 → Nano Banana 2 (nano_banana_31). Dev will run it on staging for testing.
  
  1. Fallback test: no need to re-test here. The fallback logic is unchanged from TIB-5554 and already
  covered there. Nano Banana 2.1 only needs its backup set up in Admin > Settings
  (`genai_model_fallbacks`: 2.1 → Nano Banana 2).
  QA chưa test cho 2.1: TC-27 / TC-28 / TC-39 ⏭️, TC-29 ⏸️ (cần quyền Admin > Settings).
  ```

