---
description: Nhặt và xử lý mọi Proposal đang In Progress trên Context Builder Board
---

Dùng skill `ctx-run`: chạy `references/ccr-intake.md` từ mục 1 cho mọi product ACTIVE, theo đúng thứ tự `queue`. Kết thúc thì báo từng Proposal: outcome, `results.release` đang ở trạng thái nào, và việc còn chờ operator.

Không có Proposal nào ở `in-progress` thì báo vậy rồi dừng.

Mỗi Proposal có claim chạy tuần tự, một run một lần, trong một subagent mới với context độc lập; không truyền lịch sử Proposal trước. Nếu không spawn được subagent độc lập, dừng ở ranh giới run và báo operator mở phiên tiếp, ghi checkpoint queue/outcome dưới `runs/`.
