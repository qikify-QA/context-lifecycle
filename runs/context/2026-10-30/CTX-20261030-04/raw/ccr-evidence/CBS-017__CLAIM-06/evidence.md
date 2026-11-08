# CBS-017__CLAIM-06

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-06` | TIB-5580 — Stroke paragraph chỉ có kiểu round: góc trong và ngoài của mọi lớp bo tròn ở preview editor và PNG order; SDK preview dùng stroke-linejoin round (SVG vectorize chưa kiểm) | portal (preview editor) · api (PNG) · storefront | `test_case` — PASS TC-TIB-6323 2026-10-22 staging [AI] — build: staging @ 2026-10-22 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-06` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6323 (Testlane task TIB-220); order #1097 (portal orders/4753)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-22`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  2 lớp #FF0000/8px + #0000FF/8px trên #5177 (Save: PUT /api/artworks/5177 → 200, stroke_layers [{#ff0000,8},{#0000ff,8}]). Preview editor zoom 250% (góc chữ L, O, E): viền bo tròn ở cả 2 lớp, không có đầu nhọn/vuông. PNG order #1097 (portal orders/4753, zoom 700% trên chữ W, O, R): các góc ngoài và trong của cả 2 vành đều bo tròn. Preview storefront: SVG của SDK dùng stroke-linejoin="round" stroke-linecap="round" (SDK staging chỉ vẽ 1 vành cho paragraph, đã ghi ở các case khác). Giới hạn: không lấy được bản SVG vectorize nên chưa kiểm góc ở SVG.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
