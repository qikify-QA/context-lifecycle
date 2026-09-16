# QA Subagent Catalog cho hai Orchestrator

Phiên bản: 1.3  
Tài liệu liên quan: `qa-dual-orchestrators.md`, `qa-context-zero-doc-bootstrap.md`, `qa-multi-agent-blueprint.md`, `qa-skill-agent-classification.md`.

Quy ước dự án: thuật ngữ nội bộ “SDK” được hiểu là storefront/customer-facing surface. Trong catalog dùng tên rõ nghĩa `storefront-explorer`; nếu cần giữ tương thích với tên cũ, có thể đăng ký alias `sdk-explorer` nhưng description và contract phải là Storefront Discovery, không phải software package SDK.

## 1. Danh mục đề xuất

### Context Lifecycle Flow

```text
qa-context-lifecycle-orchestrator
  |
  +-- qa-context-scope-planner [subagent]
  |
  +-- discovery fan-out ---------------------------+
  |     +-- portal-explorer [subagent, đã có]      |
  |     +-- api-explorer [subagent]                |
  |     +-- db-explorer [subagent]                 |
  |     +-- storefront-explorer [subagent]         |
  |     `-- code-config-explorer [subagent]        |
  |                                                |
  +-- qa-knowledge-normalizer [subagent] <----------+
  +-- feature-profile-builder [subagent]
  +-- qa-checklist-builder [subagent]
  +-- knowledge-diff-analyzer [subagent]
  `-- context-quality-reviewer [independent subagent]
```

### Daily QA Flow

```text
qa-daily-test-orchestrator
  |
  +-- task-input-normalizer [step hoặc subagent nhẹ]
  +-- qa-requirement-analysis [skill, đã có]
  +-- qa-context-retriever [subagent + retrieval tool]
  +-- qa-use-case-modeling [skill; optional worker]
  +-- qa-change-impact-analyzer [subagent]
  +-- gen-testcase [skill, đã có; optional worker]
  +-- test-suite-reviewer [independent subagent]
  +-- test-data-planner [subagent]
  +-- create-test-data [side-effect subagent, đã có]
  +-- qa-test-executor [side-effect subagent]
  +-- defect-triage-agent [conditional subagent]
  +-- qa-automation-engineer [conditional subagent]
  `-- qa-context-feedback [skill; optional worker]
```

Không bắt buộc triển khai tất cả ngay. Danh sách MVP nằm ở cuối tài liệu. Các nhãn trong cây mô tả runtime type; skill không được gọi như một subagent. Orchestrator áp dụng skill trực tiếp hoặc spawn một worker rồi yêu cầu worker nạp skill khi cần isolation/parallelism.

## 2. Shared contract cho mọi subagent

Mỗi subagent nhận và trả Artifact Envelope:

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

Global rules:

1. Không biến `OBSERVED_CURRENT` thành `CONFIRMED_EXPECTED` nếu không có nguồn thẩm quyền.
2. Không tự bịa UI, API contract, DB schema, business rule hoặc expected result.
3. Mọi finding có source/evidence/upstream reference.
4. Không mutation production hoặc shared resource nếu không có explicit policy.
5. Không tự mở rộng scope khi thiếu input; hoàn thành phần an toàn và trả PARTIAL/BLOCKED.
6. Không tuyên bố PASS/VERIFIED nếu chưa thực hiện verification phù hợp.
7. Mỗi agent chỉ thực hiện responsibility của mình; không sửa artifact upstream âm thầm.
8. Reviewer đưa finding về producer; reviewer không tự sửa artifact.

### 2.1 Worker-to-skill binding

| Runtime role | Skill phải nạp | Mode/reference |
|---|---|---|
| portal-explorer | `qa-product-discovery` | `portal` |
| storefront-explorer | `qa-product-discovery` | `storefront` |
| api-explorer | `qa-product-discovery` | `api` |
| db-explorer | `qa-product-discovery` | `database` |
| code-config-explorer | `qa-product-discovery` | `code-config` |
| qa-knowledge-normalizer | `qa-context-modeling` | `normalize` |
| feature-profile-builder | `qa-context-modeling` | `feature-profile` |
| qa-checklist-builder | `qa-context-modeling` | `checklist` |
| knowledge-diff-analyzer | `qa-context-modeling` | `semantic-diff` |
| context-quality-reviewer | `qa-review-gates` | `context-publish` |
| Requirement Analyst worker, nếu spawn | `qa-requirement-analysis` | default |
| Use Case Modeler worker, nếu spawn | `qa-use-case-modeling` | default |
| qa-context-retriever | `qa-context-selection` | default |
| qa-change-impact-analyzer | `qa-impact-analysis` | default |
| Test Designer worker, nếu spawn | `gen-testcase` | default |
| test-suite-reviewer | `qa-review-gates` | `test-design` |
| test-data-planner | `qa-test-data-design` | default |
| create-test-data | `qa-test-data-provisioning` | campaign/Postman theo scope |
| qa-test-executor | `qa-test-execution` | UI/API/E2E theo scope |
| defect-triage-agent | `qa-defect-triage` | default |
| qa-automation-engineer | `qa-automation-policy` + framework skill | theo repository |

Artifact validator, ID generator, exact diff, traceability checker và secret/PII scanner là scripts/tools, không phải subagents.

### 2.2 Zero-doc bootstrap overrides

Khi chưa có tài liệu/context và target là một object rõ ràng, dùng contract rút gọn trong `qa-context-zero-doc-bootstrap.md`:

| Role | Mode | Trách nhiệm bootstrap |
|---|---|---|
| portal-explorer | `portal-action-capture` | Feature discovery, SCN/ACT timeline, UI before/after, DevTools network/HAR capture |
| api-explorer | `api-runtime-trace` | Map ACT-ID tới API, observed request/response shape và changed fields |
| db-explorer | `database-state-delta`, optional | Map ACT-ID tới before/after persistence changes bằng read-only access |
| storefront-explorer | `storefront`, conditional | Quan sát buyer-facing effect nếu portal feature ảnh hưởng storefront |
| qa-knowledge-normalizer | `product-kb-from-observation` | Tạo Product KB OBSERVED_BASELINE trực tiếp |
| feature-profile-builder | `feature-profile` | Tạo profile từ Product KB |
| qa-checklist-builder | `checklist` | Tạo baseline regression/exploratory-gap checklist |
| context-quality-reviewer | `bootstrap-context` | Review L0-L4 và publish version đầu |

Trong mode này không spawn Scope Planner cho một object rõ, không chạy semantic diff/KCP/reconciliation và không áp dụng Requirement Analysis chỉ để giải thích observed behavior.

# Phần A — Context Lifecycle Subagents

## A1. `qa-context-scope-planner`

### Registration description

```text
Lập kế hoạch bootstrap hoặc refresh QA product context bằng cách phân rã product/module thành object, role, state và discovery unit; ưu tiên phạm vi theo business risk và knowledge gap. Không khám phá portal/API/DB trực tiếp và không tạo Product KB.
```

### Mission và boundary

Xác định cần khám phá những gì, bằng agent nào và theo thứ tự nào để tạo context hữu ích nhanh nhất.

In scope:

- Inventory module, object type, role, state và dependency đã biết.
- Chấm priority theo criticality, usage, revenue/data risk và centrality.
- Tạo discovery units độc lập để fan-out.
- Xác định explorer phù hợp: portal/storefront/API/DB/code-config.
- Xác định coverage target cho bootstrap/refresh.

Out of scope:

- Tự khám phá behavior.
- Tạo feature list hoặc xác nhận rule.
- Tạo tổ hợp role/state không có căn cứ là hợp lệ.

### Input

- Product/module/object hint.
- Existing context manifest nếu có.
- Knowledge Change Proposals nếu update.
- Available environments, roles, tools và access policy.

### Process

1. Xác định mode: bootstrap, incremental, refresh hoặc reconcile.
2. Đọc existing coverage và KCP.
3. Lập object/role/state/layer matrix.
4. Đánh dấu `KNOWN`, `MISSING`, `STALE`, `CONFLICTED`.
5. Ưu tiên scope nhỏ tạo nhiều giá trị trước.
6. Tạo discovery unit; unit có target, purpose, explorer, input, safety policy và expected artifact.
7. Xác định dependency và nhóm có thể chạy song song.

### Output payload

```json
{
  "mode": "BOOTSTRAP | INCREMENTAL_UPDATE | REFRESH | RECONCILE",
  "coverage_matrix": [],
  "discovery_units": [
    {
      "unit_id": "DU-001",
      "target": {},
      "assigned_explorer": "portal-explorer | storefront-explorer | api-explorer | db-explorer | code-config-explorer",
      "priority": "P0 | P1 | P2 | P3",
      "dependencies": [],
      "safety_policy": {},
      "expected_artifact_type": "..."
    }
  ],
  "parallel_groups": [],
  "deferred_scope": []
}
```

### Gate

PASS khi mỗi P0/P1 gap có discovery unit, target/environment/access rõ và không có unsafe unit. FAIL khi target mơ hồ, discovery đòi quyền không có hoặc plan rộng nhưng không có priority/stop boundary.

### Handoff

Gửi từng discovery unit cho explorer tương ứng; gửi coverage matrix cho Knowledge Normalizer và Context Reviewer.

## A2. `portal-explorer` — existing

### Registration description

```text
Khám phá current behavior của một business object trong portal theo environment, role và object state cụ thể; tạo feature list, SCN/ACT action timeline, UI before/after và DevTools network capture có evidence. Không đánh giá behavior đúng hay sai so với requirement và không thực hiện action ngoài mutation policy.
```

### Required input

- Portal/environment.
- Object ID/URL/type.
- Role/session.
- Exploration scope.
- Mutation policy và forbidden actions.
- Network capture/redaction policy; mặc định capture DevTools requests/responses cho ZERO_DOC_BOOTSTRAP.

### Required output

- `OBS-ID` cho mỗi observation.
- Feature candidates map tới observations.
- `SCN-ID`/`ACT-ID`, screens/routes/actions/states/permissions và UI before/after.
- Redacted HAR/network entries map tới `ACT-ID`.
- Evidence refs.
- Unexplored areas và cleanup result.

### Gate

PASS khi đúng target/role/object, feature có action/UI evidence, network entries map ACT-ID, sensitive values đã redacted và output đánh `current_behavior_only`. FAIL nếu feature list dựa trên suy đoán, sai environment, capture lộ secret hoặc có side effect ngoài policy.

### Handoff

Chuyển toàn bộ Feature Discovery Artifact cho `qa-knowledge-normalizer`; không chỉ chuyển danh sách tên feature.

## A3. `api-explorer`

### Registration description

```text
Khám phá API surface và current API behavior liên quan một object/feature từ OpenAPI, GraphQL schema, Postman collection, network trace, source routes hoặc read-only requests được phép. Trong ZERO_DOC_BOOTSTRAP, dùng runtime-trace mode để map ACT-ID tới operation, observed request/response shape và state delta. Không phát minh endpoint và không dùng observed response làm toàn bộ contract.
```

### Mission và boundary

Xây baseline API cho Product KB và Feature Profile.

In scope:

- Inventory REST/GraphQL/webhook operations.
- Method/path/operation name, auth/authz, input/output/error/pagination.
- Map operation tới business object và capability.
- So sánh documented contract với observed response khi có.
- Thực hiện read-only hoặc explicitly allowed requests.
- Ghi rate limit, idempotency, retry và async behavior nếu có evidence.

Out of scope:

- Fuzz/mutation trên production.
- Guess endpoint/status/schema.
- Lưu token/cookie/API key trong artifact.
- Kết luận sample response bao phủ mọi branch.
- Đánh PASS/FAIL cho task cụ thể.

### Input

- API scope/object/feature hint.
- Sources: OpenAPI/GraphQL/Postman/source/network trace.
- Environment/base URL và auth context.
- Request policy: schema-only/read-only/explicit mutation list.
- Redaction policy.
- Raw Exploration Bundle với `ACT-ID` và HAR/network capture khi dùng runtime-trace mode.

### Process

1. Inventory sources và authority.
2. Trích operation và assign `APIOP-ID`.
3. Map request fields, response fields, errors và auth requirements.
4. Map business object/capability.
5. Nếu chạy request, xác nhận target và policy; dùng non-sensitive test data.
6. So documented và observed behavior; ghi mismatch, không tự chọn đúng/sai.
7. Ghi coverage: operations/states/roles chưa khám phá.
8. Trong runtime-trace mode, map mỗi relevant operation về `ACT-ID`; schema fields chỉ được ghi observed/inferred/unknown, không khẳng định required/optional từ một sample.

### Output payload

```json
{
  "api_context": {"environment": "...", "auth_role": "..."},
  "operations": [
    {
      "operation_id": "APIOP-001",
      "protocol": "REST | GRAPHQL | WEBHOOK | OTHER",
      "method_or_type": "...",
      "path_or_operation": "...",
      "business_object": "...",
      "capability": "...",
      "auth": {},
      "request_contract": {},
      "response_contract": {},
      "error_contract": [],
      "source_refs": [],
      "observed_request_refs": [],
      "knowledge_kind": "CONFIRMED_EXPECTED | OBSERVED_CURRENT | INFERRED"
    }
  ],
  "documented_observed_mismatches": [],
  "security_surfaces": [],
  "unexplored_operations": [],
  "coverage_limitations": []
}
```

### Gate

PASS khi mỗi operation có contract source hoặc observation rõ, target/auth context được ghi và secret scan sạch. CONDITIONAL_PASS nếu chỉ inventory được contract tĩnh. FAIL nếu endpoint chủ yếu do suy đoán, request vượt policy hoặc artifact chứa secret.

### Stop conditions

- Base URL/environment mơ hồ.
- Cần mutation ngoài policy.
- Credential chỉ có thể lưu trực tiếp vào artifact.
- Endpoint có billing/destructive/external-notification effect chưa được phép.

### Handoff

Chuyển API Capability Artifact cho Knowledge Normalizer và Feature Profile Builder.

## A4. `db-explorer`

### Registration description

```text
Khám phá data model và current persistence behavior của một business object từ schema, migrations, ORM models, data dictionary hoặc read-only DB access. Trong ZERO_DOC_BOOTSTRAP, dùng state-delta mode để map ACT-ID tới before/after entity changes cho selected mutation actions. Không chạy write query và không xuất production PII.
```

### Mission và boundary

Xây baseline data layer để hiểu object lifecycle, dependency và điểm kiểm tra integrity.

In scope:

- Entity/table/collection, field type/default/nullability.
- PK/FK/unique/index/check constraint.
- Relationship và ownership.
- Soft delete, audit, timestamps, timezone, precision.
- Migration/backfill artifacts.
- Read-only sample shape/statistics nếu được phép và đã redaction.
- Map entity với object/capability.

Out of scope:

- DDL/DML mutation.
- Dump production records.
- Suy schema từ UI label.
- Khẳng định business rule chỉ vì có DB constraint.

### Input

- Object/feature scope.
- Schema/migration/ORM/data dictionary hoặc read-only connection policy.
- Environment và allowed schemas/tables.
- Sensitive-field/redaction policy.

### Process

1. Xác nhận DB environment và read-only boundary.
2. Inventory entity và assign `ENT-ID`.
3. Trích field/constraint/relation cùng source locator.
4. Map lifecycle state và likely persistence transitions; inferred item phải đánh dấu.
5. Đọc migration/backfill liên quan.
6. Nếu query, chỉ dùng metadata/aggregate/redacted sample được phép.
7. Ghi unknowns, orphan risk, transaction/concurrency surface.
8. Trong state-delta mode, chỉ chạy cho selected P0/P1 mutation; snapshot disposable object trước/sau action và map mọi change về `ACT-ID`.

### Output payload

```json
{
  "db_context": {"environment": "...", "access_mode": "READ_ONLY"},
  "entities": [],
  "fields_and_constraints": [],
  "relationships": [],
  "lifecycle_states": [],
  "transaction_surfaces": [],
  "migration_history": [],
  "integrity_risks": [],
  "safe_verification_query_templates": [],
  "sensitive_fields_redacted": [],
  "coverage_limitations": []
}
```

### Gate

PASS khi entity/constraint có source, environment/read-only mode rõ và không lộ PII. CONDITIONAL_PASS khi chỉ có logical schema. FAIL nếu chạy write query, sai environment, xuất sensitive data hoặc biến inferred relation thành confirmed.

### Handoff

Chuyển Data Model Artifact cho Knowledge Normalizer và Feature Profile Builder.

## A5. `storefront-explorer`

### Registration description

```text
Khám phá current customer-facing behavior trên storefront theo shop, theme, product/campaign, market, locale, device và buyer state cụ thể. Tạo Storefront Discovery Artifact về personalization, artwork preview, variant, pricing, validation, add-to-cart và cart handoff có evidence; không tạo order thật, không đi qua payment và không coi behavior đang thấy là expected requirement.
```

### Mission và boundary

Xây baseline cho customer journey trên storefront, tách biệt khỏi merchant/admin portal và raw API.

In scope:

- Shop/storefront identity, theme name/version và app embed/block state.
- Product/campaign mapping và storefront entry URL.
- Buyer states: guest/logged-in, market, locale, currency và customer segment khi được cung cấp.
- Product/variant selection và availability.
- Personalization/options, artwork layers, input validation và dependency giữa options.
- Live/static artwork preview, loading, refresh, error và fallback state.
- Price/add-on/discount display quan sát được.
- Add-to-cart, cart drawer/cart page và line item properties/metadata nhìn thấy được.
- Quantity/update/remove và quay lại edit personalization khi an toàn.
- Responsive/device/browser/theme observations theo scope.
- Network/API observation ở mức evidence; contract analysis chuyển cho API Explorer.

Out of scope:

- Checkout payment, đặt order thật hoặc gửi confirmation nếu chưa được phép rõ ràng.
- Thay theme, publish campaign/storefront hoặc sửa shared configuration.
- Suy backend/DB behavior không quan sát được.
- Đánh current behavior là đúng chỉ vì buyer flow hoàn tất.
- Dùng thông tin khách hàng thật hoặc payment data.

### Input

- Storefront URL/shop/environment.
- Theme và version nếu có.
- Product/campaign ID hoặc URL.
- Buyer context: guest/customer role/segment.
- Market, locale, currency, device và browser scope.
- Expected object precondition: campaign/artwork/layers/product mapping.
- Exploration boundary: product page/cart/checkout-safe-boundary.
- Mutation policy và cleanup instruction cho cart/session data.

### Process

1. Xác minh đúng shop/environment, theme, product và campaign trước tương tác.
2. Ghi buyer context, market/locale/currency, browser/device và initial cart state.
3. Inventory storefront surfaces và assign `SF-OBS-ID`.
4. Khám phá variant, personalization/options và validation theo state transition có ý nghĩa.
5. Ghi artwork preview behavior và mapping giữa input/layer/preview nếu quan sát được.
6. Ghi pricing/add-on/discount display nhưng không suy calculation rule nếu không có nguồn.
7. Thực hiện add-to-cart nếu policy cho phép; verify cart item, quantity, properties và personalization representation.
8. Không vượt checkout safe boundary. Payment/order creation cần authorization riêng.
9. Thu screenshot/URL/visible text/network evidence phù hợp và redaction dữ liệu nhạy cảm.
10. Cleanup cart/session hoặc ghi retention theo policy.
11. Ghi coverage limitations theo theme, device, market, role và product state.

### Output payload

```json
{
  "storefront_context": {
    "shop": "...",
    "environment": "...",
    "theme": "...",
    "theme_version": "...",
    "product_id": "...",
    "campaign_id": "...",
    "buyer_state": "GUEST | LOGGED_IN | SEGMENTED | UNKNOWN",
    "market": "...",
    "locale": "...",
    "currency": "...",
    "browser": "...",
    "device_or_viewport": "..."
  },
  "surfaces": [],
  "observations": [
    {
      "observation_id": "SF-OBS-001",
      "surface": "PRODUCT_PAGE | PERSONALIZATION | PREVIEW | CART_DRAWER | CART_PAGE | CHECKOUT_BOUNDARY",
      "action": "...",
      "observed_result": "...",
      "state_before": "...",
      "state_after": "...",
      "evidence_refs": [],
      "knowledge_kind": "OBSERVED_CURRENT"
    }
  ],
  "feature_candidates": [],
  "variant_and_option_matrix": [],
  "artwork_preview_observations": [],
  "pricing_observations": [],
  "cart_handoff_observations": [],
  "theme_device_market_matrix": [],
  "network_observation_refs": [],
  "cleanup_results": [],
  "coverage_limitations": []
}
```

### Gate

PASS khi shop/theme/product/campaign/buyer context rõ; mỗi feature candidate có storefront observation evidence; cart mutation nằm trong policy và được cleanup; checkout boundary không bị vượt; coverage theo theme/device/market được ghi.

CONDITIONAL_PASS khi một số theme/device/market hoặc cart surface chưa khám phá nhưng phần hoàn tất có evidence và limitation rõ.

FAIL khi sai shop/product/campaign, tạo order/payment ngoài authorization, current behavior bị ghi thành confirmed expected behavior, hoặc feature list không có evidence theo storefront context.

### Stop conditions

- Storefront có thể là production nhưng policy không cho phép cart/checkout interaction.
- Action tiếp theo sẽ tạo order, charge, notification hoặc external fulfillment.
- Campaign/product mapping không xác minh được.
- Cần dùng customer/payment data thật.
- Theme/shared configuration phải thay đổi mới tiếp tục được nhưng chưa được phép.

### Handoff

Chuyển Storefront Discovery Artifact cho Knowledge Normalizer và Feature Profile Builder. Chuyển network observation refs cho API Explorer; không tự biến network trace thành full API contract.

## A6. `code-config-explorer`

### Registration description

```text
Khám phá capability và feature-control surface nội bộ từ source code, routes, configuration, flags, permissions, events và integrations. Tạo Implementation Evidence Artifact phục vụ context; không thay thế storefront-explorer, không coi implementation là desired requirement và không sửa code.
```

### Mission và boundary

Bổ sung phần portal/storefront/API/DB khó quan sát: feature flags, background jobs, permission gates, event flow và hidden configuration.

In scope:

- Locate routes/controllers/services/jobs/events/config/flags.
- Map implementation component với object/capability.
- Ghi branch/flag/role/state conditions.
- Ghi integration/dependency và failure handling có trong code.
- Đọc tests cũ như supporting evidence.

Out of scope:

- Sửa code/config.
- Root-cause bug không nằm trong discovery scope.
- Dùng tên function làm business rule khi chưa đủ evidence.
- Coi unit test cũ là current contract tuyệt đối.

### Input

- Repository root và allowed scope.
- Object/feature hints.
- Branch/commit/build mapping nếu có.
- Existing portal/storefront/API/DB artifacts để map.

### Output payload

```json
{
  "repository_context": {"path": "...", "revision": "..."},
  "components": [],
  "routes_and_handlers": [],
  "feature_flags": [],
  "permission_checks": [],
  "events_jobs_integrations": [],
  "implementation_branches": [],
  "test_evidence": [],
  "inferred_capabilities": [],
  "coverage_limitations": []
}
```

### Gate

PASS khi evidence có file/revision/locator và inferred capability được đánh đúng. FAIL nếu không xác định revision, scan vượt scope hoặc trình bày implementation như confirmed product requirement.

### Handoff

Chuyển Implementation Evidence Artifact cho Knowledge Normalizer; gửi feature-flag/dependency mapping cho Profile Builder.

## A7. `qa-knowledge-normalizer`

### Registration description

```text
Fan-in artifacts từ portal, storefront, API, DB, code và tài liệu; chuẩn hóa thành Product KB candidates có provenance, loại knowledge, environment/role/version và conflict tracking. Trong ZERO_DOC_BOOTSTRAP, mode product-kb-from-observation tạo Product KB OBSERVED_BASELINE trực tiếp từ action-linked evidence. Không tự giải quyết conflict hoặc publish canonical context.
```

### Mission và boundary

Biến evidence không đồng nhất thành knowledge items có cấu trúc mà các agent sau có thể dùng an toàn.

In scope:

- Validate upstream artifact envelope/gate.
- Dedupe statement theo semantic identity.
- Giữ multiple evidence refs.
- Phân loại confirmed/observed/inferred/proposed.
- Ghi conflict và freshness.
- Map portal/storefront/API/DB/code evidence tới cùng capability/object và cùng ACT-ID khi có.

Out of scope:

- Chọn một nguồn thắng khi không có authority policy.
- Tạo Feature Profile/checklist.
- Publish canonical KB.

### Input

- Discovery artifacts đã pass/conditional pass.
- Existing KB version nếu update.
- Authority và freshness policy.

### Output payload

```json
{
  "kb_candidates": [],
  "cross_layer_evidence_map": [],
  "duplicates_merged": [],
  "conflicts": [],
  "stale_candidates": [],
  "unmapped_evidence": []
}
```

### Gate

PASS khi mọi KB candidate có provenance/knowledge kind/context và không mất conflict. FAIL nếu observed/inferred bị nâng thành confirmed, source refs mất hoặc dedupe gộp các behavior khác nhau.

### Handoff

Chuyển KB candidates cho Feature Profile Builder và conflicts cho Context Reviewer.

## A8. `feature-profile-builder`

### Registration description

```text
Tổng hợp Product KB candidates thành Feature Profile theo user goal và capability, gồm actor, entry point, state, validation, permission, UI/API/data mapping, dependency, risk, freshness và coverage. Không tạo expected behavior khi KB chưa xác nhận.
```

### Process

1. Nhóm knowledge theo capability/user goal, không chỉ theo page hoặc endpoint.
2. Tạo hoặc update stable Feature ID.
3. Map actor/role, trigger, precondition, surfaces và state transitions.
4. Map portal/storefront/API/data/code components.
5. Tách confirmed rules, observed behavior, unknowns và limitations.
6. Tính coverage theo layer × role × state × environment.
7. Ghi dependency và related profiles.

### Input/output

Input: KB candidates, existing profiles, object taxonomy, authority/freshness policy.

Output:

```json
{
  "feature_profiles": [],
  "profile_relationships": [],
  "coverage_matrix": [],
  "unassigned_kb_items": [],
  "profile_conflicts": [],
  "profile_change_summary": []
}
```

### Gate

PASS khi profile có stable identity, user goal, evidence mapping, coverage/freshness và không leak assumption. CONDITIONAL_PASS nếu đủ cho regression discovery nhưng oracle còn unknown. FAIL nếu profile chỉ là danh sách UI/API hoặc gộp capability không cùng goal.

### Handoff

Chuyển profiles cho Checklist Builder và Diff Analyzer.

## A9. `qa-checklist-builder`

### Registration description

```text
Tạo hoặc cập nhật Regression Checklist từ Feature Profile, confirmed business oracle, observed surfaces và risks. Checklist là test conditions tái sử dụng, không phải task-specific test cases; các check thiếu oracle phải NEEDS_CONFIRMATION.
```

### Process

1. Xác định core capability và P0/P1 risks.
2. Tạo checks cho core, negative, boundary, permission, state/data, integration và regression khi applicable.
3. Gắn applicability condition và layer.
4. Map mỗi check tới feature/KB/risk/oracle.
5. Dedupe semantic checks.
6. Đánh `NEEDS_CONFIRMATION` nếu chỉ có observation/proposal.
7. Ghi manual/automation suitability ở mức gợi ý.

### Output payload

```json
{
  "checklists": [],
  "coverage_by_feature_and_risk": [],
  "checks_needing_confirmation": [],
  "duplicates_removed": [],
  "excluded_dimensions": []
}
```

### Gate

PASS khi core/risk coverage rõ, check có applicability và traceability. FAIL nếu expected oracle là assumption, checklist sao chép feature list không có test intent hoặc tạo case trùng để tăng số lượng.

### Handoff

Chuyển checklist candidate cho Diff Analyzer và Context Reviewer.

## A10. `knowledge-diff-analyzer`

### Registration description

```text
So sánh candidate Product KB/Feature Profile/Checklist với canonical version, phân loại added/changed/deprecated/conflicted và tính blast radius. Không tự publish hoặc giải quyết business conflict.
```

### Input/process/output

Input: base context version, candidate artifacts, KCPs.

Process:

1. Validate same product/taxonomy/version lineage.
2. Semantic diff, không chỉ text diff.
3. Phân biệt evidence refresh với behavior change.
4. Tính impacted profiles/checklists/tasks/automation.
5. Đề xuất version bump và migration/deprecation notes.

Output:

```json
{
  "base_version": "...",
  "candidate_version": "...",
  "added": [],
  "changed": [],
  "refreshed_only": [],
  "deprecated": [],
  "conflicted": [],
  "blast_radius": [],
  "recommended_version_change": "PATCH | MINOR | MAJOR"
}
```

### Gate

PASS khi mọi change có before/after/source/reason và blast radius. FAIL nếu text reorder bị coi là behavior change, removed knowledge bị hard-delete hoặc breaking change không được flag.

### Handoff

Chuyển candidate + diff cho Context Quality Reviewer.

## A11. `context-quality-reviewer`

### Registration description

```text
Review độc lập Product KB, Feature Profile, Checklist và semantic diff trước publish; kiểm provenance, knowledge-kind integrity, conflict, coverage, freshness và version consistency. Không tự sửa hoặc publish artifact.
```

### Review focus

- Mỗi KB item có evidence và context.
- Observation không thành expected rule trái phép.
- Profile có capability identity và cross-layer mapping.
- Checklist có oracle/applicability và không duplicate.
- Diff không mất knowledge/conflict.
- Version/freshness/coverage manifest nhất quán.

### Output

```json
{
  "decision": "APPROVED | APPROVED_WITH_CONDITIONS | REJECTED",
  "findings": [],
  "coverage_findings": [],
  "assumption_leakage": [],
  "publish_conditions": [],
  "allowed_next_steps": []
}
```

### Gate

REJECT nếu có provenance loss, assumption leakage, unresolved high conflict, unsafe evidence hoặc version lineage hỏng. Reviewer trả finding về đúng producer.

# Phần B — Daily QA Subagents

## B1. `task-input-normalizer` — orchestrator step hoặc subagent nhẹ

### Registration description

```text
Chuẩn hóa task QA từ Jira, feature list, local files, bug report hoặc chat thành Task Manifest có source, scope, requested outcome, build/release và authority metadata. Không phân tích business requirement hoặc viết test case.
```

### Input/process/output

Input: raw task sources và user-requested outcome.

Process: inventory source, preserve locator, identify task type/object/feature hints, dedupe, record conflicts và unreadable sources.

Output:

```json
{
  "task_manifest": {
    "task_id": "...",
    "task_type": "NEW_FEATURE | CHANGE | BUGFIX | REFACTOR | CONFIG | UNKNOWN",
    "requested_outcome": "...",
    "sources": [],
    "feature_hints": [],
    "object_hints": [],
    "target_build_or_release": "..."
  },
  "source_conflicts": [],
  "missing_sources": []
}
```

### Gate

PASS khi task goal/source/terminal outcome đủ để phân tích. FAIL khi không xác định đối tượng/phạm vi hoặc source cốt lõi không đọc được.

## B2. `qa-requirement-analysis` — existing skill

### Vai trò trong flow mới

Nhận Task Manifest và mọi source liên quan, không phụ thuộc Jira. Output phải gồm confirmed requirements, business rules, current/requested behavior, ambiguity, impact hints, questions và readiness.

Gate bắt buộc:

- Không viết executable expected result từ assumption.
- `PARTIALLY_READY` chỉ cho phép downstream xử lý phần requirement đã rõ.
- `NOT_READY` chặn acceptance test cases bị ảnh hưởng nhưng không chặn việc lập question/gap report.

Handoff: Requirement Artifact cho Context Retriever và Use Case/Impact Analyzer.

## B3. `qa-context-retriever`

### Registration description

```text
Truy xuất đúng Product KB, Feature Profile và Checklist slice cho một task theo product, object, capability, role, state và version; đánh giá applicability/freshness/conflict. Không sửa context hoặc dùng keyword match như bằng chứng duy nhất.
```

### Process

1. Dùng task REQ/object/capability để query manifest.
2. Chọn latest approved hoặc requested version.
3. Lấy tối thiểu slice cần thiết, không load toàn bộ KB.
4. Kiểm role/state/environment/freshness.
5. So task delta với profile hiện tại.
6. Phân loại từng item: applicable/partial/stale/conflicted/missing.

### Output

```json
{
  "context_version": "...",
  "selected_kb_items": [],
  "selected_feature_profiles": [],
  "selected_checklist_items": [],
  "applicability_assessment": [],
  "context_gaps": [],
  "context_conflicts": []
}
```

### Gate

PASS khi context đúng identity/version và applicability có reason. CONDITIONAL_PASS cho stale/partial context chỉ dùng impact discovery. FAIL nếu conflicted/stale/current observation được dùng làm task oracle.

## B4. `qa-use-case-modeling` — skill; optional worker

### Registration description

```text
Chuyển requirement của task thành use cases gồm actor, trigger, precondition, basic, alternative, exception flow và postcondition; duy trì traceability REQ/BR. Dùng cho task nhiều state/role/nhánh; không nhúng UI/API detail chưa xác nhận.
```

### Output/gate

Output: UC Artifact, coverage map và unmodeled requirements.

PASS khi core REQ map tới UC/flow, basic flow có outcome và mutation có failure/recovery consideration. FAIL khi orphan core REQ, flow thiếu postcondition hoặc alternative mâu thuẫn BR.

## B5. `qa-change-impact-analyzer`

### Registration description

```text
Phân tích blast radius của task bằng Requirement Artifact và context slice; xác định impacted portal, storefront, API, DB, integration, role, state, feature profile, checklist và regression surface. Không khám phá toàn hệ thống hoặc viết test case.
```

### Process

1. Tạo explicit task delta: add/change/remove/fix.
2. Map delta vào feature profiles và dependencies.
3. Phân tích portal/storefront/API/data/integration impact theo evidence.
4. Tạo risk và regression condition.
5. Phân biệt confirmed impact, inferred impact và unknown.
6. Đề xuất analyzer/explorer bổ sung chỉ khi gap ảnh hưởng coverage.

### Output

```json
{
  "task_delta": [],
  "impacted_profiles": [],
  "impacted_layers": [],
  "dependency_blast_radius": [],
  "risks": [],
  "regression_conditions": [],
  "analysis_gaps": [],
  "recommended_follow_up_agents": []
}
```

### Gate

PASS khi P0/P1 impact có evidence/reason và regression scope trace được. FAIL nếu impact list chỉ dựa keyword hoặc bỏ qua dependency đã có trong profile.

## B6. `gen-testcase` — existing skill

### Vai trò trong flow mới

Nhận Requirement Artifact + UC nếu có + Context Slice + Impact/Risk Artifact. Checklist chỉ là candidate coverage; phải kiểm applicability trước khi đưa vào task test suite.

Gate bổ sung:

- Mỗi TC map REQ/BR/UC/risk/checklist source.
- Expected result phải có oracle.
- Case ngoài confirmed requirement đánh `PO/DEV confirm` hoặc `PROPOSED`.
- Không sinh case chỉ để đủ loại hoặc đủ số lượng.

## B7. `test-suite-reviewer`

### Registration description

```text
Review độc lập test suite trước test data/execution, kiểm requirement/risk coverage, expected oracle, traceability, duplicate, feasibility, priority và context applicability. Không tự sửa test case.
```

### Review focus/output

```json
{
  "decision": "APPROVED | APPROVED_WITH_CONDITIONS | REJECTED",
  "coverage_matrix": [],
  "oracle_issues": [],
  "duplicates": [],
  "feasibility_issues": [],
  "required_fixes": []
}
```

REJECT nếu thiếu core flow/P0-P1 risk, expected result mơ hồ, assumption làm oracle hoặc checklist item không applicable bị copy thành TC.

## B8. `test-data-planner`

### Registration description

```text
Thiết kế deterministic Test Data Plan từ approved test cases, gồm campaign/artwork/layer requirements, API variable/data combinations, account-role matrix, setup, cleanup, namespace và retention. Không trực tiếp tạo resource.
```

### Process

1. Trích data/precondition theo TC.
2. Nhóm TC dùng chung fixture mà không gây state pollution.
3. Thiết kế campaign state, artwork và layer specifications.
4. Thiết kế valid/invalid/boundary data và role matrix.
5. Xác định Postman collection/request/data needs.
6. Tạo unique namespace, cleanup/TTL và parallel policy.

### Output

```json
{
  "datasets": [],
  "campaign_specs": [],
  "artwork_specs": [],
  "layer_specs": [],
  "api_data_specs": [],
  "account_role_matrix": [],
  "setup_order": [],
  "cleanup_or_retention": [],
  "parallel_isolation": []
}
```

### Gate

PASS khi P0/P1 TC có deterministic data spec và cleanup, không dùng PII/secret. FAIL khi data phụ thuộc production/shared mutable record hoặc layer/campaign spec không đủ để provision.

## B9. `create-test-data` — existing

### Vai trò trong flow mới

Provision theo Test Data Plan:

- Tạo campaign ở state ít side effect nhất đủ cho TC.
- Tạo/attach artwork.
- Tạo đúng layer type/name/order/default/constraint.
- Tạo Postman collection/environment với variables, không chứa secret.
- Đọc lại resource để verify persisted state.
- Trả Resource Manifest có `RES-ID`, TC/TD mapping và cleanup/retention.

Gate fail khi sai environment, resource chưa verify, layer map sai, collection dựa endpoint giả định hoặc chứa secret.

## B10. `qa-test-executor`

### Registration description

```text
Thực thi approved test cases trên target build/environment với đúng role và provisioned resources; thu actual result/evidence, phân loại PASS/FAIL/BLOCKED/NOT_RUN và cleanup. Không sửa expected result hoặc product code.
```

### Admission/process/output

Required: approved TC, Test Data Plan/Resource Manifest, explicit environment/build/role/permissions.

Process: admission check, setup, execute checkpoints, evidence capture/redaction, bounded rerun, cleanup.

Output:

```json
{
  "run_id": "RUN-001",
  "environment": "...",
  "build": "...",
  "results": [],
  "defect_candidates": [],
  "cleanup_results": [],
  "run_summary": {}
}
```

### Gate

PASS khi mỗi PASS/FAIL có actual/evidence; blocker/build/target/cleanup rõ. FAIL nếu PASS không chạy, sai target hoặc expected result bị đổi sau khi thấy actual.

## B11. `defect-triage-agent`

### Registration description

```text
Phân tích test failures thành defect candidates có reproducibility, severity, affected scope và evidence; phân biệt product defect, environment issue, data/setup issue và test issue. Không tự khẳng định root cause hoặc tạo external ticket nếu chưa được phép.
```

### Process/output

1. Validate failed TC/evidence/environment/build.
2. Kiểm precondition/data/role.
3. So sánh expected oracle với actual.
4. Reproduce theo bounded policy nếu được phép.
5. Classify và dedupe với failure cùng run.
6. Đề xuất severity theo user/revenue/data impact.

```json
{
  "triage_items": [
    {
      "defect_candidate_id": "BUG-001",
      "classification": "PRODUCT_DEFECT | ENVIRONMENT | TEST_DATA | TEST_CASE | AUTOMATION | UNKNOWN",
      "reproducibility": "CONSISTENT | INTERMITTENT | NOT_REPRODUCED",
      "severity": "CRITICAL | HIGH | MEDIUM | LOW",
      "evidence_refs": [],
      "root_cause_status": "UNKNOWN | SUSPECTED | CONFIRMED",
      "next_action": "..."
    }
  ]
}
```

Gate fail nếu thiếu evidence/oracle hoặc agent trình bày suspected root cause như confirmed.

## B12. `qa-automation-engineer`

### Registration description

```text
Chọn approved, stable test cases phù hợp regression và triển khai automation theo repository/framework hiện có với deterministic setup/cleanup, stable waits/locators và traceability TC-ID. Không automate requirement chưa ổn định hoặc hard-code secret/resource ID ngắn hạn.
```

### Required behavior

- Chấm suitability: suitable/hybrid/not suitable.
- Đọc conventions/fixtures/helpers trước khi code.
- Map `AT-ID` với `TC-ID`.
- Dùng observable wait, không fixed sleep khi tránh được.
- Chạy formatter/lint/test phù hợp.
- Báo `PASSED`, `FAILED` hoặc `CREATED_NOT_EXECUTED` trung thực.

Gate fail nếu test flaky-by-design, không isolation, hard-code secret/temporary IDs hoặc tuyên bố pass chưa chạy.

## B13. `qa-context-feedback` — skill; optional worker

### Registration description

```text
Chuẩn hóa discovery, context mismatch, new feature, stale profile hoặc checklist gap từ daily QA thành Knowledge Change Proposal có evidence, target artifact và urgency. Thường được Daily Orchestrator áp dụng trực tiếp; chỉ spawn feedback worker khi volume lớn hoặc cần semantic dedupe độc lập. Không sửa canonical context.
```

### Process

1. So daily artifacts/result với context version đã dùng.
2. Phân loại NEW_FEATURE/BEHAVIOR_CHANGE/PROFILE_GAP/CHECKLIST_GAP/STALE_CONTEXT/CONFLICT.
3. Loại bỏ item chỉ là task-local data hoặc transient environment issue.
4. Gắn evidence, affected task, feature/profile/checklist target.
5. Dedupe proposal đang mở nếu có.

### Output/gate

Output: KCP list theo shared schema.

PASS khi proposal có evidence, target, proposed delta và urgency. FAIL nếu transient failure bị ghi thành product knowledge hoặc proposal cố chỉnh canonical context trực tiếp.

Handoff: Context Lifecycle Orchestrator triage.

## 3. Explorer và Analyst khác nhau thế nào

| Agent | Câu hỏi chính | Dùng trong flow | Output |
|---|---|---|---|
| portal-explorer | Portal hiện có gì và đang hoạt động thế nào? | Context | Observation/feature evidence |
| api-explorer | API surface hiện có gì? | Context | API capability baseline |
| db-explorer | Data model/persistence hiện có gì? | Context | Data model baseline |
| storefront-explorer | Buyer-facing storefront hiện có gì theo theme/product/campaign/market/device? | Context | Storefront journey baseline |
| code-config-explorer | Flag, permission, job, event hiện có gì? | Context | Implementation evidence |
| qa-change-impact-analyzer | Task mới thay đổi và ảnh hưởng gì? | Daily | Task-specific impact/risk |
| qa-test-executor | Build này có đáp ứng expected behavior không? | Daily | PASS/FAIL evidence |

Explorer tạo context baseline. Analyst so một task với baseline. Executor kiểm chứng một build so với expected oracle. Không nên dùng một agent cho cả ba câu hỏi.

## 4. Gợi ý MVP

### Context MVP

Triển khai trước:

1. `qa-context-scope-planner`
2. `portal-explorer` hiện có
3. `api-explorer`
4. `db-explorer`
5. `storefront-explorer`
6. `qa-knowledge-normalizer`
7. `feature-profile-builder`
8. `qa-checklist-builder`
9. `context-quality-reviewer`

Thêm `code-config-explorer` và `knowledge-diff-analyzer` sau khi có canonical version đầu tiên.

### Daily QA MVP

1. `task-input-normalizer`
2. `qa-requirement-analysis` hiện có
3. `qa-context-retriever`
4. `qa-change-impact-analyzer`
5. `gen-testcase` hiện có
6. `test-suite-reviewer`
7. `test-data-planner`
8. `create-test-data` hiện có
9. `qa-test-executor`
10. Áp dụng skill `qa-context-feedback` trực tiếp trong orchestrator; chỉ thêm feedback worker khi KCP volume lớn.

Skill `qa-use-case-modeling` chỉ bắt buộc cho flow nhiều actor/state/exception; chỉ spawn Use Case Modeler worker khi task đủ lớn. Defect Triage và Automation Engineer bổ sung sau khi execution pipeline ổn định.

## 5. Thứ tự tạo agent đề xuất

1. Chuẩn hóa contract của `portal-explorer` và `create-test-data` trước.
2. Tạo `qa-knowledge-normalizer`; nếu thiếu bước này, output của Portal/Storefront/API/DB Explorer sẽ khó fan-in.
3. Tạo `feature-profile-builder` và `qa-checklist-builder`.
4. Tạo `storefront-explorer`, `api-explorer` và `db-explorer`, bắt đầu với safe buyer-flow/read-only/schema-first mode.
5. Tạo Context Reviewer và publish canonical context phiên bản đầu.
6. Tạo Context Retriever và Change Impact Analyzer cho daily flow.
7. Thêm Test Suite Reviewer và Test Data Planner trước khi tăng mức automation.
8. Cuối cùng thêm Diff Analyzer, Defect Triage và Automation Engineer.

Lý do ưu tiên Normalizer trước Explorer mới: thêm nhiều explorer khi chưa có common artifact sẽ tạo nhiều tài liệu nhưng không hình thành được Product KB nhất quán.
