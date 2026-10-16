# Affiliate / referral tracking và sync Partner events

> Hai cơ chế "sau hậu trường" mà merchant gần như không thấy: (1) theo dõi merchant mới đến từ đối tác giới thiệu để trả hoa hồng; (2) đồng bộ sự kiện Shopify Partner sang BigQuery để báo cáo nội bộ. Nằm trong nhóm [Tự động hoá và tăng trưởng](00-overview.md). Phía hệ thống affiliate (Qikfiliate) có KB riêng; file này chỉ nói phần Mysbox.

## Phần 1 — Affiliate / referral tracking merchant mới

### Chương trình

Mysbox có chương trình đối tác: **30%** phí subscription và usage của mỗi merchant trả phí được giới thiệu. Trên Dashboard có thẻ "Mysbox affiliate program" (nhãn "Earn commission", nút "Join our program" dẫn tới trang chương trình có gắn UTM). Việc theo dõi do dịch vụ Qikfiliate làm (chương trình có slug `mysbox`).

### Journey từng bước

```
Bước 1  Merchant tiềm năng bấm link đối tác trên website (?ref=...).
        Website gọi Mysbox: "POST api/affiliate/tracking-id" kèm ref, URL nguồn, URL cài đặt.
        Mysbox xin dịch vụ affiliate một tracking id và trả về.
        Trình duyệt giữ cookie `koin_trkcd` trên domain .mysbox.io.
Bước 2  Merchant cài app và mở admin nhúng.
        Nếu có cookie → portal tải script affiliate → gọi "POST api/affiliate/customers"
        với tracking id.
Bước 3  Mysbox kiểm tra shop còn "mới":
        shop được tạo hơn 30 phút trước       → từ chối ("Instance is too old")
        shop đã có mã affiliate (affiliate_ref) → từ chối
        ngược lại → đăng ký một Customer ở dịch vụ affiliate
        (related id = id shop, tên = domain my-shopify, email)
        và lưu mã trả về vào shop (affiliate_ref).
Bước 4  Từ đó vòng đời shop được phản chiếu: subscribed / unsubscribed,
        xoá khi gỡ app, khôi phục khi cài lại.
```

Dữ liệu được theo dõi: tracking id, URL nguồn, URL cài đặt, id shop, domain, email, thay đổi gói. **Không** có dữ liệu khách mua hàng cuối. Việc tính tiền hoa hồng nằm ở nền tảng affiliate, *chưa xác nhận từ phía Mysbox*.

### Trường hợp biên

- Cài app quá 30 phút trước lần mở portal (ví dụ merchant bỏ giữa chừng): không gắn được affiliate. Hỗ trợ có thể nhập `affiliate_ref` tay ở form user trong admin panel.
- Các loại event khác (installed, trial, uninstalled, reinstalled) có trong gói thư viện nhưng Mysbox chỉ gửi subscribed / unsubscribed.
- Khi hạ từ gói test sang gói thật, job "unsubscribe" chạy cho **mọi** shop, không chỉ shop affiliate.
- Mã affiliate hiển thị ở màn xem user trong admin panel.

### Ví dụ có số

Đối tác **Hà** gửi link cho Shop An. An bấm link lúc 09:00 (cookie `koin_trkcd` được đặt), cài app lúc 09:05, mở admin lúc 09:10 → shop mới 5 phút (< 30) và chưa có mã → An được ghi nhận là khách của Hà. An đăng ký một gói giả định 49 USD/tháng → sự kiện "subscribed" đi sang dịch vụ affiliate; hoa hồng 30% của Hà (về lý thuyết 14,7 USD/tháng, do nền tảng affiliate tính, *chưa xác nhận*). Ngược lại, nếu An cài lúc 09:05 nhưng chỉ mở admin lúc 10:00 thì bị từ chối "Instance is too old" và Hà không được ghi nhận.

### Liên quan: feed review App Store

Mysbox **không** có popup xin merchant đánh giá. Chỉ có luồng nhận review từ ngoài: một hook review gọi `POST api/shopify-app/review` (không có xác thực phía trước) → Mysbox tìm shop theo tên; đúng 1 shop thì lưu số sao (1-5, hiện ở form user trong admin panel); không có hoặc nhiều shop trùng tên thì đánh dấu sync thất bại, không lưu sao → gửi tin vào kênh Slack (mới/sửa/publish/xoá) → chuyển tiếp sang dịch vụ review ngoài.

## Phần 2 — Sync Partner events sang BigQuery (chỉ báo cáo nội bộ)

Merchant không bao giờ thấy phần này. Mỗi ngày lúc **07:00 UTC**, app lấy các event của ngày UTC hôm trước từ Shopify Partner API (bằng token Partner của app Mysbox) và **nối thêm** vào bảng BigQuery (mặc định `shopify_history_events`) để doanh nghiệp vẽ biểu đồ cài đặt / gỡ / doanh thu.

| Mục | Giá trị |
|---|---|
| Loại event giữ lại (9 trên 20 của Shopify) | relationship installed, uninstalled, deactivated, reactivated; subscription charge activated, canceled, frozen, unfrozen; usage charge applied |
| 18 cột theo thứ tự | shop id, domain my-shopify, tên gói, tên shop, mã quốc gia, tên quốc gia, loại event, thời điểm xảy ra, mô tả, tên subscription, giá, tiền tệ, cờ charge test, email shop, chu kỳ thanh toán, loại giảm giá, giá trị giảm, số chu kỳ giảm |
| Nguồn gói / quốc gia / email | Lấy từ bản ghi shop của Mysbox khi tìm thấy |
| Nhịp | Trang 100 event, nghỉ 30 giây giữa các trang (nên job giới hạn 1 giờ) |
| Chạy tay | `shopify-partner-app:sync-to-google-big-query --from --to` xếp hàng từng ngày; `shopify-partner-app:backfill --from [--to]` chạy tuần tự, dừng ở ngày lỗi đầu tiên và in lệnh để chạy tiếp |
| Khoá truy cập | Token Partner và service account BigQuery nằm trong cấu hình môi trường |

**Chỉ nối thêm (append-only)**: chạy lại cùng một ngày sẽ **nhân đôi dòng**; job mỗi ngày là duy nhất và thử một lần; BigQuery không khử trùng.

### Ví dụ có số

Ngày 16/10 lúc 07:00 UTC, job lấy event của 15/10: 4 relationship installed, 2 uninstalled, 1 subscription charge activated (49 USD). Bảng thêm 7 dòng. Nhân viên chạy lại ngày 15/10 vì nghĩ job lỗi → bảng thêm 7 dòng nữa, tổng 14 dòng cho 7 event; phải xoá dòng của ngày đó trong BigQuery trước khi chạy lại.

## Câu hỏi thường gặp

- **Đối tác nói referral không được ghi nhận?** Cài và mở portal trong vòng 30 phút; cookie `koin_trkcd` phải tồn tại trên `.mysbox.io`; shop chưa có mã affiliate. Hỗ trợ nhập tay được.
- **BigQuery bị trùng ngày?** Do chạy lại; dọn ngày đó trước khi chạy lại.
- **Slack báo review "failed"?** Nhiều shop trùng tên hoặc không khớp; nhập số sao tay ở form user.
