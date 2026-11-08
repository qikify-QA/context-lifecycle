# CBS-091 CLAIM-14 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-14

- **Statement:** Effect riêng của nguồn lỗi thì nguồn hiện lỗi của chính nó, option {{output}} để trống, không bắt đầu và không có lỗi riêng.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3 (câu 1). Bổ trợ: QA-3441 TC-57 ✅ AI 2026-10-29 staging, lỗi giả lập trong trang (ép HTTP 500 hoặc status 3), không phải lỗi thật từ provider. (CCR cũ: CBS-022 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - **RQ3:** B (not A). If the source's own effect fails, the source shows its own error and the {{output}} option stays empty — it never starts, so no extra error on it.
  ```
