# CBS-091 CLAIM-17 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-17

- **Statement:** Reload trang khi option chained đang processing thì không resume, option chạy lại từ đầu bằng call mới và không dùng kết quả job cũ.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ4. Bổ trợ: QA-3441 TC-61 ✅ AI 2026-10-29 staging. (CCR cũ: CBS-022 CLAIM-10)
- **Trích nguyên văn:**
  ```
  - **RQ4:** B. Nothing is resumed: after a reload, the option runs again from the start (a new call; the old job's result is not used).
  ```
