# CBS-080__CLAIM-18

Bậc: S3

Đánh giá: CCR không ghi tên, dẫn audit A34 ngày 2026-09-09; agent đọc Jira tìm thấy comment #49135 của dev huyenntk ngày 2026-08-27, so khớp từng chữ. authored_on theo comment.

Nguồn: Jira TIB-4938 comment #49135, huyenntk (dev), 2026-08-27
Link: https://ownego.atlassian.net/browse/TIB-4938?focusedCommentId=49135
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

the handler now distinguishes the two — case 1 (manual plan) still works exactly as before; case 2 (usage-charge price) is now recognized and skipped instead of crashing.

Ngữ cảnh cùng comment #49135 (agent đọc trực tiếp Jira 2026-11-07):

A price.created webhook from Paddle can come from two different sources, and our code only handled one of them:
