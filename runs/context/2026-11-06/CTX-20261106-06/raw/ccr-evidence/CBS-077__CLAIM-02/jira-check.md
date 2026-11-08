Jira TIB-5548 comment #53876, tinhpt (dev), tạo 2026-10-08, sửa 2026-10-13. Đọc bằng listJiraIssueComments ngày 2026-11-06, chép nguyên văn phần liên quan:
### 1. Invalid merchant API key (Printful, ShineOn, Picanova)
These are the providers where the merchant enters their own key in **Extras → Fulfillments**.
### 3. Provider-side errors (staging only, needs a dev)
The merchant can't trigger these from the UI, because these providers use teeinblue's own key. A dev can change the key or URL in the staging `.env` temporarily.
| # | Setup | Expected toast |
| --- | --- | --- |
| 3.1 | Invalid `MERCHIZE_CATALOG_API_KEY` | `[Merchize] Unauthorized: Invalid username or password` |
| 3.2 | Invalid `MARKETPRINT_PARTNER_TOKEN` | `[MarketPrint] Unauthorized. Partner token is missing or invalid` |
| 3.3 | Invalid CustomCat key | `[CustomCat] Access denied, check the API key in Extras/Fulfillments` (403). It used to say "Cannot find product". |
| 3.4 | Invalid Printify key | `[Printify] Unauthenticated` |
| 3.5 | Point a provider's API URL at an unreachable host (e.g. `https://10.255.255.1/`), or at a URL that returns a 5xx | `[<Provider>] Could not connect` (or the provider's own error text), status **503**. **The toast must appear**, and the Network tab must show our JSON body, not a Cloudflare HTML page. |
| 3.6 | Invalid Shirtee or Printbelle key (both answer HTTP 200 with an error code) | `[Shirtee] Invalid Api key` / `[Printbelle] User does not exist or incorrect password.` Status 400. |
Phần comment này không có câu nào nói một provider dùng key teeinblue khi merchant chưa nhập và dùng key merchant khi đã nhập.
