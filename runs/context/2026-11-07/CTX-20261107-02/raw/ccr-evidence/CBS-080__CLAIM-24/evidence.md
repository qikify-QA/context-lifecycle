# CBS-080__CLAIM-24

Bậc: S3

Đánh giá: Tách từ CLAIM-11. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp. Mặc định 10 và staging có thể khác prod theo cùng câu.

Nguồn: Jira TIB-5334 comment #55715, tinhpt (dev), 2026-10-27
Link: https://ownego.atlassian.net/browse/TIB-5334?focusedCommentId=55715
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

Rate limit: set by GOOGLE_OAUTH_RATE_LIMIT, in requests per minute per IP across /auth/google/redirect and /callback, default 10. One Google login is 2 requests, so the default allows about 5 logins per minute per IP. It has its own bucket, so register and password-reset attempts don't use it up. Staging can use a different value from prod; if testers behind one office IP hit 429s, tell me and I'll raise it there. The 2FA step has its own limit (Fortify's two-factor limiter, 10/min per challenge and IP), same as after a password.
