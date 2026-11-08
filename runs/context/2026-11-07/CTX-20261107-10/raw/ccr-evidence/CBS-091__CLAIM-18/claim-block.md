# CBS-091 CLAIM-18 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-18

- **Statement:** Effect của nguồn được gửi trong một field riêng cạnh effect riêng của option, server chỉ dùng chúng khi nguồn chưa có kết quả full-size, còn lại bắt đầu từ kết quả của nguồn.
- **Object / feature:** artwork/populate-values (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (storefront client gọi server), api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ11. Bổ trợ: QA-3441 TC-01, 14, 17 ✅ AI 2026-10-29 staging; TC-15 ⏸️, TC-16 chưa chạy. Tên source_effects, source_base=output và đường dẫn derive là thứ QA đọc trong network, dev không nêu tên, chỉ là quan sát, không phải hợp đồng API. (CCR cũ: CBS-022 CLAIM-11)
- **Trích nguyên văn:**
  ```
  - **RQ11:** A, in a separate field. The source's effects are sent next to the option's own effects, and the server uses them only when the source has no full-size result yet; otherwise it starts from the source's result.
  ```
