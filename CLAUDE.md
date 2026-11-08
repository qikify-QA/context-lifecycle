# CLAUDE.md

Repo sản xuất canonical QA context cho nhiều product. Đọc theo thứ tự:

1. `contracts/qa-context-contract.md` — luật (kèm `ccr-protocol.md`, `supersede.md`, `gates.md`, `forbidden-fields.json`).
2. Chỉ orchestrator: `.claude/agents/otto.md` và đúng file mode trong `.claude/orchestrator/`. Worker chuyên môn đọc agent definition của mình, không đọc Otto.
3. `config/products/<key>.json` + `config/products/<key>/explore-playbook.md` — khác biệt giữa các product (login, account, vocabulary). Tổng quan và setup của project nằm ở `knowledge/products/<key>/_product-guide.md`, cập nhật theo mỗi lần publish knowledge (`.claude/orchestrator/publish.md` §3); qikfiliate và teeinblue đã có guide, product khác chưa. Playbook của teeinblue vẫn giữ login và vocabulary vì explorer đọc theo số mục.
4. `DECISIONS.md` — chỉ tra section liên quan khi cần hiểu lý do luật hoặc legacy debt, không đọc toàn bộ mặc định.

## Quy tắc vận hành

- Mỗi luật chỉ nằm ở một file. Sửa luật thì sửa đúng file đó; agent definition trỏ tới § của contract, không chép lại.
- Agent definition không chứa kiến thức riêng của product — đặt nó vào config hoặc playbook của product.
- Việc tất định (run-id, lock, đóng băng doc, strip, audit, publish) dùng script trong `scripts/ctx/`, không làm tay. `npm test` sau khi sửa script.
- Không ghi `knowledge/` ngoài `scripts/ctx/publish-apply.mjs`, trừ CCR không có claim (`.claude/orchestrator/ccr-intake.md` §2b). Phát hành sang `qa-knowledge` chỉ qua PR (`publish-knowledge.mjs --pr`) và chỉ khi operator đồng ý; không bao giờ push thẳng hay ghi đè tag.
- Không tự tạo/comment issue Jira hay nhắn kênh ngoài để "escalate" conflict — hỏi operator trước.
- MCP server của QA Hub theo product nằm ở `qa_hub.mcp_server` — hiện mọi product dùng `testlane` (QA Hub production; tên cũ `qa-hub-production` là cùng một hệ thống, chốt 2026-10-31). Không có server tên `qa-hub`. Trigger CCR là Proposal được kéo sang In Progress trên QA Hub.
- Explore product có `explore.account_guard`: xác minh account là bước đầu tiên, và sau mỗi lần login lại.
- Không commit `.mcp.json` khi nó còn chứa token.
- Orchestrator chạy nền có thể treo lâu mà không báo; kiểm mtime file trong thư mục run thay vì chỉ chờ notification.
