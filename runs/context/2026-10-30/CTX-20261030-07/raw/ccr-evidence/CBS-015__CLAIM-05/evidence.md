# CBS-015__CLAIM-05 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S0

**Đánh giá:** S0: hành vi nội bộ renderer không quan sát được — TC-TIB-7621 chỉ đo design cuối 12000x6000 (= printarea), không đọc được canvas nội bộ group, origin chỉ gián tiếp. Nguồn còn lại là comment dev 'Solution' (2026-10-28) + unit test U5: không phải dev_doc theo §3 (comment mô tả giải pháp viết tay trước merge, không sinh từ source/không phải changelog/release note/PR diff; link chỉ tới ticket, không comment id; PR thứ 2 cập nhật 2026-10-30 sau đó). CCR 4.2(5) cấm ghi chi tiết nội bộ renderer thành hành vi đúng. Phần quan sát được (output không dịch chỗ) đã nằm trong CLAIM-02. Không nạp.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-05` | TIB-5633 — Canvas của group sau render được crop về bounds nội dung, pad phải/dưới về bội số 16 và giữ nguyên origin (top/left) | api (renderer nội bộ) | `KHÔNG CÓ NGUỒN` — TC-TIB-7621 PASS nhưng chỉ đo design cuối 12000x6000 (= kích thước printarea), không đọc được canvas nội bộ group; origin chỉ kiểm gián tiếp; nguồn còn lại là comment dev (U5 unit test) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-05` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7621 · comment dev "Solution" trên TIB-5633 (bước 4, U5)
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7621: "Design output của group phẳng (#6064) và group shadow (#6066): đều 12000x6000, 12000%16=0 và 6000%16=0. Origin: nội dung giữ đúng vị trí khai báo (không dịch) theo kiểm tra trực quan; không đọc được metadata origin nội bộ của canvas group nên phần origin chỉ xác nhận gián tiếp qua ảnh cuối. Lưu ý #6066 chỉ 4 layer."
  Comment dev (2026-10-28): "At the end, crop the canvas to those bounds and pad right and bottom to a multiple of 16 (`CANVAS_SIZE_MULTIPLE`, needed by emboss). … The returned `RenderedLayer` keeps today's origin, so `BoardRenderer`, `EmbossRefRenderer` and the shape-cut source capture get the same image and position as before."
  ```
- **File đính kèm cho claim này:** không có
