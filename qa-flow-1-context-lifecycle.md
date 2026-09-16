# Flow 1 — QA Context Lifecycle

Phiên bản: 1.0  
Agent: `qa-context-lifecycle-orchestrator`  
Mục tiêu thử nghiệm: khám phá một object chưa có tài liệu, sau đó tạo và publish Product KB, Feature Profile và Regression Checklist có evidence.

## 1. Khi nào gọi flow này

Gọi flow khi:

- Chưa có context cho product/module/object.
- Có object, role, portal/storefront hoặc behavior mới cần khám phá.
- Context cũ cần được kiểm chứng lại.
- Daily QA gửi `Knowledge Change Proposal`.

Không gọi flow này để PASS/FAIL một task hằng ngày. Flow này tạo knowledge dùng chung, không tạo kết luận acceptance cho ticket.

## 2. Điểm vào thử nghiệm đề xuất

Lần chạy đầu chỉ dùng mode `ZERO_DOC_BOOTSTRAP` với đúng một object và một role.

```json
{
  "mode": "ZERO_DOC_BOOTSTRAP",
  "product": "teeinblue",
  "object_target": {
    "object_type": "Campaign",
    "object_id_or_url": "...",
    "initial_state": "..."
  },
  "surfaces": {
    "portal": {
      "enabled": true,
      "environment": "staging",
      "role": "merchant"
    },
    "storefront": {
      "enabled": false,
      "shop": "...",
      "product_or_campaign": "..."
    }
  },
  "network_capture": {
    "enabled": true,
    "capture_request_body": true,
    "capture_response_body": true,
    "redact_headers": ["authorization", "cookie"]
  },
  "db_observation": {
    "enabled": false,
    "access_mode": "READ_ONLY"
  },
  "exploration_policy": {
    "mutation_policy": "SAFE_REVERSIBLE_ONLY",
    "forbidden_actions": ["delete", "publish_live", "charge", "send_notification"],
    "cleanup_required": true
  }
}
```

Các mode sau chỉ bật khi bootstrap một object đã ổn định:

- `BROAD_BOOTSTRAP`: nhiều object/role/module.
- `INCREMENTAL_UPDATE`: chỉ update feature hoặc dependency bị ảnh hưởng.
- `REFRESH`: xác minh lại knowledge cũ.
- `RECONCILE`: xử lý nguồn evidence mâu thuẫn.

## 3. Luồng thực thi

```text
Bootstrap request
      |
      v
portal-explorer ------------------------------+
  UI inventory, safe actions, ACT-ID          |
  before/after evidence, DevTools capture     |
      |                                       |
      +--> api-explorer                       |
      |      action -> API + schema/delta     |
      |                                       |
      +--> db-explorer [optional]             |
      |      before/after state delta          |
      |                                       |
      +--> storefront-explorer [conditional]  |
             buyer-facing behavior            |
                                               v
                                  qa-knowledge-normalizer
                                               |
                                               v
                                  feature-profile-builder
                                               |
                                               v
                                  qa-checklist-builder
                                               |
                                               v
                                  context-quality-reviewer
                                               |
                                        PASS / REWORK
                                               |
                                               v
                                  versioned context publisher
```

Định danh xuyên suốt:

```text
CTX-RUN-ID -> OBJECT-ID -> FEATURE-ID -> SCENARIO-ID -> ACT-ID
                                                |-> APIOP-ID
                                                |-> DBDELTA-ID
```

API và DB evidence bắt buộc map về `ACT-ID`. Không nhận danh sách endpoint/table rời rạc.

## 4. Subagent registry

| Subagent | Khi gọi | Input chính | Output bắt buộc | Quyền ghi |
|---|---|---|---|---|
| `portal-explorer` | Luôn gọi khi portal enabled | Object, role, policy | Feature candidates, scenario/action timeline, UI evidence, network capture | `runs/context/.../raw/portal` |
| `api-explorer` | Mặc định sau portal capture | HAR/network entries + ACT-ID | Action–API map, request/response shape, state delta, uncertainty | `runs/context/.../intermediate/api` |
| `db-explorer` | Khi có read-only DB access và cần xác minh persistence | Object keys + ACT-ID | Entity/field/relationship delta | `runs/context/.../intermediate/db` |
| `storefront-explorer` | Chỉ khi portal feature ảnh hưởng buyer-facing storefront/SDK | Campaign/product refs | Buyer flow, UI state, API observations, portal-to-storefront mapping | `runs/context/.../raw/storefront` |
| `code-config-explorer` | Chỉ khi cần route/config/flag evidence | Repo/config scope | Code/config evidence; không suy business expectation | `runs/context/.../intermediate/code` |
| `qa-knowledge-normalizer` | Sau khi exploration evidence đạt gate | Evidence bundles | Product KB candidate có provenance | `runs/context/.../candidate` |
| `feature-profile-builder` | Sau KB candidate | KB items | Feature Profile candidate | `runs/context/.../candidate` |
| `qa-checklist-builder` | Sau profile candidate | Profile + KB oracle refs | Regression Checklist candidate | `runs/context/.../candidate` |
| `knowledge-diff-analyzer` | Chỉ từ context version 2 | Base + candidate | Semantic diff và impact | `runs/context/.../review` |
| `context-quality-reviewer` | Luôn gọi trước publish | Toàn bộ candidate + evidence | Gate verdict, finding, rework targets | `runs/context/.../review` |

`qa-context-lifecycle-orchestrator` là thành phần duy nhất được publish vào `knowledge/`. Mọi subagent khác chỉ ghi vào run workspace.

## 5. Stage và gate

### C0 — Admission

PASS khi có product, object target, environment, role và mutation policy. Nếu object đã cụ thể thì bỏ qua scope planner.

### C1 — Exploration evidence

PASS khi:

- Feature candidate được nhóm theo user goal, không phải mỗi button là một feature.
- Mỗi scenario có `SCENARIO-ID`; mỗi action có `ACT-ID`.
- Có UI/object state trước và sau action.
- Network entry được map về action hoặc được ghi rõ là polling/unrelated/unknown.
- Secret, cookie, token và PII đã được redacted.
- Mutation tuân thủ policy và có cleanup result.

FAIL nếu chỉ có danh sách control, không có before/after evidence hoặc capture còn secret.

### C2 — Runtime mapping

PASS khi API operation có normalized route, method, observed status, request/response shape và evidence refs. Nếu có DB branch, delta phải nêu entity, key, changed field và confidence.

Không suy `required`, validation rule hoặc expected behavior từ một sample duy nhất.

### C3 — Product KB integrity

PASS khi mỗi knowledge item có:

- `knowledge_kind`: `OBSERVED_CURRENT`, `CONFIRMED_EXPECTED`, `INFERRED` hoặc `PROPOSED`.
- Source/evidence refs, environment, role, object state và thời điểm quan sát.
- Confidence và freshness.
- Conflict được giữ lại và đánh dấu, không âm thầm chọn một phía.

Trong zero-doc bootstrap, observation được publish dưới dạng `OBSERVED_CURRENT`; nó không tự động trở thành expected requirement.

### C4 — Feature Profile

PASS khi profile trace được về KB, mô tả actor, entry point, capability, state transition, validation đã quan sát, API/data dependency và vùng chưa biết.

### C5 — Checklist

PASS khi checklist bao phủ core, negative, boundary, permission, data và integration phù hợp với evidence. Item chưa có oracle được gắn `NEEDS_CONFIRMATION`.

### C6 — Independent publish review

Reviewer không phải producer. Chỉ publish khi schema, traceability, redaction, conflict handling và minimum coverage đều PASS. Rework phải chỉ rõ artifact/ID cần sửa; không chạy lại toàn flow nếu chỉ một nhánh lỗi.

## 6. Artifacts và folder của một run

```text
runs/context/YYYY-MM-DD/<ctx-run-id>/
├── input/
│   └── bootstrap-request.json
├── raw/
│   ├── portal/
│   ├── network/
│   └── storefront/
├── intermediate/
│   ├── api/
│   ├── db/
│   └── code/
├── candidate/
│   ├── product-kb.json
│   ├── feature-profiles/
│   └── checklists/
├── review/
│   ├── gate-results.json
│   └── verdict.json
└── run-manifest.json
```

Sau PASS, publisher cập nhật canonical context:

```text
knowledge/products/<product-key>/objects/<object-key>/
├── kb.json
├── features/<feature-key>/profile.json
└── checklists/<feature-key>.json
```

Không copy HAR, screenshot hoặc raw DB dump vào `knowledge/`; canonical artifact chỉ giữ evidence references.

## 7. Output contract

```json
{
  "run_id": "CTX-...",
  "status": "PUBLISHED | REWORK_REQUIRED | BLOCKED",
  "mode": "ZERO_DOC_BOOTSTRAP",
  "published_context_version": "...",
  "artifacts": {
    "product_kb_refs": [],
    "feature_profile_refs": [],
    "checklist_refs": []
  },
  "coverage": {
    "objects": [],
    "roles": [],
    "surfaces": [],
    "unexplored_areas": []
  },
  "gate_results": [],
  "conflicts": [],
  "evidence_refs": [],
  "next_recommended_scope": []
}
```

## 8. Stop và retry

- Dừng trước action bị cấm hoặc không thể cleanup.
- Dừng publish khi evidence còn secret/PII.
- API mapping lỗi: retry riêng `api-explorer`, giữ nguyên portal bundle.
- Checklist lỗi: retry từ checklist builder, không explore lại.
- DB không truy cập được: ghi limitation; không block nếu DB không phải evidence bắt buộc.
- Storefront branch chỉ block khi feature được tuyên bố có buyer-facing effect nhưng chưa được quan sát.

## 9. Definition of Done cho lần thử đầu

- Một object, một role và một environment được explore.
- Có feature list dựa trên scenario/action evidence.
- Các action quan trọng map được tới API runtime trace.
- Có Product KB version đầu dưới dạng observed baseline.
- Có ít nhất một Feature Profile và Checklist trace được về KB.
- Independent reviewer PASS và context được publish theo version.
- Vùng chưa explore và điều không chắc chắn được ghi rõ.

## 10. System prompt dùng để tạo orchestrator

```text
Bạn là qa-context-lifecycle-orchestrator. Mục tiêu của bạn là tạo và duy trì canonical QA context từ evidence có thể truy vết.

Với mode ZERO_DOC_BOOTSTRAP và một object đã xác định, không lập kế hoạch tổng quát. Điều phối portal-explorer để inventory UI, chạy safe actions, ghi before/after state và capture DevTools network với SCENARIO-ID/ACT-ID. Gọi api-explorer để map từng action sang API và schema/state delta. Chỉ gọi db-explorer khi có read-only access và cần persistence evidence. Chỉ gọi storefront-explorer khi portal behavior tạo ảnh hưởng buyer-facing trên storefront/SDK.

Sau khi exploration đạt gate, gọi qa-knowledge-normalizer, feature-profile-builder và qa-checklist-builder. Luôn gọi context-quality-reviewer độc lập trước publish. Observation phải được phân loại OBSERVED_CURRENT; không biến behavior hiện tại thành expected requirement nếu chưa có nguồn xác nhận.

Subagents chỉ được ghi vào runs/context/<run-id>. Chỉ bạn được publish vào knowledge sau khi toàn bộ publish gates PASS. Khi một gate FAIL, retry từ artifact gần nhất và giữ lại evidence hợp lệ. Mọi kết luận phải có evidence refs; mọi API/DB artifact phải trace về ACT-ID. Không thực hiện action vượt mutation policy và không lưu secret, token, cookie hoặc PII thô.
```

