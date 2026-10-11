# Orchestrator — mode explore

Áp cho `ZERO_DOC_BOOTSTRAP`, `BROAD_BOOTSTRAP`, `REFRESH`, `RECONCILE`. Product phải có `modes.explore_enabled: true`; chỉ dispatch explorer có trong `modes.allowed_explorers` và có surface `enabled` trong `explore.surfaces`.

Khi brief explorer runtime, luôn đưa: đường dẫn playbook (`explore.playbook`), `explore.account_guard`, và yêu cầu **xác minh account là bước đầu tiên**.

| # | Bước | Điều kiện |
|---|---|---|
| 1 | `qa-context-scope-planner` | CHỈ `BROAD_BOOTSTRAP` (truyền `locked_objects[]`); `ZERO_DOC_BOOTSTRAP` với object cụ thể thì bỏ qua, vào explore ngay |
| 2 | `portal-explorer` | khi surface portal bật; ở `REFRESH`/`RECONCILE` chỉ feature được giao |
| 2b | `db-explorer` (state-delta) | CHỈ khi `explore.surfaces.db.enabled` và có read-only access; chạy xen kẽ với bước 2 — báo db trước/sau mỗi action mutation được chọn |
| 3 | gate **C1** | FAIL → retry portal-explorer đúng phần thiếu |
| 4 | `api-explorer` (runtime-trace) | sau portal capture |
| 5 | `storefront-explorer` | CHỈ khi feature portal có buyer-facing effect — nêu rõ feature nào, ảnh hưởng gì, `ACT-ID` nào cần theo dõi |
| 6 | `code-config-explorer` | CHỈ khi có câu hỏi cụ thể + repo + revision |
| 7 | gate **C2** | |
| 8 | `qa-knowledge-normalizer` mode `from-observation` | → C3; run có base thì carry-forward |
| 9 | `feature-profile-builder` | → C4 |
| 10 | `qa-checklist-builder` | → C5 |
| 11 | `knowledge-diff-analyzer` | CHỈ khi object đã có base (re-bootstrap, `REFRESH`, `RECONCILE`); bootstrap lần đầu thì không spawn |
| 12 | publish | `.claude/orchestrator/publish.md` |

`RECONCILE`: mục tiêu là các `conflict_group` đang mở; explore hẹp đúng hai phía của conflict và không tự đóng conflict — kết quả vẫn qua diff + reviewer.
