# CBS-080__CLAIM-32

Bậc: S3

Đánh giá: Tách từ CLAIM-06. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp.

Nguồn: Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28
Link: https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

no token, or a revoked token: 401; token missing the assets:* permission: 403; another account's id in the URL: 404 {"message":"Not found."}; another account's category_id / parent_id in the body: 422; daily limit reached: 429, with the portal's message (the 60 requests/minute limit also returns 429). Accept: application/json is required. Without it, errors come back as redirects or HTML (no token gives a 302 to login instead of 401).
