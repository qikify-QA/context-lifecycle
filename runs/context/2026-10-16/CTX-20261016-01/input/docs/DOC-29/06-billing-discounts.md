# Billing discount (mã giảm giá và thêm ngày trial)

> File này nói về **billing discount**: mã dùng lúc chọn plan để giảm giá subscription Shopify và/hoặc thêm ngày trial. Nó **không** đổi quota hay phí box vượt (đó là [promote code](05-promote-codes.md)). Luồng chọn plan ở [04-upgrade-downgrade-cancel.md](04-upgrade-downgrade-cancel.md). Màn admin ở [08-admin/05](../08-admin-panel/05-plans-discounts-promo-charges.md). Về nhóm: [00-overview.md](00-overview.md).

## Admin cấu hình ("Marketing tools" > "Discounts")

| Trường | Ý nghĩa |
|---|---|
| Code | Duy nhất, tự viết HOA |
| Plans | Plan (theo slug) mà mã hợp lệ. Bắt buộc có thì mã mới chạy |
| Active | Công tắc; tắt là "deactivated" ngay cả khi chưa lưu |
| Total amount | Số lượt tối đa. **-1 = không giới hạn**. Mặc định 0 = hết lượt ngay, nên luôn đặt -1 hoặc một số |
| Total used | Bộ đếm, bắt đầu 0 |
| Starts at / Ends at | Thời hạn hiệu lực của mã |
| Type | `percentage` hoặc `amount` |
| Value | Phần trăm (20 = 20%) hoặc số đô-la |
| Intervals | Số kỳ billing mà giảm giá kéo dài. 0 hoặc để trống = suốt đời subscription |
| Extra trial days | Số ngày cộng vào trial của plan |
| Applicable users | "All" hoặc "Limited" theo danh sách shop (chọn All sẽ xoá danh sách kèm cảnh báo) |

Tab trên mã: Plans, Users (shop nào đã dùng, kèm giá trị lúc đó), Applicable users.


Một plan cũng có thể mang sẵn một discount trong chính các trường của plan (Discount Type / Value / Intervals); nó được dùng khi merchant không nhập mã.

## Cách admin "gắn" mã cho shop

**Không có nút "gán cho shop".** Admin tạo mã rồi báo merchant, merchant nhập mã khi chọn plan (yêu cầu lấy đường dẫn duyệt có tham số `code`). Nút "Generate recurring payment link" của support **không** kèm discount. Muốn giới hạn cho vài shop thì đặt "Applicable users" = Limited. *chưa xác nhận: không tìm thấy ô nhập mã billing trong portal; chỉ thấy tham số `code` ở server.*

Mã affiliate: khi cờ môi trường bật (mặc định tắt) và shop đến từ affiliate, mã tên `PREFIX_<slug plan>_REF_<ref affiliate>_AFFILIATE` (hoặc ngắn hơn `PREFIX_<slug plan>_AFFILIATE`) được áp tự động nếu tồn tại và shop chưa dùng. Xem [affiliate](../07-automation-growth/05-affiliate-and-partner-sync.md).

## Kiểm tra khi dùng

```
Mỗi lỗi báo "forbidden" kèm thông điệp:
  hết lượt (Total used >= Total amount, trừ -1)
  không Active │ chưa tới Starts at │ đã quá Ends at
  shop không nằm trong Applicable users (khi Limited)
  plan đang chọn không nằm trong Plans của mã
  shop đã dùng mã này trên plan này rồi
     (dùng lại được trên một plan KHÁC)
```

Khi kích hoạt xong, `Total used` tăng 1. Mysbox lưu **giá niêm yết**; Shopify áp giảm giá ở trang duyệt.

## Tác động đến giá và trial

- `percentage` 20 trong 3 kỳ trên plan $29: Shopify tính **$23.20** x 3 kỳ rồi về $29.
- `amount` 5, Intervals 0: **$24.00** mãi mãi.
- Trial: plan 7 ngày + mã thêm 7 ngày = **14 ngày**. Ngày trial thêm cũng tuân theo quy tắc trial (đăng ký lại chỉ còn ngày chưa dùng, xem [01](01-plans-and-capacity.md)).
- Mã dựng sẵn `EXTEND-TRIAL-DEFAULT` (+7 ngày) dùng cho thao tác "extend trial" của shop đang trial; cho phép mọi shop trừ development store; phải có id = 1 (seeder không tự chạy). *chưa xác nhận: id 1 trên production có đúng mã này không.*

## Ví dụ và kịch bản

<a id="s4b"></a>
**S4 (tiếp) — Shop An dùng `LAUNCH20`.** Admin Chi tạo `LAUNCH20`: percentage, 20, Intervals 3, Total amount -1, Plans = Growth, Active. Lúc An chọn Growth ($29, trial 7), An nhập `LAUNCH20`.
- Bước 1: server kiểm tra các điều kiện trên: đều đạt.
- Bước 2: trang Shopify hiện $23.20/kỳ trong 3 kỳ, sau đó $29.
- Bước 3: An duyệt; `Total used` +1; quota của An **không đổi** (vẫn 100 + phần promote code nếu có, xem [05](05-promote-codes.md#s4)).
- Bước 4: tổng 3 hoá đơn đầu của An: 3 × $23.20 cộng usage phát sinh ([02](02-usage-pricing.md)); từ kỳ 4: $29.

**Ca lỗi.** Shop Khôi nhập `LAUNCH20` trên plan "Pro" (không có trong Plans của mã) → "forbidden". Khôi nhập lần hai trên Growth sau khi đã dùng rồi → "forbidden" (đã dùng trên plan này).

## Câu hỏi thường gặp

- **Mã chạy mà giá không đổi?** Discount do Shopify áp ở trang duyệt; kiểm tra Type/Value/Intervals. Promote code không bao giờ đổi giá.
- **"Out of discount code"?** Kiểm tra Total amount (0 = hết), Active, ngày, plan trong danh sách, và shop đã dùng chưa.
- **Dùng một mã hai lần được không?** Chỉ khi ở plan khác.
