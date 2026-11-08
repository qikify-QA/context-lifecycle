# Orchestrator — nhận CCR

Trình tự của orchestrator cho run xuất phát từ Context Change Request. Luật nằm ở `contracts/ccr-protocol.md`; file này chỉ là thứ tự thao tác.

## 1. Nhặt Proposal (luồng tự động)

Kéo card không tự đánh thức orchestrator: board không đẩy sự kiện. Operator chạy `/process-ccr` theo lịch trong `README.md`.

1. `node scripts/ctx/products.mjs` → mỗi product ACTIVE có `project_id` và `mcp_server`.
2. Với mỗi product: `mcp__<mcp_server>__list_context_board_proposals({ status: "in-progress", project_id })`. Lỗi/401 ở một product → ghi log, tiếp tục product khác.
3. Với mỗi Proposal: `mcp__<mcp_server>__get_proposal({ proposal_id })`. Ghi mảng Proposal (có `id`, `projectId`, `submittedAt`, `content`) ra một file tạm trong scratchpad.
4. `node scripts/ctx/intake.mjs --proposals <file>` → hàng đợi theo mức gấp rồi `submittedAt`; Proposal trong `skipped` (project không thuộc product ACTIVE) bỏ qua. Xử lý theo đúng thứ tự `queue`.
5. Proposal chạm nhiều product → `finish_context_board_proposal` outcome `NEEDS_INFO` ("Phần đầu"), không tạo run.

**Chạy tay:** operator đưa đường dẫn file trong `inputs/ccr-drafts/`. Không có `proposal_id` → không gọi tool phản hồi board; trả kết quả trong response.

## 2. Dựng run

1. Resolve `object_key` qua `knowledge/products/<product>/_registry.json` của **đúng product đó** (§12.1 bước 5). Không resolve được → `update_context_board_proposal({ status: "blocked", results: { summary, open_questions: ["Phần đầu: ..."] } })`, dừng.
2. Object phải đã có base (`knowledge/products/<p>/<o>/publish-meta.json`). Chưa có → `DEFERRED` + `reason: object_has_no_base`, `action: "bootstrap_required"`, `object`, `scope` (lấy từ phần Thuộc / Không thuộc của CCR), và báo operator mở run bootstrap.
3. `node scripts/ctx/new-run.mjs --product <p> --mode CCR_INGEST --object <o> --proposal <CBS-n> --label "<vài từ gợi nhớ>"`.
   Exit 3 (`proposal_already_claimed`) → dùng run đã có hoặc báo outcome đã có; không tạo run mới và không ghi DEFERRED lên card đang được xử lý. Intake busy → retry sau, không đổi board.
4. Ghi `input/bootstrap-request.json` theo `contracts/templates/bootstrap-request.ccr.json`.
5. `node scripts/ctx/lock.mjs acquire --run <id> --product <p> --objects <o,...> --proposal <CBS-n>`. Exit 2 → `finish_context_board_proposal` outcome `DEFERRED`, `results: { summary, reason: "locked_by_run", held_by }` (lấy từ `conflict.held_by` của output), ghi `status: DEFERRED` vào run-manifest, dừng. Người gửi kéo Proposal lại sau khi run kia xong.
6. Gate C0 biến thể CCR (`contracts/gates.md`).

## 2b. CCR không có claim

CCR chỉ có khối C, hoặc khối D toàn `KHÔNG CÒN ÁP DỤNG`: không tạo run, không qua C0.5. Có sửa file của object thì vẫn phải lock object đó.

0. `node scripts/ctx/proposal-claim.mjs acquire --product <p> --proposal <CBS-n>`; giữ `claim_id`. Exit 3 → không áp lại: `done` dùng receipt để hoàn tất phản hồi board còn thiếu; `in-progress`/record hỏng cần kiểm tra run trước, không tự takeover. Lấy lock mọi object bị khối D sửa, rồi `node scripts/ctx/lock.mjs acquire --run <CBS-n> --name _shared --ttl 600`. Exit 2 → chờ run kia xong rồi thử lại. Chỉ đọc file sau khi đã giữ lock.
1. Áp từng dòng vào file trong `knowledge/products/<product>/`, kiểm theo contract §5b, §5c: đúng nơi, không trùng nơi khác, chỉ tên biến, guide ≤ 10 KB. Khối D: gỡ entry OQ, thêm CHANGELOG (`contracts/ccr-protocol.md` §12.3d).
2. Dòng không đạt thì bỏ và nêu lý do trong `results`.
3. Sau khi audit sạch, ghi receipt trước phản hồi board: `node scripts/ctx/proposal-claim.mjs finish --product <p> --proposal <CBS-n> --claim-id <id> --files <relative-file,...>`. Luôn release `_shared` và object lock trong finally, kể cả khi lỗi.
4. `finish_context_board_proposal` với danh sách file đã đổi, `results.release = { status: "pending" }`. Phát hành theo `publish.md` mục 7, kèm `--proposal <CBS-n>`.

Đây là ngoại lệ duy nhất của luật "chỉ ghi `knowledge/` qua `publish-apply.mjs`", vì các file này không có version hay oracle.

## 3. Gate C0.5 — Source Strength

1. Mỗi block khối A, dòng khối B, block khối D (trừ `KHÔNG CÒN ÁP DỤNG`) là một claim. Thiếu cột `Claim ID` → `CLAIM-01..n` theo thứ tự dòng, `claim_id_source: "positional"`.
2. Gán `S3` / `S2` / `S1` / `S0` theo `contracts/ccr-protocol.md` §12.3a, đọc nguồn trong block của claim. Với `S3`, điền `confirmation_source.ref.citation` đúng dạng sẽ publish (§3). Với `S2`, điền `qa_rule_ref` (§3).
3. Copy evidence từng claim vào `raw/ccr-evidence/<claim_key>/`; toàn văn Proposal vào `raw/ccr-evidence/_ccr-full-content.md`.
4. Ghi `input/ccr-fastpath-plan.json` đúng schema §12.3a.
5. `node scripts/ctx/dedup.mjs --run <id>`: claim trùng → bỏ khỏi plan và ghi vào `results`; mọi claim trùng → `REJECTED` + `reason: duplicate_of`, dừng.
6. Claim cần feature mới (`kb_address.feature_is_new: true`) → mint `FEATURE-ID` (§4). Feature đã có → dùng `feature_key` của base.
7. Chốt mode: 0 explorer → `CCR_INGEST`; operator yêu cầu explore cho claim nào → `INCREMENTAL_UPDATE` (skill `ctx-run`, bảng mode). Ghi `mode` + `mode_settled_at: "C0.5"` vào `run-manifest.json`.

## 4. Quyết định của owner

Diff có entry `CONFLICTED`/`SUPERSEDE` với `requires_human_decision: true` → hỏi đúng vai trò trong `owners` (qua operator hoặc note trên Proposal), không tự quyết. Có quyết định → ghi `input/approvals.json` (vai trò + link, không tên/email) rồi chạy lại diff analyzer. Chưa có → item đó không publish; nếu không còn gì publish được thì `DEFERRED` + `reason: awaiting_decision` + `approval_needed`. Entry `ADDED` có cờ này vẫn publish, kèm OQ hỏi owner. Chi tiết: `contracts/supersede.md` mục "Quyết định của người".

## 4b. Trong lúc chạy

Chỉ cập nhật tiến độ: `update_context_board_proposal({ proposal_id, status: "in-progress", note, results: { summary } })`. Không đổi status giữa chừng.

## 5. Kết thúc

`finish_context_board_proposal({ proposal_id, outcome, results, note })` theo bảng §12.2. Bị chặn ở lock (đầu run hoặc lúc `publish-apply` exit 2) → `DEFERRED` + `results.reason` từ output script. Rồi ghi `status` + `produced_open_questions` vào `run-manifest.json` và `lock.mjs release`.
