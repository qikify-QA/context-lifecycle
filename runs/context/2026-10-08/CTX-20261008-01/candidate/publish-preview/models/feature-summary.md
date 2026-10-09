# Models — catalog model/provider (kể cả model nội bộ Teeinblue) và Playground chạy model trực tiếp
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **model-catalog** — Catalog model & provider (kể cả model nội bộ Teeinblue): 20 KB item; checklist 18 check (STRONG 7 / BASELINE 7 / NONE 4)
- **model-playground** — Model Playground — chạy model trực tiếp, chọn provider, Form/JSON, Schema, tab API: 34 KB item; checklist 26 check (STRONG 1 / BASELINE 16 / NONE 9)

## Knowledge

- KB item: 58 (object-level 4) — CONFIRMED_EXPECTED 6 (spec_doc 6, test_case 0), OBSERVED_CURRENT 41, INFERRED 11.
- Checklist: STRONG 8 · BASELINE 23 · NONE/NEEDS_CONFIRMATION 13.
- Open questions: CONFLICT 0 · NEEDS_CONFIRMATION 10 · OPEN_ISSUE 8 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
