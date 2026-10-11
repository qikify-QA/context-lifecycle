# CLAUDE.md

Repo sản xuất canonical QA context cho nhiều product. Đọc theo thứ tự:

1. `contracts/qa-context-contract.md` — luật (kèm `ccr-protocol.md`, `supersede.md`, `gates.md`, `forbidden-fields.json`).
2. `.claude/agents/qa-context-lifecycle-orchestrator.md` — điều phối; chi tiết theo mode ở `.claude/orchestrator/`.
3. `config/products/<key>.json` + `config/products/<key>/explore-playbook.md` — khác biệt giữa các product (login, account, vocabulary).
4. `DECISIONS.md` — vì sao luật tồn tại, vi phạm tồn đọng đã biết.

## Quy tắc vận hành

- Mỗi luật chỉ nằm ở một file. Sửa luật thì sửa đúng file đó; agent definition trỏ tới § của contract, không chép lại.
- Agent definition không chứa kiến thức riêng của product — đặt nó vào config hoặc playbook của product.
- Việc tất định (run-id, lock, đóng băng doc, strip, audit, publish) dùng script trong `scripts/ctx/`, không làm tay. `npm test` sau khi sửa script.
- Không ghi `knowledge/` ngoài `scripts/ctx/publish-apply.mjs`. Không `publish-knowledge.mjs --push` khi operator chưa đồng ý.
- Không tự tạo/comment issue Jira hay nhắn kênh ngoài để "escalate" conflict — hỏi operator trước.
- MCP server của QA Hub theo product nằm ở `qa_hub.mcp_server` (vd `qa-hub-production`, `testlane`); không có server tên `qa-hub`. Trigger CCR là Proposal được kéo sang In Progress trên QA Hub.
- Explore product có `explore.account_guard`: xác minh account là bước đầu tiên, và sau mỗi lần login lại.
- Không commit `.mcp.json` khi nó còn chứa token.
- Orchestrator chạy nền có thể treo lâu mà không báo; kiểm mtime file trong thư mục run thay vì chỉ chờ notification.
