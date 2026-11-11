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
- copy `feature-summary.md`, `open-questions.md`, `CHANGELOG.md`, `_registry.json`, `_product-guide.md`, `_env.example` của base vào preview nếu preview chưa có; guide và `_env.example` được ghi hash vào `candidate/shared-base.json`.

Exit 1 → đọc `problems` trong `candidate/strip-summary.json`, sửa nguồn của lỗi (không sửa tay preview).

## 3. Cập nhật prose trong preview

Với mỗi object bị chạm, trong `candidate/publish-preview/<object>/`:
- `open-questions.md`: thêm entry mới (mỗi entry một khối ```` ```json ```` có `oq_id`, `type`, `feature_id`, `summary`, và `side_a`/`side_b` cho `CONFLICT`); gỡ entry đã được resolve.
- `CHANGELOG.md`: 1 dòng cho mỗi thay đổi, có `ccr_ref` (`CBS-<n>` hoặc `bootstrap`); dòng "Resolved OQ-xxx" cho OQ được gỡ. Dòng supersede đã có sẵn từ script.
- `feature-summary.md`: trạng thái hiện tại (không tích luỹ lịch sử); **dòng 2 là `**Published context version:** <N>`** đúng với `publish-meta.json`.
- `_registry.json`: thêm object/feature mới và alias.

Ở gốc preview, `_product-guide.md` (tổng quan và setup của project): thêm setup mức product mà run làm xuất hiện hoặc đổi, theo định nghĩa và nơi ghi ở contract §5b (nguồn trong CCR: "Phần 2b — Setup mới"), và bỏ thông tin đã lỗi thời. Setup riêng một feature và chi tiết khác biệt môi trường nằm ở `profile.json` của feature; guide chỉ giữ dòng index (hạng mục, feature key, `type`, mức) nếu guide có bảng này. Feature mới không thêm vào guide; guide không liệt kê feature key (contract §5c). Biến env mới thì thêm vào cả guide và `_env.example` nếu product có file này. Áp khối C của CCR vào guide, `_flows/`, `_env.example`: flow thì chỉ lấy đúng file cần sửa bằng `node scripts/ctx/copy-shared.mjs --run <id> --files _flows/<file>.md` rồi sửa, không copy tay. Guide và flow theo contract §5c. Ghi tên biến, không ghi giá trị. Không ghi nội dung explore. Run không có gì mới về setup thì giữ nguyên file. Product chưa có file thì tạo khi run đầu tiên có nội dung setup.

Không ghi `ctx_run_id`, đường dẫn `runs/`, hay ID run-local (`DOC-`, `DSEC-`, `CLM-`, `ACT-`) vào prose.

## 4. Review

Chạy `node scripts/ctx/audit-preview.mjs --run <id>` để chắc preview sạch, rồi dùng skill `ctx-review` với reviewer native độc lập. `rework_targets` → sửa đúng nguồn, strip lại, hoàn tất prose, rồi review và seal lại.

## 5. Publish

Khi `review/verdict.json` có `publish_allowed: true`:

```text
node scripts/ctx/publish-apply.mjs --run <id> --objects <o1,o2,...>
```

Script kiểm đủ gate, decision, verdict seal + lock + audit; `--objects` phải không rỗng và khớp toàn bộ object trong preview. Script kiểm verdict + lock + audit, copy preview vào `knowledge/products/<product>/` (merge), sinh lại manifest dưới lock `_manifest` và `_shared`. Exit 2 → `DEFERRED` + `reason: lock_lost`, không ghi gì.

File dùng chung run không sửa thì giữ nguyên bản trong `knowledge/`. Exit 1 với `shared_file_changed`: file đã đổi từ lúc copy, không có gì được ghi. Chạy `copy-shared.mjs --run <id> --files <file> --reset`, áp lại phần sửa rồi review và seal lại trước publish.

Phát hành cho team là bước riêng, xem mục 7.

## 6. Kết thúc run

1. Ghi vào `run-manifest.json`: `status` (`PUBLISHED`/`BLOCKED`/`REJECTED`/`CONFLICT`/`DEFERRED`), `produced_open_questions`.
2. Run từ Proposal → `finish_context_board_proposal` (`.claude/skills/ctx-run/references/ccr-intake.md` mục 5), outcome `ACCEPTED` thì `results.release = { status: "pending" }`.
3. `node scripts/ctx/lock.mjs release --run <id> --product <p> --objects <...>`.

## 7. Phát hành về qa-knowledge

Chỉ khi operator đồng ý. `published` trên board chưa phải là đã phát hành.

1. Xử lý mọi `publish_conditions` còn mở của các run sẽ phát hành. Chưa đạt thì hạ item theo điều kiện đã ghi, hoặc chưa mở PR.
2. `node scripts/publish-knowledge.mjs` (dry-run, đọc kết quả).
3. `--pr --run <id>`, thêm `--proposal CBS-n` cho CCR §2b không có run. Đưa link PR cho operator.
4. Operator review + merge.
5. `--tag`: script in `released` (Proposal, `pr`, `sha`, `tag`) và `pending` (PR chưa merge).
6. Ledger release được giữ để retry khi board chưa nhận phản hồi. Mỗi Proposal trong `released`: đọc `results` hiện có, gọi `update_context_board_proposal({ proposal_id, status: "published", results: { ...results cũ, release } })`. Tool lưu `results` nguyên văn nên phải gửi đủ. Không set `completed`: QA tự kéo sau khi review.

7. Chỉ sau khi board đã xác nhận cập nhật thành công: `node scripts/publish-knowledge.mjs --ack --proposal CBS-n`. Không ack trước board. `--tag` chỉ xử lý PR đã merge và merge SHA thuộc `origin/main`; OPEN chờ, CLOSED cần operator quyết định. Retry `--pr` dùng ledger đã chuẩn bị, tiếp tục commit/push/PR còn thiếu và tìm lại PR đã tạo, không tạo release trùng. Trước release mới phải có base chứa `origin/main`; không tự merge. Chỉ stage các đường dẫn release đã scan, không `git add -A`.

Preview dựng lại xoá các file JSON do lần strip trước sinh, giữ prose để cập nhật. Preview cũ không có danh sách generated_files cần `--clean` rồi dựng lại prose. Các resolution PROPOSED/CONFLICTED/REFRESHED_ONLY/SUPERSEDE được materialize, reference đến ID candidate được đổi theo ID ổn định. Lỗi apply thông thường rollback file; mất điện/kill giữa lúc ghi vẫn cần đối chiếu receipt và kiểm tra thủ công trước retry.
