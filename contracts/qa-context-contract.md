# QA Subagent Shared Contract

Nguồn chuẩn: `qa-subagent-catalog.md` v1.3 và `qa-flow-1-context-lifecycle.md` v1.0.
Mọi subagent QA PHẢI đọc file này trước khi làm bất cứ việc gì.

File này nói **luật là gì**. `DECISIONS.md` ở root nói **vì sao** — đọc nó trước khi nới hoặc bỏ một luật ở đây.

Quy ước dự án: thuật ngữ nội bộ "SDK" = storefront/customer-facing surface. Dùng tên `storefront-explorer`.

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

**Envelope này chỉ áp dụng cho artifact trong `runs/`** (input/raw/intermediate/candidate/review). File đã publish vào `knowledge/` dùng schema riêng, gọn hơn nhiều, không mang theo envelope này — xem §5a.

## 2. Global rules — không có ngoại lệ

1. Không biến `OBSERVED_CURRENT` thành `CONFIRMED_EXPECTED` nếu không có nguồn thẩm quyền.
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
| `CONFIRMED_EXPECTED` | Có nguồn thẩm quyền (§3 dưới) xác nhận đây là hành vi đúng, và mang `confirmation_source` |
| `OBSERVED_CURRENT` | Đã quan sát trực tiếp trên env/role/state này, tại thời điểm này |
| `INFERRED` | Suy ra từ evidence, chưa xác nhận |
| `PROPOSED` | Đề xuất, chưa có evidence |

Trong `ZERO_DOC_BOOTSTRAP` mặc định là `OBSERVED_CURRENT` (`OBSERVED_BASELINE`). Hành vi hiện tại **không** tự động là expected requirement.

Trong `DOC_BOOTSTRAP`/`CCR_INGEST` (§10) mặc định **đảo lại**: claim có nguồn `S3` (§12.3a) là `CONFIRMED_EXPECTED` kèm `confirmation_source`. Đây là chủ ý — ở hai mode đó không có quan sát nào, nên nếu vẫn mặc định `OBSERVED_CURRENT` thì KB sinh ra không bao giờ dùng được làm expected result. Product có `supersede_policy.allow_dev_doc_supersede: false` trong `config/products/<key>.json` thì claim doc vẫn hạ xuống `OBSERVED_CURRENT`, không ngoại lệ.

Không suy `required`, validation rule, enum hay boundary từ một sample duy nhất. Một sample → `confidence: LOW` + ghi vào `unknowns`.

### Nguồn thẩm quyền cho `CONFIRMED_EXPECTED` — khai ở đúng một chỗ

**Đây là định nghĩa duy nhất của `confirmation_source` trong repo này.** Mọi file khác (agent definition, §12.3a, §12.5) **trỏ về mục này** thay vì lặp lại enum — việc lặp lại chính là nguyên nhân đã làm `confidence_source` (reviewer audit) lệch khỏi `confirmation_source` (normalizer ghi), tức reviewer audit một field producer không bao giờ ghi.

Enum `confirmation_source.type` — đúng 4 giá trị:

| `type` | Điều kiện hợp lệ |
|---|---|
| `spec_doc` | Spec/tài liệu chính thức của sản phẩm, có tên tài liệu + version/ngày + mục cụ thể, và mục đó phát biểu đúng hành vi đang xét. Thiếu version/ngày → không hợp lệ (không biết nó nói về build nào) |
| `dev_doc` | Tài liệu do dev sinh từ source code, changelog/release note do dev viết, hoặc PR/commit diff — kèm locator + link + `authored_on` + trích nguyên văn |
| `po_dev_confirm` | PO/Dev xác nhận trực tiếp, trích dẫn **nguyên văn** + link. Comment mơ hồ không tính |
| `test_case` | Test case đã chạy và PASS đúng hành vi đang xét (id + ngày chạy + build ≥ bản có thay đổi) |

Một CCR hoặc một KB item chỉ trích dẫn Jira ticket **trần** (không kèm doc/changelog/diff/quote/test-case) KHÔNG đủ — vẫn là `OBSERVED_CURRENT`. Ticket **kèm** dev doc hoặc PR diff thì đủ, và type là `dev_doc`.

**`dev_doc` và `spec_doc` tách riêng có chủ đích.** Cả hai đủ thẩm quyền, nhưng `dev_doc` mô tả *code hiện là gì* — nên nó có thể mô tả cả bug như thể đúng — còn `spec_doc` mô tả *sản phẩm nên là gì*. Gộp hai type lại là mất vĩnh viễn khả năng truy "item nào được xác nhận bởi tài liệu dev", mà đó chính là lý do field này tồn tại.

**Không có `code_ref`.** Code do `code-config-explorer` đọc là quan sát của repo này, theo §9 là `INFERRED` — không phải authority.

**Shape trong `runs/`** (đầy đủ — `input/ccr-fastpath-plan.json`, `candidate/product-kb/*.json`):

```json
{ "type": "dev_doc",
  "ref": { "locator": "TIB-5460 · PR #1182 · docs/rate-limit.md §3",
           "url": "https://ownego.atlassian.net/browse/TIB-5460",
           "authored_by": "huyenntk (dev)",
           "authored_on": "2026-09-17",
           "quote": "<trích nguyên văn, verbatim>" },
  "derivation": "prose" }
```

**Shape trong `knowledge/`** (published — đúng 4 key):

```json
"confirmation_source": {
  "type": "dev_doc",
  "ref": "Jira TIB-5460, dev doc \"Rate limit\" §3 (v1, PR #1182)",
  "authored_on": "2026-09-17",
  "derivation": "prose"
}
```

Ba luật về shape, mỗi cái có hệ quả cứng:

- **`authored_on` PHẢI có trong bản published.** Không có nó, thuật toán supersede của CCR *lần sau* không có gì để so và buộc rơi về `last_updated.date` — tức **ngày publish**. Một doc viết 2026-08-01 nhưng publish 2026-09-28 sẽ trông "mới hơn" một doc viết 2026-09-15. Đó là lỗi im lặng, hướng sai, và làm supersede **đảo chiều**. `authored_on` là ngày của nguồn nghiệp vụ, **không** phải run/act reference — nó không vi phạm §5a.
- **`ref.quote` KHÔNG được publish.** Hai lý do: (a) `knowledge/` nói sự thật hiện tại, không nói quá trình; (b) thực dụng — một quote trích từ doc dev có thể chứa chữ `act_id`, `gate`, hay một đường `runs/context` và sẽ trip `FORBIDDEN_PATTERNS` của `scripts/publish-knowledge.mjs` ở một chỗ hoàn toàn vô tội. Quote sống trong `runs/` cho reviewer audit là đủ.
- **`ref` là một CÂU TRÍCH DẪN TỰ MÔ TẢ, không phải con trỏ phân giải được.** Nó phải còn **đọc hiểu được sau khi nguồn gốc đã bị xoá** — xem §5a ("Knowledge tự chứa"). Cụ thể: KHÔNG dùng cú pháp đường dẫn (`a/b/c.md`), KHÔNG `DOC-\d`/`DSEC-`/`CLM-`, KHÔNG `runs/`, KHÔNG `input/docs/`. Viết tên tài liệu như **con người gọi nó**, cộng version/mục/mã ticket. URL được phép **như một tiện ích**, không phải như điều kiện: mất URL thì `ref` vẫn phải nói được "ai/cái gì đã xác nhận điều này, bản nào, ngày nào".
  - Đúng: `Jira TIB-5460, dev doc "Rate limit" §3 (v1, PR #1182)` · `Spec "Commission Engine" v2.1 §4.2, 2026-07-30` · `Testlane TC-1234 PASS build 318, 2026-09-17`
  - Sai: `docs/kb/affiliate-kb/01-domain-entities.md §Program` (đường dẫn) · `DOC-01 DSEC-01-014` (id run-local) · chỉ một URL trần không kèm tên/version/ngày
- **`derivation`** ∈ `prose | code_artifact`, chỉ áp cho `type: "dev_doc"`. Nó phải khớp `normativity` của claim nguồn (`EXPLICIT` → `prose`; `IMPLIED_BY_CODE_ARTIFACT` → `code_artifact`). Đây là field mà Gate C5 dùng để quyết `oracle_strength` STRONG vs BASELINE — rule lấy từ một mảng validation dump ra từ code chính là trường hợp "tài liệu mô tả bug như thể đúng" cắn mạnh nhất.

`confirmation_source` là **optional**: CHỈ có mặt khi `knowledge_kind: CONFIRMED_EXPECTED`, vắng mặt ở mọi kind khác.

**Migration (2026-09-30).** `knowledge/` hiện có **28 item `CONFIRMED_EXPECTED` mà 0/28 có `confirmation_source`** (`product-base` 21, `asset-category` 6, `global-option` 1) — tức luật này đang bị dữ liệu đã publish vi phạm. Chúng được **grandfathering**: luật áp cho item được TẠO MỚI hoặc SỬA từ thời điểm này. Run nào sửa statement của một trong 28 item đó **phải** bổ sung `confirmation_source` cùng lúc — không được sửa nội dung mà để nguyên thiếu nguồn. Theo §12.5, những item này có `rank` 2 (không phải 3), nên chúng không supersede được ai và cũng không bị `dev_doc` tự động ghi đè.

## 4. Chuỗi định danh

Mode explore (`ZERO_DOC_BOOTSTRAP`, `BROAD_BOOTSTRAP`, `INCREMENTAL_UPDATE`, `REFRESH`, `RECONCILE`):

```text
CTX-RUN-ID -> OBJECT-ID -> FEATURE-ID -> SCN-ID -> ACT-ID
                                            |-> APIOP-ID
                                            |-> DBDELTA-ID
```

Mode doc (`DOC_BOOTSTRAP`, `CCR_INGEST` — §10):

```text
CTX-RUN-ID -> DOCSET-ID -> DOC-ID -> DSEC-ID -> CLAIM-ID
                                        |-> APIOP-ID   (tái dùng, nhưng trace về DSEC-ID)
                                        |-> ENT-ID     (tái dùng, nhưng trace về DSEC-ID)
              (song song) OBJECT-ID -> FEATURE-ID -> CLAIM-ID -> kb_id
```

`CLAIM-ID` là **vị trí kiến trúc tương đương `ACT-ID`**: đơn vị nhỏ nhất mà KB item trace về, và đơn vị mà gate đếm. Nhờ vậy mọi luật dạng "mọi X phải trace về `ACT-ID`" chuyển thể một-một sang mode doc.

| ID | Do ai sinh | Format | Ví dụ |
|---|---|---|---|
| `CTX-RUN-ID` | orchestrator | `CTX-<YYYYMMDD>-<nn>` | `CTX-20260909-01` |
| `DU-ID` | scope-planner | `DU-<nnn>` | `DU-001` |
| `OBJECT-ID` | orchestrator | `OBJ-<type>-<slug>` | `OBJ-Campaign-summer-tee` |
| `FEATURE-ID` | portal/normalizer (explore) · scope-planner đề xuất + normalizer mint (mode doc) | `FEAT-<nn>-<slug>` | `FEAT-01-artwork-upload` |
| `OBS-ID` | portal-explorer | `OBS-<nnn>` | `OBS-014` |
| `SF-OBS-ID` | storefront-explorer | `SF-OBS-<nnn>` | `SF-OBS-007` |
| `SCN-ID` | portal-explorer | `SCN-<feat>-<nn>` | `SCN-01-02` |
| `ACT-ID` | portal-explorer | `ACT-<scn>-<nnn>` | `ACT-01-02-003` |
| `APIOP-ID` | api-explorer · doc-ingest-explorer | `APIOP-<nnn>` | `APIOP-001` |
| `ENT-ID` | db-explorer · doc-ingest-explorer | `ENT-<nnn>` | `ENT-003` |
| `DBDELTA-ID` | db-explorer | `DB-<act>-<nn>` | `DB-01-02-003-01` |
| `OQ-ID` | orchestrator (lúc publish) | `OQ-<object-key>-<nnn>` | `OQ-artwork-014` |
| `DOCSET-ID` | orchestrator (lúc C0) | `DOCSET-<CTX-RUN-ID>` | `DOCSET-CTX-20260930-01` |
| `DOC-ID` | **orchestrator (lúc C0)**, theo thứ tự `doc_sources[]` | `DOC-<nn>` | `DOC-01` |
| `DSEC-ID` | doc-ingest-explorer | `DSEC-<doc-nn>-<nnn>` | `DSEC-01-014` |
| `CLAIM-ID` | doc-ingest-explorer (`DOC_BOOTSTRAP`) · skill + orchestrator (`CCR_INGEST`) | `CLM-<doc-nn>-<nnn>` · `CLAIM-<nn>` | `CLM-01-007` · `CLAIM-01` |

**`APIOP-ID` và `ENT-ID` ở mode doc PHẢI doc-scoped: `APIOP-<doc-nn>-<nnn>`, `ENT-<doc-nn>-<nnn>`.** Ở mode explore chúng là namespace phẳng (`APIOP-001`) vì một run chỉ có một explorer mint chúng. Ở `DOC_BOOTSTRAP` thì **nhiều `doc-ingest-explorer` chạy song song, mỗi agent chỉ thấy phần doc của mình** — namespace phẳng khi đó được giữ bằng may mắn, không bằng luật, và hai shard sẽ trùng số ngay khi ai đó đổi thứ tự dispatch. Doc-scoped làm trùng ID trở thành bất khả thi về cấu trúc, cùng cơ chế với `DSEC-ID`/`CLAIM-ID`.

API và DB evidence BẮT BUỘC map về `ACT-ID` (mode explore) hoặc `DSEC-ID` (mode doc). Danh sách endpoint/table rời rạc không có một trong hai bị gate loại — C2 ở mode explore, C2-DOC ở mode doc.

`DOC-ID` do **orchestrator** sinh, không phải explorer, vì nó phải khớp 1:1 với index trong `doc_sources[]` để reviewer verify được "mỗi doc source có đúng 1 artifact". Nếu explorer tự đánh số, nó có thể bỏ sót một tài liệu mà không ai biết.

`SCN-ID`, `ACT-ID`, `OBS-ID`, `SF-OBS-ID`, `DBDELTA-ID` là định danh của **quan sát**. Ở `DOC_BOOTSTRAP`/`CCR_INGEST` không có quan sát nào nên chúng **KHÔNG được sinh** — sinh ra bất kỳ ID nào trong nhóm đó là **gate FAIL**, không phải cảnh báo: đó là dấu hiệu agent đang giả vờ đã quan sát runtime để đi qua C1. Feature Profile và Checklist ở mode doc để `act_ids: []`.

`FEATURE-ID` ở mode doc do orchestrator mint từ `feature_key` mà scope-planner (hoặc CCR, mục "Đề xuất địa chỉ trong KB") đề xuất — `FEAT-<nn>-<slug>` với `nn` là số kế tiếp còn trống của object đó. Chuỗi bắt buộc ở `CCR_INGEST` rút về `OBJECT-ID -> FEATURE-ID -> kb_id`.

`DBDELTA-ID` không có tương đương ở mode doc. Một tài liệu không thể tuyên bố một delta **đã quan sát được**; tài liệu mô tả hệ quả ghi dữ liệu thì đó là một `CLAIM-ID` với `claim_kind: side_effect`.

**`SEC-<nnn>` đã được dùng sẵn trong repo này với nghĩa "security finding"** (22 file dưới `knowledge/`, 40 dưới `runs/`) — nó không nằm trong bảng trên vì chưa ai khai, nhưng nó tồn tại. Đó là lý do định danh section của tài liệu là `DSEC-` (doc section) chứ không phải `SEC-`: trùng namespace thì mọi audit grep sau này sẽ vừa false-positive vừa che leak thật. Đặt thêm ID mới thì grep cả `knowledge/` và `runs/` trước.

`OQ-ID` là định danh duy nhất cho 1 mục trong `open-questions.md` (§5a), ổn định qua thời gian (không đổi số khi resolve mục khác) — dùng để `run-manifest.json.produced_open_questions[]` (§15) tham chiếu ngược, và để CHANGELOG.md ghi "Resolved OQ-xxx".

## 5. Write scope

- Subagent CHỈ ghi vào `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>/` theo thư mục được cấp trong agent definition.
- KHÔNG subagent nào được ghi vào `knowledge/`. Chỉ `qa-context-lifecycle-orchestrator` publish, và CHỈ khi **cả 2** điều kiện sau đều đúng: (a) reviewer cho phép (`publish_allowed: true`), **và** (b) lock của (các) object bị ảnh hưởng vẫn thuộc về `ctx_run_id` của chính run này (§16 — thay cho cơ chế scan `proposal_id` cũ). Thiếu (b) → DỪNG, không ghi `knowledge/` dù (a) đã pass, trả outcome `CONFLICT` trên Proposal.
- **Thứ tự bắt buộc — publish strip diễn ra TRƯỚC khi reviewer duyệt, không phải sau:** ngay sau khi checklist-builder xong, orchestrator chạy **publish strip** (§5a) trên candidate để sinh ra `candidate/publish-preview/` (cùng cấu trúc `product-kb/<feature-key>.json`, `feature-profiles/`, `checklists/` nhưng đã loại bỏ mọi field bị cấm) — đây là bản **y hệt** những gì sẽ được copy vào `knowledge/` nếu được duyệt. Candidate gốc (`candidate/product-kb/`, `candidate/feature-profiles/`, `candidate/checklists/`) giữ nguyên đầy đủ envelope/evidence, không bị đụng tới. `context-quality-reviewer` chạy Gate C1-C5 trên candidate gốc (đầy đủ context để đánh giá coverage/conflict/assumption) như hiện tại, còn Gate C6 (zero-run-reference audit, §5a) grep trực tiếp trên `candidate/publish-preview/` — không phải đoán hay tự suy candidate đã được strip chưa. `publish_allowed: true` nghĩa là cả object gốc lẫn `publish-preview` đều pass. Khi ghi `knowledge/`, orchestrator copy nguyên `publish-preview/` sang, không strip lại lần 2.
- Không sửa file của agent khác. Cần dữ liệu bước trước thì đọc, đừng ghi đè.

```text
runs/context/YYYY-MM-DD/<ctx-run-id>/
├── input/bootstrap-request.json
├── input/ccr-fastpath-plan.json                   (§12.3a, chỉ khi run xuất phát từ CCR)
├── input/doc-manifest.json                        (mode doc: doc_id/version/generated_at/sha256 từng doc)
├── input/docs/<DOC-ID>/                           (mode doc: bản copy verbatim ĐÃ REDACT của tài liệu dev, §9)
├── raw/{portal,network,storefront}/                (mode explore; RỖNG ở mode doc — đó là invariant, không phải thiếu sót)
├── raw/ccr-evidence/<claim_key>/                   (evidence đính kèm CCR, theo từng claim — claim_key = <proposal_id>__<CLAIM-nn>)
├── raw/ccr-evidence/_ccr-full-content.md           (nội dung Proposal đã frozen, đúng 1 file phẳng)
├── intermediate/{api,db,code}/
├── intermediate/doc/{<DOC-ID>.json,_docset-index.json}   (mode doc: DocumentationEvidenceArtifact)
├── candidate/product-kb/{<feature-key>.json,_object-level.json}
├── candidate/{feature-profiles/,checklists/}
├── review/{gate-results.json,verdict.json}
└── run-manifest.json                               (gồm produced_open_questions[], §15)

runs/.locks/<product>__<object-key>.lock            (§16, gitignored, ephemeral)
runs/ccr-drafts/                                     (bản thảo CCR gốc, track git bình thường)

knowledge/
├── manifest.json                                  (index cho consumer, sinh bằng script)
├── _open-issues/consolidated-open-questions.md    (tổng hợp theo product, chỉ đọc — xem §5a)
└── products/<product-key>/
    ├── _registry.json                     (alias registry, 1 file/product)
    ├── _product-kb.json                   (OPTIONAL — mức product: vocabulary, actor, ranh giới hệ thống)
    ├── _product-summary.md                (OPTIONAL — data flow, bản đồ object/feature mức product)
    └── <object-key>/                      (object nằm TRỰC TIẾP dưới product — không có tầng objects/)
        ├── kb.json                        (mảng JSON phẳng — chỉ thuộc tính/luật dùng chung toàn object)
        ├── publish-meta.json              ({published_context_version, published_at, mode} — KHÔNG có ctx_run_id)
        ├── feature-summary.md             (trạng thái hiện tại; dòng 2 LUÔN là "**Published context version:** N")
        ├── CHANGELOG.md                   (1 dòng/thay đổi, trỏ ccr_ref)
        ├── open-questions.md              (theo object, có type — §5a)
        ├── features/<feature-key>/{kb.json,profile.json}
        └── checklists/<feature-key>.json
```

**Object nằm trực tiếp dưới `products/<key>/`, không có tầng `objects/`.** Để object folder và file mức product dùng chung một namespace an toàn, quy ước là: **mọi tên bắt đầu bằng `_` dành riêng cho mức product** (`_registry.json`, `_product-kb.json`, `_product-summary.md`, `_archive`), và **`object_key` không bao giờ bắt đầu bằng `_`**. `scripts/generate-manifest.mjs` bỏ qua mọi entry `_`-prefix khi liệt kê object, nên luật này được thực thi chứ không chỉ là quy ước.

**Ba tầng knowledge, mỗi fact thuộc đúng một tầng:**

| Tầng | Chứa gì | Ví dụ thật |
|---|---|---|
| **product** (`_product-kb.json`, optional) | vocabulary, actor, ranh giới hệ thống — thứ không object nào sở hữu | "Customer trong code = một SHOP, không phải khách hàng cuối" · 3 nhóm actor của product |
| **object** (`<object-key>/kb.json`) | boundary-set xuyên nhiều sub-type, hạ tầng cross-cutting, định danh object | artwork: "POPULATE VALUES — boundary-set (22/35 có)" · asset-category: rate-limit, presigned URL TTL |
| **feature** (`features/<key>/kb.json`) | hành vi theo user goal | phần lớn KB item |

Tầng product là **optional** và mới thêm: nó tồn tại vì một bộ tài liệu product-first thường có phần "vocabulary/overview" dùng chung mà **nhét vào object nào cũng sai** (chọn object nào?) và **nhân bản vào mọi object thì còn tệ hơn** (vi phạm dedupe, và sẽ lệch nhau sau vài lần update). Chưa có product nào dùng tầng này; không bắt buộc tạo.

`kb.json` (product-level, object-level lẫn từng feature) LUÔN là 1 mảng JSON phẳng các KB item — không bọc trong `{"items": [...]}` hay bất kỳ object nào khác. `publish-meta.json` là file duy nhất mang version/ngày publish/mode của object; các field này không bao giờ nằm trong `kb.json` (giữ `kb.json` thuần domain data) và không bao giờ có `ctx_run_id` (cấm tuyệt đối dưới `knowledge/`, xem §5a).

`knowledge/` không giữ evidence, không giữ bất kỳ pointer nào vào `runs/` — xem quy tắc bắt buộc ở §5a. Không copy HAR, screenshot hay raw DB dump vào đó (như trước), và giờ cũng không copy cả *đường dẫn tới* chúng.

`manifest.json`, `_registry.json`, `_open-issues/consolidated-open-questions.md` cũng chỉ `qa-context-lifecycle-orchestrator` được ghi, như mọi file khác trong `knowledge/`.

## 5a. Schema `knowledge/` — tự chứa hoàn toàn

### Knowledge tự chứa — nguyên tắc bao trùm

**`knowledge/` sau khi publish không được phụ thuộc vào bất kỳ thư mục, file hay hệ thống nào khác để còn dùng được.** Mọi nguồn đầu vào — tài liệu dev, file CCR, Proposal trên QA Hub, thư mục `runs/`, `docs-input/` — đều phải **xoá được** mà `knowledge/` vẫn:

1. đọc hiểu được từng KB item (vì `statement` đã là phát biểu hoàn chỉnh, không phải con trỏ),
2. quyết được item có dùng làm expected result hay không (`knowledge_kind` + `confidence` + `scope` + `confirmation_source.type`),
3. so được độ mới để xử lý supersede lần sau (`confirmation_source.authored_on` + `last_updated.date`),
4. truy được "điều này đến từ đâu" ở mức **con người đọc hiểu** (`confirmation_source.ref` dạng câu trích dẫn + `CHANGELOG.md`).

Đây là yêu cầu **mạnh hơn** "không trỏ vào `runs/`". Nó loại cả những con trỏ trông vô hại: đường dẫn tới tài liệu dev, id Proposal dùng như địa chỉ, link tới thư mục context trên QA Hub. Lý do: tài liệu dev được gửi theo đợt rồi xoá, Proposal là bản đóng băng của một lần submit, `runs/` bị prune theo §15. Một `knowledge/` còn trỏ vào chúng là một `knowledge/` **sẽ mục dần mà không ai thấy** — các con trỏ vẫn còn đó, chỉ là không dẫn tới đâu nữa.

**Phân biệt con trỏ với định danh.** `ccr_ref: "CBS-005"` và `ref: 'Jira TIB-5460, dev doc "Rate limit" §3'` là **định danh nghiệp vụ** — chúng mô tả *cái gì đã xác nhận điều này*, và vẫn mang nghĩa khi Proposal/tài liệu đã bị xoá. `path: "input/docs/DOC-01/..."` là **con trỏ** — nó vô nghĩa ngay khi file biến mất. Định danh được phép; con trỏ thì không, ở mọi field, kể cả field được phép như `confirmation_source`.

**Quy tắc cứng:** không field nào trong bất kỳ file nào dưới `knowledge/` được phép chứa `run_id`, `ctx_run_id`, `act_id`, `apiop_id`, `ent_id`, `evidence_refs`, `source_refs`, `upstream_artifact_ids`, `gate`, `candidate_local_id`, `id_remap_*`, `legacy_kb_refs`, `doc_id`, `dsec_id`, `claim_id`, `claim_key`, `docset_id`, `doc_refs`, `normativity`, `doc_support`, `claim_ids`, `strength`, hay bất kỳ đường dẫn `runs/context/...` hoặc `input/docs/...` nào. Nhóm doc (`DOC-01`, `DSEC-01-014`, `CLM-01-007`, ...) là số thứ tự **run-local** — ngoài thư mục run chúng vô nghĩa, tức chúng là cơ chế, tức bị cấm. `knowledge/` chỉ nói **sự thật hiện tại**, không nói **quá trình biết được sự thật đó**. Thêm vào đó, **không field nào được chứa cú pháp đường dẫn trỏ tới một file hay thư mục** (dạng `a/b/c.md`, `./x`, `../y`) — kể cả `confirmation_source.ref`, kể cả khi thư mục đó hiện vẫn tồn tại. `context-quality-reviewer` audit việc này bằng cách grep file published tìm các từ khoá trên trước khi cho `publish_allowed: true` — thấy là BLOCKING.

Con đường tra cứu ngược được phép chỉ gồm ba thứ: `ccr_ref` trong `last_updated`, `CHANGELOG.md`, và — **chỉ với item `CONFIRMED_EXPECTED`** — `confirmation_source` (§3). Cả ba đều là định danh **nghiệp vụ** (mã CCR, tên tài liệu + version, id test case, link comment, commit của repo **sản phẩm**), không phải cơ chế nội bộ của repo này. `confirmation_source.ref` phải là một **chuỗi citation** người đọc tự tra được và KHÔNG được chứa `DOC-\d`, `DSEC-`, `CLM-`, `runs/`, `input/docs/` — một run-local ID lọt vào đây là leak §5a nguỵ trang dưới vỏ một field được phép, và `context-quality-reviewer` audit riêng chỗ này.

**Giá trị hợp lệ của `last_updated.ccr_ref` — đúng 3 quy ước:**

| Giá trị | Khi nào |
|---|---|
| `CBS-<n>` / `CCR-<...>` / `QA-<n>` | Item do một CCR đưa vào hoặc chạm tới |
| `bootstrap` | Item sinh từ bootstrap (không có CCR nào). Ngày cụ thể đã nằm ở `last_updated.date` |
| `user-annotation` | Item do người thêm tay, không qua CCR cũng không qua bootstrap |

**Tuyệt đối không dùng `ctx_run_id` làm `ccr_ref`** — dạng `bootstrap:CTX-20260910-01` là run-id đội mũ `ccr_ref`, và nó là leak §5a đi qua đúng cái field được phép. Không grep tên field nào bắt được nó. Nếu cần biết item đến từ run nào, đó là câu hỏi thuộc `runs/`, không thuộc `knowledge/`.

Việc gộp nhiều run cùng ngày về một `bootstrap` là **chủ đích**, không phải mất mát: "item này đến từ run nào" là cơ chế nội bộ. `last_updated.date` đã phân biệt các đợt khác ngày.

**Vi phạm đã tồn tại, phải biết trước khi siết gate (2026-09-30).** Khoảng **112 file** dưới `knowledge/products/` đang có `last_updated.ccr_ref` mang giá trị dạng `"bootstrap:CTX-20260910-01"` — tức một `ctx_run_id` đội mũ `ccr_ref`. Đó đúng là loại leak mà quy tắc này nhắm tới: một định danh **cơ chế nội bộ** lọt vào `knowledge/` qua đúng cái field được phép, nên không grep tên field nào thấy nó.

Xử lý: **WARN, chưa blocking.** `scripts/publish-knowledge.mjs` báo nó ở mức cảnh báo (bật blocking bằng `PUBLISH_STRICT_IDS=1`), vì (a) biến nó thành blocking ngay sẽ chặn mọi publish của 9 object teeinblue hiện có, và (b) sửa 112 file là sửa nội dung knowledge đang được team dùng, cần một quyết định riêng chứ không phải hệ quả phụ của việc thêm gate. Giá trị đúng cho các item này là một mã CCR thật, hoặc — nếu chúng sinh ra từ bootstrap chứ không từ CCR nào — một quy ước không chứa run id (ví dụ `bootstrap:<object-key>-v1`). Mọi item **tạo mới từ nay** không được dùng dạng `bootstrap:CTX-...`.

**Schema mỗi KB item** (`kb.json` object-level và `features/<key>/kb.json`):

```json
{
  "kb_id": "KB-014",
  "topic": "...",
  "statement": "...",
  "knowledge_kind": "CONFIRMED_EXPECTED | OBSERVED_CURRENT | INFERRED | PROPOSED",
  "confidence": "HIGH | MEDIUM | LOW",
  "scope": {"environment": "staging", "role": "...", "surface": "portal", "brand": null},
  "last_updated": {"date": "YYYY-MM-DD", "ccr_ref": "CCR-2026-09-25-photo-upload"},
  "related_kb_ids": ["KB-009"],
  "confirmation_source": {
    "type": "spec_doc | dev_doc | po_dev_confirm | test_case",
    "ref": "<citation: tên tài liệu@version §heading — url>",
    "authored_on": "YYYY-MM-DD",
    "derivation": "prose | code_artifact"
  }
}
```

`scope.environment` là `staging` ở mode explore và `documented` ở `DOC_BOOTSTRAP` (tài liệu không mô tả environment nào — ghi `staging` ở mode đó là gate FAIL). Giá trị lấy từ `config/products/<key>.json` → `environments.default`.

`scope.brand` là **optional**, mặc định `null` = hành vi cốt lõi, đúng cho mọi brand/instance của product. Đặt giá trị (vd `"koin"`) khi claim chỉ đúng cho một instance. Field này tồn tại vì một product có thể phục vụ nhiều brand chạy trên cùng codebase nhưng có portal/admin/cấu hình riêng — ví dụ `qikfiliate` với instance `koin-partners`. **Không có nó thì một hành vi chỉ có ở một brand sẽ được publish như oracle cốt lõi, và QA của brand khác sẽ test một thứ không tồn tại bên họ** — loại sai mà `usable_as_oracle` không bắt được, vì item đó vẫn `CONFIRMED_EXPECTED` hợp lệ.

Đặc biệt nguy hiểm khi bộ tài liệu nguồn được viết từ **một instance** chứ không phải từ core: khi đó mặc định `null` là sai cho phần brand-specific, và `doc-ingest-explorer` phải chủ động tìm dấu hiệu brand ("riêng cho brand X", config key chứa tên brand, literal tên brand trong regex/blocklist) thay vì chờ tài liệu tự nói.

`confirmation_source` là **optional, bắt buộc khi và chỉ khi `knowledge_kind: CONFIRMED_EXPECTED`** — vắng mặt ở mọi kind khác. Định nghĩa đầy đủ (enum, shape `runs/` vs published, 3 luật về `authored_on`/`quote`/`derivation`, và note migration 28 item legacy) ở **§3** — không lặp lại ở đây.

Conflict giữ 2 statement song song ngay trong `kb.json`/feature-kb (`status: UNRESOLVED`, không có evidence path) — đủ để hiểu mâu thuẫn mà không cần mở `runs/`.

**`open-questions.md` (theo object)** — mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phải nằm ở đây trước khi orchestrator được phép publish, mỗi mục có `oq_id` ổn định (§4) và đúng 1 `type`:

| `type` | Khi nào dùng |
|---|---|
| `NEEDS_CONFIRMATION` | KB/checklist item chưa có authority xác nhận (`oracle_strength` NONE/BASELINE) |
| `CONFLICT` | 2 statement mâu thuẫn nhau — ghi thẳng cả `side_a`/`side_b` trong entry |
| `OPEN_ISSUE` | Gap khác: unknown_area, scope chưa rõ, phần chưa explore được |

Entry mẫu: `{"oq_id": "OQ-artwork-014", "type": "CONFLICT", "feature_id": "layer-config-image", "summary": "...", "side_a": "...", "side_b": "..."}`.

**Mỗi entry PHẢI được bọc trong một khối ```` ```json ```` .** Repo hiện có hai parser cho cùng file này và chúng không giống nhau: `ops-board/server.mjs` (`extractOpenQuestions`) quét brace-balanced nên chấp mọi wrapper, còn `scripts/generate-manifest.mjs` (`extractOpenQuestionEntries`) **đòi fence**. Một entry viết không có fence sẽ hiện trên ops-board nhưng **mất khỏi** `consolidated-open-questions.md` — tức mất khỏi bản gửi PO/Dev. Dùng fence là cách duy nhất để cả hai parser đều thấy.

`knowledge/_open-issues/consolidated-open-questions.md` là bản tổng hợp **theo product**, gộp mọi object-level `open-questions.md` — chỉ để đọc/gửi PO-Dev, không phải nơi tạo/sửa `oq_id`; mỗi lần orchestrator cập nhật 1 object-level file phải regenerate lại phần tương ứng ở đây, không sửa tay lệch giữa 2 tầng.

Sync lên ops-board card (§12.3b) lấy dữ liệu từ tầng object-level, không phải bản consolidated.

## 6. Redaction — chạy TRƯỚC khi ghi file

Redact về `"[REDACTED]"`:

- Header: `authorization`, `cookie`, `set-cookie`, `x-api-key`, `x-shopify-access-token`.
- Field chứa: `token`, `password`, `secret`, `api_key`, `access_token`, `refresh_token`, `signature`, `hmac`.
- PII: email, số điện thoại, địa chỉ, tên người mua, payment data.

Giữ *shape* (kiểu, có/không có field, độ dài), bỏ giá trị. Không chắc → redact và ghi vào `unknowns`.

**Ngoại lệ: domain/địa chỉ dành riêng cho tài liệu KHÔNG redact.** Cụ thể là các domain RFC 2606 (`example.com`, `example.org`, `example.net`, `*.example`, `.test`, `.invalid`) và `localhost`. Chúng không phải PII — chúng tồn tại đúng để làm ví dụ. Redact chúng vừa **phá** giá trị minh hoạ của payload mẫu, vừa dạy pipeline coi `[REDACTED]` là giá trị tài liệu thật. Mọi email/host khác vẫn redact như bình thường. Khi bỏ qua theo ngoại lệ này, ghi vào `coverage_limitations` hoặc `unknowns` của artifact rằng đã bỏ qua **cái gì và vì sao**, để reviewer không phải đoán.

Evidence còn secret/PII = **block publish**, không phải warning.

## 7. Mutation policy

Đọc `exploration_policy` trong `input/bootstrap-request.json`. Mặc định `SAFE_REVERSIBLE_ONLY`.

- DỪNG trước action trong `forbidden_actions` (mặc định `delete`, `publish_live`, `charge`, `send_notification`).
- DỪNG trước action không có đường cleanup rõ ràng.
- `cleanup_required: true` → mọi mutation phải có `cleanup_result`: `DONE` | `FAILED` | `NOT_NEEDED`.
- Không bao giờ tự nới policy. Bị chặn → ghi vào `blocking_issues`, trả về orchestrator.

## 8. Conflict

Hai nguồn evidence mâu thuẫn: GIỮ CẢ HAI trong `conflicts[]`, mỗi phía kèm evidence refs. Không âm thầm chọn phía đúng, không xoá observation cũ. Chỉ orchestrator + reviewer mới được quyết resolution, theo authority policy.

## 9. Evidence ref

Mode explore:

```json
{ "type": "screenshot|har_entry|dom_snapshot|api_response|db_query|code_ref",
  "path": "raw/portal/ACT-01-02-003/after.png",
  "act_id": "ACT-01-02-003", "note": "" }
```

Mode doc (`DOC_BOOTSTRAP`/`CCR_INGEST`) — `type: "doc_ref"`:

```json
{ "type": "doc_ref",
  "doc_id": "DOC-01",
  "dsec_id": "DSEC-01-014",
  "path": "input/docs/DOC-01/portal-campaign.md",
  "locator": { "kind": "heading_lines",
               "heading_path": ["Campaign", "Publishing"],
               "line_start": 412, "line_end": 431 },
  "quote": "<trích nguyên văn, ≤300 ký tự>",
  "note": "" }
```

`locator.kind` ∈ `heading_lines | json_pointer | table_column | changelog_entry`, tuỳ `type` của tài liệu.

`path` trỏ vào **bản copy trong run** (`input/docs/<DOC-ID>/...`), không trỏ ra file gốc ngoài repo. Orchestrator copy verbatim toàn bộ tài liệu vào đó ở bước C0 và ghi `sha256` vào `input/doc-manifest.json`. Tài liệu dev không nằm trong git và dev có thể gửi bản mới bất cứ lúc nào — nếu citation trỏ ra ngoài repo thì mọi quote sẽ thành không kiểm chứng được sau một tuần. **Đóng băng bytes trong run là điều kiện để C1-DOC là một gate chạy được**, không chỉ một gate viết cho đẹp.

Kết luận không có evidence ref → `knowledge_kind: INFERRED`, và phải khai báo như vậy.

Evidence ref (và mọi field `run_id`/`act_id` đi kèm) chỉ tồn tại trong artifact ở `runs/` (`raw/`, `intermediate/`, `candidate/`, `review/`). Chúng KHÔNG được copy sang `knowledge/` dưới bất kỳ hình thức nào, kể cả rút gọn còn 1 entry — xem §5a.

## 10. Mode

| Mode | Dùng khi | Explorer dispatch |
|---|---|---|
| `ZERO_DOC_BOOTSTRAP` | Chưa có tài liệu, target là một object rõ ràng. Không spawn scope-planner, không chạy semantic diff/KCP/reconciliation, không dùng Requirement Analysis chỉ để giải thích observed behavior | ≥1 runtime |
| `BROAD_BOOTSTRAP` | Nhiều object/role/module | ≥1 runtime |
| `DOC_BOOTSTRAP` | Có bộ tài liệu do dev gen từ source code nhưng KHÔNG có quyền truy cập runtime (không credential, không staging, không DB). Toàn bộ knowledge đến từ tài liệu; tuyệt đối không explore. **LUÔN** spawn `qa-context-scope-planner` (mục lục tài liệu là nguồn phân rã object/feature duy nhất) và `doc-ingest-explorer`; KHÔNG spawn portal/storefront/api/db/code-config explorer. Gate C1/C2 được thay bằng C1-DOC/C2-DOC (§12.6) | **0** |
| `INCREMENTAL_UPDATE` | Chỉ feature/dependency bị ảnh hưởng, và **có explore hẹp thật** | ≥1 |
| `CCR_INGEST` | Object đã publish (có base version), CCR mang nguồn `S3` (§12.3a) đến. Chuẩn hoá thẳng vào KB, **0 explorer**. Đây là **mode mặc định cho CCR** từ nay; `INCREMENTAL_UPDATE` là fallback khi có claim buộc phải explore. Gate C1/C2 → C1-DOC/C2-DOC. Được phép supersede (§12.5) | **0** |
| `REFRESH` | Xác minh lại knowledge cũ | ≥1 |
| `RECONCILE` | Xử lý evidence mâu thuẫn | ≥1 |

### 10a. Ranh giới giữa các mode — và luật chống gaming

| | `ZERO_DOC_BOOTSTRAP` | `DOC_BOOTSTRAP` | `CCR_INGEST` | `INCREMENTAL_UPDATE` |
|---|---|---|---|---|
| Nguồn sự thật | quan sát runtime | văn bản tài liệu | nguồn `S3` trong CCR | quan sát hẹp |
| Base version | không cần | không cần | **bắt buộc có** | bắt buộc có |
| Input chính | `object_target` (URL/ID thật) | `doc_sources[]` | Proposal + `claim_id` | `object_target` |
| Scope-planner | KHÔNG chạy (`NOT_APPLICABLE`) | **LUÔN** chạy, kể cả 1 object | không | không |
| Explorer được phép | portal/api/db/storefront/code-config | **chỉ** `doc-ingest-explorer` | không | như explore |
| Phân rã feature | portal sinh SCN/ACT → normalizer mint `FEATURE-ID` | planner đọc mục lục → đề xuất `feature_key`, normalizer mint | CCR khai `feature_key`, orchestrator quyết | đã có |
| `knowledge_kind` mặc định | `OBSERVED_CURRENT` | `CONFIRMED_EXPECTED` khi claim `EXPLICIT` | `CONFIRMED_EXPECTED` khi `S3` | `OBSERVED_CURRENT` |
| `scope.environment` | `staging` | `documented` | từ config product | `staging` |
| Mutation policy | `SAFE_REVERSIBLE_ONLY` | `NO_MUTATION` | `NO_MUTATION` | `SAFE_REVERSIBLE_ONLY` |
| Gate C1/C2 | C1/C2 | **C1-DOC/C2-DOC** | **C1-DOC/C2-DOC** | C1/C2 |
| Supersede (§12.5) | n/a | n/a | **được phép** | không |
| `oracle_strength` điển hình | `BASELINE` | `STRONG` (derivation prose) / `BASELINE` (code_artifact) | như `DOC_BOOTSTRAP` | `BASELINE` |

**Mode được đọc DUY NHẤT từ `input/bootstrap-request.json.mode`** (đã settle ở Gate C0.5, lưu lại trong `run-manifest.json` kèm `mode_settled_at`). Không agent nào được suy mode từ artifact tìm thấy trên đĩa. Một run `ZERO_DOC_BOOTSTRAP` có portal capture lỗi **KHÔNG** được tự hạ xuống `DOC_BOOTSTRAP` để đi qua gate — đó là `BLOCKED`, không phải đổi mode. Tương tự, `raw/` rỗng ở mode doc là **đúng**, không phải thiếu sót cần đi tìm.

**Vì sao `CCR_INGEST` là mode mới chứ không phải đổi tiêu chí `INCREMENTAL_UPDATE`** — ba lý do cứng:

1. `mode` được ghi vào `publish-meta.json` và là **thứ duy nhất** consumer thấy để biết version đó sinh ra thế nào. `artwork/publish-meta.json` hiện là `"INCREMENTAL_UPDATE"` với nghĩa "đã explore hẹp, có quan sát thật". Đổi tiêu chí của nó làm mọi version cũ đổi nghĩa **hồi tố**, và mất luôn cách phân biệt "explore hẹp" với "0 quan sát".
2. Gate applicability đối nghịch: `INCREMENTAL_UPDATE` vẫn **PHẢI** FAIL C1/C2 khi thiếu `SCN-ID`/`ACT-ID`; `CCR_INGEST` phải trả `NOT_APPLICABLE`. Một mode không mang được hai luật ngược nhau.
3. Supersede (§12.5) chỉ được phép ở mode doc-based. Ở `INCREMENTAL_UPDATE` (quan sát vs quan sát) §12.4 rule 1 giữ nguyên.

**Mode settling — điểm dễ sai nhất.** Một CCR có thể có claim mạnh và claim yếu lẫn nhau. Luật:

- Run bắt đầu với `mode: "CCR_INGEST"` **provisional** trong `run-manifest.json`.
- Gate C0.5 chốt lại: **`mode` cuối là `CCR_INGEST` khi và chỉ khi 0 explorer được dispatch**; ≥1 explorer → hạ xuống `INCREMENTAL_UPDATE`. Ghi `mode_settled_at: "C0.5"`.
- **Mặc định khuyến nghị: tách, không trộn.** Claim đủ mạnh → publish ngay ở `CCR_INGEST` (§12.4 rule 3 đã cho publish từng phần). Claim yếu → không explore, park thành `PROPOSED` + OQ, và nêu trong `results.open_questions` rằng cần một CCR khác có nguồn, hoặc một run `INCREMENTAL_UPDATE` riêng. Trộn làm `publish-meta.mode` **nói dối về nửa còn lại**.
- Operator vẫn chọn trộn → `mode = INCREMENTAL_UPDATE` (trung thực: có quan sát), và độ mạnh từng item vẫn truy được qua `confirmation_source.type` của chính item đó. **Mode là thô, `confirmation_source` mới là chính xác** — đây là lý do KHÔNG thêm field nào vào `publish-meta.json`.

## 11. Worker-to-skill binding

Catalog §2.1 quy định mỗi runtime role nạp một skill. Các skill sau **chưa tồn tại** trong repo này: `qa-product-discovery`, `qa-context-modeling`, `qa-review-gates`, `qa-context-selection`, `qa-impact-analysis`, `qa-test-data-design`, `qa-test-data-provisioning`, `qa-test-execution`, `qa-defect-triage`, `qa-automation-policy`.

Skill đã có: `qa-requirement-analysis`, `gen-testcase`, `create-test-data`.

Cho tới khi skill tương ứng tồn tại, agent dùng hướng dẫn viết sẵn trong agent definition của mình. Khi skill xuất hiện, nạp skill ở đúng mode và coi nó là nguồn ưu tiên hơn.

## 12. Context Change Request (CCR)

QA member không sửa `knowledge/`. Khi họ phát hiện context thiếu/sai/cũ/mâu thuẫn trong lúc test, họ gửi **Context Change Request** và `qa-context-lifecycle-orchestrator` là bên duy nhất quyết định nó có vào canonical context hay không.

### 12.1 Kênh

CCR đi qua 2 bước, 2 entity khác nhau trên QA Hub (`qa-hub.ownego.com`) — **task và proposal không phải là một**:

1. **Soạn nháp trên task**: người gửi mở task liên quan, đính kèm **1 file CCR** (field CCR của task, giống cơ chế attachment) — file Markdown điền theo khuôn CCR chuẩn của skill `create-ccr` (`references/ccr-template.md`) — khuôn dùng chung cho mọi product; repo này chỉ cấp phụ lục product-specific ở `contracts/ccr-product-appendix.md` (publish cho consumer ở `how-to-request/`). Không phải JSON payload. Có thể sửa/thay file này nhiều lần trước khi Submit.
2. **Submit → tạo 1 Proposal độc lập**: bấm **Submit CCR** — QA Hub chỉ kiểm tra thô là file không còn sót placeholder `<<< ... >>>` (không parse, không hiểu nội dung — đúng nguyên tắc §2 rule 2 "không tự bịa", áp dụng ngược: QA Hub cũng không tự suy field nào đã điền). Hợp lệ → QA Hub tạo **1 Proposal mới** (id dạng `CBS-<n>`), copy nội dung file vào đó (Proposal **immutable** — sửa lại file trên task sau đó KHÔNG làm thay đổi Proposal đã tạo), Proposal nhảy vào cột `Todo` trên tab "Context Builder Board" của project. Task gốc **không đổi status**, không đổi gì ngoài `ccr_status=submitted` — task và board hoàn toàn tách biệt, một task có thể sinh ra nhiều Proposal theo thời gian (mỗi lần Submit là 1 Proposal mới, kể cả resubmit sau `NEEDS_INFO`).

Việc "bắt đầu xử lý" là hành động thủ công riêng: người gửi (hoặc người phụ trách) **tự kéo card Proposal từ `Todo` sang `In Progress`** trên tab Context Builder Board khi sẵn sàng để orchestrator nhặt (đây là card Proposal, không phải task — task không có mặt trên board này). Đây là tín hiệu duy nhất orchestrator dựa vào — không có polling/daemon nào tự động bắt Proposal ở trạng thái `Todo`.

Orchestrator nhặt request ở đầu mỗi run `CCR_INGEST`/`INCREMENTAL_UPDATE`/`RECONCILE`, gọi MCP tool `list_context_board_proposals` (server `qa-hub`, đăng ký trong `.mcp.json`) lọc `status=in-progress`, **một lần cho MỖI product `ACTIVE`, luôn truyền `project_id` = `config/products/<key>.json` → `qa_hub.project_id` của product đó**, rồi `get_proposal(proposal_id)` để lấy **nội dung file markdown đã đóng băng tại thời điểm submit** (không còn JSON payload có field parse sẵn — `content` trả về là text thô của file CCR):

```text
// một lần cho MỖI product ACTIVE trong config/products/
mcp__qa-hub__list_context_board_proposals({ status: "in-progress", project_id: <config.qa_hub.project_id> })
mcp__qa-hub__get_proposal({ proposal_id })
  // → { id, projectId, sourceTaskId, filename, contentType, sizeBytes, status, submittedBy, submittedAt, doneAt, updatedAt, content }
```

QA Hub (`qa-hub.ownego.com`) là board dùng chung cho nhiều product (Checkout Customizer, Custom Product Options, Duos B2B, Mobile App QA, Slide Cart Drawer, Qikify Affiliate, ...). **Repo này là một repo, phục vụ N product-key** — mỗi product có một file `config/products/<key>.json`; tập product mà repo chịu trách nhiệm chính là tập file `status: ACTIVE` trong thư mục đó. **Không bao giờ** gọi `list_context_board_proposals` thiếu `project_id`. Dựng map `project_id → product_key` từ `config/products/*.json`; Proposal có `projectId` **không** nằm trong map → bỏ qua, không xử lý, ghi log — kể cả khi nó đang `in-progress` và nội dung trông tương tự. Đây là hàng rào an toàn cũ được generalize từ 1 id thành N id, không phải nới lỏng nó: hàng rào bây giờ là một gate tường minh (không khớp config → skip), không phải một câu văn trong agent definition. Lỗi hoặc 401 ở một product → ghi log và **tiếp tục** product khác, không abort cả vòng quét.

Orchestrator tự đọc `content` theo đúng cấu trúc mục của khuôn CCR chuẩn của skill `create-ccr` (`references/ccr-template.md`) (Phần 1 = observation, Phần 2 = where_observed, Phần 3 = build/canon check, Phần 4 = authority/explicitly_not_proposing, Phần 5 = evidence) — không có field JSON để trỏ tới, đọc như đọc một tài liệu markdown bình thường. QA Hub chỉ đảm bảo file không còn placeholder `<<< ... >>>` khi Submit; nó **không** đảm bảo mục nào đã đủ hay đúng cấu trúc — việc đó là của orchestrator, giống hệt cách nó vẫn tự thẩm định mọi Product KB observation khác. `sourceTaskId` chỉ để tham chiếu ngược (biết CCR này xuất phát từ task nào trên QA Hub) — không cần đọc gì thêm từ task đó, mọi thứ cần đã nằm trong `content`.

Nhiều Proposal cùng ở `in-progress`: được nhặt và chạy **song song** miễn không đụng lock object/feature (§16) — không còn quy ước xử lý tuần tự theo `submittedAt`. Hai Proposal cùng đụng 1 object thì Proposal claim lock sau nhận `CONFLICT` ngay lập tức (§12.4 rule 0), không cần đợi theo thứ tự submit.

Không dùng inbox dạng file trong repo — người gửi ở máy khác, repo khác, nên file local không tới được.

### 12.2 Triage — 5 kết cục

| Kết cục | Nghĩa | Hành động |
|---|---|---|
| `ACCEPTED` | Đủ evidence, sẽ vào context | Explore/update vùng bị ảnh hưởng → publish → comment kèm version mới |
| `NEEDS_INFO` | Thiếu thông tin để quyết | Comment nêu **chính xác** thiếu gì; để issue mở |
| `CONFLICT` | Mâu thuẫn với knowledge hiện có | Giữ CẢ HAI phía kèm evidence, hỏi authority, KHÔNG tự chọn bên |
| `REJECTED` | Không vào context | Comment nêu lý do; không xoá issue |
| `DEFERRED` | Đúng nhưng chưa làm bây giờ | Comment nêu điều kiện để được làm |

Board status của Proposal trên QA Hub chỉ có 4 giá trị — `todo` · `in-progress` · `blocked` · `published` (không có `in-review`; toàn bộ pipeline chạy trong lúc Proposal ở `in-progress`, kể cả bước `context-quality-reviewer`). Map từ 5 kết cục triage:

| Kết cục | Board status | Ghi chú |
|---|---|---|
| `ACCEPTED` | `published` | Duy nhất outcome đưa Proposal tới `published` |
| `NEEDS_INFO` / `CONFLICT` / `REJECTED` / `DEFERRED` | `blocked` | Cả 4 đều "không tự đi tiếp được, cần người xử lý" — tương đương `blocked` của `ops-board` local (artifact có `blocking_issues[]`/`gate.blocking_findings[]` không rỗng). Khác nhau ở nội dung `results` gửi kèm, xem 12.4 |

### 12.3 CCR thế nào là chạy được ngay

Gate C0 cần 5 thứ, nhưng **CCR chỉ cung cấp 2**. Ba thứ còn lại là chính sách của bên sở hữu môi trường — người gửi không có cơ sở để quyết và **không được hỏi**:

| Gate C0 cần | Nguồn trong file CCR (mục theo khuôn chuẩn của skill `create-ccr`) |
|---|---|
| product | Phần 1 — "Object": orchestrator map `object_key` về `product_key` qua `_registry.json` của từng product. Repo này phục vụ **mọi** product có `config/products/<key>.json` với `status: ACTIVE`. Object không map được về product active nào → `NEEDS_INFO` "Phần 1 — Object" |
| environment | **Cố định = `config/products/<key>.json` → `environments.default`** (`staging` với product có explore; `documented` với product doc-only — §14). Phần 2 — "Environment" trong CCR chỉ mô tả nơi **người gửi** quan sát ban đầu (có thể staging/production/không rõ — kể cả case thật trên production do khách hàng report), KHÔNG quyết định môi trường context builder dùng để re-explore. Không bao giờ trả `NEEDS_INFO` chỉ vì mục này ghi "không rõ" hoặc "production". |
| object target | Phần 2 — "URL / ID cụ thể" + "Trạng thái đối tượng lúc đó" — **best-effort** |
| role dùng để explore | **Orchestrator tự chọn.** "Role của bạn lúc quan sát" ở Phần 2 là dữ kiện, không phải chỉ định |
| mutation policy | **Orchestrator tự áp** theo chính sách mặc định (§7). Không có trong CCR |

URL/ID ở Phần 2 là best-effort có chủ đích: người gửi có thể chỉ có quyền storefront, không có quyền portal. Một CCR chỉ đưa được storefront URL **vẫn hợp lệ** — orchestrator dùng `_registry.json` + quyền của mình để map sang target portal. Trả `NEEDS_INFO` chỉ vì thiếu URL portal là đẩy việc của mình sang người không làm được.

Trả `NEEDS_INFO` khi thiếu object ở Phần 1, hoặc không đủ dữ kiện ở Phần 2 để xác định object nào — và phải nêu **đúng tên mục** trong file (vd: "Phần 1 — Object"), không nói chung chung kiểu "thiếu thông tin". Environment KHÔNG BAO GIỜ là lý do trả `NEEDS_INFO` (xem bảng gate C0 ở trên — environment cố định = staging theo chính sách dự án).

Ba mục khác không chặn run nhưng quyết định chất lượng đầu ra — nếu trống hoặc ghi "không rõ", ghi vào `unknowns` chứ đừng tự suy:

- Phần 3 — "Build / version / ngày deploy" — thiếu thì **không được kết luận** một hành vi là "mới" hay "cũ"; đây là nguồn gốc của conflict giả.
- Phần 4.1 — "Có ai xác nhận đây là hành vi ĐÚNG không" — `KHÔNG AI` thì knowledge vào context là `OBSERVED_CURRENT`, không bao giờ tự nâng thành `CONFIRMED_EXPECTED`.
- Phần 1 — "Thấy mấy lần" — 1 lần thì `confidence: LOW`, không tổng quát thành rule (§3).

Người gửi khai báo cố ý bỏ trống ngay trong file (ghi "không rõ" theo đúng hướng dẫn ở đầu template) thay vì để trống im lặng. Một chỗ trống được khai báo thì xử lý được; một chỗ trống bị lấp bằng phỏng đoán sẽ lan vào KB và vào mọi test case sinh từ đó.

### 12.3a Gate C0.5 — CCR Source Strength Assessment

Đổi tên từ *Fast-path Assessment*, và đổi cả bản chất: không còn boolean `fastpath` mà là **bậc độ mạnh nguồn**. Lý do: §12.5 (supersede) cũng cần đúng con số đó — dùng lại một thang, không định nghĩa hai lần ở hai chỗ rồi để chúng lệch nhau.

Ngay sau Gate C0 và **sau khi đã khoá lock** (§12.4 rule 0), orchestrator đánh giá **từng dòng** trong bảng "Phạm vi thay đổi & ảnh hưởng ước tính" (Phần 1 của CCR) — từng claim một, không đánh giá cả CCR gộp.

**Thang độ mạnh (S-tier):**

| Bậc | Nguồn | Được phép làm gì |
|---|---|---|
| `S3` | `spec_doc` · `dev_doc` · `po_dev_confirm` · `test_case` (§3), có locator + link + `authored_on` + trích **nguyên văn** | Normalize thẳng, **0 explorer**, `knowledge_kind: CONFIRMED_EXPECTED` kèm `confirmation_source`, được supersede (§12.5) |
| `S1` | Ảnh/HAR/API capture do người gửi tự chụp, không kèm nguồn `S3` nào | Normalize thẳng, nhưng `OBSERVED_CURRENT` + `confidence: LOW` + **không** `confirmation_source` + OQ `NEEDS_CONFIRMATION` kèm `kb_id`. **KHÔNG explore.** Không được làm oracle |
| `S0` | Chỉ lời kể, không artifact, không link | Không nạp. `NEEDS_INFO` nêu **đúng tên mục** trong file CCR |

`S1` **không explore** là chủ ý: giai đoạn sau bootstrap là "chuẩn hoá, không explore lại". Explore chỉ chạy khi operator yêu cầu tường minh — và khi đó run trở thành `INCREMENTAL_UPDATE`, không phải `CCR_INGEST` (§10a, mode settling).

Đây là hai thay đổi so với bản trước, cả hai đều tường minh: bản trước nói *"Screenshot/API capture... claim đó vẫn phải explore"* → nay claim đó được park, không explore. Bản trước nói *"KHÔNG tự động nâng `knowledge_kind`"* → nay nguồn `S3` **có** nâng lên `CONFIRMED_EXPECTED`; chỉ `S1` là không nâng.

Ghi chú về `S1`: nó vẫn gán `OBSERVED_CURRENT` dù người quan sát là người gửi CCR, không phải repo này. Về ngữ nghĩa §3 thì hơi rộng, nhưng **không thêm field mới vào KB item published** để phân biệt — schema published chỉ được nới đúng một field là `confirmation_source`. Dấu hiệu phân biệt thực dụng: `S1` luôn `confidence: LOW` **và** luôn có một OQ `NEEDS_CONFIRMATION` trỏ về `kb_id` của nó.

**Với claim `S3`:** copy evidence đính kèm vào `raw/ccr-evidence/<claim_key>/`, KHÔNG dispatch explorer nào cho claim đó, đưa statement kèm `confirmation_source` cho `qa-knowledge-normalizer`.

**Output bắt buộc — `input/ccr-fastpath-plan.json`** (giữ nguyên tên file: nó đã có hai consumer thật là reviewer audit và normalizer bước 1; đổi tên là công vô ích). Nội dung mới:

```json
{ "proposal_id": "CBS-007",
  "product_key": "teeinblue",
  "object_key": "sdk",
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
        "ref": { "locator": "...", "url": "...", "authored_by": "...", "authored_on": "2026-09-29", "quote": "..." },
        "derivation": "prose" },
      "shipped": "SHIPPED | NOT_SHIPPED | UNKNOWN",
      "kb_address": { "feature_key": "genai-personalization-runtime", "feature_is_new": false,
                      "scope": { "environment": "staging", "role": "buyer-guest", "surface": "storefront" } },
      "relation": "ADD | SUPERSEDES | CONTRADICTS | UNKNOWN",
      "target_kb_ids": ["KB-126"],
      "required_explorers": [] } ],
  "overall_decision": "..." }
```

`strength` thay `fastpath`. `shipped`, `kb_address`, `relation`, `target_kb_ids` là **input bắt buộc** của §12.5 — không có chúng thì supersede không tất định. File này thuộc `runs/`, không copy sang `knowledge/`.

**Tương thích ngược — bắt buộc.** Proposal là immutable, nên CCR do skill bản cũ sinh ra vẫn sẽ tới orchestrator bản mới. Thiếu cột `Claim ID` → orchestrator tự đặt `CLAIM-01..n` theo **thứ tự dòng bảng** và ghi `claim_id_source: "positional"`. Thiếu Phần 5.1 → mọi claim về `S1`/`S0`. **Không** trả `NEEDS_INFO` chỉ vì thiếu cột hoặc thiếu mục mới — chỉ `NEEDS_INFO` khi không xác định được object. Trả `NEEDS_INFO` vì template cũ là đẩy việc sang người không sửa được template.

`context-quality-reviewer` audit lại từng claim (Gate C1-DOC + audit "C0.5 source strength", §12.6): `confirmation_source` phải đủ key và `ref` phải resolve về nguồn thật. Thiếu hoặc mơ hồ → claim đó **không được publish làm `CONFIRMED_EXPECTED`**, hạ xuống `PROPOSED` + OQ. Lưu ý: **không** được nói "quay lại explore" như bản trước — ở `CCR_INGEST` không có lane explore nào để quay lại, và đó là một lỗi logic sẽ bung ra ngay run đầu.


### 12.3b Đồng bộ open-question lên ops-board card

Mọi `NEEDS_CONFIRMATION`/`CONFLICT`/`OPEN_ISSUE` phát sinh trong run phải vào `open-questions.md` đúng type (§5a) trước khi publish — thiếu là BLOCKING. **Không cần bước "push" riêng lên ops-board**: `ops-board/server.mjs` tính lại toàn bộ card từ file trên đĩa ở mỗi request `/api/board` (đọc thẳng `run-manifest.json`/`candidate/`/`review/` và, từ bản redesign này, thẳng `open-questions.md` của object đang xử lý — xem `readOpenQuestions()`/`extractOpenQuestions()` trong file đó) — nên ngay khi orchestrator ghi xong `open-questions.md`, lần load board kế tiếp tự động hiện đủ `oq_id`/`type`/`summary` (và `side_a`/`side_b` cho `CONFLICT`) mà không cần orchestrator gọi thêm API nào. Orchestrator chỉ cần đảm bảo `open-questions.md` được ghi đúng format có thể parse được (mỗi entry là 1 khối JSON — ví dụ khối ```` ```json ```` — chứa field `oq_id`; không bắt buộc 1 khuôn markdown cụ thể, miễn còn JSON hợp lệ bên trong).

### 12.4 Quy tắc bắt buộc

0. **Object/feature bị ảnh hưởng phải được khoá thật (lock file, §16) trước khi làm bất cứ việc gì, không chỉ scan-và-huỷ.** Vì Proposal ở `in-progress` suốt cả pipeline và không có trạng thái khoá "đang có người xử lý" ở tầng QA Hub (§12.1), nhiều orchestrator run có thể chạy đồng thời — đây là **mong muốn** (nhiều CCR/ngày, đụng object khác nhau phải chạy song song được), không phải lỗi cần triệt tiêu bằng cách xử lý tuần tự mọi Proposal. Cơ chế:
   - **Claim ngay sau khi xác định object/feature bị ảnh hưởng từ CCR (trước Gate C0.5, trước khi dispatch bất kỳ agent nào):** acquire lock `runs/.locks/<product>__<object-key>.lock` cho TỪNG object liên quan (atomic exclusive-create). CCR ảnh hưởng nhiều object → phải claim được hết mới tiếp tục; 1 cái thất bại → release toàn bộ lock đã claim, dừng ngay, báo `CONFLICT` (không tốn công explore, không chờ/polling).
   - Object khác nhau → lock khác nhau → chạy hoàn toàn song song. **Không còn xử lý tuần tự theo `submittedAt`** — nhiều Proposal `in-progress` được nhặt và chạy đồng thời miễn không đụng lock.
   - **Bắt buộc, ngay trước Publish (§5) — gate thật sự, không được bỏ qua:** verify lock của object đó vẫn thuộc về `ctx_run_id` của chính run này (đề phòng TTL hết hạn giữa chừng do run chạy quá lâu hoặc crash). Không còn thuộc về mình → KHÔNG ghi `knowledge/`, trả `outcome: CONFLICT`, không tự chọn ai "đúng hơn".
   - Release lock ngay khi run kết thúc (publish xong hoặc BLOCKED/REJECTED/CONFLICT) — xem §16 cho chi tiết TTL/định dạng lock file.
1. **Không tự resolve conflict** (đúng §8) — áp cho mode explore, và cho product có `supersede_policy.enabled: false` trong `config/products/<key>.json`. Item đang conflict KHÔNG được publish làm oracle. Ghi vào KB là `CONFLICTED` kèm mã CCR, để consumer thấy "đã biết là chưa ngã ngũ" thay vì thấy khoảng trống im lặng. **Ngoại lệ duy nhất:** mode `CCR_INGEST`/`DOC_BOOTSTRAP` của product có `supersede_policy.enabled: true` — khi đó áp **§12.5**, và ở đó orchestrator vẫn không phán xử nghiệp vụ mà chỉ *tính* kết quả tất định từ metadata đã khai. Sáu blocker của §12.5 STEP 6 là bất khả xâm phạm.
2. **Độ mạnh của CCR quyết định `knowledge_kind`, không phải việc nó là CCR.** Claim không có nguồn `S3` (§12.3a) → `OBSERVED_CURRENT`; người gửi quan sát thấy điều gì đó không tự biến nó thành expected behavior. Claim **có** nguồn `S3` (§3) → `CONFIRMED_EXPECTED` kèm `confirmation_source` đủ key. Tài liệu dev sinh từ source code **là** authority (`type: "dev_doc"`); một Jira ticket **trần**, không kèm doc/changelog/diff/quote/test-case, thì **không**.
3. **Publish từng phần được phép**: phần không bị chặn vẫn publish, phần bị chặn ghi rõ lý do. Không giữ toàn bộ update lại chỉ vì một item chưa ngã ngũ.
4. **Phản hồi luôn về đúng Proposal đang xử lý** (không phải task gốc) — gọi `update_context_board_proposal(proposal_id, status, results?, note?)` khi gate C0 fail ngay từ đầu, `finish_context_board_proposal(proposal_id, outcome, results?, note?)` khi kết thúc. Không đổi `status` giữa chừng khi pipeline đang chạy (vẫn `in-progress`). `results` là JSON tự do — `summary` luôn có, cộng thêm `open_questions`/`conflicts` (outcome không phải `ACCEPTED`, nêu **đúng tên mục** khi `NEEDS_INFO`) hoặc `published_context_version`/`product_kb_refs`/`feature_profile_refs`/`checklist_refs`/`feature_summary_refs` (outcome `ACCEPTED`). QA Hub chỉ lưu và hiển thị lại `results`, không parse/thẩm định (rule 6). QA Hub tự hiển thị activity/note trên Proposal (và task gốc, qua `sourceTaskId`); không dựng kênh thông báo riêng.
5. Mỗi lần publish ghi `resolved_requests: ["QA-123", ...]` vào `manifest.json` để người gửi tự kiểm chứng request của mình đã vào version nào.
6. Mỗi lần publish, orchestrator ghi `produced_open_questions: [oq_id, ...]` vào `run-manifest.json` của chính run đó — liệt kê mọi `oq_id` (§5a) mà run này tạo mới hoặc vẫn để mở. Đây là điều kiện để run được phép xoá sau này (§15) — không ghi thiếu, không ghi thừa `oq_id` không thuộc run này.

### 12.5 Supersede & conflict resolution

Áp **chỉ khi** `config/products/<key>.json` → `supersede_policy.enabled: true` **và** mode là `CCR_INGEST`/`DOC_BOOTSTRAP`. Mọi trường hợp khác giữ §12.4 rule 1 nguyên vẹn.

Section riêng vì ba file tham chiếu nó (`knowledge-diff-analyzer`, `context-quality-reviewer`, `qa-context-lifecycle-orchestrator`) và không được để mỗi file diễn giải lại một phiên bản. `knowledge-diff-analyzer` **tính** `resolution`; `qa-context-lifecycle-orchestrator` **áp**; `context-quality-reviewer` **audit**.

#### Hai hàm phụ

```text
rank(item):
  CONFIRMED_EXPECTED và confirmation_source.type ∈ enum §3   -> 3
  OBSERVED_CURRENT                                           -> 2
  INFERRED                                                   -> 1
  PROPOSED                                                   -> 0
  CONFIRMED_EXPECTED nhưng confirmation_source rỗng/thiếu    -> 2

srcDate(item):
  confirmation_source.authored_on nếu là ISO date hợp lệ
  ngược lại -> null          # KHÔNG fallback về last_updated.date
```

Dòng cuối của `rank()` xử lý đúng 28 item legacy (§3, migration): chúng là `CONFIRMED_EXPECTED` nhưng không có nguồn, nên **không** được hưởng rank 3 và cũng **không** bị một `dev_doc` ghi đè tự động — mọi cặp rơi vào `CONFLICTED`. Đúng về nguyên tắc, vì ta không biết nguồn của chúng là gì. Hệ quả phải lường trước: bốn object chứa 28 item đó sẽ sinh conflict nhiều hơn dự kiến ở các CCR đầu tiên.

#### Dùng ngày nào — và tuyệt đối không dùng ngày nào

**Chỉ dùng `confirmation_source.ref.authored_on`**: ngày tài liệu dev được viết, ngày commit của diff, ngày comment PO/Dev, hoặc ngày chạy test case. Thiếu nó → **không supersede**, đi thẳng `CONFLICTED`.

Ba ngày **không** được dùng để so, kèm lý do:

- Phần 3 "Ngày giờ quan sát" — ngày người gửi *nhìn thấy*. Không nói gì về độ mới của authority; một người có thể hôm nay quan sát một doc viết từ tháng trước.
- Phần 3 "Build / version / ngày deploy" — chỉ dùng làm **guard** ở STEP 0, không dùng để so sánh. Build mới không chứng minh statement mới đúng.
- `Proposal.submittedAt` và ngày run — hành chính.

#### Thuật toán

```text
Khớp candidate C với base item B đã publish trong knowledge/.
Khớp bằng: cùng topic (semantic) + cùng scope{environment, role, surface},
HOẶC CCR khai tường minh relation: SUPERSEDES + target_kb_ids.

STEP 0 — GUARD ship
  shipped == NOT_SHIPPED
    -> C vào KB là knowledge_kind: PROPOSED, không confirmation_source,
       KHÔNG đụng B, OQ type OPEN_ISSUE ("hành vi chưa ship"). DỪNG.
  shipped == UNKNOWN và rank(C) == 3
    -> tiếp tục, nhưng BẮT BUỘC requires_human_decision: true trên diff entry.

STEP 1 — C không khớp base nào        -> ADDED. Add bình thường. DỪNG.

STEP 2 — tương đương ngữ nghĩa
  statement tương đương VÀ knowledge_kind giống VÀ scope giống
    -> REFRESHED_ONLY. Cập nhật last_updated; cập nhật confirmation_source nếu
       C có nguồn mạnh hơn hoặc mới hơn. Không dòng CHANGELOG "superseded",
       không OQ. DỪNG.

STEP 3 — so độ mạnh   rc = rank(C), rb = rank(B)
  rc > rb  -> STEP 6        rc < rb  -> STEP 7        rc == rb -> STEP 4

STEP 4 — cùng độ mạnh
  rc == rb == 3:
     srcDate(C) và srcDate(B) đều có:
        srcDate(C) > srcDate(B) -> STEP 6
        srcDate(C) < srcDate(B) -> STEP 7
        bằng nhau               -> STEP 7
     thiếu bất kỳ ngày nào     -> STEP 7
  rc == rb == 2 -> STEP 5
  rc == rb <= 1 -> STEP 7     # hai phỏng đoán không giải quyết được nhau

STEP 5 — cả hai OBSERVED_CURRENT
  -> STEP 7. KHÔNG BAO GIỜ supersede chỉ bằng ngày quan sát.
  (Exception RE-OBSERVED_NEWER nằm sau công tắc
   supersede_policy.allow_reobserved_newer; mặc định TẮT.)

STEP 6 — SUPERSEDE
  BLOCKER — bất kỳ cái nào đúng thì lật về STEP 7, bất kể rank và ngày:
   (a) rank(B) == 3 và B.confirmation_source.type == "test_case"
       và C.confirmation_source.type == "dev_doc"
       -> test PASS nói thực tế đã chạy; doc chỉ nói ý định.
          CONFLICTED + requires_human_decision: true.
   (b) diff-analyzer tính impact == HIGH (permission / tiền / mất dữ liệu)
       -> CONFLICTED + requires_human_decision: true (giữ nguyên luật cũ).
   (c) B.status == "UNRESOLVED" hoặc B.conflict_group không rỗng
       -> không được lặng lẽ đóng một conflict đang mở bằng cách xoá một phía.
          CONFLICTED, route sang RECONCILE.
   (d) B.kb_id đang là oracle STRONG DUY NHẤT của ≥1 check đang publish
       (checklists/<key>.json: oracle.kb_ids chứa B.kb_id và
        oracle_strength == "STRONG")  VÀ  C.confidence != HIGH
       -> CONFLICTED + requires_human_decision: true.
   (e) C.scope khác B.scope ở environment/role/surface
       -> không cùng một item. Xử lý là ADDED (scope mới), KHÔNG supersede.
   (f) topic ∈ supersede_policy.never_supersede_topics
       -> CONFLICTED + requires_human_decision: true.

  Không blocker nào:
   1. Ghi C vào đúng vị trí của B, **GIỮ NGUYÊN B.kb_id**.
   2. C.last_updated = {date: <ngày publish>, ccr_ref: "<CBS-n>"}
   3. C.confirmation_source = {type, ref, authored_on, derivation}
   4. Thừa hưởng B.related_kb_ids trừ khi C khai đổi tường minh.
   5. XOÁ statement của B khỏi kb.json. Không giữ song song, không status.
   6. CHANGELOG.md thêm đúng 1 dòng, BẮT BUỘC trích NGUYÊN VĂN statement cũ:
        - 2026-09-30 (`CBS-007`, CCR_INGEST) — KB-126 superseded bởi dev_doc
          (authored 2026-09-29). Cũ: "<B.statement nguyên văn>".
          Mới: "<C.statement>".
   7. Nếu B.kb_id từng có trong một entry open-questions.md type
      NEEDS_CONFIRMATION và C giờ là CONFIRMED_EXPECTED -> gỡ entry đó và
      thêm dòng CHANGELOG "Resolved OQ-xxx" (đúng §15).

STEP 7 — CONFLICTED (hành vi cũ, không đổi)
  Giữ cả hai statement trong kb.json, cả hai status: "UNRESOLVED",
  cùng conflict_group: "CONF-<CBS-n>-<nn>". Không phía nào làm oracle.
  OQ type CONFLICT với side_a (base) / side_b (CCR).
  Outcome trên Proposal: CONFLICT — hoặc ACCEPTED nếu các claim khác đã
  publish sạch (§12.4 rule 3, publish từng phần).
```

#### Ba luật kèm theo, mỗi cái chặn một cách hỏng cụ thể

**Giữ nguyên `kb_id` của base là bắt buộc, không phải tuỳ chọn.** 240 KB item hiện có `related_kb_ids` và checklist trỏ `oracle.kb_ids`. Cấp một `kb_id` mới khi supersede sẽ **orphan mọi consumer** đang trỏ tới id cũ, im lặng.

**Item cũ đi vào `CHANGELOG.md`, không giữ trong `kb.json`.** Giữ cả hai trong `kb.json` với `status` chính là định nghĩa của `CONFLICTED` trong repo này (§5a, 42 item đang như vậy). Dùng cùng cơ chế cho "đã ngã ngũ, bên cũ thua" sẽ làm `usable_as_oracle` và `oracle.kb_ids` nhập nhằng, và consumer mất khả năng phân biệt "chưa ngã ngũ" với "đã ngã ngũ". Hệ quả phải chấp nhận: **`CHANGELOG.md` cộng git là đường phục hồi duy nhất** — vì vậy dòng CHANGELOG ở STEP 6 bước 6 phải trích statement cũ **nguyên văn**, và `context-quality-reviewer` audit đúng dòng đó. CHANGELOG hiện tại là prose tự do; nếu dòng supersede cũng viết theo văn phong đó thì supersede trở thành thao tác mất dữ liệu trên thực tế.

**Blocker (c) là ma sát CÓ CHỦ Ý.** Nó khiến một dev doc *giải quyết được* một conflict lâu năm vẫn bị chặn và route sang `RECONCILE`. Điều này sẽ trông như một bug với người dùng và sẽ có người muốn "sửa" nó. Lý do giữ: một conflict đang mở nghĩa là đã có người biết hai phía không ngã ngũ; đóng nó bằng cách xoá một phía dựa trên một nguồn tự động là bỏ qua đúng cái quyết định mà con người đang nợ.

### 12.6 Gate applicability theo mode

| Gate | ZERO_DOC / BROAD | INCREMENTAL_UPDATE | `CCR_INGEST` | `DOC_BOOTSTRAP` |
|---|---|---|---|---|
| C0 Admission | required | required | **biến thể**: không đòi object-target URL; đòi `proposal_id` + ≥1 claim có `claim_id` + `product_key` khớp đúng 1 file `config/products/<key>.json` | **biến thể**: `doc_sources[]` không rỗng và mỗi entry có `path`+`type`+`version`+`generated_at`; `input/doc-manifest.json` tồn tại với `sha256` từng doc; `environment: "documented"`; `mutation_policy: "NO_MUTATION"`; `role` được phép `null` |
| C0.5 Source strength | n/a | required | **required, decisive** | doc-source check |
| C1 Exploration evidence | required | required | **NOT_APPLICABLE → C1-DOC** | **NOT_APPLICABLE → C1-DOC** |
| C2 Runtime mapping | required | required nếu có API claim | **NOT_APPLICABLE → C2-DOC** | **NOT_APPLICABLE → C2-DOC** |
| C3 Product KB integrity | required | required | **required, đổi tiêu chí** (`doc_refs[]`/`confirmation_source` thay `evidence_refs`) | như `CCR_INGEST`, cộng `scope.environment == "documented"` |
| C4 Feature Profile | required | required | **required, không đổi** | required + `observed_validations[]` phải RỖNG |
| C5 Checklist | required | required | **required + phanh `derivation`** | như `CCR_INGEST` |
| C6 Publish readiness | 3 audit | 3 audit | **5 audit** | **5 audit** |

`NOT_APPLICABLE` đã là giá trị hợp lệ của `gate.decision` (§1) và của `gate_results[]`, nên công thức `publish_allowed` chỉ cần nới từ "PASS/CONDITIONAL_PASS" thành **"PASS/CONDITIONAL_PASS/NOT_APPLICABLE"** — tái dùng, không thêm gate số mới.

Năm audit của C6: zero-run-reference (§5a) · **C0.5 source strength** (§12.3a, đổi tên từ *fast-path validity*) · open-question completeness (§12.3b) · **confirmation-source validity** (§3, mới) · **supersede validity** (§12.5, mới). Cộng một **mode-consistency check**: `gate_results[]` phải chứa **đúng một** trong {C1, C1-DOC} và **đúng một** trong {C2, C2-DOC}, khớp `run-manifest.json.mode` — không bao giờ cả hai, không bao giờ không có cái nào.

Nội dung chi tiết của C1-DOC, C2-DOC và các audit mới sống trong `.claude/agents/context-quality-reviewer.md`; mục này chỉ quy định **gate nào áp ở mode nào**.

## 13. Phân phối knowledge cho team

Repo này là nơi **sản xuất**. Nơi **tiêu thụ** là repo riêng `qikify-QA/qa-knowledge`, chỉ chứa `knowledge/products/**` + `manifest.json`.

- Lý do tách: member chỉ cần đọc KB, không cần gì từ `runs/` — vì `knowledge/` giờ hoàn toàn tự chứa (§5a), không còn evidence hay pointer nào cần rewrite khi publish sang repo consumer. Quyền ghi bị chặn bằng **phân quyền GitHub** (member chỉ read), không chỉ bằng luật trong tài liệu này.
- Publish = chạy `scripts/publish-knowledge.mjs`: strip field cấm nếu candidate chưa được strip từ trước (§5a) → copy vào canonical → sinh manifest → kiểm tra nhất quán version → push kèm tag `ctx-YYYY-MM-DD`. Không còn bước rewrite evidence ref thành permalink — `knowledge/` không giữ evidence nên không có gì để rewrite.
- Object thiếu `publish-meta.json` hợp lệ (`published_context_version`, `published_at`, `mode` — không có `ctx_run_id`, field đó chỉ sống trong `run-manifest.json` ở `runs/`) phải bị đánh `UNPUBLISHED` trong manifest, hoặc script **dừng**. Không im lặng ship object không rõ version.

## 14. Credentials

Credential staging nằm trong `.env` ở project root (`TIB_STAGING_*`, `TIB_USER_A_*`, `TIB_USER_B_*`, `TIB_API_BASE`, `TIB_OPENAPI_BASE`, `TIB_*_TOKEN`, `QA_HUB_MCP_TOKEN`). File này gitignored và chỉ đọc bằng biến môi trường.

`QA_HUB_MCP_TOKEN` là Personal Access Token (`tlmcp_...`) tạo từ trang `settings/ai` trên QA Hub, dùng làm `Authorization: Bearer` khi gọi MCP server `qa-hub` (đăng ký trong `.mcp.json`). Token map 1:1 với user đã tạo nó — quyền gọi đúng bằng quyền membership của user đó trên QA Hub, không hơn.

- Đọc từ `process.env` / `os.environ`. KHÔNG `cat .env` ra output, KHÔNG in giá trị vào log hay tool result.
- KHÔNG copy giá trị credential vào bất kỳ file nào trong `runs/` hoặc `knowledge/`. Ghi tên biến (`TIB_USER_A_EMAIL`), không ghi giá trị.
- **Product có `explore.enabled: true`:** environment mặc định là `config/products/<key>.json` → `environments.default`; biến môi trường mà `environments.<env>.api_base_env` chỉ tới phải có giá trị bằng `environments.<env>.expected_api_base`. Trỏ ra ngoài `environments.allowed` (hoặc vào `environments.forbidden`, ví dụ production) là stop condition — dừng ngay, trả `BLOCKED`. Với `teeinblue`: `TIB_API_BASE` phải là `https://staging-api.teeinblue.com`.
- **Product có `explore.enabled: false`** (mode `DOC_BOOTSTRAP`/`CCR_INGEST`): **không có credential, không có api base, không có environment runtime nào**. `environment` luôn là `documented` và mọi explorer runtime bị cấm. Thiếu `.env` cho product loại này **không** phải stop condition — nó là trạng thái bình thường.
- `TIB_USER_B_*` là tài khoản khác store, dùng cho check `PERMISSION` / cross-tenant. `TIB_FORBIDDEN_TOKEN` và `TIB_INVALID_TOKEN` là fixture cho negative auth case.

## 15. Run retention & pruning

`knowledge/` **tự chứa hoàn toàn** (§5a): xoá `runs/`, xoá tài liệu dev, xoá Proposal đều không làm `knowledge/` mất khả năng sử dụng. Nên điều kiện giữ run dưới đây **không phải để bảo vệ knowledge** — nó chỉ để team còn quay lại được evidence gốc **khi open-question mà run đó để lại chưa được giải quyết**. Đó là lý do duy nhất, và vì vậy xoá run không vô điều kiện. Đừng suy ra từ mục này rằng `knowledge/` phụ thuộc `runs/`.

Một run (`runs/context/<date>/<CTX-RUN-ID>/`) được phép xoá khi **cả 2 đúng**:

1. `run-manifest.json.status` là terminal (`PUBLISHED | BLOCKED | REJECTED`).
2. Toàn bộ `oq_id` trong `run-manifest.json.produced_open_questions` (§12.4 rule 6) **không còn xuất hiện** trong `open-questions.md` tương ứng — đã được resolve bởi 1 run sau đó. Còn dù chỉ 1 `oq_id` chưa resolve → giữ nguyên, không xoá.

Khi 1 run sau resolve 1 open-question: gỡ entry khỏi `open-questions.md`, thêm 1 dòng vào `CHANGELOG.md` ("Resolved OQ-xxx — ..."). Từ đó mọi run cũ từng `produced_open_questions` chứa `OQ-xxx` tiến gần hơn tới đủ điều kiện xoá (nếu không còn OQ nào khác treo).

`scripts/prune-runs.mjs [CTX-RUN-ID]`: không tham số → quét toàn bộ run, liệt kê run đủ điều kiện xoá; có tham số → xoá nếu đủ điều kiện, từ chối kèm danh sách `oq_id` còn treo nếu chưa đủ. Không ai được xoá tay `runs/context/**` mà bỏ qua 2 điều kiện trên.

`runs/context/` bản thân vẫn track git như phần còn lại của repo (không đổi `.gitignore` cho thư mục này — thời điểm 1 run đủ điều kiện xoá không cố định, có thể rất lâu nếu open-question dai dẳng). `runs/ccr-drafts/` (bản thảo CCR gốc) không nằm trong diện xoá tự động của `prune-run.mjs`.

## 16. Concurrency lock (object/feature)

Để nhiều Proposal chạy song song an toàn (§12.4 rule 0), mỗi object/feature bị 1 CCR ảnh hưởng phải được khoá trong suốt vòng đời run.

- Lock file: `runs/.locks/<product>__<object-key>.lock` — gitignored, ephemeral, tạo bằng exclusive-create (atomic, thất bại nếu đã tồn tại và chưa hết hạn).
- Nội dung: `{"proposal_id": "...", "ctx_run_id": "...", "claimed_at": "...", "ttl_seconds": 7200, "pid": ...}`. TTL mặc định 2 giờ — hết hạn thì coi như free, run kế tiếp được claim lại (kèm cảnh báo run trước có thể đã crash).
- Claim tất cả object liên quan cùng lúc; 1 cái thất bại → release hết, báo `CONFLICT` ngay (§12.4 rule 0).
- Release khi run kết thúc ở bất kỳ trạng thái terminal nào.
- `qa-context-scope-planner` khi lập scope cho `BROAD_BOOTSTRAP` phải tránh đề xuất object đang bị khoá bởi CCR khác.
