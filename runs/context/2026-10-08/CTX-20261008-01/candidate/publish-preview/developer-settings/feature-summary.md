# Developer settings (nhóm 'Dev' trên sidebar) — API Keys, Provider Keys (BYOK), Webhooks, Alerts, AI Assistant (MCP)
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **api-keys** — API Keys — tạo/xoá key, credit limit, expiration: 9 KB item; checklist 16 check (STRONG 6 / BASELINE 4 / NONE 6)
- **provider-keys-byok** — Provider Keys (BYOK) & Fail-Safe: 18 KB item; checklist 17 check (STRONG 9 / BASELINE 2 / NONE 6)
- **task-webhooks** — Webhooks — task callback (task.succeeded / task.failed), chữ ký, delivery: 15 KB item; checklist 17 check (STRONG 12 / BASELINE 0 / NONE 5)
- **account-alerts** — Alerts — channel HTTP/Lark cho điều kiện tài khoản: 20 KB item; checklist 21 check (STRONG 16 / BASELINE 1 / NONE 4)
- **mcp-server** — AI Assistant (MCP) — gọi ImagenHub từ AI agent: 11 KB item; checklist 13 check (STRONG 7 / BASELINE 3 / NONE 3)

## Knowledge

- KB item: 81 (object-level 8) — CONFIRMED_EXPECTED 63 (spec_doc 63, test_case 0), OBSERVED_CURRENT 11, INFERRED 7.
- Checklist: STRONG 50 · BASELINE 10 · NONE/NEEDS_CONFIRMATION 24.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 26 · OPEN_ISSUE 5 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
