### CLAIM-20

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5418; skill-rules-audit.md #165, #166, #167 (rule `storefront-variant-picker-availability`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5418?focusedCommentId=54647
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** phatnt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #165):
    ```
    Bây giờ: Hệ thống sẽ tự tìm và chọn variant còn hàng đầu tiên. Nếu tất cả đều hết hàng thì mới fallback về variant đầu tiên.
    ```
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #166):
    ```
    Bây giờ: Khi tổ hợp option không tồn tại, hệ thống sẽ tự động chuyển sang variant có thật hợp lý nhất của sản phẩm đó: Ưu tiên chọn variant còn hàng. Giữ lại tối đa các lựa chọn khác mà khách vừa chọn (ví dụ giữ nguyên Size khách vừa bấm, chỉ tự động nhảy Color sang màu có hàng). Dọn sạch các option thừa của sản phẩm cũ (tránh lưu rác state khi đổi giữa sản phẩm có 3 option sang sản phẩm chỉ có 2 option). Giá luôn luôn hiển thị đúng giá tiền thực tế của sản phẩm, không bị nhảy về $0.00.
    ```
  - Jira TIB-5418 comment #54647, phatnt (dev), 2026-10-15 (dòng #167):
    ```
    Khách chủ động bấm chọn variant hết hàng (Sold out): Nếu variant đó có tồn tại nhưng hết hàng (availableForSale: false), hệ thống vẫn giữ nguyên lựa chọn của khách, hiển thị đúng giá của variant đó và nút CTA hiện "Sold out". Hệ thống không tự ý nhảy sang variant khác
    ```
- **File đính kèm cho claim này:** không có

