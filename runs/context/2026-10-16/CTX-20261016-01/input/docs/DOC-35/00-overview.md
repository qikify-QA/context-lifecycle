# Tự động hoá và tăng trưởng — tổng quan

> Nhóm này gom các tính năng nằm *quanh* luồng chính "mua box → mở → bán lại": Shopify Flow, chia sẻ unboxing, feed "Recent pulls", banner trong admin, email hệ thống, theo dõi affiliate và đồng bộ Partner events. Về luồng chính xem [../03-orders-and-reveal/00-overview.md](../03-orders-and-reveal/00-overview.md). Thuật ngữ chung (box, reveal, resell) xem [../01-domain-entities.md](../01-domain-entities.md).

## Nhóm này làm gì, ai dùng

| Ai | Dùng gì |
|---|---|
| Merchant (chủ shop) | Tạo flow tự động từ sự kiện của Mysbox; bật feed Recent pulls; thấy banner quảng bá trên Dashboard |
| Khách của shop | Bấm "Share unboxing" để đăng thứ vừa trúng; thấy "Recent pulls" ở trang sản phẩm |
| Nhân viên Ownego (admin panel) | Ẩn một dòng pull, rebuild feed, tạo banner, chạy lệnh sync |
| Đối tác affiliate / báo cáo nội bộ | Nhận event khi shop đăng ký/huỷ; BigQuery nhận event Partner hằng ngày |

## Sơ đồ tổng quát

```
                 sự kiện trong Mysbox
   (mở box, resell xong, hết hàng, auto-unbox sắp tới)
          │                      │                       │
          ▼                      ▼                       ▼
   Shopify Flow            Share unboxing           Recent pulls
   (trigger → merchant     (ảnh + link công khai    (ghi lịch sử → metafield
    tự ghép flow;           → click → đơn từ link)   → block ở trang sản phẩm)
    action → gọi lại app)

   Vòng đời merchant:  cài app ─► email dung lượng / cần cấp quyền lại
                                ─► Brevo (CRM) ─► Qikfiliate (affiliate)
                                ─► banner Dashboard (admin tạo)
   Hằng ngày 07:00 UTC: Shopify Partner API ─► BigQuery (chỉ báo cáo nội bộ)
```

## Mục lục

| File | Nội dung |
|---|---|
| [01-shopify-flow.md](01-shopify-flow.md) | 5 trigger, 3 action, setting bật/tắt, công thức Flow mẫu |
| [02-share-unboxing.md](02-share-unboxing.md) | Khách chia sẻ gì, ảnh preview, link, giới hạn, đơn từ link giới thiệu `[chỉ có trên staging]` |
| [03-recent-pulls.md](03-recent-pulls.md) | Feed trên trang sản phẩm, ẩn danh, publish, ẩn một dòng, rebuild |
| [04-banners-and-emails.md](04-banners-and-emails.md) | Banner admin `[chỉ có trên staging]` và bảng mọi thông báo/email hệ thống |
| [05-affiliate-and-partner-sync.md](05-affiliate-and-partner-sync.md) | Theo dõi giới thiệu merchant mới; sync Partner events sang BigQuery |

## Phân biệt production và staging

Production = `origin/master`, staging = `build-staging`. Chưa lên production: toàn bộ **share unboxing**, **order source** (đơn từ link chia sẻ), **banner thông báo**, tuỳ chọn "publish test orders" của Recent pulls, và việc "ghi lịch sử mọi lượt reveal digital". Các phần còn lại đã chạy trên production.

## Ví dụ chạy xuyên suốt

Merchant **Shop An** bán "Neon Box" (20 USD, digital). Khách **Bình** mua, mở box:
1. Sự kiện mở xong → Flow của Shop An (nếu bật) nhận trigger "All box opened" và gắn tag cho Bình.
2. Bình bấm "Share unboxing" → ra link công khai; bạn của Bình bấm vào và mua → đơn được ghi nhận "đến từ link chia sẻ" sau khoảng 20-110 phút.
3. Bình vừa trúng món hiếm → xuất hiện trong "Recent pulls" của Neon Box, không kèm tên Bình.
4. Nếu Shop An là shop mới do một đối tác giới thiệu, đối tác nhận event theo dõi hoa hồng.
