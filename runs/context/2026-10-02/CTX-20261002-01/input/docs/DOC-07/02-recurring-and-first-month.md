# Recurring & First-Month Commission

> Áp dụng cho mọi dòng payout **không** chứa `"usage"` trong `charge_type` — tức subscription bình thường, refund, downgrade. Nguồn: `App\Imports\ShopifyPayoutImport::model()` (nhánh else) và `App\Customer::isFirstMonth()`.

## Business rationale — tại sao có rate "first-month" cao hơn rate "recurring"?

Rate `first_month_percentage` thường được cấu hình **cao hơn** `percentage` thông thường (ví dụ 30% so với 15%) — đây là khoản thưởng khuyến khích affiliate cho **hành động giới thiệu thành công 1 khách hàng mới**, việc khó nhất trong affiliate marketing, khác với việc "duy trì" một khách hàng đã có sẵn (recurring, gần như tự động, ít công sức hơn). Mô hình này phổ biến trong ngành: trả cao cho lần chuyển đổi đầu tiên (acquisition), trả thấp hơn nhưng đều đặn hơn cho các charge lặp lại sau đó (retention).

## Công thức recurring (không phải first-month)

```
rate = ProgramCommission.percentage / 100
max = charge_type chứa "yearly" ? maximum_amount × 12 : maximum_amount
amount_raw = partner_share × rate
amount = clamp(amount_raw, max)   # xem hàm clamp bên dưới
percentage lưu lại = tính ngược nếu là yearly (xem phần "percentage lưu trên Conversion"), ngược lại = rate gốc
type = "recurring"
```

### Ví dụ số cụ thể — recurring, không cap

Giả sử `ProgramCommission`: `percentage = 15%`, `maximum_amount = $50`. Dòng payout có `partner_share = $120` (charge tháng bình thường, không phải yearly).

```
amount_raw = 120 × 0.15 = 18
clamp(18, 50) → 18 nằm trong [-50, 50] → không bị cắt
amount = $18
percentage lưu lại = 15%
type = "recurring"
```

### Ví dụ số cụ thể — recurring, BỊ cap

Cùng cấu hình trên (`percentage = 15%`, `maximum_amount = $50`), nhưng `partner_share = $500` (shop lớn, charge cao bất thường):

```
amount_raw = 500 × 0.15 = 75
clamp(75, 50) → 75 > 50 → bị cắt còn 50
amount = $50
percentage lưu lại = amount / partner_share = 50 / 500 = 10%   ← KHÁC với rate gốc 15% cấu hình trong ProgramCommission!
```

Đây là lý do field `percentage` trên `Conversion` được gọi là "% hiệu lực thực tế" — khi nhìn 1 dòng Conversion có `percentage = 10%` trong khi `ProgramCommission.percentage = 15%`, đừng nghĩ đây là lỗi dữ liệu — rất có thể dòng đó đã bị cap.

### Ví dụ số cụ thể — refund/downgrade (số âm), cap 2 chiều

Cùng cấu hình (`percentage = 15%`, `maximum_amount = $50`). Shop bị downgrade, dòng payout có `partner_share = -$400` (downgrade lớn).

```
amount_raw = -400 × 0.15 = -60
clamp(-60, 50):
    new = -60 < 0 → max(-60, -50) = -50   ← clawback tối đa chỉ -$50, không âm hơn nữa
amount = -$50
```

Ý nghĩa: dù shop downgrade rất lớn khiến hoa hồng phải "trả lại" đáng lẽ tới -$60, hệ thống chỉ trừ tối đa $50 khỏi affiliate (đối xứng với cap dương $50) — tránh 1 downgrade bất thường làm balance affiliate âm quá sâu trong 1 lần.

### Hàm `clamp(new, max)` — tên thật trong code là `calculateRecurringAffiliateShare`

```
nếu max == 0:           trả nguyên new (không giới hạn — dùng khi Program này cố ý không đặt cap)
nếu new < 0:             trả về max(new, -|max|)      (chặn dưới, không cho âm quá -|max|)
nếu new >= 0:            trả về min(new, |max|)        (chặn trên, không cho vượt quá |max|)
```

### Charge yearly — vì sao cần nhân 12

Nếu `charge_type` chứa `"yearly"`, Shopify tính phí **1 lần cho cả 12 tháng** thay vì tính hàng tháng — `partner_share` của dòng này lớn gấp ~12 lần charge tháng thường. Để cap `maximum_amount` (vốn được cấu hình theo tư duy "mỗi tháng tối đa $X") vẫn hợp lý với 1 charge gộp cả năm, hệ thống nhân cap lên 12 lần cho trường hợp yearly (`max = maximum_amount × 12`) trước khi áp `clamp`.

**Riêng first-month + yearly** có công thức tách biệt phức tạp hơn (xem ví dụ bên dưới) vì tháng đầu tiên phải hưởng rate first-month, còn 11 tháng còn lại trong gói yearly đó hưởng rate recurring bình thường + cap theo tỉ lệ 11 tháng.

## Công thức first-month

```
nếu is_first_month (xem Customer::isFirstMonth() bên dưới):
    rate = ProgramCommission.first_month_percentage / 100
    nếu KHÔNG phải yearly:
        amount = partner_share × rate        ← LƯU Ý: KHÔNG áp maximum_amount cho first-month bình thường!
    nếu LÀ yearly:
        monthly = partner_share / 12
        phần_tháng_1 = monthly × rate
        phần_11_tháng_còn_lại = clamp(monthly × (percentage/100) × 11, maximum_amount × 11)
        amount = phần_tháng_1 + phần_11_tháng_còn_lại
    type = "first"
```

### Ví dụ số cụ thể — first-month, không yearly

`first_month_percentage = 30%`, `partner_share = $99` (charge đầu tiên của 1 shop mới):

```
amount = 99 × 0.30 = $29.70
```

Không có bước cap nào ở đây — dù `maximum_amount` được cấu hình là $20 chẳng hạn, dòng first-month này **vẫn ra $29.70**, không bị cắt xuống $20. Đây là điểm QA cần đặc biệt lưu ý: `maximum_amount` chỉ áp cho nhánh recurring, KHÔNG áp cho nhánh first-month (dù cùng 1 dòng `ProgramCommission`).

### Ví dụ số cụ thể — first-month + yearly

`percentage = 15%`, `first_month_percentage = 30%`, `maximum_amount = $50`, `partner_share = $1200` (gói năm, trả 1 lần cho 12 tháng, đây là charge đầu tiên của shop này).

```
monthly = 1200 / 12 = $100
phần_tháng_1 = 100 × 0.30 = $30
phần_11_tháng_còn_lại:
    raw = 100 × 0.15 × 11 = $165
    max_11_tháng = 50 × 11 = $550
    clamp(165, 550) → 165 không vượt 550 → không bị cắt → $165
amount = 30 + 165 = $195
```

## `Customer::isFirstMonth()` — phần dễ hiểu sai nhất toàn hệ thống

### Business rationale

Ưu đãi first-month chỉ nên áp dụng **đúng 1 lần** cho charge đầu tiên thật sự của 1 shop — nếu không kiểm soát chặt, một shop có thể "vô tình" nhận rate first-month nhiều lần (ví dụ nếu dữ liệu Shopify gửi trễ/không đúng thứ tự) gây thất thoát hoa hồng trả quá mức dự tính. Đồng thời, hệ thống cũng cần xử lý đúng trường hợp shop bị **refund/downgrade ngay trong tháng đầu** — khoản hoàn tiền đó về bản chất vẫn thuộc "chu kỳ tháng đầu", nên vẫn cần đối chiếu đúng logic first-month khi tính khoản clawback, tránh trừ nhầm rate.

### Quy tắc đầy đủ (diễn giải lại từ code)

```
1. Nếu Customer.skip_first_month = true      → LUÔN LUÔN false (không bao giờ first-month, admin đã tắt tay)
2. Nếu đây là Conversion subscription() ĐẦU TIÊN của shop này (chưa từng có dòng nào trước) → LUÔN LUÔN true
3. Nếu charge_creation_time của dòng đầu tiên bị rỗng (dữ liệu thiếu)  → false
4. Nếu partner_share của dòng ĐANG XÉT > 0 (charge dương)             → LUÔN LUÔN false
   (một khi customer đã có ít nhất 1 conversion trước đó, MỌI charge dương tiếp theo
    KHÔNG BAO GIỜ còn được coi là first-month nữa — bất kể có nằm trong 30 ngày hay không)
5. Nếu customer CHƯA TỪNG có dòng partner_share < 0 nào trước đây:
       → true NẾU charge_creation_time (dòng đang xét) <= charge_creation_time (dòng đầu tiên) + 30 ngày
       → false nếu vượt quá 30 ngày
6. Nếu customer ĐÃ TỪNG có dòng partner_share < 0 trước đây rồi        → false
```

Nói ngắn gọn: **first-month chỉ có thể xảy ra ở đúng 2 tình huống** — (a) dòng conversion đầu tiên tuyệt đối của shop, hoặc (b) dòng refund/downgrade ĐẦU TIÊN của shop, miễn là nó rơi trong 30 ngày kể từ charge đầu tiên. Mọi charge dương từ dòng thứ 2 trở đi — dù có rơi trong 30 ngày đầu hay không — đều KHÔNG BAO GIỜ là first-month.

### Timeline ví dụ 1 — trường hợp cơ bản: charge đầu tiên

Shop "shop-a.myshopify.com" mới cài app ngày **2026-03-01**, phát sinh charge subscription đầu tiên `partner_share = $80`, `charge_creation_time = 2026-03-01`.

→ Đây là dòng subscription đầu tiên của shop → `is_first_month = true` ngay lập tức, không cần xét mốc 30 ngày. Amount tính theo `first_month_percentage`.

### Timeline ví dụ 2 — charge dương thứ 2, rơi trong 30 ngày, VẪN KHÔNG first-month

Cùng shop trên. Do lỗi timing của Shopify, ngày **2026-03-15** (mới 14 ngày sau charge đầu) phát sinh thêm 1 dòng payout dương khác, `partner_share = $80`, `charge_creation_time = 2026-03-15`.

→ Dù mới 14 ngày (< 30 ngày), đây **KHÔNG** phải first-month vì: `first_conversion` đã tồn tại (dòng 2026-03-01) VÀ `new_partner_share = 80 > 0` → return `false` ngay ở bước 4, không cần xét tới mốc 30 ngày nữa. Dòng này tính theo `percentage` (rate recurring bình thường), có áp `maximum_amount`.

⚠️ Đây chính là điểm dễ nhầm nhất: nhiều người (kể cả PO/QA) mặc định "trong 30 ngày đầu = first-month", nhưng thực tế mốc 30 ngày **chỉ áp dụng cho nhánh refund/downgrade (số âm)**, không áp dụng cho charge dương thứ 2 trở đi.

### Timeline ví dụ 3 — refund/downgrade đầu tiên, trong mốc 30 ngày → VẪN first-month

Shop mới, charge đầu tiên `2026-03-01`, `partner_share = $80` → first-month, amount tính theo `first_month_percentage` (ví dụ 30% → $24).

Ngày **2026-03-20** (19 ngày sau, vẫn trong 30 ngày), shop bị downgrade, dòng payout có `partner_share = -$80`, `charge_creation_time = 2026-03-20`.

→ Đây là dòng có `partner_share < 0` **ĐẦU TIÊN** của shop này, VÀ `charge_creation_time (2026-03-20) <= charge_creation_time đầu tiên (2026-03-01) + 30 ngày (= 2026-03-31)` → **is_first_month = true** cho cả dòng downgrade này. Amount = `-80 × first_month_percentage = -80 × 0.30 = -$24` — khớp chính xác với khoản đã trả ở charge đầu tiên, "hoàn tác" đúng số tiền đã tính theo rate first-month, không phải rate recurring.

### Timeline ví dụ 4 — refund/downgrade, NGOÀI mốc 30 ngày → KHÔNG first-month

Giống ví dụ 3, nhưng downgrade xảy ra ngày **2026-04-05** (35 ngày sau charge đầu, vượt mốc 30 ngày `2026-03-31`).

→ `charge_creation_time (2026-04-05) > 2026-03-31` → `is_first_month = false`. Dòng downgrade này tính theo `percentage` (rate recurring) thay vì `first_month_percentage`, và **có** áp `maximum_amount` (khác ví dụ 3 — dòng first-month không cap, dòng recurring có cap).

### Timeline ví dụ 5 — refund/downgrade thứ 2 trở đi → không bao giờ first-month

Nếu sau ví dụ 3 (đã có 1 dòng downgrade âm), shop này lại phát sinh thêm 1 dòng downgrade khác (dù có nằm trong 30 ngày hay không) → luôn `false` vì bước 6 đã bắt: "customer đã từng có dòng partner_share < 0 trước đây rồi".

### Ghi chú kỹ thuật ảnh hưởng tới việc test mốc 30 ngày

`charge_creation_time` khi đọc qua Eloquent bị cast kiểu `date` — **cắt về 00:00:00 (đầu ngày)**, không giữ giờ/phút/giây thật từ CSV gốc. Vì vậy mốc "30 ngày" thực chất so sánh theo **ngày lịch**, không phải theo giờ chính xác — 1 charge lúc `2026-03-31 23:59:00` và 1 charge lúc `2026-03-01 00:00:01` vẫn được coi là cách nhau đúng 30 ngày tròn khi so sánh (vì cả 2 đều bị cắt về 00:00:00 trước khi so). QA nên test đúng ranh giới ngày, không cần test theo giờ.

`skip_first_month` (field trên `Customer`, admin bật/tắt tay trong form): khi bật, tắt hẳn toàn bộ cơ chế trên — customer luôn tính theo rate recurring từ dòng đầu tiên, dùng cho các trường hợp đặc biệt admin không muốn ưu đãi first-month (ví dụ shop được onboard qua kênh không tính là "khách mới" theo tiêu chí chương trình).

## User journey — admin cấu hình rate recurring/first-month cho 1 Program mới lên bậc

1. Admin vào **Level** → xác nhận Level cần cấu hình đã tồn tại (nếu chưa, tạo mới: nhập `level_index` + `min_paid_customers`).
2. Vào **Program Commission** → bấm "New" (Create).
3. Chọn `Program` cần cấu hình, chọn `Level` tương ứng.
4. Nhập `percentage` (rate recurring, ví dụ `15`), `first_month_percentage` (rate ưu đãi tháng đầu, ví dụ `30`), `maximum_amount` (cap per-row, ví dụ `50` — để `0` nếu không muốn giới hạn).
5. (Bỏ qua các field `usage_*` nếu Program này chưa cần commission usage-charge — xem [03-usage-charge.md](03-usage-charge.md)).
6. Lưu. Từ lần import payout tiếp theo, mọi dòng subscription của Program+Level này sẽ dùng rate vừa cấu hình.

⚠️ Nếu quên bước này cho 1 tổ hợp (Program, Level) cụ thể — ví dụ affiliate vừa lên Level 3 nhưng Program X chưa từng có cấu hình cho Level 3 — import sẽ lỗi ngay khi gặp dòng payout đó (không có rate fallback mặc định). Đây là kịch bản QA nên test mỗi khi có Level mới hoặc Program mới ra mắt.
