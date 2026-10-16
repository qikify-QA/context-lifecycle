# Merchant app — tổng quan

> Nhóm này mô tả **ứng dụng merchant** (portal nhúng trong Shopify admin): merchant thấy gì, bấm gì, từ lúc cài app đến lúc app bị gỡ. Nằm giữa [domain entities](../01-domain-entities.md) (đối tượng) và các nhóm chức năng ([box](../02-boxes/00-overview.md), [billing](../05-plans-billing/00-overview.md)). Ví dụ xuyên suốt: Shop An và box "Sneaker Mystery".

## Ai dùng

Chủ shop và mọi nhân viên Shopify được phép mở app. App **không phân biệt** chủ và nhân viên; quyền mở app do Shopify quyết định. Nhân viên Mysbox dùng một back-office riêng, xem [08-admin-panel](../08-admin-panel/00-overview.md).

## Sơ đồ hành trình merchant

```
 Cài app ──> Onboarding (chưa có box) ──> Dashboard ──> Quản lý box / đơn / analytics
   │            4 bước                      │              │
   │                                        ├─ Pricing (nâng gói) ── Shopify duyệt ──> trả phí
   │                                        └─ General Settings, Style, Translation
   └─ Gỡ app ──> (cài lại) ──> khôi phục dữ liệu cũ, về gói Free
```

## Màn hình trong menu trái

Thứ tự sau onboarding: Dashboard, Manage boxes, Manage orders, Analytics, Content & Translation, Style Settings, General Settings, Feature Requests, Pricing. Trong lúc onboarding menu chỉ có "Dashboard".

| Màn hình | Làm gì | Nói kỹ ở |
|---|---|---|
| Dashboard | Bộ đếm "Box sales limit", hai con số doanh thu, 5 box mới tạo, trạng thái extension | [02](02-dashboard-and-analytics.md) |
| Manage boxes | Hai thẻ "Single box" / "Bundle box"; danh sách, sửa, xoá, kích hoạt | [nhóm box](../02-boxes/02-create-and-publish.md) |
| Manage orders | Đơn có box, trạng thái "{opened}/{total} boxes opened", nút "Unbox" | [nhóm đơn](../03-orders-and-reveal/00-overview.md) |
| Analytics | Doanh thu, số box, AOV, returning rate, top box | [02](02-dashboard-and-analytics.md) |
| Content & Translation | Chữ khách thấy, theo ngôn ngữ; gói Free không lưu được | [box/07](../02-boxes/07-storefront-widget-and-translations.md) |
| Style Settings | Animation, danh sách món, recent pulls (và share `[chỉ có trên staging]`) | [box/07](../02-boxes/07-storefront-widget-and-translations.md) |
| General Settings | Auto-unbox, thời gian resell, sealed box, Koin, Flow | [03](03-general-settings.md) |
| Feature Requests | Bảng góp ý nhúng (SSO). Ẩn với dev/partner store và shop có email chứa "shopify" | — |
| Pricing | Thẻ gói, ước tính phí, đổi gói, "Apply discount" | [billing](../05-plans-billing/04-upgrade-downgrade-cancel.md) |
| Instructions | Hướng dẫn thêm block vào theme; không nằm trong menu | [01](01-install-and-onboarding.md) |

Ngôn ngữ giao diện portal: English và Japanese (chỉ đổi giao diện admin, không đổi chữ khách thấy).

## Mục lục nhóm

| File | Nội dung |
|---|---|
| [01-install-and-onboarding](01-install-and-onboarding.md) | Cài app, quyền, wizard 4 bước, setup guide |
| [02-dashboard-and-analytics](02-dashboard-and-analytics.md) | Định nghĩa từng con số, loại test order |
| [03-general-settings](03-general-settings.md) | Mọi setting, mặc định, tác dụng |
| [04-shop-status-and-lifecycle](04-shop-status-and-lifecycle.md) | Các trạng thái shop, uninstall, reinstall, re-auth, frozen |

## Từ vựng nhóm

- **Embedded app**: portal chạy trong iframe của Shopify admin.
- **Theme app embed** ("Mysbox App"): công tắc ở mục App embeds của theme editor; tắt thì storefront không hiện box.
- **App block**: phần merchant đặt vào theme ("Mysbox list box item", "Buy box by store credit", "Mysbox recent pulls") và vào checkout editor ("Mystery box unboxing" ở Thank-you và Order status).
- **Early-bird**: gói cũ miễn phí 50 box, giữ nguyên ("Founding member").

## Ví dụ: một buổi sáng của An

An (đã nâng lên Growth) mở app: thấy banner trạng thái extension "Active", bộ đếm `4 / 100`, hai con số doanh thu hôm nay, rồi vào General Settings bật auto-unbox. Từng bước nằm ở các file 01 đến 03.
