# Segments — tập contact động theo điều kiện (list, builder, cách đánh giá audience)
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **segment-list-management** — Danh sách segment: xem, duplicate, export, xoá: 22 KB item; checklist 19 check (STRONG 10 / BASELINE 4 / NONE 5)
- **segment-builder** — Tạo/sửa segment bằng builder điều kiện: 50 KB item; checklist 32 check (STRONG 18 / BASELINE 8 / NONE 6)
- **segment-audience-evaluation** — Cách segment xác định audience (chỉ Subscribed, loại suppressed, live vs khi Run, query hỏng lúc gửi): 10 KB item; checklist 8 check (STRONG 3 / BASELINE 1 / NONE 4)

## Knowledge

- KB item: 82 (object-level 0) — CONFIRMED_EXPECTED 34 (spec_doc 34, test_case 0), OBSERVED_CURRENT 37, INFERRED 10.
- Checklist: STRONG 31 · BASELINE 13 · NONE/NEEDS_CONFIRMATION 15.
- Open questions: CONFLICT 0 · NEEDS_CONFIRMATION 13 · OPEN_ISSUE 10 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
