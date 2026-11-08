### CLAIM-09

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5349; skill-rules-audit.md #15, #16, #17, #18, #19, #20, #22, #24, #25, #26 (rule `form-artwork-navigation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5349?focusedCommentId=52793
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-30
- **Người viết / người xác nhận:** huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #15):
    ```
    Sản phẩm Shopify/platform product vẫn đặt tên ở cấp product như cũ (không có khái niệm Product Base), nhưng cũng có ô tên này.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #16):
    ```
    Seller nhập | Thanh nav / tiêu đề section | Pill trên gallery (để trống) | Organic Cap 1 | Organic Cap 1/2 Customize #{{index}} design | Customize #1 design | Customize #1/2 design My design (không có {{index}}) | My design 1 | My design 1/2 Design {{ index }} (có khoảng trắng) | Design 1 | Design 1/2 Toàn khoảng trắng | Coi như để trống | Coi như để trống
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #17):
    ```
    Thanh nav chỉ hiện số (#1). Chỉ pill trên gallery mới hiện phân số (#1/2).
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #18):
    ```
    Dòng "Note: Navigation will use Product Base as the menu name" trong popup đã được bỏ.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #19):
    ```
    Product Base mới thêm vào campaign có sẵn thì navigation mặc định tắt, phải bật riêng.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #20):
    ```
    Addon product, cross-sell và nút Personalize không có thanh nav, giữ nguyên quyết định từ TIB-5223.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #22):
    ```
    Cache storefront: trước đây bật/tắt navigation xong, storefront có thể phải chờ tới 1 tiếng mới thấy thay đổi. Giờ đổi toggle hoặc tên thì cache được xoá ngay.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #24):
    ```
    Campaign cũ sau deploy: khi migrate, campaign đang bật navigation hoặc đã đặt tên sẽ được chép cài đặt đó xuống mọi Product Base. Storefront phải trông y như trước.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #25):
    ```
    Pill số thứ tự trên gallery: trước đây pill cắt số ở cuối label để ghép phân số. Giờ phân số nằm đúng chỗ {{index}}.
    ```
  - Jira TIB-5349 comment #52793, huytv (dev), 2026-09-30 (dòng #26):
    ```
    Campaign nhiều Product Base trên storefront: thanh nav bật/tắt và đổi tên theo Product Base của variant đang chọn.
    ```
- **File đính kèm cho claim này:** không có

