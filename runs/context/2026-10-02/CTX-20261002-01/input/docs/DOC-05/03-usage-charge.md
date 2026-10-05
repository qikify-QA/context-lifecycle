# Usage-Charge Commission

> Áp dụng cho mọi dòng payout có `charge_type` chứa `"usage"` (không phân biệt hoa/thường) — charge tính theo mức sử dụng thực tế thay vì phí subscription cố định (ví dụ mysbox tính phí theo số đơn hàng vượt hạn mức gói). Nguồn: `App\Imports\ShopifyPayoutImport::model()` (nhánh usage), `App\Services\UsageCommissionCapper`.

## Business rationale — tại sao usage-charge cần công thức và cap KHÁC hẳn recurring?

Charge subscription phát sinh **1 dòng lớn mỗi kỳ** (mỗi tháng 1 lần), nên cap "per-row" (`maximum_amount`) là hợp lý — cap từng dòng tự nhiên giới hạn được tổng số tiền mỗi kỳ. Nhưng usage-charge trên Shopify được tính **theo overage hàng ngày, gộp thành nhiều dòng nhỏ trong cùng 1 kỳ payout** (ví dụ 1 shop có thể phát sinh 20-30 dòng usage nhỏ lẻ trong 1 tháng, thay vì 1 dòng lớn) — nếu vẫn dùng cap per-row như recurring, cap gần như vô nghĩa vì mỗi dòng nhỏ không bao giờ chạm ngưỡng, trong khi TỔNG các dòng nhỏ cộng lại có thể rất lớn. Vì vậy hệ thống cần 1 cơ chế cap khác: **cộng dồn cả đời (lifetime) theo affiliate**, đảm bảo dù có bao nhiêu dòng nhỏ, tổng hoa hồng usage-charge affiliate nhận từ 1 Program không bao giờ vượt ngưỡng đã cấu hình.

## Điều kiện tiên quyết: `handle_usage_charge`

Trước khi tính bất cứ gì, hệ thống kiểm tra `ProgramCommission.handle_usage_charge`. Nếu `false` (mặc định khi tạo mới), **toàn bộ dòng usage của tổ hợp (Program, Level) đó bị bỏ qua hoàn toàn — không tạo Conversion nào**, kể cả không tạo dòng $0. Đây là cờ bật tính năng ở cấp độ từng Program+Level, cho phép Ops chỉ bật usage-commission cho những Program thực sự có mô hình billing theo usage (không phải mọi Program đều cần).

## Công thức

```
raw_amount = partner_share × (usage_percentage / 100)
capped_amount = UsageCommissionCapper.cap(user, program, raw_amount, usage_maximum_amount)
amount = round(capped_amount, 6)
is_capped = (capped_amount < raw_amount)
percentage lưu lại = capped_amount / partner_share × 100
type = "usage"
```

Không có khái niệm "first-month" cho usage-charge — luôn dùng `usage_percentage` phẳng, không phân biệt charge đầu hay charge sau.

## Cơ chế cap — `UsageCommissionCapper::cap()`

```
NẾU raw_amount <= 0 (đây là dòng refund/hoàn usage-charge):
    → trả nguyên raw_amount, KHÔNG cap, KHÔNG trừ vào hạn mức còn lại
    (nhưng amount âm này VẪN được cộng vào lịch sử already_earned cho các lần tính sau,
     vì already_earned = SUM(amount) của MỌI Conversion type=usage — số âm tự động làm giảm tổng)

NẾU usage_maximum_amount == 0:
    → không giới hạn, trả nguyên raw_amount (Program này cố ý không đặt cap cho usage)

NGƯỢC LẠI:
    already_earned = TỔNG amount của MỌI Conversion loại "usage" đã có từ trước
                      (CÙNG affiliate + CÙNG Program, gộp cả các Customer đã bị soft-delete —
                       vì hoa hồng đã trả cho 1 shop rồi thì dù shop đó sau này gỡ app,
                       khoản đã trả vẫn tính vào tổng cả đời, không "hoàn tác" theo)
    remaining = usage_maximum_amount - already_earned
    amount = max(0, min(raw_amount, remaining))
```

## Ví dụ số cụ thể — chạy qua NHIỀU kỳ liên tiếp để thấy cap cộng dồn thế nào

Giả sử `ProgramCommission`: `usage_percentage = 10%`, `usage_maximum_amount = $200` (cap lifetime). Affiliate "Alice" giới thiệu shop "shop-x" vào Program này.

**Kỳ 1 (tháng 1):** shop-x phát sinh 3 dòng usage nhỏ trong file payout tháng 1:

| Dòng | `partner_share` | `raw_amount` (=×10%) | `already_earned` trước dòng này | `remaining` | `amount` thực nhận | `is_capped` |
|---|---|---|---|---|---|---|
| 1 | $500 | $50 | $0 | $200 | **$50** | false |
| 2 | $400 | $40 | $50 | $150 | **$40** | false |
| 3 | $700 | $70 | $90 | $110 | **$70** | false |

Sau kỳ 1: `already_earned = 50 + 40 + 70 = $160`. Còn lại `remaining = 200 - 160 = $40` cho tương lai.

**Kỳ 2 (tháng 2):** shop-x (hoặc BẤT KỲ shop nào khác của Alice dưới cùng Program này) phát sinh 2 dòng usage mới:

| Dòng | `partner_share` | `raw_amount` | `already_earned` trước dòng này | `remaining` | `amount` thực nhận | `is_capped` |
|---|---|---|---|---|---|---|
| 4 | $300 | $30 | $160 | $40 | **$30** | false (30 ≤ 40, chưa chạm cap) |
| 5 | $500 | $50 | $190 | $10 | **$10** (bị cắt từ $50 xuống $10!) | **true** |

Sau kỳ 2: `already_earned = 160 + 30 + 10 = $190`. Còn lại `remaining = 200 - 190 = $10`.

**Kỳ 3 (tháng 3):** shop-x phát sinh thêm 1 dòng usage `partner_share = $200` → `raw_amount = $20`:

```
already_earned = $190, remaining = $10
capped_amount = min(20, 10) = $10... 

nhưng thực tế: max(0, min(20, 10)) = $10
```

Chờ đã — kiểm tra lại: `remaining = 10`, `raw_amount = 20` → `min(20, 10) = 10` → **amount = $10**, `is_capped = true`. Sau dòng này `already_earned = 200` → `remaining = 0`.

**Kỳ 4 (tháng 4):** shop-x tiếp tục phát sinh usage `partner_share = $150` → `raw_amount = $15`:

```
already_earned = $200 (đã đúng bằng cap), remaining = 200 - 200 = $0
capped_amount = max(0, min(15, 0)) = $0
```

→ **amount = $0**, `is_capped = true`. Dòng này **không hiển thị** trên affiliate dashboard (bị ẩn theo scope `withoutCappedToZero()`), nhưng vẫn tồn tại trong DB dưới dạng 1 Conversion với `amount = 0`.

**Kỳ 5 (tháng 5) — có refund:** giả sử Shopify hoàn lại 1 phần của dòng 5 (kỳ 2), phát sinh dòng usage-refund `partner_share = -$100` → `raw_amount = -$10` (đã nhân `usage_percentage`):

```
raw_amount = -10 <= 0 → trả nguyên, KHÔNG cap
amount = -$10
```

Dòng này cộng vào `already_earned`: `already_earned = 200 + (-10) = $190` → `remaining` tăng trở lại thành `$10`. Từ kỳ 6, affiliate lại có thêm $10 "room" để nhận usage-commission mới cho Program này.

## Điểm QA cần nhớ khi viết test case

- Cap tính theo **(affiliate, Program)**, KHÔNG theo shop riêng lẻ — 2 shop khác nhau của cùng 1 affiliate dưới cùng 1 Program **dùng chung 1 hạn mức**.
- Cap **không reset theo tháng/kỳ payout** — phải test qua nhiều lần import liên tiếp mới thấy được hành vi cộng dồn (test 1 lần import với cap dư dả sẽ không phát hiện được bug nếu cơ chế cộng dồn bị sai).
- Soft-delete 1 Customer (shop gỡ cài app) **không** làm giảm `already_earned` — hoa hồng đã trả vẫn tính vào cap.
- Dòng bị cap về đúng **$0** vẫn tồn tại trong DB (không bị xoá/không tạo), chỉ bị ẩn khỏi affiliate dashboard; admin panel hiện KHÔNG có cách xem nhanh dòng nào bị cap (xem [08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md)).
- Thứ tự xử lý các dòng trong 1 file (theo `charge_creation_time` tăng dần, xem [03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)) ảnh hưởng trực tiếp tới dòng nào "được" tính đủ và dòng nào bị cap — nếu file bị sắp xếp sai thứ tự, kết quả cap có thể khác với kỳ vọng thực tế theo thời gian.

## User journey — admin bật usage-commission cho 1 Program

1. Vào **Program Commission** → chọn đúng dòng (Program, Level) cần bật, bấm Edit (hoặc tạo mới nếu chưa có).
2. Bật switch `handle_usage_charge` = ON — 2 field `usage_percentage` và `usage_maximum_amount` sẽ tự hiện ra (JS ẩn/hiện theo trạng thái switch) và trở thành bắt buộc nhập.
3. Nhập `usage_percentage` (ví dụ `10`) và `usage_maximum_amount` (cap lifetime, ví dụ `200` — để `0` nếu cố ý không giới hạn).
4. Lưu. Từ lần import tiếp theo, các dòng usage của tổ hợp Program+Level này sẽ được tính thay vì bị bỏ qua.

⚠️ Trên **danh sách** Program Commission, `handle_usage_charge` chỉ hiển thị dạng icon (có/không), **không** bấm sửa nhanh được như 1 số switch khác trong hệ thống — đây là chủ đích thiết kế, vì bấm nhanh trên danh sách sẽ bỏ qua validate bắt buộc của 2 field `usage_percentage`/`usage_maximum_amount`, có thể dẫn tới bật tính năng mà thiếu rate/cap cấu hình.
