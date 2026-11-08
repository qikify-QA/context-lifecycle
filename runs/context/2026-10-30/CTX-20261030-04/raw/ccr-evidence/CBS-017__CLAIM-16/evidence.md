# CBS-017__CLAIM-16

Trích từ Proposal CBS-017 (file CCR-2026-10-22-paragraph-multi-stroke.md, submittedAt 2026-10-30T07:58:48Z; toàn văn ở ../_ccr-full-content.md).

## Phần 1a

| `CLAIM-16` | TIB-5580 — Fill opacity < 1: bleed trong phạm vi một dòng là Known Issue (R12); vùng stroke 2 dòng chồng nhau bị đậm gấp đôi là Fail (R16) | api (PNG) · vectorize (SVG) · storefront | `KHÔNG CÓ NGUỒN` — TC-TIB-6333 và TC-TIB-6334 Blocked (không tải được SVG, SDK chưa có code); quy tắc chỉ từ đáp án Slack | artwork/text-multi-stroke; OQ-artwork-119 | `ADD` |

## Phần 1b

| `CLAIM-16` | `artwork` | `text-multi-stroke` | owner/staff + guest buyer | storefront · api | không có (S0, chưa nạp) |

## Phần 5.1

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-6333, TC-TIB-6334 (Testlane task TIB-220); RA analysis_TIB-5580.md R12, R16 (đáp án Slack Q5, Q9, thread ts 1792556100.094559); order #1095 (portal orders/4748)`
- **Link:** `https://claude.ai/artifact/5vvWKMFBHY1sQjE9ERB7vc`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-21`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `người trả lời Slack Q5/Q9 2026-10-21 chưa rõ PO hay QA (xem ⏳ ở 4.1); agent test-executor [AI] — không ai xác nhận có trích dẫn`
- **Trích nguyên văn:**
  ```
  Đáp án Slack (2026-10-21, chép trong Nhật ký chốt của RA): Q5 "đúng" (→ R12: bleed preview/SVG không block, opacity cộng dồn ở vector là Known Issue); Q9 "Đó là fail phải sửa" (→ R16: vùng stroke của 2 dòng chồng nhau bị đậm gấp đôi là Fail).
  TC-TIB-6333 (actualResult 2026-10-21): Blocked — Không lấy được SVG vectorize (nơi nghi có lỗi opacity cộng dồn, Q10), nên không kết luận được Pass/Fail cho tiêu chí chính của case. PNG order design (xem trên nền xám): fill #3d3d3d (black 50%), vành trắng mỏng bao ngoài; giữa các dòng không có vùng chồng nhau bị đậm gấp đôi (với stroke 10px khoảng cách dòng vẫn chừa trống nên vùng stroke của 2 dòng không giao nhau). Ghi nhận: vành stroke trong PNG mỏng hơn nhiều so với preview (~2,5px so với ~10px ở preview editor) — QA đánh giá lệch về bề dày, cần dev xác nhận.
  TC-TIB-6334 (actualResult 2026-10-21): Blocked — Chỉ kiểm được preview editor; preview storefront (2 lớp stroke, SDK staging chưa có code paragraph multi-stroke) và SVG vectorize không có để đối chiếu. Preview editor: thứ tự vẽ đúng — fill nằm trên các lớp stroke, 2 vành trắng (trong) → đỏ (ngoài) đúng thứ tự; bên trong chữ thấy bleed của stroke xuyên qua fill bán trong suốt (đúng mô tả Known Issue R12, không block).
  ```
- **File đính kèm cho claim này:** `không có`
