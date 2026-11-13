---
name: ctx-run
description: Chạy một run QA Context Lifecycle (bootstrap explore/doc hoặc xử lý CCR từ Proposal) từ intake đến publish vào knowledge/. Dùng khi cần tạo, làm mới hoặc cập nhật QA context của một product/object, hoặc khi /process-ccr. Không dùng để kết luận PASS/FAIL cho ticket.
---

# ctx-run

Main session chạy skill này, không có agent điều phối riêng. Luật ở `contracts/` (đọc đúng § khi cần, không nạp hết). Việc tất định dùng script trong `scripts/ctx/`.

## Bất khả xâm phạm

- Chỉ `scripts/ctx/publish-apply.mjs` ghi `knowledge/` (ngoại lệ: CCR không claim, `references/ccr-intake.md` §2b), và chỉ khi `review/verdict.json` có `publish_allowed: true` và lock còn thuộc run.
- Observation là `OBSERVED_CURRENT`; không thành expected nếu chưa có nguồn thẩm quyền (contract §3).
- Không action vượt mutation policy; không lưu secret/token/cookie/PII (§6).
- Người review không phải người produce. Subagent chỉ ghi trong thư mục run.
- Thiếu input → làm phần an toàn, trả `PARTIAL`; không tự mở rộng scope. Explore lỗi không được hạ xuống `DOC_BOOTSTRAP` để qua gate.
- Không tự tạo/comment Jira hay nhắn kênh ngoài để escalate; hỏi operator.

## Khởi động

1. `node scripts/ctx/products.mjs` → product phải `ACTIVE`. Đọc `config/products/<p>.json` (`modes`, `environments`, `explore`, `defaults`, `supersede_policy`).
2. Nguồn việc: CCR → `references/ccr-intake.md`; bootstrap/refresh trực tiếp → dựng `input/bootstrap-request.json` từ `contracts/templates/`.
3. `new-run.mjs` (mode provisional) → gate C0 (`contracts/gates.md`; thiếu object/role/mutation policy → hỏi operator).
4. `lock.mjs acquire` mọi object ngay khi biết, trước C0.5 và trước mọi subagent. Exit 2 → `DEFERRED`, `reason: locked_by_run`, dừng.
5. C0.5 (CCR) rồi ghi `mode` + `mode_settled_at` vào `run-manifest.json`. Mode chỉ đọc từ `run-manifest.json`.

## Hai làn

**Làn CCR (mặc định)** — `CCR_INGEST`, 0 explorer, object đã có base hoặc object mới do CCR khai (base rỗng, tự tạo — `contracts/ccr-protocol.md` §12.1 bước 5):
`ctx-build` (kb from-ccr → profile → checklist) → diff (luôn) → publish.

**Làn bootstrap**:

| Mode | Evidence (`ctx-evidence`) | Rồi |
|---|---|---|
| `ZERO_DOC_BOOTSTRAP`, `BROAD_BOOTSTRAP`, `REFRESH`, `RECONCILE` | scope-planner (chỉ BROAD) → portal (+db xen kẽ) → C1 → api → storefront (chỉ khi có buyer-facing effect) → code (chỉ khi có câu hỏi cụ thể) → C2 | `ctx-build`; diff chỉ khi có base |
| `INCREMENTAL_UPDATE` (CCR có claim cần explore) | explorer theo `required_explorers` của claim, scope hẹp; đổi `exploration_policy` sang `defaults.mutation_policy` trước; không supersede, `changed` = `CONFLICTED` | `ctx-build` (+ from-ccr cho claim S3); diff luôn |
| `DOC_BOOTSTRAP` | tự nạp + redact doc → `freeze-docs.mjs` → C0 doc → scope-planner (luôn) → mint FEATURE-ID + lock → doc-ingest song song mỗi DOC-ID → C1-DOC/C2-DOC | `ctx-build`; diff chỉ khi có base |

Product explore: brief explorer luôn kèm `explore.playbook`, `explore.account_guard` và yêu cầu xác minh account là bước đầu. `RECONCILE`: explore hẹp đúng hai phía conflict, không tự đóng.

## Sau mỗi subagent

Materialize delta (nếu có) → `node scripts/ctx/validate-run.mjs --run <id> --stage <manifest|ccr-plan|doc|kb|profile|checklist|diff|verdict>`. Lỗi → retry đúng subagent đó kèm danh sách lỗi, tối đa 2 lần mỗi stage; còn lỗi thì `REWORK_REQUIRED` và trả operator. Trước review chạy `validate-run.mjs` không `--stage` một lần. Subagent trả receipt ngắn (status, output paths, counts, blockers); artifact nằm trên đĩa.

Chọn model/effort khi spawn: skill `pick-model`.

## Retry — sửa nhánh, không chạy lại flow

| Tình huống | Xử lý |
|---|---|
| API mapping lỗi / thiếu capture | retry api, hoặc portal cho đúng `ACT-ID` thiếu |
| C1-DOC FAIL một doc | retry doc-ingest đúng `DOC-ID` |
| Checklist lỗi | builder `stage: checklist`, giữ profile đã đạt C4 |
| Profile lỗi | builder `stage: all` cho scope đó |
| Reviewer trả `rework_targets` | dispatch đúng nhánh + scope, chạy lại từ bước sau nó |
| DB không truy cập được | ghi limitation, không block nếu DB không bắt buộc |
| Storefront chưa quan sát | chỉ block khi feature có buyer-facing effect |
| Action bị cấm / không cleanup được | DỪNG trước khi làm, ghi `skipped_actions` |
| Evidence còn secret/PII | DỪNG publish, redact lại |
| Login bị chặn permission | `BLOCKED`, hỏi operator theo playbook |

## Kết thúc

Compile OQ → `publish-strip` → prose → `ctx-review` → `publish-apply` → phản hồi Proposal → release lock: `references/publish.md`. Ghi `status`, `mode`, `mode_settled_at`, `produced_open_questions` vào `run-manifest.json` (contract §15). Phát hành sang qa-knowledge (`publish-knowledge.mjs --pr`) chỉ khi operator đồng ý.

Done khi: mọi gate áp dụng có kết quả trong `review/verdict.json`; `publish-meta.json` version mới và `feature-summary.md` dòng 2 khớp; mọi OQ của run nằm trong `open-questions.md` và `produced_open_questions`; Proposal đã nhận outcome; lock đã release; vùng chưa explore ghi rõ.

## Script (luôn dùng, không làm tay)

`products.mjs` · `intake.mjs` · `dedup.mjs` · `new-run.mjs` · `lock.mjs acquire|verify|release` · `freeze-docs.mjs` · `materialize-delta.mjs` · `validate-run.mjs` · `publish-strip.mjs` · `audit-preview.mjs` · `publish-apply.mjs` · `copy-shared.mjs` · `review-delta.mjs`. Exit 2 của lock/publish = `DEFERRED` (`locked_by_run` / `lock_lost`), không phải `CONFLICT`; exit 1 = đọc JSON output, đừng đoán.
