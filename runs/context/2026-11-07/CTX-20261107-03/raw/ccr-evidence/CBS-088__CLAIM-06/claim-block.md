# CBS-088 CLAIM-06 (Proposal CBS-088, submitted 2026-11-07)

- **Statement:** Word Cloud dùng shape SVG có clip-path lồng nhiều cấp chỉ đặt chữ trong vùng shape đã mask, không tràn ra khung chữ nhật ngoài.
- **Object / feature:** artwork/layer-config-puzzles
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (đơn có Word Cloud) và store owner/staff (cấu hình shape), api (render design)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả AI do máy chạy), 2026-10-07
- **Locator:** QA-3395 (QA Hub task TIB-167) TC-05 (TC-TIB-4723, passed), result_QA-3395_all_2026-10-07.md, staging, không ghi số build. Liên quan, không bị thay: layer-config-puzzles KB-031. Chưa so preview storefront/editor với final render (TC-32 ⏸️). (CCR cũ: CBS-030 CLAIM-07)
- **Căn cứ expected:** Jira TIB-5350, comment chauptm 2026-10-07 (PR #3836, commit ffef0097f; dev không ghi auto-generated)
- **Trích nguyên văn:**
  ```
  TC-05 | ✅ AI — Word Cloud shape 74.svg (7-level chained clip): chữ chỉ nằm dọc que + cụm trong ngôi sao, không tràn ra khung chữ nhật 129×364 | order [đã bỏ id] PNG + design preview [đã bỏ id] (PNG): words nằm trong vùng sao/que | dùng attachment 74.svg (chain 7 cấp quanh star) thay cho fixture circle của dev
  Ngữ cảnh (dev, chauptm, Jira TIB-5350 comment 2026-10-07 — không ghi auto-generated, không phải nguồn của claim):
  - [ ] Word Cloud layer with an SVG shape that uses a chained/nested `clip-path` (e.g. the SVG attached to this ticket) → words fill only the clipped shape, not its bounding rectangle.
  ```
