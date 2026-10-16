# Shopify Flow: trigger, action và công thức mẫu

> Mysbox cắm vào Shopify Flow (app tự động hoá no-code của Shopify) theo hai chiều: **trigger** (Mysbox báo cho Flow "có việc vừa xảy ra") và **action** (Flow ra lệnh cho Mysbox). Nằm trong nhóm [Tự động hoá và tăng trưởng](00-overview.md). Luồng mở box xem [../03-orders-and-reveal/02-reveal-journey.md](../03-orders-and-reveal/02-reveal-journey.md).

## Ai dùng được

Merchant nào có Shopify Flow trên gói Shopify của mình. *Không tìm thấy giới hạn theo gói Mysbox.*

## Bước 1 — Bật setting

Admin Mysbox → "Settings" → "General Settings" → tab "Integration" → nhóm "Shopify Flow": công tắc **"Enable Mysbox triggers in Shopify Flow"** (mặc định **TẮT**). Bật xong chỉ áp dụng cho sự kiện mới, không phát lại sự kiện cũ.

Tab "Auto-Unbox" có thêm "Enable auto-unbox", "Auto-unbox after N hour" và "Enable auto-unbox trigger" / "Trigger before N hour" — hai ô sau quyết định lúc nào trigger "Order unboxing soon" đến hạn.

## Bước 2 — Chọn trigger (Mysbox → Flow)

Mọi trigger đều mang theo "Order" của Shopify (nên dùng được order, customer, line item ở bước sau).

| Trigger trong Flow | Bắn khi nào | Dữ liệu thêm | Cần bật setting? |
|---|---|---|---|
| "All box opened" | Box **digital** cuối cùng của đơn vừa được mở. Mỗi đơn đúng 1 lần. Box physical trong cùng đơn không tính. | không | Có |
| "Digital order synced" | Quà đã được ghi vào đơn Shopify (giảm 100%). Dùng cái này khi bước sau cần thấy quà trên đơn. | không | Có, và đơn có box digital |
| "Order unboxing soon" | Sắp tới giờ auto-reveal; chỉ bắn nếu đơn còn box digital chưa mở và giờ reveal ở tương lai. | `unboxingAt`: giờ reveal dạng `YYYY-MM-DD HH:MM:SS (UTC+0)` | Không kiểm tra (xem dưới) |
| "Resell completed" | Khách bán lại xong (box hoặc items). | `Amount`, `Currency`, danh sách `Items` (variantId, quantity, amount, type `box`/`items`, paymentMethod `store_credit`/`original_payment`) | Có |
| "Box sold out" | Sau một lượt reveal, box có theo dõi tồn kho hết sạch. | `soldOutVariantId` | Không kiểm tra |

Độ trễ: trigger vào hàng đợi, đến Flow sau vài giây. Bộ quét "unboxing soon" chạy mỗi giờ lúc phút :30 nên có thể trễ tới ~1 giờ và chỉ xét đơn có giờ thông báo chưa quá 1 ngày.

Mỗi trigger gửi **một lần**. Nếu Shopify từ chối hoặc hàng đợi lỗi thì không tự gửi lại; Flow mất sự kiện đó. Hai trigger "unboxing soon" và "sold out" vẫn được gửi khi công tắc TẮT, nhưng Shopify bỏ đi nếu không có flow nào đang nghe, nên vô hại.

## Bước 3 — Action (Flow → Mysbox)

Cả ba action chỉ có một ô bắt buộc "Order". Flow gọi qua request có chữ ký; chữ ký sai bị từ chối. Action **không** kiểm tra công tắc ở Bước 1.

| Action | Làm gì | Trả về Flow |
|---|---|---|
| "Open order boxes" | Mở mọi box chưa mở của đơn như khách/auto-unbox. Flow khuyên: chờ ít nhất 10 giây sau khi đơn được thanh toán. | `processed` (true/false), `winningItems` (id, quantity) |
| "Remove order boxes" | Xoá dòng box digital khỏi đơn Shopify sau khi mở xong, chỉ còn quà. Chỉ chạy được khi đơn ở trạng thái hoàn tất, nếu không báo "not found or not completed". | không |
| "Handle external sales channel order paid" | Cho Mysbox xử lý đơn từ kênh không gửi thông báo "order paid" (POS, kênh tuỳ biến, một số marketplace) như vừa thanh toán. Đơn phải đã thanh toán đủ. | không |

```
Nếu đơn chưa được Mysbox lưu (webhook còn đang chạy)
   → "Open order boxes" báo "still being processed" → Flow tự thử lại
Nếu không còn gì để mở và đơn chưa hoàn tất
   → processed = false, không đổi gì
```

Giới hạn: 60 lần gọi action/phút/shop. *Chưa xác nhận: Flow có gửi mã shop cho bộ giới hạn hay không; nếu không, mọi shop dùng chung một xô.*

## Công thức Flow mẫu

1. **Thưởng sau khi mở**: "All box opened" → điều kiện tổng đơn >= 50 → "Add customer tag" `box-opener`.
2. **Nhắc trước auto-reveal**: "Order unboxing soon" → "Send email": "Box của bạn tự mở lúc {{unboxingAt}}, mở ngay bây giờ nếu muốn".
3. **Cảnh báo hết hàng**: "Box sold out" → "Send Slack message" kèm variant id.
4. **Thưởng resell lớn**: "Resell completed" → điều kiện `Amount` >= 20 → tag `big-reseller` hoặc cộng store credit qua app khác.
5. **Kênh POS mở ngay**: Shopify "Order created" → lọc source = pos → chờ 10 giây → "Handle external sales channel order paid" → chờ → "Open order boxes".
6. **Dọn hoá đơn**: "Digital order synced" → "Remove order boxes".
7. **Bàn giao kho**: "Digital order synced" → tag `ready-to-ship` / gửi sang 3PL.

### Ví dụ có số (công thức 2)

Shop An đặt "Auto-unbox after 48 hour" và "Trigger before 6 hour". Bình thanh toán lúc 10:00 Thứ Hai.
- Auto-unbox: 10:00 Thứ Tư. Giờ thông báo đến hạn: 48 - 6 = 42 giờ sau đơn = 04:00 Thứ Tư.
- Bộ quét chạy 04:30 → bắn trigger. Email đến Bình khoảng 5,5 giờ trước giờ reveal.
- `unboxingAt` hiển thị giờ **UTC**, không phải múi giờ shop.

## Lưu ý

- Sửa đơn thêm box không dời giờ reveal; box mới thừa hưởng giờ cũ. Đổi setting không ảnh hưởng đơn đã tạo (giờ thông báo tính lúc tạo đơn).
- Đơn chỉ có box physical không bao giờ bắn "All box opened" hay "Digital order synced".
- Địa chỉ endpoint của action được đặt theo môi trường lúc deploy.

## Câu hỏi thường gặp

- **Flow không nhận "All box opened"?** Kiểm tra công tắc (mặc định tắt), đơn có digital không, flow có đang bật không. Trigger bắn một lần, không gửi lại.
- **"Unboxing soon" không bao giờ bắn?** Cần Auto-unbox bật, "Enable auto-unbox trigger" bật, "Trigger before" nhỏ hơn thời gian auto-unbox, đơn còn box chưa mở.
- **"Remove order boxes" báo lỗi?** Đơn chưa mở/sync xong; chạy sau trigger "Digital order synced".
