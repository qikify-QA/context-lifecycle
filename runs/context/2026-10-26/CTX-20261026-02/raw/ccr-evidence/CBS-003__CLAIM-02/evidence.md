### CLAIM-02

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** grep trực tiếp bundle `staging-sdk.teeinblue.com/shopify/app-v1.js` (tải về qua `curl`, ~1.7MB, 2026-10-07)
- **Link:** `https://staging-sdk.teeinblue.com/shopify/app-v1.js?token=<token>&shop=linh-tib-staging.myshopify.com` (URL có token theo session, không phải credential bí mật dài hạn — token lộ trong script src công khai của storefront)
- **Ngày của nguồn:** 2026-10-07 (ngày agent tải/grep bundle — đây là ngày QUAN SÁT của agent, KHÔNG phải ngày code được viết/deploy, vốn không xác định được từ bundle minify)
- **Người viết / người xác nhận:** agent (QA), không có dev/PO nào xác nhận lại phát hiện này
- **Trích nguyên văn** (kết quả grep, không phải diễn giải):
  ```
  generateDesignLinks: 0 lần
  window.parent.postMessage: 0 lần
  notifyParentIFrame: 0 lần
  addToCartAction: 1 lần (string constant tồn tại, không thấy dùng kèm postMessage trong bundle này)
  onCustomizationCreated: 0 lần
  design_urls: 0 lần
  EVENT_CUSTOMIZATION_CREATED:"teeinblue-event-customization-created" — ĐỊNH NGHĨA tồn tại
    trong enum event, nhưng 0 lần dispatchEvent/CustomEvent nào tham chiếu hằng số này
    trong toàn bộ bundle.
  ```
- **File đính kèm cho claim này:** không có

