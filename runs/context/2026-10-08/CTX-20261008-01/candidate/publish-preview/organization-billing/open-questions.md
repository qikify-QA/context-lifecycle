# Open Questions — Organization & Billing (nhóm 'Account' trên sidebar + Dashboard) — org/member/role, subscription/credit/rate limit, analytics

Tổng: 44 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của ImagenHub, ngày 2026-10-08.

- CONFLICT: 1
- NEEDS_CONFIRMATION: 26
- OPEN_ISSUE: 17

## OQ-organization-billing-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Role cho object Organization & Billing: bootstrap để role=null và tài liệu khảo sát staging không nêu tài khoản khảo sát (org test \"HUB 1\") có role gì (Owner/Admin/Editor/Viewer). Mọi quan sát UI ở Organization/Subscription/Dashboard phụ thuộc role — cần xác nhận role của tài khoản khảo sát và role mặc định dùng cho checklist object này.",
  "kb_ids": [
    "KB-011",
    "KB-013",
    "KB-020",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-039",
    "KB-053",
    "KB-P-025",
    "KB-P-026",
    "KB-P-027",
    "KB-P-028"
  ],
  "related_questions": [
    "Bản đồ sidebar 14 trang được khảo sát bằng một tài khoản của org test \"HUB 1\" mà tài liệu không ghi role (Owner/Admin/Editor/Viewer). Sidebar và quyền truy cập từng trang có khác theo role không? Cần role của tài khoản khảo sát để gán scope.role cho mọi quan sát portal."
  ]
}
```

## OQ-organization-billing-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-002",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Known defect: trang Feature Requests (/feature-requests) luôn trả lỗi 500 trên staging (khảo sát 2026-08-31). Dùng làm regression watch, không làm expected result; chưa biết repro, mức nghiêm trọng, mã ticket, và chức năng của trang khi hoạt động.",
  "kb_ids": [
    "KB-052"
  ]
}
```

## OQ-organization-billing-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Thiếu tài liệu chi tiết 'known-bugs' được link từ Portal sitemap (không có trên Testlane project context): không có repro/severity cho lỗi Feature Requests 500 và quirk tên member lộ Shopify GID, không biết danh sách known bug đầy đủ của portal. Không suy diễn nội dung.",
  "kb_ids": [
    "KB-052",
    "KB-013"
  ]
}
```

## OQ-organization-billing-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-004",
  "type": "OPEN_ISSUE",
  "feature_id": "organization-members",
  "summary": "Thiếu tài liệu chi tiết 'organization' được link từ Portal sitemap (không có trên Testlane project context): không có mô tả field đổi tên org, danh sách member, nội dung audit log Activity, chi tiết quirk Shopify GID. Các hành động đổi tên org / Leave organization / gửi invite thật / Change role / Remove member chưa từng được test. Không suy diễn nội dung.",
  "kb_ids": [
    "KB-002",
    "KB-003",
    "KB-008",
    "KB-011",
    "KB-013"
  ],
  "related_questions": [
    "Với mỗi role Owner/Admin/Editor/Viewer: ai được Invite member, Resend lời mời, Change role, Remove member, đổi tên org và Leave organization?",
    "Role nào được Invite member, Resend lời mời, Change role, Remove member, đổi tên org và Leave organization?",
    "Tài liệu chi tiết về Organization (được link từ QA KB ImagenHub \"Portal sitemap\" v1) không có sẵn — nội dung UI chi tiết của tab General, Members, Activity là gì?"
  ],
  "check_ids": [
    "organization-members:CHK-013"
  ]
}
```

## OQ-organization-billing-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-005",
  "type": "OPEN_ISSUE",
  "feature_id": "organization-members",
  "summary": "Known defect: danh sách member trên staging để lộ Shopify GID trong tên member (khảo sát 2026-08-30). Dùng làm regression watch, không làm expected result; chưa có vị trí hiển thị, repro, mức nghiêm trọng.",
  "kb_ids": [
    "KB-013"
  ]
}
```

## OQ-organization-billing-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-permissions",
  "summary": "Ma trận quyền trong docs chính thức chỉ có 4 area (Templates, Generations, API keys, Billing) — không nêu role nào được Invite member, Resend lời mời, Change role, Remove member, đổi tên org. Cần PO/Dev xác nhận quyền quản lý thành viên theo từng role (Owner/Admin/Editor/Viewer).",
  "kb_ids": [
    "KB-003",
    "KB-007",
    "KB-002",
    "KB-014",
    "KB-015",
    "KB-016",
    "KB-017",
    "KB-018"
  ],
  "related_questions": [
    "Role nào được Invite member, Resend lời mời, Change role, Remove member và đổi tên org?"
  ]
}
```

## OQ-organization-billing-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-007",
  "type": "OPEN_ISSUE",
  "feature_id": "credits-and-rate-limits",
  "summary": "Thiếu tài liệu chi tiết 'subscription-pricing' được link từ Portal sitemap (không có trên Testlane project context): không có danh sách plan ngoài Pro, nội dung 6 gói Buy credits, cách bật/đặt Overage limit, Manage billing (Stripe portal), Downgrade Pro → Free. Các hành động này chưa từng được test. Giá/credit hiện có chỉ là snapshot staging. Không suy diễn nội dung.",
  "kb_ids": [
    "KB-034",
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-038",
    "KB-039"
  ]
}
```

## OQ-organization-billing-008 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-008",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Cần PO/Dev xác nhận: (1) mức 'max $30/tháng' của Overage limit là trần cố định của sản phẩm hay giá trị đang cấu hình cho org test; (2) thứ tự trừ credit giữa Bonus credits, credit của plan (2,000/tháng) và Overage; (3) giá Pro $19/tháng và 2,000 credit/tháng có phải giá chính thức; (4) credit tracking có cập nhật real-time (hiện chỉ là kết luận của người khảo sát).",
  "kb_ids": [
    "KB-035",
    "KB-036",
    "KB-037",
    "KB-038",
    "KB-040",
    "KB-041"
  ],
  "related_questions": [
    "Credit bị trừ theo thứ tự nào giữa Bonus credits, credit của plan và Overage? Mức \"max $30/tháng\" của Overage là trần cố định của sản phẩm hay giá trị cấu hình của org? Chạm trần Overage thì request bị xử lý thế nào?",
    "Thứ tự trừ credit giữa Bonus credits, credit của plan và Overage là gì?",
    "Mức \"max $30/tháng\" của Overage là trần cố định hay giá trị cấu hình riêng cho org test?",
    "Giá Pro $19/tháng và 2,000 credit/tháng có phải giá chính thức không; ngoài Pro còn plan nào?"
  ],
  "check_ids": [
    "credits-and-rate-limits:CHK-012"
  ]
}
```

## OQ-organization-billing-009 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-009",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Docs chính thức không nêu con số giới hạn request/phút và /ngày của free tier, chu kỳ reset credit (ý nghĩa của resets_at), và plan nào khi dùng BYOK vẫn bị trừ credit ImagenHub. Không có expected value để kiểm boundary rate limit/402.",
  "kb_ids": [
    "KB-023",
    "KB-026",
    "KB-031"
  ],
  "related_questions": [
    "Khi dùng BYOK, plan nào vẫn bị trừ credit ImagenHub?",
    "Khi request đi qua provider key BYOK, ở plan nào credit ImagenHub vẫn bị trừ và trừ bao nhiêu?"
  ],
  "check_ids": [
    "credits-and-rate-limits:CHK-018"
  ]
}
```

## OQ-organization-billing-010 — CONFLICT

```json
{
  "oq_id": "OQ-organization-billing-010",
  "type": "CONFLICT",
  "feature_id": null,
  "summary": "Docs chính thức nói Organization sở hữu mọi tài nguyên và Account không sở hữu gì, nhưng mục Templates nói template Private gắn với user_id (chỉ người tạo thấy/dùng) và mục BYOK nói 1 provider key cho mỗi user mỗi provider. Đơn vị sở hữu/hiển thị là user hay organization?",
  "kb_ids": [
    "KB-015",
    "KB-P-006",
    "KB-P-007",
    "KB-P-008"
  ],
  "side_a": "Organization sở hữu mọi thứ (template, media, credit, key); Account là login cá nhân, không sở hữu gì.",
  "side_b": "Template Private gắn user_id, chỉ người tạo thấy/dùng; BYOK 1 key/user/provider.",
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi.",
  "related_questions": [
    "Khi một thành viên rời org, \"template không phục hồi lại được\" áp cho template nào: template do chính người đó tạo (kể cả Private) hay template của org? Template Private thuộc về người dùng hay thuộc về org?",
    "Template Private thuộc về người tạo hay về org? Thành viên khác (Owner/Admin/Editor/Viewer) cùng org có thấy và dùng được template Private của người khác không?",
    "Đơn vị sở hữu/hiển thị template private chưa rõ: docs chính thức §Templates nói template Private (user_id của bạn) chỉ bạn thấy/dùng, trong khi §Organization của cùng docs nói Organization sở hữu mọi thứ gồm cả template. Cần PO/Dev xác nhận template private thuộc user hay organization (và hệ quả cho GET /templates \"private của bạn\").",
    "Template private thuộc về người tạo hay thuộc organization? Thành viên khác trong cùng org có thấy và dùng được template private do người khác tạo (qua GET /templates, GET /templates/{id} và trang Templates) không?",
    "Template private thuộc về người tạo hay thuộc organization; thành viên khác trong org có thấy không?"
  ],
  "check_ids": [
    "organization-members:CHK-018",
    "roles-permissions:CHK-015",
    "template-library:CHK-006"
  ],
  "conflict_group": "CONF-IGH-product-01",
  "also_affects": [
    {
      "object_id": "templates",
      "kb_ids": [
        "KB-005",
        "KB-006"
      ]
    }
  ]
}
```

## OQ-organization-billing-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Docs chính thức nói list endpoint trả meta phân trang theo trang (current_page, last_page, per_page, total), nhưng GET /analytics/requests được mô tả phân trang cursor-based (?limit=, ?cursor=). Endpoint đó có phải ngoại lệ không, và có trả meta theo trang không?",
  "kb_ids": [
    "KB-P-018"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi.",
  "check_ids": [
    "usage-analytics:CHK-007"
  ],
  "related_questions": [
    "GET /analytics/requests có trả meta phân trang theo trang (current_page, last_page, per_page, total) như quy ước chung của list endpoint không, hay chỉ dùng cursor?",
    "GET /analytics/requests có trả meta phân trang theo trang (current_page, last_page, per_page, total) ngoài cursor không?"
  ]
}
```

## OQ-organization-billing-012 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-012",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Tài liệu tổng hợp known bug của portal được link chéo nhưng không có trong bộ tài liệu. Danh sách defect toàn portal, repro và mức nghiêm trọng (ví dụ trang Feature Requests lỗi 500) chưa có nguồn.",
  "kb_ids": [
    "KB-P-028",
    "KB-P-029"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-organization-billing-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Tên org có ràng buộc gì khi đổi tên (bắt buộc nhập, độ dài tối đa, ký tự cho phép, có cho trùng tên với org khác không) và hệ thống báo lỗi thế nào?",
  "check_ids": [
    "organization-members:CHK-012"
  ],
  "related_questions": [
    "Tên org có ràng buộc gì (độ dài, ký tự, trùng tên)?"
  ]
}
```

## OQ-organization-billing-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Owner (đặc biệt là Owner duy nhất) có được Leave organization không? Có chuyển quyền Owner sang thành viên khác được không? Nếu Owner duy nhất rời thì org ra sao?",
  "check_ids": [
    "organization-members:CHK-014"
  ],
  "related_questions": [
    "Owner có Leave organization được không, và có chuyển quyền Owner sang người khác được không?"
  ]
}
```

## OQ-organization-billing-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Khi chưa đăng nhập mà mở trang Organization, portal phải chuyển sang trang đăng nhập hay hiển thị gì? Có đảm bảo không lộ dữ liệu org không?",
  "check_ids": [
    "organization-members:CHK-015"
  ]
}
```

## OQ-organization-billing-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Change role và Remove member hoạt động thế nào: ai được thực hiện, có xác nhận không, thành viên bị xoá mất quyền truy cập ngay không, tài nguyên do họ tạo còn lại không?",
  "check_ids": [
    "organization-members:CHK-016"
  ],
  "related_questions": [
    "Change role và Remove member hoạt động thế nào?"
  ]
}
```

## OQ-organization-billing-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Người được mời chấp nhận lời mời thế nào (cần có tài khoản trước hay sign up qua link)? Sau khi chấp nhận họ vào org với đúng role đã chọn khi mời không? Nếu họ đã là Owner của org riêng tạo lúc sign up thì sao?",
  "check_ids": [
    "organization-members:CHK-017"
  ],
  "related_questions": [
    "Người được mời chấp nhận lời mời như thế nào (cần có tài khoản trước hay sign up qua link), và sau khi chấp nhận thì xuất hiện trong roster với role nào?"
  ]
}
```

## OQ-organization-billing-018 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-018",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Tab Activity ghi những loại sự kiện nào (đổi tên org, mời/resend, đổi role, xoá member, rời org...)? Mỗi dòng có hiển thị người thực hiện và thời điểm không?",
  "check_ids": [
    "organization-members:CHK-019"
  ],
  "related_questions": [
    "Tab Activity ghi những sự kiện nào, có hiển thị actor/thời điểm không?"
  ]
}
```

## OQ-organization-billing-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "organization-members",
  "summary": "Tên hiển thị của thành viên trong tab Members phải lấy từ đâu (họ tên, email, ...)? Với thành viên có định danh Shopify, roster phải hiển thị gì thay cho chuỗi gid://shopify/...? Lỗi lộ Shopify GID trong tên member trên staging có đang được theo dõi để sửa không?",
  "check_ids": [
    "organization-members:CHK-020"
  ]
}
```

## OQ-organization-billing-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-permissions",
  "summary": "Quyền \"View\" của Viewer ở khu vực Generations gồm những gì — Viewer có được chạy generation mới (tốn credit của org) không, hay chỉ xem lịch sử?",
  "check_ids": [
    "roles-permissions:CHK-006"
  ],
  "related_questions": [
    "\"Manage\" và \"View\" cụ thể gồm những thao tác nào ở khu vực Generations (ví dụ Viewer có chạy được generation không)?"
  ]
}
```

## OQ-organization-billing-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-permissions",
  "summary": "Quyền của Owner/Admin/Editor/Viewer ở Webhooks, Alerts, Provider Keys (BYOK) và AI Assistant (MCP) là gì?",
  "check_ids": [
    "roles-permissions:CHK-012"
  ],
  "related_questions": [
    "Quyền theo role cho Webhooks, Alerts, Provider Keys, MCP và cài đặt Organization là gì?"
  ]
}
```

## OQ-organization-billing-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-permissions",
  "summary": "Một org có thể có nhiều Owner không? Owner có bị đổi role hay bị xoá khỏi org không, và hệ thống có chặn trường hợp org không còn Owner nào không?",
  "check_ids": [
    "roles-permissions:CHK-013"
  ],
  "related_questions": [
    "Một org có thể có nhiều Owner không, và Owner có bị đổi role được không?"
  ]
}
```

## OQ-organization-billing-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "roles-permissions",
  "summary": "Đổi role có hiệu lực ngay với phiên đang đăng nhập của thành viên đó, hay chỉ sau khi tải lại trang/đăng nhập lại?",
  "check_ids": [
    "roles-permissions:CHK-014"
  ],
  "related_questions": [
    "Change role có hiệu lực ngay với phiên đang đăng nhập của thành viên đó không?"
  ]
}
```

## OQ-organization-billing-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Request không thành công (lỗi đầu vào 422, lỗi provider, task fail) có bị trừ credit không? Nếu có thì trừ bao nhiêu?",
  "check_ids": [
    "credits-and-rate-limits:CHK-008"
  ],
  "related_questions": [
    "Request bị lỗi (lỗi provider hoặc lỗi người dùng) có bị trừ credit không?"
  ]
}
```

## OQ-organization-billing-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Giới hạn request theo phút và theo ngày của free tier là bao nhiêu? Mỗi request trừ 1 lượt hay khác nhau theo endpoint (ví dụ GET /ping có tính không)? Lượt hồi theo cửa sổ trượt hay đầu mỗi phút/ngày?",
  "check_ids": [
    "credits-and-rate-limits:CHK-009"
  ],
  "related_questions": [
    "Giới hạn request theo phút và theo ngày của free tier là bao nhiêu?"
  ]
}
```

## OQ-organization-billing-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Credit reset theo chu kỳ nào (theo tháng của plan, theo ngày đăng ký...)? resets_at được tính thế nào và sau thời điểm đó balance trở về bao nhiêu?",
  "check_ids": [
    "credits-and-rate-limits:CHK-010"
  ],
  "related_questions": [
    "Credit reset theo chu kỳ nào và resets_at được tính ra sao?"
  ]
}
```

## OQ-organization-billing-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "X-Credits-Used / X-Credits-Remaining trả \"unlimited\" trong điều kiện nào (plan nào, key nào, có dùng BYOK không)?",
  "check_ids": [
    "credits-and-rate-limits:CHK-011"
  ],
  "related_questions": [
    "Header X-Credits-Used/X-Credits-Remaining trả \"unlimited\" trong trường hợp nào?"
  ]
}
```

## OQ-organization-billing-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Credits remaining trên Dashboard là balance của org hay của từng key? Có phải khớp với key.credits_remaining của GET /ping không (khi org có nhiều key với credit_limit riêng)?",
  "check_ids": [
    "credits-and-rate-limits:CHK-017"
  ]
}
```

## OQ-organization-billing-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "credits-and-rate-limits",
  "summary": "Khi ImagenHub chặn request vì hết credit, phía Teeinblue (portal và storefront) hiển thị gì cho merchant/khách?",
  "check_ids": [
    "credits-and-rate-limits:CHK-019"
  ],
  "related_questions": [
    "Phía Teeinblue nhận gì khi task ImagenHub bị chặn vì hết credit?"
  ]
}
```

## OQ-organization-billing-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-analytics",
  "summary": "Các endpoint analytics xử lý tham số không hợp lệ thế nào (status/sort_by/timeframe ngoài danh sách, thiếu model_id ở metrics): trả lỗi validation 422 hay bỏ qua tham số?",
  "check_ids": [
    "usage-analytics:CHK-012"
  ],
  "related_questions": [
    "Giá trị không hợp lệ (status ngoài enum, timeframe ngoài enum, thiếu model_id ở metrics) trả lỗi gì?"
  ]
}
```

## OQ-organization-billing-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-analytics",
  "summary": "Giá trị mặc định và tối đa của limit, cùng khoảng start/end tối đa của GET /analytics/requests là bao nhiêu?",
  "check_ids": [
    "usage-analytics:CHK-013"
  ],
  "related_questions": [
    "Giá trị mặc định của limit, giới hạn tối đa của limit và của khoảng start/end là bao nhiêu?"
  ]
}
```

## OQ-organization-billing-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-analytics",
  "summary": "Nhóm endpoint analytics xác thực bằng API key hay JWT, role nào được gọi? Dữ liệu trả về tính cho toàn org hay chỉ cho API key đang gọi? Gọi không có credential có bị 401 không?",
  "check_ids": [
    "usage-analytics:CHK-014"
  ],
  "related_questions": [
    "Nhóm endpoint Analytics xác thực bằng API key hay JWT, và role nào trong org được gọi?",
    "Dữ liệu analytics tính cho toàn org hay chỉ cho API key đang gọi?"
  ]
}
```

## OQ-organization-billing-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-organization-billing-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "usage-analytics",
  "summary": "Field cost trong analytics tính bằng credit hay tiền? Có phải bằng đúng số credit bị trừ cho request đó không? Summary của GET /analytics/usage có bằng tổng các bucket không?",
  "check_ids": [
    "usage-analytics:CHK-015"
  ],
  "related_questions": [
    "Field cost tính bằng credit hay tiền, và có khớp với số credit bị trừ không?"
  ]
}
```

## OQ-organization-billing-034 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-034",
  "type": "OPEN_ISSUE",
  "feature_id": "organization-members",
  "summary": "Khi link mời quá 7 ngày, người được mời thấy gì, lời mời hiển thị trạng thái gì, và có thu hồi lời mời được không?"
}
```

## OQ-organization-billing-035 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-035",
  "type": "OPEN_ISSUE",
  "feature_id": "organization-members",
  "summary": "Khi một thành viên rời org, template nào không phục hồi được: template do người đó tạo hay template của org?"
}
```

## OQ-organization-billing-036 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-036",
  "type": "OPEN_ISSUE",
  "feature_id": "organization-members",
  "summary": "Lỗi lộ Shopify GID trong tên member xuất hiện ở đâu, tái hiện thế nào, mức nghiêm trọng ra sao?"
}
```

## OQ-organization-billing-037 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-037",
  "type": "OPEN_ISSUE",
  "feature_id": "roles-permissions",
  "summary": "Credit balance hiển thị cho Viewer ở đâu (Dashboard, trang Subscription hay nơi khác)?"
}
```

## OQ-organization-billing-038 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-038",
  "type": "OPEN_ISSUE",
  "feature_id": "roles-permissions",
  "summary": "Tài khoản dùng để khảo sát staging trong org test \"HUB 1\" có role gì?"
}
```

## OQ-organization-billing-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-039",
  "type": "OPEN_ISSUE",
  "feature_id": "credits-and-rate-limits",
  "summary": "6 gói Buy credits gồm những gói nào, luồng mua thật, Manage billing và Downgrade Pro sang Free hoạt động thế nào?"
}
```

## OQ-organization-billing-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-040",
  "type": "OPEN_ISSUE",
  "feature_id": "credits-and-rate-limits",
  "summary": "Credit tracking trên portal có thật sự cập nhật real-time không?"
}
```

## OQ-organization-billing-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-041",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-analytics",
  "summary": "Response schema chi tiết của log request, field summary và bucket là gì?"
}
```

## OQ-organization-billing-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-042",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-analytics",
  "summary": "Phân biệt user_error và error dựa trên tiêu chí nào?"
}
```

## OQ-organization-billing-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-043",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-analytics",
  "summary": "Bucket thời gian tính theo múi giờ nào, và timeframe mặc định của /analytics/usage và /analytics/metrics là gì?"
}
```

## OQ-organization-billing-044 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-organization-billing-044",
  "type": "OPEN_ISSUE",
  "feature_id": "usage-analytics",
  "summary": "Portal có trang Analytics nào dùng các endpoint này không?"
}
```
