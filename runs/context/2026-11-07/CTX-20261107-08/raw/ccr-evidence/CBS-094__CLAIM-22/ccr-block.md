# Khối B — Môi trường

| Claim ID | Feature | `type` | Staging | Production | Cách test trên staging | Người, ngày |
|---|---|---|---|---|---|---|
| `CLAIM-22` | sdk/genai-personalization-runtime | `ALTERNATIVE_SETUP` | Muốn test outage của Nano Banana 2.1 thì Dev chuyển 2.1 sang "down" theo yêu cầu rồi chuyển lại; không cần override per-user hay retirement entry. | không rõ | Nhờ Dev chuyển 2.1 sang down trên staging, chạy generate, rồi nhờ Dev chuyển lại. Chưa từng làm: Dev sau đó nói không cần test lại fallback cho 2.1. Nguyên văn (Jira TIB-5573, trả lời Q5): "- Q5: Same as TIB-5554: Dev switches 2.1 to "down" on staging on request and switches it back after. No per-user override or retirement entry is needed." | Dev (chinhdt), 2026-10-30 |
