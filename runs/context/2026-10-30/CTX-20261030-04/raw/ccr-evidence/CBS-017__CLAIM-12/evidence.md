# CBS-017__CLAIM-12

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-12` | TIB-5580 — Paragraph chỉ có stroke legacy (không có stroke_layers) giữ nguyên hình trong editor; mở popover thì lift thành stack 1 row không đổi hình; Save ghi stroke_layers 1 entry, cặp cũ giữ nguyên | portal (editor) · api | `test_case` — PASS TC-TIB-6330 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-12` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6330 (Testlane task TIB-220); artwork #5181, copy #5212`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Paragraph chỉ có stroke legacy (stroke_color #FF0000 / stroke_width 3, không có stroke_layers) mở trong editor: preview không đổi trước/sau khi mở popover; popover hiện stack đúng 1 row = #FF0000 / 3px. Save (làm trên bản copy #5212 để giữ #5181 sạch): PUT /api/artworks/5212 → 200, stroke_layers = [{#FF0000,3}], stroke_color/stroke_width vẫn #FF0000 / 3. Preview storefront của CP-5580-LEGACY (SDK hiện hành) vẫn 1 vành đỏ mảnh như bình thường.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
