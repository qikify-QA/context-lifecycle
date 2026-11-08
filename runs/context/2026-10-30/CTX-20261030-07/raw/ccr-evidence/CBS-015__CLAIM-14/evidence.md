# CBS-015__CLAIM-14 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S1

**Đánh giá:** S1: CCR khai KHÔNG CÓ NGUỒN; TC-TIB-7631 PASS nhưng actualResult tự ghi printarea 12000x6000 (72 Mpx) nên gần như không đi vào route-large 150 Mpx — không kiểm đúng hành vi claim (artwork route-large vẫn < 30 phút); ngưỡng cụ thể chưa có (RA Q6 'Bạn cứ test qua giúp tôi'). Có artifact → nạp phần quan sát được: OBSERVED_CURRENT/LOW + OQ NEEDS_CONFIRMATION (dev: 150 Mpx đo trên canvas artwork hay printarea; route-large chưa kiểm).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-14` | TIB-5633 — Artwork gần ngưỡng 150 Mpx (route-large, hàng đợi final-render-large) vẫn generate dưới 30 phút | api (hàng đợi final-render / final-render-large) | `KHÔNG CÓ NGUỒN` — TC-TIB-7631 PASS ~33s nhưng printarea chỉ 72 Mpx nên không chạm route-large; giới hạn cụ thể chưa có (RA Q6 còn mở) | artwork / MỚI: group-layer-order-design-render — chưa rõ, cần agent tự đánh giá | `UNKNOWN` |
| `CLAIM-14` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7631 · RA Nhật ký chốt Q6 · comment dev "Solution" (Open questions)
- **Link:** https://staging-portal.teeinblue.com/orders/4845
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7631: "Order #1133 (orders/4845), item #7667: generate ~33 giây (03:28:13 -> 03:28:46), xa mốc 30 phút, không lỗi, Ready. Design PNG 12000x6000. Lưu ý quan trọng: printarea của campaign là 12000x6000 (72 Mpx) nên case này gần như KHÔNG đi vào đường route-large 150 Mpx; chỉ canvas artwork (15000x9900 = 148,5 Mpx) sát ngưỡng, artwork được scale vào printarea."
  Comment dev (2026-10-28): "This fix does not touch the limit or the queue (`final-render` vs `final-render-large`). The artwork is under the 150 Mpx route-large threshold, so it stays on the normal tier."
  RA Q6: "Bạn cứ test qua giúp tôi"
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7631 trên Testlane
