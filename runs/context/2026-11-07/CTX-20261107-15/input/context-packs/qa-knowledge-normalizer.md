# Context pack: qa-knowledge-normalizer

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

## 3. Knowledge kind

| Kind | Nghĩa |
|---|---|
| `CONFIRMED_EXPECTED` | Có nguồn thẩm quyền xác nhận đây là hành vi đúng, và mang `confirmation_source` |
| `OBSERVED_CURRENT` | Đã quan sát trực tiếp trên env/role/state này, tại thời điểm này |
| `INFERRED` | Suy ra từ evidence, chưa xác nhận |
| `PROPOSED` | Đề xuất, chưa có evidence |

**Chỉ `qa-knowledge-normalizer` gán `knowledge_kind`.** Explorer ghi `basis: observed | documented | inferred` cho từng observation; normalizer quyết kind.

Mode explore: mặc định `OBSERVED_CURRENT`. Hành vi hiện tại **không** tự động là expected requirement.

`DOC_BOOTSTRAP`/`CCR_INGEST` (§10): mặc định **đảo lại** — claim có nguồn `S3` (§12.3a) là `CONFIRMED_EXPECTED` kèm `confirmation_source`. Ở hai mode đó không có quan sát nào, nên nếu vẫn mặc định `OBSERVED_CURRENT` thì KB sinh ra không bao giờ dùng được làm expected result. Product có `supersede_policy.allow_dev_doc_supersede: false` thì claim doc vẫn hạ xuống `OBSERVED_CURRENT`.

Không suy `required`, validation rule, enum hay boundary từ một sample duy nhất. Một sample → `confidence: LOW` + ghi vào `unknowns`.

### Mapping claim tài liệu → `knowledge_kind`

Áp ở `DOC_BOOTSTRAP` (claim từ `doc-ingest-explorer`). Normalizer áp, reviewer kiểm lại đúng bảng này.

| `normativity` | `claim_kind` | `knowledge_kind` | `confirmation_source` |
|---|---|---|---|
| `EXPLICIT` | mọi loại trừ `non_normative`, `changelog_change`, `known_defect` | `CONFIRMED_EXPECTED` | bắt buộc, `derivation: "prose"` |
| `IMPLIED_BY_CODE_ARTIFACT` | `validation_rule` · `enum_or_boundary` · `config_default` · `data_model` | `CONFIRMED_EXPECTED` | bắt buộc, `derivation: "code_artifact"` |
| `IMPLIED_BY_CODE_ARTIFACT` | `capability` · `side_effect` · `state_transition` · `permission` · `integration` | `INFERRED` | không có |
| `EXAMPLE_ONLY` | mọi loại | `INFERRED`, `confidence: LOW` | không có |
| `HEDGED_RATIONALE` | mọi loại | `INFERRED`, `confidence: LOW` + OQ `NEEDS_CONFIRMATION` | không có |
| bất kỳ | `known_defect` | `OBSERVED_CURRENT` + `status: "KNOWN_DEFECT"` + OQ `OPEN_ISSUE` | không có |
| bất kỳ | `changelog_change` | `INFERRED` + OQ `NEEDS_CONFIRMATION` | không có |
| bất kỳ | `non_normative` | không thành KB item | — |

Claim có `hedged: true` không bao giờ lên `CONFIRMED_EXPECTED`. Item `KNOWN_DEFECT` không bao giờ là oracle của check (gate C5).

### Nguồn thẩm quyền cho `CONFIRMED_EXPECTED`

**Đây là định nghĩa duy nhất của `confirmation_source`.** Mọi file khác trỏ về mục này thay vì lặp lại enum.

Enum `confirmation_source.type` — đúng 4 giá trị:

| `type` | Điều kiện hợp lệ |
|---|---|
| `spec_doc` | Spec/tài liệu chính thức của sản phẩm, có tên tài liệu + version/ngày + mục cụ thể, và mục đó phát biểu đúng hành vi đang xét |
| `dev_doc` | Tài liệu dev sinh từ source code, changelog/release note do dev viết, hoặc PR/commit diff — kèm locator + link + `authored_on` + trích nguyên văn |
| `po_dev_confirm` | PO, Dev hoặc QA xác nhận trực tiếp, trích dẫn **nguyên văn** + ngày + ticket. Có link thì kèm link. Comment mơ hồ không tính |
| `test_case` | Test case đã chạy và PASS đúng hành vi đang xét (id + ngày chạy + build ≥ bản có thay đổi) |

Jira ticket **trần** (không kèm doc/changelog/diff/quote/test-case) KHÔNG đủ — vẫn là `OBSERVED_CURRENT`. Ticket **kèm** dev doc hoặc PR diff thì đủ, và type là `dev_doc`.

`dev_doc` và `spec_doc` tách riêng có chủ đích: `dev_doc` mô tả *code hiện là gì* (có thể mô tả cả bug như thể đúng), `spec_doc` mô tả *sản phẩm nên là gì*. Không có `code_ref`: code do `code-config-explorer` đọc là quan sát của repo này, tức `INFERRED`.

**Shape trong `runs/`** (`input/ccr-fastpath-plan.json`, `candidate/product-kb/*.json`):

```json
{ "type": "dev_doc",
  "ref": { "citation": "Jira PROJ-123, dev doc \"Rate limit\" §3 (v1, PR #45)",
           "locator": "PROJ-123 · PR #45 · Rate limit §3",
           "url": "https://tracker.example.com/browse/PROJ-123",
           "authored_by": "<người viết> (dev)",
           "authored_on": "2026-09-17",
           "quote": "<trích nguyên văn, verbatim>" },
  "derivation": "prose" }
```

**Shape trong `knowledge/`** (published — đúng 4 key, publish strip sinh ra từ shape trên):

```json
"confirmation_source": {
  "type": "dev_doc",
  "ref": "Jira PROJ-123, dev doc \"Rate limit\" §3 (v1, PR #45)",
  "authored_on": "2026-09-17",
  "derivation": "prose"
}
```

Publish strip lấy `ref` từ `ref.citation` (thiếu thì `ref.locator`), nên normalizer ghi `citation` đúng dạng sẽ publish.

Luật về shape:

- **`authored_on` PHẢI có trong bản published.** Không có nó, supersede của CCR lần sau buộc rơi về `last_updated.date` — tức ngày publish — và đảo chiều im lặng. `authored_on` là ngày của nguồn nghiệp vụ, không phải run reference.
- **`ref.quote` KHÔNG được publish.** `knowledge/` nói sự thật hiện tại, không nói quá trình; và quote có thể chứa chữ trùng pattern cấm (§5a). Quote sống trong `runs/` cho reviewer audit.
- **`ref` là câu trích dẫn tự mô tả, không phải con trỏ.** Nó phải còn đọc hiểu được sau khi nguồn gốc bị xoá: không cú pháp đường dẫn (`a/b/c.md`), không `DOC-\d`/`DSEC-`/`CLM-`, không `runs/`, không `input/docs/`. URL được phép như tiện ích, không như điều kiện.
  - Đúng: `Jira PROJ-123, dev doc "Rate limit" §3 (v1, PR #45)` · `Spec "Commission Engine" v2.1 §4.2, 2026-07-30` · `Testlane TC-1234 PASS build 318, 2026-09-17`
  - Sai: `docs/kb/01-domain-entities.md §Program` · `DOC-01 DSEC-01-014` · chỉ một URL trần
- **`derivation`** ∈ `prose | code_artifact`, bắt buộc với `type: "dev_doc"`, khớp `normativity` của claim nguồn (`EXPLICIT` → `prose`; `IMPLIED_BY_CODE_ARTIFACT` → `code_artifact`). Gate C5 dùng nó để quyết `oracle_strength` STRONG vs BASELINE.

`confirmation_source` có mặt **khi và chỉ khi** `knowledge_kind: CONFIRMED_EXPECTED`. Item legacy vi phạm luật này được liệt kê trong `DECISIONS.md` (Known debt); luật áp cho item được tạo mới hoặc sửa, và run nào sửa statement của item legacy phải bổ sung `confirmation_source` cùng lúc.

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

## 8. Conflict

Hai nguồn evidence mâu thuẫn: GIỮ CẢ HAI trong `conflicts[]`, mỗi phía kèm evidence refs. Không âm thầm chọn phía đúng, không xoá observation cũ. Chỉ orchestrator + reviewer quyết resolution, theo authority policy; ngoại lệ duy nhất là supersede tất định ở `contracts/supersede.md` (§12.5).

## 9. Evidence ref

Mode explore:

```json
{ "type": "screenshot|har_entry|dom_snapshot|api_response|db_query|code_ref",
  "path": "raw/portal/ACT-01-02-003/after.png",
  "act_id": "ACT-01-02-003", "note": "" }
```

Mode doc — `type: "doc_ref"`:

```json
{ "type": "doc_ref",
  "doc_id": "DOC-01",
  "dsec_id": "DSEC-01-014",
  "path": "input/docs/DOC-01/<file>.md",
  "locator": { "kind": "heading_lines", "heading_path": ["Order", "Refund"], "line_start": 412, "line_end": 431 },
  "quote": "<trích nguyên văn, ≤300 ký tự>",
  "note": "" }
```

`locator.kind` ∈ `heading_lines | json_pointer | table_column | changelog_entry`.

`path` trỏ vào **bản copy trong run** (`input/docs/<DOC-ID>/...`), không trỏ ra file gốc. Tài liệu không nằm trong git và có thể đổi bất cứ lúc nào, nên đóng băng bytes trong run (kèm `sha256` ở `input/doc-manifest.json`) là điều kiện để C1-DOC kiểm được.

Kết luận không có evidence ref → `knowledge_kind: INFERRED`, và phải khai báo như vậy.

Evidence ref chỉ tồn tại trong `runs/`; không được copy sang `knowledge/` dưới bất kỳ hình thức nào (§5a).

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

Source: contracts/ccr-protocol.md

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


## C3 Product KB integrity

Mỗi item có `knowledge_kind`, nguồn truy vết, scope đầy đủ, confidence, freshness. Conflict được giữ (`status: UNRESOLVED` + `conflict_group`). Nguồn truy vết là `evidence_refs` ở mode explore, `doc_refs[]` (≥1 entry có `doc_id` + `dsec_id` + `quote`) ở `DOC_BOOTSTRAP`, `confirmation_source`/`claim_key` ở `CCR_INGEST`. Shard đúng `feature_id`; ở run có base, shard của feature bị chạm chứa đủ item base (carry-forward, §10a).

FAIL nếu observation bị nâng lên `CONFIRMED_EXPECTED` mà thiếu `confirmation_source` · item base bị mất khỏi shard mà không có change `deprecated` tương ứng.

Mode doc, FAIL thêm nếu: `scope.environment` khác `documented` · `CONFIRMED_EXPECTED` thiếu `confirmation_source` đủ key (`derivation` khi `dev_doc`) · lệch bảng mapping §3 (`EXAMPLE_ONLY`/`hedged`/`known_defect` lên `CONFIRMED_EXPECTED`) · `CONFIRMED_EXPECTED` mà `doc_refs[]` duy nhất trỏ vào một entry changelog · `confidence: HIGH` mà `doc_support.docs < 2` · claim có `brand_scope` cụ thể mà item thiếu `scope.brand`.

Item legacy thiếu `confirmation_source` (DECISIONS.md → Known debt) chỉ bị audit khi run hiện tại tạo mới hoặc sửa chúng.


## REJECT khi

Provenance loss · assumption leakage · unresolved high conflict · unsafe evidence · version lineage hỏng · run-reference còn sót trong preview · claim `S3` không xác minh được · open question thiếu coverage · supersede áp sai §12.5 · item nguồn doc khẳng định fact runtime đã quan sát · `authored_by` trùng người gửi CCR · `known_defect` bị publish như hành vi đúng.
