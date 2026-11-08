# CBS-015__CLAIM-15 — evidence (đóng băng từ Proposal CBS-015, 2026-10-30)

**Strength:** S0

**Đánh giá:** S0: claim 'không đổi' không có quan sát nào (không test nào chạm 30 phút hay kiểm hàng đợi). Nguồn: comment dev 'Solution' (câu hỏi mở, không phải dev_doc §3), Jira description (ticket trần), RA Q7 'OK' (tóm tắt, không tên/link) — không đủ S3/S1. Không nạp; sự tồn tại của mốc auto-stop 30 phút chỉ xuất hiện như bối cảnh trong statement CLAIM-01 (không khẳng định).

## Dòng CCR (Phần 1a / 1b)

| `CLAIM-15` | TIB-5633 — Giới hạn auto-stop 30 phút của order design và việc chia hàng đợi final-render / final-render-large giữ nguyên, không đổi theo fix | api · portal (order item status) | `KHÔNG CÓ NGUỒN` — chỉ có comment dev "Solution" + RA Q7 "OK" (tóm tắt, không có tên người / link từng câu) | order / review-and-initiate-fulfillment-portal — canon chưa có item nào về giới hạn 30 phút | `ADD` |
| `CLAIM-15` | order | review-and-initiate-fulfillment-portal | merchant | api · portal | không có |

## CCR 5.1 (nguyên văn)

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** comment dev "Solution" (Open questions) · RA Nhật ký chốt Q7
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** tinhpt (dev) — comment kỹ thuật; câu trả lời Slack Q7 "OK" (2026-10-29, không rõ tên người)
- **Trích nguyên văn:**
  ```
  Comment dev (2026-10-28): "Should the 30-minute auto-stop stay as it is? This fix does not touch the limit or the queue (`final-render` vs `final-render-large`)."
  Jira description (2026-10-28): "rendering exceeded the 30-minute limit, so the system auto-stopped it twice on Oct 27."
  RA Nhật ký chốt: "Q7 | OK | C8 — giữ 30 phút auto-stop, SDK preview ngoài phạm vi"
  ```
- **File đính kèm cho claim này:** không có
