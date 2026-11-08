### CLAIM-04

- **Statement:** Trong tab Re-order của Form panel, chọn nhiều dòng liền nhau (kể cả selection lớn vắt qua dòng thứ 10) rồi kéo thả thì đúng các dòng đã chọn di chuyển thành một khối ngay dưới dòng đích, giữ thứ tự tương đối, không dòng nào rớt lại, không dòng nào không chọn bị kéo theo, tổng số dòng không đổi.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), tick ✅ trên bảng TC Jira QA-3352, 2026-09-28
- **Locator:** QA-3352 (QA Hub task TIB-079) TC-03 "Large contiguous selection (≥10 rows)" trong result_QA-3352_auto_2026-09-28.md, staging, không ghi số build portal; chạy sau khi TIB-5354 Done 2026-09-23. Bổ trợ: ảnh chụp TC-16 (2026-09-18, ⏸️ chưa tick). Mỗi TC chạy 1 lượt PASS, chưa lặp 3–5 lần như dev gợi ý; bug gốc ngẫu nhiên theo index. (CCR cũ: CBS-033 CLAIM-01)
- **Căn cứ expected:** Jira TIB-5354 dev summary (tuanva, comment 2026-09-07, mô tả kỹ thuật dev tự viết): "Sau: cả cụm đã chọn được đưa đúng về vị trí thả, giữ nguyên thứ tự tương đối, không rớt dòng nào."
- **Trích nguyên văn:**
  ```
  Expected (TC-03): Saved order: F01,F02,F15,F16,F17,F18,F03,F04,…,F14,F19,F20. 12 rows moved as one block after F18, original order kept.
  TC-03 | ✅ AI — Large contiguous selection (≥10 rows) | selected after plain-click F03..F14 = ["F03","F04","F05","F06","F07","F08","F09","F10","F11","F12","F13","F14"]<br>before=F01,F02,F03,F04,F05,F06,F07,F08,F09,F10,F11,F12,F13,F14,F15,F16,F17,F18,F19,F20 saved=F01,F02,F15,F16,F17,F18,F03,F04,F05,F06,F07,F08,F09,F10,F11,F12,F13,F14,F19,F20
  Ngữ cảnh (dev summary, tuanva, Jira TIB-5354 comment 2026-09-07 — mô tả kỹ thuật dev tự viết, không phải nguồn của claim):
  - Sau: cả cụm đã chọn được đưa đúng về vị trí thả, giữ nguyên thứ tự tương đối, không rớt dòng nào.
  ```
