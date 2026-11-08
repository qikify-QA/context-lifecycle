Trích từ Jira TIB-5510 comment #56209, phatnt (dev), 2026-11-02, đọc qua MCP 2026-11-06, đã bỏ thẻ định dạng.

Thêm đoạn script sau vào file layout của theme Shopify (theme.liquid): <script> window.teeinblue = window.teeinblue || {}; window.teeinblue.blockAtcUnavailableAddon = true; </script> (Khi biến này được set true, SDK sẽ kích hoạt logic chặn ATC và hiển thị thông báo lỗi).
