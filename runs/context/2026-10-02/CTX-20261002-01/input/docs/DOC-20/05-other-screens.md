# Other Screens & Maintenance Commands

> Các màn hình còn lại — hầu hết là dữ liệu nền tảng (Level) hoặc log chỉ-xem (Tracking Information, Customer Event) — cộng với các lệnh dòng lệnh (console command) không có giao diện, nhưng ảnh hưởng trực tiếp tới dữ liệu các màn hình admin khác.

## Level — định nghĩa bậc affiliate

CRUD đơn giản, chỉ 2 field: `level_index` (số thứ tự bậc, ví dụ 1/2/3) và `min_paid_customers` (số shop trả phí tối thiểu để đạt bậc đó). Đây là bảng gốc mà hệ thống dùng để tự động tính `level` cho từng affiliate — xem công thức đầy đủ ở [../02-commission/00-overview.md](../02-commission/00-overview.md).

### Journey — Thêm 1 Level mới (ví dụ mở Level 4 cho affiliate xuất sắc, 30+ shop trả phí)

1. Vào Level → Create → `level_index = 4`, `min_paid_customers = 30`.
2. Lưu.
3. ⚠️ **Bước bắt buộc tiếp theo, dễ bị quên**: phải quay lại màn hình **Program Commission** ([02-programs-and-commissions.md](02-programs-and-commissions.md)) và tạo 1 dòng cấu hình rate cho **MỌI Program đang hoạt động** ở Level 4 mới này. Nếu bỏ sót dù chỉ 1 Program, affiliate nào lên được Level 4 mà có shop thuộc Program đó sẽ bị lỗi import ngay khi có charge mới (xem [../08-known-issues-edge-cases.md](../08-known-issues-edge-cases.md), mục B2).
4. Chạy lệnh `user-level:update` (xem bảng console command bên dưới) nếu muốn các affiliate hiện tại đã đủ điều kiện được **nâng lên Level 4 ngay lập tức**, thay vì phải chờ tới lần import CSV Payout tiếp theo mới được tính lại tự nhiên.

## Tracking Information — log click giới thiệu

**Hoàn toàn chỉ xem** (list + show), không tạo/sửa/xoá được từ admin. Hiển thị: affiliate sở hữu, `source_url` (nơi affiliate đặt link), `tracking_id`, ngày hết hạn (`expires_at`, mặc định 45 ngày kể từ lúc sinh). Dữ liệu ở đây chỉ tồn tại **trước khi** 1 shop thực sự cài app — ngay khi `Customer` được tạo thành công (`POST /api/customers`), dòng `TrackingInformation` tương ứng bị **xoá ngay** (token dùng 1 lần), nên nếu tìm 1 tracking_id đã dùng thành công, sẽ **không thấy nó ở đây nữa** — điều đó là bình thường, không phải lỗi mất dữ liệu.

## Customer Event — log vòng đời shop

**Hoàn toàn chỉ xem** (audit trail) — đây là lịch sử `installed`/`uninstalled`/`reinstalled`/`subscribed`/`upgraded`/`canceled` của từng shop, do client app (mysbox...) gửi qua API, không phải nơi admin nhập tay. Nhãn màu theo trạng thái để dễ quét mắt: installed = xanh lá, uninstalled = đỏ, reinstalled = vàng, subscribed = xanh dương...

Dùng màn hình này khi cần trả lời câu hỏi "shop X hiện đang ở trạng thái gì" nhanh hơn là vào Customer rồi mở bảng con — có thể lọc trực tiếp theo tên shop hoặc theo loại sự kiện.

## Embedded Version — ép dashboard affiliate tải bản mới

1 form rất đơn giản: 1 ô nhập chuỗi bất kỳ (thường dùng timestamp hoặc số phiên bản), bấm lưu. Mục đích: buộc trình duyệt của mọi affiliate đang mở dashboard **tải lại phiên bản mới nhất** của SPA (frontend Vue) — dùng sau khi deploy 1 bản cập nhật giao diện affiliate dashboard, để affiliate không bị kẹt ở bản cache cũ. **Không liên quan gì tới nghiệp vụ tính hoa hồng** — an toàn để bất kỳ admin nào bấm mà không sợ ảnh hưởng dữ liệu tài chính.

## Console Commands — lệnh bảo trì dữ liệu (không có giao diện admin)

Các lệnh này chạy qua dòng lệnh (CLI), không có nút bấm nào trên admin panel — nhưng thao tác trực tiếp lên cùng bảng dữ liệu mà các màn hình trên quản lý, nên PO/QA cần biết để hiểu vì sao dữ liệu đôi khi thay đổi ngoài luồng thao tác UI bình thường.

| Command | Việc làm | Khi nào cần chạy |
|---|---|---|
| `user-level:update` | Tính lại `level` cho **toàn bộ** affiliate (xử lý theo lô 100) | Sau khi thêm/sửa Level hàng loạt (xem Journey ở trên), hoặc nghi ngờ có affiliate bị lệch level do lỗi đồng bộ |
| `conversion-type:update {--customer_id=*}` | Backfill lại `type` (First/Recurring) cho các Conversion cũ, dựa vào cửa sổ 30 ngày kể từ charge đầu tiên. **Chủ động bỏ qua các dòng `usage`** để không ảnh hưởng lịch sử tính cap lifetime. Có hỏi xác nhận trước khi chạy | Khi phát hiện dữ liệu lịch sử có `type` sai (ví dụ do migrate/import lỗi trước đây), cần chạy lại cho 1 vài `customer_id` cụ thể hoặc toàn bộ |
| `charge_creation_time:fill` | Điền ngày mặc định (`2019-01-01`) cho các Conversion cũ **thiếu hẳn** cột `charge_creation_time` (dữ liệu từ trước khi cột này tồn tại trong hệ thống) | Chỉ chạy 1 lần khi phát hiện dữ liệu cũ thiếu cột — không cần chạy định kỳ |
| `tapfiliate:sync` | Import 1 lần dữ liệu lịch sử từ Tapfiliate (hệ thống affiliate cũ trước khi có Qikfiliate) | **Đã lịch sử, không còn dùng trong vận hành hiện tại** — chỉ nêu ở đây để giải thích nếu thấy dữ liệu rất cũ có nguồn gốc lạ trong hệ thống |

⚠️ Vì đây là lệnh CLI, chỉ dev/Ops có quyền truy cập server mới chạy được — không nằm trong khả năng thao tác của Ops thông thường qua trình duyệt. Nếu QA/PO cần 1 trong các thao tác này, cần nhờ dev hỗ trợ chạy trực tiếp.
