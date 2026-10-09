<!-- testlane knowledge KB-364 · kind=known-issue · tag=— · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/known-issues/known-issues.md · createdAt=2026-10-08T07:54:50.753Z · updatedAt=2026-10-08T09:38:05.056Z -->

# Known Issues / Limitations — Duos B2B (DUOS)

**Status:** draft

Bug đang biết và giới hạn có chủ đích, gắn tag theo slug file feature. Đây là
nơi duy nhất ghi known issue — file trong `features/` chỉ link sang. Dựng
2026-10-07 từ QA Hub (test case + actual result task DUOS-001…006),
`business-rules/DUOS.md`, `references/apps/` và Jira. **Jira DUOS không có
Bug nào đang mở** (truy vấn 2026-10-07); bug QA Hub chỉ thấy id (`BUG-36`,
`BUG-210`) — MCP không có tool đọc nội dung bug. Cập nhật 2026-10-08: thêm
4 nghi vấn từ inventory (`inventory/DUOS.md` § 5 #4, #9, #17, #22, store
`stg-duos-plus-2`) — trạng thái "nghi vấn — chờ Dev", chưa log bug.

## Format

```
## <feature-slug> — short title

**Status:** open | wontfix | intentional limitation
**Impact:** who/what it affects
**Source:** ticket ID
```

## Issues

## company-submissions — Approve luồng cũ tạo company nhưng không có contact

**Status:** open — Dev haild (30/09/2026) nói build hiện tại còn ra vậy là bug; cần chạy lại
**Impact:** Merchant Approve submission có email trùng customer đã là contact company khác (TC-DUOS-057) hoặc email khác hoa/thường + khoảng trắng (TC-DUOS-060) → Shopify có company mới **không có contact**, buyer không dùng được. Expected mới: báo `customer_in_other_company`, không tạo company (BR-28 task DUOS-004). Nhánh flag ON (job) đã không còn tái hiện (TC-DUOS-158, 2026-09-30).
**Source:** QA Hub task DUOS-002 TC-DUOS-057, TC-DUOS-060 (actual result); task DUOS-004 RISK-01, BR-28.

## company-submissions — Approve submission "Failed" (không company_id) không làm gì

**Status:** open — nghi vấn, chưa log bug, cần Dev xem
**Impact:** Store flag ON, submission Failed: bấm Approve → `PUT` 200 nhưng không toast, vẫn Failed, không tạo company (expected: chạy luồng cũ tạo company đầy đủ — BR-25). Có thể liên quan phone "+84" thiếu số (BUG-210).
**Source:** QA Hub TC-DUOS-197, TC-DUOS-224 (actual result 2026-09-30).

## company-submissions — Phone submission lưu "+84" thiếu số

**Status:** open — `BUG-210` trên QA Hub (nội dung bug chưa đọc được qua MCP)
**Impact:** Submission 164 có phone "+84"; có thể làm Approve luồng cũ fail.
**Source:** QA Hub TC-DUOS-197 actual result (2026-09-30).

## company-submissions — Sai chính tả "submisison" trên Portal

**Status:** open — quan sát staging, chưa log bug
**Impact:** Toast "Company submisison approved" sau Approve; bulk action "Delete selected submisisons" ở list. Lỗi hiển thị.
**Source:** QA Hub TC-DUOS-151, TC-DUOS-198 (2026-09-30).

## company-submissions — Không có Reject; company tạo lúc submit không dọn được từ app

**Status:** intentional limitation (PO qua chị Nga 30/09/2026) — rủi ro vận hành
**Impact:** Flag ON: submission spam / không đạt vẫn để lại Company + Location + Main contact live trên Shopify, đặt hàng được; chỉ gỡ được trong Shopify admin. Có bulk "Delete selected submisisons" nhưng PO chưa chốt nó có đụng tới company không.
**Source:** Task DUOS-004 BR-48, RISK-02; TC-DUOS-198.

## company-submissions — Form public có thể gán customer có sẵn làm Main contact

**Status:** open — chờ PO quyết (SEC-04)
**Impact:** Flag ON: người lạ submit email của customer có sẵn → job tự gán customer đó làm Main contact, role Location admin của company mới, không qua review; email bị khoá sửa trong Portal.
**Source:** QA Hub TC-DUOS-221 (2026-09-30); TC-DUOS-071 (flag OFF, có review).

## company-submissions — Submission kẹt khi merchant đổi email customer trên Shopify

**Status:** open — chờ PO (GAP-29)
**Impact:** Nhánh có `company_id`: Approve báo "Could not find the customer for this submission in Shopify. The company approved trigger was not fired.", status giữ Pending, không có cách gỡ trong app.
**Source:** QA Hub TC-DUOS-160 (2026-09-30).

## company-submissions — Luồng cũ không kiểm tra kết quả trigger

**Status:** intentional limitation (theo Dev haild 30/09/2026)
**Impact:** Trigger `duos-approve-company` hỏng → submission vẫn `completed`, Flow/ERP của merchant không chạy mà Portal báo Approved.
**Source:** Task DUOS-004 BR-36, RISK-15.

## b2b-registration-form — Regex chỉ chặn ở storefront

**Status:** open — chờ PO chấp nhận (GAP-22)
**Impact:** Gọi thẳng `POST /company-submissions` với value sai pattern vẫn lưu; flag ON còn tự tạo company từ value đó. Pattern sai cú pháp bị bỏ qua im lặng; pattern dạng `/…/i` luôn báo lỗi; portal không cảnh báo khi save.
**Source:** Task DUOS-004 BR-37, BR-41, BR-42 (haptt/haild 30/09/2026).

## b2b-registration-form — Rate limit IP dùng chung cả team QA

**Status:** intentional limitation (thiết kế) — ảnh hưởng test
**Impact:** 4/phút + 20/ngày theo IP, cửa sổ cố định 24h; chưa có cách reset limit IP trên staging → mỗi lần submit tốn quota cả team.
**Source:** Task DUOS-004 BR-18, BR-45, GAP-16.

## b2b-registration-form, company-submissions — Test case "passed" nhưng thực tế chưa chạy

**Status:** open — vấn đề dữ liệu QA Hub
**Impact:** Task DUOS-004: nhiều case (VD TC-DUOS-154, 155, 156, 157, 159, 162…238) có status `passed` nhưng actualResult ghi "Chưa chạy" (thiếu store flag OFF, key reCAPTCHA, quyền sửa form). Đọc số liệu pass của task này sẽ sai.
**Source:** QA Hub task DUOS-004, actual result 2026-09-30.

## company-submissions — Company UK do job tạo gắn Market "Vietnam", 0 catalog

**Status:** open — có thể do cấu hình store test, `Need confirm`
**Impact:** Location UK không nhận Base catalog qua B2B market UK → buyer không đặt được đơn sample.
**Source:** QA Hub TC-DUOS-153 (2026-09-30).

## b2b-registration-form — `GET /api/user/config` không auth trả 400 thay vì 401/403

**Status:** open — minor, không lộ dữ liệu
**Impact:** Response `{"message":"Missing Authorization key in headers array"}`.
**Source:** QA Hub TC-DUOS-219 (2026-09-30).

## roles-permissions — Bulk assign có thể báo Completed dù location chưa được gán

**Status:** intentional limitation (out of scope DUOS-405)
**Impact:** Bulk đếm theo company; item Shopify reject bị skip, không để dấu vết trong record lẫn log.
**Source:** business-rules/DUOS.md (DUOS-405); DUOS-393.

## roles-permissions — Loop vô hạn khi workflow nghe "member role updated" chứa action assign-role

**Status:** intentional limitation — không log bug
**Impact:** Không dựng workflow dạng này khi test.
**Source:** business-rules/DUOS.md (DUOS-405).

## roles-permissions — Sửa role template ghi đè permission của mọi member giữ role

**Status:** intentional (behavior change DUOS-405) — tác động diện rộng
**Impact:** Mỗi lần Flow action chạy, permission re-sync từ template xuống tất cả member giữ role (cả location khác).
**Source:** business-rules/DUOS.md (DUOS-405).

## roles-permissions — Key field Flow sai thì luôn "Shopify contact role is required"

**Status:** intentional limitation
**Impact:** FE chưa deploy / sai key `shopify_contact_role` không phân biệt được với merchant bỏ trống.
**Source:** business-rules/DUOS.md (DUOS-405).

## company-member — Filter role chỉ đọc tối đa 500 member / location

**Status:** intentional limitation (known limit)
**Impact:** Location > 500 member: phần dư bị bỏ khi lọc theo role (có ghi log), trang có thể rỗng giữa chừng.
**Source:** Task DUOS-003 BR-14 (haptt 15/09/2026).

## company-member — Search chỉ prefix match

**Status:** open — chờ PO/client chấp nhận (GAP-05)
**Impact:** Gõ phần giữa tên ("urrier") không ra kết quả.
**Source:** Task DUOS-003 BR-12.

## finance-credit — Credit không áp cho payment term Due on fulfillment / receipt / fixed date

**Status:** intentional limitation
**Impact:** Chỉ Net 7/15/30/45/60/90 có credit validation; case các term khác expected "không áp dụng", không phải fail.
**Source:** references/apps/DUOS.md (docs 09/07/2026); DUOS-201 comment haptt 2025-09-23.

## finance-credit — Chưa hỗ trợ đổi payment term sau khi đặt order

**Status:** intentional limitation
**Impact:** Shopify không gửi hook → transaction credit có thể sai; order đã cancel/paid không hỗ trợ bước tiếp.
**Source:** DUOS-201 comment haptt 2025-09-23/25.

## quote-request, finance-credit — Draft order không áp net-term deposit

**Status:** intentional limitation (nền tảng Shopify)
**Impact:** Nhánh one-time deal của Quote (tạo qua draft order) không có deposit net-term.
**Source:** references/apps/DUOS.md § 3; DUOS-quotation.md § 3.

## roles-permissions, finance-credit — Chặn checkout chỉ trên Shopify Plus

**Status:** intentional limitation
**Impact:** Store non-Plus: "Block checkout by customer permissions" và "Block checkout by available credit limit" hiển thị disabled kèm banner "Shopify Plus required for this feature".
**Source:** references/apps/DUOS.md § 1; DUOS-377, DUOS-381.

## company-member — Customer Account extension API không lấy được current company location

**Status:** intentional limitation (nền tảng Shopify)
**Impact:** Ghi chú kỹ thuật nội bộ.
**Source:** references/apps/DUOS.md § 3.

## notifications — Alias email `@qikify` không nhận email member

**Status:** open — chưa kết luận (Ashley liên hệ Mailgun)
**Impact:** Invite member bằng alias `@gmail` nhận mail, alias `@qikify` không nhận dù log báo delivered; có thể do domain From.
**Source:** DUOS-309 comment Ashley + haptt 2026-03-25.

## auth-token-lifecycle — BUG-36 trên TC-DUOS-001

**Status:** open? — nội dung chưa đọc được (MCP không có tool đọc bug); case vẫn `passed`
**Impact:** `Need confirm` — mở QA Hub xem BUG-36.
**Source:** QA Hub TC-DUOS-001.

## pricing-plans — Giá gạch "~150~ 150" khi admin discount = 0%

**Status:** fixed trên staging (FE fallback, DUOS-431) — regression
**Impact:** Trang pricing hiển thị giá gạch trùng giá thật ở User & Permission.
**Source:** DUOS-431 comment haild 02/10/2026; TC-DUOS-303, 304 passed.

## pricing-plans — Key lang `non_plus_banner` không được dùng

**Status:** open — minor (code chết)
**Impact:** Text "Your current Shopify plan does not support…" có trong `content.json` nhưng không component nào render.
**Source:** KB-002 (Dev haild 05/10/2026).

## pricing-plans — Copy alert nhắc "Premium plan" không còn trong mô hình giá

**Status:** nghi vấn — chờ Dev (Minor, copy)
**Impact:** Alert ở "B2B extensions hub", "B2B Company management", "Users & permission" (store Free): "…please upgrade to the **Premium plan**." — mô hình hiện tại là modular, không có gói "Premium plan" → merchant khó hiểu phải mua gì.
**Source:** inventory/DUOS.md § 5 #4 (§ 2.2, 2.3, 2.7), quan sát staging 2026-10-08.

## notifications — Footer template "Credit limit assigned…" nói về quote request

**Status:** nghi vấn — chờ Dev (Minor, nội dung)
**Impact:** Template mẫu "Credit limit assigned to a company location" có footer "You received this email because you submitted a quote request to {shop_name}" — sai ngữ cảnh credit; buyer nhận email credit sẽ thấy lý do gửi sai.
**Source:** inventory/DUOS.md § 5 #9 (§ 2.15), quan sát staging 2026-10-08 (`/notifications/templates/0?type=credit-assigned`).

## finance-credit — Admin UI block trang Company location không render, API 404

**Status:** nghi vấn — chờ Dev (bug hay do store Free / location chưa sync DB)
**Impact:** Shopify admin › Companies › Snowdevil › location: block Duos (target `admin.company-location-details.block.render`) không hiện gì; console `404` `staging-api.getduos.io/api/admin-extensions/company-locations/<id>` + "Error fetching credit info: No query results for model [App\Models\CompanyLocation]." Rule DUOS-398 kỳ vọng location chưa có limit hiện "No credit limit has been assigned to this company yet." → lỗi im lặng.
**Source:** inventory/DUOS.md § 5 #17 (§ 2.18), console staging 2026-10-08.

## quote-request — Quote PDF template gọi Google Web Fonts API bị 403

**Status:** nghi vấn — chờ Dev (môi trường, có thể API key staging)
**Impact:** Mở "Quote PDF template" → 6× HTTP 403 `googleapis.com/webfonts/v1/webfonts`; danh sách Font family có thể không tải đủ.
**Source:** inventory/DUOS.md § 5 #22 (§ 2.11), console staging 2026-10-08.

## roles-permissions — Checkout extension từng bỏ qua member role

**Status:** fixed (DUOS-273) — giữ trong regression
**Impact:** Test "Block checkout by permission" với đủ từng role (Junior/Senior/Admin/custom).
**Source:** references/apps/DUOS.md.
