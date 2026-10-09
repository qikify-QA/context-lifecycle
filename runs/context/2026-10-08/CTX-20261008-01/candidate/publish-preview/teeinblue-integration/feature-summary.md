# Teeinblue integration — gắn template ImagenHub vào Photo Upload layer ('[ImagenHub] AI Effect') của Teeinblue
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **teeinblue-ai-effect-setup** — Thiết lập '[ImagenHub] AI Effect' trên Photo Upload layer của Teeinblue: 11 KB item; checklist 14 check (STRONG 8 / BASELINE 0 / NONE 6)

## Knowledge

- KB item: 11 (object-level 0) — CONFIRMED_EXPECTED 11 (spec_doc 11, test_case 0), OBSERVED_CURRENT 0, INFERRED 0.
- Checklist: STRONG 8 · BASELINE 0 · NONE/NEEDS_CONFIRMATION 6.
- Open questions: CONFLICT 0 · NEEDS_CONFIRMATION 3 · OPEN_ISSUE 2 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
