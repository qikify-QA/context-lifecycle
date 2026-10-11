# Gates (§12.6)

Phần của contract (`contracts/qa-context-contract.md`): gate nào áp ở mode nào, và mỗi gate kiểm cái gì. Producer tự chạy self-gate của mình trước handoff; `context-quality-reviewer` chạy lại toàn bộ một cách độc lập trước publish. Định nghĩa gate chỉ nằm ở file này — agent definition trỏ về đây.

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

## C1 Exploration evidence (mode explore)

Feature candidate nhóm theo **user goal** (tên feature là tên control → FAIL) · mỗi scenario có `SCN-ID`, mỗi action có `ACT-ID` · mọi action có UI/object state trước VÀ sau · network thô của mỗi action lưu ở `raw/network/<ACT-ID>.json` · không còn secret/cookie/token/PII · mutation trong policy và có `cleanup_result` · output đánh `current_behavior_only: true`.

FAIL nếu chỉ có danh sách control, thiếu before/after, capture còn secret, hoặc có side effect ngoài policy.

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

## C2 Runtime mapping (mode explore)

Mỗi API operation có normalized route, method, observed status, request/response shape, evidence refs, và trace về `ACT-ID` · mọi network entry có đúng một nhãn `mapped`/`polling`/`unrelated`/`unknown` (do `api-explorer` gán) · có DB branch thì delta nêu entity, key, changed field, confidence, trace về `ACT-ID`.

FAIL nếu `required`/validation rule/enum được suy từ một sample duy nhất, hoặc có entry network chưa gán nhãn.

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

- `test_case` → test case thật, kết quả PASS, ngày chạy, build ≥ bản có thay đổi, kiểm đúng hành vi đang claim.
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
