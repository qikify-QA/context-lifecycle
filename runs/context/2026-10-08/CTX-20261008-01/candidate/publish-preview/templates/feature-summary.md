# Templates — recipe tái sử dụng (model + prompt/variables + default inputs + post-processing + fallback), quản lý trên portal và gọi qua template_id
**Published context version:** 1

**Product:** ImagenHub · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-08

## Features

- **template-library** — Duyệt & tổ chức thư viện template (list/search/filter, category, public vs private, import public template): 19 KB item; checklist 20 check (STRONG 5 / BASELINE 10 / NONE 5)
- **template-authoring** — Tạo / sửa / xoá template: 30 KB item; checklist 21 check (STRONG 5 / BASELINE 11 / NONE 5)
- **template-post-processing** — Cấu hình post-processing steps và hành vi chain khi 1 step lỗi: 17 KB item; checklist 11 check (STRONG 0 / BASELINE 10 / NONE 1)
- **template-variables** — Biến {{variables}} trong prompt template: 19 KB item; checklist 8 check (STRONG 0 / BASELINE 7 / NONE 1)
- **template-run-history** — Chạy template từ portal và xem Run history (lightbox, phân trang, nguồn URL ảnh): 25 KB item; checklist 13 check (STRONG 2 / BASELINE 9 / NONE 2)
- **fallback-template** — Fallback template (IGH-226): 32 KB item; checklist 22 check (STRONG 18 / BASELINE 1 / NONE 3)
- **dynamic-upload-ratio** — Dynamic Upload Ratio (Aspect Ratio = Auto): 17 KB item; checklist 11 check (STRONG 6 / BASELINE 2 / NONE 3)

## Knowledge

- KB item: 162 (object-level 3) — CONFIRMED_EXPECTED 42 (spec_doc 40, test_case 2), OBSERVED_CURRENT 102, INFERRED 18.
- Checklist: STRONG 36 · BASELINE 50 · NONE/NEEDS_CONFIRMATION 20.
- Open questions: CONFLICT 0 · NEEDS_CONFIRMATION 24 · OPEN_ISSUE 22 — chi tiết trong `open-questions.md` của object này.

## Nguồn & cách đọc độ tin cậy

- Nguồn là bộ tài liệu QA tự biên soạn trên Testlane (project IGH, bản v1, upload 2026-10-02): một bản tóm tắt docs chính thức docs.imagenhub.ai (đọc 2026-08-27) và các ghi chép khảo sát/test thật trên portal staging (2026-08-30 → 2026-10-01). Không có quan sát runtime nào của lần publish này.
- `CONFIRMED_EXPECTED` + `spec_doc`: từ docs chính thức, hoặc rule PO/Dev đã chốt (ghi rõ trong `confirmation_source.ref`). `test_case`: test case Testlane đã PASS (không ghi build).
- `OBSERVED_CURRENT`: hiện trạng trên staging tại ngày khảo sát — không phải expected requirement; lệch = cần điều tra. `status: KNOWN_DEFECT` là lỗi đã biết, chỉ dùng làm regression watch.
- `scope.environment` luôn là `documented`; phạm vi docs/prod vs staging vs preview được nêu ngay trong statement.

## Giới hạn đã biết

- Một số tài liệu chi tiết được tham chiếu trong bộ nguồn nhưng không có trên Testlane (API/Provider keys, Organization, Webhooks & Alerts, Subscription & pricing, MCP setup, Known bugs, Staging API endpoints) — các mảng đó chỉ có thông tin ở mức tóm tắt, phần còn lại ghi là open question.
- Role thực hiện thao tác chưa được tài liệu nêu rõ cho hầu hết object; xem open question về role.
