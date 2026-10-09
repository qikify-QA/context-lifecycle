# Tasks — yêu cầu generate (/process), vòng đời task, ảnh output và Task History
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **generate-request** — Gửi yêu cầu generate qua POST /process (model_id hoặc template_id): 10 KB item; checklist 9 check (STRONG 5 / BASELINE 0 / NONE 4)
- **task-status-and-output** — Theo dõi trạng thái task (polling / SSE) và lấy ảnh output: 14 KB item; checklist 10 check (STRONG 5 / BASELINE 1 / NONE 4)
- **task-history-list** — Task History — danh sách, search, filter: 22 KB item; checklist 17 check (STRONG 0 / BASELINE 10 / NONE 7)
- **task-detail-inspection** — Trang chi tiết task — processing chain, cost breakdown, input thô, logs: 31 KB item; checklist 14 check (STRONG 0 / BASELINE 11 / NONE 3)

## Knowledge

- KB item: 77 (object-level 0) — CONFIRMED_EXPECTED 17 (spec_doc 17, test_case 0), OBSERVED_CURRENT 50, INFERRED 10.
- Checklist: STRONG 10 · BASELINE 22 · NONE/NEEDS_CONFIRMATION 18.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 15 · OPEN_ISSUE 10 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
