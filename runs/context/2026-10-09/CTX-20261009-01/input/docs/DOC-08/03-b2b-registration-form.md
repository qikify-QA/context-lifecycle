<!-- testlane knowledge KB-349 · kind=feature-profile · tag=B2B Registration · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/03-b2b-registration-form.md · createdAt=2026-10-08T07:48:36.759Z · updatedAt=2026-10-08T09:37:56.366Z -->

# 3. B2B Registration — Form builder & storefront form

**Status:** draft

Phân tích ngày 2026-10-07 từ Jira DUOS-3, DUOS-18, DUOS-105, DUOS-78,
DUOS-231, DUOS-424/426 (đọc description + comment), bản phân tích task QA Hub
DUOS-004 (cập nhật 2026-09-30, 2 lượt câu trả lời Dev/PO), actual result của
sonder trên staging 2026-09-30 → 2026-10-01 và `references/apps/DUOS.md`.
Đã đối chiếu inventory 2026-10-08 (store `stg-duos-plus-2`, Free plan) —
phần ✅/🟡/❌ xem `inventory/DUOS.md` (§ 2.3, 2.4, 2.20). Inventory **không
xem được** form builder (store chưa có form, không bấm "Create form") và
storefront (password page) → các rule form builder / storefront ở đây vẫn
theo ticket + quan sát của sonder trên `staging-duos-ngant-3`, chưa verify
lại. Phần duyệt submission tách sang
[04-company-submissions.md](04-company-submissions.md).

## Purpose

Merchant dựng form đăng ký trade / B2B nhiều bước, nhúng lên storefront;
buyer điền form để xin tài khoản công ty. Module "B2B Registration" (giá xem
[10-pricing-plans.md](10-pricing-plans.md)). Đợt DUOS-424 thêm regex theo
field, reCAPTCHA v3 và rate limit chống spam.

## Business Rules

### Form builder (Portal)

- Form nhiều step; thêm / xoá / sửa field; validate realtime (field bắt buộc
  phải điền mới qua step); merchant chọn chỗ hiển thị; notification cho
  merchant khi có registration mới. — DUOS-3 description (Done 2025-03-04).
  Theo ticket.
- Settings Header: "Show header", "Title text", "Description text",
  "Alignment"; Footer: "Previous button text", "Next button text", "Submit
  button text", "Alignment" (đổi "Submit button position" → "Button
  position"); After submit: "Success behavior" = "Show message" / "Redirect
  to another page". — DUOS-3 description + comment ngant 2024-12-16.
- Không giới hạn số field trong 1 step. — DUOS-3 comment ngant (✓).
- Menu "Add new field" (quan sát staging 2026-09-30, TC-DUOS-179): Name,
  Email, Phone, Dropdown list, Radio buttons, Checkboxes, Text heading, Text
  block, Divider, Custom HTML, Message, Terms checkbox, Short text, Paragraph,
  Datetime picker, Number, File Upload, cùng nhóm Company fields.
- Field "Your email" của form đang publish trên store test là **bắt buộc**
  (quan sát staging, TC-DUOS-176).
- Translations của form: "Steps" đổi thành "Form steps". — DUOS-78.

### Regex theo field (DUOS-426)

- Mỗi field đặt được 1 regex + 1 error message; value không khớp → chặn
  submit, hiện message. — DUOS-426 description. UI quan sát staging: checkbox
  "Enable regex validation" → ô "Regex pattern" (placeholder `e.g. ^[0-9]{8}$`)
  và ô "Error message" (TC-DUOS-179, 2026-09-30).
- 12 loại field có ô regex: Name, Email, Phone, Message, Custom text, Custom
  textarea, Custom number, Company name, Company address, Company city,
  Company zip, Tax ID. Không có: select, radio, checkbox, datetime, file,
  terms box, country, các block hiển thị. — haild (Dev FE) 30/09/2026, qua
  chị Nga. Xác nhận Dev; mới verify thật 2/12 loại.
- Tax ID: regex chỉ kiểm phần số thuế, không kiểm mã nước. — haild 30/09.
- Regex chỉ chạy khi field có giá trị; required trống báo lỗi required, không
  báo lỗi regex. — haild 30/09.
- Pattern dùng nguyên văn: không hỗ trợ flag (`/^abc$/i` không bao giờ khớp),
  không tự bọc `^…$`; pattern sai cú pháp → storefront bỏ qua rule, form vẫn
  submit; portal không kiểm tra cú pháp khi save. — haild 30/09.
- Message mặc định: `"<Label>" field is invalid.` (nhiều field: `"A, B"
  fields is invalid.`), tiếng Anh cố định không dịch; custom message dịch ở
  màn Translation. — haild 30/09.
- **BE không validate regex** — gọi thẳng API thì lọt. — haptt (Dev BE) 30/09.
  PO chưa chốt chấp nhận hay không (GAP-22).
- Rule tham chiếu khách: Company Registration Number = 8 chữ số, loại trừ
  07613085, 01234567, 12345678 —
  `^(?!07613085$|01234567$|12345678$)\d{8}$`. — DUOS-426.

### Chống spam — "Spam protection settings" (DUOS-425)

- Màn duy nhất trên Portal: Company submissions → "Spam protection settings"
  (route `/extensions/company-submissions/settings`, quan sát staging) với
  enabled / site key / secret key; ghi rõ phải dùng key v3; **không có ô
  min_score**. — haild 23/09 + 30/09; TC-DUOS-156.
- Label thật (quan sát staging 2026-10-08, inventory/DUOS.md § 2.3, 2.4):
  trang chứa nút là "B2B Company management" (row hub "B2B registration";
  ticket/KB gọi "Company submissions"); nút "Spam protection settings" mở
  trang có h1 **"Spam protection"**; section "Google reCAPTCHA v3", checkbox
  "Enable reCAPTCHA" (help "Block spam and bot submissions on your B2B
  registration form."), info "Use a reCAPTCHA v3 key" — "Create a key on the
  Google reCAPTCHA admin and choose reCAPTCHA v3 — reCAPTCHA v2 keys are not
  supported. Add your storefront domain to the key's domain list."
- Không xác minh được (inventory/DUOS.md § 5 #15): trên `stg-duos-plus-2`
  "Enable reCAPTCHA" đang tắt, field site key / secret key chỉ hiện khi bật
  và thao tác tick bị hệ thống quyền chặn → chưa thấy 2 field này; rule giữ
  nguyên theo Dev + TC-DUOS-156.
- reCAPTCHA v3: script `api.js?render={site_key}` chỉ load khi enabled; token
  lấy lúc bấm Submit với action `company_submission`, gửi ở field
  `recaptcha_token`. — haild/haptt 23/09.
- BE verify score ≥ `min_score` (mặc định 0.5; thiếu / không phải số / ngoài
  0–1 → 0.5) và action đúng; sai / thiếu / hết hạn token → HTTP 422
  `errors.recaptcha_token`. — haptt 23/09.
- `secret_key` bị strip trước khi sync lên metafield storefront. — haptt 23/09.
- Storefront: 422 → báo lỗi, cho submit lại; 429 → báo gửi quá nhiều; script
  không load (adblock) → báo lỗi, không gửi. — haild 23/09. Text 429 quan sát
  staging: "You've submitted too many times. Please try again later."
  (TC-DUOS-166, 2026-10-01); text 422 / script lỗi chưa chốt (GAP-14).
- Rate limit IP trên `POST /company-submissions`: **4/phút + 20/ngày** → 429;
  cửa sổ cố định 24h tính từ hit đầu, không theo múi giờ. — haptt 23/09, 25/09,
  30/09. **QA đã pass** phần 4/phút (TC-DUOS-166, 2026-10-01). Áp cho mọi store
  (Assumption AS-02 task DUOS-004).
- Text thành công storefront (quan sát staging): "Thanks for contacting us.
  We will get back to you as soon as possible!" (TC-DUOS-166).

### EU VAT validation (chỉ Shopify Plus)

- Checkbox "Validate EU VAT number", help text "If enabled, VAT number will
  be validated using the official VIES VAT number validation service". SDK
  hiện "Your VAT ID is valid" / "Your VAT ID is invalid. Please try again". —
  DUOS-18 description.
- Submission detail khi VAT sai: banner "The VAT number submitted is invalid.
  Please contact the applicant to verify their VAT number before approving the
  registration." (đã thấy thật trên staging — TC-DUOS-224); tooltip "Invalid
  VAT number" / "Validated VAT number". — DUOS-18.
- Form không có field Tax ID → ẩn warning banner VAT (DUOS-231, chỉ ảnh).
- VAT validation disable với store non-Plus, help text "This feature is
  available on Shopify Plus only." — DUOS-377 description.
- Backend dùng dịch vụ vatcheckapi, endpoint
  `POST /api/zones/eu/vat-number/validate` (DUOS-105).

### Country

- Field country là dropdown, gửi tên nước; BE map tên → ISO theo
  `storefront-form-countries.json` (242 nước), không thấy mới tra
  `/api/countries`; luồng cũ ở portal dùng `country.json`. — haild/haptt
  23/09 + 30/09.

## Edge Cases

- Nhập regex/message 5.000 ký tự, regex backtracking nặng (ReDoS) — chưa
  chạy (TC-DUOS-228, 238). `Need confirm` giới hạn độ dài.
- HTML trong custom error message / Label render dạng text? `Need confirm`
  (TC-DUOS-223 chưa chạy).
- Nội dung message storefront 422 / script lỗi, có đa ngôn ngữ không?
  `Need confirm` (GAP-14).
- Cách reset limit theo IP trên staging? `Need confirm` (GAP-16).
- 2 file country (`country.json` vs `storefront-form-countries.json`) có thể
  lệch theo thời gian — `Need confirm` danh sách nước tên dễ lệch.
- VAT sai có chặn Approve không, hay chỉ cảnh báo? Theo câu banner thì chỉ
  cảnh báo — `Need confirm`.
- Popup "Add new field" không đóng khi click ra ngoài — DUOS-3 comment ngant
  ❌ "Do polaris đang tìm cách fix"; từ field thứ 11 không có preview —
  trạng thái hiện tại `Need confirm`.

## Testability Notes

- Rate limit IP dùng chung cả team (20/ngày) — mỗi lần submit đều tốn quota.
- Sonder bị chặn sửa form builder / Spam protection settings của store dùng
  chung → đa số case regex và captcha (TC-DUOS-155…238) **chưa chạy dù status
  "passed"** trên QA Hub (actual result ghi "Chưa chạy"). Xem
  [known-issues.md](../known-issues/known-issues.md).
- Cần key reCAPTCHA v3 test đăng ký domain staging (TC-DUOS-155).
- Store `stg-duos-plus-2` (2026-10-08): 0 form, app embed Disabled,
  storefront có password, extension "B2B registration" Inactive (alert "B2B
  Registration Form in Free plan are available for testing and setup only.")
  → không dùng được cho case storefront form (inventory/DUOS.md § 2.3, 2.20,
  § 5 #30).

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `b2b-registration-form`.

## Related Jira Tickets

- [DUOS-1](https://ownego.atlassian.net/browse/DUOS-1) — B2B Company Management, Epic (To Do) — trống.
- [DUOS-3](https://ownego.atlassian.net/browse/DUOS-3) — Form Builder, Story (Done) — settings form.
- [DUOS-18](https://ownego.atlassian.net/browse/DUOS-18) — EU Tax number validation, Story (Done) — text VAT.
- [DUOS-105](https://ownego.atlassian.net/browse/DUOS-105) — EU tax number validation api, Story (Done) — API.
- [DUOS-78](https://ownego.atlassian.net/browse/DUOS-78) — Update UI on Translations - Registration form, Task (Done).
- [DUOS-231](https://ownego.atlassian.net/browse/DUOS-231) — Hide warning banner if form didn't include Tax ID field, Story (Done) — chỉ ảnh.
- [DUOS-94](https://ownego.atlassian.net/browse/DUOS-94) — [SDK] Update Phone Field, Story (To Do) — trống.
- [DUOS-424](https://ownego.atlassian.net/browse/DUOS-424) — Custom on B2B company creation, Story (PASS) — gồm DUOS-425 (captcha, rate limit) và DUOS-426 (regex).

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07.
- QA Hub task DUOS-004 (notes + TC-DUOS-150…238), đọc 2026-10-07.
- `references/apps/DUOS.md` § 2 mục 2.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.3, 2.4, 2.20, § 5 #15.
