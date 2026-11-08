# Context Change Request (CCR) — template

Dùng khi canonical QA context (Product KB / Feature Profile / Checklist) của một product **thiếu, sai, cũ hoặc mâu thuẫn** với thay đổi đã/sắp ship.

## Cách gửi

Quy trình thật thường gồm 2 bước ở **2 board khác nhau** — rất dễ nhầm, và phụ lục product là nơi nói chính xác cho product đó:

1. **Soạn + Submit.** Điền file này (giữ nguyên Markdown, đừng đổi cấu trúc `# Phần N`), đính kèm vào task liên quan (field CCR / attachment), bấm Submit. Submit thường tạo đồng thời **1 Proposal** trên board context và **1 Task** trên agent board của repo context-builder.
2. **Trigger xử lý.** Kéo status của **Task trên agent board** từ `Todo` sang `In Progress`.

> **Kéo card Proposal trên board context có thể KHÔNG trigger gì** — ở một số hệ thống tính năng đổi status thủ công trên board đó chưa hoạt động. Xem phụ lục product để biết kênh nào là kênh thật. Nhiều CCR cùng lúc → kéo **từng cái một**.
>
> Việc submit là hành động thủ công của con người — **skill `create-ccr` không tự submit thay bạn.**

Hệ thống nhận CCR thường **không đọc hiểu nội dung** — chỉ kiểm tra thô là không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại.

**Tiêu đề task:** `[CCR] <loại> — <object> — <tóm tắt 1 dòng>`

---

## Nhãn field

| Nhãn | Nghĩa |
|---|---|
| `[AGENT]` | Skill/agent tự điền được từ ticket + canon đã tra. Người gửi chỉ soát lại. |
| `[BẠN]` | Cần phán đoán của con người — skill không tự quyết, phải hỏi người gửi. |

Những thứ **không hỏi người gửi**: context builder được phép mutate gì trên môi trường thật, dùng account nào để explore, có capture network/DB không, dùng environment nào để verify. Đó là chính sách của bên sở hữu môi trường (xem phụ lục product), không phải việc của người gửi CCR.

**Không có thông tin thì ghi "không rõ".** Một chỗ trống được khai báo thì xử lý được; một chỗ trống bị lấp bằng phỏng đoán sẽ lan vào KB và vào mọi test case sinh ra sau đó.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đơn vị của một CCR là **một thứ được giải quyết độc lập**, không phải một ticket riêng lẻ. Nhiều ticket gộp được thành 1 CCR nếu cả 5 điều dưới đây giống nhau; tách nếu **ít nhất một** điều khác:

| | Câu hỏi |
|---|---|
| **Product** | Mọi claim thuộc cùng một product? Khác product → **bắt buộc tách**, không ngoại lệ |
| Người gỡ | Context builder tự explore/đọc tài liệu được, hay cần dev trả lời / PO quyết / chủ taxonomy quyết? |
| Điều kiện mở khoá | Đúng **một** thông tin hoặc **một** việc nào làm nó xong? |
| Vòng đời | Nếu request này bị huỷ, các ticket còn lại còn giá trị riêng không? |
| Artifact đích | Cùng KB của một object cụ thể, hay đụng tới `_registry.json`/taxonomy chung? |

Đừng gộp quá tay: nhét "cần dev trả lời" chung với "chỉ cần đọc lại tài liệu" sẽ khiến phần làm được ngay phải nằm chờ dev vô cớ.

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

`NEW_FEATURE` · `BEHAVIOR_CHANGE` · `PROFILE_GAP` · `CHECKLIST_GAP` · `STALE_CONTEXT` · `CONFLICT` · `CANON_HYGIENE`

**Loại:** `NEW_FEATURE`

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: `teeinblue`
- Object: `artwork` (chính; claim storefront thuộc `sdk`, claim cart/order thuộc `order` — xem Phần 1b) · Feature: `conditional-setting-config` (chính; thêm `layer-condition-value-binding`, `condition-cycle-validation`)
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5558 — "Add Hide layer option in Conditional Setting" (Improvement, khách Lyto).
Mốc Jira (changelog, đọc 2026-10-30): tạo 2026-10-12 · giao QA (To Do → QA Review) 2026-10-13 12:00
· QA Review → Passed + Resolution Done 2026-10-28 18:05 (chienct) · Passed → Done 2026-10-29 11:42
(tinhpt). Không có Fix Version. Development: 6 PR GitHub (sdk, api, portal) đều MERGED, cập nhật cuối
2026-10-29 11:34; 5 build thành công, cuối 2026-10-29 11:33. Ngày release production: Jira không ghi.

Description (Solution + Portal): thêm Hide làm đối của Show trong Conditional Setting của layer, chọn
qua dropdown; mỗi layer dùng Show hoặc Hide, không cả hai. Hide = layer và option của nó ẩn khi điều
kiện khớp, hiện trong trường hợp còn lại. Match mode AND / OR áp cho Hide y như Show. Chữ Show trong
heading thành dropdown 2 giá trị; chọn Hide thì heading thành "Hide this layer and its option when:";
mặc định Show.

Comment 54404 của dev giangnth ngày 2026-10-13 — "Change & test cases", tự sinh từ branch diff (sdk,
api, portal: TIB-5558-add-hide-layer-option-in-conditional-setting), mô tả thêm ngoài description:
tooltip match type đổi theo Hide; toggle thành "Hide this layer on first load" có tooltip riêng; đổi
Show↔Hide giữ điều kiện / match type / toggle; chỉ Artwork 2.0 có dropdown; Bulk apply Conditional
setting có cùng dropdown; source option bị ẩn = điều kiện không khớp; linked layer đi theo layer gốc;
first load bật/tắt với OR / AND; print file / mockup / preview render áp Hide giống storefront;
Duplicate artwork, import artwork, copy/paste layer, global template replica đều giữ Hide.
Comment 54151 (2026-10-12) chỉ ghi khách Lyto, người báo.

Kết quả test (Testlane task TIB-231, 32 case TC-TIB-7313..7344, staging instance 520 / store nprice1):
- Lượt đầu 2026-10-28 (mốc 05:15 +07, test-executor [AI], Chrome): portal/editor PASS; toàn bộ case
  storefront FAIL vì storefront chạy SDK app-v2.js bản cũ chưa có code Hide (BUG-429), order #1119
  print file rỗng (BUG-430).
- Retest cùng ngày sau khi SDK app-v2.js bản Last-Modified 2026-10-28 03:01:11 GMT lên staging [AI]:
  17 PASS; BUG-429, BUG-430 không còn tái hiện. TC-TIB-7334 phát hiện BUG-436 (Group mang dependency
  dựng bằng data luôn hiện, cả Show lẫn Hide).
- Sau đó QA đổi tay 7334, 7335, 7341, 7342 sang "passed": 7334 / 7335 actualResult viết tay "Group
  không đặt được điều kiện ở cấp Group"; 7341 / 7342 actualResult RỖNG. Testlane không lưu ngày
  từng case. Hiện cả 32 case status "passed" — status không phải bằng chứng; CCR dùng actualResult.

Thay đổi ticket đã làm, mỗi dòng = 1 claim:
CLAIM-01 dropdown Show/Hide + heading đổi + mặc định Show (cả layer mới)
CLAIM-02 một layer một action; đổi Show↔Hide giữ điều kiện, match type, toggle; nhãn toggle đổi theo
CLAIM-03 tooltip match type + tooltip toggle đổi khi chọn Hide
CLAIM-04 data: dependency.action "hide"/"show" lưu xuống; bản ghi cũ không có key action = Show
CLAIM-05 Artwork 1.0 không có dropdown; convert 1.0→2.0 ra Show; paste layer 2.0→1.0 bị chặn
CLAIM-06 vòng điều kiện giữa layer Hide bị chặn khi Save, thông báo giống hệt Show
CLAIM-07 storefront: Hide ẩn layer + option khi khớp, hiện khi không; AND / OR; live; ngược Show
CLAIM-08 Hide + first load bật: layer ẩn trên artwork, option vẫn hiện; OR / AND khi trả lời một phần
CLAIM-09 first load tắt: layer hiện khi chưa trả lời; option hiện cả hai trường hợp
CLAIM-10 Toggle layer và Additional Option làm nguồn cho Hide
CLAIM-11 layer bị Hide: Required không chặn Add to cart; giá trị đã nhập không vào cart/order/print
CLAIM-12 preview, mockup, print file của order áp Hide giống storefront
CLAIM-13 nguồn bị ẩn = điều kiện không khớp; linked layer đi theo; điều kiện 2 cấp
CLAIM-14 Duplicate artwork giữ Hide, tham chiếu element map sang layer của bản copy
CLAIM-15 import artwork, copy/paste layer giữa artwork 2.0, global template replica giữ Hide
CLAIM-16 Bulk apply Conditional setting có dropdown Show/Hide, áp cho mọi layer được chọn
CLAIM-17 regression: layer không điều kiện và layer Show không đổi hành vi
CLAIM-18 Group layer không có Conditional Setting ở cấp Group trên UI (QA), trái C14 của dev
CLAIM-19 màn Edit customization trong admin không áp điều kiện ẩn/hiện (C12)
CLAIM-20 MCP artwork tools hỗ trợ Hide (C11)
CLAIM-21 storefront còn SDK cũ (cache) render Hide như Show, tức đảo chiều (C8, R9)
```

- Nguồn: `tổng hợp từ 1 ticket Jira (TIB-5558, Done 2026-10-29) gồm description + comment dev tự sinh từ branch diff (2026-10-13) + file RA analysis_TIB-5558.md + 32 test case Testlane TIB-231 chạy trên staging 2026-10-28; agent soạn CCR này KHÔNG tự quan sát lại trên môi trường thật`
- Thấy mấy lần / xác nhận trực tiếp mấy lần: `2 lượt chạy trực tiếp trên staging 2026-10-28 bởi test-executor [AI] (lượt đầu 32 case trên SDK cũ; retest 19 case trên SDK 03:01:11 GMT); 4 case (7334, 7335, 7341, 7342) QA đổi tay sang passed, trong đó 2 case không có actualResult; 0 lần trên production; 0 lần do agent soạn CCR tự kiểm lại`

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Thử rồi, kết quả ngược mong đợi / chưa giải thích:
- Group mang dependency (dựng bằng data, không qua UI) trên SDK 03:01 GMT: Group và layer con luôn
  hiện, cả Show lẫn Hide (BUG-436, TC-TIB-7334 lượt [AI]); lượt đầu trên SDK cũ Group có đổi trạng
  thái. QA sau đó ghi UI không đặt được điều kiện ở cấp Group (CLAIM-18). BUG-436 vẫn gắn trên 7334.
- Edit customization: lượt [AI] thấy CÓ áp điều kiện (BUG-433, field layer bị Hide không hiện); QA
  đổi 7341 sang passed nhưng không ghi actualResult — chưa ai giải thích hai lượt khác nhau.
- BUG-429 (SDK bỏ field action) và BUG-430 (print file order #1119 rỗng): không tái hiện ở retest
  (order #1120). Nguyên nhân BUG-430 chưa ai phân định.

Chưa thử / không thử được:
- Bulk apply Conditional setting (CLAIM-16): không có case nào.
- Tooltip match type / toggle khi chọn Hide (CLAIM-03): không case nào kiểm.
- Nguồn bị ẩn, linked layer, điều kiện 2 cấp (CLAIM-13): không case nào kiểm.
- Import artwork, copy/paste layer giữa 2 artwork 2.0, global template replica (CLAIM-15): chưa
  chạy; riêng export/import file định dạng v1 (Q4 của RA) chưa ai trả lời.
- Layer không điều kiện trên SDK 03:01 GMT (CLAIM-17): 7344 chỉ chạy ở lượt đầu, trên SDK cũ.
- Hide đặt trên từng layer con trong Group + Align / Shape cut / Mask rồi render PNG / PDF: chưa ai
  chạy (phần còn lại của 7335).
- MCP với Hide (CLAIM-20): lượt [AI] BLOCKED (phiên tự động không có quyền MCP teeinblue); ngoài case
  có artwork #5970 tạo bằng create-artwork-tool mang action "hide" (capture tự chụp).
- Giá trị buyer khi layer Hide hiện lại (Q10), Edit customization rồi regenerate (Q9), use case gốc
  Lyto 1–4 pet (Q2): chưa thử.
- Nhánh "storefront chạy SDK cũ" như case chính thức: chưa chạy, chỉ thấy gián tiếp.
- Production: chưa kiểm gì. Code test là bản staging 2026-10-28; 6 PR merge 2026-10-29 sau lượt
  test — QA không đối chiếu được bản merge có khác bản đã test không.

Phần [BẠN]: QA đã tự kiểm tay 7334 / 7335 (Group trên UI), 7341 (Edit customization), 7342 (MCP)
ngày 2026-10-28 theo câu trả lời trong chat của bản CCR trước; 7341 / 7342 chưa có actualResult.
⏳ CHỜ BẠN: bạn đã tự thử gì mà kết quả test không ghi — cụ thể ở 7341 bạn thấy field của layer
đang bị Hide CÓ hiển thị trên màn Edit customization không, và ở 7342 bạn đã gọi tool MCP nào, trên
artwork id nào? Nếu bạn ghi actualResult (kèm ngày) lên 2 case này thì CLAIM-19 / CLAIM-20 mới nâng
lên test_case được.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5558 — Conditional Setting (Artwork 2.0): chữ Show trong heading là dropdown đúng 2 giá trị Show / Hide; chọn Hide → heading "Hide this layer and its option when:"; mặc định Show, cả với layer mới thêm | portal (artwork editor, accordion CONDITIONAL SETTING) | `test_case` — PASS TC-TIB-7313, TC-TIB-7314 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); Passed 2026-10-28; build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config; KB-005 (tên accordion "Show this layer and its option when..." giờ đầu heading là dropdown) | `ADD` |
| `CLAIM-02` | TIB-5558 — một layer chỉ mang một action; đổi Show↔Hide giữ nguyên điều kiện, match type, trạng thái toggle; nhãn toggle đổi "Show/Hide this layer on first load" | portal (artwork editor) · api (PUT /api/artworks/{id}) | `test_case` — PASS TC-TIB-7316, TC-TIB-7317 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config | `ADD` |
| `CLAIM-03` | TIB-5558 — chọn Hide thì tooltip match type thành "hide when all / any options are selected", toggle có tooltip riêng; về Show khôi phục nhãn cũ | portal (artwork editor) | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff sdk/api/portal) v1 (2026-10-13) | artwork / conditional-setting-config; KB-063 (match_type 2 radio — nhãn/tooltip đổi theo action) | `ADD` |
| `CLAIM-04` | TIB-5558 — data: layer lưu `dependency.action` = "hide" (hoặc "show") cùng match_type, show_by_default, dependencies; reload giữ đúng; bản ghi cũ KHÔNG có key action được hiểu là Show, không bị migrate | api (PUT /api/artworks/{id}, GraphQL artworks) · portal | `test_case` — PASS TC-TIB-7318, TC-TIB-7317, TC-TIB-7315 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / layer-condition-value-binding; checklist layer-condition-value-binding CHK-001 có thể làm SAI: expected shape {match_type, show_by_default, dependencies} không có key action, bản lưu mới luôn có action | `SUPERSEDES` |
| `CLAIM-05` | TIB-5558 — Artwork 1.0 không có dropdown (heading chuỗi liền, toggle cố định "Show this layer on first load"); convert 1.0→2.0 ra action Show (expected); paste layer Hide từ 2.0 sang 1.0 bị chặn "Cannot import layers from different artwork versions." | portal (editor AW 1.0, convert, copy/paste layer) | `test_case` — PASS TC-TIB-7319, TC-TIB-7320, TC-TIB-7321 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / conditional-setting-config | `ADD` |
| `CLAIM-06` | TIB-5558 — vòng điều kiện giữa 2 layer Hide bị chặn khi Save, thông báo "Circular conditions between: …" giống từng chữ bản Show, không ghi data | portal (Save artwork) · api | `test_case` — PASS TC-TIB-7322 2026-10-28 staging [AI] — build: staging @ 2026-10-28 05:15 — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / condition-cycle-validation; KB-072, KB-073; checklist condition-cycle-validation CHK-003, CHK-006 (khớp, chỉ mở rộng sang Hide) | `ADD` |
| `CLAIM-07` | TIB-5558 — storefront: layer Hide và option của nó ẩn khi điều kiện khớp, hiện khi không khớp; OR ẩn khi một điều kiện khớp, AND ẩn chỉ khi mọi điều kiện khớp; đổi giá trị nguồn cập nhật ngay không reload; cùng điều kiện thì Show và Hide cho kết quả ngược nhau | storefront (form + live preview, SDK app-v2.js) · api (POST /api/merchant/shopify/customization) | `test_case` — PASS TC-TIB-7323, TC-TIB-7324, TC-TIB-7325, TC-TIB-7326, TC-TIB-7327, TC-TIB-7328, TC-TIB-7329, TC-TIB-7330 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js Last-Modified 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13) và sau fix BUG-429; build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / conditional-setting-config (profile unknown_areas "Hành vi runtime storefront … 0 evidence storefront") | `ADD` |
| `CLAIM-08` | TIB-5558 — Hide + "Hide this layer on first load" bật, buyer chưa chọn gì: layer ẩn trên artwork, option vẫn hiện trên form; OR: còn ẩn tới khi mọi nguồn đang hiện trả lời không khớp; AND: hiện ngay khi một nguồn trả lời không khớp | storefront (first load + form) | `test_case` — PASS TC-TIB-7331, TC-TIB-7332, TC-TIB-7333 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / layer-condition-value-binding (show_by_default giờ mang nghĩa "hide on first load" khi action = hide) | `ADD` |
| `CLAIM-09` | TIB-5558 — "Hide this layer on first load" tắt, nguồn chưa trả lời: layer hiện; option của layer hiện ở cả hai trường hợp bật/tắt | storefront | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | sdk / storefront-buyer-facing | `ADD` |
| `CLAIM-10` | TIB-5558 — Toggle layer và Additional Option làm nguồn điều kiện cho Hide, đúng chiều, payload chỉ gửi layer đang hiện | storefront · api (POST customization) | `test_case` — PASS TC-TIB-7336, TC-TIB-7337 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing; artwork / conditional-setting-config KB-064 (toggle, additional-option là nguồn — khớp) | `ADD` |
| `CLAIM-11` | TIB-5558 — layer đang bị Hide có Required không chặn Add to cart; giá trị đã nhập trước khi layer bị Hide không vào payload customization, localStorage, line-item properties, order, print file | storefront (Add to cart, localStorage teeinblue-customizations) · api (/cart.js, POST customization) | `test_case` — PASS TC-TIB-7338, TC-TIB-7339 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | order / place-personalized-order-storefront; sdk / storefront-buyer-facing KB-007 (required cha-con), KB-009 (line-item props — khớp) | `ADD` |
| `CLAIM-12` | TIB-5558 — preview, mockup và print file của order áp Hide giống storefront (item khớp Hide không có layer, item không khớp in đủ) | db/render (order design PNG, mockup, customization preview) · portal (order detail) | `test_case` — PASS TC-TIB-7340 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | order (chưa có feature render print file trong canon) | `ADD` |
| `CLAIM-13` | TIB-5558 — điều kiện có source option đang bị ẩn (toggle tắt hoặc bị chính điều kiện của nó ẩn) = không khớp, nên layer Hide chỉ phụ thuộc option bị ẩn sẽ hiện; linked layer đi theo hiển thị cuối của layer gốc; điều kiện 2 cấp lan theo | storefront | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | sdk / storefront-buyer-facing; artwork / layer-duplicate-link-copy (linked layer) | `ADD` |
| `CLAIM-14` | TIB-5558 — Duplicate artwork: bản copy giữ action Hide (và Show), tham chiếu element map sang layer của bản copy, chạy đúng chiều trên storefront | portal (Artworks list → duplicate) · api (GraphQL) · storefront | `test_case` — PASS TC-TIB-7343 2026-10-28 staging [AI] — build: staging @ 2026-10-28 retest sau SDK app-v2.js 03:01:11 GMT — sau lần TIB-5558 giao QA cuối (2026-10-13); build hash: không rõ (QA không có quyền repo) | artwork / artwork-list-management KB-047 (nút la-copy duplicate) | `ADD` |
| `CLAIM-15` | TIB-5558 — import artwork, copy/paste layer (trong artwork và sang artwork 2.0 khác), global template replica đều giữ lựa chọn Hide | portal (import artwork, copy/paste layer, global template) | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | artwork / layer-duplicate-link-copy; artwork / artwork-template-management; chưa rõ, cần agent tự đánh giá cho import | `ADD` |
| `CLAIM-16` | TIB-5558 — "Bulk apply Conditional setting" (chọn nhiều layer) có cùng dropdown Show/Hide và áp action đã chọn cho mọi layer được chọn | portal (artwork editor, layers action bar) | `dev_doc` — "Change & test cases — Add Hide layer option in Conditional Setting" (comment Jira 54404, tự sinh từ branch diff) v1 (2026-10-13) | artwork / conditional-setting-config; artwork / editor-layer-workspace | `ADD` |
| `CLAIM-17` | TIB-5558 — regression: layer không có điều kiện luôn hiện, layer Show giữ đúng chiều cũ trên storefront và trong print | storefront · api · db/render | `KHÔNG CÓ NGUỒN` — TC-TIB-7344 PASS ở lượt đầu, chạy trên SDK cũ trước bản 03:01:11 GMT; chưa chạy lại trên SDK mới (BUG-436 cho thấy SDK mới đổi hành vi Show trên Group) | sdk / storefront-buyer-facing KB-004 (dependency 2 cấp chạy đúng) | `ADD` |
| `CLAIM-18` | TIB-5558 — Group layer không có Conditional Setting ở cấp Group trên UI: điều kiện Show/Hide đặt cho từng layer con; trái C14 trong RA ("Hide trên Group giống Show", dev, Slack 2026-10-28) | portal (panel layer settings của Group) · storefront · db/render | `KHÔNG CÓ NGUỒN` — case 7334 / 7335 có expected "Group ẩn/hiện theo điều kiện", actualResult viết tay không ghi ngày; BUG-436 còn gắn trên 7334; ngược C14 của dev | artwork / conditional-setting-config; KB-005 (33/35 layer type có accordion — không nói Group); có thể làm SAI case nào kỳ vọng đặt điều kiện ở cấp Group | `ADD` |
| `CLAIM-19` | TIB-5558 — màn Edit customization trong admin không áp điều kiện ẩn/hiện (cả Show lẫn Hide): field của layer đang bị Hide vẫn hiển thị (C12) | portal (order → Edit customization) | `KHÔNG CÓ NGUỒN` — case 7341 status passed nhưng actualResult rỗng; lượt [AI] cùng ngày thấy ngược (BUG-433) | order (chưa có feature Edit customization trong canon) | `ADD` |
| `CLAIM-20` | TIB-5558 — MCP artwork tools hỗ trợ Hide: create/update layer với điều kiện Hide, get-form-preview-tool khớp form storefront (C11) | api (MCP teeinblue: create-artwork-tool, update-artwork-layer-tool, get-form-preview-tool) | `KHÔNG CÓ NGUỒN` — case 7342 status passed nhưng actualResult rỗng; lượt [AI] BLOCKED; artwork #5970 chỉ là capture tự chụp | chưa rõ, cần agent tự đánh giá (canon không có object/feature cho MCP) | `UNKNOWN` |
| `CLAIM-21` | TIB-5558 — storefront còn chạy SDK cũ (kể cả bản cũ trong cache trình duyệt) render layer Hide như Show, tức đảo chiều; response SDK có Cache-Control max-age=14400 | storefront (SDK app-v2.js) | `KHÔNG CÓ NGUỒN` — capture tự chụp lượt 2026-10-28 + đáp án dev Slack chỉ có dạng diễn giải trong RA (C8, R9); cửa sổ cache chưa chốt (Q8) | sdk / storefront-buyer-facing | `ADD` |

`Claim ID` đánh số `CLAIM-01`, `CLAIM-02`… trong phạm vi **file này**. Cố ý không nhúng mã Proposal: lúc soạn, mã đó chưa tồn tại (hệ thống cấp lúc Submit). Agent xử lý CCR sẽ tự namespace lại.

**Cột "Nguồn & độ mạnh" quyết định claim này có được nạp thẳng vào KB hay không** (contract §12.3a). Đúng 1 trong 5, kèm trích dẫn cụ thể — không phải diễn giải:

| Trạng thái | Yêu cầu |
|---|---|
| `dev_doc` | Tài liệu dev sinh từ source code / changelog / release note / PR-commit diff: tên tài liệu + version + **ngày viết** + trích nguyên văn |
| `spec_doc` | Spec/PRD chính thức: tên + version/ngày + mục cụ thể |
| `po_dev_confirm` | Quote **nguyên văn** comment + link, xác nhận đúng hành vi đang claim. Comment mơ hồ ("chắc ổn", "để check sau") không tính |
| `test_case` | id test case + PASS + ngày chạy + build ≥ bản có thay đổi, và test case phải kiểm **đúng** hành vi đang claim — không phải test case liên quan chung chung |
| `KHÔNG CÓ NGUỒN` | Chỉ có ảnh/HAR/capture tự chụp, hoặc chỉ là mô tả/comment chưa đủ điều kiện ở trên |

Ghi `KHÔNG CÓ NGUỒN` **không làm claim bị loại**. Nó vẫn được nạp vào KB, nhưng dưới dạng "đã quan sát thấy" với độ tin cậy thấp kèm một open question — **và không được dùng làm expected result** cho test. Đừng tự nâng lên trạng thái mạnh hơn vì bạn tin chắc hành vi đó đúng; ảnh chụp tay không thay được test case hay PO/Dev confirm.

Hai lưu ý thêm:

- Claim có khả năng làm **SAI** một checklist/automation đang publish (không chỉ THIẾU coverage) → nêu rõ `checklist_id`/mã check nghi ngờ. Đây là tín hiệu ưu tiên cao hơn "gap" thông thường, vì automation có thể đang chạy sai ngay lúc này.
- Nghi ngờ ranh giới object hiện tại không còn hợp lý → nêu Ý TƯỞNG ở đây, nhưng **không tự quyết tên `object_key` mới**; quyết định thuộc về agent xử lý CCR khi build KB thật.
- Không chắc surface nào bị ảnh hưởng → ghi "chưa rõ, cần agent tự đánh giá", **không bỏ trống** (bỏ trống khiến agent tưởng không cần kiểm thêm).

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

Để agent nhận CCR dựng được Feature Profile/Checklist mà không phải mở lại nguồn gốc:

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | `artwork` | `conditional-setting-config` | store owner / staff | portal | `KB-005` (artwork) |
| `CLAIM-02` | `artwork` | `conditional-setting-config` | store owner / staff | portal | không có |
| `CLAIM-03` | `artwork` | `conditional-setting-config` | store owner / staff | portal | `KB-063` (artwork) |
| `CLAIM-04` | `artwork` | `layer-condition-value-binding` | store owner / staff | api | `KB-067` (artwork) |
| `CLAIM-05` | `artwork` | `conditional-setting-config` | store owner / staff | portal | không có |
| `CLAIM-06` | `artwork` | `condition-cycle-validation` | store owner / staff | portal | `KB-072`, `KB-073` (artwork) |
| `CLAIM-07` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-09` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-10` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | `KB-064` (artwork) |
| `CLAIM-11` | `order` | `place-personalized-order-storefront` | guest buyer | storefront | `KB-007`, `KB-009` (sdk) |
| `CLAIM-12` | `order` | MỚI: order-design-conditional-render | store owner / staff (xem order) | db | không có |
| `CLAIM-13` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |
| `CLAIM-14` | `artwork` | `artwork-list-management` | store owner / staff | portal | `KB-047` (artwork) |
| `CLAIM-15` | `artwork` | `layer-duplicate-link-copy` | store owner / staff | portal | không có |
| `CLAIM-16` | `artwork` | `conditional-setting-config` | store owner / staff | portal | không có |
| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | `KB-004` (sdk) |
| `CLAIM-18` | `artwork` | `conditional-setting-config` | store owner / staff | portal | `KB-005` (artwork) |
| `CLAIM-19` | `order` | MỚI: edit-customization-admin | store owner / staff | portal | không có |
| `CLAIM-20` | chưa rõ — canon không có object cho MCP (mô tả bằng lời: MCP server teeinblue, artwork tools) | MỚI: mcp-artwork-conditional | AI client (API key của store owner) | api | không có |
| `CLAIM-21` | `sdk` | `storefront-buyer-facing` | guest buyer | storefront | không có |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** `Jira https://ownego.atlassian.net/browse/TIB-5558 (comment dev 54404) · Instance https://staging-admin.teeinblue.com/admin/instances/520 · Testlane task TIB-231 (TC-TIB-7313..7344) · Artwork #5868 AW-HIDE-1, #5878 AW-HIDE-BASE, #5880 AW-LEGACY-SHOW, #5881 AW-HIDE-1-SW, #5882 AW-HIDE-2, #5883 AW-HIDE-CIRC, #5886 AW-SHOW-CIRC, #5887 (HIDE-OR), #5888 (HIDE-AND), #5889 AW-SHOW-1, #5890 AW-HIDE-FL, #5893 (HIDE-REQ), #5896 (HIDE-TOGGLE), #5897 (HIDE-ADDOPT), #5899 AW-OLD-1.0, #5900 AW-OLD-1.0-CONVERT, #5956 / #5957 (bản duplicate), #5970 (tạo qua MCP) · Campaign CP-HIDE-1 #3252, CP-HIDE-1-DUP #3273, CP-SHOW-1, CP-HIDE-OR, CP-HIDE-AND, CP-HIDE-FL / -FL-OR / -FL-AND, CP-HIDE-TOGGLE, CP-HIDE-ADDOPT, CP-HIDE-REQ, CP-LEGACY-SHOW, CP-OLD-1.0-CONVERT · Storefront nprice1.myshopify.com/products/tib-5558-cp-* · SDK https://staging-sdk.teeinblue.com/shopify/app-v2.js (retest: Last-Modified 2026-10-28 03:01:11 GMT, ETag 85d63a84fa4e7e4dbbeee8c688efab70) · Order #1119 (portal orders/4808, lượt đầu), #1120 https://staging-portal.teeinblue.com/orders/4811 (retest) · API PUT https://staging-api.teeinblue.com/api/artworks/{id}, GET /api/merchant/campaigns/{id}.json, POST /api/merchant/shopify/customization`
- **Trạng thái đối tượng lúc đó:** `Artwork 2.0 (schema_version 2) có layer mang dependency.action "hide"; artwork 1.0 (schema_version 1) làm đối chứng; campaign đã publish lên nprice1; order #1119, #1120 đặt qua Bogus gateway; storefront SDK cũ ở lượt đầu, SDK 03:01:11 GMT ở retest; ticket lúc test ở QA Review, nay Done`
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): `staging`
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** `owner/staff trong portal (tài khoản QA của instance 520) · guest buyer trên storefront nprice1 · AI client qua MCP (CLAIM-20)`
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** `TIB-5558 — lượt đầu: staging @ 2026-10-28 05:15 (+07, SDK storefront bản cũ Last-Modified 2026-10-14, chưa có code Hide); retest: staging @ 2026-10-28 sau SDK app-v2.js Last-Modified 03:01:11 GMT (ETag 85d63a84fa4e7e4dbbeee8c688efab70) — cả hai sau lần TIB-5558 giao QA cuối (2026-10-13 12:00); Passed 2026-10-28 18:05; 6 PR merged 2026-10-29 11:34, Done 2026-10-29 11:42; không có Fix Version; ngày release production không ghi; build hash: không rõ (QA không có quyền repo)`
- **Ngày resolve/update cuối:** `2026-10-28 (Resolution Done); update cuối 2026-10-29 (Passed → Done)`
- **Đã ship chưa:** `Jira Done, Resolution Done, 6 PR merged 2026-10-29 — coi là đã merge; QA chưa kiểm production, không biết ngày deploy production`

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: `qa-knowledge manifest.json (generated_at 2026-10-30): artwork published_context_version 5 · sdk 5 · order 1`
- Canon hiện nói: `KB-005 (artwork): "Accordion 'CONDITIONAL SETTING' (Show this layer and its option when...) xuất hiện trong 33/35 layer type. 2 layer type KHÔNG có accordion này: Dynamic Clipart by Text › Manual Placement (data-type dynamic-by-text) và Dynamic Clipart by Text › Auto Placement (data-type clipart-frame). Chi tiết field/behavior riêng của 2 type ngoại lệ này (bao gồm việc thiếu accordion này) đã được tách sang KB-006 và KB-007 (v2) để 1 lần sửa riêng type nào không phải đụng item boundary chung này." ▸ KB-063 (artwork): "Trong accordion CONDITIONAL SETTING, #field__match_type chỉ có 2 radio: match_type-all (value 'all', mặc định) và match_type-any (value 'any'). Label 'No conditions' là trạng thái hiển thị khi layer chưa có condition nào, KHÔNG phải radio thứ 3." ▸ KB-064 (artwork): "Dropdown 'Option:' (chọn nguồn condition) chỉ liệt kê layer thuộc 8 data-type: toggle, additional-option, addon-charge, json-list, font, vector-category, clipart-category, group-clipart-categories — bất kể layer đích đang cấu hình là type nào trong 35 type. 27 type còn lại (toàn bộ layer nhóm TEXT/MAPS/PUZZLES/PHOTO, cùng color và vector-upload) KHÔNG bao giờ xuất hiện trong danh sách nguồn. Kết quả giống hệt nhau ở 2 run độc lập, trên 2 artwork khác nhau (R2 artwork 4087 v3 lúc mới tạo, R3 cùng artwork 4087 sau đó)." ▸ KB-067 (artwork): "Trong JSON layer object (cả request PUT lẫn readback GraphQL), key 'dependency' hoàn toàn VẮNG MẶT (absent, không phải null) ở layer chưa cấu hình condition. Layer có condition có dependency = {match_type: 'all'|'any', show_by_default: boolean, dependencies: [{element, value},...]}. Trong artwork 4087 cuối run R3, 5/35 layer có key này (30 layer còn lại không có key). Shape này được xác nhận nhất quán ở 2 run (R2 tạo ra layer paragraph có dependency; R3 tạo thêm 4 layer khác), 2 layer bằng chứng (UI DOM trước/sau + JSON request/response PUT)." ▸ KB-072 (artwork): "Khi cấu hình condition tạo thành vòng (2 bước hoặc 3 bước), bấm 'Save & Close' (và cả nút 'Save' riêng trong dropdown) đều bị chặn: modal KHÔNG đóng, POST validate-default-value vẫn chạy và trả 204 (không phải endpoint kiểm vòng), nhưng PUT /api/artworks/{id} KHÔNG BAO GIỜ được gửi trong cả 2 lần thử (2-bước và 3-bước) — xác nhận qua network capture rỗng PUT. DB không bị chạm. Sau khi Cancel và mở lại artwork, layer liên quan vẫn ở trạng thái 'No conditions' (điều kiện vòng chỉ tồn tại in-memory trong modal, không persist)." ▸ KB-073 (artwork, mở đầu): "Khi save bị chặn vì vòng, toast nguyên văn: 'Template - <tên template>:\nCircular conditions between: A > B > C'." ▸ KB-047 (artwork): "Trên /artworks, mỗi.artwork-item có 4 nút: la-search-plus (preview), la-pencil (edit details), la-copy (duplicate), la-ellipsis-h. Menu la-ellipsis-h chứa đúng 3 mục: 'Import to Translation' / 'Mark as archive' / 'Delete artwork'. Delete artwork mở dialog confirm nguyên văn 'Are you sure to remove <name>?' với 2 nút Remove/Cancel." ▸ KB-009 (sdk): "Sau ATC thành công trên store2 (guest, storefront, campaign 2595, SDK v2), line item properties trả về CHỈ gồm field nội bộ tiền tố '_' (_customization_id, _customization_image, _tib_fulfilled_sku, _tib_design_link_1) — KHÔNG có property text người đọc được (vd 'Woman Name: Mia'). Cart page và cart-drawer HTML fragment cũng chỉ hiển thị info variant chuẩn (Product/Color/Size/giá) + ảnh mockup đã cá nhân hoá; không có đường dẫn 'edit personalization từ cart' được tìm thấy trong phiên này." ▸ profile conditional-setting-config, unknown_areas: "Hành vi runtime storefront của layer có condition (show/hide theo giá trị người mua chọn) — 0 evidence storefront." ▸ checklist layer-condition-value-binding CHK-001 expected: "Layer có ≥1 condition: key 'dependency' hiện diện với shape {match_type: 'all'|'any', show_by_default: boolean, dependencies: [{element, value},...]}. Layer KHÔNG có condition: key 'dependency' HOÀN TOÀN VẮNG MẶT (absent, không phải null)." ▸ KẾT LUẬN: canon qa-knowledge không có kb_id nào nói tới action Hide, key dependency.action, dropdown Show/Hide, hay Edit customization / MCP với điều kiện. ▸ (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/artwork.md → "Conditional Setting: action Hide + Group không có UI riêng (TIB-5558 / TIB-231, staging 2026-10-28)": "Mở rộng "Add Condition for Layer": ngoài action **Show** (sẵn có), giờ layer con chọn được action **Hide** — ẩn khi điều kiện thoả, hiện khi không thoả (ngược với Show)." ▸ "**Group layer không có Conditional Setting ở cấp Group.** Muốn Group ẩn/hiện theo điều kiện phải đặt condition cho **từng layer con** bên trong Group, không có nơi nào trên UI để đặt condition thẳng lên chính Group." ▸ artwork.md → "Text layer làm condition source": "Shape lưu trên layer phụ thuộc: `dependency: {action: "show", match_type: "all", show_by_default: …`" và "`show_by_default` = toggle "Show this layer on first load"."`
- Đã tra bằng từ khoá nào: `qa-knowledge/products/teeinblue: _registry.json (alias "conditional setting", "condition binding", "storefront", "add-to-cart", "order"); grep -i "conditional|condition|dependency|show_by_default|hide|first load|Edit customization|duplicate|group layer" trong artwork/kb.json, artwork/features/*/kb.json + profile.json, artwork/checklists/*.json, artwork/feature-summary.md, artwork/open-questions.md, sdk/kb.json, sdk/features/storefront-buyer-facing/kb.json, order/kb.json, order/features/*/kb.json, campaign/kb.json — "hide" (theo nghĩa action) 0 kết quả. Context local: grep "hide this|action.{0,5}hide|TIB-5558|show_by_default|Add Condition for Layer|Show this layer" trong teeinblue/TIB automation/context/*.md`
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: `test case đã PASS (11 claim, test-executor [AI] trên staging 2026-10-28) · dev doc (5 claim: comment Jira 54404 do giangnth đăng, tự sinh từ branch diff) · KHÔNG có PO/business sign-off; đáp án dev trong Slack thread ts 1792659002.772529 (2026-10-28) chỉ còn dạng diễn giải trong RA, không có nguyên văn nên không tính po_dev_confirm; câu trả lời của QA trong chat (Group là giới hạn đúng) là của QA, không phải PO. ⏳ CHỜ BẠN: có PO/business xác nhận nào ngoài Jira và Slack #req-chienct mà CCR này chưa biết không (ai, ngày, link) — nhất là cho Q2 (use case Lyto) và cho việc Group không có Conditional Setting?`
- Ở đâu, ngày nào: `TC-TIB-7313..7322 PASS 2026-10-28 (lượt đầu, staging 05:15 +07); TC-TIB-7323..7333, 7336..7340, 7343 PASS 2026-10-28 (retest sau SDK 03:01:11 GMT); comment Jira 54404 ngày 2026-10-13 (https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404); Jira description (update cuối 2026-10-12)`
- Họ xác nhận chính xác điều gì: `dev doc 54404, nguyên văn: "Hide is the exact opposite of Show for the same conditions: if a Show layer would be visible, the Hide layer is hidden, and the other way round." ▸ "With OR, the layer hides as soon as one condition matches." ▸ "With AND, it hides only when every condition matches." ▸ "A condition whose source option is hidden (switched off by its show/hide toggle, or hidden by its own condition) does not match. A Hide layer that depends only on hidden options is therefore shown." ▸ Jira description, nguyên văn: "Hide: the layer and its option are hidden when the condition matches, and shown otherwise." ▸ test case: nguyên văn actualResult ở từng block 5.1`

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
KHÔNG được coi là đã xác nhận / đã duyệt:
1. CLAIM-17..21 (KHÔNG CÓ NGUỒN): regression Show trên SDK mới, Group không có Conditional Setting,
   Edit customization không áp điều kiện, MCP hỗ trợ Hide, SDK cũ trong cache render đảo chiều —
   chỉ là quan sát, không dùng làm expected result.
2. C14 trong RA ("Hide trên Group giống Show", dev, Slack 2026-10-28) ngược với quan sát QA
   (CLAIM-18) — KHÔNG ghi C14 vào context; chưa ai phân xử. BUG-436 (Group mang dependency dựng
   bằng data luôn hiện trên SDK 03:01 GMT) chưa đóng.
3. BUG-433 (Edit customization CÓ áp điều kiện, lượt [AI]) và PASS tay của QA ở 7341 nói ngược
   nhau, 7341 không có actualResult — không chọn phía nào.
4. dev doc 54404 viết 2026-10-13; code còn đổi sau đó (PR cập nhật tới 2026-10-26, SDK staging deploy
   2026-10-28 03:01 GMT, merge 2026-10-29). Các claim dev_doc (03, 09, 13, 15, 16) chưa có case nào
   kiểm trên build cuối.
5. CLAIM-15 nói "artwork import" giữ Hide; Q4 của RA hỏi riêng export/import file định dạng v1 —
   chưa ai trả lời, đừng suy rộng.
6. "Cache SDK khoảng 1 ngày" (dev, có hedge) và max-age=14400 (header quan sát) — chưa chốt số nào.
7. Nguyên nhân BUG-430 (print file order #1119 rỗng) chưa phân định — không thành rule.
8. Lỗi form không ẩn option con theo Group (BUG-321 → 324) là lỗi chung Show/Hide, không thuộc
   TIB-5558 (R11).
9. Câu còn treo: Q2 (use case Lyto, Blocker, chờ PO), Q4 (export/import v1), Q8 (cửa sổ cache SDK),
   Q9 (Edit customization rồi regenerate), Q10 (giá trị buyer khi layer Hide hiện lại).
10. feature_key "MỚI: …" ở Phần 1b chỉ là đề xuất; mọi id artwork/campaign/order là fixture staging,
   không cam kết giữ.
11. Mọi test_case là trên staging 2026-10-28, trước khi 6 PR merge 2026-10-29; chưa kiểm production.
⏳ CHỜ BẠN: từ sau 2026-10-28, PO hoặc dev có trả lời thêm Q2 / Q4 / Q8 / Q9 / Q10 ở đâu không (ai,
ngày, link)? Có thì claim tương ứng phải sửa trước khi Submit.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Conditional Setting (Artwork 2.0) có action Show hoặc Hide, chọn bằng dropdown ở đầu heading
("Show/Hide this layer and its option when:"), mặc định Show, mỗi layer đúng một action; đổi action
giữ nguyên điều kiện, match type và toggle first load ("Show/Hide this layer on first load"). Data:
dependency.action = "show" | "hide"; layer cũ không có key action được hiểu là Show. Artwork 1.0
không có dropdown (luôn Show); convert 1.0→2.0 ra Show; paste layer 2.0→1.0 bị chặn ("Cannot import
layers from different artwork versions."). Vòng điều kiện với Hide bị chặn khi Save giống Show.
Storefront (SDK từ bản 2026-10-28 03:01:11 GMT): Hide ẩn layer + option khi điều kiện khớp, hiện
khi không khớp (đảo của Show với cùng điều kiện); OR ẩn khi một điều kiện khớp, AND ẩn khi mọi điều
kiện khớp; cập nhật ngay khi đổi nguồn. "Hide this layer on first load" bật + chưa trả lời: layer
ẩn trên artwork, option vẫn hiện; OR còn ẩn tới khi mọi nguồn đang hiện trả lời không khớp, AND hiện
ngay khi một nguồn trả lời không khớp. Toggle layer và Additional Option làm nguồn được. Layer đang
bị Hide không chặn Add to cart dù Required; giá trị đã nhập không vào cart/order/print file. Preview,
mockup, print file của order áp Hide giống storefront. Duplicate artwork giữ Hide.
Theo dev doc (chưa có case trên build cuối): tooltip match type/toggle đổi theo Hide; toggle first
load tắt thì layer hiện khi chưa trả lời; nguồn bị ẩn = không khớp; linked layer đi theo layer gốc;
import, copy/paste layer, global template replica giữ Hide; Bulk apply Conditional setting có dropdown.
Đã quan sát, chưa xác nhận (không dùng làm expected): Group không có Conditional Setting ở cấp Group
(đặt cho từng layer con) — ngược mô tả của dev; Edit customization không áp điều kiện; MCP hỗ trợ
Hide; storefront còn SDK cũ trong cache render Hide như Show (đảo chiều).
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7313, TC-TIB-7314 (Testlane task TIB-231)`
- **Link:** `không có (Testlane task TIB-231, project proj-7082bc68-6228-4718-b22d-c8e6f95437ab)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI] (QA pipeline của chienct)`
- **Trích nguyên văn:**
  ```
  TC-TIB-7313: "Trên AW-HIDE-BASE (#5878), panel Conditional Setting của layer "QUOTE DOG" hiển thị
  heading mặc định "Show this layer and its option when:"; bấm vào chữ Show mở listbox có đúng 2
  option Show / Hide (không có giá trị thứ ba), chọn Hide thì heading đổi ngay thành "Hide this layer
  and its option when:". Không bấm Save nên artwork giữ nguyên trạng thái cũ."
  TC-TIB-7314: "Thêm layer Single-line Text mới vào AW-HIDE-BASE (#5878), mở Conditional Setting của
  layer vừa thêm: dropdown action đang ở giá trị "Show" và heading là "Show this layer and its option
  when:", match type mặc định "All conditions match (AND)", chưa có điều kiện nào."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7316, TC-TIB-7317`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7316: "Sau khi chọn Hide: chỉ còn một dropdown action (giá trị Hide), heading đổi thành "Hide
  this layer and its option when:", không xuất hiện khối điều kiện Show thứ hai; nút khả dụng trong
  panel chỉ có "Select all" và "+ Add conditions" — không có cách thêm action Show song song."
  TC-TIB-7317: "Sau khi chọn Hide: vẫn đúng 2 điều kiện đó, vẫn OR checked, toggle vẫn BẬT — chỉ
  heading đổi thành "Hide this layer and its option when:" và nhãn toggle thành "Hide this layer on
  first load". Đổi ngược lại Show: 2 điều kiện, OR và toggle BẬT giữ nguyên; nhãn toggle trở lại "Show
  this layer on first load"."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-03

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404 "Change & test cases — Add Hide layer option in Conditional Setting", mục "Show / Hide choice in Conditional setting (artwork editor)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev, assignee) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "Choosing Hide changes:
   - the match type tooltips, which now say "hide when all / any options are selected";
   - the toggle under the conditions, which becomes "Hide this layer on first load" with its own
     tooltip.
  Switching back to Show restores the old labels. The conditions, match type and toggle value are
  kept when switching."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-04

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7318, TC-TIB-7317, TC-TIB-7315; raw request/response trong teeinblue/TIB automation/qa-output/api-observations_TIB-231.json`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7318: "Network → PUT https://staging-api.teeinblue.com/api/artworks/5881 → 200. Body:
  "dependency":{"action":"hide","match_type":"all","show_by_default":false,"dependencies":[{"value":
  [46703],"element":"layer-610006"}]} — giá trị lưu xuống đúng là chuỗi "hide" … Sau reload editor:
  dropdown = Hide, heading "Hide this layer and its option when:", điều kiện "Pet 1 Type is any of:
  Cat", radio "All conditions match (AND)" checked, nhãn toggle "Hide this layer on first load"."
  TC-TIB-7317: "Body: "dependency":{"action":"show","match_type":"any","show_by_default":true,
  "dependencies":[…]} — đủ 2 điều kiện, match_type "any" và show_by_default true không bị mất hay
  reset, chỉ action đổi."
  TC-TIB-7315: "API GraphQL artworks (#5880): dependency = {match_type: "all", dependencies:
  [{element: "layer-610003", value: [46702]}], show_by_default: false} — bản ghi cũ không có key
  action nên được hiểu là Show, không bị migrate sai."
  ```
- **File đính kèm cho claim này:** `api-observations_TIB-231.json (local, không đính kèm)`

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7319, TC-TIB-7320, TC-TIB-7321`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7319: "Trên AW-OLD-1.0 (#5899, schema_version = 1), panel Conditional Setting của layer
  "QUOTE OLD" hiển thị heading là một chuỗi text liền "Show this layer and its option when:" — không
  tách thành dropdown + text như Artwork 2.0 … Nhãn toggle vẫn cố định "Show this layer on first load"."
  TC-TIB-7320: "Editor sau convert → Conditional Setting của layer "QUOTE OLD": dropdown Show/Hide đã
  xuất hiện và đang ở giá trị Show, heading "Show this layer and its option when:"; điều kiện "Pet 1
  Type is any of: Dog" và radio "All conditions match (AND)" giữ nguyên như trước convert."
  TC-TIB-7321: "mở AW-OLD-1.0 (#5899) rồi Ctrl+V: app hiện thông báo "Cannot import layers from
  different artwork versions." và danh sách layer của artwork 1.0 không đổi"
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7322`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "AW-HIDE-CIRC (#5883): đặt layer "QUOTE A" action Hide phụ thuộc "QUOTE B", layer "QUOTE B" action
  Hide phụ thuộc "QUOTE A" → bấm Save & Close: app chặn, hiện thông báo Template - Default template:
  Circular conditions between: QUOTE A > QUOTE B / QUOTE A: - Conditions haven't been finished /
  QUOTE B: - Conditions haven't been finished, editor không đóng. AW-SHOW-CIRC (#5886): làm đúng các
  bước trên với action Show → thông báo giống từng chữ và cũng không lưu được. Không có request ghi
  nào thành công: GraphQL đọc lại cả 2 artwork sau đó, layer "QUOTE A" và "QUOTE B" của cả #5883 lẫn
  #5886 vẫn có dependency = null"
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7323 .. TC-TIB-7330 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-1 · https://nprice1.myshopify.com/products/tib-5558-cp-hide-or · https://nprice1.myshopify.com/products/tib-5558-cp-hide-and · https://nprice1.myshopify.com/products/tib-5558-cp-show-1`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7323: "Layer "QUOTE DOG" và ô nhập của nó ẩn ngay khi chọn Pet 1 Type = Cat (khớp điều kiện
  Hide) trên CP-HIDE-1. BUG-429 không còn tái hiện trên SDK bản 03:01 GMT 2026-10-28."
  TC-TIB-7324: "Pet 1 Type = Dog (không khớp) → field "QUOTE DOG" hiện, nhập "GOOD DOG" thì preview
  artwork hiển thị đúng chuỗi "GOOD DOG" (SDK 03:01 GMT 28/10)."
  TC-TIB-7325: "Chuỗi Cat → Dog → Cat không reload: Cat → field và layer ẩn; Dog → hiện; Cat → ẩn lại,
  cập nhật ngay trong cùng trang, URL không đổi."
  TC-TIB-7326: "CP-HIDE-OR: Pet 1 = Cat / Pet 2 = Dog → layer "QUOTE DOG" (layer-620005) và field đều
  ẩn; đổi sang Pet 1 = Dog / Pet 2 = Cat → vẫn ẩn. Một điều kiện khớp là đủ để ẩn."
  TC-TIB-7328: "CP-HIDE-AND: Pet 1 = Cat và Pet 2 = Cat (2/2 khớp) → layer "QUOTE DOG" (layer-620009)
  và field đều ẩn."
  TC-TIB-7329: "CP-HIDE-AND: chỉ 1/2 điều kiện khớp (Cat/Dog và Dog/Cat) → layer và field vẫn hiện ở
  cả 2 tổ hợp"
  TC-TIB-7330: "Hide và Show cho kết quả ngược nhau ở cả 2 giá trị nguồn. Bảng "QUOTE DOG"
  (form/preview): CP-HIDE-1: Cat → ẩn/ẩn, Dog → hiện/hiện. CP-SHOW-1: Cat → hiện/hiện, Dog → ẩn/ẩn."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7324..7330 trên Testlane`

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7331, TC-TIB-7332, TC-TIB-7333 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl · https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl-or · https://nprice1.myshopify.com/products/tib-5558-cp-hide-fl-and`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7331: "CP-HIDE-FL, first load chưa chọn gì: layer "QUOTE DOG" (layer-620016) không vẽ trên
  artwork, còn field "QUOTE DOG" vẫn hiện trên form (form có Pet 1 Type + QUOTE DOG) — ngược chiều
  Show như mong đợi."
  TC-TIB-7332: "CP-HIDE-FL-OR: first load → layer (layer-620020) ẩn; Pet 1 = Dog, Pet 2 chưa trả lời →
  vẫn ẩn; Pet 2 = Dog (mọi nguồn đều không khớp) → layer hiện."
  TC-TIB-7333: "CP-HIDE-FL-AND: first load → layer (layer-620024) ẩn; Pet 1 = Dog (không khớp), Pet 2
  chưa trả lời → layer hiện ngay."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 3 case trên Testlane`

### CLAIM-09

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Hiding layers by condition (storefront)" → "Before the buyer answers (source option still empty)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "Before the buyer answers (source option still empty):
   - "Hide this layer on first load" off: the layer is shown.
   - "Hide this layer on first load" on: the layer is hidden on the artwork. With OR it stays hidden
     until every visible source option is answered with a non-matching value. With AND it shows as
     soon as one source is answered with a non-matching value.
   - The layer's own personalization option is shown either way."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7336, TC-TIB-7337 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-toggle · https://nprice1.myshopify.com/products/tib-5558-cp-hide-addopt`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7336: "CP-HIDE-TOGGLE: bật toggle "Add name" (layer-620039 checked, khớp điều kiện Hide) →
  field và layer "QUOTE DOG" (layer-620040) ẩn; tắt toggle → hiện lại. Form và preview khớp nhau. …
  layer chỉ được gửi khi đang hiện."
  TC-TIB-7337: "CP-HIDE-ADDOPT: Gift wrap = Yes (khớp) → field và layer "QUOTE DOG" (layer-620043) ẩn;
  Gift wrap = No → hiện."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 2 case trên Testlane`

### CLAIM-11

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7338, TC-TIB-7339 (retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-req · https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7338: "CP-HIDE-REQ: Pet 1 Type = Cat → field "QUOTE DOG*" (Required, layer-620027) ẩn; bấm
  Add to cart để trống → thành công, không có lỗi required; /cart.js tăng từ 6 lên 7 item"
  TC-TIB-7339: "Giá trị "GOOD DOG" nhập khi layer đang hiện (Dog) rồi bị Hide (đổi sang Cat) không đi
  vào line-item properties, order và print file. … Line-item properties trong /cart.js: chỉ
  _customization_id, _customization_image, _tib_fulfilled_sku, _tib_design_link_1, không có dòng cho
  "QUOTE DOG". … Print file item này (…-14291.png, 1400x1400) đo được 0 pixel không trong suốt —
  không có layer."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của 2 case trên Testlane`

### CLAIM-12

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7340 (retest), order #1120`
- **Link:** `https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "Order áp điều kiện Hide đúng chiều và khớp storefront; print file và preview không còn trống —
  BUG-430 không tái hiện trên lượt này. … Item #7628 (Pet 1 Type = Cat, khớp Hide): customization chỉ
  có layer-600000 = Cat; print file … 0 pixel đục = không có layer; preview … chỉ có áo + khung PRINT
  AREA, không có chữ. Item #7627 (Pet 1 Type = Dog, QUOTE DOG = "GOOD DOG"): … print file … có 9.834
  pixel đục, hiện chữ "GOOD DOG"; preview … hiện "GOOD DOG" trên mockup … Khớp cái buyer thấy trên
  storefront (Cat → ẩn, Dog → hiện)."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7340 trên Testlane`

### CLAIM-13

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Hiding layers by condition (storefront)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "A condition whose source option is hidden (switched off by its show/hide toggle, or hidden by its
  own condition) does not match. A Hide layer that depends only on hidden options is therefore shown.
  Linked layers follow the final visibility of the layer they are linked to."
  "Two-level: layer B (Show, "A is X") depends on option A, which is a Hide layer → when A is hidden by
  its condition, B is hidden too."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-14

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** `TC-TIB-7343 (tiêu chí 1–2 lượt đầu, tiêu chí 3 retest)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-hide-1-dup`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  "Bản duplicate giữ action Hide và ẩn/hiện đúng chiều trên storefront. Tiêu chí 1–2 (editor/API của
  bản copy #5956 giữ action:"hide", #5957 giữ action:"show") đã đạt ở lượt trước và dữ liệu không đổi;
  lượt này kiểm lại tiêu chí 3: campaign CP-HIDE-1-DUP (#3273, tib-5558-cp-hide-1-dup) — Pet 1 Type =
  Cat → field và layer ẩn; = Dog → hiện."
  ```
- **File đính kèm cho claim này:** `ảnh bằng chứng gắn trong actualResult của TC-TIB-7343 trên Testlane`

### CLAIM-15

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Copying artworks keeps Show / Hide"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  "Feature: Hide survives every way an artwork or layer is copied.
  Now: Duplicate artwork, artwork import, copy / paste of layers and global template replicas keep the
  Hide choice.
  Where to see it: Duplicate artwork, artwork import, copy / paste layers, global templates."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-16

- **Loại nguồn** (đúng 1): `dev_doc`
- **Locator:** `comment Jira 54404, mục "Show / Hide choice in Conditional setting (artwork editor)"`
- **Link:** `https://ownego.atlassian.net/browse/TIB-5558?focusedCommentId=54404`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-13`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `giangnth (dev) — tài liệu tự sinh từ branch diff`
- **Trích nguyên văn:**
  ```
  ""Bulk apply Conditional setting" (several layers selected) has the same dropdown and applies the
  chosen Show / Hide to every selected layer, as it already does for the conditions.
  Where to see it: Artwork editor → select a layer → Conditional setting; layers action bar → Bulk
  apply Conditional setting."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-17

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7344 (lượt đầu, SDK cũ)`
- **Link:** `https://nprice1.myshopify.com/products/tib-5558-cp-show-1`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI]`
- **Trích nguyên văn:**
  ```
  TC-TIB-7344 (lượt đầu, trước SDK 03:01:11 GMT): "Hành vi cũ không bị ảnh hưởng: layer không điều kiện
  luôn hiện, layer Show vẫn đúng chiều. Storefront CP-SHOW-1 (tib-5558-cp-show-1): layer "NO
  CONDITION" (layer-620013) hiện trên form và preview ở mọi giá trị nguồn … Layer "QUOTE DOG"
  (layer-620012, action Show, điều kiện "Pet 1 Type is Cat"): Cat → hiện trên cả form lẫn preview;
  Dog → ẩn khỏi cả hai."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-18

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7334 (bug BUG-436), TC-TIB-7335 — actualResult viết tay [QA]; RA C14`
- **Link:** `không có (Testlane task TIB-231)`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) viết tay trên Testlane; Testlane không lưu ngày từng case`
- **Trích nguyên văn:**
  ```
  TC-TIB-7334 actualResult: "Chưa set được điều kiện cho toàn bộ Group mà cần set cho từng layer 1"
  TC-TIB-7335 actualResult: "chưa có hide cho cả group. cần thực hiện hide cho từng layer trong group"
  Phía ngược lại (RA analysis_TIB-5558.md, C14, diễn giải đáp án dev Slack 2026-10-28): "Hide trên
  Group layer: Group ẩn/hiện theo điều kiện Hide; cách các layer con đi theo Group giống hệt Show."
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7341 (actualResult rỗng); BUG-433; RA C12`
- **Link:** `https://staging-portal.teeinblue.com/orders/4811`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) đổi status tay, không ghi kết quả; RA C12 diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7341 actualResult: (rỗng)
  RA analysis_TIB-5558.md, C12: "Màn Edit customization trong admin không áp dụng điều kiện ẩn/hiện,
  kể cả với Show → Hide không thay đổi gì ở màn này. (Q5, Slack 2026-10-28)"
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-20

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `TC-TIB-7342 (actualResult rỗng); artwork #5970 tạo qua MCP create-artwork-tool; RA C11`
- **Link:** `https://staging-portal.teeinblue.com/artworks?id=5970`
- **Ngày của nguồn (YYYY-MM-DD):** `không rõ`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `QA (chienct) đổi status tay, không ghi kết quả; RA C11 diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7342 actualResult: (rỗng)
  RA analysis_TIB-5558.md, C11: "MCP artwork tools có hỗ trợ Hide: AI client tạo/cập nhật được layer
  với điều kiện Hide, tài liệu cho AI client đã mô tả Show/Hide, và get-form-preview-tool hiển thị đúng
  option ẩn/hiện theo Hide. (Q5, Slack 2026-10-28)"
  Capture tự chụp 2026-10-28: artwork #5970 tạo bằng create-artwork-tool với dependency {action:
  "hide", match_type: "all", show_by_default: false, dependencies: [{element: <layer text nguồn>,
  operator: "contains", value: "A"}]}; get-artwork-tool đọc lại action "hide".
  ```
- **File đính kèm cho claim này:** `không có`

### CLAIM-21

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** `actualResult TC-TIB-7323 (header SDK); RA C8, R9, Q8`
- **Link:** `https://staging-sdk.teeinblue.com/shopify/app-v2.js`
- **Ngày của nguồn (YYYY-MM-DD):** `2026-10-28`
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** `test-executor agent [AI] (capture); RA diễn giải đáp án dev Slack 2026-10-28`
- **Trích nguyên văn:**
  ```
  TC-TIB-7323: "request thật của trang https://staging-sdk.teeinblue.com/shopify/app-v2.js?token=…&
  shop=nprice1.myshopify.com → 200, Last-Modified Wed, 28 Oct 2026 03:01:11 GMT, ETag
  W/"85d63a84fa4e7e4dbbeee8c688efab70", Cache-Control max-age=14400; … (Lần load đầu trước khi xoá
  cache vẫn nhận bản cũ: Last-Modified 14 Oct 2026, ETag W/"6acee813-1a87c5" — đã xác nhận bị cache.)"
  RA analysis_TIB-5558.md, R9: "Trong thời gian storefront còn chạy SDK cũ (cache), layer Hide được
  render theo logic Show → hiển thị đảo ngược; khắc phục bằng clear cache. (C8 — Q3, Slack 2026-10-28)"
  ```
- **File đính kèm cho claim này:** `không có`

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

`Jira https://ownego.atlassian.net/browse/TIB-5558 · Testlane task TIB-231 (32 case, ảnh bằng chứng trong actualResult của lượt retest) · Bug Testlane: BUG-429 (SDK storefront bỏ qua action hide — không tái hiện ở retest), BUG-430 (print file order #1119 rỗng — không tái hiện ở #1120), BUG-433 (Edit customization có áp điều kiện), BUG-436 (Group mang dependency luôn hiện trên SDK 03:01 GMT), liên quan BUG-321 → 324 · RA teeinblue/TIB automation/qa-output/analysis_TIB-5558.md · raw API teeinblue/TIB automation/qa-output/api-observations_TIB-231.json · order lượt đầu https://staging-admin.teeinblue.com/admin/instances/520/orders/4808 · Đã soát: không có email, số điện thoại, tên khách thật, token, cookie hay credential trong file này`

> **Trước khi đính kèm: bỏ email, số điện thoại, địa chỉ, tên khách hàng thật, token, cookie, credential.** Tên nội bộ của dev/support trong comment ticket thường CHẤP NHẬN ĐƯỢC (không phải PII khách hàng), nhưng vẫn kiểm kỹ. Evidence còn dữ liệu nhạy cảm sẽ **chặn publish**, không phải cảnh báo.

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực — kể cả khi câu trả lời là "không ai, chỉ là comment dev"
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật, không làm tròn lên
- [x] Đã ghi build/ngày resolve hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi rõ từ khoá đã tra canon (hoặc lý do không tra được)
- [x] Mỗi claim trong "Quan sát được" có đúng 1 dòng ở Phần 1a, với `Claim ID` **duy nhất**
- [x] Mỗi `Claim ID` ở Phần 1a có đúng 1 block tương ứng ở Phần 5.1
- [x] Mỗi `Claim ID` ở Phần 1a có dòng tương ứng ở Phần 1b (object/feature/role/surface)
- [x] Cột "Nguồn & độ mạnh" của mỗi dòng ghi đúng 1 trong 5 trạng thái, kèm trích dẫn cụ thể khi không phải `KHÔNG CÓ NGUỒN`
- [x] Mọi claim ghi `dev_doc`/`spec_doc`/`po_dev_confirm`/`test_case` đều có **ngày nguồn cụ thể** ở 5.1 (không phải "không rõ")
- [ ] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file

---

# Sau khi gửi

Bạn nhận phản hồi trên Proposal/Task đó với 1 trong 5 kết cục:

| Kết cục | Nghĩa |
|---|---|
| `ACCEPTED` | Đã vào canonical context; version ghi trong `manifest.json` → `resolved_requests` |
| `NEEDS_INFO` | Thiếu thông tin, nêu **đúng tên mục** cần bổ sung. Sửa rồi Submit lại (tạo Proposal mới) |
| `CONFLICT` | Mâu thuẫn với canon và **chưa ngã ngũ** — cả hai phía được giữ kèm nguồn, chờ PO/Dev/QA lead phân xử |
| `REJECTED` | Không vào canon, kèm lý do |
| `DEFERRED` | Hoãn, kèm điều kiện để làm lại |

**Lưu ý về sức ghi đè:** nếu CCR của bạn có nguồn **mạnh hơn hoặc mới hơn** canon hiện tại, canon có thể **bị ghi đè** thay vì sinh conflict — statement cũ chuyển vào `CHANGELOG.md` dạng superseded. Luật ở contract §12.5, và nó chỉ bật cho product có bật chính sách đó (xem phụ lục). Đây là lý do ngày nguồn ở Phần 5.1 phải chính xác.
