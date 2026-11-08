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

**Loại:** BEHAVIOR_CHANGE

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: teeinblue
- Object: artwork (claim chính); phụ: order (CLAIM-12, CLAIM-15), sdk (CLAIM-16) · Feature: MỚI: group-layer-order-design-render (đề xuất — registry và thư mục features/ chưa có feature nào về render Group trong order design); phụ: artwork/layer-print-effects (CLAIM-10, CLAIM-11), order/review-and-initiate-fulfillment-portal (CLAIM-12, CLAIM-15), sdk/storefront-buyer-facing (CLAIM-16)
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5633 — Fix group layer render slowdown that times out order generation (Bug, High)
Trạng thái Jira: Passed (Resolution: Done) — chienct chuyển QA Review → Passed lúc 2026-10-30 10:37 +07. Dev chuyển Code Review → QA Review lúc 2026-10-29 10:08 +07. Development panel: 2 PR MERGED (cập nhật cuối 2026-10-30 14:02 +07), 2 build thành công (cuối 2026-10-29 09:38 +07). Không có Fix Version.

Description (reporter tinhpt, 2026-10-28): order production #HB460717 kẹt "generating"; item Boxershorts vượt giới hạn 30 phút nên hệ thống tự dừng 2 lần ngày 2026-10-27. Nguyên nhân: artwork có ~250 ảnh nhỏ lặp trong MỘT group; từ bản cập nhật 2026-10-13, layer trong group render theo cách mới chậm hơn nhiều khi group nhiều layer: 1–2 phút trước 10-13, 6–23 phút sau đó, vượt 30 phút ngày 10-27. Expected: giảm thời gian render để về mức trước 10-13. Workaround: nhờ khách ungroup rồi update artwork version.

Comment dev "Solution" (tinhpt, 2026-10-28 12:31 +07): chỉ sửa api `app/Services/NewRenderers/AbsoluteGroupRenderer.php` — cấp 1 canvas cho cả group (union box của các con) thay vì 1 canvas mỗi con; con nằm trong canvas thì composite tại chỗ; chỉ grow khi con tràn box (shadow, rotation, text căn giữa); cuối cùng crop về bounds nội dung và pad phải/dưới về bội số 16 (CANVAS_SIZE_MULTIPLE, cần cho emboss); RenderedLayer giữ origin cũ nên BoardRenderer, EmbossRefRenderer, shape-cut nhận cùng ảnh và vị trí. Blend mode, tag Context và exception wrapping mỗi con không đổi. Không đổi sdk (preview vẽ group bằng SVG <g>), portal, migration, schema, config. Không đụng giới hạn 30 phút auto-stop và hàng đợi final-render / final-render-large (artwork dưới ngưỡng 150 Mpx route-large).

Comment dev "QA plan" (tinhpt, 2026-10-28 15:17 +07): PR api 4085; staging: order artwork group ~250 layer sinh design "within a few minutes, not 30"; so với bản ungroup; group có shadow/rotation ở mép; emboss group và shape-cut group. Support regenerate item production sau deploy (không phải bước QA). U1–U6 là unit test của dev.

File RA analysis_TIB-5633.md — Nhật ký chốt (Slack #req-chienct, thread ts 1793243555.494659, vòng 1–2 ngày 2026-10-29; RA ghi tóm tắt, chỉ vài câu là nguyên văn, không có tên người trả lời): Q1 ngưỡng 1–2 phút (mức trước 13/10); Q3 group mask/nested cũng phải đạt; Q4 grow-path không có ngưỡng riêng, fail thì dev fix tiếp; Q5 áp dụng AW1.0 + AW2.0, order thường + regenerate; Q7 "OK" giữ 30 phút, SDK preview ngoài phạm vi; Q8 fix hiện tại cover cả group mask/nested; Q2 hạ tầng staging "Cũng tương đồng" production; Q6 giới hạn 150 Mpx: "Bạn cứ test qua giúp tôi" (không có số).

Kết quả test (Testlane task TIB-268, 19 case, test-executor [AI], staging, 2026-10-29 khoảng 13:35–14:34 +07): 15 case có actualResult PASS (7614–7625, 7628, 7630, 7631, 7632 — trừ 7627); 7626 và 7629 skipped; 7627 status "passed" nhưng actualResult RỖNG → coi là chưa chạy. Không có bug nào gắn trên case. Số đo: group phẳng 250 layer ~50s; bản ungroup ~39s, 0 pixel khác; group 4 layer shadow/rotation ~57s; contour cut 3 layer ~68s; mask chữ nhật ~44s; nested ~47s; cascade ~45s; text tràn mép ~55s; canvas 148,5 Mpx ~33s; regenerate ~44s.
```

- Nguồn: tổng hợp từ 1 ticket Jira (description + 3 comment + changelog) và file RA; kết quả test là quan sát trực tiếp của test-executor [AI] trên staging, KHÔNG PHẢI production
- Thấy mấy lần / xác nhận trực tiếp mấy lần: lỗi gốc thấy 1 lần trên production (order #HB460717, theo Jira — QA không tự quan sát); xác nhận trực tiếp 1 lượt chạy trên staging ngày 2026-10-29 (15 case có actualResult PASS [AI], không retest); trên production 0 lần

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
CHƯA verify trực tiếp:
(1) Không có số đo trước fix trên staging để so — chỉ có số trong Jira (1–2 phút trước 10-13, 6–23 phút sau).
(2) Không biết PR thứ 2 (merged, cập nhật 2026-10-30 14:02 +07, sau lượt chạy) có đổi code hay chỉ là merge release — build CI cuối là 2026-10-29 09:38 +07, trước lượt chạy.
(3) TC-TIB-7626 (blend mode + tag Context) skipped: editor không có điều khiển blend/Context. TC-TIB-7629 (Artwork 1.0) skipped: AW1.0 không có Group. TC-TIB-7627 (Emboss) actualResult rỗng dù status "passed" — chưa có cách dựng group emboss.
(4) Mask chỉ thử hình chữ nhật 60%x60%; chưa thử circle / custom shape. Group mask chưa thử xuất PDF (artwork.md ghi group có mask từng không render khi xuất PDF).
(5) Fixture grow-path chỉ 4 layer (shadow/rotation) và 3 layer (contour cut), không phải 250 → thời gian grow-path với 250 layer chưa đo. Shadow fixture offset ±120 blur 60, khác 10/10 blur 15 của case.
(6) TC-TIB-7619: text "WWW…" render cao ~22px thay vì cỡ 601 khai báo (nghi co theo box ~502 rộng) — chưa hỏi dev có đúng không.
(7) TC-TIB-7631: canvas artwork 148,5 Mpx nhưng printarea 12000x6000 (72 Mpx) → gần như không đi vào luồng route-large 150 Mpx.
(8) TC-TIB-7621: chỉ đo design cuối 12000x6000 (= printarea); không đọc được canvas nội bộ của group, origin chỉ kiểm gián tiếp qua ảnh.
(9) Chưa thử trên production, chưa thấy Support regenerate lại item #HB460717 sau deploy.
⏳ CHỜ BẠN: bạn đã tự thử gì (trên staging hoặc production) mà kết quả test không ghi lại?
⏳ CHỜ BẠN: TC-TIB-7627 (Emboss) đang để status "passed" trên Testlane nhưng actualResult rỗng — bạn có tự test Emboss không? Nếu có, kết quả + ngày là gì; nếu không, CLAIM-11 giữ KHÔNG CÓ NGUỒN.
⏳ CHỜ BẠN: Artwork 1.0 không có Group (artwork.md) nhưng RA Q5 ghi fix áp dụng cả AW1.0 — giữ CLAIM-13 như câu hỏi mở, hay bỏ hẳn khỏi CCR?
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5633 — Artwork 2.0 có 1 group phẳng (không mask) ~250 layer ảnh nhỏ trải vùng in AOP: order design generate xong ~50s (trong ngưỡng 1–2 phút = mức trước 2026-10-13), order item về Ready, không kẹt "generating", không chạm auto-stop 30 phút | api (order design generation) · portal (order detail → Item Activity logs) | `test_case` — PASS TC-TIB-7614, TC-TIB-7616 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build CI cuối 2026-10-29 09:38 +07; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; liên quan order/review-and-initiate-fulfillment-portal (KB-019 Item Activity logs) | `ADD` |
| `CLAIM-02` | TIB-5633 — Design PNG của group giống hệt bản ungroup cùng layer (0 pixel khác trên 12000x6000, cùng 2.510.071 byte) | api (file design PNG) | `test_case` — PASS TC-TIB-7615 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-03` | TIB-5633 — Layer con có shadow hoặc xoay tràn box trong group: design vẫn hiện đủ shadow / layer xoay, đúng hướng và vị trí tương đối; phần vượt printarea bị clip theo printarea (fixture 4 layer, ~57s) | api (design PNG) | `test_case` — PASS TC-TIB-7617, TC-TIB-7618, TC-TIB-7620 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; chưa rõ có ảnh hưởng checklist layer-common-config (shadow/rotation) không, cần agent tự đánh giá | `ADD` |
| `CLAIM-04` | TIB-5633 — Text căn giữa tràn mép trong group: chữ không bị cắt trong vùng in, phần vượt mép printarea bị clip; generate ~55s (không bao gồm việc text render chỉ cao ~22px — xem 4.2) | api (design PNG) · storefront (nhập text personalize) | `test_case` — PASS TC-TIB-7619 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; artwork/layer-config-text (cỡ chữ trong box) — chưa rõ, cần agent tự đánh giá | `ADD` |
| `CLAIM-05` | TIB-5633 — Canvas của group sau render được crop về bounds nội dung, pad phải/dưới về bội số 16 và giữ nguyên origin (top/left) | api (renderer nội bộ) | `KHÔNG CÓ NGUỒN` — TC-TIB-7621 PASS nhưng chỉ đo design cuối 12000x6000 (= kích thước printarea), không đọc được canvas nội bộ group; origin chỉ kiểm gián tiếp; nguồn còn lại là comment dev (U5 unit test) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-06` | TIB-5633 — Group có mask Rectangle chứa ~250 layer: generate ~44s, chỉ phần trong mask hiển thị, 0 pixel lọt ra ngoài mask (chưa thử circle / custom shape / PDF) | api (design PNG, thời gian generate) · portal (Mask Editor) | `test_case` — PASS TC-TIB-7622, TC-TIB-7624 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; context local artwork.md → Group Mask (TIB-5403) — mask group từng làm hỏng PDF và Shape cut, cần re-check PDF | `ADD` |
| `CLAIM-07` | TIB-5633 — Group lồng nhau (cha > con > 250 layer): generate ~47s, không layer nào dịch chỗ so với group phẳng (chỉ khác viền antialias do fixture) | api (design PNG) | `test_case` — PASS TC-TIB-7623 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-08` | TIB-5633 — Cascade visibility trong group không đổi sau fix: 20 layer con tắt mắt thì vắng đúng 20 ô, 0 pixel dư; generate ~45s | api (design PNG) | `test_case` — PASS TC-TIB-7625 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-order-design-render; context local artwork.md → Group cascade visibility (TIB-5584) | `ADD` |
| `CLAIM-09` | TIB-5633 — Blend mode của layer con và layer tag Context trong group render như trước fix | api (design PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-7626 skipped (editor không có điều khiển blend / Context để dựng fixture); chỉ có comment dev (U6 unit test) | artwork / MỚI: group-layer-order-design-render — chưa rõ, cần agent tự đánh giá | `UNKNOWN` |
| `CLAIM-10` | TIB-5633 — Group có viền contour cut (photo_border, shape-cut) căn đúng từng layer, không lệch do canvas union mới (fixture 3 layer, ~68s) | api (design PNG) · portal (Print Effects / photo_border) | `test_case` — PASS TC-TIB-7628 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | artwork / layer-print-effects (checklist layer-print-effects); context local artwork.md → Group Mask (mask group từng làm hỏng Shape cut) | `ADD` |
| `CLAIM-11` | TIB-5633 — Group có Emboss: emboss căn đúng với group như trước fix (canvas pad bội 16 phục vụ emboss) | api (design PNG) | `KHÔNG CÓ NGUỒN` — TC-TIB-7627 status "passed" nhưng actualResult rỗng (chưa chạy, không dựng được group emboss) | artwork / layer-print-effects — canon KB-044 ghi chưa tìm thấy emboss trên account/plan đã explore | `UNKNOWN` |
| `CLAIM-12` | TIB-5633 — Regenerate design (order detail) cho item có group ~250 layer xong ~44s, order vẫn Ready, không kẹt generating | portal (order detail → Regenerate) · api | `test_case` — PASS TC-TIB-7630 2026-10-29 staging [AI] — build: staging @ 2026-10-29 13:35–14:34 +07 — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07); build hash: không rõ (QA không có quyền repo) | order / review-and-initiate-fulfillment-portal (KB-019); artwork / MỚI: group-layer-order-design-render | `ADD` |
| `CLAIM-13` | TIB-5633 — Fix áp dụng cho cả Artwork 1.0 (RA Q5) | api | `KHÔNG CÓ NGUỒN` — TC-TIB-7629 skipped: AW1.0 không có Group nên không dựng được fixture; câu trả lời Slack chỉ có bản tóm tắt trong RA | artwork / MỚI: group-layer-order-design-render — chưa rõ, cần agent tự đánh giá | `UNKNOWN` |
| `CLAIM-14` | TIB-5633 — Artwork gần ngưỡng 150 Mpx (route-large, hàng đợi final-render-large) vẫn generate dưới 30 phút | api (hàng đợi final-render / final-render-large) | `KHÔNG CÓ NGUỒN` — TC-TIB-7631 PASS ~33s nhưng printarea chỉ 72 Mpx nên không chạm route-large; giới hạn cụ thể chưa có (RA Q6 còn mở) | artwork / MỚI: group-layer-order-design-render — chưa rõ, cần agent tự đánh giá | `UNKNOWN` |
| `CLAIM-15` | TIB-5633 — Giới hạn auto-stop 30 phút của order design và việc chia hàng đợi final-render / final-render-large giữ nguyên, không đổi theo fix | api · portal (order item status) | `KHÔNG CÓ NGUỒN` — chỉ có comment dev "Solution" + RA Q7 "OK" (tóm tắt, không có tên người / link từng câu) | order / review-and-initiate-fulfillment-portal — canon chưa có item nào về giới hạn 30 phút | `ADD` |
| `CLAIM-16` | TIB-5633 — SDK storefront preview của group ~250 layer không đổi (vẽ group bằng SVG g), ngoài phạm vi fix | storefront (popup Preview) | `KHÔNG CÓ NGUỒN` — TC-TIB-7632 PASS nhưng chỉ đếm DOM toàn trang (250 svg image, 756 thẻ g), popup chỉ hiện mockup, không so với trước fix | sdk / storefront-buyer-facing (KB-011, KB-042 nói khác nhau về cơ chế preview) | `UNKNOWN` |

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
| `CLAIM-01` | artwork | MỚI: group-layer-order-design-render | merchant (owner/staff xem order design) | api · portal | không có (liên quan order KB-019, không thay) |
| `CLAIM-02` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-03` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-04` | artwork | MỚI: group-layer-order-design-render | merchant (design) · guest buyer (nhập text) | api | không có |
| `CLAIM-05` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-06` | artwork | MỚI: group-layer-order-design-render | merchant | api · portal | không có |
| `CLAIM-07` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-08` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-09` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-10` | artwork | layer-print-effects | merchant | api · portal | không có |
| `CLAIM-11` | artwork | layer-print-effects | merchant | api | không có (liên quan KB-044, không thay) |
| `CLAIM-12` | order | review-and-initiate-fulfillment-portal | merchant (owner/staff) | portal · api | không có (liên quan KB-019, không thay) |
| `CLAIM-13` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-14` | artwork | MỚI: group-layer-order-design-render | merchant | api | không có |
| `CLAIM-15` | order | review-and-initiate-fulfillment-portal | merchant | api · portal | không có |
| `CLAIM-16` | sdk | storefront-buyer-facing | guest buyer | storefront | không có (liên quan KB-011, KB-042, không thay) |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** Jira https://ownego.atlassian.net/browse/TIB-5633 · PR https://github.com/qikify/teeinblue-api/pull/4085 · Slack #req-chienct thread ts 1793243555.494659 · Testlane task TIB-268 (TC-TIB-7614 → TC-TIB-7632) · staging instance https://staging-admin.teeinblue.com/admin/instances/520 · artwork 6064 (group 250), 6065 (ungroup), 6066 (shadow/rotation 4 layer), 6067 (contour cut 3 layer), 6068 (mask Rectangle), 6069 (nested), 6070 (cascade), 6072 (text tràn mép), 6073 (canvas 148,5 Mpx) · campaign 3295–3301, 3303, 3304 · order staging orders/4837, 4838, 4839, 4840, 4841, 4842, 4843, 4845, 4846 · storefront https://nprice1.myshopify.com/products/qa-tib-5633-camp-group250 · order production gốc https://portal.teeinblue.com/orders/53246924
- **Trạng thái đối tượng lúc đó:** lúc chạy test: ticket ở QA Review (từ 2026-10-29 10:08 +07), fixture QA dựng mới trên staging, campaign đã publish lên store nprice1 (product AOP, printarea 12000x6000). Lúc soạn CCR: ticket Passed (2026-10-30 10:37 +07), 2 PR merged
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): staging (test) · production (lỗi gốc trong ticket)
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** merchant owner/staff (staff portal xem order, regenerate) · guest buyer (đặt order trên storefront)
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** TIB-5633: staging @ 2026-10-29 13:35–14:34 +07 (giờ portal 02:35–03:34 New York) — sau lần TIB-5633 giao QA cuối (2026-10-29 10:08 +07; case được import lúc 11:45 +07 nên lượt chạy chắc chắn sau mốc này); build CI cuối 2026-10-29 09:38 +07; build hash: không rõ (QA không có quyền repo); không có Fix Version; ngày deploy production: ⏳ CHỜ BẠN: TIB-5633 đã lên production chưa, ngày nào (và Support đã regenerate item của order #HB460717 chưa)?
- **Ngày resolve/update cuối:** 2026-10-30
- **Đã ship chưa:** Resolution: Done (status Passed 2026-10-30 10:37 +07), 2 PR merged (cập nhật cuối 2026-10-30 14:02 +07); deploy production: không rõ

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: qa-knowledge manifest.json (generated_at 2026-10-30, commit 7bed4ea): artwork published_context_version 5 (2026-09-26, PUBLISHED) · order published_context_version 1 (2026-09-13, STALE) · sdk published_context_version 5 (2026-09-28, PUBLISHED)
- Canon hiện nói: canon qa-knowledge KHÔNG có item nào về thời gian render order design của Group, giới hạn auto-stop 30 phút, hàng đợi final-render / route-large 150 Mpx, hay pixel parity group vs ungroup. Item liên quan gần nhất: order KB-019: "Trong dialog 'Item Activity logs' của order-item #6957 (portal/owner/staging), quan sát thấy 4 sự kiện tự động, tất cả trong vòng ~22 giây sau khi order được tạo và KHÔNG có thao tác thủ công nào từ merchant: (1) 'Line item has been created' 04:48:48; (2) 'Line item is generating a design' 04:48:48; (3) 'Line item has generated a new design' 04:49:08 (Printarea 13936 / Artwork 4081 / Artwork Version 10953); (4) 'Line item marked as Ready to fulfill' 04:49:10." ▸ artwork KB-043: "Trong build staging này, layer action bar (khi chọn ≥1 layer) không có nút '...'/overflow menu ở bất kỳ tổ hợp selection nào đã thử (tìm bằng selector [class*=more]/[class*=ellipsis]/.alab-action__more trong.dialog-artwork-editor → found: 0 ở 5 tổ hợp). Action bar cố định: Deselect / N selected / Group (Ctrl/Cmd+G) / Ungroup (Ctrl/Cmd+Shift+G, luôn disabled vì chưa có group nào được tạo trong các sample này) / Copy to clipboard / Duplicate / Duplicate & Link options / Delete." ▸ artwork KB-044: "Nút Print Effects (canvas toolbar, cần có layer được chọn) mở popover.qfield-container.sc-layout-screen với các preset shape-cut 1x2/1x3/1x4/2x1/2x3 + Customize (grid rows/columns tuỳ chỉnh, Apply layout disabled khi 0 shape cut được chọn). Footnote nguyên văn: 'Effect layers only appear on Order Design as production guides for your print provider.' Đã thử với 4 layer type khác nhau (Single-line Text, Static Image, Static Vector, Word Cloud) và trang Extras › 3rd-party Services — không tìm thấy chuỗi 'emboss' hay '3rd-party' ở bất kỳ đâu trong các surface này trên account Linh explorer / plan Blue (Test)." ▸ sdk KB-011: "Trên store2 (guest, storefront, campaign 2595, SDK v2), mockup chính hiển thị dưới dạng SVG inline (#teeinblue-wrapper, Vue3 app) với các <g> layer có id dạng 'artwork-layer--layer-<n>' khớp CHÍNH XÁC với id field cá nhân hoá 'tee-field--layer-<n>' (vd layer-937252 = Cat Name #1, layer-224514 = Choose Woman's Hairstyle) — xác nhận cơ chế mapping field->layer trực tiếp theo id dùng chung. Đây là cơ chế preview KHÁC với store1/SDK v1 (KB-010, lightbox tĩnh) — 1 sample, chưa test template/campaign khác để suy tổng quát cho toàn SDK v2." ▸ artwork feature-summary.md FEAT-03: "Group/Ungroup end-to-end chưa test — Ungroup luôn disabled vì chưa từng có group nào được tạo" ▸ (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/artwork.md → Group Mask (TIB-5403): "A masked group breaks three neighbouring features (found by the user on the same build, 2026-10-14): a group that carries a mask (1) cannot be aligned — the Align actions don't apply to it, (2) fails to render in an order design exported as PDF (PNG renders fine), and (3) breaks Shape cut." ▸ (context local): artwork.md → Group cascade visibility (TIB-5584): "Layer chỉ render khi cờ `visible` của chính nó ON và mọi Group cha tới gốc đều ON (AND cả chuỗi). Khớp nhau ở editor, buyer preview và print file." ▸ (context local): artwork.md → Artwork 1.0 vs 2.0: "Artwork 1.0 artworks show a "Convert to Artwork 2.0" button and a simpler native toolbar (no Group/Duplicate & Link icons)."
- Đã tra bằng từ khoá nào: qa-knowledge `_registry.json` (group, layer, order, design, render, storefront) → artwork, order, sdk; grep kb.json + features/*/kb.json + checklists/*.json + feature-summary.md + open-questions.md của teeinblue: group layer, layer group, absolute-group, AbsoluteGroup, order design, generate design, design generat, regenerate, 30 minute, 30 phút, auto-stop, timeout, final-render, 150 Mpx, emboss, shape-cut, contour cut, render, SVG, Ungroup. Context local teeinblue/TIB automation/context/*.md: Group, absolute, 30 phút, auto-stop, final-render, generating a design, emboss, Artwork 1.0
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: test case đã PASS (CLAIM-01, 02, 03, 04, 06, 07, 08, 10, 12 — test-executor [AI]); PO/business: chỉ có câu trả lời Slack mà RA tóm tắt, không có tên người và link từng câu; còn lại là comment kỹ thuật của dev. ⏳ CHỜ BẠN: có PO/business xác nhận ngoài Jira/Slack không? Nếu bạn có link tới từng câu trả lời Slack (Q1, Q3, Q5, Q7, Q8) kèm tên người trả lời, gửi để nâng claim tương ứng lên po_dev_confirm
- Ở đâu, ngày nào: TC-TIB-7614, 7615, 7616, 7617, 7618, 7619, 7620, 7622, 7623, 7624, 7625, 7628, 7630 PASS ngày 2026-10-29 trên staging (build: không rõ hash, sau mốc giao QA 2026-10-29 10:08 +07) · Slack #req-chienct thread ts 1793243555.494659, vòng 1–2 ngày 2026-10-29 · comment dev "Solution" 2026-10-28 12:31 +07 và "QA plan" 2026-10-28 15:17 +07 trên TIB-5633
- Họ xác nhận chính xác điều gì: Test: xem trích nguyên văn actualResult ở Phần 5.1 ▸ Slack (theo Nhật ký chốt của RA — chỉ phần trong ngoặc kép là nguyên văn): Q1 "Về mức trước 13/10 (1–2 phút)" ▸ Q2 "Cũng tương đồng" ▸ Q6 "Bạn cứ test qua giúp tôi" ▸ Q7 "OK" ▸ Q4 và Q8 chỉ có tóm tắt: "Grow-path không có ngưỡng riêng, phải đạt như case thường; QA đo thực tế, nếu fail dev sẽ fix tiếp" ▸ "Fix hiện tại cover được cả group mask/nested"

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
KHÔNG coi là đã xác nhận / đã duyệt:
(1) Các con số thời gian (~50s, ~39s, ~44s, ~57s, ~68s…) — đo 1 lần trên staging bằng log Activity, không có baseline trước fix; chỉ dùng làm mốc tham khảo, không phải SLA. Ngưỡng 1–2 phút là câu trả lời Slack tóm tắt, chưa có link/tên người.
(2) Hiệu năng trên production, với số layer khác 250, với grow-path 250 layer (fixture chỉ 4 và 3 layer), với mask circle / custom shape, và với group mask xuất PDF.
(3) Việc text trong group render chỉ cao ~22px thay vì cỡ 601 khai báo (TC-TIB-7619) — chưa hỏi dev; KHÔNG ghi thành hành vi đúng hay bug.
(4) Blend mode / tag Context, Emboss, Artwork 1.0, route-large 150 Mpx: chưa chạy được — chỉ là comment dev / tóm tắt Slack.
(5) Chi tiết nội bộ renderer (1 canvas cho cả group, pad bội 16, giữ origin) — mô tả từ comment dev và unit test của dev, QA không quan sát được.
(6) Tên feature_key "group-layer-order-design-render" chỉ là đề xuất; không đề xuất object_key mới; ranh giới artwork / order / sdk giữ nguyên.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Order design của artwork có Group nhiều layer con (thử với ~250 ảnh nhỏ trên vùng in AOP 12000x6000) generate xong trong khoảng 1 phút trên staging (~50s đo ngày 2026-10-29, sau fix TIB-5633), không chạm giới hạn auto-stop 30 phút; ảnh output giống hệt pixel với bản ungroup cùng layer. Group có mask Rectangle, group lồng nhau, group có layer con tắt mắt (cascade visibility), layer con có shadow / xoay / text tràn mép và group có contour cut đều render đúng sau fix, và Regenerate design cũng nhanh tương đương. Trước fix (bản 2026-10-13 → 2026-10-27), group nhiều layer từng render 6–23 phút và có order bị auto-stop ở 30 phút; workaround là ungroup layer. Chưa xác nhận: mask circle / custom shape, xuất PDF, blend mode / Context, Emboss, Artwork 1.0, artwork chạm ngưỡng 150 Mpx route-large.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7614, TC-TIB-7616 (Testlane task TIB-268)
- **Link:** https://staging-portal.teeinblue.com/orders/4837 · https://staging-portal.teeinblue.com/artworks?id=6064
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent), task do chienct (QA) quản lý
- **Trích nguyên văn:**
  ```
  TC-TIB-7614: "Order #1125 (portal orders/4837): item #7659 generate design xong trong ~50 giây (log 02:35:56 "is generating a design" -> 02:36:46 "has generated a new design" + "Ready to fulfill"), dưới ngưỡng 1-2 phút, không timeout. Design PNG 12000x6000. API: trang order đọc design qua /api/graphql 200, design URL hợp lệ."
  TC-TIB-7616: "Group 250 layer generate hoàn tất ~50s (02:35:56 -> 02:36:46), xa mốc 30 phút; order #1125 trạng thái Ready, không có trạng thái lỗi/timeout hay kẹt "Generating"."
  Jira TIB-5633 description (2026-10-28): "The same artwork rendered in 1-2 min before Oct 13, rose to 6-23 min after, and by Oct 27 exceeded the 30-minute limit." / "Reduce render time for groups containing many layers so these designs finish within the limit again, back to the pre-Oct-13 performance."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7614 trên Testlane

### CLAIM-02

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7615
- **Link:** https://staging-portal.teeinblue.com/orders/4837 · https://staging-portal.teeinblue.com/orders/4838
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7615: "So sánh pixel 2 design PNG (12000x6000, 72.000.000 px, đọc bằng canvas ImageData): artwork #6064 (group) vs #6065 (ungroup) cho kết quả 0 pixel khác biệt (max channel diff = 0), cùng kích thước file 2.510.071 byte. Thời gian generate: group ~50s, ungroup ~39s."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7617, TC-TIB-7618, TC-TIB-7620
- **Link:** https://staging-portal.teeinblue.com/orders/4839 · https://staging-portal.teeinblue.com/artworks?id=6066
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7617: "Lưu ý: artwork #6066 chỉ có 4 layer trong group (không phải 250) nên phần thời gian chỉ mang tính tham khảo. Generate ~57s (02:37:50 -> 02:38:47), đạt ngưỡng. Design 12000x6000: shadow (offset ±120, blur 60) của các layer sát mép hiển thị mềm, không bị cắt cứng trong vùng in; phần shadow vượt ra ngoài vùng in bị clip theo printarea (đúng kỳ vọng vì output cố định theo printarea)."
  TC-TIB-7618: "Lưu ý: artwork #6066 chỉ có 4 layer (không phải 250). Generate ~57s, đạt ngưỡng. Layer xoay 30°/-20° hiển thị đầy đủ, không mất góc/cạnh trong vùng in."
  TC-TIB-7620: "Trên design output, shadow nằm đúng hướng/vị trí so với layer gốc (layer trên: shadow lệch lên-trái; layer phải: shadow lệch phải-dưới), không dịch bất thường. Chưa có bản trước fix để đối chiếu pixel, kiểm tra bằng mắt theo offset khai báo."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7617 trên Testlane

### CLAIM-04

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7619
- **Link:** https://staging-portal.teeinblue.com/orders/4846 · https://staging-portal.teeinblue.com/artworks?id=6072
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7619: "Order #1134 (orders/4846), item #7668, personalize text "WWWWWWWWWWWWWWWWWW" (localStorage teeinblue-customizations có layer-969077 đúng giá trị): generate ~55 giây (03:33:23 -> 03:34:18), dưới ngưỡng. Design 12000x6000: text hiển thị bắt đầu x=11699, phần vượt mép 12000 bị cắt theo printarea (đúng kỳ vọng), không có chữ bị cắt trong vùng in; 250 ô còn nguyên (25.076.329 px hiển thị so với 25.073.500 của #1125). Lưu ý: text render rất nhỏ (cao ~22px, không phải cỡ 601 như khai báo) - có vẻ text bị co theo box ~502 rộng; ghi nhận để PO/dev xác nhận nếu cần."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7619 trên Testlane

### CLAIM-05

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7621 · comment dev "Solution" trên TIB-5633 (bước 4, U5)
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7621: "Design output của group phẳng (#6064) và group shadow (#6066): đều 12000x6000, 12000%16=0 và 6000%16=0. Origin: nội dung giữ đúng vị trí khai báo (không dịch) theo kiểm tra trực quan; không đọc được metadata origin nội bộ của canvas group nên phần origin chỉ xác nhận gián tiếp qua ảnh cuối. Lưu ý #6066 chỉ 4 layer."
  Comment dev (2026-10-28): "At the end, crop the canvas to those bounds and pad right and bottom to a multiple of 16 (`CANVAS_SIZE_MULTIPLE`, needed by emboss). … The returned `RenderedLayer` keeps today's origin, so `BoardRenderer`, `EmbossRefRenderer` and the shape-cut source capture get the same image and position as before."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7622, TC-TIB-7624
- **Link:** https://staging-portal.teeinblue.com/orders/4841 · https://staging-portal.teeinblue.com/artworks?id=6068
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7622: "Order #1129 (portal orders/4841), item #7663: generate design ~44 giây (03:24:25 "is generating a design" -> 03:25:09 "has generated a new design", Ready 03:25:10), dưới ngưỡng 1-2 phút. Design PNG 12000x6000. Mask Rectangle 60%x60% (left 2390, top 1183, w 7203, h 3603): 0 pixel không trong suốt nằm ngoài vùng mask; nội dung chỉ nằm trong x 2493-9502, y 1262-4785 (cắt đúng mép dưới y=4785, 9.153.690 px hiển thị). Lưu ý: fixture mask là Rectangle (không phải circle như Test Data)."
  TC-TIB-7624: "Chạy với fixture mask Rectangle 60%x60% (chưa có circle/custom shape nên chỉ kiểm được hình chữ nhật; hình dạng khác chưa được kiểm). Order #1129: so với design group phẳng không mask (order #1125), phần nằm trong mask giống nhau, phần ngoài mask trong suốt hoàn toàn; 0 pixel của layer con lọt ra ngoài hộp mask (x 2390-9593, y 1183-4786), mask cắt đúng mép (maxy=4785). Generate ~44s."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7622 trên Testlane

### CLAIM-07

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7623
- **Link:** https://staging-portal.teeinblue.com/orders/4842 · https://staging-portal.teeinblue.com/artworks?id=6069
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7623: "Order #1130 (orders/4842), item #7664: generate ~47 giây (03:25:30 -> 03:26:17, Ready 03:26:19), dưới ngưỡng. Cấu trúc fixture: Parent > "Pattern 250" > 250 layer (tổng 250 con, không phải 100+150 như case). So với design group phẳng #1125 (artwork #6064): số pixel hiển thị bằng nhau (25.073.500), không có layer nào dịch chỗ; chỉ khác ~541.250 pixel (~2.165 pixel/ô) ở rìa antialias của từng ô (max chênh kênh 128), phân bố đều và cũng xuất hiện ở fixture group phẳng #6070 nên là chênh lệch do fixture dựng khác bản gốc, không phải lỗi lồng nhóm."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7623 trên Testlane

### CLAIM-08

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7625
- **Link:** https://staging-portal.teeinblue.com/orders/4843 · https://staging-portal.teeinblue.com/artworks?id=6070
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7625: "Order #1131 (orders/4843), item #7665: generate ~45 giây (03:26:16 -> 03:27:01, Ready 03:27:05), dưới ngưỡng. So với PNG #1125 (250 ô): đúng 20 ô vắng mặt = 20 ô đầu của hàng trên cùng (x 93-9502, 20 cột pitch 480, y 102-499), mỗi ô mất 100.294 px (tổng 2.005.880 px); 0 pixel dư ngoài các ô đó, 230 ô còn lại hiển thị (còn lại chỉ khác viền antialias như ở case lồng nhóm)."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7625 trên Testlane

### CLAIM-09

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7626 (skipped) · comment dev "Solution" bước 5 và U6
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt (dev) — comment kỹ thuật, không phải sign-off
- **Trích nguyên văn:**
  ```
  Comment dev (2026-10-28): "Blend modes, `Context` layer tags and exception wrapping per child do not change."
  U6: "Child blend modes and the existing nested cases (absolute-group inside a masked group, plain group in a campaign artwork) still pass unchanged"
  TC-TIB-7626: status skipped, actualResult rỗng.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-10

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7628
- **Link:** https://staging-portal.teeinblue.com/orders/4840 · https://staging-portal.teeinblue.com/artworks?id=6067
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7628: "Fixture #6067: group 3 layer với photo_border contour_cut (không phải 250 layer). Generate ~68s (02:38:41 -> 02:39:49), đạt ngưỡng. Output 12000x6000: viền trắng cắt theo hình từng layer, 3 layer đúng vị trí, không lệch."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7628 trên Testlane

### CLAIM-11

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7627 (status "passed", actualResult rỗng) · comment dev "QA plan" bước 4
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt (dev) — comment kỹ thuật, không phải sign-off
- **Trích nguyên văn:**
  ```
  QA plan (2026-10-28): "Place an order with the emboss group artwork and one with the shape-cut group artwork. Check the emboss and the shape cut line up with the group as before this release. (staging)"
  TC-TIB-7627: actualResult rỗng (không có kết quả chạy).
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-7630
- **Link:** https://staging-portal.teeinblue.com/orders/4837
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent)
- **Trích nguyên văn:**
  ```
  TC-TIB-7630: "Bấm Regenerate (icon sync) trên order #1125 lúc 02:41:46, toast "put your design in queue"; log item ghi "generated a new design" lúc 02:42:30, tức ~44s, dưới ngưỡng; order vẫn Ready, không kẹt generating. (Log không có dòng "is generating" riêng cho lần regenerate nên mốc đầu là lúc bấm.)"
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7629 (skipped) · RA analysis_TIB-5633.md → Nhật ký chốt Q5 · context local artwork.md → Artwork 1.0 vs 2.0
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** người trả lời Slack: không rõ tên (RA ghi là PO/dev); chienct (QA) tóm tắt vào RA
- **Trích nguyên văn:**
  ```
  RA Nhật ký chốt (tóm tắt, không phải nguyên văn Slack): "Q5 | Áp dụng cho tất cả (AW1.0/2.0, order thường + regenerate) | C7"
  artwork.md (context local): "Artwork 1.0 artworks show a "Convert to Artwork 2.0" button and a simpler native toolbar (no Group/Duplicate & Link icons)."
  TC-TIB-7629: status skipped, actualResult rỗng.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7631 · RA Nhật ký chốt Q6 · comment dev "Solution" (Open questions)
- **Link:** https://staging-portal.teeinblue.com/orders/4845
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7631: "Order #1133 (orders/4845), item #7667: generate ~33 giây (03:28:13 -> 03:28:46), xa mốc 30 phút, không lỗi, Ready. Design PNG 12000x6000. Lưu ý quan trọng: printarea của campaign là 12000x6000 (72 Mpx) nên case này gần như KHÔNG đi vào đường route-large 150 Mpx; chỉ canvas artwork (15000x9900 = 148,5 Mpx) sát ngưỡng, artwork được scale vào printarea."
  Comment dev (2026-10-28): "This fix does not touch the limit or the queue (`final-render` vs `final-render-large`). The artwork is under the 150 Mpx route-large threshold, so it stays on the normal tier."
  RA Q6: "Bạn cứ test qua giúp tôi"
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7631 trên Testlane

### CLAIM-15

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** comment dev "Solution" (Open questions) · RA Nhật ký chốt Q7
- **Link:** https://ownego.atlassian.net/browse/TIB-5633
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt (dev) — comment kỹ thuật; câu trả lời Slack Q7 "OK" (2026-10-29, không rõ tên người)
- **Trích nguyên văn:**
  ```
  Comment dev (2026-10-28): "Should the 30-minute auto-stop stay as it is? This fix does not touch the limit or the queue (`final-render` vs `final-render-large`)."
  Jira description (2026-10-28): "rendering exceeded the 30-minute limit, so the system auto-stopped it twice on Oct 27."
  RA Nhật ký chốt: "Q7 | OK | C8 — giữ 30 phút auto-stop, SDK preview ngoài phạm vi"
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-16

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-7632 · comment dev "Solution" (Render parity, Open questions)
- **Link:** https://nprice1.myshopify.com/products/qa-tib-5633-camp-group250
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (QA agent); tinhpt (dev) viết comment 2026-10-28
- **Trích nguyên văn:**
  ```
  TC-TIB-7632: "Storefront nprice1 sản phẩm group250: bấm Preview, popup preview mở trong vài giây, không lỗi UI; DOM có 34 svg, 250 phần tử svg image và 756 thẻ g (group render bằng SVG g). Lưu ý popup preview hiển thị mockup áo, không thấy rõ từng ảnh nhỏ bằng mắt thường."
  Comment dev (2026-10-28): "the sdk preview draws a group as an SVG `<g>`, which has no growing raster canvas and so no matching cost. No portal change." / "The sdk storefront preview of a 250-member group is out of scope (nobody reported it, and SVG has no growing canvas). Confirm."
  ```
- **File đính kèm cho claim này:** ảnh trong actualResult của TC-TIB-7632 trên Testlane

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

Jira https://ownego.atlassian.net/browse/TIB-5633 (description, 3 comment, changelog) · Testlane task TIB-268 (actualResult + ảnh từng case) · file RA teeinblue/TIB automation/qa-output/analysis_TIB-5633.md · staging orders 4837–4846 trên instance 520. Đã bỏ link Crisp chat của khách (comment 2026-10-28 11:10) khỏi CCR.

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
- [x] Không còn placeholder dạng ba dấu nhỏ hơn … ba dấu lớn hơn nào sót lại trong file

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
