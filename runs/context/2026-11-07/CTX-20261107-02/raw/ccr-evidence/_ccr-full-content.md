# Context Change Request: Teeinblue, object mới

**Tiêu đề task:** `[CCR] PROFILE_GAP — MỚI: account-security, MỚI: open-api — đề xuất object mới account-security và open-api`

Khuôn: bundled canonical `references/ccr-template.md` của skill `create-ccr`. Phụ lục: `context-lifecycle/knowledge/how-to-request/ccr-product-appendix.md`. Bản nháp local, chưa submit. Trích dẫn Jira lấy từ comment, đã bỏ thẻ định dạng; `[...]` trong trích dẫn là phần che tên account hoặc id theo yêu cầu.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đề xuất 1 CCR cho các claim chưa thuộc object nào, vì CCR chạm cùng object sẽ bị lock. Mọi claim cùng product `teeinblue`. 

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `PROFILE_GAP`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: không khớp object nào trong `_registry.json`. Đề xuất hai object mới:
  - `MỚI: account-security`. name: Account & Security. scope: login portal, social login, trạng thái bảo mật staff, thao tác nhạy cảm, ngữ cảnh tổ chức của staff (Confirm password, acting user, multi-store). Không gồm quyền riêng của campaign (`campaign/campaign-security-permissions`). Thay cho đề xuất `portal-auth` trong audit.
  - `MỚI: open-api`. name: Open API. scope: endpoint Open API cho merchant, gồm upload asset.
  - Tên object và ranh giới là đề xuất, agent xử lý CCR quyết định cuối.

**Quan sát được** `[AGENT]`

```
TIB-5628: Confirm-password dialog rejects a correct password, so staff cannot be removed (Done)
  - CLAIM-01: Dialog Confirm password: hiệu lực 15 phút; để trống FE chặn; toàn khoảng trắng API báo incorrect (không trim)
  - CLAIM-02: Mọi sensitive action dùng chung 1 component, regression chỉ cần 1 action khác
  - CLAIM-03: Account chưa có password có link tạo password trong dialog
  - CLAIM-08: Confirm password: hidden username, scope
  - CLAIM-09: Confirm password: hidden username, scope (phần 2)
TIB-5500: Add configurable DPI per print area for artwork export (Done)
  - CLAIM-05: Test cross-tenant chỉ dùng session/token riêng, không dùng header acting-user
TIB-5536: [UID] Open API to upload material to the image layer library (Done)
  - CLAIM-06: Open API upload asset
  - CLAIM-07: Open API upload asset (phần 2)
TIB-5335: tiêu đề và status chưa tra
  - CLAIM-10: Đường login portal và 2FA (phần 2)
  - CLAIM-16: Staff tạo tự động khi cài app không có password; login form cần Forgot password
TIB-5334: tiêu đề và status chưa tra
  - CLAIM-11: Social login (phần 2)
  - CLAIM-12: Cột Security của danh sách staff
  - CLAIM-13: Cột Security của danh sách staff (phần 2)
TIB-5018: tiêu đề và status chưa tra
  - CLAIM-14: Một user nhiều store: đọc resource ở mọi store của chính mình là by design
TIB-5507: tiêu đề và status chưa tra
  - CLAIM-15: PR TIB-5507 rộng hơn mô tả: gỡ delete permission, untrack bảng, filter soft-delete
TIB-4938: tiêu đề và status chưa tra
  - CLAIM-18: Webhook billing: sửa crash không đổi hành vi
```

- Nguồn: tổng hợp từ `rules/tib-product-behaviors.md`, `rules/env-capabilities.md`, Jira và Testlane. KHÔNG PHẢI quan sát trực tiếp của người soạn CCR trên môi trường thật.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 0 lần do người soạn CCR tự verify. Lượt chạy test ghi ở 5.1.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Đợt backfill này không chạy lại gì trên staging hay production. Các vế chưa có TC PASS ghi ở từng claim trong 5.1.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | loại: hành vi. Dialog Confirm password: hiệu lực 15 phút; để trống FE chặn; toàn khoảng trắng API báo incorrect (không trim) | portal · api | `po_dev_confirm` | MỚI: account-security/MỚI: confirm-password-dialog | `ADD` |
| `CLAIM-02` | loại: scope test. Mọi sensitive action dùng chung 1 component, regression chỉ cần 1 action khác | portal | `po_dev_confirm` | MỚI: account-security/MỚI: confirm-password-dialog | `ADD` |
| `CLAIM-03` | loại: hành vi. Account chưa có password có link tạo password trong dialog | portal | `po_dev_confirm` | MỚI: account-security/MỚI: confirm-password-dialog | `ADD` |
| `CLAIM-05` | loại: scope test. Test cross-tenant chỉ dùng session/token riêng, không dùng header acting-user | api | `po_dev_confirm` | MỚI: account-security/MỚI: acting-user-organisation | `ADD` |
| `CLAIM-06` | loại: hành vi. Open API upload asset | api | `po_dev_confirm` | MỚI: open-api/open-api-asset-upload | `ADD` |
| `CLAIM-07` | loại: hành vi. Open API upload asset (phần 2) | api | `po_dev_confirm` | MỚI: open-api/open-api-asset-upload | `ADD` |
| `CLAIM-08` | loại: hành vi. Confirm password: hidden username, scope | portal · api | `po_dev_confirm` | MỚI: account-security/MỚI: confirm-password-dialog | `ADD` |
| `CLAIM-09` | loại: hành vi. Confirm password: hidden username, scope (phần 2) | portal · api | `po_dev_confirm` | MỚI: account-security/MỚI: confirm-password-dialog | `ADD` |
| `CLAIM-10` | loại: hành vi. Đường login portal và 2FA (phần 2) | portal | `po_dev_confirm` | MỚI: account-security/MỚI: portal-login-paths | `ADD` |
| `CLAIM-11` | loại: hành vi. Social login (phần 2) | portal | `po_dev_confirm` | MỚI: account-security/MỚI: social-login | `ADD` |
| `CLAIM-12` | loại: hành vi. Cột Security của danh sách staff | portal | `po_dev_confirm` | MỚI: account-security/MỚI: staff-security-status | `ADD` |
| `CLAIM-13` | loại: hành vi. Cột Security của danh sách staff (phần 2) | portal | `po_dev_confirm` | MỚI: account-security/MỚI: staff-security-status | `ADD` |
| `CLAIM-14` | loại: hành vi. Một user nhiều store: đọc resource ở mọi store của chính mình là by design | portal · api | `po_dev_confirm` | MỚI: account-security/MỚI: multi-store-access | `ADD` |
| `CLAIM-15` | loại: hành vi. PR TIB-5507 rộng hơn mô tả: gỡ delete permission, untrack bảng, filter soft-delete | api | `po_dev_confirm` | MỚI: account-security/MỚI: hasura-permission | `ADD` |
| `CLAIM-16` | loại: hành vi. Staff tạo tự động khi cài app không có password; login form cần Forgot password | portal | `po_dev_confirm` | MỚI: account-security/MỚI: portal-login-paths | `ADD` |
| `CLAIM-18` | loại: hành vi. Webhook billing: sửa crash không đổi hành vi | api | `po_dev_confirm` | MỚI: account-security/MỚI: billing-webhook | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | MỚI: account-security | MỚI: confirm-password-dialog | staff, owner | portal+api | không có |
| `CLAIM-02` | MỚI: account-security | MỚI: confirm-password-dialog | QA (phạm vi test) | portal | không có |
| `CLAIM-03` | MỚI: account-security | MỚI: confirm-password-dialog | owner, staff chưa có password | portal | không có |
| `CLAIM-05` | MỚI: account-security | MỚI: acting-user-organisation | QA (phạm vi test) | api | không có |
| `CLAIM-06` | MỚI: open-api | open-api-asset-upload | không rõ | api | liên quan KB-039 image-layer-library (OBSERVED_CURRENT) |
| `CLAIM-07` | MỚI: open-api | open-api-asset-upload | không rõ | api | không có |
| `CLAIM-08` | MỚI: account-security | MỚI: confirm-password-dialog | không rõ | portal | không có |
| `CLAIM-09` | MỚI: account-security | MỚI: confirm-password-dialog | không rõ | portal | không có |
| `CLAIM-10` | MỚI: account-security | MỚI: portal-login-paths | không rõ | portal | không có |
| `CLAIM-11` | MỚI: account-security | MỚI: social-login | không rõ | portal | không có |
| `CLAIM-12` | MỚI: account-security | MỚI: staff-security-status | không rõ | portal | không có |
| `CLAIM-13` | MỚI: account-security | MỚI: staff-security-status | không rõ | portal | không có |
| `CLAIM-14` | MỚI: account-security | MỚI: multi-store-access | không rõ | portal | không có |
| `CLAIM-15` | MỚI: account-security | MỚI: hasura-permission | không rõ | api | không có |
| `CLAIM-16` | MỚI: account-security | MỚI: portal-login-paths | không rõ | portal | không có |
| `CLAIM-18` | MỚI: account-security | MỚI: billing-webhook | không rõ | api | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** api · portal

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

không có

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5628 | không rõ | 2026-10-29 | Jira Done, chưa rõ ngày deploy |
| TIB-5500 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5536 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5335 | không rõ | không rõ | không rõ |
| TIB-5334 | không rõ | không rõ | không rõ |
| TIB-5018 | không rõ | không rõ | không rõ |
| TIB-5507 | không rõ | không rõ | không rõ |
| TIB-4938 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: không áp dụng, object chưa tồn tại; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01, CLAIM-02, CLAIM-03, CLAIM-05, CLAIM-06, CLAIM-07, CLAIM-08, CLAIM-09, CLAIM-10, CLAIM-11, CLAIM-12, CLAIM-13, CLAIM-14, CLAIM-15, CLAIM-16, CLAIM-18: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: Confirm password, confirm-password, xác nhận mật khẩu, 423
  - CLAIM-02: sensitive action, confirm password
  - CLAIM-03: chưa có password, tạo password
  - CLAIM-05: cross-tenant, TIB_USER_A, TIB_USER_B
  - CLAIM-06: open-api-asset-upload
  - CLAIM-07: open-api-asset-upload
  - CLAIM-08: password-field-autofill
  - CLAIM-09: password-field-autofill
  - CLAIM-10: session-auth-2fa-migration
  - CLAIM-11: social-oauth-login
  - CLAIM-12: staff-security-status-display
  - CLAIM-13: staff-security-status-display
  - CLAIM-14: access-control-idor
  - CLAIM-15: hasura-permission-hardening
  - CLAIM-16: session-auth-2fa-migration
  - CLAIM-18: paddle-billing-webhook
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | trungld (dev) | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-02` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-03` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-05` | QA | 2026-10-30 | `po_dev_confirm` |
| `CLAIM-06` | huyenntk (dev) | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-07` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-08` | trungld (dev) | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-09` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-10` | QA | 2026-09-17 | `po_dev_confirm` |
| `CLAIM-11` | QA | 2026-10-27, 2026-10-28 | `po_dev_confirm` |
| `CLAIM-12` | tinhpt (dev) | 2026-10-26 | `po_dev_confirm` |
| `CLAIM-13` | QA | 2026-10-29 | `po_dev_confirm` |
| `CLAIM-14` | không ghi (bài học TIB-5018, 2026-08-21) | 2026-08-21 | `po_dev_confirm` |
| `CLAIM-15` | không ghi (bài học TIB-5507, 2026-10-15) | 2026-10-15 | `po_dev_confirm` |
| `CLAIM-16` | không ghi (bài học TIB-5335, 2026-09-17) | 2026-09-17 | `po_dev_confirm` |
| `CLAIM-18` | không ghi tên | 2026-09-09 | `po_dev_confirm` |

Họ xác nhận chính xác điều gì: xem trích nguyên văn ở 5.1.

**Cần người xác nhận:**


## 4.2 KHÔNG đề xuất điều gì?

```
- Số liệu trong trích dẫn (limit, ngưỡng, cap thử nghiệm) là số tại thời điểm nguồn, không phải giá trị của mọi môi trường.
- feature_key và object_key ghi MỚI chỉ là đề xuất tên.
- Không đề xuất ghi đè canon. Claim CONTRADICTS giữ cả hai phía.
- Hướng dẫn test trong file local (hỏi cap thực tế, tên account, id data) không phải rule sản phẩm.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
CLAIM-01: Dialog Confirm password có hiệu lực 15 phút sau lần xác nhận. Để trống: FE hiện "Enter your password." và không gọi API. Toàn khoảng trắng: API trả "The provided password was incorrect." vì không trim.
CLAIM-02: Phạm vi test: mọi sensitive action dùng chung một dialog Confirm password, regression chỉ cần một action khác.
CLAIM-03: Account chưa có password thấy link tạo password trong dialog Confirm password.
CLAIM-05: Phạm vi test: kiểm cross-tenant dùng session hoặc token riêng của từng tenant, không dùng header acting-user.
CLAIM-06: Tham số search (Typesense, như MCP) dùng cho layer image, layer image category, clipart category; name là exact; dùng cả hai thì trả 422. Clipart không có search. Status: không token hoặc token revoked trả 401; thiếu ability trả 403; id của account khác trên URL trả 404; category_id/parent_id của account khác trong body trả 422; quota ngày trả 429; rate 60 req/phút trả 429. Bắt buộc có Accept: application/json, thiếu thì trả 302/HTML. Không có trạng thái failed: xử lý lỗi thì item kẹt ở processing với url: null. Xoá layer image đang dùng trả 400 "This image has already been used."; xoá clipart thì vào Trash 60 ngày (không có restore API). URL chỉ nhận http/https, chặn private/loopback/link-local/metadata (422), không follow redirect (422), file >64 MB bị chặn sớm, timeout 30 s. upload_id lỗi đều trả 422: chưa PUT thì báo "PUT it to the upload_url first" và vẫn dùng lại được; đã dùng, hết hạn hoặc của account khác thì báo "not found or has expired". Upload URL sống 5 phút, upload_id sống 30 phút. Không có cơ chế reset quota. thumbnail_url là public CDN theo thiết kế; url là storage key.
CLAIM-07: on_duplicate so theo tên (layer image/clipart: cùng tên và cùng category; category: tên, type và parent nếu có). Mặc định là create; skip trả 200 kèm item cũ và không tính quota; replace chỉ áp dụng cho raster clipart (kèm keep_thumbnail).
CLAIM-08: Hidden username là email đang login và không được gửi lên API.
CLAIM-09: Phạm vi chỉ ở portal.
CLAIM-10: teeinblue có 2 đường login riêng biệt. teeinblue chỉ có 2 role mặc định là owner và editor; có thể tạo thêm custom role qua "create/edit roles", đây là sensitive action riêng, không phải role built-in. Đường Shopify-embedded gồm cả Shopify store owner và Shopify staff có quyền "manage apps" (permission trên Shopify, không phải trên teeinblue); cả hai login vào portal qua Shopify Apps, không cần password teeinblue. Role gán tự động: email login trùng email của store thì là owner, mọi Shopify-staff khác là editor; không có trường hợp Shopify-staff được lên owner. Ngoài đường Shopify-embedded, cách duy nhất để thêm người vào một "user"/store là invite email; không có đường tự đăng ký rồi tự gắn vào store người khác. Một email/staff có thể được invite vào nhiều owner/store khác nhau, hệ thống hỗ trợ một identity thuộc nhiều "user" cùng lúc. Khi invite, email chưa có account teeinblue thì tạo staff account mới (set password qua link trong email invite, giống flow accept-invite); email đã có account (owner hoặc staff ở nơi khác) thì chỉ thêm vào owner/store mới, không tạo account trùng, và login bằng password đã có. Owner của platform khác Shopify (Etsy, Boundless...) đi qua đường 2: phải tự tạo account teeinblue (email/password) trước rồi mới connect store; Etsy/Wix/Boundless không có biến thể auto-create không password như Shopify. Trang quản lý /staffs và /roles là riêng biệt; một store có thể có đồng thời cả 2 kiểu staff (Shopify-embedded tự động và teeinblue-invited qua email) hiển thị cùng nơi.
CLAIM-11: Với staff đa-org, social login vào default user lưu trong bảng staff_user (không có màn chọn org). Email là staff active ở org X và có invite pending ở org Y thì không đổi staff status (invite vẫn pending) và vẫn login vào default user. invite_pending chỉ áp khi Staff tồn tại duy nhất dưới dạng invite chưa accept, tức chưa từng accept invite nào. Nút chỉ có ở trang staff login của portal, không có ở Register; login qua Shopify admin không mở trang này nên context embedded/iframe nằm ngoài scope. Default org chỉ dùng khi approved, không thì fallback sang org approved đầu tiên, không còn org nào thì trả oauth_failed. Staff không có trạng thái locked/suspended. Email lưu lowercase, so khớp chính xác sau khi lowercase (không trim, không chuẩn hoá dấu chấm/+alias Gmail, sai thì trả no_account). Socialite chạy stateless, không kiểm state (có follow-up riêng), đây là residual risk. Rate limit GOOGLE_OAUTH_RATE_LIMIT theo phút theo IP, bucket riêng dùng chung cho redirect và callback (1 login là 2 request); 2FA dùng limiter Fortify riêng. social_error lạ hoặc rỗng hiện text oauth_failed; F5 hiện lại toast là known issue. Google login không thay thế verify email: Staff chưa verify trả email_unverified, không được đánh dấu verified; invite_pending ưu tiên hiển thị trước.
CLAIM-12: Staff không có password nhưng có Google hiện No password, Google, 2FA off (không phải 2FA via Shopify). Staff Shopify có password hiện Password, Shopify SSO và chip 2FA thật. Invite pending chỉ hiện Pending invite.
CLAIM-13: Mỗi cách đăng nhập là 1 chip: Password, Shopify SSO, Google; sau đó tới chip 2FA. Chip 2FA via Shopify chỉ hiện khi Shopify là cách đăng nhập duy nhất. Chip Google lấy từ staffs.google_id: chỉ có sau lần Google login thành công đầu tiên, vẫn còn sau khi logout; login bị reject thì không có chip.
CLAIM-14: Store selector chỉ liệt kê store đang active/connected, nhưng một user account có thể sở hữu nhiều instance hơn thế (store cũ, đã ngắt kết nối, ẩn). Với app một user quản nhiều store, user search/đọc được resource ở mọi store của chính mình là by design, không phải lỗ hổng.
CLAIM-15: TIB-5507 chặn ghi cột ảnh, đồng thời gỡ delete permission, untrack 33 bảng và thêm filter soft-delete.
CLAIM-16: Staff được tạo tự động khi chủ shop Shopify cài/mở app chỉ có email, không có password, và luôn vào dashboard qua đường embedded/auto-login (Shopify sang app). Staff này đăng nhập bằng form email/password thường của portal thì fail (sai credential), vì chưa có password nào được set trong hệ thống. Để login qua form thường, staff phải đi qua Forgot password, nhận email, dùng link set password.
CLAIM-18: Fix chỉ sửa crash, không đổi hành vi nghiệp vụ: case usage-charge chuyển từ crash sang skip, không merchant nào thấy khác biệt.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5628 comment #55801
- **Link:** https://ownego.atlassian.net/browse/TIB-5628?focusedCommentId=55801
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** trungld (dev)
- **Trích nguyên văn:**
  - Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28:
    ```
    Lưu ý: không phải lần nào cũng hỏi lại. Xác nhận xong có hiệu lực 15 phút, trong thời gian đó các action trên chạy luôn.
    ```
  - Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28:
    ```
    API trả "The provided password was incorrect." (trừ khi mật khẩu thật đúng là các khoảng trắng đó). API không trim mật khẩu, nên khoảng trắng không được coi là rỗng. FE cũng không chặn trường hợp này.
    ```
  - Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28:
    ```
    Có. FE hiện "Enter your password." dưới ô nhập và không gọi API.
    ```
  - rules/tib-product-behaviors.md dòng 68:
    ```
    - **Dialog Confirm password:** hiệu lực 15 phút. Mọi sensitive action dùng chung 1 component → regression chỉ cần 1 action khác. Account chưa có password có link tạo password. Để trống: FE chặn; toàn khoảng trắng: API báo "incorrect" (không trim). (Dev trungld 2026-10-28, TIB-5628)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 68
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 68:
    ```
    - **Dialog Confirm password:** hiệu lực 15 phút. Mọi sensitive action dùng chung 1 component → regression chỉ cần 1 action khác. Account chưa có password có link tạo password. Để trống: FE chặn; toàn khoảng trắng: API báo "incorrect" (không trim). (Dev trungld 2026-10-28, TIB-5628)
    ```
  - Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28:
    ```
    Mọi action có yêu cầu xác nhận mật khẩu:
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 68
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 68:
    ```
    - **Dialog Confirm password:** hiệu lực 15 phút. Mọi sensitive action dùng chung 1 component → regression chỉ cần 1 action khác. Account chưa có password có link tạo password. Để trống: FE chặn; toàn khoảng trắng: API báo "incorrect" (không trim). (Dev trungld 2026-10-28, TIB-5628)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 69
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 69:
    ```
    - **Staff 2 ("[tên account]") là editor đã duyệt của org [id]** → header `x-acting-user-id: [id]` ghi được data org [id] là hợp lệ, không phải IDOR. Test cross-tenant [tenant A] vs [tenant B] chỉ dùng session/token riêng (account: `.claude/tib-reusable-test-data.md`). (Dev tuanva 2026-10-30, TIB-5500)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536; skill-rules-audit.md #53, #54, #55, #56, #57, #58, #59 (rule `open-api-asset-upload`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5536?focusedCommentId=55888
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #53):
    ```
    Search. Layer images, layer image categories and clipart categories now have a search parameter. It uses the same Typesense search as the MCP tools, so search=SKU123 finds SKU123_BG. name stays an exact match, and it can't be combined with search (422). Cliparts have no search, the same as the portal.
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #54):
    ```
    no token, or a revoked token: 401; token missing the assets:* permission: 403; another account's id in the URL: 404 {"message":"Not found."}; another account's category_id / parent_id in the body: 422; daily limit reached: 429, with the portal's message (the 60 requests/minute limit also returns 429). Accept: application/json is required. Without it, errors come back as redirects or HTML (no token gives a 302 to login instead of 401).
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #55):
    ```
    No failed status. If processing fails, the item stays processing with url: null, the same as the portal.
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #56):
    ```
    A layer image used in an artwork can't be deleted (400 "This image has already been used."), the same as the portal. A clipart can be deleted. It goes to the portal's Trash and can be restored there for 60 days. There's no restore endpoint in the Open API yet.
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #57):
    ```
    only http/https; private, loopback, link-local and metadata addresses are refused (422), and the server downloads from the address it checked; redirects are refused (422), not followed; a file over 64 MB is refused before downloading if the server reports its size, otherwise as soon as it passes 64 MB; the download times out after 30 s;
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #58):
    ```
    upload_id errors are all 422: not PUT yet: "PUT it to the upload_url first". The upload_id stays usable, so retry after the PUT. already used, expired, or from another account: "not found or has expired". The upload URL lasts 5 min; the upload_id lasts 30 min.
    ```
  - Jira TIB-5536 comment #55888, huyenntk (dev), 2026-10-28 (dòng #59):
    ```
    There's no reset. To test 429, lower the merchant's "… max attempts" in the admin panel (e.g. to 2), then put it back. Mapbox token is the merchant's own, set in Settings → Maps, the same as the portal. Use one account with a token and one without. Without a token: 422 "Add one in Settings > Maps first." URLs. thumbnail_url is a public CDN link, unsigned, the same as the portal. url is the storage key that artwork layers use, not a link.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5536; skill-rules-audit.md #52 (rule `open-api-asset-upload`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5536
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #52, rule `open-api-asset-upload`, nguồn ghi: dev, TIB-5536, 2026-10-28:
    ```
    `on_duplicate` so theo **tên** (layer image/clipart: cùng tên + cùng category; category: tên + type [+ parent]). `create` mặc định; `skip` → 200 trả item cũ, không tính quota; `replace` chỉ raster clipart (+`keep_thumbnail`).
    ```
  - Jira TIB-5536 comment #55888, huyenntk, 2026-10-28, khớp một phần:
    ```
    create (default): always creates, the same as the portal. skip: returns the existing item with 200 and uploads nothing. It doesn't count toward the daily limit. replace: raster cliparts only, the same as the portal's "Replace items". Use keep_thumbnail: true to keep the thumbnail.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-08

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5628; skill-rules-audit.md #61 (rule `password-field-autofill`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5628?focusedCommentId=55801
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** trungld (dev)
- **Trích nguyên văn:**
  - Jira TIB-5628 comment #55801, trungld (dev), 2026-10-28 (dòng #61):
    ```
    Là email của staff đang đăng nhập, chỉ để trình quản lý mật khẩu nhận đúng tài khoản. Không gửi lên API: request chỉ có password.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5628; skill-rules-audit.md #62 (rule `password-field-autofill`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5628
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #62, rule `password-field-autofill`, nguồn ghi: dev trungld, TIB-5628, 2026-10-28:
    ```
    Scope chỉ portal.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-10

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5335; skill-rules-audit.md #117, #118, #119, #120, #121, #122, #123, #124 (rule `session-auth-2fa-migration`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5335
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-17
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #117, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    teeinblue có **2 đường login riêng biệt**, đừng gộp chung "staff"/"owner" như một khái niệm duy nhất. teeinblue chỉ có **2 role mặc định: `owner` và `editor`** (có thể tạo thêm custom role qua "create/edit roles" — vẫn là sensitive action riêng, không phải role built-in).
    ```
  - skill-rules-audit.md #118, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    Gồm cả **Shopify store owner** và **Shopify staff có quyền "manage apps"** (permission cấp trên chính Shopify, không phải trên teeinblue). Cả hai login vào portal qua Shopify Apps, **không cần password teeinblue nào**.
    ```
  - skill-rules-audit.md #119, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    Role gán tự động: nếu **email login == email của store** → role `owner`; mọi Shopify-staff khác → role `editor`. Không có case Shopify-staff được lên `owner`.
    ```
  - skill-rules-audit.md #120, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    Đây là cách **DUY NHẤT** để thêm người vào 1 "user"/store trên teeinblue ngoài đường Shopify-embedded — **luôn qua invite email**, không có đường tự đăng ký rồi tự gắn vào store người khác.
    ```
  - skill-rules-audit.md #121, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    1 email/staff **có thể được invite vào nhiều owner/store khác nhau** — hệ thống hỗ trợ 1 identity thuộc nhiều "user" cùng lúc.
    ```
  - skill-rules-audit.md #122, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    Khi invite: nếu email **chưa có account teeinblue** → tạo staff account mới (cần set password qua link trong email invite, giống flow accept-invite đã có). Nếu email **đã có account** (owner hoặc staff ở nơi khác) → chỉ **thêm họ vào owner/store mới**, KHÔNG tạo account trùng, họ login lại bằng password đã có sẵn.
    ```
  - skill-rules-audit.md #123, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    **Owner của platform khác Shopify (Etsy, Boundless...) đi qua đường 2 y hệt**: phải tự tạo account teeinblue (email/password) **trước**, rồi mới connect store — **không có** biến thể "auto-create không password" nào cho Etsy/Wix/Boundless, khác hẳn Shopify.
    ```
  - skill-rules-audit.md #124, rule `session-auth-2fa-migration`, nguồn ghi: PO, TIB-5335, 2026-09-17:
    ```
    Trang quản lý: **`/staffs`** và **`/roles`** riêng biệt; **1 store có thể có đồng thời cả 2 kiểu staff** (Shopify-embedded tự động + teeinblue-invited qua email) hiển thị cùng nơi.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5334; skill-rules-audit.md #152, #153, #154, #155, #156, #157, #158, #159, #161 (rule `social-oauth-login`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5334
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-27, 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #152, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Staff đa-org: social login vào **default user** lưu trong bảng `staff_user` (không có màn chọn org).
    ```
  - skill-rules-audit.md #153, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Email là staff active ở org X + có invite pending ở org Y → **không đổi staff status** (invite vẫn pending), vẫn login vào default user. `invite_pending` chỉ áp khi Staff tồn tại *duy nhất* dưới dạng invite chưa accept.
    ```
  - skill-rules-audit.md #154, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Nút chỉ có ở trang staff login/register của portal; login qua Shopify admin không mở trang này → context embedded/iframe nằm ngoài scope.
    ```
  - skill-rules-audit.md #155, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Default org chỉ dùng khi approved; không thì fallback sang org approved đầu tiên; không còn org nào → `oauth_failed`. `invite_pending` chỉ khi chưa từng accept invite nào. Staff không có trạng thái locked/suspended.
    ```
  - skill-rules-audit.md #156, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Email lưu lowercase, so khớp chính xác sau khi lowercase (không trim, không chuẩn hoá dấu chấm/`+alias` Gmail → `no_account`).
    ```
  - skill-rules-audit.md #157, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Socialite stateless, **không kiểm `state`** (follow-up riêng) → không viết case "state sai bị reject"; ghi nhận là residual risk.
    ```
  - skill-rules-audit.md #158, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    Rate limit `GOOGLE_OAUTH_RATE_LIMIT`/phút/IP, bucket riêng dùng chung cho redirect + callback (1 login = 2 request); 2FA dùng limiter Fortify riêng.
    ```
  - skill-rules-audit.md #159, rule `social-oauth-login`, nguồn ghi: mục "Đã xác nhận ở teeinblue (TIB-5334, 2026-10-27)"; không ghi tên người:
    ```
    `social_error` lạ/rỗng → text `oauth_failed`; F5 hiện lại toast là known issue, không log bug.
    ```
  - skill-rules-audit.md #161, rule `social-oauth-login`, nguồn ghi: comment 55794, 2026-10-28, TIB-5334:
    ```
    Sau đề xuất của QA (comment 55794, 2026-10-28): **bỏ nút ở Register** (nút "Continue with Google" trên trang đăng ký dễ bị hiểu là sign up) và **Google login không thay thế verify email** — Staff chưa verify → `email_unverified`, không đánh dấu verified; `invite_pending` ưu tiên hiển thị trước.
    ```
  - Jira TIB-5334 comment #55794, tinhpt, 2026-10-28, khớp một phần:
    ```
    Register page: the "Continue with Google" button is removed. It now only appears on the staff email/password login view. (portal feebd8662) Unverified email: Google login no longer verifies the email. A Staff whose email isn't verified is rejected, the same as password login: they land on /login?social_error=email_unverified
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5334; skill-rules-audit.md #164 (rule `staff-security-status-display`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5334?focusedCommentId=55650
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26
- **Người viết / người xác nhận:** tinhpt (dev)
- **Trích nguyên văn:**
  - Jira TIB-5334 comment #55650, tinhpt (dev), 2026-10-26 (dòng #164):
    ```
    A Shopify-installed Staff who also has a password shows Password Shopify SSO and the real 2FA chip. A Staff with no password who has signed in with Google shows No password Google and 2FA off (not "2FA via Shopify"). A pending invite still shows only Pending invite.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5334; skill-rules-audit.md #162, #163 (rule `staff-security-status-display`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5334
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #162, rule `staff-security-status-display`, nguồn ghi: TIB-5334, description + QA plan dev cập nhật 2026-10-29:
    ```
    Mỗi cách đăng nhập là 1 chip: `Password`, `Shopify SSO` (đổi tên từ "SSO login"), `Google`; sau đó tới chip 2FA. `2FA via SSO` đổi tên thành `2FA via Shopify`, và chỉ hiện khi Shopify là cách đăng nhập duy nhất.
    ```
  - skill-rules-audit.md #163, rule `staff-security-status-display`, nguồn ghi: TIB-5334, description + QA plan dev cập nhật 2026-10-29:
    ```
    Chip `Google` lấy từ `staffs.google_id`: chỉ có sau lần Google login **thành công** đầu tiên, vẫn còn sau khi logout; login bị reject thì không có chip.
    ```
  - Jira TIB-5334 comment #55650, tinhpt, 2026-10-26, khớp một phần:
    ```
    Before account A ever signs in with Google, its row has no Google chip. After account A signs in with Google once, its row shows Google next to its other chips (e.g. Password Google 2FA off). It stays after logging out. A rejected Google sign-in (accounts B, C, D) adds no Google chip to any row.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** skill-rules-audit.md A1, A2 (rule `access-control-idor`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5018
- **Ngày của nguồn (YYYY-MM-DD):** 2026-08-21
- **Người viết / người xác nhận:** không ghi (bài học TIB-5018, 2026-08-21)
- **Trích nguyên văn:**
  - skill-rules-audit.md A1:
    ```
    Ví dụ thực tế: store selector chỉ liệt kê store đang active/connected, nhưng 1 user account sở hữu NHIỀU instance hơn thế (store cũ, đã ngắt kết nối, ẩn).
    ```
  - skill-rules-audit.md A2:
    ```
    Với app 1 user quản nhiều store: user search/đọc được resource ở **mọi store của chính mình** là BY DESIGN, không phải lỗ hổng.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-15

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** skill-rules-audit.md A13 (rule `hasura-permission-hardening`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5507
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-15
- **Người viết / người xác nhận:** không ghi (bài học TIB-5507, 2026-10-15)
- **Trích nguyên văn:**
  - skill-rules-audit.md A13:
    ```
    (description chỉ nói chặn ghi cột ảnh, PR còn gỡ delete permission, untrack 33 bảng, thêm filter soft-delete)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-16

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** skill-rules-audit.md A52, A53, A54 (rule `session-auth-2fa-migration`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5335
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-17
- **Người viết / người xác nhận:** không ghi (bài học TIB-5335, 2026-09-17)
- **Trích nguyên văn:**
  - skill-rules-audit.md A52:
    ```
    Staff được tạo tự động khi **chủ shop Shopify cài/mở app** chỉ có email, **không có password** — họ luôn vào dashboard qua đường embedded/auto-login (Shopify → app), chưa từng tự đặt password.
    ```
  - skill-rules-audit.md A53:
    ```
    Nếu staff này thử đăng nhập bằng **form email/password thường của portal** → phải **fail** (sai credential), vì chưa hề có password nào được set trong hệ thống.
    ```
  - skill-rules-audit.md A54:
    ```
    Muốn login được qua form thường, staff phải đi qua **Forgot password** → nhận email → link set password → từ đó mới có password để dùng form thường.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-18

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** TIB-4938; skill-rules-audit.md A34
- **Link:** https://ownego.atlassian.net/browse/TIB-4938
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-09
- **Người viết / người xác nhận:** không ghi tên
- **Trích nguyên văn:**
  - skill-rules-audit.md A34, rule `paddle-billing-webhook`, nguồn ghi: "chốt TIB-4938, 09/09/2026" là scope verify của QA, không phải quyết định sản phẩm:
    ```
    Loại bug này **chỉ sửa crash, không đổi hành vi nghiệp vụ** — case usage-charge trước fix crash, sau fix skip; không merchant nào thấy khác biệt. Vì vậy scope verify QA chốt là:
    ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

không có

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật
- [x] Đã ghi build/ngày update hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi từ khoá tra canon
- [x] Mỗi claim có đúng 1 dòng ở Phần 1a, 1 dòng ở Phần 1b, 1 block ở Phần 5.1
- [x] Cột nguồn ghi đúng 1 trong 5 trạng thái
- [x] Phần 2a và 2b đã điền
- [x] Không còn placeholder
