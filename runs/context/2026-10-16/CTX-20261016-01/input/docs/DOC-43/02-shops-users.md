# Màn Shops (danh sách, chi tiết, sửa, action)

> Màn Shops là **màn trung tâm** của panel: mỗi dòng là một shop merchant đã cài Mysbox. Mọi màn khác (Boxes, Orders, Charges) thường được mở từ đây. Thuộc nhóm [admin panel](00-overview.md). Trạng thái shop (installed/uninstalled/…) giải thích ở [vòng đời shop](../06-merchant-app/04-shop-status-and-lifecycle.md).

## 1. Danh sách

Mỗi dòng = một shop, **mới cài ở trên**. Shop đã gỡ app **vẫn nằm trong danh sách** (dữ liệu được giữ) trừ khi lọc bỏ.

| Nhóm cột (bật/tắt được, mỗi nhóm cần quyền riêng) | Cột |
|---|---|
| Ids | id, shop_id (id số của Shopify) |
| Statuses | "Used" (đã có box chưa), trạng thái cài đặt |
| Domain | MyShopify domain, domain công khai, tên shop, chủ shop |
| Plan | tên plan Shopify, tên plan công khai, cờ development store, cờ Shopify Plus, plan Mysbox |
| Capacity | số box đã bán trong chu kỳ, capacity bán, capacity đã dùng |
| Khác | affiliate ref, email, địa chỉ, locale/currency/timezone, ngày tạo/cài lại/xóa |
| Review | số sao App Store (dropdown sửa ngay tại dòng) |

**Lưu ý phân trang:** thiếu quyền "paginated overview" thì chỉ thấy **10 shop đầu**, không chuyển trang.

### Filter

Chỉ filter "Trashed" dùng được với mọi quyền; các filter còn lại cần quyền `advanced_filter`.

| Filter | Lựa chọn |
|---|---|
| Trashed | chỉ shop đang cài / kèm shop đã gỡ / chỉ shop đã gỡ |
| Shopify plan name, Country | gõ chữ |
| Mysbox plan | chọn nhiều plan |
| Charge interval | Monthly / Yearly (theo subscription đang active) |
| Charge status | ACTIVE, ACCEPTED, CANCELLED, DECLINED, PENDING, FAILED |
| Application status | INSTALLED, REINSTALLED, UNINSTALLED |
| Action status | NOT_USED_YET, USED |
| Development store | có/không |
| Valid Shopify plan `[chỉ có trên staging]` | bật = ẩn shop có plan Shopify cancelled, fraudulent, frozen |
| Created / Reinstalled / Deleted at | khoảng ngày (Deleted at tự đưa shop đã gỡ vào kết quả) |
| Has box | có / không / bất kỳ |

### Row action và tác động thật

| Action (quyền) | Thực sự làm gì với shop |
|---|---|
| **View** | Mở trang chi tiết, chỉ đọc |
| **Edit** (sửa) | Mở form sửa — **mọi thay đổi là thay đổi thật**, có thể kích hoạt job nền (mục 3) |
| **Generate recurring payment link** (tạo payment link) | Chọn một plan định kỳ; app nhờ Shopify tạo subscription và hiện **link xác nhận** trong thông báo nằm lại trên màn hình. **Chưa tính tiền** cho tới khi merchant mở link và đồng ý trên Shopify. Bị từ chối "Plan is not supported" nếu loại plan không hợp shop (Plus/không Plus, Shopify-paid/không), trừ development store. Ghi vào Activity log. Dùng khi sales hỗ trợ nâng plan hoặc gửi plan giảm giá không có trên trang Pricing |
| **Sync capacity to metafield** (cập nhật capacity) | Gửi lại plan + trạng thái "hết capacity / hết hạn" lên Shopify (2 job nền). **Không đổi số nào trong Mysbox.** An toàn khi lặp |

Nút đầu trang: **Export** — xuất CSV nền, xem [06](06-banners-and-other-screens.md).

## 2. Trang chi tiết

Đầu trang có dải số theo khoảng ngày (mặc định hôm nay): **Usage Charge** (phí theo box phát sinh), **Boxes Sold**, **Orders** (đơn thật, không tính đơn test). Bên dưới là các section chỉ đọc giống form sửa, gồm cả **Tokens** (access token, hạn, refresh token, hạn, **Re-auth Required At**). Cuối trang có 3 tab: **Boxes**, **Orders**, **Charges**.

Nút đầu trang:

| Nút (quyền) | Làm gì |
|---|---|
| Edit | Sang form sửa |
| **Refresh access token** (chỉ hiện khi shop dùng token có hạn) | Chạy ngay, xin Shopify cặp token mới. Refresh token **dùng một lần**: bấm nhiều lần/đua với job nền thì một bên lỗi (vô hại) nhưng không nên bấm lặp. Nếu Shopify từ chối, merchant phải mở lại app để cấp quyền lại |
| **Retry Handle Order** | Hỏi id đơn Shopify (số hoặc `gid://shopify/Order/...`). App đọc đơn từ Shopify, đơn phải **Paid**, rồi chạy lại đúng xử lý như khi nhận thông báo "order paid": tạo đơn, opening request, chọn quà. **Lặp lại an toàn**: box đã tạo không bị tạo lại, chỉ thêm phần số lượng còn thiếu. Lỗi hiển thị: không thấy đơn; đơn chưa paid. Chỉ biến thể box **đã publish** được tính; đơn không chứa box đã publish thì không tạo gì (im lặng) |

## 3. Form Edit: từng section làm gì

| Section | Hiệu lực |
|---|---|
| Shop Ids, Domain, Email | khóa, không sửa được |
| Affiliate | liên kết shop với chương trình affiliate |
| Review | chỉ là số sao hiện trong danh sách |
| **Security** (Status, Note) | **Status tắt = công tắc khẩn**: app nhúng trả "access denied" cho mọi thao tác, portal hiện "App is not available yet…"; trạng thái cũng được ghi lên metafield. **Không phải** trạng thái cài đặt. Chỉ dùng khi lạm dụng/gian lận hoặc merchant xin tạm dừng. Note là ghi chú nội bộ |
| **Plan** | tên plan Shopify/công khai, development store, Plus, "Exclude test order" (đơn test không tính phí), plan id (khóa). **Cẩn thận:** tắt "development store" (hoặc đổi tên plan khỏi "Plus Trial") nghĩa là shop thành cửa hàng thật; app sẽ **hủy subscription thủ công** và đưa về plan mặc định. Đổi plan phải dùng payment link |
| **Capacities** | boxes sold in cycle (khóa), selling capacity và capacity used (sửa được). **Cẩn thận:** nâng "capacity used" bằng/vượt "selling capacity" trên **plan Free** sẽ **unpublish tất cả box** và gửi email "capacity reached"; hạ lại không tự publish lại. Nâng selling capacity = tặng capacity thiện chí, bị ghi đè ở lần reset chu kỳ hoặc đổi plan |
| Address, Internationalization | dữ liệu sao từ Shopify, thông báo `shop/update` ghi đè |
| System Administration | cờ "Setup required" nội bộ |
| **Customizations** | JSON settings + CSS/JS tùy biến cho widget storefront, customer portal, merchant portal. **Công khai và có hiệu lực ngay**; JS lỗi cú pháp có thể làm hỏng widget. Không dán code chưa test |

Lưu bất kỳ trường nào cũng đồng bộ shop sang công cụ email/CRM.

## 4. Ba tab dưới một shop

- **Boxes**: id, linked id (id biến thể Shopify), ngày publish, settings/bundles (mở drawer JSON). Row action: View (sang trang Box — xem [04](04-boxes.md)), Edit (JSON, khóa khi đã publish), View detail, **Configure Tier Settings** (box Tier chưa publish), View item details.
- **Orders**: id, id Shopify, tên, khách, tiền tệ, tổng, trạng thái; View sang trang Order ([03](03-orders.md)).
- **Charges**: mọi dòng subscription/one-time/usage của shop (xem [05](05-plans-discounts-promo-charges.md)).

## Ví dụ: Chi xử lý Shop An

Shop An (plan Free, capacity 10, đã dùng 8) báo: "box biến mất khỏi storefront". Chi tìm trong Shops bằng domain, mở chi tiết, tab Boxes: tất cả box có ngày publish trống. Chi xem section Capacities: **capacity used = 10** — chạm trần Free nên hệ thống tự unpublish (đúng thiết kế). Chi không sửa số; cô gửi payment link plan Pro (Generate recurring payment link). Cô nhắn An mở link và đồng ý. An đồng ý trên Shopify, plan đổi; An (hoặc Chi qua trang Box) publish lại từng box. Nếu Chi lỡ sửa "capacity used" xuống 7, box **không tự bật lại**.


## Câu hỏi thường gặp

- **Shop đã gỡ app đâu rồi?** Đang bị filter Trashed ẩn; chọn "with trashed".
- **Vì sao không có nút Refresh access token?** Shop còn dùng token cũ không hạn (job hàng tuần sẽ chuyển) hoặc thiếu quyền.
- **Tắt development store xong subscription biến mất?** Đúng thiết kế; gửi lại payment link.
- **Admin có xóa/tạo shop được không?** Không; quyền tạo/xóa shop luôn bị từ chối.
