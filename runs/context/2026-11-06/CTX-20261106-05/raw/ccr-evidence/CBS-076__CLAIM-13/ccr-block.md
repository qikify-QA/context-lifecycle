# Block CLAIM-07 của Proposal CBS-076

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5414, TIB-5585; skill-rules-audit.md #43, #45, #46, #47, #49 (rule `layer-translation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5414?focusedCommentId=50357
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-09, 2026-10-19
- **Người viết / người xác nhận:** chauptm, huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5414 comment #50357, chauptm (dev), 2026-09-09 (dòng #43):
    ```
    prefix and suffix were removed from LAYER_TRANSLATABLE_FIELDS (src/transformer/translation/layer.js).  They were the odd ones out in that list — every other entry is form copy (form_label, form_placeholder, input_hint, *_label, name) shown only inside the personalization form.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #45):
    ```
    Giờ dấu cách người dùng nhập ở ô bản dịch được giữ nguyên khi Save, reload vẫn còn, và hiển thị đúng như vậy trên storefront.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #46):
    ```
    Bản dịch cũ đã bị cắt dấu cách vẫn giữ nguyên, merchant muốn có dấu cách thì phải nhập lại. Chỉ áp dụng cho bản dịch nhập tay. Kết quả của Auto translate vẫn bị cắt dấu cách đầu/cuối như trước.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #47):
    ```
    Ô dịch chỉ chứa dấu cách (␣) giờ được lưu như một bản dịch, nên trên storefront tiêu đề option hiển thị thành khoảng trắng thay vì quay về tiêu đề gốc.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #49):
    ```
    Rủi ro lớn nhất: thay đổi áp dụng cho toàn bộ thao tác Save ở trang Dynamic Translations, không riêng ô bản dịch. Save bản dịch ở Dynamic Translations, trên mọi nền tảng (Shopify và các nền tảng khác), gồm thêm, sửa, xoá ngôn ngữ và xoá dòng dịch
    ```
- **File đính kèm cho claim này:** không có

