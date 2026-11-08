# CBS-015__CLAIM-10 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S1

**Đánh giá:** S1 (CCR khai test_case, hạ xuống): TC-TIB-7628 expectedResult khẳng định 'Shape-cut group' (precondition group shape-cut ~250 layer, test data shape star/circle), nhưng fixture là group 3 layer với photo_border contour_cut — chưa có nguồn nào xác nhận photo_border contour_cut là cùng tính năng 'shape-cut' (canon KB-044 mô tả shape-cut là preset grid 1x2/1x3… trong Print Effects) → test không kiểm đúng hành vi claim. Có artifact (actualResult + ảnh) → OBSERVED_CURRENT/LOW + OQ NEEDS_CONFIRMATION (dev: photo_border contour cut có đi qua đường shape-cut source capture không; shape-cut group chưa kiểm).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-10` | TIB-5633 — Group có viền contour cut (photo_border, shape-cut) căn đúng từng layer, không lệch do canvas union mới (fixture 3 layer, ~68s) | api (design PNG) · portal (Print Effects / photo_border) | `test_case` — PASS TC-TIB-7628 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / layer-print-effects (checklist layer-print-effects); context local artwork.md → Group Mask (mask group từng làm hỏng Shape cut) | `ADD` |
| `CLAIM-10` | artwork | layer-print-effects | merchant | api · portal | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7628
- **Link:** https://staging-portal.teeinblue.com/orders/4840 · https://staging-portal.teeinblue.com/artworks?id=6067
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7628: "Fixture #6067: group 3 layer với photo_border contour_cut (không phải 250 layer). Generate ~68s (02:38:41 -> 02:39:49), đạt ngưỡng. Output 12000x6000: viền trắng cắt theo hình từng layer, 3 layer đúng vị trí, không lệch."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7628 trên Testlane
