# CBS-090 CLAIM-02

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Nút disabled khi không dòng nào trong danh sách effect có chọn loại effect (tooltip vẫn là "Applies all effects to the current image and replaces it."); disabled khi ảnh layer chỉ tồn tại trong editor (PSD/Canva import chuyển sang Photo Upload, chưa Save) với tooltip "Save the artwork first to run effects on this image.", Save xong thì enabled; hover = nền primary blue, chữ trắng
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng ok Q2, ok Q7, đồng ý đề xuất trong comment 54545; hover theo spec. Bổ trợ TC-01, TC-04 PASS 2026-10-15. Tooltip PSD chưa thấy trực tiếp (TC-05 tạm dừng) (CCR cũ: CBS-029 CLAIM-03)
- **Trích nguyên văn:**
  ```
  ok Q2  
  ok Q3  
  ok Q5  
  ok Q7
  (dòng Q3, Q5 thuộc CLAIM-06, CLAIM-17)
  Câu hỏi + đề xuất được đồng ý (comment 54545, phuongbb, 2026-10-14):
  - **Q2.** When the button is disabled because no effect is selected, which tooltip shows? — QA đề xuất: Same 'Applies all effects to the current image and replaces it.'
  - **Q7.** Button is disabled for an unsaved PSD/Canva Photo Upload layer with tooltip 'Save the artwork first to run effects on this image.' — not in the spec. PO accepts? — QA đề xuất: Accept — an unsaved image has no server file to run on
  Spec (description, Run effects): "Disabled (grayed out) when no effect is configured yet … Hover: existing primary blue background with white text."
  ```
