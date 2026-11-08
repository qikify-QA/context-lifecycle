Jira TIB-5554, comment #54687, chinhdt (dev), created 2026-10-15T17:43:04+07:00, trả lời câu hỏi QA ở #54670 (phuongbb, 2026-10-15). Đối chiếu bằng agent qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

Câu hỏi gốc (#54670): Q10. QA-3403 wanted the server to refuse a deprecated model (4xx). Dev keeps 200 before the migrate date and for an unchanged stored model. Accept the dev behaviour? — QA đề xuất: Accept; QA-3403 TC-20 keeps its 200 expected before 21/10

Trả lời (#54687): ok Q10

Cùng hành vi trong dev notes #54520 (chinhdt, 2026-10-14, sửa 2026-10-15), chỉ là ngữ cảnh: "Saving with the stored model unchanged (even a retired one) works as before." · "Before the migrate date, a retired model can still be selected and saved."
