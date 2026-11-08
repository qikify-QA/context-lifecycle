# CBS-091 CLAIM-13 — block nguyên văn từ Proposal (get_proposal 2026-11-07)

### CLAIM-13

- **Statement:** TIB-5504 chỉ hỗ trợ chain 1 cấp; chain 2 cấp cấu hình được trên portal nhưng không được hỗ trợ, không test và nằm ngoài phạm vi.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** owner/staff (cấu hình portal) và buyer, portal và storefront
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-29
- **Locator:** Jira TIB-5504 comment 56064, dòng RQ2 (trả lời RQ2 trong comment 56063 của QA). TC-56 ⏭️: chain 2 cấp vẫn chạy trên staging nhưng không có nghĩa là được hỗ trợ, không viết expected cho chain nhiều cấp. (CCR cũ: CBS-022 CLAIM-06)
- **Trích nguyên văn:**
  ```
  - **RQ2:** Not designed for it. A 2-level chain can be set up (the portal allows it), but only 1 level is supported and tested. Please test 1 level only; deeper chains are out of scope for TIB-5504.
  ```
