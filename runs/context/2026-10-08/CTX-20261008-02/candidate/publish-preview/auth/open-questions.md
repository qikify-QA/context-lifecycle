# Open Questions — Mailtro ID — đăng ký, xác minh email, tạo workspace đầu tiên, đăng nhập, 2FA, quên/đặt lại mật khẩu, chọn workspace và bảo mật tài khoản cá nhân (Account settings & 2FA)

Tổng: 42 mục. Sinh từ lần bootstrap đầu tiên (DOC_BOOTSTRAP) của Mailtro, ngày 2026-10-08.

- CONFLICT: 2
- NEEDS_CONFIRMATION: 26
- OPEN_ISSUE: 14

> Xung đột dùng chung nhiều object (CONF-MTRO-abuse-guard-01) được theo dõi ở **OQ-abuse-guard-001** trong open-questions của object `abuse-guard`; phía object này: KB-031, KB-032.

## OQ-auth-001 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-001",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Ma trận quyền cho các thao tác tài khoản Mailtro ID chưa được chốt: các màn đăng nhập / đăng ký / 2FA / quên mật khẩu diễn ra trước khi vào workspace nên tài liệu không ghi role; Account settings mới được khảo sát bằng Owner (và một lần ở workspace có role Member), role Admin chưa bao giờ được quan sát, tên role thứ ba (Member hay Marketer/Editor) còn tranh chấp. Cần PO/Dev xác nhận Account settings và 2FA có giống nhau với mọi role của workspace hay không.",
  "kb_ids": [
    "KB-102",
    "KB-103",
    "KB-137"
  ],
  "check_ids": [
    "account-security-settings:CHK-004"
  ],
  "related_questions": [
    "Account settings và các thao tác 2FA (bật, tắt, tạo lại recovery code, gửi link đặt lại mật khẩu) có giống nhau với mọi role của workspace (Owner, Admin, role thứ ba) không?",
    "Account settings và các thao tác 2FA có giống nhau với mọi role của workspace (Owner, Admin, role thứ ba) không?"
  ]
}
```

## OQ-auth-002 — CONFLICT

```json
{
  "oq_id": "OQ-auth-002",
  "type": "CONFLICT",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Vào workspace thứ hai trong cùng phiên có bị hỏi lại mật khẩu / 2FA không, và việc dùng chung phiên giữa các workspace có phải SSO cố ý không?",
  "kb_ids": [
    "KB-019",
    "KB-020"
  ],
  "side_a": "Trên staging ngày 23/09/2026, mở thẳng URL https://<slug>.wisle.app/ của workspace khác trong phiên đang đăng nhập thì vào được luôn, không hỏi lại mật khẩu hay 2FA (Inventory staging Mailtro \"Auth, khung app & Settings\" (01/10/2026) và QA KB Mailtro \"Mailtro ID (Auth)\" v1).",
  "side_b": "Test-run ngày 27/09/2026 (phiên trình duyệt tự động) ghi nhận đổi workspace qua workspace switcher thì bị bắt đăng nhập lại (QA KB Mailtro \"Mailtro ID (Auth)\" v1).",
  "conflict_group": "CONF-MTRO-auth-01",
  "related_questions": [
    "Khi đang có phiên, vào workspace thứ hai (mở thẳng URL subdomain hoặc qua workspace switcher) có phải bị hỏi lại mật khẩu / 2FA không, và việc dùng chung phiên giữa các workspace có phải SSO cố ý (cookie trên domain Mailtro ID) không?",
    "Khi đang có phiên, vào workspace thứ hai (mở thẳng URL hoặc qua workspace switcher) có bị hỏi lại mật khẩu / 2FA không, và việc dùng chung phiên giữa các workspace có phải SSO cố ý không?"
  ],
  "check_ids": [
    "sign-in-and-workspace-selection:CHK-013"
  ]
}
```

## OQ-auth-003 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-003",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Thời hạn phiên đăng nhập: Dev BE tăng lên 1 ngày (29/09/2026) và PO đồng ý (30/09/2026) qua comment Jira MTRO-106, nhưng ticket MTRO-106 vẫn To Do và description vẫn kỳ vọng phiên 1 tháng. Cần PO/Dev xác nhận 1 ngày là giá trị cuối cùng, cập nhật description ticket, và cho biết đã kiểm lại lỗi đăng xuất sau ~2 giờ sau khi deploy thay đổi chưa.",
  "kb_ids": [
    "KB-016",
    "KB-017"
  ],
  "related_questions": [
    "Thời hạn phiên 1 ngày có phải giá trị cuối cùng không (description Jira MTRO-106 vẫn ghi 1 tháng, ticket còn To Do), và lỗi bị đăng xuất sau khoảng 2 giờ đã được kiểm lại sau thay đổi 29/09/2026 chưa?"
  ]
}
```

## OQ-auth-004 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-004",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Mật khẩu chỉ gồm dấu cách (lỗi BUG-AUTH-06): cần Dev xác nhận tầng nào phải chặn (client, server, hay cả hai) và thông báo lỗi đúng là gì, để viết expected result thay cho hành vi hiện tại (UI báo \"Incorrect email or password.\").",
  "kb_ids": [
    "KB-023"
  ],
  "related_questions": [
    "Mật khẩu chỉ gồm dấu cách khi đăng nhập phải bị chặn ở tầng nào (client, server hay cả hai) và thông báo lỗi đúng là gì? Hiện server trả 422 nhưng UI báo \"Incorrect email or password.\".",
    "Mật khẩu chỉ gồm dấu cách phải bị chặn ở tầng nào (client, server hay cả hai) và thông báo lỗi đúng là gì?"
  ],
  "check_ids": [
    "sign-in-and-workspace-selection:CHK-010"
  ]
}
```

## OQ-auth-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-005",
  "type": "OPEN_ISSUE",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Theo dõi hồi quy các lỗi đã biết ở đăng nhập / chọn workspace (chưa dùng làm expected result): đăng xuất sau ~2 giờ (Jira MTRO-106); Sign out ở Choose a workspace có thể không huỷ phiên workspace (mới thấy 1 lần 23/09/2026, cần tái hiện); Back trình duyệt sau khi đăng nhập đứng ở form /login trống; mật khẩu toàn dấu cách báo sai loại lỗi (BUG-AUTH-06); APP_DEBUG từng lộ stack trace và nhánh 429 của /login chưa đo lại (BUG-AUTH-03); nút Sign in thiếu focus ring (BUG-AUTH-07); lỗi inline không được screen reader đọc (BUG-AUTH-11); document.title sai ở /signup và /verify (BUG-AUTH-10). Cần kiểm lại trạng thái từng lỗi trên bản dựng hiện tại.",
  "kb_ids": [
    "KB-003",
    "KB-017",
    "KB-021",
    "KB-022",
    "KB-023",
    "KB-024",
    "KB-025",
    "KB-026",
    "KB-027"
  ],
  "related_questions": [
    "Khi bị chặn do quá 10 lần đăng nhập trong một phút, màn /login phải hiển thị thông báo gì và nút Sign in có bị khoá trong thời gian chờ không?",
    "Sign out ở màn Choose a workspace (Mailtro ID) và Sign out trong app workspace (workspace switcher, user menu) phải huỷ phiên ở Mailtro ID, ở app workspace hay cả hai?",
    "Người đã đăng nhập mở /login hoặc bấm Back của trình duyệt sau khi đăng nhập thì phải được chuyển tới đâu (màn Choose a workspace, workspace gần nhất hay giữ form)?",
    "Sign out ở màn Choose a workspace và Sign out trong app workspace (switcher, user menu) huỷ phiên ở Mailtro ID, ở app workspace, hay cả hai?",
    "Khi /login trả 429 vì vượt giới hạn số lần đăng nhập, màn Sign in phải hiển thị thông báo gì và nút Sign in có bị khoá không?",
    "Người đã đăng nhập mở /login (hoặc bấm Back của trình duyệt sau khi đăng nhập) thì phải được chuyển đi đâu?"
  ],
  "check_ids": [
    "sign-in-and-workspace-selection:CHK-007",
    "sign-in-and-workspace-selection:CHK-012",
    "sign-in-and-workspace-selection:CHK-016"
  ]
}
```

## OQ-auth-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-006",
  "type": "OPEN_ISSUE",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Thiếu đặc tả cho đăng nhập: Jira MTRO-54 (spec BE Auth/Login) có description trống, danh sách câu hỏi mở về Signup / Login mà tài liệu dẫn tới không có trong bộ nguồn. Hành vi Sign in hiện chủ yếu là quan sát staging; cần bổ sung spec BE hoặc câu hỏi mở gốc.",
  "kb_ids": [
    "KB-005",
    "KB-007",
    "KB-008"
  ],
  "missing_area": "login-spec",
  "related_questions": [
    "Đặc tả BE của đăng nhập (status, body, message chuẩn cho từng nhánh lỗi) là gì, khi ticket spec BE Auth/Login (Jira MTRO-54) có description trống?"
  ]
}
```

## OQ-auth-007 — CONFLICT

```json
{
  "oq_id": "OQ-auth-007",
  "type": "CONFLICT",
  "feature_id": "two-factor-challenge",
  "summary": "Giới hạn nhập sai mã 2FA khi đăng nhập là gì và staging hiện có áp dụng không?",
  "kb_ids": [
    "KB-042",
    "KB-043",
    "KB-041"
  ],
  "side_a": "Theo Jira MTRO-88 (đọc 07/10/2026), thử mã 2FA bị giới hạn 6 lần/phút/session và 20 lần/phút/IP; khảo sát staging 23/09/2026 cũng ghi có 429 \"Too many attempts. Try again in a minute.\" khi sai quá số lần (không nêu ngưỡng).",
  "side_b": "Trên staging ngày 23/09/2026 (TC-MTRO-931), nhập 15–20 mã sai liên tiếp trong khoảng 2 phút 42 giây đều nhận 422, không có 429; QA ghi là lỗi nghi vấn mức High, chưa report.",
  "conflict_group": "CONF-MTRO-auth-02",
  "related_questions": [
    "Giới hạn nhập sai mã 2FA khi đăng nhập là bao nhiêu (Jira MTRO-88 ghi 6 lần/phút/session và 20 lần/phút/IP), vượt giới hạn thì trả gì và hiển thị gì, và staging hiện có áp dụng không khi test-run 23/09/2026 nhập 15–20 mã sai đều chỉ nhận 422?",
    "Giới hạn nhập sai mã 2FA khi đăng nhập là bao nhiêu (Jira MTRO-88 ghi 6 lần/phút/session và 20 lần/phút/IP) và staging hiện có áp dụng không, khi test-run 23/09/2026 nhập 15–20 mã sai đều chỉ nhận 422?"
  ],
  "check_ids": [
    "two-factor-challenge:CHK-007"
  ]
}
```

## OQ-auth-008 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-008",
  "type": "OPEN_ISSUE",
  "feature_id": "two-factor-challenge",
  "summary": "Theo dõi hồi quy lỗi đã biết ở màn 2FA challenge (chưa dùng làm expected result): ô mã 2FA / recovery code giữ nguyên giá trị hiển thị có ký tự lạ (\"12ab#3-4x56\", \"123 456\", \"123-456\"), mức Low, open 23/09/2026. Cần kiểm lại trên bản dựng hiện tại.",
  "kb_ids": [
    "KB-044"
  ]
}
```

## OQ-auth-009 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-009",
  "type": "OPEN_ISSUE",
  "feature_id": "two-factor-challenge",
  "summary": "Thiếu tham số 2FA để viết case biên: cửa sổ thời gian chấp nhận mã TOTP, số lần sai trước khi bị khoá và thời gian khoá, thời hạn thật phía server của lượt challenge (đồng hồ UI là 5:00), định dạng và maxlength của recovery code / ô nhập mã, ngưỡng rate limit của challenge. Tài liệu đều ghi chưa có nguồn hoặc chờ Dev xác nhận.",
  "kb_ids": [
    "KB-034",
    "KB-036",
    "KB-038",
    "KB-039",
    "KB-041",
    "KB-042",
    "KB-113"
  ],
  "missing_area": "2fa-parameters",
  "related_questions": [
    "Cửa sổ thời gian chấp nhận mã TOTP khi đăng nhập là bao nhiêu (mã của chu kỳ trước / sau có được nhận không)?",
    "Cửa sổ thời gian chấp nhận mã TOTP là bao nhiêu (mã của chu kỳ trước / sau có được nhận không)?",
    "Thời hạn thật phía server của một lượt challenge là bao lâu, có khớp đồng hồ 5:00 trên UI không?",
    "Recovery code có định dạng và độ dài nào, ô nhập mã / recovery code có maxlength bao nhiêu, và dùng lại một recovery code đã dùng thì nhận lỗi gì?"
  ],
  "check_ids": [
    "two-factor-challenge:CHK-011"
  ]
}
```

## OQ-auth-010 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-010",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Slug từ tên workspace tiếng Việt có dấu: rule Jira MTRO-30 chưa chốt cách xử lý ký tự có dấu; test-run 25/08/2026 thấy chuyển tự (\"Đội QA Mailtro\" thành \"doi-qa-mailtro\"). Cần PO xác nhận chuyển tự là hành vi mong đợi.",
  "kb_ids": [
    "KB-054",
    "KB-052"
  ],
  "related_questions": [
    "Slug từ tên workspace tiếng Việt có dấu được chuyển tự (\"Đội QA Mailtro\" thành \"doi-qa-mailtro\") có phải hành vi mong đợi không?"
  ]
}
```

## OQ-auth-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Workspace đầu tiên của người dùng mới được tạo vào lúc nào: ngay trong form signup (Workspace name / Workspace URL, theo tiêu đề Jira MTRO-42) hay ở bước Create workspace sau khi verify và đăng nhập (theo mô tả luồng của Jira MTRO-30 và route /onboarding)? Hai ticket chỉ có tiêu đề/ghi chú, không có AC; cần PO/Dev xác nhận.",
  "kb_ids": [
    "KB-078",
    "KB-079",
    "KB-048",
    "KB-069"
  ],
  "related_questions": [
    "Workspace đầu tiên được tạo ngay khi submit signup hay ở bước Create workspace (/onboarding) sau khi verify và đăng nhập; trường hợp nào người dùng gặp /onboarding?"
  ]
}
```

## OQ-auth-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Full name hoặc Workspace name chỉ gồm khoảng trắng khi signup: cần Dev xác nhận có trim rồi báo required (client và/hoặc server) hay không; hiện chỉ có quan sát 25/08/2026 rằng Workspace name toàn khoảng trắng làm slug rỗng và nút bị disabled.",
  "kb_ids": [
    "KB-055"
  ],
  "related_questions": [
    "Full name hoặc Workspace name chỉ gồm khoảng trắng có được trim rồi báo required (ở client và/hoặc server) không?"
  ]
}
```

## OQ-auth-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Người đã đăng nhập truy cập /signup thì bị redirect hay vẫn thấy form đăng ký? Router không ghi guard cho /signup và tài liệu ghi cần Dev xác nhận.",
  "kb_ids": [
    "KB-049",
    "KB-069"
  ],
  "related_questions": [
    "Người đã đăng nhập mở /signup thì bị redirect hay vẫn thấy form đăng ký?"
  ]
}
```

## OQ-auth-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "/register không còn kiểm CSRF (test-run 25/08/2026: gửi token rác vẫn trả 201). Cần Dev xác nhận đây là chủ ý hay lỗi.",
  "kb_ids": [
    "KB-077"
  ],
  "related_questions": [
    "/register không kiểm CSRF (gửi token rác vẫn trả 201) là chủ ý hay lỗi?",
    "/register không kiểm CSRF (gửi token rác vẫn trả 201) là chủ ý hay lỗi? Nếu phải kiểm thì kết quả mong đợi là gì (vd 419)?"
  ],
  "check_ids": [
    "signup-and-workspace-creation:CHK-021"
  ]
}
```

## OQ-auth-015 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-015",
  "type": "OPEN_ISSUE",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Theo dõi hồi quy lỗi đã biết ở đăng ký (chưa dùng làm expected result): khi bị rate limit 429 UI chỉ hiện alert chung \"Something went wrong\", không nói bị khoá và nút vẫn enable (BUG-AUTH-08); mở link mời không hợp lệ khi đang đăng nhập thì BE trả 405 và UI im lặng bỏ ?invite, không có toast báo lỗi (chưa kiểm lại từ 23/09/2026).",
  "kb_ids": [
    "KB-076",
    "KB-080"
  ],
  "related_questions": [
    "Mở link mời có token không hợp lệ (hoặc đã dùng / hết hạn) khi đang đăng nhập thì phải hiển thị gì; thông báo \"We couldn't add you to that workspace…\" có phải là thông báo mong đợi không?"
  ],
  "check_ids": [
    "signup-and-workspace-creation:CHK-013"
  ]
}
```

## OQ-auth-016 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-016",
  "type": "OPEN_ISSUE",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Chưa khảo sát nội dung /verify (Check your email) và /onboarding (Create your workspace): field, validate, điều hướng sau khi tạo workspace; cũng chưa có thông tin về email xác minh (thời hạn link, nội dung mail, hành vi khi bấm link lúc đã / chưa đăng nhập, giới hạn Resend) và về email mời. Cần tài khoản chưa verify / chưa có workspace và hộp thư QA kiểm soát được.",
  "kb_ids": [
    "KB-066",
    "KB-067",
    "KB-068",
    "KB-069"
  ],
  "missing_area": "verify-onboarding",
  "related_questions": [
    "Nội dung /verify và /onboarding, thời hạn link xác minh, hành vi khi bấm link xác minh lúc đã / chưa đăng nhập, và giới hạn của Resend verification email là gì?"
  ]
}
```

## OQ-auth-017 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-017",
  "type": "OPEN_ISSUE",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Chưa có business rule cho captcha Turnstile (khi nào bắt buộc, server xử lý thế nào khi token captcha thiếu hoặc sai, có áp cho biến thể mời không) và ngưỡng rate limit của đăng ký / quên mật khẩu; chưa có chính sách mật khẩu và validation Workspace URL (độ dài, ký tự) do PO/Dev chốt ngoài mức tối thiểu 8 ký tự.",
  "kb_ids": [
    "KB-058",
    "KB-059",
    "KB-075",
    "KB-051",
    "KB-101"
  ],
  "missing_area": "signup-captcha-and-validation",
  "related_questions": [
    "Captcha ở form đăng ký bắt buộc khi nào, server xử lý thế nào khi captcha_token thiếu hoặc sai, và có áp cho biến thể mời không?",
    "Chính sách mật khẩu khi đăng ký ngoài mức tối thiểu 8 ký tự là gì (yêu cầu chữ cái, chặn mật khẩu bị rò rỉ như ở luồng reset có áp dụng không)?"
  ]
}
```

## OQ-auth-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-018",
  "type": "OPEN_ISSUE",
  "feature_id": "password-reset",
  "summary": "Theo dõi hồi quy lỗi đã biết ở đặt lại mật khẩu (chưa dùng làm expected result): tham số email trên URL reset được in nguyên văn lên trang (content injection / phishing); ô Confirm new password trống vẫn bấm được Reset password (khảo sát 29/09/2026 ghi nút disabled khi các ô rỗng nhưng chưa kiểm lại đúng trường hợp chỉ Confirm trống). Cần kiểm lại trên bản dựng hiện tại.",
  "kb_ids": [
    "KB-098",
    "KB-099",
    "KB-093"
  ],
  "related_questions": [
    "Ô Confirm new password trống thì client có phải chặn nút Reset password không, và lỗi client không chặn (server trả 422 \"The password field confirmation does not match.\") đã được sửa chưa?",
    "Trang Choose a new password phải hiển thị tham số email trên URL thế nào (lấy email từ token phía server, kiểm định dạng, hay không hiển thị) để tránh chèn nội dung tuỳ ý?",
    "Ô Confirm new password trống thì client có phải chặn nút Reset password không, và lỗi này đã được sửa chưa?",
    "Việc escape nội dung script trong tham số email của URL reset đã được kiểm trên bản dựng nào, ngày nào, và đó có phải yêu cầu bảo mật đã chốt không?"
  ],
  "check_ids": [
    "password-reset:CHK-010",
    "password-reset:CHK-016"
  ]
}
```

## OQ-auth-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-019",
  "type": "OPEN_ISSUE",
  "feature_id": "password-reset",
  "summary": "Quên / đặt lại mật khẩu không có đặc tả PO/Jira (Jira MTRO-52 có description trống) nên toàn bộ hành vi chỉ là quan sát staging và test-run; chưa kiểm thời hạn thật của link reset (UI ghi 60 phút), nội dung email reset, và case bảo mật đặt lại khi email trên URL bị sửa nhưng token đúng (bị chặn vì không được đổi mật khẩu tài khoản QA dùng chung).",
  "kb_ids": [
    "KB-085",
    "KB-094",
    "KB-096",
    "KB-099"
  ],
  "missing_area": "password-reset-spec",
  "related_questions": [
    "Thời hạn thật của link đặt lại là bao lâu (UI ghi 60 phút) và link có chỉ dùng được một lần không?",
    "Khi tham số email trên URL reset bị sửa nhưng token đúng, server đổi mật khẩu của tài khoản nào hoặc có từ chối không?"
  ]
}
```

## OQ-auth-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Quản lý phiên / thiết bị, \"sign out other sessions\", lịch sử đăng nhập và đổi mật khẩu tại chỗ hiện chưa có trên staging: các mục này có nằm trong roadmap không, và case \"đăng xuất thiết bị khác\" có được coi là ngoài phạm vi như QA đề xuất không? Cần PO xác nhận.",
  "kb_ids": [
    "KB-131",
    "KB-106"
  ],
  "related_questions": [
    "Quản lý phiên / thiết bị, sign out other sessions, lịch sử đăng nhập và đổi mật khẩu tại chỗ có nằm trong roadmap không, hay được coi là ngoài phạm vi?"
  ]
}
```

## OQ-auth-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-021",
  "type": "OPEN_ISSUE",
  "feature_id": "account-security-settings",
  "summary": "Luồng bật 2FA (4 bước) và trạng thái Off chưa từng được thấy trên UI staging (tài khoản khảo sát đang bật 2FA, không có tài khoản phụ đang tắt); Turn off và Regenerate recovery codes chưa được thực hiện thật; thông báo lỗi khi nhập sai Current password ở hai dialog này, điều kiện của lỗi \"We can't tell which account you're signed in as…\" và số giây cooldown của Send reset link chưa được ghi. Chưa có business rule PO/Dev nào cho Account settings / 2FA ngoài Jira MTRO-88/92.",
  "kb_ids": [
    "KB-107",
    "KB-108",
    "KB-112",
    "KB-114",
    "KB-115",
    "KB-116",
    "KB-117",
    "KB-118",
    "KB-119",
    "KB-126",
    "KB-127",
    "KB-133",
    "KB-135"
  ],
  "missing_area": "2fa-enrol-ui",
  "related_questions": [
    "Send reset link ở Account settings có cooldown bao nhiêu giây, và lỗi \"We can't tell which account you're signed in as. Reload the page and try again.\" xuất hiện trong điều kiện nào?",
    "Nhập sai Current password ở dialog Turn off hoặc Regenerate recovery codes thì hiển thị thông báo gì, và trạng thái 2FA / bộ recovery code có giữ nguyên không?",
    "Luồng bật 2FA thực tế trên UI staging có khớp 4 bước theo bundle không (thông báo khi sai Current password ở bước 1, tự submit ở chữ số thứ 6, xoá ô khi sai mã)?",
    "Nhập sai Current password ở dialog Turn off hoặc Regenerate recovery codes thì hiện thông báo gì?",
    "Send reset link ở Account settings có cooldown bao nhiêu giây, và lỗi \"We can't tell which account you're signed in as…\" xuất hiện trong điều kiện nào?"
  ],
  "check_ids": [
    "account-security-settings:CHK-007",
    "account-security-settings:CHK-018"
  ]
}
```

## OQ-auth-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": null,
  "summary": "Giới hạn endpoint auth 10 request/60 giây và việc forgot password + reset password dùng chung một bucket rate limit chỉ xuất hiện trong ghi chú cấu hình test của QA, không có nguồn PO/Dev hay số đo trên staging. Dev BE xác nhận giá trị giới hạn, phạm vi (theo IP, email hay tài khoản) và việc chung bucket.",
  "kb_ids": [
    "KB-P-070",
    "KB-P-071"
  ],
  "scope_note": "Câu hỏi mức product (dùng chung nhiều object), đặt ở object này để theo dõi."
}
```

## OQ-auth-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Sau khi đăng nhập từ một returnTo của workspace (kể cả khi phải qua 2FA), người dùng có được đưa thẳng về đúng route ban đầu của workspace đó không, hay luôn qua màn Choose a workspace?",
  "check_ids": [
    "sign-in-and-workspace-selection:CHK-015"
  ]
}
```

## OQ-auth-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "sign-in-and-workspace-selection",
  "summary": "Các form auth của Mailtro ID phải đạt mức accessibility nào (vd WCAG 2.1 AA): nút có focus ring, lỗi inline có role=\"alert\" / aria-live, tiêu đề trang riêng cho từng màn?",
  "check_ids": [
    "sign-in-and-workspace-selection:CHK-018"
  ]
}
```

## OQ-auth-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "two-factor-challenge",
  "summary": "Mở thẳng /login/two-factor-challenge khi không có lượt đăng nhập 2FA đang chờ (chưa đăng nhập hoặc đã đăng nhập) thì phải được chuyển tới đâu?",
  "check_ids": [
    "two-factor-challenge:CHK-010"
  ],
  "kb_ids": [
    "KB-033"
  ]
}
```

## OQ-auth-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "two-factor-challenge",
  "summary": "Tài khoản chưa bật TOTP có phải nhập mã OTP gửi qua email khi đăng nhập không (Jira MTRO-92 §1 nói có, với mã 6 số hết hạn 10 phút, khoá gửi lại 60 giây, sai 5 lần quay về form đăng nhập; Jira MTRO-88 và staging nói không)? Nếu có, đã bỏ, chưa deploy hay chỉ bật trên production?",
  "check_ids": [
    "two-factor-challenge:CHK-013"
  ],
  "kb_ids": [
    "KB-031",
    "KB-032"
  ]
}
```

## OQ-auth-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Sau khi submit đăng ký qua link mời, người dùng có phải verify email không và được đưa thẳng vào workspace mời hay sang màn nào?",
  "check_ids": [
    "signup-and-workspace-creation:CHK-012"
  ]
}
```

## OQ-auth-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Workspace đầu tiên được tạo ngay khi submit signup hay ở bước Create workspace (/onboarding) sau khi verify và đăng nhập; trường hợp nào người dùng gặp /onboarding, và mở /verify, /onboarding ở từng trạng thái tài khoản thì phải được chuyển tới đâu?",
  "check_ids": [
    "signup-and-workspace-creation:CHK-016"
  ]
}
```

## OQ-auth-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Captcha ở form đăng ký bắt buộc khi nào, server trả gì khi captcha_token thiếu hoặc sai, và có áp cho biến thể đăng ký qua link mời không?",
  "check_ids": [
    "signup-and-workspace-creation:CHK-019"
  ]
}
```

## OQ-auth-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "password-reset",
  "summary": "Thời hạn thật của link đặt lại mật khẩu là bao lâu (UI ghi 60 phút), link có chỉ dùng được một lần không, và gửi link mới có làm link cũ mất hiệu lực không?",
  "check_ids": [
    "password-reset:CHK-014"
  ]
}
```

## OQ-auth-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "password-reset",
  "summary": "Khi tham số email trên URL reset bị sửa sang email khác nhưng token đúng, server phải từ chối hay đổi mật khẩu theo tài khoản gắn với token, và trả lỗi gì?",
  "check_ids": [
    "password-reset:CHK-017"
  ]
}
```

## OQ-auth-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "password-reset",
  "summary": "Sau khi đặt lại mật khẩu thành công, các phiên đang mở ở nơi khác có bị huỷ không, và 2FA vẫn được yêu cầu ở lần đăng nhập kế tiếp không?",
  "check_ids": [
    "password-reset:CHK-018"
  ]
}
```

## OQ-auth-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "password-reset",
  "summary": "Server xử lý thế nào khi captcha_token thiếu hoặc sai ở POST /api/auth/forgot-password (status, thông báo, có gửi mail không)? Ngưỡng rate limit của quên / đặt lại mật khẩu là bao nhiêu và có dùng chung bucket với các endpoint auth khác không?",
  "check_ids": [
    "password-reset:CHK-019"
  ],
  "related_questions": [
    "Ngưỡng rate limit của quên / đặt lại mật khẩu là bao nhiêu và có dùng chung bucket với các endpoint auth khác không?"
  ]
}
```

## OQ-auth-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Link đặt lại mật khẩu gửi từ Account settings có dùng chung luồng với Forgot / reset password không (cùng mail, cùng trang Choose a new password, cùng thời hạn và quy tắc mật khẩu), hay có khác biệt nào?",
  "check_ids": [
    "account-security-settings:CHK-005"
  ],
  "related_questions": [
    "Send reset link ở Account settings có dùng đúng luồng, email và thời hạn link của Forgot / reset password không?"
  ],
  "kb_ids": [
    "KB-109"
  ]
}
```

## OQ-auth-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Luồng bật 2FA thực tế trên UI staging có khớp các bước theo bundle không: card khi tắt hiện \"Your password on its own signs you in.\" và nút \"Set up two-factor authentication\"; sai Current password ở bước 1 hiện lỗi gì; bước 3 có tự submit ở chữ số thứ 6 và xoá ô khi sai mã không; dialog recovery code chỉ đóng bằng Done?",
  "check_ids": [
    "account-security-settings:CHK-009"
  ]
}
```

## OQ-auth-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Sau khi tắt 2FA, lần đăng nhập tiếp theo chỉ cần mật khẩu (theo nội dung dialog Turn off) hay phải nhập mã OTP gửi qua email (theo Jira MTRO-92 §1)?",
  "check_ids": [
    "account-security-settings:CHK-015"
  ],
  "related_questions": [
    "Sau khi tắt 2FA, lần đăng nhập tiếp theo chỉ cần mật khẩu hay phải nhập mã OTP gửi qua email?"
  ]
}
```

## OQ-auth-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Sau khi tắt 2FA và sau khi tạo lại recovery code thành công, UI hiển thị gì; các chuỗi trong bundle (\"Two-factor authentication turned off\", \"Recovery codes regenerated\", \"Your previous codes no longer work. Save this set instead.\") có phải là nội dung mong đợi không?",
  "check_ids": [
    "account-security-settings:CHK-019"
  ]
}
```

## OQ-auth-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-auth-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "account-security-settings",
  "summary": "Các endpoint 2FA của Account settings (bật, xác nhận, tắt, tạo lại recovery code) có đúng method, path, body như đọc từ bundle không, và response / mã lỗi chuẩn của từng endpoint là gì?",
  "check_ids": [
    "account-security-settings:CHK-020"
  ],
  "kb_ids": [
    "KB-134",
    "KB-136"
  ]
}
```

## OQ-auth-039 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-039",
  "type": "OPEN_ISSUE",
  "feature_id": "two-factor-challenge",
  "summary": "Reload hoặc mở tab mới khi đang ở màn challenge thì người dùng được đưa về màn nào và có thông báo gì?",
  "kb_ids": [
    "KB-037"
  ]
}
```

## OQ-auth-040 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-040",
  "type": "OPEN_ISSUE",
  "feature_id": "signup-and-workspace-creation",
  "summary": "Workspace URL có giới hạn độ dài, slug dành riêng hoặc ký tự đầu / cuối nào bị cấm không?",
  "kb_ids": [
    "KB-052",
    "KB-070"
  ]
}
```

## OQ-auth-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-041",
  "type": "OPEN_ISSUE",
  "feature_id": "password-reset",
  "summary": "Chính sách mật khẩu chính thức khi đặt lại là gì (tối thiểu 8 ký tự, có chữ cái, chặn mật khẩu bị rò rỉ) và thông báo lỗi cho từng điều kiện?",
  "kb_ids": [
    "KB-091",
    "KB-101"
  ]
}
```

## OQ-auth-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-auth-042",
  "type": "OPEN_ISSUE",
  "feature_id": "password-reset",
  "summary": "Email đặt lại gồm nội dung gì, và server xử lý thế nào khi captcha_token thiếu hoặc sai ở /forgot-password?",
  "kb_ids": [
    "KB-083",
    "KB-059"
  ]
}
```
