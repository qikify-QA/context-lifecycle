# Plans & Billing — tổng quan

> Nhóm này giải thích **merchant trả tiền cho Mysbox như thế nào**: plan Free/Paid, giới hạn số box bán được mỗi chu kỳ, phí cho phần box vượt giới hạn, chu kỳ billing, nâng/hạ/huỷ plan, và hai loại mã khuyến mãi (promote code và billing discount). Đây là tiền merchant trả cho **Mysbox** (qua Shopify Billing), không phải tiền khách mua box. Tiền khách/hoàn tiền nằm ở [04-resell-refund-credit](../04-resell-refund-credit/00-overview.md). Các màn admin tương ứng nằm ở [08-admin-panel/05](../08-admin-panel/05-plans-discounts-promo-charges.md).

## Ai dùng

- **Merchant**: vào menu "Pricing" trong app, xem thanh "Box sales limit", chọn plan, duyệt subscription trên trang của Shopify.
- **Admin/support Ownego**: tạo plan, promote code, billing discount; gửi link thanh toán; xem "Charges" để dò phí thiếu.
- **Shopify**: giữ subscription và hoá đơn; Mysbox chỉ gửi yêu cầu tạo subscription và "usage record" (dòng phí phát sinh).

## Bức tranh chung

```
Merchant cài app ──► plan Free (10 box/chu kỳ, không tính phí)
        │
        │ chạm giới hạn? ──► Free: tự gỡ publish mọi box + email cảnh báo
        ▼
Chọn plan Paid ("Choose this plan")
        │  (có thể kèm billing discount: giảm giá / thêm ngày trial)
        ▼
Trang duyệt subscription của Shopify ──► Active
        │
        ├─ Mỗi đơn đã thanh toán ──► đếm box đã dùng (quota của chu kỳ)
        │        trong quota: miễn phí │ vượt quota: có "phí box vượt"
        │        (promote code cộng thêm quota, không đổi giá)
        ▼
Job hằng đêm gom phí vượt ──► 1 "usage record" gửi Shopify
        ▼
Hoá đơn Shopify = giá plan (đã giảm) + các dòng usage
```

## Mục lục

| File | Nội dung |
|---|---|
| [01-plans-and-capacity.md](01-plans-and-capacity.md) | Plan Free/Paid, quota theo plan và chu kỳ, cái gì tính là 1 box đã dùng, chạm giới hạn, email cảnh báo, trial |
| [02-usage-pricing.md](02-usage-pricing.md) | Phí box vượt: theo số lượng vs theo giá trị (value-tiered), 3 hoá đơn ví dụ |
| [03-billing-cycle-and-charges.md](03-billing-cycle-and-charges.md) | Chu kỳ, job hằng ngày, merchant thấy gì ở Shopify Billing, trạng thái Charge, ca thất bại/frozen |
| [04-upgrade-downgrade-cancel.md](04-upgrade-downgrade-cancel.md) | Nâng/hạ/huỷ plan, trang xem trước thay đổi, huỷ rồi cài lại |
| [05-promote-codes.md](05-promote-codes.md) | Promote code (Immediate / First Upgrade), cấp thêm quota |
| [06-billing-discounts.md](06-billing-discounts.md) | Billing discount: đổi giá Shopify và số ngày trial |

## Từ vựng

| Từ | Nghĩa |
|---|---|
| Plan | Gói do admin cấu hình: giá tháng, ngày trial, quota, quy tắc phí box vượt. |
| Quota / capacity | Số box bán "miễn phí" trong 1 chu kỳ của plan. |
| Chu kỳ (cycle) | Cửa sổ 30 ngày để đếm quota rồi đặt lại. |
| Box vượt (extra box) | Box bán sau khi hết quota. Plan Paid vẫn cho bán và tính phí từng box. |
| Usage record / usage charge | Dòng phí phát sinh gửi lên Shopify, cộng vào hoá đơn kế tiếp. |
| Promote code | Mã cộng thêm quota mỗi chu kỳ. Không đổi giá. |
| Billing discount | Mã giảm giá subscription và/hoặc thêm ngày trial. Không đổi quota. |

## 8 kịch bản chạy xuyên suốt nhóm

| # | Kịch bản | Nhân vật | Chi tiết ở |
|---|---|---|---|
| S1 | Cài mới, vào plan Free | Shop An | [01](01-plans-and-capacity.md#s1) |
| S2 | Chạm giới hạn Free | Shop An | [01](01-plans-and-capacity.md#s2) |
| S3 | Nâng plan giữa chu kỳ | Shop An lên Growth | [04](04-upgrade-downgrade-cancel.md#s3) |
| S4 | Áp promote code và billing discount | Shop An (Growth) | [05](05-promote-codes.md#s4), [06](06-billing-discounts.md#s4b) |
| S5 | Hạ plan mid-cycle | Shop Cúc (Pro xuống Growth) | [04](04-upgrade-downgrade-cancel.md#s5) |
| S6 | Huỷ rồi cài lại | Shop Dũng | [04](04-upgrade-downgrade-cancel.md#s6) |
| S7 | Phí usage bị từ chối | Shop Em | [03](03-billing-cycle-and-charges.md#s7) |
| S8 | Shop bị frozen | Shop Phú | [03](03-billing-cycle-and-charges.md#s8) |

Giá, quota, trial của plan trên production là **dữ liệu trong database** do admin chỉnh. Các con số trong KB này (Growth $29 / 100 box, Pro $79 / 100 box...) là **số minh hoạ** để tính ví dụ, trừ Free (10 box) là giá trị seed. *chưa xác nhận: bảng plan thật trên production.*

## Câu hỏi thường gặp

- **Mysbox có tự đọc hoá đơn Shopify không?** Không. Mysbox chỉ tạo subscription và usage record; Shopify tự thu tiền. Xem [03](03-billing-cycle-and-charges.md).
- **Billing discount và promote code khác gì?** Discount đổi tiền/trial, promote đổi quota. Xem [06](06-billing-discounts.md) và [05](05-promote-codes.md).
