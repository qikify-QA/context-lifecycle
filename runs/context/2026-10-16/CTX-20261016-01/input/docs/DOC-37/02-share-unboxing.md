# Share unboxing (chia sẻ kết quả mở box) `[chỉ có trên staging]`

> Sau khi khách mở một box digital, nút "Share unboxing" tạo ảnh preview và một link công khai để đăng lên mạng xã hội; đơn hàng đến từ link đó được ghi nhận. Nằm trong nhóm [Tự động hoá và tăng trưởng](00-overview.md). Màn reveal xem [../03-orders-and-reveal/02-reveal-journey.md](../03-orders-and-reveal/02-reveal-journey.md).

## Ai dùng được

Khách **đã đăng nhập** vừa mở box digital. Khách guest và box physical không chia sẻ được. Giá trị cho merchant: quảng bá miễn phí và đo đơn đến từ chia sẻ.

## Bước 1 — Khách bấm "Share unboxing"

Nút xuất hiện cạnh nút resell ở màn kết quả. Nút chỉ có khi trình duyệt vừa thực hiện lượt reveal đó; mở đơn cũ từ danh sách có thể không có nút (*chưa xác nhận cho mọi trang*).

## Bước 2 — App vẽ ảnh preview

Popup "Sharing your unboxing" / "Share and tag us on social channel". Ảnh 1200 x 630 được vẽ ngay trong trình duyệt khách:
- Tiêu đề "Congratulations, {tên}! Your lucky item is revealed", tối đa 5 món (món hiếm nhất ở giữa, món giống nhau gộp kèm số lượng).
- Chú thích "{n items} pulled from the {giá box} {tên box}"; nhãn "Best pull" khi mở nhiều box cùng lúc; logo shop; watermark "Powered by"; nút "Open your own box".
- Nếu merchant ẩn chance thì ảnh không vẽ chance.

## Bước 3 — Chọn kênh

Khi ảnh sẵn sàng: "Save image" (tải `mysbox-unboxing.png`, hoặc `.jpg` nếu phải nén dưới 2 MB); ô "Message" mặc định "Here's what I got from a mystery box at {store name} 🎁 Open yours: {link}" kèm nút "Copy"; hàng "Share to" gồm Facebook, X, Whatsapp, Instagram (mỗi nút merchant có thể ẩn). Instagram mở khay chia sẻ của điện thoại; nếu máy không hỗ trợ thì lưu ảnh, copy tin nhắn và báo "Image saved. Open Instagram and upload it to share."

Nếu không tạo được link (hết hạn mức, mạng, tính năng tắt): vẫn hiện ảnh, toast "Couldn't prepare your share. Please try again." và nút "Try again".

**Một unboxing = một link.** Bấm lại hoặc mở lại popup dùng lại link cũ; ảnh và chữ preview bị đóng băng lúc tạo lần đầu.

## Link và trang chia sẻ

- Dạng `https://{shop}.myshopify.com/apps/mysbox/share/{token}` (token 22 ký tự ngẫu nhiên, nằm trên domain của shop).
- Người mở link thấy một trang rất nhỏ có sẵn thẻ preview (tiêu đề, mô tả, ảnh) để Facebook/X/WhatsApp/Slack hiện thẻ đẹp, rồi tự chuyển hướng ngay (đồng thời ghi một click).
- Tiêu đề: "Bình just won {món}!" (1 món) hoặc "Bình just won 3 prizes from {tên box}!"; không có tên thì "I". Mô tả: "Try your luck at {store name}". Chỉ dùng tên riêng.
- Đích đến: trang sản phẩm của box đã mở (khi chỉ mở đúng một loại box có trang online store), ngược lại là trang chủ shop; đích luôn phải thuộc domain của shop.
- Đích được gắn `ref=sl_{token}`, kênh `c=fb|x|wa|copy`, và `utm_source/medium/campaign` nếu link người chia sẻ có (mỗi giá trị tối đa 100 ký tự).
- Ảnh công khai, cache 1 năm; metadata EXIF bị xoá, nền trong suốt chuyển thành trắng.

## Setting của merchant

| Setting | Ở đâu | Mặc định |
|---|---|---|
| Ẩn nút Facebook / Instagram / X / Whatsapp | Style Settings → "Share unboxing" → tab "Sharing popup" | hiện hết (Copy và Save image luôn có) |
| Màu popup, màu nút "Save image" | cùng tab | theo theme |
| Màu CTA trong ảnh | tab "Sharing image" | mặc định |
| 11 đoạn chữ (nút, tiêu đề popup, "Best pull", mô tả trong ảnh, tin nhắn...) | Content & Translation → "Share unboxing settings" | tiếng Anh |
| Công tắc bật/tắt tính năng (`share_unboxing_enabled`) | **Không có màn hình**; chỉ qua cấu hình nội bộ | BẬT |
| Hạn mức ảnh/ngày (`share_image_daily_limit`) | Chỉ nội bộ, merchant không đặt được | 300/shop |

*Chưa xác nhận: khi công tắc tắt, nút ở storefront có bị ẩn không (hiện tại gọi tạo link sẽ báo "forbidden" và hiện toast lỗi).*

## Giới hạn

| Giới hạn | Giá trị |
|---|---|
| Ảnh mỗi shop | 300 trong 24 giờ trượt (không phải ngày lịch). Chỉ link tạo ảnh mới mới tốn hạn mức |
| Mỗi khách | 10 yêu cầu tạo link/phút, 60/giờ |
| Ảnh | đúng 1200 x 630, PNG hoặc JPEG, tối đa 2 MB |
| Chữ preview | tiêu đề tối đa 150, mô tả 300 ký tự |
| Sự kiện theo dõi | xem 120/phút, click 300/phút, mở popup 60/phút, hành động chia sẻ 60/phút mỗi link; vượt thì bỏ im lặng |

Gỡ app: lịch kiểm tra đơn bị xoá, dữ liệu chia sẻ vẫn giữ.

## Theo dõi click

| Sự kiện | Ghi khi | Hiển thị là |
|---|---|---|
| Popup open | Khách mở popup | "Popup opens" |
| Share action | Khách bấm Facebook/Instagram/X/Whatsapp/Save/Copy | "Share actions" theo nút |
| View | Ai đó tải trang chia sẻ (gồm cả bot mạng xã hội lấy preview) | không hiển thị trong tóm tắt |
| Click | Trang gọi beacon trước khi chuyển hướng | "Link visits" theo kênh (fb, x, wa, copy, none) |

Không lưu dữ liệu khách, IP hay order id. Nhận diện nền tảng (Facebook, X, WhatsApp, Slack...) đoán từ user-agent hoặc referrer. Trong bản staging đã kiểm, storefront không gọi endpoint popup-open/share-action nên "Popup opens" và "Share actions" có thể bằng 0; chỉ link visits và đơn đo được thật. *Đã tìm trong code, chưa chạy end-to-end.*

## Đơn đến từ link giới thiệu và độ trễ

```
Người xem mở link → chuyển về shop với ?ref=sl_<token>
Shopify ghi lượt ghé (customer journey) cùng ref
Người đó mua → đơn thanh toán lúc T
T + 20 phút   đơn "đến hạn" kiểm tra (chỉ khi shop đã có >= 1 link và đơn có box digital)
mỗi 30 phút   bộ kiểm tra đọc journey của đơn đến hạn:
   journey sẵn sàng, có ref sl_<token> → đơn được ghi cho link đó
                                         (cờ khách mới lấy từ chỉ mục đơn của Shopify)
   journey chưa sẵn sàng → thử lại lần chạy sau, tối đa 60 phút sau giờ đến hạn
                           (khoảng T + 80 phút) rồi chốt "không có nguồn"
   đơn đã mất → chốt "không có nguồn"
```
Như vậy merchant thường chờ 20-50 phút, tối đa khoảng 80-110 phút. Quy tắc là "lượt ghé cuối trước khi mua", không giới hạn ngày. Điều kiện: shop đã có link *trước* khi đơn được thanh toán; đơn test được lưu rồi ẩn khỏi kết quả; doanh thu chỉ tính khi cùng tiền tệ báo cáo (không quy đổi). Token công khai nên ai cũng có thể thêm `ref=sl_<token>` vào link mua của mình: chỉ ảnh hưởng thống kê, không liên quan tiền.

## Merchant xem kết quả ở đâu

**Chưa có màn hình** nào trong admin merchant lẫn admin panel nội bộ. Số liệu (popup opens, share actions theo nút, link visits theo kênh, số đơn, doanh thu, đơn khách mới; so sánh kỳ trước; tối đa 180 ngày) nằm sau endpoint `GET /api/share-analytics/summary`, chưa có trang portal nào gọi. Coi như "đã thu thập, giao diện đang chờ"; cần nhờ engineering truy vấn.

## Ví dụ có số

Khách **Bình** mở 3 box "Neon Box" (20 USD) cùng lúc, lưu ảnh và đăng link lên X. Tiêu đề: "Bình just won 3 prizes from Neon Box!". 40 người bấm (40 sự kiện Click kênh `x`); 2 người mua trong vòng một giờ. Sau 20 phút, bộ kiểm tra ghi cả 2 đơn: `orders = 2`, `revenue = 40 USD`, `new_customer_orders = 1` nếu một người là khách mua lần đầu. Shop An dùng 1/300 hạn mức ảnh ngày đó.

## Câu hỏi thường gặp

- **Khách không thấy nút Share?** Cần đăng nhập, vừa mở box digital trong phiên này, tính năng bật, và shop đang chạy bản staging.
- **Popup báo lỗi "Try again"?** Hết 300 ảnh/ngày, vượt 10/phút hoặc 60/giờ, tính năng tắt, ảnh bị từ chối hoặc kho ảnh lỗi. Ảnh vẫn lưu được.
- **Đơn từ link chưa được ghi?** Link tạo sau khi đơn thanh toán? đơn không có box digital? đơn test? khác tiền tệ? hoặc chưa đủ ~110 phút.
