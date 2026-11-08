# CBS-080__CLAIM-22

Bậc: S3

Đánh giá: Tách từ CLAIM-11. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp.

Nguồn: Jira TIB-5334 comment #55715, tinhpt (dev), 2026-10-27
Link: https://ownego.atlassian.net/browse/TIB-5334?focusedCommentId=55715
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

Emails are stored lowercase, and the Google email is lowercased before matching. Otherwise it's an exact match: no trimming, and Gmail dots and +alias are not normalized. So a Gmail with dots (first.last) does not match a Staff stored without them (firstlast) or with an alias (firstlast+shop), all at the same domain. Expected: no_account.
