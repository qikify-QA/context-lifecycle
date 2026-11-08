### CLAIM-24

- **Statement:** Live Preview trong Portal artwork editor dùng teeinblue-sdk qua git submodule teeinblue-portal/src/sdk, nên chỉ có fix TIB-5412 sau khi submodule được bump riêng.
- **Object / feature:** artwork/editor-layer-workspace (liên quan: sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (Live Preview); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (chauptm) viết, không ai xác nhận, 2026-09-23
- **Locator:** Jira TIB-5412 comment 51755 mục Notes, gạch đầu dòng 2. Đã bump chưa: không rõ (Q1 không có trả lời); không đề xuất "đã có fix" hay "chưa có". QA Hub TC-13 ở passed, không ghi SHA submodule, không kết quả. (CCR cũ: CBS-032 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - `teeinblue-portal/src/sdk` is a git submodule pointing to `teeinblue-sdk`; its submodule pointer needs to be bumped separately after this PR merges so the portal's live preview picks up the fix.
  ```
