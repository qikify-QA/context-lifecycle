# QA Context Lifecycle

Repo này **sản xuất** canonical QA context cho team — Product KB, Feature Profile, Regression Checklist và Feature Summary — có evidence, có version, có ghi rõ độ tin cậy, cho nhiều product (`config/products/`). Nó không chạy test; việc test hằng ngày thuộc về daily test agent của từng QA member.

```
  repo này (chỉ owner ghi)                        team
  ┌──────────────────────────────┐
  │ explore / tài liệu / CCR     │
  │  → Product KB                │   publish    ┌────────────────────────┐
  │  → Feature Profile           │ ──────────►  │ qikify-QA/qa-knowledge │ ──► daily test agent
  │  → Checklist                 │              │  (read-only)           │     của từng member
  │  → review độc lập            │              └────────────────────────┘
  └──────────────────────────────┘                                              │
             ▲    CCR: Submit trên QA Hub → kéo Proposal sang In Progress        │
             └───────────────────────────────────────────────────────────────────┘
```

QA member dùng context: đọc [`contracts/consumer-guide.md`](contracts/consumer-guide.md) (được phát hành kèm repo knowledge ở `how-to-request/`). Phần còn lại của file này dành cho owner.

## Cài đặt

```bash
git clone --recurse-submodules https://github.com/qikify-QA/context-lifecycle.git
# đã clone rồi: git submodule update --init knowledge
npm install
```

`knowledge/` là git submodule trỏ tới `qikify-QA/qa-knowledge`. Credential staging của product explore nằm trong `.env` (tên biến ở `config/products/<key>.json` → `credentials`).

## Lệnh thường dùng

```bash
npm test                   # test các script tất định (scripts/ctx/)
npm run ops-board          # bảng theo dõi run + view "Context health": http://127.0.0.1:4177
npm run health             # sức khoẻ context theo product/object (tính từ knowledge/, không ghi file)
npm run products           # product ACTIVE + MCP server + playbook
npm run portal-auth        # login portal staging (teeinblue), ghi playwright/.auth/owner.json
npm run manifest           # sinh knowledge/manifest.json
npm run manifest:check     # chỉ kiểm, exit 1 nếu có object chưa publish
npm run appendix           # sinh lại bảng product trong contracts/ccr-product-appendix.md
npm run publish:dry        # kiểm gói publish, KHÔNG đẩy
npm run prune              # liệt kê run đủ điều kiện xoá (§15)
node scripts/publish-knowledge.mjs --pr --run CTX-...   # nhánh publish + PR vào qa-knowledge
node scripts/publish-knowledge.mjs --tag                # sau khi PR merge: tag ctx-YYYY-MM-DD[-n]
```

Việc của orchestrator trong một run (run-id, lock, đóng băng doc, strip, audit, publish) đều là script trong `scripts/ctx/` — xem bảng ở `.claude/agents/qa-context-lifecycle-orchestrator.md`.

## Đọc gì trước

1. [`contracts/qa-context-contract.md`](contracts/qa-context-contract.md) — luật hiện hành, kèm `ccr-protocol.md`, `supersede.md`, `gates.md`.
2. [`DECISIONS.md`](DECISIONS.md) — **vì sao** mỗi luật tồn tại, và các vi phạm tồn đọng đã biết. Đọc trước khi nới hoặc bỏ một luật.
3. `config/products/<key>.json` + `config/products/<key>/explore-playbook.md` — mọi khác biệt giữa các product.

## Quy tắc không được phá

- **Chỉ `qa-context-lifecycle-orchestrator` ghi `knowledge/`**, qua `scripts/ctx/publish-apply.mjs`, chỉ sau khi reviewer cho phép và lock còn thuộc run. Subagent ghi vào `runs/context/<date>/<CTX-RUN-ID>/`.
- **`knowledge/` tự chứa hoàn toàn (§5a).** Không field nào trỏ vào `runs/`, tài liệu dev hay thư mục ngoài gói publish.
- **Đừng xoá `runs/` tuỳ ý** — chỉ qua `npm run prune`, vì evidence gốc cần cho open question chưa giải quyết (§15).
- **Không biến `OBSERVED_CURRENT` thành `CONFIRMED_EXPECTED`** nếu không có nguồn thẩm quyền.
- **Không tự resolve conflict** — trừ supersede tất định ở product cho phép (§12.5).

## Thêm một product

1. Copy `config/products/_template.json` → `config/products/<key>.json`, để `status: ONBOARDING`, điền `qa_hub` (xác minh `project_id` bằng `list_projects`).
2. Product explore: viết `config/products/<key>/explore-playbook.md` từ `config/products/_template/explore-playbook.md`, điền khối `explore`, `credentials`, `environments`, bật `modes.explore_enabled` và `allowed_explorers`.
3. Chạy bootstrap đầu tiên (`ZERO_DOC_BOOTSTRAP` cho một object, hoặc `DOC_BOOTSTRAP`), rồi chuyển `status: ACTIVE` và `npm run appendix`.

`loadProducts()` validate mọi config ACTIVE theo `config/products/_schema.json` — config sai là script dừng.

## Cấu trúc

```
.claude/agents/          13 agent: orchestrator + planner + 6 explorer + normalizer + 2 builder + diff + reviewer
.claude/orchestrator/    điều phối theo mode + nhận CCR + publish (orchestrator đọc khi cần)
contracts/               contract, CCR protocol, supersede, gates, forbidden-fields.json, templates, tài liệu cho consumer
config/products/         config + schema + explore playbook theo product
scripts/                 manifest, publish, prune, sync-appendix
scripts/ctx/             script tất định của một run + test
ops-board/               bảng theo dõi run (local)
tools/portal-auth/       Playwright login helper cho explorer
inputs/                  file CCR chạy tay, bootstrap-request soạn sẵn
runs/context/            evidence + artifact từng run
runs/_archive/           artifact cũ không còn dùng (daily QA, KCP, sự cố 2026-09-10)
knowledge/               submodule qa-knowledge (chỉ orchestrator ghi)
docs-input/              tài liệu dev chưa redact (gitignore)
```
