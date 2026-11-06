---
description: Nhặt và xử lý mọi Proposal đang In Progress trên Context Builder Board
---

Chạy `.claude/orchestrator/ccr-intake.md` từ mục 1 cho mọi product ACTIVE, theo đúng thứ tự `queue`. Kết thúc thì báo từng Proposal: outcome, `results.release` đang ở trạng thái nào, và việc còn chờ operator.

Không có Proposal nào ở `in-progress` thì báo vậy rồi dừng.
