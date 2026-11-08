### CLAIM-17

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5539; skill-rules-audit.md #111, #113, #114, #115 (rule `sdk-429-shopper-message`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5539?focusedCommentId=55557
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #111):
    ```
    2. Phạm vi "respect Retry-After". PO đã chấp nhận: chỉ hiện thông báo, không khoá nút, không retry, không đếm ngược. Ở add-to-cart, nút bật lại ngay sau lỗi (có test).
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #113):
    ```
    Route edge lỗi (kể cả 429) thì SDK chuyển sang presigned. Riêng edge GenAI (genai-uploads) khi 429 thì dừng luôn và hiện câu 429. Presigned (upload-url) lỗi thì chuyển sang photo-upload. Câu 429 chỉ hiện khi route cuối cũng trả 429. Nếu route cuối lỗi mạng thì hiện câu lỗi mạng sẵn có, lỗi 500 thì hiện câu lỗi upload chung.
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #114):
    ```
    Rate limit của provider là đường khác: upload ở trạng thái failed với error_message = rate_limit_exceeded (response poll vẫn HTTP 200). SDK hiện câu của key rate_limit_exceeded ("…Too many requests are being processed right now."). Đường này không đi qua nhánh mới và giữ nguyên.
    ```
  - Jira TIB-5539 comment #55557, huytv (dev), 2026-10-23 (dòng #115):
    ```
    Portal đã thêm request_rate_limited và request_rate_limited_retry_after trong block General error messages của product page content
    ```
- **File đính kèm cho claim này:** không có

