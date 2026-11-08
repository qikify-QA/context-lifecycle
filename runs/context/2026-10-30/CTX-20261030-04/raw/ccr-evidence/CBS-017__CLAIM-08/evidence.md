# CBS-017__CLAIM-08

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-08` | TIB-5580 — Convert paragraph ↔ single-line text giữ nguyên stack 3 lớp; convert paragraph sang Curve Text / Warp Text chỉ giữ lớp trong cùng (stroke_color/stroke_width), xoá stroke_layers | portal (convert layer) · api | `test_case` — PASS TC-TIB-6325 2026-10-21 staging [AI]; TC-TIB-6326 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (rule convert; OQ-artwork-107) · CCR TIB-5417 (text) nói convert text → paragraph gộp lớp, nay đã đổi | `UNKNOWN` |

## Phần 1b

| `CLAIM-08` | `artwork` | `text-multi-stroke` | owner/staff | portal · api | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6325, TC-TIB-6326 (Testlane task TIB-220); artwork #5214 (copy của #5177)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct. ⏳ CHỜ BẠN (câu cho PO, OQ-artwork-107): convert paragraph 3 lớp sang Curve/Warp làm mất 2 lớp ngoài mà không cảnh báo — PO có xác nhận đây là chủ ý không? Có thì cho nguyên văn + link`
- **Trích nguyên văn:**
  ```
  TC-TIB-6325: Làm trên bản copy #5214 (paragraph 3 lớp #FF0000/#00FF00/#0000FF, 3px). Convert paragraph → Single-line Text: popover Stroke còn đúng 3 row; Save: PUT /api/artworks/5214 → 200, layer type "text", stroke_layers 3 entry theo đúng thứ tự (#ff0000, #00ff00, #0000ff / 3), reload vẫn 3 row. Convert ngược text → Normal Paragraph: popover vẫn 3 row đúng giá trị; Save: PUT → 200, type "paragraph", stroke_layers 3 entry đúng thứ tự, stroke_color/width mirror lớp 1 (#ff0000/3). Preview vẫn 3 vành.
  TC-TIB-6326: Trên bản copy #5214 (paragraph 3 lớp, lớp trong cùng #FF0000/3): convert sang Curve Text → popover Stroke chuyển về dạng 1 stroke (không còn stack, không lỗi); Save: PUT /api/artworks/5214 → 200, layer type "curve-text", stroke_color #ff0000, stroke_width 3, không có stroke_layers. Dựng lại 3 lớp trên paragraph rồi convert sang Warp Text → cũng 1 stroke; Save: PUT → 200, type "warp-text", stroke_color #ff0000 / stroke_width 3, không có stroke_layers. Hai lớp ngoài bị bỏ, đúng R6.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
