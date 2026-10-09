<!-- testlane knowledge KB-350 · kind=feature-profile · tag=Company Submissions · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/04-company-submissions.md · createdAt=2026-10-08T07:49:11.281Z · updatedAt=2026-10-08T09:37:57.310Z -->

# 4. Company submissions — duyệt đăng ký & tạo company

**Status:** in-review

Phân tích ngày 2026-10-07 từ Jira DUOS-6, DUOS-91, DUOS-230, DUOS-411,
DUOS-424/425, `business-rules/DUOS.md` (mục B2B Registration, 2026-09-04),
bản phân tích + test case task QA Hub DUOS-002 (26 case passed, 2026-09-07)
và DUOS-004 (89 case, cập nhật 2026-09-30 với câu trả lời Dev haild/haptt và
PO qua chị Nga). Đã đối chiếu inventory 2026-10-08 (store `stg-duos-plus-2`,
Free plan) — phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.3, 2.15). Store đó
**0 submission** → submission detail / Approve / nút Reject-Delete chưa
verify qua inventory; label có ghi "quan sát staging" (không kèm ngày
2026-10-08) là sonder đã thấy trên `staging-duos-ngant-3`.

## Purpose

Merchant xem submission từ registration form (xem
[03-b2b-registration-form.md](03-b2b-registration-form.md)), duyệt để tạo
**B2B company** trên Shopify: Company + 1 Company Location + customer làm
Main Contact (Location admin) + role Admin của app, rồi bắn Shopify Flow
trigger "company approved". Với merchant bật config riêng (Ca' Pietra),
company được tạo ngay lúc submit để buyer đặt đơn sample trước khi duyệt.

## Business Rules

### Màn Company submissions (Portal)

- Tên thật trên Portal: header **"B2B Company management"** (row ở B2B
  extensions hub: "B2B registration"; ticket/KB gọi "Company submissions");
  nút "Spam protection settings", "Help center"; card "B2B/Wholesale Company
  registration form" (badge `0/1`, nút "Create form"); bảng submission tab
  "All" · "Pending" · "Approved" · "Failed", "Search and filter results",
  "Sort the results", empty state "No company submission found"; card
  "Notifications" (nút "Manage"). — quan sát staging 2026-10-08
  (inventory/DUOS.md § 2.3).

- List có filter tab **All / Pending / Approved / Failed**; status lưu
  `pending | completed | failed` — Approve ghi `completed`, UI hiện badge
  "Approved"; `failed` hiện badge đỏ "Failed" ở list + header detail, nút
  Approve vẫn hiện. — haild 22/09 + 30/09 (task DUOS-004 BR-08, BR-47).
  Quan sát staging khớp (TC-DUOS-158).
- Nút Approve trên detail: "Approve company" (quan sát staging, TC-DUOS-198).
  Hiện với mọi status trừ `completed`. — haild 30/09 (BR-25). Toast sau
  Approve: "Company submisison approved" (sai chính tả, quan sát staging
  TC-DUOS-151); banner "B2B company created" trỏ tới company.
- **Không có nút Reject** (không có status `rejected`). — PO qua chị Nga
  30/09 (BR-48); quan sát staging flag ON (TC-DUOS-198). **Corrected** so với
  DUOS-6 (2024, "approve or reject… với lý do"), references/apps/DUOS.md
  ("Reject → từ chối") và TC-DUOS-069 (status "passed", expected "Rejected").
  Có bulk action "Delete selected submisisons" khi tick checkbox (quan sát
  staging, sai chính tả) — PO chưa chốt Reject/Delete.
  Không xác minh được lại qua inventory 2026-10-08: store `stg-duos-plus-2`
  không có submission nên không kiểm được nút Reject / bulk Delete
  (inventory/DUOS.md § 5 #14) — kiểm lại trên `staging-duos-ngant-3` ở lần
  build sau.
- Sửa email / phone của submission trước khi approve (DUOS-91): qua Edit
  submission → Account → "Your email" (quan sát staging TC-DUOS-197). Khi
  submission đã có `company_id` thì card Submission **không còn icon sửa**
  (TC-DUOS-196). PO nói "flag ON không sửa được" (BR-50) — điều kiện thật là
  cờ hay `company_id` → `Need confirm` (GAP-27); staging cho thấy theo
  `company_id`.

### Approve → tìm customer có sẵn (DUOS-411)

- Approve tìm customer từ submission bằng email/phone đã submit và link vào
  company mới thay vì luôn tạo customer mới. — business-rules/DUOS.md
  (DUOS-411, 2026-09-04). **Đã xác nhận**; QA pass 26 case (task DUOS-002).
- Thứ tự: email trước; phone **chỉ** khi submission không có email; email và
  phone ra 2 customer khác nhau → lấy theo email. — business-rules/DUOS.md.
  Đã xác nhận.
- Email: tìm theo email đã chuẩn hoá, rồi email gốc. — haptt 30/09 (BR-30).
- Customer đã là contact của company khác → báo lỗi
  `customer_in_other_company`, **không** tạo company. — haild 30/09 (BR-28).
  Build còn ra "company không có contact" là bug (xem known issues).
- Không match → tạo customer mới như cũ (TC-DUOS-053 passed).

### Auto company creation khi submit (DUOS-425, flag theo store)

- Flag `enable_company_creation_on_submit` (root `users.config`): chỉ `true`
  hoặc `"true"` là ON, còn lại OFF (fail-closed). Không có UI. — haild 22/09.
- Flag ON: lưu submission, storefront luôn success; queued job tạo Company +
  1 Location (địa chỉ từ form) + customer Main Contact role Location admin +
  app Admin role; ghi `data.company_id`; status vẫn `pending`. — haptt 23/09.
  **QA đã pass** TC-DUOS-150 (2026-09-30).
- Job: không lọc country; gán catalog trong `company_creation_catalog_ids`
  (nếu có); chạy 1 lần (`$tries = 1`), không retry, bỏ qua submission đã có
  `company_id` hoặc không còn pending; không rollback (lỗi sau companyCreate
  vẫn giữ `company_id` + ghi `company_creation_error`). — haptt 23/09, 30/09.
- Job fail trước companyCreate (VD customer thuộc company khác) → `failed` +
  `company_creation_error`, không `company_id`. — haptt 30/09. QA pass
  TC-DUOS-158.
- Rate limit theo shop: 10/phút + 50/ngày (override
  `company_creation_rate_limit`); vượt → submission vẫn lưu `pending`,
  `company_creation_error = "rate_limited"`, Approve fallback. — haptt 23/09, 25/09.
- Portal **không đọc cờ**: trước Approve tải lại submission — có `company_id`
  → chỉ bắn trigger rồi set `completed`; không có → luồng cũ (portal tự tạo
  company). — haild 30/09 (BR-24).
- Banner vàng `setup_incomplete` ("Company created, but setup could not be
  completed…") chỉ khi có cả `company_id` lẫn `company_creation_error`; hiện
  trước + sau Approve, đóng được, không hiện error thô. Merchant tự gán phần
  thiếu trên Shopify. — haild 30/09; PO qua chị Nga 30/09 (BR-26, BR-51).
- Trigger `duos-approve-company` chỉ bắn khi Approve (không lúc submit), payload
  cùng cấu trúc 2 nhánh: Submission {id, data, formattedData, submittedEmail,
  createdAt} + `customer_id`. — DUOS-425; haild 30/09. QA xác nhận 1 run Flow
  sau Approve (TC-DUOS-151).
- Nhánh có `company_id`: tìm lại customer theo email/phone submission; không
  thấy → toast "Could not find the customer for this submission in Shopify.
  The company approved trigger was not fired." (quan sát staging
  TC-DUOS-160), status giữ nguyên. Trigger hỏng → `failed` + `trigger_failed`,
  Approve lại chỉ bắn lại trigger. Luồng cũ không kiểm tra kết quả trigger,
  luôn set `completed`. — haild 30/09 (BR-34, BR-36).

### Email cho buyer

- Notifications → "B2B submission" → Customer notification "B2B account
  created" ("Send email to customer when their B2B submission is approved.";
  ticket ghi: "Send email to customers when their submission is approved.")
  — DUOS-171; text sửa theo quan sát staging 2026-10-08 (inventory/DUOS.md
  § 2.15). Sonder thấy mục này gửi khi Approve qua Shopify Flow, không có
  công tắc trong app (TC-DUOS-194); inventory khớp: chỉ có nút "Read
  instruction" + "Open Shopify Flow".
- Flag ON: email kích hoạt có "setting riêng ở phần Notification" (PO 30/09,
  BR-49) — chưa rõ setting nào; buyer đăng nhập được bằng Shopify login code
  trước Approve (quan sát TC-DUOS-153). `Need confirm` (GAP-25, GAP-26).

## Edge Cases

- Email mới + phone trùng customer cũ → không match theo phone → job tạo
  customer **mới không có phone** (Shopify từ chối phone trùng). Resolved —
  quan sát staging TC-DUOS-201; rule BR-30. PO chưa nói có chấp nhận không.
- Customer match là contact company khác — Resolved (BR-28/29); nhưng
  TC-DUOS-057, TC-DUOS-060 trên luồng cũ ra "company không có contact" — cần
  chạy lại trên build hiện tại.
- Race: Approve đúng lúc job chưa ghi `company_id` → có thể tạo company thứ 2.
  `Need confirm` PO/Dev (GAP-21).
- Luồng cũ: gán contact lỗi → company không contact, vẫn `completed`, không
  banner — bug hay chấp nhận? `Need confirm` (GAP-23).
- setup_incomplete khi chưa gán contact → Approve ra `customer_not_found`?
  `Need confirm` (GAP-28).
- Merchant đổi email customer trên Shopify admin → submission kẹt
  `customer_not_found`, không có đường gỡ trong app. `Need confirm` PO
  (GAP-29).
- Merchant chọn payment term trước hay sau approve (DUOS-230)? `Need confirm`.
- Submission không có cả email lẫn phone, email alias, chuẩn hoá phone
  (0912 vs +84) — ghi nhận ở TC-DUOS-061…063, 076; quy tắc chưa chốt.
- Người lạ submit email của customer khác → flag ON tự gán họ làm Main
  contact Location admin không qua review (đã quan sát TC-DUOS-221).
  `Need confirm` PO (SEC-04).
- Body submit kèm `company_id` có bị bỏ qua không (mass assignment)? Chưa
  kiểm (TC-DUOS-220). `Need confirm`.

## Testability Notes

- Store `staging-duos-ngant-3` đang flag ON → mọi case flag OFF / luồng cũ
  của task DUOS-004 bị treo. Cần store thứ 2.
- Approve submission `failed` (không `company_id`) trên staging **không làm
  gì** (PUT 200, không toast, vẫn Failed) — TC-DUOS-197, TC-DUOS-224; chưa rõ
  bug hay do data (phone "+84" thiếu số — BUG-210).
- Trạng thái lưu thật (`completed`) chỉ đọc được qua DB/payload — cần Dev.
- Verdict bản phân tích: Partially Ready 11/14 (1 GAP Major mở: GAP-25).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `company-submissions`.

## Related Jira Tickets

- [DUOS-6](https://ownego.atlassian.net/browse/DUOS-6) — Company Registration, Story (Done) — spec gốc 2024 (approve/reject) — đã lỗi thời phần Reject.
- [DUOS-55](https://ownego.atlassian.net/browse/DUOS-55) — B2B Company Management (main page), Story (Done) — chỉ ảnh.
- [DUOS-91](https://ownego.atlassian.net/browse/DUOS-91) — Allow to update submission phone and email before approval, Bug (Done) — trống, theo summary.
- [DUOS-104](https://ownego.atlassian.net/browse/DUOS-104) — [Portal] Assign admin role when approve company, Story (Done) — không đọc chi tiết.
- [DUOS-230](https://ownego.atlassian.net/browse/DUOS-230) — Create company with payment term, Story (Done) — câu hỏi PO chưa trả lời.
- [DUOS-354](https://ownego.atlassian.net/browse/DUOS-354) — Admin adding new location to company account, Story (To Do) — trống.
- [DUOS-411](https://ownego.atlassian.net/browse/DUOS-411) — Check existing customers before creating company, Story (QA Review) — customer matching.
- [DUOS-424](https://ownego.atlassian.net/browse/DUOS-424) — Custom on B2B company creation, Story (PASS) — DUOS-425 auto creation, DUOS-426 regex; PR `qikify/b2b-api#212`.

## Source

- QA Hub task DUOS-002, DUOS-004 (notes + test case + actual result), đọc 2026-10-07.
- `business-rules/DUOS.md` (DUOS-411); Jira DUOS-6/91/230 đọc 2026-10-07.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.3, 2.15, § 5 #7, #14.
