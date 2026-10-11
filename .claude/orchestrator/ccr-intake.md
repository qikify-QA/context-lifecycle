# Orchestrator — nhận CCR

Trình tự của orchestrator cho run xuất phát từ Context Change Request. Luật nằm ở `contracts/ccr-protocol.md`; file này chỉ là thứ tự thao tác.

## 1. Nhặt Proposal (luồng tự động)

1. `node scripts/ctx/products.mjs` → mỗi product ACTIVE có `project_id` và `mcp_server`.
2. Với mỗi product: `mcp__<mcp_server>__list_context_board_proposals({ status: "in-progress", project_id })`. Lỗi/401 ở một product → ghi log, tiếp tục product khác.
3. Với mỗi Proposal: `node scripts/ctx/products.mjs --project-id <projectId>` — exit 2 thì bỏ qua Proposal đó.
4. `mcp__<mcp_server>__get_proposal({ proposal_id })` → đọc `content` theo khuôn `create-ccr`.
5. Proposal chạm nhiều product → `finish_context_board_proposal` outcome `NEEDS_INFO` ("Phần 0 — Cần mấy CCR?"), không tạo run.

**Chạy tay:** operator đưa đường dẫn file trong `inputs/ccr-drafts/`. Không có `proposal_id` → không gọi tool phản hồi board; trả kết quả trong response.

## 2. Dựng run

1. Resolve `object_key` qua `knowledge/products/<product>/_registry.json` của **đúng product đó** (§12.1 bước 5). Không resolve được → `update_context_board_proposal({ status: "blocked", results: { summary, open_questions: ["Phần 1 — Thấy gì: ..."] } })`, dừng.
2. Object phải đã có base (`knowledge/products/<p>/<o>/publish-meta.json`). Chưa có → CCR không chạy được ở `CCR_INGEST`; outcome `DEFERRED` kèm điều kiện "cần bootstrap object trước".
3. `node scripts/ctx/new-run.mjs --product <p> --mode CCR_INGEST --object <o> --proposal <CBS-n> --label "<vài từ gợi nhớ>"`.
4. Ghi `input/bootstrap-request.json` theo `contracts/templates/bootstrap-request.ccr.json`.
5. `node scripts/ctx/lock.mjs acquire --run <id> --product <p> --objects <o,...> --proposal <CBS-n>`. Exit 2 → `finish_context_board_proposal` outcome `CONFLICT` (kèm run đang giữ lock), dừng.
6. Gate C0 biến thể CCR (`contracts/gates.md`).

## 3. Gate C0.5 — Source Strength

1. Từng dòng của "Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính" là một claim. Thiếu cột `Claim ID` → `CLAIM-01..n` theo thứ tự dòng, `claim_id_source: "positional"`.
2. Gán `S3` / `S1` / `S0` theo `contracts/ccr-protocol.md` §12.3a, đọc nguồn ở "5.1 Nguồn & evidence theo từng claim". Với `S3`, điền `confirmation_source.ref.citation` đúng dạng sẽ publish (§3).
3. Copy evidence từng claim vào `raw/ccr-evidence/<claim_key>/`; toàn văn Proposal vào `raw/ccr-evidence/_ccr-full-content.md`.
4. Ghi `input/ccr-fastpath-plan.json` đúng schema §12.3a.
5. Claim cần feature mới (`kb_address.feature_is_new: true`) → mint `FEATURE-ID` (§4). Feature đã có → dùng `feature_key` của base.
6. Chốt mode: 0 explorer → `CCR_INGEST`; operator yêu cầu explore cho claim nào → `INCREMENTAL_UPDATE` (`.claude/orchestrator/mode-incremental.md`). Ghi `mode` + `mode_settled_at: "C0.5"` vào `run-manifest.json`.

## 4. Trong lúc chạy

Chỉ cập nhật tiến độ: `update_context_board_proposal({ proposal_id, status: "in-progress", note, results: { summary } })`. Không đổi status giữa chừng.

## 5. Kết thúc

`finish_context_board_proposal({ proposal_id, outcome, results, note })` theo bảng §12.2. Bị chặn ở lock (đầu run hoặc lúc `publish-apply` exit 2) → outcome luôn `CONFLICT`. Rồi ghi `status` + `produced_open_questions` vào `run-manifest.json` và `lock.mjs release`.
