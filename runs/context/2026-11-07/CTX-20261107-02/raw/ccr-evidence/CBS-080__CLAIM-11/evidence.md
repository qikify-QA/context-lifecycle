# CBS-080__CLAIM-11

Bậc: S3

Đánh giá: CCR ghi QA, audit không ghi tên; agent đọc Jira tìm thấy câu gốc của dev tinhpt ở #55715 mục 4, so khớp từng chữ. S3 cho đúng vế này. CCR gộp 9 dòng audit, plan tách CLAIM-21..27.

Nguồn: Jira TIB-5334 comment #55715, tinhpt (dev), 2026-10-27
Link: https://ownego.atlassian.net/browse/TIB-5334?focusedCommentId=55715
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

The login uses the default org only if the Staff's access to it is approved. Otherwise it falls back to the first other org where the Staff is approved. If there is none, it's rejected with oauth_failed. invite_pending only shows when the Staff has never accepted any invite (no default org at all). If the default org is merely pending, it falls back or gets oauth_failed.
