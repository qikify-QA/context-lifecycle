# CBS-080__CLAIM-37

Bậc: S3

Đánh giá: Tách từ CLAIM-06. S3 po_dev_confirm: dev phát biểu nguyên văn, có ngày, ticket. Agent đọc trực tiếp Jira 2026-11-07, so khớp từng chữ, tác giả và ngày khớp.

Nguồn: Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28
Link: https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

There's no reset.

Ngữ cảnh cùng comment #55888, mục 9 (agent đọc trực tiếp Jira 2026-11-07):

Daily limits are the same as the portal: 1,000 layer images, 4,000 cliparts and 1,000 clipart categories per 24 h from the first upload. The counters are shared with the portal. There's no reset.

Câu hỏi mà đoạn trên trả lời, theo bản ghi đối chiếu của agent đọc trực tiếp Jira 2026-11-07 khi xử lý CBS-078: comment #55865 của QA, mục 9: "What are the daily limits on staging (same as production?), and is there a way to reset them for testing?"

Câu ngay sau trong comment #55888:

To test 429, lower the merchant's "… max attempts" in the admin panel (e.g. to 2), then put it back.
