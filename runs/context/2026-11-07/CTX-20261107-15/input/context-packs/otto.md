# Context pack: otto

Mode: CCR_INGEST. Generated from canonical contracts; do not edit.
Read contracts/context-execution.md for dispatch and delta protocol.

Source: contracts/qa-context-contract.md

## 0. Agent runtime protocol

Áp cho mọi agent; agent definition không lặp lại mục này.

- **Thứ tự đọc:** `input/context-packs/<agent>.md` (sinh bằng `context-pack.mjs`, xem `contracts/context-execution.md`) → `run-manifest.json` (mode đã settle) → `input/bootstrap-request.json` → đúng input được giao. Pack trích nguyên văn luật từ nguồn chuẩn, không phải bản tóm tắt thay luật. Chỉ mở thêm section khi task cần, ghi lý do trong handoff.
- **Write root:** chỉ ghi dưới `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>/`, đúng thư mục ghi trong agent definition (§5).
- **Envelope:** mọi artifact bọc trong Artifact Envelope (§1).
- **Shape:** artifact chính có JSON Schema ở `contracts/schemas/` (field bắt buộc + enum; field thêm được phép). Orchestrator chạy `scripts/ctx/validate-run.mjs` sau mỗi bước; luật có điều kiện giữa field (vd `CONFIRMED_EXPECTED` ⇒ có `confirmation_source`) nằm trong script đó.
- **Redaction:** chạy §6 trước khi ghi bất kỳ file nào.
- **Product context:** đọc `config/products/<key>.json`; agent explore đọc thêm playbook khai ở `explore.playbook`. Không suy hành vi product từ hiểu biết chung.
- **Skill binding:** khi một skill tương ứng với vai trò của agent tồn tại, nạp nó và coi nó ưu tiên hơn hướng dẫn trong agent definition. Hiện chưa có skill nào cho các vai trò context builder.
- **Board status:** khi bắt đầu, khi bị chặn và trước handoff, agent trả payload `board_update`:

  ```json
  { "agent_id": "<agent>", "state": "idle|running|blocked|review|done|failed",
    "current_task": "", "inputs": [], "outputs": [], "blocked_by": [], "last_event": "" }
  ```

  `inputs` nêu đúng artifact/target đang dùng, `outputs` nêu path thực tế đã ghi hoặc còn thiếu. Có board API thì `PATCH /api/agents/<agent>`; không có thì trả payload trong response để orchestrator/board ingester cập nhật.
- **Kết thúc:** trả `PARTIAL` thay vì đoán cho đủ; trả `BLOCKED` khi không thể tiếp tục an toàn (§2 rule 5).

## 1. Artifact Envelope

Artifact đầy đủ trên đĩa dùng envelope này. Response handoff chỉ trả receipt ngắn theo `contracts/context-execution.md`, không lặp envelope/payload. `payload` là phần riêng của từng agent.

```json
{
  "schema_version": "1.0",
  "artifact_type": "...",
  "artifact_id": "...",
  "workflow_id": "...",
  "producer": "...",
  "source_refs": [],
  "upstream_artifact_ids": [],
  "status": "READY | PARTIAL | BLOCKED | REJECTED",
  "confidence": "HIGH | MEDIUM | LOW",
  "observations": [],
  "assumptions": [],
  "unknowns": [],
  "conflicts": [],
  "blocking_issues": [],
  "payload": {},
  "gate": {
    "decision": "PASS | CONDITIONAL_PASS | FAIL | NOT_APPLICABLE",
    "blocking_findings": [],
    "conditions": [],
    "allowed_next_steps": []
  }
}
```

`PARTIAL` là kết quả hợp lệ và được khuyến khích hơn việc đoán cho đủ. `BLOCKED` khi không thể tiếp tục an toàn.

**Envelope này chỉ áp dụng cho artifact trong `runs/`.** File đã publish vào `knowledge/` dùng schema riêng, gọn hơn nhiều (§5a).

## 2. Global rules — không có ngoại lệ

1. Không biến `OBSERVED_CURRENT` thành `CONFIRMED_EXPECTED` nếu không có nguồn thẩm quyền (§3).
2. Không tự bịa UI, API contract, DB schema, business rule hoặc expected result.
3. Mọi finding có source/evidence/upstream reference.
4. Không mutation production hoặc shared resource nếu không có explicit policy.
5. Không tự mở rộng scope khi thiếu input; hoàn thành phần an toàn và trả `PARTIAL`/`BLOCKED`.
6. Không tuyên bố PASS/VERIFIED nếu chưa thực hiện verification phù hợp.
7. Mỗi agent chỉ làm responsibility của mình; không sửa artifact upstream âm thầm.
8. Reviewer đưa finding về producer; **reviewer không tự sửa artifact**.

## 5. Write scope

- Subagent CHỈ ghi vào `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>/`, theo thư mục được cấp trong agent definition.
- KHÔNG subagent nào được ghi vào `knowledge/`. Chỉ `otto` publish (`scripts/ctx/publish-apply.mjs`), và CHỈ khi **cả 2** điều kiện đúng: (a) reviewer trả `publish_allowed: true`, **và** (b) lock của mọi object bị ảnh hưởng vẫn thuộc `ctx_run_id` của chính run này (§16). Thiếu (b) → DỪNG, không ghi `knowledge/`, `DEFERRED` + `reason: lock_lost`.
- **Thứ tự bắt buộc: feature-context-builder → `knowledge-diff-analyzer` (khi có base) → publish strip → reviewer → publish.** Publish strip (`scripts/ctx/publish-strip.mjs`) đọc candidate gốc và sinh `candidate/publish-preview/` theo đúng layout `knowledge/products/<product>/` và đúng schema §5a, đồng thời áp `resolution: SUPERSEDE` của diff (§12.5). Preview là bản **y hệt** sẽ được copy vào `knowledge/`. Candidate gốc giữ nguyên envelope/evidence, không bị sửa.
- Sau strip, orchestrator cập nhật file prose trong preview (`feature-summary.md`, `open-questions.md`, `CHANGELOG.md`, `_registry.json`, `_product-guide.md`, `_env.example`). Reviewer chạy C1–C5 trên candidate gốc và C6 trên preview (`scripts/ctx/audit-preview.mjs`). Publish copy nguyên preview sang `knowledge/` (merge: file không có trong preview giữ nguyên), không strip lại.
- Không sửa file của agent khác. Cần dữ liệu bước trước thì đọc, đừng ghi đè.

```text
runs/context/YYYY-MM-DD/<ctx-run-id>/
├── run-manifest.json                               (run_id, product, mode, mode_settled_at, status, source, label, object_target, produced_open_questions[])
├── input/bootstrap-request.json
├── input/scope-plan.json                           (scope-planner; BROAD/DOC — orchestrator ghi thêm FEATURE-ID đã mint)
├── input/ccr-fastpath-plan.json                    (§12.3a, chỉ khi run xuất phát từ CCR)
├── input/approvals.json                            (quyết định của owner cho entry requires_human_decision, §12.5)
├── input/doc-manifest.json                         (mode doc: doc_id/version/generated_at/sha256 từng doc)
├── input/docs/<DOC-ID>/                            (mode doc: bản copy ĐÃ REDACT của tài liệu)
├── raw/{portal,network,storefront}/                (mode explore; RỖNG ở mode doc — đó là invariant)
├── raw/ccr-evidence/<claim_key>/                   (evidence của từng claim CCR — claim_key = <proposal_id>__<CLAIM-nn>)
├── raw/ccr-evidence/_ccr-full-content.md           (toàn văn Proposal đã đóng băng)
├── intermediate/{api,db,code}/
├── intermediate/doc/{<DOC-ID>.json,_docset-index.json}
├── candidate/product-kb/{<feature-key>.json,_object-level.json,_product-level.json}
├── candidate/{feature-profiles/,checklists/}
├── candidate/oq-assignments.json                   (orchestrator: oq_id gắn vào check/unknown_area)
├── candidate/publish-preview/                      (publish strip: layout knowledge/products/<product>/)
├── candidate/strip-summary.json
├── review/knowledge-diff.json                      (knowledge-diff-analyzer, khi có base)
└── review/{gate-results.json,verdict.json}

runs/.locks/<product>__<object-key>.lock            (§16, gitignored, ephemeral)
inputs/ccr-drafts/                                   (file CCR chạy tay)
inputs/bootstrap-drafts/                             (bootstrap-request soạn sẵn)

knowledge/
├── manifest.json                                  (index cho consumer, sinh bằng script)
├── _open-issues/consolidated-open-questions.md    (tổng hợp theo product, chỉ đọc)
└── products/<product-key>/
    ├── _registry.json                     (alias registry, 1 file/product)
    ├── _product-kb.json                   (OPTIONAL — mức product: vocabulary, actor, ranh giới hệ thống)
    ├── _product-summary.md                (OPTIONAL — data flow, bản đồ object/feature mức product)
    ├── _product-guide.md                       (OPTIONAL — tổng quan và setup của project; không chứa rule nghiệp vụ, không liên quan explore)
    ├── _env.example                            (OPTIONAL — danh sách biến env của người test, chỉ tên biến và chú thích, không có giá trị)
    ├── _flows/                                 (OPTIONAL — cách thao tác đã verify theo chủ đề: selector, label, bước; không chứa rule nghiệp vụ)
    └── <object-key>/                      (object nằm TRỰC TIẾP dưới product — không có tầng objects/)
        ├── kb.json                        (mảng JSON phẳng — thuộc tính/luật dùng chung toàn object)
        ├── publish-meta.json              ({published_context_version, published_at, mode})
        ├── feature-summary.md             (trạng thái hiện tại; dòng 2 LUÔN là "**Published context version:** N")
        ├── CHANGELOG.md                   (1 dòng/thay đổi, trỏ ccr_ref)
        ├── open-questions.md              (theo object, có type — §5a)
        ├── features/<feature-key>/{kb.json,profile.json}
        └── checklists/<feature-key>.json
```

**Mọi tên bắt đầu bằng `_` dành riêng cho mức product**, và `object_key` không bao giờ bắt đầu bằng `_`. `scripts/generate-manifest.mjs` bỏ qua mọi entry `_`-prefix khi liệt kê object.

**Ba tầng knowledge, mỗi fact thuộc đúng một tầng:**

| Tầng | Chứa gì |
|---|---|
| **product** (`_product-kb.json`, optional) | vocabulary, actor, ranh giới hệ thống — thứ không object nào sở hữu |
| **object** (`<object-key>/kb.json`) | boundary-set xuyên nhiều sub-type, hạ tầng cross-cutting, định danh object |
| **feature** (`features/<key>/kb.json`) | hành vi theo user goal — phần lớn KB item |

`kb.json` ở mọi tầng LUÔN là một mảng JSON phẳng các KB item. `publish-meta.json` là file duy nhất mang version/ngày publish/mode của object.

## 6. Redaction — chạy TRƯỚC khi ghi file

Redact về `"[REDACTED]"`:

- Header: `authorization`, `cookie`, `set-cookie`, `x-api-key`, và header access token riêng của nền tảng (vd `x-shopify-access-token`).
- Field chứa: `token`, `password`, `secret`, `api_key`, `access_token`, `refresh_token`, `signature`, `hmac`.
- PII: email, số điện thoại, địa chỉ, tên người mua, payment data.

Giữ *shape* (kiểu, có/không có field, độ dài), bỏ giá trị. Không chắc → redact và ghi vào `unknowns`.

**Ngoại lệ: domain dành riêng cho tài liệu KHÔNG redact** — RFC 2606 (`example.com`, `example.org`, `example.net`, `*.example`, `.test`, `.invalid`) và `localhost`. Khi bỏ qua theo ngoại lệ này, ghi vào `coverage_limitations` hoặc `unknowns` cái gì và vì sao.

Evidence còn secret/PII = **block publish**, không phải warning. `scripts/ctx/freeze-docs.mjs` quét pattern còn sót trong tài liệu đã đóng băng và fail-closed.

## 4. Chuỗi định danh

Mode explore (`ZERO_DOC_BOOTSTRAP`, `BROAD_BOOTSTRAP`, `INCREMENTAL_UPDATE`, `REFRESH`, `RECONCILE`):

```text
CTX-RUN-ID -> OBJECT-ID -> FEATURE-ID -> SCN-ID -> ACT-ID
                                            |-> APIOP-ID
                                            |-> DBDELTA-ID
```

Mode doc (`DOC_BOOTSTRAP`, `CCR_INGEST`):

```text
CTX-RUN-ID -> DOCSET-ID -> DOC-ID -> DSEC-ID -> CLAIM-ID
                                        |-> APIOP-ID   (doc-scoped, trace về DSEC-ID)
                                        |-> ENT-ID     (doc-scoped, trace về DSEC-ID)
              (song song) OBJECT-ID -> FEATURE-ID -> CLAIM-ID -> kb_id
```

`CLAIM-ID` là vị trí kiến trúc tương đương `ACT-ID`: đơn vị nhỏ nhất mà KB item trace về, và đơn vị mà gate đếm.

| ID | Do ai sinh | Format | Ví dụ |
|---|---|---|---|
| `CTX-RUN-ID` | orchestrator (`scripts/ctx/new-run.mjs`) | `CTX-<YYYYMMDD>-<nn>` | `CTX-20260909-01` |
| `DU-ID` | scope-planner | `DU-<nnn>` | `DU-001` |
| `OBJECT-ID` | orchestrator | `OBJ-<type>-<slug>` | `OBJ-Order-sample` |
| `FEATURE-ID` | portal-explorer (explore) · orchestrator (mode doc + CCR) | `FEAT-<nn>-<slug>` | `FEAT-01-file-upload` |
| `OBS-ID` | portal-explorer | `OBS-<nnn>` | `OBS-014` |
| `SF-OBS-ID` | storefront-explorer | `SF-OBS-<nnn>` | `SF-OBS-007` |
| `SCN-ID` | portal-explorer | `SCN-<feat>-<nn>` | `SCN-01-02` |
| `ACT-ID` | portal-explorer | `ACT-<scn>-<nnn>` | `ACT-01-02-003` |
| `SF-ACT-ID` | storefront-explorer | `SF-ACT-<nnn>` | `SF-ACT-004` |
| `APIOP-ID` | api-explorer (explore) · doc-ingest-explorer (doc) | `APIOP-<nnn>` · `APIOP-<doc-nn>-<nnn>` | `APIOP-001` · `APIOP-02-001` |
| `ENT-ID` | db-explorer (explore) · doc-ingest-explorer (doc) | `ENT-<nnn>` · `ENT-<doc-nn>-<nnn>` | `ENT-003` · `ENT-02-003` |
| `DBDELTA-ID` | db-explorer | `DB-<act>-<nn>` | `DB-01-02-003-01` |
| `CHK-ID` | feature-context-builder | `CHK-<nnn>` (theo feature) | `CHK-001` |
| `OQ-ID` | orchestrator (lúc compile `open-questions.md`) | `OQ-<object-key>-<nnn>` | `OQ-order-014` |
| `DOCSET-ID` | orchestrator (lúc C0) | `DOCSET-<CTX-RUN-ID>` | `DOCSET-CTX-20260930-01` |
| `DOC-ID` | orchestrator (lúc C0), theo thứ tự `doc_sources[]` | `DOC-<nn>` | `DOC-01` |
| `DSEC-ID` | doc-ingest-explorer | `DSEC-<doc-nn>-<nnn>` | `DSEC-01-014` |
| `CLAIM-ID` | doc-ingest-explorer (`DOC_BOOTSTRAP`) · orchestrator (`CCR_INGEST`) | `CLM-<doc-nn>-<nnn>[a-z]` · `CLAIM-<nn>` | `CLM-01-007`, `CLM-01-007a` (tách claim, giữ số cũ) · `CLAIM-01` |

**`APIOP-ID`/`ENT-ID` ở mode doc PHẢI doc-scoped**, vì nhiều `doc-ingest-explorer` chạy song song, mỗi instance chỉ thấy tài liệu của mình. Mode explore chỉ có một explorer mint chúng nên dùng namespace phẳng.

API và DB evidence BẮT BUỘC map về `ACT-ID` (mode explore) hoặc `DSEC-ID` (mode doc). Danh sách endpoint/table rời rạc không có một trong hai bị gate loại.

`DOC-ID` do orchestrator sinh để khớp 1:1 với index trong `doc_sources[]` — reviewer verify được "mỗi doc source có đúng 1 artifact".

`SCN-ID`, `ACT-ID`, `OBS-ID`, `SF-OBS-ID`, `SF-ACT-ID`, `DBDELTA-ID` là định danh của **quan sát**. Ở `DOC_BOOTSTRAP`/`CCR_INGEST` chúng **KHÔNG được sinh** — sinh ra là gate FAIL. Feature Profile và Checklist ở mode doc để `act_ids: []`.

**Mỗi mode chỉ có đúng một bên mint `FEATURE-ID`.** Mode explore: `portal-explorer` (vì `SCN-ID` nhúng số feature). Mode doc và `CCR_INGEST`: orchestrator mint từ `feature_key` mà scope-planner (hoặc CCR) đề xuất, **trước khi** dispatch agent tiếp theo — `FEAT-<nn>-<slug>` với `nn` là số kế tiếp còn trống của object. Normalizer và feature-context-builder không mint, chỉ dùng lại. `FEATURE-ID` là định danh trong run; định danh ổn định qua các version là `feature_key` (tên thư mục `features/<feature-key>/`) — feature đã có trong base thì giữ nguyên `feature_key` của base.

`DBDELTA-ID` không có tương đương ở mode doc. Tài liệu mô tả hệ quả ghi dữ liệu là một `CLAIM-ID` với `claim_kind: side_effect`.

**Đặt ID mới thì grep cả `knowledge/` và `runs/` trước** — trùng namespace (vd `SEC-` đã có nghĩa "security finding") làm mọi audit grep vừa false-positive vừa che leak thật.

`OQ-ID` ổn định qua thời gian (không đổi số khi resolve mục khác) — dùng cho `run-manifest.json.produced_open_questions[]` (§15) và dòng CHANGELOG "Resolved OQ-xxx".

## 5a. Schema `knowledge/` — tự chứa hoàn toàn

**`knowledge/` sau khi publish không được phụ thuộc vào bất kỳ thư mục, file hay hệ thống nào khác để còn dùng được.** Tài liệu dev, file CCR, Proposal, `runs/`, `inputs/` đều phải **xoá được** mà `knowledge/` vẫn:

1. đọc hiểu được từng KB item (`statement` là phát biểu hoàn chỉnh, không phải con trỏ),
2. quyết được item có dùng làm expected result hay không (`knowledge_kind` + `confidence` + `scope` + `confirmation_source.type`),
3. so được độ mới để supersede lần sau (`confirmation_source.authored_on` + `last_updated.date`),
4. truy được "điều này đến từ đâu" ở mức con người đọc hiểu (`confirmation_source.ref` + `CHANGELOG.md`).

**Phân biệt con trỏ với định danh.** `ccr_ref: "CBS-005"` và `ref: 'Jira PROJ-123, dev doc "Rate limit" §3'` là **định danh nghiệp vụ** — vẫn mang nghĩa khi nguồn đã bị xoá. `path: "input/docs/DOC-01/..."` là **con trỏ** — vô nghĩa ngay khi file biến mất. Định danh được phép; con trỏ thì không, ở mọi field.

**Quy tắc cứng:** không file nào dưới `knowledge/` được chứa key hay đường dẫn trong `contracts/forbidden-fields.json` (`run_id`, `act_id`, `evidence_refs`, `doc_id`, `dsec_id`, `claim_id`, `gate`, … và đường `runs/context`, `input/docs`). Thêm vào đó, không field nào được chứa cú pháp đường dẫn trỏ tới file/thư mục ngoài gói publish. `scripts/ctx/audit-preview.mjs` (Gate C6) và `scripts/publish-knowledge.mjs` cùng đọc danh sách đó — sửa danh sách ở **một** chỗ là file JSON.

Con đường tra cứu ngược được phép chỉ gồm: `last_updated.ccr_ref`, `CHANGELOG.md`, và — chỉ với item `CONFIRMED_EXPECTED` — `confirmation_source` (§3).

**Giá trị hợp lệ của `last_updated.ccr_ref` — đúng 3 quy ước:**

| Giá trị | Khi nào |
|---|---|
| `CBS-<n>` / `CCR-<...>` / `QA-<n>` | Item do một CCR đưa vào hoặc chạm tới |
| `bootstrap` | Item sinh từ bootstrap (không có CCR nào); ngày nằm ở `last_updated.date` |
| `user-annotation` | Item do người thêm tay, không qua CCR cũng không qua bootstrap |

Không dùng `ctx_run_id` trong `ccr_ref` (dạng `bootstrap:CTX-...` là run-id đội mũ `ccr_ref`), cũng không tự bịa hậu tố version (`bootstrap:<object>-v1`).

**Schema KB item** (`kb.json` mọi tầng) — allowlist ở `contracts/forbidden-fields.json` → `published_kb_item_keys`:

```json
{
  "kb_id": "KB-014",
  "topic": "...",
  "statement": "...",
  "knowledge_kind": "CONFIRMED_EXPECTED | OBSERVED_CURRENT | INFERRED | PROPOSED",
  "confidence": "HIGH | MEDIUM | LOW",
  "scope": {"environment": "<environments.default của product>", "role": "...", "surface": "portal", "brand": null},
  "last_updated": {"date": "YYYY-MM-DD", "ccr_ref": "CBS-7"},
  "tags": [],
  "related_kb_ids": ["KB-009"],
  "status": "UNRESOLVED | KNOWN_DEFECT",
  "conflict_group": "CONF-<...>",
  "confirmation_source": { "type": "...", "ref": "...", "authored_on": "YYYY-MM-DD", "derivation": "prose" }
}
```

`scope.environment` lấy từ `config/products/<key>.json` → `environments.default` (`staging` ở product explore, `documented` ở product doc-first). `status`, `conflict_group`, `confirmation_source` chỉ có khi áp dụng.

`scope.brand` optional, `null` = hành vi cốt lõi, đúng cho mọi brand/instance. Đặt giá trị khi claim chỉ đúng cho một instance của một product phục vụ nhiều brand trên cùng codebase. Khi bộ tài liệu nguồn được viết từ một instance, `doc-ingest-explorer` phải chủ động tìm dấu hiệu brand (config key, literal tên brand, "riêng cho brand X").

Conflict giữ 2 statement song song ngay trong `kb.json` (`status: UNRESOLVED`, cùng `conflict_group`) — đủ để hiểu mâu thuẫn mà không cần mở `runs/`.

**`open-questions.md` (theo object)** — mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phải nằm ở đây trước khi publish, mỗi mục có `oq_id` ổn định (§4) và đúng 1 `type`:

| `type` | Khi nào dùng |
|---|---|
| `NEEDS_CONFIRMATION` | KB/checklist item chưa có authority xác nhận (`oracle_strength` NONE/BASELINE) |
| `CONFLICT` | 2 statement mâu thuẫn nhau — ghi cả `side_a`/`side_b` trong entry |
| `OPEN_ISSUE` | Gap khác: unknown_area, known defect, scope chưa rõ, phần chưa explore được |

Entry mẫu: `{"oq_id": "OQ-order-014", "type": "CONFLICT", "feature_id": "order-refund", "summary": "...", "side_a": "...", "side_b": "..."}`.

**Mỗi entry PHẢI bọc trong một khối ```` ```json ````.** Parser (`scripts/lib/open-questions.mjs`) đọc được cả entry không fence, nhưng audit coi entry ngoài fence là BLOCKING — fence là quy ước để người đọc và máy đọc cùng thấy một thứ.

`knowledge/_open-issues/consolidated-open-questions.md` là bản tổng hợp theo product, sinh bởi `generate-manifest.mjs` từ các file object-level — không phải nơi tạo/sửa `oq_id`.

## 5b. Setup và khác biệt môi trường

**Setup** là thông tin mà nếu thiếu, người đã đọc guide vẫn không vào được, không dựng được data, hoặc không chạy được feature. Nó trả lời "cần gì để bắt đầu test", không trả lời "kết quả đúng là gì".

| Loại setup | Nghĩa |
|---|---|
| Truy cập | Credential hoặc cách vào mới. Chỉ ghi tên biến, không ghi giá trị |
| Môi trường | Host, URL, instance đổi |
| Config | Flag hoặc giá trị phải đặt thì feature mới chạy |
| Account / quyền | Cần loại account hoặc role khác |
| Điểm vào | Route, màn hình, menu mới hoặc đổi chỗ |
| Test data | Cách dựng data đổi, hoặc cần fixture mới |
| Phụ thuộc ngoài | Hệ thống bên thứ ba phải kết nối |
| Giới hạn thao tác | Việc mới bị cấm, hoặc có tác dụng phụ khi test |

**Nơi ghi:**

- Cần trước mọi test, hoặc dùng cho nhiều feature → `_product-guide.md`.
- Chỉ một feature cần, gồm mọi config bật/tắt của feature → KB item của feature, hiện ở `entry_points[].precondition` của `profile.json` kèm `kb_refs`.
- Token hoặc biến env mới của một feature → guide giữ tên biến để danh sách env đầy đủ (product có `_env.example` thì thêm cả vào đó), feature ghi cần biến nào.
- Chỉ dùng cho một lần test → test case, không ghi vào knowledge.

Guide, `_env.example` và `_flows/` chỉ ghi tên biến env: không ghi giá trị, id account, id instance, tên store. Store nào dùng cho việc gì thì viết theo tên biến. Account guard và phạm vi store của explorer chỉ nằm ở explore playbook, không áp dụng cho người test hằng ngày.

**Không phải setup:** rule nghiệp vụ, ngưỡng, công thức, thông báo lỗi (KB) · expected result, test condition (checklist) · câu hỏi chưa rõ, conflict (`open-questions.md`) · bug không cản trở việc setup (Testlane) · lịch sử thay đổi (`CHANGELOG.md`). Bug chặn việc dựng data thì có tính, chỉ ghi phần cần biết để đi vòng. Feature mới chỉ đổi hành vi thì không có setup mới, chỉ thêm dòng vào bản đồ feature của guide. Thông tin setup trong guide chưa chắc chắn vẫn ghi, kèm nhãn nguồn hoặc `[?]`.

**Khác biệt môi trường** là việc một feature hoạt động hoặc được test khác nhau giữa môi trường test và production. Mỗi khác biệt là một dòng ở `environment_differences` trong `profile.json` của feature, trace về đúng một KB item:

| `type` | Nghĩa | Khi test trên môi trường test |
|---|---|---|
| `ALTERNATIVE_SETUP` | Cách test khác production | Làm theo `how_to_test` rồi test bình thường |
| `NOT_TESTABLE` | Không chạy được trên môi trường test | Không chạy, verdict `NOT_APPLICABLE`, không tính là `FAIL` |
| `DIFFERENT_VALUE` | Hành vi hoặc giá trị khác production | Test theo giá trị của môi trường test, không dùng giá trị production làm expected |

Guide được giữ bảng index các khác biệt: mỗi dòng chỉ có hạng mục, feature key, `type`, mức (case hay vế). `how_to_test` và mô tả chỉ nằm ở `profile.json`.

KB item của khác biệt: `topic: "environment_difference"`, `tags` chứa `type`, `statement` đúng dạng `[<type>] Môi trường test: ...; Production: ...; Cách test: ...`. `scope.environment` vẫn là `environments.default`. Explorer không vào được production nên không tự kiểm chứng phía production: `knowledge_kind` theo `contracts/ccr-protocol.md` §12.3c.

## 5c. Guide và flow

Áp cho mọi product. Mỗi thông tin chỉ nằm một nơi, chọn theo câu nó trả lời:

| Câu hỏi | Nơi | Không chứa |
|---|---|---|
| Đúng phải là gì? | KB, checklist | Cách thao tác, setup |
| Có gì, ở đâu, test được không? | `_product-guide.md` | Bước, selector, request, expected |
| Làm thế nào? | `_flows/<chủ đề>.md` | Rule nghiệp vụ, giá trị ảnh chụp theo ngày, id |

**`_product-guide.md`** là bản đồ, mọi bước đều đọc, nên ≤ 10 KB. Khuôn: `contracts/templates/product-guide.template.md`.

**`_flows/`** là cách thao tác đã verify, chỉ đọc đúng file theo chủ đề. `README.md` là index. Guide, flow và `_env.example` đổi đi qua khối C của CCR.

**Ai đọc gì:**

| Bước | Đọc |
|---|---|
| Phân tích yêu cầu | Guide, KB của feature |
| Viết test case | Guide, KB, checklist của feature |
| Dựng test data | Guide, `_flows/` theo chủ đề |
| Execute | Guide, checklist, `_flows/` theo chủ đề |
| Verify production | Guide, `_flows/` theo chủ đề |
| Soạn CCR | KB của feature |

## 7. Mutation policy

Đọc `exploration_policy` trong `input/bootstrap-request.json`; mặc định lấy từ `config/products/<key>.json` → `defaults.mutation_policy` (thường `SAFE_REVERSIBLE_ONLY`) và `defaults.forbidden_actions`.

- DỪNG trước action trong `forbidden_actions` (vd `delete`, `publish_live`, `charge`, `send_notification`).
- DỪNG trước action không có đường cleanup rõ ràng.
- `cleanup_required: true` → mọi mutation phải có `cleanup_result`: `DONE` | `FAILED` | `NOT_NEEDED`.
- Không bao giờ tự nới policy. Bị chặn → ghi vào `blocking_issues`, trả về orchestrator.

## 8. Conflict

Hai nguồn evidence mâu thuẫn: GIỮ CẢ HAI trong `conflicts[]`, mỗi phía kèm evidence refs. Không âm thầm chọn phía đúng, không xoá observation cũ. Chỉ orchestrator + reviewer quyết resolution, theo authority policy; ngoại lệ duy nhất là supersede tất định ở `contracts/supersede.md` (§12.5).

## 10. Mode

| Mode | Dùng khi | Explorer dispatch |
|---|---|---|
| `ZERO_DOC_BOOTSTRAP` | Chưa có tài liệu, target là một object rõ ràng. Không spawn scope-planner | ≥1 runtime |
| `BROAD_BOOTSTRAP` | Nhiều object/role/module — scope-planner chạy trước | ≥1 runtime |
| `DOC_BOOTSTRAP` | Có bộ tài liệu nhưng KHÔNG có quyền truy cập runtime. Toàn bộ knowledge đến từ tài liệu. LUÔN spawn scope-planner và `doc-ingest-explorer`; không spawn explorer runtime | **0** |
| `INCREMENTAL_UPDATE` | Chỉ feature/dependency bị ảnh hưởng, và **có explore hẹp thật** | ≥1 |
| `CCR_INGEST` | Object đã publish (có base), CCR mang nguồn `S3`/`S1` (§12.3a). Chuẩn hoá thẳng vào KB, **0 explorer**. Mode mặc định cho CCR | **0** |
| `REFRESH` | Xác minh lại knowledge cũ | ≥1 |
| `RECONCILE` | Xử lý evidence mâu thuẫn | ≥1 |
| `KNOWLEDGE_RESTRUCTURE` | Mode lịch sử: chỉ đổi cấu trúc file `knowledge/`, không đổi nội dung. Không dùng cho run mới | 0 |

Mode được phép của từng product nằm ở `config/products/<key>.json` → `modes.allowed_modes`; explorer được phép ở `modes.allowed_explorers`. Dispatch agent ngoài danh sách là stop condition.

### 10a. Ranh giới giữa các mode — và luật chống gaming

| | `ZERO_DOC_BOOTSTRAP` | `DOC_BOOTSTRAP` | `CCR_INGEST` | `INCREMENTAL_UPDATE` |
|---|---|---|---|---|
| Nguồn sự thật | quan sát runtime | văn bản tài liệu | nguồn trong CCR | quan sát hẹp |
| Base version | không cần | không cần | **bắt buộc có** | bắt buộc có |
| Input chính | `object_target` (URL/ID thật) | `doc_sources[]` | Proposal + `claim_id` | `object_target` |
| Scope-planner | không chạy | **LUÔN** chạy | không | không |
| Explorer được phép | theo `allowed_explorers` | chỉ `doc-ingest-explorer` | không | theo `allowed_explorers`, scope hẹp |
| Phân rã feature | portal nhóm feature + mint `FEATURE-ID` | planner đề xuất `feature_key`, orchestrator mint | CCR khai `feature_key`, orchestrator mint | dùng lại `feature_key` của base |
| `knowledge_kind` mặc định | `OBSERVED_CURRENT` | theo bảng mapping §3 | `CONFIRMED_EXPECTED` khi `S3` | `OBSERVED_CURRENT` |
| `scope.environment` | `environments.default` | `documented` | `environments.default` | `environments.default` |
| Mutation policy | `defaults.mutation_policy` | `NO_MUTATION` | `NO_MUTATION` | `defaults.mutation_policy` |
| Gate C1/C2 | C1/C2 | C1-DOC/C2-DOC | C1-DOC/C2-DOC (biến thể CCR) | C1/C2 |
| `knowledge-diff-analyzer` | chỉ khi object đã có base | chỉ khi object đã có base | **LUÔN** | **LUÔN** |
| Supersede (§12.5) | không | được phép (nếu config bật) | được phép (nếu config bật) | không |
| Carry-forward base | — | khi có base | **có** | **có** |

**Carry-forward base:** ở run có base, normalizer/feature-context-builder xuất shard của feature bị chạm = **toàn bộ** nội dung base (giữ nguyên `kb_id`, `check_id`, `last_updated`) cộng phần thay đổi. Publish copy cả file, nên item vắng khỏi shard là bị xoá khỏi `knowledge/`. Feature không bị chạm không xuất hiện trong candidate và giữ nguyên trong `knowledge/`.

**Mode được đọc DUY NHẤT từ `run-manifest.json.mode`** — giá trị đã settle ở Gate C0.5, kèm `mode_settled_at`. `input/bootstrap-request.json.mode` chỉ là giá trị provisional. Không agent nào suy mode từ artifact trên đĩa. Một run `ZERO_DOC_BOOTSTRAP` có portal capture lỗi **KHÔNG** được tự hạ xuống `DOC_BOOTSTRAP` để đi qua gate — đó là `BLOCKED`. `raw/` rỗng ở mode doc là đúng.

**Mode settling.** Run CCR bắt đầu với `mode: "CCR_INGEST"` provisional. Gate C0.5 chốt: `CCR_INGEST` khi và chỉ khi 0 explorer được dispatch; operator yêu cầu explore cho ≥1 claim → `INCREMENTAL_UPDATE`. Ghi `mode_settled_at: "C0.5"`. Mặc định là **tách, không trộn**: claim `S3` publish ngay, claim `S1` vào KB dạng `OBSERVED_CURRENT`/`LOW` + OQ, claim `S0` không nạp và nêu trong `results.open_questions`. Mode là thô; độ mạnh từng item truy được qua `confirmation_source.type`.

## 13. Phân phối knowledge cho team

Repo này **sản xuất**; repo `qikify-QA/qa-knowledge` là nơi **tiêu thụ** (submodule tại `knowledge/`), chứa `products/**`, `manifest.json`, `_open-issues/` và `how-to-request/`.

- Member chỉ đọc KB, không cần gì từ `runs/`. Quyền ghi bị chặn bằng phân quyền GitHub (member chỉ read).
- `scripts/publish-knowledge.mjs` **không strip** — nó sinh manifest, stage gói publish, quét leak (cùng danh sách §5a) và kiểm `confirmation_source`; `--pr` commit vào nhánh `publish/<date>-<sha>` trong submodule và mở PR vào `qa-knowledge` (body: object đổi, version, CCR, verdict/diff của run); merge PR là bước duyệt. Sau khi merge, `--tag` gắn tag `ctx-YYYY-MM-DD` (trùng ngày thì `-2`, `-3`…) trên `origin/main` — không bao giờ ghi đè tag hay force-push. Strip chỉ xảy ra một lần, ở `publish-strip.mjs`.
- Object thiếu `publish-meta.json` hợp lệ bị đánh `UNPUBLISHED` trong manifest, hoặc script dừng. Không im lặng ship object không rõ version.

## 15. Run retention & pruning

`knowledge/` tự chứa hoàn toàn (§5a), nên giữ run không phải để bảo vệ knowledge — chỉ để team quay lại được evidence gốc khi open question mà run đó để lại chưa được giải quyết.

Một run được phép xoá khi **cả 2** đúng:

1. `run-manifest.json.status` là terminal (`PUBLISHED | BLOCKED | REJECTED | CONFLICT | DEFERRED`). `IN_PROGRESS` và `REWORK_REQUIRED` là trạng thái chưa terminal.
2. Mọi `oq_id` trong `run-manifest.json.produced_open_questions` **không còn** trong `open-questions.md` tương ứng.

Khi một run sau resolve một open question: gỡ entry khỏi `open-questions.md`, thêm 1 dòng vào `CHANGELOG.md` ("Resolved OQ-xxx — ...").

`scripts/prune-runs.mjs` liệt kê run đủ điều kiện; `--delete` xoá chúng. Không ai xoá tay `runs/context/**` mà bỏ qua 2 điều kiện trên. `inputs/` và `runs/_archive/` không nằm trong diện xoá.

## 16. Concurrency lock (object)

Mỗi object bị một run ảnh hưởng được khoá suốt vòng đời run — cơ chế concurrency duy nhất của flow.

- Lock file: `runs/.locks/<product>__<object-key>.lock`, exclusive-create nguyên tử. Thao tác qua `scripts/ctx/lock.mjs acquire|verify|release`.
- Nội dung: `{"proposal_id": "...", "ctx_run_id": "...", "claimed_at": "...", "ttl_seconds": 7200, "pid": ...}`. Hết TTL thì coi như free; run kế tiếp claim lại kèm cảnh báo run trước có thể đã crash.
- Claim mọi object liên quan **trước** C0.5 và trước khi dispatch agent nào; một cái thất bại → release hết, outcome `DEFERRED` + `reason: locked_by_run` ngay, không chờ/polling. Lock không phải mâu thuẫn knowledge nên không bao giờ trả `CONFLICT`.
- Object khác nhau → lock khác nhau → chạy song song bình thường.
- Re-verify ngay trước publish (`publish-apply.mjs` tự làm). Release khi run tới trạng thái terminal.
- Lock global `_manifest` bao bước sinh `knowledge/manifest.json` + `consolidated-open-questions.md` (`publish-apply.mjs` tự làm).
- `qa-context-scope-planner` ở `BROAD_BOOTSTRAP` nhận danh sách object đang bị khoá từ orchestrator và không đề xuất chúng.

Source: contracts/ccr-protocol.md

## 12.1 Kênh

**Trigger duy nhất của luồng tự động:** người gửi (hoặc người phụ trách) kéo card **Proposal** từ `Todo` sang `In Progress` trên tab "Context Builder Board" của QA Hub.

1. **Soạn nháp trên task:** người gửi đính kèm 1 file CCR markdown vào task liên quan trên QA Hub (field CCR). Sửa được nhiều lần trước khi Submit.
2. **Submit → 1 Proposal mới** (id `CBS-<n>`): QA Hub chỉ kiểm file không còn placeholder `<<< ... >>>`, rồi copy nội dung vào Proposal. Proposal **immutable** — sửa file trên task sau đó không đổi Proposal đã tạo. Mỗi task chỉ Submit được **một lần**; sau đó draft bị khoá. Proposal vào cột `Todo`. **Sửa CCR:** Proposal `blocked` (vd sau `NEEDS_INFO`, nhiều conflict hoặc nhiều claim S0) thì thay file bằng `replace_proposal_file`: giữ nguyên id, Proposal về `Todo`, rồi kéo lại sang In Progress. Proposal đã `published`/`completed` không thay file được: tạo Proposal sửa bằng `create_proposal`, mỗi claim bắt buộc ghi `SUPERSEDES`/`CONTRADICTS <kb_id>` để plan có `target_kb_ids` và dedup bắt được bản trùng. Orchestrator coi đó là nội dung mới: mở run mới, không coi là vi phạm, `results` cũ vẫn nằm trong run trước.
3. **Kéo Proposal sang `In Progress`** = sẵn sàng cho orchestrator nhặt. Proposal ở `Todo` không được nhặt.

**Nhặt Proposal — vòng quét multi-product:**

1. `products = activeProducts()` từ `config/products/` (`scripts/lib/product-config.mjs`).
2. Với **mỗi** product, gọi tool của đúng MCP server khai ở `qa_hub.mcp_server` của product đó: `mcp__<mcp_server>__list_context_board_proposals({ status: "in-progress", project_id: <qa_hub.project_id> })`. **Không bao giờ** gọi thiếu `project_id`. Lỗi/401 ở một product → ghi log và tiếp tục product khác.
3. Dựng map `project_id → product_key`. Proposal có `projectId` không nằm trong map → bỏ qua, ghi log, không xử lý.
4. Với mỗi Proposal: `get_proposal({ proposal_id })` → `{ id, projectId, sourceTaskId, filename, status, submittedBy, submittedAt, content, ... }`. `content` là text thô của file CCR tại thời điểm Submit; đọc nó theo cấu trúc mục của khuôn `create-ccr`. `sourceTaskId` chỉ để tham chiếu ngược.
5. **Product trước, object sau:** product đã biết từ `project_id`; `object_key` resolve qua `knowledge/products/<product_key>/_registry.json` của **đúng product đó**. Hai product có thể dùng chung tên object (`order`, `product-base`), nên resolve ngược lại sẽ map sai.
6. Thứ tự thử: `node scripts/ctx/intake.mjs --proposals <file>` xếp theo mức gấp (CCR mục 4.4) rồi `submittedAt`. Claim lock theo object (§16) → mỗi (product, object-set) là một run độc lập. Proposal không đụng cùng object chạy song song; Proposal claim lock sau nhận `DEFERRED` với `results.reason: "locked_by_run"` — **không** phải `CONFLICT`, vì đây không phải mâu thuẫn knowledge.

**1 run = 1 Proposal = 1 product.** CCR chạm nhiều product → `NEEDS_INFO`: "Phần đầu (CCR chạm nhiều product: X, Y — tách thành 1 CCR mỗi product)".

**Chạy tay (không qua board):** đặt file CCR vào `inputs/ccr-drafts/` rồi gọi orchestrator với đường dẫn file. Product lấy từ phần product/object của CCR; object phải khớp đúng một `_registry.json` của một product ACTIVE, không khớp hoặc khớp nhiều → `NEEDS_INFO` "Phần đầu". Run chạy tay không có `proposal_id` thì không gọi tool phản hồi board; kết quả trả trong response của orchestrator.


## 12.2 Triage — 5 kết cục

| Kết cục | Nghĩa | Board status | `results` chứa gì |
|---|---|---|---|
| `ACCEPTED` | Đủ evidence, vào context | `published` | `summary`, `published_context_version`, `product_kb_refs`, `feature_profile_refs`, `checklist_refs`, `feature_summary_refs`, `release` (`{ status: "pending" }`, xem dưới) |
| `NEEDS_INFO` | Thiếu thông tin để quyết | `blocked` | `summary`, `open_questions` (nêu **đúng tên mục** còn thiếu) |
| `CONFLICT` | Mâu thuẫn **nghiệp vụ** với knowledge hiện có | `blocked` | `summary`, `conflicts` (cả hai phía kèm evidence) |
| `REJECTED` | Không vào context | `blocked` | `summary` nêu lý do |
| `DEFERRED` | Đúng nhưng chưa làm bây giờ — gồm cả lý do vận hành | `blocked` | `summary` nêu điều kiện để làm lại, `reason` (bảng dưới) |

Board chỉ có 5 outcome cố định, nên lý do chi tiết đi trong `results.reason` (và field kèm theo):

| `results.reason` | Outcome | Khi nào | Field kèm |
|---|---|---|---|
| `locked_by_run` | `DEFERRED` | object đang bị run khác giữ lock lúc bắt đầu | `held_by: {ctx_run_id, proposal_id}` — kéo Proposal lại sau khi run kia xong |
| `lock_lost` | `DEFERRED` | lock hết hạn/mất trước bước publish | `lock_problems` — chạy lại run |
| `object_has_no_base` | `DEFERRED` | object chưa bootstrap nên chưa ingest CCR được | `action: "bootstrap_required"`, `object`, `scope` — operator mở run bootstrap, xong thì kéo Proposal lại |
| `duplicate_of` | `REJECTED` | **mọi** claim trùng với CCR đang chạy hoặc đã publish (`dedup.mjs`) | `duplicate_of: [{proposal_id, claim_key}]` |
| `awaiting_decision` | `DEFERRED` | cần người quyết (approval, `requires_human_decision`) | `approval_needed: [...]` |

Board status của Proposal có 5 giá trị: `todo` · `in-progress` · `blocked` · `published` · `completed`. Toàn bộ pipeline (kể cả reviewer) chạy trong lúc Proposal ở `in-progress`. Không bao giờ set `published` cho outcome khác `ACCEPTED`.

- `published`: run đã duyệt và đã ghi vào `knowledge/` local. **Chưa** có nghĩa team dùng được.
- `results.release`: mốc phát hành. `{ status: "pending" }` lúc kết thúc run; `{ status: "released", pr, sha, tag }` sau khi PR merge vào `qa-knowledge`. Proposal vẫn ở `published`.
- `completed`: QA đã tự review knowledge sau publish và **tự kéo** sang. Orchestrator không bao giờ set trạng thái này. QA review khi `release.status` đã là `released`, để xem đúng bản team đang dùng.


## 12.3 Gate C0 từ CCR

Gate C0 cần 5 thứ, nhưng **CCR chỉ cung cấp 2**. Ba thứ còn lại là chính sách của bên sở hữu môi trường — người gửi không có cơ sở để quyết và **không được hỏi**:

| C0 cần | Nguồn |
|---|---|
| product | `project_id` của Proposal (§12.1 bước 5); chạy tay thì từ CCR |
| object target | Phần đầu + field "Object / feature" của từng khối, map qua `_registry.json` |
| environment | **Cố định** = `config/products/<key>.json` → `environments.default`. Khác biệt giữa các môi trường đi qua khối B, xem §12.3c |
| role dùng để explore | Orchestrator tự chọn theo `defaults.role` của product; role người gửi là dữ kiện |
| mutation policy | Orchestrator tự áp theo §7 |

Object map sang target qua `_registry.json`.

Trả `NEEDS_INFO` **chỉ** khi không xác định được object, và nêu đúng tên mục (vd "Khối A, CLAIM-02, Object / feature"), không nói chung chung.

Mục không chặn run nhưng quyết định chất lượng đầu ra — trống hoặc "không rõ" thì ghi vào `unknowns`, đừng tự suy:

- Claim không có người xác nhận và không có nguồn thì không bao giờ là `S3`.

**Tương thích ngược:** CCR khuôn cũ (Phần 1a, 2a, 2b, 5.1) vẫn xử lý được: Phần 1a là khối A, 5.1 là block của claim, 2a là khối B. Thiếu cột `Claim ID` → orchestrator tự đặt `CLAIM-01..n` theo thứ tự dòng bảng, `claim_id_source: "positional"`. Thiếu Phần 5.1 → mọi claim về `S1`/`S0`. Thiếu Phần 2a/2b → ghi vào `unknowns`. Không trả `NEEDS_INFO` chỉ vì thiếu cột/mục mới.


## 12.3a Gate C0.5 — CCR Source Strength Assessment

Chạy ngay sau C0 và **sau khi đã khoá lock** (§16), trước khi dispatch bất kỳ agent nào. Đánh giá **từng claim** ở khối A, B, D — từng claim một, không gộp cả CCR.

| Bậc | Nguồn | Hệ quả |
|---|---|---|
| `S3` | Một nguồn `confirmation_source` hợp lệ (§3: `spec_doc` · `dev_doc` · `po_dev_confirm` · `test_case`), có locator + `authored_on` + trích **nguyên văn** trong block của claim, kèm link khi nguồn có link | Normalize thẳng, **0 explorer**, `CONFIRMED_EXPECTED` kèm `confirmation_source`, được supersede (§12.5) |
| `S1` | Ảnh/HAR/API capture do người gửi tự chụp, không kèm nguồn `S3` | Normalize thẳng thành `OBSERVED_CURRENT` + `confidence: LOW` + OQ `NEEDS_CONFIRMATION` trỏ về `kb_id`. **Không explore**, không làm oracle |
| `S0` | Chỉ lời kể, không artifact, không link | Không nạp; nêu trong `results.open_questions` với đúng tên mục. Ngoại lệ: claim khác biệt môi trường, xem §12.3c |

Explore chỉ chạy khi operator yêu cầu tường minh cho một claim — khi đó run thành `INCREMENTAL_UPDATE` (§10a, mode settling).

Nguồn `test_case` còn cần **căn cứ expected** trong block của claim: ticket, comment, spec hoặc câu trả lời PO/Dev mà expected của case dựa vào. Thiếu hoặc ghi `KHÔNG CÓ` thì xếp `S1`, vì PASS chỉ chứng minh hành vi khớp expected, không chứng minh expected đúng. Áp dụng cho CCR theo khuôn có mục này; item đã publish giữ nguyên. `po_dev_confirm` phải là người thật trích nguyên văn có ngày, lời tóm tắt của agent là `S0`.

`authored_by` của nguồn `S3` loại `spec_doc` / `dev_doc` không được trùng người gửi CCR — người gửi không tự làm authority cho chính mình. `po_dev_confirm` không có giới hạn này: PO, Dev hay QA chốt đều tính, kể cả QA là người gửi (chủ repo chốt 2026-11-05). `test_case` là ngoại lệ: nó là record chạy thật trên hệ thống quản lý test (Testlane), không phải ý kiến người viết, nên test case PASS do chính người gửi chạy vẫn là `S3` khi có đủ id test case + kết quả PASS + ngày chạy + build/bản đã test (chủ repo chốt 2026-10-11).

**Kiểm trùng:** sau khi ghi plan, chạy `node scripts/ctx/dedup.mjs --run <id>`. Claim trùng (cùng object, chung `target_kb_ids` hoặc cùng `confirmation_source`) với CCR đang `IN_PROGRESS`/`PUBLISHED` → bỏ claim đó khỏi run và nêu trong `results`; mọi claim đều trùng → `REJECTED` + `reason: duplicate_of`. `covered_by_open_question` chỉ là thông tin, không loại claim.

Với mỗi claim: copy evidence vào `raw/ccr-evidence/<claim_key>/` (`claim_key` = `<proposal_id>__<CLAIM-nn>`); toàn văn Proposal vào `raw/ccr-evidence/_ccr-full-content.md`.

**Output bắt buộc — `input/ccr-fastpath-plan.json`** (tên file giữ vì lý do lịch sử):

```json
{ "proposal_id": "CBS-007",
  "product_key": "<product>",
  "object_key": "<object>",
  "assessed_at": "2026-09-30",
  "mode_settled": "CCR_INGEST",
  "claims": [
    { "claim_id": "CLAIM-01",
      "claim_key": "CBS-007__CLAIM-01",
      "claim_id_source": "declared | positional",
      "description": "...",
      "strength": "S3 | S1 | S0",
      "reason": "...",
      "confirmation_source": { "type": "dev_doc",
        "ref": { "citation": "...", "locator": "...", "url": "...", "authored_by": "...", "authored_on": "2026-09-29", "quote": "..." },
        "derivation": "prose" },
      "shipped": "SHIPPED | NOT_SHIPPED | UNKNOWN",
      "kb_address": { "feature_key": "<feature-key>", "feature_is_new": false,
                      "scope": { "environment": "<environments.default>", "role": "...", "surface": "..." } },
      "relation": "ADD | SUPERSEDES | CONTRADICTS | UNKNOWN",
      "target_kb_ids": ["KB-126"],
      "environment_difference": { "type": "ALTERNATIVE_SETUP | NOT_TESTABLE | DIFFERENT_VALUE", "test_env": "...", "production": "...", "how_to_test": "..." },
      "required_explorers": [] } ],
  "overall_decision": "..." }
```

`environment_difference` chỉ có ở claim khác biệt môi trường (§12.3c). `shipped`, `kb_address`, `relation`, `target_kb_ids` là input bắt buộc của §12.5 — không có chúng thì supersede không tất định. `confirmation_source` chỉ có ở claim `S3`. File này thuộc `runs/`, không copy sang `knowledge/`.

`context-quality-reviewer` audit lại từng claim (`contracts/gates.md`, audit source-strength): `confirmation_source` thiếu key hoặc `ref` không resolve về nguồn thật → claim đó không được publish làm `CONFIRMED_EXPECTED`, hạ xuống `PROPOSED` + OQ. Ở `CCR_INGEST` không có lane explore để quay lại.


## 12.3b Open question và ops-board

Mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phát sinh trong run phải vào `open-questions.md` của object, đúng `oq_id` + `type` (§5a), **trước khi** reviewer chạy — thiếu là BLOCKING. Không cần bước push riêng: `ops-board/server.mjs` đọc `open-questions.md` của object đang xử lý ở mỗi lần load board.


## 12.3c Setup và khác biệt môi trường trong CCR

Định nghĩa và nơi ghi ở contract §5b. CCR mang hai mục:

- **Khối B:** mỗi dòng là một claim. Orchestrator ghi `environment_difference` vào claim đó trong plan.
- **Setup:** của một feature nằm ở claim khối A; mức product nằm ở khối C. Khuôn cũ có "Phần 2b": dòng áp dụng cho feature đi như claim, dòng mức product đưa vào guide.

Claim có `environment_difference` đánh giá nguồn như mọi claim, nhưng khác hệ quả:

| Bậc | Hệ quả |
|---|---|
| `S3` | `CONFIRMED_EXPECTED`, như claim thường |
| `S1`, `S0` | Vẫn nạp: `INFERRED` + `confidence: LOW` + OQ `NEEDS_CONFIRMATION` trỏ về `kb_id`. Không làm oracle |

`S0` được nạp vì phần lớn khác biệt loại này là kinh nghiệm vận hành, không có artifact, trong khi thiếu nó người test sẽ báo `FAIL` sai. Evidence của claim `S0` là dòng khối B, copy vào `raw/ccr-evidence/<claim_key>/`. Muốn ghi nhận phía môi trường test là quan sát thật thì operator yêu cầu explore cho claim đó (§12.3a).

**Khối C:** dòng ở đây không phải claim, không qua C0.5 và không vào KB. Orchestrator áp vào file được nêu ở bước prose (`.claude/orchestrator/publish.md` §3). Nội dung trái contract §5b, §5c thì không áp, nêu trong `results`. CCR có cả claim và khối C chạy trong cùng một run; run không được publish thì khối C cũng không vào knowledge.

CCR chỉ có khối C, hoặc khối D toàn `KHÔNG CÒN ÁP DỤNG`, không tạo run: xử lý theo `.claude/orchestrator/ccr-intake.md` §2b.


## 12.3d Khối D — trả lời open question

| Kết quả | Xử lý |
|---|---|
| `XÁC NHẬN HÀNH VI` | Đi như claim khối A, kèm `answers_oq` trong plan. Publish thì gỡ entry OQ, thêm dòng CHANGELOG `Resolved OQ-xxx` |
| `CHỌN side_a`, `CHỌN side_b` | Ghi vào `input/approvals.json` như quyết định của người phân xử (§12.5), rồi gỡ OQ |
| `KHÔNG CÒN ÁP DỤNG` | Gỡ entry OQ, CHANGELOG ghi lý do. Không tạo item KB |

`OQ-ID` không có trong `open-questions.md` → bỏ dòng đó, nêu trong `results`.


## 12.4 Quy tắc bắt buộc

0. **Lock trước, làm sau** (§16): claim lock mọi object bị ảnh hưởng ngay khi xác định được object, trước C0.5. Lock mất giữa chừng → không publish, `DEFERRED` + `reason: lock_lost`.
1. **Không tự resolve conflict** (§8) — áp cho mode explore và cho product có `supersede_policy.enabled: false`. Item conflict không được làm oracle; ghi vào KB dạng `status: UNRESOLVED` + `conflict_group`, kèm OQ `CONFLICT`. **Ngoại lệ duy nhất:** `CCR_INGEST`/`DOC_BOOTSTRAP` của product có `supersede_policy.enabled: true` → áp §12.5 (`contracts/supersede.md`); ở đó orchestrator vẫn không phán xử nghiệp vụ, chỉ áp kết quả tất định.
2. **Độ mạnh nguồn quyết định `knowledge_kind`, không phải việc nó là CCR.** Người gửi quan sát thấy điều gì đó không tự biến nó thành expected behavior.
3. **Publish từng phần được phép:** phần không bị chặn vẫn publish, phần bị chặn ghi rõ lý do. Không giữ cả update lại vì một item.
4. **Phản hồi luôn về đúng Proposal đang xử lý** (không phải task gốc), qua MCP server `qa_hub.mcp_server` của product:
   - Gate C0 fail ngay từ đầu → `update_context_board_proposal({ proposal_id, status: "blocked", results, note })`, không chạy pipeline.
   - Trong lúc chạy: chỉ được cập nhật `note`/`results.summary` (tiến độ), giữ `status: "in-progress"`.
   - Kết thúc: `finish_context_board_proposal({ proposal_id, outcome, results, note })` theo bảng §12.2. Bị chặn ở lock (đầu run hoặc trước publish) → `DEFERRED` + `reason`, kể cả khi reviewer đã `publish_allowed: true`.
   - `results` là JSON tự do (`summary` luôn có); QA Hub chỉ lưu và hiển thị, không parse.
5. **`resolved_requests` trong `knowledge/manifest.json` được derive từ `CHANGELOG.md`** (`scripts/lib/changelog.mjs`) — orchestrator chỉ cần ghi dòng CHANGELOG có `ccr_ref` đúng, không ghi tay vào manifest.
6. **Khi run tới trạng thái terminal**, ghi `run-manifest.json.status` và `produced_open_questions: [oq_id, ...]` — mọi `oq_id` run này tạo mới hoặc để mở, không thiếu, không thừa (§15) — rồi release lock.
7. **Không tự escalate ra hệ thống khác** (Jira, Slack, ...) để giải quyết conflict hoặc thiếu thông tin. Kênh phản hồi duy nhất là Proposal; cần escalate thì hỏi operator trước.

Source: contracts/gates.md

## Gate applicability theo mode

| Gate | ZERO_DOC / BROAD / REFRESH / RECONCILE | INCREMENTAL_UPDATE | CCR_INGEST | DOC_BOOTSTRAP |
|---|---|---|---|---|
| C0 Admission | explore | explore | **CCR** | **doc** |
| C0.5 Source strength | n/a | required (khi run từ CCR) | **required, decisive** | n/a |
| C1 / C1-DOC | C1 | C1 | C1-DOC (biến thể CCR) | C1-DOC |
| C2 / C2-DOC | C2 | C2 nếu có API/DB claim | C2-DOC (biến thể CCR) | C2-DOC |
| C3 Product KB | required | required | required (nguồn = `confirmation_source`) | required + `scope.environment == "documented"` |
| C4 Feature Profile | required | required | required | required + `observed_validations[]` rỗng |
| C5 Checklist | required | required | required + phanh `derivation` | required + phanh `derivation` |
| C6 Publish readiness | các audit có điều kiện bên dưới | như trái | như trái | như trái |

`NOT_APPLICABLE` là giá trị hợp lệ của `gate.decision` (§1). `publish_allowed: true` khi và chỉ khi mọi gate áp dụng là `PASS`/`CONDITIONAL_PASS`/`NOT_APPLICABLE` và mọi audit C6 sạch.

**Mode-consistency:** `gate_results[]` chứa đúng một trong {C1, C1-DOC} và đúng một trong {C2, C2-DOC}, khớp `run-manifest.json.mode` — không bao giờ cả hai, không bao giờ không có cái nào.


## C0 Admission

**Explore:** `input/bootstrap-request.json` có product, `object_target.object_key` + URL/ID thật, environment (∈ `environments.allowed` của product), role, mutation policy. Thiếu → hỏi operator, không tự điền.

**Doc (`DOC_BOOTSTRAP`):** `doc_sources[]` không rỗng; mỗi entry có `source` + `type` + `version` + `generated_at` + (`path` khi `source: local_path`, hoặc `qa_hub.{project_id, ...}` khi nguồn QA Hub) · `input/doc-manifest.json` có `sha256` cho từng doc · `product_key` khớp đúng 1 file config · `environment: "documented"` · `mutation_policy: "NO_MUTATION"`. `role` được phép `null` — khi đó mọi KB item mang `scope.role: "unspecified"` cộng 1 OQ `NEEDS_CONFIRMATION` mức object. Thiếu `doc_sources[]` → FAIL, không chuyển sang explore để cứu run.

**CCR (`CCR_INGEST`):** `proposal_id` (hoặc file CCR chạy tay) + ≥1 claim có `claim_id` + `product_key` khớp đúng 1 file config + object resolve được qua `_registry.json` + object đã có base version. Không đòi URL target. Environment không bao giờ là lý do FAIL (`contracts/ccr-protocol.md` §12.3).


## C1-DOC Documentary evidence (`DOC_BOOTSTRAP`)

Mỗi entry `doc_sources[]` có đúng 1 artifact dưới `intermediate/doc/`, `doc_id` khớp thứ tự · mọi doc được cite tồn tại dưới `input/docs/<DOC-ID>/` và `sha256` khớp `input/doc-manifest.json` · mỗi claim có `claim_id`, ≥1 `dsec_id`, `claim_kind`, `normativity`, `brand_scope`, và `quote` là **substring nguyên văn** của file cite · mọi `dsec_id` được cite có trong `sections[]` của doc đó · `APIOP-`/`ENT-` doc-scoped (§4) · KHÔNG có `ACT-ID`/`SCN-ID`/`OBS-ID`/`SF-OBS-ID`/`DBDELTA-ID`, không field hàm ý runtime (`observed_status` khác null, `observed_count`, before/after state) · `version` + `generated_at` đủ cho mọi doc · `discarded[]` và `not_documented[]` có mặt · 3 histogram trong `_docset-index.json` có mặt.

**Redaction không được miễn:** grep toàn bộ `input/docs/**` theo §6. Tài liệu gen từ source code thường mang token, connection string, email seed — và không ai redact trước khi gửi.

**Verify quote — chạy thật.** Grep chuỗi `quote` trong file được cite. Bắt buộc 100% claim sẽ thành `CONFIRMED_EXPECTED` với `confidence: HIGH`, cộng ≥20% mẫu ngẫu nhiên phần còn lại.

**Recipe cho `dev_doc`:** `ref` phải resolve về một trong ba: (a) file trong repo này; (b) URL PR/commit; (c) URL tracker/wiki/QA Hub context. `authored_by` phải là dev/PO và quote phải xuất hiện nguyên văn trong nguồn đã resolve. Reviewer **không mở được** (b)/(c) (không network/MCP) → `CONDITIONAL_PASS` kèm 1 `publish_conditions[]` nêu đúng `ref` đó — không bao giờ PASS im lặng.

FAIL nếu: quote không khớp literal · claim thiếu `dsec_id` · có ID/field hàm ý runtime · `version`/`generated_at` không xác định · `sha256` lệch · còn secret/PII trong `input/docs/**` · thiếu artifact cho một doc source · `authored_by` trùng người gửi CCR.

### Biến thể CCR (`CCR_INGEST`)

Không có `doc_sources[]` hay `intermediate/doc/`; đơn vị kiểm là claim trong `input/ccr-fastpath-plan.json`.

- **C1-DOC:** mỗi claim có `claim_key` và thư mục `raw/ccr-evidence/<claim_key>/` · `raw/ccr-evidence/_ccr-full-content.md` tồn tại · claim `S3` có `confirmation_source` đủ key (§3) và `ref.quote` là substring nguyên văn của `_ccr-full-content.md` hoặc của file evidence đính kèm · claim `S1` không có `confirmation_source` · claim `S0` không sinh KB item · không có `ACT-ID`/`SCN-ID`/`OBS-ID` · không còn secret/PII trong `raw/ccr-evidence/**` (§6) · recipe `dev_doc` ở trên áp nguyên vẹn.
- **C2-DOC:** claim nói về API/data nêu route+method hoặc `table.column` đúng như trong nguồn trích dẫn · không item nào mang `observed_status` khác null.


## C2-DOC Documented contract integrity (`DOC_BOOTSTRAP`)

Mỗi API operation có normalized route, method, documented request/response shape, `dsec_ids[]` + `doc_id`, `observed_status: null` + `status_source: "documented"` · rule enum/required/boundary cite đoạn văn **phát biểu quy tắc** (`EXPLICIT` hoặc `IMPLIED_BY_CODE_ARTIFACT`) · data-model claim từ schema dump cite `table.column` và không được trình bày như business rule (`NOT NULL` là ràng buộc dữ liệu, không phải requirement) · mọi feature candidate có ≥1 claim `api_contract`/`data_model`, HOẶC một entry `not_documented[]` nói rõ bộ tài liệu không phủ surface đó — vắng mặt im lặng là FAIL · 2 doc từ 2 commit khác nhau nói trái nhau về contract phải nằm trong `doc_internal_conflicts[]`.

Statement nguồn doc diễn đạt dạng "Theo `<nguồn>` (`<authored_on>`), `<hành vi>`", không phải "quan sát thấy".

FAIL nếu rule suy từ một example payload duy nhất (`EXAMPLE_ONLY`) · `doc_internal_conflicts` bị tự hoà giải · item nguồn doc khẳng định fact runtime đã quan sát.


## C3 Product KB integrity

Mỗi item có `knowledge_kind`, nguồn truy vết, scope đầy đủ, confidence, freshness. Conflict được giữ (`status: UNRESOLVED` + `conflict_group`). Nguồn truy vết là `evidence_refs` ở mode explore, `doc_refs[]` (≥1 entry có `doc_id` + `dsec_id` + `quote`) ở `DOC_BOOTSTRAP`, `confirmation_source`/`claim_key` ở `CCR_INGEST`. Shard đúng `feature_id`; ở run có base, shard của feature bị chạm chứa đủ item base (carry-forward, §10a).

FAIL nếu observation bị nâng lên `CONFIRMED_EXPECTED` mà thiếu `confirmation_source` · item base bị mất khỏi shard mà không có change `deprecated` tương ứng.

Mode doc, FAIL thêm nếu: `scope.environment` khác `documented` · `CONFIRMED_EXPECTED` thiếu `confirmation_source` đủ key (`derivation` khi `dev_doc`) · lệch bảng mapping §3 (`EXAMPLE_ONLY`/`hedged`/`known_defect` lên `CONFIRMED_EXPECTED`) · `CONFIRMED_EXPECTED` mà `doc_refs[]` duy nhất trỏ vào một entry changelog · `confidence: HIGH` mà `doc_support.docs < 2` · claim có `brand_scope` cụ thể mà item thiếu `scope.brand`.

Item legacy thiếu `confirmation_source` (DECISIONS.md → Known debt) chỉ bị audit khi run hiện tại tạo mới hoặc sửa chúng.


## C4 Feature Profile

Mọi field trace về `kb_id`; đủ actor, entry point, capability, state transition, observed validation (mode explore), API/data dependency, unknown areas. Profile chỉ đọc KB shard, không đọc raw/intermediate.

FAIL nếu có nội dung không trace được về KB, profile chỉ là danh sách UI/API, hoặc gộp capability không cùng goal.

Mode doc: `observed_validations[]` RỖNG (rule trong tài liệu đi vào `confirmed_rules[]`); `capabilities[].act_ids` để `[]`.


## C5 Checklist

Coverage hợp lý theo evidence; mọi check không có oracle mang `NEEDS_CONFIRMATION`. FAIL nếu có `expected_result` khẳng định với `oracle_strength: NONE`.

| Oracle | `oracle_strength` |
|---|---|
| mọi `oracle.kb_ids` là `CONFIRMED_EXPECTED` không conflict (và qua phanh `derivation`) | `STRONG` |
| có `kb_id` `OBSERVED_CURRENT` | `BASELINE` |
| `INFERRED`/`PROPOSED`/conflict/không có gì | `NONE` → `NEEDS_CONFIRMATION` |

**Phanh `derivation`:** check chỉ được `STRONG` khi mọi item `dev_doc` trong `oracle.kb_ids` có `derivation: "prose"`. Oracle chỉ trace về item `derivation: "code_artifact"` → `BASELINE` + `NEEDS_CONFIRMATION`. Đây là phanh, không phải đảo ngược quyết định coi tài liệu dev là authority.

Thêm hai luật: item `dev_doc` không được là oracle `STRONG` duy nhất của check `priority: P1` (mất dữ liệu/tiền/permission) — giữ `NEEDS_CONFIRMATION` tới khi có `test_case` PASS · không check nào lấy item `status: KNOWN_DEFECT` làm oracle (defect đã biết là regression watch).


## C6 Publish readiness — các audit

C6 chạy trên `candidate/publish-preview/` (bản đã strip và đã áp `resolution`). Phần cơ học chạy bằng `node scripts/ctx/audit-preview.mjs --run <CTX-RUN-ID>` (read-only); phần còn lại reviewer kiểm tay. **Không** dùng `scripts/publish-knowledge.mjs` cho C6 — script đó quét `knowledge/` và ghi manifest.

| Audit | Khi nào | Kiểm |
|---|---|---|
| `zero-run-reference` | luôn | không key/đường dẫn nào trong `contracts/forbidden-fields.json` xuất hiện trong preview (script) |
| `confirmation-source-validity` | có item `CONFIRMED_EXPECTED` mới/sửa | xem dưới |
| `source-strength` | có `input/ccr-fastpath-plan.json` | xem dưới |
| `supersede-validity` | diff có entry `SUPERSEDE` | xem dưới |
| `open-question-completeness` | luôn | xem dưới |
| `version-consistency` | luôn | `feature-summary.md` dòng 2 = `publish-meta.json.published_context_version` (script) |
| `mode-consistency` | luôn | xem đầu file |

Mọi finding C6 dùng `gate: "C6"` và `problem` nêu đúng tên audit.

### confirmation-source-validity

Với mọi item `CONFIRMED_EXPECTED` mà run tạo mới hoặc sửa, trong preview:

1. Có `confirmation_source` với `type` ∈ enum §3. Thiếu → BLOCKING.
2. `ref` là chuỗi citation, không chứa `DOC-\d`, `DSEC-`, `CLM-`, `runs/`, `input/docs/`, không cú pháp đường dẫn. Vi phạm → BLOCKING (script kiểm).
3. `ref` resolve được về nguồn thật trong **candidate gốc** (`intermediate/doc/**` hoặc `raw/ccr-evidence/**`) — đối chiếu ở candidate, vì preview đã strip `dsec_id`.
4. `authored_on` là ISO date hợp lệ. Thiếu → BLOCKING.
5. `derivation` có mặt khi `type: "dev_doc"` và khớp `normativity` của claim nguồn. Lệch → BLOCKING.

### source-strength

Đọc `input/ccr-fastpath-plan.json`. Với mỗi claim `strength: "S3"`, xác minh theo `type`:

- `test_case` → test case thật, kết quả PASS, ngày chạy, build ≥ bản có thay đổi, kiểm đúng hành vi đang claim, có căn cứ expected (`ccr-protocol.md` §12.3a).
- `po_dev_confirm` → trích nguyên văn + link thật, xác nhận đúng hành vi; không tính comment mơ hồ.
- `spec_doc` → tên tài liệu + version/ngày + mục cụ thể phát biểu đúng hành vi. Không có version/ngày → BLOCKING.
- `dev_doc` → tên logic + version + `authored_on` + mục cụ thể + `derivation`; resolve theo recipe `dev_doc` ở C1-DOC.

Không xác minh được → claim đó không được publish làm `CONFIRMED_EXPECTED`: hạ `PROPOSED` + OQ `NEEDS_CONFIRMATION`. Không đề xuất "quay lại explore" ở mode không có lane explore.

### supersede-validity

Với mỗi entry `resolution: SUPERSEDE` trong `review/knowledge-diff.json`:

- `base_rank < candidate_rank`, HOẶC (cùng rank 3 và `candidate.authored_on > base.authored_on`). Không thoả → BLOCKING.
- `supersede_blockers` rỗng. Non-empty mà vẫn áp → BLOCKING.
- `CHANGELOG.md` trong preview có đúng 1 dòng mới cho entry đó, trích nguyên văn statement cũ. Thiếu hoặc chung chung → BLOCKING.
- `kb_id` của base được giữ nguyên. Cấp id mới → BLOCKING.
- Statement cũ đã biến mất khỏi `kb.json` của preview.
- Entry có `requires_human_decision: true` chỉ được `SUPERSEDE` khi `input/approvals.json` có approval `ACCEPT_CANDIDATE` cho đúng `kb_id`, và dòng CHANGELOG ghi vai trò + `ref` người duyệt (`validate-run.mjs` kiểm phần đầu).

### open-question-completeness

Quét mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phát sinh trong candidate (check `oracle_strength: NONE|BASELINE`, KB `status: UNRESOLVED`, `KNOWN_DEFECT`, `unknown_areas` của profile, gap producer đã khai) rồi đối chiếu `open-questions.md` của object trong preview: mỗi mục có đúng 1 entry với `oq_id` đúng format §4, đúng 1 `type`, bọc trong fence ```` ```json ```` (script kiểm fence). Thiếu dù 1 mục → BLOCKING, liệt kê đủ trong `coverage_findings`.


## REJECT khi

Provenance loss · assumption leakage · unresolved high conflict · unsafe evidence · version lineage hỏng · run-reference còn sót trong preview · claim `S3` không xác minh được · open question thiếu coverage · supersede áp sai §12.5 · item nguồn doc khẳng định fact runtime đã quan sát · `authored_by` trùng người gửi CCR · `known_defect` bị publish như hành vi đúng.
