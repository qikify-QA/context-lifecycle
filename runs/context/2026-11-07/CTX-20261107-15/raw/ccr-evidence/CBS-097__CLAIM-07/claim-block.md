### CLAIM-07

- **Statement:** Thứ tự sau khi thả trong tab Re-order được lưu bền: Save rồi mở lại editor thì tab Re-order hiện đúng thứ tự ngay sau khi thả, và thứ tự đọc qua GraphQL khớp.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-08 "Order survives Save + reload" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Liên quan, không thay: KB-050, KB-053. (CCR cũ: CBS-033 CLAIM-04)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-08): On-screen order after reload == the order right after the drop in TC-01; GraphQL field order matches.
  TC-08 | ✅ AI — Order survives Save + reload | dom right after drop = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15<br>dom after reload = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15; graphql = F01,F02,F06,F07,F08,F09,F10,F11,F03,F04,F05,F12,F13,F14,F15
  ```
