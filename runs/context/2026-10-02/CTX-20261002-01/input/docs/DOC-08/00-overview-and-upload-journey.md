# Overview & Upload Journey

> Đây là cách **tiền hoa hồng thực sự đi vào hệ thống**: không có API real-time nào từ Shopify, toàn bộ dựa vào việc admin tải file CSV Payout report của Shopify Partner Dashboard lên thủ công, định kỳ. File này mô tả luồng tổng quan và journey từng bước; xem [01-charge-type-reference.md](01-charge-type-reference.md) để biết cách từng loại charge được tính tiền, [02-dedup-and-reconciliation.md](02-dedup-and-reconciliation.md) để biết cơ chế chống trùng và đối soát dữ liệu trễ.

## Nguồn dữ liệu — bên ngoài hệ thống

Shopify Partner Dashboard cho phép export file "Payout report" (CSV/XLS) chứa mọi dòng charge (subscription, usage, one-time, refund, downgrade...) trên **các app Ownego sở hữu**, gộp chung nhiều app/brand trong 1 file — không lọc riêng theo app hay theo brand (Koin, Qikify, teeinblue... đều chung 1 file export nếu Ownego vận hành cả). Việc tải file này là thao tác **thủ công, ngoài hệ thống**, thường do bộ phận Ops/Finance thực hiện mỗi tháng (chưa xác nhận — cần hỏi PO chính xác tần suất/ai chịu trách nhiệm tải file, hiện chỉ suy ra từ tên biến `payout_period` và các mốc "37 ngày" của Shopify).

**Vì sao không dùng API Shopify để lấy dữ liệu payout tự động?** Không thấy đoạn code nào gọi Shopify Partner API để pull dữ liệu — có thể vì Shopify Partner Payout API không hỗ trợ đủ hoặc quyết định thiết kế ban đầu chọn CSV thủ công cho đơn giản. Đây là điểm **chưa xác nhận, nên hỏi PO** nếu có kế hoạch tự động hoá trong tương lai.

## Journey đầy đủ: Admin upload 1 file Payout mới

Đây là kịch bản tạo Conversion mới lần đầu cho 1 kỳ payout — dùng để QA viết test case theo đúng thứ tự thao tác thật trên UI:

1. **Chuẩn bị file** (ngoài hệ thống): Admin đăng nhập Shopify Partner Dashboard, vào mục Payouts, export file CSV/XLS của kỳ cần xử lý. Nếu file thuộc format "earnings" mới (19 cột, thiếu cột `App Slug`), admin phải tự mở file, tra bảng ánh xạ `App Title → app_slug` (bảng này nằm ngoài hệ thống — không rõ lưu ở đâu, **chưa xác nhận, cần hỏi PO/Ops** ai giữ và cập nhật bảng này khi có app mới), rồi bổ sung thêm 1 cột `app_slug` vào file trước khi upload.
2. Admin đăng nhập **admin panel** (`encore/laravel-admin`), vào menu Conversion.
3. Bấm vào màn hình **"Upload payout file"** (route `admin/conversion/form-upload`) — đây là màn hình tạo Conversion **mới**, không dùng để cập nhật dữ liệu đã có (xem [02](02-dedup-and-reconciliation.md) cho màn hình cập nhật).
4. Trên form chỉ có đúng **1 ô chọn file** (`payment_history`, bắt buộc, chấp nhận `.csv/.txt/.xls/.xlsx`). Chọn file đã chuẩn bị ở bước 1.
5. Bấm nút submit ("Create conversions").
6. **Ngay khi nhận file, trước khi xử lý bất kỳ dòng nào, hệ thống sắp xếp lại toàn bộ các dòng CSV theo cột `Charge Creation Time` tăng dần.** Nếu file không có cột này (tên cột không đúng "Charge Creation Time"), hệ thống báo lỗi ngay tại bước này — **chưa chạy import**, chưa tạo Conversion nào.
   - **Tại sao phải sort trước khi import?** Vì logic tính "tháng đầu tiên" (`isFirstMonth()`, xem [02-commission/00-overview.md](../02-commission/00-overview.md)) xác định dòng conversion đầu tiên của 1 shop bằng thứ tự **được tạo trong DB** (thứ tự import), không phải theo `charge_creation_time` thực tế trong dữ liệu. Nếu file gốc không được sắp xếp theo thời gian charge thực tế (ví dụ Shopify export không đảm bảo thứ tự, hoặc admin gộp nhiều file), một dòng charge xảy ra SAU về mặt thời gian nhưng nằm TRƯỚC trong file lại bị hệ thống hiểu nhầm là "dòng đầu tiên" — dẫn tới tính sai tỷ lệ first-month cho đúng/sai dòng. Việc sort trước khi import là bước phòng ngừa lỗi này ở tầng hệ thống, admin không cần tự sort file trước khi upload.
7. Hệ thống chạy import: xử lý từng dòng, khớp với `Customer` đã có, loại bỏ các dòng không hợp lệ, tính hoa hồng theo rate hiện tại — xem chi tiết cách khớp dữ liệu ở [02](02-dedup-and-reconciliation.md) và cách tính tiền ở [../02-commission/00-overview.md](../02-commission/00-overview.md).
8. Sau khi import xong, hệ thống hiển thị **banner kết quả** báo số Conversion đã tạo thành công. Nếu 0 dòng nào khớp được `Customer` nào, hiển thị thông báo "Not found any eligible customer from payout file".
9. **Điểm cần lưu ý cho QA/Ops**: banner này chỉ báo **số lượng tạo thành công**, không liệt kê danh sách dòng bị bỏ qua (do thiếu `app_slug`, thiếu `partner_share`, không khớp `Customer` nào, hoặc bị loại vì `charge_type` chứa "one-time"...). Muốn biết chính xác dòng nào bị bỏ, hiện tại **không có cách nào từ giao diện** — phải đối chiếu thủ công số dòng trong file gốc với số Conversion tạo ra, hoặc so sánh dữ liệu trực tiếp trong DB. Đây là khoảng trống về khả năng quan sát (observability) của hệ thống, không phải bug — nhưng là rủi ro vận hành thực tế đáng lưu ý.

## Sơ đồ luồng tổng quan

```
Shopify Partner Dashboard (ngoài hệ thống)
        │  export CSV Payout report (thủ công, không tự động)
        ▼
[Nếu format mới thiếu App Slug] Admin tự map App Title → app_slug (ngoài hệ thống)
        ▼
Admin panel → Conversion → "Upload payout file" → chọn file → submit
        ▼
Hệ thống: validate có cột Charge Creation Time → sort toàn bộ dòng theo cột này tăng dần
        ▼
Excel::import chạy ShopifyPayoutImport, xử lý TỪNG DÒNG theo đúng thứ tự đã sort:
        ├─ Khớp Customer theo (shop domain, app_slug)          → xem 02-dedup-and-reconciliation.md
        ├─ Chống trùng nếu dòng này đã tồn tại từ lần import trước
        ├─ Phân loại charge_type (one-time / usage / còn lại)  → xem 01-charge-type-reference.md
        ├─ Tính Level của affiliate + tra rate ProgramCommission
        └─ Tạo Conversion (hoặc bỏ qua nếu không hợp lệ/không khớp)
        ▼
Banner kết quả: "X conversions created" (không liệt kê dòng bị bỏ qua)
```

## Khi nào dùng "Upload payout file" vs khi nào dùng "Populate/reconcile"

Đây là điểm rất dễ nhầm giữa 2 màn hình gần giống nhau trên cùng menu Conversion — xem chi tiết đầy đủ ở [02-dedup-and-reconciliation.md](02-dedup-and-reconciliation.md):

| Tình huống | Màn hình dùng |
|---|---|
| Lần đầu xử lý dữ liệu của 1 kỳ payout mới | **Upload payout file** (tạo Conversion mới) |
| Shopify gửi lại/cập nhật dữ liệu cho 1 kỳ **đã import trước đó** (dữ liệu settle muộn) | **Populate/reconcile** (chỉ cập nhật Conversion đã có, không tạo mới) |
