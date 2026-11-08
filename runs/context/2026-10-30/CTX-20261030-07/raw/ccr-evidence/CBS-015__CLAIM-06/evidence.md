# CBS-015__CLAIM-06 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S3

**Đánh giá:** S3 test_case: id + PASS + ngày chạy 2026-10-29 + build staging sau mốc TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case import 11:45 +07); đối chiếu Testlane TIB-268 (read-only 2026-10-30): actualResult khớp nguyên văn CCR 5.1 và đáp ứng phần expectedResult được nạp; status không dùng làm căn cứ. CONFIRMED chỉ phủ phần định tính expectedResult khẳng định; ngưỡng thời gian 1–2 phút (từ đáp án Slack RA tóm tắt, CCR 4.2(1)) và mọi số đo giây tách S1. TC-7622 + TC-7624 expectedResult: chỉ phần layer trong vùng mask hiển thị, đúng hình dạng; không layer con lọt ra ngoài mask. Fixture mask Rectangle 60%x60% (test data/precondition đòi circle + custom shape) → CONFIRMED chỉ cho Rectangle; circle/custom shape/xuất PDF chưa kiểm → OQ OPEN_ISSUE.

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-06` | TIB-5633 — Group có mask Rectangle chứa ~250 layer: generate ~44s, chỉ phần trong mask hiển thị, 0 pixel lọt ra ngoài mask (chưa thử circle / custom shape / PDF) | api (design PNG, thời gian generate) · portal (Mask Editor) | `test_case` — PASS TC-TIB-7622, TC-TIB-7624 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; context local artwork.md → Group Mask (TIB-5403) — mask group từng làm hỏng PDF và Shape cut, cần re-check PDF | `ADD` |
| `CLAIM-06` | artwork | MỚI: group-layer-order-design-render | merchant | api · portal | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7622, TC-TIB-7624
- **Link:** https://staging-portal.teeinblue.com/orders/4841 · https://staging-portal.teeinblue.com/artworks?id=6068
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7622: "Order #1129 (portal orders/4841), item #7663: generate design ~44 giây (03:24:25 "is generating a design" -> 03:25:09 "has generated a new design", Ready 03:25:10), dưới ngưỡng 1-2 phút. Design PNG 12000x6000. Mask Rectangle 60%x60% (left 2390, top 1183, w 7203, h 3603): 0 pixel không trong suốt nằm ngoài vùng mask; nội dung chỉ nằm trong x 2493-9502, y 1262-4785 (cắt đúng mép dưới y=4785, 9.153.690 px hiển thị). Lưu ý: fixture mask là Rectangle (không phải circle như Test Data)."
  TC-TIB-7624: "Chạy với fixture mask Rectangle 60%x60% (chưa có circle/custom shape nên chỉ kiểm được hình chữ nhật; hình dạng khác chưa được kiểm). Order #1129: so với design group phẳng không mask (order #1125), phần nằm trong mask giống nhau, phần ngoài mask trong suốt hoàn toàn; 0 pixel của layer con lọt ra ngoài hộp mask (x 2390-9593, y 1183-4786), mask cắt đúng mép (maxy=4785). Generate ~44s."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7622 trên Testlane
