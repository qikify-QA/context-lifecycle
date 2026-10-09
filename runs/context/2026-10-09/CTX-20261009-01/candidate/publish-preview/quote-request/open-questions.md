# Open Questions — B2B Quote Request — yêu cầu báo giá từ storefront (widget/modal), quản lý & đàm phán quote, áp giá theo line item (permanent / one-time), PDF và lịch sử

Tổng: 48 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 40
- OPEN_ISSUE: 8

## OQ-quote-request-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Tài liệu tham chiếu ghi buyer thêm được sản phẩm vào quote từ product / catalog / cart page (Jira DUOS-263 \"Add to quote from collection page\" đang To Do), nhưng trang \"Quote widget settings\" trên staging 08/10/2026 chỉ có lựa chọn \"Product page\" và \"Cart page\". Add to quote từ collection/catalog page có nằm trong phạm vi hiện tại không, hay chờ DUOS-263? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-003"
  ],
  "related_questions": [
    "Add to quote từ catalog / collection page có nằm trong phạm vi hiện tại không, hay chờ Jira DUOS-263 (đang To Do)?",
    "Tài liệu tham chiếu ghi buyer thêm được vào quote từ product / catalog / cart page (Jira DUOS-263 \"Add to quote from collection page\" đang To Do), còn trang cài đặt chỉ có \"Product page\" / \"Cart page\". Add to quote từ collection/catalog page có trong phạm vi hiện tại không, và bỏ tick một trang thì nút có ẩn đúng trang đó không?"
  ],
  "check_ids": [
    "quote-request-widget:CHK-012"
  ]
}
```

## OQ-quote-request-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-002",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-request-widget",
  "summary": "Storefront chưa được quan sát (store khảo sát 08/10/2026 có password page, app embed Disabled): nút \"Add to quote\" trên product / cart page, quote modal, quantity rule inline error và hoạt động trên theme B2B mới chỉ có theo ticket. Cần một lượt khảo sát storefront với tài khoản buyer B2B trên store đã bật extension.",
  "kb_ids": [
    "KB-001",
    "KB-011",
    "KB-012",
    "KB-013",
    "KB-014",
    "KB-015",
    "KB-017",
    "KB-018",
    "KB-019",
    "KB-020"
  ],
  "related_questions": [
    "Các hành vi storefront theo ticket (modal tự mở sau Add to quote, Add to quote cả cart, cộng dồn quantity, cart không bị clear, inline error và disable \"Submit request\" khi vi phạm quantity rule) có còn đúng ở bản hiện tại không?"
  ]
}
```

## OQ-quote-request-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-003",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-request-widget",
  "summary": "Trang \"Quote widget settings\" và \"Quote PDF template\" có trên staging (08/10/2026) nhưng chưa có business rule: giá trị mặc định của \"Product page\" / \"Cart page\" / \"Not logged-in users\" / \"Show a button when quote is empty\", tác dụng của \"Custom CSS selector\", và ý nghĩa từng tuỳ chọn Design / Content của PDF hiện chỉ là hiện trạng UI. Cần PO/Dev bổ sung rule cho hai trang này.",
  "kb_ids": [
    "KB-003",
    "KB-005",
    "KB-006",
    "KB-008",
    "KB-009",
    "KB-010",
    "KB-064",
    "KB-065",
    "KB-066",
    "KB-067"
  ],
  "related_questions": [
    "Trang \"Quote widget settings\" lưu cấu hình thế nào, và giá trị mặc định của \"Product page\", \"Cart page\", \"Not logged-in users\", \"Show a button when quote is empty\" cùng hai ô \"Add to cart button selector\" / \"Form selector\" là gì?",
    "Giá trị mặc định của \"Product page\", \"Cart page\", \"Not logged-in users\" và \"Show a button when quote is empty\" trên trang \"Quote widget settings\" là gì, và hai ô \"Add to cart button selector\" / \"Form selector\" có tác dụng gì trên storefront?",
    "Jira DUOS-247 \"Hide price for not logged-in users\" (đang To Do) có liên quan tới tuỳ chọn \"Not logged-in users\" của quote button không, và đã có hành vi nào trên bản hiện tại chưa?"
  ],
  "check_ids": [
    "quote-request-widget:CHK-003"
  ]
}
```

## OQ-quote-request-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Hầu hết rule của Quote Request (đàm phán, reject, hạn và status EXPIRED, reassign khi customer bị xoá, áp giá permanent / one-time theo line item, quantity rule, Add to quote ở cart, PDF và history) hiện chỉ dựa trên ticket Jira qua tài liệu tổng hợp quotation (17/07/2026) hoặc rule draft \"chỉ theo ticket\" trong QA business rule Duos (07/10/2026); chưa có quyết định PO/Dev, chưa có test case QA. PO/Dev xác nhận các rule này còn đúng với bản hiện tại để dùng làm kết quả mong đợi?",
  "kb_ids": [
    "KB-001",
    "KB-004",
    "KB-007",
    "KB-011",
    "KB-012",
    "KB-013",
    "KB-014",
    "KB-015",
    "KB-017",
    "KB-018",
    "KB-019",
    "KB-020",
    "KB-025",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-029",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-044",
    "KB-045",
    "KB-046",
    "KB-047",
    "KB-048",
    "KB-049",
    "KB-050",
    "KB-051",
    "KB-052",
    "KB-053",
    "KB-054",
    "KB-055",
    "KB-056",
    "KB-057",
    "KB-058",
    "KB-059",
    "KB-060",
    "KB-061",
    "KB-066",
    "KB-069",
    "KB-070",
    "KB-072"
  ],
  "related_questions": [
    "Hạn của quote (`expires_at`) được đặt thế nào và mặc định bao nhiêu ngày (preview PDF hiện \"Valid for 30 days\" chỉ là giá trị mẫu)?",
    "Khi customer bị xoá, quote của họ được reassign cho ai và history ghi dòng gì?",
    "Các rule đàm phán theo ticket (giá line, custom discount, custom shipping fee, counter offer, accept / revised quote, resubmit quote rejected / closed, thêm item trên Portal) có còn đúng ở bản hiện tại không?",
    "Các rule áp giá theo ticket (chọn theo line, permanent cập nhật catalog location, one-time qua draft order, CTA `Create order` / `Create draft order`) có còn đúng ở bản hiện tại để dùng làm kết quả mong đợi không?",
    "Hạn hiển thị trong PDF (Valid days) lấy từ đâu và mặc định bao nhiêu ngày?",
    "Theo Jira DUOS-176 (chưa xác nhận) khi customer bị xoá thì quote của họ được reassign và việc này được ghi vào history. Quote được reassign cho ai, sau bao lâu, và history ghi dòng gì?"
  ],
  "check_ids": [
    "quote-negotiation-and-status:CHK-014"
  ]
}
```

## OQ-quote-request-005 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-005",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền cho Quote chưa chốt: tài liệu không ghi role cho phần lớn thao tác (ai reject / approve quote qua modal, ai đặt price application và bulk action, ai bấm \"Create order\" / \"Create draft order\" sau accept, ai xem payment information). Staging 08/10/2026 có nhóm permission \"Quotes\" (View quotations / Create and edit quotations / Create order from quotation) nhưng ý nghĩa nghiệp vụ của từng quyền chưa có rule. PO xác nhận role nào (merchant, buyer-admin, buyer-senior, buyer-junior, custom role) được làm từng thao tác trên quote?",
  "kb_ids": [
    "KB-005",
    "KB-009",
    "KB-025",
    "KB-032",
    "KB-033",
    "KB-040",
    "KB-045",
    "KB-046",
    "KB-047",
    "KB-048",
    "KB-049",
    "KB-053",
    "KB-055",
    "KB-070"
  ],
  "related_questions": [
    "Role nào (merchant, Admin / Senior Buyer / Junior Buyer / custom role) được xem, báo giá, counter offer, accept và reject quote; quyền \"View quotations\" / \"Create and edit quotations\" có nghĩa nghiệp vụ gì?",
    "Role nào (Admin / Senior Buyer / Junior Buyer / custom role) thấy nút \"Add to quote\" và gửi được yêu cầu báo giá, ứng với quyền nào của nhóm \"Quotes\"? Location không có catalog thì nút có ẩn không? (Quyền Junior Buyer trong nhóm Quotes đang tranh chấp ở object Roles & permissions.)",
    "Role nào của buyer (Admin / Senior Buyer / Junior Buyer / custom role) thấy nút \"Add to quote\" và gửi được yêu cầu báo giá, tương ứng với quyền nào trong nhóm \"Quotes\"?",
    "Role nào (Admin / Senior Buyer / Junior Buyer / custom role) được xem quote của mình và của người khác cùng location, tạo/sửa quote, counter offer, accept và reject? Quyền \"View quotations\" / \"Create and edit quotations\" / \"Create order from quotation\" có nghĩa nghiệp vụ gì? (Quyền Junior Buyer đang tranh chấp ở object Roles & permissions.)",
    "Ai (merchant hay buyer, role nào) được đặt loại áp giá cho line, dùng bulk action và bấm `Create order` / `Create draft order`; quyền \"Create order from quotation\" áp cho thao tác nào?",
    "Ai (merchant hay buyer, role nào) đặt loại áp giá cho line, dùng bulk action và bấm `Create order` / `Create draft order`?",
    "Role nào được sửa mẫu PDF, xuất PDF và xem history log của quote trên Portal và Customer Account?"
  ],
  "check_ids": [
    "quote-request-widget:CHK-010",
    "quote-negotiation-and-status:CHK-016",
    "quote-price-application:CHK-011",
    "quote-pdf-and-history:CHK-015"
  ]
}
```

## OQ-quote-request-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-186 / DUOS-195 (rule draft, chỉ theo ticket) quote hết hạn có status EXPIRED = 6, nhưng trang \"Quote management\" trên staging 08/10/2026 chỉ có tab All / Unread / Read / Replied / Accepted / Rejected / Deal closed, không có tab \"Expired\". Quote đã hết hạn hiển thị ở tab nào trên Portal, và status EXPIRED còn đúng ở bản hiện tại không? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-022",
    "KB-037"
  ],
  "related_questions": [
    "Theo Jira DUOS-186 / DUOS-195 (rule draft, chỉ theo ticket) hạn của quote lưu ở `expires_at` theo UTC và quote hết hạn có status `EXPIRED` = 6, nhưng trang \"Quote management\" trên staging không có tab \"Expired\". Quote hết hạn hiển thị ở tab nào, status `EXPIRED` còn đúng không, và hạn của quote được đặt / mặc định bao nhiêu ngày?",
    "Quote đã hết hạn (status `EXPIRED`) hiển thị ở tab nào trên trang \"Quote management\", và status `EXPIRED` = 6 còn đúng ở bản hiện tại không?",
    "Danh sách đầy đủ status của quote là gì và mỗi status ánh xạ sang tab nào (All / Unread / Read / Replied / Accepted / Rejected / Deal closed)?"
  ],
  "check_ids": [
    "quote-negotiation-and-status:CHK-010"
  ]
}
```

## OQ-quote-request-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Dev BE (14/07/2026, Jira DUOS-400) cho biết khi bật users.config quotation.skip_reassign_on_revoke thì hệ thống không reassign quote khi revoke role, và khi không bật thì webhook revoke role chờ 5 phút rồi kiểm tra reassign cho owner location; QA KB Quote vẫn ghi hành vi chi tiết là Need confirm. Khi bật config, quote ở lại với member đã bị revoke và ai còn xem/xử lý được quote đó? Mốc 5 phút tính từ đâu và giá trị mặc định của config là gì? Khi customer bị xoá, quote được reassign cho ai?",
  "kb_ids": [
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-072"
  ],
  "related_questions": [
    "Dev BE (14/07/2026, Jira DUOS-400) cho biết khi merchant được bật users.config `quotation.skip_reassign_on_revoke` thì hệ thống không reassign quote khi revoke role, nhưng QA KB Quote ghi hành vi này cần xác nhận. PO/Dev xác nhận khi bật config thì quote của member bị revoke role không bị chuyển cho owner của company location, và giá trị mặc định của config là gì?",
    "Khi merchant bật users.config `quotation.skip_reassign_on_revoke`, quote của member bị revoke role ở lại với ai, và ai (merchant, buyer admin của location, chính member đó) còn xem / xử lý được quote? Mốc 5 phút tính từ đâu và giá trị mặc định của config là gì?",
    "Khi merchant bật `quotation.skip_reassign_on_revoke`, hệ thống có đúng là không reassign quote của member bị revoke role không, và khi đó quote ở lại với ai, ai còn xem / xử lý được?",
    "Khi không bật `quotation.skip_reassign_on_revoke`, bước kiểm tra reassign sau 5 phút của webhook revoke role có reassign quote của member bị revoke cho owner của company location không (QA KB \"Feature Map\" nói có, chưa có câu Dev có ngày)?",
    "Mốc 5 phút của webhook revoke role tính từ thời điểm nào, và giá trị mặc định của `quotation.skip_reassign_on_revoke` là gì?"
  ],
  "check_ids": [
    "quote-negotiation-and-status:CHK-012",
    "quote-negotiation-and-status:CHK-013"
  ]
}
```

## OQ-quote-request-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-008",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Quotes trong Customer Account (My Quotes) chưa được quan sát: không có tài khoản buyer, block chưa kích hoạt; Jira DUOS-422 \"Fix layout in customer account\" (QA Review) chưa được đọc. Approve / reject kèm reason, history log và xuất PDF trên Customer Account mới chỉ có theo ticket. Cần khảo sát với tài khoản buyer B2B.",
  "kb_ids": [
    "KB-035",
    "KB-057",
    "KB-059"
  ],
  "related_questions": [
    "Quote trên Customer Account (\"My Quotes\") hiển thị và cho buyer thao tác những gì (approve / reject kèm reason, counter offer, resubmit), và Jira DUOS-422 \"Fix layout in customer account\" thay đổi gì?"
  ]
}
```

## OQ-quote-request-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-009",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Store khảo sát 08/10/2026 có 0 quote nên chưa quan sát được quote detail, luồng đàm phán (counter offer, revised quote, accept / reject), áp giá permanent / one-time khi accept, quote hỗn hợp permanent + one-time, và PDF của quote thật. Cần dữ liệu quote trên staging để quan sát các luồng này.",
  "kb_ids": [
    "KB-026",
    "KB-029",
    "KB-030",
    "KB-032",
    "KB-044",
    "KB-050",
    "KB-051",
    "KB-053",
    "KB-054",
    "KB-058"
  ]
}
```

## OQ-quote-request-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-010",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Các tài liệu nguồn của rule Quote không có trong bộ tài liệu: tài liệu tổng hợp quotation (17/07/2026, gồm danh sách issue con của Epic DUOS-125), phần tách storefront / PDF (08/10/2026) và tài liệu sản phẩm Duos phần Quote (docs 09/07/2026). Không suy diễn nội dung; cần bổ sung các tài liệu này hoặc đọc lại ticket Jira để có nguồn đối chiếu.",
  "kb_ids": [
    "KB-001",
    "KB-004",
    "KB-007",
    "KB-011",
    "KB-012",
    "KB-013",
    "KB-014",
    "KB-015",
    "KB-017",
    "KB-018",
    "KB-019",
    "KB-020",
    "KB-025",
    "KB-026",
    "KB-027",
    "KB-028",
    "KB-029",
    "KB-030",
    "KB-031",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-044",
    "KB-045",
    "KB-046",
    "KB-047",
    "KB-048",
    "KB-049",
    "KB-050",
    "KB-051",
    "KB-052",
    "KB-053",
    "KB-054",
    "KB-055",
    "KB-056",
    "KB-057",
    "KB-058",
    "KB-059",
    "KB-060",
    "KB-061",
    "KB-070",
    "KB-072"
  ]
}
```

## OQ-quote-request-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Trang \"Quote PDF template\" trên staging 08/10/2026 dùng nhãn và đường vào khác ticket / tài liệu tham chiếu: vào từ \"Quote management\" › \"Advanced settings\" (ticket ghi \"Advanced settings\" của quote button settings), màu \"Heading color\" / \"Text color\" / \"Background color\" (tham chiếu ghi Primary / Background / Text), font \"Header settings\" / \"Content settings\" (tham chiếu ghi Headings / Body), nút \"Go to translation\" (tham chiếu ghi \"Go to Translations\"). Nhãn trên staging có phải bản chốt không? Cần PO/Dev xác nhận để checklist dùng đúng tên UI.",
  "kb_ids": [
    "KB-062",
    "KB-065",
    "KB-067"
  ],
  "related_questions": [
    "Nhãn và đường vào trên staging (\"Quote management\" › \"Advanced settings\", \"Heading color\" / \"Text color\" / \"Background color\", \"Header settings\" / \"Content settings\", \"Go to translation\") có phải bản chốt không?"
  ]
}
```

## OQ-quote-request-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-012",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-pdf-and-history",
  "summary": "Nghi lỗi chờ Dev: mở trang \"Quote PDF template\" trên staging (08/10/2026) phát sinh 6 lần HTTP 403 tới Google Web Fonts API, danh sách Font family có thể không tải đủ; nguồn suy đoán do API key của staging. Dev xác nhận đây là lỗi môi trường hay lỗi sản phẩm, và production có bị ảnh hưởng không? Trong lúc chờ, checklist chỉ theo dõi như regression watch, không dùng làm kết quả mong đợi.",
  "kb_ids": [
    "KB-071"
  ],
  "related_questions": [
    "Lỗi HTTP 403 tới Google Web Fonts API khi mở trang \"Quote PDF template\" là lỗi môi trường staging hay lỗi sản phẩm, và production có bị ảnh hưởng (danh sách Font family thiếu) không?"
  ]
}
```

## OQ-quote-request-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Theo Jira DUOS-264 (chưa xác nhận) quote modal tự mở sau khi bấm \"Add to quote\" trên product page. Hành vi này còn đúng ở bản hiện tại không, và quote lưu sản phẩm/variant/quantity như thế nào?",
  "check_ids": [
    "quote-request-widget:CHK-004",
    "quote-request-widget:CHK-005"
  ],
  "related_questions": [
    "Theo Jira DUOS-251 (chưa xác nhận) bấm \"Add to quote\" ở cart page thêm toàn bộ sản phẩm của cart vào quote và cart không bị clear. Hai hành vi này còn đúng ở bản hiện tại không?"
  ]
}
```

## OQ-quote-request-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Theo Jira DUOS-251 (chưa xác nhận) khi Add to quote từ cart mà sản phẩm đã có trong quote thì quantity được cộng dồn. Còn đúng không, và áp thế nào khi tổng quantity vượt quantity rule maximum?",
  "check_ids": [
    "quote-request-widget:CHK-006"
  ]
}
```

## OQ-quote-request-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Theo Jira DUOS-251 / DUOS-178 / DUOS-179 (chưa xác nhận) quote modal hiện inline error và disable \"Submit request\" khi quantity vi phạm quantity rule. Câu báo lỗi chuẩn và cách so biên (bằng minimum/maximum có hợp lệ không) là gì?",
  "check_ids": [
    "quote-request-widget:CHK-007"
  ]
}
```

## OQ-quote-request-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Theo Jira DUOS-178 / DUOS-179 (chưa xác nhận) request quote form trên storefront tôn trọng volume pricing. Giá trong quote modal có đổi theo bậc quantity của catalog location không?",
  "check_ids": [
    "quote-request-widget:CHK-008"
  ]
}
```

## OQ-quote-request-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Tài liệu tổng hợp ghi chỉ B2B customer mới submit được yêu cầu báo giá, nhưng trang cài đặt trên staging có tuỳ chọn \"Not logged-in users\" (\"they will be requested to register a B2B account inside quote request\"). Khi bật/tắt tuỳ chọn này, khách chưa đăng nhập và customer không thuộc company thấy gì và có gửi được yêu cầu không?",
  "check_ids": [
    "quote-request-widget:CHK-009"
  ],
  "related_questions": [
    "Khi bật \"Not logged-in users\", khách chưa đăng nhập thấy gì khi bấm \"Add to quote\", luồng đăng ký tài khoản B2B trong quote request diễn ra thế nào, và điều này khớp thế nào với mô tả \"chỉ B2B customer mới submit được\"?"
  ]
}
```

## OQ-quote-request-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Jira DUOS-394 (chưa xác nhận) mô tả empty state của quote modal có CTA cấu hình được (button text + link), còn trang cài đặt trên staging chỉ có checkbox \"Show a button when quote is empty\". Text và link của nút cấu hình ở đâu, và khi bật thì empty state hiển thị gì?",
  "check_ids": [
    "quote-request-widget:CHK-011"
  ],
  "related_questions": [
    "Empty state của quote modal cấu hình ở đâu: chỉ checkbox \"Show a button when quote is empty\" hay còn ô button text + link như Jira DUOS-394 mô tả?"
  ]
}
```

## OQ-quote-request-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Hai ô \"Add to cart button selector\" và \"Form selector\" trên trang \"Quote widget settings\" có tác dụng gì trên storefront (đặt nút cạnh selector nào, đọc variant/quantity từ form nào), và khi nào merchant cần dùng?",
  "check_ids": [
    "quote-request-widget:CHK-013"
  ]
}
```

## OQ-quote-request-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-request-widget",
  "summary": "Theo Jira DUOS-207 (chưa xác nhận) Quote đã được verify cùng Quick order trên Keystone/Kaleidoscope, Trade và Kettle. Danh sách theme hỗ trợ này còn đúng không, và với theme trả phí merchant cần đội Duos làm gì để nút hiển thị?",
  "check_ids": [
    "quote-request-widget:CHK-014"
  ],
  "related_questions": [
    "Danh sách theme B2B được hỗ trợ (Keystone/Kaleidoscope, Trade, Kettle) còn đúng không, và với theme trả phí thì merchant cần đội Duos làm gì để nút hiển thị?"
  ]
}
```

## OQ-quote-request-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-274 / DUOS-297 / DUOS-300 (chưa xác nhận) merchant đặt được giá riêng cho từng line, custom discount và custom shipping fee cho quote. Các thao tác này còn đúng không, lưu ở đâu và sau khi gửi báo giá quote chuyển sang trạng thái/tab nào?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-004"
  ]
}
```

## OQ-quote-request-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-276 (chưa xác nhận) merchant tìm sản phẩm để thêm item vào quote trên Portal. Còn đúng không; giá của line thêm mới lấy từ đâu; và merchant có tạo quote mới từ Portal được không (Jira DUOS-277 \"[Portal] Create Quote\" đang To Do)?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-005"
  ],
  "related_questions": [
    "Merchant có tạo quote trực tiếp trên Portal được không (Jira DUOS-277 \"[Portal] Create Quote\" đang To Do), hay chỉ thêm item vào quote buyer đã gửi?"
  ]
}
```

## OQ-quote-request-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-184 (chưa xác nhận) buyer re-quote bằng counter offer, merchant chọn accept hoặc gửi revised quote. Counter offer được sửa những gì (giá, quantity, line), thực hiện trên surface nào, và mỗi bước đổi status/tab nào?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-006"
  ]
}
```

## OQ-quote-request-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo tài liệu tổng hợp quotation (chưa xác nhận) buyer resubmit được quote đã reject hoặc đã closed (replicate quotation). Resubmit tạo quote mới hay mở lại quote cũ, sao chép những gì, và thực hiện trên surface nào?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-007"
  ]
}
```

## OQ-quote-request-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-185 / DUOS-196 (chưa xác nhận) reject mở modal \"Are you sure to reject this quote?\" với lý do không bắt buộc (placeholder \"E.g. I need better offer...\"), nút \"Cancel\" và \"Confirm rejection\". Modal này dành cho buyer, merchant hay cả hai, trên surface nào?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-008"
  ],
  "related_questions": [
    "Modal \"Are you sure to reject this quote?\" dành cho buyer, merchant hay cả hai, và xuất hiện trên Portal, Customer Account hay cả hai?"
  ]
}
```

## OQ-quote-request-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-185 / DUOS-196 / DUOS-213 / DUOS-214 (chưa xác nhận) approve và reject trên Portal lẫn Customer Account đều có reason không bắt buộc, lý do reject được lưu vào quote và history. Lý do approve có được lưu/hiển thị không, và history ghi dòng gì?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-009"
  ]
}
```

## OQ-quote-request-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "Theo Jira DUOS-305 (chưa xác nhận) có email requote. Email gửi khi nào (counter offer, revised quote), cho ai và gồm nội dung gì? (Cấu hình nhóm thông báo Quotations thuộc object Notifications.)",
  "check_ids": [
    "quote-negotiation-and-status:CHK-015"
  ],
  "related_questions": [
    "Email requote (Jira DUOS-305) gửi khi nào, cho ai và nội dung gồm gì?"
  ]
}
```

## OQ-quote-request-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-negotiation-and-status",
  "summary": "QA KB Feature Map (Jira DUOS-400, DUOS-176, không ghi ngày) ghi khi revoke role của member thì quote của member đó được reassign cho owner của company location sau 5 phút, nhưng câu Dev BE 14/07/2026 chỉ nói hệ thống kiểm tra có cần reassign cho owner location. Đối tượng được reassign có đúng là quote của member không, điều kiện nào thì \"cần reassign\", và history của quote có ghi việc này không?",
  "check_ids": [
    "quote-negotiation-and-status:CHK-017"
  ]
}
```

## OQ-quote-request-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo Jira DUOS-215 / DUOS-216 (rule draft, chỉ theo ticket) loại áp giá permanent / one-time deal được chọn riêng cho từng line qua popover, thay cho một checkbox cho cả quote của Jira DUOS-182. Còn đúng không, và line mới mặc định là loại nào?",
  "check_ids": [
    "quote-price-application:CHK-001",
    "quote-price-application:CHK-003"
  ],
  "related_questions": [
    "Theo Jira DUOS-215 / DUOS-216 (rule draft, chỉ theo ticket) quote có bulk action \"Set as permanent price\" và \"Set as one-time deal\". Nhãn và hành vi này còn đúng không, và bulk chỉ đổi các line được chọn?",
    "Line mới trong quote mặc định là permanent hay one-time deal?"
  ]
}
```

## OQ-quote-request-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo tài liệu tổng hợp 17/07/2026 (Jira DUOS-215 / DUOS-216, chưa xác nhận) badge `EyeFirst` biểu thị one-time deal và `ProductCost` biểu thị permanent price. Badge/nhãn này còn đúng trên UI hiện tại không?",
  "check_ids": [
    "quote-price-application:CHK-002"
  ],
  "related_questions": [
    "Badge `EyeFirst` / `ProductCost` và nhãn bulk action \"Set as permanent price\" / \"Set as one-time deal\" có còn đúng trên UI hiện tại không?"
  ]
}
```

## OQ-quote-request-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo Jira DUOS-215 / DUOS-216 / DUOS-151 / DUOS-174 (rule draft, chỉ theo ticket) khi quote được accept, line permanent cập nhật giá B2B catalog của đúng company location của quote, kể cả volume pricing và quantity rule minimum. Cập nhật diễn ra lúc nào, ghi đè giá đang có ra sao, và xử lý volume pricing / quantity rule minimum thế nào?",
  "check_ids": [
    "quote-price-application:CHK-004",
    "quote-price-application:CHK-005"
  ],
  "related_questions": [
    "Line permanent cập nhật giá catalog của company location cụ thể thế nào: ghi đè giá đang có, xử lý volume pricing và quantity rule minimum ra sao, có ảnh hưởng location khác của cùng company không?",
    "Khi line permanent cập nhật giá catalog của company location của quote, location khác cùng company (hoặc catalog dùng chung nhiều location) có bị ảnh hưởng không?"
  ]
}
```

## OQ-quote-request-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo Jira DUOS-187 (rule draft, chỉ theo ticket) khi quote được accept, line one-time deal được xử lý qua draft order. Draft order được tạo tự động hay qua CTA, chứa những gì, và giá catalog có giữ nguyên không?",
  "check_ids": [
    "quote-price-application:CHK-006"
  ]
}
```

## OQ-quote-request-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Known issues Duos xếp \"draft order từ one-time deal không áp được net-term deposit\" là intentional limitation do nền tảng Shopify, nhưng chưa có quyết định PO/Dev có ngày. PO/Dev xác nhận đây là giới hạn chấp nhận được không, merchant/buyer có được báo không, và validate credit trên draft order này xử lý ra sao?",
  "check_ids": [
    "quote-price-application:CHK-007"
  ],
  "related_questions": [
    "PO/Dev có xác nhận việc draft order từ one-time deal không áp net-term deposit là giới hạn chấp nhận được không, và merchant / buyer có được báo không?"
  ]
}
```

## OQ-quote-request-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo Jira DUOS-183 (chưa xác nhận) sau khi accept quote có hai CTA `Create order` và `Create draft order`. CTA nằm ở surface nào, ai bấm được, mỗi CTA tạo gì, và quote chuyển sang trạng thái nào sau đó?",
  "check_ids": [
    "quote-price-application:CHK-008"
  ]
}
```

## OQ-quote-request-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Khi accept một quote có đồng thời line permanent và line one-time deal thì hệ thống tạo gì (một order, một draft order, hay cả hai), line nào vào đơn nào, và giá catalog được cập nhật lúc nào?",
  "check_ids": [
    "quote-price-application:CHK-009"
  ],
  "related_questions": [
    "Khi accept một quote có cả line permanent và line one-time deal thì hệ thống tạo những gì (một order, một draft order, hay cả hai) và giá catalog được cập nhật lúc nào?"
  ]
}
```

## OQ-quote-request-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-price-application",
  "summary": "Theo Jira DUOS-178 / DUOS-179 (chưa xác nhận) quote detail trên Portal và màn submitted quote detail tôn trọng quantity rule và volume pricing. Khi quantity vi phạm thì chặn lưu hay chỉ cảnh báo, và màn submitted quote detail nằm ở surface nào?",
  "check_ids": [
    "quote-price-application:CHK-010"
  ],
  "related_questions": [
    "Khi quantity trong quote detail vi phạm quantity rule thì Portal chặn lưu hay chỉ cảnh báo, và màn submitted quote detail nằm ở surface nào?"
  ]
}
```

## OQ-quote-request-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Mỗi tuỳ chọn Design / Content của trang \"Quote PDF template\" tác động thế nào lên preview và PDF của quote, giá trị mặc định là gì (kể cả Valid days — preview chỉ hiện giá trị mẫu \"Valid for 30 days\"), và cấu hình được lưu thế nào?",
  "check_ids": [
    "quote-pdf-and-history:CHK-006"
  ],
  "related_questions": [
    "Mỗi tuỳ chọn Design / Content của mẫu PDF tác động thế nào lên PDF của quote thật, và giá trị mặc định là gì?"
  ]
}
```

## OQ-quote-request-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Theo Jira DUOS-211 / DUOS-217 (chưa xác nhận) quote export được PDF từ Portal. PDF của quote thật gồm những mục nào luôn có, và quote nhiều trang, logo, định dạng tiền tệ hiển thị ra sao?",
  "check_ids": [
    "quote-pdf-and-history:CHK-007"
  ],
  "related_questions": [
    "PDF của quote thật trông thế nào trên Portal và Customer Account: các mục nào luôn có, quote nhiều trang, logo và định dạng tiền tệ hiển thị ra sao?"
  ]
}
```

## OQ-quote-request-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Theo Jira DUOS-211 / DUOS-217 (chưa xác nhận) quote export được PDF từ Customer Account. PDF ở Customer Account có giống PDF ở Portal không, và buyer xuất được ở trạng thái quote nào?",
  "check_ids": [
    "quote-pdf-and-history:CHK-008"
  ]
}
```

## OQ-quote-request-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Cấu hình trên trang \"Quote PDF template\" có áp lên PDF xuất từ cả Portal và Customer Account không, và áp ngay cho quote đã tạo trước đó?",
  "check_ids": [
    "quote-pdf-and-history:CHK-009"
  ]
}
```

## OQ-quote-request-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Theo Jira DUOS-223 / DUOS-224 (chưa xác nhận) bản dịch của quote PDF quản lý ở trang Translations. Field nào của PDF dịch được, và PDF chọn ngôn ngữ theo gì (ngôn ngữ của buyer hay của store)?",
  "check_ids": [
    "quote-pdf-and-history:CHK-010"
  ],
  "related_questions": [
    "Những field nào của quote PDF dịch được ở trang Translations và PDF chọn ngôn ngữ theo gì (ngôn ngữ của buyer, của store)?"
  ]
}
```

## OQ-quote-request-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "History log của quote ghi những sự kiện nào (submit, báo giá, counter offer, accept, reject kèm lý do, reassign…) và mỗi dòng gồm những thông tin gì?",
  "check_ids": [
    "quote-pdf-and-history:CHK-011"
  ]
}
```

## OQ-quote-request-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "API `/api/quotations/{id}/logs` dùng method gì, trả response gì, và phiên của store khác hoặc không đăng nhập gọi tới thì trả mã gì?",
  "check_ids": [
    "quote-pdf-and-history:CHK-012"
  ],
  "related_questions": [
    "API `/api/quotations/{id}/logs` dùng method gì, trả response gì và ai được gọi?"
  ]
}
```

## OQ-quote-request-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Theo Jira DUOS-192 / DUOS-194 (chưa xác nhận) history log trên Customer Account có cùng format với Portal. Buyer có thấy toàn bộ sự kiện (kể cả ghi chú nội bộ của merchant) không?",
  "check_ids": [
    "quote-pdf-and-history:CHK-013"
  ]
}
```

## OQ-quote-request-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "quote-pdf-and-history",
  "summary": "Theo Jira DUOS-222 (chưa xác nhận) payment information của quote gồm Subtotal, Shipping, Estimated tax và Total. Nó hiển thị ở đâu (Portal, Customer Account, PDF) và Estimated tax được tính thế nào?",
  "check_ids": [
    "quote-pdf-and-history:CHK-014"
  ],
  "related_questions": [
    "Payment information của quote (Subtotal, Shipping, Estimated tax, Total) hiển thị ở đâu (Portal, Customer Account, PDF) và Estimated tax được tính thế nào?"
  ]
}
```

## OQ-quote-request-046 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-046",
  "type": "OPEN_ISSUE",
  "feature_id": "quote-request-widget",
  "summary": "Câu báo lỗi chính xác và cách tính boundary khi quantity vi phạm increment / minimum / maximum trong quote modal là gì (các con số trong tài liệu chỉ là ví dụ)?",
  "kb_ids": [
    "KB-014",
    "KB-016",
    "KB-017"
  ]
}
```

## OQ-quote-request-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-quote-request-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "PO/Dev xác nhận hay sửa các hiện trạng sau (ghi nhận trên staging, khảo sát 30/09–08/10/2026), hiện đang được checklist dùng làm kỳ vọng tạm thời nhưng chưa có ai xác nhận là hành vi đúng: pdf template preview price application column: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), merchant staff, store có 0 quote), preview của trang \"Quote PDF template\" · quote management advanced settings: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), merchant staff, store có 0 quote), trang \"Quote management\" có section \"A · quote management empty state: Trên staging (khảo sát 08/10/2026, store staging Plus (Free plan), merchant staff, store có 0 quote), trang \"Quote management\" khi chưa có q.",
  "kb_ids": [
    "KB-023",
    "KB-024",
    "KB-068"
  ],
  "check_ids": [
    "quote-negotiation-and-status:CHK-002",
    "quote-negotiation-and-status:CHK-003",
    "quote-pdf-and-history:CHK-005"
  ]
}
```

## OQ-quote-request-048 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-quote-request-048",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: quote-request-widget, quote-price-application. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "quote-request-widget",
    "quote-price-application"
  ]
}
```
