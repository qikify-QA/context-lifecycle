DOC_BOOTSTRAP ingest cho product `mailtro`, run `CTX-20261008-02`. Bạn được giao ĐÚNG 1 tài liệu: {DOC}.

Run dir: /Users/linhsmac/Documents/work/teeinblue-context-builder/runs/context/2026-10-08/CTX-20261008-02
Đọc: contracts/qa-context-contract.md (§3, §4, §9, §10a), input/doc-manifest.json (entry {DOC}: path, sha256, source_layer), input/orchestrator-directives.json (ĐỌC KỸ knowledge_kind_by_source_tier + statement_hygiene), input/scope-plan.json (discovery unit có target.doc_id == {DOC}: section_routing → dùng làm routing_hint), và tài liệu tại input/docs/{DOC}/.
Tiền lệ shape: runs/context/2026-10-08/CTX-20261008-01/intermediate/doc/DOC-02.json (envelope + payload{doc_context, sections, claims, api_operations, data_entities, doc_internal_conflicts, superseded, discarded, not_documented, coverage_limitations, histograms} + gate).

Ghi DUY NHẤT: intermediate/doc/{DOC}.json. KHÔNG ghi _docset-index.json (orchestrator tự gộp vì 35 agent chạy song song). Không ghi raw/, không sửa input/.

Luật bắt buộc cho run này:
- claim_id dạng CLM-{NN}-nnn, dsec_id DSEC-{NN}-nnn (NN = số của {DOC}). quote là substring NGUYÊN VĂN ≤300 ký tự (orchestrator grep lại từng quote). line_start/line_end đúng.
- Mỗi claim BẮT BUỘC có: claim_kind, normativity, hedged, subject{object_candidate, feature_candidate, product_level}, surface (portal|auth|api|backend|db|mcp|unspecified), role_stated, source_layer, source_basis, authored_on (YYYY-MM-DD), authored_on_basis, routing_hint DẠNG DICT {object_key, feature_key} (object/feature key lấy đúng từ scope-plan; mức product → object_key "_product-kb", feature_key = topic của scope-plan), related_claim_ids, defect_severity_stated, repro_stated, brand_scope null.
- source_layer = TẦNG NGUỒN của ĐÚNG phát biểu đó (không phải của cả file), chọn 1 trong enum: po_dev_decision | jira_ac | qa_lead_decision | test_case_pass | staging_observation | bundle_or_i18n | known_defect | disputed | superseded | qa_process. Xác định theo dòng **Nguồn**/Source/ngày gắn với phát biểu (định nghĩa từng tầng trong orchestrator-directives). source_basis = ≤160 ký tự tóm tắt căn cứ phân tầng, dùng VAI TRÒ (PO, PO/BA, Dev BE, Dev FE, QA lead) thay tên/handle người, vd "PO/BA 02/10/2026 qua task Testlane MTRO-011 BR-12". Bạn KHÔNG quyết knowledge_kind — chỉ gán tầng trung thực.
- Phát biểu bị đánh dấu "Thay rule cũ"/"Bị thay"/"corrected" phần bản CŨ → đưa vào superseded[] (không thành claim hiện hành). Câu ❓ "Đang tranh chấp"/"Chưa chốt"/"Need confirm" → claim source_layer disputed (giữ cả hai phía nếu văn bản nêu cả hai, hoặc ghi doc_internal_conflicts[]). Rule có "Ảnh hưởng khi test" nói staging trái rule → tách 2 claim: rule (tầng của rule) + quan sát (staging_observation hoặc known_defect), related_claim_ids trỏ nhau.
- Test data / cách chạy repo / ADR / hạn chế công cụ / Testability Notes / số đếm snapshot → discarded[] (lý do qa_process / snapshot_data); ngoại lệ fact môi trường sản phẩm (2 domain, MCP endpoint, rate limit Public API, captcha Turnstile, SES region/account, route trắng) → claim source_layer staging_observation, object_key _product-kb.
- Tham chiếu "xem open-questions/MTRO.md § …" → KHÔNG suy diễn nội dung; câu ❓ là claim disputed; ghi not_documented[] nếu mảng chỉ có trong file thiếu.
- statement: "QA <loại tài liệu> Mailtro … nêu rằng …" — KHÔNG chứa tên/handle người (thuongnth, Ashley, haptt, haild, chuyenmc, huongtt, Nga, ngant, Hae, Hảo, Tình, Thương, Luke…), KHÔNG email; quote thì nguyên văn (được phép chứa tên vì là trích dẫn, nhưng ưu tiên chọn đoạn quote không chứa tên khi đủ nghĩa).
- Không field runtime (ACT/SCN/OBS/observed_*). raw/ không đụng.
- Mỗi doc phải có not_documented[] và discarded[] (có thể rỗng nhưng phải có mặt).
- gate.decision PASS/FAIL kèm conditions.

Trả về handoff ngắn: số section, số claim theo source_layer, số conflict/superseded/discarded/not_documented, và payload board_update {agent_id, state, current_task, inputs, outputs, blocked_by, last_event}.
