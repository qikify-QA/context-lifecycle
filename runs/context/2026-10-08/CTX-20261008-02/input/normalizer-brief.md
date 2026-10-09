# Brief cho qa-knowledge-normalizer — mode product-kb-from-doc — mailtro CTX-20261008-02

Run dir: /Users/linhsmac/Documents/work/teeinblue-context-builder/runs/context/2026-10-08/CTX-20261008-02

Đọc trước: contracts/qa-context-contract.md (§3, §5a, §8, §12.5), input/orchestrator-directives.json (LUẬT THẮNG bảng map mặc định), input/scope-plan.json (feature_candidates của object bạn, known_conflicts_must_be_conflict_or_oq, never_supersede_topic_map, coverage_gaps), intermediate/doc/_docset-index.json và intermediate/doc/DOC-*.json (lọc claim theo routing_hint.object_key == object của bạn; claim routing sang object khác nhưng chạm object bạn → cross_object_refs, không nhân bản).
Tiền lệ shape: runs/context/2026-10-08/CTX-20261008-01/candidate/product-kb/api-keys.json (envelope + payload{kb_context, kb_candidates, cross_doc_evidence_map, duplicates_merged, conflicts, superseded_candidates, discarded_by_normalizer, doc_coverage_gaps, cross_object_refs, open_questions_draft} + gate).

## Ghi
- 1 file / feature của object: candidate/product-kb/<feature-key>.json (feature_key đúng scope-plan).
- Item không gắn feature nào: candidate/product-kb/_object-level.<object-key>.json (chỉ khi có).
- KHÔNG ghi file của object khác, KHÔNG ghi _product-level.json (trừ khi bạn là shard product-level).

## Luật
1. kb_id: 1 dải liên tục KB-001.. cho TOÀN object (xuyên mọi feature shard + object-level). Product-level: KB-P-001...
2. knowledge_kind theo TẦNG NGUỒN (claim.source_layer + kiểm lại bằng dòng Nguồn trong quote/tài liệu): po_dev_decision/jira_ac/test_case_pass → CONFIRMED_EXPECTED (đủ điều kiện ở directives); qa_lead_decision → OBSERVED_CURRENT MEDIUM, không confirmation_source, statement nêu "QA lead chốt <ngày> theo bản dựng staging, chưa có xác nhận PO/Dev"; staging_observation → OBSERVED_CURRENT (LOW 1 lần / MEDIUM tối đa, KHÔNG HIGH); bundle_or_i18n → INFERRED LOW; known_defect → OBSERVED_CURRENT + status KNOWN_DEFECT; disputed → conflict_group/INFERRED LOW + OQ; superseded → superseded_candidates (không item); qa_process → discarded_by_normalizer.
3. confidence: CE spec_doc → MEDIUM (nguồn là tóm tắt QA, không phải văn bản PO gốc); HIGH cấm toàn run.
4. confirmation_source chỉ ở CE, shape đủ §3 {type, ref{locator,url,authored_by,authored_on,quote}, derivation:'prose'}; locator là citation người đọc hiểu (vd "Quyết định PO/BA 02/10/2026 (task Testlane MTRO-011 BR-12), ghi trong QA business rule Mailtro"), KHÔNG tên/handle người, KHÔNG DOC-/DSEC-/CLM-, KHÔNG đường dẫn. authored_by = vai trò.
5. scope.environment = "documented" 100%. scope.role theo role_stated; surface ∈ portal|auth|api|backend|db|mcp.
6. Dedupe: cùng hành vi ở business-rule + KB feature + inventory → 1 item, doc_refs gom đủ, claim_ids gom đủ, kind = tầng cao nhất cho ĐÚNG phát biểu. Quyết định PO/Dev mới hơn thắng rule cũ. Quan sát staging lệch quyết định PO/Dev → giữ CE + item OBSERVED riêng (KNOWN_DEFECT nếu nguồn gọi là lỗi; nếu không → OQ NEEDS_CONFIRMATION nêu độ lệch), related_kb_ids hai chiều.
7. Rule vs bug = 2 item, related_kb_ids hai chiều. Mọi KNOWN_DEFECT → 1 OQ OPEN_ISSUE (có thể gom theo nhóm).
8. Conflict cùng phạm vi → conflict_group "CONF-MTRO-<object>-<nn>", cả hai item INFERRED LOW status "UNRESOLVED", + OQ CONFLICT (side_a, side_b là câu đầy đủ kèm nguồn+ngày). Khác phạm vi (khác thời điểm deploy / khác surface / khác module) → giữ cả hai đúng phạm vi + OQ NEEDS_CONFIRMATION. Mỗi mục trong known_conflicts_must_be_conflict_or_oq mà scope-plan gán cho object bạn PHẢI có conflict_group hoặc OQ tương ứng — liệt kê cách xử lý từng mục trong payload.kb_context.known_conflicts_handled.
9. QA lead decision: gom 1 OQ NEEDS_CONFIRMATION / nhóm cùng buổi chốt (không 1 OQ/rule).
10. 1 OQ NEEDS_CONFIRMATION về role/ma trận quyền cho object (nếu claim không tự ghi role).
11. Coverage gap (open-questions/MTRO.md thiếu, feature chỉ có ở file thiếu, Admin chưa quan sát, build không ghi) → doc_coverage_gaps + OQ OPEN_ISSUE (1/mảng), không suy diễn.
12. tags[]: item thuộc never_supersede topic (permission, billing, data-deletion, suppression, unsubscribe-consent, sending-domain-verification, merge-tag-syntax) gắn tags chứa đúng tên topic.
13. STATEMENT HYGIENE (reviewer grep cứng): statement/topic/locator/OQ summary KHÔNG chứa DOC-/DSEC-/CLM- id, tên file nguồn, đường dẫn, id knowledge Testlane (KB-0xx/KB-1xx/KB-3xx của Testlane — chỉ kb_id nội bộ của bạn trong related_kb_ids), mã inventory (L01, Đ27, §2.4), tên agent/pipeline, từ vựng nội bộ (normativity, claim_kind, source_layer, EXAMPLE_ONLY…), CTX id, email, tên/handle người (thuongnth, Ashley, haptt, haild, chuyenmc, huongtt, Nga, ngant, Hae, Hảo, Tình, Thương, Luke, Anna…), 'open-questions/MTRO.md', 'inventory/MTRO.md', 'business-rules/MTRO.md', 'qikify-QA-mailtro', '.env'. Dùng vai trò PO, PO/BA, Dev BE, Dev FE, QA lead. Gọi nguồn: "QA business rule Mailtro", "Decision log Mailtro", "QA KB Mailtro \"<tên feature>\" v1", "Inventory staging Mailtro \"<module>\" (01/10/2026)". Id nghiệp vụ được phép: Jira MTRO-xx, "task Testlane MTRO-0xx", BR-xx, TC-MTRO-xxx, BUG-xx, GAP-xx, route, endpoint, tên UI nguyên văn. Statement mở đầu bằng phạm vi nguồn ("Theo quyết định PO/BA 02/10/2026…", "Trên staging (khảo sát 01/10/2026)…", "QA lead chốt 18/09/2026 …").
14. doc_refs.quote phải là substring nguyên văn của tài liệu (copy từ claim). Không field runtime (act_ids/apiop_ids/ent_ids để rỗng).
15. last_updated {date:'2026-10-08', ccr_ref:'bootstrap'}; freshness {observed_at:<authored_on>, run_id, doc_generated_at, basis}.
16. open_questions_draft: {draft_id:null, type: CONFLICT|NEEDS_CONFIRMATION|OPEN_ISSUE, feature_id, summary (câu hỏi đầy đủ, tự hiểu được), kb_ids, side_a/side_b (CONFLICT), conflict_group}.
17. gate.decision PASS/FAIL. Trả handoff ngắn: số item theo feature, theo knowledge_kind, theo confirmation_source.type, số conflict_group, số OQ draft, cách xử lý known conflicts, + board_update payload.
