# Mailtro ID — đăng ký, xác minh email, tạo workspace đầu tiên, đăng nhập, 2FA, quên/đặt lại mật khẩu, chọn workspace và bảo mật tài khoản cá nhân (Account settings & 2FA)
**Published context version:** 1

**Product:** Mailtro · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **sign-in-and-workspace-selection** — Đăng nhập Mailtro ID, chọn workspace và phiên đăng nhập: 24 KB item; checklist 15 check (STRONG 3 / BASELINE 5 / NONE 7)
- **two-factor-challenge** — Xác thực hai lớp khi đăng nhập (mã TOTP / recovery code): 21 KB item; checklist 15 check (STRONG 4 / BASELINE 7 / NONE 4)
- **signup-and-workspace-creation** — Tạo tài khoản, xác minh email và tạo workspace đầu tiên (kể cả đăng ký qua link mời): 32 KB item; checklist 21 check (STRONG 10 / BASELINE 6 / NONE 5)
- **password-reset** — Quên mật khẩu và đặt lại mật khẩu: 21 KB item; checklist 19 check (STRONG 0 / BASELINE 13 / NONE 6)
- **account-security-settings** — Account settings và bật/tắt 2FA, recovery codes: 37 KB item; checklist 21 check (STRONG 7 / BASELINE 6 / NONE 8)

## Knowledge

- KB item: 136 (object-level 1) — CONFIRMED_EXPECTED 31 (spec_doc 31, test_case 0), OBSERVED_CURRENT 76, INFERRED 29.
- Checklist: STRONG 24 · BASELINE 37 · NONE/NEEDS_CONFIRMATION 30.
- Open questions: CONFLICT 2 · NEEDS_CONFIRMATION 26 · OPEN_ISSUE 14 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project MTRO, snapshot v1 ngày 2026-10-08): QA business rule Mailtro (rule có nguồn Jira AC / quyết định PO-Dev / QA lead, có ngày), Decision log, bộ QA KB Mailtro theo feature, known issues và inventory khảo sát staging (29/09 và 01/10/2026, role Owner). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira AC hoặc quyết định PO/BA/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build). Quyết định do QA lead tự chốt theo bản dựng staging KHÔNG được coi là expected — ghi `OBSERVED_CURRENT` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira AC / quyết định PO-Dev / staging / bundle / production được nêu ngay trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
