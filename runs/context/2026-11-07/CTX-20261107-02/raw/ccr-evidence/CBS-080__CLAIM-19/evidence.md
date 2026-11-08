# CBS-080__CLAIM-19

Bậc: S3

Đánh giá: Tách từ CLAIM-01. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp.

Nguồn: Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28
Link: https://ownego.atlassian.net/browse/TIB-5628?focusedCommentId=55801
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

API trả "The provided password was incorrect." (trừ khi mật khẩu thật đúng là các khoảng trắng đó). API không trim mật khẩu, nên khoảng trắng không được coi là rỗng. FE cũng không chặn trường hợp này.
