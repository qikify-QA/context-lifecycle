### CLAIM-18

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5539; skill-rules-audit.md #112, #116 (rule `sdk-429-shopper-message`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5539
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-23
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #112, rule `sdk-429-shopper-message`, nguồn ghi: PO chốt qua Slack + dev huytv, TIB-5539, 2026-10-23:
    ```
    `Retry-After`: <60s hiện giây (số ít/nhiều), ≥60s làm tròn lên phút; 0, âm, rác, rỗng, HTTP-date đã qua, >3600 → câu chung; thập phân làm tròn lên; HTTP-date tương lai tính số giây còn lại.
    ```
  - Jira TIB-5539 comment #55557, huytv, 2026-10-23, khớp một phần:
    ```
    Dưới 60 giây hiện số giây: "in 1 second", "in 45 seconds". Từ 60 giây trở lên làm tròn lên thành phút: 60s → "1 minute", 61s và 120s → "2 minutes", 3600s → "60 minutes".
    ```
  - skill-rules-audit.md #116, rule `sdk-429-shopper-message`, nguồn ghi: PO chốt qua Slack + dev huytv, TIB-5539, 2026-10-23:
    ```
    Endpoint có trả/expose `Retry-After` hay không là việc của backend, không do SDK quyết định → mock để test SDK parse, quan sát header thật riêng.
    ```
  - Jira TIB-5539 comment #55557, huytv, 2026-10-23, khớp một phần:
    ```
    Nếu backend không expose header qua CORS thì giá trị là null, buyer luôn thấy câu chung. Đúng như QA phân tích. Endpoint nào trả header và có expose hay không là phía backend, cần xác nhận với backend.
    ```
- **File đính kèm cho claim này:** không có

