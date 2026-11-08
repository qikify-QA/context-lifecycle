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

**Loại:** NEW_FEATURE

**Object** `[AGENT]` — lấy từ `_registry.json` (hoặc tương đương) của knowledge base đích, nếu có quyền truy cập

- Product: teeinblue
- Object: product-base · Feature: variant-catalog (CLAIM-01), product-base-campaign-link (CLAIM-16), mockup-attachment (CLAIM-17); các claim còn lại đề xuất MỚI: variant-add-to-campaigns — xem Phần 1b
- Không khớp object nào trong registry, hoặc không tra được registry? Mô tả bằng lời. **Đừng bịa một `object_key` không có thật.**

**Quan sát được** `[AGENT]` — tổng hợp từ (các) ticket, KHÔNG phải suy đoán

```
TIB-5496 — "Add variants to a campaign in bulk from Product Base" (Improvement, priority Medium).
Jira: description do huyen.chu viết (sửa cuối 2026-09-30); dev tuanva chuyển Code Review → QA Review 2026-10-06
(lần giao QA duy nhất); chienct chuyển QA Review → Passed + Resolution Done 2026-10-27; tinhpt chuyển Passed → Done
2026-10-28. Không có Fix Version. 3 comment: trangdh 2026-09-28 (link Crisp — đã bỏ), tuanva 2026-10-05 "Summary cho QA"
(PR teeinblue-portal#3748), trangdh 2026-10-23 (link Slack #tib-devs).

Mục đích chính: trong Product Base editor → bảng Variants, chọn nhiều dòng variant rồi bấm (+) "Add to campaigns"
trên một dòng đang chọn → modal "Campaigns that use this product" chạy chế độ nhiều variant, thêm mọi variant đã
chọn vào các campaign được tick trong một lần (trước đây chỉ thêm được từng variant).

Theo description Jira + comment dev "Summary cho QA" (tuanva, 2026-10-05):
 1. Chọn nhiều dòng theo cơ chế chọn dòng có sẵn (như Delete selected); dev: giữ Ctrl để chọn nhiều dòng.
 2. (+) trên dòng đang chọn → modal nhiều variant: title "Campaigns that use this product"; banner "Adding N variants
    to selected campaigns will also mark them as available" (N in đậm); cột Variant status "K/N available".
 3. Campaign N/N → disabled; K/N (K<N) → chọn được; select-all bỏ qua campaign disabled; "+ Add" disabled tới khi tick ≥1.
 4. "+ Add" thêm variant đã chọn vào campaign được tick và đánh dấu Available; dev: chỉ thêm variant campaign còn thiếu.
 5. Sau thành công: giữ modal mở, cập nhật cột Variant status, bỏ chọn, campaign vừa đủ N/N chuyển disabled.
 6. (+) ở dòng KHÔNG nằm trong vùng chọn → luồng một variant như cũ ("Available / Not available").
 7. API/SDK không đổi — mutation Hasura sẵn có để thêm variant và đánh dấu campaign cần sync.
 8. Known limitations (dev): vùng chọn có variant Unavailable thì chỉ nhận variant Available, N = số variant Available;
    select-all và Add chỉ áp dụng campaign ở trang đang hiển thị (25 campaign/trang).

Bổ sung từ file RA analysis_TIB-5496.md (đáp án vòng 2, Slack #req-chienct ts 1791361620.059129, 2026-10-08 — RA gọi
là "đáp án PO" nhưng không ghi tên người trả lời):
 9. C6: hint "N available variants selected (X unavailable skipped)"; (+) trên dòng Unavailable bị disable.
10. C7: có confirmation modal, nội dung "Are you sure you want to add N selected variant(s) to X campaign(s)? Any
    existing inactive variants will be set to available."
11. C8: label select-all "Select all 25 campaigns on this page".
12. C9: (+) ngoài vùng chọn → Single Add, vùng chọn ở grid giữ nguyên. C10: Ctrl/Cmd-click + Shift-click.
13. C11: sau Add thành công tự clear vùng chọn ở grid.
14. R7: K tính cả variant campaign đã có đang bật lẫn đang tắt. R8: Add bật lại variant đã có nhưng đang tắt.
15. R9: lỗi một phần → giữ modal, bỏ tick campaign thành công, giữ tick campaign lỗi, toast cảnh báo số fail.
16. R10: vẫn phải bấm Update Campaign thủ công để sync Shopify; mockup variant mới theo rule kế thừa PB (TIB-3216).
Câu còn treo trong RA: Q1 (toàn bộ vùng chọn Unavailable), Q6 (đóng hay giữ modal sau thành công; lỗi toàn bộ),
Q8 (checkbox select-all ở grid), Q10 (campaign N/N có variant tắt), Q11 (vị trí hint), Q12 (giá/mockup variant bật lại).

Quan sát khi chạy test TIB-169 trên staging 2026-10-09 [AI] (test-executor, store Nprice1) — 28 case TC-TIB-5025..5052:
17. Bulk Add gửi MỘT mutation insert chung (insert_campaign_variants) cho mọi campaign được tick, kèm
    update_campaign_instances need_sync; chặn request đó → UI vẫn toast "Success – Variants are added to selected
    campaigns", bỏ tick cả hai campaign, modal vẫn mở, dữ liệu không được ghi (BUG-265).
18. Đặt variant Unavailable (ở PB hoặc popup Variants của campaign) thì variant bị bỏ khỏi campaign, không lưu dạng
    "đang tắt" → không dựng được campaign có variant đang tắt (TC-TIB-5035 / 5044 bị chặn).
19. Sau Add thành công vào 25 campaign: modal vẫn mở, tick được clear, campaign chuyển 4/4 và disabled (TC-TIB-5052);
    vùng chọn ở grid KHÔNG được clear (BUG-264).
20. Lệch spec lúc chạy: thiếu hint "X unavailable skipped" (BUG-262); select-all không có label phạm vi và header vẫn
    hiện đã tick ở trang 2 (BUG-263); confirmation modal ghi "Are you sure you want to add and mark 4 variants as
    available in selected campaigns?" — thiếu số campaign và câu về variant inactive (BUG-261).

Trạng thái Testlane đọc lại 2026-10-30: 27/28 case status "passed", TC-TIB-5044 "skipped"; nhưng actualResult của
TC-TIB-5030/5037/5039/5045/5046 vẫn là kết quả Fail ngày 2026-10-09, TC-TIB-5035 actualResult rỗng; TC-TIB-5045 không
còn gắn BUG-264 (bugId rỗng). Không có actualResult nào ghi lượt retest sau 2026-10-09.
```

- Nguồn: tổng hợp từ 1 ticket Jira (Done 2026-10-28: description + 3 comment) + file RA analysis_TIB-5496.md + 28 test case Testlane task TIB-169 (chạy [AI] trên staging 2026-10-09, đọc lại 2026-10-30) + context local campaign.md / mockup.md / api-endpoints.md
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 1 lượt chạy trực tiếp trên staging (2026-10-09, [AI]): 21 Pass / 5 Fail / 2 Blocked theo actualResult; 0 lượt retest có ghi ngày

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Chưa verify trực tiếp:
- Ca toàn bộ vùng chọn là Unavailable (RA Q1 chưa chốt) — không có case.
- R7 "K tính cả variant đang tắt" và R8 "bật lại variant đang tắt": không dựng được precondition qua portal
  (TC-TIB-5044 skipped/Blocked; TC-TIB-5035 Testlane ghi passed nhưng actualResult rỗng — không có bằng chứng chạy).
- R9 lỗi một phần: không mô phỏng được vì chỉ có một request chung; chỉ thử được lỗi toàn bộ (ra BUG-265).
- Cmd-click trên macOS: chỉ chạy Ctrl-click trên Windows.
- Storefront: không mở được trang product (nprice1.myshopify.com khoá mật khẩu), sync chỉ xác nhận qua dữ liệu
  instance_variants của TeeInBlue.
- Mockup kế thừa (TC-TIB-5050): gán mockup của campaign giống hệt trước và sau Add (có từ lúc attach) nên chưa chứng
  minh được rule kế thừa áp cho variant mới thêm.
- Production: chưa thử gì trên production.
- BUG-261..265: không có bản ghi retest có ngày sau 2026-10-09. Testlane hiện ghi status passed cho TC-TIB-5030,
  5037, 5039, 5045, 5046 nhưng actualResult vẫn là kết quả Fail của 2026-10-09; BUG-264 không còn gắn trên TC-TIB-5045.
⏳ CHỜ BẠN: bạn (hoặc ai khác) đã retest các case Fail / BUG-261..265 sau 2026-10-09 chưa — ngày nào, trên môi trường
nào, kết quả ra sao? Ai đã đổi status các case Fail sang passed và gỡ BUG-264 khỏi TC-TIB-5045? Ngoài ra bạn đã tự thử
gì mà kết quả test không ghi?
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

> Mục này khác "Quan sát được" ở trên: nó không mô tả CÁI GÌ đã xảy ra, mà là **CẦN LÀM GÌ TIẾP**. Agent nhận CCR đọc xong phải biết ngay việc cần làm và phạm vi ảnh hưởng dây chuyền — không phải tự dò lại từ ticket gốc.

Một dòng cho MỖI claim/ticket riêng biệt trong "Quan sát được":

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | TIB-5496 — bảng Variants của Product Base editor: Ctrl-click chọn/bỏ chọn từng dòng rời rạc, Shift-click chọn một dải dòng liên tiếp; nút Delete selected nhận đúng vùng chọn (C1, C10) | portal — Product Base editor, bảng Variants | `test_case` — PASS TC-TIB-5025 2026-10-09 staging [AI]; PASS TC-TIB-5026 2026-10-09 staging [AI]; PASS TC-TIB-5027 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base/variant-catalog — KB-079 (Delete selected, chọn qua click số thứ tự dòng) là hành vi lân cận, không mâu thuẫn; Cmd-click macOS chưa chạy | ADD |
| `CLAIM-02` | TIB-5496 — bấm (+) "Add to campaigns" trên một dòng đang chọn mở modal "Campaigns that use this product" chế độ nhiều variant: banner "Adding N variants to selected campaigns will also mark them as available" (N in đậm), cột Variant status dạng "K/N available" (C2, C3) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5028 2026-10-09 staging [AI]; PASS TC-TIB-5029 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — đề xuất MỚI: variant-add-to-campaigns; cùng tên modal với KB-092 (mở từ icon rocket, banner khác) — hai lối vào khác nhau, không mâu thuẫn; vị trí hint của BUG-262 (Q11) có thể đổi banner khi fix | ADD |
| `CLAIM-03` | TIB-5496 — nút (+) trên dòng variant Unavailable bị disable, bấm không mở modal (C6, phần nút) | portal — Product Base editor, bảng Variants | `test_case` — PASS TC-TIB-5031 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-04` | TIB-5496 — vùng chọn lẫn variant Unavailable: N chỉ đếm variant Available; RA/PO yêu cầu thêm hint "N available variants selected (X unavailable skipped)" — lúc chạy không có hint (C6, phần N + hint) | portal — modal Campaigns that use this product | `KHÔNG CÓ NGUỒN` — case TC-TIB-5030 Fail 2026-10-09 (thiếu hint), BUG-262 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns; vị trí hint còn treo (RA Q11), ca toàn bộ vùng chọn Unavailable còn treo (RA Q1) | ADD |
| `CLAIM-05` | TIB-5496 — ma trận K/N trong modal: campaign 0/N và K/N (K<N) tick được; campaign N/N toàn Available bị disable; "+ Add" disable tới khi tick ít nhất 1 campaign và disable lại khi bỏ hết tick (R1, R2, R4) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5032 2026-10-09 staging [AI]; PASS TC-TIB-5033 2026-10-09 staging [AI]; PASS TC-TIB-5034 2026-10-09 staging [AI]; PASS TC-TIB-5038 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-06` | TIB-5496 — select-all trong modal tick mọi campaign tick được, bỏ qua campaign đang disable (N/N) (R3) | portal — modal Campaigns that use this product | `test_case` — PASS TC-TIB-5036 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-07` | TIB-5496 — select-all và Add chỉ áp dụng 25 campaign của trang đang xem; RA/PO yêu cầu label "Select all 25 campaigns on this page" — lúc chạy không có label và checkbox header vẫn hiện tick ở trang 2 (R3, C8) | portal — modal Campaigns that use this product, phân trang 25/trang | `KHÔNG CÓ NGUỒN` — case TC-TIB-5037 Fail 2026-10-09 (thiếu label, header tick sai ở trang 2), BUG-263 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns; dev ghi 25/trang là known limitation, không phải thiết kế chốt | ADD |
| `CLAIM-08` | TIB-5496 — bấm "+ Add" hiện confirmation modal (title "Add variants to campaigns", nút Add và Cancel); Cancel đóng confirmation, không gửi thao tác Add, giữ tick campaign và cột K/N không đổi (C7, phần có confirmation + Cancel) | portal — confirmation modal | `test_case` — PASS TC-TIB-5040 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns; context local campaign.md có câu Quick-add "shows a confirmation listing every affected campaign" (luồng 1 variant cũ) | ADD |
| `CLAIM-09` | TIB-5496 — nội dung confirmation modal: RA/PO đưa mẫu "Are you sure you want to add N selected variant(s) to X campaign(s)? Any existing inactive variants will be set to available."; lúc chạy UI ghi "Are you sure you want to add and mark 4 variants as available in selected campaigns?" (C7, phần nội dung) | portal — confirmation modal | `KHÔNG CÓ NGUỒN` — case TC-TIB-5039 Fail 2026-10-09 (nội dung lệch mẫu), BUG-261 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-10` | TIB-5496 — xác nhận Add: chỉ insert variant campaign còn thiếu, variant thêm vào ở trạng thái Available, không thêm variant Unavailable, không nhân đôi variant đã có, double-click xác nhận chỉ gửi 1 mutation, chạy được 4 variant × 25 campaign trong vài giây (R5, R6) | portal — campaign editor danh sách variant · api — POST /api/graphql | `test_case` — PASS TC-TIB-5041 2026-10-09 staging [AI]; PASS TC-TIB-5042 2026-10-09 staging [AI]; PASS TC-TIB-5043 2026-10-09 staging [AI]; PASS TC-TIB-5052 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-11` | TIB-5496 — RA/PO (Q2): K đếm cả variant campaign đã có nhưng đang tắt (R7); Add bật lại (Mark Available) variant đã có nhưng đang tắt (R8). Lúc chạy không dựng được campaign có variant đang tắt: đặt Unavailable thì variant bị bỏ khỏi campaign | portal · db — cần dev dựng campaign có variant đang tắt | `KHÔNG CÓ NGUỒN` — TC-TIB-5035 actualResult rỗng (Testlane status passed không có bằng chứng chạy), TC-TIB-5044 skipped/Blocked 2026-10-09 — không dựng được precondition; RA Q10, Q12 còn treo | product-base — MỚI: variant-add-to-campaigns; canon qa-knowledge chưa có; NGƯỢC với context local campaign.md ("An Unavailable variant is dropped out of the campaign") — CCR không chọn phe | ADD |
| `CLAIM-12` | TIB-5496 — sau Add thành công: modal vẫn mở, tick campaign được bỏ, cột K/N cập nhật, campaign vừa đủ N/N chuyển disable (C4, phần modal) | portal — modal Campaigns that use this product | `KHÔNG CÓ NGUỒN` — chỉ là quan sát phụ trong actualResult TC-TIB-5052/5041 (expected của các case này không kiểm trạng thái modal); RA Q6 còn tranh chấp đóng hay giữ modal | product-base — MỚI: variant-add-to-campaigns | ADD |
| `CLAIM-13` | TIB-5496 — RA/PO (Q4): sau Add thành công, vùng chọn variant ở grid tự clear — lúc chạy vùng chọn KHÔNG được clear (C11) | portal — Product Base editor, bảng Variants | `KHÔNG CÓ NGUỒN` — case TC-TIB-5045 Fail 2026-10-09, BUG-264 chưa có retest có ngày; Testlane status passed và bug đã bị gỡ khỏi case (bugId rỗng) nhưng actualResult vẫn Fail | product-base — MỚI: variant-add-to-campaigns (ảnh hưởng state vùng chọn của variant-catalog) | ADD |
| `CLAIM-14` | TIB-5496 — bulk Add gửi MỘT mutation insert chung cho mọi campaign được tick; khi mutation lỗi UI vẫn toast "Success – Variants are added to selected campaigns", bỏ tick mọi campaign, dữ liệu không ghi; nhánh lỗi một phần của RA R9 không dựng được | portal · api — POST /api/graphql | `KHÔNG CÓ NGUỒN` — case TC-TIB-5046 Fail 2026-10-09, BUG-265 chưa có retest có ngày; Testlane status passed nhưng actualResult vẫn Fail; chưa có câu trả lời dev nhánh lỗi một phần có tồn tại không | product-base — MỚI: variant-add-to-campaigns; context local campaign.md đoạn "Bulk Add to Campaign sends ONE insert request" có thể SAI nếu BUG-265 được fix theo hướng tách request | ADD |
| `CLAIM-15` | TIB-5496 — bấm (+) ở dòng ngoài vùng chọn (hoặc khi không chọn dòng nào) chạy luồng một variant như cũ: banner "Adding this variant to selected campaigns will also mark it as available", cột "Available / Not available", chỉ thêm đúng variant đó; vùng chọn ở grid giữ nguyên (C9) | portal — Product Base editor, bảng Variants + modal | `test_case` — PASS TC-TIB-5047 2026-10-09 staging [AI]; PASS TC-TIB-5048 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns; context local campaign.md → Quick-add flow (luồng 1 variant) | ADD |
| `CLAIM-16` | TIB-5496 — sau bulk Add, campaign hiện nút "Update required"; variant mới chỉ vào dữ liệu sync lên Shopify (instance_variants) sau khi bấm Update thủ công (R10, phần sync) | portal · api — instance_variants; storefront chưa xem được (store khoá mật khẩu) | `test_case` — PASS TC-TIB-5049 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base/product-base-campaign-link — liên quan KB-060, KB-092 (Update campaign); context local campaign.md "still needs Update Campaign" | ADD |
| `CLAIM-17` | TIB-5496 — RA/PO (Q9): mockup của variant mới thêm được gán theo rule kế thừa từ Product Base (TIB-3216) (R10, phần mockup) | portal — campaign mockup variant assignment | `KHÔNG CÓ NGUỒN` — TC-TIB-5050 PASS 2026-10-09 nhưng gán mockup của campaign giống hệt trước và sau Add (có từ lúc attach) nên không chứng minh rule kế thừa áp cho variant mới | product-base/mockup-attachment — chưa rõ, cần agent tự đánh giá | ADD |
| `CLAIM-18` | TIB-5496 — API/SDK không đổi: bulk Add chỉ gọi POST /api/graphql với mutation Hasura sẵn có insert_campaign_variants + update_campaign_instances (need_sync), không có endpoint/SDK mới (C5) | api — POST /api/graphql | `test_case` — PASS TC-TIB-5051 2026-10-09 staging [AI] — build: staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo) | product-base — MỚI: variant-add-to-campaigns; context local api-endpoints.md → GraphQL (Hasura) | ADD |

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
| `CLAIM-01` | product-base | variant-catalog | owner / staff có quyền sửa Product Base và campaign | portal | không có (lân cận: KB-079) |
| `CLAIM-02` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có (lân cận: KB-092) |
| `CLAIM-03` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-04` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-05` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-06` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-07` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-08` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-09` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-10` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal · api | không có |
| `CLAIM-11` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal · db | không có |
| `CLAIM-12` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-13` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-14` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal · api | không có |
| `CLAIM-15` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-16` | product-base | product-base-campaign-link | owner / staff có quyền sửa Product Base và campaign | portal · api | không có (lân cận: KB-060, KB-092) |
| `CLAIM-17` | product-base | mockup-attachment | owner / staff có quyền sửa Product Base và campaign | portal | không có |
| `CLAIM-18` | product-base | MỚI: variant-add-to-campaigns | owner / staff có quyền sửa Product Base và campaign | api | không có |

- **`scope.role` ở đây KHÁC "Role liên quan" ở Phần 2.** Phần 2 là **dữ kiện** (quan sát bằng tài khoản gì / ticket nêu role nào). Cột này là **chỉ định**: KB item này áp dụng cho role nào. Hai thứ có thể khác nhau hoàn toàn — quan sát bằng tài khoản admin nhưng hành vi áp cho buyer.
- **`scope.environment` không hỏi người gửi** — xem phụ lục product.
- `feature_key` ghi `"MỚI: …"` chỉ là **đề xuất tên**; agent xử lý CCR quyết định cuối và có thể đổi slug.
- Cột "Quan hệ với canon" là `SUPERSEDES` thì **bắt buộc** có `kb_id` ở bảng này **và** có ngày nguồn ở Phần 5.1. Thiếu một trong hai → claim bị xử lý là `CONTRADICTS` (giữ cả hai phía, chờ người phân xử), **không** ghi đè.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** Jira https://ownego.atlassian.net/browse/TIB-5496 · PR qikify/teeinblue-portal#3748 · staging-portal.teeinblue.com, store Nprice1: Product Base PB-BULK #3384, PB-MANY #3385; campaign CP-FULL #2792, CP-K #2793, CP-OFF #2794 (https://staging-portal.teeinblue.com/campaigns/2794/edit?product-id=3384), CP-0 #2795, #2796–#2825 · Testlane task TIB-169 (TC-TIB-5025..5052), bug BUG-261..265 · request POST /api/graphql (insert_campaign_variants, update_campaign_instances)
- **Trạng thái đối tượng lúc đó:** lúc chạy 2026-10-09 ticket ở QA Review; sau lượt chạy CP-K và #2796–#2820 đã có V1–V4, CP-0 đặt lại về V7 (listing Shopify vẫn V1–V4 tới lần Update sau); ticket chuyển Passed 2026-10-27, Done 2026-10-28
- **Environment** (nơi quan sát / nơi ticket mô tả, **KHÔNG** nhất thiết là môi trường agent sẽ dùng để verify): staging
  > Kiểm chính sách môi trường ở phụ lục product trước khi coi trường này là blocking — nhiều dự án cố định môi trường verify (vd chỉ staging) độc lập với nơi bug gốc được quan sát. Ghi "không rõ" hay "production" **không** làm CCR bị chặn.
- **Role liên quan:** owner / staff (tài khoản staff staging) có quyền sửa Product Base và campaign
- **Surface:** `portal` · `storefront` · `api` · `db`

Không có URL của surface mà bạn không có quyền? **Bình thường.** Gửi thứ bạn có; agent tự map sang target của nó.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

> Phần lớn "conflict" phát sinh không phải mâu thuẫn thật, mà do hai quan sát đều đúng nhưng không ai ghi rõ chúng chạy trên build nào.

Với MỖI ticket:

- **Build / version / ngày deploy:** staging @ 2026-10-09 giờ không rõ — sau lần TIB-5496 giao QA cuối (2026-10-06); không có Fix Version; build hash: không rõ (QA không có quyền repo); ngày release production: không rõ
- **Ngày resolve/update cuối:** 2026-10-28
- **Đã ship chưa:** Jira Passed + Resolution Done 2026-10-27, status Done 2026-10-28; đã lên production hay chưa: không rõ

> "Không rõ build" **tự nó là thông tin quan trọng** — agent sẽ biết là không thể kết luận hành vi này "mới hơn" hay "cũ hơn" canon chỉ dựa vào đây.
>
> "Chưa ship" **không** làm CCR bị loại, nhưng nó đổi kết quả: claim về hành vi chưa ship sẽ vào KB dưới dạng đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]` — tra canon TRƯỚC khi gửi, chỉ cần chép lại

- Context version đang dùng: qa-knowledge manifest.json (generated_at 2026-10-30): product-base published_context_version 3; campaign published_context_version 3 · context local campaign.md / mockup.md / api-endpoints.md commit cuối 2026-10-28
- Canon hiện nói: qa-knowledge (canon của context builder) KHÔNG mô tả tính năng bulk add variant vào campaign; các item lân cận: product-base/features/variant-catalog/kb.json KB-079: [SEC-001, nghiêm trọng] Import variant hợp lệ qua Excel trả HTTP 500 Server Error; validate thiếu SKU hoạt động đúng; 'Delete selected' xoá ngay không dialog xác nhận ▸ "Khi Import 1 file Excel HỢP LỆ (đúng header template tải về, đủ SKU/Color/Size/Price), quan sát thấy POST /api/products/{id}/variants/import trả HTTP 500 {message:'Server Error'} - lặp lại 2/2 lần với 2 cách tạo file khác nhau (workbook mới vs sửa trực tiếp trên file template của server), loại trừ nguyên nhân do định dạng file phía client. Import file THIẾU SKU trả lỗi rõ ràng, đúng: 'SKU is required in row 2'. 'Delete selected' (chọn 1 variant qua click số thứ tự dòng, bấm nút) thực hiện XOÁ NGAY qua GET deletion-check (200) + DELETE (204), KHÔNG có dialog xác nhận nào trước đó." (OBSERVED_CURRENT, MEDIUM, 2026-09-13) · product-base/features/product-base-campaign-link/kb.json KB-092: "Khi bấm icon rocket 'Update campaign' trên 1 dòng product đang được campaign dùng, quan sát thấy mở modal 'Campaigns that use this product' với banner 'Please update your campaign after editing product base details', bảng danh sách campaign đang dùng product (ID/NAME/UPDATED/STATUS/LOGS, có checkbox chọn dòng), và 1 nút 'Update' riêng ở góc trên. Hành vi CHÍNH là liệt kê để người dùng tự mở campaign (khớp PO: mục đích không phải tự động đẩy update product base/artwork vào campaign, mà là 'update campaign ngoài SDK'). Nút 'Update' rõ ràng như một hành động push-update thật nhưng KHÔNG được bấm trong lần khảo sát này (giới hạn an toàn mutation) - hành vi thật khi bấm CHƯA có evidence." (CONFIRMED_EXPECTED, LOW, 2026-09-13) · product-base/feature-summary.md → variant-catalog: "Export/Import Excel của grid, "Delete selected" hàng loạt — chưa được khảo sát" ▸ (context local, không phải canon qa-knowledge): teeinblue/TIB automation/context/campaign.md → Editing Variants in Campaign: "Quick-add flow: Product Base → Variant table → set Available → "Add to Campaign" button → shows a confirmation listing every affected campaign → still needs "Update Campaign" afterward to actually take effect on each one." ▸ (context local) campaign.md → Editing Variants in Campaign: "An Unavailable variant is dropped out of the campaign, not just hidden (TIB-169, verified on staging 2026-10-09): flipping a variant to Unavailable — from the Product Base variant table or from the campaign's own Variants popup — removes it from the variant list of every campaign that held it (seen when a bulk edit on the Product Base emptied four campaigns at once)." ▸ (context local) campaign.md → Editing Variants in Campaign: "Bulk "Add to Campaign" sends ONE insert request for every ticked campaign (TIB-5496 / TIB-169, TC-TIB-5046, staging 2026-10-09): the (+) flow on a Product Base variant row does not issue a request per campaign. Blocking that single mutation made the whole add fail — and the UI still reported success: the toast read "Success – Variants are added to selected campaigns", both ticked campaigns were un-ticked and the modal stayed open, while neither campaign's variant list had changed (BUG-265)." ▸ (context local) mockup.md → Product Base → Variants: "Bulk-edit by selecting multiple rows (Ctrl/Shift-click); "Display settings" controls display order/labels." ▸ (context local) api-endpoints.md: "một số thao tác lưu dùng mutation Hasura thay vì route REST (VD thêm variant / đánh dấu campaign cần sync — TIB-5496)."
- Đã tra bằng từ khoá nào: qa-knowledge/products/teeinblue: _registry.json ("variant", "product base campaign", "campaign"), product-base + campaign kb.json/features/*/kb.json, checklists/*.json, feature-summary.md, open-questions.md bằng "add to campaign", "Campaigns that use this product", "bulk", "Delete selected", "Ctrl", "Shift", "Available", "Unavailable", "need_sync", "insert_campaign_variants", "TIB-5496", "TIB-2032" · context local teeinblue/TIB automation/context/*.md bằng "TIB-5496", "TIB-169", "Quick-add flow", "Ctrl/Shift-click", "Unavailable variant is dropped"
- Không tra được canon (không có quyền truy cập knowledge base đích)? Ghi rõ "không tra được — cần agent tự tra lại", **đừng suy đoán** canon nói gì.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Field này quyết định knowledge có **dùng làm expected result** được hay không.

- Ai xác nhận: KHÔNG AI có bằng chứng PO/business đủ điều kiện — Jira chỉ có description (huyen.chu) và comment kỹ thuật của dev (tuanva 2026-10-05); đáp án Q1–Q9 trong file RA (Slack 2026-10-08) không ghi tên người trả lời; test case PASS [AI] 2026-10-09 cho 10/18 claim (xem Phần 1a). ⏳ CHỜ BẠN: có PO/business xác nhận ngoài Jira/Slack không? Ai là người trả lời Q1–Q9 trong thread Slack #req-chienct ts 1791361620.059129?
- Ở đâu, ngày nào: comment Jira "Summary cho QA" 2026-10-05 (dev tuanva); thread Slack #req-chienct ts 1791361620.059129 ngày 2026-10-08 (người trả lời không rõ); thread #tib-devs được link vào Jira ngày 2026-10-23 — ⏳ CHỜ BẠN: thread #tib-devs 2026-10-23 chốt gì (đặc biệt về Q6, Q10, Q12 và BUG-261..265)?; TC-TIB-5025..5052 chạy [AI] 2026-10-09 trên staging, build không rõ hash
- Họ xác nhận chính xác điều gì: không rõ — chưa có trích dẫn PO/business nguyên văn kèm tên người; test case PASS chỉ xác nhận hành vi quan sát được, trích ở Phần 5.1

> Comment kỹ thuật dev tự viết trong ticket (kể cả "Ready to test", "Resolution: Done") **KHÔNG PHẢI** PO/business sign-off. Không ai xác nhận thật sự → knowledge vào context dưới dạng "đã quan sát thấy", **không** dùng làm expected result. Đây là cố ý, không phải hạn chế.
>
> **Nhưng tài liệu dev sinh từ source code thì CÓ tính** (`dev_doc`) — nó khác một comment tiện tay ở chỗ nó được generate có hệ thống từ code và được dev chủ động gửi như mô tả chính thức. Khi đó knowledge vào context dưới dạng **hành vi đúng** và **sẽ được dùng làm expected result cho test hằng ngày**. Đây là quyền lực thật — chỉ ghi khi bạn có tên tài liệu + version + ngày + trích dẫn thật.
>
> Mục này chính là nguồn cho cột "Nguồn & độ mạnh" ở Phần 1a — trả lời "PO/Dev"/"test case"/"dev doc" ở đây mà không kèm quote/link/id/ngày cụ thể thì cột đó vẫn phải ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

**Bắt buộc.** Đây là cái chặn agent nhận CCR nâng quan sát/mô tả ticket lên thành "hành vi đúng" quá tay.

```
Không coi các đáp án [Confirmed] trong file RA là PO sign-off (người trả lời không được ghi tên) ▸ Không coi description Jira là spec_doc chính thức ▸ Không coi R7/R8 ("K tính cả variant đang tắt", "Add bật lại variant đang tắt") là hành vi thật: context local ghi variant Unavailable bị bỏ khỏi campaign, nên trạng thái "đang tắt trong campaign" có thể không tồn tại — CCR này KHÔNG chọn phe giữa R8 và đoạn đó, cần dev trả lời ▸ Không coi R9 (lỗi một phần) là nhánh có thật — chỉ có một request chung cho mọi campaign ▸ Không coi nội dung confirmation modal, hint "X unavailable skipped", label "Select all 25 campaigns on this page" là chữ cuối cùng trên UI: lúc chạy đều lệch (BUG-261/262/263), chưa rõ đã sửa theo hướng nào ▸ Không coi chữ banner (CLAIM-02) là cố định nếu BUG-262 được fix bằng cách đổi banner (RA Q11 treo) ▸ Không coi "đóng hay giữ modal sau thành công" là đã chốt (Q6 treo) dù lượt chạy thấy modal vẫn mở ▸ Không coi trạng thái "passed" hiện tại của TC-TIB-5030/5035/5037/5039/5045/5046 trên Testlane là bằng chứng PASS — không có ngày retest, actualResult vẫn là kết quả Fail/rỗng của 2026-10-09; việc BUG-264 không còn gắn trên TC-TIB-5045 không có nghĩa bug đã fix ▸ Không coi Jira Passed/Done (2026-10-27/28) là bằng chứng các bug đã fix ▸ Không coi giới hạn 25 campaign/trang là thiết kế cố định — dev ghi là "known limitation" ▸ Không coi Cmd-click (macOS) đã kiểm ▸ Không coi tên feature_key "MỚI: variant-add-to-campaigns" là đã duyệt — chỉ là đề xuất ▸ Không đề xuất object_key mới.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Product Base editor → bảng Variants (TIB-5496, quan sát staging 2026-10-09, cần re-verify sau khi BUG-261..265 được xử lý): chọn nhiều dòng (Ctrl-click rời rạc, Shift-click theo dải) rồi bấm (+) "Add to campaigns" trên một dòng đang chọn mở modal "Campaigns that use this product" ở chế độ nhiều variant — banner "Adding N variants to selected campaigns will also mark them as available", cột Variant status "K/N available". (+) trên dòng Unavailable bị disable. Campaign đã đủ N/N bị disable và select-all bỏ qua nó; campaign 0/N hoặc K/N vẫn tick được; "+ Add" disable tới khi tick ít nhất một campaign. Bấm "+ Add" hiện confirmation (Cancel không đổi gì, giữ tick); xác nhận thì chỉ thêm các variant campaign còn thiếu (không nhân đôi, double-click không tạo trùng) và đánh dấu Available, qua mutation Hasura sẵn có (insert_campaign_variants + update_campaign_instances need_sync), không có API/SDK mới. Bấm (+) ở dòng ngoài vùng chọn chạy luồng một variant như cũ ("Available / Not available") và giữ vùng chọn. Variant mới chỉ vào dữ liệu sync Shopify sau khi bấm Update Campaign ("Update required"). Chưa xác nhận (quan sát, không dùng làm expected): N chỉ đếm variant Available và hint "X unavailable skipped"; select-all chỉ áp dụng 25 campaign của trang đang xem và label của nó; nội dung confirmation; modal giữ mở + bỏ tick sau thành công; vùng chọn ở grid có tự clear sau Add không; cách UI báo khi Add lỗi (đang báo Success dù lỗi); "bật lại variant đang tắt"; mockup kế thừa cho variant mới.
```

## 4.4 Mức độ gấp `[BẠN]`

`HIGH` (đang chặn test P0/P1) · `MEDIUM` (ảnh hưởng coverage) · `LOW` (cải thiện dần)

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5025 · TC-TIB-5026 · TC-TIB-5027 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5025: Click V1 rồi Ctrl-click V2, V3: 3 dòng V1, V2, V3 có class "select" (highlight), V4–V7 không chọn; nút Delete selected chuyển sang enabled; bảng không reload, vùng chọn giữ nguyên.
  TC-TIB-5026: Click V1, Ctrl-click V3 và V5: đúng 3 dòng V1, V3, V5 có class "select", V2/V4/V6 không chọn. Ctrl-click V3 lần nữa: V3 bỏ chọn, còn V1 và V5.
  TC-TIB-5027: Click V2 rồi Shift-click V5: dải V2, V3, V4, V5 (4 dòng) có class "select"; V1, V6, V7 không chọn.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 3 case trên Testlane

### CLAIM-02

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5028 · TC-TIB-5029 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5028: Chọn V1, V2, V3 rồi bấm (+) ở dòng V2: modal "Campaigns that use this product" mở, banner "Adding 3 variants to selected campaigns will also mark them as available" (số 3), cột Variant status dạng K/3 (CP-K 2/3 available).
  TC-TIB-5029: Chọn V1–V4, bấm (+) ở V1: title "Campaigns that use this product"; banner "Adding 4 variants to selected campaigns will also mark them as available" (số 4 in đậm, font-weight 700); CP-0 hiển thị 0/4 available, CP-K 2/4 available.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 2 case trên Testlane

### CLAIM-03

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5031 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5031: Chọn V1, V2, V5: nút (+) ở dòng V5 (Unavailable) ở trạng thái disabled; thử bấm cưỡng bức cũng không mở modal nào.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane

### CLAIM-04

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5030 (actualResult, Fail) · BUG-262 · comment dev Jira 53403 (Known limitations)
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05)
- **Trích nguyên văn:**
  ```
  TC-TIB-5030: Fail — Thiếu hint số variant bị bỏ qua. Actual: banner "Adding 2 variants..." (N=2), cột Variant status theo N=2 (CP-K 2/2, CP-0 0/2); không có hint nào về variant Unavailable bị bỏ qua. Expected: hint "2 available variants selected (2 unavailable skipped)". Đã tạo bug BUG-262 kèm screenshot.
  Comment dev tuanva 2026-10-05 (Known limitations): Nếu vùng chọn có cả variant Unavailable, modal chỉ nhận các variant đang Available. Số N trong banner là số variant Available đã chọn.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5030; BUG-262 trên Testlane

### CLAIM-05

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5032 · TC-TIB-5033 · TC-TIB-5034 · TC-TIB-5038 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5032: CP-0 hiển thị 0/4 available, checkbox không bị disable, tick được; sau khi tick nút + Add chuyển từ disabled sang enabled.
  TC-TIB-5033: CP-K hiển thị 2/4 available, checkbox enabled, tick được và nút + Add enabled.
  TC-TIB-5034: CP-FULL hiển thị 4/4 available, checkbox disabled, không tick được (kể cả khi thử check).
  TC-TIB-5038: Chưa tick: + Add disabled; tick CP-0: enabled; bỏ tick CP-0: disabled trở lại.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 4 case trên Testlane

### CLAIM-06

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5036 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5036: Bấm select-all: CP-K, CP-OFF, CP-0 được tick; CP-FULL (4/4, disabled) không tick; nút + Add enabled.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane

### CLAIM-07

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5037 (actualResult, Fail) · BUG-263 · comment dev Jira 53403 (Known limitations)
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05)
- **Trích nguyên văn:**
  ```
  TC-TIB-5037: Fail — Select-all không có label nêu phạm vi. Actual: modal PB-MANY #3385 hiển thị "Showing 1 to 25 of 30 entries"; select-all là checkbox trần, không có label/tooltip "Select all 25 campaigns on this page". Bấm select-all: đúng 25 campaign trang 1 được tick. Trang 2 (26–30): 5 campaign không tick nhưng checkbox select-all ở header vẫn hiện đã tick. Expected: label "Select all 25 campaigns on this page"; các campaign trang 2 không tick. Phần phân trang 25 + 5 và phạm vi tick đúng; chỉ sai label (và trạng thái select-all ở trang 2). Đã tạo bug BUG-263 kèm screenshot.
  Comment dev tuanva 2026-10-05 (Known limitations): Select-all và thao tác Add trong modal chỉ áp dụng cho các campaign ở trang đang hiển thị (25 campaign mỗi trang), giống hành vi cũ.
  ```
- **File đính kèm cho claim này:** screenshot + attachment trong TC-TIB-5037; BUG-263 trên Testlane

### CLAIM-08

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5040 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5040: Tick CP-0 + CP-K, + Add, bấm Cancel ở confirmation: confirmation đóng, modal chính giữ nguyên tick CP-0/CP-K, cột Variant status không đổi (CP-K 2/4, CP-0 0/4). Không có thao tác Add nào được gửi.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane

### CLAIM-09

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5039 (actualResult, Fail) · BUG-261
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5039: Fail — Nội dung confirmation modal sai so với expected. Actual: "Are you sure you want to add and mark 4 variants as available in selected campaigns?" (title "Add variants to campaigns"; có nút Add và Cancel). Expected: "Are you sure you want to add 4 selected variant(s) to 2 campaign(s)? Any existing inactive variants will be set to available." (thiếu số campaign = 2 và câu về variant inactive). Đã tạo bug BUG-261 kèm screenshot.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5039; BUG-261 trên Testlane

### CLAIM-10

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5041 · TC-TIB-5042 · TC-TIB-5043 · TC-TIB-5052 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5041: Add V1–V4 vào CP-0 (#2795): CP-0 có V1, V2, V3, V4 (92741–92744), cả 4 available, kèm V7 filler có sẵn; V5, V6 không được thêm. Modal hiển thị CP-0 4/4 available.
  TC-TIB-5042: Add V1–V4 vào CP-K (#2793, trước đó V1, V2): mutation chỉ insert V3 (92743) và V4 (92744); CP-K sau Add có đúng 4 variant 92741, 92742, 92743, 92744, đều available, V1/V2 không nhân đôi; modal hiển thị CP-K 4/4 available.
  TC-TIB-5043: Double-click nút xác nhận Add (CP-0 trước đó 0/4): chỉ 1 mutation insert được gửi; CP-0 có đúng V1–V4 (92741–92744) mỗi variant 1 dòng cùng V7 filler, không trùng, không lỗi hệ thống.
  TC-TIB-5052: Chọn V1–V4 trên PB-MANY #3385, select-all 25 campaign trang 1, Add và xác nhận: hoàn tất trong vài giây, không timeout/lỗi; 25 campaign chuyển thành 4/4 available (checkbox disabled, tick được clear, modal vẫn mở). Kiểm tra qua API 3 campaign #2796, #2810, #2820: mỗi campaign có đúng V7, V1, V2, V3, V4 (không trùng); 5 campaign trang 2 không bị tác động.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 4 case trên Testlane

### CLAIM-11

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5044 (actualResult, Blocked) · TC-TIB-5035 (actualResult rỗng) · RA analysis_TIB-5496.md R7/R8 (Q2, Slack 2026-10-08)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); người trả lời Q2 trong Slack không ghi tên
- **Trích nguyên văn:**
  ```
  TC-TIB-5044: Blocked — Precondition CP-OFF không khớp: V2 đang tắt không tồn tại trong campaign (cùng nguyên nhân với TC-TIB-5035). Campaign #2794 "TIB-169 CP-OFF" chỉ có V1 (92741) theo UI và API; Black/M (V2) không có dòng, kể cả Unavailable. Đặt Black/M thành "Unavailable" rồi Save thì variant bị bỏ khỏi campaign (không lưu dạng đang tắt), nên không dựng được precondition qua UI. Không chạy Add để tránh kết luận sai về việc "bật lại" variant; cần dev/DB dựng hộ CP-OFF có V2 ở trạng thái tắt.
  TC-TIB-5035: actualResult rỗng.
  RA R7: K = tổng số variant đã chọn mà campaign đã có, tính cả variant đang bật và đang tắt trong campaign. (Q2, Slack 2026-10-08) ▸ RA R8: Khi Add: thêm mới các variant campaign chưa có và tự động bật lại (Mark Available) các variant đã có nhưng đang tắt. (Q2, Slack 2026-10-08)
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5044 trên Testlane

### CLAIM-12

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5052 (actualResult, quan sát phụ) · description Jira TIB-5496 "After success" · comment dev Jira 53403
- **Link:** https://ownego.atlassian.net/browse/TIB-5496?focusedCommentId=53403
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI] (case); tuanva — dev (comment 2026-10-05); huyen.chu (description, sửa cuối 2026-09-30)
- **Trích nguyên văn:**
  ```
  TC-TIB-5052: 25 campaign chuyển thành 4/4 available (checkbox disabled, tick được clear, modal vẫn mở).
  Description Jira: After success: Keep modal open. Update the Variant status column in the grid. Clear selection. Disable campaigns that now contain all selected variants.
  Comment dev tuanva 2026-10-05: Sau khi thành công, modal vẫn mở, cột Variant status cập nhật, bỏ chọn campaign, campaign vừa đủ N/N chuyển sang disable.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5052 trên Testlane

### CLAIM-13

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5045 (actualResult, Fail) · BUG-264
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5045: Fail — Vùng chọn variant không được clear sau Add thành công. Actual: Add V1–V4 vào CP-0 thành công (CP-0 4/4 available), đóng modal: V1, V2, V3, V4 vẫn đang chọn, nút Delete selected vẫn enabled. Expected: không còn dòng nào đang chọn, Delete selected trở lại trạng thái không có vùng chọn. Đã tạo bug BUG-264 kèm screenshot.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5045; BUG-264 trên Testlane

### CLAIM-14

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5046 (actualResult, Fail) · BUG-265 · RA analysis_TIB-5496.md R9
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5046: Fail — Khi request ghi bị lỗi, UI báo Success và bỏ tick mọi campaign. Actual: chặn (abort) request insert, tick CP-0 + CP-OFF rồi Add: modal vẫn mở nhưng toast "Success – Variants are added to selected campaigns", cả 2 campaign bị bỏ tick, dữ liệu không được ghi (CP-0 vẫn [V4, V7], CP-OFF vẫn [V1]); không có cảnh báo campaign lỗi. Expected: campaign thành công bỏ tick, campaign lỗi giữ tick kèm toast cảnh báo nêu số campaign lỗi. Giới hạn mô phỏng: bulk Add chỉ gửi 1 mutation insert chung nên không làm lỗi riêng 1 campaign được; dùng CP-0 + CP-OFF thay CP-K (CP-K đã đủ 4/4 sau case 5042, bị disable). Đã tạo bug BUG-265 kèm screenshot.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult TC-TIB-5046; BUG-265 trên Testlane

### CLAIM-15

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5047 · TC-TIB-5048 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5047: Chọn V1, V2, V3, bấm (+) ở V4 (ngoài vùng chọn): modal chế độ 1 variant, banner "Adding this variant to selected campaigns will also mark it as available" (không có "N variants"), cột status dạng Available / Not available (CP-FULL Available, CP-K/CP-OFF/CP-0 Not available). Đóng modal: V1, V2, V3 vẫn đang chọn trong grid.
  TC-TIB-5048: Không chọn dòng nào, bấm (+) ở V1: modal chế độ 1 variant (banner "Adding this variant...", cột Available / Not available), confirmation "add and mark the variant Black/S as available in selected campaigns?". Add vào CP-0: chỉ 1 insert với variant 92741 (V1); CP-0 có V1 và V7 filler, không có variant nào khác.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult của 2 case trên Testlane

### CLAIM-16

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5049 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5049: Sau Add V1–V4 vào CP-0 (đã published lên Nprice1): trang campaign hiện nút đỏ "Update required"; trước Update, dữ liệu sync lên Shopify (instance_variants) chỉ có V7 (92747). Bấm Update required ở store Nprice1: instance_variants có V1–V4 (92741–92744) kèm V7, tức variant mới chỉ sync sau khi Update thủ công. Giới hạn: storefront nprice1.myshopify.com đang khoá mật khẩu (trang /password) nên không xem trực tiếp được product; xác nhận qua dữ liệu sync của TeeInBlue thay vì nhìn trang product.
  ```
- **File đính kèm cho claim này:** 2 screenshot đính trong actualResult trên Testlane

### CLAIM-17

- **Loại nguồn** (đúng 1): KHÔNG CÓ NGUỒN
- **Locator:** TC-TIB-5050 (actualResult) · RA analysis_TIB-5496.md R10
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor [AI]
- **Trích nguyên văn:**
  ```
  TC-TIB-5050: Sau Add V1–V4 vào CP-0, mockup 1 của campaign product (mockup 8097) có variant assignment gồm V1, V2, V3, V4 (+V5, V6); mockup 2 không gán variant nào. V2, V3, V4 đều được gán mockup, khớp mockup 1 ở Product Base (PB gán Black S, Black M, White S, White M, Gray L). Lưu ý: danh sách gán của campaign mockup giống hệt trước và sau Add (đã có từ lúc attach), và lệch nhẹ với PB (có V5, V6, thiếu V7 filler) — không ảnh hưởng V2–V4.
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane

### CLAIM-18

- **Loại nguồn** (đúng 1): test_case
- **Locator:** TC-TIB-5051 (actualResult)
- **Link:** không có URL công khai — Testlane project proj-7082bc68-6228-4718-b22d-c8e6f95437ab, task TIB-169
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-09
  > **KHÔNG phải ngày bạn đọc nó**, và **KHÔNG** lấy `resolutiondate`/`updated` của ticket thay cho nó. Ngày này quyết định CCR có ghi đè được canon hay không (contract §12.5). Không rõ → ghi "không rõ"; đoán sai làm ghi đè **sai chiều** và sai im lặng.
- **Người viết / người xác nhận:** test-executor (agent) [AI], QA chienct điều phối lượt chạy
- **Trích nguyên văn:**
  ```
  TC-TIB-5051: Khi Add V1–V4 vào CP-0, các request ghi dữ liệu chỉ gồm POST /api/graphql với các operation hiện có: insert (insert_campaign_variants) và update (update_campaign_instances need_sync), cùng getData/get để reload; không có endpoint/API/SDK mới nào được gọi. Request thành công, campaign được đánh dấu cần sync (nút "Update required").
  ```
- **File đính kèm cho claim này:** screenshot đính trong actualResult trên Testlane

*(lặp lại block trên cho CLAIM-02, CLAIM-03…)*

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

https://ownego.atlassian.net/browse/TIB-5496 (description + comment dev 2026-10-05 + link Slack #tib-devs 2026-10-23) · PR https://github.com/qikify/teeinblue-portal/pull/3748 · Testlane task TIB-169: TC-TIB-5025..5052 (actualResult kèm screenshot), BUG-261..265 · file RA teeinblue/TIB automation/qa-output/analysis_TIB-5496.md · đã bỏ link phiên Crisp và tên khách hàng gốc

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
