# Custom Conversion

> Trường hợp admin tạo hoa hồng **thủ công**, không qua import CSV Payout. Nguồn: `App\Admin\Controllers\CustomConversionController`, `App\Conversion::TYPE_CUSTOM`.

## Business rationale — khi nào cần dùng?

Toàn bộ hoa hồng "bình thường" đều tự động sinh ra từ file CSV Payout của Shopify (xem [02-recurring-and-first-month.md](02-recurring-and-first-month.md), [03-usage-charge.md](03-usage-charge.md)). Nhưng có những tình huống nằm ngoài luồng đó mà Ops cần **ghi nhận/điều chỉnh hoa hồng bằng tay** — ví dụ:
- Bù đắp hoa hồng cho affiliate khi có sự cố kỹ thuật khiến 1 dòng payout hợp lệ bị bỏ sót (ví dụ do lỗi CSV thiếu `app_slug`, xem [08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md) mục A1).
- Thưởng ngoài chương trình chuẩn (ví dụ 1 khoản thưởng riêng thoả thuận ngoài hợp đồng affiliate).
- Điều chỉnh sai sót đã phát hiện sau khi 1 dòng payout tự động tính sai (thay vì sửa trực tiếp dòng Conversion cũ, tạo 1 dòng custom bù trừ để giữ lại lịch sử gốc).

Đây là **van an toàn thủ công**, không phải một phần của luồng tính hoa hồng tự động — vì vậy nó được thiết kế để **không ảnh hưởng** tới các cơ chế tự động khác (lên bậc Level, tính first-month) — xem phần "Các ràng buộc" bên dưới.

## User journey — admin tạo 1 custom conversion

1. Admin vào **User** → chọn đúng affiliate cần thêm hoa hồng → vào trang **Show** (chi tiết) của affiliate đó.
2. Bấm nút **"Add Custom Conversion"** (nằm trong panel công cụ của trang Show) — hệ thống chuyển sang form tạo custom conversion, đã khoá sẵn affiliate này (hiển thị tên affiliate ở ô chỉ-xem, không đổi được).
3. Chọn **Customer** (shop) — dropdown chỉ liệt kê các shop **thuộc chính affiliate đang chọn** (không thể chọn nhầm shop của affiliate khác), hiển thị dạng `"tên shop — tên Program"`.
4. Nhập `amount` (bắt buộc — số tiền hoa hồng, có thể âm nếu là khoản điều chỉnh giảm).
5. Chỉnh `date_from`/`date_to`/`payout_date` nếu cần (mặc định = ngày hôm nay).
6. Nhập `reason` (bắt buộc — lý do, ví dụ "Bù hoa hồng dòng payout tháng 3 bị lỗi thiếu app_slug, đã xác minh với Finance"). Nội dung này sẽ hiển thị lại ở cột "Reason" trên trang Conversion và trên dashboard affiliate — **nên viết đủ rõ để tự giải trình được sau này**, vì đây là bằng chứng duy nhất giải thích vì sao 1 khoản tiền xuất hiện ngoài luồng CSV chuẩn.
7. Lưu. Có tuỳ chọn "Save & create another" để tạo liên tiếp nhiều custom conversion cho cùng 1 affiliate mà không phải quay lại bước 1-2.
8. Sau khi lưu, hệ thống chuyển tới trang chi tiết (Show) của Conversion vừa tạo để xác nhận lại thông tin.

## Kiểm tra quyền sở hữu (ownership check) khi lưu

Dù dropdown ở bước 3 đã lọc sẵn, hệ thống vẫn **kiểm tra lại phía server** khi lưu: so khớp `Customer.user_id` với affiliate đang bị khoá trên form. Nếu không khớp (ví dụ do thao tác bất thường/chỉnh sửa request thủ công), form báo lỗi rõ ràng: *"Customer does not belong to this user."* — không cho lưu. Đây là lớp bảo vệ thứ 2 (ngoài việc dropdown đã lọc sẵn), đảm bảo không thể gán nhầm hoa hồng cho shop của affiliate khác dù bằng cách nào.

## Các ràng buộc — custom conversion KHÔNG tham gia vào các cơ chế tự động

Loại `custom` được thiết kế để **tách biệt hoàn toàn** khỏi logic tự động của hệ thống, tránh gây tác dụng phụ ngoài ý muốn:

| Cơ chế tự động | Custom conversion có tính vào không? |
|---|---|
| Đếm `total_paid_customers` để lên bậc Level (xem [01-level-and-tier.md](01-level-and-tier.md)) | **KHÔNG** — dù custom conversion có amount dương lớn, shop đó không được tính là "shop trả phí" nếu chỉ có custom conversion (phải có ít nhất 1 conversion `first`/`recurring` mới tính) |
| Xác định `isFirstMonth()` cho charge tiếp theo của cùng shop (xem [02-recurring-and-first-month.md](02-recurring-and-first-month.md)) | **KHÔNG** — scope `subscription()` dùng để tìm "dòng conversion đầu tiên"/"dòng âm đầu tiên" chỉ xét `first`/`recurring`, bỏ qua `custom` hoàn toàn. Nghĩa là nếu shop có 1 custom conversion trước, rồi mới có charge CSV thật đầu tiên, charge đó **vẫn được coi là first-month bình thường** — như thể custom conversion chưa từng tồn tại trong lịch sử. |
| Cộng vào `User.balance` | **CÓ** — giống mọi Conversion khác, custom conversion vẫn cộng/trừ trực tiếp vào balance của affiliate (qua `ConversionObserver`), ảnh hưởng tới khả năng tạo Invoice rút tiền (xem [07-invoicing-payments/](../07-invoicing-payments/00-overview-and-balance-mechanics.md)) |
| Cap lifetime của usage-charge (`UsageCommissionCapper`) | **KHÔNG liên quan** — cap đó chỉ cộng dồn các Conversion loại `usage`, không đụng tới `custom` |

## Điểm QA cần test

- Tạo 1 custom conversion cho shop A của affiliate X → xác nhận `total_paid_customers` của X **không tăng** nếu shop A trước đó chưa có conversion `first`/`recurring` nào.
- Thử tạo custom conversion nhưng chọn `customer_id` không thuộc affiliate đang mở form (giả lập bằng cách sửa request trực tiếp, bỏ qua dropdown) → phải bị chặn với lỗi ownership rõ ràng.
- Tạo custom conversion với `amount` âm → xác nhận `User.balance` bị trừ đúng, không có cơ chế nào khác cản trở (không có validate min/max nào trên `amount` ngoài "bắt buộc nhập").
- Sau khi tạo custom conversion, upload tiếp 1 file CSV có dòng payout thật đầu tiên của shop đó → xác nhận dòng CSV vẫn được tính là first-month (không bị coi là "charge thứ 2" do đã có custom conversion trước đó).
