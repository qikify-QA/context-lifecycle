---
name: ctx-build
description: Dựng candidate từ evidence — Product KB, Feature Profile, Regression Checklist, và diff với canonical đã publish. Dùng từ ctx-run sau khi có evidence (hoặc claim CCR). Gate C3/C4/C5.
---

# ctx-build

Bốn bước tuần tự cho mỗi scope; các feature độc lập chạy song song (một subagent mỗi feature cho bước 2–3). Mỗi bước validate ngay, retry chỉ bước hỏng.

| # | Bước | Reference | Validate / gate |
|---|---|---|---|
| 1 | Normalize evidence → KB candidate (`from-observation` / `from-doc` / `from-ccr`); fan-in duy nhất; run có base thì carry-forward toàn bộ base | `references/normalizer.md` | `--stage kb`, C3 |
| 2 | Feature Profile, chỉ đọc KB shard | `references/feature-builder.md` | `--stage profile`, C4 |
| 3 | Regression Checklist, giữ profile đã đạt C4; bảng oracle + phanh `derivation` | `references/feature-builder.md` | `--stage checklist`, C5 |
| 4 | Diff candidate vs base: phân loại, resolution tất định §12.5, blast radius | `references/diff-analyzer.md` | `--stage diff` |

- Run có base: ghi delta thay vì chép lại base, `materialize-delta.mjs` ghép; chi tiết và retry theo pha ở `references/delta.md`.
- Diff: chạy khi có base (CCR_INGEST/INCREMENTAL_UPDATE luôn chạy, `NOT_APPLICABLE` là gate FAIL). `contracts/supersede.md` là nguồn thuật toán; diff không áp resolution, không phán xử nghiệp vụ.
- Không tạo knowledge mới ở bước 2–3; không đọc evidence thô ngoài KB shard.
- Entry `requires_human_decision: true` → hỏi owner (`references/ccr-intake.md` §4 của ctx-run), không tự quyết.
