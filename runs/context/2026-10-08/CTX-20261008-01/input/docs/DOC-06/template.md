# Templates — list, detail, CRUD flow đã verify

Ngày xác nhận: 2026-08-30, tài khoản "HUB 1". Route: `/templates` (list),
`/templates/{id}` (detail). Kiến thức nền sản phẩm/API xem
[imgh.md](imgh.md).

## Khái niệm

Template = 1 "recipe" đóng gói sẵn: **model** + **prompt** (có thể chứa
biến `{{...}}`) + **default input params** + tùy chọn **post-processing
steps** nối tiếp. Mục đích: caller chỉ cần gọi API với `template_id` (+
giá trị biến nếu có) thay vì set lại toàn bộ params mỗi lần.

## Trang list (`/templates`)

- Bảng (List view): Name / ID (copy được) / Category / Model / Created /
  actions. Grid view: card thumbnail + tên, không hiện chi tiết trực
  tiếp (phải click vào). Toggle Grid/List là client-side state, mất khi
  F5, không đổi URL.
- **123 template** trong org test này, 20/trang, đa số là template test
  cho TIB integration (`[TIB] ...`) và Dynamic Upload Ratio
  (`Test DUR - ...`).
- Search, sort ("Date Created ↓" mặc định).
- **Filter** popup: chỉ 2 submenu **Model ›** và **Category ›**
  (drill-down chọn giá trị) — không filter được theo ngày tạo hay theo
  có/không có variables.
- Toolbar có 2 icon không label text + nút "Import":
  - Icon 1 = **New Template**
  - Icon 2 = **New Category**
  - "Import" (aria-label "Browse public templates")

## Flow "New Template" (đã verify chạy thật)

1. Bấm **New Template** → modal **"Choose a Model"**: search + filter
   All/Image To Image/Text To Image, click 1 model card.
2. Modal chuyển sang bước 2 **"New Template"**: form gồm
   - **Name*** (bắt buộc)
   - **Description** (optional)
   - **Category** (combobox "Choose or create a category")
   - **Prompt*** — cùng kiểu input như model page, **nhận `{{variable}}`
     ngay lúc tạo** (test với `{{animal}}`, hiện Preview đúng)
   - Param khác tuỳ model (VD Aspect ratio)
3. Bấm **Save** → tạo thành công, redirect về list, template mới nằm đầu
   (sort mặc định "Date Created ↓"), count tăng +1.

Test thực tế: tạo template `xai/grok-imagine-image` + prompt `A cute
cartoon {{animal}} mascot logo, flat vector style, simple shapes` → lưu
thành công (123→124), sau đó xoá sạch để không để lại rác (124→123).

### ⚠️ Quirk (phát hiện 2026-09-10): nhấn Escape khi Category dropdown đang mở sẽ đóng LUÔN toàn bộ modal "New Template", mất hết dữ liệu đã điền

Category field là 1 multiselect (searchbox + listbox options) — sau khi
click chọn 1 option, dropdown **không tự đóng**. Nếu nhấn `Escape` để
đóng nó (thao tác trực giác), event bị bắt bởi component modal cha
(vue3-easy-data-table / cùng lib với multiselect) và đóng **toàn bộ**
dialog "New Template" — mất Name/Prompt/Category đã điền, phải làm lại
từ đầu (kể cả bước chọn model). Đã tái hiện đúng thao tác này 1 lần khi
build lại `TC-IGH-075` (2026-09-10) trước khi tìm ra cách né.

**Cách né (đã verify)**: sau khi chọn xong 1 category trong dropdown,
đừng bấm Escape — click vào field khác trong form (VD field **Name**)
để chuyển focus, dropdown sẽ tự đóng mà **không** đóng theo modal cha.

### ⚠️ Phát hiện (2026-09-10): category cụ thể trong test data không đảm bảo còn tồn tại lâu dài — categories là dữ liệu tổ chức, có thể bị xoá/đổi

Lần chạy trước (2026-08-30, xem ghi chú `qa-output`/Testlane TC-IGH-075)
dùng category **"Portrait"** thành công. Chạy lại **2026-09-10** cùng
account "HUB 1": gõ "portrait" vào Category combobox chỉ hiện gợi ý
**"Press enter to create it"** — nghĩa là category "Portrait" **không
còn tồn tại** trong org này nữa (bị xoá, hoặc đổi tên, không rõ nguyên
nhân — không phải bug, có thể ai đó trong team đã dọn dữ liệu test).

**Ý nghĩa cho automation/test case**: test case nào ghi cứng tên
category cụ thể trong Test Data (VD "Portrait") có rủi ro category đó
biến mất giữa các lần chạy, vì category là dữ liệu mutable của org dùng
chung, không phải fixture cố định của app. Nên coi tên category trong
Test Data là **ví dụ minh hoạ cho "1 category có sẵn"**, không phải giá
trị bắt buộc phải khớp chính xác — khi chạy lại mà category mẫu không
còn, chọn tạm 1 category khác đang có sẵn trong dropdown (list đầy đủ
lúc 2026-09-10: `1`, `1243`, `2`, `3`, `4`, `5`, `8`, `aaa`, `Cafe`,
`Café`, `cat1`...`cat5`, `check`, `check 5`, `check4`, `EVL`, `test`,
`test DUR`, `Test import public template`, `Test post-processing`,
`test2`, `test3`, `Text to image`, `Variables` — không còn `Portrait`)
và ghi rõ trong actualResult là đã đổi category do category mẫu không
còn tồn tại, không phải lỗi ứng dụng.

## Xoá template

3 nút action ở cuối mỗi row/card: 2 icon đầu chưa xác định rõ (không mở
gì khi hover — có thể Duplicate/Edit-quick), **nút thứ 3 = Delete trực
tiếp** — bấm phát mở ngay confirm dialog "Delete Template" (không phải
dropdown menu 3-chấm như đoán ban đầu). Confirm → xoá vĩnh viễn ngay.

⚠️ **Quirk**: sau khi Delete, pagination count trên UI **không tự cập
nhật ngay** (vẫn hiện số cũ tới khi navigate lại/reload trang) — cache
client-side chưa invalidate đúng lúc. Dễ gây nhầm "xoá không thành công"
nếu chỉ nhìn count mà không reload.

⚠️ **Bug xác nhận 2026-09-17 (BUG-130, TC-IGH-205)**: dialog "Delete
Template" **luôn generic**, kể cả khi template đang xoá đang được dùng
làm **fallback** của 1 template khác — không có bất kỳ cảnh báo nào về
việc này (xem mục "Fallback template" bên dưới).

## Trang chi tiết template (`/templates/{id}`)

- Khu trái: **Main processing** — model đang gán (đổi được qua "Change"),
  Prompt (hiện raw text kèm biến nếu có), các param khác tuỳ model (size,
  quality, background...).
- Khu phải: tên template + nút Edit, badge "Variables" nếu có biến (chỉ
  là label tĩnh, không click được), **Post-processing** (xem mục riêng
  bên dưới), nút **Run** (hiện tổng credit ước tính gồm cả
  post-processing) + **Run in Batch**, và **Run history**.
- Nút **Update "..."** để lưu thay đổi param vào chính template, và **Try
  on model** để mở playground của model gốc (giữ nguyên gắn kèm template).
- **Viewer**: toàn bộ cột phải (Edit, Post-processing, Fallback template)
  biến mất hoàn toàn, chỉ còn form Main processing bên trái (readable),
  nút Run/Run in Batch disabled, không có nút Update — xác nhận
  2026-09-17 qua TC-IGH-204 (org "test04's organization").

### Post-processing — Edit

Bấm **Edit** cạnh "Post-processing" → chuyển sang edit mode tại chỗ
(không phải modal riêng):
- Mỗi step hiện: tên model, cost ước tính, nút **↑ ↓** (reorder, disable
  nếu chỉ 1 step hoặc đang ở đầu/cuối), nút **✕** (xoá step).
- Nút **+ Add step** → mở list model để thêm — **danh sách chỉ gồm model
  image-to-image loại "editor"** (remove background, upscaler, resize,
  face cutout...) — hợp lý vì post-processing luôn chạy trên ảnh đã
  generate từ Main processing, không nhận model text-to-image.
- Cuối form: text "adds ~X credits per run" (tổng cộng thêm nếu save) +
  **Cancel**/**Save**. Test **Cancel** không lưu gì — xác nhận không có
  side-effect khi huỷ.

### Run history — click 1 run mở lightbox chi tiết

Mỗi lần bấm **Run** ở trang template (dù có post-processing hay không)
đều tạo 1 task, hiện ngay trong "Run history" local của template đó **và**
đồng thời ghi vào **Task History** toàn org (`/tasks`, cùng task_id) —
xem [task-history.md](task-history.md) để có chi tiết đầy đủ hơn nhiều
(raw prompt đã gửi, Processing chain dạng bảng, Logs timestamp) so với
lightbox rút gọn dưới đây.

Bấm vào 1 item trong "Run history" → mở **dialog lightbox** (không phải
trang riêng, không đổi URL):
- Header: `Run {task_id}` + status badge (Success/Error).
- Ảnh full-size, nút **Previous/Next** để lướt qua các run khác, dải
  thumbnail bên dưới để click nhảy trực tiếp.
- Footer: `Task ID: {id}` + nút **"Open in model page"** → mở URL
  `/models/{model}?template={id}&task={task_id}` — load lại đúng run đó
  (input + output) vào Playground để xem/inspect chi tiết hoặc rerun.

### Run history — nội dung list, phân trang, API (xác nhận 2026-10-01, IGH-261)

- ⚠️ **Run history chỉ hiển thị run Success** — run Error không xuất hiện
  trong list của template (trong khi [task-history.md](task-history.md) toàn
  org thì có). Hệ quả: **không dựng được fixture "template có run Error"**
  qua UI, nên case nào yêu cầu nó phải blocked chờ PO trả lời là Run history
  *nên* hiện run Error hay không — PO chưa chốt (TC-IGH-252, task Testlane
  IGH-012).
- **Phân trang 15 run/trang**, gọi `GET /api/templates/{id}/runs?page=N` (dùng
  được bằng cookie session, TTFB ~0.2 s, response JSON nhỏ nên gần như toàn bộ
  thời gian là server xử lý).

### Ảnh trên trang chi tiết template — nguồn URL & chỗ chậm (xác nhận 2026-10-01, IGH-261)

Đo bằng Resource Timing trên staging + preview, org HUB 1. Quan trọng khi
viết case về hiệu năng hoặc về ảnh vỡ:

- **Thumbnail Run history**: `.webp` ~400 px, URL **CDN công khai, không ký** →
  tải nhanh (~0.2 s/ảnh) và cache được.
- **Ảnh full-size trong lightbox**: đúng ảnh output gốc (1024² hoặc 2048²,
  2–2.5 MB), **không có bản resize trung gian**, qua URL **ký `X-Amz-...` hết
  hạn 1 giờ**. Avatar/thumbnail của template và ảnh input (~564 px) cũng là URL
  ký.
- ⚠️ **Chữ ký được sinh lại mỗi lần tải trang** → URL đổi liên tục nên browser
  **không dùng lại được cache**: mở lại đúng một ảnh lightbox vẫn tải lại toàn
  bộ file (≈1.3–5 s với ảnh 2048², ~0.4 s với 1024²). Đây là chỗ chậm nhất của
  trang, không phải thumbnail.
- **"Mở trang đến khi thấy đủ 15 thumbnail" mất ~2–5 s**, trong đó tải ảnh chỉ
  ~0.2 s/ảnh — phần còn lại là tải app + gọi API + render. Nên khi chốt tiêu chí
  hiệu năng với PO, phải nói rõ đo "thao tác → ảnh hiện" hay "thời gian tải
  từng ảnh" (Resource Timing): hai con số lệch nhau cả vài giây.
- **Thay đổi của IGH-261** (đã có trên preview `public-image-urls`, **chưa lên
  staging**): nhóm ảnh ký ở trên (lightbox, avatar template, ảnh input) đổi
  sang **URL công khai cố định, không chữ ký**, giữ nguyên độ phân giải và dung
  lượng; thumbnail Run history không đổi. Kết quả đo: **lần mở đầu không nhanh
  hơn staging**, nhưng mở lại ảnh đã xem thì gần như tức thì (~0.04–0.15 s so
  với ~2–4 s) vì browser cache được. ⚠️ Rủi ro cần dev xác nhận có chủ đích:
  link ảnh output khi đó xem được vĩnh viễn, trái quy tắc "URL ký hết hạn 1 giờ"
  trong [imgh.md](imgh.md) (chưa test mở link khi chưa đăng nhập).
- Preview `igh-263-...` (ticket IGH-263) **không chứa code IGH-261** — URL ảnh
  giống hệt staging. Đừng dùng nó làm mốc so sánh cho IGH-261.

## Import — Browse Public Templates

Modal riêng, cùng UI list/filter như trang Templates chính (Search,
Filter, Grid/List view). Org test này thấy **45 public template** —
toàn bộ là preset phong cách nghệ thuật sẵn có (Water Color 1/2/3, Royal
Portrait, Stained Glass, Pixel Art Collectible Icon Style, Pencil Sketch,
Portrait Art - Pet Painting...). Mỗi card có 1 nút hành động riêng (khả
năng "Clone vào org mình") — **chưa test bấm nút này** để tránh tạo thêm
rác vào org dùng chung.

## Quirk quan trọng: template có `{{variables}}` — Form mode không có ô để điền

Test trên `[TIB] Text to image - normal` (id
`019fcbcc-ca2f-7027-b6b0-bf203331f712`, model `openai/gpt-image-1.5`,
prompt `Paint a {{animal}} with {{style}} style in the {{background}}`).

### Vấn đề
Ở cả 2 nơi có nút "Run" — trang chi tiết Template và trang "Try on model"
(input mode = **Form**, mặc định) — bấm **Run** khi template có biến
`{{...}}` chưa điền chỉ hiện lỗi validation ngay dưới ô Prompt:
`"Variables {{animal}}, {{style}}, {{background}} are required."` —
**không có bất kỳ ô input nào xuất hiện** để điền giá trị cho từng biến.
Prompt hiển thị là 1 đoạn text tĩnh, click vào không edit được. Badge
"Variables" cạnh tên template cũng chỉ là label tĩnh.

### Cách chạy được (workaround đã verify chạy thật)
1. Vào "Try on model" (hoặc mở thẳng trang model, template vẫn gắn kèm
   qua query `?template={id}` — có banner "Template: <tên>" xác nhận).
2. Ở khu **Input**, chuyển toggle **Form → JSON**.
3. JSON hiện ra là raw request body, VD:
   ```json
   { "prompt": "Paint a {{animal}} with {{style}} style in the {{background}}", "size": "1024x1024", "quality": "medium", "background": "auto" }
   ```
4. Sửa trực tiếp field `"prompt"` — thay `{{...}}` bằng giá trị thật (VD
   `"Paint a fox with watercolor style in the forest"`).
5. Bấm Run — chạy bình thường. Cost hiển thị trên nút Run cập nhật
   realtime theo `quality`/`size` chọn.

### Kết luận / ý nghĩa
- Biến template (`{{...}}`) rõ ràng thiết kế để **caller qua API** (VD
  backend Teeinblue) tự truyền giá trị vào field tương ứng khi gọi
  `/process` với `template_id` — không phải để người dùng portal tự điền
  tay qua Form UI.
- Đây là **gap trải nghiệm** khi QA/dev thử nghiệm 1 template có biến
  trực tiếp trên Playground portal mà không biết phải chuyển sang JSON
  mode — dễ bị stuck ở lỗi validation, UI không có tooltip/link gợi ý
  cách fix.
- Đáng cân nhắc báo lại cho team ImagenHub nếu đây không phải hành vi cố
  ý (không phải bug phía TIB — TIB chỉ là 1 caller qua API).

### ⚠️ Phát hiện nghiêm trọng hơn: backend KHÔNG validate biến đã được điền chưa

Soi 1 task thật trong Task History chạy từ template `Test gemini 3.1
variable` (chính template có biến `{{style}}`, `{{color}}`,
`{{background}}` dùng làm ví dụ ở trên) — task này **Success bình
thường**, nhưng prompt thật sự gửi cho provider (xem panel Input) là:

```
Convert this photo to {{style}} with {{color}} in the {{background}}
```

**Y nguyên literal `{{...}}`, không hề được thay giá trị nào cả.** Khác
hẳn hành vi chặn ở Playground UI (mục trên) — ở đây API `/process` thật
**không hề validate/reject** request thiếu biến, mà cứ chuyển thẳng
chuỗi `{{...}}` chưa xử lý cho model. Model (Gemini) không hiểu cú pháp
biến nên bỏ qua luôn phần transform, chỉ trả về gần như ảnh gốc (đã qua
post-processing remove-background) — **không áp dụng style/color/
background nào theo ý định ban đầu của template**, nhưng vẫn tính phí đầy
đủ (10 credits) và báo `Success`.

**Ý nghĩa quan trọng**: validation "Variables ... are required" mà
Playground UI thực hiện (mục trên) là **validation chỉ tồn tại ở tầng UI
Portal**, KHÔNG được backend API thật sự enforce. Nếu 1 caller thật (VD
code TIB) có bug quên fill biến trước khi gọi `/process`, request vẫn
**chạy "thành công"** (tốn credit thật) nhưng cho ra kết quả sai hoàn
toàn ý đồ — không có cách nào phát hiện lỗi này từ phía response (status
vẫn `success`). Đây là rủi ro thật cần lưu ý khi viết integration test
cho TIB: **luôn phải assert nội dung/style ảnh output khớp kỳ vọng, không
chỉ assert `status == success`.**

### Run test thực tế đã verify (2026-08-30)
Prompt: "Paint a fox with watercolor style in the forest", quality `low`
→ kết quả **completed**, cost đúng **1 credit** như ước tính hiện trước
khi Run. Log task lifecycle:
```
request started → processing started → calling provider openai
→ provider openai succeeded → task completed
```
Output: ảnh cáo phong cách watercolor giữa rừng, đúng theo prompt, chất
lượng tốt dù quality=low.

## Run test thực tế khác — tạo template với 1 category có sẵn (2026-09-10, TC-IGH-075)

Chạy qua Testlane task `IGH-006`, test case `TC-IGH-075`. Model
`OpenAI/GPT Image 1 Mini` (text-to-image, tìm bằng search + filter
"Text To Image" trong modal "Choose a Model" — bản `... Edit` cùng tên
là image-to-image, dễ chọn nhầm nếu không lọc). Tạo thành công template
`QA-Cat-B-20260910`, category `cat1` (xem quirk category "Portrait" hết
tồn tại ở mục riêng phía trên), prompt chân dung đơn giản, quality mặc
định `medium`, size `1024×1024`. Save → xuất hiện đầu list, count
130→131. Không xoá lại lần này (không có yêu cầu dọn dẹp từ caller).

## Fallback template (IGH-226) — rule PO đã chốt, 2026-09-17; **đã verify trên staging 2026-09-17**

Nguồn: vòng hỏi đáp PO/Dev trên Slack cho ticket **IGH-226** (RA vòng 5,
`qa-output/analysis_IGH-226.md`; Testlane task `IGH-009`). Spec dưới đây
đã được chạy test thật (TC-IGH-181/183/184/186/196/197/198/204/205/207) —
xem mục "Kết quả chạy test thật" bên dưới cho phần đã verify vs vẫn chỉ là
spec chưa test (do open question Q25 chặn các case cần ép model A fail).

- **Cấu hình**: fallback là **một template khác**, gắn vào template gốc qua một
  trường của chính template gốc (không phải 1 step trong post-processing).
  Trang chi tiết template hiện **giá của template fallback** cạnh trường đó,
  cùng kiểu hiển thị cost như step post-processing.
- **Chỉ 1 cấp**: A fail → chạy B. B fail → task trả error luôn, không chạy tiếp
  fallback của B, và **không quay lại A**.
- **Kích hoạt**: tự động, không hỏi xác nhận, luôn chạy A trước. B chạy khi A
  gặp 4 loại lỗi đã chốt. **Ngoại lệ lỗi credit**: hết Monthly+Bonus (402) hoặc
  chạm trần Overage → **fail ngay, không chạy B**.
- **Credit**: chỉ bước thật sự tạo ra ảnh mới bị tính phí. Khi B chạy, cost của
  task và header `X-Credits-Used` / `X-Credits-Remaining` mà caller nhận được
  thay đổi theo. Ước tính giá hiện **trước khi chạy** vẫn chỉ là giá bước chính (A).
- **Phạm vi chạy**: mọi nơi chạy **qua template** đều có fallback (API
  `/process`, Batch template runner). Chạy model trực tiếp ở tab model thì
  **không** có fallback.
- **Không giới hạn** theo plan hay quyền admin; **Viewer** chỉ được xem, không
  cấu hình được fallback.
- A và B **được phép ra kích thước ảnh khác nhau** — không validate, không cảnh báo.
- Template **không gắn** fallback giữ nguyên hành vi như hiện tại.
- Event webhook khi fail vẫn là **`task.failed`**; không thêm cảnh báo mới, báo
  theo cơ chế hiện có. Task detail ghi A fail, lý do fail và việc chuyển sang B.
- **Xoá template đang được dùng làm fallback** → có cảnh báo (**spec — thực tế
  KHÔNG có, xem BUG-130 bên dưới**).

**Còn treo (chưa có câu trả lời — đừng suy đoán)**: số lần thử lại/timeout của A
trước khi chuyển sang B, fallback chạy `post_processing` của template nào, và A
với B có dùng chung bộ `{{variables}}` hay không.

### Kết quả chạy test thật (2026-09-17, Testlane IGH-009, org HUB 1 trừ khi ghi khác)

Chỉ chạy được các case **không cần ép model A fail** (Q25 chưa có câu trả lời).
Fixtures: T-A `01a0adc7-078d-7043-b8a7-6eaa7aab569c`, T-B (đúng, xác nhận qua
UI) `01a0adc8-daa4-7202-932e-eb69c7bd3608` — ⚠️ lưu ý: **đừng nhầm với**
`01a0addb-2ebb-7213-b4c9-bc19011dadfa` (đó là T-B-zerocredit ở org test03's,
khác hẳn), T-C-nofallback `01a0adcb-f846-72dd-b152-f9c74b95dbd0`.

- **✅ Đúng spec**: chain Processing sau khi A success chỉ có đúng 1 bước
  Generate (không có B); credit trừ đúng bằng giá A (4), không cộng thêm giá B
  (15); nút Run/estimate trước khi chạy chỉ hiện giá A; template không gắn
  fallback (T-C) hành vi y hệt trước release; org 0 credit + overage_limit 0
  (`/api/credits/balance`) → Run trả lỗi `"Not enough credits..."` ngay, **không
  có task nào được tạo** (kể cả của A) trong Task History, balance không đổi;
  Viewer không thấy mục "Fallback template" nào cả (ẩn hoàn toàn, không phải
  chỉ readonly) — xem chi tiết ở mục Viewer phía trên; org Free plan (Admin)
  gắn fallback bình thường, không có nudge nâng gói.
- **❌ BUG-128 / BUG-129 (High/Medium, TC-IGH-181/183)**: sau khi gắn fallback
  và bấm Save (toast "Fallback template saved!" xác nhận lưu OK), panel
  "Fallback template" ở trang chi tiết **luôn** hiện sai:
  `"The fallback template was deleted; runs behave as if none were set."` —
  dù mở lại dialog "Choose a fallback template" vẫn thấy đúng template đích
  đang `checked` và **vẫn tồn tại bình thường** trong danh sách (không hề bị
  xoá). Không hiện tên template fallback, không hiện giá credit của nó ở đâu
  cả. Tái hiện **mọi lần** trên mọi template đã gắn fallback đã thử (T-A ở HUB
  1, T-A-zerocredit ở test03's, Free-T2 ở TEST02's) → có vẻ là bug hệ thống ở
  tầng hiển thị (client fetch nhầm field/endpoint để check "còn tồn tại
  không"), không phải do dữ liệu prep bị hỏng.
- **❌ BUG-130 (Medium, TC-IGH-205)**: dialog "Delete Template" khi xoá 1
  template đang được dùng làm fallback **hoàn toàn generic**, không nhắc gì
  đến việc nó đang được template khác phụ thuộc — sai với rule đã chốt "Xoá
  template đang được dùng làm fallback → có cảnh báo".
- **⚠️ Deviation đã ghi trong actualResult**: TC-184/196 viết theo API
  `/process` + header `X-Credits-Used` — không gọi được đúng nghĩa từ browser
  (gọi thẳng `fetch` tới `/api/process` bị bypass billing, xem
  [staging-api-endpoints.md](staging-api-endpoints.md)) nên dùng nút Run UI +
  Task History (cost/balance) làm bằng chứng tương đương.
- **TC-IGH-204 blocked một phần**: org role Viewer duy nhất (test04's
  organization) chỉ có 1 template và **không gắn fallback** (Viewer không tạo
  được) — verify được phần "Fallback field ẩn/không sửa được" nhưng không
  verify được đúng kịch bản "có biến + có fallback" theo đúng Test Data gốc.

Related: [imgh.md](imgh.md), [portal-sitemap.md](portal-sitemap.md),
[model.md](model.md), [task-history.md](task-history.md),
[staging-api-endpoints.md](staging-api-endpoints.md).
