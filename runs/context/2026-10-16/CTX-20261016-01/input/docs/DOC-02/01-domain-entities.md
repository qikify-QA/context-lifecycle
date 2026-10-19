# Domain entities

> Các "đối tượng" chính của Mysbox, quan hệ giữa chúng, và **ví dụ xuyên suốt** (Shop An bán box "Sneaker Mystery", khách Bình mua 2 box) được dùng lại ở mọi nhóm sau. Nên đọc sau [00-overview.md](00-overview.md). Chi tiết từng đối tượng nằm ở nhóm tương ứng (cột "Xem tiếp").

## Ví dụ xuyên suốt

- **Shop An** (`an-sneakers.myshopify.com`, tiền tệ USD) bán giày. Cài app, ban đầu ở gói Free, sau đó nâng lên Growth (xem dưới).
- An tạo box **"Sneaker Mystery"**: một variant giá **$40**, loại **Single box**, kiểu **Digital** ("Instantly opening box"), không theo dõi tồn kho (untracked) nên mỗi món có phần trăm:
  - Lace set (giá $5) — 60%; Socks (giá $15) — 30%; Limited Sneaker (giá $120) — 10%.
- An bật Buyback chế độ **BOX**, giá trị **80%**, cửa sổ **24 giờ** (mặc định).
- **Bình** (khách) mua **2 box** trong đơn **#1001** với mã giảm 10%, trả **$72**. Cùng ngày, **Dũng** mua 1 box (đơn #1002).
- **Chi** là admin Mysbox hỗ trợ An khi cần.
- Số liệu gói/billing dùng trong các nhóm sau là *giả định minh hoạ* (giá thật nằm trong DB, *chưa xác nhận*): gói "Growth" $29/tháng, hạn mức 100 box, phí $0.25 mỗi box vượt.

## Các đối tượng

| Đối tượng | Nghĩa nghiệp vụ | Trong ví dụ | Xem tiếp |
|---|---|---|---|
| **Shop** (merchant) | Một cửa hàng Shopify đã cài app; giữ gói, hạn mức, token, cấu hình | Shop An | [06](06-merchant-app/00-overview.md) |
| **Box** | Một variant Shopify được đánh dấu là mystery box, kèm cấu hình (loại, phần thưởng, animation, buyback) | "Sneaker Mystery" | [02](02-boxes/00-overview.md) |
| **Box version** | Bản chụp bất biến của box tạo mỗi lần lưu; đơn nhớ version lúc mua | Lần lưu đầu = v1 | [02/03](02-boxes/03-versions.md) |
| **Item** (món thưởng) | Một variant Shopify có thể trúng | Lace set, Socks, Limited Sneaker | [02/01](02-boxes/01-box-types.md) |
| **Prize set / bundle** | Danh sách món để bốc 1 món. Single box có 1 set; Bundle box có nhiều set (mỗi box ra 1 món mỗi set) | 1 set (3 món) | [02/01](02-boxes/01-box-types.md) |
| **Tier / Group** | Nhóm độ hiếm (Common, Rare...) có xác suất riêng, chỉ có ở box dạng group | Không dùng | [02/01](02-boxes/01-box-types.md) |
| **Pool / inventory** | Danh sách món còn lại khi tracked hoặc group dạng pool; món trúng bị trừ khỏi pool | Untracked nên không có đếm | [02/04](02-boxes/04-inventory-and-pools.md) |
| **Customer** | Khách của shop; có token để mở trang reveal | Bình, Dũng | [03](03-orders-and-reveal/00-overview.md) |
| **Order** | Bản sao đơn Shopify cùng trạng thái mở, resell, đồng bộ quà | #1001 | [03](03-orders-and-reveal/00-overview.md) |
| **Opening request** | Một dòng cho mỗi (đơn, variant box): số lượng và kết quả bốc thăm | #1001 có 1 dòng, quantity 2 | [03/01](03-orders-and-reveal/01-purchase-and-draw.md) |
| **Winning** (kết quả) | Món trúng của từng box, chọn lúc đơn paid | Box 1 Lace set, box 2 Socks | [03/01](03-orders-and-reveal/01-purchase-and-draw.md) |
| **Ticket** | Vé khi khách đổi Koin credit lấy quyền mua một box | Bình không dùng | [04/04](04-resell-refund-credit/04-store-credit-and-tickets.md) |
| **Plan** | Gói: giá tháng, ngày trial, hạn mức box, quy tắc phí vượt | Free lúc đầu, rồi Growth | [05/01](05-plans-billing/01-plans-and-capacity.md) |
| **Charge** | Bản ghi tương ứng subscription hoặc một usage record trên Shopify | Có sau khi An nâng lên Growth | [05/03](05-plans-billing/03-billing-cycle-and-charges.md) |
| **Usage** | Dòng tính tiền cho mỗi (đơn, variant box): số box, phí, có miễn phí không | #1001: 2 box, phí $0 | [05/02](05-plans-billing/02-usage-pricing.md) |
| **Promote code** | Mã tặng thêm box miễn phí mỗi chu kỳ | Ví dụ `LAUNCH50` | [05/05](05-plans-billing/05-promote-codes.md) |
| **Billing discount** | Mã giảm giá subscription hoặc thêm ngày trial | Ví dụ `LAUNCH20` | [05/06](05-plans-billing/06-billing-discounts.md) |
| **Share link** `[chỉ có trên staging]` | Link chia sẻ kết quả mở box, kèm theo dõi lượt xem và đơn phát sinh | Bình chia sẻ | [07/02](07-automation-growth/02-share-unboxing.md) |
| **Recent pull** | Một lần mở box ghi lại để hiện trong feed "quà vừa trúng" | 2 dòng khi Bình mở cả 2 box | [07/03](07-automation-growth/03-recent-pulls.md) |
| **Pool refill** | Bộ đệm trả món bị resell về lại pool (box group dạng pool) | Không áp dụng | [02/06](02-boxes/06-pool-refill.md) |
| **Banner** `[chỉ có trên staging]` | Thông báo marketing trên dashboard do admin tạo | — | [07/04](07-automation-growth/04-banners-and-emails.md) |
| **Admin user** | Tài khoản nhân sự Mysbox (Chi) | Chi | [08](08-admin-panel/00-overview.md) |

## Quan hệ giữa các đối tượng

```
 Shop ──1-N──> Box ──1-N──> Box version        (Box trỏ tới version hiện hành)
  │              └──1-1──> Inventory (pool) ──> Pool refill
  │
  ├──1-N──> Customer ──1-N──> Order ──1-N──> Opening request ──> Box version
  │                              │                  └──> Recent pull (mỗi box mở = 1 dòng)
  │                              └──1-N──> Usage ──> Charge (khi đã gom tính tiền)
  ├──N-1──> Plan   ──1-N──> Charge
  └──N-N──> Promote code (qua lượt đổi mã của shop)
 Share link ──> Customer, Order source ──> Order   [staging]
```

| Quan hệ | Điều cần nhớ |
|---|---|
| Box 1-N Box version | Đơn luôn đọc **version**, không đọc box "đang sửa". Sửa box sau này không đổi quà hay điều khoản buyback của đơn cũ |
| Order 1-N Opening request | Một đơn có nhiều variant box thì có nhiều opening request; mỗi request nhớ version đã mua |
| Opening request 1-N winning | Mỗi box (đơn vị) trong request có 1 kết quả; Bundle box có thêm một món cho mỗi set |
| Order 1-N Usage | Mỗi (đơn, variant box) một dòng usage; trong một đơn nhiều variant, hạn mức bị trừ lần lượt |
| Shop N-1 Plan | Mặc định gói Free; huỷ hoặc gỡ app trả về Free |
| Charge | Hai loại: recurring (subscription) và usage (phí box vượt); xem [05](05-plans-billing/03-billing-cycle-and-charges.md) |

## Chuyện gì sinh ra khi Bình mua (đơn #1001, $72)

```
 Bình thanh toán #1001 ($80 niêm yết, mã 10% -> trả $72)
   -> Order #1001 (hạn resell = lúc paid + 24h)
   -> Opening request: quantity 2, gắn Box version v1
        winning: box 1 = Lace set, box 2 = Socks   (đã chọn xong, chưa ai mở)
   -> Usage: 2 box, phí $0 (trong hạn mức)
   -> Analytics: doanh thu box $72, 2 box
 Bình mở cả 2 box -> 2 Recent pull. Hết 24h -> quà thêm vào #1001 (dòng $0).
 Giữa chừng An đổi buyback 80% -> 70% (Box version v2): đơn #1001 vẫn dùng v1, Bình vẫn resell ở 80%.
```
Nếu Bình resell Socks theo chế độ BOX: 80% giá niêm yết $40 = **$32** (công thức đầy đủ ở [04/03](04-resell-refund-credit/03-refund-amount-examples.md)).

## Câu hỏi thường gặp

1. **Một sản phẩm Shopify có thể là hai box không?** Có nếu có hai variant; mỗi variant là một box độc lập.
2. **Khách mua 2 box thì có 2 opening request không?** Không. Một request với quantity 2 (nếu cùng variant).
3. **Doanh thu $72 hay $80?** $72: doanh thu tính sau giảm giá dòng, trước thuế và ship ([dashboard](06-merchant-app/02-dashboard-and-analytics.md)).
