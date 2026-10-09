# Deliverability — sổ suppression (bounce/complaint), sổ consent (unsubscribe), chặn lúc gửi và pipeline sự kiện SES
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **suppression-list-management** — Xem và gỡ suppression / unsubscribe (trang Suppressions + Portal API): 28 KB item; checklist 20 check (STRONG 5 / BASELINE 9 / NONE 6)
- **bounce-complaint-suppression** — Tự động suppress khi hard bounce, complaint, soft bounce lặp lại: 16 KB item; checklist 12 check (STRONG 9 / BASELINE 1 / NONE 2)
- **send-time-suppression-check** — Chặn gửi tới địa chỉ bị suppress hoặc đã unsubscribe ở mọi lane gửi: 13 KB item; checklist 10 check (STRONG 4 / BASELINE 3 / NONE 3)
- **ses-event-pipeline** — Thu nhận sự kiện SES (SNS→SQS→worker), lưu ses_events và giám sát region: 15 KB item; checklist 10 check (STRONG 7 / BASELINE 0 / NONE 3)
- **unsubscribe-handling** — Link unsubscribe, one-click header và ghi nhận opt-out của người nhận: 16 KB item; checklist 12 check (STRONG 7 / BASELINE 1 / NONE 4)

## Knowledge

- KB item: 89 (object-level 1) — CONFIRMED_EXPECTED 51 (spec_doc 51, test_case 0), OBSERVED_CURRENT 21, INFERRED 17.
- Checklist: STRONG 32 · BASELINE 14 · NONE/NEEDS_CONFIRMATION 18.
- Open questions: CONFLICT 2 · NEEDS_CONFIRMATION 16 · OPEN_ISSUE 8 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
