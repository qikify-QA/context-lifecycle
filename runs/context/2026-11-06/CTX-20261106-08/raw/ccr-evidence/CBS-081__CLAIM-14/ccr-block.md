### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5510; skill-rules-audit.md #104, #107, #108 (rule `required-addon-checkout-validation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5510?focusedCommentId=55732
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27, 2026-10-30
- **Người viết / người xác nhận:** phatnt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5510 comment #55732, phatnt (dev), 2026-10-27 (dòng #104):
    ```
    CÓ, Function kiểm tra độc lập TỪNG add-on variant một. Thuộc tính _tib_addon_variant lưu danh sách toàn bộ variant bắt buộc theo format: <variantId_1>:<rate_1>|<variantId_2>:<rate_2>. Function sẽ duyệt qua từng variant: Tính số lượng yêu cầu của từng add-on: parentQuantity * rate. Đối chiếu với child line item trong cart theo Variant ID và _tib_customization_id. Chỉ cần thiếu 1 trong các add-on (hoặc 1 add-on không đủ số lượng) -> Checkout sẽ BỊ CHẶN NGAY LẬP TỨC.
    ```
  - Jira TIB-5510 comment #56119, phatnt (dev), 2026-10-30 (dòng #107):
    ```
    Về Dynamic Translations (Extras > Dynamic Translations): Tính năng này chỉ áp dụng cho nội dung do merchant tự tạo (như Option Title/Name, Product Base Name, Variant Name), không hỗ trợ các System / Validation Error Messages cố định của app SDK nên thêm entry ở đây sẽ không có tác dụng ạ.
    ```
  - Jira TIB-5510 comment #56119, phatnt (dev), 2026-10-30 (dòng #108):
    ```
    Dòng này thuộc tính năng Out-of-stock có sẵn từ trước của app, dùng key out_of_stock_message. Cách dịch trên Portal: Vào Settings > Product Page Content / Translation > tìm mục Out of stock > chỉnh sửa trường "Out of stock message" (out_of_stock_message). https://prnt.sc/mMBRZt0TgNAy Cách cấu hình qua theme snippet: window.teeinblue.outOfStockMessage = "Lựa chọn của bạn hiện đã hết hàng. Vui lòng chọn tùy chọn khác.";
    ```
- **File đính kèm cho claim này:** không có

