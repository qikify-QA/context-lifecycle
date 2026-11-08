# CBS-090 CLAIM-16

Nguồn: Proposal CBS-090 (get_proposal 2026-11-07), khối A.

- **Statement:** Known limitation (không phải expected): chuỗi có cả Remove background và Face cutout vẫn đòi key Remove background dù server bỏ qua Remove background trong chuỗi đó; workaround = xoá effect Remove background. PO chấp nhận cho release này
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08; PO (huyen.chu) ok Q5 2026-10-14 chấp nhận cho release
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing API key check before a run › Known limitation. Known limitation, KHÔNG dùng làm expected: PO chấp nhận để release, không nói đây là hành vi đúng. TC-31 tạm dừng (CCR cũ: CBS-029 CLAIM-17)
- **Trích nguyên văn:**
  ```
  - Known limitation: a chain with both Remove background and Face cutout asks for a Remove background key even though the server skips Remove background in that chain. Deleting the Remove background effect is the workaround.
  PO chấp nhận (comment huyen.chu 2026-10-14): `ok Q5` — với câu hỏi trong comment 54545: "**Q5.** Known limitation: a chain with Remove background + Face cutout asks for a Remove background key although the server skips it. Accept for this release? — QA đề xuất: Accept; workaround = delete the Remove background effect (already disabled with Face Cutout per QA-750)"
  ```
