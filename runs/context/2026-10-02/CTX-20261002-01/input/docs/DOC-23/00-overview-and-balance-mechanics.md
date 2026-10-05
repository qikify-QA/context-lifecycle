# Invoicing & Payments — Overview & Balance Mechanics

> ⚠️ Dễ nhầm lẫn: **"Payout" (xem [03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)) là tiền Shopify trả cho Ownego.** Thư mục này nói về **"Invoice" — tiền Ownego trả NGƯỢC LẠI cho affiliate**, hoàn toàn là 2 dòng tiền khác nhau, chỉ liên hệ gián tiếp qua `User.balance`.

## Balance của affiliate hình thành từ đâu

Mỗi khi 1 `Conversion` được tạo (từ import CSV hoặc custom conversion), `User.balance` của affiliate đó **được cộng ngay lập tức** đúng bằng `Conversion.amount` (kể cả số âm — nếu là dòng clawback/refund thì bị trừ). Ngoài ra `balance` còn có thể được cộng bonus ("premium offer" cho affiliate mới) hoặc bị trừ nếu bonus đó bị thu hồi — nên `balance` **không đơn thuần bằng tổng `Conversion.amount`**, nó là 1 con số tích luỹ độc lập, tăng/giảm qua từng sự kiện nghiệp vụ.

`balance` cũng bị **trừ ngay khi tạo Invoice** (dù invoice còn ở trạng thái `pending`, chưa thanh toán thật) và **được cộng lại nếu invoice đó bị huỷ từ trạng thái `pending`** — chi tiết đầy đủ ở [01-payout-request-journey.md](01-payout-request-journey.md).

## Hai dòng tiền, đừng nhầm

```
Shopify ──"Payout"──► Ownego            (đầu vào: tiền Shopify trả cho Ownego, xem file 03)
Ownego  ──"Invoice"──► Affiliate        (đầu ra: tiền Ownego trả hoa hồng cho affiliate, xem file này)
```

Không có mối quan hệ 1-1 giữa 1 dòng Payout và 1 Invoice — nhiều `Conversion` (từ nhiều kỳ Payout khác nhau) cộng dồn vào `balance`, rồi affiliate tự quyết định khi nào rút, rút bao nhiêu (trong giới hạn `balance` hiện có), tạo ra 1 `Invoice` duy nhất cho khoản rút đó.

## Invoice KHÔNG phải do hệ thống tự sinh định kỳ

Điểm dễ hiểu nhầm nhất: **không có cron job/service nào tự động tổng hợp và xuất Invoice theo chu kỳ** (ví dụ "cuối tháng tự động trả hết"). Thực tế **affiliate tự chủ động bấm "Request Payment"** trên dashboard khi họ muốn, miễn đủ điều kiện. Xem điều kiện cụ thể và ví dụ số liệu đầy đủ ở [01-payout-request-journey.md](01-payout-request-journey.md).
