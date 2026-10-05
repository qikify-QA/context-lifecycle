# CBS-005 — nội dung Proposal đầy đủ (frozen tại thời điểm Submit)

Nguồn: `mcp__qa-hub-local__get_proposal({proposal_id: "CBS-005"})`
- id: CBS-005
- projectId: proj-5a26d73c-cbb2-4d19-b298-383bc4d16cf2 (teeinblue)
- sourceTaskId: TIB-005
- filename: CCR-2026-09-28-tib-5460-upload-limit-thumbmark.md
- submittedBy: u-jm
- submittedAt: 2026-09-28T02:34:46.530Z
- status khi đọc: in-progress

Evidence gốc (Jira/Testlane) mà CCR trích dẫn:
- Jira https://ownego.atlassian.net/browse/TIB-5460 (description + comment 51194, 51220 — huyenntk, 2026-09-17/18) — status QA Review, resolutiondate null (CHƯA SHIP tại 2026-09-28)
- Testlane task TIB-116 — 13 test case (TC-TIB-3296..TC-TIB-3308), toàn bộ not-run

Đề xuất context (Phần 4.3, nguyên văn):

[OBSERVED_CURRENT, chờ re-verify khi TIB-5460 ship] Feature sdk/genai-personalization-runtime
có 1 cơ chế rate-limit buyer-facing riêng cho các field upload dùng AI effect (Remove
Background, AI Enhance/Image Filter, Text-to-Image), tách biệt với upload không AI effect
(không giới hạn). Quota được tính theo visitor + product + window thời gian, định danh
visitor qua "thumbmark" (signed ID fetch từ GET /merchant/{platform}/thumbmark, cache tại
localStorage key `teeinblue_signed_thumbmark`, không expiry). Khi thumbmark chưa fetch kịp,
SDK dùng ID fallback — TRƯỚC bản vá TIB-5460, fallback ID được sinh từ device info (model
máy, kích thước màn hình, ngôn ngữ, timezone, OS) và có thể COLLIDE giữa các visitor khác
nhau cùng thiết bị/khu vực, khiến họ share chung 1 quota và bị chặn ngay lần upload đầu
tiên (bug TIB-5460). Default limit quan sát được: 5 upload/window/visitor; window observed
staging=5 phút, production=1 giờ (Dev confirm, chưa PO sign-off). TIB-5460 (đang QA Review,
CHƯA ship tại thời điểm ghi nhận 2026-09-28) đổi fallback ID sang random-per-browser +
fetch thumbmark sớm hơn (ngay khi page load) + retry 1 lần khi network-error/5xx (không
retry khi 429) — CẦN re-verify độc lập qua 13 test case đã có ở Testlane task TIB-116 khi
ticket deploy, trước khi nâng bất kỳ phần nào lên CONFIRMED_EXPECTED.

Dev confirm nguyên văn (claim #3 — cấu hình hiện tại), comment id 51220, TIB-5460, huyenntk,
2026-09-17, https://ownego.atlassian.net/browse/TIB-5460:

"Rate limiting only applies to uploads that use an AI effect (Remove Background, AI
Enhance/Image Filter, Text-to-Image, etc.). A plain upload with no effect is never
limited... Default limit: 5 uploads per window per visitor... Test on staging — the
throttle window there is 5 minutes instead of 1 hour in production... the signed
thumbmark is cached in localStorage (key `teeinblue_signed_thumbmark`) with no expiry
once successfully fetched."

Explicitly KHÔNG đề xuất (Phần 4.2, tuân thủ nghiêm — xem thêm chỉ đạo operator dưới đây):
- KHÔNG coi bất kỳ giá trị cấu hình nào là business rule đã PO duyệt/CONFIRMED_EXPECTED.
- KHÔNG khẳng định bản fix đã hoạt động đúng — ticket chưa ship, 0/13 test case PASS.
- KHÔNG tự đặt object_key/feature_key mới — dùng đúng sdk/genai-personalization-runtime.

Chỉ đạo operator (session này, ghi đè bất kỳ khoảng xám nào): mọi nội dung liên quan tới
cơ chế rate-limit/thumbmark này CHỈ được ghi ở mức OBSERVED_CURRENT/pending trong run này —
KHÔNG nâng bất kỳ phần nào (kể cả claim #3 dù có Dev confirm nguyên văn) lên
CONFIRMED_EXPECTED. Điều kiện mở khoá CCR tự nêu (TIB-5460 deploy + re-verify ≥1/13 test
case) CHƯA thoả, nhưng operator quyết định "vẫn trigger orchestrator ngay" với ràng buộc
trên — không phải override quy trình, chỉ làm rõ mức tin cậy cho phép.
