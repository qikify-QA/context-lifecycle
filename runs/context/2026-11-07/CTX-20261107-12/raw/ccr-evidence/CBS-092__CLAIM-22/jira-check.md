# CBS-092 CLAIM-22 — Jira check
Checked 2026-11-07 via Atlassian MCP (read-only). Timestamps +0700.

Result: **PARTIAL**

| quote (short) | comment id + url | author | date | MATCH/MISMATCH + note |
|---|---|---|---|---|
| Câu hỏi QA: "Có gì được tuyên bố out of scope (ví dụ: bulk edit design settings như font/color/size …)?" | 49047 — https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49047 | linhpt | 2026-08-26 17:35 | PARTIAL — question is not in 49205; it is QA question 15 in comment 49047 (linhpt). Jira text: '…như font/color/size mà khách đã yêu cầu trong TIB-5028) không?'; CCR '…font/color/size …)?' drops ' không' after ')' so the tail fragment ')?' is not verbatim. Meaning unchanged. |
| → Out of scope trong PR này: bulk edit Design settings kiểu font / color / size. … chưa nằm trong scope này. | 49205 — https://ownego.atlassian.net/browse/TIB-5299?focusedCommentId=49205 | tuanva | 2026-08-27 15:44 | MATCH — C5, verbatim |

Ticket status: TIB-5299 Done; TIB-5412 Done.
