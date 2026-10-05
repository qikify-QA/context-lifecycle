# Open Questions — affiliate-account Tổng: 39 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-affiliate-account-001 — CONFLICT ```json
{ "oq_id": "OQ-affiliate-account-001", "type": "CONFLICT", "feature_id": [ "admin-affiliate-review", "email-verification-and-auto-approval" ], "summary": "[OQ-affiliate-account-001] Ai/cai gi chuyen ho so affiliate sang trang thai duoc duyet: admin duyet tay (`qikfiliate/Domain Entities`) vs tu dong khi click link xac thuc, khong co buoc duyet tay rieng biet (`qikfiliate/dashboard - signup and verification`).", "side_a": "`qikfiliate/Domain Entities` §User (Affiliate): ho so dang ky phai duoc admin duyet moi hoat dong day du (isApproved).", "side_b": "`qikfiliate/dashboard - signup and verification` §Buoc 2-3: khong co buoc admin duyet tay rieng biet nao chan giua verify email va duoc approve — auto-approve khi click link xac thuc."
}
``` ## OQ-affiliate-account-002 — CONFLICT ```json
{ "oq_id": "OQ-affiliate-account-002", "type": "CONFLICT", "feature_id": "affiliate-login-access-control", "summary": "[OQ-affiliate-account-002] Affiliate bi Disapproved co dang nhap duoc dashboard hay khong.", "side_a": "`qikfiliate/admin - managing affiliates` §Journey 2: affiliate van co the dang nhap vao dashboard sau khi bi Disapproved (tai khoan khong bi khoa dang nhap, chi chan hasApproved).", "side_b": "`qikfiliate/dashboard - signup and verification` §Kich ban 2: lan dang nhap tiep theo sau khi bi disapprove tra ve 403 Forbidden \"Your account has not approved.\""
}
``` ## OQ-affiliate-account-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-003", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-affiliate-review", "check_ids": [ "CHK-REVIEW-011" ], "summary": "[NEEDS_CONFIRMATION] Admin set tay email_verified_at qua form Edit rồi Approve — quy trình chuẩn hay lối tắt không được chặn?. Admin có được phép/khuyến khích set tay email_verified_at qua form Edit rồi Approve không, hay đây là lối tắt chưa được code chặn và không nên dùng? Cần PO/Ops xác nhận quy trình chuẩn."
}
``` ## OQ-affiliate-account-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-004", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-affiliate-review", "check_ids": [ "CHK-REVIEW-012" ], "summary": "[NEEDS_CONFIRMATION] Giới hạn độ dài/ký tự cho phép của disapproved_reason. disapproved_reason có giới hạn độ dài tối đa hay ràng buộc ký tự (vd chặn HTML/script) nào không? Cần PO/Dev xác nhận, đặc biệt vì nội dung này được chèn thẳng vào email gửi affiliate."
}
``` ## OQ-affiliate-account-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-005", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-dashboard-overview", "check_ids": [ "CHK-DASH-003" ], "summary": "[NEEDS_CONFIRMATION] Phân trang/giới hạn số dòng/bộ lọc của các bảng trong dashboard (Conversions, Customers, Invoices, Links). Các bảng trong dashboard (Conversions, Customers, Invoices, Links) có phân trang/giới hạn số dòng/bộ lọc nào không? Cần đối chiếu với checklist của object program/conversion-ledger/customer-shop/invoice-payout khi có, hoặc hỏi PO/Dev nếu chưa batch nào xử lý các object đó."
}
``` ## OQ-affiliate-account-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-006", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-email-notifications", "check_ids": [ "CHK-NOTIF-004" ], "summary": "[NEEDS_CONFIRMATION] Trigger và nội dung cụ thể của email 'Đặt lại mật khẩu'. Trigger cụ thể (hành động nào kích hoạt) và nội dung của email 'Đặt lại mật khẩu' là gì? Cần PO/Dev xác nhận để viết expected_result."
}
``` ## OQ-affiliate-account-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-007", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-email-notifications", "check_ids": [ "CHK-NOTIF-005" ], "summary": "[NEEDS_CONFIRMATION] Nội dung cụ thể của email 'Xác thực email' (ngoài link xác thực). Nội dung đầy đủ (wording, branding) của email 'Xác thực email' là gì, ngoài việc chứa link xác thực? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-account-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-008", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-email-notifications", "check_ids": [ "CHK-NOTIF-006" ], "summary": "[NEEDS_CONFIRMATION] Slack #affiliate có bắn thông báo khi có yêu cầu thanh toán mới không (ngoài phạm vi KB-003 đã xác nhận). Kênh Slack #affiliate có bắn thông báo khi có yêu cầu thanh toán mới không? Nếu có, cần nối với KB tương ứng ở object/feature payout; nếu batch khác đã xử lý, nối checklist qua knowledge-diff-analyzer."
}
``` ## OQ-affiliate-account-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-009", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-login-access-control", "check_ids": [ "CHK-LOGIN-006" ], "summary": "[NEEDS_CONFIRMATION] API dùng JWT auth (middleware auth:api+verified), web dashboard dùng session Laravel — xác nhận kiến trúc để automation engineer chọn đúng cơ chế auth khi viết test. Xác nhận: API login (routes/api.php) dùng JWT (JWTSubject, middleware auth:api+verified) và web dashboard dùng session Laravel thường (Authenticatable+MustVerifyEmail) — đúng theo quan sát từ code (`qikfiliate/Domain Entities`/`qikfiliate/dashboard - overview`) không? Cần PO/Dev xác nhận trước khi dùng làm cơ sở thiết kế automation test (token vs cookie)."
}
``` ## OQ-affiliate-account-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-010", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-profile-maintenance", "check_ids": [ "CHK-PROFILE-009" ], "summary": "[NEEDS_CONFIRMATION] Field khác ngoài survey (name/email/ref/company/job) trên form Edit có bị giới hạn (chỉ sửa, không đổi cấu trúc) tương tự survey hay sửa tự do?. Khi admin sửa name/email/ref/company/job trên form Edit, có áp lại cùng validate như lúc signup (unique email/ref, format) không, hay admin sửa tự do hoàn toàn? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-account-011 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-011", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-signup", "check_ids": [ "CHK-SIGNUP-019" ], "summary": "[NEEDS_CONFIRMATION] Ràng buộc độ dài/charset của `ref` ngoài blocklist từ khoá và prefix `app`. Ngoài blocklist từ khoá và rule prefix `app`, `ref` có ràng buộc độ dài tối đa/tối thiểu, charset (unicode, ký tự đặc biệt), hay phân biệt hoa-thường nào không? Cần PO/Dev xác nhận vì `ref` nằm trong URL giới thiệu công khai."
}
``` ## OQ-affiliate-account-012 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-012", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-signup", "check_ids": [ "CHK-SIGNUP-020" ], "summary": "[NEEDS_CONFIRMATION] Password policy ngoài độ dài tối thiểu 6 ký tự. Password policy của signup có yêu cầu nào ngoài 'tối thiểu 6 ký tự' (bắt buộc chữ+số, ký tự đặc biệt, chặn password phổ biến) không? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-account-013 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-013", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-signup", "check_ids": [ "CHK-SIGNUP-021" ], "summary": "[NEEDS_CONFIRMATION] Response contract (status code/body) của POST /register khi thành công và khi validate fail. POST /register trả về status code và body gì khi signup thành công, và khi validate fail (field-level error format)? Cần PO/Dev xác nhận response contract."
}
``` ## OQ-affiliate-account-014 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-014", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-signup", "check_ids": [ "CHK-SIGNUP-022" ], "summary": "[NEEDS_CONFIRMATION] Thông báo lỗi UX cụ thể khi `ref` bị blocklist chặn. Thông báo lỗi cụ thể hiển thị cho người dùng khi `ref` bị blocklist chặn là gì? Cần PO/Dev xác nhận để kiểm UX báo lỗi."
}
``` ## OQ-affiliate-account-015 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-015", "type": "NEEDS_CONFIRMATION", "feature_id": "affiliate-signup", "check_ids": [ "CHK-SIGNUP-023" ], "summary": "[NEEDS_CONFIRMATION] Captcha/rate-limit ở route /register chống spam/bot. Route POST /register có áp captcha hay rate-limit chống spam/bot ở tầng request nào không (ngoài rate-limit resend email xác thực)? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-account-016 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-016", "type": "NEEDS_CONFIRMATION", "feature_id": "email-verification-and-auto-approval", "check_ids": [ "CHK-EVAA-008" ], "summary": "[NEEDS_CONFIRMATION] Thời hạn (TTL) của link xác thực và hành vi click lại link đã dùng. Link xác thực email có thời hạn (TTL) bao lâu? Click lại 1 link đã dùng thì hệ thống xử lý thế nào (thành công im lặng, lỗi, hay vô hiệu)? Cần PO/Dev xác nhận."
}
``` ## OQ-affiliate-account-017 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-017", "type": "NEEDS_CONFIRMATION", "feature_id": "email-verification-and-auto-approval", "check_ids": [ "CHK-EVAA-009" ], "summary": "[NEEDS_CONFIRMATION] Hành vi khi link xác thực bị chỉnh sửa/chữ ký không hợp lệ. Khi link xác thực bị chỉnh sửa (chữ ký số không hợp lệ), hệ thống trả về response/message gì? Cần PO/Dev xác nhận để viết oracle cho case bảo mật này."
}
``` ## OQ-affiliate-account-018 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-affiliate-account-018", "type": "NEEDS_CONFIRMATION", "feature_id": "new-affiliate-bonus", "check_ids": [ "CHK-BONUS-008" ], "summary": "[NEEDS_CONFIRMATION] Giá trị thật của config('admin.affiliate_reward.koin') (time/paid_user/bonus) và hành vi khi config không tồn tại. Giá trị thật của config('admin.affiliate_reward.koin') (time/paid_user/bonus) trên môi trường target là bao nhiêu? Nếu config không tồn tại/bị xoá, luồng thưởng xử lý thế nào (bỏ qua hoàn toàn hay lỗi)? Cần PO/Dev xác nhận trước khi viết test case số liệu cụ thể."
}
```

## OQ-affiliate-account-019 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-019",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-affiliate-review",
  "check_ids": [
    "admin-affiliate-review:CHK-REVIEW-003"
  ],
  "summary": "Approve bị chặn khi email_verified_at còn trống, toast \"User has not verified email\". Oracle STRONG cua check 'CHK-REVIEW-003' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-020 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-020",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-affiliate-review",
  "check_ids": [
    "admin-affiliate-review:CHK-REVIEW-004"
  ],
  "summary": "Approve chuyển status sang Approved ngay khi email_verified_at đã có giá trị. Oracle STRONG cua check 'CHK-REVIEW-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-021 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-021",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-affiliate-review",
  "check_ids": [
    "admin-affiliate-review:CHK-REVIEW-008"
  ],
  "summary": "Disapprove kích hoạt email \"Affiliate Membership Disapproved\" kèm đúng lý do vừa nhập. Oracle STRONG cua check 'CHK-REVIEW-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-022 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-022",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "admin-affiliate-review",
  "check_ids": [
    "admin-affiliate-review:CHK-REVIEW-009"
  ],
  "summary": "Re-approve sau disapprove: status=approved, affiliate đăng nhập lại được, không cần verify email lại. Oracle STRONG cua check 'CHK-REVIEW-009' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-023 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-023",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-dashboard-overview",
  "check_ids": [
    "affiliate-dashboard-overview:CHK-DASH-002"
  ],
  "summary": "Dashboard affiliate hoàn toàn tách biệt với admin panel nội bộ — session của 1 bên không cấp quyền vào bên kia. Oracle STRONG cua check 'CHK-DASH-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-024 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-024",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-email-notifications",
  "check_ids": [
    "affiliate-email-notifications:CHK-NOTIF-002"
  ],
  "summary": "Affiliate nhận email khi được duyệt (approve), và email kèm lý do khi bị từ chối (disapprove). Oracle STRONG cua check 'CHK-NOTIF-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-login-access-control",
  "check_ids": [
    "affiliate-login-access-control:CHK-LOGIN-001"
  ],
  "summary": "Đăng nhập thành công khi đủ 3 điều kiện: đúng email/password + email_verified_at có giá trị + status=approved. Oracle STRONG cua check 'CHK-LOGIN-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-login-access-control",
  "check_ids": [
    "affiliate-login-access-control:CHK-LOGIN-002"
  ],
  "summary": "Đăng nhập với email/password đúng nhưng chưa xác thực email -> 403. Oracle STRONG cua check 'CHK-LOGIN-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-profile-maintenance",
  "check_ids": [
    "affiliate-profile-maintenance:CHK-PROFILE-005"
  ],
  "summary": "Affiliate trên dashboard chỉ sửa được dữ liệu của chính mình (profile/payment method/password). Oracle STRONG cua check 'CHK-PROFILE-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-profile-maintenance",
  "check_ids": [
    "affiliate-profile-maintenance:CHK-PROFILE-006"
  ],
  "summary": "Affiliate không sửa được dữ liệu của affiliate khác hoặc dữ liệu hệ thống (rate card, conversion). Oracle STRONG cua check 'CHK-PROFILE-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-profile-maintenance",
  "check_ids": [
    "affiliate-profile-maintenance:CHK-PROFILE-007"
  ],
  "summary": "Trang Account cho phép cập nhật thông tin cá nhân, đổi phương thức thanh toán, đổi mật khẩu. Oracle STRONG cua check 'CHK-PROFILE-007' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-030 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-030",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-signup",
  "check_ids": [
    "affiliate-signup:CHK-SIGNUP-001"
  ],
  "summary": "Submit form đăng ký với mọi field bắt buộc hợp lệ. Oracle STRONG cua check 'CHK-SIGNUP-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-031 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-031",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-signup",
  "check_ids": [
    "affiliate-signup:CHK-SIGNUP-004"
  ],
  "summary": "Submit với `email` đã tồn tại trong hệ thống. Oracle STRONG cua check 'CHK-SIGNUP-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-032 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-032",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "affiliate-signup",
  "check_ids": [
    "affiliate-signup:CHK-SIGNUP-008"
  ],
  "summary": "Submit với `ref` đã tồn tại trong hệ thống. Oracle STRONG cua check 'CHK-SIGNUP-008' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-033 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-033",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-verification-and-auto-approval",
  "check_ids": [
    "email-verification-and-auto-approval:CHK-EVAA-001"
  ],
  "summary": "Email xác thực được gửi ngay sau khi đăng ký thành công. Oracle STRONG cua check 'CHK-EVAA-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-verification-and-auto-approval",
  "check_ids": [
    "email-verification-and-auto-approval:CHK-EVAA-005"
  ],
  "summary": "Click link xác thực chuyển status sang approved ngay trong cùng 1 request. Oracle STRONG cua check 'CHK-EVAA-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "email-verification-and-auto-approval",
  "check_ids": [
    "email-verification-and-auto-approval:CHK-EVAA-006"
  ],
  "summary": "Sau khi click link xác thực, affiliate đăng nhập được ngay (không cần thêm hành động nào). Oracle STRONG cua check 'CHK-EVAA-006' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-affiliate-account-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "new-affiliate-bonus",
  "check_ids": [
    "new-affiliate-bonus:CHK-BONUS-001"
  ],
  "summary": "Affiliate đạt đủ điều kiện premium offer trong cửa sổ thời gian được cộng bonus vào balance. Oracle STRONG cua check 'CHK-BONUS-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm). Dong thoi, oracle nay con trace toi kb_id (KB-006) co confirmation_source.derivation=code_artifact, vi pham them luat 'phanh derivation' (STRONG chi hop le khi MOI oracle kb_id la CONFIRMED_EXPECTED va derivation=prose)."
}
```

## OQ-affiliate-account-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "new-affiliate-bonus",
  "check_ids": [
    "new-affiliate-bonus:CHK-BONUS-005"
  ],
  "summary": "Affiliate đã nhận bonus (bonus_at đã set) không được cộng bonus lần thứ 2. Oracle STRONG cua check 'CHK-BONUS-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm). Dong thoi, oracle nay con trace toi kb_id (KB-006) co confirmation_source.derivation=code_artifact, vi pham them luat 'phanh derivation' (STRONG chi hop le khi MOI oracle kb_id la CONFIRMED_EXPECTED va derivation=prose)."
}
```

## OQ-affiliate-account-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-038",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "admin-affiliate-review:CHK-REVIEW-001"
  ],
  "summary": "Field status có đúng 3 giá trị Pending/Approved/Disapproved. Oracle của check này dựa trên KB-001, derivation=code_artifact (suy từ đọc code hiện tại, không phải phát biểu tường minh) — theo phanh derivation (Gate C5) không đủ để làm oracle STRONG. Cần spec_doc/po_dev_confirm hoặc test_case PASS xác nhận đây là hành vi ĐÚNG, không chỉ là 'code hiện đang làm vậy'."
}
```

## OQ-affiliate-account-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-affiliate-account-039",
  "type": "NEEDS_CONFIRMATION",
  "check_ids": [
    "affiliate-signup:CHK-SIGNUP-014",
    "affiliate-signup:CHK-SIGNUP-017"
  ],
  "summary": "Khảo sát 4 câu (riêng Koin) lưu dạng JSON vào User.survey, và dữ liệu đó hiển thị đúng khi admin mở Edit. Oracle của cả 2 check dựa trên KB-017, derivation=code_artifact — theo phanh derivation không đủ làm oracle STRONG. Cần nguồn mạnh hơn (spec_doc/po_dev_confirm/test_case PASS) xác nhận đây là hành vi đúng theo chủ đích, không chỉ đọc code."
}
```
