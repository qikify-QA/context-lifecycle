Đối chiếu do agent (orchestrator) đọc trực tiếp Jira bằng listJiraIssueComments ngày 2026-11-07, so khớp từng chữ với trích dẫn của CCR sau khi bỏ thẻ định dạng. Không có người mở link (quyết định operator 2026-11-07 tính đây là đã đối chiếu).

Jira TIB-5536 comment #55888, huyenntk (dev), tạo 2026-10-28 17:07 +07, không sửa. Trả lời comment #55865 của QA, mục 9 ("What are the daily limits on staging (same as production?), and is there a way to reset them for testing?"). Nguyên văn:
Daily limits are the same as the portal: 1,000 layer images, 4,000 cliparts and 1,000 clipart categories per 24 h from the first upload. The counters are shared with the portal. There's no reset. To test 429, lower the merchant's "… max attempts" in the admin panel (e.g. to 2), then put it back.

Khớp từng chữ với CCR 5.1.

Jira TIB-5536 comment #55788, huyenntk (dev): "Uploads from the portal and the Open API count toward one daily total."
