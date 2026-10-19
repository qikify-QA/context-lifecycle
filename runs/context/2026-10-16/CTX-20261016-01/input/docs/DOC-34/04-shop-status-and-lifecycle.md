# Trạng thái shop và vòng đời

> Một shop có **nhiều trạng thái độc lập**; file này liệt kê từng cái, ai đổi nó, merchant và khách thấy gì, rồi đi qua các hành trình uninstall, reinstall, re-auth, frozen. Thuộc nhóm [06-merchant-app](00-overview.md). Cài đặt ban đầu xem [01](01-install-and-onboarding.md); xử lý ca cụ thể xem [10/05](../10-support-playbook/05-account-and-integrations.md).

## Bảng các trạng thái (đừng nhầm với nhau)

| Trạng thái | Giá trị | Ai đổi | Trả lời câu hỏi |
|---|---|---|---|
| Install status | INSTALLED, REINSTALLED, UNINSTALLED | Luồng cài / thông báo gỡ app | App đang được cài không? |
| Công tắc tài khoản (mục Security) | Bật (ACTIVATED) / Tắt (DEACTIVATED) | **Chỉ** nhân viên Mysbox | Shop có được dùng app không? |
| Action status | NOT_USED_YET, USED | Tự động khi tạo box đầu tiên | Shop đã từng tạo box chưa? |
| Gói Mysbox | Free, trả phí, trial, đã huỷ còn grace | Luồng billing | Bán được gì, trả gì? |
| Capacity | Trong hạn mức / vượt (chỉ Free) | Đếm đơn | Box có bị chặn không? |
| Tên gói Shopify | basic, shopify_plus, frozen, cancelled, fraudulent, dormant, paused... | Thông báo shop update của Shopify | Cửa hàng Shopify còn sống không? |
| Kết nối (token) | Khoẻ / token cũ / cần re-auth | Job token, cờ re-auth | Mysbox còn nói chuyện được với Shopify của shop? |
| Dev store | Có / không | Shopify | Cửa hàng thử, không tính phí |

## 1. Công tắc tài khoản (Bật / Tắt)

```
 Bật (mặc định)  -> mọi thứ chạy
 Tắt             -> portal thay bằng banner:
                      "Access to Mysbox is currently restricted" + nút "Contact support"
                    mọi API của portal trả 403 "Your account is not activated. Please contact support."
                    trang reveal của khách (qua app proxy) cũng bị từ chối
```
- Chỉ nhân viên bật/tắt (Shop > Edit > Security); hệ thống không bao giờ tự tắt.
- Webhook đơn vẫn tạo đơn và bốc thăm cho shop bị tắt (*webhook không đi qua lớp chặn này; hiệu ứng đầy đủ lên storefront chưa xác nhận*).
- Cùng banner này hiện cho **shop trial của Shopify thiếu tỉnh/thành** trong hồ sơ cửa hàng (plan là "trial", thiếu province hoặc city); chỉ portal bị chặn. Merchant điền địa chỉ là hết.
- Trạng thái còn được ghi sang metafield của app (`user_status`); widget storefront dùng nó thế nào *chưa xác nhận*.

## 2. Gói Mysbox và capacity

| Trạng thái | Merchant thấy | Storefront và khách |
|---|---|---|
| Free, trong hạn mức | Bộ đếm `x / 10` | Bình thường |
| **Free chạm trần** (over capacity) | "You have reached the box limit, upgrade plan to sell more."; nút "Create new box" khoá; email "capacity limit" | **Mọi box bị gỡ xuất bản**, danh sách món và nút store credit ẩn; đơn mới sau khi chạm trần không có block Unbox (đơn cũ vẫn mở được). Nâng gói không tự xuất bản lại: merchant phải bật lại từng box |
| Trial | "N - trial days left" | Chạy; không tính usage fee trong trial, box bán vẫn đếm |
| Trả phí | "Total sold in cycle", "Extra fee" | Chạy; box vượt hạn mức bị tính phí, không bị chặn |
| Đã huỷ gói trả phí (grace) | Còn tính năng trả phí đến hết kỳ đã trả | Chạy |
| Early-bird | "You're staying in the Early-bird plan." | Chạy, không hết hạn |

Chu kỳ 30 ngày tính từ ngày **cài lần đầu**, không phải ngày đăng ký gói; bộ đếm tự về 0 lười (đơn đầu tiên sau mốc mới mới ghi lại). Chi tiết ở [05/01](../05-plans-billing/01-plans-and-capacity.md).

## 3. Gỡ app (uninstall)

Khi merchant gỡ app, Shopify gửi thông báo "app uninstalled" và thu hồi mọi token. Mysbox làm:

1. Xoá mọi phiên đăng nhập của shop.
2. Đánh dấu UNINSTALLED; xoá thông tin làm mới token và cờ re-auth.
3. Huỷ subscription (nếu có): charge chuyển Cancelled, **hết hạn vào cuối kỳ 30 ngày đã trả**; gói về Free.
4. Xoá mềm shop (soft delete).

Box, đơn, usage, lịch sử **được giữ nguyên**. Trong admin nội bộ shop chỉ hiện khi bộ lọc Trashed gồm shop đã gỡ.

`[chỉ có trên staging]` Sau khi xoá, hệ thống huỷ lịch thăm dò nguồn đơn (order source) của shop để không gọi Shopify bằng token đã thu hồi; trên production lịch đó còn nguyên.

Hiệu ứng lên storefront (theme embed, block checkout có còn render không) là hành vi của Shopify, *chưa xác nhận*.


Nếu thông báo gỡ app bị mất: shop vẫn INSTALLED nhưng token chết; lần đăng nhập kế tiếp dọn token cũ, job nền thì lỗi re-auth.

## 4. Cài lại (reinstall)

```
 Cài lại cùng shop -> tìm thấy bản ghi đã xoá mềm (không tạo mới)
   -> xoá sạch dữ liệu token cũ, KHÔI PHỤC bản ghi
   -> status REINSTALLED + ghi ngày cài lại, gói reset về Free
   -> bộ đếm hạn mức KHÔNG reset (chỉ reset khi qua mốc chu kỳ)
   -> nếu đang vượt hạn mức Free: gỡ xuất bản mọi box + gửi email capacity
   -> sao lại trạng thái sang metafield
```
Merchant thấy lại box, đơn, cấu hình cũ nhưng phải **bật lại theme embed**.

**Ví dụ.** An ở gói Free, đã dùng 8/10. Ngày 5 An gỡ app, ngày 9 cài lại. Box và đơn còn nguyên, bộ đếm vẫn 8/10 (chu kỳ chưa hết), không bị gỡ box. Nếu lúc gỡ là 10/10 thì sau cài lại hệ thống gỡ xuất bản mọi box và gửi email, An phải nâng gói hoặc đợi chu kỳ mới rồi bật lại box. Với shop từng trả phí, hạn mức hiệu lực trong thời gian grace sau cài lại *chưa xác nhận*.

## 5. Re-auth (kết nối)

Token truy cập sống khoảng 1 giờ, token làm mới sống 90 ngày và job hằng ngày gia hạn khi còn dưới 10 ngày. Token kiểu cũ (không hết hạn) bị Shopify khai tử ngày 1/1/2027; job hằng tuần chuyển dần, chuyển là một chiều.

| Trạng thái | Merchant thấy | Hệ quả |
|---|---|---|
| Khoẻ | Không thấy gì | Bình thường |
| **Cần re-auth** (có ngày "Re-auth Required At") | Mở app thì bị chuyển qua màn xin quyền của Shopify; **một** email "reconnect the app" gửi đúng lúc cờ được đặt (chỉ khi shop còn cài và Shopify plan chưa đóng) | Mysbox không đọc đơn, ghi metafield, thêm quà, tính usage được cho shop này; job nền lỗi. Đây là nguyên nhân phổ biến nhất của "mọi thứ ngừng với một merchant" |

Cờ được xoá khi merchant cấp quyền lại hoặc gỡ app. Mở app cũng buộc đi qua cấp quyền nếu phiên không dùng được, token kiểu cũ hoặc token chết.

## 6. Shop bị đóng băng (frozen) và plan Shopify

Chỉ ba tên plan Shopify được coi là "đóng": **frozen, cancelled, fraudulent**. "dormant" và "paused" **không** bị coi là đóng. Với shop đóng, Mysbox chỉ loại họ khỏi báo cáo "active"; **không tự gỡ box hay chặn gì** trên storefront. Khi shop từ plan đóng mở lại mà token đã chết, cờ re-auth và email được kích hoạt. Tên plan Shopify chỉ đến qua thông báo shop update, không phải lúc cài.

Một dev store trở thành shop thật (hết là dev/Plus trial) sẽ bị tự huỷ subscription thủ công và về gói mặc định.

## Câu hỏi thường gặp

1. **Merchant báo đã gỡ app nhưng shop vẫn "Installed"?** Thông báo gỡ bị mất; xem cờ re-auth và token, bảo merchant mở lại app.
2. **Portal báo restricted nhưng công tắc đang Bật?** Portal đọc trạng thái lúc tải trang: tải lại; hoặc là shop trial thiếu địa chỉ.
3. **Shop đã gỡ app vẫn bị tính usage?** Subscription huỷ còn grace đến cuối kỳ đã trả.
4. **Cài lại xong box không bán?** Gói về Free, có thể đang vượt hạn mức nên box bị gỡ xuất bản, và theme embed phải bật lại.
