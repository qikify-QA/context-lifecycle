# CBS-091 CLAIM-16 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-16

- **Statement:** Effect riêng của option chained lỗi thì lỗi và nút Try again hiện trên option nguồn, Add to Cart vẫn bị chặn.
- **Object / feature:** artwork/populate-values (liên quan: sdk, order)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront), storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ3 (câu 3). Bổ trợ: QA-3441 TC-46, TC-58 ✅ AI 2026-10-29 staging, lỗi giả lập trong trang. Phần Add to Cart bị chặn khi lỗi chưa được test riêng. (CCR cũ: CBS-022 CLAIM-09)
- **Trích nguyên văn:**
  ```
  If the option's own effect fails, the error + Try again show on the source option, and Add to Cart stays blocked.
  ```
