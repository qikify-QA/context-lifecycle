---
description: Nhặt và xử lý mọi Proposal đang In Progress trên Context Builder Board
---

Chạy `.claude/orchestrator/ccr-intake.md` từ mục 1 cho mọi product ACTIVE, theo đúng thứ tự `queue`. Kết thúc thì báo từng Proposal: outcome, `results.release` đang ở trạng thái nào, và việc còn chờ operator.

Không có Proposal nào ở `in-progress` thì báo vậy rồi dừng.

Dispatcher chỉ giữ queue + outcome. Mỗi Proposal có claim chạy bằng một worker `otto` mới với context độc lập theo `contracts/context-execution.md`; không truyền lịch sử Proposal trước. Chỉ dispatch nếu runtime hỗ trợ worker độc lập; nếu không, checkpoint queue/outcome ra file và dừng ở ranh giới run để operator mở phiên tiếp theo, không coi compaction là context mới. Không tự tạo chat/sidebar mới.
