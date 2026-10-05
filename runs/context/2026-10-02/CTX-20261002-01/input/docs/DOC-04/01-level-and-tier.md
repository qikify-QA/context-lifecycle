# Level & Tier

> Level quyết định **affiliate được hưởng rate hoa hồng nào** — đây là bước đầu tiên trong mọi lần tính hoa hồng, xảy ra trước cả khi biết dòng payout đó là loại gì. Nguồn: `App\User::calculateLevel()`, `App\Level`.

## Business rationale — tại sao lại có hệ thống bậc (tier)?

Hệ thống thưởng affiliate giới thiệu được **nhiều shop trả phí hơn** bằng rate hoa hồng cao hơn — đây là mô hình tier phổ biến trong affiliate marketing để khuyến khích affiliate đầu tư công sức mở rộng, thay vì trả 1 rate cố định cho mọi người bất kể sản lượng. Affiliate càng giới thiệu nhiều shop trả phí thành công, càng lên bậc cao, càng nhận % hoa hồng tốt hơn cho MỌI charge tiếp theo (không chỉu riêng charge mới) — đây là đòn bẩy giữ chân affiliate hiệu quả gắn bó lâu dài.

## Tiêu chí lên bậc: đếm SỐ SHOP trả phí, không phải TỔNG DOANH THU

Công thức dùng `total_paid_customers` = **số lượng Customer (shop)** có ít nhất 1 Conversion loại `first` hoặc `recurring` — không phải tổng số tiền hoa hồng hay tổng doanh thu affiliate đã tạo ra.

> **Lưu ý về rationale**: source code không có comment giải thích lý do chọn "số shop" thay vì "tổng doanh thu" làm tiêu chí — đây là quan sát từ hành vi code, chưa xác nhận được chủ đích nghiệp vụ thật sự đằng sau lựa chọn này. Có thể suy đoán hợp lý: đếm theo số shop giúp công thức đơn giản, dễ giải thích cho affiliate ("giới thiệu đủ N shop trả phí là lên bậc"), và không phụ thuộc vào shop lớn/nhỏ (tránh 1 affiliate may mắn có 1 shop rất lớn nghiễm nhiên lên bậc cao dù chỉ giới thiệu được 1 shop). Nhưng đây **chưa được PO xác nhận** — nên hỏi lại nếu cần làm rõ trước khi thay đổi công thức này.

Điểm quan trọng: `Conversion` loại `usage` và `custom` **KHÔNG được tính** vào `total_paid_customers`. Nghĩa là:
- Một shop chỉ từng phát sinh usage-charge (chưa từng có subscription charge nào) **không** tính là "shop trả phí" cho mục đích lên bậc.
- Một custom conversion admin tự thêm tay cũng không giúp affiliate lên bậc.

## Công thức đầy đủ

```
total_paid_customers = COUNT(DISTINCT Customer)
                        WHERE Customer.user_id = affiliate
                        AND Customer có ít nhất 1 Conversion với type IN ('first', 'recurring')

NẾU affiliate.is_vip == true:
    Level = Level có level_index == affiliate.level     ← GHIM THỦ CÔNG, bỏ qua total_paid_customers hoàn toàn
NGƯỢC LẠI:
    Level = Level có min_paid_customers <= total_paid_customers
            ORDER BY min_paid_customers DESC
            LIMIT 1
    (nếu không có Level nào thoả — vd Level thấp nhất cấu hình min_paid_customers = 1
     nhưng affiliate có 0 shop trả phí — thì không tìm được Level nào, hệ thống trả về level = 0)
```

Việc tính Level diễn ra **lại từ đầu, tại thời điểm import**, cho từng dòng payout — không cache, không lưu sẵn "Level hiện tại" để tái sử dụng giữa các dòng trong cùng 1 lần import (dù cùng 1 affiliate xử lý nhiều dòng liên tiếp thì Level vẫn được tính lại mỗi dòng, nhưng vì `total_paid_customers` không đổi trong lúc xử lý 1 file, kết quả sẽ giống nhau cho tới khi có dòng mới làm phát sinh 1 Customer trả phí mới).

## Ví dụ số cụ thể

Giả sử hệ thống có cấu hình 3 Level như sau (giống ví dụ thực tế trong KB nội bộ, mục MYS-275):

| Level | `level_index` | `min_paid_customers` |
|---|---|---|
| Level 1 | 1 | 0 |
| Level 2 | 2 | 4 |
| Level 3 | 3 | 16 |

**Ví dụ 1 — affiliate mới, chưa có shop nào trả phí:**
`total_paid_customers = 0` → chỉ Level 1 thoả (`min_paid_customers = 0 <= 0`) → **chọn Level 1**.

**Ví dụ 2 — affiliate có 5 shop trả phí:**
`total_paid_customers = 5`. Xét các Level thoả `min_paid_customers <= 5`: Level 1 (0 ≤ 5 ✓), Level 2 (4 ≤ 5 ✓), Level 3 (16 ≤ 5 ✗). Trong 2 Level thoả, chọn `min_paid_customers` **cao nhất** → **chọn Level 2**.

**Ví dụ 3 — affiliate có 20 shop trả phí:** → thoả cả 3 Level → chọn Level có `min_paid_customers` cao nhất trong số thoả = Level 3 (16) → **chọn Level 3**.

**Ví dụ 4 — affiliate VIP, `is_vip = true`, `level = 2` (do admin set tay trong form User):**
Bỏ qua hoàn toàn `total_paid_customers` (dù thực tế họ chỉ có 1 shop trả phí, hay tới 50 shop) → **luôn dùng Level có `level_index = 2`**. Đây là cơ chế để Ops "ưu ái" 1 affiliate đặc biệt (đối tác chiến lược, người có deal riêng...) mà không cần họ đạt đủ tiêu chí số shop.

## User journey — admin cấu hình VIP cho 1 affiliate

1. Admin vào **User** → tìm affiliate cần set VIP → bấm sửa (Edit).
2. Bật switch `is_vip` = ON.
3. Nhập tay `level` = số `level_index` mong muốn (ví dụ `2` để ghim ở Level 2).
4. Lưu. Từ lần import payout tiếp theo, mọi dòng của affiliate này sẽ dùng `ProgramCommission` ứng với Level 2, bất kể họ thực tế có bao nhiêu shop trả phí.

⚠️ Lưu ý khi test: nếu admin bật `is_vip` nhưng **không** đặt `level` (để trống hoặc để giá trị không khớp `level_index` nào tồn tại), `Level::where('level_index', $user->level)->first()` sẽ trả về `null` → `$level_of_user` là `null` → bước tra `ProgramCommission` tiếp theo sẽ lỗi (không tìm được rate) — đây là 1 kịch bản QA nên test riêng.

## Ảnh hưởng của việc lên bậc giữa các lần import

Vì Level được tính lại tại **thời điểm xử lý từng dòng**, nếu 1 affiliate vừa đủ điều kiện lên bậc ở giữa 1 file CSV nhiều dòng (ví dụ dòng thứ 5 làm họ đạt đủ 4 shop trả phí để lên Level 2), thì:
- Các dòng payout **đã xử lý trước đó** trong cùng file này vẫn giữ rate của Level cũ (không tính lại ngược).
- Các dòng **xử lý sau** (kể cả trong cùng file, nếu nằm sau dòng làm phát sinh việc lên bậc) mới dùng rate mới.
- Vì file luôn được **sắp xếp theo `Charge Creation Time` tăng dần** trước khi import (xem [03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)), thứ tự này đảm bảo việc lên bậc diễn ra đúng trình tự thời gian thực tế của các charge, không bị xáo trộn bởi thứ tự dòng gốc trong file CSV.
