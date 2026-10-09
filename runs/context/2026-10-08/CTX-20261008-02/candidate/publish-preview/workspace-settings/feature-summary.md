# Workspace settings — Team members & role/quyền, API keys & Public API, Claude connector, Workspace settings, Sending domains
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **team-members-and-invitations** — Mời thành viên và quản lý danh sách Team members: 21 KB item; checklist 14 check (STRONG 2 / BASELINE 5 / NONE 7)
- **roles-and-permissions** — Role Owner/Admin/Member và ma trận quyền: 17 KB item; checklist 10 check (STRONG 7 / BASELINE 0 / NONE 3)
- **api-keys-and-public-api** — API keys và truy cập Public API: 25 KB item; checklist 18 check (STRONG 5 / BASELINE 8 / NONE 5)
- **claude-connector** — Claude connector (MCP): 10 KB item; checklist 8 check (STRONG 2 / BASELINE 3 / NONE 3)
- **workspace-profile-settings** — Workspace settings — đổi tên workspace, chuyển quyền sở hữu: 10 KB item; checklist 7 check (STRONG 0 / BASELINE 2 / NONE 5)
- **sending-domains** — Thêm và xác thực sending domain: 19 KB item; checklist 14 check (STRONG 2 / BASELINE 6 / NONE 6)

## Knowledge

- KB item: 102 (object-level 0) — CONFIRMED_EXPECTED 21 (spec_doc 21, test_case 0), OBSERVED_CURRENT 60, INFERRED 21.
- Checklist: STRONG 18 · BASELINE 24 · NONE/NEEDS_CONFIRMATION 29.
- Open questions: CONFLICT 3 · NEEDS_CONFIRMATION 27 · OPEN_ISSUE 15 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
