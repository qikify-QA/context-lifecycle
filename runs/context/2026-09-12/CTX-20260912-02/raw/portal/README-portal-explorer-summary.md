# Portal Explorer — Campaign (teeinblue) — CTX-20260912-02

Account đã verify: **Linh explorer** (sub=273, user_id=266, store `linh-explorer.myshopify.com`, plan Blue (Test)). Không chạm account "Linh Pham" (sub=2) tại bất kỳ thời điểm nào.

## Kết quả tạo campaign

| Flow | ID | Tên | Trạng thái cuối |
|---|---|---|---|
| by-product-base | 2595 | QA Explore Campaign PB 01 | **Published** trên linh-explorer.myshopify.com (fixture, giữ lại) |
| by-shopify | 531 (platform-product) | The 3p Fulfilled Snowboard | Đã publish rồi **Unpublish** lại (demo publish/unpublish; fixture, giữ lại ở trạng thái unpublished) |
| by-product-base (throwaway) | 2596 | QA Delete Test Campaign | **Đã xoá** (cleanup DONE, dùng để test delete) |
| (pre-existing, không đụng tới) | 2592 | [Sample campaign] Woman and Dog Clipart - Poster | Unpublished, không thay đổi |

## Khác biệt chính giữa 2 flow (đáng chú ý cho normalizer/checklist)

1. **Basic info**: by-product-base chỉ có Campaign title + Internal tags. by-shopify có thêm "Choose a store" (mặc định store đã connect) + "Select a Shopify product" (bắt buộc chọn 1 sản phẩm Shopify thật).
2. **Product/print-area**: by-product-base có khái niệm "Print Areas" theo Product Base (nhiều print area/print size), mỗi print area gán artwork riêng hoặc "Select artwork for all". by-shopify KHÔNG có print area — chỉ 1 khối "Artworks" cho toàn sản phẩm, có thêm toggle "Connect artworks with Shopify variants" (chưa test).
3. **Variant/pricing**: by-product-base có Color/Size selector nội bộ + giá hiển thị ngay trong preview. by-shopify hiển thị "Variants are managed by Shopify." — không có UI variant nội bộ.
4. **Validation launch**: by-product-base cần ít nhất 1 print area có artwork. by-shopify cần THÊM 1 điều kiện riêng: **mockup** ("No mockup" error) — phải Upload mockup + Select trước khi launch được.
5. **Publish**: by-product-base mở dialog **"Multi-store launch"** liệt kê MỌI store trong Organization (ở đây có 2 store: linh-explorer, linh-explorer-2) — publish theo từng store riêng lẻ, phải chọn đúng row. by-shopify **publish trực tiếp** (không có dialog chọn store) vì store+product đã cố định lúc tạo.
6. **List UI**: `/campaigns` (by-product-base) có nhiều cột/filter hơn (Type, Vendor, Tags, Listing info, Published on store) so với `/platform-products` (by-shopify: Mockup/Name/Internal Tags/Domain/Status).

## Cross-feature quan sát được

- Publish 1 campaign by-product-base sẽ tạo ra 1 Shopify product THẬT trên store; product đó sau đó xuất hiện (nhưng bị khoá, status "Used") trong danh sách chọn sản phẩm của flow by-shopify — 2 flow không hoàn toàn độc lập ở tầng Shopify product.
- Action menu "..." trên list by-product-base còn có: See campaign info, View campaign logs, Duplicate campaign, Mark as archive, Import to Translation — chưa thực thi (unexplored).
- JWT tự refresh khi tab mở, không cần login lại giữa phiên dài.

## File output

- `portal-evidence.json` — Feature Discovery Artifact đầy đủ (nguồn chính, máy đọc).
- `shots/*.png` — before/after theo từng ACT-ID.
- `../network/*.json` — network capture đã redact theo ACT-ID (header authorization/cookie và field token/password/... đã thay `[REDACTED]`).

## Giới hạn / chưa khám phá (xem thêm `unexplored_areas` trong JSON)

Toggle variant-artwork, per-variant mockup assignment, Duplicate/Archive/Import to Translation, Bulk creator/Bulk Fulfill, Preview/Generate test design, effect của checkbox "Remove artworks & product bases" khi xoá, launch tới store thứ 2 (cố ý bỏ qua vì ngoài phạm vi).
