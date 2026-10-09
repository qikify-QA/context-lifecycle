# Email content — Email library (đang đổi tên Templates), Email editor, Saved blocks và merge tag
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **email-library** — Email library (đang đổi tên Templates): list, tạo, import HTML, duplicate, xoá, preview: 49 KB item; checklist 25 check (STRONG 3 / BASELINE 12 / NONE 10)
- **email-editor** — Soạn email bằng editor kéo-thả: 31 KB item; checklist 21 check (STRONG 3 / BASELINE 11 / NONE 7)
- **saved-blocks** — Saved blocks — lưu và tái dùng section giữa nhiều email: 36 KB item; checklist 19 check (STRONG 7 / BASELINE 7 / NONE 5)
- **merge-tags** — Merge tag / biến cá nhân hoá trong nội dung email: 20 KB item; checklist 13 check (STRONG 2 / BASELINE 5 / NONE 6)

## Knowledge

- KB item: 136 (object-level 0) — CONFIRMED_EXPECTED 22 (spec_doc 22, test_case 0), OBSERVED_CURRENT 72, INFERRED 42.
- Checklist: STRONG 15 · BASELINE 35 · NONE/NEEDS_CONFIRMATION 28.
- Open questions: CONFLICT 3 · NEEDS_CONFIRMATION 28 · OPEN_ISSUE 14 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
