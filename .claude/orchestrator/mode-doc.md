# Orchestrator — DOC_BOOTSTRAP

Không portal, không credential, không environment runtime. Mục lục tài liệu là nguồn phân rã object/feature duy nhất, nên scope-planner LUÔN chạy. **Không dispatch** explorer runtime nào; `raw/` phải rỗng suốt run.

| # | Bước | Điều kiện |
|---|---|---|
| 1 | Nạp tài liệu: với mỗi `doc_sources[i]` (DOC-ID = `DOC-<nn>` theo thứ tự), nguồn QA Hub thì gọi `mcp__<mcp_server>__get_project_context_file` / knowledge tool, lấy đúng field nội dung (không ghi cả JSON envelope), **redact theo §6**, ghi vào `input/docs/<DOC-ID>/<file>` | bạn tự làm |
| 2 | `node scripts/ctx/freeze-docs.mjs --run <id>` | exit 1 = C0 FAIL (thiếu version/generated_at/file); exit 2 = còn secret/PII → redact lại, chạy lại |
| 3 | gate **C0** biến thể doc | thiếu `doc_sources[]` → FAIL, không chuyển sang explore |
| 4 | `qa-context-scope-planner` | LUÔN, kể cả 1 object |
| 5 | mint `FEATURE-ID` cho từng `feature_candidates[]`, ghi lại vào `input/scope-plan.json`; lock mọi object của plan | bạn tự làm; `lock.mjs acquire` exit 2 → `CONFLICT` |
| 6 | `doc-ingest-explorer` | 1 instance cho MỖI `DOC-ID`, song song |
| 7 | gate **C1-DOC**, **C2-DOC** | FAIL → retry đúng `DOC-ID` đó, `keep_intact` doc khác |
| 8 | `qa-knowledge-normalizer` mode `from-doc` | → C3; shard theo `feature_key` đã mint |
| 9 | `feature-profile-builder` | → C4; `observed_validations[]` rỗng |
| 10 | `qa-checklist-builder` | → C5 (phanh `derivation`) |
| 11 | `knowledge-diff-analyzer` | CHỈ khi object đã có base |
| 12 | publish | `.claude/orchestrator/publish.md` |

`generated_from_commit: null` → ghi vào `unknowns` rằng `authored_on` của mọi claim là `generated_at`, nên KB này supersede được bởi CCR mới hơn nhưng không supersede ngược được (§12.5).
