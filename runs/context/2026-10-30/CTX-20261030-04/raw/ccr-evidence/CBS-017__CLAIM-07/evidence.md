# CBS-017__CLAIM-07

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-07` | TIB-5580 — Tắt stroke: preview editor, SVG preview storefront và PNG order không có viền; stroke_enabled=false nhưng stroke_layers giữ nguyên; bật lại thì các lớp cũ quay lại đúng thứ tự (SVG vectorize chưa kiểm) | portal · api (PNG) · storefront | `test_case` — PASS TC-TIB-6324 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-07` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | portal · api · storefront | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6324 (Testlane task TIB-220); order #1098 (portal orders/4754)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Đặt 3 lớp #FF0000/#00FF00/#0000FF (3px) trên #5177 rồi tắt Enable stroke. Preview editor chỉ còn fill. Save khi tắt: PUT /api/artworks/5177 → 200, stroke_enabled = false, stroke_layers vẫn giữ nguyên 3 entry (không bị xoá). Preview storefront CP-5580: SVG paragraph không có thuộc tính stroke nào. PNG order #1098 (portal orders/4754, xem trên nền xám): chỉ có chữ trắng, không có viền. Bật lại stroke trong editor: popover hiện đúng 3 row #FF0000/3, #00FF00/3, #0000FF/3 theo thứ tự cũ và preview có lại 3 vành. Giới hạn: không lấy được bản SVG vectorize nên chưa kiểm "không viền" ở SVG.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
