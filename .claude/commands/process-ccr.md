---
description: Nhặt và xử lý mọi Proposal đang In Progress trên Context Builder Board
---

Dùng skill `ctx-run`: chạy `references/ccr-intake.md` từ mục 1 cho mọi product ACTIVE, theo đúng thứ tự `queue`. Kết thúc thì báo từng Proposal: outcome, `results.release` đang ở trạng thái nào, và việc còn chờ operator.

Không có Proposal nào ở `in-progress` thì báo vậy rồi dừng.

Trước khi giao Proposal nào cho subagent, session chính kiểm object của mọi claim (`ccr-intake.md` mục 2 bước 2). Proposal cần object mới thì session chính hỏi operator một lượt cho tất cả (subagent không hỏi được operator); Proposal chưa được trả lời thì bỏ qua lượt này và báo là "chờ duyệt object mới".

Mỗi Proposal có claim chạy tuần tự, một run một lần, trong một subagent mới với context độc lập; không truyền lịch sử Proposal trước. Nếu không spawn được subagent độc lập, dừng ở ranh giới run và báo operator mở phiên tiếp, ghi checkpoint queue/outcome dưới `runs/`.
