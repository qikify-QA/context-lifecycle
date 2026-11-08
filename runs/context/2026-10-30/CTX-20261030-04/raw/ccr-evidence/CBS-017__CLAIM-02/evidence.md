# CBS-017__CLAIM-02

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-02` | TIB-5580 — Width mỗi lớp là độ dày riêng của vòng đó, cộng dồn khi render; row 1 sát glyph, xếp ra ngoài (kiểm trên preview editor) | portal (preview editor) | `test_case` — PASS TC-TIB-6316 2026-10-21 staging [AI]; TC-TIB-6314 2026-10-21 staging [AI] — build: staging @ 2026-10-21 (giờ không rõ) — sau lần TIB-5580 giao QA cuối (2026-10-16 11:00); Jira không có Fix Version; PR merged + Done 2026-10-22; build hash: không rõ (QA không có quyền repo) | artwork/text-multi-stroke | `UNKNOWN` |

## Phần 1b

| `CLAIM-02` | `artwork` | `text-multi-stroke` | owner/staff | portal | KB-129..KB-144 (v6, chưa rõ item nào) |

## Phần 5.1

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-6316, TC-TIB-6314 (Testlane task TIB-220)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `agent test-executor [AI], chạy cho QA chienct`
- **Trích nguyên văn:**
  ```
  TC-TIB-6316: Preview 200%: 4/4/4 cho 3 vành mỗi vành ~4px; đổi lớp giữa lên 8px thì chỉ vành #00FF00 dày thêm, vành đỏ và xanh dương giữ nguyên bề dày. Sau Save + reload popover là 4 / 8 / 4 (width lưu đúng giá trị nhập, không cộng dồn). Lưu ý: request PUT /api/artworks/5177 của lần Save này không bắt được body trong Network (tool); đã đối chiếu bằng dữ liệu đọc lại sau reload (#FF0000/4, #00FF00/8, #0000FF/4); PUT trả thành công, editor đóng về /artworks.
  TC-TIB-6314: preview 200% cho thấy từ mép chữ ra ngoài là đỏ → xanh lá → xanh dương, đúng trên cả 3 dòng.
  ```
- **File đính kèm cho claim này:** `không có (ảnh chụp nằm trong case trên Testlane)`
