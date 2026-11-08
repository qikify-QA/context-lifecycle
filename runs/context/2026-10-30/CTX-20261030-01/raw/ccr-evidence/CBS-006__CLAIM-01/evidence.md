# CBS-006 CLAIM-01 — evidence (đóng băng từ Proposal CBS-006, 2026-10-30)

## Phần 1a
| `CLAIM-01` | TIB-5584 — effective visibility: một layer chỉ render trên canvas Artwork Editor khi cờ `visible` của chính nó ON VÀ mọi Group tổ tiên tới gốc đều ON; Group lồng nhiều cấp = AND của cả chuỗi (ẩn Group cấp 1 thì cả nhánh ngừng render; ẩn Group cấp 2 thì chỉ nhánh đó ngừng render) | portal — Artwork Editor (AW 2.0): canvas + layer panel | `test_case` — PASS TC-TIB-6042, TC-TIB-6043, TC-TIB-6044 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace — CHK-010 'Effect thật của Group/Ungroup sau khi bấm' (NEEDS_CONFIRMATION, oracle NONE) và OQ-artwork-045 (chưa từng tạo group) có thể nhận oracle từ claim này | `ADD` |

## Phần 1b
| `CLAIM-01` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có (liên quan CHK-010, KB-043) |

## 5.1

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6042, TC-TIB-6043, TC-TIB-6044
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050 · https://staging-portal.teeinblue.com/artworks?id=5051
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6042 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 (Instance 520): layer panel Group "Name" và LINE1/LINE2/ICON đều mắt ON, không dòng nào dimmed; canvas hiển thị đủ LINE1, LINE2, ICON, OUTSIDE.
  TC-TIB-6043 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5051 : ẩn Group LV1 thì canvas trống (T1, T2, DEEP đều không render); LV2, T1, T2, DEEP đều dimmed, mắt vẫn ON màu amber. Không Save nên không có request ghi. Lưu ý: fixture không có layer nằm ngoài LV1 nên ý "layer ngoài LV1 vẫn render" đã được kiểm ở các case artwork 5050 (OUTSIDE).
  TC-TIB-6044 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5051 : LV1 ON, ẩn LV2 thì canvas còn T1, mất T2 và DEEP; dòng T2/DEEP dimmed, mắt vẫn ON (amber); T1 bình thường. Không Save nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có
