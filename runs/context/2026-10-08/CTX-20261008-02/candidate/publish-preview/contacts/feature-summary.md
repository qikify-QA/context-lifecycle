# Contacts — danh sách/tìm kiếm, tạo/sửa, chi tiết, import/export CSV và custom field dùng chung
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **contact-list-and-search** — Danh sách Contacts và tìm kiếm: 20 KB item; checklist 13 check (STRONG 2 / BASELINE 7 / NONE 4)
- **contact-create-and-edit** — Tạo và sửa contact (dialog New/Edit contact): 47 KB item; checklist 34 check (STRONG 15 / BASELINE 13 / NONE 6)
- **contact-detail** — Xem chi tiết một contact: 13 KB item; checklist 9 check (STRONG 1 / BASELINE 5 / NONE 3)
- **contact-import** — Import contacts từ CSV: 27 KB item; checklist 16 check (STRONG 0 / BASELINE 8 / NONE 8)
- **contact-export** — Export contacts ra CSV: 14 KB item; checklist 9 check (STRONG 2 / BASELINE 6 / NONE 1)
- **custom-fields** — Quản lý custom field của contact: 44 KB item; checklist 25 check (STRONG 11 / BASELINE 9 / NONE 5)

## Knowledge

- KB item: 169 (object-level 4) — CONFIRMED_EXPECTED 38 (spec_doc 38, test_case 0), OBSERVED_CURRENT 98, INFERRED 33.
- Checklist: STRONG 31 · BASELINE 48 · NONE/NEEDS_CONFIRMATION 27.
- Open questions: CONFLICT 4 · NEEDS_CONFIRMATION 16 · OPEN_ISSUE 22 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
