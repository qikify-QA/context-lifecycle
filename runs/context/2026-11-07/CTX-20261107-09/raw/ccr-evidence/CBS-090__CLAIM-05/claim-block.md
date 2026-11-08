# CBS-090 CLAIM-05

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Chạy thành công thì HD tắt cho layer đó (bật lại HD thì dựng HD từ ảnh đã xử lý) và artwork không tự lưu: reload không Save → ảnh cũ; Save rồi reload → giữ ảnh đã xử lý
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng ok Q3, đồng ý câu Q3 trong comment 54545; chữ HD và không auto-save theo dev doc 2026-10-08. Bổ trợ TC-08 PASS 2026-10-15. "Bật lại HD dựng từ ảnh đã xử lý" chưa quan sát được (TC-09 tạm dừng), không đề xuất về phần này (CCR cũ: CBS-029 CLAIM-06)
- **Trích nguyên văn:**
  ```
  ok Q3
  Câu hỏi + đề xuất được đồng ý (comment 54545, phuongbb, 2026-10-14):
  - **Q3.** PO OK that a successful run switches HD off for the layer and does not auto-save the artwork (reload without Save loses the result)? — QA đề xuất: Yes, as implemented by dev
  Dev doc 2026-10-08: "HD is switched off for that layer. Turning HD back on builds the HD version from the processed image." · "The artwork is **not saved automatically**; the seller must click Save."
  ```
