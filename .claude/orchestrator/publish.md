# Orchestrator — publish

Phần cuối chung của mọi mode, sau khi checklist builder (và diff analyzer, nếu có base) xong. Luật: contract §5, §5a, §13, §15, §16.

## 1. Compile open question

Gom mọi `NEEDS_CONFIRMATION` / `CONFLICT` / `OPEN_ISSUE` của run: `open_questions_draft` + `conflicts` của normalizer, `checks_needing_confirmation` của checklist builder, `unknown_areas` của profile, mỗi `conflict_group` (OQ `CONFLICT`), mỗi `KNOWN_DEFECT` (OQ `OPEN_ISSUE`).

- Gộp mục trùng nội dung trong cùng feature; mint `oq_id` = `OQ-<object-key>-<nnn>` tiếp số đã có trong `open-questions.md` của base (không đổi số mục cũ).
- Ghi `candidate/oq-assignments.json`: `{ "<feature_key>": { "checks": {"CHK-001": "OQ-..."}, "unknown_areas": {"0": "OQ-..."} } }`.
- Ghi danh sách `oq_id` của run để điền `produced_open_questions` lúc kết thúc.

## 2. Publish strip

`node scripts/ctx/publish-strip.mjs --run <id> [--ccr-ref CBS-n]` → `candidate/publish-preview/` (layout `knowledge/products/<product>/`). Script:
- chuyển KB/profile/checklist sang schema published (allowlist §5a), lấy `confirmation_source.ref` từ `ref.citation`;
- áp `resolution: SUPERSEDE` của `review/knowledge-diff.json`, kèm dòng CHANGELOG trích nguyên văn statement cũ;
- sinh `publish-meta.json` (version = base + 1) cho mọi object bị chạm, `kb.json` rỗng cho object mới không có shard object-level;
- copy `feature-summary.md`, `open-questions.md`, `CHANGELOG.md`, `_registry.json` của base vào preview nếu preview chưa có.

Exit 1 → đọc `problems` trong `candidate/strip-summary.json`, sửa nguồn của lỗi (không sửa tay preview).

## 3. Cập nhật prose trong preview

Với mỗi object bị chạm, trong `candidate/publish-preview/<object>/`:
- `open-questions.md`: thêm entry mới (mỗi entry một khối ```` ```json ```` có `oq_id`, `type`, `feature_id`, `summary`, và `side_a`/`side_b` cho `CONFLICT`); gỡ entry đã được resolve.
- `CHANGELOG.md`: 1 dòng cho mỗi thay đổi, có `ccr_ref` (`CBS-<n>` hoặc `bootstrap`); dòng "Resolved OQ-xxx" cho OQ được gỡ. Dòng supersede đã có sẵn từ script.
- `feature-summary.md`: trạng thái hiện tại (không tích luỹ lịch sử); **dòng 2 là `**Published context version:** <N>`** đúng với `publish-meta.json`.
- `_registry.json`: thêm object/feature mới và alias.

Không ghi `ctx_run_id`, đường dẫn `runs/`, hay ID run-local (`DOC-`, `DSEC-`, `CLM-`, `ACT-`) vào prose.

## 4. Review

Chạy `node scripts/ctx/audit-preview.mjs --run <id>` để chắc preview sạch, rồi dispatch `context-quality-reviewer`. `rework_targets` → retry đúng nhánh (bảng Retry trong agent definition), chạy lại strip, rồi review lại.

## 5. Publish

Khi `review/verdict.json` có `publish_allowed: true`:

```text
node scripts/ctx/publish-apply.mjs --run <id> --objects <o1,o2,...>
```

Script kiểm verdict + lock + audit, copy preview vào `knowledge/products/<product>/` (merge), sinh lại manifest dưới lock `_manifest`. Exit 2 → outcome `CONFLICT`, không ghi gì.

Phát hành cho team là bước riêng: `node scripts/publish-knowledge.mjs` (dry-run, đọc kết quả) rồi `--push` **chỉ khi operator đồng ý** — `--push` commit, tag và push repo dùng chung.

## 6. Kết thúc run

1. Ghi vào `run-manifest.json`: `status` (`PUBLISHED`/`BLOCKED`/`REJECTED`/`CONFLICT`), `produced_open_questions`.
2. Run từ Proposal → `finish_context_board_proposal` (`.claude/orchestrator/ccr-intake.md` mục 5).
3. `node scripts/ctx/lock.mjs release --run <id> --product <p> --objects <...>`.
