### CLAIM-06

- **Statement:** Trong tab Re-order, click thường (không giữ phím) vào dòng chưa chọn sẽ thêm dòng đó vào selection, nên nhiều click thường dựng được selection liền nhau hoặc rời rạc.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 TC-03 bước 1 và TC-04 bước 1 (assert selection sau các click thường) trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Không bị thay: KB-043 (selection layer trên canvas). (CCR cũ: CBS-033 CLAIM-03)
- **Căn cứ expected:** KHÔNG CÓ (cơ chế click thường đến từ ghi nhận "Correction 2026-09-09 (Slack)" trong RA, không rõ người xác nhận)
- **Trích nguyên văn:**
  ```
  TC-03 steps: 1. Plain-click F03 through F14 individually (12 rows selected)
  TC-03 evidence: selected after plain-click F03..F14 = ["F03","F04","F05","F06","F07","F08","F09","F10","F11","F12","F13","F14"]
  TC-04 steps: 1. Plain-click (no modifier) F09, F10, F19, F11, F12, F13, F14, F15, F16, F17, F18 in that order
  TC-04 evidence: click order=F09,F10,F19,F11,F12,F13,F14,F15,F16,F17,F18 selected(list order)=F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19
  ```
