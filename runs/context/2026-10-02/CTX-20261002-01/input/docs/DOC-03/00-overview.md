# Commission Calculation — Overview

> Đây là file dẫn nhập cho cả thư mục `02-commission/`. Toàn bộ logic được xác nhận trực tiếp từ `app/Imports/ShopifyPayoutImport.php::model()`, `app/Services/UsageCommissionCapper.php`, `app/Customer.php::isFirstMonth()`, `app/User.php::calculateLevel()` (đọc source ngày 2026-08-20, commit `209aa24`). Đây là phần dễ sai sót nhất của hệ thống — PO/QA nên đọc kỹ trước khi viết test case hoặc thay đổi rate card.

## Vì sao có 4 file con thay vì 1 file duy nhất

Việc tính hoa hồng cho **1 dòng payout Shopify** thực chất là 3-4 quyết định độc lập cộng lại, mỗi quyết định có bộ quy tắc và rủi ro hiểu-sai riêng — gộp chung dễ khiến người đọc bỏ sót:

1. [01-level-and-tier.md](01-level-and-tier.md) — affiliate đang ở **bậc (Level)** nào? (quyết định 1 lần cho mỗi affiliate, dùng chung cho mọi Program)
2. [02-recurring-and-first-month.md](02-recurring-and-first-month.md) — charge **subscription bình thường** (recurring/first-month) tính hoa hồng ra sao?
3. [03-usage-charge.md](03-usage-charge.md) — charge **theo mức sử dụng** (usage-based) tính khác hẳn, có cơ chế cap riêng.
4. [04-custom-conversion.md](04-custom-conversion.md) — trường hợp admin **can thiệp tay**, không qua CSV.

## Sơ đồ luồng quyết định cho 1 dòng payout

```
1 dòng CSV Payout (đã khớp được 1 Customer + Program)
        │
        ▼
Tính Level của affiliate (xem 01-level-and-tier.md)
        │
        ▼
Tra ProgramCommission theo (Program, Level)
   ├─ Không có cấu hình? → LỖI, dòng này không xử lý được
   │
        ▼
Xét charge_type (so khớp chuỗi con, không phân biệt hoa/thường):
        │
        ├── chứa "one-time"  ──────────────► BỎ QUA, không tạo Conversion
        │
        ├── chứa "usage"     ──────────────► xem 03-usage-charge.md
        │       (kể cả nếu đây là refund của 1 usage charge —
        │        vì Shopify không có cách liên kết refund
        │        với charge gốc, quy tắc match chuỗi vẫn áp dụng y hệt)
        │
        └── còn lại (subscription bình thường, refund, downgrade...)
                                            ──► xem 02-recurring-and-first-month.md
```

## Bảng so sánh nhanh: cap per-row vs cap lifetime

Đây là điểm gây nhầm lẫn nhiều nhất khi trao đổi với PO/QA — 2 loại cap trông giống nhau (đều là "giới hạn tối đa") nhưng hoạt động khác hẳn nhau:

| | Cap cho recurring/first-month | Cap cho usage-charge |
|---|---|---|
| Field cấu hình | `ProgramCommission.maximum_amount` | `ProgramCommission.usage_maximum_amount` |
| Phạm vi áp dụng | **Từng dòng conversion riêng lẻ** (per-row) | **Cộng dồn cả đời** của 1 affiliate trên 1 Program (lifetime, per-affiliate-per-program) |
| Reset khi nào | Không cần reset — mỗi dòng tính độc lập | **Không bao giờ tự reset** — chỉ giảm khi có dòng refund âm |
| Có áp cho refund/downgrade không | Có (2 chiều: dương bị min, âm bị max ngược lại) | Refund/downgrade (raw_amount ≤ 0) được cộng thẳng vào lịch sử, không bị cắt |
| Ví dụ chi tiết | [02-recurring-and-first-month.md](02-recurring-and-first-month.md) | [03-usage-charge.md](03-usage-charge.md) |

Nếu chỉ nhớ 1 điều từ toàn bộ thư mục này: **"cap của usage-charge KHÔNG reset theo tháng/kỳ payout như cap thông thường mọi người quen với subscription."** Một khi affiliate đã nhận đủ `usage_maximum_amount` từ 1 Program, mọi dòng usage tiếp theo — bất kể tháng nào, bất kể từ shop nào của họ — đều ra $0 vĩnh viễn, trừ khi có refund âm.

## Rounding (áp dụng chung cho mọi loại conversion)

Mọi `amount` cuối cùng được `round(giá_trị, 6)` trước khi lưu vào DB — **không phải làm tròn 2 chữ số tiền tệ**. Lý do: phép nhân phần trăm và các phép clamp/cap liên tiếp sinh sai số dấu phẩy động (ví dụ một khoản $85.82 có thể ra `85.82000000000005` sau vài phép tính) — làm tròn 6 chữ số là đủ để loại sai số này mà không ảnh hưởng tới độ chính xác tiền tệ thực tế. Việc hiển thị **2 chữ số thập phân** cho người dùng (admin panel, affiliate dashboard) là việc của tầng giao diện, không phải của tầng tính toán này.
