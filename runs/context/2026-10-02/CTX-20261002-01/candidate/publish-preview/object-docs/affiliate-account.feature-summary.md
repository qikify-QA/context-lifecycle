# Affiliate Account — hồ sơ, xác thực, duyệt/từ chối, quyền truy cập dashboard
**Published context version:** 1

**Product:** qikfiliate · **Mode:** DOC_BOOTSTRAP · **Environment:** documented · **Published:** 2026-10-04

## Features

- **admin-affiliate-review** — gate: CONDITIONAL_PASS
- **affiliate-dashboard-overview** — gate: CONDITIONAL_PASS
- **affiliate-email-notifications** — gate: CONDITIONAL_PASS
- **affiliate-login-access-control** — gate: CONDITIONAL_PASS
- **affiliate-profile-maintenance** — gate: PASS
- **affiliate-signup** — gate: CONDITIONAL_PASS
- **email-verification-and-auto-approval** — gate: CONDITIONAL_PASS
- **new-affiliate-bonus** — gate: CONDITIONAL_PASS

## Trạng thái open questions

- CONFLICT (chưa ngã ngũ, 2 phía song song): 2
- OPEN_ISSUE (known defect, quan sát hiện tại): 0
- NEEDS_CONFIRMATION (thiếu oracle đủ mạnh, chờ PO/Dev hoặc test_case PASS): 37
- Tổng: 39 — chi tiết đầy đủ trong `open-questions.md` của object này.

**Lưu ý về oracle_strength**: do toàn bộ KB của bootstrap đầu tiên này chỉ có nguồn `dev_doc` (chưa có `test_case`/`po_dev_confirm`/`spec_doc` nào), rất nhiều check regression phải giữ ở mức `BASELINE`/`NONE` thay vì `STRONG` theo đúng luật C5 của contract — đây là kết quả ĐÚNG và dự kiến của lần bootstrap đầu, không phải thiếu sót. `oracle_strength` sẽ nâng dần lên `STRONG` khi có `test_case` PASS tương ứng.

## Nguồn & giới hạn

Toàn bộ knowledge của object này sinh từ bootstrap DOC_BOOTSTRAP đầu tiên (0 quan sát runtime — không có credential/portal/API access khi bootstrap). Tài liệu nguồn do dev viết trực tiếp từ source code `koin-partners` (Laravel 6), version v1, generated 2026-08-20. Claim nào chỉ đúng cho brand Koin mang `scope.brand: "koin"` trong `kb.json` — Qikfiliate phục vụ nhiều brand trên cùng codebase.
