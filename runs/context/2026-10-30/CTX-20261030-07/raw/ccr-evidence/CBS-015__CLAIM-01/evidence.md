# CBS-015__CLAIM-01 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7614 + TC-7616 expectedResult: generate hoàn tất trước mốc auto-stop 30 phút, không tự dừng/lỗi timeout, không kẹt 'generating'. Câu Jira description trong quote CCR (1–2 phút trước 13/10, 6–23 phút sau) là bối cảnh lịch sử, không nạp.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-01` | TIB-5633 — Artwork 2.0 có 1 group phẳng (không mask) ~250 layer ảnh nhỏ trải vùng in AOP: order design generate xong ~50s (trong ngưỡng 1–2 phút = mức trước 2026-10-13), order item về Ready, không kẹt "generating", không chạm auto-stop 30 phút | api (order design generation) · portal (order detail → Item Activity logs) | `test_case` — PASS TC-TIB-7614, TC-TIB-7616 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build CI cuối 2026-10-29 09:38 +07; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; liên quan order/review-and-initiate-fulfillment-portal (KB-019 Item Activity logs) | `ADD` |
| `CLAIM-01` | artwork | MỚI: group-layer-order-design-render | merchant (owner/staff xem order design) | api · portal | không có (liên quan order KB-019, không thay) |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7614, TC-TIB-7616 (Testlane task TIB-268)
- **Link:** https://staging-portal.teeinblue.com/orders/4837 · https://staging-portal.teeinblue.com/artworks?id=6064
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent), task do chienct (QA) quản lý
- **Trích nguyên văn:**
  ```
  TC-TIB-7614: "Order #1125 (portal orders/4837): item #7659 generate design xong trong ~50 giây (log 02:35:56 "is generating a design" -> 02:36:46 "has generated a new design" + "Ready to fulfill"), dưới ngưỡng 1-2 phút, không timeout. Design PNG 12000x6000. API: trang order đọc design qua /api/graphql 200, design URL hợp lệ."
  TC-TIB-7616: "Group 250 layer generate hoàn tất ~50s (02:35:56 -> 02:36:46), xa mốc 30 phút; order #1125 trạng thái Ready, không có trạng thái lỗi/timeout hay kẹt "Generating"."
  Jira TIB-5633 description (2026-10-28): "The same artwork rendered in 1-2 min before Oct 13, rose to 6-23 min after, and by Oct 27 exceeded the 30-minute limit." / "Reduce render time for groups containing many layers so these designs finish within the limit again, back to the pre-Oct-13 performance."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7614 trên Testlane
