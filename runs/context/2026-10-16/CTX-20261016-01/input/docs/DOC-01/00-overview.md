# Overview

> Product KB cho **Mysbox**, app Shopify bán mystery box (blind box, gacha) kèm reveal, resell, store credit và billing. Viết cho người biết nghiệp vụ và Shopify nhưng không đọc code; đối chiếu code ngày 2026-10-16. **File đầu tiên nên đọc**, tiếp theo là [01-domain-entities.md](01-domain-entities.md) (đối tượng và ví dụ xuyên suốt Shop An / khách Bình).
>
> `[chỉ có trên staging]` = có ở nhánh `build-staging`, chưa lên production. `*chưa xác nhận*` = chưa kiểm chứng được.

## Mysbox làm gì

Merchant biến một sản phẩm Shopify thành "box", khai báo các phần thưởng và xác suất, rồi publish. Khách mua như hàng thường; **phần thưởng được bốc thăm ngay khi đơn "paid" về server**, không phải lúc khách bấm mở. Khách "reveal" bằng animation hoặc merchant/job tự mở hộ. Khi mọi box đã mở và hết cửa sổ resell, quà được thêm vào chính đơn Shopify dưới dạng dòng giá 0 để merchant ship. Merchant trả phí theo số box vượt hạn mức miễn phí của chu kỳ 30 ngày.

Hai kiểu box: **Digital** ("Instantly opening box", reveal trên web) và **Physical** ("Sealed box", quà giấu kín, ghi vào metafield đơn).

## Các actor

| Actor | Là ai | Làm gì |
|---|---|---|
| Merchant | Shop Shopify đã cài app | Cài app, tạo box, chọn gói, cấu hình |
| Khách hàng cuối | Người mua box | Mua, reveal, resell, trả bằng store credit |
| Admin Mysbox | Nhân sự nội bộ | Tra shop, retry đơn lỗi, quản lý plan, mã, banner |
| Shopify | Nền tảng | Webhook, tính tiền subscription và usage, cart Function |
| Bên thứ ba | Koin, Shopify Flow, Mailgun/Brevo, Qikfiliate | Xem [07](07-automation-growth/00-overview.md) |

## Vòng đời từ cài app đến billing

```
 MERCHANT                                   KHÁCH HÀNG                         TIỀN
 1 Cài app (OAuth)  -> shop có gói Free,                                       Free: 10 box/kỳ*
 2-3 Onboarding, tạo box, publish, bật theme embed
                                            4 Thấy box ở trang sản phẩm
                                            5 Mua box ------------------------> Đơn Shopify PAID
 6 Mysbox nhận webhook "orders/paid":
   tạo order + opening request, BỐC THĂM,
   mở cửa sổ resell, ghi usage
                                            7 Reveal (hoặc merchant/auto-unbox)
                                            8 Resell (trong cửa sổ) ----------> Hoàn tiền / store credit
 9 Mọi box đã mở + hết cửa sổ -> quà thêm vào đơn (dòng $0)
10 Merchant fulfil đơn
11 Job hằng ngày gom box vượt hạn mức -------------------------------------->  Shopify usage charge
```
*Giá trị seed; số thật ở production *chưa xác nhận*.

## Mục lục đầy đủ

| File | Nội dung |
|---|---|
| [01-domain-entities.md](01-domain-entities.md) | Đối tượng chính, quan hệ, ví dụ Shop An / Bình |
| [02-boxes/00-overview](02-boxes/00-overview.md) | Tổng quan |
| [02-boxes/01-box-types](02-boxes/01-box-types.md) | Single, Bundle, Group/Tier |
| [02-boxes/02-create-and-publish](02-boxes/02-create-and-publish.md) | Tạo box, Draft/Active, xoá |
| [02-boxes/03-versions](02-boxes/03-versions.md) | Đơn cũ giữ cấu hình cũ |
| [02-boxes/04-inventory-and-pools](02-boxes/04-inventory-and-pools.md) | Tracked, pool, hết hàng |
| [02-boxes/05-picking-modes](02-boxes/05-picking-modes.md) | Cách bốc thăm, unique |
| [02-boxes/06-pool-refill](02-boxes/06-pool-refill.md) | Trả món resell về pool |
| [02-boxes/07-storefront-widget-and-translations](02-boxes/07-storefront-widget-and-translations.md) | Widget, theme block, bản dịch |
| [03-orders-and-reveal/00-overview](03-orders-and-reveal/00-overview.md) | Tổng quan |
| [03-orders-and-reveal/01-purchase-and-draw](03-orders-and-reveal/01-purchase-and-draw.md) | Webhook paid, bốc thăm |
| [03-orders-and-reveal/02-reveal-journey](03-orders-and-reveal/02-reveal-journey.md) | Khách mở box ở đâu |
| [03-orders-and-reveal/03-auto-unbox](03-orders-and-reveal/03-auto-unbox.md) | Tự mở sau X giờ |
| [03-orders-and-reveal/04-prizes-added-to-order](03-orders-and-reveal/04-prizes-added-to-order.md) | Khi nào quà vào đơn |
| [03-orders-and-reveal/05-physical-vs-digital](03-orders-and-reveal/05-physical-vs-digital.md) | Sealed box, metafield |
| [04-resell-refund-credit/00-overview](04-resell-refund-credit/00-overview.md) | Tổng quan |
| [04-resell-refund-credit/01-resell-box-mode](04-resell-refund-credit/01-resell-box-mode.md) | Bán lại cả box |
| [04-resell-refund-credit/02-resell-items-mode](04-resell-refund-credit/02-resell-items-mode.md) | Bán lại từng món |
| [04-resell-refund-credit/03-refund-amount-examples](04-resell-refund-credit/03-refund-amount-examples.md) | Công thức, ví dụ số |
| [04-resell-refund-credit/04-store-credit-and-tickets](04-resell-refund-credit/04-store-credit-and-tickets.md) | Koin credit, ticket |
| [04-resell-refund-credit/05-cancellations-and-refunds](04-resell-refund-credit/05-cancellations-and-refunds.md) | Đơn huỷ, hoàn tiền |
| [05-plans-billing/00-overview](05-plans-billing/00-overview.md) | Tổng quan |
| [05-plans-billing/01-plans-and-capacity](05-plans-billing/01-plans-and-capacity.md) | Plan, hạn mức, chu kỳ 30 ngày |
| [05-plans-billing/02-usage-pricing](05-plans-billing/02-usage-pricing.md) | Phí box vượt hạn mức |
| [05-plans-billing/03-billing-cycle-and-charges](05-plans-billing/03-billing-cycle-and-charges.md) | Job hằng ngày, charge |
| [05-plans-billing/04-upgrade-downgrade-cancel](05-plans-billing/04-upgrade-downgrade-cancel.md) | Đổi gói, huỷ |
| [05-plans-billing/05-promote-codes](05-plans-billing/05-promote-codes.md) | Mã tặng hạn mức |
| [05-plans-billing/06-billing-discounts](05-plans-billing/06-billing-discounts.md) | Mã giảm giá, thêm trial |
| [06-merchant-app/00-overview](06-merchant-app/00-overview.md) | Màn hình merchant |
| [06-merchant-app/01-install-and-onboarding](06-merchant-app/01-install-and-onboarding.md) | Cài app, wizard, setup guide |
| [06-merchant-app/02-dashboard-and-analytics](06-merchant-app/02-dashboard-and-analytics.md) | Định nghĩa từng con số |
| [06-merchant-app/03-general-settings](06-merchant-app/03-general-settings.md) | Mọi setting, mặc định |
| [06-merchant-app/04-shop-status-and-lifecycle](06-merchant-app/04-shop-status-and-lifecycle.md) | Trạng thái shop, uninstall, re-auth |
| [07-automation-growth/00-overview](07-automation-growth/00-overview.md) | Tổng quan |
| [07-automation-growth/01-shopify-flow](07-automation-growth/01-shopify-flow.md) | Trigger, action |
| [07-automation-growth/02-share-unboxing](07-automation-growth/02-share-unboxing.md) | Share link `[chỉ có trên staging]` |
| [07-automation-growth/03-recent-pulls](07-automation-growth/03-recent-pulls.md) | Feed quà vừa trúng |
| [07-automation-growth/04-banners-and-emails](07-automation-growth/04-banners-and-emails.md) | Banner, email |
| [07-automation-growth/05-affiliate-and-partner-sync](07-automation-growth/05-affiliate-and-partner-sync.md) | Qikfiliate, BigQuery |
| [08-admin-panel/00-overview](08-admin-panel/00-overview.md) | Tổng quan |
| [08-admin-panel/01-login-and-roles](08-admin-panel/01-login-and-roles.md) | Đăng nhập, phân quyền |
| [08-admin-panel/02-shops-users](08-admin-panel/02-shops-users.md) | Màn hình Shop |
| [08-admin-panel/03-orders](08-admin-panel/03-orders.md) | Đơn, retry sync |
| [08-admin-panel/04-boxes](08-admin-panel/04-boxes.md) | Màn hình box |
| [08-admin-panel/05-plans-discounts-promo-charges](08-admin-panel/05-plans-discounts-promo-charges.md) | Plan, mã, charge |
| [08-admin-panel/06-banners-and-other-screens](08-admin-panel/06-banners-and-other-screens.md) | Banner, màn hình khác |
| [08-admin-panel/07-scheduled-jobs-and-ops](08-admin-panel/07-scheduled-jobs-and-ops.md) | Job định kỳ, vận hành |
| [09-integrations/00-overview-and-auth](09-integrations/00-overview-and-auth.md) | Xác thực |
| [09-integrations/01-webhooks](09-integrations/01-webhooks.md) | Webhook Shopify |
| [09-integrations/02-storefront-data-flow](09-integrations/02-storefront-data-flow.md) | Dữ liệu ra storefront |
| [10-support-playbook/00-index](10-support-playbook/00-index.md) | Mục lục triệu chứng |
| [10-support-playbook/01-orders-and-reveal](10-support-playbook/01-orders-and-reveal.md) | Ca đơn, reveal |
| [10-support-playbook/02-resell-refund-credit](10-support-playbook/02-resell-refund-credit.md) | Ca resell, hoàn tiền |
| [10-support-playbook/03-storefront-and-widget](10-support-playbook/03-storefront-and-widget.md) | Ca widget |
| [10-support-playbook/04-billing](10-support-playbook/04-billing.md) | Ca billing |
| [10-support-playbook/05-account-and-integrations](10-support-playbook/05-account-and-integrations.md) | Ca tài khoản |

## Key vocabulary (từ code sang nghĩa nghiệp vụ)

- **"User" trong code = một SHOP** (merchant). Khách hàng cuối là "Customer".
- **Box = một variant** Shopify được đánh dấu là mystery box.
- **Box version**: bản chụp bất biến cấu hình box, tạo mỗi lần lưu; đơn nhớ version lúc mua.
- **Opening request**: bản ghi nội bộ "đơn này mua N box của variant X" kèm kết quả bốc thăm.
- **Draw/pull** = bốc thăm khi đơn paid. **Unbox/reveal/open** = lúc hiển thị, về kỹ thuật chỉ đóng dấu "đã mở".
- **Redeem vs unbox** (nội bộ): redeem = khách tự mở (quà chỉ vào đơn sau khi hết cửa sổ resell); unbox = merchant, job tự động hoặc Flow mở (bỏ qua cửa sổ, coi như kết thúc resell).
- **Status đơn**: QUEUED (quà chưa đủ trên đơn Shopify, có thể kéo dài suốt cửa sổ resell), COMPLETED (quà đã vào đơn), FAILED (lần thêm quà gần nhất lỗi). Opening request PENDING = *đang* thêm quà vào đơn.
- **Capacity / "Box sales limit"**: số box miễn phí mỗi chu kỳ. *Used* (dừng tăng khi vượt) khác *Total sold in cycle* (mọi box đã bán).
- **Usage fee / Extra fee**: phí mỗi box vượt hạn mức trên gói trả phí, gộp thành một Shopify usage charge mỗi ngày.
- **Promote code** (thêm hạn mức) khác **billing discount** (giảm giá/thêm trial subscription).
- **Ticket**: vé nội bộ khi khách đổi Koin credit lấy quyền mua box; cart Function đổi vé thành giảm 100% ("Store credit discount").
- **Magic link**: URL có token (1 năm) cho khách vãng lai mở trang reveal. **App proxy**: trang reveal chạy dưới domain shop tại `/apps/mysbox/`.
- **Test order**: mặc định bị loại khỏi hạn mức, billing, analytics.
