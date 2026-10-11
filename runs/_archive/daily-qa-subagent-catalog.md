# Daily QA Subagents — catalog (tách khỏi context-lifecycle repo)

> **Nguồn gốc:** cắt từ `qa-subagent-catalog.md` v1.3 (Phần B, dòng 808–1142) của repo
> `qikify-QA/context-lifecycle`, ngày 2026-09-24, khi Flow 2 (Daily QA Testing) được tách
> khỏi repo context builder.
>
> **Dùng để làm gì:** đây là thiết kế tham chiếu cho repo daily-test riêng của từng QA member.
> Nó KHÔNG còn hiệu lực trong repo context-lifecycle.
>
> **Lưu ý khi mang sang repo mới:**
> - Artifact Envelope, knowledge kind và redaction rules vẫn dùng chung với context builder —
>   xem `contracts/qa-context-contract.md` của repo context-lifecycle.
> - `qa-context-feedback` (B13) nay được thay bằng **Context Change Request gửi trên QA Hub**
>   (section CCR của task, tag `context-builder`, tab "Context Builder Board"), không còn ghi file vào `runs/_kcp-inbox/`
>   và không còn qua Jira.
>   Template: `contracts/context-change-request.template.md`.
> - Daily flow chỉ ĐỌC knowledge đã publish từ repo `qikify-QA/qa-knowledge`, không bao giờ ghi.

---

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

