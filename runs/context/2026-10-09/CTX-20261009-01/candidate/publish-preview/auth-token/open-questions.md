# Open Questions — Auth & Token lifecycle — offline token expiring / legacy, phát hiện token chết & reconnect, job refresh / migrate, re-auth khi mở app, uninstall / reinstall, admin panel 'Token and scopes'

Tổng: 20 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Duos B2B, ngày 2026-10-09.

- CONFLICT: 0
- NEEDS_CONFIRMATION: 11
- OPEN_ISSUE: 9

## OQ-auth-token-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền và actor của token lifecycle Duos chưa được tài liệu nêu rõ: (1) trong admin panel nội bộ, role nào được gán mặc định permission \"Refresh access token\"; (2) permission này có được chặn ở API hay chỉ ẩn nút (tài liệu ghi là giả định bảo mật chưa xác nhận, TC-DUOS-041); (3) các rule về điều kiện token chết, migrate và deploy không nêu actor — xin PO/Dev xác nhận ai/tiến trình nào thực hiện và có ràng buộc role nào không.",
  "kb_ids": [
    "KB-001",
    "KB-002",
    "KB-008",
    "KB-021",
    "KB-022",
    "KB-024",
    "KB-053",
    "KB-054",
    "KB-055",
    "KB-056"
  ],
  "related_questions": [
    "Tiến trình hay role nào chịu trách nhiệm xác định token chết, và có ràng buộc role nào cho các hành vi này không?",
    "Role nào trong admin panel được gán mặc định permission \"Refresh access token\", và permission có được chặn ở API (không chỉ ẩn nút) không?",
    "Role nào trong admin panel được gán mặc định permission \"Refresh access token\"; tài khoản không có permission có bị ẩn nút và bị chặn ở API (không chỉ ẩn nút) không; permission này có được đăng ký bằng `php artisan shield:generate --all --ignore-existing-policies` trước `php artisan migrate` khi deploy không?",
    "Permission của nút có thật được đăng ký bằng `php artisan shield:generate --all --ignore-existing-policies` trước `php artisan migrate` khi deploy?",
    "Ai (vai trò nào) chạy tay `tokens:migrate-legacy` sau deploy và xác nhận nó đã xong trước khi ship re-login-khi-mở-app?"
  ],
  "check_ids": [
    "admin-token-and-scopes:CHK-006"
  ]
}
```

## OQ-auth-token-002 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-002",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Các phát biểu sau về token lifecycle Duos chỉ có trong tóm tắt QA hoặc theo ticket Jira DUOS-399 (qua task Testlane DUOS-001), chưa có rule active hay xác nhận PO/Dev, nên chưa dùng làm kết quả mong đợi. Xin PO/Dev xác nhận từng điểm còn đúng ở bản hiện tại: reconnect thành công tự clear cờ Re-auth Required At; lỗi 401 đơn thuần (shop freeze/close giữa lúc job chạy) chỉ làm job fail và retry, không email; token legacy chỉ chết khi migrate thành công, uninstall hoặc từ 01/01/2027, re-authorize không huỷ token cũ; sau 01/01/2027 re-login là đường migrate duy nhất; auto refresh trong buffer 10 phút trước hạn, đẩy 2 mốc ngày và rotate refresh token; luồng background tự refresh không bị chặn bởi hạn 60 phút; mọi call Shopify Admin API đi qua lớp token và token chết làm dừng sync/quote/credit/Flow; admin panel hiển thị thêm Access Token và Offline Token Type, field ngày rỗng nghĩa là không có hạn; permission của nút Refresh access token đăng ký bằng lệnh shield:generate; thời hạn khoảng 60 phút / 90 ngày và mốc Shopify 01/01/2027.",
  "kb_ids": [
    "KB-006",
    "KB-007",
    "KB-008",
    "KB-014",
    "KB-015",
    "KB-022",
    "KB-028",
    "KB-029",
    "KB-051",
    "KB-052",
    "KB-053",
    "KB-055",
    "KB-056"
  ],
  "related_questions": [
    "Khi Shopify trả 401 đơn thuần lúc shop bị freeze/close giữa lúc job chạy (token vẫn hợp lệ), job có chỉ fail và retry, không set `Re-auth Required At` và không gửi email reconnect không?",
    "Token legacy có đúng chỉ chết ở 3 tình huống (migrate thành công, shop uninstall, từ 01/01/2027), và re-authorize có thật không huỷ token legacy cũ không?",
    "Trong luồng gọi Shopify, app có tự refresh token khi còn trong buffer 10 phút trước hạn, mỗi lần đẩy cả 2 mốc ngày hết hạn và rotate refresh token không?",
    "Webhook và queued/scheduled job có tự refresh token và không bị chặn bởi hạn khoảng 60 phút của access token không?",
    "Sau 01/01/2027, migrate silent có thật không còn dùng được và re-login khi mở app là đường duy nhất để chuyển shop legacy sang expiring không?",
    "Bấm \"Refresh access token\" trong admin panel thì hiện thông báo gì khi thành công và khi thất bại (vd token đã chết), và những field nào thay đổi?",
    "Khi Shopify trả 401 đơn thuần lúc shop bị freeze/close giữa lúc job chạy (token vẫn hợp lệ), job có chỉ fail và retry, không set cờ và không gửi email reconnect không?",
    "Token legacy có đúng chỉ chết ở 3 tình huống (migrate thành công, shop uninstall, từ 01/01/2027), và re-authorize có thật không huỷ token legacy cũ?",
    "Mốc 01/01/2027 Shopify bắt buộc token expiring và từ chối token legacy (trả 401) có còn đúng không?",
    "Trong luồng gọi Shopify, app có tự refresh khi token còn trong buffer 10 phút trước hạn, mỗi lần đẩy cả 2 mốc ngày và rotate refresh token không?",
    "Webhook và job nền có tự refresh token và không bị chặn bởi hạn khoảng 60 phút của access token không?",
    "Sau 01/01/2027, migrate silent có thật không còn dùng được và re-login khi mở app là đường duy nhất để chuyển shop legacy sang expiring?",
    "Shop uninstall có làm token legacy cũ chết ngay phía Shopify không?",
    "Mục \"Token and scopes\" có hiển thị thêm Access Token và Offline Token Type (Legacy / Expiring) không?",
    "Field ngày token rỗng có đúng nghĩa là token không có hạn (không phải thiếu dữ liệu)?",
    "Mục \"Token and scopes\" có hiển thị thêm Access Token và Offline Token Type (Legacy / Expiring) không, và field ngày token rỗng có đúng nghĩa là token không có hạn (không phải thiếu dữ liệu) không?"
  ],
  "check_ids": [
    "dead-token-detection-and-reconnect:CHK-004",
    "dead-token-detection-and-reconnect:CHK-012",
    "token-refresh-and-legacy-migration:CHK-008",
    "token-refresh-and-legacy-migration:CHK-009",
    "token-refresh-and-legacy-migration:CHK-012",
    "admin-token-and-scopes:CHK-005",
    "admin-token-and-scopes:CHK-007"
  ]
}
```

## OQ-auth-token-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-003",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Known issues Duos ghi BUG-36 (trạng thái \"open?\") gắn với TC-DUOS-001 của nhóm Auth & Token lifecycle nhưng nội dung lỗi chưa đọc được, trong khi test case vẫn passed. Cần mở BUG-36 để biết lỗi thuộc hành vi token nào, còn mở hay đã fix, và cập nhật lại trạng thái TC-DUOS-001; trong lúc chờ, theo dõi như regression watch, không dùng TC-DUOS-001 làm bằng chứng PASS.",
  "kb_ids": [
    "KB-057"
  ],
  "related_questions": [
    "BUG-36 (gắn TC-DUOS-001, trạng thái \"open?\") là lỗi gì, thuộc hành vi token nào (phát hiện token chết, refresh/migrate, re-auth khi mở app, uninstall/reinstall hay admin panel), còn mở hay đã fix?"
  ]
}
```

## OQ-auth-token-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-004",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Một số nội dung liên kết của token lifecycle Duos không có trong bộ tài liệu: 10 câu hỏi mở và mục giả định bảo mật của task Testlane DUOS-001 (chỉ được tham chiếu bằng số), tên bảng/cột và kiểu dữ liệu của các field token, và build/version của các quan sát staging. Cần bổ sung trước khi viết case ở mức dữ liệu."
}
```

## OQ-auth-token-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-005",
  "type": "OPEN_ISSUE",
  "feature_id": "dead-token-detection-and-reconnect",
  "summary": "Email reconnect / reopen khi token chết chưa có oracle nội dung: tài liệu chưa nêu tiêu đề, nội dung cuối, người nhận, ngôn ngữ (template mới là bản nháp trong comment Jira DUOS-399); chưa nêu ở luồng job thường email reconnect có gửi lặp mỗi lần job chạy hay chỉ 1 lần (rule \"đúng 1 lần\" chỉ nói cho email reopen); chưa nêu khi refresh thất bại do lỗi tạm thời (mạng / Shopify 5xx) thì retry mấy lần và có gửi email không.",
  "kb_ids": [
    "KB-005",
    "KB-009",
    "KB-010",
    "KB-016"
  ],
  "related_questions": [
    "Khi refresh token thất bại do lỗi tạm thời (mạng, Shopify 5xx), app retry mấy lần, và có gắn cờ `Re-auth Required At` hay gửi email reconnect không?",
    "Ở luồng thường (không phải shop mở lại), email reconnect gửi một lần hay lặp lại mỗi khi job/call phát hiện token chết? Template cuối của email reconnect có tiêu đề, nội dung, người nhận và ngôn ngữ nào?",
    "Email reconnect và email reopen có tiêu đề, nội dung, người nhận và ngôn ngữ nào?",
    "Ở luồng thường (không phải shop mở lại), email reconnect gửi một lần hay gửi lặp mỗi lần job/call phát hiện token chết?",
    "Khi refresh thất bại do lỗi tạm thời (mạng, Shopify 5xx), app retry mấy lần, có gắn cờ `Re-auth Required At` hay gửi email reconnect không?"
  ],
  "check_ids": [
    "dead-token-detection-and-reconnect:CHK-005",
    "dead-token-detection-and-reconnect:CHK-011"
  ]
}
```

## OQ-auth-token-006 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-006",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "token-refresh-and-legacy-migration",
  "summary": "Khi 2 tiến trình cùng refresh token của 1 shop (ví dụ job tokens:refresh-expiring và luồng gọi Shopify), việc rotate refresh token chồng nhau có làm vô hiệu token của tiến trình chậm hơn không, và app có cơ chế lock để tránh việc này không? (edge case QA, TC-DUOS-044)",
  "kb_ids": [
    "KB-030"
  ],
  "related_questions": [
    "Khi 2 tiến trình cùng refresh token của 1 shop (vd job refresh và luồng gọi Shopify), app có cơ chế lock không, và token của tiến trình chậm hơn có bị vô hiệu không?"
  ],
  "check_ids": [
    "token-refresh-and-legacy-migration:CHK-010"
  ]
}
```

## OQ-auth-token-007 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-007",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "token-refresh-and-legacy-migration",
  "summary": "Nếu migrate token legacy sang expiring thành công phía Shopify nhưng app không nhận được response, shop có mất token cho tới khi merchant mở app không, và có job đối soát nào phục hồi không? (edge case QA, TC-DUOS-009)",
  "kb_ids": [
    "KB-031"
  ],
  "related_questions": [
    "Nếu migrate legacy thành công phía Shopify nhưng app không nhận được response, shop có mất token tới khi merchant mở app không, và có job đối soát nào phục hồi không?",
    "Nếu migrate legacy thành công phía Shopify nhưng app không nhận response, shop có mất token tới khi merchant mở app không, và có job đối soát nào phục hồi không?"
  ],
  "check_ids": [
    "token-refresh-and-legacy-migration:CHK-011"
  ]
}
```

## OQ-auth-token-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-008",
  "type": "OPEN_ISSUE",
  "feature_id": "token-refresh-and-legacy-migration",
  "summary": "Job tokens:refresh-expiring --days=10 chưa có định nghĩa đủ để kiểm boundary: tham số --days=10 tính theo mốc hạn nào (refresh token hay access token), và token còn đúng 10 ngày có được refresh không (≤ hay <)? Thời hạn chính xác của access token / refresh token cũng chỉ được ghi xấp xỉ (khoảng 60 phút / 90 ngày).",
  "kb_ids": [
    "KB-023",
    "KB-055"
  ],
  "related_questions": [
    "Tham số `--days=10` của `tokens:refresh-expiring` tính theo mốc hạn nào (refresh token hay access token), và token còn đúng 10 ngày có được refresh không (≤ hay <)?",
    "Thời hạn chính xác của access token và refresh token expiring là bao lâu (tài liệu chỉ ghi khoảng 60 phút / 90 ngày)?"
  ],
  "check_ids": [
    "token-refresh-and-legacy-migration:CHK-007"
  ]
}
```

## OQ-auth-token-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-009",
  "type": "OPEN_ISSUE",
  "feature_id": "app-open-reauth",
  "summary": "Luồng re-auth khi merchant mở app chưa được quan sát trên môi trường nào (chưa có khảo sát login/OAuth với shop legacy, shop đổi scope hay session hết hạn), và tài liệu chưa nêu merchant thấy gì trong app khi shop đang bị gắn cờ Re-auth Required At (banner hay redirect thẳng sang re-login).",
  "kb_ids": [
    "KB-004",
    "KB-032",
    "KB-033",
    "KB-034",
    "KB-035",
    "KB-036"
  ],
  "related_questions": [
    "Merchant thấy gì trong app khi shop đang bị gắn `Re-auth Required At` (banner, thông báo hay chuyển thẳng sang re-login)?",
    "\"Scope/permission của app đã đổi\" được xác định thế nào (app khai thêm scope mới, merchant thu hồi quyền…)?"
  ]
}
```

## OQ-auth-token-010 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-010",
  "type": "OPEN_ISSUE",
  "feature_id": "admin-token-and-scopes",
  "summary": "Bên trong admin panel nội bộ chưa được khảo sát (khảo sát 08/10/2026 chỉ tới trang login): tên UI \"Token and scopes\", \"Refresh access token\" và nhãn các field mới lấy từ ticket và test case, chưa kiểm trên staging; tài liệu cũng chưa nêu kết quả/thông báo khi bấm \"Refresh access token\" (thành công / thất bại) và field nào thay đổi.",
  "kb_ids": [
    "KB-045",
    "KB-046",
    "KB-047",
    "KB-048",
    "KB-049",
    "KB-050",
    "KB-051"
  ],
  "related_questions": [
    "Trên staging, mục \"Token and scopes\", nút \"Refresh access token\" và nhãn các field có đúng tên và vị trí như ticket mô tả không?",
    "Bấm \"Refresh access token\" thì hiện thông báo gì khi thành công / thất bại, và field nào thay đổi?"
  ]
}
```

## OQ-auth-token-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dead-token-detection-and-reconnect",
  "summary": "Merchant reconnect cụ thể bằng thao tác nào, và reconnect thành công có tự clear `Re-auth Required At` để các luồng gọi Shopify chạy lại không?",
  "check_ids": [
    "dead-token-detection-and-reconnect:CHK-006"
  ],
  "related_questions": [
    "Merchant reconnect cụ thể bằng thao tác nào, và reconnect thành công có tự clear `Re-auth Required At` không?"
  ]
}
```

## OQ-auth-token-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "dead-token-detection-and-reconnect",
  "summary": "Mọi call Shopify Admin API của Duos (sync catalog, company, order, quote → order, credit, Flow action, bulk) có đều đi qua lớp token, và khi token chết thì tất cả đều dừng tới khi merchant reconnect không? Merchant/buyer thấy gì ở từng luồng?",
  "check_ids": [
    "dead-token-detection-and-reconnect:CHK-010"
  ],
  "related_questions": [
    "Mọi call Shopify Admin API của Duos (sync catalog, company, order, quote → order, Flow action, bulk) có đều đi qua lớp token, và khi token chết thì tất cả đều dừng tới khi reconnect?"
  ]
}
```

## OQ-auth-token-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "app-open-reauth",
  "summary": "Thời hạn session khi mở app chính xác là bao lâu (tài liệu chỉ ghi khoảng 60 phút) và tính từ mốc nào?",
  "check_ids": [
    "app-open-reauth:CHK-006"
  ],
  "related_questions": [
    "Thời hạn session khi mở app chính xác là bao lâu (tài liệu ghi khoảng 60 phút)?"
  ]
}
```

## OQ-auth-token-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "app-open-reauth",
  "summary": "Merchant thấy gì khi mở app trong lúc shop đang bị gắn `Re-auth Required At` (banner, thông báo hay chuyển thẳng sang re-login), và màn hình/bước re-login cụ thể là gì?",
  "check_ids": [
    "app-open-reauth:CHK-007"
  ]
}
```

## OQ-auth-token-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "uninstall-reinstall-token-cleanup",
  "summary": "Khi lỡ webhook uninstall, ngoài safety net lúc reinstall có cơ chế nào khác để dọn field token cũ và ngừng job/email cho shop không? Trong khoảng trước khi reinstall, shop có bị xử lý như shop đang cài không?",
  "check_ids": [
    "uninstall-reinstall-token-cleanup:CHK-005"
  ],
  "related_questions": [
    "Khi lỡ webhook uninstall, có cơ chế nào khác ngoài safety net lúc reinstall để dọn field token cũ và ngừng job/email cho shop không?"
  ]
}
```

## OQ-auth-token-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "uninstall-reinstall-token-cleanup",
  "summary": "Soft-delete khi uninstall ảnh hưởng những dữ liệu nào ngoài session, field token và cached shop (company, quote, ledger, cấu hình…), và reinstall có khôi phục chúng không?",
  "check_ids": [
    "uninstall-reinstall-token-cleanup:CHK-006"
  ]
}
```

## OQ-auth-token-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-token-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "uninstall-reinstall-token-cleanup",
  "summary": "Email reinstall có tiêu đề, nội dung, người nhận và ngôn ngữ nào, và luồng reinstall sync những dữ liệu gì?",
  "check_ids": [
    "uninstall-reinstall-token-cleanup:CHK-007"
  ]
}
```

## OQ-auth-token-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-018",
  "type": "OPEN_ISSUE",
  "feature_id": "app-open-reauth",
  "summary": "Màn hình và các bước re-login khi mở app cụ thể là gì (OAuth Shopify, trang trung gian, thông báo)?",
  "kb_ids": [
    "KB-032",
    "KB-033",
    "KB-035",
    "KB-036"
  ]
}
```

## OQ-auth-token-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-019",
  "type": "OPEN_ISSUE",
  "feature_id": "app-open-reauth",
  "summary": "Thay đổi re-login-khi-mở-app đã được ship chưa, và nó ship sau khi `tokens:migrate-legacy` đã chạy xong?",
  "kb_ids": [
    "KB-021",
    "KB-032"
  ]
}
```

## OQ-auth-token-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-token-020",
  "type": "OPEN_ISSUE",
  "feature_id": null,
  "summary": "Bộ tài liệu nguồn (QA business rule, QA KB Duos, inventory staging) không có đặc tả API / data model cho các feature: dead-token-detection-and-reconnect, token-refresh-and-legacy-migration, app-open-reauth, uninstall-reinstall-token-cleanup. Cần Dev cung cấp endpoint, payload và dữ liệu lưu trữ liên quan nếu QA cần kiểm ở tầng API/DB.",
  "related_feature_ids": [
    "dead-token-detection-and-reconnect",
    "token-refresh-and-legacy-migration",
    "app-open-reauth",
    "uninstall-reinstall-token-cleanup"
  ]
}
```
