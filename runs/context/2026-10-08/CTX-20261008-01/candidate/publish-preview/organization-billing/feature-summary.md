# Organization & Billing (nhóm 'Account' trên sidebar + Dashboard) — org/member/role, subscription/credit/rate limit, analytics
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **organization-members** — Organization — General / Members / Activity (invite, leave, quyền sở hữu): 13 KB item; checklist 22 check (STRONG 11 / BASELINE 2 / NONE 9)
- **roles-permissions** — Roles — ma trận quyền cố định Owner/Admin/Editor/Viewer: 7 KB item; checklist 15 check (STRONG 10 / BASELINE 0 / NONE 5)
- **credits-and-rate-limits** — Subscription, credit & rate limit (free vs paid tier, 402/429, overage): 21 KB item; checklist 19 check (STRONG 7 / BASELINE 4 / NONE 8)
- **usage-analytics** — Analytics & Dashboard — log request, usage theo thời gian, metrics model: 10 KB item; checklist 15 check (STRONG 10 / BASELINE 0 / NONE 5)

## Knowledge

- KB item: 56 (object-level 5) — CONFIRMED_EXPECTED 38 (spec_doc 38, test_case 0), OBSERVED_CURRENT 17, INFERRED 1.
- Checklist: STRONG 38 · BASELINE 6 · NONE/NEEDS_CONFIRMATION 27.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 26 · OPEN_ISSUE 17 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
