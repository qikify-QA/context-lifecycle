# Dedup & Reconciliation

> Cách hệ thống khớp 1 dòng CSV với đúng `Customer`, cách chống tạo trùng khi cùng 1 file (hoặc file overlap) được upload nhiều lần, và cách đối soát dữ liệu Shopify gửi trễ qua màn hình "Populate/reconcile". Xem [00-overview-and-upload-journey.md](00-overview-and-upload-journey.md) cho luồng upload tổng quan.

## Vì sao cần cơ chế khớp dữ liệu — không có ID chung giữa 2 hệ thống

Shopify và Qikfiliate là 2 hệ thống độc lập, không chia sẻ khoá chính nào cho "1 charge". Một dòng trong file CSV Payout không tự nhiên biết nó thuộc `Customer` nào trong DB của Qikfiliate — hệ thống phải **suy luận** bằng cách khớp theo tổ hợp field có sẵn trong CSV.

## Cách khớp `Customer` cho 1 dòng payout mới

Khớp `Customer` theo **2 điều kiện cùng lúc**:
1. `Customer.name` = cột `Shop` trong CSV (domain shop, ví dụ `futuristic-lights.myshopify.com`)
2. `Customer.program_id` → `Program.slug` = cột `app_slug` trong CSV

**Tại sao cần cả 2 điều kiện, không chỉ domain shop?** Vì 1 shop có thể cài nhiều app khác nhau của Ownego cùng lúc (ví dụ vừa dùng app Upsell vừa dùng app Slide Cart) — mỗi app là 1 `Program` riêng, mỗi `Customer` record đại diện cho quan hệ "shop X dùng app Y", nên phải khớp đúng cả shop lẫn app mới ra đúng `Customer`, đúng affiliate giới thiệu, đúng rate card áp dụng.

Nếu không tìm thấy `Customer` nào khớp cả 2 điều kiện (ví dụ shop đó chưa từng được tạo qua API `customer-events`/`customers` — xem [../06-integration-api/00-overview-and-auth.md](../06-integration-api/00-overview-and-auth.md)), dòng đó bị bỏ qua hoàn toàn, không tạo Conversion, không log.

## Cơ chế chống trùng (dedup) khi re-upload

**Tình huống cần chống trùng**: Ops có thể vô tình upload lại đúng 1 file đã upload trước đó (nhầm file, hoặc file mới overlap 1 phần dữ liệu với file cũ do Shopify export theo khoảng ngày linh hoạt). Nếu không có cơ chế chống trùng, mỗi lần upload lại sẽ tạo thêm 1 Conversion mới cho cùng 1 charge thật — nhân đôi (hoặc nhiều hơn) số hoa hồng trả cho affiliate, một lỗi tài chính nghiêm trọng.

Hệ thống coi 1 dòng CSV là "đã tồn tại" (bỏ qua, không tạo Conversion mới) nếu tìm thấy 1 Conversion sẵn có của đúng `Customer` đó khớp **toàn bộ** các điều kiện sau:
- `payout_date` giống nhau
- `charge_type` giống nhau
- `charge_creation_time` giống nhau **theo NGÀY** (không so theo giờ/phút/giây — vì cột này trong DB bị cast về đầu ngày khi đọc, còn giá trị gốc trong CSV là timestamp đầy đủ)
- `partner_share` giống nhau **trong sai số 0.005** (không so bằng tuyệt đối — vì số thực (float) khi lưu vào DB không đảm bảo khớp bit-for-bit với giá trị gốc trong CSV, ví dụ `-4.31` có thể lưu thành `-4.309999...`)
- `charge_id` giống nhau — **riêng trường hợp `charge_id` rỗng** (các dòng downgrade/credit của Shopify không có Charge ID) thì được coi là `NULL` khi so sánh, không so `=` với chuỗi rỗng (vì phép so sánh `=` trong SQL không bao giờ khớp với `NULL`)

**Ví dụ minh hoạ**: Ops lỡ tay upload lại đúng file kỳ tháng 6 lần thứ 2 (toàn bộ dòng giống hệt lần 1). Với mỗi dòng, hệ thống kiểm tra 5 điều kiện trên đối với `Customer` đã khớp — tất cả đều đúng (cùng ngày, cùng loại charge, cùng số tiền trong sai số cho phép, cùng charge_id) → dòng đó bị coi là "đã có", không tạo Conversion mới. Kết quả: banner báo "0 conversions created" (hoặc số nhỏ hơn hẳn số dòng thật trong file, nếu chỉ 1 phần bị trùng) — đây là hành vi ĐÚNG, không phải lỗi.

## Màn hình "Populate/reconcile" — đối soát dữ liệu Shopify gửi trễ

**Vì sao cần màn hình riêng cho việc này?** Shopify có thể gửi dữ liệu payout **muộn hoặc chưa hoàn chỉnh** cho 1-2 kỳ gần nhất (cộng đồng Shopify từng báo cáo hiện tượng trễ/đóng băng dữ liệu ở kỳ mới nhất). Nghĩa là khi Ops upload file lần đầu cho 1 kỳ, một số dòng có thể có `partner_share` chưa chính xác (hoặc thiếu), và Shopify sẽ "chốt" lại số liệu đúng ở lần export sau. Nếu dùng lại đúng màn hình "Upload payout file" (tạo mới) cho lần export sau, cơ chế dedup ở trên sẽ **không nhận ra đây là dữ liệu cần cập nhật** — vì rất có thể `partner_share` đã đổi (vượt quá sai số 0.005 cho phép), nên hệ thống sẽ hiểu nhầm là 1 dòng mới hoàn toàn và tạo Conversion trùng.

Đây là lý do có màn hình riêng "Populate/reconcile", hoạt động khác hẳn:

### Kịch bản cụ thể: đối soát dữ liệu settle muộn cho kỳ tháng 7

1. **Đầu tháng 7**: Ops upload file Payout kỳ tháng 7 qua màn hình "Upload payout file" như bình thường (xem [00](00-overview-and-upload-journey.md)). Một số dòng có `partner_share` tạm thời (chưa settle hoàn toàn), hệ thống vẫn tạo Conversion bình thường với số liệu tạm này — affiliate đã thấy số tiền (tạm) này cộng vào balance của họ.
2. **Cuối tháng 7 / đầu tháng 8**: Shopify export lại dữ liệu đã settle chính thức cho đúng kỳ tháng 7 (file mới, `payout_period` giống hệt file cũ, nhưng `partner_share` một số dòng đã thay đổi theo số liệu chốt cuối cùng).
3. Ops vào admin panel, chọn màn hình **"Populate/reconcile"** (route riêng `admin/conversion/form-upload-populate`, KHÔNG dùng lại màn hình upload thường), chọn file settle mới này, submit.
4. Với mỗi dòng trong file mới, hệ thống **KHÔNG tạo Conversion mới** — chỉ tìm Conversion đã có khớp theo `(customer_id, payout_date, charge_creation_time, date_from, date_to)`. Nếu tìm thấy, **cập nhật lại** đúng các field: `partner_share`, `charge_creation_time`, `charge_type`, `charge_id`, và tính lại `percentage` (= `amount hiện có / partner_share mới × 100` — lưu ý: **`amount` (số tiền hoa hồng affiliate đã nhận) KHÔNG bị tính lại**, chỉ `percentage` hiển thị được cập nhật lại cho khớp với `partner_share` mới; nếu cần đúng lại số tiền hoa hồng theo `partner_share` chính xác, cần thao tác thủ công khác, **chưa xác nhận có quy trình bù trừ nào cho việc này — cần hỏi PO**).
5. Cơ chế **idempotent theo cache**: mỗi Conversion chỉ được phép cập nhật qua màn hình populate **1 lần trong 1 khoảng thời gian nhất định** (khoá cache `conversion_id:{id}`, thời hạn cấu hình ở `config('cache.conversion_time')`). Nếu Ops chạy lại đúng file populate đó lần thứ 2 trong cùng khoảng thời gian, các dòng đã cập nhật ở lần 1 sẽ **không bị cập nhật lại lần nữa** (idempotent) — tránh trường hợp chạy trùng file gây ghi đè liên tục không cần thiết.
6. Nếu 1 dòng trong file populate không khớp được Conversion nào (ví dụ do dữ liệu kỳ đó chưa từng import lần đầu), dòng đó chỉ đơn giản không có tác dụng gì — không tạo mới.

### Khác biệt hành vi lỗi — điểm QA cần đặc biệt lưu ý

| | Upload payout file (tạo mới) | Populate/reconcile (cập nhật) |
|---|---|---|
| 1 dòng bị lỗi validate (thiếu field bắt buộc) | Bỏ qua âm thầm dòng đó, **tiếp tục xử lý các dòng còn lại**, không log | **Toàn bộ import dừng lại ngay lập tức** (throw exception) — các dòng chưa xử lý tới trong file sẽ KHÔNG được cập nhật |

Đây là 1 sự bất đối xứng có thật trong hành vi — **nên được PO xác nhận có đúng ý định hay không**: 1 dòng lỗi trong file populate (ví dụ 1 dòng thiếu `charge_creation_time` do lỗi export) sẽ chặn đứng việc cập nhật toàn bộ các dòng hợp lệ khác phía sau nó trong file, kể cả khi phần lớn file đó hoàn toàn hợp lệ. Ops cần biết điều này để: (a) kiểm tra kỹ file trước khi chạy populate, (b) nếu import populate báo lỗi, hiểu rằng có thể chỉ 1 phần đầu file đã được cập nhật, phần sau chưa — cần chạy lại sau khi sửa dòng lỗi.
