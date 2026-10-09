# Quick order CSV & SKU Order — đặt nhanh theo SKU / CSV ở Customer Account, hành động sau khi buyer tạo order, tải catalog CSV
**Published context version:** 1

**Product:** Duos B2B · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-09

## Features

- **sku-quick-order** — Đặt nhanh theo SKU: 15 KB item; checklist 10 check (STRONG 1 / BASELINE 1 / NONE 8)
- **csv-upload-order** — Đặt hàng bằng upload CSV: 5 KB item; checklist 8 check (STRONG 0 / BASELINE 1 / NONE 7)
- **order-creation-action** — Hành động sau khi buyer tạo order từ Quick order: 15 KB item; checklist 10 check (STRONG 2 / BASELINE 3 / NONE 5)
- **catalog-download** — Tải catalog CSV: 6 KB item; checklist 8 check (STRONG 3 / BASELINE 1 / NONE 4)

## Knowledge

- KB item: 42 (object-level 1) — CONFIRMED_EXPECTED 7 (spec_doc 7, test_case 0), OBSERVED_CURRENT 13, INFERRED 22.
- Checklist: STRONG 6 · BASELINE 6 · NONE/NEEDS_CONFIRMATION 24.
- Open questions: CONFLICT 1 · NEEDS_CONFIRMATION 19 · OPEN_ISSUE 6 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project DUOS, snapshot v1 ngày 2026-10-09): QA business rule Duos (95 rule, nguồn Jira / quyết định PO-Dev / test case / QA lead, có ngày), Decision log, bộ QA KB Duos theo feature (12 feature + overview, feature map, glossary, known issues, environments) và inventory khảo sát staging 08/10/2026 (merchant, store Plus đang ở Free plan, không có buyer / storefront / Customer Account / checkout). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira (description/AC) hoặc quyết định PO/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS có ngày (không ghi build). Nhãn UI do QA lead xác nhận lưu theo staging và rule chỉ theo ticket chưa duyệt KHÔNG được coi là expected — ghi `OBSERVED_CURRENT`/`INFERRED` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira / quyết định PO-Dev / test case / staging được nêu ngay trong statement. Hành vi chỉ bật theo `users.config` của từng merchant ghi rõ điều kiện config trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
