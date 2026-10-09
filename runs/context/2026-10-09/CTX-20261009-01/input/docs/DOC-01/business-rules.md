<!-- testlane knowledge kind=business-rule · project proj-0b7fef03-7570-4326-97c8-b16336c40a76 · 95 entry · đóng băng 2026-10-09 -->

# QA business rule Duos B2B (Testlane DUOS knowledge kind=business-rule)

## KB-001 — Pricing page — banner giữ giá cũ & cách xác định giá store đang trả (charge vs plan)

status: draft · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-431 · createdAt: 2026-10-02T10:20:34.270Z · updatedAt: 2026-10-02T10:20:34.270Z

> **Draft** — rút từ comment Dev trên DUOS-431 (haptt 02/10/2026 09:42). Description DUOS-431 chưa cập nhật theo; PO (Ashley) chưa xác nhận chính thức điều kiện banner (GAP-04 trong task QA Hub DUOS-005). Đổi sang `active` khi PO chốt.

Phạm vi: Epic DUOS-430 "Pricing Oct 2026" · story DUOS-431 "Pricing page update" · task QA Hub DUOS-005.

## Rule

1. **Điều kiện hiện info banner** (dưới dòng "Bill monthly at…" trên trang pricing Duos portal) — hiện khi và chỉ khi:
   - store có charge **active**, và
   - `charge.price > 0`, và
   - `charge.price` ≠ giá mới tính từ `plan.extensions` theo logic tính giá đang có của trang pricing.
   - Thay cho điều kiện "store đang có custom plan" ghi trong description.
2. **Số tiền + chu kỳ trong banner lấy động** từ `charge.price` + `charge.interval` của từng store — không hardcode "$168/mo" như text mẫu trong description.
   - Text mẫu: "As one of our early partners, your original subscription stays $168/mo as we agreed until you change your plan."
3. **Không dùng `plan.price`** để biết store đang trả bao nhiêu: khi store khác chọn cùng tổ hợp extension, BE cập nhật `plan.price` theo giá mới, trong khi Shopify vẫn charge store cũ theo giá cũ.
4. **Mọi plan trả phí hiện tại đều là custom plan** (tạo từ tổ hợp extension, tên dạng "Custom: xxxx") → "custom plan" không phân biệt được store giá cũ / giá mới.
5. **Bảng `charges` lưu snapshot** lúc store approve subscription (`price`, `interval`, `trial_days`…). `/home` (`UserResource`) trả `charge` (active) + `plan` + `plan.extensions`; FE dùng data này, BE không đổi.
6. **Store đã subscribe trước khi đổi giá tiếp tục bị Shopify charge giá cũ cho tới khi đổi plan**; giá mới không tự áp vào charge đang chạy.

## Còn mở (chưa thuộc rule)
- `charge.price` là giá trước hay sau bundle discount → ảnh hưởng phép so sánh ở rule 1 (GAP-03).
- Thao tác nào tính là "change your plan" (GAP-07).
- Câu "early partners" áp cho mọi store giá cũ hay chỉ early-bird (GAP-05).

## KB-002 — Pricing page — điều kiện hiện SuggestedPlans + banner "30-day free trial unlocked" cho store non-Plus (DUOS-378)

status: active · tag: Pricing · sourceUrl: https://ownego.slack.com/archives/D0AAY8XSH63/p1791171356947399 · createdAt: 2026-10-05T03:39:31.390Z · updatedAt: 2026-10-05T03:39:31.390Z

> Nguồn: Dev haild giải thích từ code FE, Slack 05/10/2026 10:35. Ticket DUOS-378 — phần 2 pack gợi ý (SuggestedPlans) ở đầu trang Pricing, kèm banner "30-day free trial unlocked".

## 1. Điều kiện hiện SuggestedPlans
`src/pages/NewPricing.vue:116`:

```
!isShopifyPlus && (!isOldPlan || isFreeUser) && !isPartnerDevelopment && planName
```

`isShopifyPlus` (`src/composables/useSubscription.ts:66`) = **true** nếu store có một trong: `shopify_plus`, plan `Plus Trial`, `test`, hoặc plan `staff`. Vì vậy store phải thoả **tất cả**:

| Field trong user | Phải là |
|---|---|
| `shopify_plus` | `false` |
| `partner_development` | `false` (store dev partner bị ẩn) |
| `test` | `false` (store test được tính là Plus) |
| `plan_name` | có giá trị, không phải `staff` (VD `basic`) |

và thêm `(!isOldPlan || isFreeUser)`: store không ở plan cũ, hoặc là free user.

→ **Store dev thông thường không thấy SuggestedPlans**, vì code coi store dev là Plus (test / staff / Plus Trial) hoặc loại ra (partner_development).

## 2. Banner "30-day free trial unlocked"
Ngoài điều kiện mục 1, cần thêm:
- Đã chọn **đủ tất cả extension** (bấm một pack hoặc tự chọn hết).
- `charge` **chưa có `trial_ends_on`** — store chưa từng trial. Nếu store đang trial, trang hiện **số ngày trial còn lại** thay cho banner này.

## 3. Banner cảnh báo non-Plus (khác với SuggestedPlans)
- "Shopify Plus required for this feature" ở `src/pages/credit-limit/CompanyList.vue:81` và `src/pages/extensions/CompanyMembers.vue:165`: chỉ cần `!isShopifyPlus`.
- Key lang `non_plus_banner` ("Your current Shopify plan does not support…") có trong `content.json` nhưng **chưa được component nào dùng**.

## 4. Cách test khi chưa có store non-Plus thật (chỉ FE)
`useStore` và `useSubscription` đọc lại `window.shopifyAppEmbedded.user` mỗi lần component mount:
1. Mở app trong Shopify Admin → DevTools → Console, chuyển context dropdown sang **iframe của app** (không để `top`).
2. Chạy:
```js
Object.assign(window.shopifyAppEmbedded.user, {
  shopify_plus: false,
  partner_development: false,
  test: false,
  plan_name: 'basic',
  plan_display_name: 'Basic',
  charge: {},   // free user, chưa trial → để hiện banner 30-day
});
```
3. Sang trang khác rồi quay lại Pricing để component mount lại. **Reload sẽ mất** phần vừa sửa.
4. Bấm một pack hoặc chọn hết extension → banner "30-day free trial unlocked" hiện.

Giới hạn: chỉ đổi phía FE. Muốn test luồng subscribe thật → nhờ BE sửa các field trên trong DB cho shop staging, hoặc dùng store thật đang ở plan Basic / Shopify / Advanced. Script này cũng làm hiện banner "Shopify Plus required…" ở mục 3.

## Chưa rõ
- `isOldPlan` xác định thế nào (store theo bảng giá cũ? early-bird?) — Dev chưa giải thích.

## KB-005 — Token chết khi: token expiring có Refresh Token Expires At < now, hoặc token legacy từ 2027-01-01

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:42:46.371Z · updatedAt: 2026-10-07T07:42:46.371Z

**Rule**: Token được coi là chết ⟺ (loại expiring AND Refresh Token Expires At < now) OR (loại legacy AND now ≥ 2027-01-01).

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-006 — Token chết → app chặn trước khi gọi Shopify, set Re-auth Required At và gửi email reconnect ngay

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:04.084Z · updatedAt: 2026-10-07T07:44:04.084Z

**Rule**: Khi token chết, app tự chặn trước khi gọi Shopify (không đợi 401 thật xảy ra), set `Re-auth Required At`, và gửi email cho merchant ngay lập tức.

**Ảnh hưởng khi test**: Không chờ 401 thật — kiểm flag Re-auth Required At + email ngay khi điều kiện token chết thoả (cần Dev chỉnh ngày trong DB).

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-007 — Shop legacy chuyển sang token expiring qua lệnh tokens:migrate-legacy (huỷ token cũ ngay) hoặc re-login khi mở app (không huỷ)

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:05.046Z · updatedAt: 2026-10-07T07:44:05.046Z

**Rule**: (1) Lệnh `tokens:migrate-legacy` — silent, hủy token cũ ngay lập tức, phải chạy xong trước 2027-01-01; hoặc (2) re-login khi merchant tự mở app — không hủy token cũ tại thời điểm migrate.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-008 — tokens:migrate-legacy phải chạy xong hoàn toàn trước khi ship luồng re-login-khi-mở-app

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:06.030Z · updatedAt: 2026-10-07T07:44:06.030Z

**Rule**: `tokens:migrate-legacy` phải chạy xong hoàn toàn **trước khi** ship thay đổi re-login-khi-mở-app, để 2 luồng không chạy đồng thời trên cùng 1 shop.

**Ảnh hưởng khi test**: Trên staging kiểm thứ tự deploy trước khi test re-login.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-009 — Job tokens:refresh-expiring --days=10 chạy hằng ngày

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:07.082Z · updatedAt: 2026-10-07T07:44:07.082Z

**Rule**: `tokens:refresh-expiring --days=10` chạy **daily**.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-010 — Job tokens:migrate-legacy chạy hằng tuần, cộng 1 lần chạy tay ngay sau deploy

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:08.134Z · updatedAt: 2026-10-07T07:44:08.134Z

**Rule**: `tokens:migrate-legacy` chạy **weekly**, cộng thêm 1 lần chạy tay ngay sau deploy để dọn backlog.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-011 — Cả 2 job token bỏ qua shop đã uninstall, xử lý tuần tự từng shop, cần Horizon queue worker

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:09.115Z · updatedAt: 2026-10-07T07:44:09.115Z

**Rule**: Cả `tokens:refresh-expiring` và `tokens:migrate-legacy` đều bỏ qua shop đã uninstall, xử lý tuần tự từng shop, cần Horizon queue worker đang chạy.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-012 — Khi merchant mở app: legacy / đổi scope / session hết / không có session → re-login; expiring còn session → vào thẳng, không silent refresh

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:10.022Z · updatedAt: 2026-10-07T07:44:10.022Z

**Rule**: - Token legacy → re-login.
  - Scope/permission đã đổi → re-login.
  - Token có hạn (expiring) còn session hợp lệ → tiếp tục bình thường.
  - Token có hạn nhưng session ~60 phút đã hết → re-login (**không** silent refresh).
  - Không có session / shop không tìm thấy → re-login.

**Ảnh hưởng khi test**: Session ~60 phút hết phải ra re-login, silent refresh là sai.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-013 — Email reopen gửi đúng 1 lần khi shop chuyển từ đóng sang active và token đã chết; bỏ qua shop uninstall hoặc còn đóng

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:10.972Z · updatedAt: 2026-10-07T07:44:10.972Z

**Rule**: Trigger qua `shop-update` webhook khi shop chuyển từ trạng thái đóng (frozen/cancelled/fraudulent/paused) → active, **và** token đã chết tại thời điểm đó. Gửi **đúng 1 lần**. Áp dụng cả development store. Bỏ qua shop đã uninstall hoặc vẫn đang đóng. Nếu shop đóng < 90 ngày thì token vẫn còn sống — không cần làm gì.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-014 — Uninstall: xoá session, clear 4 field token, clear cached shop, soft-delete; job refresh/migrate bỏ qua shop

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:11.909Z · updatedAt: 2026-10-07T07:44:11.909Z

**Rule**: Xóa session, clear 4 field token (`Access Token Expires At`, `Refresh Token`, `Refresh Token Expires At`, `Re-auth Required At`), clear cached shop, đánh dấu soft-delete uninstalled. Job refresh/migrate sau đó bỏ qua shop này.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-015 — Reinstall luôn nhận token expiring, clear field token cũ còn sót trước khi ghi token mới, chạy luồng reinstall thường

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:12.938Z · updatedAt: 2026-10-07T07:44:12.938Z

**Rule**: Login mới luôn nhận token dạng expiring (app luôn request expiring khi reinstall). Field token được ghi lại; đồng thời clear field cũ còn sót (safety net nếu trước đó miss uninstall webhook) trước khi ghi token mới. Kích hoạt luồng reinstall thông thường (sync dữ liệu + gửi email reinstall).

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-016 — Uninstall khi đang chờ reconnect → soft-delete, clear Re-auth Required At, không email/refresh nữa

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:13.941Z · updatedAt: 2026-10-07T07:44:13.941Z

**Rule**: Shop bị soft-delete, `Re-auth Required At` bị clear → không còn gửi email/refresh nữa cho shop đó (vô nghĩa trừ khi reinstall lại).

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-017 — Admin panel "Token and scopes" hiện các mốc hạn token; Refresh Token mã hoá không hiện raw; shop chưa migrate thì field ngày rỗng

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:14.834Z · updatedAt: 2026-10-07T07:44:14.834Z

**Rule**: `Access Token Expires At`, `Refresh Token` (mã hoá, không hiển thị raw), `Refresh Token Expires At`, `Re-auth Required At`. Shop chưa migrate thì cả 3 field ngày đều rỗng.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-018 — Nút "Refresh access token" chỉ hiện cho shop expiring, dùng để force refresh thủ công

status: active · tag: Auth & Token · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:15.774Z · updatedAt: 2026-10-07T07:44:15.774Z

**Rule**: Nằm trong Shops → mở 1 shop → mục "Token and scopes", chỉ hiển thị cho shop dạng expiring, dùng để force refresh thủ công.

**Nguồn**: DUOS-399 — cập nhật 2026-07-07

## KB-019 — Store staging 70, 67 đã migrate expiring token; store 22, 68, 30 giữ legacy để test đối chứng

status: active · tag: — · sourceUrl: https://ownego.atlassian.net/browse/DUOS-399 · createdAt: 2026-10-07T07:44:16.714Z · updatedAt: 2026-10-07T07:44:16.714Z

**Rule**: `stg-duos-plus-2` (instance 70) và `stg-duos-email-testing-advanced` (instance 67) **đã** migrate sang expiring token. `staging-duos-ngant-3` (instance 22), `stg-duos-email-testing-grow` (instance 68), `staging-duos-ngant-9` (instance 30) **còn giữ legacy** để test đối chứng song song.

**Ảnh hưởng khi test**: Chọn đúng store theo loại token khi test DUOS-399.

**Nguồn**: DUOS-399 — cập nhật 2026-07-08

## KB-020 — Store staging-duos-ngant-3 đang bật auto company creation từ 30/09/2026; chưa có store flag OFF cho luồng cũ

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T07:44:17.591Z · updatedAt: 2026-10-07T07:44:17.591Z

**Rule**: Store `staging-duos-ngant-3` (instance 22) bật `enable_company_creation_on_submit` từ 2026-09-30 → submit form ở store này luôn chạy nhánh job tạo company. Chưa có store staging nào để flag OFF, nên case "luồng cũ / flag OFF" của B2B Registration phải nhờ BE tắt cờ hoặc cấp store thứ 2 trước khi chạy.

**Ảnh hưởng khi test**: Case flag OFF / luồng cũ bị treo cho tới khi có store flag OFF.

**Nguồn**: QA Hub task DUOS-004 — actual result TC-DUOS-150, TC-DUOS-159 (sonder, 2026-09-30) — cập nhật 2026-10-07

## KB-021 — Flow action "assign role" bắt buộc field shopify_contact_role; bỏ trống → fail "Shopify contact role is required"

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:18.643Z · updatedAt: 2026-10-07T08:34:53.510Z

**Rule**: Flow action "assign role" có field `shopify_contact_role` đặt **ngay sau** field role template, dạng `single_line_text` (Shopify Flow custom field không hỗ trợ dropdown/select). Bỏ trống → run fail với message chính xác `Shopify contact role is required`.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-022 — shopify_contact_role chỉ nhận đúng location_admin hoặc ordering_only, phân biệt hoa thường, không trim khoảng trắng

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:19.969Z · updatedAt: 2026-10-07T08:34:53.916Z

**Rule**: Chỉ chấp nhận đúng 2 chuỗi `location_admin` và `ordering_only`, so khớp **strict**: phân biệt hoa/thường và **không trim** khoảng trắng bao quanh (`" location_admin "` bị reject — cố ý, không phải bug). Giá trị không hợp lệ → run fail với message `Shopify contact role "X" is not supported. Use one of: location_admin, ordering_only`.

**Ảnh hưởng khi test**: " location_admin " (có khoảng trắng) bị reject là đúng, không phải bug.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-023 — Slug location_admin → Location admin, ordering_only → Ordering only trên Shopify company location

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:20.859Z · updatedAt: 2026-10-07T08:34:54.393Z

**Rule**: `location_admin` → member thành **Location admin** trên Shopify company location; `ordering_only` → member thành **Ordering only**.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-024 — Flow action fail nếu role template không tồn tại / chưa publish cho company, hoặc customer không tồn tại trên Shopify

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:21.796Z · updatedAt: 2026-10-07T08:34:54.882Z

**Rule**: Role template phải **tồn tại** và **đã publish cho đúng company** đang xử lý; customer phải **tồn tại trên Shopify**. Không thoả một trong hai → run fail.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-025 — Flow action fail ở bất kỳ nhánh nào thì không ghi gì: không tạo/gán role ở app, không đổi contact role Shopify

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:23.151Z · updatedAt: 2026-10-07T08:34:55.298Z

**Rule**: Ở **mọi** nhánh failure của Flow action (slug rỗng/sai, role template không hợp lệ, customer không tồn tại), hệ thống **không ghi gì**: không tạo/gán role trong app Duos, không thay đổi contact role bên Shopify.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-026 — Key field shopify_contact_role do FE khai báo; FE chưa deploy hoặc sai key thì action luôn báo "required"

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:24.047Z · updatedAt: 2026-10-07T08:34:55.703Z

**Rule**: Field của Flow action được khai báo ở repo **frontend**, không phải backend. Key phải là chính xác `shopify_contact_role`. Nếu FE chưa deploy hoặc sai key → action luôn fail với `Shopify contact role is required`, **không phân biệt được** với trường hợp merchant bỏ trống.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-027 — Mỗi lần Flow action chạy, permission re-sync từ role template xuống mọi member đang giữ role đó (kể cả location khác)

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:24.967Z · updatedAt: 2026-10-07T08:34:56.134Z

**Rule**: Từ DUOS-405, mỗi lần Flow action chạy, permission được **re-sync từ role template** xuống **tất cả** member đang giữ role đó (không chỉ member trong Flow run, kể cả member ở company location khác). Trước đây role đã derive từ template thì giữ permission gốc vĩnh viễn — hành vi cũ đã lỗi thời. Đây là thay đổi **intended**, tác động diện rộng lên dữ liệu hiện có.

**Ảnh hưởng khi test**: Sửa role template ảnh hưởng mọi member giữ role — chuẩn bị dữ liệu riêng.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-028 — Flow action assign role gửi email đổi role cho member và bắn trigger "member role updated" như luồng admin đổi role

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T07:44:26.291Z · updatedAt: 2026-10-07T08:34:56.512Z

**Rule**: Từ DUOS-405, Flow action "assign role" gửi **email đổi role cho member** (trước đây không gửi) và **bắn Flow trigger "member role updated"** về Shopify — hành vi giống luồng admin đổi role.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-029 — Workflow nghe "member role updated" có action assign-role sẽ loop vô hạn — limitation chấp nhận, không log bug

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T08:22:00.505Z · updatedAt: 2026-10-07T08:34:57.019Z

**Rule**: Workflow lắng nghe trigger "member role updated" mà bên trong chứa action assign-role sẽ **loop vô hạn**. Đây là limitation đã biết và được chấp nhận, **không log bug**. Không dựng workflow dạng này khi test.

**Ảnh hưởng khi test**: Không dựng workflow dạng này khi test.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-030 — 4 path dùng chung member-sync (Admin extension, Customer Account, bulk assign admin, bulk member sync) luôn cần regression khi path đổi

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T08:22:00.972Z · updatedAt: 2026-10-07T08:34:57.411Z

**Rule**: 4 flow sau chạy qua cùng member-sync path với Flow action, nên luôn cần regression khi path này thay đổi: (1) Admin extension → company location → đổi role member; (2) Customer Account → member management; (3) Bulk operation "assign admin from main contact"; (4) Bulk member sync.

**Ảnh hưởng khi test**: Đổi member-sync → regression đủ 4 path.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-031 — Bulk assign admin / member sync: Shopify reject 1 item thì skip và chạy tiếp, item bị skip không để lại dấu vết

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T08:22:01.561Z · updatedAt: 2026-10-07T08:34:57.785Z

**Rule**: Từ DUOS-405, với "assign admin from main contact" và bulk member sync: nếu Shopify reject 1 item, batch **skip item đó và chạy tiếp tới hết** (trước đây 1 reject là dừng cả run). Item bị skip **không để lại dấu vết** — không có trong bulk operation record, không có trong log.

**Ảnh hưởng khi test**: Không dựa vào record/log để đếm item bị skip — đối chiếu trực tiếp trên Shopify.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-032 — Bulk operation đếm success theo company, có thể báo Completed dù vài location chưa được gán

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-405 · createdAt: 2026-10-07T08:22:02.068Z · updatedAt: 2026-10-07T08:34:58.221Z

**Rule**: Bulk operation đếm success theo **company**, không theo location. Company có location bị reject vẫn được tính là success → operation có thể báo **Completed** dù một số location chưa thực sự được gán. **Known limitation**, out of scope DUOS-405.

**Ảnh hưởng khi test**: Status Completed không chứng minh mọi location đã được gán.

**Nguồn**: DUOS-405 — cập nhật 2026-08-11

## KB-033 — Bulk assign admin ghi đè role của customer kể cả khi customer đã có role trong DB của app

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-393 · createdAt: 2026-10-07T08:22:02.526Z · updatedAt: 2026-10-07T08:34:58.745Z

**Rule**: Bulk "assign admin" (`assign_admin_main_contact` / `assign_admin_location_admin`) **ghi đè** role của customer kể cả khi customer đó đã có role trong DB của app — không bỏ qua customer đã có role.

**Nguồn**: DUOS-393 — comment haptt (Dev) + thuongnth 2026-05-04 — cập nhật 2026-10-07

## KB-034 — Tạo company từ submission thì link customer có sẵn theo email/phone; luồng cũ match lúc Approve, flag ON match trong job lúc submit

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-411 · createdAt: 2026-10-07T08:22:03.058Z · updatedAt: 2026-10-07T08:22:03.058Z

**Rule**: Khi tạo company từ một submission, app **tìm customer bằng email/phone đã submit** và **link customer đó vào company mới tạo**, thay vì luôn tạo customer mới. Mục đích: gỡ tình huống merchant không bấm approve được vì email/phone trong submission đã thuộc về một customer có sẵn trên Shopify (khách mua lẻ trước rồi mới đăng ký trade account). **Thời điểm matching** phụ thuộc submission đã có `company_id` chưa: (a) luồng cũ — submission chưa có `company_id` → matching chạy lúc merchant bấm **Approve**, portal tự tạo company; (b) store bật `enable_company_creation_on_submit` → matching chạy trong **queued job lúc buyer submit** (job tạo company), Approve sau đó chỉ bắn Flow trigger. Cùng thứ tự ưu tiên email → phone ở cả hai nhánh (QA pass TC-DUOS-176, TC-DUOS-233 trên nhánh job, 2026-09-30).

**Thay rule cũ** (2026-09-04): "Khi merchant approve một company application, app tìm customer… và link vào company mới tạo" — chỉ đúng cho luồng cũ; với flag ON company đã được tạo (kèm matching) từ lúc submit.

**Ảnh hưởng khi test**: Test matching ở cả 2 nhánh: Approve luồng cũ và job flag ON.

**Nguồn**: DUOS-411; DUOS-425 — haild (Dev FE) 30/09/2026 + haptt (Dev BE) 23/09/2026, qua task QA Hub DUOS-004 (BR-24) — cập nhật 2026-10-07

## KB-035 — Matching customer theo email trước; phone chỉ dùng khi submission không có email

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-411 · createdAt: 2026-10-07T08:22:03.612Z · updatedAt: 2026-10-07T08:22:03.612Z

**Rule**: (1) Match theo **email** trước. (2) Chỉ khi submission **không có email** thì mới fallback sang match theo **phone**.

**Nguồn**: DUOS-411 — cập nhật 2026-09-04

## KB-036 — Email và phone ra 2 customer khác nhau → lấy customer match theo email

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-411 · createdAt: 2026-10-07T08:22:04.318Z · updatedAt: 2026-10-07T08:22:04.318Z

**Rule**: Submission có cả email lẫn phone nhưng mỗi field resolve ra một customer khác nhau (2 match) → áp rule ưu tiên: lấy customer match theo **email**; chỉ dùng phone khi submission không có email.

**Nguồn**: DUOS-411 — cập nhật 2026-09-04

## KB-037 — Match email tìm theo email đã chuẩn hoá rồi email gốc; email mới + phone trùng không match theo phone

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:04.779Z · updatedAt: 2026-10-07T08:22:04.779Z

**Rule**: Khi match theo email, app tìm customer theo email **đã chuẩn hoá** trước, không thấy thì tìm theo email **gốc** đã submit. Phone chỉ dùng khi submission không có email — nên email mới + phone trùng customer cũ sẽ **không** match theo phone; job tạo customer mới **không có phone** (Shopify từ chối phone trùng) — quan sát TC-DUOS-201.

**Nguồn**: haptt (Dev BE) 30/09/2026, qua task QA Hub DUOS-004 (BR-30) — cập nhật 2026-10-07

## KB-038 — Customer match đã là contact company khác → lỗi customer_in_other_company, không tạo company

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:05.355Z · updatedAt: 2026-10-07T08:22:05.355Z

**Rule**: Customer tìm được đã là contact của một company khác → báo lỗi `customer_in_other_company` và **không** tạo company. Nhánh job (flag ON): submission chuyển `failed`, lưu `company_creation_error`, không có `company_id` (QA pass TC-DUOS-158, 2026-09-30). Luồng cũ (Approve) trên build cũ còn ra "company được tạo nhưng không có contact" (TC-DUOS-057, TC-DUOS-060) — Dev xác nhận đó là bug, cần chạy lại.

**Ảnh hưởng khi test**: TC-DUOS-057, TC-DUOS-060 cần chạy lại trên build hiện tại.

**Nguồn**: haild (Dev FE) 30/09/2026, qua task QA Hub DUOS-004 (BR-28) — cập nhật 2026-10-07

## KB-039 — Submission chỉ có status pending / completed / failed; nút Approve hiện với mọi status trừ completed

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:05.866Z · updatedAt: 2026-10-07T08:22:05.866Z

**Rule**: Status lưu `pending | completed | failed`. Approve ghi `completed`, UI hiện badge "Approved"; `failed` hiện badge đỏ "Failed" ở list + header detail. List có tab **All / Pending / Approved / Failed**. Nút Approve ("Approve company") hiện với **mọi status trừ `completed`** (kể cả `failed`). Submission bị `rate_limited` vẫn là **Pending** (chỉ thêm `company_creation_error`), không phải Failed.

**Nguồn**: haild (Dev FE) 22/09 + 30/09/2026, qua task QA Hub DUOS-004 (BR-08, BR-25, BR-47); quan sát staging TC-DUOS-158, TC-DUOS-198 — cập nhật 2026-10-07

## KB-040 — Đang tranh chấp: submission có nút Reject hay chỉ có bulk Delete — PO nói không có Reject, DUOS-6 + docs + TC-DUOS-069 nói có

status: draft · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-6 · createdAt: 2026-10-07T08:22:06.341Z · updatedAt: 2026-10-07T08:22:06.341Z

**Rule**: Hai nguồn có thẩm quyền nói khác nhau, **chưa chốt**: (1) PO qua chị Nga 30/09/2026 (BR-48): Portal **không có nút Reject**, không có status `rejected` — staging flag ON lẫn flag OFF đều không thấy nút (TC-DUOS-198, TC-DUOS-203); chỉ có bulk action "Delete selected submisisons" khi tick checkbox. (2) DUOS-6 (spec gốc, Done) + `references/apps/DUOS.md` (docs 09/07/2026): merchant "approve or reject" submission kèm lý do; TC-DUOS-069 (task DUOS-002) đang `passed` với expected "Submission chuyển đúng trạng thái Rejected". Chưa ai chốt Delete có đụng tới company đã tạo lúc submit (flag ON) hay không.

**Đang tranh chấp**: Reject hay chỉ Delete submission — câu hỏi mở "Submission có nút Reject hay chỉ Delete" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Không dùng Reject làm expected; TC-DUOS-069 đang passed nhưng mâu thuẫn — chờ PO.

**Nguồn**: task QA Hub DUOS-004 BR-48 (PO, 30/09/2026); DUOS-6; TC-DUOS-069 — cập nhật 2026-10-07

## KB-041 — Đang tranh chấp: khoá sửa email/phone submission theo cờ auto creation (PO) hay theo company_id (Dev, staging)

status: draft · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-91 · createdAt: 2026-10-07T08:22:06.771Z · updatedAt: 2026-10-07T08:22:06.771Z

**Rule**: Merchant sửa được email/phone của submission trước khi approve (DUOS-91, qua Edit submission → Account → "Your email"). Ngoại lệ đang lệch nhau: (1) PO qua chị Nga 30/09/2026 (BR-50): "**flag ON** thì không sửa được", muốn sửa phải vào Shopify admin; (2) Dev haild 30/09/2026 (BR-24): Portal **không đọc cờ** `enable_company_creation_on_submit`, chỉ dựa vào `company_id`; staging cho thấy submission có `company_id` thì card Submission **không còn icon sửa** (TC-DUOS-196). Chưa rõ flag ON nhưng job fail / `rate_limited` (không `company_id`) có sửa được không.

**Đang tranh chấp**: điều kiện khoá sửa email/phone — câu hỏi mở "Khoá sửa email/phone submission theo cờ hay theo `company_id`" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Ma trận DUOS-91 × cờ × company_id chưa có expected chắc chắn.

**Nguồn**: task QA Hub DUOS-004 BR-50 (PO), BR-24 (Dev haild), GAP-27; DUOS-91 — cập nhật 2026-10-07

## KB-042 — Cờ enable_company_creation_on_submit chỉ ON khi true / "true", còn lại OFF; không có UI trong Portal

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:53.494Z · updatedAt: 2026-10-07T08:22:53.494Z

**Rule**: Cờ đặt ở root `users.config` (sửa qua JSON editor admin panel), **không có UI** trong Portal. Chỉ `true` hoặc `"true"` là ON; mọi giá trị khác / thiếu key là OFF.

**Nguồn**: haild (Dev FE) 22/09/2026, qua task QA Hub DUOS-004 — cập nhật 2026-10-07

## KB-043 — Flag ON: submit → job tạo Company + Location + Main contact (Location admin) + role Admin; submission vẫn pending

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:53.961Z · updatedAt: 2026-10-07T08:22:53.961Z

**Rule**: Flag ON: lưu submission, storefront **luôn báo success**; queued job tạo Company + 1 Location (địa chỉ từ form) + customer làm Main Contact (Shopify role Location admin) + role **Admin** của app; gán catalog trong `company_creation_catalog_ids` nếu có; ghi `data.company_id`; status **vẫn `pending`** cho tới khi merchant Approve.

**Ảnh hưởng khi test**: Status pending sau submit là đúng; company đã live trên Shopify trước khi Approve.

**Nguồn**: haptt (Dev BE) 23/09/2026 (DUOS-425); QA pass TC-DUOS-150 (2026-09-30) — cập nhật 2026-10-07

## KB-044 — Job auto tạo company chạy 1 lần, không retry, không rollback; lỗi trước companyCreate → failed, lỗi sau → giữ company_id + error

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:54.423Z · updatedAt: 2026-10-07T08:22:54.423Z

**Rule**: Job chạy đúng 1 lần (`$tries = 1`), không retry; bỏ qua submission đã có `company_id` hoặc không còn pending. Lỗi **trước** `companyCreate` (VD customer thuộc company khác) → status `failed` + `company_creation_error`, không `company_id`. Lỗi **sau** `companyCreate` → **không rollback**: giữ `company_id` + ghi `company_creation_error` (status vẫn pending).

**Ảnh hưởng khi test**: Lỗi job không tự sửa — kiểm company_creation_error và banner.

**Nguồn**: haptt (Dev BE) 23/09 + 30/09/2026; QA pass TC-DUOS-158 (2026-09-30) — cập nhật 2026-10-07

## KB-045 — Auto company creation giới hạn 10/phút + 50/ngày theo shop; vượt → pending + rate_limited, Approve đi luồng cũ

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:54.956Z · updatedAt: 2026-10-07T08:22:54.956Z

**Rule**: Auto company creation giới hạn theo shop **10/phút + 50/ngày** (override bằng config `company_creation_rate_limit`). Vượt → submission vẫn lưu `pending`, `company_creation_error = "rate_limited"`, không tạo company; merchant Approve sẽ đi luồng cũ (portal tự tạo company).

**Ảnh hưởng khi test**: Test rate limit có thể ảnh hưởng các case khác cùng shop trong ngày.

**Nguồn**: haptt (Dev BE) 23/09 + 25/09/2026 (DUOS-425) — cập nhật 2026-10-07

## KB-046 — Portal chọn nhánh Approve theo company_id (có → chỉ bắn trigger, không → tự tạo company), không đọc cờ

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:55.506Z · updatedAt: 2026-10-07T08:22:55.506Z

**Rule**: Trước khi Approve, Portal tải lại submission: có `company_id` → chỉ bắn Flow trigger rồi set `completed`; không có `company_id` → luồng cũ (Portal tự tạo company). Cờ ON hay OFF đều vậy.

**Nguồn**: haild (Dev FE) 30/09/2026, qua task QA Hub DUOS-004 (BR-24) — cập nhật 2026-10-07

## KB-047 — Banner setup_incomplete chỉ hiện khi có cả company_id và company_creation_error; merchant tự hoàn tất phần thiếu trên Shopify

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:55.919Z · updatedAt: 2026-10-07T08:22:55.919Z

**Rule**: Banner vàng `setup_incomplete` ("Company created, but setup could not be completed…") chỉ hiện khi submission có **cả** `company_id` lẫn `company_creation_error`; hiện trước và sau Approve, đóng được, không hiện error thô. Hệ thống không tự hoàn tất phần thiếu — merchant tự gán contact / role / catalog trên Shopify; Approve nhánh này vẫn chỉ bắn trigger.

**Nguồn**: haild (Dev FE) 30/09/2026; PO qua chị Nga 30/09/2026 — task QA Hub DUOS-004 (BR-26, BR-51) — cập nhật 2026-10-07

## KB-048 — Trigger duos-approve-company chỉ bắn khi Approve, payload giống nhau ở luồng cũ và nhánh company_id

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:56.322Z · updatedAt: 2026-10-07T08:22:56.322Z

**Rule**: Flow trigger `duos-approve-company` chỉ bắn lúc merchant **Approve** (không bắn lúc submit, kể cả flag ON). Payload cùng cấu trúc ở luồng cũ và nhánh `company_id`: Submission {id, data, formattedData, submittedEmail, createdAt} + `customer_id` (Main Contact).

**Nguồn**: DUOS-425; haild (Dev FE) 30/09/2026; QA xác nhận 1 run Flow sau Approve (TC-DUOS-151, TC-DUOS-152) — cập nhật 2026-10-07

## KB-049 — Nhánh company_id: không tìm thấy customer → toast, giữ status; trigger lỗi → failed; luồng cũ không kiểm tra trigger

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:22:56.841Z · updatedAt: 2026-10-07T08:22:56.841Z

**Rule**: Nhánh có `company_id` tìm lại customer theo email/phone **gốc** của submission; không thấy → toast "Could not find the customer for this submission in Shopify. The company approved trigger was not fired.", không bắn trigger, status giữ nguyên. Trigger lỗi → `failed` + `trigger_failed`; Approve lại chỉ bắn lại trigger. **Luồng cũ không kiểm tra kết quả trigger** — luôn set `completed` (limitation chấp nhận).

**Ảnh hưởng khi test**: Đổi email customer trên Shopify admin có thể làm submission kẹt (chưa có đường gỡ).

**Nguồn**: haild (Dev FE) 30/09/2026, qua task QA Hub DUOS-004 (BR-34, BR-36); quan sát staging TC-DUOS-160 — cập nhật 2026-10-07

## KB-050 — Regex validation có ở 12 loại field (Name, Email, Phone, Company…); không có ở select, radio, checkbox, datetime, file, country

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-426 · createdAt: 2026-10-07T08:22:57.304Z · updatedAt: 2026-10-07T08:22:57.304Z

**Rule**: Field có checkbox "Enable regex validation" → ô "Regex pattern" + "Error message". Áp cho 12 loại: Name, Email, Phone, Message, Custom text, Custom textarea, Custom number, Company name, Company address, Company city, Company zip, Tax ID. **Không có** ở select, radio, checkbox, datetime, file, terms box, country và các block hiển thị. Tax ID: regex chỉ kiểm phần số thuế, không kiểm mã nước.

**Nguồn**: haild (Dev FE) 30/09/2026, qua chị Nga (task QA Hub DUOS-004); UI quan sát staging TC-DUOS-179 — cập nhật 2026-10-07

## KB-051 — Regex chỉ kiểm khi field có giá trị; field required để trống báo lỗi required, không báo lỗi regex

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-426 · createdAt: 2026-10-07T08:22:57.832Z · updatedAt: 2026-10-07T08:22:57.832Z

**Rule**: Regex chỉ kiểm khi field có value. Field required để trống → báo lỗi **required**, không báo lỗi regex. Value không khớp → chặn submit ở storefront, hiện error message.

**Nguồn**: haild (Dev FE) 30/09/2026; DUOS-426 — cập nhật 2026-10-07

## KB-052 — Regex dùng nguyên văn, không hỗ trợ flag; pattern sai cú pháp bị storefront bỏ qua, Portal không kiểm khi Save

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-426 · createdAt: 2026-10-07T08:22:58.275Z · updatedAt: 2026-10-07T08:22:58.275Z

**Rule**: Pattern dùng nguyên văn: **không hỗ trợ flag** (`/^abc$/i` không bao giờ khớp), không tự bọc `^…$`. Pattern sai cú pháp → storefront **bỏ qua** rule, form vẫn submit. Portal **không kiểm cú pháp** khi Save.

**Ảnh hưởng khi test**: Pattern /…/i luôn báo lỗi; pattern hỏng không báo gì — đúng theo Dev.

**Nguồn**: haild (Dev FE) 30/09/2026, qua task QA Hub DUOS-004 — cập nhật 2026-10-07

## KB-053 — Error message mặc định của regex là "<Label>" field is invalid. tiếng Anh cố định; custom message dịch được

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-426 · createdAt: 2026-10-07T08:22:58.767Z · updatedAt: 2026-10-07T08:22:58.767Z

**Rule**: Không nhập message → `"<Label>" field is invalid.` (nhiều field lỗi: `"A, B" fields is invalid.`), tiếng Anh cố định, không dịch. Custom error message thì dịch được ở màn Translation.

**Nguồn**: haild (Dev FE) 30/09/2026, qua task QA Hub DUOS-004 — cập nhật 2026-10-07

## KB-054 — Regex chỉ chặn ở storefront, BE không validate — gọi thẳng API vẫn lưu; PO chưa quyết chấp nhận

status: draft · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-426 · createdAt: 2026-10-07T08:22:59.328Z · updatedAt: 2026-10-07T08:22:59.328Z

**Rule**: BE **không** validate regex: gọi thẳng `POST /company-submissions` với value sai pattern vẫn lưu; flag ON còn tự tạo company từ value đó (ghi nhận TC-DUOS-222). Đây là hành vi Dev xác nhận; PO **chưa** quyết chấp nhận hay phải bổ sung validate BE.

**Chưa chốt**: PO có chấp nhận việc BE không validate regex — câu hỏi mở "BE không validate regex — PO có chấp nhận không" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Case bypass API chỉ ghi nhận, chưa có expected pass/fail.

**Nguồn**: haptt (Dev BE) 30/09/2026, qua task QA Hub DUOS-004 (BR-37, GAP-22) — cập nhật 2026-10-07

## KB-055 — Spam protection settings chỉ có enabled / site key / secret key (reCAPTCHA v3), không có ô min_score; secret key không lên storefront

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:24:21.382Z · updatedAt: 2026-10-07T08:24:21.382Z

**Rule**: Màn duy nhất trên Portal: Company submissions → "Spam protection settings" (route `/extensions/company-submissions/settings`) gồm enabled / site key / secret key, ghi rõ phải dùng key **v3**; **không có ô `min_score`**. `secret_key` bị strip trước khi sync lên metafield storefront (không lộ ra storefront).

**Nguồn**: haild (Dev FE) 23/09 + 30/09/2026, haptt (Dev BE) 23/09/2026 (DUOS-425); quan sát staging TC-DUOS-156 — cập nhật 2026-10-07

## KB-056 — reCAPTCHA v3 verify ở BE theo score ≥ min_score (mặc định 0.5) và action company_submission; token sai/thiếu → 422

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:24:21.804Z · updatedAt: 2026-10-07T08:24:21.804Z

**Rule**: Script `api.js?render={site_key}` chỉ load khi enabled; token lấy lúc bấm Submit với action `company_submission`, gửi ở field `recaptcha_token`. BE verify score ≥ `min_score` (mặc định 0.5; thiếu / không phải số / ngoài 0–1 → 0.5) và đúng action. Token sai / thiếu / hết hạn → HTTP **422** `errors.recaptcha_token`, không lưu submission (TC-DUOS-216). Storefront: 422 → báo lỗi, cho submit lại; script không load (adblock) → báo lỗi, không gửi.

**Nguồn**: haptt (Dev BE) + haild (Dev FE) 23/09/2026 (DUOS-425) — cập nhật 2026-10-07

## KB-057 — Submit form giới hạn theo IP 4/phút + 20/ngày (cửa sổ 24h cố định) → 429 "You've submitted too many times…"

status: active · tag: B2B Registration · sourceUrl: https://ownego.atlassian.net/browse/DUOS-425 · createdAt: 2026-10-07T08:24:22.217Z · updatedAt: 2026-10-07T08:24:22.217Z

**Rule**: `POST /company-submissions` giới hạn theo IP **4 request/phút + 20/ngày**, vượt → HTTP **429**, storefront hiện "You've submitted too many times. Please try again later.". Cửa sổ ngày là **cố định 24h tính từ hit đầu**, không theo múi giờ. Quota dùng chung cả team QA cùng IP.

**Ảnh hưởng khi test**: Quota 20/ngày dùng chung cả team cùng IP — tiết kiệm lượt submit.

**Nguồn**: haptt (Dev BE) 23/09, 25/09, 30/09/2026 (DUOS-425); QA pass phần 4/phút TC-DUOS-166 (2026-10-01) — cập nhật 2026-10-07

## KB-058 — 3 default role: Admin → Location admin; Senior Buyer và Junior Buyer → Ordering only; Junior cần duyệt khi mua

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-88 · createdAt: 2026-10-07T08:24:22.660Z · updatedAt: 2026-10-07T08:34:59.223Z

**Rule**: 3 default role: **Admin** → Shopify **Location admin**; **Senior Buyer** và **Junior Buyer** → **Ordering only**. Junior Buyer không tự hoàn tất checkout, cần Senior/Admin duyệt (qua Shopping list); Senior Buyer mua trực tiếp + duyệt list người khác; Admin thêm xem mọi order, sửa billing/shipping, quản lý member/role.

**Nguồn**: DUOS-88 — comment thuongnth (PO) 2025-04-09 (thay cặp "Location admin / Ordering only" trong description); `references/apps/DUOS.md` (docs 09/07/2026) — cập nhật 2026-10-07

## KB-059 — Permission của Admin không sửa được; Order history và Shipping and billing luôn disabled; 10 nhóm permission theo UI hiện tại

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-88 · createdAt: 2026-10-07T08:24:23.163Z · updatedAt: 2026-10-08T10:11:14.967Z

**Rule**: Permission của role Admin **không sửa được**. Hai nhóm "Order history" và "Shipping and billing" luôn disabled (phụ thuộc Shopify). Danh sách nhóm permission trên trang "Roles & permissions" (đúng tên UI, theo thứ tự): "Order history" · "Shipping and billing" · "Finance & credit" · "User management" · "Role management" · "Shopping list" · "CSV upload" · "Quick order" · "Quotes" · "Purchase from online store". Ticket DUOS-88 (2025) ghi "Quick order CSV" / "Quick order SKU" và chưa có "Finance & credit" / "Role management" / "Quotes" — đã thay bằng danh sách trên.

**Nguồn**: DUOS-88 — comment thuongnth (PO) 2025-04-09; quan sát staging 2026-10-08 (`inventory/DUOS.md` § 2.8, store `stg-duos-plus-2`) — xác nhận lưu bởi chị Nga 2026-10-08 — cập nhật 2026-10-08

## KB-060 — Mỗi company location bắt buộc có ít nhất 1 Admin

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-285 · createdAt: 2026-10-07T08:24:23.608Z · updatedAt: 2026-10-07T08:35:00.024Z

**Rule**: Mỗi company location **bắt buộc có ≥ 1 Admin**. Ticket DUOS-285 có API đếm admin nhưng không nêu chặn ở đâu / message gì.

**Chưa chốt**: Flow action có enforce rule tối thiểu 1 Admin không — câu hỏi mở "Hạ Admin cuối cùng của location xuống `ordering_only`" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Hạ Admin cuối cùng qua Flow action chưa rõ có bị chặn.

**Nguồn**: `references/apps/DUOS.md` (docs 09/07/2026); DUOS-285 — cập nhật 2026-10-07

## KB-061 — Trang Roles & permissions: default role chỉ xem; custom role tạo qua modal 2 bước với "Select based role", publish theo company

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-372 · createdAt: 2026-10-07T08:24:24.139Z · updatedAt: 2026-10-08T10:11:15.410Z

**Rule**: Bảng mọi role, tab **All / Default / Custom**; cột Role, Type (badge "Default" / "Custom"), Used in ("All companies" cho default, số company cho custom), Actions (view cho mọi role, edit chỉ custom). Default role **read-only** (banner "This is a default role. Its permissions are fixed and read-only…"). Modal "Create custom role" có 2 bước (nút "Next"): bước 1 gồm Role name (bắt buộc), "Description" (optional), select **"Select based role"** (ticket ghi "Select base role to duplicate") mặc định Admin; permission kế thừa base role và sửa được. Publish: click ô "Used in" → chọn 1 hoặc nhiều company.

**Nguồn**: DUOS-372 (https://ownego.atlassian.net/browse/DUOS-372) — description, Dev haild xác nhận requirement 2026-04-14; quan sát staging 2026-10-08 (`inventory/DUOS.md` § 2.8, store `stg-duos-plus-2`) — xác nhận lưu bởi chị Nga 2026-10-08 (label + 2 bước; bước 2 chưa xem) — cập nhật 2026-10-08

## KB-062 — Tuỳ biến role theo merchant (ẩn default role, đổi tên Admin, chặn tạo role…) chỉ bật qua users.config, không có UI

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-401 · createdAt: 2026-10-07T08:24:24.860Z · updatedAt: 2026-10-07T08:35:01.064Z

**Rule**: Các config bật riêng theo merchant (admin panel → JSON editor `users.config`): `customer-permission.hideDefaultRoles` (ẩn Senior/Junior ở CA + Portal), `adminRoleDisplayName` (đổi tên hiển thị Admin), `disableCreateRole` (customer không tự tạo role), `enable_edit_locked_role_permissions` (mở khoá permission trong Portal), `allowZeroSubtotalCheckout`, `hideRoleManageButton` + `roleManageLinkUrl` + `roleManageLinkLabel` (thay nút quản lý role bằng link help), `quotation.skip_reassign_on_revoke`. Store không set → hành vi mặc định; test cần BE set config.

**Ảnh hưởng khi test**: Cần BE set users.config cho store test trước khi chạy case theo merchant.

**Nguồn**: DUOS-401 haild 2026-07-24; DUOS-403 haild 2026-07-28; DUOS-408 haild 2026-08-11; DUOS-400 haptt 2026-07-14 (comment Dev) — cập nhật 2026-10-07

## KB-063 — Webhook revoke role chờ 5 phút rồi mới kiểm tra reassign cho owner location

status: active · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-400 · createdAt: 2026-10-07T08:24:25.289Z · updatedAt: 2026-10-07T08:35:01.603Z

**Rule**: Đổi role ở Customer Account hoặc Admin extension → map lại contact role Shopify (`shopify_company_contact_role_gid`). Webhook revoke role **delay 5 phút** rồi kiểm tra có cần reassign cho owner location không — test phải chờ đủ 5 phút trước khi kết luận.

**Ảnh hưởng khi test**: Chờ đủ 5 phút trước khi kết luận reassign.

**Nguồn**: DUOS-400 — comment haptt (Dev) 2026-07-14 — cập nhật 2026-10-07

## KB-064 — Main Contact hiển thị dạng badge theo Shopify, không còn là lựa chọn trong dropdown role (theo ticket)

status: draft · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-406 · createdAt: 2026-10-07T08:24:25.813Z · updatedAt: 2026-10-07T08:35:02.111Z

**Rule**: Người giữ Main Contact trên Shopify company được hiển thị badge **"Main Contact"**; "Main Contact" bị bỏ khỏi dropdown role; badge tự cập nhật khi đổi Main Contact ở Shopify. Mức tin: chỉ theo ticket, Jira status PASS 2026-08-18.

**Nguồn**: DUOS-406 — cập nhật 2026-10-07

## KB-065 — Chặn checkout role View Only xét tổng order gồm shipping = 0, không chỉ cart subtotal (theo ticket)

status: draft · tag: Roles & Permissions · sourceUrl: https://ownego.atlassian.net/browse/DUOS-407 · createdAt: 2026-10-07T08:24:26.429Z · updatedAt: 2026-10-07T08:35:02.658Z

**Rule**: Role không có quyền mua (VD custom role "View Only") chỉ được thanh toán khi **tổng order gồm cả shipping = 0**; không chỉ xét cart subtotal (trước đây item 0 + shipping > 0 vẫn vào "Pay now"). Mức tin: chỉ theo ticket, Jira status PASS 2026-08-18.

**Thay rule cũ** (DUOS-403, 2026-07-28): config `allowZeroSubtotalCheckout` chỉ xét cartSubtotal.

**Nguồn**: DUOS-407; DUOS-403 — cập nhật 2026-10-07

## KB-066 — Member thiếu read_members mở Company member → banner no permission, API list member trả 403

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-413 · createdAt: 2026-10-07T08:24:26.972Z · updatedAt: 2026-10-07T08:24:26.972Z

**Rule**: Mặc định (shop không bật flag), member không có permission `read_members` mở trang Company member → banner "no permission"; `GET customer-account/company-locations/{id}/customers` trả **403**.

**Nguồn**: DUOS-413 — comment haptt (Dev) 15/09/2026; QA pass TC-DUOS-080 (2026-09-30) — cập nhật 2026-10-07

## KB-067 — Bật allow_all_members_read_members → mọi member thấy bảng member view-only; Admin vẫn đủ Invite/edit/delete

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-413 · createdAt: 2026-10-07T08:24:27.540Z · updatedAt: 2026-10-07T08:24:27.540Z

**Rule**: Shop bật `customer-permission.allow_all_members_read_members` (trong `users.config`, đọc theo `FILTER_VALIDATE_BOOLEAN`: true / "true" / 1 / "1" / "on" / "yes" là bật) → mọi member đã đăng nhập (kể cả không role / custom role thiếu `read_members`) nhận 200 và thấy bảng **view-only**: không nút Invite, không edit/delete, tên role không dẫn tới trang role. Admin vẫn thấy đủ Invite / edit / delete. Tên key bên spec FE khác (`customerPermissionSettings.allowAllMembersReadMembers`) nhưng key BE đang chạy được trên staging.

**Ảnh hưởng khi test**: Tên key spec FE khác key BE; key BE đang chạy được trên staging.

**Nguồn**: DUOS-413 — comment haptt (Dev) 15/09/2026; QA pass TC-DUOS-077, 078, 079, 082 (2026-09-18 → 2026-09-30) — cập nhật 2026-10-07

## KB-068 — Flag view-only không cấp quyền ghi: PUT, DELETE, kiểm email tồn tại vẫn cần write_members (403)

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-413 · createdAt: 2026-10-07T08:24:28.039Z · updatedAt: 2026-10-07T08:24:28.039Z

**Rule**: Bật `allow_all_members_read_members` **không** cấp quyền ghi: PUT update, DELETE member và `GET customers/existed` vẫn cần `write_members`, thiếu → **403**.

**Nguồn**: comment haild (Dev) 11/09/2026 + haptt (Dev) 15/09/2026 (unit test), qua task QA Hub DUOS-003 — cập nhật 2026-10-07

## KB-069 — Invite email đã có trong location hiện tại → 422 "A member with this email already exists in this location."

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-414 · createdAt: 2026-10-07T08:24:28.479Z · updatedAt: 2026-10-07T08:24:28.479Z

**Rule**: Invite / sửa member với email đã có role assignment tại **location hiện tại** (assignment id khác `shopify_contact_role_assignment_gid` trong request) → HTTP **422**, message nguyên văn "A member with this email already exists in this location.", hiện inline dưới field Email, modal giữ mở. Edit chính member đó vẫn lưu được. ⚠ description DUOS-414 chưa cập nhật (còn ghi "warning hoặc block") — comment Dev chốt là block.

**Nguồn**: DUOS-414 — comment haild (Dev) 11/09/2026 — cập nhật 2026-10-07

## KB-070 — Search/sort member chỉ trong location hiện tại; sort_by name|title; tối đa 50 member mỗi trang

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-415 · createdAt: 2026-10-07T08:24:28.940Z · updatedAt: 2026-10-07T08:24:28.940Z

**Rule**: Phạm vi trong **location hiện tại** (client bỏ yêu cầu cross-location). Query param: `search` (name + email), `role_name` (`member` hợp lệ), `sort_by` = `name` | `title`, `sort_order` = `asc` | `desc` (mặc định asc); `first`/`last` tối đa **50** (trước là 250). Đổi search / role / sort → FE reset cursor; BE thấy cursor lệch thì về trang 1.

**Nguồn**: DUOS-415 description; comment haptt (Dev) 15/09/2026 — cập nhật 2026-10-07

## KB-071 — Search member là prefix match (không substring) — Dev xác nhận, client chưa chấp nhận

status: draft · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-415 · createdAt: 2026-10-07T08:24:29.372Z · updatedAt: 2026-10-07T08:24:29.372Z

**Rule**: Search khớp **đầu chuỗi** (gõ "Curr" ra "Currier", "urrier" không ra), không phải substring. Dev xác nhận hành vi; PO/client chưa chấp nhận.

**Chưa chốt**: client có chấp nhận prefix match — câu hỏi mở "Search member chỉ prefix match — client có chấp nhận không" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Case search giữa chuỗi chưa có expected chốt.

**Nguồn**: comment haptt (Dev) 15/09/2026, qua task QA Hub DUOS-003 (BR-12, GAP-05) — cập nhật 2026-10-07

## KB-072 — Lọc member theo role chỉ đọc tối đa 500 member mỗi location, phần dư bị bỏ

status: active · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-415 · createdAt: 2026-10-07T08:24:29.924Z · updatedAt: 2026-10-07T08:24:29.924Z

**Rule**: Filter `role_name` xử lý trong bộ nhớ, đọc tối đa 10 trang × 50 = **500 member**; phần dư bị bỏ và ghi log. Known limit — location > 500 member có thể thiếu kết quả khi lọc role.

**Ảnh hưởng khi test**: Location > 500 member có thể thiếu kết quả khi lọc role.

**Nguồn**: comment haptt (Dev) 15/09/2026, qua task QA Hub DUOS-003 (BR-14) — cập nhật 2026-10-07

## KB-073 — Invite member chặn 14 prefix email generic (info@, sales@…) với thông báo cố định (theo ticket)

status: draft · tag: Company Member · sourceUrl: https://ownego.atlassian.net/browse/DUOS-410 · createdAt: 2026-10-07T08:24:30.396Z · updatedAt: 2026-10-07T08:24:30.396Z

**Rule**: Local-part khớp 1 trong 14 prefix (`info@`, `sales@`, `hello@`, `contact@`, `hi@`, `office@`, `enquiries@`, `orders@`, `support@`, `help@`, `admin@`, `accounts@`, `billing@`, `marketing@`), không phân biệt hoa thường → khi Save hiện "Generic email addresses aren't accepted for security reasons. Please use a personal business email instead. Get in touch if you run into any issues". Mức tin: chỉ theo ticket (Done 2026-08-28); chưa rõ khớp chính xác hay "bắt đầu bằng", có áp cho form edit / admin extension / theo config merchant không.

**Nguồn**: DUOS-410 — cập nhật 2026-10-07

## KB-074 — Chặn checkout theo permission và theo credit chỉ chạy trên Shopify Plus; store non-Plus thấy disabled là đúng

status: active · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-377 · createdAt: 2026-10-07T08:24:30.933Z · updatedAt: 2026-10-07T08:24:30.933Z

**Rule**: "Block checkout by customer permissions" và "Block checkout by available credit limit" chỉ hoạt động trên Shopify Plus; store non-Plus thấy disabled — **không phải bug**. Test phần chặn checkout dùng store Plus (`stg-duos-plus-2`).

**Ảnh hưởng khi test**: Test chặn checkout dùng store Plus (stg-duos-plus-2).

**Nguồn**: `references/apps/DUOS.md` § 1 (docs 09/07/2026); DUOS-377, DUOS-381 — cập nhật 2026-10-07

## KB-075 — Trang pricing: User & Permission chỉ một giá; discount admin = 0% thì không render giá gạch

status: active · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-431 · createdAt: 2026-10-07T08:24:31.483Z · updatedAt: 2026-10-07T08:24:31.483Z

**Rule**: Module User & Permission chỉ hiển thị một giá, không còn giá gạch. Setting discount ở admin = 0% → FE **không** render kiểu "~150~ 150".

**Nguồn**: DUOS-431 — description + comment haild (Dev FE) 02/10/2026; QA pass TC-DUOS-303, TC-DUOS-304 — cập nhật 2026-10-07

## KB-076 — Module chưa subscribe bị disable ở List extensions, Notifications và Translate — không phải bug

status: active · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-329 · createdAt: 2026-10-07T08:24:31.961Z · updatedAt: 2026-10-07T08:24:31.961Z

**Rule**: Module chưa mua bị **disable** ở List extensions, trang Notifications và trang Translate — không phải bug. Store chưa mua module thì extension tương ứng không dùng được.

**Nguồn**: DUOS-329 — comment haild (Dev) 2026-03-05 — cập nhật 2026-10-07

## KB-077 — Store Free plan: trang pricing bỏ chọn mọi item, badge "Free", CTA "Build my plan"

status: active · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-365 · createdAt: 2026-10-07T08:25:48.089Z · updatedAt: 2026-10-08T10:11:16.035Z

**Rule**: Store đang ở Free plan (selection disable) → trang pricing (panel "Current subscription") bỏ chọn mọi item ("No items selected"), hiện badge "Free", "Total: $0 /mo", CTA **"Build my plan"** (DUOS-365 ghi "Build my subscription" — UI hiện tại đã đổi).

**Nguồn**: DUOS-365 (https://ownego.atlassian.net/browse/DUOS-365) — comment Ashley (PO) 2026-03-25; quan sát staging 2026-10-08 (`inventory/DUOS.md` § 2.17, store `stg-duos-plus-2`) — xác nhận lưu bởi chị Nga 2026-10-08 — cập nhật 2026-10-08

## KB-078 — Đang tranh chấp: User & Permission (và B2B Registration) free như Mar/Apr 2026 hay trả phí theo Epic Oct 2026

status: draft · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-320 · createdAt: 2026-10-07T08:25:48.656Z · updatedAt: 2026-10-07T08:25:48.656Z

**Rule**: Chưa chốt, hai nguồn có thẩm quyền lệch nhau: (1) Mar 2026 — Ashley (PO) 2026-03-23 (DUOS-320) + DUOS-329: User & Permission **free**, luôn được chọn, "$0.00", checkbox disabled; Apr 2026 (DUOS-377, Epic Done): User & Permission + B2B Registration **free mọi tier**; `references/apps/DUOS.md` § 1 vẫn ghi free. (2) Epic DUOS-430 "Pricing Oct 2026" (To Do, đề xuất): User & Permission **$90 non-Plus / $150 Plus**, B2B Registration $30 / $50. Chưa rõ U&P còn bắt buộc chọn không, merchant cũ đang dùng free có bị khoá / tính phí và từ ngày nào.

**Đang tranh chấp**: U&P Free hay trả phí — câu hỏi mở "User & Permission Free hay trả phí từ đợt Oct 2026" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Expected giá U&P và quyền truy cập module chưa có — chờ PO.

**Nguồn**: DUOS-320 comment Ashley 2026-03-23; DUOS-377; DUOS-430 description; task QA Hub DUOS-005 GAP-06, GAP-13 — cập nhật 2026-10-07

## KB-079 — Đang tranh chấp: bundle discount 5%/10% và 30-day trial đợt Oct 2026 còn giữ hay bỏ

status: draft · tag: Pricing · sourceUrl: https://ownego.atlassian.net/browse/DUOS-430 · createdAt: 2026-10-07T08:25:49.227Z · updatedAt: 2026-10-07T08:25:49.227Z

**Rule**: Chưa chốt: (1) Epic DUOS-430 description: "giữ nguyên discount 4 extensions ~5%, 6 extensions ~10%, ~30-day trial"; (2) Ashley (PO) 02/10/2026 15:30 (comment DUOS-431): "chắc là mình cx không giảm giá nữa đâu"; Dev haild 02/10/2026: setting discount admin staging đang 0%. Đợt trước: Mar 2026 (Ashley 2026-03-23) yearly 20%, monthly 4 module 5% / 6 module 10%, **không trial**; Apr 2026 (DUOS-377) trial 30 ngày chỉ khi chọn ALL extension, annual 20%. Ảnh hưởng cả phép so sánh banner giữ giá cũ (`charge.price` trước hay sau discount — GAP-03).

**Đang tranh chấp**: discount / trial Oct 2026 — câu hỏi mở "Bundle discount và 30-day trial đợt Oct 2026 còn hay bỏ" (open-questions/DUOS.md).

**Ảnh hưởng khi test**: Expected tổng giá, giá gạch và banner trial chưa có — chờ PO.

**Nguồn**: DUOS-430 description; DUOS-431 comment Ashley + haild 02/10/2026; DUOS-320; DUOS-377; task QA Hub DUOS-005 GAP-02, GAP-03, GAP-12 — cập nhật 2026-10-07

## KB-080 — Available credit = Credit limit − Outstanding balance; transaction Purchased / Reimbursed / Reverted

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-201 · createdAt: 2026-10-07T08:25:49.743Z · updatedAt: 2026-10-07T08:35:03.066Z

**Rule**: `Available credit = Credit limit − Outstanding balance`. 3 loại transaction: `Purchased` (order net term), `Reimbursed` (trả invoice), `Reverted` (huỷ order).

**Nguồn**: `references/apps/DUOS.md` (docs 09/07/2026); DUOS-201 `operation_type` — cập nhật 2026-10-07

## KB-081 — Credit chỉ áp cho payment term Net 7/15/30/45/60/90; không áp Due on fulfillment / receipt / fixed date

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-201 · createdAt: 2026-10-07T08:25:50.250Z · updatedAt: 2026-10-07T08:35:03.505Z

**Rule**: Credit tracking / validation chỉ áp cho Net 7/15/30/45/60/90; **không** áp Due on fulfillment / Due on receipt / Due on fixed date — limitation đã biết, case các term này expected "không áp dụng", không phải fail.

**Ảnh hưởng khi test**: Case term khác Net expected "không áp dụng", không phải fail.

**Nguồn**: DUOS-201 — comment haptt (Dev) 2025-09-23; `references/apps/DUOS.md` (docs) — cập nhật 2026-10-07

## KB-082 — Edit order trong Shopify admin tạo 1 transaction Reverted giá cũ + 1 Purchased giá mới

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-201 · createdAt: 2026-10-07T08:25:50.795Z · updatedAt: 2026-10-07T08:35:03.902Z

**Rule**: Edit order → tạo 1 transaction revert giá cũ + 1 transaction purchased giá mới, reference có thông tin order. Xoá hết line mà còn payment pending (tax, ship) vẫn phải đổi outstanding.

**Nguồn**: DUOS-201 — comment thuongnth 2025-09-10, haptt (Dev) 2025-09-23/25 — cập nhật 2026-10-07

## KB-083 — Không hỗ trợ đổi payment term sau khi đặt order; order đã cancel/paid không xử lý tiếp

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-201 · createdAt: 2026-10-07T08:25:51.315Z · updatedAt: 2026-10-07T08:35:04.364Z

**Rule**: Chưa hỗ trợ đổi payment term của order đã đặt (Shopify không có hook) → transaction credit có thể sai; order đã cancel / paid không hỗ trợ bước tiếp theo. Limitation đã chốt.

**Nguồn**: DUOS-201 — comment haptt (Dev) 2025-09-23/25 — cập nhật 2026-10-07

## KB-084 — Validate credit bằng Shopify Function ở Cart / Checkout / CreateDraftOrder, thay validate ở checkout extension cũ

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-397 · createdAt: 2026-10-07T08:25:51.844Z · updatedAt: 2026-10-07T08:35:04.896Z

**Rule**: Validate credit limit chạy bằng Shopify Function (Validation API) ở Cart, Checkout và **CreateDraftOrder**; **bỏ** validate ở block Checkout extension cũ (DUOS-206). Function được thêm khi merchant edit credit limit lần đầu, cần approve thêm scope ở Portal, chỉ áp cho location có credit limit active. Draft order vượt credit → banner "This order has exceeded this location available credit. Available credit: [X] / Credit limit: [Y]" (theo ticket).

**Thay rule cũ** (DUOS-206, 2025): checkout extension so cart total với available credit khi chọn "Net terms".

**Ảnh hưởng khi test**: Merchant phải approve scope mới ở Portal; chặn cả draft order tạo trong Shopify admin.

**Nguồn**: DUOS-397 — comment haild (Dev) 2026-05-20, Done 2026-06-21 — cập nhật 2026-10-07

## KB-085 — Block Duos trên trang Company/Location trong Shopify admin chỉ hiển thị credit, không edit

status: active · tag: Finance & Credit · sourceUrl: https://ownego.atlassian.net/browse/DUOS-398 · createdAt: 2026-10-07T08:25:52.490Z · updatedAt: 2026-10-07T08:35:05.326Z

**Rule**: Block Duos trong Shopify admin (trang Company / Location) chỉ **hiển thị** credit, không edit; location chưa có limit → "No credit limit has been assigned to this company yet."

**Nguồn**: DUOS-398 — comment thuongnth 2026-05-28 — cập nhật 2026-10-07

## KB-086 — Shopping list: người có quyền approve không thấy nút submit trên Draft; Junior Buyer không thấy nút approve

status: active · tag: Shopping List · sourceUrl: https://ownego.atlassian.net/browse/DUOS-86 · createdAt: 2026-10-07T08:25:52.884Z · updatedAt: 2026-10-07T08:35:05.885Z

**Rule**: Admin / member có quyền approve + create order from shopping list: **không** hiện nút submit trên list Draft. Junior Buyer: **không** hiện nút approve. Trang danh sách thay cột "location" bằng "created by".

**Nguồn**: DUOS-86 — comment Ashley (PO) 2025-05-09 — cập nhật 2026-10-07

## KB-087 — Junior Buyer không sửa được shopping list đang Pending/Approved: disable xoá, đổi số lượng, đổi tên, thêm dòng (theo ticket)

status: draft · tag: Shopping List · sourceUrl: https://ownego.atlassian.net/browse/DUOS-395 · createdAt: 2026-10-07T08:25:53.413Z · updatedAt: 2026-10-07T08:35:06.310Z

**Rule**: Junior Buyer, list ở Pending hoặc Approved: disable Delete, tăng/giảm số lượng, "Edit Shopping list name", search product, "Add more line", "Upload CSV/Load Catalog". Mức tin: chỉ theo ticket (Done 2026-05-20); trạng thái Draft / Rejected chưa nêu.

**Nguồn**: DUOS-395 — cập nhật 2026-10-07

## KB-088 — Bật "Reset approved list to pending after order submission": list Approved về Pending khi order submit; chỉ áp Junior và role không có quyền duyệt

status: active · tag: Shopping List · sourceUrl: https://ownego.atlassian.net/browse/DUOS-382 · createdAt: 2026-10-07T08:25:53.939Z · updatedAt: 2026-10-08T10:11:16.704Z

**Rule**: Bật checkbox **"Reset approved list to pending after order submission"** (Shopping list settings, mặc định tắt) → sau khi đặt order từ list Approved, list **tự về "Pending"** ngay khi order được submit (không đợi paid / fulfilled); lần sau phải duyệt lại. Order gắn note_attributes `duos_shopping_list_id`. **Phạm vi role** (help text UI): "Applies to junior buyers and any role without shopping list approval permission." — role có quyền "Approve draft status list" (Admin, Senior buyer) không bị reset.

**Nguồn**: DUOS-382 (https://ownego.atlassian.net/browse/DUOS-382) — description (khách xác nhận 04/2026); comment haild (Dev) 2026-04-28; quan sát staging 2026-10-08 (`inventory/DUOS.md` § 2.14, store `stg-duos-plus-2`) — xác nhận lưu bởi chị Nga 2026-10-08 — cập nhật 2026-10-08

## KB-089 — List về Pending thì pause reminder (giữ frequency), duyệt lại thì resume và gửi lại mail cho Senior + Admin

status: active · tag: Shopping List · sourceUrl: https://ownego.atlassian.net/browse/DUOS-382 · createdAt: 2026-10-07T08:25:54.458Z · updatedAt: 2026-10-07T08:35:07.386Z

**Rule**: List về Pending → **pause reminder, giữ frequency**; approve lại → reminder resume; gửi lại mail duyệt cho Senior Buyer + Admin. Khi đụng re-approval phải regression full luồng shopping list (mail, reminder, create, update, delete, filter by status).

**Ảnh hưởng khi test**: Regression full luồng shopping list (mail, reminder, create, update, delete, filter).

**Nguồn**: DUOS-382 — comment Ashley (PO) + haptt (Dev) 2026-04-29 — cập nhật 2026-10-07

## KB-090 — Link chia sẻ shopping list (merchant tạo hộ) mở checkout page, không mở list trong Customer Account

status: active · tag: Shopping List · sourceUrl: https://ownego.atlassian.net/browse/DUOS-396 · createdAt: 2026-10-07T08:25:54.983Z · updatedAt: 2026-10-07T08:35:07.784Z

**Rule**: List merchant tạo hộ khách có nút "Copy link" ở header; link mở **checkout page**, không mở shopping list trong Customer Account. ⚠ description DUOS-396 chưa cập nhật (còn ghi mở list trong CA).

**Nguồn**: DUOS-396 — comment Ashley (PO) 2026-06-22 — cập nhật 2026-10-07

## KB-091 — Quick order: location không có catalog → lỗi "No catalog available for current location"

status: active · tag: Quick Order · sourceUrl: https://ownego.atlassian.net/browse/DUOS-362 · createdAt: 2026-10-07T08:25:55.491Z · updatedAt: 2026-10-07T08:35:08.170Z

**Rule**: Tìm / thêm SKU khi location hiện tại không có catalog → lỗi "No catalog available for current location".

**Nguồn**: DUOS-362 — description + comment haild (Dev) 2026-03-06 — cập nhật 2026-10-07

## KB-092 — "Action after customer's create order" có "Create draft order" cho CSV + SKU, không có ở Shopping list

status: active · tag: Quick Order · sourceUrl: https://ownego.atlassian.net/browse/DUOS-357 · createdAt: 2026-10-07T08:25:56.030Z · updatedAt: 2026-10-08T10:11:17.472Z

**Rule**: In-app setting **"Action after customer's create order"** (radio, mặc định "Go to checkout"): Quick order with CSV Upload và Quick order with SKUs có {"Add to cart", "Go to checkout", **"Create draft order"**}; trang Shopping list cũng có setting cùng tên nhưng chỉ {"Add to cart", "Go to checkout"} — **không** có "Create draft order". Sau khi bấm "Create order" (draft): disable nút + hiện success message. Text chính xác ("Draft order created" / "Draft order created!") và nhánh khi bật "Allow customers to create Shopping List" chưa chốt.

**Nguồn**: DUOS-357 (https://ownego.atlassian.net/browse/DUOS-357) — description thuongnth 2026-02-27; quan sát staging 2026-10-08 (`inventory/DUOS.md` § 2.12, 2.13, 2.14, store `stg-duos-plus-2`) — xác nhận lưu bởi chị Nga 2026-10-08 — cập nhật 2026-10-08

## KB-093 — Catalog CSV loại sản phẩm unlisted và theo tag qua config download_catalog_condition, không có UI

status: active · tag: Quick Order · sourceUrl: https://ownego.atlassian.net/browse/DUOS-342 · createdAt: 2026-10-07T08:25:56.568Z · updatedAt: 2026-10-07T08:35:09.098Z

**Rule**: File "Download catalog" loại sản phẩm unlisted (DUOS-298) và loại theo product tag qua config `download_catalog_condition` (VD `{"type":"and","conditions":[{"type":"tag","operator":"not_in","value":[...]}]}`) do team set trong admin theo yêu cầu khách — không có UI. Khi đổi catalog phải regression: unlisted product, catalog theo market + location.

**Nguồn**: DUOS-342 — comment haptt (Dev) + thuongnth 2026-02-24 — cập nhật 2026-10-07

## KB-094 — Quote áp giá theo từng line item: permanent cập nhật catalog location, one-time qua draft order (theo ticket)

status: draft · tag: Quote · sourceUrl: https://ownego.atlassian.net/browse/DUOS-215 · createdAt: 2026-10-07T08:25:57.305Z · updatedAt: 2026-10-07T08:35:09.756Z

**Rule**: Mỗi line item chọn riêng **permanent** (badge `ProductCost`, khi accept update B2B catalog price của đúng company location, gồm volume pricing + quantity rule minimum) hoặc **one-time deal** (badge `EyeFirst`, đi qua draft order); có bulk "Set as permanent price" / "Set as one-time deal". Draft order không áp được net-term deposit (giới hạn Shopify). Mức tin: chỉ theo ticket.

**Thay rule cũ** (DUOS-182): 1 checkbox cho cả quote "Apply quote price to future orders of this company location".

**Nguồn**: DUOS-215, DUOS-216; DUOS-187; `references/apps/DUOS-quotation.md` — cập nhật 2026-10-07

## KB-095 — Hạn quote expires_at lưu UTC; quote hết hạn có status EXPIRED (theo ticket)

status: draft · tag: Quote · sourceUrl: https://ownego.atlassian.net/browse/DUOS-186 · createdAt: 2026-10-07T08:25:57.727Z · updatedAt: 2026-10-07T08:35:10.112Z

**Rule**: Field `expires_at` lưu theo **UTC**; quote hết hạn có status `EXPIRED = 6`. Test expiration phải quy đổi múi giờ. Mức tin: chỉ theo ticket.

**Ảnh hưởng khi test**: Quy đổi múi giờ khi test hết hạn.

**Nguồn**: DUOS-186, DUOS-195; `references/apps/DUOS-quotation.md` — cập nhật 2026-10-07

## KB-096 — Sender email merchant cấu hình được đưa vào reply-to; From dùng sender mặc định của app

status: active · tag: Notifications · sourceUrl: https://ownego.atlassian.net/browse/DUOS-370 · createdAt: 2026-10-07T08:25:58.292Z · updatedAt: 2026-10-07T08:35:10.494Z

**Rule**: Email gửi buyer dùng sender mặc định của app; sender email merchant cấu hình được đưa vào **reply-to**; bỏ field "reply to" riêng → From không còn là email merchant.

**Thay rule cũ** (DUOS-311): setting sender email ở từng template Customer notification làm From.

**Nguồn**: DUOS-370 — comment haptt (Dev) 2026-04-01, Ashley (PO) chốt — cập nhật 2026-10-07

## KB-097 — Có 4 Shopify Flow trigger cho email: member added, role changes, shopping list pending approval, approved

status: active · tag: Notifications · sourceUrl: https://ownego.atlassian.net/browse/DUOS-371 · createdAt: 2026-10-07T08:25:58.800Z · updatedAt: 2026-10-07T08:35:10.916Z

**Rule**: Có 4 Flow trigger để merchant route email (VD qua Klaviyo): Member added to location, Role changes, Shopping list pending approval, Shopping list approved. Payload "pending approval" gửi danh sách customer (Admin + Senior Buyer) → workflow cần loop action.

**Nguồn**: DUOS-371 — description + comment haild (Dev) 2026-04-01 — cập nhật 2026-10-07
