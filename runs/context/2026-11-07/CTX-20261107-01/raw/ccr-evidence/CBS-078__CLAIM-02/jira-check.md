Đối chiếu do agent (orchestrator) đọc trực tiếp Jira bằng listJiraIssueComments ngày 2026-11-07, so khớp từng chữ với trích dẫn của CCR sau khi bỏ thẻ định dạng. Không có người mở link (quyết định operator 2026-11-07 tính đây là đã đối chiếu).

Jira TIB-5536 comment #55888, huyenntk (dev), tạo 2026-10-28 17:07 +07, không sửa (updated = created). Trả lời comment #55865 của QA, mục 3. Nguyên văn:
The 300 cap is not new. The portal has had it since 2025: manual upload, SVG upload and the zip bulk upload. Admins can raise it per merchant. The Open API applies the same check, only when adding a clipart.

Khớp từng chữ với CCR 5.1.

Jira TIB-5536 comment #55962, huyenntk (dev), tạo 2026-10-29 12:10 +07, không sửa. Trả lời comment #55959 của QA. Nguyên văn:
The cap can be set in admin panel at /admin/users/{id}/edit: Admin → Users → edit user 64 → "Config". Add "clipart_max_per_category": 5 to the existing JSON

POST /cliparts: 422 on category_id with the portal's message: "The category allows up to 5 items". It's checked before the file is read, so the upload_id isn't used up and nothing counts toward the daily limit. on_duplicate: replace still works on a full category because it adds nothing.

Zip bulk upload: it always creates new categories from the zip's folders (optionally under parent_category_id); it can't upload into an existing category. The cap applies to each new category, so it can be tested with one folder holding more files than the cap. The upload is accepted, the extra files are skipped, each with a line in logs like Failed - <path> - The category allows up to 5 items, and the bulk upload ends as done. Same as the portal's bulk upload.

Hai đoạn sau khớp từng chữ với CCR 5.1; đoạn đầu (Phần 2b) CCR chỉ tóm tắt, ở đây chép nguyên văn.

Jira TIB-5536 comment #55788, huyenntk (dev), tạo 2026-10-28 09:46 +07, sửa 11:56: "Each category holds at most 300 cliparts."

Jira TIB-5544 comment #54218, tinhpt, tạo 2026-10-12 15:08 +07, mục 5: "Clipart: upload when the category is at its clipart limit. The limit error is still shown."

Ngữ cảnh ship: TIB-5536 comment #56126 (trangdh, 2026-10-30) dẫn Slack "Đầu giờ chiều deploy mấy issue này", không nêu môi trường. shipped giữ UNKNOWN.
