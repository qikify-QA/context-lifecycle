# Security & Abuse guard (BE, MTRO-92) — giới hạn lạm dụng truy cập, kiểm nội dung, tự dừng gửi/trạng thái workspace, màn staff, an toàn mail giao dịch
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **account-and-access-abuse-limits** — Giới hạn lạm dụng ở đăng nhập/đăng ký, mời thành viên và API key: 32 KB item; checklist 22 check (STRONG 15 / BASELINE 1 / NONE 6)
- **content-screening** — Kiểm nội dung email trước khi lưu/gửi: 6 KB item; checklist 8 check (STRONG 6 / BASELINE 0 / NONE 2)
- **sending-suspension-and-staff-review** — Tự dừng gửi khi bounce/complaint vượt ngưỡng, trạng thái workspace và màn staff review: 52 KB item; checklist 30 check (STRONG 25 / BASELINE 0 / NONE 5)
- **transactional-mail-safeguards** — Merge tag và link huỷ trong mail giao dịch (transactional API): 8 KB item; checklist 9 check (STRONG 6 / BASELINE 0 / NONE 3)

## Knowledge

- KB item: 99 (object-level 1) — CONFIRMED_EXPECTED 76 (spec_doc 76, test_case 0), OBSERVED_CURRENT 3, INFERRED 20.
- Checklist: STRONG 52 · BASELINE 1 · NONE/NEEDS_CONFIRMATION 16.
- Open questions: CONFLICT 2 · NEEDS_CONFIRMATION 10 · OPEN_ISSUE 8 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
