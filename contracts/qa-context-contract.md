# QA Context Contract

Luật chung cho mọi agent của QA context builder. Mọi subagent đọc file này trước khi làm bất cứ việc gì.

File này nói **luật là gì**. `DECISIONS.md` ở root nói **vì sao** và giữ các vi phạm tồn đọng đã biết — đọc nó trước khi nới hoặc bỏ một luật ở đây.

Luật được chia thành nhiều file, mỗi luật chỉ nằm ở đúng một nơi:

| File | Nội dung |
|---|---|
| `contracts/qa-context-contract.md` (file này) | §0–§11, §13–§16: protocol, schema, ID, write scope, redaction, mode, phân phối, credential, retention, lock |
| `contracts/ccr-protocol.md` | §12.1–§12.4: kênh CCR, triage, C0 từ CCR, C0.5 source strength, phản hồi Proposal |
| `contracts/supersede.md` | §12.5: thuật toán supersede và 6 blocker |
| `contracts/gates.md` | §12.6 + định nghĩa đầy đủ gate C0–C6 và các audit |
| `contracts/forbidden-fields.json` | danh sách field/đường dẫn cấm dưới `knowledge/` (máy đọc) |
| `contracts/schemas/` | JSON Schema cho artifact trong `runs/` |

Khác biệt giữa các product (environment, explorer được phép, cách login, vocabulary) nằm trong `config/products/<key>.json` và `config/products/<key>/explore-playbook.md`, **không** nằm trong contract hay agent definition.

## 0. Agent runtime protocol

Áp cho mọi agent; agent definition không lặp lại mục này.

- **Thứ tự đọc:** contract này → `run-manifest.json` (mode đã settle) → `input/bootstrap-request.json` → input riêng của agent.
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

Mọi subagent nhận và trả đúng envelope này. `payload` là phần riêng của từng agent.

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
| `po_dev_confirm` | PO/Dev xác nhận trực tiếp, trích dẫn **nguyên văn** + link. Comment mơ hồ không tính |
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
| `CHK-ID` | qa-checklist-builder | `CHK-<nnn>` (theo feature) | `CHK-001` |
| `OQ-ID` | orchestrator (lúc compile `open-questions.md`) | `OQ-<object-key>-<nnn>` | `OQ-order-014` |
| `DOCSET-ID` | orchestrator (lúc C0) | `DOCSET-<CTX-RUN-ID>` | `DOCSET-CTX-20260930-01` |
| `DOC-ID` | orchestrator (lúc C0), theo thứ tự `doc_sources[]` | `DOC-<nn>` | `DOC-01` |
| `DSEC-ID` | doc-ingest-explorer | `DSEC-<doc-nn>-<nnn>` | `DSEC-01-014` |
| `CLAIM-ID` | doc-ingest-explorer (`DOC_BOOTSTRAP`) · orchestrator (`CCR_INGEST`) | `CLM-<doc-nn>-<nnn>[a-z]` · `CLAIM-<nn>` | `CLM-01-007`, `CLM-01-007a` (tách claim, giữ số cũ) · `CLAIM-01` |

**`APIOP-ID`/`ENT-ID` ở mode doc PHẢI doc-scoped**, vì nhiều `doc-ingest-explorer` chạy song song, mỗi instance chỉ thấy tài liệu của mình. Mode explore chỉ có một explorer mint chúng nên dùng namespace phẳng.

API và DB evidence BẮT BUỘC map về `ACT-ID` (mode explore) hoặc `DSEC-ID` (mode doc). Danh sách endpoint/table rời rạc không có một trong hai bị gate loại.

`DOC-ID` do orchestrator sinh để khớp 1:1 với index trong `doc_sources[]` — reviewer verify được "mỗi doc source có đúng 1 artifact".

`SCN-ID`, `ACT-ID`, `OBS-ID`, `SF-OBS-ID`, `SF-ACT-ID`, `DBDELTA-ID` là định danh của **quan sát**. Ở `DOC_BOOTSTRAP`/`CCR_INGEST` chúng **KHÔNG được sinh** — sinh ra là gate FAIL. Feature Profile và Checklist ở mode doc để `act_ids: []`.

**Mỗi mode chỉ có đúng một bên mint `FEATURE-ID`.** Mode explore: `portal-explorer` (vì `SCN-ID` nhúng số feature). Mode doc và `CCR_INGEST`: orchestrator mint từ `feature_key` mà scope-planner (hoặc CCR) đề xuất, **trước khi** dispatch agent tiếp theo — `FEAT-<nn>-<slug>` với `nn` là số kế tiếp còn trống của object. Normalizer, feature-profile-builder và checklist-builder không mint, chỉ dùng lại. `FEATURE-ID` là định danh trong run; định danh ổn định qua các version là `feature_key` (tên thư mục `features/<feature-key>/`) — feature đã có trong base thì giữ nguyên `feature_key` của base.

`DBDELTA-ID` không có tương đương ở mode doc. Tài liệu mô tả hệ quả ghi dữ liệu là một `CLAIM-ID` với `claim_kind: side_effect`.

**Đặt ID mới thì grep cả `knowledge/` và `runs/` trước** — trùng namespace (vd `SEC-` đã có nghĩa "security finding") làm mọi audit grep vừa false-positive vừa che leak thật.

`OQ-ID` ổn định qua thời gian (không đổi số khi resolve mục khác) — dùng cho `run-manifest.json.produced_open_questions[]` (§15) và dòng CHANGELOG "Resolved OQ-xxx".

## 5. Write scope

- Subagent CHỈ ghi vào `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>/`, theo thư mục được cấp trong agent definition.
- KHÔNG subagent nào được ghi vào `knowledge/`. Chỉ `qa-context-lifecycle-orchestrator` publish (`scripts/ctx/publish-apply.mjs`), và CHỈ khi **cả 2** điều kiện đúng: (a) reviewer trả `publish_allowed: true`, **và** (b) lock của mọi object bị ảnh hưởng vẫn thuộc `ctx_run_id` của chính run này (§16). Thiếu (b) → DỪNG, không ghi `knowledge/`, outcome `CONFLICT`.
- **Thứ tự bắt buộc: checklist-builder → `knowledge-diff-analyzer` (khi có base) → publish strip → reviewer → publish.** Publish strip (`scripts/ctx/publish-strip.mjs`) đọc candidate gốc và sinh `candidate/publish-preview/` theo đúng layout `knowledge/products/<product>/` và đúng schema §5a, đồng thời áp `resolution: SUPERSEDE` của diff (§12.5). Preview là bản **y hệt** sẽ được copy vào `knowledge/`. Candidate gốc giữ nguyên envelope/evidence, không bị sửa.
- Sau strip, orchestrator cập nhật file prose trong preview (`feature-summary.md`, `open-questions.md`, `CHANGELOG.md`, `_registry.json`). Reviewer chạy C1–C5 trên candidate gốc và C6 trên preview (`scripts/ctx/audit-preview.mjs`). Publish copy nguyên preview sang `knowledge/` (merge: file không có trong preview giữ nguyên), không strip lại.
- Không sửa file của agent khác. Cần dữ liệu bước trước thì đọc, đừng ghi đè.

```text
runs/context/YYYY-MM-DD/<ctx-run-id>/
├── run-manifest.json                               (run_id, product, mode, mode_settled_at, status, source, label, object_target, produced_open_questions[])
├── input/bootstrap-request.json
├── input/scope-plan.json                           (scope-planner; BROAD/DOC — orchestrator ghi thêm FEATURE-ID đã mint)
├── input/ccr-fastpath-plan.json                    (§12.3a, chỉ khi run xuất phát từ CCR)
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

## 6. Redaction — chạy TRƯỚC khi ghi file

Redact về `"[REDACTED]"`:

- Header: `authorization`, `cookie`, `set-cookie`, `x-api-key`, và header access token riêng của nền tảng (vd `x-shopify-access-token`).
- Field chứa: `token`, `password`, `secret`, `api_key`, `access_token`, `refresh_token`, `signature`, `hmac`.
- PII: email, số điện thoại, địa chỉ, tên người mua, payment data.

Giữ *shape* (kiểu, có/không có field, độ dài), bỏ giá trị. Không chắc → redact và ghi vào `unknowns`.

**Ngoại lệ: domain dành riêng cho tài liệu KHÔNG redact** — RFC 2606 (`example.com`, `example.org`, `example.net`, `*.example`, `.test`, `.invalid`) và `localhost`. Khi bỏ qua theo ngoại lệ này, ghi vào `coverage_limitations` hoặc `unknowns` cái gì và vì sao.

Evidence còn secret/PII = **block publish**, không phải warning. `scripts/ctx/freeze-docs.mjs` quét pattern còn sót trong tài liệu đã đóng băng và fail-closed.

## 7. Mutation policy

Đọc `exploration_policy` trong `input/bootstrap-request.json`; mặc định lấy từ `config/products/<key>.json` → `defaults.mutation_policy` (thường `SAFE_REVERSIBLE_ONLY`) và `defaults.forbidden_actions`.

- DỪNG trước action trong `forbidden_actions` (vd `delete`, `publish_live`, `charge`, `send_notification`).
- DỪNG trước action không có đường cleanup rõ ràng.
- `cleanup_required: true` → mọi mutation phải có `cleanup_result`: `DONE` | `FAILED` | `NOT_NEEDED`.
- Không bao giờ tự nới policy. Bị chặn → ghi vào `blocking_issues`, trả về orchestrator.

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

**Carry-forward base:** ở run có base, normalizer/feature-profile-builder/checklist-builder xuất shard của feature bị chạm = **toàn bộ** nội dung base (giữ nguyên `kb_id`, `check_id`, `last_updated`) cộng phần thay đổi. Publish copy cả file, nên item vắng khỏi shard là bị xoá khỏi `knowledge/`. Feature không bị chạm không xuất hiện trong candidate và giữ nguyên trong `knowledge/`.

**Mode được đọc DUY NHẤT từ `run-manifest.json.mode`** — giá trị đã settle ở Gate C0.5, kèm `mode_settled_at`. `input/bootstrap-request.json.mode` chỉ là giá trị provisional. Không agent nào suy mode từ artifact trên đĩa. Một run `ZERO_DOC_BOOTSTRAP` có portal capture lỗi **KHÔNG** được tự hạ xuống `DOC_BOOTSTRAP` để đi qua gate — đó là `BLOCKED`. `raw/` rỗng ở mode doc là đúng.

**Mode settling.** Run CCR bắt đầu với `mode: "CCR_INGEST"` provisional. Gate C0.5 chốt: `CCR_INGEST` khi và chỉ khi 0 explorer được dispatch; operator yêu cầu explore cho ≥1 claim → `INCREMENTAL_UPDATE`. Ghi `mode_settled_at: "C0.5"`. Mặc định là **tách, không trộn**: claim `S3` publish ngay, claim `S1` vào KB dạng `OBSERVED_CURRENT`/`LOW` + OQ, claim `S0` không nạp và nêu trong `results.open_questions`. Mode là thô; độ mạnh từng item truy được qua `confirmation_source.type`.

## 11. Agent roster

| Agent | Vai trò |
|---|---|
| `qa-context-lifecycle-orchestrator` | Điều phối run, mint ID, chạy script tất định, publish |
| `qa-context-scope-planner` | Phân rã scope (BROAD/DOC) |
| `portal-explorer` · `storefront-explorer` · `api-explorer` · `db-explorer` · `code-config-explorer` | Evidence runtime |
| `doc-ingest-explorer` | Evidence tài liệu |
| `qa-knowledge-normalizer` | Fan-in duy nhất → Product KB candidate |
| `feature-profile-builder` | KB → Feature Profile |
| `qa-checklist-builder` | Profile → Regression Checklist |
| `knowledge-diff-analyzer` | Candidate vs base: diff, resolution, blast radius |
| `context-quality-reviewer` | Gate độc lập trước publish |

Ranh giới chi tiết (sở hữu / không làm / input / output / handoff) nằm ở mục "Function" và "Handoff" của từng agent definition.

## 12. Context Change Request, supersede, gate

- §12.1–§12.4 (kênh CCR, triage, C0 từ CCR, C0.5, phản hồi Proposal) → `contracts/ccr-protocol.md`
- §12.5 (supersede & conflict resolution) → `contracts/supersede.md`
- §12.6 (gate applicability + định nghĩa gate) → `contracts/gates.md`

## 13. Phân phối knowledge cho team

Repo này **sản xuất**; repo `qikify-QA/qa-knowledge` là nơi **tiêu thụ** (submodule tại `knowledge/`), chứa `products/**`, `manifest.json`, `_open-issues/` và `how-to-request/`.

- Member chỉ đọc KB, không cần gì từ `runs/`. Quyền ghi bị chặn bằng phân quyền GitHub (member chỉ read).
- `scripts/publish-knowledge.mjs` **không strip** — nó sinh manifest, stage gói publish, quét leak (cùng danh sách §5a) và kiểm `confirmation_source`; `--push` commit + tag `ctx-YYYY-MM-DD` + push trong submodule. Strip chỉ xảy ra một lần, ở `publish-strip.mjs`.
- Object thiếu `publish-meta.json` hợp lệ bị đánh `UNPUBLISHED` trong manifest, hoặc script dừng. Không im lặng ship object không rõ version.

## 14. Credentials

Credential nằm trong `.env` ở project root, gitignored, chỉ đọc qua biến môi trường. Tên biến của từng product khai ở `config/products/<key>.json` → `credentials` (`required_env`, `secondary_account_env`, `negative_auth_env`). Token MCP của QA Hub đọc từ `QA_HUB_MCP_TOKEN` (`.mcp.json` tham chiếu biến, không chứa giá trị).

- Đọc từ `process.env` / `os.environ`. KHÔNG in `.env` ra output, KHÔNG in giá trị vào log hay tool result.
- KHÔNG copy giá trị credential vào file nào trong `runs/` hoặc `knowledge/`. Ghi tên biến, không ghi giá trị.
- **Product có `modes.explore_enabled: true`:** environment mặc định là `environments.default`; biến mà `environments.<env>.api_base_env` chỉ tới phải bằng `environments.<env>.expected_api_base`. Trỏ ra ngoài `environments.allowed` (hoặc vào `environments.forbidden`) là stop condition → `BLOCKED`.
- **Product có `modes.explore_enabled: false`:** không credential, không api base, không environment runtime. `environment` luôn là `documented`; thiếu `.env` cho product này là bình thường.
- Account phụ (`secondary_account_env`) dùng cho check `PERMISSION`/cross-tenant; token trong `negative_auth_env` là fixture cho negative auth case. Quy tắc chọn và xác minh account khi explore nằm trong playbook của product.

## 15. Run retention & pruning

`knowledge/` tự chứa hoàn toàn (§5a), nên giữ run không phải để bảo vệ knowledge — chỉ để team quay lại được evidence gốc khi open question mà run đó để lại chưa được giải quyết.

Một run được phép xoá khi **cả 2** đúng:

1. `run-manifest.json.status` là terminal (`PUBLISHED | BLOCKED | REJECTED | CONFLICT`). `IN_PROGRESS` và `REWORK_REQUIRED` là trạng thái chưa terminal.
2. Mọi `oq_id` trong `run-manifest.json.produced_open_questions` **không còn** trong `open-questions.md` tương ứng.

Khi một run sau resolve một open question: gỡ entry khỏi `open-questions.md`, thêm 1 dòng vào `CHANGELOG.md` ("Resolved OQ-xxx — ...").

`scripts/prune-runs.mjs` liệt kê run đủ điều kiện; `--delete` xoá chúng. Không ai xoá tay `runs/context/**` mà bỏ qua 2 điều kiện trên. `inputs/` và `runs/_archive/` không nằm trong diện xoá.

## 16. Concurrency lock (object)

Mỗi object bị một run ảnh hưởng được khoá suốt vòng đời run — cơ chế concurrency duy nhất của flow.

- Lock file: `runs/.locks/<product>__<object-key>.lock`, exclusive-create nguyên tử. Thao tác qua `scripts/ctx/lock.mjs acquire|verify|release`.
- Nội dung: `{"proposal_id": "...", "ctx_run_id": "...", "claimed_at": "...", "ttl_seconds": 7200, "pid": ...}`. Hết TTL thì coi như free; run kế tiếp claim lại kèm cảnh báo run trước có thể đã crash.
- Claim mọi object liên quan **trước** C0.5 và trước khi dispatch agent nào; một cái thất bại → release hết, outcome `CONFLICT` ngay, không chờ/polling.
- Object khác nhau → lock khác nhau → chạy song song bình thường.
- Re-verify ngay trước publish (`publish-apply.mjs` tự làm). Release khi run tới trạng thái terminal.
- Lock global `_manifest` bao bước sinh `knowledge/manifest.json` + `consolidated-open-questions.md` (`publish-apply.mjs` tự làm).
- `qa-context-scope-planner` ở `BROAD_BOOTSTRAP` nhận danh sách object đang bị khoá từ orchestrator và không đề xuất chúng.
