# QA Subagent Shared Contract

Nguồn chuẩn: `qa-subagent-catalog.md` v1.3 và `qa-flow-1-context-lifecycle.md` v1.0.
Mọi subagent QA PHẢI đọc file này trước khi làm bất cứ việc gì.

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
| `CONFIRMED_EXPECTED` | Có nguồn thẩm quyền (spec, PO/Dev confirm, ticket) xác nhận đây là hành vi đúng |
| `OBSERVED_CURRENT` | Đã quan sát trực tiếp trên env/role/state này, tại thời điểm này |
| `INFERRED` | Suy ra từ evidence, chưa xác nhận |
| `PROPOSED` | Đề xuất, chưa có evidence |

Trong `ZERO_DOC_BOOTSTRAP` mặc định là `OBSERVED_CURRENT` (`OBSERVED_BASELINE`). Hành vi hiện tại **không** tự động là expected requirement.

Không suy `required`, validation rule, enum hay boundary từ một sample duy nhất. Một sample → `confidence: LOW` + ghi vào `unknowns`.

## 4. Chuỗi định danh

```text
CTX-RUN-ID -> OBJECT-ID -> FEATURE-ID -> SCN-ID -> ACT-ID
                                            |-> APIOP-ID
                                            |-> DBDELTA-ID
```

| ID | Do ai sinh | Format | Ví dụ |
|---|---|---|---|
| `CTX-RUN-ID` | orchestrator | `CTX-<YYYYMMDD>-<nn>` | `CTX-20260909-01` |
| `DU-ID` | scope-planner | `DU-<nnn>` | `DU-001` |
| `OBJECT-ID` | orchestrator | `OBJ-<type>-<slug>` | `OBJ-Campaign-summer-tee` |
| `FEATURE-ID` | portal/normalizer | `FEAT-<nn>-<slug>` | `FEAT-01-artwork-upload` |
| `OBS-ID` | portal-explorer | `OBS-<nnn>` | `OBS-014` |
| `SF-OBS-ID` | storefront-explorer | `SF-OBS-<nnn>` | `SF-OBS-007` |
| `SCN-ID` | portal-explorer | `SCN-<feat>-<nn>` | `SCN-01-02` |
| `ACT-ID` | portal-explorer | `ACT-<scn>-<nnn>` | `ACT-01-02-003` |
| `APIOP-ID` | api-explorer | `APIOP-<nnn>` | `APIOP-001` |
| `ENT-ID` | db-explorer | `ENT-<nnn>` | `ENT-003` |
| `DBDELTA-ID` | db-explorer | `DB-<act>-<nn>` | `DB-01-02-003-01` |

API và DB evidence BẮT BUỘC map về `ACT-ID`. Danh sách endpoint/table rời rạc bị gate loại.

## 5. Write scope

- Subagent CHỈ ghi vào `runs/context/<YYYY-MM-DD>/<CTX-RUN-ID>/` theo thư mục được cấp trong agent definition.
- KHÔNG subagent nào được ghi vào `knowledge/`. Chỉ `qa-context-lifecycle-orchestrator` publish, sau khi reviewer cho phép.
- Không sửa file của agent khác. Cần dữ liệu bước trước thì đọc, đừng ghi đè.

```text
runs/context/YYYY-MM-DD/<ctx-run-id>/
├── input/bootstrap-request.json
├── raw/{portal,network,storefront}/
├── intermediate/{api,db,code}/
├── candidate/{product-kb.json,feature-profiles/,checklists/}
├── review/{gate-results.json,verdict.json}
└── run-manifest.json

knowledge/products/<product-key>/objects/<object-key>/
├── kb.json
├── features/<feature-key>/profile.json
└── checklists/<feature-key>.json
```

`knowledge/` chỉ giữ evidence **references**. Không copy HAR, screenshot hay raw DB dump vào đó.

## 6. Redaction — chạy TRƯỚC khi ghi file

Redact về `"[REDACTED]"`:

- Header: `authorization`, `cookie`, `set-cookie`, `x-api-key`, `x-shopify-access-token`.
- Field chứa: `token`, `password`, `secret`, `api_key`, `access_token`, `refresh_token`, `signature`, `hmac`.
- PII: email, số điện thoại, địa chỉ, tên người mua, payment data.

Giữ *shape* (kiểu, có/không có field, độ dài), bỏ giá trị. Không chắc → redact và ghi vào `unknowns`.

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

```json
{ "type": "screenshot|har_entry|dom_snapshot|api_response|db_query|code_ref",
  "path": "raw/portal/ACT-01-02-003/after.png",
  "act_id": "ACT-01-02-003", "note": "" }
```

Kết luận không có evidence ref → `knowledge_kind: INFERRED`, và phải khai báo như vậy.

## 10. Mode

| Mode | Dùng khi |
|---|---|
| `ZERO_DOC_BOOTSTRAP` | Chưa có tài liệu, target là một object rõ ràng. Không spawn scope-planner, không chạy semantic diff/KCP/reconciliation, không dùng Requirement Analysis chỉ để giải thích observed behavior |
| `BROAD_BOOTSTRAP` | Nhiều object/role/module |
| `INCREMENTAL_UPDATE` | Chỉ feature/dependency bị ảnh hưởng |
| `REFRESH` | Xác minh lại knowledge cũ |
| `RECONCILE` | Xử lý evidence mâu thuẫn |

## 11. Worker-to-skill binding

Catalog §2.1 quy định mỗi runtime role nạp một skill. Các skill sau **chưa tồn tại** trong repo này: `qa-product-discovery`, `qa-context-modeling`, `qa-review-gates`, `qa-context-selection`, `qa-impact-analysis`, `qa-test-data-design`, `qa-test-data-provisioning`, `qa-test-execution`, `qa-defect-triage`, `qa-automation-policy`.

Skill đã có: `qa-requirement-analysis`, `gen-testcase`, `create-test-data`.

Cho tới khi skill tương ứng tồn tại, agent dùng hướng dẫn viết sẵn trong agent definition của mình. Khi skill xuất hiện, nạp skill ở đúng mode và coi nó là nguồn ưu tiên hơn.

## 12. Credentials

Credential staging nằm trong `.env` ở project root (`TIB_STAGING_*`, `TIB_USER_A_*`, `TIB_USER_B_*`, `TIB_API_BASE`, `TIB_OPENAPI_BASE`, `TIB_*_TOKEN`). File này gitignored và chỉ đọc bằng biến môi trường.

- Đọc từ `process.env` / `os.environ`. KHÔNG `cat .env` ra output, KHÔNG in giá trị vào log hay tool result.
- KHÔNG copy giá trị credential vào bất kỳ file nào trong `runs/` hoặc `knowledge/`. Ghi tên biến (`TIB_USER_A_EMAIL`), không ghi giá trị.
- Environment mặc định là **staging**. `TIB_API_BASE` phải là `https://staging-api.teeinblue.com`. Trỏ tới production là stop condition — dừng ngay, trả `BLOCKED`.
- `TIB_USER_B_*` là tài khoản khác store, dùng cho check `PERMISSION` / cross-tenant. `TIB_FORBIDDEN_TOKEN` và `TIB_INVALID_TOKEN` là fixture cho negative auth case.
