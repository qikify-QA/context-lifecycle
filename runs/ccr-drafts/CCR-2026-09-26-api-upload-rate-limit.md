# Context Change Request (CCR) — Rate limit cho upload file trong teeinblue-api

> Điền từ template `contracts/context-change-request.template.md`. Nội dung dưới đây do agent tổng hợp trực tiếp từ nội dung task `TIB-004` trên QA Hub (mô tả do người gửi tự viết, trích dẫn route/config/middleware trong source code `teeinblue-api`) — CHƯA có lượt tự explore/gửi request thật trên staging của context builder.

**Tiêu đề task:** `[CCR] PROFILE_GAP — teeinblue-api upload endpoints (cross-object: artwork/asset-category/font/sdk) — rate limit cho upload file chưa được document trong canon`

---

# Phần 0 — Bạn cần mấy CCR?

**1 CCR**, không tách. Toàn bộ nội dung cùng: người gỡ (context builder tự đọc lại code + tự gửi request thật trên staging để xác nhận), điều kiện mở khoá (một đợt re-verify toàn bộ 3 bảng rate limit dưới đây), vòng đời (độc lập, không gắn 1 task/feature cụ thể), và cùng một nguồn gốc (3 lớp rate-limit middleware trong `teeinblue-api`) — dù artifact đích trải trên nhiều object (`artwork`, `asset-category`, `font`, `sdk`) theo `_registry.json` hiện tại. Việc gắn vào feature nào của object nào, hay giữ như một cross-cutting note riêng, để `qa-context-lifecycle-orchestrator` tự quyết khi build KB (xem Phần 4.2) — giống cách CCR trước đó (`CCR-2026-09-25-photo-upload.md`) đã xử lý một cụm đa-object tương tự.

---

# Phần 1 — Bạn thấy gì

**Loại request:** `PROFILE_GAP`

**Object** — theo `_registry.json` hiện tại, KHÔNG có object_key nào tên "rate-limit"/"api-infra". Nội dung trải trên nhiều object có sẵn:

- `object_key: artwork` (alias "vector layer", "map layer", "photo layer") — liên quan các route `vector-upload`, `gpx-upload`, `pdf-upload`, `artworks/upload-psd`, `layer-images/{by-temporary-file,file,svg,gpx}`.
- `object_key: asset-category` (alias "bulk upload zip", "asset item upload") — liên quan `cliparts/{svg,font,by-temporary-file}`, `clipart-categories` store/clone, `clipart-category-bulk-uploads` create-url/start.
- `object_key: sdk` (alias "storefront runtime", "buyer facing") — liên quan `photo-upload`, `photo-base64-upload`, `customer-uploads/{id}/apply-effects`, `customer-uploads/{id}/uploaded-at`, `customer-uploads/generate`, `customer-uploads/generate-from-multiple-images`, `image-filter-effects` (+ `/async`), `upload-error-logs`, `strava-upload`, `upload-url`.

**Đừng bịa object_key mới** — đề xuất tách/gắn nằm ở Phần 4.2, để orchestrator tự quyết.

**Quan sát được** — nguyên văn từ nội dung task TIB-004 (KHÔNG phải quan sát runtime trực tiếp của agent, mà là trích dẫn code/config):

```
1. Throttle theo route (middleware `throttle:`, giới hạn theo phút) — routes/api.php:1050-1125,
   config tại config/merchant_throttle.php:

   Endpoint                                                    Config key           Prod / Staging
   POST merchant/.../vector-upload                             vector_upload         20/phút / 4/phút
   POST merchant/.../gpx-upload                                 gpx_upload            20/phút / 4/phút
   POST merchant/.../strava-upload                              strava_upload         20/phút / 4/phút
   POST merchant/.../upload-url                                 upload_url            20/phút / 4/phút
   POST merchant/.../pdf-upload                                 pdf_upload            20/phút / 4/phút
   POST merchant/.../customer-uploads/{id}/uploaded-at          uploaded_at           30/phút / 6/phút
   POST merchant/.../upload-error-logs                          upload_error_logs     30/phút / 6/phút

2. Middleware `upload_rate_limiter` (app/Http/Middleware/UploadRateLimiter.php), áp dụng cho
   photo-upload, photo-base64-upload, customer-uploads/{id}/apply-effects, image-filter-effects
   (+ /async), customer-uploads/generate, customer-uploads/generate-from-multiple-images. Bỏ qua
   nếu request đến từ portal; chỉ áp dụng khi upload có kèm effect tốn tài nguyên
   (background_remover, image_filter, image_generate, cutout.pro:*).
   - Backstop theo IP: merchant_throttle.ai_ip_backstop — 50/giờ (prod), 10/10 phút (staging)
   - Theo thumbmark + field: $user->private_config['photo_upload_rate_limit'] hoặc mặc định
     app.upload_rate_limit_default (mặc định 5), cửa sổ ai_per_thumbmark_window_seconds
     (1 giờ prod / 5 phút staging)

3. Middleware `user_rate_limiter:<resource>` (theo user đã đăng nhập, cửa sổ 24h —
   config/cache.php:26), limit khai báo tại config/app.php:185-189:

   Route                                                        Resource              Mặc định/24h
   layer-images/{by-temporary-file,file,svg,gpx}                layer_image           1000
   cliparts/{svg,font,by-temporary-file}                        clipart               4000
   clipart-categories store/clone                                clipart_category      1000
   clipart-category-bulk-uploads create-url/start                clipart_category +   1000 + 4000
                                                                  clipart (cả hai)

Các endpoint upload chưa có rate limit riêng: artworks/upload-psd, temporary-files/.../file +
upload-url, và customer-uploads store (phía admin).
```

- Thấy mấy lần: `1 lần — đây là đọc trực tiếp source code (routes/api.php, config/*.php, middleware class) tại ngày tạo task, KHÔNG phải kết quả đo nhiều lần bằng cách gửi request thật.`
- Trên mấy tài khoản/store/thiết bị khác nhau: `Không áp dụng — đây là số liệu khai báo trong code/config, không gắn với account/store/thiết bị cụ thể nào.`

**Bạn thử gì mà KHÔNG tái hiện**

```
Chưa thử gì trên runtime thật — xem mục "Chưa thử gì" dưới đây.
```

**Chưa thử gì**

```
Agent CHƯA tự gửi request thật (đủ số lần để chạm limit) cho bất kỳ endpoint nào trong 3 bảng trên,
trên cả production và staging, để xác nhận: (a) response thật khi vượt limit có đúng 429 không, có
header Retry-After/message gì; (b) 3 lớp middleware tương tác với nhau thế nào khi cùng áp lên 1
request (vd photo-upload dính cả upload_rate_limiter và user_rate_limiter); (c) 3 endpoint "chưa có
rate limit riêng" (artworks/upload-psd, temporary-files/.../file + upload-url, customer-uploads store
admin) có thật sự không bị chặn ở bất kỳ lớp nào khác (nginx/Cloudflare/WAF) mà nội dung task không
đọc tới, hay chỉ là middleware ứng dụng không có.
```

---

# Phần 2 — Bạn thấy nó ở đâu

- **URL / ID cụ thể:** `Không có URL/campaign/instance cụ thể — chỉ có đường dẫn source code trong repo teeinblue-api: routes/api.php:1050-1125, config/merchant_throttle.php, app/Http/Middleware/UploadRateLimiter.php, config/app.php:185-189, config/cache.php:26.`
- **Trạng thái đối tượng:** `Không áp dụng — đây là route/config/middleware định nghĩa trong code, không phải state của một object nghiệp vụ cụ thể.`
- **Environment:** `Cả production và staging — số liệu khác nhau theo env, xem 2 cột "Prod / Staging" trong bảng throttle theo route, và 2 giá trị prod/staging của ai_ip_backstop + ai_per_thumbmark_window_seconds.`
- **Role của bạn lúc quan sát:** `Không áp dụng — đây không phải context builder tự đóng vai buyer/seller/staff, mà là tổng hợp lại nội dung người gửi đọc trực tiếp từ routes/config/middleware của teeinblue-api.`
- **Surface:** `api` (chỉ có định nghĩa route + middleware + config; KHÔNG có network capture/response thật nào xác nhận hành vi runtime).

---

# Phần 3 — Để không sinh conflict giả

- **Build / version / ngày deploy:** `Không rõ — nội dung task TIB-004 không ghi commit sha/deploy date/build number cho các route/config này, chỉ có đường dẫn file + số dòng tại thời điểm đọc.`
- **Ngày giờ quan sát:** `2026-09-26 (ngày tạo task TIB-004).`
- **Ticket/PR liên quan đã ship chưa:** `Không rõ — task không link ticket/PR nào, chỉ trích trực tiếp code hiện hành trên nhánh đang chạy.`

**Context hiện đang nói gì:**

- Context version đang dùng: `artwork v3 (2026-09-21, CTX-20260921-03) · sdk v3 (2026-09-21) · asset-category UNPUBLISHED · font v1 (2026-09-11), theo knowledge/manifest.json đọc ngày 2026-09-26.`
- Canon hiện nói: `Không tìm thấy — grep toàn bộ knowledge/products/teeinblue/objects/**/kb.json, feature-summary.md, checklists/*.json cho các từ khoá dưới đây → 0 kết quả liên quan đến rate limit cho upload ở bất kỳ object nào (artwork/asset-category/font/sdk).`
- Đã tra bằng từ khoá: `"rate limit", "throttle", "rate_limit", "429", "upload_rate_limiter", "vector-upload", "gpx-upload", "photo-upload", "thumbmark".`

---

# Phần 4 — Hai câu chỉ bạn trả lời được

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: `KHÔNG AI xác nhận bằng test thật. Nội dung task TIB-004 là mô tả trực tiếp do người gửi tự đọc từ source code (routes/config/middleware) của teeinblue-api, KHÔNG phải PO/Dev confirm bằng văn bản rằng hành vi runtime khớp đúng số liệu này, và context builder cũng chưa tự gửi request nào để xác nhận.`
- Ở đâu, ngày nào: `Task TIB-004 trên QA Hub (project teeinblue), description viết trực tiếp bởi người tạo task, ngày 2026-09-26 — không phải trích từ comment Jira hay ticket riêng.`
- Họ xác nhận chính xác điều gì: `Không có xác nhận "hành vi đúng" nào — chỉ có mô tả cấu hình đọc từ code (3 bảng + danh sách endpoint chưa có rate limit riêng, xem nguyên văn ở Phần 1).`

> **Quan trọng:** toàn bộ số liệu (20/phút, 4/phút, 50/giờ, mặc định 5, 1000/4000, cửa sổ 24h...) là số đọc từ code tại một thời điểm, CHƯA được verify bằng request thật. Không được nâng thành `CONFIRMED_EXPECTED` — chỉ vào canon ở mức `OBSERVED_CURRENT` sau khi context builder tự verify lại, hoặc `INFERRED` nếu chỉ copy nguyên văn từ task mà chưa verify gì thêm.

## 4.2 Bạn KHÔNG đề xuất điều gì?

```
- KHÔNG đề xuất coi các con số cụ thể (20/phút, 4/phút, 30/phút, 6/phút, 50/giờ, 10/10 phút, mặc định
  5, cửa sổ 1 giờ/5 phút, 1000, 4000, 1000+4000, cửa sổ 24h) là đã ổn định lâu dài hoặc đã verify đúng
  runtime — đó là số đọc trực tiếp từ code/config tại ngày 2026-09-26, context builder cần tự gửi
  request thật trên staging để xác nhận trước khi coi là oracle.
- KHÔNG đề xuất tạo object_key mới tên "rate-limit" hay "api-infra" — chỉ đề xuất Ý TƯỞNG rằng cụm 3
  lớp rate-limit này là cross-cutting, chạm vào nhiều object hiện có (artwork/asset-category/font/sdk)
  cùng lúc. Quyết định gắn vào feature nào của object nào, hay giữ như 1 cross-cutting note riêng
  ngoài object, là của qa-context-lifecycle-orchestrator khi build KB thật.
- KHÔNG đề xuất coi 3 endpoint "chưa có rate limit riêng" (artworks/upload-psd,
  temporary-files/.../file + upload-url, customer-uploads store admin) là an toàn hoặc không cần quan
  tâm — task chỉ cho biết KHÔNG thấy middleware ứng dụng riêng, không loại trừ có lớp chặn khác
  (nginx/Cloudflare/WAF) mà nội dung task này không đọc tới.
- KHÔNG đề xuất suy ra hành vi khi nhiều lớp rate-limit cùng áp lên 1 request (vd photo-upload dính cả
  upload_rate_limiter và user_rate_limiter cùng lúc) — thứ tự và cách 2 lớp tương tác với nhau chưa
  được kiểm tra, không tự suy diễn ai override ai.
```

## 4.3 Đề xuất context nên nói gì

```
Các endpoint upload file trong teeinblue-api có 3 lớp rate-limit khai báo trong code — throttle
theo route ở tầng merchant (vector/gpx/strava/pdf-upload, upload-url, uploaded-at, upload-error-logs),
middleware upload_rate_limiter riêng cho các route kèm effect GenAI tốn tài nguyên (photo-upload,
customer-uploads/apply-effects/generate/generate-from-multiple-images, image-filter-effects) với
backstop theo IP và theo thumbmark, và user_rate_limiter:<resource> theo user đăng nhập cửa sổ 24h
cho layer-images/cliparts/clipart-categories — nhưng CHƯA có bất kỳ ghi nhận nào trong canon QA context
hiện tại (0 kết quả cho từ khoá rate limit/throttle/429 trên toàn bộ knowledge/). Context builder cần
tự gửi request thật trên staging để xác nhận số liệu, response shape khi vượt limit (429 + message/
Retry-After), và cách các lớp tương tác khi cùng áp lên 1 request, trước khi đưa vào KB làm oracle cho
regression test liên quan giới hạn upload của artwork/asset-category/font/sdk.
```

## 4.4 Mức độ gấp

`MEDIUM` — task TIB-004 tự gắn priority `High` trên QA Hub, nhưng tiêu chí gấp của CCR là có đang chặn test P0/P1 hay không: hiện chưa có report bug/incident nào do rate limit trong nội dung task này, nên xếp `MEDIUM` (ảnh hưởng coverage — bất kỳ test case "upload nhiều lần liên tiếp"/"spam upload" cho artwork/asset-category/font/sdk hiện không có oracle để đối chiếu response 429 đúng/sai). Nếu phát sinh test P0/P1 đang fail vì 429 bất ngờ, mức độ gấp nên được nâng lại thành `HIGH`.

---

# Phần 5 — Evidence

Ảnh / HAR / response / link: `Không có — CCR này dựng hoàn toàn từ nội dung mô tả của task TIB-004 (trích dẫn route/config/middleware trong code), không có evidence file (screenshot/HAR/network capture) nào do context builder tự thu thập.`

> Đã kiểm tra: nội dung task TIB-004 chỉ có route path, config key, tên middleware/class và số dòng file — không có email/số điện thoại/tên khách hàng thật/token/cookie.

---

# Tự kiểm trước khi gửi

`[BẠN]` — bốn câu, phần còn lại agent đã lo:

- [x] Đây thật sự là **một** thứ được gỡ độc lập (Phần 0) — đúng, gộp 1 CCR, để orchestrator tự quyết cách gắn vào từng object
- [x] Tôi đã trả lời mục 4.1 (ai xác nhận) trung thực — KHÔNG AI xác nhận bằng test thật, chỉ là mô tả đọc từ code
- [x] Tôi đã điền mục 4.2 (KHÔNG đề xuất điều gì) — đã điền
- [x] Evidence đã bỏ PII/token — không có evidence file, nội dung chỉ có route/config/middleware, không có PII

`[AGENT]` — soát lại:

- [x] `observed_count` là con số thật (1 — đọc code 1 lần, chưa test runtime), không làm tròn lên
- [x] Đã ghi build hoặc thừa nhận "không rõ" cho toàn bộ nội dung (không có commit sha/deploy date)
- [x] Đã ghi từ khoá đã tra canon
- [x] Chỗ nào bỏ trống đều có khai lý do (role/trạng thái đối tượng/build đều ghi "không áp dụng"/"không rõ" kèm lý do)
