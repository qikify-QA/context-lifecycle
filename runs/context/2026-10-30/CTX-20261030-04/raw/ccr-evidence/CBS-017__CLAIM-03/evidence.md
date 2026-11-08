# CBS-017__CLAIM-03

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-03` | TIB-5580 — Xoá lớp giữa, kéo đổi thứ tự lớp, Save + reload giữ đúng dữ liệu; stroke_color/stroke_width mirror lớp trong cùng sau đổi thứ tự | portal · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-6317 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-03` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6317 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  Đặt 3 lớp #FF0000/#00FF00/#0000FF (3px), Save (PUT /api/artworks/5177 → 200, 3 entry), reload đủ 3 row. Xoá row giữa còn 2 row (#FF0000, #0000FF), vành xanh lá biến mất khỏi preview. Kéo handle đổi thứ tự → vành sát mép chữ là #0000FF, ngoài là #FF0000. Save: PUT → 200, stroke_layers = [{#0000ff,3},{#FF0000,3}], stroke_color/width mirror lớp trong cùng (#0000ff/3). Reload: popover còn 2 row #0000FF/3, #FF0000/3 và preview giữ thứ tự mới.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
