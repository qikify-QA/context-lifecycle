# Open Questions — B2B Registration (phía form) — form builder ở Portal và form đăng ký trên storefront, regex theo field, chống spam (reCAPTCHA v3, rate limit IP), EU VAT validation

Tổng: 26 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 18
- OPEN_ISSUE: 8

## OQ-b2b-registration-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Nhiều hành vi của B2B Registration chỉ có nguồn là Jira ticket (DUOS-3, DUOS-18, DUOS-78, DUOS-105, DUOS-231, DUOS-377) được QA tóm tắt, không có rule active trong QA business rule Duos hay xác nhận PO/Dev: form nhiều step, thêm/xoá/sửa field, validate field bắt buộc theo step, chọn chỗ hiển thị, các tuỳ chọn Header/Footer/After submit, không giới hạn field mỗi step, nhãn \"Form steps\", và toàn bộ chuỗi UI của EU VAT validation. Các hành vi này còn đúng ở bản hiện tại không? Cần PO/Dev xác nhận để dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-009",
    "KB-011",
    "KB-012",
    "KB-041",
    "KB-068",
    "KB-069",
    "KB-070",
    "KB-071",
    "KB-073",
    "KB-074",
    "KB-076",
    "KB-077"
  ],
  "related_questions": [
    "Theo Jira DUOS-3 (chỉ theo ticket), form đăng ký B2B có nhiều step và form builder cho phép thêm, xoá, sửa field. Hành vi này còn đúng ở bản hiện tại không, và có giới hạn số step không?",
    "Theo Jira DUOS-3 (chỉ theo ticket), form đăng ký validate realtime và field bắt buộc phải được điền mới qua được step tiếp theo. Hành vi này còn đúng không, và thông báo lỗi required hiển thị thế nào?",
    "Theo Jira DUOS-3 (description và comment 16/12/2024), Settings của form có Header (\"Show header\", \"Title text\", \"Description text\", \"Alignment\") và Footer (text nút Previous/Next/Submit, \"Alignment\", \"Button position\"). Các tuỳ chọn này còn đúng ở bản hiện tại không, và \"Button position\" nhận những giá trị nào?",
    "Theo Jira DUOS-3 (chỉ theo ticket), \"Success behavior\" có hai giá trị \"Show message\" và \"Redirect to another page\". Hai giá trị này còn đúng không, và message mặc định của \"Show message\" là gì?",
    "Theo Jira DUOS-3 (chỉ theo ticket), merchant chọn được chỗ hiển thị form đăng ký. Có những lựa chọn chỗ hiển thị nào, và hành vi này còn đúng ở bản hiện tại không?",
    "Theo một comment Jira DUOS-3 (chỉ theo ticket), số field trong một step không bị giới hạn. Điều này còn đúng không, và lỗi không hiển thị preview từ field thứ 11 trở đi đã được sửa chưa?",
    "Theo Jira DUOS-78 (chỉ theo ticket), nhãn hiện hành trong màn Translations của form đăng ký là \"Form steps\". Nhãn này còn đúng không?",
    "Theo Jira DUOS-18 (chỉ theo ticket), cấu hình form có checkbox \"Validate EU VAT number\" với help text \"If enabled, VAT number will be validated using the official VIES VAT number validation service\". Checkbox và help text này còn đúng ở bản hiện tại không?",
    "Theo Jira DUOS-18 (chỉ theo ticket), form storefront hiện \"Your VAT ID is valid\" khi VAT hợp lệ. Chuỗi này còn đúng không, và việc kiểm được gọi khi rời field hay khi submit?",
    "Theo Jira DUOS-18 (chỉ theo ticket), form storefront hiện \"Your VAT ID is invalid. Please try again\" khi VAT không hợp lệ. Chuỗi này còn đúng không, và VAT sai có chặn submit form không?",
    "Theo Jira DUOS-231 (ticket chỉ có ảnh), khi form không có field Tax ID thì banner cảnh báo VAT bị ẩn. Hành vi này có đúng không?",
    "Các hành vi form builder chỉ có nguồn Jira DUOS-3 / DUOS-78 (form nhiều step, thêm/xoá/sửa field, validate field bắt buộc theo step, chỗ hiển thị, Header/Footer/After submit, không giới hạn field mỗi step, nhãn \"Form steps\") còn đúng ở bản hiện tại không?",
    "Merchant chọn được những vị trí hiển thị form nào?",
    "Các hành vi EU VAT validation chỉ có nguồn Jira DUOS-18 / DUOS-105 / DUOS-231 / DUOS-377 (checkbox, thông báo valid/invalid, banner và tooltip trên submission, endpoint kiểm VAT) còn đúng ở bản hiện tại không?",
    "VAT validation chạy trên field nào của form (field Tax ID?), và việc kiểm VAT được gọi lúc nào (khi rời field hay khi submit)?",
    "Message \"Thanks for contacting us. We will get back to you as soon as possible!\" là message mặc định của \"Show message\" hay do merchant cấu hình cho form test?"
  ],
  "check_ids": [
    "registration-form-builder:CHK-001",
    "registration-form-builder:CHK-003",
    "registration-form-builder:CHK-004",
    "registration-form-builder:CHK-005",
    "registration-form-builder:CHK-007",
    "registration-form-builder:CHK-008",
    "registration-form-builder:CHK-016",
    "eu-vat-validation:CHK-001",
    "eu-vat-validation:CHK-003",
    "eu-vat-validation:CHK-004",
    "eu-vat-validation:CHK-007"
  ]
}
```

## OQ-b2b-registration-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền của B2B Registration chưa được ghi: phần lớn hành vi form storefront không nói ai được submit (khách chưa đăng nhập, customer đã có tài khoản, buyer đã thuộc company), và phía Portal không nói nhân viên merchant cần quyền gì để sửa form builder, regex và Spam protection settings (Inventory staging Duos (08/10/2026) ghi thao tác bật reCAPTCHA bị hệ thống quyền của tài khoản khảo sát chặn). Cần PO/Dev xác nhận role cho form storefront và cho các màn cấu hình trên Portal.",
  "kb_ids": [
    "KB-003",
    "KB-013",
    "KB-014",
    "KB-027",
    "KB-028",
    "KB-029",
    "KB-051",
    "KB-052",
    "KB-055",
    "KB-056",
    "KB-057",
    "KB-059",
    "KB-069",
    "KB-070",
    "KB-001",
    "KB-044"
  ],
  "related_questions": [
    "Ai được submit form đăng ký B2B trên storefront: khách chưa đăng nhập, customer đã có tài khoản, buyer đã thuộc một company? Trường hợp nào bị chặn hoặc ẩn form?",
    "Nhân viên merchant cần quyền gì (trong hệ thống quyền của Portal Duos) để mở và sửa form builder của form đăng ký, gồm cấu hình regex và EU VAT validation?",
    "Nhân viên merchant cần quyền gì để bật reCAPTCHA và lưu site key / secret key ở trang Spam protection? (Khi khảo sát staging 08/10/2026, thao tác bật reCAPTCHA bị hệ thống quyền của tài khoản khảo sát chặn.)",
    "Ai được submit form đăng ký trên storefront (khách chưa đăng nhập, customer có tài khoản, buyer đã thuộc company) và nhân viên merchant cần quyền gì để sửa form builder?",
    "Ai được submit form storefront và nhân viên merchant cần quyền gì để cấu hình regex?",
    "Nhân viên merchant cần quyền gì để bật reCAPTCHA và lưu key, và ai được submit form storefront?",
    "Ai được submit form storefront và nhân viên merchant cần quyền gì để bật VAT validation?"
  ],
  "check_ids": [
    "registration-form-builder:CHK-013",
    "registration-form-builder:CHK-014",
    "registration-spam-protection:CHK-017"
  ]
}
```

## OQ-b2b-registration-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Form đăng ký trên storefront chưa được quan sát trong Inventory staging Duos (08/10/2026) (storefront có password page, app embed Disabled, store chưa có form); các hành vi storefront (validate field, regex, reCAPTCHA, thông báo VAT) chỉ dựa trên Dev/Jira và quan sát 30/09–01/10/2026 trên một store khác, trong đó đa số case regex/captcha của task Testlane DUOS-004 (dải TC-DUOS-154…238) có status passed nhưng thực tế chưa chạy. Cần khảo sát storefront form trên store có form publish và app embed bật.",
  "kb_ids": [
    "KB-003",
    "KB-027",
    "KB-029",
    "KB-051",
    "KB-056",
    "KB-057",
    "KB-069",
    "KB-070"
  ],
  "related_questions": [
    "Hành vi regex trên form storefront ở bản dựng hiện tại có khớp lời Dev không khi khảo sát trên store có form publish và app embed bật?",
    "Hành vi reCAPTCHA và giới hạn IP trên form storefront ở bản dựng hiện tại có khớp lời Dev không (khảo sát trên store có form publish, app embed bật, quyền bật reCAPTCHA), và các lần quan sát trước thuộc build nào?"
  ]
}
```

## OQ-b2b-registration-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-004",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Form builder, màn chi tiết submission và luồng Approve không xem được trong Inventory staging Duos (08/10/2026) (store chưa có form, không bấm \"Create form\"), nên cấu trúc form builder hiện tại (field, Settings, regex, VAT checkbox) chưa được đối chiếu với bản dựng mới nhất. Cần khảo sát lại form builder trên store có form.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-022",
    "KB-071"
  ],
  "related_questions": [
    "Cấu trúc form builder và form storefront ở bản dựng hiện tại ra sao khi khảo sát trên store có form publish và app embed bật, và các lần quan sát trước thuộc build nào?",
    "Form storefront (thông báo VAT) và màn chi tiết submission (banner VAT) ở bản dựng hiện tại ra sao khi khảo sát trên store Plus có form publish?"
  ]
}
```

## OQ-b2b-registration-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-005",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Không tài liệu nào ghi build/version của staging tại các lần quan sát B2B Registration (30/09, 01/10, 08/10/2026); mọi item quan sát chỉ gắn ngày. Cần ghi build khi khảo sát lại để biết hành vi quan sát thuộc bản dựng nào.",
  "kb_ids": [
    "KB-010",
    "KB-021",
    "KB-045",
    "KB-065",
    "KB-066",
    "KB-067"
  ]
}
```

## OQ-b2b-registration-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-006",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu sản phẩm Duos (mục tính năng B2B Registration) và file câu hỏi mở của QA Duos được viện dẫn làm nguồn cho B2B Registration nhưng không có trong bộ nguồn; không suy diễn nội dung các mục đó. Cần bổ sung hai tài liệu này để biết còn rule hoặc câu hỏi mở nào chưa được trích (đặc biệt câu hỏi \"BE không validate regex — PO có chấp nhận không\").",
  "related_questions": [
    "Tài liệu sản phẩm Duos (mục B2B Registration) và file câu hỏi mở của QA Duos có thêm rule hay câu hỏi nào về regex chưa được trích không?"
  ]
}
```

## OQ-b2b-registration-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-007",
  "type": "OPEN_ISSUE",
  "feature_id": "registration-form-builder",
  "summary": "Hai lỗi form builder được ghi trong comment Jira DUOS-3 (không ghi ngày) là popup \"Add new field\" không đóng khi click ra ngoài và form builder không có preview từ field thứ 11 trở đi. Hai lỗi này đã được sửa chưa, và nếu chưa thì mức nghiêm trọng là gì? Cần Dev xác nhận trạng thái hiện tại; đến khi có câu trả lời, checklist chỉ dùng chúng làm regression watch, không làm kết quả mong đợi.",
  "kb_ids": [
    "KB-019",
    "KB-020"
  ],
  "related_questions": [
    "Lỗi popup \"Add new field\" không đóng khi click ra ngoài và lỗi không có preview từ field thứ 11 đã được sửa chưa; nếu chưa thì mức nghiêm trọng là gì?"
  ]
}
```

## OQ-b2b-registration-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-008",
  "type": "OPEN_ISSUE",
  "feature_id": "registration-form-builder",
  "summary": "Gọi GET /api/user/config không kèm session trả HTTP 400 {\"message\":\"Missing Authorization key in headers array\"} thay vì 401/403 (Known issues Duos, lỗi mở mức minor, quan sát staging 30/09/2026). Dev có sửa về 401/403 không, và mục đích cùng response khi có session của endpoint này là gì?",
  "kb_ids": [
    "KB-021"
  ],
  "related_questions": [
    "GET /api/user/config không kèm session phải trả status nào (401 hay 403) và body gì? Lỗi hiện trả HTTP 400 \"Missing Authorization key in headers array\" có được sửa không?",
    "GET /api/user/config không kèm session có được sửa về 401/403 không, và mục đích cùng response khi có session của endpoint này là gì?"
  ],
  "check_ids": [
    "registration-form-builder:CHK-015"
  ]
}
```

## OQ-b2b-registration-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-form-builder",
  "summary": "Form storefront và luồng cũ ở Portal dùng hai danh sách nước khác nhau (danh sách của form storefront có 242 nước). Có cơ chế giữ hai danh sách đồng bộ không, và với tên nước dễ viết khác nhau thì backend map sang mã ISO thế nào? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-018",
    "KB-015",
    "KB-017"
  ],
  "related_questions": [
    "Luồng cũ ở Portal và form storefront dùng hai danh sách nước khác nhau (theo Dev FE/Dev BE 23/09 và 30/09/2026). Có cơ chế giữ đồng bộ hai danh sách không, và tên nước viết khác nhau (vd Czechia / Czech Republic) được map sang mã ISO thế nào?",
    "Có cơ chế giữ đồng bộ danh sách nước của form storefront (242 nước) với danh sách nước của luồng cũ ở Portal không, và tên nước dễ viết khác nhau được map sang mã ISO thế nào?"
  ],
  "check_ids": [
    "registration-form-builder:CHK-012"
  ]
}
```

## OQ-b2b-registration-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "field-regex-validation",
  "summary": "Dev BE xác nhận (30/09/2026) backend không validate regex: gọi thẳng POST /company-submissions với giá trị sai pattern vẫn lưu, và khi cờ enable_company_creation_on_submit bật thì còn tự tạo company từ giá trị đó; Dev FE xác nhận pattern sai cú pháp bị storefront bỏ qua im lặng, pattern dạng /…/i không bao giờ khớp và Portal không kiểm cú pháp khi Save. Known issues Duos để mục này ở trạng thái mở, chờ PO. PO chấp nhận các hành vi này hay yêu cầu sửa (bổ sung validate regex ở backend, cảnh báo pattern hỏng) — GAP-22 của task Testlane DUOS-004? Cho tới khi PO chốt, case gọi thẳng API với giá trị sai pattern chưa có kết quả mong đợi pass/fail.",
  "kb_ids": [
    "KB-040",
    "KB-038",
    "KB-039",
    "KB-030",
    "KB-032",
    "KB-033"
  ],
  "related_questions": [
    "Dev FE 30/09/2026 mô tả hiện trạng: regex pattern dùng nguyên văn, không hỗ trợ flag, nên pattern dạng /^abc$/i không bao giờ khớp và mọi giá trị đều bị chặn. PO có chấp nhận đây là hành vi đúng không, hay hệ thống phải hiểu được pattern có flag hoặc cảnh báo merchant (GAP-22 của task Testlane DUOS-004)?",
    "Dev FE 30/09/2026 mô tả hiện trạng: Portal không kiểm cú pháp regex pattern và không cảnh báo khi merchant Save. PO có chấp nhận đây là hành vi đúng không, hay Portal phải kiểm cú pháp và cảnh báo/chặn Save (GAP-22 của task Testlane DUOS-004)?",
    "Dev FE 30/09/2026 mô tả hiện trạng: regex pattern sai cú pháp bị form storefront bỏ qua im lặng (không báo lỗi) và form vẫn submit được. PO có chấp nhận đây là hành vi đúng không (GAP-22 của task Testlane DUOS-004)?",
    "PO chấp nhận việc backend không validate regex (gọi thẳng POST /company-submissions với giá trị sai pattern vẫn được lưu, cờ enable_company_creation_on_submit bật thì còn tạo company từ giá trị đó) hay yêu cầu bổ sung validate ở backend (GAP-22 của task Testlane DUOS-004)? Kết quả mong đợi của case gọi thẳng API là gì?",
    "PO chấp nhận việc backend không validate regex (gọi thẳng POST /company-submissions với giá trị sai pattern vẫn lưu, cờ enable_company_creation_on_submit bật thì còn tạo company), pattern sai cú pháp bị bỏ qua im lặng, pattern dạng /…/i luôn không khớp và Portal không cảnh báo khi Save — hay yêu cầu sửa (GAP-22 của task Testlane DUOS-004)?"
  ],
  "check_ids": [
    "field-regex-validation:CHK-008",
    "field-regex-validation:CHK-009",
    "field-regex-validation:CHK-010",
    "field-regex-validation:CHK-014"
  ]
}
```

## OQ-b2b-registration-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "field-regex-validation",
  "summary": "Regex pattern và error message có giới hạn độ dài không (ví dụ khi nhập 5.000 ký tự), hệ thống xử lý thế nào với regex backtracking nặng, và HTML trong custom error message hoặc Label của field có được hiển thị dạng text (không thực thi) trên form storefront không? Cần Dev/PO xác nhận trước khi viết kết quả mong đợi cho các case biên và case bảo mật này.",
  "kb_ids": [
    "KB-042",
    "KB-043"
  ],
  "related_questions": [
    "Regex pattern và error message có giới hạn độ dài không (vd 5.000 ký tự), và form storefront xử lý pattern backtracking nặng thế nào?",
    "HTML trong custom error message hoặc Label của field có phải được hiển thị dạng text (escape, không thực thi) trên form storefront không?",
    "Regex pattern và error message có giới hạn độ dài không (ví dụ 5.000 ký tự), và hệ thống xử lý regex backtracking nặng thế nào?",
    "HTML trong custom error message hoặc Label của field có được hiển thị dạng text (không thực thi) trên form storefront không?"
  ],
  "check_ids": [
    "field-regex-validation:CHK-015",
    "field-regex-validation:CHK-016"
  ]
}
```

## OQ-b2b-registration-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-spam-protection",
  "summary": "Nội dung thông báo trên form storefront khi submit nhận lỗi 422 (token reCAPTCHA sai/thiếu/hết hạn) và khi script reCAPTCHA không load được chưa được chốt (GAP-14 của task Testlane DUOS-004). Chuỗi chính xác là gì, và các thông báo này có dịch theo ngôn ngữ storefront không?",
  "kb_ids": [
    "KB-058",
    "KB-056",
    "KB-057"
  ],
  "related_questions": [
    "Thông báo trên form storefront khi submit nhận lỗi 422 (token sai/thiếu/hết hạn) và khi script reCAPTCHA không load được là chuỗi gì, và có dịch theo ngôn ngữ storefront không (GAP-14 của task Testlane DUOS-004)?"
  ],
  "check_ids": [
    "registration-spam-protection:CHK-011"
  ]
}
```

## OQ-b2b-registration-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-spam-protection",
  "summary": "Giới hạn submit form đăng ký theo IP (4 request/phút, 20 request/ngày) có áp dụng cho mọi store không, hay có store được cấu hình khác? Hiện chỉ là giả định của QA trong task Testlane DUOS-004, chưa có xác nhận PO/Dev.",
  "kb_ids": [
    "KB-064",
    "KB-059"
  ],
  "related_questions": [
    "Giới hạn submit theo IP (4 request/phút, 20 request/ngày) có áp dụng cho mọi store không, bộ đếm theo IP là chung hay riêng từng store, và quan hệ thế nào với giới hạn tạo company theo shop?",
    "Giới hạn submit theo IP (4 request/phút, 20 request/ngày) có áp dụng cho mọi store không, hay có store được cấu hình khác?"
  ],
  "check_ids": [
    "registration-spam-protection:CHK-016"
  ]
}
```

## OQ-b2b-registration-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-spam-protection",
  "summary": "Nhãn UI của đường vào cấu hình chống spam lệch giữa ticket và staging: ticket/QA KB gọi trang chứa nút là \"Company submissions\", staging 08/10/2026 hiển thị header \"B2B Company management\" (row hub \"B2B registration\"); nút là \"Spam protection settings\" nhưng trang mở ra có h1 \"Spam protection\". Nhãn nào là nhãn hiện hành đúng? Cần PO/Dev xác nhận; hành vi (màn duy nhất để cấu hình chống spam) không bị tranh chấp.",
  "kb_ids": [
    "KB-044",
    "KB-045"
  ],
  "related_questions": [
    "Nhãn hiện hành đúng của trang chứa nút \"Spam protection settings\" (\"Company submissions\" hay \"B2B Company management\") và của tiêu đề trang (\"Spam protection settings\" hay \"Spam protection\") là gì?"
  ]
}
```

## OQ-b2b-registration-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-015",
  "type": "OPEN_ISSUE",
  "feature_id": "registration-spam-protection",
  "summary": "Các điểm chống spam chưa có trong tài liệu hoặc chưa quan sát được: ô site key và secret key khi bật \"Enable reCAPTCHA\" chưa từng được thấy trên staging; giá trị min_score thực tế của từng store không được ghi; tài liệu không nói lỗi 422 errors.recaptcha_token trả từ endpoint nào (có phải POST /company-submissions không); và quan hệ giữa giới hạn submit theo IP với giới hạn tạo company theo shop chưa được mô tả. Cần khảo sát lại với quyền bật reCAPTCHA và Dev bổ sung các điểm này.",
  "kb_ids": [
    "KB-067",
    "KB-046",
    "KB-049",
    "KB-055"
  ],
  "related_questions": [
    "Khi bật \"Enable reCAPTCHA\", ô site key / secret key hiển thị thế nào; min_score thực tế của từng store là bao nhiêu; lỗi 422 errors.recaptcha_token trả từ endpoint nào (có phải POST /company-submissions); và giới hạn submit theo IP quan hệ thế nào với giới hạn tạo company theo shop?"
  ]
}
```

## OQ-b2b-registration-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "eu-vat-validation",
  "summary": "Khi VAT number trên submission không hợp lệ, merchant vẫn Approve được (chỉ cảnh báo) hay bị chặn Approve? QA chỉ suy ra \"chỉ cảnh báo\" từ câu chữ banner; cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-078",
    "KB-071"
  ],
  "related_questions": [
    "Khi VAT number trên submission không hợp lệ, merchant vẫn Approve được (banner chỉ cảnh báo) hay bị chặn Approve?",
    "Khi VAT number trên submission không hợp lệ, merchant vẫn Approve được (chỉ cảnh báo) hay bị chặn Approve?"
  ],
  "check_ids": [
    "eu-vat-validation:CHK-008"
  ]
}
```

## OQ-b2b-registration-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "eu-vat-validation",
  "summary": "Help text của checkbox \"Validate EU VAT number\" nói VAT được kiểm bằng dịch vụ VIES, còn Jira DUOS-105 nói backend dùng dịch vụ vatcheckapi (endpoint POST /api/zones/eu/vat-number/validate). Hai dịch vụ quan hệ thế nào (vatcheckapi gọi VIES, hay một trong hai đã thay thế bên kia), và endpoint trả response/status nào khi VAT hợp lệ, không hợp lệ hoặc dịch vụ kiểm không phản hồi?",
  "kb_ids": [
    "KB-068",
    "KB-076",
    "KB-077"
  ],
  "related_questions": [
    "Theo Jira DUOS-105 (chỉ theo ticket), backend kiểm VAT qua dịch vụ vatcheckapi tại POST /api/zones/eu/vat-number/validate, còn help text nói dùng VIES. Quan hệ hai dịch vụ là gì, endpoint trả response/status nào khi VAT hợp lệ, sai, hoặc khi dịch vụ kiểm không phản hồi?",
    "VIES và vatcheckapi quan hệ thế nào (vatcheckapi gọi VIES, hay một bên đã thay bên kia), và POST /api/zones/eu/vat-number/validate trả response/status nào khi VAT hợp lệ, không hợp lệ hoặc dịch vụ kiểm không phản hồi?"
  ],
  "check_ids": [
    "eu-vat-validation:CHK-009"
  ]
}
```

## OQ-b2b-registration-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "eu-vat-validation",
  "summary": "EU VAT validation chỉ dành cho store Shopify Plus theo Jira DUOS-377 (tuỳ chọn bị disable, help text \"This feature is available on Shopify Plus only.\"). Giới hạn này còn đúng sau các đợt đổi bảng giá 2026 không, và help text hiển thị ở Portal (form builder) hay cả ở nơi khác?",
  "kb_ids": [
    "KB-075"
  ],
  "related_questions": [
    "Theo Jira DUOS-377 (chỉ theo ticket), EU VAT validation chỉ dành cho store Shopify Plus; store không Plus thấy tuỳ chọn bị disable kèm \"This feature is available on Shopify Plus only.\" Giới hạn này còn đúng sau các đợt đổi bảng giá 2026 không?",
    "Giới hạn chỉ Shopify Plus của EU VAT validation còn đúng sau các đợt đổi bảng giá 2026 không, và help text \"This feature is available on Shopify Plus only.\" hiện ở Portal (form builder) hay cả nơi khác?"
  ],
  "check_ids": [
    "eu-vat-validation:CHK-002"
  ]
}
```

## OQ-b2b-registration-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-form-builder",
  "summary": "Theo Jira DUOS-3 (chỉ theo ticket), merchant nhận notification khi có registration mới. Notification đi qua kênh nào, gửi cho ai, nội dung gì?",
  "kb_ids": [
    "KB-005"
  ],
  "check_ids": [
    "registration-form-builder:CHK-017"
  ],
  "related_questions": [
    "Notification cho merchant khi có registration mới đi qua kênh nào, gửi cho ai, nội dung gì?"
  ]
}
```

## OQ-b2b-registration-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-form-builder",
  "summary": "Field Email của form đăng ký có nhận địa chỉ +alias và subdomain không, và có từ chối email chứa ký tự xuống dòng không (liên quan Jira DUOS-429)?",
  "check_ids": [
    "registration-form-builder:CHK-018"
  ]
}
```

## OQ-b2b-registration-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-form-builder",
  "summary": "Field File Upload của form đăng ký nhận những loại file nào, giới hạn kích thước bao nhiêu, và file được lưu/hiển thị thế nào trên submission?",
  "check_ids": [
    "registration-form-builder:CHK-019"
  ]
}
```

## OQ-b2b-registration-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "registration-spam-protection",
  "summary": "Sau khi lưu cấu hình chống spam và tải lại trang, ô site key và secret key hiển thị thế nào (secret key có bị che không), và tắt chống spam có xoá key đã lưu không?",
  "check_ids": [
    "registration-spam-protection:CHK-004"
  ]
}
```

## OQ-b2b-registration-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "eu-vat-validation",
  "summary": "Theo Jira DUOS-18 (chỉ theo ticket), banner VAT sai có nội dung \"The VAT number submitted is invalid. Please contact the applicant to verify their VAT number before approving the registration.\" và VAT number có tooltip \"Invalid VAT number\" / \"Validated VAT number\". Các chuỗi này còn đúng không?",
  "kb_ids": [
    "KB-071",
    "KB-073"
  ],
  "check_ids": [
    "eu-vat-validation:CHK-006"
  ]
}
```

## OQ-b2b-registration-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "eu-vat-validation",
  "summary": "VAT validation chạy trên field nào của form (field Tax ID?), nhận định dạng nào (có/không có mã nước, khoảng trắng), xử lý Tax ID ngoài EU thế nào, và tương tác với regex của field Tax ID ra sao?",
  "check_ids": [
    "eu-vat-validation:CHK-010"
  ]
}
```

## OQ-b2b-registration-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-b2b-registration-025",
  "type": "OPEN_ISSUE",
  "feature_id": "registration-form-builder",
  "summary": "Module B2B Registration (gồm form đăng ký) miễn phí hay trả phí ở bản hiện tại?",
  "kb_ids": [
    "KB-P-032"
  ]
}
```

## OQ-b2b-registration-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-b2b-registration-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: rate limit message text staging: Trên staging (quan sát 01/10/2026, case TC-DUOS-166 — không dùng làm test-case authority; QA business rule Duos ghi lại cùng chuỗi), khi bị  · regex config ui staging: Trên staging (quan sát 30/09/2026, case TC-DUOS-179 — không dùng làm test-case authority), cấu hình field có checkbox \"Enable regex validati · submission invalid vat banner staging: Trên staging (case TC-DUOS-224, không ghi ngày; case không dùng làm test-case authority), banner báo VAT sai đã được thấy trên màn chi tiết .",
  "kb_ids": [
    "KB-023",
    "KB-061",
    "KB-072"
  ],
  "check_ids": [
    "field-regex-validation:CHK-002",
    "registration-spam-protection:CHK-015",
    "eu-vat-validation:CHK-005"
  ]
}
```
