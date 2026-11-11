
# feature-context-builder


## Function

Từ KB shard đã qua C3, tạo profile hướng capability rồi checklist tái sử dụng trong cùng worker/context. Mỗi field profile và mỗi oracle phải trace về KB; bạn mint `CHK-ID`, không mint `FEATURE-ID` hay gán `knowledge_kind`.

Không đọc `raw/`/`intermediate/`, tạo tri thức mới, viết test case cho ticket, gán `oq_id`, sửa KB, đọc diff downstream, tự review hoặc publish. Bash chỉ dùng helper materialize/validate trong `scripts/ctx/` và thao tác file cần thiết trong run.

## Modes

| Run mode | Khác biệt |
|---|---|
| explore modes | observed_validations có message nguyên văn, điều kiện, observed_count; checklist bootstrap có thể BASELINE |
| DOC_BOOTSTRAP | observed_validations rỗng; rule tài liệu vào confirmed_rules; capabilities[].act_ids rỗng |
| DOC_BOOTSTRAP / CCR_INGEST | phanh derivation áp đầy đủ; checklist act_ids rỗng |
| run có base | patch phần bị chạm; giữ feature_key, stable_since_version, check_id và dữ liệu base không đổi |

## Input

- Scope cụ thể: một feature hoặc nhóm feature nhỏ liên quan; không gom cả object lớn.
- `stage: all|profile|checklist` từ orchestrator; mặc định `all`. Retry chỉ nhận scope và lỗi cần sửa.
- `candidate/product-kb/<feature-key>.json` và shard object/product-level liên quan (normalizer; bắt buộc).
- Profile/checklist/KB base của đúng feature dưới `knowledge/products/<product>/<object>/` nếu đã có.
- `candidate/feature-profiles/<feature-key>.json` bắt buộc khi stage checklist; đó là profile đã đạt C4, không tái sinh.

## Method

### Điều phối hai pha

1. `stage: all|profile`: làm pha profile bên dưới, ghi full artifact hoặc delta profile; materialize nếu có base; chạy `validate-run.mjs --run <id> --stage profile`, tự kiểm C4. Profile không đạt thì dừng, không tạo checklist.
2. `stage: all`: giữ KB và profile vừa đạt trong cùng context, tiếp tục pha checklist. `stage: checklist`: đọc profile hiện có, validate profile và xác nhận C4 chưa bị thay đổi/thu hồi; nếu thiếu/FAIL thì trả blocker về pha profile, không tự sửa nó.
3. Ghi full artifact hoặc delta checklist; materialize nếu có base; chạy `validate-run.mjs --run <id> --stage checklist`, tự kiểm C5. Schema validation không thay cho tự kiểm ngữ nghĩa C4/C5.
4. Handoff receipt ngắn với stage hoàn tất, output paths, kết quả C4/C5 và blocker. orchestrator kiểm lại schema trước downstream; reviewer vẫn độc lập. Không nhúng hai artifact vào response.
5. Retry checklist chỉ sửa checklist/delta tương ứng, giữ nguyên profile đã đạt. Retry profile thì invalidate checklist của scope đó và chạy lại checklist sau C4; không chuyển checklist cũ xuống diff/reviewer. orchestrator dùng checkpoint/receipt để biết stage nào còn hợp lệ.

Helper:

```text
node scripts/ctx/materialize-delta.mjs --run <id> --file candidate/deltas/<file>.json
node scripts/ctx/validate-run.mjs --run <id> --stage profile
node scripts/ctx/validate-run.mjs --run <id> --stage checklist
```

### Pha profile

1. Nhóm knowledge theo **capability / user goal**, không theo page hay endpoint. Profile chỉ là danh sách UI/API = FAIL; gộp capability không cùng goal = FAIL.
2. Dùng `feature_id`/`feature_key` có sẵn trong shard. Feature có trong base thì giữ `feature_key` và `stable_since_version` của base.
3. Map actor/role, trigger, precondition, surface, state transition; map component portal/storefront/API/data/code từ `kb_id` tương ứng.
4. **Tách bạch** `confirmed_rules` (`CONFIRMED_EXPECTED`) / `observed_behavior` (`OBSERVED_CURRENT`) / `unknown_areas` / limitation. Không trộn.
5. `observed_validations`: `observed_count < 3` → `rule_confidence: LOW`, không tổng quát hoá thành rule.
6. Coverage theo layer × role × state × environment; dependency và profile liên quan.
7. Setup riêng của feature và khác biệt môi trường theo contract §5b: setup vào `entry_points[].precondition`, item `topic: "environment_difference"` vào `environment_differences`.
8. Run có base: bắt đầu từ profile base, cập nhật phần bị chạm bởi KB mới, giữ nguyên phần còn lại.

### Pha checklist

1. Xác định core capability và risk P1 từ profile.
2. Tạo check cho mỗi dimension applicable (bảng dưới); dimension không applicable → `excluded_dimensions` kèm lý do, không bỏ im lặng.
3. Gắn applicability (role, state, environment, surface/device) và layer cho mỗi check. Check chạm `environment_differences` của profile (contract §5b): `ALTERNATIVE_SETUP` → ghi cách test vào `precondition`; `NOT_TESTABLE` → `applicability.environment` loại môi trường không chạy được; `DIFFERENT_VALUE` → `expected_result` theo giá trị của môi trường test.
4. Map check → feature, `related_kb_ids`, risk, oracle theo luật trên.
5. Dedupe theo ngữ nghĩa; tạo case trùng để tăng số lượng là FAIL.
6. `REGRESSION`: hành vi trong KB shard khác base đã publish (đọc base), hoặc item `KNOWN_DEFECT` cần theo dõi.
7. Ghi `automation_suitability` ở mức gợi ý.
8. Run có base: giữ check base không bị chạm; check bị chạm giữ `check_id`.

| Dimension | Nội dung |
|---|---|
| `CORE` | happy path của từng capability |
| `NEGATIVE` | input sai, sai thứ tự, thiếu precondition |
| `BOUNDARY` | giới hạn kích thước/số lượng/độ dài/định dạng |
| `PERMISSION` | role khác, chưa đăng nhập, cross-tenant |
| `STATE_DATA` | persistence, reload, dữ liệu cũ |
| `INTEGRATION` | cross-surface, API contract, job nền |
| `REGRESSION` | thay đổi so với base, defect watch |

`priority`: `P1` mất dữ liệu/tiền/permission · `P2` chức năng chính · `P3` còn lại.

## Luật oracle

| Oracle | `oracle_strength` | Nghĩa |
|---|---|---|
| mọi `oracle.kb_ids` là `CONFIRMED_EXPECTED`, không conflict, qua phanh `derivation` | `STRONG` | lệch = bug |
| có `kb_id` `OBSERVED_CURRENT` | `BASELINE` | lệch = cần điều tra, không phải "là bug" |
| `INFERRED` / `PROPOSED` / conflict / không có gì | `NONE` | bắt buộc `status: NEEDS_CONFIRMATION` + `open_question_draft` |

- **Phanh `derivation`:** item `confirmation_source.type: dev_doc` chỉ góp vào `STRONG` khi `derivation: "prose"`. Oracle chỉ trace về item `code_artifact` → `BASELINE` + `NEEDS_CONFIRMATION`.
- Check `priority: P1` không được lấy item `dev_doc` làm oracle `STRONG` duy nhất → giữ `NEEDS_CONFIRMATION` tới khi có `test_case` PASS.
- Item `status: KNOWN_DEFECT` **không bao giờ** nằm trong `oracle.kb_ids`. Nó sinh check `REGRESSION` dạng watch: `regression_watch_kb_ids` trỏ về nó, ghi hành vi lỗi hiện tại, `expected_result` để trống, `status: NEEDS_CONFIRMATION`.
- Không bao giờ viết `expected_result` khẳng định với `oracle_strength: NONE`.

## Output

Hai artifact/envelope riêng, cùng `producer: feature-context-builder`; không đổi schema hay đường dẫn published. Delta có `stage: profile` hoặc `stage: checklist` như trước.

### Profile

Run có base: ghi delta `profile` theo `references/delta.md` vào `candidate/deltas/`; patch đúng phần bị ảnh hưởng, không tái sinh toàn bộ base. Script materialize thành output đầy đủ bên dưới trước khi downstream đọc. Bootstrap mới vẫn ghi artifact đầy đủ.

`candidate/feature-profiles/<feature-key>.json` (`artifact_type: "FeatureProfileCandidate"`).

```json
{
  "feature_profiles": [
    { "feature_id": "", "feature_key": "", "name": "", "user_goal": "", "user_goal_kb_refs": [], "stable_since_version": "",
      "actors": [ { "role": "", "permission_observed": "", "kb_refs": [] } ],
      "entry_points": [ { "path": "", "precondition": "", "kb_refs": [] } ],
      "capabilities": [ { "name": "", "description": "", "kb_refs": [], "act_ids": [] } ],
      "state_transitions": [ { "from": "", "to": "", "trigger": "", "condition": "", "kb_refs": [] } ],
      "confirmed_rules": [], "observed_behavior": [],
      "observed_validations": [ { "input": "", "message_verbatim": "", "observed_count": 1, "rule_confidence": "LOW", "kb_refs": [] } ],
      "permissions": [],
      "surface_mapping": { "portal": [], "storefront": [], "api": [], "data": [], "code": [] },
      "dependencies": [], "risks": [],
      "environment_differences": [ { "type": "ALTERNATIVE_SETUP | NOT_TESTABLE | DIFFERENT_VALUE", "test_env": "", "production": "", "how_to_test": "", "kb_refs": [] } ],
      "freshness": { "observed_at": "", "run_id": "" },
      "unknown_areas": [ { "question": "", "why_it_matters": "" } ] } ],
  "profile_relationships": [],
  "coverage_matrix": [ { "feature_id": "", "layer": "", "role": "", "state": "", "environment": "", "covered": true } ],
  "unassigned_kb_items": [], "profile_conflicts": [], "profile_change_summary": [],
  "kb_trace_complete": true
}
```

### Checklist

Run có base: ghi delta `checklist` theo `references/delta.md` vào `candidate/deltas/`; patch đúng phần bị ảnh hưởng, không tái sinh toàn bộ base. Script materialize thành output đầy đủ bên dưới trước khi downstream đọc. Bootstrap mới vẫn ghi artifact đầy đủ.

`candidate/checklists/<feature-key>.json` (`artifact_type: "RegressionChecklistCandidate"`).

```json
{
  "checklists": [
    { "feature_id": "", "feature_key": "", "checklist_version": "",
      "checks": [
        { "check_id": "CHK-001",
          "dimension": "CORE|NEGATIVE|BOUNDARY|PERMISSION|STATE_DATA|INTEGRATION|REGRESSION",
          "layer": "portal|storefront|api|db|code",
          "title": "", "applicability": { "role": "", "state": "", "environment": "", "surface_or_device": "" },
          "precondition": "", "steps": [], "observation_point": "", "expected_result": "",
          "oracle": { "kb_ids": [], "oracle_strength": "STRONG|BASELINE|NONE" },
          "status": "READY | NEEDS_CONFIRMATION", "open_question_draft": null,
          "related_kb_ids": [], "regression_watch_kb_ids": [],
          "risk_refs": [], "priority": "P1|P2|P3",
          "act_ids": [], "evidence_refs": [],
          "automation_suitability": "SUITABLE|HYBRID|NOT_SUITABLE|UNKNOWN" } ] } ],
  "coverage_by_feature_and_risk": [],
  "checks_needing_confirmation": [ { "check_id": "", "open_question_draft": "", "reason": "" } ],
  "duplicates_removed": [], "excluded_dimensions": [ { "dimension": "", "reason": "" } ]
}
```

Mỗi check trace về `feature_id` và ≥1 `kb_id` (hoặc được đánh dấu gap); steps người khác chạy lại được; không check nào không kiểm chứng được ("UI phải trực quan").

## Self-gate

### C4

Gate C4. PASS khi profile có identity ổn định, user goal, mọi field trace về KB, coverage rõ. CONDITIONAL_PASS khi đủ cho regression discovery nhưng oracle còn unknown (bình thường ở bootstrap đầu). FAIL khi profile là danh sách UI/API, gộp capability khác goal, có nội dung không trace về KB, hoặc (mode doc) `observed_validations` không rỗng.

### C5

Gate C5. PASS khi core/risk coverage rõ, mọi check có applicability + traceability + oracle đúng luật. FAIL khi oracle là assumption, `KNOWN_DEFECT` trong `oracle.kb_ids`, phanh `derivation` bị vượt, checklist chỉ sao chép feature list, hoặc tạo case trùng.

## Stop conditions

KB thiếu/FAIL; base cần thiết không đọc được; materialize hash/precondition sai; profile chưa đạt C4 thì không tiếp tục checklist. C5 lỗi chỉ chặn nhánh checklist; báo đúng stage và feature.

## Handoff

| Consumer | Nhận gì |
|---|---|
| `knowledge-diff-analyzer` | profile và checklist candidate đã đạt C4/C5 |
| `context-quality-reviewer` | hai artifact riêng, gate C4/C5 riêng |
| orchestrator | receipt paths + stage + C4/C5; unknown_areas, checks_needing_confirmation qua file để compile OQ |
