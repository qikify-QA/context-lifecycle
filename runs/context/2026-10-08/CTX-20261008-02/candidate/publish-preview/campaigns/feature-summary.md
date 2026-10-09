# Campaigns — list & folder, wizard 4 bước, preview & test, gửi/lên lịch, report & Analytics API
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **campaign-list-and-folders** — Danh sách campaign, filter/search, folder, duplicate và xoá: 41 KB item; checklist 30 check (STRONG 10 / BASELINE 12 / NONE 8)
- **campaign-wizard** — Soạn campaign qua wizard 4 bước (Details → Sender → Recipients → Contents): 61 KB item; checklist 43 check (STRONG 18 / BASELINE 15 / NONE 10)
- **campaign-preview-and-test** — Preview & test send campaign: 6 KB item; checklist 8 check (STRONG 0 / BASELINE 6 / NONE 2)
- **campaign-send-and-schedule** — Gửi ngay / lên lịch campaign và điều kiện được gửi: 19 KB item; checklist 17 check (STRONG 7 / BASELINE 6 / NONE 4)
- **campaign-report** — Campaign report và Analytics API (định nghĩa số liệu delivery/open/click/unsubscribe): 72 KB item; checklist 37 check (STRONG 17 / BASELINE 9 / NONE 11)

## Knowledge

- KB item: 199 (object-level 0) — CONFIRMED_EXPECTED 67 (spec_doc 67, test_case 0), OBSERVED_CURRENT 89, INFERRED 43.
- Checklist: STRONG 52 · BASELINE 48 · NONE/NEEDS_CONFIRMATION 35.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 32 · OPEN_ISSUE 14 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
