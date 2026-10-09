<!-- testlane knowledge kind=business-rule · project proj-1ffcd909-2d85-46eb-b4c8-f518cbb0962a · 73 entry (72 theo bootstrap-request + 1 bổ sung: KB-138) · đóng băng 2026-10-08 -->

# QA business rule Mailtro (Testlane MTRO knowledge kind=business-rule)

## KB-003 — Contact tạo bằng bulk upload / import CSV không trigger automation

status: active · tag: — · sourceUrl: — · createdAt: 2026-10-05T08:14:22.508Z · updatedAt: 2026-10-07T08:34:27.883Z

**Rule**: Contact được tạo hàng loạt qua bulk upload / import file CSV **không** kích hoạt automation nào — kể cả flow có trigger `Contact created` (hoặc `Contact field changed` nếu import ghi đè contact có sẵn).

Chỉ contact tạo lẻ (dialog `New contact`, API tạo từng contact…) mới đi vào trigger của automation.

**Ảnh hưởng khi test**
- Automations: case trigger `Contact created` / `Contact field changed` phải tạo contact bằng đường lẻ; thêm case âm: import CSV → flow đang Active **không** có run mới trong Run history.
- Contacts: màn Import (`/contacts/import`) đã có trên staging từ 01/10/2026 — viết / chạy case import theo rule này.

**Nguồn**: chị Nga (QA) xác nhận ngày 05/10/2026 — chưa có link Jira / Confluence. Cập nhật 07/10/2026: bỏ câu "import CSV chưa có UI" (đã có màn Import), đổi tên trigger theo staging 01/10.

## KB-004 — Nhãn trường số điện thoại của contact là "SMS" ở mọi nơi (New contact, segment, CSV)

status: active · tag: — · sourceUrl: — · createdAt: 2026-10-05T08:14:23.360Z · updatedAt: 2026-10-07T08:34:28.301Z

**Rule**: Trường số điện thoại của contact dùng nhãn **`SMS`** ở tất cả các nơi:
- Dialog `New contact` / `Edit contact`, khối `Properties` ở contact detail; segment builder (`Condition field`); header cột CSV import / export; Automations (picker biến `Choose a variable`, `Contact field` của `Update contact field`, `Which fields?` của trigger `Contact field changed`); picker merge tag trong design campaign.

**Ngoại lệ — thông báo lỗi**: số sai định dạng thì FE hiện nguyên văn **`Phone is invalid`** (nhãn ô vẫn là `SMS`); message BE giữ `Enter a valid SMS number with its country code…` (Dev chốt 06/10/2026, QA Hub MTRO-010 BR-27). Thay câu cũ 05/10 "thông báo lỗi cũng dùng chữ SMS".

**Thay rule cũ**: BR-11 (MTRO-010), BR-16 (MTRO-009), BR-24 phần nhãn (MTRO-018) — chốt 02/10 rằng nhãn phải là `Phone`. Từ 05/10 **`SMS` là đúng**; bug nhãn `SMS` ghi 02/10 đã huỷ.

Không đổi: key API / payload `phone`, merge tag `{{contact.phone}}`.

**Nguồn**: chị Nga (QA) xác nhận 05/10/2026; Dev chốt message lỗi 06/10/2026 — cập nhật 07/10/2026.

## KB-098 — Auth chạy trên Mailtro ID, tính năng chạy trên subdomain workspace <slug>.wisle.app — điều hướng sau signup/verify/login là cross-domain

status: active · tag: — · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:25.920Z · updatedAt: 2026-10-07T08:27:25.920Z

**Rule**: Màn auth (signup, login, verify, forgot/reset password, chọn workspace) chạy trên Mailtro ID — `https://staging-id.mailtro.ai` (`AUTH_URL`). Tính năng trong app chạy trên subdomain riêng của từng workspace — `https://<workspace-slug>.wisle.app` (`BASE_URL`, suffix `.wisle.app` = `WORKSPACE_DOMAIN_SUFFIX`). Điều hướng sau signup/verify/login là điều hướng **cross-domain**.

**Nguồn**: MTRO-30, repo automation `qikify-QA-mailtro` (README, `.env.example`, `tests/01-auth`) — cập nhật lần cuối 2026-08-07

## KB-099 — Signup: nút Create account disabled tới khi cả 5 field hợp lệ, password tối thiểu 8 ký tự

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:26.447Z · updatedAt: 2026-10-07T08:27:26.447Z

**Rule**: Form signup gồm 5 field (Full name, Email, Password, Workspace name, Workspace URL). Nút `Create account` disabled cho tới khi toàn bộ form hợp lệ (validate gating phía client). Password tối thiểu 8 ký tự.

**Nguồn**: MTRO-30, `tests/01-auth/signup.spec.ts` — cập nhật lần cuối 2026-08-07

## KB-100 — Signup: Workspace URL tự slugify từ Workspace name và ngừng auto-sync vĩnh viễn khi người dùng sửa tay

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:26.893Z · updatedAt: 2026-10-07T08:27:26.893Z

**Rule**: Workspace URL được slugify tự động từ Workspace name — lowercase, khoảng trắng → `-`, loại mọi ký tự ngoài `a-z0-9-`. Ngay khi người dùng sửa tay ô Workspace URL, cơ chế auto-sync **ngừng vĩnh viễn** trong phiên đó (đổi Workspace name không còn ghi đè URL nữa).

❓ **Chưa chốt** — xử lý ký tự tiếng Việt có dấu khi slugify: xem `open-questions/MTRO.md` § "Slug từ tên tiếng Việt có dấu".

**Nguồn**: MTRO-30, `tests/01-auth/signup.spec.ts` — cập nhật lần cuối 2026-08-07

## KB-101 — Signup thường gửi team_name/team_slug, signup qua link invite gửi invitation_token thay cho hai field đó

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:27.494Z · updatedAt: 2026-10-07T08:27:27.494Z

**Rule**: Signup thường gọi `POST {apiUrl}/register` với payload `{name, email, password, team_name, team_slug}`, sau đó điều hướng sang `/verify`. Signup qua link invite (`/signup?invite={token}&email=...&team=...`) gửi `invitation_token` **thay cho** `team_name`/`team_slug`.

**Nguồn**: MTRO-30, MTRO-20 — cập nhật lần cuối 2026-08-07

## KB-102 — Signup qua link invite: tiêu đề Accept your invitation, ẩn 2 field workspace, Email prefill và readonly

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-20 · createdAt: 2026-10-07T08:27:27.965Z · updatedAt: 2026-10-07T08:27:27.965Z

**Rule**: Khi truy cập `/signup` kèm tham số `invite`, tiêu đề đổi thành "Accept your invitation", 2 field Workspace name và Workspace URL bị **ẩn**, ô Email được prefill và để **readonly**.

**Nguồn**: MTRO-20, MTRO-30 — cập nhật lần cuối 2026-08-07

## KB-103 — Chưa verify email thì bấm "I've verified — continue" vẫn bị giữ lại ở /verify

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:28.471Z · updatedAt: 2026-10-07T08:27:28.471Z

**Rule**: Trang `/verify` có nút "Resend verification email" (`POST /api/auth/email/verification-notification`) và nút "I've verified — continue". Bấm continue khi email chưa thực sự verify thì người dùng bị giữ lại ở `/verify`.

**Nguồn**: MTRO-30 — cập nhật lần cuối 2026-08-07

## KB-104 — Signup: lỗi 422 của server hiện dưới đúng field (email trùng, slug trùng), lỗi chung hiện ở alert form

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:28.922Z · updatedAt: 2026-10-07T08:27:28.922Z

**Rule**: Lỗi validate từ server (HTTP 422) hiển thị ngay dưới field tương ứng — email đã tồn tại → dưới ô Email, slug đã bị dùng → dưới ô Workspace URL. Lỗi không thuộc field nào hiển thị ở alert chung của form.

**Nguồn**: MTRO-30 — cập nhật lần cuối 2026-08-07

## KB-105 — Khi CSRF token hết hạn (419), frontend tự lấy token mới và retry request thay vì báo lỗi

status: active · tag: Signup · sourceUrl: https://ownego.atlassian.net/browse/MTRO-30 · createdAt: 2026-10-07T08:27:29.511Z · updatedAt: 2026-10-07T08:27:29.511Z

**Rule**: Khi CSRF token hết hạn (HTTP 419), frontend tự lấy token mới và **retry lại request** thay vì báo lỗi cho người dùng.

**Nguồn**: MTRO-30 — cập nhật lần cuối 2026-08-07

## KB-106 — Role Owner / Admin / Member: Admin không thấy billing, Member không quản lý users, billing và không tạo/sửa segment

status: draft · tag: Permission · sourceUrl: https://ownego.atlassian.net/browse/MTRO-20 · createdAt: 2026-10-07T08:27:30.014Z · updatedAt: 2026-10-07T08:27:30.014Z

**Rule**: Hệ thống dùng 3 role — Owner, Admin, Member. Owner: truy cập billing + quản lý users. Admin: quản lý campaigns/contacts/templates/automations/users nhưng **không thấy billing**. Member: tạo/sửa campaign, template, automation; **không** được tạo/sửa segment (bị chặn ngay ở nút `Create segment` kèm tooltip, không vào builder; toast "Only workspace Owners and Admins can create segments. Ask an Admin to create it for you."); **không** truy cập quản lý users và billing. Ngoài ra có **custom role** chỉ mang đúng quyền theo feature được cấu hình. Chặn quyền phải nằm ở API, không chỉ ẩn UI.

**Thay rule cũ (07/08/2026)**: "Member: tạo/sửa campaign, template, **segment**, automation".

**Ảnh hưởng khi test**: MTRO-100 đang In Progress — staging 01/10 vẫn cho Member vào builder và báo `Couldn't save segment — This action is unauthorized.`; case quyền segment của Member chạy theo rule mới, fail thì ghi theo MTRO-100.

❓ **Đang tranh chấp** — tên hiển thị role thứ 3: Epic MTRO-20 / `.env.example` ghi "Marketer(-Editor)", MTRO-43 / MTRO-49 và UI staging 29/09 (`Invite as` {Admin, Member}) dùng "Member": xem `open-questions/MTRO.md` § "Tên hiển thị chính thức của role thứ 3".

**Nguồn**: MTRO-20, MTRO-46, repo automation (`.auth/owner.json`, `.auth/admin.json`, `.auth/member.json`); MTRO-100 (description + comment PO 30/09/2026) — cập nhật lần cuối 2026-10-07

## KB-107 — Sending domain phải khai đủ SPF, DKIM, DMARC; verify thất bại phải chỉ rõ bản ghi nào thiếu/sai

status: active · tag: — · sourceUrl: https://ownego.atlassian.net/browse/MTRO-6 · createdAt: 2026-10-07T08:27:30.569Z · updatedAt: 2026-10-07T08:27:30.569Z

**Rule**: Sending domain yêu cầu khai báo đủ SPF, DKIM và DMARC. Khi verify thất bại, hệ thống phải chỉ rõ bản ghi nào còn thiếu hoặc sai, không báo lỗi chung chung.

**Nguồn**: MTRO-6 — cập nhật lần cuối 2026-08-07

## KB-108 — Campaign không gửi được khi workspace chưa có sending domain verified (đang tranh chấp với hành vi shared sending host)

status: draft · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-6 · createdAt: 2026-10-07T08:27:31.026Z · updatedAt: 2026-10-07T08:27:31.026Z

**Rule**: Campaign không thể gửi nếu workspace chưa có sending domain nào ở trạng thái verified. Đây là ràng buộc chéo giữa MTRO-6 và MTRO-11 — luôn cover trong regression khi đụng vào campaign.

❓ **Đang tranh chấp** — staging 09/09 gửi campaign 15/15 lần dù workspace chưa có domain verified (qua host dùng chung, `sender_is_borrowed: true`); PO/BA 02/10 chốt cho **automation** "From email ngoài domain verified vẫn gửi qua shared sending host, giống campaign" (QA Hub MTRO-018 BR-27); chưa ai chốt lại rule này cho campaign: xem `open-questions/MTRO.md` § "Campaign có gửi được khi workspace chưa có domain verified không".

**Nguồn**: MTRO-6, MTRO-11 — cập nhật lần cuối 2026-10-07 (đánh dấu tranh chấp, nội dung rule giữ nguyên 07/08)

## KB-109 — Hard bounce (bounceType Permanent) tạo suppression reason hard_bounce ngay lập tức và vĩnh viễn

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:31.492Z · updatedAt: 2026-10-07T08:27:31.492Z

**Rule**: Event SES có `bounceType = Permanent` tạo ngay một row `suppressions` với `reason = hard_bounce` cho cặp `(team_id, email)`. Không có độ trễ, không có ngưỡng số lần. Ưu tiên bảo vệ reputation hơn giữ contact — AWS siết/treo quota khi bounce rate vượt ~5%.

**Nguồn**: MTRO-64 (use case B1), MTRO-76 — cập nhật lần cuối 2026-09-07

## KB-110 — Spam complaint tạo suppression reason complaint ngay lập tức và vĩnh viễn

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:31.942Z · updatedAt: 2026-10-07T08:27:31.942Z

**Rule**: Event `Complaint` tạo ngay row `suppressions` với `reason = complaint`. Cùng cơ chế "không tự gỡ" như hard bounce. Ngưỡng complaint của AWS (~0.1%) khắt khe hơn bounce nên rủi ro bị siết quota nhanh hơn.

**Nguồn**: MTRO-64 (use case B3), MTRO-76 — cập nhật lần cuối 2026-09-07

## KB-111 — Soft bounce chỉ suppress khi đủ 7 lần liên tiếp cho cùng (team_id, email), sau đó xoá counter

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:32.454Z · updatedAt: 2026-10-07T08:27:32.454Z

**Rule**: Event `bounceType = Transient` tăng `soft_bounce_counters` của cặp `(team_id, email)` thêm 1. Đủ **7 lần liên tiếp** thì tạo row `suppressions` với `reason = soft_bounce` và **xoá counter**. SES không tự xử lý soft bounce — logic này hoàn toàn của Mailtro. Ngưỡng 7 lấy theo Klaviyo.

**Nguồn**: MTRO-64 (use case B2), MTRO-77 — cập nhật lần cuối 2026-09-07

## KB-112 — Một event Delivery xoá hẳn counter soft bounce của (team_id, email) — reset về 0

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-77 · createdAt: 2026-10-07T08:27:32.982Z · updatedAt: 2026-10-07T08:27:32.982Z

**Rule**: Một event `Delivery` **xoá hẳn row** trong `soft_bounce_counters` của cặp `(team_id, email)` — reset về 0, không phải giảm 1. Hệ quả: chỉ 7 lần soft bounce **liên tiếp không xen Delivery** mới suppress được.

❓ **Chưa chốt** — reset streak làm rule soft bounce gần như không kích hoạt: xem `open-questions/MTRO.md` § "Delivery reset streak về 0 làm rule soft bounce gần như không kích hoạt".

**Nguồn**: MTRO-77 — cập nhật lần cuối 2026-09-07

## KB-113 — Mỗi (team_id, email) chỉ có 1 row suppression active; reason theo verdict đầu tiên, không bị ghi đè

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-76 · createdAt: 2026-10-07T08:27:33.476Z · updatedAt: 2026-10-07T08:27:33.476Z

**Rule**: Bảng `suppressions` dùng soft-delete + partial unique `(team_id, email) WHERE deleted_at IS NULL`, nên mỗi cặp chỉ có đúng 1 row active. Verdict **đầu tiên** quyết định `reason` — hard bounce trước rồi complaint sau thì `reason` vẫn là `hard_bounce`, không bị ghi đè. Row đã soft-delete được giữ lại làm audit trail; sau khi gỡ, một event bounce mới vẫn tạo được row active mới.

**Nguồn**: MTRO-76 — cập nhật lần cuối 2026-09-07

## KB-114 — Suppression không tự gỡ khi contact resubscribe — chỉ gỡ thủ công qua Portal API

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:33.923Z · updatedAt: 2026-10-07T08:27:33.923Z

**Rule**: Contact bị suppress vẫn bị chặn kể cả khi resubscribe. Chỉ gỡ được **thủ công** qua Portal API. Đây là lựa chọn có chủ ý: ưu tiên reputation hơn giữ contact, giống cách Klaviyo làm.

**Nguồn**: MTRO-64 (use case B1, B3), MTRO-76 — cập nhật lần cuối 2026-09-07

## KB-115 — Gỡ suppression = soft-delete row DB và job xoá địa chỉ khỏi SES ở mọi region, nếu thiếu sẽ bị tạo lại (ghost loop)

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-80 · createdAt: 2026-10-07T08:27:34.425Z · updatedAt: 2026-10-07T08:27:34.425Z

**Rule**: Gỡ suppression = soft-delete row DB **cộng với** job nền gọi `DeleteSuppressedDestination(email)` cho **mọi** row `sending_account_regions` đang active (tối đa 10 lời gọi, idempotent, `NotFound` được coi là no-op). Job có retry; thất bại lần cuối gửi `AdminNotification`. Nếu chỉ xoá row DB mà bỏ bước quét SES thì lần gửi sau bị SES chặn ở cổng, sinh event `bounceSubType = Suppressed`, và row vừa xoá bị tạo lại.

**Nguồn**: MTRO-80 — cập nhật lần cuối 2026-09-07

## KB-116 — Suppression trong DB tính theo từng team, còn danh sách SES suppression là account-global

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:34.945Z · updatedAt: 2026-10-07T08:27:34.945Z

**Rule**: Bảng `suppressions` khoá theo `(team_id, email)` nên một địa chỉ bị chặn ở team A không ảnh hưởng team B. Song song đó, SES account-level suppression list (bật `BOUNCE + COMPLAINT` trên cả 2 AWS account) là lưới **account-global**, bảo vệ mọi team khỏi những địa chỉ chết thật. Bảng `suppressions` **không có cột region/account** — provenance nằm ở `ses_events`, và khi gỡ thì quét toàn bộ region thay vì nhớ nơi phát sinh. Một task import chạy một lần kéo các entry SES đang có vào bảng `suppressions` để hai lớp khớp nhau từ ngày đầu.

❓ **Chưa chốt** — một team gỡ suppression ảnh hưởng team khác trên cùng AWS account: xem `open-questions/MTRO.md` § "Một team gỡ suppression làm giảm lớp bảo vệ của team khác".

**Nguồn**: MTRO-64 (use case B5), MTRO-79, MTRO-80 — cập nhật lần cuối 2026-09-07

## KB-117 — Trước khi gửi, SuppressionChecker tra cả sổ unsubscribes lẫn suppressions; campaign và automation dùng chung

status: active · tag: Suppression · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:35.459Z · updatedAt: 2026-10-07T08:27:35.459Z

**Rule**: Trước khi gửi, `SuppressionChecker` tra **cả hai sổ** — `unsubscribes` (consent) và `suppressions` (deliverability) — lọc theo reason-set của từng sending lane. Lane marketing chặn trên cả hai sổ. Automation dùng chung send stack nên được cover mà không cần code riêng.

**Nguồn**: MTRO-64 (use case B4), MTRO-78 — cập nhật lần cuối 2026-09-07

## KB-118 — Segment count / preview chỉ gồm contact Subscribed — tự loại contact bị suppress và contact Unsubscribed

status: active · tag: Suppression · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:27:35.990Z · updatedAt: 2026-10-07T08:27:35.990Z

**Rule**: `ContactsResource::baseQuery` có `whereNotExists` thứ hai (cạnh điều kiện consent) để loại contact bị suppress. Segment (count + bảng kết quả + preview) **chỉ gồm contact Subscribed** — contact Unsubscribed cũng bị loại như contact bị suppress. Vì nằm trong `baseQuery`, thay đổi này ảnh hưởng **mọi màn** dùng query đó, không riêng segment preview — luôn cover regression số đếm khi đụng vào contact/segment.

**Nguồn**: MTRO-64 (use case B4), MTRO-78; PO/BA 02/10/2026 qua QA Hub MTRO-011 BR-12 (phần contact Unsubscribed — trả lời open question R40) — cập nhật lần cuối 2026-10-07

## KB-119 — Worker SES chỉ nhận event từ SNS topic đã whitelist, chữ ký hợp lệ; event không khớp thì log và drop

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-74 · createdAt: 2026-10-07T08:27:36.553Z · updatedAt: 2026-10-07T08:27:36.553Z

**Rule**: Event SES đi qua SNS → SQS → worker, gồm 10 nguồn (5 region × 2 AWS account), raw message delivery **OFF**. Worker validate chữ ký SNS (`aws/aws-php-sns-message-validator`) và đối chiếu `TopicArn` với `sending_account_regions.sns_topic_arn`; `SubscriptionConfirmation` được worker tự xử lý. Event không khớp whitelist hoặc không gắn tag attribution thì **log + drop** — không lưu, không suppress.

**Nguồn**: MTRO-74 — cập nhật lần cuối 2026-09-07

## KB-120 — Bảng ses_events lưu mọi loại event kèm attribution, không lưu raw payload, không có bảng analytics riêng

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-75 · createdAt: 2026-10-07T08:27:37.059Z · updatedAt: 2026-10-07T08:27:37.059Z

**Rule**: Bảng `ses_events` lưu tất cả loại event kể cả open/click native của AWS, kèm attribution (`team_id`, `campaign_id`, `campaign_broadcast_recipient_id`), `source_domain` lấy từ `mail.source` (lowercase), và các trường chẩn đoán (`bounce_type`, `bounce_sub_type`, `diagnostic_code`, `complaint_feedback_type`, `ip_address`, `user_agent`, `link_url`). `message_id` và `occurred_at` có index. **Không** lưu raw payload JSONB và **không** có bảng analytics riêng — mọi con số thống kê tính bằng COUNT trên bảng này.

**Nguồn**: MTRO-75 — cập nhật lần cuối 2026-09-07

## KB-121 — Region SES câm được phát hiện bằng heartbeat last_event_at và cảnh báo AdminNotification + Slack

status: active · tag: Bounce/Complaint · sourceUrl: https://ownego.atlassian.net/browse/MTRO-83 · createdAt: 2026-10-07T08:27:37.573Z · updatedAt: 2026-10-07T08:27:37.573Z

**Rule**: Worker stamp `last_event_at` lên row `sending_account_regions` khớp ngay trong bước kiểm whitelist TopicArn. Một scheduled command quét các region active và cảnh báo (`AdminNotification` + Slack) khi region chưa từng nhận event, hoặc câm bất thường trong khi vẫn có broadcast gửi qua đó. Cần thiết vì 10 dây SNS→SQS đấu tay: thiếu một dây thì bounce biến mất mà không có triệu chứng nào khác.

**Nguồn**: MTRO-83 — cập nhật lần cuối 2026-09-07

## KB-122 — Sáu số delivery của campaign (delivered, bounced, complained, unsubscribed, opens, clicks) tính COUNT lúc đọc, không cache

status: active · tag: Analytics · sourceUrl: https://ownego.atlassian.net/browse/MTRO-64 · createdAt: 2026-10-07T08:29:38.852Z · updatedAt: 2026-10-07T08:29:38.852Z

**Rule**: `CampaignBroadcastResource` trả 6 số raw count — `delivered`, `bounced`, `complained`, `unsubscribed`, `opens`, `clicks` — tính bằng COUNT trên `ses_events` và hai sổ ledger tại thời điểm đọc. Không có cột counter, không cache. Frontend tự tính tỉ lệ từ số raw. Breakdown % và màn suppressed-profiles thuộc wave analytics, chưa nằm trong phạm vi này.

**Nguồn**: MTRO-64 (use case B6), MTRO-82 — cập nhật lần cuối 2026-09-07

## KB-123 — Portal API xem / gỡ suppression và unsubscribe; resubscribe bắt buộc ghi actor; route staging là deliverability-suppressions

status: active · tag: Suppression · sourceUrl: https://ownego.atlassian.net/browse/MTRO-81 · createdAt: 2026-10-07T08:29:39.332Z · updatedAt: 2026-10-07T08:29:39.332Z

**Rule**: `GET teams/{team}/suppressions` (phân trang, lọc theo reason) và `DELETE teams/{team}/suppressions/{id}` (kích hoạt job sweep SES). Song song: `GET teams/{team}/unsubscribes` — sổ consent độc lập, trả cả entry không có contact khớp — và `DELETE teams/{team}/unsubscribes/{id}` cho resubscribe do marketer khởi xướng, **bắt buộc ghi lại actor** để audit vì đây là hành động nhạy cảm pháp lý.

**Hiện trạng staging 08/09**: route sổ deliverability thật là `teams/{team}/deliverability-suppressions` — gọi `…/suppressions` theo AC trả 404. API chỉ nhận GET / HEAD (+ DELETE từng item); `POST …/unsubscribes` → 405. Case API viết theo route thật cho tới khi BUG-SUPP-02 được chốt.

**Thay rule cũ (07/09/2026)**: path `teams/{team}/suppressions` theo AC MTRO-81.

❓ **Chưa chốt** — đổi AC hay đổi route (BUG-SUPP-02): xem `open-questions/MTRO.md` § "Route API suppression: suppressions (AC) hay deliverability-suppressions (staging)".

❓ **Chưa chốt** — phân quyền xem/gỡ của 2 API này: xem `open-questions/MTRO.md` § "Phân quyền 2 API suppression / unsubscribe".

**Nguồn**: MTRO-81; lượt chạy suppression trên staging 08/09/2026 (repo `qikify-QA-mailtro`, BUG-SUPP-02) — cập nhật lần cuối 2026-10-07

## KB-124 — Automation có 3 trạng thái draft / active / paused, chỉ active mới kích hoạt flow cho contact

status: active · tag: Automation list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-32 · createdAt: 2026-10-07T08:29:39.837Z · updatedAt: 2026-10-07T08:29:39.837Z

**Rule**: Automation có đúng 3 trạng thái — `draft` (tạo nhưng chưa activate), `active` (đang chạy, nổ cho contact khớp trigger), `paused` (từng active, tạm dừng qua Pause). Chỉ `active` mới kích hoạt flow cho contact.

**Nguồn**: MTRO-32 §2 Status reference — cập nhật lần cuối 2026-09-11

## KB-125 — Danh sách automation: cột Automation chỉ hiện tên; Last edited đổi cả khi Activate / Pause

status: active · tag: Automation list · sourceUrl: — · createdAt: 2026-10-07T08:29:40.309Z · updatedAt: 2026-10-07T08:29:40.309Z

**Rule**: Trong bảng `/automations`, cột `Automation` chỉ hiện **tên** automation — description đã lưu **không** hiện thành dòng phụ, nó chỉ xuất hiện ở header builder. Cột `Last edited` cập nhật **mỗi lần** Activate / Pause, kể cả khi nội dung flow không đổi.

**Nguồn**: chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-686, TC-MTRO-711) — cập nhật lần cuối 2026-09-18

## KB-126 — Xoá automation từ danh sách luôn phải qua dialog xác nhận

status: active · tag: Automation list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-32 · createdAt: 2026-10-07T08:29:40.775Z · updatedAt: 2026-10-07T08:29:40.775Z

**Rule**: Xoá automation từ danh sách luôn hiện dialog xác nhận trước khi gọi delete.

**Nguồn**: MTRO-32 §1 Scope — cập nhật lần cuối 2026-09-11

## KB-127 — Builder automation: click node mở form của node ở panel phải, click canvas trống trả panel về Steps & actions

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:41.301Z · updatedAt: 2026-10-07T08:29:41.301Z

**Rule**: Click một node → panel bên phải chuyển sang form cấu hình của node đó. Click vùng canvas trống → panel trở về danh sách tham chiếu "Steps & actions".

**Nguồn**: MTRO-33 AC §1 — cập nhật lần cuối 2026-09-11

## KB-128 — Builder automation: nút + trên connector chèn Wait / Conditional split / Send email / Update contact field đúng vị trí và nối lại chuỗi

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:41.823Z · updatedAt: 2026-10-07T08:29:41.823Z

**Rule**: Mọi connector đều có nút "+" (`Add step or action`); bấm mở menu 2 nhóm — **Steps**: `Wait / delay` · `Conditional split`; **Actions**: `Send email` · `Update contact field`. Cả 4 loại đều chọn được — **Wait/delay đã enable** từ MTRO-85 (không còn nhãn "Coming soon"). Chọn loại nào thì node được chèn đúng tại connector vừa bấm và chuỗi hiện có được nối lại quanh node mới. Node vừa chèn ở trạng thái `Not configured yet` (panel phải vẫn giữ `Steps & actions`, không tự chọn node mới), nên `Save` và `Activate` vẫn disabled tới khi cấu hình xong.

**Thay rule cũ (18/09/2026)**: tên action thứ 4 là `Update property` (29/09 đổi thành `Update custom field`, 01/10 thành `Update contact field`).

**Nguồn**: MTRO-33 AC §2; MTRO-85; chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-856); tên UI theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11) — cập nhật lần cuối 2026-10-07

## KB-129 — Builder automation: chỉ Wait, Send email, Update contact field kéo thả được, không thả vào connector downstream của chính nó

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:42.283Z · updatedAt: 2026-10-07T08:29:42.283Z

**Rule**: Chỉ Wait, Send email, Update contact field kéo được; Trigger, Conditional split, Exit không. Thả node lên connector hợp lệ thì nối lại hàng xóm cũ và chèn vào vị trí mới. Thả node vào một connector nằm phía dưới (downstream) của chính nó bị chặn.

**Thay rule cũ (11/09/2026)**: chỉ đổi tên `Update property` → `Update contact field` (staging 01/10); hành vi giữ nguyên.

**Nguồn**: MTRO-33 AC §3; tên UI theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11) — cập nhật lần cuối 2026-10-07

## KB-130 — Builder automation: kebab Duplicate / Delete chỉ có ở node step, Trigger và Exit không có

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:42.736Z · updatedAt: 2026-10-07T08:29:42.736Z

**Rule**: Wait, Conditional split, Send email, Update contact field có kebab menu (`Actions for {name}`) với 2 mục Duplicate và Delete. Trigger và Exit không có kebab.

**Thay rule cũ (11/09/2026)**: chỉ đổi tên `Update property` → `Update contact field` (staging 01/10); hành vi giữ nguyên.

**Nguồn**: MTRO-33 AC §4; tên UI theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11) — cập nhật lần cuối 2026-10-07

## KB-131 — Trigger automation có 2 lựa chọn Contact created / Contact field changed; Which fields? phải chọn từ dropdown

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:43.260Z · updatedAt: 2026-10-07T08:29:43.260Z

**Rule**: Panel Trigger có nhóm `Contacts` với 2 lựa chọn radio: **`Contact created`** / **`Contact field changed`**; badge `Not configured` / `Configured`. Đã chọn → hiện tên trigger + `Change trigger` + mô tả `Starts once, when a new contact is created.` / `Starts every time a contact field you pick changes.` `Contact field changed` có ô **`Which fields?`** (`Search fields, or leave empty for any field`) — **phải chọn từ dropdown** (First name · Last name · Country code · Address · SMS + custom key thô), không nhập tự do; để trống = mọi field. **Không có** biến / điều kiện "Changed fields" — hint trong panel nhắc tới "Changed fields" là copy sai. Chưa cấu hình, node trên canvas hiện **"Click to configure →"** (bản dựng thắng AC §5 — câu "Choose trigger" trong AC là bản cũ). Đã cấu hình, node hiện `This flow starts when a new contact is created` / `This flow starts every time a contact field changes`.

**Thay rule cũ (18/09/2026)**: 2 lựa chọn dạng card **Contact created** / **Contact updated**, node đã cấu hình "…when a contact is updated".

**Ảnh hưởng khi test**: staging 01/10 vẫn thấy nhóm `What changed` › `Changed fields` trong menu biến khi dùng trigger `Contact field changed` — trái rule "không có Changed fields", ghi fail kèm nghi vấn bug.

**Nguồn**: MTRO-33 AC §5; chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-748); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11, L58); PO/BA 02/10/2026 qua QA Hub MTRO-018 BR-31, BR-34 — cập nhật lần cuối 2026-10-07

## KB-132 — Conditional split hỗ trợ nhiều điều kiện (Add condition, Match all/any) và luôn có 2 nhánh True / False

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:43.741Z · updatedAt: 2026-10-07T08:29:43.741Z

**Rule**: Panel split có mô tả "Checked once, when the contact reaches this step. It doesn't watch for changes. Contacts matching this condition go down the True branch, everyone else goes down False." Mỗi dòng điều kiện: `Choose a variable` (**không prefill**) · `Operator` (disabled với `Choose a variable first` tới khi chọn biến) · `Value` + `Compare against a literal or a variable` · `Remove this condition`; nút **`Add condition`**; từ 2 dòng trở lên có combobox `Match` {`all of these`, `any of these`}. Đây là bản **multi-condition**, thay cho câu "đúng 1 điều kiện" ở AC §6. Operator text: `Equal to` · `Not equal to` · `Includes` · `Does not include` · `Starts with` · `Ends with` · `Is empty` · `Is not empty`; ngày (`Created at`): `After` (mặc định) · `Before` · `Between` · `Is empty` · `Is not empty`, value là nút `Pick a date` — cùng ngữ nghĩa operator với segment builder. Menu biến nhóm `Contact`: Email address · First name · Last name · Country code · SMS · Address · Created at + custom key thô. Chưa có trigger → "Choose a trigger first — which fields a split can compare depends on what starts the flow." Split luôn có 2 nhánh **True** và **False**; trên canvas connector mỗi nhánh có badge màu riêng (True = emerald, False = rose) ở gần đầu nhánh, nút "+" nằm phía dưới.

**Thay rule cũ (18/09/2026)**: nút `Add filter`; dòng mới prefill `Field` = `Email`, `Operator` = `Equals`; nút `And` / `Or`; `Between` là một tag-input `Add a value and press Enter`, node `{field} is between {mốc 1}, {mốc 2}`.

❓ **Chưa chốt** — hint "A split needs at least one step under True or False" không có trong AC: xem `open-questions/MTRO.md` § "Split rỗng bị chặn bằng hint không có trong AC (R39)".

**Nguồn**: MTRO-33 AC §6 (phần 2 nhánh); chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-759, TC-MTRO-765); editor mới theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11, L57); ngữ nghĩa operator chung với segment — Dev 02/10/2026 qua QA Hub MTRO-011 BR-22 — cập nhật lần cuối 2026-10-07

## KB-133 — Step Send email Configured khi đủ template + Subject + From email; From email ngoài domain verified vẫn gửi qua shared host

status: active · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:44.243Z · updatedAt: 2026-10-07T08:29:44.243Z

**Rule**: Content chọn qua picker "Choose an email" (grid từ template library) — dialog **không có ô search, không phân trang**. Chưa chọn hiện "Choose an email", đã chọn thì nút đổi thành tên template. `Subject line *` (bắt buộc) và `Preview text` là ô text thường. **`From name` / `From email *` là 2 ô text tự nhập, rỗng sẵn, không prefill default sender** (AC §7 mô tả dropdown là bản cũ); thêm `Reply-to` và combobox `Email preferences page`. Configured = đủ **template + Subject + From email**; From email thuộc domain chưa verify vẫn được tính Configured. **From email ngoài domain verified (kể cả workspace chưa có domain nào) vẫn gửi được qua shared sending host** — không chặn ở Save / Activate / runtime. Node trên canvas giữ nhãn `Not configured yet` và chỉ hiện tên template + dòng subject **sau khi** step đã Configured.

**Ảnh hưởng khi test**: helper dưới ô From email "Must be on one of your workspace's verified sending domains." lệch quyết định gửi qua shared host — không coi helper là rule; BUG-51 phần "vẫn gửi được" không còn là bug.

**Nguồn**: MTRO-33 AC §7 (phần picker/Subject); chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-770, 771, 772, 774); PO/BA 02/10/2026 qua QA Hub MTRO-018 BR-27 (gửi qua shared sending host) — cập nhật lần cuối 2026-10-07

## KB-134 — Step Update contact field Configured khi đủ Contact field + New value; New value không validate theo kiểu field

status: draft · tag: Automation builder · sourceUrl: https://ownego.atlassian.net/browse/MTRO-33 · createdAt: 2026-10-07T08:29:44.752Z · updatedAt: 2026-10-07T08:29:44.752Z

**Rule**: Step tên `Update contact field` (palette "Set a contact field"). Ô `Contact field` (`Choose a contact field`) gồm First name · Last name · Country code · Address · SMS + custom key thô — **không có** Email, Created at; New value (`e.g. vip`) là ô text tự do có `Add variable` (chọn `SMS` thì thành ô số điện thoại, mặc định Afghanistan +93). Configured = cả 2 đều đã đặt. **New value không validate theo kiểu field** (phone sai, Boolean ngoài true/false vẫn nhận), step vẫn Configured. **Giá trị toàn khoảng trắng được chấp nhận** — lưu nguyên, không trim, không cảnh báo, badge vẫn `Configured`, node hiện `{field} =` với phần giá trị trắng. Merge tag gõ vào New value (ví dụ `{{email}}`) được lưu nguyên văn, không có hint *(câu này ❓ đang tranh chấp — xem dòng ❓ dưới)*.

**Thay rule cũ (18/09/2026)**: tên `Update contact attribute` / `Update property`, ô `Attribute` là dropdown chỉ lấy custom attributes của workspace (29/09 tên trung gian `Update custom field`).

**Ảnh hưởng khi test**: staging 27/09 — giá trị toàn khoảng trắng sau Save + reload thành trống, badge `Not configured` (TC-MTRO-1052) → trái rule, ghi fail. Staging 01/10: tag hai ngoặc thiếu ngoặc bị chặn ("This field has a tag that can't be read…", Save / Activate disabled), một ngoặc `{x}` coi là chữ thường.

❓ **Đang tranh chấp** — cú pháp merge tag: PO/BA 02/10 (MTRO-018 BR-30) + staging 01/10 dùng **hai ngoặc** `{{contact.<field>}}` và chặn tag hỏng, còn MTRO-92 §10 ghi **một ngoặc** `{contact.first_name}` và từ chối `{{…}}`; dữ liệu một ngoặc giai đoạn 29/09 không migrate: xem `open-questions/MTRO.md` § "Cú pháp merge tag một ngoặc hay hai ngoặc".

**Nguồn**: MTRO-33 AC §8; chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-782); tên UI + danh sách field theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11, L01); PO/BA 02/10/2026 qua QA Hub MTRO-018 BR-32 (không validate theo kiểu) — cập nhật lần cuối 2026-10-07

## KB-135 — Builder automation: Save và Activate disabled khi thiếu trigger, thiếu step hoặc còn step Not configured; tên rỗng bị chặn

status: active · tag: Automation builder · sourceUrl: — · createdAt: 2026-10-07T08:29:45.236Z · updatedAt: 2026-10-07T08:29:45.236Z

**Rule**: Builder disable `Save` (và `Activate`) khi flow thiếu trigger, thiếu step, hoặc còn bất kỳ step nào `Not configured` — hint header chỉ ghi chung `Some steps are missing their settings`, **không** nêu tên node thiếu. Dialog Edit automation cũng chặn tên rỗng / toàn khoảng trắng (`Save` disabled, không gửi request). Hệ quả cho QA: **không tồn tại** flow đã lưu mà chưa đủ điều kiện Activate, và không dựng được qua UI các precondition kiểu "flow đã lưu còn step Not configured" hay "automation tên rỗng".

**Nguồn**: chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-710, 740, 811, 866) — cập nhật lần cuối 2026-09-18

## KB-136 — Sửa flow đang Active rồi Save thì ghi đè ngay (PUT 200), không cảnh báo, không có draft / version

status: active · tag: Automation builder · sourceUrl: — · createdAt: 2026-10-07T08:29:45.905Z · updatedAt: 2026-10-07T08:29:45.905Z

**Rule**: Flow đang `Active`, sửa node rồi `Save` → `PUT …/automations/{id}` trả 200 ngay, **không cảnh báo, không tạo bản draft hay version**, badge vẫn `Active`. Thay đổi áp dụng luôn cho contact đang chạy trong flow. Mailtro **không có** mô hình draft/publish cho automation.

❓ **Chưa chốt** — staging 27/09 thay đổi **không** áp cho contact đang Waiting (chạy theo cấu hình lúc vào flow, TC-MTRO-1125): xem `open-questions/MTRO.md` § "Sửa flow Active có áp dụng cho contact đang Waiting không".

**Nguồn**: chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-801) — cập nhật lần cuối 2026-10-07 (thêm dòng ❓, nội dung rule giữ nguyên 18/09)

## KB-137 — Automation mới phải Save lần đầu mới có nút Test và View runs — không dry-run được flow chưa lưu

status: active · tag: Automation builder · sourceUrl: — · createdAt: 2026-10-07T08:29:46.387Z · updatedAt: 2026-10-07T08:29:46.387Z

**Rule**: Ở `/automations/new`, header chỉ có `Save` và `Activate`. Sau lần `Save` đầu (`POST …/automations` trả 201) mới xuất hiện `View runs` và `Test` — tức là **không dry-run được flow chưa lưu**.

**Nguồn**: chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-810) — cập nhật lần cuối 2026-09-18

## KB-138 — Step Update contact field của automation cũng kích hoạt trigger Contact field changed; re-entry once cho cùng flow

status: active · tag: Runtime engine · sourceUrl: https://ownego.atlassian.net/browse/MTRO-13 · createdAt: 2026-10-07T08:29:46.835Z · updatedAt: 2026-10-07T08:29:46.835Z

**Rule**: Step `Update contact field` (tên cũ `Update property`) ghi field lên contact **cũng phát event contact-updated**, nên một flow có trigger `Contact field changed` chạy được vì automation khác vừa ghi field, chứ không chỉ khi người dùng sửa contact — kể cả với contact vừa được tạo. Re-entry once vẫn đúng: sửa cùng một contact nhiều lần không tạo thêm run cho flow đó.

**Thay rule cũ (18/09/2026)**: chỉ đổi tên — step `Update property`, trigger `Contact updated` (staging 01/10 là `Update contact field` / `Contact field changed`); hành vi giữ nguyên.

❓ **Chưa chốt** — staging 27/09 re-entry once không giữ (3 lần sửa → 3 run, TC-MTRO-1116, 1107): xem `open-questions/MTRO.md` § "Re-entry once không giữ trên staging".

**Nguồn**: GAP-06 của bản phân tích MTRO-13 (task QA Hub MTRO-017); chốt bởi QA (Nga) ngày 2026-09-18 sau buổi rà case blocked task QA Hub MTRO-017, đối chiếu staging `qa-workspace.wisle.app` 2026-09-16 (TC-MTRO-841); tên UI theo staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.11) — cập nhật lần cuối 2026-10-07

## KB-139 — Trang Contacts: search theo email và tên, bảng có cột Consent, không có checkbox / bulk action; search phải ra cả contact Unsubscribed

status: active · tag: Create contact · sourceUrl: https://ownego.atlassian.net/browse/MTRO-23 · createdAt: 2026-10-07T08:29:47.359Z · updatedAt: 2026-10-07T08:29:47.359Z

**Rule**: h1 `Contacts`, subtitle `{count} contacts` (đếm theo kết quả search); nút `Export`, `Import` (→ `/contacts/import`), `New contact` (mở dialog tạo contact). `Search contacts...` tìm theo email (đủ hoặc một phần) **và theo tên**; không khớp → `No contacts match your search` / "Try a different email or name." Bảng: `Email` · `First name` · `Last name` · `Consent` (`Subscribed` / `Unsubscribed`) · `Created at` ↕ · `Updated at` ↕ · `Actions` (`Edit` · `Delete`); mặc định sort `Created at` giảm dần; **không có checkbox / bulk action**. Click một dòng mở trang chi tiết contact. Phân trang 25 dòng/trang. Search **phải** trả cả contact Unsubscribed.

**Thay rule cũ (15/09/2026)**: header "All Contacts", search **chỉ theo email**, bảng 6 cột có checkbox, chọn được tất cả hoặc từng dòng.

**Ảnh hưởng khi test**: search hiện **không** ra contact Unsubscribed kể cả gõ đủ email — PO/BA + Dev 02/10 xác nhận là lỗi, retest 06/10 vẫn REOPENED. Gốc ở `ContactsResource::baseQuery` → sửa có thể ảnh hưởng segment count, chạy kèm regression segment.

**Nguồn**: MTRO-23 (Functional scope); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.3, L13); QA Hub MTRO-010 BR-04, BR-13 (PO/BA + Dev 02/10/2026) — cập nhật lần cuối 2026-10-07

## KB-140 — New contact: Email bắt buộc, là định danh chính; format chặn bằng HTML5 lúc submit và BE 422

status: active · tag: Create contact · sourceUrl: https://ownego.atlassian.net/browse/MTRO-24 · createdAt: 2026-10-07T08:29:47.850Z · updatedAt: 2026-10-07T08:29:47.850Z

**Rule**: Trong dialog tạo contact, `email` là field bắt buộc và là định danh chính của contact; `Create contact` disabled khi Email trống. Format được chặn ở **2 tầng**: HTML5 `<input type="email">` lúc submit (tooltip trình duyệt, không có lỗi inline khi rời ô) và BE → 422 `The email field must be a valid email address.` ở khung đỏ đầu dialog; `a@b` qua được cả 2 tầng. Email trùng → `The email has already been taken.`; tối đa 255 ký tự. First name (`FIRSTNAME`), Last name (`LASTNAME`) là optional.

**Thay rule cũ (15/09/2026)**: "validate đúng format email trước khi submit" (không nói tầng nào — staging 01/10 nút vẫn enable với `not-an-email`).

**Nguồn**: MTRO-24 AC; Dev 02/10/2026 qua QA Hub MTRO-010 BR-17 — cập nhật lần cuối 2026-10-07

## KB-141 — Contact vừa tạo hiện trong danh sách với giá trị Created at và Updated at

status: active · tag: Create contact · sourceUrl: https://ownego.atlassian.net/browse/MTRO-24 · createdAt: 2026-10-07T08:29:48.459Z · updatedAt: 2026-10-07T08:29:48.459Z

**Rule**: Tạo thành công thì contact hiện trong danh sách contact, có giá trị ở 2 cột `Created at` và `Updated at`.

**Nguồn**: MTRO-24 AC — cập nhật lần cuối 2026-09-15

## KB-142 — Dialog New contact gồm Email, First name, Last name, Country, Address, SMS, Custom fields (bản dựng là chuẩn, thay AC MTRO-24)

status: active · tag: Create contact · sourceUrl: https://ownego.atlassian.net/browse/MTRO-24 · createdAt: 2026-10-07T08:29:48.896Z · updatedAt: 2026-10-07T08:53:56.726Z

**Rule**: Bản dựng staging là chuẩn. Dialog `New contact` / "Add a contact to this workspace." gồm `Email`, `First name`, `Last name`, `Country` (`Select a country`, tìm `Search countries...`), `Address`, `SMS` (combobox quốc gia mặc định **Afghanistan +93** là chủ ý; lưu E.164) và khối `Custom fields` › `Add field` (mỗi dòng: `key` · `Kind of value` {Text, Number, Boolean, Date, Datetime} · value · `Remove field`). Custom field để trống: client gửi `""`, server lưu `null`, key vẫn giữ. Hai dòng cùng key: không chặn, dòng sau ghi đè. Tag contact **ngoài phạm vi** (không có UI gán tag).

**Khối Custom fields — đúng thiết kế (xác nhận 07/10/2026)**: dialog **không hiện sẵn** custom field nào của workspace; user tự chọn từng field qua `Add field`. Dropdown `key` khi **chưa gõ** chỉ liệt kê **tối đa 20** custom field; field ngoài 20 mục đó tìm được bằng cách **gõ tên** vào ô key. Không coi "dialog không hiện đủ CF" hay "dropdown chỉ 20/N field" là bug (đóng mục #7 thread Slack segment).

**Thay rule cũ (15/09/2026)**: "theo AC, dialog phase này chỉ hiển thị 3 field Email, First name, Last name" — ⚠ AC MTRO-24 trên Jira chưa cập nhật.

**Nguồn**: MTRO-24 AC + comment thuongnth/Ashley 04/08/2026; PO/BA 02/10/2026 qua QA Hub MTRO-010 BR-09, BR-10, BR-15; PO/Dev 01/10/2026 qua QA Hub MTRO-022 BR-11, BR-12; khối Custom fields / giới hạn 20: xác nhận 07/10/2026, thread Slack https://ownego.slack.com/archives/C0ABSKVFY8G/p1789357469953259 (mục #7) — cập nhật lần cuối 2026-10-07

## KB-143 — Số ở ô SMS sai định dạng thì FE báo nguyên văn "Phone is invalid" (nhãn ô vẫn là SMS)

status: active · tag: Create contact · sourceUrl: — · createdAt: 2026-10-07T08:29:49.321Z · updatedAt: 2026-10-07T08:29:49.321Z

**Rule**: Khi số ở ô `SMS` sai định dạng (dialog New / Edit contact), FE hiện nguyên văn `Phone is invalid` lúc rời ô và khoá nút lưu; nhãn ô vẫn là `SMS`. Message BE không đổi (`Enter a valid SMS number with its country code…`). Kiểm số bằng libphonenumber ở cả FE và BE, hợp lệ theo từng nước; tối đa 32 ký tự.

**Thay rule cũ (05/10/2026)**: phần "thông báo lỗi validate số điện thoại cũng dùng chữ SMS" trong QA Hub KB-004.

**Nguồn**: Dev chốt qua QA lead (Nga) 06/10/2026 — QA Hub MTRO-010 BR-27; Dev 02/10/2026 qua MTRO-010 BR-18 (libphonenumber, 32 ký tự) — cập nhật lần cuối 2026-10-07

## KB-144 — Số contact của segment là đánh giá live, tự cập nhật khi attribute contact đổi, không phải snapshot

status: draft · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-27 · createdAt: 2026-10-07T08:29:49.841Z · updatedAt: 2026-10-07T08:34:28.704Z

**Rule**: Cột Contacts (badge, ví dụ "2 contacts") phản ánh kết quả đánh giá **hiện tại** của điều kiện segment, không phải số chụp tại lúc lưu. Membership tự cập nhật khi attribute của contact thay đổi.

❓ **Đang mâu thuẫn** với KB-151 ("bộ đếm chỉ cập nhật khi bấm Run" — PO/BA 02/10/2026, MTRO-011 BR-27). Có thể hai rule nói hai chỗ khác nhau (cột Contacts ở danh sách vs badge trong builder) — chờ chốt, chuyển draft 07/10/2026.

**Nguồn**: MTRO-27 — cập nhật lần cuối 2026-09-15

## KB-145 — Danh sách Segments: cột Name / Conditions / Contacts / Created, giữ dạng "1 conditions", menu có Export CSV

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-27 · createdAt: 2026-10-07T08:29:50.403Z · updatedAt: 2026-10-07T08:29:50.403Z

**Rule**: Header "Segments" / "Live audiences built from contact conditions — no lists to maintain." + nút **Create segment** → `/segments/new`; không có search / filter. Bảng gồm Name, Conditions (số điều kiện, ví dụ "3 conditions"; **giữ dạng `1 conditions` / `1 contacts`, không sửa số ít**), Contacts (ô trống / `—` khi count chưa về hoặc lỗi), Created (ngày giờ tuyệt đối, ví dụ "Jul 7, 2026, 4:02 PM") và cột menu `...` không nhãn (`Edit` · `Duplicate` · `Export CSV` · `Delete`; `Export CSV` mở dialog Export contacts chọn sẵn `Contacts in a segment`). Chưa có segment nào → empty state "No segments yet" + "Create your first segment — membership updates automatically as contact attributes change." + nút Create segment. Click dòng hoặc Enter → mở builder ở chế độ edit; click menu `...` không kích hoạt điều hướng của dòng.

**Thay rule cũ (15/09/2026)**: Conditions "xử lý đúng số ít/số nhiều"; subtitle "Live audiences built from contact conditions."; menu không có `Export CSV`.

**Nguồn**: MTRO-27 (Layout); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.4); PO/BA 02/10/2026 qua QA Hub MTRO-011 BR-13 (Export CSV), BR-17 (giữ `1 conditions`) — cập nhật lần cuối 2026-10-07

## KB-146 — Duplicate segment clone cây điều kiện sang segment id mới, tên thêm " (copy)"

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-27 · createdAt: 2026-10-07T08:31:32.442Z · updatedAt: 2026-10-07T08:31:32.442Z

**Rule**: Row action **Duplicate** clone cây điều kiện của segment sang một segment có **id mới**, tên thêm hậu tố " (copy)", toast "Segment duplicated".

**Nguồn**: MTRO-27 — cập nhật lần cuối 2026-09-15

## KB-147 — Delete segment chỉ xoá query đã lưu, không xoá hay sửa contact nào, phải qua dialog xác nhận

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-27 · createdAt: 2026-10-07T08:31:32.984Z · updatedAt: 2026-10-07T08:31:32.984Z

**Rule**: Row action **Delete** (tách riêng, kiểu destructive) mở dialog xác nhận: tiêu đề `Delete "{segment name}"?`, nội dung "This deletes the saved query only — no contacts are affected. This can't be undone.", nút Cancel / Delete. Xác nhận → toast "Segment deleted". Contact thuộc segment không bị xoá hay thay đổi.

**Nguồn**: MTRO-27 (Delete confirmation) — cập nhật lần cuối 2026-09-15

## KB-148 — Segment builder: tạo mới có sẵn 1 dòng điều kiện trống; sửa thì load cây đã lưu và lưu bằng PUT

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-53 · createdAt: 2026-10-07T08:31:33.497Z · updatedAt: 2026-10-07T08:31:33.497Z

**Rule**: Create → `/segments/new`, builder rỗng, có sẵn **1 dòng điều kiện trống**, tên mặc định "Untitled segment" (ô tên sửa inline). Edit (click dòng hoặc action Edit ở list) → `/segments/:id/edit`, load cây điều kiện, tên và sort đã lưu. Lưu thay đổi của segment có sẵn gọi `PUT /segments/{id}` (không phải PATCH).

**Nguồn**: MTRO-53 (Entry points); method PUT do BE chốt, ghi nhận ở lượt chạy manual 08/09/2026 (task QA Hub MTRO-011) — cập nhật lần cuối 2026-09-15

## KB-149 — Segment builder: điều kiện trong cùng card nối AND, giữa các card nối OR

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-53 · createdAt: 2026-10-07T08:31:34.037Z · updatedAt: 2026-10-07T08:31:34.037Z

**Rule**: Mỗi nhóm điều kiện là một card có viền. Điều kiện trong cùng card nối **AND** (có rail nối khi từ 2 điều kiện); các card khác nhau nối **OR** (pill "Or" giữa 2 card). Mỗi điều kiện = Field → Operator → Value + nút xoá (×). "+ And" thêm điều kiện vào card đó; "+ Or" thêm một card mới. Xoá điều kiện cuối cùng của card thì card tự biến mất.

**Nguồn**: MTRO-53 (Condition editor: Default view) — cập nhật lần cuối 2026-09-15

## KB-150 — Segment builder: Advanced (pseudo-SQL) chỉ là cách hiển thị khác của cùng dữ liệu; toggle đang ẩn tạm

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-53 · createdAt: 2026-10-07T08:31:34.585Z · updatedAt: 2026-10-07T08:31:34.585Z

**Rule**: Toggle **Advanced** chuyển giữa cây trực quan và dạng pseudo-SQL (`FROM contacts` / `WHERE (...)` / `OR (...)`, monospace, có syntax highlight, số dòng, nút × khi hover từng dòng). Hai chế độ là hai cách thể hiện của **cùng một dữ liệu**.

**Hiện trạng (Dev 02/10/2026)**: toggle Advanced đang **ẩn tạm** (`display: none`); khi card editor không đọc được query, builder tự chuyển sang Advanced và không có nút quay lại → case bật/tắt Advanced chưa chạy được qua UI.

**Nguồn**: MTRO-53 (Toolbar, Advanced view); Dev 02/10/2026 qua QA Hub MTRO-011 BR-20 — cập nhật lần cuối 2026-10-07

## KB-151 — Segment builder: bộ đếm chỉ cập nhật khi bấm Run; bảng kết quả 6 cột có Consent

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-53 · createdAt: 2026-10-07T08:31:35.100Z · updatedAt: 2026-10-07T08:31:35.100Z

**Rule**: Toolbar hiện chấm xanh + badge `~N contacts` + `X.XX% of your contact base`; **bộ đếm chỉ cập nhật khi bấm `Run`** — đổi điều kiện không tự tính lại. Nút **Run** chạy đánh giá và hiện toast `Segment evaluated` + "{count} contacts match right now.". Bảng kết quả liệt kê contact khớp: `Email` · `First name` · `Last name` · `Consent` · `Created at` ↕ · `Updated at` ↕, có phân trang; vì segment chỉ gồm contact Subscribed nên cột `Consent` luôn là `Subscribed`. Không có ai khớp → `No contacts match` / `Loosen the conditions above.`. Khối "Refine your segment" **ngoài phạm vi MTRO-53**.

**Thay rule cũ (15/09/2026)**: badge "tính lại khi điều kiện đổi"; bảng 4 cột (Email, First Name, Last Name, Created At); empty "No contacts match."; "Refine your segment" là placeholder "Coming soon".

**Nguồn**: MTRO-53 (Toolbar, Results table); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.4); PO/BA 02/10/2026 qua QA Hub MTRO-011 BR-12 (chỉ Subscribed), BR-18 (Refine ngoài phạm vi), BR-27 (đếm khi Run — hỏi lại lần 2) — cập nhật lần cuối 2026-10-07

## KB-152 — Segment builder: Save chỉ enable khi có tên, có điều kiện, có thay đổi và không còn Value trống; tên không bắt buộc unique

status: active · tag: Segment · sourceUrl: https://ownego.atlassian.net/browse/MTRO-53 · createdAt: 2026-10-07T08:31:35.707Z · updatedAt: 2026-10-07T08:31:35.707Z

**Rule**: Save chỉ enable khi tên không rỗng **và** có ít nhất 1 điều kiện **và** có thay đổi so với lúc load **và** không còn điều kiện nào để trống Value. Segment mới có sẵn 1 điều kiện trống nên Save **disabled** tới khi điền Value. Segment có sẵn: Save disabled cho tới khi thật sự có thay đổi. Tên segment **không bắt buộc unique** trong workspace.

**Thay rule cũ (15/09/2026)**: "Segment mới đã có sẵn 1 điều kiện trống nên Save enable gần như ngay lập tức".

**Ảnh hưởng khi test**: BUG-CS-11 / BUG-97 (Save tạo segment rác `Untitled segment`) — staging 01/10 đã thấy Save disabled, cần chạy lại TC-SEGMENT-042 để đóng.

❓ **Chưa chốt** — tên trùng thì picker Recipients / Export phân biệt 2 segment bằng gì: xem `open-questions/MTRO.md` § "Tên segment có unique trong workspace không (R41)".

**Nguồn**: MTRO-53 (Toolbar, Save flow); PO/BA 02/10/2026 qua QA Hub MTRO-011 BR-14 (tên không unique), BR-16 (Save disabled khi Value trống) — cập nhật lần cuối 2026-10-07

## KB-153 — Send campaign trỏ segment có query hỏng: BE chạy lại query lúc gửi, lỗi thì rollback và campaign giữ Draft

status: active · tag: Segment · sourceUrl: — · createdAt: 2026-10-07T08:31:36.279Z · updatedAt: 2026-10-07T08:31:36.279Z

**Rule**: Segment có count lỗi vẫn chọn được ở bước Recipients (FE không chặn `Send`, ô số chỉ hiện `—`). Lúc Send, BE chạy lại query của segment; query lỗi → rollback, campaign giữ `Draft`, sheet báo `Couldn't start this send`. Ngoại lệ: count trả 500 do lỗi tạm thời thì vẫn gửi. Cách tái hiện segment hỏng: field Number chứa giá trị chữ + operator `Greater than` / `Less than` / `Between` (cast `::numeric`).

**Nguồn**: Dev 02/10/2026 qua QA Hub MTRO-011 BR-25 (trả lời open question R42) — cập nhật lần cuối 2026-10-07

## KB-154 — Danh sách Campaigns: search theo tên, filter Status 8 mục và filter Folder ghép AND

status: active · tag: Campaign list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-28 · createdAt: 2026-10-07T08:31:36.859Z · updatedAt: 2026-10-07T08:31:36.859Z

**Rule**: Route `/campaigns`. Header "Campaigns" / "Create, schedule, and track email campaigns sent to your contacts." với 2 action: **Create folder** (secondary, mở dialog tạo folder) và **New campaign** (primary, mở Campaign Builder). Toolbar: search theo tên campaign; filter **Status** 8 mục (`All statuses` · `Draft` · `Scheduled` · `Running` · `Sent` · `Partly sent` · `Cancelled` · `Failed`); filter **Folder** (`All folders` / `Ungrouped` / từng folder). Search + 2 filter ghép AND.

**Thay rule cũ (15/09/2026)**: filter Status chỉ có All / Draft / Scheduled / Sent.

**Ảnh hưởng khi test**: ý nghĩa `Partly sent` / `Cancelled` / `Failed` chưa có AC (GAP-02 task QA Hub MTRO-012) — chỉ test lọc đúng theo nhãn, không tự suy diễn khi nào campaign vào các status này.

**Nguồn**: MTRO-28 (Layout); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-A, L73) — cập nhật lần cuối 2026-10-07

## KB-155 — Bảng campaign có cột Recipients / Delivered / Opened / Status / Sent, hiện "-" khi trống, bulk bar Delete / Add to folder

status: active · tag: Campaign list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-28 · createdAt: 2026-10-07T08:31:37.309Z · updatedAt: 2026-10-07T08:31:37.309Z

**Rule**: Cột: checkbox, **Campaign** (tên), **Recipients** (số lượng, hiện "-" khi chưa có), **Delivered**, **Opened**, **Status** (badge), **Sent** (ngày gửi hoặc "-"), row actions `...`. Chọn tất cả / từng dòng → hiện **bulk action bar** gồm Delete, Add to folder. Không có kết quả → "No campaigns match your filters" + "Try a different search, status, or folder.". Phân trang ở cuối: rows per page 10/20/50/100 + nhảy tới trang + prev/next.

**Nguồn**: MTRO-28 (Body table) — cập nhật lần cuối 2026-09-15

## KB-156 — Click dòng campaign Draft / Scheduled mở builder, Sent / Running mở report

status: active · tag: Campaign list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-28 · createdAt: 2026-10-07T08:31:37.839Z · updatedAt: 2026-10-07T08:31:37.839Z

**Rule**: Status gồm Draft, Scheduled, Sent và **Running** (badge chấm xanh, bổ sung 11/08); staging 01/10 còn có `Partly sent`, `Cancelled`, `Failed` trong filter (chưa có AC). Dòng `draft` / `scheduled` → mở campaign builder (Draft → `/campaigns/:id/details`). Dòng `sent` / `running` → mở report (Sent → `/campaigns/:id/report`). (Bản cập nhật 11/08 thay cho câu cũ "Row is only clickable when status = sent".)

**Thay rule cũ (15/09/2026)**: "(và action Edit) → mở builder" và "ẩn Edit khỏi menu" — staging 01/10 menu dòng không còn mục `Edit` ở bất kỳ status nào (xem rule Row actions).

**Nguồn**: MTRO-28 — mục cập nhật 11/08/2026 trong description; staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-A, L20, L73) — cập nhật lần cuối 2026-10-07

## KB-157 — Menu dòng campaign theo status (không có Edit, Preview/Test); Duplicate tạo "{name} (copy)" và để trống content

status: active · tag: Campaign list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-28 · createdAt: 2026-10-07T08:31:38.363Z · updatedAt: 2026-10-07T08:31:38.363Z

**Rule**: Menu `...` của dòng theo status — Draft: **Duplicate**, **Add to folder**, **Delete**; Sent: **Duplicate**, **Add to folder** (không Delete); Scheduled (theo bundle, chưa đối chiếu UI) thêm `Reschedule` · `Unschedule`. **Không có** `Preview/Test` và `Edit` trong menu. Duplicate tạo campaign mới tên **`{name} (copy)`** (nhân tiếp `(copy) (copy)`), toast `Duplicated as "{name}"`, status = draft, copy toàn bộ (subject, sender, segment) **trừ content — để trống** (`mail_template: null`, mở thẳng bước `/content`).

**Thay rule cũ (15/09/2026)**: menu 5 mục Preview/Test · Edit · Duplicate · Add to folder · Delete; tên bản sao "Copy of {name}".

**Nguồn**: MTRO-28 (Row actions + mục cập nhật 11/08/2026); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-A, L20, L66); content để trống xác nhận lại trên staging 27/08/2026 — cập nhật lần cuối 2026-10-07

## KB-158 — Xoá campaign (một hoặc nhiều) phải qua dialog xác nhận, không hoàn tác được

status: active · tag: Campaign list · sourceUrl: https://ownego.atlassian.net/browse/MTRO-28 · createdAt: 2026-10-07T08:31:39.073Z · updatedAt: 2026-10-07T08:31:39.073Z

**Rule**: Xoá 1 campaign: tiêu đề `Delete "{campaign name}"?`; xoá nhiều: `Delete N campaigns?`. Nội dung "This can't be undone.", nút Cancel / Delete, xoá xong có toast xác nhận.

❓ **Chưa chốt** — bulk Delete khi tập chọn có campaign Sent, và xoá folder đang chứa campaign: xem `open-questions/MTRO.md` § "Bulk Delete campaign có lẫn campaign Sent" và § "Xoá folder đang chứa campaign".

**Nguồn**: MTRO-28 (Delete confirmation) — cập nhật lần cuối 2026-09-15

## KB-159 — Wizard campaign 4 bước, mỗi bước chỉ done khi đủ field bắt buộc

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:39.576Z · updatedAt: 2026-10-07T08:31:39.576Z

**Rule**: Stepper bên trái 4 bước, mỗi bước có trạng thái done / active / upcoming. Bước chỉ tính là done khi đủ field bắt buộc: **1. Campaign details** — có Campaign name + Subject line; **2. Sender** — cấu hình danh tính người gửi; **3. Recipients** — đã chọn segment; **4. Contents** — đã chọn template.

**Nguồn**: MTRO-29 (Stepper) — cập nhật lần cuối 2026-09-15

## KB-160 — New campaign mở /campaigns/new/details và chỉ tạo bản ghi khi Save; draft mở /campaigns/:id/details

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:40.045Z · updatedAt: 2026-10-07T08:31:40.045Z

**Rule**: "New campaign" ở list → `/campaigns/new/details`, builder rỗng ở bước 1, **chưa gọi API tạo** cho tới khi bấm `Save`; sau Save URL thành `/campaigns/:id/<bước>`. Mở campaign draft (click dòng) → `/campaigns/:id/details`, load draft đã lưu; mỗi bước có route riêng `/campaigns/:id/details` · `/sender` · `/recipients` · `/content`.

**Thay rule cũ (15/09/2026)**: "Edit" trên campaign draft/scheduled → `/campaigns/:id/edit/setup`.

**Nguồn**: MTRO-29 (Entry points); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-B, L73) — cập nhật lần cuối 2026-10-07

## KB-161 — Wizard campaign không auto-save; Preview & test và Send chỉ enable khi campaign đủ điều kiện gửi

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:40.491Z · updatedAt: 2026-10-07T08:31:40.491Z

**Rule**: Header dùng chung mọi bước: tên campaign (hoặc "New campaign") + badge Draft + status text. Action bên phải: **Save**, **Preview & test**, **Send**. **Không có auto-save** — phải bấm Save (PO đổi 11/08). Send disabled cho tới khi `canSendCampaign` = true; Preview/Send dùng được ở mọi bước khi campaign đã đủ điều kiện gửi.

**Nguồn**: MTRO-29 (Header) + comment thuongnth/Ashley 11/08/2026 (mục 1) — cập nhật lần cuối 2026-09-15

## KB-162 — Wizard bước 1: Campaign name và Subject line bắt buộc có dấu *, không có field Folder

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:41.031Z · updatedAt: 2026-10-07T08:31:41.031Z

**Rule**: Field: `Campaign name *` ("Internal only — recipients never see this."), `Subject line *` (≤255 ký tự), `Preview text`. Campaign name và Subject line là bắt buộc, có dấu `*`. **Không có field Folder** ở bước này — folder chỉ gán qua `Add to folder` ở danh sách campaign. Nút `Back` / **Next: Sender →**.

**Thay rule cũ (15/09/2026)**: bước 1 có field Folder (chọn folder hoặc để Ungrouped).

**Nguồn**: MTRO-29 (Step 1) + comment thuongnth/Ashley 11/08/2026 (mục 2); staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-B, L19) — cập nhật lần cuối 2026-10-07

## KB-163 — Wizard bước 2 Sender: Reply-to tuỳ chọn, mặc định bằng From email

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:41.508Z · updatedAt: 2026-10-07T08:31:41.508Z

**Rule**: Field: From name, From email, Reply-to. Reply-to là tuỳ chọn ghi đè, mặc định bằng From email. Nút **Next: Recipients →**.

**Nguồn**: MTRO-29 (Step 2) — cập nhật lần cuối 2026-09-15

## KB-164 — Wizard bước 3 Recipients: chỉ chọn đúng 1 segment, danh sách không hiện số contact từng segment

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:42.025Z · updatedAt: 2026-10-07T08:31:42.025Z

**Rule**: Heading "Send to". Picker chỉ chọn được **đúng 1 segment** (PO đổi từ multi-select sang single-select 11/08). Danh sách segment chỉ hiện tên, **bỏ helptext "X contacts"** (không đếm được ngay). Chưa có segment nào → empty state "There are no segments yet. Add a new segment to this folder to better manage your contacts." + nút "Create segment" điều hướng sang tạo segment.

❓ **Chưa chốt** — segment trùng tên không phân biệt được trong picker: xem `open-questions/MTRO.md` § "Tên segment có unique trong workspace không (R41)".

**Nguồn**: MTRO-29 (Step 3) + comment thuongnth/Ashley 11/08/2026 (mục 1, 3) — ⚠ description vẫn ghi multi-select — cập nhật lần cuối 2026-09-15

## KB-165 — Wizard bước 4 Contents: Choose email library / Create email library, đổi email chỉ qua Reset design

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-29 · createdAt: 2026-10-07T08:31:42.531Z · updatedAt: 2026-10-07T08:31:42.531Z

**Rule**: Empty state "Add email content to this campaign" / "Use an email you already have, or start a new one." có 2 nút: **`Choose email library`** (mở dialog chọn email design có sẵn, dùng ngay — lưới thẻ, không search, không phân trang) và **`Create email library`** (dialog "How do you want to start?" 2 lựa chọn: **Create from scratch** — tạo email mới rồi mở builder; **Duplicate design** — chọn một design có sẵn để duplicate rồi mở builder, bản sao tên `{name} (copy)`). Đã chọn thì hiện preview template kèm Subject / Preheader / From. Icon `...` (`Design actions`) cạnh nút "Edit design" có menu **Reset design** để quay về empty state và chọn design khác — đổi email chỉ qua Reset design.

**Thay rule cũ (15/09/2026)**: tên 2 nút `Choose from existing` / `Create new`.

**Ảnh hưởng khi test**: MTRO-99 (PO 30/09, In Progress) sẽ đổi tiếp thành `Choose a template` / `Create new template` khi deploy — case nên assert theo vai trò nút, cập nhật nhãn khi MTRO-99 lên staging.

**Nguồn**: MTRO-29 (Step 4) + comment thuongnth/Ashley 11/08/2026 (mục 4–6) — ⚠ description vẫn ghi "Duplicate design / Create design"; staging `qa-workspace.wisle.app` 01/10/2026 (`inventory/MTRO.md` § 2.10-B, L67); MTRO-99 description + comment PO 30/09/2026 — cập nhật lần cuối 2026-10-07

## KB-166 — Send now đổi status campaign sang sent; Schedule for later đã có trên staging (GMT+7, mốc :00 / :30)

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-59 · createdAt: 2026-10-07T08:31:43.062Z · updatedAt: 2026-10-07T08:31:43.062Z

**Rule**: Nút Send mở sheet "Send campaign" / "Choose when this campaign goes out." (tóm tắt Recipients / Subject / From). Lựa chọn **Send now** → status chuyển sang `sent`. Nút submit là **Send**, gửi xong có toast "Going out to {total} recipients." rồi chuyển sang report. **Schedule for later đã có trên staging**: "When should it go out?", `Pick a date and time` (lịch tháng + ô `Time`, "Times are in your timezone (GMT+7).", ngày quá khứ mờ, chỉ chọn mốc :00 / :30), nút `Schedule` disabled tới khi chọn đủ. "Send at local time per recipient timezone" vẫn là coming soon. Campaign là one-shot: gửi lại campaign đã `sent` → 403.

**Thay rule cũ (15/09/2026)**: "Schedule for later được đánh dấu [CONFIRMED LATER] — chưa phải rule của bản này (đang làm ở MTRO-84)".

**Ảnh hưởng khi test**: MTRO-84 (Schedule campaigns) đang QA Review nhưng description trống — giao diện Schedule lấy theo staging, hành vi sau khi đặt lịch (Reschedule / Unschedule, status Scheduled) chưa có AC. Không bấm Send / Schedule trên workspace dùng chung trừ khi được phép.

**Nguồn**: MTRO-59; staging `qa-workspace.wisle.app` 29/09/2026 (`inventory/MTRO.md` § 2.10-B, L21); gửi lại campaign `sent` → 403 quan sát 09/09/2026 (task QA Hub MTRO-015) — cập nhật lần cuối 2026-10-07

## KB-167 — Tạo và gửi campaign cần sẵn segment có contact và ít nhất 1 template — chuẩn bị trong Preconditions

status: active · tag: Campaign wizard · sourceUrl: https://ownego.atlassian.net/browse/MTRO-11 · createdAt: 2026-10-07T08:31:43.598Z · updatedAt: 2026-10-07T08:31:43.598Z

**Rule**: Tạo và gửi campaign cần sẵn data từ Contacts (segment có contact) và Templates (ít nhất 1 template). Khi test phase 3, phải chuẩn bị trước 2 loại data này trong Preconditions.

**Nguồn**: MTRO-11, MTRO-8, MTRO-15 — cập nhật lần cuối 2026-08-07

## KB-168 — Cách dựng dữ liệu test suppression tuỳ tầng test (E2E, integration, unsubscribe, API)

status: active · tag: Suppression · sourceUrl: — · createdAt: 2026-10-07T08:31:44.113Z · updatedAt: 2026-10-07T08:31:44.113Z

**Rule**:
- **E2E campaign**: tạo contact → segment → campaign có template có nội dung → send → quan sát event. Automations dùng flow/trigger tương ứng thay campaign.
- **Integration/unit**: dùng fixture DB hoặc event có attribution hợp lệ; nếu đi qua worker SNS thì envelope phải được SNS ký hợp lệ. Fixture này không chứng minh luồng gửi E2E.
- **Unsubscribe E2E**: gửi tới hộp thư QA rồi thao tác link unsubscribe; không đồng nhất unsubscribe với event bounce/complaint SES. Có thể seed ledger để kiểm API/downstream riêng.
- **API đọc/xoá**: dùng dữ liệu có sẵn hoặc seed; case Draft/tài liệu/cấu hình không cần send. Lỗi gửi không mặc định chặn toàn bộ epic.

**Nguồn**: hiệu chỉnh mâu thuẫn điều kiện test khi review `docs/manual-testcases/04-contacts/suppression.md`; không thay đổi chính sách sản phẩm. — cập nhật lần cuối 2026-09-08
