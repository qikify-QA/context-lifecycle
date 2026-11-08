# CBS-080__CLAIM-23

Bậc: S1 (known_defect, hạ ở review vòng 1: lỗ hổng có follow-up riêng TIB-5644, không có lời xác nhận stateless là chủ đích)

Đánh giá: Tách từ CLAIM-11. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp. Đúng tại 2026-10-27; Jira TIB-5644 (kiểm state) đang QA Review lúc đọc 2026-11-07, xem OQ.

Nguồn: Jira TIB-5334 comment #55715, tinhpt (dev), 2026-10-27
Link: https://ownego.atlassian.net/browse/TIB-5334?focusedCommentId=55715
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

OAuth state: not validated today. The flow runs in Socialite's stateless mode, so a wrong or missing state is ignored and the login goes ahead.
