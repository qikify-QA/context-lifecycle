# CBS-017__CLAIM-17

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-17` | TIB-5580 — Regression: multi-stroke text 1 dòng (TIB-5417) không đổi ở editor, preview storefront và PNG order (SVG vectorize chưa kiểm) | portal · storefront · api (PNG) | `test_case` — PASS TC-TIB-6337 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (phần text) | `UNKNOWN` |

## Phần 1b

| `CLAIM-17` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · storefront · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-17

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6337 (Testlane task TIB-220); artwork #5182, campaign #3098, order #1094 (portal orders/4747)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Text layer 1 dòng "TEEINBLUE" (#5182) giữ nguyên hành vi TIB-5417: popover Stroke 3 row (#FF0000/3, #00FF00/3, #0000FF/3), nút Add bị disabled ở lớp thứ 4; xoá lớp giữa → 2 row, thêm lại → 3 row, kéo đổi thứ tự → [#0000FF, #FF0000, #00FF00] hoạt động bình thường. Save: PUT /api/artworks/5182 → 200, type "text", stroke_layers 3 entry, stroke_color/width mirror lớp trong cùng (#ff0000/3). Preview storefront CP-5580-TEXT: 3 vành đỏ/xanh lá/xanh dương trên text. Order #1094 (portal orders/4747): PNG có đủ 3 vành đúng thứ tự, giống preview. Giới hạn: không lấy được bản SVG vectorize (không có đường tải SVG trên portal) nên bước so SVG chưa kiểm.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
