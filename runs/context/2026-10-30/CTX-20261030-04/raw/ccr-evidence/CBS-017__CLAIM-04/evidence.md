# CBS-017__CLAIM-04

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-04` | TIB-5580 — Paragraph mới tạo: Enable stroke mặc định tắt, bật lên có đúng 1 row; Save lưu 1 entry stroke_layers; stroke_color/stroke_width luôn mirror lớp trong cùng (không theo lớp ngoài) | portal · api | `test_case` — PASS TC-TIB-6318 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-04` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6318 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Paragraph (Normal) mới tạo: popover Stroke mặc định tắt (Enable stroke off); bật lên thì có đúng 1 row (#FF0000 / 1px). Save lần 1 (#FF0000/5): PUT /api/artworks/5177 → 200, stroke_layers = [{#FF0000,5}], stroke_color #FF0000, stroke_width 5. Save lần 2 (thêm lớp #00FF00/7): stroke_layers = [{#FF0000,5},{#00ff00,7}], stroke_color/width vẫn #FF0000 / 5 (không nhảy theo lớp ngoài). Save lần 3 (đổi lớp trong cùng #123456/2): stroke_color #123456, stroke_width 2, stroke_layers = [{#123456,2},{#00ff00,7}]. Ghi chú nhỏ: stroke của paragraph mới mặc định tắt chứ không bật sẵn 1 lớp.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
