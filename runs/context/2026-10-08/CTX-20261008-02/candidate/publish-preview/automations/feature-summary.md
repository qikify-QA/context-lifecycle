# Automations — list, builder (trigger/step), test dry-run, run history và Reports
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **automation-list** — Danh sách automation, trạng thái, duplicate và xoá: 26 KB item; checklist 18 check (STRONG 2 / BASELINE 10 / NONE 6)
- **automation-builder** — Dựng và lưu flow automation trên canvas (thêm/kéo node, Save, Activate, sửa flow Active): 38 KB item; checklist 19 check (STRONG 5 / BASELINE 7 / NONE 7)
- **automation-triggers-and-entry** — Trigger khởi động flow và luật contact vào flow (re-entry, chống lặp, nguồn không kích hoạt): 23 KB item; checklist 11 check (STRONG 3 / BASELINE 6 / NONE 2)
- **automation-steps** — Cấu hình và hành vi các step: Wait, Conditional split, Send email, Update contact field: 61 KB item; checklist 25 check (STRONG 5 / BASELINE 13 / NONE 7)
- **automation-test-run** — Test this flow (dry-run) trước khi bật: 7 KB item; checklist 6 check (STRONG 1 / BASELINE 4 / NONE 1)
- **automation-run-history** — Run history và run detail của flow: 37 KB item; checklist 18 check (STRONG 4 / BASELINE 8 / NONE 6)
- **automation-reports** — Automation Reports — số liệu của flow: 27 KB item; checklist 14 check (STRONG 6 / BASELINE 3 / NONE 5)

## Knowledge

- KB item: 219 (object-level 0) — CONFIRMED_EXPECTED 36 (spec_doc 36, test_case 0), OBSERVED_CURRENT 131, INFERRED 52.
- Checklist: STRONG 26 · BASELINE 51 · NONE/NEEDS_CONFIRMATION 34.
- Open questions: CONFLICT 3 · NEEDS_CONFIRMATION 24 · OPEN_ISSUE 21 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
