### CLAIM-05

- **Statement:** Chọn các dòng không liền nhau (thứ tự click khác thứ tự danh sách) rồi kéo thì các dòng gom thành một khối liền tại điểm thả, xếp theo thứ tự gốc trong danh sách, không theo thứ tự click.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-04 "Non-contiguous multi-select, large count" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Bổ trợ: ảnh chụp TC-05 (2026-09-18, ⏸️ chưa tick). Repro gốc của QA trên ticket (2026-08-25) ghi kỳ vọng "9-10-19..." cho selection click 9-10-19-11..18; chưa rõ đó là thứ tự click hay tên dòng, context builder nên đối chiếu. (CCR cũ: CBS-033 CLAIM-02)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-04): Below F07: F09, F10, F11, F12, …, F18, F19 — i.e. the 11 rows in original list order (not click order, so F19 sits after F18, not 3rd). No row from F01–F08 or F20 disturbed. Count 20.
  TC-04 | ✅ AI — Non-contiguous multi-select, large count (missed_cases 190) | click order=F09,F10,F19,F11,F12,F13,F14,F15,F16,F17,F18 selected(list order)=F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19<br>saved=F01,F02,F03,F04,F05,F06,F07,F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19,F08,F20
  ```
