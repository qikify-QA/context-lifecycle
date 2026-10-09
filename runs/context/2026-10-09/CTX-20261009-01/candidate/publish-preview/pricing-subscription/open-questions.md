# Open Questions — Pricing & Subscription — modular pricing theo module, tier theo Shopify plan, trang Subscription, gói gợi ý / trial, banner giữ giá cũ, khoá tính năng theo module đã mua và theo Shopify Plus

Tổng: 43 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 3
- NEEDS_CONFIRMATION: 29
- OPEN_ISSUE: 11

## OQ-pricing-subscription-001 — CONFLICT

```json
{
  "oq_id": "OQ-pricing-subscription-001",
  "type": "CONFLICT",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Từ đợt giá hiện hành, module User & Permission và B2B Registration miễn phí (như đợt Mar 2026 / Apr 2026) hay trả phí theo Epic Jira DUOS-430 (User & Permission $90 non-Plus / $150 Plus, B2B Registration $30 / $50)? Trang Subscription trên staging 08/10/2026 (store Plus, Free plan) đã hiển thị Users & permissions $150.00 và B2B Registration $50.00 nhưng quan sát này không thay quyết định của PO. Cần PO chốt.",
  "kb_ids": [
    "KB-003",
    "KB-004",
    "KB-024",
    "KB-005",
    "KB-025"
  ],
  "side_a": "Theo PO 23/03/2026 (comment Jira DUOS-320) và Jira DUOS-329, đợt giá Mar 2026 cho User & Permission miễn phí, luôn được chọn, giá \"$0.00\", checkbox disabled; theo Jira DUOS-377 (Epic Done 11/06/2026, đợt Apr 2026), User & Permission và B2B Registration miễn phí ở mọi tier Shopify plan.",
  "side_b": "Theo description Epic Jira DUOS-430 \"Pricing Oct 2026\" (To Do, đề xuất; tóm tắt trong QA business rule Duos cập nhật 07/10/2026), User & Permission có giá $90/tháng cho store non-Plus và $150/tháng cho store Plus, B2B Registration $30 / $50; khảo sát staging 08/10/2026 thấy giá Plus tương ứng đã hiển thị.",
  "conflict_group": "CONF-DUOS-pricing-subscription-01"
}
```

## OQ-pricing-subscription-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Nếu User & Permission chuyển sang trả phí ở đợt Oct 2026: module này còn bắt buộc chọn không, nút \"Subscribe\" được enable theo điều kiện nào, các tính năng dựa trên role (chặn checkout theo permission, duyệt của Junior Buyer…) hoạt động thế nào khi merchant không mua User & Permission (GAP-13 task Testlane DUOS-005); và merchant cũ đang dùng miễn phí User & Permission / B2B Registration có bị khoá hoặc bị tính phí không, từ ngày nào (GAP-06)? Cần PO trả lời.",
  "kb_ids": [
    "KB-003",
    "KB-004",
    "KB-024"
  ],
  "conflict_group": "CONF-DUOS-pricing-subscription-01",
  "related_questions": [
    "Từ đợt giá hiện hành, User & Permission và B2B Registration miễn phí hay trả phí ($90 / $150 và $30 / $50 theo Epic Jira DUOS-430), và từ ngày nào?",
    "Nếu User & Permission trả phí: module này còn bắt buộc chọn không, nút \"Subscribe\" enable theo điều kiện nào, tính năng dựa trên role chạy ra sao khi merchant không mua User & Permission (GAP-13 task Testlane DUOS-005), và merchant cũ đang dùng miễn phí có bị khoá / tính phí không (GAP-06)?",
    "Ở đợt giá đang áp dụng, User & Permission và B2B Registration miễn phí (theo PO 23/03/2026 và Jira DUOS-377) hay trả phí ($90 / $150 và $30 / $50 mỗi tháng cho store non-Plus / Plus theo Epic Jira DUOS-430), áp từ ngày nào, và merchant cũ đang dùng miễn phí có bị tính phí không (GAP-06 task Testlane DUOS-005)?",
    "Nếu User & Permission còn miễn phí thì item này có được check sẵn, disabled, giá \"$0.00\" và nút \"Subscribe\" có disable khi chỉ có module miễn phí được chọn không; nếu chuyển sang trả phí thì User & Permission còn bắt buộc chọn không và nút \"Subscribe\" enable theo điều kiện nào?"
  ],
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-003",
    "subscription-page:CHK-005"
  ]
}
```

## OQ-pricing-subscription-003 — CONFLICT

```json
{
  "oq_id": "OQ-pricing-subscription-003",
  "type": "CONFLICT",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Bảng giá đang áp dụng cho 4 module B2B Quote Request, Quick order CSV & SKU Order, B2B Shopping List, B2B Finance & Credit là bảng 4 tier của đợt Apr 2026 (Jira DUOS-377, Epic Done) hay bảng 2 tier non-Plus / Plus của đợt Oct 2026 (Epic Jira DUOS-430, To Do, đề xuất)? Staging 08/10/2026 (store Plus) đã hiển thị cột Plus của bảng Oct 2026 nhưng Epic vẫn To Do. Cần PO chốt đợt giá hiện hành và ngày áp dụng.",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-005",
    "KB-009"
  ],
  "side_a": "Theo description Jira DUOS-377 (Epic Non-Plus Pricing, Done 11/06/2026, ghi trong Decision log Duos), từ đợt Apr 2026 Portal tự nhận diện Shopify plan và hiển thị giá theo 4 tier Basic / Grow / Advanced / Plus: B2B Quote Request $9 / $19 / $39 / $69, Quick order CSV & SKU Order $19 / $29 / $49 / $79, B2B Shopping List $29 / $49 / $69 / $99, B2B Finance & Credit $39 / $69 / $99 / $149 mỗi tháng.",
  "side_b": "Theo description Epic Jira DUOS-430 \"Pricing Oct 2026\" (To Do, đề xuất), chỉ còn 2 tier non-Plus / Plus và customization gộp vào giá: B2B Quote Request $30 / $50, Quick order CSV & SKU Order $70 / $100, B2B Shopping List $90 / $150, B2B Finance & Credit $100 / $200 mỗi tháng; staging 08/10/2026 (store Plus) hiển thị đúng cột Plus này.",
  "conflict_group": "CONF-DUOS-pricing-subscription-03",
  "related_questions": [
    "Bảng giá đang áp dụng cho B2B Quote Request, Quick order CSV & SKU Order, B2B Shopping List, B2B Finance & Credit là 4 tier Basic / Grow / Advanced / Plus (đợt Apr 2026, Jira DUOS-377) hay 2 tier non-Plus / Plus (đợt Oct 2026, Epic Jira DUOS-430), áp từ ngày nào, và store Basic / Grow / Advanced dùng giá tier nào (GAP-01 task Testlane DUOS-005)?"
  ],
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-004"
  ]
}
```

## OQ-pricing-subscription-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Khi chỉ còn 2 tier non-Plus / Plus (đợt Oct 2026): store Basic / Grow / dev store dùng giá tier nào và cụm 'hiển thị cho Advanced' nghĩa là gì (GAP-01); plan Custom / Affiliate dùng giá nào; chiết khấu annual 20% còn không; store cài lại app có được trial lại không (GAP-11, GAP-12)? Ngoài ra cụm '(Plus + VAT validation)' trong ô User & Permission đợt Apr 2026 nghĩa là gì? Cần PO trả lời.",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-010"
  ],
  "conflict_group": "CONF-DUOS-pricing-subscription-03",
  "related_questions": [
    "Bảng giá đang áp dụng cho B2B Quote Request, Quick order CSV & SKU Order, B2B Shopping List, B2B Finance & Credit là 4 tier đợt Apr 2026 hay 2 tier đợt Oct 2026, và áp từ ngày nào?",
    "Khi chỉ còn 2 tier non-Plus / Plus: store Basic / Grow / dev store dùng giá tier nào, cụm 'hiển thị cho Advanced' nghĩa là gì (GAP-01), plan Custom / Affiliate dùng giá nào, annual 20% còn không, store cài lại app có được trial lại không (GAP-11, GAP-12), và cụm '(Plus + VAT validation)' trong ô User & Permission đợt Apr 2026 nghĩa là gì?",
    "Ở đợt Oct 2026, chiết khấu bundle (khoảng 5% / 10%) và trial khoảng 30 ngày còn giữ hay bỏ (GAP-02)?",
    "Ở đợt giá Oct 2026, chiết khấu bundle (khoảng 5% khi chọn 4 module, khoảng 10% khi chọn 6 module, User & Permission tính vào số module) còn giữ hay bỏ, và tổng 6 module hiển thị là bao nhiêu cho store non-Plus / Plus (GAP-02 task Testlane DUOS-005)?"
  ],
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-006"
  ]
}
```

## OQ-pricing-subscription-005 — CONFLICT

```json
{
  "oq_id": "OQ-pricing-subscription-005",
  "type": "CONFLICT",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Ở đợt giá Oct 2026, chiết khấu bundle (khoảng 5% cho 4 extension, khoảng 10% cho 6 extension) và trial khoảng 30 ngày còn giữ hay bỏ (GAP-02, Blocker)? Kết quả quyết định tổng giá, giá gạch, banner trial và cả phép so sánh của banner giữ giá cũ. Cần PO chốt.",
  "kb_ids": [
    "KB-011",
    "KB-012",
    "KB-037",
    "KB-010",
    "KB-036"
  ],
  "side_a": "Theo description Epic Jira DUOS-430 \"Pricing Oct 2026\" (To Do, đề xuất), giữ nguyên chiết khấu bundle khoảng 5% cho 4 extension, khoảng 10% cho 6 extension và khoảng 30 ngày trial; bảng giá Oct 2026 ghi tổng 6 module sau 10% off là $369 / $630 mỗi tháng.",
  "side_b": "Theo PO 02/10/2026 (comment Jira DUOS-431), có lẽ sẽ không giảm giá bundle nữa; theo Dev 02/10/2026 (Jira DUOS-431), setting chiết khấu ở admin trên staging đang là 0%. Phía này chưa nói gì về trial.",
  "conflict_group": "CONF-DUOS-pricing-subscription-02"
}
```

## OQ-pricing-subscription-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Quyết định PO 23/03/2026 (Jira DUOS-320) ghi modular pricing 'không free plan' và app chỉ miễn phí cho dev store / Plus sandbox, trong khi Jira DUOS-365 (PO 25/03/2026) có trạng thái store Free plan và Jira DUOS-375 có permanent free; Decision log Duos ghi mục 23/03/2026 'một phần bị thay' mà không nêu phần nào. Hiện tại app có free plan không, dev store / Plus sandbox có còn miễn phí (và dev store có bị chặn approve charge theo Jira DUOS-124) không, và 'yearly 20%' có đúng là chiết khấu cho chu kỳ năm? Cần PO xác nhận.",
  "kb_ids": [
    "KB-010",
    "KB-016"
  ],
  "related_questions": [
    "Hiện app có free plan không, dev store / Plus sandbox còn miễn phí không (và dev store có bị chặn approve charge không), và 'yearly 20%' có đúng là chiết khấu cho chu kỳ năm?",
    "Hiện app có free plan không; 'launch window' của permanent free (Jira DUOS-375) là khoảng thời gian nào và store cài trong đó có còn miễn phí khi đợt Oct 2026 tính phí không; dev store và Plus sandbox còn miễn phí không, và dev store có bị chặn approve charge không?"
  ],
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-011"
  ]
}
```

## OQ-pricing-subscription-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Permanent free theo Jira DUOS-375 (04/2026): 'launch window' là khoảng thời gian nào, và store đã vào trong launch window có còn miễn phí khi đợt Oct 2026 tính phí không? Banner \"You've earned FREE access to all features!\" có còn hiện cho các store này sau khi áp giá mới không? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-015",
    "KB-014"
  ],
  "related_questions": [
    "'Launch window' của permanent free (Jira DUOS-375) là khoảng thời gian nào, store trong launch window còn miễn phí khi đợt Oct 2026 tính phí không, và banner \"You've earned FREE access to all features!\" còn hiện cho họ không?"
  ]
}
```

## OQ-pricing-subscription-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Store early-bird (Jira DUOS-333) được xác định theo tiêu chí nào, 6 module core mà store early-bird giữ quyền là những module nào, và quyền này còn giữ khi áp giá Oct 2026 không? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-017",
    "KB-029"
  ],
  "related_questions": [
    "Store early-bird (Jira DUOS-333) được xác định theo tiêu chí nào, 6 module core gồm những module nào, và store early-bird còn giữ quyền dùng 6 module này (module mới là add-on) khi áp giá Oct 2026 không?",
    "Store early-bird (Jira DUOS-333) được xác định theo tiêu chí nào, 6 module core là những module nào, và quyền này còn giữ khi áp giá Oct 2026 không?"
  ],
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-012"
  ]
}
```

## OQ-pricing-subscription-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-009",
  "type": "OPEN_ISSUE",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Các nguồn liên quan pricing được viện dẫn nhưng không có trong bộ tài liệu: mục bảng giá / giới hạn plan của tài liệu sản phẩm Duos (docs 09/07/2026), danh sách câu hỏi mở gốc về pricing (DUOS-430 / DUOS-431), nội dung Jira DUOS-324 (feature-based pricing, Done — QA ghi chưa đọc) và Jira DUOS-427 (Pricing update, To Do, trống). Cần bổ sung các nguồn này trước khi dựng kết quả mong đợi cho bảng giá.",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-001"
  ],
  "related_questions": [
    "Mục bảng giá / giới hạn plan của tài liệu sản phẩm Duos (docs 09/07/2026), câu hỏi mở gốc về pricing (Jira DUOS-430 / DUOS-431), nội dung Jira DUOS-324 (feature-based pricing) và Jira DUOS-427 (Pricing update) nói gì?"
  ]
}
```

## OQ-pricing-subscription-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Các label UI của trang Subscription ở store Free plan đang lấy theo staging 08/10/2026 và chỉ có QA lead xác nhận lưu, chưa có PO/Dev xác nhận: CTA \"Build my plan\" (Jira DUOS-365 ghi \"Build my subscription\"), panel \"Current subscription\" với \"No items selected\", \"Subtotal\" \"-\", \"Total: $0 /mo\". Việc đổi CTA là chủ đích hay regression, và các label này có phải là bản đúng không? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-021",
    "KB-022"
  ],
  "related_questions": [
    "CTA \"Build my plan\" (staging) thay \"Build my subscription\" (Jira DUOS-365) là chủ đích hay regression, và các label \"Current subscription\", \"No items selected\", \"Subtotal\" \"-\", \"Total: $0 /mo\" có phải bản đúng không?"
  ]
}
```

## OQ-pricing-subscription-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Jira DUOS-329 mô tả trang pricing có nút \"Select all\", panel \"Estimate\" với toggle Monthly/Yearly (và giá gạch, banner early-bird / trial), nhưng khảo sát staging 08/10/2026 trên store Plus đang ở Free plan không thấy các thành phần này; QA đoán có thể do store đang là Free + Plus nhưng chưa có Dev xác nhận. Các thành phần này còn tồn tại không, và chỉ ẩn ở trạng thái nào? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-019",
    "KB-020"
  ],
  "related_questions": [
    "\"Select all\", panel \"Estimate\" và toggle Monthly/Yearly mô tả trong Jira DUOS-329 còn tồn tại trên trang Subscription không, và chỉ hiển thị ở trạng thái store nào (chưa subscribe nhưng không ở Free plan, đã subscribe)?",
    "\"Select all\", panel \"Estimate\", toggle Monthly/Yearly (và giá gạch, banner early-bird / trial) còn tồn tại không, và chỉ ẩn ở trạng thái store nào?"
  ],
  "check_ids": [
    "subscription-page:CHK-004"
  ]
}
```

## OQ-pricing-subscription-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-012",
  "type": "OPEN_ISSUE",
  "feature_id": "subscription-page",
  "summary": "Known issue (fixed trên staging bằng fallback frontend, Jira DUOS-431 — giữ regression): trang pricing từng hiển thị giá gạch trùng giá thật ở User & Permission (dạng \"~150~ 150\") khi chiết khấu admin bằng 0%. Cần theo dõi như regression mỗi khi đổi setting chiết khấu hoặc bảng giá; ngày chạy của TC-DUOS-303, TC-DUOS-304 xác nhận fix chưa được ghi.",
  "kb_ids": [
    "KB-027",
    "KB-026"
  ],
  "related_questions": [
    "Giá gạch trùng giá thật ở User & Permission (dạng \"~150~ 150\") khi chiết khấu admin 0% có tái xuất hiện sau mỗi lần đổi setting chiết khấu / bảng giá không, và TC-DUOS-303, TC-DUOS-304 xác nhận fix chạy ngày nào?"
  ]
}
```

## OQ-pricing-subscription-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Tài liệu pricing không ghi vai trò: ai trong phía merchant (chủ store, staff Shopify được cấp quyền app) được xem trang Subscription, chọn module, subscribe, thêm module và huỷ gói; inventory chỉ khảo sát bằng tài khoản merchant staff. Ma trận quyền cho trang pricing / subscription là gì? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-002",
    "KB-003",
    "KB-004",
    "KB-006",
    "KB-007",
    "KB-009",
    "KB-010",
    "KB-011",
    "KB-012",
    "KB-013",
    "KB-052",
    "KB-018",
    "KB-022",
    "KB-028"
  ],
  "related_questions": [
    "Ai trong phía merchant (chủ store, staff Shopify được cấp quyền vào app) được xem trang Subscription, chọn module, subscribe, thêm module và huỷ gói — ma trận quyền cho trang pricing / subscription là gì?"
  ],
  "check_ids": [
    "subscription-page:CHK-011"
  ]
}
```

## OQ-pricing-subscription-014 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-014",
  "type": "OPEN_ISSUE",
  "feature_id": "subscription-page",
  "summary": "Chưa quan sát store đã subscribe, store early-bird hay store đang trả giá cũ trên staging: modal huỷ gói, nút \"Add more items\" / \"Subscribe new pack\", banner early-bird và banner giữ giá cũ chỉ có mô tả theo ticket. Cần store staging ở các trạng thái này để quan sát.",
  "kb_ids": [
    "KB-028",
    "KB-029",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-045"
  ],
  "related_questions": [
    "Store đã subscribe, store early-bird và store đang trả giá cũ thấy trang Subscription thế nào trên staging (modal huỷ gói, \"Add more items\" / \"Subscribe new pack\", banner early-bird, banner giữ giá cũ)?"
  ]
}
```

## OQ-pricing-subscription-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-015",
  "type": "OPEN_ISSUE",
  "feature_id": "subscription-page",
  "summary": "Build / version staging của khảo sát 08/10/2026 không được ghi, nên các quan sát trang Subscription và extension hub không gắn được với bản build cụ thể.",
  "kb_ids": [
    "KB-005",
    "KB-020",
    "KB-021",
    "KB-023",
    "KB-025",
    "KB-050",
    "KB-051"
  ],
  "related_questions": [
    "Khảo sát staging 08/10/2026 của trang Subscription và extension hub chạy trên build / version nào?"
  ]
}
```

## OQ-pricing-subscription-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suggested-plans-and-trial",
  "summary": "Cờ isOldPlan trong điều kiện hiện SuggestedPlans được xác định thế nào (store theo bảng giá cũ, store early-bird, hay tiêu chí khác)? Dev FE chưa giải thích; 'store dùng pricing cũ' trong điều kiện banner permanent free có cùng nghĩa không? Cần Dev xác nhận. Điều kiện hiển thị SuggestedPlans hiện chỉ có mô tả code FE do Dev FE dẫn lại, chưa có spec PO: PO có xác nhận đây là điều kiện mong đợi không?",
  "kb_ids": [
    "KB-032",
    "KB-014"
  ],
  "related_questions": [
    "PO có xác nhận điều kiện hiển thị SuggestedPlans theo code frontend hiện tại (store không được coi là Shopify Plus: shopify_plus = false, test = false, plan không phải \"Plus Trial\"; partner_development = false; plan_name có giá trị và không phải staff; store không ở plan cũ (isOldPlan) hoặc là free user) là hành vi mong đợi không, và cờ isOldPlan được xác định thế nào?",
    "Banner \"30-day free trial unlocked\" có hiển thị cho store thoả điều kiện SuggestedPlans theo code frontend hiện tại khi chọn đủ tất cả extension không — PO có xác nhận điều kiện hiển thị SuggestedPlans (vế đầu của điều kiện banner) là hành vi mong đợi không?",
    "Điều kiện hiện SuggestedPlans theo code frontend hiện tại (không phải Plus, không partner_development, plan_name có giá trị và không phải staff, không ở plan cũ hoặc là free user) có đúng là hành vi PO/Dev mong muốn không?",
    "Cờ isOldPlan trong điều kiện SuggestedPlans được xác định thế nào (store theo bảng giá cũ, store early-bird hay tiêu chí khác), và có cùng nghĩa với 'store dùng pricing cũ' trong điều kiện banner permanent free không?"
  ],
  "check_ids": [
    "suggested-plans-and-trial:CHK-001",
    "suggested-plans-and-trial:CHK-003",
    "suggested-plans-and-trial:CHK-005"
  ]
}
```

## OQ-pricing-subscription-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-017",
  "type": "OPEN_ISSUE",
  "feature_id": "suggested-plans-and-trial",
  "summary": "Chưa có store non-Plus thật trên staging (store khảo sát là Plus, Free plan): SuggestedPlans, banner \"30-day free trial unlocked\" / số ngày trial còn lại, giá theo tier non-Plus, banner \"Shopify Plus required for this feature\" và trạng thái disabled của hai tuỳ chọn chặn checkout chưa được quan sát. Cần store non-Plus (hoặc BE chỉnh field của store staging) để quan sát.",
  "kb_ids": [
    "KB-031",
    "KB-032",
    "KB-034",
    "KB-035",
    "KB-047",
    "KB-048",
    "KB-054"
  ],
  "related_questions": [
    "SuggestedPlans, banner \"30-day free trial unlocked\" và số ngày trial còn lại hiển thị thế nào trên một store non-Plus thật?"
  ]
}
```

## OQ-pricing-subscription-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "Banner giữ giá cũ (Jira DUOS-431): PO có chốt đề xuất Dev 02/10/2026 không — banner hiện khi store có charge active, charge.price > 0 và charge.price khác giá mới tính từ plan.extensions; số tiền và chu kỳ lấy động từ charge.price / charge.interval; không dùng plan.price — thay cho điều kiện \"store đang có custom plan\" trong description (GAP-04 task Testlane DUOS-005)? Đồng thời các giải thích kèm theo (store cũ tiếp tục bị Shopify charge giá cũ tới khi đổi plan, bảng charges lưu snapshot, đổi giá áp một loạt cho mọi store) có được PO/Dev xác nhận là hành vi đúng không?",
  "kb_ids": [
    "KB-013",
    "KB-038",
    "KB-039",
    "KB-040",
    "KB-041",
    "KB-042",
    "KB-043",
    "KB-044",
    "KB-045"
  ],
  "related_questions": [
    "Store có charge active, charge.price > 0 và charge.price khác giá mới tính từ plan.extensions có thấy info banner giữ giá cũ ngay dưới dòng \"Bill monthly at…\" trên trang pricing không — PO có chốt điều kiện này (đề xuất Dev 02/10/2026, GAP-04 task Testlane DUOS-005) thay cho điều kiện \"store đang có custom plan\" của Jira DUOS-431 không?",
    "Banner giữ giá cũ có bị ẩn với store có charge.price bằng giá mới (dù plan là custom plan \"Custom: xxxx\"), store không có charge active, và store có charge.price = 0 không?",
    "PO có chốt đề xuất Dev 02/10/2026 không: banner hiện khi store có charge active, charge.price > 0 và charge.price khác giá mới tính từ plan.extensions; số tiền / chu kỳ lấy từ charge.price / charge.interval; không dùng plan.price — thay điều kiện \"store đang có custom plan\" của Jira DUOS-431 (GAP-04)? Các giải thích kèm theo (store cũ tiếp tục bị charge giá cũ, bảng charges lưu snapshot, đổi giá áp một loạt) có là hành vi đúng không?",
    "Banner giữ giá cũ hiển thị thế nào trên một store staging thật sự đang trả giá cũ?",
    "Store đã subscribe trước khi đổi bảng giá có tiếp tục bị Shopify charge đúng giá cũ (snapshot trong bảng charges lúc approve) cho tới khi đổi plan không, và đây có phải hành vi PO chấp nhận không?"
  ],
  "check_ids": [
    "legacy-price-retention-banner:CHK-001",
    "legacy-price-retention-banner:CHK-002",
    "legacy-price-retention-banner:CHK-005"
  ]
}
```

## OQ-pricing-subscription-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "charge.price dùng để so sánh trong điều kiện banner giữ giá cũ là giá trước hay sau chiết khấu bundle (GAP-03, Blocker)? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-039",
    "KB-011",
    "KB-012"
  ],
  "related_questions": [
    "charge.price dùng để so sánh trong điều kiện banner giữ giá cũ là giá trước hay sau chiết khấu bundle (GAP-03 task Testlane DUOS-005)?",
    "charge.price dùng để so sánh trong điều kiện banner là giá trước hay sau chiết khấu bundle (GAP-03)?"
  ],
  "check_ids": [
    "legacy-price-retention-banner:CHK-007"
  ]
}
```

## OQ-pricing-subscription-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "Thao tác nào được tính là 'change your plan' khiến store mất giá cũ — thêm module, bỏ module, đổi chu kỳ, huỷ rồi subscribe lại (GAP-07)? Cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-045",
    "KB-040",
    "KB-041"
  ],
  "related_questions": [
    "Thao tác nào được tính là 'change your plan' khiến store mất giá cũ — thêm module, bỏ module, đổi chu kỳ, huỷ rồi subscribe lại (GAP-07 task Testlane DUOS-005)?",
    "Thao tác nào được tính là 'change your plan' khiến store mất giá cũ — thêm module, bỏ module, đổi chu kỳ, huỷ rồi subscribe lại (GAP-07)?"
  ],
  "check_ids": [
    "legacy-price-retention-banner:CHK-006"
  ]
}
```

## OQ-pricing-subscription-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "Câu \"As one of our early partners, …\" trong banner giữ giá cũ áp cho mọi store đang trả giá cũ hay chỉ store early-bird (GAP-05)? Cần PO xác nhận.",
  "kb_ids": [
    "KB-041"
  ],
  "related_questions": [
    "Số tiền và chu kỳ trong banner giữ giá cũ có lấy từ charge.price / charge.interval của từng store (không hardcode \"$168/mo\" của text mẫu) không, và câu \"As one of our early partners, …\" áp cho mọi store đang trả giá cũ hay chỉ store early-bird (GAP-05 task Testlane DUOS-005)?",
    "Câu \"As one of our early partners, …\" áp cho mọi store đang trả giá cũ hay chỉ store early-bird (GAP-05), và store early-bird được xác định thế nào so với store đang trả giá cũ?"
  ],
  "check_ids": [
    "legacy-price-retention-banner:CHK-003"
  ]
}
```

## OQ-pricing-subscription-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-entitlement-gating",
  "summary": "Theo Dev 05/03/2026 (Jira DUOS-329), module chưa mua bị disable ở List extensions, Notifications và Translate; nhưng trên staging 08/10/2026 (store Free plan, 8 extension Inactive) row ở B2B extensions hub vẫn mở và lưu được trang cài đặt, switch Notifications và tab Translations không disabled (nguồn không gọi là lỗi). 'Disable' nghĩa là extension Inactive trên storefront / Customer Account hay khoá UI Portal (không mở / không lưu được)? Hành vi staging là đúng hay lệch rule? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-049",
    "KB-050",
    "KB-051",
    "KB-052"
  ],
  "related_questions": [
    "Với module chưa mua, 'disable' trong quyết định Dev 05/03/2026 nghĩa là extension Inactive trên storefront / Customer Account hay khoá UI Portal (không mở / không lưu được trang cài đặt, switch Notifications và tab Translations disabled)? Hành vi staging 08/10/2026 trên store Free plan (vẫn mở, lưu được, switch / tab không disabled) là đúng hay lệch?",
    "Với module chưa mua, 'disable' nghĩa là extension Inactive trên storefront / Customer Account hay khoá UI Portal (không mở / không lưu được trang cài đặt, switch Notifications và tab Translations disabled)? Hành vi staging Free plan là đúng hay lệch quyết định Dev 05/03/2026?",
    "Với extension chưa subscribe, row trên B2B extensions hub có bị khoá / ẩn hay vẫn mở và lưu được màn cài đặt như staging Free plan 08/10/2026? Câu hỏi này thuộc quy tắc khoá module chưa subscribe do object Pricing & Subscription sở hữu.",
    "(Thuộc Pricing & Subscription) Với extension chưa subscribe, row trên hub có bị khoá / ẩn không, hay vẫn mở được màn cài đặt như staging Free plan 08/10/2026?",
    "Với extension chưa subscribe, tab tương ứng trên trang Content & Translation có bị khoá UI không, hay chỉ extension đó Inactive phía buyer? Câu hỏi này thuộc quy tắc khoá module chưa subscribe do object Pricing & Subscription sở hữu.",
    "(Thuộc Pricing & Subscription) Với extension chưa subscribe, tab tương ứng trên trang Content & Translation bị khoá UI hay chỉ Inactive phía buyer?"
  ],
  "check_ids": [
    "module-entitlement-gating:CHK-006",
    "portal-navigation:CHK-010",
    "content-translations:CHK-007"
  ],
  "also_affects": [
    {
      "object_id": "portal-shell",
      "kb_ids": []
    }
  ]
}
```

## OQ-pricing-subscription-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-023",
  "type": "OPEN_ISSUE",
  "feature_id": "module-entitlement-gating",
  "summary": "Known issue (nghi vấn — chờ Dev, Minor): alert ở B2B extensions hub, B2B Company management và Users & permission (store Free plan) ghi \"…please upgrade to the Premium plan.\" trong khi mô hình giá là modular, không có gói \"Premium plan\". Cần Dev/PO quyết định sửa copy; giữ làm điểm theo dõi, không dùng copy hiện tại làm kết quả mong đợi.",
  "kb_ids": [
    "KB-053"
  ],
  "related_questions": [
    "Copy alert \"…please upgrade to the Premium plan.\" sẽ được sửa thế nào khi mô hình giá là modular?"
  ]
}
```

## OQ-pricing-subscription-024 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-024",
  "type": "OPEN_ISSUE",
  "feature_id": "module-entitlement-gating",
  "summary": "Known issue (open — minor, code chết): key ngôn ngữ non_plus_banner (\"Your current Shopify plan does not support…\") có trong file ngôn ngữ frontend nhưng không component nào render. Cần Dev quyết định dùng hay xoá key; không dùng text này làm kết quả mong đợi.",
  "kb_ids": [
    "KB-054"
  ],
  "related_questions": [
    "Key ngôn ngữ non_plus_banner sẽ được dùng hay xoá?"
  ]
}
```

## OQ-pricing-subscription-025 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-025",
  "type": "OPEN_ISSUE",
  "feature_id": "module-entitlement-gating",
  "summary": "Customer Account, storefront và checkout chưa được quan sát (inventory chỉ khảo sát Portal bằng merchant staff): chưa thấy extension của module chưa mua có thực sự Inactive phía buyer, Quick order có ẩn khi chưa mua module, hay chặn checkout trên store non-Plus; cũng chưa rõ 8 extension Inactive trên store Free plan là do chưa subscribe hay do merchant chưa bật. Cần quan sát các surface này.",
  "kb_ids": [
    "KB-048",
    "KB-049",
    "KB-050",
    "KB-052"
  ],
  "related_questions": [
    "Trên Customer Account / storefront / checkout, extension của module chưa mua có thực sự Inactive, Quick order có ẩn khi chưa mua module, chặn checkout có tắt trên store non-Plus không; và 8 extension Inactive trên store Free plan là do chưa subscribe hay do merchant chưa bật?",
    "Store non-Plus thấy hai tuỳ chọn chặn checkout disabled ở màn nào của Portal?"
  ]
}
```

## OQ-pricing-subscription-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-entitlement-gating",
  "summary": "Setting \"test\" theo từng store trong admin panel (Dev FE 20/06/2025, nằm trong ghi chú đánh dấu lỗi thời) còn dùng để unlock không, và có phải chính là field test khiến Portal coi store là Shopify Plus (Dev FE 05/10/2026) không? Cần Dev xác nhận.",
  "kb_ids": [
    "KB-055",
    "KB-046"
  ],
  "related_questions": [
    "Setting \"test\" theo từng store trong admin panel nội bộ còn dùng để unlock không, và có phải chính là field test khiến Portal coi store là Shopify Plus không?",
    "Setting \"test\" theo từng store trong admin panel còn dùng để unlock không, và có phải chính là field test khiến Portal coi store là Shopify Plus không?"
  ],
  "check_ids": [
    "module-entitlement-gating:CHK-008"
  ]
}
```

## OQ-pricing-subscription-027 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-027",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu sản phẩm Duos (bản QA đọc 09/07/2026, gồm trang pricing và mô tả surface) và help docs merchant của Duos không có trong bộ nguồn bootstrap; các item tầng sản phẩm về danh sách module, nội dung từng surface (Customer Account, storefront, Checkout extension) và khả năng chồng chéo với app Checkout Customizer chỉ là tóm tắt QA của tài liệu đó. Cần nạp tài liệu gốc để xác nhận hoặc đính chính.",
  "kb_ids": [
    "KB-P-001",
    "KB-P-007",
    "KB-P-008",
    "KB-P-009",
    "KB-P-032",
    "KB-P-040"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-pricing-subscription-028 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-028",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Danh sách key users.config và giá trị mặc định của chúng chưa được xác minh với code hay với admin panel (khảo sát 08/10/2026 không có code, không vào được admin panel; inventory tự ghi 'chưa xác minh'). Tài liệu cũng không thống nhất key nào thật sự không có UI Portal (3 key reCAPTCHA có UI 'Spam protection settings'). Cần Dev BE cung cấp danh sách key hiện hành, giá trị mặc định và key nào có UI Portal.",
  "kb_ids": [
    "KB-P-029",
    "KB-P-030",
    "KB-P-031"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-pricing-subscription-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Store có Shopify plan ngoài Basic / Grow / Advanced / Plus (vd Custom, Affiliate) thấy giá nào trên trang Subscription ở đợt giá đang áp dụng, và còn card \"Contact us to activate free testing\" không?",
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-005"
  ]
}
```

## OQ-pricing-subscription-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Trang Subscription hiện còn cho chọn chu kỳ năm không (staging 08/10/2026 không thấy toggle Monthly/Yearly), và nếu có thì chu kỳ năm còn giảm 20% như đợt Mar / Apr 2026 không?",
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-007"
  ]
}
```

## OQ-pricing-subscription-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-pricing-and-plan-tiers",
  "summary": "Khi đổi bảng giá, mọi store (kể cả store đã subscribe theo giá cũ) vào trang pricing đều thấy giá mới ngay sau khi triển khai, hay có nhóm store vẫn thấy giá cũ trên trang?",
  "check_ids": [
    "module-pricing-and-plan-tiers:CHK-010"
  ]
}
```

## OQ-pricing-subscription-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Store đã subscribe có thấy nút \"Add more items\" không, và nút \"Subscribe new pack\" có disable khi merchant không thay đổi lựa chọn module không (mô tả theo Jira DUOS-329, đợt giá Mar 2026, chưa quan sát)?",
  "check_ids": [
    "subscription-page:CHK-006"
  ]
}
```

## OQ-pricing-subscription-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Luồng huỷ gói hiện tại có modal \"Are you sure to cancel your plan?\" với nội dung \"Please note that canceling your subscription will deactivate all B2B features on your store.\" và hai nút [Contact sales] [Confirm cancellation] không; sau khi xác nhận, tính năng B2B nào bị deactivate, ngay lập tức hay cuối chu kỳ, và cấu hình đã lưu có được giữ không?",
  "check_ids": [
    "subscription-page:CHK-007"
  ]
}
```

## OQ-pricing-subscription-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Khi merchant bấm subscribe, số tiền và chu kỳ trên màn approve charge của Shopify có phải đúng tổng trên trang Subscription (sau chiết khấu nếu có) không, và sau khi approve trang Subscription hiển thị gì?",
  "check_ids": [
    "subscription-page:CHK-008"
  ]
}
```

## OQ-pricing-subscription-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Store early-bird hiện có thấy banner \"Your store is in Early-bird plan\" và trang tự chọn mọi module không (Jira DUOS-333, chưa quan sát), và store early-bird được nhận diện thế nào để dựng dữ liệu kiểm?",
  "check_ids": [
    "subscription-page:CHK-009"
  ]
}
```

## OQ-pricing-subscription-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "subscription-page",
  "summary": "Ô discount code trên trang pricing (Jira DUOS-369) nằm ở đâu, chấp nhận mã thế nào, báo lỗi gì với mã sai / hết hạn, và cộng dồn với chiết khấu bundle / chu kỳ năm ra sao?",
  "check_ids": [
    "subscription-page:CHK-010"
  ],
  "kb_ids": [
    "KB-030"
  ],
  "related_questions": [
    "Discount code trên trang pricing (Jira DUOS-369, QA Review) chỉ có ảnh: chưa có mô tả hành vi, thông báo lỗi, hay cách cộng dồn với chiết khấu bundle / annual. Cần bổ sung spec.",
    "Discount code trên trang pricing (Jira DUOS-369) hoạt động thế nào, báo lỗi gì, và cộng dồn với chiết khấu bundle / annual ra sao?"
  ]
}
```

## OQ-pricing-subscription-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suggested-plans-and-trial",
  "summary": "Tên 2 pack gợi ý và danh sách module của từng pack là gì; chọn pack có tự chọn đúng các module của pack, và thêm / bớt một module sau đó có bỏ chọn pack không (mô tả theo Jira DUOS-378)?",
  "check_ids": [
    "suggested-plans-and-trial:CHK-004"
  ],
  "kb_ids": [
    "KB-031"
  ],
  "related_questions": [
    "Tên 2 pack gợi ý (SuggestedPlans) và danh sách module của từng pack không được ghi trong ticket Jira DUOS-378 lẫn tài liệu QA. Cần bổ sung.",
    "Tên 2 pack gợi ý và danh sách module của từng pack là gì?"
  ]
}
```

## OQ-pricing-subscription-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "suggested-plans-and-trial",
  "summary": "Ở đợt giá đang áp dụng, merchant chọn đủ tất cả extension và subscribe có thực sự được trial 30 ngày (charge có trial_days / trial_ends_on tương ứng) không, trial còn giữ ở đợt Oct 2026 không, và store cài lại app có được trial lại không (GAP-11, GAP-12 task Testlane DUOS-005)?",
  "check_ids": [
    "suggested-plans-and-trial:CHK-008"
  ],
  "related_questions": [
    "Ở đợt Oct 2026, trial khoảng 30 ngày còn giữ không, và store cài lại app có được trial lại không (GAP-11, GAP-12)?"
  ]
}
```

## OQ-pricing-subscription-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "Khi store B chọn cùng tổ hợp extension với store A (đang trả giá cũ), backend cập nhật plan.price theo giá mới; banner và số tiền hiển thị cho store A có giữ nguyên theo charge của store A không?",
  "check_ids": [
    "legacy-price-retention-banner:CHK-004"
  ]
}
```

## OQ-pricing-subscription-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "legacy-price-retention-banner",
  "summary": "Endpoint /home có trả charge đang active (price, interval, trial_days…), plan và plan.extensions cho frontend như giải thích của Dev 02/10/2026 không, và đây có phải contract ổn định để kiểm không?",
  "check_ids": [
    "legacy-price-retention-banner:CHK-008"
  ]
}
```

## OQ-pricing-subscription-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-entitlement-gating",
  "summary": "PO/Dev xác nhận điều kiện coi store là Shopify Plus (store có shopify_plus, plan \"Plus Trial\", test hoặc plan staff — nên store test / staff / Plus Trial không thấy banner \"Shopify Plus required for this feature\") là hành vi mong đợi; hiện chỉ có lời giải thích code FE của Dev 05/10/2026, chưa có test case PASS.",
  "kb_ids": [
    "KB-046",
    "KB-047"
  ],
  "check_ids": [
    "module-entitlement-gating:CHK-001",
    "module-entitlement-gating:CHK-002"
  ],
  "related_questions": [
    "PO/Dev xác nhận điều kiện hiện banner \"Shopify Plus required for this feature\" (chỉ là store không được coi là Shopify Plus) và vị trí banner ở trang danh sách company của Credit limit và trang Company members / User and permission là hành vi mong đợi; hiện chỉ có lời giải thích code FE của Dev 05/10/2026 (kèm Jira DUOS-381), chưa có test case PASS."
  ]
}
```

## OQ-pricing-subscription-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-pricing-subscription-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "module-entitlement-gating",
  "summary": "Sau khi store subscribe một module, extension tương ứng có kích hoạt được trên online store (badge đổi khỏi Inactive) ngay không, cấu hình đã lưu lúc ở Free plan có được giữ không, và alert \"B2B extensions in Free plan are available for testing and setup only.\" có biến mất không?",
  "check_ids": [
    "module-entitlement-gating:CHK-007"
  ]
}
```

## OQ-pricing-subscription-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-pricing-subscription-043",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: subscription-page, suggested-plans-and-trial. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "subscription-page",
    "suggested-plans-and-trial"
  ]
}
```
