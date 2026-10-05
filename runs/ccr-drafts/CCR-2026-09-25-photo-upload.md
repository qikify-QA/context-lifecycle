# Context Change Request (CCR) — Photo Upload / GenAI generate cluster

> Điền từ template `contracts/context-change-request.template.md`. Nội dung dưới đây do agent tổng hợp từ 6 Jira ticket đã Done — CHƯA có lượt tự explore lại trên staging của context builder. Đọc kỹ mục "Tự kiểm trước khi gửi" trước khi đính vào QA Hub.

**Tiêu đề task:** `[CCR] PROFILE_GAP — artwork (Photo Upload/Text-to-Image cluster) — 6 ticket đã ship chưa vào canon, cân nhắc tách object riêng`

---

## Đã xác nhận bởi người gửi (2026-09-25)

`TIB-52171` là gõ nhầm — ticket đúng là **TIB-5217** (`Text-to-image: generate an AI image from text (beta)`), người gửi đã xác nhận. Mục 4.1 (TIB-5302/TIB-5188 không có ai xác nhận bằng văn bản) và mức độ gấp `MEDIUM` (4.4) cũng đã được người gửi chấp nhận giữ nguyên như agent đề xuất.

---

# Phần 0 — Bạn cần mấy CCR?

**1 CCR**, không tách. Cả 6 ticket cùng: người gỡ (context builder tự explore lại portal + storefront + api + db), điều kiện mở khoá (một đợt re-explore), vòng đời (độc lập, không gắn 1 task cụ thể), và artifact đích chung nhóm layer-type Photo Upload/Text-to-Image trong object `artwork` (đề xuất tách thành object riêng để orchestrator tự quyết khi build KB — xem Phần 4.2).

---

# Phần 1 — Bạn thấy gì

**Loại request:** `PROFILE_GAP`

(Có kèm `BEHAVIOR_CHANGE` cho TIB-5188/TIB-5339/TIB-5302, và một đề xuất `CANON_HYGIENE` về ranh giới object — xem Phần 4.2. Không tách CCR vì lý do ở Phần 0.)

**Object** — theo `_registry.json` hiện tại, KHÔNG có object_key `photo-upload` hay `text-to-image` riêng. Toàn bộ layer type này đang nằm dưới:

- `object_key: artwork`, alias `photo layer` — feature_id liên quan: `layer-type-config-photo` (KB-017), `layer-type-config-multiple-uploads` (KB-018), `layer-type-config-text-to-image` (KB-019), `populate-values` (KB-010 và related)
- Phần SDK/storefront runtime (upload async, min-resolution) hiện KHÔNG map vào feature nào trong `object_key: sdk` — grep `knowledge/products/teeinblue/objects/sdk/kb.json` không ra kết quả nào cho photo-upload/customer-upload/async/resolution.

**Đừng bịa `object_key: photo-upload`** — nó chưa tồn tại trong registry. Đề xuất tạo mới nằm ở Phần 4.2, để context builder tự quyết khi build KB (registry chỉ do `qa-context-lifecycle-orchestrator` sửa, tự sinh từ kb_candidates).

**Quan sát được** — tổng hợp từ 6 ticket Jira (Resolution: Done), KHÔNG phải quan sát trực tiếp của agent:

```
1. TIB-5146 (Done, 2026-08-12/17) — Layer type mới "Multiple Uploads": buyer upload 2-3 ảnh vào 1 layer,
   GenAI (Gemini/OpenAI/Flux/ImagenHub) merge thành 1 ảnh output. Portal thêm settings Output Type/
   Maximum photos/Upload editor/GenAI service/"Use Template Default Size" (riêng ImagenHub). SDK: photo
   strip + drag reorder + upload-on-select + nút Generate/Generate again + error theo nhóm ("Your #2, #3
   photos do not meet the minimum required resolution."). API mới: POST /customer-uploads/
   generate-from-multiple-images (202 + polling qua image-filter-effects/status). DB: cột mới
   customer_uploads.source_customer_upload_ids. Dev tự ghi lệch spec: ảnh upload ngay khi chọn (không
   đợi bấm Generate) — có lý do kèm theo trong comment.

2. TIB-5217 (Done, 2026-08-04, THAY CHO TIB-52171 không tồn tại — xem cảnh báo đầu file) — Layer type mới
   "Text to Image": buyer bấm Generate, GenAI render ảnh từ prompt seller viết (biến {{Layer name}}, kể cả
   khoá con của JSON List). Luôn required, ẩn toggle required. Add to Cart bị chặn nếu giá trị biến đổi
   sau khi generate ("stale") hoặc generate thất bại. Flux v1 cảnh báo không hỗ trợ text-to-image (edit-only).
   ImagenHub dùng template picker thay vì prompt.

3. TIB-5326 (Done, 2026-09-07) — Bó 9 hạng mục hoàn thiện để công khai Text-to-Image + JSON List: message
   riêng khi chưa generate, lịch sử ảnh đã generate trên storefront (thumbnail strip, gated bởi "Allow
   buyers to choose previous processed images"), Duplicate & Share, JSON List fallback {{name}}, JSON List
   trong order details theo cart template, search theo mọi field JSON List, ẩn "Example prompts" trên
   Text-to-Image, style nút Generate theo theme, và bỏ Beta badge — hiện toàn bộ user thấy được
   Text-to-Image/JSON List (trước đó Beta).

4. TIB-5302 (Done, 2026-09-22 — MỚI NHẤT, sau ngày publish artwork v3 gần nhất 2026-09-21) — Thêm giá trị
   mới cho "Populate Content from another option": {{input}} (ảnh gốc TRƯỚC effect) và {{input.N}} (theo
   index, khi nguồn là Multiple Uploads), bên cạnh {{output}} (ảnh SAU effect, {{value}} cũ tương đương
   {{output}}). Khi populate {{input}} vào layer đích, engine tự chạy effect flow của layer đích (gọi cả
   3rd-party GenAI). Mục đích: 1 lần buyer upload → nhiều output khác nhau (Single Upload/Multiple Uploads
   + Multiple Outputs).

5. TIB-5339 (Done, 2026-09-08) — SDK: khi route presigned S3 lỗi/không dùng được, fallback endpoint
   `photo-upload` trước đây chạy effect GenAI ĐỒNG BỘ trong request nên timeout ("failed to fetch") dù
   server render thành công. Sửa: fallback route giờ upload ảnh KHÔNG kèm effect rồi dispatch effect GenAI
   qua CÙNG cơ chế async job + polling mà route presigned vốn dùng. Effect không phải GenAI vẫn giữ nguyên
   inline như cũ.

6. TIB-5188 (Done, 2026-07-27) — Bug: seller đặt minimum resolution (vd 2000x2000), buyer upload ảnh
   3500x5000 (> ngưỡng) nhưng vẫn bị chặn "does not meet the minimum resolution". Nguyên nhân: pipeline
   GenAI resize ảnh về 2000x2000 TRƯỚC KHI crop, nên vùng crop nhỏ hơn ảnh gốc luôn dưới ngưỡng sau crop.
   Sửa: resize SAU crop.
```

- Thấy mấy lần: `0 — agent chưa tự quan sát trực tiếp lần nào. Toàn bộ nội dung trên lấy từ mô tả/comment do chính dev viết trong 6 ticket Jira (nhiều ticket có sẵn bảng test case do dev soạn, đánh dấu "Ready to test").`
- Trên mấy tài khoản/store/thiết bị khác nhau: `Không rõ — dev có nhắc 1 case thật trên production (TIB-5339: instance 43108, myfurryprints.com) và 1 case thật khác (TIB-5188: instance 41289, portal.teeinblue.com/campaigns/961201), còn lại là môi trường nội bộ dev không ghi rõ.`

**Bạn thử gì mà KHÔNG tái hiện**

```
Chưa thử gì — xem mục dưới.
```

**Chưa thử gì**

```
Agent CHƯA tự explore lại bất kỳ mục nào trong 6 ticket trên trên staging/production sau khi chúng đã
ship. Đây chính là việc cần giao cho context builder: re-explore Photo Upload (Single/Multiple Uploads),
Text-to-Image, và cơ chế Populate Content {{input}}/{{output}} trên đủ 4 surface (portal/storefront/
api/data), vì canon hiện tại (xem Phần 3) chỉ có evidence portal, quan sát 1 lần, confidence LOW/MEDIUM.
```

---

# Phần 2 — Bạn thấy nó ở đâu

- **URL / ID cụ thể:**
  - Ticket: https://ownego.atlassian.net/browse/TIB-5146 · https://ownego.atlassian.net/browse/TIB-5217 (thay cho TIB-52171) · https://ownego.atlassian.net/browse/TIB-5326 · https://ownego.atlassian.net/browse/TIB-5302 · https://ownego.atlassian.net/browse/TIB-5339 · https://ownego.atlassian.net/browse/TIB-5188
  - Ví dụ instance/campaign dev có nhắc trong ticket (không phải context builder tự chạm vào): `admin.teeinblue.com/admin/instances/43108`, `myfurryprints.com/products/pet-portrait-bathroom-times` (TIB-5339); `admin.teeinblue.com/admin/instances/41289`, `portal.teeinblue.com/campaigns/961201/edit?product-id=306447` (TIB-5188)
- **Trạng thái đối tượng:** Đa dạng theo ticket — xem mô tả từng ticket ở Phần 1. Tất cả đã merge/deploy (Resolution: Done).
- **Environment:** `Không rõ chính xác — dev test trên môi trường nội bộ không ghi rõ tên; 2 ví dụ ở trên là production thật (khách hàng report qua Slack).`
- **Role của bạn lúc quan sát:** `Không áp dụng — đây không phải context builder tự đóng vai buyer/owner, mà là tổng hợp lại lời khai của dev trong ticket.`
- **Surface:** `portal` · `storefront` · `api` · `db` (theo mô tả ticket) — nhưng KHÔNG có evidence file (screenshot/HAR/DOM snapshot) do context builder tự thu, chỉ có text mô tả của dev.

---

# Phần 3 — Để không sinh conflict giả

- **Build / version / ngày deploy:**
  - TIB-5146: `VITE_PLUGINS_VERSION=20260812` cả SDK và Portal (dev tự ghi, bắt buộc deploy cùng lúc)
  - TIB-5217/5326/5302/5339/5188: không rõ build number cụ thể, chỉ có ngày resolve/update (xem dưới)
- **Ngày giờ quan sát (= ngày ticket resolve/update cuối, KHÔNG phải ngày context builder tự explore):**
  - TIB-5146: 2026-08-17 · TIB-5217: 2026-08-04 · TIB-5326: 2026-09-07 · TIB-5302: 2026-09-22 · TIB-5339: 2026-09-08 · TIB-5188: 2026-07-27
- **Ticket/PR liên quan đã ship chưa:** `Đã ship — cả 6 ticket đều Resolution: Done.`

> Lưu ý quan trọng cho conflict: TIB-5302 update **2026-09-22**, tức là **SAU** lần publish gần nhất của object `artwork` (context version 3, publish 2026-09-21, `CTX-20260921-03`). Nghĩa là ngay cả bản canon "mới nhất" hiện tại chắc chắn KHÔNG phản ánh TIB-5302.

**Context hiện đang nói gì** (trích nguyên văn từ `knowledge/products/teeinblue/objects/artwork/kb.json`, đọc ngày 2026-09-25):

- `KB-017` — *"Photo Upload › Single Upload (photo) — field upload/editor riêng"*. `knowledge_kind: OBSERVED_CURRENT`, `confidence: LOW`, `observed_count: 1`, coverage `portal ✅ · api ❌ · data ❌ · storefront ❌`. Chỉ mô tả hình dạng form cấu hình trong portal, KHÔNG có gì về hành vi buyer/API/DB.
- `KB-018` — *"Photo Upload › Multiple Uploads (multiple-uploads) — thiếu POPULATE VALUES, có GenAI service riêng"*. `confidence: MEDIUM`, `observed_count: 2`, cùng coverage portal-only. Ghi đúng phần shape form (Output Type/Maximum photos/GenAI service), KHÔNG có gì về SDK upload flow, endpoint mới, hay DB column mới ở TIB-5146.
- `KB-019` — *"Text to Image (AI) (text-to-image) — thiếu 'No personalization', GenAI service label khác multiple-uploads"*. `confidence: LOW`, `observed_count: 1`, portal-only. Không có gì về buyer flow/staleness warning/history strip ở TIB-5217/5326.
- `KB-010` — *"Accordion POPULATE VALUES — boundary-set (22/35 có; 13/35 không)"* xác nhận Multiple Uploads và Text-to-Image không có accordion POPULATE VALUES TRÊN CHÍNH NÓ (đúng, không mâu thuẫn với TIB-5302 — TIB-5302 nói về field trên LAYER ĐÍCH, không phải trên chính Photo Upload/Multiple Uploads). Canon KHÔNG có giá trị `{{input}}`/`{{input.N}}` nào được ghi nhận.
- Object `sdk` (kb.json, publish v3 2026-09-21): grep toàn file cho `photo-upload`/`customer-upload`/`async`/`resolution` (theo nghĩa min-resolution) → **0 kết quả liên quan**. Không có gì về TIB-5339 (async fallback) hay TIB-5188 (resize-after-crop).
- **Đã tra bằng từ khoá:** `photo upload`, `photo_upload`, `photo-upload`, `multiple upload`, `text to image`, `text-to-image`, `customer-upload`, `async`, `resolution` — trên `artwork/kb.json` và `sdk/kb.json`.

---

# Phần 4 — Hai câu chỉ bạn trả lời được

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: `Dev (chinhdt) — tự viết "Context" + "Behaviour changes" + bảng Test cases trong chính comment của ticket, đánh dấu trạng thái "Ready to test"; ticket đã Resolution: Done.` Đây là dev-confirmed, KHÔNG phải PO business sign-off, và KHÔNG phải context builder tự verify trên môi trường thật.
- Ở đâu, ngày nào:
  - TIB-5146 comment #47717, 2026-08-12
  - TIB-5217 comment #47045, 2026-08-04
  - TIB-5326 comments #48965–#48974, 2026-08-26
  - TIB-5339 comment #49036, 2026-08-26
  - TIB-5188: KHÔNG có comment tổng hợp dạng "Behaviour changes" — chỉ có thread hỏi đáp Slack-sync gốc + mô tả issue gốc, chưa thấy dev confirm bằng văn bản là fix đã hoạt động đúng như mô tả
  - TIB-5302: KHÔNG có comment nào (0 comments) — chỉ có description gốc, resolution Done nhưng KHÔNG có ai xác nhận behavior thực tế khớp spec
- Họ xác nhận chính xác điều gì: `Xem nguyên văn từng "Behaviour changes" + "Test cases" trong Phần 1 (đã diễn giải tóm tắt, không phải trích 100% nguyên văn — bảng gốc dài, xem trực tiếp link ticket để lấy nguyên văn khi cần).`

> **Quan trọng:** TIB-5302 và TIB-5188 KHÔNG có xác nhận bằng văn bản là hành vi sau fix đã đúng như mô tả (không comment "Ready to test"/QA pass). Hai ticket này khi vào KB nên gắn `OBSERVED_CURRENT` (nếu context builder tự verify lại) chứ KHÔNG suy diễn thành xác nhận sẵn có.

## 4.2 Bạn KHÔNG đề xuất điều gì?

```
- KHÔNG đề xuất coi các "Behaviour changes"/"Test cases" dev tự viết trong comment là expected result đã
  duyệt sẵn — đó là ghi chú kỹ thuật của dev, context builder vẫn phải tự quan sát lại trên staging/
  production để xác nhận (đặc biệt TIB-5302 và TIB-5188 — không có ai review bằng văn bản).
- KHÔNG đề xuất tên object_key cụ thể là "photo-upload" — chỉ đề xuất Ý TƯỞNG tách Photo Upload/
  Multiple Uploads/Text-to-Image ra khỏi object `artwork` thành 1 object riêng (tương tự cách
  `asset-category` tách khỏi `artwork` dù cũng là 1 kiểu layer/category). Tên, ranh giới chính xác, và có
  tách hay không là quyết định của qa-context-lifecycle-orchestrator khi build KB thật, KHÔNG phải quyết
  định có sẵn trong CCR này.
- KHÔNG đề xuất coi TIB-5339 (async fallback) và TIB-5188 (resize sau crop) là đã document đầy đủ dưới
  object `sdk` — hiện tại object đó CHƯA có gì, cần context builder tự quyết feature nào chứa 2 hành vi này.
- KHÔNG đề xuất số liệu cụ thể nào (giới hạn 2-3 ảnh, timeout 360s/370s, VITE_PLUGINS_VERSION...) đã ổn
  định lâu dài — đó là con số dev ghi tại thời điểm ship, cần context builder tự re-verify trên bản build
  hiện hành trước khi coi là oracle.
```

## 4.3 Đề xuất context nên nói gì

```
Photo Upload (Single Upload, Multiple Uploads) và Text to Image (AI) là các layer type GenAI cùng hệ
sinh thái, hiện chỉ được document ở mức "hình dạng form cấu hình portal" (LOW/MEDIUM confidence, quan sát
1 lần, KHÔNG có coverage storefront/api/data). Từ 2026-07 đến 2026-09, 6 thay đổi đã ship: 2 layer type
mới (Multiple Uploads, Text to Image), phát hành công khai (bỏ Beta), khả năng populate ảnh gốc
{{input}}/{{output}} giữa các layer, chuyển effect GenAI trên route fallback sang async để tránh timeout,
và sửa lỗi thứ tự resize/crop ảnh hưởng tới minimum-resolution validation. Context builder cần re-explore
đủ 4 surface (portal/storefront/api/data) cho toàn bộ cụm này, và cân nhắc tách thành object riêng ngang
hàng `asset-category` thay vì tiếp tục là 3 feature rời rạc dưới `artwork`.
```

## 4.4 Mức độ gấp

`MEDIUM` — không chặn test P0/P1 hiện tại (features đã public và chạy ổn định theo ticket), nhưng ảnh hưởng coverage: bất kỳ regression test nào cho Photo Upload/Text-to-Image/Populate Content hiện không có canon LOW-risk để đối chiếu, và bản canon "mới nhất" (v3, 2026-09-21) đã lạc hậu hơn ticket mới nhất (TIB-5302, 2026-09-22) ngay từ ngày publish.

---

# Phần 5 — Evidence

Ảnh / HAR / response / link: `Không có — CCR này dựng từ nội dung Jira (text), không có evidence file nào do context builder tự thu thập. Ảnh đính kèm trong các ticket gốc (nếu cần) nằm trực tiếp trong Jira, không copy lại vào đây để tránh evidence trôi nổi ngoài nguồn.`

> Không có PII trong nội dung tổng hợp ở trên — đã kiểm tra, chỉ có tên nội bộ dev/support (chinhdt, thangnh, trangntt, trangdh, tinhpt, quynhanh) từ comment Jira, không có email/số điện thoại/tên khách hàng thật.

---

# Tự kiểm trước khi gửi

`[BẠN]` — bốn câu, phần còn lại agent đã lo:

- [x] Đây thật sự là **một** thứ được gỡ độc lập (Phần 0) — đã xác nhận: đúng, gộp 1 CCR
- [x] Tôi đã trả lời mục 4.1 (ai xác nhận) trung thực — người gửi xác nhận 2026-09-25: giữ nguyên như agent ghi (TIB-5302/TIB-5188 KHÔNG có xác nhận bằng văn bản)
- [x] Tôi đã điền mục 4.2 (KHÔNG đề xuất điều gì) — đã điền
- [x] Evidence đã bỏ PII/token — không có evidence file, chỉ có tên dev nội bộ (không phải PII khách hàng)
- [x] **Riêng CCR này:** `TIB-5217` đã được người gửi xác nhận đúng là ticket thay cho `TIB-52171` (gõ nhầm)

`[AGENT]` — soát lại:

- [x] `observed_count` là con số thật (0 — agent chưa tự quan sát), không làm tròn lên
- [x] Đã ghi build hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi từ khoá đã tra canon
- [x] Chỗ nào bỏ trống đều có khai lý do (role/environment/evidence)
