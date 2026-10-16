# Banner, widget dashboard, Analytic, export, các màn nhỏ khác

> Các màn "còn lại" của admin panel: **Notifications** (banner trong dashboard của merchant), widget/trang thống kê, export CSV, Upload Image, hai trang version cho portal, và Activity log. Thuộc nhóm [admin panel](00-overview.md). Banner nhìn từ phía merchant được mô tả ở [banners & emails](../07-automation-growth/04-banners-and-emails.md).

## 1. Notifications (banner dashboard) `[chỉ có trên staging]`

Banner hiện ở **đầu dashboard nhúng** của merchant. Không gửi email/push. Mỗi merchant thấy **một banner tại một thời điểm**: banner đủ điều kiện **mới nhất thắng** (không có trường ưu tiên). Merchant không tắt được banner.

| Khối form | Trường và giới hạn |
|---|---|
| Content | title (48 ký tự), description (110 ký tự nhìn thấy; chỉ giữ đậm, nghiêng, gạch chân, xuống dòng — còn lại bị loại), badge label (18), URL icon app (bắt buộc), URL ảnh minh họa, nút chính (chữ + link), nút phụ (chữ + link) |
| Appearance | màu nền hoặc ảnh nền, cách fit (Cover / Contain right / Repeat tile), màu tiêu đề/mô tả/nút (hex) |
| Targeting & schedule | công tắc Active, giờ bắt đầu/kết thúc (bắt buộc), plan Mysbox (trống = tất cả), plan Shopify (Basic / Grow / Advanced / Plus / Trial; trống = tất cả), cài sau/trước ngày, ghi chú nội bộ |

Luật nhập: link phải bắt đầu `https://`; chữ nút và link đi cặp; URL ảnh không chứa dấu nháy, ngoặc, khoảng trắng. Nút **Upload** cạnh ô URL ảnh lưu PNG/JPEG/WebP/GIF ≤ 2 MB rồi điền URL. Form dùng **giờ Việt Nam** (Asia/Ho_Chi_Minh).

**Một banner hiện với shop khi cả 4 đúng:** đang Active; giờ hiện tại nằm trong cửa sổ; khớp bộ lọc plan; ngày cài (hoặc cài lại) nằm trong giới hạn. Shop có plan Shopify ngoài 5 loại trên (cancelled, frozen, development...) chỉ thấy banner **bỏ trống** bộ lọc plan Shopify. Mỗi lần lưu xóa cache nên hiệu lực gần như tức thì.

**Ví dụ.** Chi tạo banner "Black Friday: Pro giảm 20%" cho plan Free, plan Shopify để trống, chạy 01/11 00:00 đến 30/11 23:59 (giờ VN). Shop An (Free) thấy banner từ 01/11. Shop Hoa (Pro) không thấy. Ngày 10/11 một đồng nghiệp tạo thêm banner khác cho cùng nhóm: An chỉ thấy banner **mới** đó. Nếu Chi cần banner cũ hiện lại, phải tắt hoặc xóa banner mới.

## 2. Dashboard và hai widget

- **Dashboard** chỉ có thẻ tài khoản của nhân viên.
- **Analytic** (menu Analytics): widget **App Overview** với khoảng ngày tùy chọn:

| Số | Định nghĩa |
|---|---|
| Total Installs | mọi shop từng cài, kể cả đã gỡ |
| Active | shop thật (không development) có plan Shopify còn mở và có ít nhất một box |
| Free | shop đang ở plan mặc định |
| Paid | shop thật ở plan khác mặc định, subscription active và hết trial |
| Users without Box | shop đã cài nhưng chưa tạo box nào |

Nút "Metric" trên trang này trỏ tới địa chỉ trống (nút chết).

- **Dải số trên trang một Shop**: Usage Charge, Boxes Sold, Orders theo khoảng ngày ([02](02-shops-users.md)).

## 3. Export CSV danh sách Shops

Từ danh sách Shops bấm **Export** (cần quyền export). File dựng ở nền, báo qua chuông, tải qua link trong thông báo (tên "shop"). Tùy chọn: khoảng ngày (mặc định 90 ngày gần nhất). Cột: id, shop id, tên, domain, MyShopify domain, email, chủ shop, quốc gia, tên plan, trạng thái plan, số box đã publish, (tùy chọn) box đã bán trong khoảng và giá trung bình box đang active quy USD ("N/A" nếu không tính được), trạng thái cài đặt, trạng thái sử dụng, trạng thái subscription, capacity thực, hạn capacity, hết trial, tổng usage fee, các mốc ngày, ghi chú.

Báo cáo gửi email/file (platform report, store metrics, order metrics, user orders) **chỉ chạy bằng dòng lệnh** — xem [07](07-scheduled-jobs-and-ops.md). Hai nhóm báo cáo định nghĩa "shop thật" hơi khác nhau (cờ test của đơn vs cờ development của shop) nên số có thể không khớp hoàn toàn.

## 4. Upload Image

Tải ảnh lên (lưu dưới thư mục `images/` của storage mặc định) và nhận link công khai. Dùng để lưu ảnh cho banner.

## 5. Embedded Version và Customer Portal Resource

Hai ô chữ lưu "version" của gói giao diện:

- **Embedded Version**: đổi giá trị làm trình duyệt của mọi merchant tải lại file portal mới. Dùng sau khi release portal mà merchant vẫn thấy giao diện cũ. Mặc định là thời điểm tải đầu tiên. Trên staging tên file không gắn version nên trang này ít tác dụng; trên production file có dạng `mysbox.<version>.js`.
- **Customer Portal Resource**: tương tự cho portal phía khách trên storefront.

Cả hai ảnh hưởng **mọi merchant**; phối hợp với engineer, không đổi tùy tiện.

## 6. Activity log

Nhật ký thao tác nhân viên: tạo/sửa/xóa một resource **làm từ panel**, đăng nhập của nhân viên, và mỗi lần "Generate recurring payment link". **Không ghi** thao tác chạy bằng dòng lệnh hay job nền. Ngày định dạng ngày/tháng/năm, lưu vô thời hạn. Dùng khi cần biết "ai đã đổi capacity của Shop An". *chưa xác nhận: log đăng nhập hoạt động thực tế (cấu hình có bật, chưa kiểm thử).*

## Ví dụ: Chi trả lời "ai đã sửa capacity?"

An hỏi vì sao capacity tháng này là 150 thay vì 100. Chi mở **Activity**, tìm theo shop An và thấy một dòng cập nhật Shop từ đồng nghiệp Dũng hôm qua, đổi "selling capacity" 100 → 150 (quà thiện chí). Chi giải thích: số này sẽ trở về 100 ở lần reset chu kỳ kế tiếp hoặc khi đổi plan.

## Câu hỏi thường gặp

- **Banner không hiện với một merchant?** Kiểm tra lần lượt: Active, cửa sổ giờ (giờ VN), bộ lọc plan, ngày cài, và có banner mới hơn thắng không.
- **Active trên trang Analytic thấp hơn mong đợi?** Định nghĩa ở mục 2 khá hẹp (shop thật, plan Shopify mở, có box).
- **Activity log có ghi lệnh engineer chạy không?** Không.
