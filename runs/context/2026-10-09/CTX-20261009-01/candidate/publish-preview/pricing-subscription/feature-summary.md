# Pricing & Subscription — modular pricing theo module, tier theo Shopify plan, trang Subscription, gói gợi ý / trial, banner giữ giá cũ, khoá tính năng theo module đã mua và theo Shopify Plus
**Published context version:** 1

**Product:** Duos B2B · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-09

## Features

- **module-pricing-and-plan-tiers** — Giá module theo tier Shopify plan, chiết khấu và trial theo đợt giá: 17 KB item; checklist 12 check (STRONG 3 / BASELINE 1 / NONE 8)
- **subscription-page** — Chọn module, subscribe và huỷ trên trang Subscription: 13 KB item; checklist 11 check (STRONG 2 / BASELINE 1 / NONE 8)
- **suggested-plans-and-trial** — Gói gợi ý và mở khoá 30-day free trial (non-Plus): 7 KB item; checklist 8 check (STRONG 3 / BASELINE 3 / NONE 2)
- **legacy-price-retention-banner** — Banner giữ giá cũ cho store đang trả giá cũ: 8 KB item; checklist 8 check (STRONG 0 / BASELINE 0 / NONE 8)
- **module-entitlement-gating** — Khoá tính năng theo module đã mua và theo Shopify Plus: 10 KB item; checklist 8 check (STRONG 4 / BASELINE 1 / NONE 3)

## Knowledge

- KB item: 55 (object-level 0) — CONFIRMED_EXPECTED 12 (spec_doc 6, test_case 0), OBSERVED_CURRENT 10, INFERRED 33.
- Checklist: STRONG 12 · BASELINE 6 · NONE/NEEDS_CONFIRMATION 29.
- Open questions: CONFLICT 3 · NEEDS_CONFIRMATION 29 · OPEN_ISSUE 11 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project DUOS, snapshot v1 ngày 2026-10-09): QA business rule Duos (95 rule, nguồn Jira / quyết định PO-Dev / test case / QA lead, có ngày), Decision log, bộ QA KB Duos theo feature (12 feature + overview, feature map, glossary, known issues, environments) và inventory khảo sát staging 08/10/2026 (merchant, store Plus đang ở Free plan, không có buyer / storefront / Customer Account / checkout). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: Jira (description/AC) hoặc quyết định PO/Dev có ngày, do QA tóm tắt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS có ngày (không ghi build). Nhãn UI do QA lead xác nhận lưu theo staging và rule chỉ theo ticket chưa duyệt KHÔNG được coi là expected — ghi `OBSERVED_CURRENT`/`INFERRED` kèm open question.
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi Jira / quyết định PO-Dev / test case / staging được nêu ngay trong statement. Hành vi chỉ bật theo `users.config` của từng merchant ghi rõ điều kiện config trong statement. Item `status: UNRESOLVED` thuộc một `conflict_group` chưa phân xử — không dùng làm oracle.

## Giới hạn đã biết

- Tài liệu câu hỏi mở của QA, bản đầy đủ business rule / inventory, references và bug log không có trong bộ nguồn — những câu hỏi được tham chiếu tới đó chỉ có ở dạng câu hỏi tại chỗ, ghi là open question; không suy diễn nội dung.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
