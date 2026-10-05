# Charge Type Reference

> Bảng tham chiếu đầy đủ các giá trị `Charge Type` đã quan sát thực tế từ dữ liệu Shopify, kèm ví dụ số cụ thể. Xem [00-overview-and-upload-journey.md](00-overview-and-upload-journey.md) cho luồng upload tổng quan, và [../02-commission/00-overview.md](../02-commission/00-overview.md) cho công thức tính % hoa hồng đầy đủ (file này KHÔNG lặp lại công thức, chỉ tập trung vào việc *phân loại* charge_type và ví dụ minh hoạ).

## Cách phân loại — không có enum cố định

`Charge Type` là **cụm từ mô tả người đọc được** do Shopify sinh ra, không phải mã ngắn cố định trong 1 danh sách enum. Hệ thống phân loại chỉ bằng cách kiểm tra **có chứa 1 chuỗi con nào đó hay không, không phân biệt hoa/thường** — không so khớp chính xác toàn bộ chuỗi. Đây là quyết định thiết kế có chủ đích để chịu được việc Shopify thay đổi cách đặt tên (ví dụ thêm hậu tố ngôn ngữ, đổi cách viết hoa), nhưng đổi lại **không có gì đảm bảo Shopify sẽ luôn dùng đúng những chuỗi đã quan sát được** — Shopify tự nêu rõ trong tài liệu của họ rằng cột/giá trị trong file export "có thể thay đổi bất cứ lúc nào".

## Bảng tham chiếu đầy đủ

| `Charge Type` quan sát được | Chứa substring | Nhánh xử lý | Ý nghĩa nghiệp vụ |
|---|---|---|---|
| `"App sale – 30-day subscription"` | (không chứa "usage", không chứa "one-time") | Recurring / First-month | Phí subscription định kỳ bình thường (gói tháng) |
| `"App sale – usage"` | `"usage"` | Usage-charge | Phí tính theo mức sử dụng (metered billing), charge ID có dạng `gid://shopify/AppUsageRecord/...` |
| `"App refund"` | (không chứa "usage"/"one-time") | Recurring (clawback) | Hoàn tiền toàn phần/một phần cho 1 charge trước đó |
| `"App downgrade"` | (không chứa "usage"/"one-time") | Recurring (clawback) | Credit khi merchant hạ gói, phát sinh khoản trừ |
| bất kỳ chuỗi nào chứa `"one-time"` | `"one-time"` | **Bị loại hoàn toàn** | Charge một lần — không tính hoa hồng theo quyết định nghiệp vụ hiện tại (xem ghi chú bên dưới) |

**Tại sao "one-time" bị loại hoàn toàn, không tính hoa hồng?** Đây là 1 quyết định nghiệp vụ có chủ đích (được lập trình rõ ràng, không phải sót), nhưng **lý do nghiệp vụ đằng sau không thấy ghi lại ở đâu trong code hoặc tài liệu cũ — chưa xác nhận, cần hỏi PO**. Một giả thuyết hợp lý: charge một lần thường có giá trị nhỏ/không lặp lại, chi phí vận hành tính hoa hồng cho từng dòng one-time có thể không đáng, nhưng đây chỉ là suy đoán, không phải sự thật đã xác nhận.

## Ví dụ số thực tế — Usage charge

Dữ liệu thật quan sát được (2026-08-05, từ 1 dòng payout thật của app Qikify Upsell):

```
Shop:            futuristic-lights.myshopify.com
Charge Type:     "App sale – usage"
Charge ID:       gid://shopify/AppUsageRecord/558787854423
Partner Sale:    $2.00
Shopify Fee:     $0.30
Partner Share:   $1.64
```

Kiểm tra công thức: `Partner Share = Partner Sale − Shopify Fee − Processing Fee − Regulatory Operating Fee` = `2.00 − 0.30 − 0 − 0 = $1.70` — **chênh với số thật ($1.64) khoảng $0.06**, khả năng do làm tròn hoặc 1 khoản phí phụ không hiện rõ trong ví dụ gốc. Ghi chú: công thức đã được xác nhận đúng ở các ví dụ recurring/refund khác (xem bên dưới) với sai số bằng 0 — trường hợp usage này **chưa giải thích được hoàn toàn, cần đối chiếu thêm dữ liệu thật khác nếu cần chính xác tuyệt đối**.

## Ví dụ số thực tế — Refund và Downgrade (số âm)

Không có cột/flag "is refund" riêng trong file CSV. Một khoản hoàn tiền/downgrade được Shopify biểu diễn là **1 dòng payout hoàn toàn mới**, với `Charge Type` khác dòng gốc và **toàn bộ các cột tiền bị đảo dấu âm**. `Category` vẫn giữ nguyên `"App revenue"` — không dùng được để phát hiện refund.

**Ví dụ Refund** (dữ liệu thật, Qikify tháng 7/2026):
```
Charge Type:    "App refund"
Partner Sale:   -$13.33
Shopify Fee:    -$2.01
Partner Share:  -$11.32
```
Kiểm tra công thức: `-13.33 − (-2.01) − 0 − 0 = -11.32` ✓ khớp chính xác.

**Ví dụ Downgrade** (dữ liệu thật, cùng nguồn):
```
Charge Type:    "App downgrade"
Partner Sale:   -$12.66
Shopify Fee:    -$1.90
Partner Share:  -$10.76
```
Kiểm tra công thức: `-12.66 − (-1.90) − 0 − 0 = -10.76` ✓ khớp chính xác.

### Kịch bản end-to-end: charge gốc rồi bị refund — ảnh hưởng balance affiliate thế nào

Giả sử 1 affiliate (không VIP, Level 1, rate `percentage = 15%`, `maximum_amount = $50` cho Program X) có 1 shop referred, tháng 6 phát sinh charge subscription bình thường:

1. **Kỳ tháng 6**: dòng payout `charge_type = "App sale – 30-day subscription"`, `partner_share = $100`. Đây không phải charge đầu tiên của shop (giả sử đã qua tháng đầu) → dùng `percentage` = 15%. `amount = 100 × 0.15 = $15`. Conversion được tạo với `amount = $15`, `type = "recurring"`. → `User.balance` của affiliate **cộng ngay $15** (xem [../07-invoicing-payments/00-overview-and-balance-mechanics.md](../07-invoicing-payments/00-overview-and-balance-mechanics.md) cho cơ chế balance).
2. **Kỳ tháng 7**: merchant khiếu nại, Shopify hoàn lại 1 phần charge đó — Shopify phát sinh 1 dòng payout mới, `charge_type = "App refund"`, `partner_share = -$40` (giả định con số ví dụ). Dòng này **không chứa "usage"** nên vẫn đi qua nhánh Recurring bình thường như charge dương — hệ thống tính `amount = -40 × 0.15 = -$6`, rồi áp cùng công thức cap 2 chiều: vì `amount < 0`, cap là `max(-6, -|50|) = -6` (không bị chặn vì -6 chưa vượt quá -50). Conversion mới được tạo với `amount = -$6`. → `User.balance` **bị trừ $6**.
3. Kết quả ròng 2 kỳ: affiliate nhận `15 - 6 = $9` hoa hồng thực cho charge $100 gốc bị hoàn lại $40 (tức còn thực thu $60 × 15% = $9 — khớp logic, dù được tính qua 2 dòng riêng biệt thay vì 1 dòng đã net sẵn).

**Vì sao refund không cần biết nó hoàn cho charge nào (không có charge_id liên kết)?** Dòng payout refund **không mang charge_id của charge gốc bị hoàn** — Shopify không cung cấp mối liên kết đó trong file export. Hệ thống xử lý refund như 1 dòng độc lập, áp đúng công thức/rate hiện tại của Customer đó, dựa vào giả định là số tiền `partner_share` âm tự nó đã phản ánh đúng số cần trừ, không cần biết chính xác charge gốc là dòng nào. Đây là lý do tại sao cơ chế chống trùng lặp (dedup) không dùng `charge_id` làm khoá chính cho các dòng loại này — xem [02-dedup-and-reconciliation.md](02-dedup-and-reconciliation.md).

## Trường hợp chưa có dữ liệu thật để xác nhận

**Refund của 1 usage charge** (ví dụ giả định: 1 dòng `AppUsageRecord` bị hoàn tiền) — chưa từng quan sát được literal `charge_type` thực tế cho trường hợp này. Có 2 khả năng:
- Nếu Shopify đặt tên kiểu `"App usage refund"` hoặc tương tự (chứa `"usage"`) → dòng đó sẽ đi qua nhánh **usage-charge**, nghĩa là bị tính vào cap lifetime usage-charge của affiliate (`UsageCommissionCapper`), giảm "room" còn lại của họ — đúng như mô tả refund âm giảm `already_earned` trong công thức cap.
- Nếu Shopify đặt tên generic là `"App refund"` (không chứa "usage") → dòng đó sẽ bị định tuyến NHẦM vào nhánh recurring/first-month thay vì nhánh usage — dùng sai rate (`percentage` recurring thay vì `usage_percentage`) và sai cơ chế cap (per-row thay vì lifetime).

Đây là rủi ro thiết kế thực sự, không phải giả thuyết suông — **cần được QA test ngay khi có dữ liệu thật đầu tiên chứa 1 dòng refund của usage charge**, và nên được PO xác nhận hành vi mong muốn trước.
