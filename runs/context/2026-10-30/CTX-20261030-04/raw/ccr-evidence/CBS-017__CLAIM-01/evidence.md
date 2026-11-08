# CBS-017__CLAIM-01

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-01` | TIB-5580 — Paragraph new-schema có stack editor tối đa 3 lớp stroke; đủ 3 row thì nút Add stroke bị disable; Save lưu stroke_layers đúng 3 entry, đúng thứ tự | portal (Artwork Editor 2.0 → popover Stroke) · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-6312 2026-10-21 staging [AI]; TC-TIB-6314 2026-10-21 staging [AI]; TC-TIB-6315 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke (KB-129..KB-144, checklist text-multi-stroke, v6) | `UNKNOWN` |

## Phần 1b

| `CLAIM-01` | `artwork` | `text-multi-stroke` | owner/staff (merchant soạn artwork) | portal · api | KB-129..KB-144 (v6, chưa rõ item nào — clone chưa có) |

## Phần 5.1

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6312, TC-TIB-6314, TC-TIB-6315 (Testlane task TIB-220); ngày chạy từ report lượt chạy TIB-220 (Testlane không lưu ngày từng case)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc (report lượt chạy); case trên Testlane không có URL công khai`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  TC-TIB-6312: Popover Stroke của paragraph new-schema là editor stack ("Stroke 1 sits closest to the text… Up to 3"). Thêm row 2 = #00FF00 / 4px; Save OK, reload mở lại vẫn 2 row (#FF0000/4, #00FF00/4). API: PUT /api/artworks/5177 → 200, stroke_layers = [{#FF0000,4},{#00ff00,4}] đúng thứ tự, stroke_color/width mirror lớp 1 (màu row 2 lưu dạng lowercase "#00ff00", cùng giá trị hex).
  TC-TIB-6314: 3 row trong popover Stroke (#FF0000/3, #00FF00/3, #0000FF/3); preview 200% cho thấy từ mép chữ ra ngoài là đỏ → xanh lá → xanh dương, đúng trên cả 3 dòng. API: PUT /api/artworks/5177 → 200, stroke_layers 3 entry [{#FF0000,3},{#00ff00,3},{#0000ff,3}] đúng thứ tự, stroke_color/width = lớp 1 (#FF0000/3), không làm tròn/đổi tên field.
  TC-TIB-6315: Ở 3 row, nút "Add stroke" bị disabled (không tạo được row thứ 4, click force cũng không thêm). Save → PUT /api/artworks/5177 → 200, stroke_layers đúng 3 entry [{#FF0000,2},{#00ff00,2},{#0000ff,2}], không có entry thứ 4; reload mở lại popover vẫn đúng 3 row (2/2/2).
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong từng case trên Testlane)`
