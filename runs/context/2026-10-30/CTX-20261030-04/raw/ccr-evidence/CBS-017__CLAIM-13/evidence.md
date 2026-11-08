# CBS-017__CLAIM-13

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-13` | TIB-5580 — Custom Shape (shape-text) giữ popover 1 stroke, không có Add stroke; Save chỉ lưu stroke_color/stroke_width, không có stroke_layers | portal · api | `test_case` — PASS TC-TIB-6331 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke · artwork/layer-config-text | `UNKNOWN` |

## Phần 1b

| `CLAIM-13` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-13

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6331 (Testlane task TIB-220); artwork #5184`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Layer Custom Shape text (shape-text) vẫn là popover 1 stroke (Enable stroke + Stroke width 3px + color picker), không có nút "Add stroke"/stack. Đổi màu #FF0000 → #0000FF, giữ width 3, Save: PUT /api/artworks/5184 → 200, layer chỉ có stroke_color #0000FF, stroke_width 3, không có stroke_layers. Preview editor: 1 vành viền. (Không so preview storefront vì campaign chưa sync artwork mới; không có thay đổi render nào ngoài màu.)
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
