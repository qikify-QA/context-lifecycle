# Cách tính phí box vượt (usage pricing)

> File này nói về **phí cho các box bán vượt quota** trên plan Paid: hai cách tính (theo số lượng và theo giá trị box), cách quota bị trừ trong một đơn, và 3 hoá đơn ví dụ. Quota và cách đếm ở [01-plans-and-capacity.md](01-plans-and-capacity.md); việc gửi phí lên Shopify ở [03-billing-cycle-and-charges.md](03-billing-cycle-and-charges.md). Về nhóm: [00-overview.md](00-overview.md).

## Mỗi đơn tạo ra gì

Mỗi đơn đã thanh toán sinh **một dòng phí cho mỗi variant box** gồm: số box, phí phải trả (0 nếu còn trong quota), phí "nếu không có quota" (dùng để tính lại khi hạ plan, xem [04](04-upgrade-downgrade-cancel.md)), và cờ "miễn phí" (trial, plan Free). Trong một đơn có nhiều variant, quota bị trừ **lần lượt từng dòng**, nên một đơn có thể vừa có box miễn phí vừa có box bị tính phí.

Dòng miễn phí (plan Free, trial, đơn test bị loại) **không bao giờ bị tính ngược**, kể cả khi merchant nâng plan sau đó.

## Hai cách tính

Cách tính do plan quyết định, và được chép vào subscription của shop lúc đăng ký.

### Theo số lượng (count-based, kiểu cũ)

```
số box vượt = max(0, số box của dòng − quota còn lại)
phí = số box vượt × phí mỗi box của plan   (ví dụ $0.25)
```

Portal hiển thị kiểu "$0.25/box".

### Theo giá trị (value-tiered, kiểu mới)

Plan có ba tham số do admin đặt: **Box Value Threshold** (ngưỡng, USD), **Box Value Min Fee** (phí tối thiểu), **Box Value Fee Percentage** (phần trăm).

```
mỗi đơn vị box được xét riêng theo doanh thu USD SAU giảm giá của dòng đơn hàng đó:
  nếu giá trị < ngưỡng  → phí = Min Fee (phẳng)
  nếu giá trị >= ngưỡng → phí = giá trị × phần trăm / 100
quota bị trừ từ những đơn vị ĐẦU; các đơn vị bị tính phí là những đơn vị CUỐI
```

Món quà tặng (giá 0) được xét riêng: nó bị tính Min Fee, không bị "trung bình hoá" với các box giá cao.

Plan Paid mà không có ngưỡng lẫn phí mỗi box (hoặc phí = 0) là **cấu hình sai**: đơn Paid kế tiếp của shop đó sẽ lỗi khi xử lý và job retry. Plan Paid luôn phải có quy tắc phí.

## Hoá đơn ví dụ

### Hoá đơn 1 — theo số lượng (Shop Hà)

Plan "Growth": giá $29/tháng, quota 100, phí $0.25/box, đã hết trial.
- Ngày 12: đã bán 95. Khách Lan đặt một đơn: variant A × 4 và variant B × 6. Quota còn 5. Dòng A: 4 box, còn quota 1, phí 0. Dòng B: 6 box, quota còn 1 → 5 box vượt × $0.25 = **$1.25**.
- Ngày 13: khách Minh đặt 3 box = $0.75; khách Nam đặt 27 box = $6.75.
- Job nửa đêm 12→13 gửi $1.25. Job nửa đêm 13→14 gom $0.75 + $6.75 = **$7.50**, gửi 1 lần.
- Hoá đơn Shopify: $29.00 + $1.25 + $7.50 = **$37.75**.
- Thẻ "Box sales limit": `105 / 100` (dừng ở 105), "Total sold in cycle": 145.

### Hoá đơn 2 — theo giá trị (Shop Khoa)

Plan "Scale": $49/tháng, quota 200, ngưỡng $50, Min Fee $0.50, 2%.
- Bán 230 box trong chu kỳ. 30 box vượt: 20 box giá $80, 10 box giá $25.
- 20 box × ($80 × 2%) = 20 × $1.60 = $32.00. 10 box × $0.50 (dưới ngưỡng) = $5.00. Usage = **$37.00**.
- Hoá đơn: $49.00 + $37.00 = **$86.00** (nếu không vượt Capped Amount của Shopify).
- Biên: box giá đúng $50 (bằng ngưỡng) tính 2% = $1.00; box $30 tính $0.50.

### Hoá đơn 3 — đơn có quà tặng (Shop Khoa, cùng plan Scale)

Quota còn 1. Khách Oanh đặt 1 đơn gồm 3 đơn vị cùng một box: 2 đơn vị trả $120, 1 đơn vị tặng giá $0.
- Đơn vị đầu tiên dùng quota còn lại (miễn phí).
- Đơn vị $120 còn lại: $120 × 2% = **$2.40**.
- Đơn vị tặng $0: dưới ngưỡng → Min Fee **$0.50**.
- Usage của đơn = **$2.90**. (Nếu lấy trung bình $80 rồi tính 2%, phần Min Fee của món tặng sẽ bị che mất.)

## Giới hạn Shopify

Plan có trường **Capped Amount**: tổng phí usage tối đa Shopify cho phép trong 1 kỳ billing (chỉ gửi khi đã đặt, plan có "terms", và không phải plan năm). Vượt cap thì Shopify từ chối usage record, xem ca thất bại ở [03](03-billing-cycle-and-charges.md#s7). Usage record nhỏ nhất gửi đi là $0.005; dưới mức đó chỉ đánh dấu xong, không gọi Shopify.

## Câu hỏi thường gặp

- **Phí vượt tính theo đơn hay theo box?** Theo box (từng đơn vị); với count-based thì cùng một mức, với value-tiered thì mỗi đơn vị một mức.
- **Box trong thời gian trial có bị tính sau không?** Không.
- **Admin sửa phí của plan thì shop cũ có bị đổi?** Không; shop giữ bản chép lúc đăng ký.
- **Giá trong modal nâng/hạ plan có đúng không?** Modal luôn tính $0.25/box, có thể lệch với plan khác.
