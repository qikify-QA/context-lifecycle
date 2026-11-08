### CLAIM-14

- **Statement:** Label field dài 5000 ký tự và label có ký tự điều khiển được tạo không lỗi 500, được lưu nguyên độ dài, reorder và Save vẫn chạy, và sau reload danh sách render đủ dòng.
- **Object / feature:** artwork/MỚI: form-field-reorder — Thuộc: tab Re-order của Form panel trong Artwork Editor (chọn dòng, kéo thả một hoặc nhiều dòng, hiển thị label trong danh sách); Không thuộc: chọn layer trên canvas (artwork/editor-layer-workspace, KB-043), kéo thả ở màn hình product-base, thứ tự field trên storefront.
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff, portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (automation Playwright, kết quả [AI]), Jira không tick TC này, 2026-09-17
- **Locator:** QA-3352 TC-20 "Long / control-char field label" trong result_QA-3352_auto_2026-09-17.md; staging, không ghi số build. Con số 5000 chỉ là dữ liệu của một lượt chạy, không phải giá trị chuẩn. (CCR cũ: CBS-033 CLAIM-11)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  Expected (TC-20): No crash, no 500; the label is stored/truncated per the field's own limit; reorder still works; list still renders.
  TC-20 | ✅ AI — Long / control-char field label | label 5000-char → row#3; label control-char → row#4 (creation không 500, xem không throw ở bước trên)<br>saved label lengths sau reorder+save = [3,3,12,5000]<br>sau reload, số hàng field render = 4
  ```
