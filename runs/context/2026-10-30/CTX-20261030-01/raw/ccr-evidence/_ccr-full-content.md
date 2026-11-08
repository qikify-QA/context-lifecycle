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

**Loại:** `BEHAVIOR_CHANGE`

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: `teeinblue`
- Object: `artwork` (object chính; claim chạm thêm `sdk`, `order`, `campaign`, `product-base` — xem Phần 1b) · Feature: `MỚI: group-layer-effective-visibility` (đề xuất tên; các claim khác trỏ feature có sẵn ở Phần 1b)
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5584 — "Cascade group layer visibility to its child layers consistently" — Story, Highest, Sprint TIB 180
- Giao QA (Code Review → QA Review): 2026-10-15 18:39 · Passed + Resolution Done: 2026-10-19 16:02 · Done: 2026-10-20 15:17
- Liên quan: TIB-5342 (PSD import, Done — đóng cùng ticket), TIB-5581 (khoá toggle con + repair data, Done — phần Portal bị TIB-5584 thay hoàn toàn)
Description (2026-10-15, trangdh):
- Một quy tắc: layer chỉ render khi cờ visible của chính nó ON VÀ mọi Group phía trên tới gốc ON (effective visibility); mỗi layer/Group giữ cờ riêng, không gì ghi đè.
- Ẩn/hiện Group chỉ đổi cờ Group; ẩn/hiện một con chỉ đổi con đó; ẩn hết con không tắt Group.
- Group ẩn thì mask ngừng áp; render khớp giữa editor preview, buyer preview, print file.
- Edge: Group lồng = AND cả chuỗi; Group rỗng không tự đổi cờ; con tự ẩn dưới Group ẩn vẫn ẩn sau khi hiện Group; thiếu giá trị visible: một mặc định chung cho renderer và portal (gợi ý: visible).
- SDK: layer ẩn hiệu dụng không có form field, condition trỏ vào nó không bao giờ pass; MCP form preview giống vậy.
- Portal: con dưới Group ẩn hiển thị dimmed, mắt phản ánh cờ riêng và vẫn click được — không khoá toggle.
Comment dev (tinhpt, #54766, tạo 2026-10-16 09:01, sửa 11:39) — "QA plan (staging)":
- PR portal #3819, SDK #2123, API #4015, hotfix SDK #2120 — "All are merged into build-staging".
- Mục A (portal): dimmed + mắt amber, ẩn hết con thì mắt Group vẫn ON, Group ẩn không box/transform/align, chọn con không mở quick editor, Group hiện có con tự ẩn thì kéo cả cụm, lock + display setting vẫn cascade, PSD import folder ẩn = Group ẩn + con mắt amber.
- Mục B (storefront): preview, form không có field của layer trong Group ẩn, required không chặn Add to cart, condition không pass.
- Mục C (print file): order design khớp preview; emboss/shape-cut không còn nội dung Group.
- Mục D: layer thiếu key visible = visible; global/linked template: null kế thừa global, linked bật lại được.
- Mục E (thêm lúc 11:39): linked layer theo visibility của layer nguồn, AW 1.0 + 2.0.
- "Not for QA": dependency trên Group bị bỏ qua, layer trỏ Group không tồn tại render top level, MCP form preview khớp storefront form, command artwork:show-hidden-groups-with-visible-children.
File RA analysis_TIB-5584.md (vòng 4, 2026-10-16): C1–C11, R1–R23; đáp án Slack Q1–Q10 (không ghi người trả lời); còn treo Q9, Q10(b), Q11, Q12, Q13.
Testlane TIB-211: 54 case — 38 đã chạy 2026-10-16 trên staging (instance 520) bằng test-executor [AI]: 31 actualResult Pass, 3 Fail (6064, 6067, 6073), 1 Blocked (6071), 3 rỗng (6063, 6065, 6070); 16 case not-run (6159–6174). Testlane hiện ghi 38 passed — 7 case trên ghi passed nhưng actualResult không phải Pass.
Bug của lượt chạy: BUG-321..324 (form storefront không áp cascade), BUG-325 (Mockup Editor hiển thị phẳng).
```

- Nguồn: tổng hợp từ 1 ticket đã Done (TIB-5584: description + 1 comment QA plan của dev) + file RA analysis_TIB-5584.md + 38 test case Testlane TIB-211 chạy trên staging 2026-10-16 [AI] — KHÔNG PHẢI quan sát trực tiếp của agent nhận CCR
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 1 lượt chạy trực tiếp trên staging (2026-10-16, [AI]: 38 case, 31 actualResult Pass) + 1 retest TC-TIB-6074 cùng ngày; 0 lần trên production; 18 claim có test_case, 3 claim chỉ có QA plan dev, 6 claim KHÔNG CÓ NGUỒN

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Chưa verify / không tái hiện được (AGENT):
- 16 case not-run: TC-TIB-6159, 6160 (ẩn hết con), 6161 (chọn con Group ẩn), 6162 (kéo Group có con tự ẩn), 6163–6174 (linked layer AW 1.0 + 2.0).
- TC-TIB-6063, 6064, 6065, 6067 (form/condition SDK), 6070, 6071 (shape cut / emboss), 6073 (Mockup Editor): Testlane ghi passed nhưng actualResult là rỗng / Fail / Blocked của 2026-10-16, không có lần chạy lại nào có ngày.
- Render phía server cho layer thiếu key visible (6055 chỉ đối chiếu Live preview portal).
- Artwork import từ PSD: chưa kiểm storefront và print file (6078 chỉ kiểm panel + API).
- Artwork 1.0 có Group: chưa thử (Q10(b) chưa có đáp án).
- Mockup đã render ở Campaign/storefront sau khi ẩn Group trong Mockup Editor: chưa thử (Q12).
- Linked template có cờ đã set cụ thể rồi global đổi: chưa thử (Q9).
- Production: chưa kiểm lần nào.
- Lượt pass 2026-10-16 chạy trước khi 3 PR còn OPEN lúc 16:14 16/10 merge (Jira: 6/6 PR MERGED, cập nhật cuối 2026-10-20 15:00) — chưa chạy lại trên build sau đó.
⏳ CHỜ BẠN: bạn đã tự thử gì mà kết quả test không ghi? Cụ thể: lúc chuyển TC-TIB-6063, 6064, 6065, 6067, 6070, 6071, 6073 sang passed (và chuyển Jira sang Passed 2026-10-19) bạn có chạy lại không — ngày nào, trên staging hay production, kết quả ra sao? Ghi chú "Do bị cache" ở 6067 là bạn tự kiểm lại?
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5584 — effective visibility: một layer chỉ render trên canvas Artwork Editor khi cờ `visible` của chính nó ON VÀ mọi Group tổ tiên tới gốc đều ON; Group lồng nhiều cấp = AND của cả chuỗi (ẩn Group cấp 1 thì cả nhánh ngừng render; ẩn Group cấp 2 thì chỉ nhánh đó ngừng render) | portal — Artwork Editor (AW 2.0): canvas + layer panel | `test_case` — PASS TC-TIB-6042, TC-TIB-6043, TC-TIB-6044 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace — CHK-010 'Effect thật của Group/Ungroup sau khi bấm' (NEEDS_CONFIRMATION, oracle NONE) và OQ-artwork-045 (chưa từng tạo group) có thể nhận oracle từ claim này | `ADD` |
| `CLAIM-02` | TIB-5584 — ẩn/hiện Group chỉ đổi cờ `visible` của Group, không ghi đè cờ của layer con: hiện Group lại thì con có cờ ON hiện lại, con tự ẩn (cờ OFF) vẫn ẩn; Save + reload giữ nguyên cờ riêng của Group và từng con (PUT /api/artworks/{id} trả 200, con giữ `visible=true`) | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6045, TC-TIB-6046, TC-TIB-6047, TC-TIB-6049 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-save-persist (KB-055: `visible` là 1 trong 7 field có ở mọi layer — claim này thêm ngữ nghĩa cho field đó) | `ADD` |
| `CLAIM-03` | TIB-5584 — ẩn/hiện một layer con khi Group đang ON chỉ đổi cờ của đúng con đó; Group và các con khác không đổi | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6048 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-effective-visibility | `ADD` |
| `CLAIM-04` | TIB-5584 — ẩn lần lượt hết mọi layer con thì Group KHÔNG tự OFF: mắt Group vẫn ON, canvas không vẽ gì cho Group (TC-TIB-6159, TC-TIB-6160 viết cho hành vi này còn not-run) | portal — layer panel + canvas | `po_dev_confirm` — "Dog's own eye **stays on**. The canvas shows nothing for Dog." — https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766 | artwork / MỚI: group-layer-effective-visibility | `ADD` |
| `CLAIM-05` | TIB-5584 — layer panel khi Group ẩn: dòng con dimmed (opacity 0.3), mắt con đang ON hiện màu amber, mắt con OFF giữ icon gạch chéo; mắt con vẫn click được, không khoá, không tooltip — thay hoàn toàn phần Portal của TIB-5581 (khoá toggle + tooltip "show the group first") | portal — Artwork Editor layer panel | `test_case` — PASS TC-TIB-6050, TC-TIB-6057 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace (layer row icon) — canon chưa có trạng thái dimmed/amber; context local artwork.md còn ghi TIB-5581 | `ADD` |
| `CLAIM-06` | TIB-5584 — Group có mask: ẩn Group thì mask của Group cũng ngừng áp và không layer con nào được vẽ (không có trường hợp mất mask mà con vẫn vẽ tràn) | portal — canvas Artwork Editor | `test_case` — PASS TC-TIB-6051 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork — Group Mask (TIB-5403) chưa có trong canon qa-knowledge; context local artwork.md → 'Group Mask' | `ADD` |
| `CLAIM-07` | TIB-5584 — Group rỗng: toggle mắt không render gì và không tự đổi cờ của chính Group; layer panel không có tín hiệu riêng nào cho Group rỗng (khi OFF dòng chỉ mờ như mọi Group ẩn) | portal — layer panel + canvas · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6052, TC-TIB-6053 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / MỚI: group-layer-effective-visibility | `ADD` |
| `CLAIM-08` | TIB-5584 — Undo/Redo sau khi toggle mắt Group khôi phục đúng cờ riêng của từng layer con (con tự ẩn không bị bật lại) | portal — Artwork Editor (Undo/Redo) | `test_case` — PASS TC-TIB-6054 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace (Undo/Redo) + MỚI: group-layer-effective-visibility | `ADD` |
| `CLAIM-09` | TIB-5584 — layer hoặc Group thiếu key `visible` (artwork ghi qua MCP/API) được coi là visible: mắt ON, không dimmed, vẽ trên canvas editor và trên Live preview của portal; con của Group thiếu key render theo cờ riêng (render phía server cho layer thiếu key CHƯA đối chiếu) | portal — canvas + Live preview · api — artwork tạo qua MCP/API | `test_case` — PASS TC-TIB-6055, TC-TIB-6056 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-save-persist (KB-055 — `visible` có ở 35/35 layer trong 1 sample; claim này nói giá trị mặc định khi thiếu) | `ADD` |
| `CLAIM-10` | TIB-5584 — chọn Group đang ẩn: canvas không có box drag/resize/rotate, quick toolbar chỉ còn mục Align (không Transform / Print Effects / Mask); 6 nút Align vẫn hiển thị, không disable nhưng bấm không đổi vị trí; hiện Group lại thì toolbar + Align hoạt động bình thường | portal — canvas toolbar + selection box | `test_case` — PASS TC-TIB-6058, TC-TIB-6059 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace — KB-042 (toolbar theo loại layer) thiếu điều kiện 'Group đang ẩn'; checklist dựa trên KB-042 có thể kỳ vọng sai cho Group ẩn | `ADD` |
| `CLAIM-11` | TIB-5584 — Group đang ẩn: chọn một layer con của Group trong layer panel không mở quick editor và không hiện box transform (TC-TIB-6161 viết cho hành vi này còn not-run) | portal — layer panel + quick editor | `po_dev_confirm` — "Selecting a single child of Dog in the panel (e.g. Dog name) opens **no** quick editor for it either." — https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766 | artwork / editor-layer-workspace | `ADD` |
| `CLAIM-12` | TIB-5584 — Group đang hiện có con tự ẩn: chọn Group và kéo thì box hiện và mọi con di chuyển cùng, kể cả con đang tự ẩn — hành vi cũ, không đổi (TC-TIB-6162 còn not-run) | portal — canvas selection/drag | `po_dev_confirm` — "The box appears and everything moves together, Dog shoes included (unchanged behavior)." — https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766 | artwork / editor-layer-workspace | `ADD` |
| `CLAIM-13` | TIB-5584 — Group đang ẩn thì không mở được chế độ chỉnh mask: quan sát trên staging là mục Mask và nút Edit mask biến mất khỏi quick toolbar (không còn trong DOM), KHÔNG phải hiện ở trạng thái disable như R16 trong file RA; hiện Group lại thì nút trở lại, enabled | portal — quick toolbar (Mask / Edit mask) | `KHÔNG CÓ NGUỒN` — TC-TIB-6060 PASS 2026-10-16 nhưng actualResult ghi nút bị ẩn hẳn, khác expected 'disable'; PO chưa chốt ẩn hay disable | artwork — Group Mask chưa có trong canon qa-knowledge; context local artwork.md → 'Group Mask' (2026-09-30: Group ẩn vẫn có Edit mask) đã lỗi thời | `ADD` |
| `CLAIM-14` | TIB-5584 — không đổi: lock và display setting (Preview / Design only / Form only) của Group vẫn cascade xuống mọi layer con; ẩn rồi hiện Group không làm mất lock của con | portal — layer panel + EXTRA 'Display this layer on' · api — PUT /api/artworks/{id} (`layer_display`) · storefront — form/preview sau sync | `test_case` — PASS TC-TIB-6061, TC-TIB-6062 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / layer-common-config (KB-012: field 'Display this layer on:' — canon chưa nói gì về cascade từ Group) | `ADD` |
| `CLAIM-15` | TIB-5584 (SDK) — layer bị ẩn hiệu dụng do Group cha ẩn không có form field trên storefront; field required nằm trong Group ẩn không chặn Add to cart — CHƯA thấy đúng trên staging | storefront — form cá nhân hoá SDK + Add to cart | `KHÔNG CÓ NGUỒN` — TC-TIB-6063 actualResult rỗng; TC-TIB-6064 actualResult Fail 2026-10-16 (required trong Group ẩn vẫn chặn Add to cart), BUG-321..324; Testlane ghi passed nhưng không có lần chạy lại có ngày | sdk / storefront-buyer-facing (form field + validation required) — sdk checklist CHK-026 (required grouped_clipart) cùng vùng validation | `ADD` |
| `CLAIM-16` | TIB-5584 (SDK) — condition trỏ vào layer bị ẩn hiệu dụng không bao giờ pass; layer con dưới Group ẩn dù bật "Show this layer on first load" hoặc condition buyer-side thoả vẫn ẩn (AND với Group) — CHƯA thấy đúng trên staging | storefront — condition + form SDK | `KHÔNG CÓ NGUỒN` — TC-TIB-6065 actualResult rỗng; TC-TIB-6066 FT2 trong Group ẩn vẫn có field (BUG-321); TC-TIB-6067 actualResult Fail 2026-10-16, ghi chú sau 'Do bị cache' không có ngày chạy lại | sdk / storefront-buyer-facing + artwork / conditional-setting-config (condition nguồn/đích) | `ADD` |
| `CLAIM-17` | TIB-5584 — buyer preview trên storefront theo effective visibility: Group ẩn (con giữ cờ ON) thì preview chỉ còn layer ngoài Group, khớp canvas editor | storefront — buyer preview (SDK) | `test_case` — PASS TC-TIB-6068 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | sdk / storefront-buyer-facing (preview) | `ADD` |
| `CLAIM-18` | TIB-5584 — print file (order design) PNG và PDF theo effective visibility: Group ẩn thì file không có nội dung Group, khớp editor và buyer preview | api — render order design · portal — order detail (tải design) | `test_case` — PASS TC-TIB-6068, TC-TIB-6069 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | order / review-and-initiate-fulfillment-portal (order design) — canon order v1 STALE, chưa có statement về render theo visibility | `ADD` |
| `CLAIM-19` | TIB-5584 — Shape cut / emboss: ẩn Group thì print file không còn nội dung Group và các bản emboss/shape-cut ở cell khác — CHƯA kiểm được | api — render order design (layout shape-cut / emboss) | `KHÔNG CÓ NGUỒN` — TC-TIB-6070 actualResult rỗng; TC-TIB-6071 actualResult Blocked 2026-10-16 (Product Base 3385 không có layout emboss) | order / review-and-initiate-fulfillment-portal; product-base / printarea-definition (layout) | `ADD` |
| `CLAIM-20` | TIB-5584 — Campaign Editor preview theo effective visibility: Group ẩn thì preview trên mockup không có layer con của Group; Group hiện thì đủ layer, khớp canvas Artwork Editor | portal — Campaign Editor preview | `test_case` — PASS TC-TIB-6072 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | campaign / create-campaign-by-product-base (preview trong Campaign Editor) — canon campaign v3 STALE | `ADD` |
| `CLAIM-21` | TIB-5584 — R19 (đáp án Slack Q10a 2026-10-16, không ghi người trả lời): cascade áp cho Group trong Mockup Editor — trên staging 2026-10-16 Mockup Editor hiển thị layer phẳng, ẩn Group không làm layer con ngừng render; mockup đã render có tự cập nhật không (Q12) chưa chốt | portal — Mockup Editor (Product Base → mockup) | `KHÔNG CÓ NGUỒN` — TC-TIB-6073 actualResult Fail 2026-10-16, BUG-325; Testlane ghi passed nhưng không có lần chạy lại | product-base / mockup-attachment (KB-086: Edit mở 'Mockup Editor') — canon chưa nói Mockup Editor có Group hay không; image-library / mockup-layer-library có thể liên quan | `ADD` |
| `CLAIM-22` | TIB-5584 — MCP `render-design-preview` theo effective visibility: Group ẩn thì ảnh render không có layer con của Group và khớp print file (tiêu chí đủ là khớp print file) | api — MCP teeinblue `render-design-preview-tool` | `test_case` — PASS TC-TIB-6074 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | không khớp object nào trong registry (MCP tool) — gần nhất artwork; đối chiếu order (print file) | `ADD` |
| `CLAIM-23` | TIB-5584 — linked template: cờ `visible` = null ở linked template kế thừa trạng thái từ global template, áp cho cả Group và layer thường (global ẩn thì linked cũng ẩn; global bật lại thì linked hiện lại) | portal — Artwork Editor (global template + linked template) · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6075, TC-TIB-6076 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-template-management (KB-046, CHK-009 'Convert to Global Template') — canon chưa nói về kế thừa visible | `ADD` |
| `CLAIM-24` | TIB-5584 — linked template: seller bật lại được Group đang ẩn do kế thừa; sau Save cờ ở linked thành `true` (hết kế thừa), global template vẫn ẩn | portal — Artwork Editor (linked template) · api — PUT /api/artworks/{id} | `test_case` — PASS TC-TIB-6077 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / artwork-template-management | `ADD` |
| `CLAIM-25` | TIB-5584 / TIB-5342 — PSD import có folder ẩn: artwork nhận Group ẩn, cờ của layer con giữ ON (mắt amber, dòng dimmed), canvas editor không vẽ nội dung Group (storefront / print file của artwork import CHƯA kiểm) | portal — Artworks > Import > PSD Single template · api — POST /api/artworks | `test_case` — PASS TC-TIB-6078 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork — chưa có feature PSD import trong canon | `ADD` |
| `CLAIM-26` | TIB-5584 — không đổi (regression): artwork không có Group render như trước ở editor và storefront; mắt ON không màu amber, toggle từng layer đổi đúng | portal — Artwork Editor · storefront — buyer preview | `test_case` — PASS TC-TIB-6079 2026-10-16 staging [AI] — build: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo) | artwork / editor-layer-workspace; sdk / storefront-buyer-facing | `ADD` |
| `CLAIM-27` | TIB-5584 (QA plan bản sửa 11:39, Section E) — linked layer ('Link with another layer') theo effective visibility của layer nguồn ở AW 1.0 và 2.0: nguồn tự ẩn hoặc bị Group cha ẩn thì layer link không vẽ ở editor / storefront / print file, dòng dimmed + mắt amber + tooltip, không box/quick editor — CHƯA chạy | portal — layer panel + canvas (AW 1.0, AW 2.0) · storefront — preview · api — print file | `KHÔNG CÓ NGUỒN` — TC-TIB-6163..6174 not-run; chỉ có QA plan dev; PO chưa xác nhận phạm vi (Q13); 3 PR còn OPEN lúc 16:14 16/10 | artwork / layer-duplicate-link-copy (KB-045: bản LINKED 'Design and personalization are synced from it' — canon chưa nói về visibility) | `ADD` |

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
| `CLAIM-01` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có (liên quan CHK-010, KB-043) |
| `CLAIM-02` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-055) |
| `CLAIM-03` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có |
| `CLAIM-04` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-05` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-06` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-07` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có |
| `CLAIM-08` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-09` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-055) |
| `CLAIM-10` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal | KB-042 (bổ sung điều kiện, không thay) |
| `CLAIM-11` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-12` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-13` | `artwork` | `MỚI: group-layer-effective-visibility` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-14` | `artwork` | `layer-common-config` | seller (store owner / staff) trên portal | portal, api, storefront | không có (liên quan KB-012) |
| `CLAIM-15` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |
| `CLAIM-16` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |
| `CLAIM-17` | `sdk` | `storefront-buyer-facing` | buyer (guest) trên storefront | storefront | không có |
| `CLAIM-18` | `order` | `review-and-initiate-fulfillment-portal` | seller (store owner / staff) xem order trên portal | api, portal | không có |
| `CLAIM-19` | `order` | `review-and-initiate-fulfillment-portal` | seller (store owner / staff) xem order trên portal | api | không có |
| `CLAIM-20` | `campaign` | `create-campaign-by-product-base` | seller (store owner / staff) trên portal | portal | không có |
| `CLAIM-21` | `product-base` | `mockup-attachment` | seller (store owner / staff) trên portal | portal | không có (liên quan KB-086) |
| `CLAIM-22` | `không khớp registry — MCP render-design-preview (gần nhất: artwork)` | `MỚI: mcp-render-design-preview` | seller / AI agent dùng MCP | api | không có |
| `CLAIM-23` | `artwork` | `artwork-template-management` | seller (store owner / staff) trên portal | portal, api | không có (liên quan KB-046, CHK-009) |
| `CLAIM-24` | `artwork` | `artwork-template-management` | seller (store owner / staff) trên portal | portal, api | không có |
| `CLAIM-25` | `artwork` | `MỚI: psd-import` | seller (store owner / staff) trên portal | portal, api | không có |
| `CLAIM-26` | `artwork` | `editor-layer-workspace` | seller (store owner / staff) trên portal | portal, storefront | không có |
| `CLAIM-27` | `artwork` | `layer-duplicate-link-copy` | seller (store owner / staff) trên portal | portal, storefront, api | không có (liên quan KB-045) |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** https://ownego.atlassian.net/browse/TIB-5584 · staging instance 520 (nprice1) · artwork #5036, #5037, #5038, #5043, #5046, #5050, #5051, #5052, #5053, #5056, #5057, #5058, #5060 (https://staging-portal.teeinblue.com/artworks?id=<id>) · campaign #3036, #3041, #3042, #3043, #3049, #3050 · mockup #8156 (Product Base 3385) · order 4666, 4668, 4669 (Bogus) · endpoint PUT /api/artworks/{id}, POST /api/artworks, GET https://staging-api.teeinblue.com/api/merchant/campaigns/{platformProductId}.json · MCP render-design-preview-tool
- **Trạng thái đối tượng lúc đó:** lúc chạy (2026-10-16 ~12:05–13:54) ticket ở QA Review (giao QA 2026-10-15 18:39), dev ghi 4 PR đã merge vào build-staging, panel Development có thêm 3 PR OPEN lúc 16:14 16/10 (theo RA); repair command đã chạy nên fixture "Group ẩn + con visible" tự dựng qua MCP/API; ticket sang Passed 2026-10-19, Done 2026-10-20
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): `staging`
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** seller (store owner / staff) ở portal; buyer (guest) ở storefront; ticket không nêu role cụ thể
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** PR qikify/teeinblue-portal#3819, qikify/teeinblue-sdk#2123, qikify/teeinblue-api#4015, hotfix qikify/teeinblue-sdk#2120 — dev ghi "All are merged into `build-staging`" (comment #54766, 2026-10-16 09:01, sửa 11:39); ngày merge / deploy staging từng PR: không rõ. Panel Development Jira: 6 PR MERGED, cập nhật cuối 2026-10-20 15:00 (+07); 5 build thành công, build cuối 2026-10-20 14:38; 3 PR OPEN lúc 16:14 16/10 không rõ là PR nào. Lượt test: staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo); Fix Version: không có. Production: Slack #tib-devs 2026-10-20 17:20 "Chuẩn bị deploy các issue…" — ngày deploy production thật: không rõ. ⏳ CHỜ BẠN: TIB-5584 lên production ngày nào (bản release nào)?
- **Ngày resolve/update cuối:** 2026-10-20 (Done 15:17; Passed + Resolution Done 2026-10-19 16:02; update cuối 2026-10-20 17:20)
- **Đã ship chưa:** Resolution: Done (2026-10-19), status Done (2026-10-20), 6/6 PR MERGED; deploy production: chưa xác nhận (xem dòng Build)

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: qa-knowledge manifest.json (generated_at 2026-10-30): artwork v5 (PUBLISHED 2026-09-26), sdk v5 (PUBLISHED 2026-09-28), order v1 (STALE, 2026-09-13), campaign v3 (STALE, 2026-09-12), product-base v3 (STALE, 2026-09-14)
- Canon hiện nói: không tìm thấy KB-id/check-id nào nói về ẩn/hiện Group, effective visibility, layer panel dimmed/amber, kế thừa visible ở linked template, PSD import hay Mockup Editor có Group. Gần nhất: artwork/features/editor-layer-workspace KB-042: "Canvas toolbar (khu vực phía trên canvas khi có layer được chọn) không cố định: layer nhóm text (`text`, `curve-text`,...) hiện Transform/Align/Print Effects + control font/size; layer nhóm image/vector hiện Transform/Align/Print Effects (không có font); layer nhóm form-elements (`color`, `toggle`) chỉ hiện Align, không có Transform/Print Effects. Quan sát nhất quán ở 5 tổ hợp chọn 1-3 layer khác nhau; bar hành động (Deselect/Group/Duplicate/Delete...) KHÔNG đổi theo loại/số lượng layer chọn, chỉ đổi số đếm 'N selected'." ▸ KB-043: "Trong build staging này, layer action bar (khi chọn ≥1 layer) không có nút '...'/overflow menu ở bất kỳ tổ hợp selection nào đã thử (tìm bằng selector [class*=more]/[class*=ellipsis]/.alab-action__more trong.dialog-artwork-editor → found: 0 ở 5 tổ hợp). Action bar cố định: Deselect / N selected / Group (Ctrl/Cmd+G) / Ungroup (Ctrl/Cmd+Shift+G, luôn disabled vì chưa có group nào được tạo trong các sample này) / Copy to clipboard / Duplicate / Duplicate & Link options / Delete." ▸ checklist editor-layer-workspace CHK-010: "Effect thật của Group/Ungroup sau khi bấm" (expected_result null, oracle NONE, NEEDS_CONFIRMATION) ▸ OQ-artwork-045: "Ungroup luôn disabled trong mọi sample nguồn vì chưa từng có group nào được tạo — chưa test được cặp Group/Ungroup end-to-end dù đây là action chính trên action bar." ▸ artwork-save-persist KB-055: "Trong sample PUT có full body (35 layer), đúng 7 field xuất hiện ở CẢ 35/35 layer bất kể type: id (dạng 'layer-<6 số>'), type, name, locked, visible, customization_type, schema_version. Đây là tín hiệu 'common envelope' của layer object nhất quán giữa DOM/UI (config panel luôn có cùng khung Layer name/Custom class ở hầu hết type — xem KB-002/KB-007) và JSON thực lưu (API) — 2 layer bằng chứng khác nhau cho cùng 1 kết luận. Vẫn chỉ 1 sample cấp operation (1 lần PUT có full body) nên KHÔNG được coi là required/schema chính thức." ▸ artwork KB-012: "Field 'Group name:' xuất hiện ở 34/35 layer type — đồng nhất với tập có accordion EXTRA ở KB-008 (v2), cùng vắng mặt ở Song Search. Riêng 6 type FORM ELEMENTS (KB-009 v2) có 'Group name:' là field DUY NHẤT trong EXTRA của chúng (không có 'Display this layer on'), trong khi 28 type còn lại có 'Group name:' đi kèm 'Display this layer on:'." ▸ layer-duplicate-link-copy KB-045 (trích phần liên quan): "20/35 type tạo ra bản sao LINKED (config panel rút gọn còn đúng 2 accordion LINKED LAYER + EXTRA, nội dung 'This layer is linked to another layer. Design and personalization are synced from it. Source layer: <name>')" ▸ artwork-template-management KB-046 (trích): "button.alab-action__more (menu chỉ có đúng 1 mục 'Convert to Global Template' — KHÔNG có Delete/Change position/Edit shared settings trong menu này)." ▸ product-base/mockup-attachment KB-086 (trích): "Edit mở 'Mockup Editor' full-screen canvas thật." — (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/artwork.md → "Group cascade visibility (TIB-5584 / TIB-211, staging 2026-10-19)": "⚠️ **Form storefront không áp cascade** (BUG-321→324, rất có thể cùng một nguyên nhân)" ▸ artwork.md → "Group Mask (TIB-5403…)": "**Visibility and lock don't gate the mask:** a **hidden** group still offers *Edit mask*, and a **locked** group still opens the Mask Editor. ⚠️ **The hidden-group half changed by 2026-10-19:** on the TIB-5584 build the *Edit mask* button **disappears** while the group is hidden" ▸ mockup.md → "Group trong Mockup Editor — hiển thị phẳng": "Mockup Editor **không hiện Group thành một cụm**: layer panel liệt kê các layer phẳng, và khi Group cha được set ẩn thì **các layer con vẫn render**"
- Đã tra bằng từ khoá nào: qa-knowledge/products/teeinblue — `_registry.json` (aliases: artwork editor, layer, conditional setting, artwork template, storefront, add to cart, mockup); regex trên mọi `*/kb.json`, `*/features/*/kb.json`, `*/checklists/*.json`: `group`, `visib`, `hidden`, `hide`, `eye icon`, `show/hide`, `linked template`, `global template`, `link with another`, `duplicate & link`, `mockup editor`, `psd`; grep `group|visib|hidden` trong artwork/sdk open-questions.md + feature-summary.md, order/feature-summary.md; manifest.json. Context local: teeinblue/TIB automation/context/artwork.md, mockup.md (heading Group*)
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: test case đã PASS ([AI], 2026-10-16) cho 18 claim; Dev (tinhpt, QA plan trong comment Jira) cho 3 claim chưa chạy; KHÔNG có PO/business sign-off có tên + ngày + link — đáp án Q1–Q10 trong thread Slack #req-chienct (ts 1792118503.543129, 2026-10-16) không ghi người trả lời. ⏳ CHỜ BẠN: ngoài Jira/Slack có PO/business nào xác nhận hành vi này không (ai, ngày, link)? trangdh (người viết description) có phải PO không — nếu phải, description có được coi là xác nhận của PO?
- Ở đâu, ngày nào: dev tinhpt viết "QA plan (staging)" trong comment #54766 ngày 2026-10-16 (09:01, sửa 11:39) — https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766; TC-TIB-6042…6062, 6066, 6068, 6069, 6072, 6074…6079 PASS ngày 2026-10-16 trên staging @ 2026-10-16 13:54 — sau lần TIB-5584 giao QA cuối (2026-10-15 18:39); release: không rõ; build hash: không rõ (QA không có quyền repo)
- Họ xác nhận chính xác điều gì: "**Rule under test:** a layer renders only when its own visibility is on AND every group above it is on. Hiding or showing a group never changes its children's own visibility." (dev, comment #54766) — phần test case: trích nguyên văn actualResult ở Phần 5.1 từng claim

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
- KHÔNG coi CLAIM-15, CLAIM-16 (form / required / condition SDK) là hành vi đã ship đúng: actualResult 2026-10-16 là Fail/rỗng, BUG-321..324; trạng thái passed trên Testlane không có lần chạy lại có ngày, và bugId đã bị gỡ khỏi case.
- KHÔNG coi TC-TIB-6073 là PASS: Testlane ghi Passed nhưng actualResult ghi Fail (BUG-325, Mockup Editor hiển thị layer phẳng, ẩn Group "MKG" không làm con ngừng render). R19 (cascade trong Mockup Editor) chưa phải hành vi đã thấy; chưa rõ Mockup Editor có hỗ trợ Group (docs ghi shortcut dùng chung trừ Group/Ungroup).
- Q9 (treo): linked template đã set cờ cụ thể (true/false) rồi global đổi — linked đổi theo hay giữ riêng: KHÔNG suy ra từ CLAIM-23/24 (chỉ phủ null và bật lại).
- Q10(b) (treo): Artwork 1.0 có hỗ trợ Group không — KHÔNG áp claim nào của file này cho AW 1.0.
- Q11 (treo): fixture "Group ẩn + con visible:true" tự dựng qua MCP/API (#5046, #5050, #5051…) chưa được PO/dev xác nhận là data hợp lệ; repair command artwork:show-hidden-groups-with-visible-children đã chạy nên dữ liệu thật có thể không còn trạng thái này.
- Q12 (treo): mockup đã render ở Campaign/storefront có tự cập nhật sau khi ẩn Group trong Mockup Editor không — KHÔNG đề xuất gì.
- Q13 (treo): linked layer (CLAIM-27) — PO chưa xác nhận là phạm vi chủ đích, chưa có câu chữ tooltip, 14 case not-run.
- Edit mask khi Group ẩn (CLAIM-13): KHÔNG chọn phe giữa "disable" (R16, đáp án Slack Q6d) và "ẩn khỏi toolbar" (quan sát 2026-10-16). Tương tự 6 nút Align vẫn hiển thị khi Group ẩn (CLAIM-10): không coi "nút Align bị ẩn/disable" là expected.
- Các mục "Not for QA" của dev (dependency trên Group bị bỏ qua, layer trỏ Group không tồn tại render ở top level, MCP form preview khớp storefront form, command repair) — chỉ là lời dev, không có test, KHÔNG đề xuất.
- Số liệu 2,882 artwork / 274 merchant / 45 order item (bản description cũ, đã bị gỡ khỏi ticket) — KHÔNG đề xuất; ngoài phạm vi QA (RA C9).
- Các đáp án Slack Q1–Q10 đánh [Confirmed] trong file RA — KHÔNG phải PO/business sign-off (không ghi người trả lời).
- Nhãn ngày "staging 2026-10-19" trong context local artwork.md / mockup.md là ngày context-scan ghi; lượt chạy thật là 2026-10-16.
- Tên feature_key "MỚI: group-layer-effective-visibility", "MỚI: mcp-render-design-preview", "MỚI: psd-import" chỉ là đề xuất tên; KHÔNG đề xuất tách object mới; KB-042, KB-043, KB-045, KB-055 KHÔNG bị đề xuất sửa hay xoá.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Group layer — effective visibility (TIB-5584, staging 2026-10-16): một layer chỉ render khi cờ `visible` của chính nó ON VÀ mọi Group tổ tiên tới gốc đều ON (Group lồng = AND cả chuỗi). Ẩn/hiện Group chỉ đổi cờ của Group, không ghi đè cờ con — hiện Group lại thì con tự ẩn vẫn ẩn; ẩn/hiện một con chỉ đổi con đó; ẩn hết con thì Group vẫn ON và không vẽ gì. Group ẩn thì mask cũng ngừng áp, không có box drag/resize/rotate, quick toolbar chỉ còn Align (bấm không tác dụng), mục Mask/Edit mask không còn trên toolbar. Trong layer panel, con dưới Group ẩn bị dimmed, mắt con ON màu amber, mắt OFF gạch chéo, mắt con vẫn click được (không khoá như TIB-5581). Group rỗng không có tín hiệu riêng; Undo/Redo khôi phục đúng cờ từng con; lock và display setting của Group vẫn cascade. Layer/Group thiếu key `visible` = visible. Linked template: cờ null kế thừa global template (Group và layer thường); bật lại ở linked thì cờ thành true, hết kế thừa. PSD import folder ẩn → Group ẩn + con giữ cờ ON. Áp đồng nhất ở canvas editor, buyer preview, print file PNG/PDF, Campaign Editor preview và MCP render-design-preview.
Đã quan sát nhưng CHƯA dùng làm expected: form storefront (field, required, condition) chưa áp cascade trên staging 2026-10-16 (BUG-321..324); Mockup Editor không cascade (BUG-325); linked layer, AW 1.0, shape cut/emboss chưa verify.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6042, TC-TIB-6043, TC-TIB-6044
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050 · https://staging-portal.teeinblue.com/artworks?id=5051
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6042 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 (Instance 520): layer panel Group "Name" và LINE1/LINE2/ICON đều mắt ON, không dòng nào dimmed; canvas hiển thị đủ LINE1, LINE2, ICON, OUTSIDE.
  TC-TIB-6043 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5051 : ẩn Group LV1 thì canvas trống (T1, T2, DEEP đều không render); LV2, T1, T2, DEEP đều dimmed, mắt vẫn ON màu amber. Không Save nên không có request ghi. Lưu ý: fixture không có layer nằm ngoài LV1 nên ý "layer ngoài LV1 vẫn render" đã được kiểm ở các case artwork 5050 (OUTSIDE).
  TC-TIB-6044 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5051 : LV1 ON, ẩn LV2 thì canvas còn T1, mất T2 và DEEP; dòng T2/DEEP dimmed, mắt vẫn ON (amber); T1 bình thường. Không Save nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6045, TC-TIB-6046, TC-TIB-6047, TC-TIB-6049
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6045 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ẩn Group "Name" thì canvas chỉ còn OUTSIDE, 3 dòng con dimmed, mắt con ON màu amber. API: PUT /api/artworks/5050 => 200, payload Group "Name" visible=false, LINE1/LINE2/ICON visible=true (không bị đổi/xoá key) - khớp.
  TC-TIB-6046 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : LINE2 OFF, Group tắt rồi bật lại - LINE1 và ICON hiện, LINE2 vẫn ẩn (mắt gạch chéo); không dòng nào dimmed. API: PUT /api/artworks/5050 => 200, Group visible=true, LINE1=true, ICON=true, LINE2=false. Mở lại editor sau Save: trạng thái giữ nguyên (screenshot sau reload).
  TC-TIB-6047 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : API PUT /api/artworks/5050 => 200, payload Group "Name" visible=false, ICON=false, LINE1/LINE2/OUTSIDE=true. Sau reload: Group OFF, ICON OFF, LINE1/LINE2 ON (amber, dimmed), canvas chỉ còn OUTSIDE - khớp lúc Save.
  TC-TIB-6049 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ICON OFF, Group tắt rồi bật lại - ICON vẫn ẩn, LINE1/LINE2/OUTSIDE hiển thị. API: PUT /api/artworks/5050 => 200, ICON visible=false, Group visible=true, LINE1/LINE2=true. Sau reload trạng thái không đổi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6048
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6048 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : ẩn LINE1 khi Group ON - Group và LINE2/ICON vẫn ON, không dòng nào dimmed. API: PUT /api/artworks/5050 => 200, LINE1 visible=false, Group/LINE2/ICON/OUTSIDE = true - khớp.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5584 comment #54766 (QA plan, mục A, bước 4 'Hide every child')
- **Link:** https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt — Dev (assignee TIB-5584), comment QA plan #54766
- **Trích nguyên văn:**
  ```
  4. **Hide every child:** hide each child of Dog one by one.
      * Dog's own eye **stays on**. The canvas shows nothing for Dog.
  (Ticket description, cùng ý: "Hiding every child does not turn the group off; the group stays on and simply renders nothing.")
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6050, TC-TIB-6057
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6050 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : khi Group "Name" ẩn, mắt LINE1 vẫn click được 2 lần (OFF rồi ON), không bị khoá/không tooltip chặn, canvas không vẽ thêm nội dung Group. API: PUT /api/artworks/5050 => 200, Group visible=false, LINE1/LINE2/ICON=true - khớp.
  TC-TIB-6057 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : khi Group "Name" ẩn, 3 dòng con dimmed (opacity 0.3), mắt LINE1/LINE2 (ON) màu amber rgb(201,169,78), mắt ICON (OFF) là icon gạch chéo; hover mắt LINE1 không có tooltip, con trỏ pointer, click đổi trạng thái LINE1 ngay (OFF rồi ON).
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6051
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5052
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6051 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5052 : trước khi ẩn canvas hiện vùng mask nhỏ (M1/M2 bị clip); ẩn Group "Masked" thì canvas trống hoàn toàn, không còn pixel M1/M2 hay vùng mask, không có hiện tượng mask mất mà con vẫn vẽ tràn. M1/M2 dimmed, mắt ON amber. Không Save nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6052, TC-TIB-6053
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5053
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6052 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5053 : tắt rồi bật lại Group "Empty" - mắt đổi đúng theo click, SOLO không đổi. API: PUT /api/artworks/5053 => 200, payload Group "Empty" visible=true, SOLO visible=true. Sau reload: Group vẫn ON, không bị hệ thống tự ghi đè.
  TC-TIB-6053 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5053 : dòng Group "Empty" chỉ có tên + mắt/khoá/caret/pen/copy/trash như Group thường, không có badge/icon/text cảnh báo "Group trống" ở cả trạng thái ON và OFF; khi OFF dòng chỉ mờ (opacity 0.3) như mọi Group ẩn bình thường.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-08

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6054
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6054 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 (LINE2 OFF, ẩn Group): Undo đưa Group về ON với LINE1/ICON ON, LINE2 vẫn OFF (không bị bật lại); Redo đưa Group về OFF, LINE1/ICON mắt ON màu amber (dimmed), LINE2 vẫn OFF. Ảnh chụp là trạng thái sau Redo.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6055, TC-TIB-6056
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5036 · https://staging-portal.teeinblue.com/artworks?id=5037
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6055 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5036 (không Save trong editor): layer NOKEY (không có key visible) mắt ON, không dimmed, hiển thị trên canvas editor; tab Live preview (renderer của portal) cũng vẽ NOKEY cùng HASKEY. Group "G" ON. Giới hạn: không có tool server-side render-design-preview trong phiên chạy này, nên bản render phía server chưa đối chiếu được; renderer đã kiểm là Live preview của portal. Không có request ghi vì không Save.
  TC-TIB-6056 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5037 (Group "G" không có key visible, không Save): mắt Group ON, con không dimmed; C1 mắt ON, C2 mắt gạch chéo; canvas thấy C1, không thấy C2.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-10

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6058, TC-TIB-6059
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6058 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 , Group "Name" ẩn rồi chọn Group trên layer panel: canvas không có khung drag/resize/rotate (0 phần tử .drr/handle); quick toolbar chỉ còn mục "Align", không có Transform / Print Effects / Mask. Khi Group hiện thì toolbar đủ Transform, Align, Print Effects, Mask và có khung drag với handle resize/rotate. Ghi chú: mục "Align" vẫn hiển thị khi Group ẩn (xem TC-TIB-6059).
  TC-TIB-6059 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 . Group ẩn: bấm đủ 6 nút Align (Top/Left/Middle/Center/Bottom/Right) rồi Save, PUT /api/artworks/5050 => 200 với toạ độ không đổi (OUTSIDE 2200,400; LINE1 800,400; LINE2 800,900; ICON 800,1500). Group hiện: Align đủ 6 hướng chạy đúng, LINE1 trên canvas dịch Left x=477, Center x=612, Right x=747; Top y=105, Middle y=205, Bottom y=305. Lưu ý cho PO: khi Group ẩn, mục "Align" vẫn hiển thị và 6 nút không bị disable, chỉ là không có tác dụng (vị trí không đổi). Nếu spec yêu cầu nút bị disable thì cần xác nhận lại.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-11

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5584 comment #54766 (QA plan, mục A, bước 6, bản sửa 11:39)
- **Link:** https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt — Dev (assignee TIB-5584), comment QA plan #54766
- **Trích nguyên văn:**
  ```
  6. **Selection on a hidden group:** with Dog hidden, select Dog in the panel and drag a box over its area.
      * **No** drag/resize/rotate box appears.
      * The quick toolbar offers **no** transform or align for Dog's content.
      * Selecting a single child of Dog in the panel (e.g. Dog name) opens **no** quick editor for it either.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-12

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5584 comment #54766 (QA plan, mục A, bước 7)
- **Link:** https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt — Dev (assignee TIB-5584), comment QA plan #54766
- **Trích nguyên văn:**
  ```
  7. **Selection on a visible group:** with Dog visible and Dog shoes hidden on its own, select Dog and drag it.
      * The box appears and everything moves together, Dog shoes included (unchanged behavior).
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-13

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6060
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5052
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy; không có xác nhận PO)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6060 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5052 . Group "Masked" ON + chọn Group: quick toolbar có Transform/Align/Print Effects/Mask, nút "Edit mask" enabled (disabled=false). Group ẩn + chọn Group: toolbar chỉ còn "Align", mục Mask và nút "Edit mask" không còn trong DOM nên không có cách mở chế độ chỉnh mask. Bật lại Group: nút Edit mask xuất hiện, enabled. Không Save nên mask không bị đổi. Lưu ý cho PO: khi Group ẩn nút Edit mask bị ẩn hẳn khỏi toolbar thay vì hiển thị ở trạng thái disable như mô tả case; kết quả chức năng (không chỉnh mask được) đạt.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-14

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6061, TC-TIB-6062
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5050 · https://staging-portal.teeinblue.com/artworks?id=5057
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6061 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5050 : lock Group "Name" thì icon khoá hiện ở Group và cả ICON/LINE2/LINE1; kéo LINE2 trên canvas không đổi vị trí (x=507,y=230 trước/sau). Ẩn rồi hiện lại Group: 4 dòng vẫn lock. Bỏ lock Group: kéo LINE2 được (507,230 thành 587,270). Không Save ở case này nên không có request API ghi.
  TC-TIB-6062 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5057 (Group "Form" có mục EXTRA > "Display this layer on" trong editor) / campaign #3050 , storefront tib-211-cp-p1d-aw-p1d-display-design-only . Đặt "None (personalization option still available)" (Form only) qua editor, Save: PUT /api/artworks/5057 => 200, Group và FT1/FT2 layer_display="form_only"; sync campaign (POST /api/campaigns/3050/sync => 200): form có FT1/FT2/FT3, preview chỉ vẽ FT3. Đặt "Order Design only" (Design only), Save: PUT => 200, Group + FT1/FT2 layer_display="design_only"; sync => 200: form chỉ còn FT3, preview chỉ FT3. Lưu ý: editor ghi giá trị display vào cả Group lẫn từng con. Khi fixture chỉ đặt layer_display ở Group (qua JSON, con null) storefront không áp cascade (form vẫn có FT1/FT2); đường này seller không tạo được qua editor. Phần order design (print file) của Design only chưa kiểm vì case không yêu cầu đặt order.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-15

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6063, TC-TIB-6064; BUG-321..324 (bugId đã bị gỡ khỏi case trên Testlane)
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5057
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail; không có ngày chạy lại)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6063 — actualResult: (rỗng)
  TC-TIB-6064 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Field required FT2 nằm trong Group ẩn vẫn chặn Add to cart. Actual: nhập FT3 = "HELLO", bấm Add to cart thì hiện "FT2 * This field is required!" và "Error: Some fields are required or invalid data"; giỏ hàng trống (cart.js items = 0); không có request POST /api/merchant/shopify/customization hay PUT cart-token. Expected: Add to cart thành công, không có lỗi required cho FT2, payload chỉ chứa FT3. Đã tạo bug kèm screenshot.
  Dev QA plan bước 12 (comment #54766, 2026-10-16): "With Dog hidden, the personalization form has **no** field for Dog name or for any other layer inside Dog." / "Add to cart works, so a required field inside a hidden group doesn't block it."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-16

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6065, TC-TIB-6066, TC-TIB-6067; BUG-321
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5056
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail; không có ngày chạy lại)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6065 — actualResult: (rỗng)
  TC-TIB-6066 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5056 / campaign #3049 , storefront tib-211-cp-p3h-aw-p3h-firstload-group-hidden (đã xoá localStorage): lần load đầu và sau reload preview chỉ có FT3, form không có field FT1 (FT1 vẫn ẩn dù bật "Show this layer on first load"). Chỉ đọc request GET /api/merchant/campaigns/*.json, không thao tác ghi. Lưu ý: FT1 còn gắn condition theo FT3 nên không tách riêng được hiệu ứng của "first load" và của Group ẩn; FT2 (cũng nằm trong Group ẩn) vẫn có field trong form, cùng lỗi với BUG-321.
  TC-TIB-6067 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Condition buyer-side của FT1 thoả thì field FT1 vẫn xuất hiện dù Group cha đang ẩn. Actual: nhập FT3 = "SHOW" thì field FT1 (0/20) xuất hiện trong form storefront (cùng FT2 đã có sẵn). Expected: FT1 vẫn không có field vì effective visibility = condition AND cờ Group (false); form chỉ có FT3. Cùng nguyên nhân gốc với BUG-321. Đã tạo bug. =>> Do bị cache
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-17

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6068
- **Link:** https://staging-portal.teeinblue.com/campaigns/3043
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6068 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Artwork #5046 "AW-G1H group hidden" / campaign #3043 (Group "Name" ẩn, con giữ cờ ON). Editor canvas và Campaign Editor chỉ có OUTSIDE; buyer preview trên storefront chỉ có OUTSIDE ở góc trên phải; đặt order Bogus #1084 (Confirmation #DUW8TDNMP) => orders/4666 , tải order design PNG #1084_7415_Front.png: chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. Ba bề mặt khớp nhau. API: POST /api/merchant/shopify/customization => 200 và POST /cart/add thành công khi Add to cart.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-18

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6068, TC-TIB-6069
- **Link:** https://staging-portal.teeinblue.com/orders/4666 · https://staging-portal.teeinblue.com/orders/4669
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6068 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Artwork #5046 "AW-G1H group hidden" / campaign #3043 (Group "Name" ẩn, con giữ cờ ON). Editor canvas và Campaign Editor chỉ có OUTSIDE; buyer preview trên storefront chỉ có OUTSIDE ở góc trên phải; đặt order Bogus #1084 (Confirmation #DUW8TDNMP) => orders/4666 , tải order design PNG #1084_7415_Front.png: chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. Ba bề mặt khớp nhau. API: POST /api/merchant/shopify/customization => 200 và POST /cart/add thành công khi Add to cart.
  TC-TIB-6069 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Campaign #3043 (Group ẩn). PNG: order #1084 ( orders/4666 ), file #1084_7415_Front.png chỉ có OUTSIDE ở góc trên phải. PDF: để có định dạng PDF mình đổi Design format của artwork #5046 sang PDF (PUT /api/artworks/5046 => 200, design_format=pdf), sync campaign (POST /api/campaigns/3043/sync => 200), đặt order Bogus #1087 (Confirmation #UH8ZFDJ58, orders/4669 ), tải #1087_7418_Front.pdf (1 trang): chỉ có OUTSIDE cùng vị trí, không có LINE1/LINE2/ICON. PNG và PDF khớp nhau và khớp editor. Sau test đã trả artwork 5046 về PNG_RGB và sync lại.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-19

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6070, TC-TIB-6071
- **Link:** https://staging-portal.teeinblue.com/orders/4668
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Blocked)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6070 — actualResult: (rỗng)
  TC-TIB-6071 (chạy 2026-10-16, staging, [AI]) — actualResult: Blocked - Data không có layout emboss nên không đánh giá được vế "layout emboss của layer ngoài Group vẫn đúng". Order Bogus #1086 (Confirmation #04HRDGQ3N, orders/4668 ) từ campaign #3041 / artwork #5043 . Order item chỉ có 1 file design PNG 1400x1400 (không có file/lớp emboss riêng). Vế đạt được: print file chỉ có EM2 (layer ngoài Group), không có EM1 của Group "Emb" ẩn. Vế chưa kiểm được: không có layout emboss nào trong output, nhiều khả năng Product Base 3385 không có cell layout emboss. Việc cần làm: dùng Product Base có layout emboss rồi chạy lại để đối chiếu phần emboss của EM2. Không tự đánh pass vì thiếu bằng chứng vế emboss.
  Dev QA plan bước 16 (comment #54766, 2026-10-16): "Its content, and the emboss/shape-cut copies in the other cells, are **not** in the print file."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-20

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6072
- **Link:** https://staging-portal.teeinblue.com/campaigns/3043 · https://staging-portal.teeinblue.com/campaigns/3036
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6072 (chạy 2026-10-16, staging, [AI]) — actualResult: Instance 520. Campaign Editor #3043 (artwork "TIB5584 AW-G1H group hidden", Group ẩn): preview trên mockup chỉ có OUTSIDE, không có LINE1/LINE2/ICON. Campaign #3036 (artwork "TIB5584 AW-G1", Group hiện): preview có đủ LINE1, LINE2, ICON, OUTSIDE - khớp canvas Artwork Editor. Dùng 2 campaign fixture (ẩn/hiện) thay cho việc đổi Group trên cùng artwork. Case chỉ xem preview nên không có request ghi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-21

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-6073; BUG-325
- **Link:** không có (mockup #8156, Product Base 3385, staging)
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày chạy Fail)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6073 (chạy 2026-10-16, staging, [AI]) — actualResult: Fail - Ẩn Group "MKG" trong Mockup Editor không làm MK1/MK2 ngừng render. Actual: Mockup Editor của mockup #8156 (PB 3385 ) hiển thị MKG, MK3, MK2, MK1 phẳng (không có cấp Group), dòng MKG có icon cảnh báo "This layer's image is missing". Bấm mắt MKG chỉ làm biến mất chữ "MKG" trên canvas; MK1, MK2, MK3 vẫn hiển thị, không dimmed, mắt vẫn ON bình thường. Expected: MK1, MK2 ngừng render, dòng MK1/MK2 dimmed với mắt ON. Có thể Mockup Editor chưa hỗ trợ Group (cần PO xác nhận), nhưng kết quả hiện tại không khớp R19. Chưa kiểm bước Save + render lại mockup (không Save để giữ fixture). Đã tạo bug.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-22

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6074
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5046
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** QA chienct + agent phiên chính (retest), [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-6074 (chạy 2026-10-16, staging, [AI]) — actualResult: Retest 2026-10-16 (main session, MCP teeinblue): gọi render-design-preview-tool cho artwork #5046 "TIB5584 AW-G1H group hidden" (template-935046; Group "Name" visible=false chứa LINE1, LINE2, ICON đều visible=true; OUTSIDE ngoài group). Kết quả render: preview c8c4f2c3 chỉ có chữ OUTSIDE, không có LINE1/LINE2/ICON. So với print file Front của order #1084 (campaign #3043 ) — cũng chỉ có OUTSIDE → khớp. Instance: nprice1 (520).
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-23

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6075, TC-TIB-6076
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5058
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6075 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 (Global template + "LT-1 linked template"). Global ẩn Group "GT" rồi Save: PUT /api/artworks/5058 => 200, Global GT visible=false, GT1/GT2/GT3=true; LT-1 giữ visible=null cho cả 4 layer (kèm global_id). Mở LT-1: Group "GT" ở trạng thái ẩn (mắt gạch chéo), GT1/GT2 dimmed, canvas chỉ còn GT3. Global bật lại Group, Save (GT=true; LT-1 vẫn null): LT-1 hiện lại đủ GT1, GT2, GT3 và không dòng nào dimmed.
  TC-TIB-6076 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 : Global tắt layer thường GT3, Save: PUT /api/artworks/5058 => 200, Global GT3 visible=false, LT-1 giữ null. Mở LT-1: GT3 mắt gạch chéo (ẩn do kế thừa), các layer khác (GT, GT1, GT2) không bị ảnh hưởng.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-24

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6077
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5058
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6077 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5058 : Global ẩn Group "GT" (LT-1 null, Group đang ẩn do kế thừa). Ở LT-1 bấm mắt Group "GT": bật được, các con hiện lại (hết dimmed). Save: PUT /api/artworks/5058 => 200, LT-1 Group "GT" visible=true (không còn null), Global GT vẫn visible=false. Sau reload LT-1 Group vẫn hiện; mở lại Global template: Group "GT" vẫn ẩn, không bị đổi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-25

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6078
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5060
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6078 (chạy 2026-10-16, staging, [AI]) — actualResult: Import group-hidden.psd qua Artworks > Import > PSD Single template, tạo artwork #5060 "TIB-211 PSD hidden folder import": Group "HiddenFolder" mắt OFF; ChildText và ChildImage mắt ON màu amber, dòng dimmed (opacity 0.3); Outside bình thường; canvas không vẽ nội dung Group. API: POST /api/artworks => 201, response Group "HiddenFolder" visible=false, ChildText/ChildImage visible=true (kèm group_id), Outside visible=true - khớp.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-26

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-6079
- **Link:** https://staging-portal.teeinblue.com/artworks?id=5038
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent, [AI]) — lượt chạy của QA chienct, task Testlane TIB-211
- **Trích nguyên văn:**
  ```
  TC-TIB-6079 (chạy 2026-10-16, staging, [AI]) — actualResult: Artwork #5038 (không Group): N1/N3 mắt ON bình thường (trắng, không amber), N2 mắt gạch chéo; toggle từng layer đổi đúng. API: PUT /api/artworks/5038 => 200, N1=true, N2=false, N3=true. Storefront tib5584-cp-ng1-aw-ng1 (campaign #3042 ): buyer preview có N1 và ảnh N3, không có N2 - khớp editor. Ghi chú: dòng layer tự ẩn (N2) hiển thị mờ như style layer ẩn thông thường; hai dòng ON không bị mờ. Không chạy lại sync campaign vì artwork Save với dữ liệu không đổi.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-27

- **Loại nguồn** (đúng 1): `KHÔNG CÓ NGUỒN`
- **Locator:** Jira TIB-5584 comment #54766 (QA plan, mục E, bước 21); TC-TIB-6163..6174 (not-run)
- **Link:** https://ownego.atlassian.net/browse/TIB-5584?focusedCommentId=54766
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16 (ngày dev viết QA plan; chưa có lần chạy)
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** tinhpt — Dev (assignee TIB-5584), comment QA plan #54766
- **Trích nguyên văn:**
  ```
  21. **A linked layer follows its source's visibility.** Link a layer **Name copy** to **Dog name**, keep Name copy outside any group, and test with both an Artwork 1.0 and an Artwork 2.0 artwork.
      * Name copy is **not** drawn in the editor, the storefront preview or the print file.
      * **Layers panel:** Name copy's row is dimmed with an **amber** eye, and its tooltip says the layer it's linked to is hidden.
      * **Selection:** clicking Name copy in the panel shows **no** drag/resize/rotate box, **no** quick transform or align, and no quick editor.
  ```
- **File đính kèm cho claim này:** không có

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

https://ownego.atlassian.net/browse/TIB-5584 (description + comment #54766) · Testlane task TIB-211 (54 case; ảnh chụp nằm trong actualResult, không đính kèm vào CCR) · file RA teeinblue/TIB automation/qa-output/analysis_TIB-5584.md (vòng 4, 2026-10-16) · teeinblue/TIB automation/qa-output/api-observations_TIB-211.json (17 case, cập nhật 2026-10-16) · CCR cũ đã submit: CBS-006 `ccr_TIB-5584.md` (blocked, CTX-20261026-03) — file này thay cho nó

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
