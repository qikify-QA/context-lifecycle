# B2B Shopping List — list đã lưu, gửi duyệt / duyệt theo role, re-approval sau order, lưu sản phẩm / cart vào list, list do merchant quản lý / tạo hộ, reminder re-order
**Published context version:** 1

**Product:** Duos B2B · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-09

## Features

- **shopping-list-approval** — Gửi duyệt và duyệt shopping list theo role: 12 KB item; checklist 11 check (STRONG 3 / BASELINE 1 / NONE 7)
- **re-approval-after-order** — Đưa list đã duyệt về chờ duyệt sau mỗi order: 9 KB item; checklist 9 check (STRONG 4 / BASELINE 1 / NONE 4)
- **save-and-add-to-cart** — Lưu sản phẩm / cart vào shopping list và thêm list vào cart: 8 KB item; checklist 8 check (STRONG 0 / BASELINE 1 / NONE 7)
- **merchant-managed-lists** — Merchant quản lý, tạo list hộ và chia sẻ link: 3 KB item; checklist 7 check (STRONG 2 / BASELINE 1 / NONE 4)
- **reorder-reminder** — Nhắc re-order theo lịch: 5 KB item; checklist 7 check (STRONG 0 / BASELINE 1 / NONE 6)

## Knowledge

- KB item: 39 (object-level 2) — CONFIRMED_EXPECTED 10 (spec_doc 10, test_case 0), OBSERVED_CURRENT 9, INFERRED 20.
- Checklist: STRONG 9 · BASELINE 5 · NONE/NEEDS_CONFIRMATION 28.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 13 · OPEN_ISSUE 6 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project DUOS, snapshot v1 ngày 2026-10-09): QA business rule Duos (95 rule, nguồn Jira / quyết định PO-Dev / test case / QA lead, có ngày), Decision log, bộ QA KB Duos theo feature (12 feature + overview, feature map, glossary, known issues, environments) và inventory khảo sát staging 08/10/2026 (merchant, store Plus đang ở Free plan, không có buyer / storefront / Customer Account / checkout). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira (description/AC) hoặc quyết định PO/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS có ngày (không ghi build). Nhãn UI do QA lead xác nhận lưu theo staging và rule chỉ theo ticket chưa duyệt KHÔNG được coi là expected — ghi `OBSERVED_CURRENT`/`INFERRED` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira / quyết định PO-Dev / test case / staging được nêu ngay trong statement. Hành vi chỉ bật theo `users.config` của từng merchant ghi rõ điều kiện config trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
