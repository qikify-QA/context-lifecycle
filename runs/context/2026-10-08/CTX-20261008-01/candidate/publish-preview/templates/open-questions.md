# Open Questions — Templates — recipe tái sử dụng (model + prompt/variables + default inputs + post-processing + fallback), quản lý trên portal và gọi qua template_id

Tổng: 46 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 24
- OPEN_ISSUE: 22

> Xung đột dùng chung nhiều object (CONF-IGH-product-01) được theo dõi ở **OQ-organization-billing-010** trong open-questions của object `organization-billing`; phía object này: KB-005, KB-006.

## OQ-templates-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Role của object templates chưa được chỉ định (bootstrap để role trống). Tài liệu trải trên nhiều role: Owner/Admin/Editor/Viewer của Organization (ma trận quyền trong docs chính thức: Templates — Owner/Admin/Editor \"Manage\", Viewer \"View\") và caller API. Quan sát thực tế chỉ có Viewer (TC-IGH-204) và Admin của org Free plan; Editor và Owner chưa có quan sát nào trên trang Templates/Fallback. Cần chốt role mặc định cho checklist của object và expected cho Editor/Owner.",
  "kb_ids": [
    "KB-046",
    "KB-047",
    "KB-048",
    "KB-126",
    "KB-127",
    "KB-138",
    "KB-139"
  ]
}
```

## OQ-templates-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-library",
  "summary": "Nút hành động trên mỗi card public template trong modal Import (Browse Public Templates) chưa được bấm thử; người viết chỉ phỏng đoán là \"Clone vào org mình\". Hành vi import/clone public template chưa được mô tả.",
  "kb_ids": [
    "KB-021",
    "KB-022"
  ],
  "related_questions": [
    "Nút hành động trên mỗi card template public trong modal Import làm gì (clone vào org?), template sau khi import thuộc người bấm hay organization, và có sửa được mà không ảnh hưởng template public gốc không?",
    "Nút hành động trên card public template trong modal Import làm gì (người viết chỉ phỏng đoán là clone vào org)? Template sau khi import thuộc ai?"
  ],
  "check_ids": [
    "template-library:CHK-017"
  ]
}
```

## OQ-templates-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-library",
  "summary": "Category có phải dữ liệu tổ chức của org (xoá/đổi tên được, ai có quyền) hay cố định? Tài liệu chỉ ghi nhận định của người viết sau khi thấy category trong test data biến mất.",
  "kb_ids": [
    "KB-019",
    "KB-020"
  ],
  "related_questions": [
    "Category có phải dữ liệu tổ chức của org (xoá/đổi tên được, role nào có quyền) hay cố định? Xoá category thì template đang gắn category đó hiển thị gì?",
    "Category có phải dữ liệu tổ chức của org (xoá/đổi tên được, ai có quyền) hay cố định? Xoá category thì template đang gắn category đó ra sao?"
  ],
  "check_ids": [
    "template-library:CHK-019"
  ]
}
```

## OQ-templates-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-authoring",
  "summary": "2 icon action đầu tiên trên mỗi row/card template chưa xác định chức năng (không mở gì khi hover; người viết phỏng đoán Duplicate/Edit-quick).",
  "kb_ids": [
    "KB-038"
  ],
  "related_questions": [
    "Hai icon action đầu tiên trên mỗi dòng/card template làm gì?",
    "Hai icon action đầu tiên trên row/card template làm gì (người viết chỉ phỏng đoán Duplicate/Edit nhanh)?"
  ],
  "check_ids": [
    "template-authoring:CHK-019"
  ]
}
```

## OQ-templates-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-005",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Lỗi đã biết trên staging (2026-09-10): nhấn Escape khi dropdown Category đang mở đóng luôn modal New Template và mất dữ liệu đã điền. Dùng làm regression watch, không phải expected result; chưa có mã bug.",
  "kb_ids": [
    "KB-036"
  ],
  "related_questions": [
    "Trong form New Template, khi dropdown Category đang mở mà người dùng nhấn Escape, hành vi đúng mong muốn là gì — chỉ đóng dropdown và giữ nguyên modal cùng dữ liệu đã điền, hay khác?"
  ],
  "check_ids": [
    "template-authoring:CHK-008"
  ]
}
```

## OQ-templates-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-006",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Lỗi đã biết trên staging (2026-08-30): sau khi xoá template, số đếm phân trang không tự cập nhật tới khi reload. Dùng làm regression watch; chưa có mã bug.",
  "kb_ids": [
    "KB-040"
  ],
  "related_questions": [
    "Sau khi xoá một template, số đếm phân trang trên danh sách Templates có phải cập nhật ngay (không cần chuyển trang hay tải lại) không?"
  ],
  "check_ids": [
    "template-authoring:CHK-016"
  ]
}
```

## OQ-templates-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-authoring",
  "summary": "Trường Prompt của form New Template có bắt buộc không? Tài liệu chỉ ghi nhãn \"Prompt*\" mà không chú thích bắt buộc như Name; không suy required.",
  "kb_ids": [
    "KB-031"
  ],
  "related_questions": [
    "Trường Prompt của form New Template có bắt buộc không?",
    "Trường Prompt trong form New Template có bắt buộc không? Nếu có, thông báo lỗi khi bỏ trống là gì?"
  ],
  "check_ids": [
    "template-authoring:CHK-006"
  ]
}
```

## OQ-templates-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-post-processing",
  "summary": "Cơ chế khi 1 step post-processing lỗi (task vẫn Success, Post-processing Failed, chain dừng, trả ảnh thành công gần nhất, step lỗi được hoàn credit) chỉ được khái quát từ 1 task quan sát trên staging (2026-08-31); chưa có spec nào phát biểu. Cần PO/Dev xác nhận đây là hành vi thiết kế, và xác nhận nguyên nhân lỗi 401 (key bị revoke hay hết hạn).",
  "kb_ids": [
    "KB-061",
    "KB-063",
    "KB-064",
    "KB-065",
    "KB-066",
    "KB-067"
  ],
  "related_questions": [
    "Khi một step post-processing lỗi, việc task vẫn Success, chain dừng, trả ảnh thành công gần nhất và hoàn credit cho step lỗi có phải hành vi thiết kế không?",
    "Lỗi 401 của step là do key provider bị revoke hay hết hạn?"
  ]
}
```

## OQ-templates-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-post-processing",
  "summary": "Docs chính thức nói task.succeeded \"vẫn có thể\" mang post_processing_status báo hậu xử lý lỗi; chưa rõ điều kiện và giá trị cụ thể của field này.",
  "kb_ids": [
    "KB-069"
  ],
  "related_questions": [
    "Khi một step post-processing lỗi, webhook gửi event nào (task.succeeded?) và field post_processing_status có những giá trị nào, xuất hiện trong điều kiện nào?",
    "post_processing_status có những giá trị nào và xuất hiện khi nào?"
  ],
  "check_ids": [
    "template-post-processing:CHK-011"
  ]
}
```

## OQ-templates-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-variables",
  "summary": "Backend /process có PHẢI validate/reject request có biến {{...}} chưa điền không? Hiện chỉ có quan sát: UI portal chặn Run (Form mode) nhưng API /process không validate, gửi nguyên literal {{...}} cho provider, task Success và vẫn tính đủ phí. Hai quan sát ở hai tầng khác nhau, không phải mâu thuẫn cùng phạm vi; không kết luận là bug.",
  "kb_ids": [
    "KB-073",
    "KB-084",
    "KB-085",
    "KB-086"
  ],
  "related_questions": [
    "Backend /process có phải validate/reject request có biến chưa điền không?"
  ]
}
```

## OQ-templates-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-variables",
  "summary": "Form mode không có ô điền giá trị biến — có chủ ý (biến dành cho caller API) hay là gap UX? Tài liệu tự nêu chưa rõ và đề xuất báo team ImagenHub.",
  "kb_ids": [
    "KB-075",
    "KB-082",
    "KB-083"
  ],
  "related_questions": [
    "Khi gọi /process với template_id, giá trị biến {{...}} được truyền qua field nào? Backend có phải validate/từ chối request còn biến chưa điền (hiện portal chặn nhưng API thì không) không? Form mode không có ô điền biến là có chủ ý hay là thiếu sót?",
    "Form mode không có ô điền giá trị biến, và không gợi ý chuyển sang JSON mode khi bị chặn — có chủ ý (biến dành cho caller API) hay là gap trải nghiệm?"
  ],
  "check_ids": [
    "template-variables:CHK-008"
  ]
}
```

## OQ-templates-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-012",
  "type": "OPEN_ISSUE",
  "feature_id": "template-variables",
  "summary": "Tên field và cách truyền giá trị biến template khi gọi /process với template_id không được tài liệu nào mô tả (docs chính thức không nhắc variables) — chưa viết được case API cho biến.",
  "kb_ids": [
    "KB-082",
    "KB-003"
  ],
  "related_questions": [
    "Tên field và cách truyền giá trị biến khi gọi /process với template_id là gì?"
  ]
}
```

## OQ-templates-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-run-history",
  "summary": "Run history của template có NÊN hiển thị run Error không? PO chưa chốt (TC-IGH-252, task Testlane IGH-012); case cần fixture \"template có run Error\" đang blocked. Lưu ý: mô tả lightbox (khảo sát 2026-08-30) liệt kê badge Success/Error, còn khảo sát 2026-10-01 thấy Run history chỉ hiện run Success.",
  "kb_ids": [
    "KB-098",
    "KB-095",
    "KB-099"
  ],
  "related_questions": [
    "Run history của template có nên hiển thị run Error không (TC-IGH-252)?"
  ]
}
```

## OQ-templates-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-run-history",
  "summary": "IGH-261 (đã có trên preview, chưa lên staging): đổi ảnh lightbox, avatar template, ảnh input sang URL công khai cố định không chữ ký, tức link ảnh output xem được vĩnh viễn — trái quy tắc \"URL ký hết hạn 1 giờ\" của docs chính thức. Có chủ đích không? Chưa test mở link khi chưa đăng nhập. Item quy tắc docs sống ở tasks/task-status-and-output.",
  "kb_ids": [
    "KB-111",
    "KB-106",
    "KB-107"
  ],
  "related_questions": [
    "IGH-261 đổi ảnh lightbox, avatar template và ảnh input sang URL công khai cố định không chữ ký — link ảnh output xem được vĩnh viễn và có thể không cần đăng nhập. Đây có phải thay đổi có chủ đích không, và có được phép mở khi chưa đăng nhập không?",
    "IGH-261: link ảnh output công khai vĩnh viễn có chủ đích không, và có mở được khi chưa đăng nhập không?"
  ],
  "check_ids": [
    "template-run-history:CHK-011"
  ]
}
```

## OQ-templates-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-015",
  "type": "OPEN_ISSUE",
  "feature_id": "template-run-history",
  "summary": "Tiêu chí hiệu năng của trang chi tiết template chưa chốt với PO (đo \"thao tác → ảnh hiện\" hay \"thời gian tải từng ảnh\"); các số đo hiện có chỉ là 1 lần đo.",
  "kb_ids": [
    "KB-102",
    "KB-104",
    "KB-109",
    "KB-110",
    "KB-113"
  ],
  "related_questions": [
    "Tiêu chí hiệu năng của trang chi tiết template là gì và đo theo \"thao tác → ảnh hiện\" hay \"thời gian tải từng ảnh\"?",
    "Tiêu chí hiệu năng trang chi tiết template đo theo \"thao tác → ảnh hiện\" hay \"thời gian tải từng ảnh\"?"
  ],
  "check_ids": [
    "template-run-history:CHK-012"
  ]
}
```

## OQ-templates-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Fallback IGH-226: số lần thử lại / timeout của template A trước khi chuyển sang B — PO/Dev chưa trả lời (tài liệu dặn không suy đoán).",
  "kb_ids": [
    "KB-117",
    "KB-118"
  ],
  "related_questions": [
    "Template A được thử lại bao nhiêu lần / timeout bao lâu trước khi chuyển sang B?"
  ]
}
```

## OQ-templates-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Fallback IGH-226: khi B chạy thì post_processing của template nào được áp dụng (của A hay của B)? Chưa có câu trả lời.",
  "kb_ids": [
    "KB-117"
  ],
  "check_ids": [
    "fallback-template:CHK-020"
  ],
  "related_questions": [
    "Khi template fallback B chạy (do A fail), post-processing của template nào được áp dụng — của A hay của B? Cost post-processing tính theo template nào?",
    "Khi B chạy thì post-processing của template nào được áp dụng (A hay B)?"
  ]
}
```

## OQ-templates-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Fallback IGH-226: A và B có dùng chung bộ {{variables}} không? Nếu B có biến khác, prompt của B có thể còn literal {{...}}. Chưa có câu trả lời.",
  "kb_ids": [
    "KB-085",
    "KB-117"
  ],
  "related_questions": [
    "A và B có dùng chung bộ {{variables}} không?",
    "Template A và template fallback B có dùng chung bộ {{variables}} không? Nếu B có biến khác A, hệ thống xử lý thế nào khi B chạy?",
    "Template A và template fallback B có dùng chung bộ biến không?"
  ],
  "check_ids": [
    "fallback-template:CHK-021"
  ]
}
```

## OQ-templates-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Fallback IGH-226: \"4 loại lỗi đã chốt\" khiến A chuyển sang B là những lỗi nào? Tài liệu không liệt kê; không viết được case kích hoạt đúng/sai điều kiện.",
  "kb_ids": [
    "KB-118"
  ],
  "related_questions": [
    "\"4 loại lỗi đã chốt\" khiến A chuyển sang B là những lỗi nào?",
    "\"4 loại lỗi đã chốt\" khiến A chuyển sang B là những lỗi nào (lỗi khác thì task fail luôn)? A được thử lại bao nhiêu lần / timeout bao lâu trước khi chuyển B? Làm thế nào ép A fail để test (Q25)?",
    "Q25: làm thế nào ép template A fail để test?"
  ],
  "check_ids": [
    "fallback-template:CHK-022"
  ]
}
```

## OQ-templates-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Q25: cách ép template A fail để test chưa có câu trả lời, nên các rule cần A fail (A fail → tự chạy B, chỉ 1 cấp, cost/header khi B chạy, phạm vi /process và Batch, webhook task.failed, task detail ghi lý do) chưa được verify trên staging.",
  "kb_ids": [
    "KB-117",
    "KB-118",
    "KB-119",
    "KB-122",
    "KB-124",
    "KB-130",
    "KB-131"
  ]
}
```

## OQ-templates-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-021",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "BUG-128 / BUG-129 (High/Medium, TC-IGH-181/183, 2026-09-17): panel Fallback template luôn báo \"The fallback template was deleted...\" dù đã lưu đúng, không hiện tên và giá fallback — che rule \"hiện giá template fallback\". Dùng làm regression watch; giả thuyết nguyên nhân (tầng hiển thị) chưa xác nhận; mapping BUG-128/129 ↔ severity ↔ TC chưa rõ.",
  "kb_ids": [
    "KB-140",
    "KB-141",
    "KB-142",
    "KB-115"
  ]
}
```

## OQ-templates-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Nguyên nhân BUG-128/129: người viết giả thuyết là lỗi tầng hiển thị (client lấy nhầm field/endpoint để kiểm tra template fallback còn tồn tại), không phải dữ liệu chuẩn bị bị hỏng. Cần Dev xác nhận để biết dữ liệu fallback đã lưu có đúng và có được dùng khi chạy hay không.",
  "kb_ids": [
    "KB-143",
    "KB-140",
    "KB-142"
  ],
  "related_questions": [
    "Nguyên nhân BUG-128/129 là tầng hiển thị hay dữ liệu? Fallback đã lưu có thực sự được dùng khi chạy không?"
  ]
}
```

## OQ-templates-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-023",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "BUG-130 (Medium, TC-IGH-205, 2026-09-17): dialog Delete Template khi xoá template đang làm fallback hoàn toàn generic, vi phạm rule \"xoá template đang làm fallback → có cảnh báo\". Dùng làm regression watch.",
  "kb_ids": [
    "KB-144",
    "KB-132"
  ]
}
```

## OQ-templates-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-024",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "Câu \"gọi thẳng fetch tới /api/process từ browser bị bypass billing\" dẫn sang tài liệu staging API endpoints không có trong bộ tài liệu — ý nghĩa cụ thể (bỏ qua tính phí hay bỏ qua kiểm tra) chưa được mô tả; có thể là rủi ro billing.",
  "kb_ids": [
    "KB-145"
  ],
  "related_questions": [
    "\"Gọi thẳng /api/process từ browser bị bypass billing\" nghĩa là bỏ qua tính phí hay bỏ qua kiểm tra billing?"
  ]
}
```

## OQ-templates-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-025",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "Hành vi header X-Credits-Used / X-Credits-Remaining khi fallback chạy chưa được kiểm qua API: TC-IGH-184/196 viết theo API /process nhưng đợt test dùng nút Run trên UI + Task History làm bằng chứng thay thế.",
  "kb_ids": [
    "KB-122"
  ],
  "related_questions": [
    "Header X-Credits-Used / X-Credits-Remaining khi fallback chạy, kiểm qua API thì ra sao?"
  ]
}
```

## OQ-templates-026 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-026",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "TC-IGH-204 blocked một phần: org role Viewer duy nhất chỉ có 1 template không gắn fallback, nên kịch bản Viewer xem template \"có biến + có fallback\" chưa verify được.",
  "kb_ids": [
    "KB-127",
    "KB-138"
  ],
  "related_questions": [
    "Viewer xem một template vừa có biến vừa có fallback thì thấy gì?"
  ]
}
```

## OQ-templates-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "fallback-template",
  "summary": "Test case nào (TC-IGH-xxx, build nào) chứng minh từng ý \"đúng spec\" của fallback trong đợt chạy staging 2026-09-17 (A success chỉ 1 bước Generate; chỉ trừ credit A; Run/ước tính chỉ hiện giá A; template không fallback y hệt trước release; org hết credit bị từ chối, không tạo task; Admin org Free plan gắn được fallback)? BUG-128/129 ứng với TC nào và severity nào (tài liệu ghi gộp High/Medium cho TC-IGH-181/183)? TC-IGH-184/196 viết cho API /process + header X-Credits-Used nhưng chạy qua nút Run trên UI — cần chạy lại đúng kênh API.",
  "kb_ids": [
    "KB-133",
    "KB-134",
    "KB-135",
    "KB-136",
    "KB-137",
    "KB-139"
  ],
  "related_questions": [
    "Test case nào và build nào chứng minh từng ý \"đúng spec\" của đợt chạy staging 2026-09-17 (A thành công chỉ có bước Generate; chỉ trừ credit A; Run/ước tính chỉ hiện giá A; template không fallback y hệt trước release; org hết credit bị từ chối, không tạo task; Admin org Free plan gắn được fallback)? BUG-128 / BUG-129 ứng với test case và severity nào?"
  ]
}
```

## OQ-templates-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dynamic-upload-ratio",
  "summary": "Docs chính thức mô tả Auto chung cho template, nhưng trên staging (2026-09-23) GPT-image-2.5 sunburst/edit và flare/edit không có Auto (gpt-image-1.5/edit thì có; nano-banana-2-lite có picker mặc định Auto). Khác phạm vi model, không phải mâu thuẫn cùng phạm vi. Cần danh sách model nào có/không có Auto, model nào raw-dimension, và xác nhận dòng GPT-image-2.5 /edit có dự kiến bật Auto không (hiện chỉ là nhận định của người viết).",
  "kb_ids": [
    "KB-146",
    "KB-158",
    "KB-159",
    "KB-160",
    "KB-161",
    "KB-162"
  ],
  "related_questions": [
    "Danh sách model nào có Auto, model nào không, model nào là raw-dimension? Dòng GPT-image-2.5 /edit có dự kiến bật Auto không?",
    "Dòng GPT-image-2.5 /edit có dự kiến bật Auto không?",
    "Model nào có Auto, model nào không, model nào là raw-dimension, và danh sách ratio khả dụng của từng model?"
  ],
  "check_ids": [
    "dynamic-upload-ratio:CHK-009"
  ]
}
```

## OQ-templates-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dynamic-upload-ratio",
  "summary": "Docs chính thức nói nghĩa cũ của \"auto\" (\"để provider tự chọn\") đã bị retire, thay bằng \"khớp shape ảnh gửi vào\". Còn đúng ở bản hiện tại không, và có caller nào còn dùng nghĩa cũ?",
  "kb_ids": [
    "KB-156"
  ],
  "related_questions": [
    "Nghĩa cũ của \"auto\" (provider tự chọn) đã thật sự bị retire ở bản hiện tại chưa — giá trị auto bây giờ luôn có nghĩa \"khớp shape ảnh input\"? Còn caller nào dùng nghĩa cũ không?",
    "Nghĩa cũ của \"auto\" đã thật sự bị retire ở bản hiện tại chưa; còn caller nào dùng nghĩa cũ?"
  ],
  "check_ids": [
    "dynamic-upload-ratio:CHK-010"
  ]
}
```

## OQ-templates-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-library",
  "summary": "GET /templates và GET /templates/{id} khi không kèm credential: phải trả 401 unauthenticated, hay được phép trả danh sách template public?",
  "check_ids": [
    "template-library:CHK-007"
  ]
}
```

## OQ-templates-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-library",
  "summary": "Trên trang danh sách template, mỗi role (Owner/Admin/Editor/Viewer) được thấy và dùng những control nào (New Template, New Category, Import, Delete)?",
  "check_ids": [
    "template-library:CHK-020"
  ],
  "related_questions": [
    "Trang danh sách có khác nhau theo role (Owner/Admin/Editor/Viewer) không — ví dụ Viewer có thấy toolbar New Template/Import không?"
  ]
}
```

## OQ-templates-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "template-authoring",
  "summary": "Role Owner/Admin/Editor được tạo, sửa, xoá template và Save as Template / Update từ playground không? Có khác biệt nào giữa các role này?",
  "check_ids": [
    "template-authoring:CHK-018"
  ],
  "related_questions": [
    "Editor và Owner được tạo/sửa/xoá template không; role nào được Save as Template / Update từ Playground?"
  ]
}
```

## OQ-templates-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-templates-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dynamic-upload-ratio",
  "summary": "Khi ảnh input cách đều hai ratio khả dụng, Auto snap về ratio nào (luật phá hoà)?",
  "check_ids": [
    "dynamic-upload-ratio:CHK-011"
  ],
  "related_questions": [
    "Ảnh input đúng giữa hai ratio (khoảng cách bằng nhau) thì snap về đâu?"
  ]
}
```

## OQ-templates-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-034",
  "type": "OPEN_ISSUE",
  "feature_id": "template-library",
  "summary": "Shape response và meta phân trang của GET /templates là gì?"
}
```

## OQ-templates-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-035",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Có API công khai để tạo/sửa/xoá template không, contract là gì?"
}
```

## OQ-templates-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-036",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Nhánh tạo template bằng import từ preset hoạt động thế nào?"
}
```

## OQ-templates-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-037",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Size mặc định của GPT Image 1 Mini khi tạo template là gì?"
}
```

## OQ-templates-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-038",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "Xoá template thì task và Run history cũ của template đó ra sao; có khôi phục được không?"
}
```

## OQ-templates-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-039",
  "type": "OPEN_ISSUE",
  "feature_id": "template-authoring",
  "summary": "TC-IGH-075 chạy trên build nào?"
}
```

## OQ-templates-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-040",
  "type": "OPEN_ISSUE",
  "feature_id": "template-post-processing",
  "summary": "Có giới hạn số step, và step bị lỗi có được thử lại không?"
}
```

## OQ-templates-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-041",
  "type": "OPEN_ISSUE",
  "feature_id": "template-post-processing",
  "summary": "Cơ chế provider key riêng và webhook/cảnh báo chi tiết ra sao?"
}
```

## OQ-templates-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-042",
  "type": "OPEN_ISSUE",
  "feature_id": "template-variables",
  "summary": "Tài liệu QA về Models nhắc tới một mục \"Quirk: variables\" không tồn tại trong tài liệu đó — hành vi Form/JSON với biến trên trang model có khác trang template không?"
}
```

## OQ-templates-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-043",
  "type": "OPEN_ISSUE",
  "feature_id": "template-run-history",
  "summary": "Run in Batch từ trang template hoạt động thế nào?"
}
```

## OQ-templates-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-044",
  "type": "OPEN_ISSUE",
  "feature_id": "template-run-history",
  "summary": "Tài liệu QA về Templates được ghi chú IGH-261 trỏ tới một tài liệu khác không có trong bộ tài liệu."
}
```

## OQ-templates-045 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-045",
  "type": "OPEN_ISSUE",
  "feature_id": "fallback-template",
  "summary": "Docs chính thức có mô tả fallback không?"
}
```

## OQ-templates-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-templates-046",
  "type": "OPEN_ISSUE",
  "feature_id": "dynamic-upload-ratio",
  "summary": "Width/height ảnh input được truyền bằng field nào trong request?"
}
```
