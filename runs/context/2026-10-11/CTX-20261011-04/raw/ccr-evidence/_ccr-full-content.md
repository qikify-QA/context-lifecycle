<!-- Proposal CBS-004 content (get_proposal, qa-hub-production, fetched 2026-10-11). Redacted per contracts/qa-context-contract.md §6: Jira account id and dev handle -> [REDACTED]. Otherwise verbatim. -->

# Context Change Request (CCR) — teeinblue

> Khuôn dùng: `references/ccr-template.md` (bundled, canonical) của skill `create-ccr`.
> Phụ lục product-specific: **không tìm thấy** — đã tìm `contracts/ccr-product-appendix.md` và `how-to-request/ccr-product-appendix.md` trong repo làm việc (`<local-path>`), không có. Repo này cũng không có `knowledge/products/<product>/objects/_registry.json`, `kb.json`, `checklists/*.json`, `feature-summary.md` hay `manifest.json` nào — không tra được canon hiện tại, không tra được registry cho `object_key`. Toàn bộ Object/Feature ở dưới là mô tả bằng lời + đề xuất tên, KHÔNG phải tra từ registry thật.

**Đây là CCR 1/2** cho ticket TIB-5467. CCR này chỉ chứa các hành vi đã **verify trực tiếp và khớp với mô tả/comment dev** (ADD vào canon). Các phát hiện **mâu thuẫn** với comment dev (3 case FAILED + 1 quan sát lệch) nằm ở CCR riêng: `CCR-2026-10-11-tib-5467-additional-option-go-contradictions.md`, theo quyết định tách của người gửi (lý do: phần mâu thuẫn/bug cần PO/Dev phân xử riêng, không nên trộn với phần đã chắc).

**Tiêu đề task đề xuất:** `[CCR] BEHAVIOR_CHANGE — Global Options / Additional Option (inline source) — Create-new inline Additional Option GO, API-validated edit-save, Label line in customization info`

---

# Phần 0 — Cần mấy CCR?

| | Câu hỏi | Trả lời |
|---|---|---|
| **Product** | Mọi claim thuộc cùng một product? | Có — tất cả thuộc teeinblue (TIB), ticket TIB-5467. |
| Người gỡ | Context builder tự explore được, hay cần dev/PO? | Tự explore được — mọi claim trong CCR này đã được verify trực tiếp (test case PASS), có quote dev comment đi kèm làm backing thứ 2. Không cần hỏi gì thêm để ghi vào canon dưới dạng "đã quan sát + xác nhận". |
| Điều kiện mở khoá | Đúng một thông tin/việc nào làm nó xong? | Không có — context builder đọc CCR này là đủ, không cần quay lại Jira. |
| Vòng đời | Nếu bị huỷ, các claim còn giá trị riêng không? | Có — mỗi claim (CLAIM-01..08) độc lập, không phụ thuộc nhau. |
| Artifact đích | Cùng KB một object, hay đụng registry chung? | Nhiều khả năng cùng một Feature Profile "Global Options — Additional Option" (object chưa xác định được vì không tra được registry) — xem Phần 1b. |

→ **1 CCR**, theo xác nhận của người gửi.

---

# Phần 1 — Thấy gì

**Loại request:** `BEHAVIOR_CHANGE` (hành vi mới của GO type "Additional Option" + thay đổi hạ tầng save-path ảnh hưởng mọi loại GO)

**Object**

- Product: teeinblue (portal + storefront SDK + API)
- Object: không tra được registry — mô tả bằng lời: **Global Option, type "Additional Option"** (Assets > Global Options), cơ chế lưu trữ item dùng chung giữa nhiều artwork/layer.
- Feature: không có feature_key sẵn — đề xuất `MỚI: global-option-additional-option-inline-source` (nguồn item inline, khai báo ngay trong GO, thay vì chỉ qua category riêng).
- Không khớp object nào trong registry vì repo này không có registry. Đừng bịa object_key nếu agent nhận CCR có registry thật khác.

**Quan sát được** — tổng hợp từ Jira TIB-5467 (description + 1 comment của dev, author/assignee `[REDACTED]`, accountId `[REDACTED]`, ngày 2026-10-02) và từ 32 test case đã chạy trực tiếp trên staging (Testlane task `TIB-157`, dự án `teeinblue`):

- TIB-5467 — "Create Additional Option in a Global Option without creating a category first" (Improvement). Trước đây: muốn dùng Additional Option làm GO phải tạo category Additional Option trước. Giải pháp: form GO loại Additional Option có nút chuyển "Create new" (khai báo item ngay trong GO) / "Select from category" (giữ flow cũ).
- Comment dev (2026-10-02, 14:23 +0700) mô tả chi tiết: default source khi tạo mới, hành vi đổi nguồn trên trang Edit, rủi ro lớn nhất (edit-save mọi loại GO giờ đi qua API validation thay vì ghi thẳng DB), dòng "Nhãn: tên item đã chọn" mới xuất hiện trong customization info, bulk action trên item inline, conditional setting lấy item từ GO inline, quick-fill không chép item inline, chặn GO rỗng khi storefront bật translation, copy/import artwork giữ id item, dọn thumbnail khi xoá item/GO.
- Nguồn: tổng hợp từ 1 ticket Done + 1 comment dev, **VÀ** verify trực tiếp qua 32 test case chạy trên staging-portal.teeinblue.com / linh-tib-staging.myshopify.com (Testlane task TIB-157, set done 2026-10-08).
- Thấy mấy lần / xác nhận trực tiếp mấy lần: **8 claim dưới đây đều đã verify trực tiếp ≥ 1 lần qua test case PASS** (số lần = số test case liệt kê ở Phần 1a, không làm tròn).

**Thử gì mà KHÔNG tái hiện / chưa thử gì**

- Không thử lại trên store `linh-tib-checkout` (Shopify Plus) — toàn bộ test case chạy trên `linh-tib-staging` (non-Plus). Không rõ hành vi có khác trên luồng Checkout Plus hay không.
- Không đọc source code/PR thật (SDK #2062, API #3878, Portal #3728) để xác nhận implementation — mọi kết luận dưới đây từ quan sát UI/network/DOM, không phải đọc code.
- Không test case TC-003 (Pre-existing GO category-source unaffected post-deploy) — bị `skipped`, không có trong CCR này.
- Response body của GraphQL validation request (CLAIM-03) không được xem trực tiếp (không có network body viewer trong tool test); chỉ xác nhận có round-trip 200 + toast lỗi tương ứng.

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | Tạo GO type "Additional Option" mới: Save luôn chuyển thẳng vào trang Edit của GO vừa tạo, khác với mọi loại GO khác (quay về danh sách) | portal | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` | ADD |
| `CLAIM-02` | Đổi nguồn (Create new ↔ Select from category) trên trang Edit: hiện dialog cảnh báo với nội dung cụ thể; đổi nguồn xoá Default value; dữ liệu nguồn cũ (category đã chọn, hoặc item inline) được giữ và khôi phục đúng khi đổi lại | portal, storefront | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` | ADD |
| `CLAIM-03` | Edit-save của **MỌI loại** Global Option (không chỉ Additional Option), cả ở trang Edit và popup "edit GO" trong artwork editor, giờ đi qua API validation (xác nhận qua Network: POST `staging-api.teeinblue.com/api/graphql`) thay vì ghi thẳng DB. Dữ liệu hợp lệ lưu/persist giống như trước. Dữ liệu không hợp lệ (vd Name rỗng) bị chặn với lỗi validation rõ ràng, thay vì lưu âm thầm | portal, api | `test_case` — xem 5.1 | `MỚI: global-option-edit-save` (ảnh hưởng MỌI loại GO, không riêng Additional Option) | ADD |
| `CLAIM-04` | Customization info / fulfillment data / public order & customization API hiện dòng nhãn cho item đã chọn của GO Additional Option, cho cả GO inline và GO trỏ category (trước đây thiếu hẳn). **Lưu ý khác biệt so với wording ticket:** dòng nhãn dùng đúng text field "Option Title" (`form_label`) của GO (vd "Color: Blue"), KHÔNG phải literal chữ "Label"/"Nhãn" như comment dev diễn đạt. Nếu "Option Title" để trống, dòng này không xuất hiện (im lặng, không lỗi) | portal, api | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` + có thể là field con `form_label`/"Option Title" chung cho mọi GO (chưa rõ phạm vi, cần agent tự đánh giá) | ADD (với phần hiệu chỉnh wording — xem 4.2) |
| `CLAIM-05` | Bulk action trên item inline: upload thumbnail hàng loạt (song song, khớp đúng theo filename, không lẫn), và xoá nhiều item (đúng tập được chọn, không ảnh hưởng item còn lại) | portal | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` | ADD |
| `CLAIM-06` | Kéo-thả sắp xếp lại item inline, và nút Sort A→Z, đều persist sau save/reload, và thứ tự này cũng được áp dụng đúng trên storefront | portal, storefront | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` | ADD |
| `CLAIM-07` | Conditional Setting của layer khác lấy được danh sách item để chọn điều kiện từ một GO Additional Option inline; danh sách trong picker khớp đúng item hiện tại của GO; chọn item trên storefront trigger đúng layer điều kiện | portal, storefront | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` (liên quan tới cơ chế Conditional Setting chung, object riêng nếu có) | ADD |
| `CLAIM-08` | Quick-fill ("Populate Content from another option") KHÔNG hiển thị layer GO Additional Option inline như một nguồn hợp lệ — dropdown rỗng nếu chỉ có layer GO inline, nhưng vẫn hoạt động đúng với layer khác (không phải lỗi dropdown chung) | portal | `test_case` — xem 5.1 | `MỚI: global-option-additional-option-inline-source` | ADD |

Không có claim nào ở đây làm SAI một checklist/automation đang publish (object/feature này chưa có canon trước đó theo những gì tra được).

## Phần 1b — Đề xuất địa chỉ trong KB

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) | portal | không có |
| `CLAIM-02` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) | portal, storefront | không có |
| `CLAIM-03` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-edit-save` | admin/seller (portal) | portal, api | không có |
| `CLAIM-04` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | buyer (storefront order) + admin (portal customization info) | portal, api | không có |
| `CLAIM-05` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) | portal | không có |
| `CLAIM-06` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) + buyer (storefront) | portal, storefront | không có |
| `CLAIM-07` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) + buyer (storefront) | portal, storefront | không có |
| `CLAIM-08` | chưa rõ, cần agent tự đánh giá | `MỚI: global-option-additional-option-inline-source` | admin/seller (portal) | portal | không có |

Không có claim nào ở đây ghi `SUPERSEDES` — toàn bộ là `ADD` vào canon chưa tồn tại (theo tra cứu, repo này không có canon nào cho object này).

---

# Phần 2 — Thấy nó ở đâu

- **URL / ID cụ thể đã biết:**
  - Jira: https://ownego.atlassian.net/browse/TIB-5467
  - Testlane: Project "teeinblue" (key `TIB`), Task `TIB-157`
  - Portal: `https://staging-portal.teeinblue.com/global-options/986/edit` (GO inline, "Additional Option") và `https://staging-portal.teeinblue.com/global-options/987/edit` (GO category-sourced)
  - Artwork test: `#4572` ("QA TIB-5467 Additional Option inline test"), campaign `2730`, layer `226664` (GO 986) và layer `513136` (GO 987)
  - Store storefront: `linh-tib-staging.myshopify.com`, product `qa-tib-5467-additional-option-order-test`
  - GO khác dùng để test regression edit-save: id `969` ("New Single-line Text option")
- **Trạng thái đối tượng lúc đó:** GO 986/987 còn tồn tại trên staging với dữ liệu test (items Blue/Green/Apple/Zebra/Perf1-50/XSS-payload trên GO 986 — XEM CCR mâu thuẫn cho chi tiết XSS; GO 987 category-sourced). GO 969 đã bị đổi Name/Option Title do test case TC-021/TC-022. Không cleanup theo quy định đứng ("no cleanup after execute testcase").
- **Environment:** staging (staging-portal.teeinblue.com, staging-api.teeinblue.com, SDK bundle `app-v1.js` Last-Modified `2026-10-02 04:03:21 GMT`, chứa string `additional_option_source`)
- **Role liên quan:** portal admin/seller (thực hiện mọi thao tác tạo/sửa GO); buyer (storefront, xem/chọn item, xem label trong order)
- **Surface:** portal · storefront · api

---

# Phần 3 — Để không sinh conflict giả

Với ticket TIB-5467:

- **Build / version / ngày deploy:** SDK bundle `app-v1.js`, Last-Modified `2026-10-02 04:03:21 GMT`, chứa string `additional_option_source` (xác nhận tại thời điểm test). Không có fingerprint build riêng cho Portal/API ngoài việc API đã trả lỗi validation đúng như mô tả — chỉ ghi "đã test trên bản deploy tại thời điểm chạy, không rõ số version cụ thể của Portal/API".
- **Ngày resolve/update cuối:** `2026-10-05` (resolutiondate Jira). Comment dev: `2026-10-02`. Testlane task TIB-157 set `done`: `2026-10-08`. Test case TC-TIB-4516 (CLAIM-04) được re-verify lại ngày `2026-10-11` sau khi phát hiện và sửa một gap về test data (xem CLAIM-04, Phần 5.1).
- **Đã ship chưa:** Có — Jira resolution `Done`, status `Done`.

**Context hiện đang nói gì**

- Context version đang dùng: không tra được — không có `manifest.json` trong repo làm việc.
- Canon hiện nói: không tìm thấy — không có `kb.json`/`checklists/*.json`/`feature-summary.md` nào cho object "Global Option"/"Additional Option" trong repo này.
- Đã tra bằng từ khoá: `global option`, `additional option`, `GO`, `_registry`, `kb.json`, `manifest.json`, `ccr-product-appendix` — không ra kết quả nào ngoài 2 file CCR cũ (`CCR/CCR-2026-09-30-tib-5482-...md`, và 2 file CCR gốc ở root repo) và `.claude/`.
- Không tra được canon vì repo làm việc không phải là knowledge-base repo của context-builder — cần agent xử lý CCR tự tra canon thật ở đúng repo của nó.

---

# Phần 4 — Hai câu chỉ con người trả lời được

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

Mỗi `CLAIM-0x` dưới đây có **2 lớp xác nhận độc lập**: (a) comment dev trong Jira (`po_dev_confirm`), và (b) test case PASS do QA verify trực tiếp trên staging (`test_case`, mạnh hơn). Chi tiết quote đầy đủ ở Phần 5.1 — đây là tóm tắt:

- **CLAIM-01, 02, 05, 06, 07, 08:** Ai xác nhận — dev ([REDACTED]) qua comment Jira ngày 2026-10-02 **và** QA qua test case PASS (TC-TIB-4493/4494/4508/4509/4518/4519/4520/4521), task TIB-157 set done 2026-10-08. Họ xác nhận đúng những gì ghi trong "Thay đổi / claim" ở Phần 1a — xem quote nguyên văn ở 5.1.
- **CLAIM-03:** Ai xác nhận — dev ([REDACTED]), comment Jira 2026-10-02, tự gọi đây là "⚠️ Biggest risk" **và** QA qua test case PASS (TC-TIB-4513/4514/4515), bao gồm việc quan sát trực tiếp 1 request POST GraphQL khi save.
- **CLAIM-04:** Ai xác nhận — dev ([REDACTED]) xác nhận PHẦN CHUNG (có dòng nhãn mới) qua comment Jira 2026-10-02. QA xác nhận qua test case PASS (TC-TIB-4516), nhưng **phần chi tiết wording** ("Option Title" text thay vì literal "Label") là quan sát trực tiếp của QA, KHÔNG có trong comment dev — dev chỉ viết "Nhãn: tên item đã chọn" một cách chung, không nói rõ "Nhãn" nghĩa là field nào.

> Comment dev ở đây **không phải** comment kỹ thuật kiểu "Ready to test" — đây là 1 bài viết có cấu trúc (Thay đổi chính / Lỗi sửa kèm / Vùng code đã động / Không phải bug / Phụ thuộc deploy), dev tự chủ động viết để mô tả hành vi cho QA, nên được tính là `po_dev_confirm` hợp lệ theo định nghĩa ở Phần 1a (không nâng lên `dev_doc` vì không phải changelog/PR-diff sinh từ code).

## 4.2 KHÔNG đề xuất điều gì?

- **KHÔNG** coi literal chữ "Label"/"Nhãn" là text cố định hiển thị trong UI cho CLAIM-04 — hành vi thật dùng text của field "Option Title" do seller tự đặt tên. Đừng viết expected result dạng `"Label: <item>"` cho test case tương lai; phải dùng `"<Option Title>: <item>"`.
- **KHÔNG** coi hành vi "Option Title để trống → dòng nhãn không xuất hiện" là đã được duyệt/by-design — đây là quan sát, chưa có PO/Dev xác nhận đây có nên là validation bắt buộc hay không (xem câu hỏi mở trong 4.3).
- **KHÔNG** chấp nhận các `feature_key`/`object_key` đề xuất ("MỚI: ...") ở Phần 1b như tên cuối cùng — đây chỉ là gợi ý của agent soạn CCR, agent xử lý CCR (context builder) quyết định tên thật khi build KB.
- **KHÔNG** coi số liệu "8 test case PASS" hay thứ tự deploy SDK→API→Portal như một SLA/cam kết cho các lần ship sau — chỉ là trạng thái build cụ thể lúc verify (2026-10-08/11).
- **KHÔNG** coi phạm vi "mọi loại GO" ở CLAIM-03 là đã test hết — QA chỉ test trực tiếp 1 loại khác (Single-line Text, GO 969); các loại GO khác (clipart, color, upload photo, maps, json list — theo liệt kê của dev) **chưa được verify trực tiếp** trong các test case này.

## 4.3 Đề xuất context nên nói gì

```
[Feature Profile — Global Option, type "Additional Option"]

- Khi tạo GO type "Additional Option", nguồn mặc định là item khai báo
  ngay trong GO ("Create new"). Save chuyển thẳng vào trang Edit của GO
  (khác mọi loại GO khác, quay về danh sách).
- Trên trang Edit, seller đổi nguồn qua lại giữa "Create new" (item inline)
  và "Select from category" (category Additional Option có sẵn). Đổi nguồn
  hiện dialog cảnh báo, xoá Default value, nhưng giữ lại dữ liệu của nguồn
  cũ — đổi lại thì khôi phục đúng dữ liệu đó.
- Item inline hỗ trợ: upload thumbnail đơn/hàng loạt (song song, khớp theo
  filename), xoá nhiều item, kéo-thả sắp xếp, Sort A→Z — tất cả persist
  qua save/reload và lên storefront.
- Conditional Setting của layer khác lấy được danh sách item để làm điều
  kiện từ một GO Additional Option inline (không chỉ từ GO category).
- Quick-fill ("Populate Content from another option") KHÔNG liệt kê GO
  Additional Option inline như nguồn — hành vi cố ý, không phải thiếu sót.

[Feature Profile — Global Option, mọi loại — Edit-save path]

- Edit-save của MỌI loại Global Option (không riêng Additional Option),
  ở cả trang Edit độc lập và popup "edit GO" trong artwork editor, đi qua
  API validation (endpoint GraphQL) thay vì ghi thẳng database. Dữ liệu
  hợp lệ lưu giống như trước; dữ liệu không hợp lệ (vd tên rỗng) bị chặn
  với lỗi rõ ràng thay vì lưu âm thầm.
  ⚠️ Chỉ verify trực tiếp trên loại "Single-line Text" — các loại GO khác
  (clipart, color, upload photo, maps, json list…) chưa được test trực
  tiếp cho thay đổi này, cần coverage bổ sung.

[Feature Profile — Customization info / public order API — GO Additional Option]

- Customization info (portal) và public order/customization API hiện có
  dòng nhãn cho item đã chọn của GO Additional Option — cả GO inline và
  GO trỏ category. Dòng này dùng đúng text field "Option Title" của GO
  làm tiền tố (vd "Color: Blue"), KHÔNG phải chữ "Label" cố định.
  ⚠️ Open question cho PO/Dev: nếu "Option Title" bị để trống, dòng nhãn
  này không xuất hiện (không lỗi). Field này có nên là bắt buộc không?
```

## 4.4 Mức độ gấp

`MEDIUM` — theo xác nhận của người gửi. Ticket đã ship (Done 2026-10-05), QA đã chạy hết regression liên quan; phần này chỉ ảnh hưởng độ chính xác của canon/coverage về sau, không chặn test P0/P1 nào đang chạy.

---

# Phần 5 — Evidence

## 5.1 Nguồn & evidence theo từng claim

### CLAIM-01

- **Loại nguồn:** `test_case` (+ `po_dev_confirm` làm backing)
- **Locator:** TC-TIB-4493 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case chạy `2026-10-08` (ngày task TIB-157 set done trên Testlane — Testlane API không trả timestamp riêng theo từng test case, dùng ngày done của task làm mốc); comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (comment); QA (session hiện tại, qua Playwright trên staging) chạy test case.
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED], 2026-10-02) "Tạo GO Additional option mới: mặc định là Create new.
  Màn tạo chỉ có khối item + kiểu hiển thị + nút Save. Save xong thì mở thẳng trang edit
  của GO vừa tạo. Các loại GO khác vẫn quay về danh sách như cũ."

  (TC-TIB-4493 actualResult) "Saved → redirected straight to /global-options/986/edit
  (Edit page), matching expected "other GO types return to the list instead"."
  ```
- **File đính kèm cho claim này:** không có.

### CLAIM-02

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4494, TC-TIB-4508, TC-TIB-4509 (Testlane, task TIB-157) — tất cả PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Sửa GO: được đổi nguồn. Nếu GO đã lưu, đổi nguồn sẽ hiện hộp thoại
  cảnh báo trước. Khi đổi, default value bị xoá, còn item của nguồn cũ vẫn được giữ, đổi
  ngược lại thì hiện lại đúng như cũ."

  (TC-TIB-4508 actualResult) "A confirm dialog appeared: "Change additional option source?
  Customizations and orders already made with this global option point to the items of the
  current source. After switching, they will no longer match the new items. Items of the
  current source are kept, so you can switch back later." ... Result: Default value field
  was cleared ... Switched back to "Select from category" ... the category selection was
  restored exactly as it was."
  ```
- **File đính kèm cho claim này:** không có.

### CLAIM-03

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4513, TC-TIB-4514, TC-TIB-4515 (Testlane, task TIB-157) — tất cả PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (tự gọi đây là rủi ro lớn nhất); QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "⚠️ Biggest risk (dev's words): edit-save of ALL Global Option types
  (not just Additional Option) now goes through API validation instead of a direct DB write —
  same data should still save, but invalid name/data/category is now rejected instead of
  silently corrupting."

  (TC-TIB-4515 actualResult) "Save was blocked: a red error toast appeared reading "Error —
  Global Option Name is required". ... Checked Network tab: a POST to
  https://staging-api.teeinblue.com/api/graphql fired at save time (200 response,
  GraphQL-style error-in-body pattern)."
  ```
- **File đính kèm cho claim này:** không có.

### CLAIM-04

- **Loại nguồn:** `test_case` (+ `po_dev_confirm` cho phần chung)
- **Locator:** TC-TIB-4516 (Testlane, task TIB-157) — PASS (re-verify). Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** comment dev `2026-10-02`. Test case chạy lần đầu `2026-10-08` trên order `#4481` — **FAILED** lúc đó vì GO 986/987 có field "Option Title" (`form_label`) bị để trống (gap dữ liệu test, không phải bug). QA điền lại "Option Title" (GO 986 = "Color", GO 987 = "Size") và đặt đơn mới; re-verify **PASS** ngày `2026-10-11`.
- **Người viết / người xác nhận:** dev `[REDACTED]` (comment, phần chung); QA (session hiện tại, cả 2 lần chạy + fix data).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Customization info (dữ liệu fulfillment, API đơn/customization
  public): trước đây thiếu hẳn dòng của GO Additional option. Giờ có dòng "Nhãn: tên item
  đã chọn", cho cả GO inline lẫn GO trỏ category."

  (TC-TIB-4516 actualResult, sau fix) "Re-verified after root-cause fix. Original failure
  (order #4481) was caused by a test-data gap, not a product bug: both GO 986 (inline) and
  GO 987 (category-sourced) had an empty Option Title field (HTML input name form_label) in
  their Settings — this is the field that drives the "Label: <item>" line. Filled in Option
  Title (GO 986 = "Color", GO 987 = "Size") and saved. User placed a new test order on
  campaign 2730 afterward and confirmed the label now appears correctly (e.g. "Color: <item>"
  / "Size: <item>") in the order's customization data."
  ```
- **File đính kèm cho claim này:** không có ảnh — xác nhận bằng text qua Testlane actualResult + xác nhận trực tiếp bằng lời của người dùng trong phiên làm việc ("tôi đã đặt đơn mới, label đã đúng").

### CLAIM-05

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4518 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Editor item inline: upload thumbnail lẻ và hàng loạt (kể cả upload
  song song), kéo thả, A→Z, xoá nhiều, tên item trùng."

  (TC-TIB-4518 actualResult) "DOM check after: ItemA's thumbnail URL and ItemB's thumbnail URL
  are two different, item-specific uploaded images (not swapped)... Result: "Additional
  Options (3)" — only ItemA and ItemB were removed; Blue, Green, and the XSS-payload item
  were left untouched."
  ```
- **File đính kèm cho claim này:** không có.

### CLAIM-06

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4519 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (TC-TIB-4519 actualResult) "Order changed live to [Apple, Blue, Green, XSS-item, Zebra].
  Saved, then reloaded the Edit page from a fresh navigation — order persisted exactly...
  The field's item label order was ["", "Apple", "Blue - en", "Green - en", "Zebra"] —
  matches the Sort A→Z order from the portal exactly."
  ```
  (Lưu ý: giá trị "Blue - en"/"Green - en" ở đây là tác dụng phụ của bug locale — xem CLAIM-04
  ở CCR mâu thuẫn — không liên quan tới việc thứ tự có đúng hay không, chỉ trích để không bịa
  lại nguyên văn.)
- **File đính kèm cho claim này:** không có.

### CLAIM-07

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4520 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Conditional settings của layer khác phụ thuộc vào GO inline: danh
  sách item để chọn điều kiện lấy từ GO."

  (TC-TIB-4520 actualResult) "Conditional picker's "is any of" item dropdown listed exactly
  54 options... an exact match to GO 986's current inline item list... Selecting "Apple" on
  GO 986's field... layer-513136's field appeared in the DOM, visible."
  ```
- **File đính kèm cho claim này:** không có.

### CLAIM-08

- **Loại nguồn:** `test_case` (+ `po_dev_confirm`)
- **Locator:** TC-TIB-4521 (Testlane, task TIB-157) — PASS. Comment Jira #53123.
- **Link:** https://ownego.atlassian.net/browse/TIB-5467 (comment #53123)
- **Ngày của nguồn:** test case `2026-10-08`; comment dev `2026-10-02`.
- **Người viết / người xác nhận:** dev `[REDACTED]`; QA (session hiện tại).
- **Trích nguyên văn:**
  ```
  (Jira comment, [REDACTED]) "Quick-fill từ GO inline vào layer: cố ý không chép item inline sang
  layer."

  (TC-TIB-4521 actualResult) "With only the Additional Option layers (GO 986, GO 987) and the
  text layer itself present, the "Source option" dropdown for Quick-fill showed "List is
  empty." — neither inline GO layer was offered as a source... This confirms the dropdown
  correctly surfaces eligible layers when they exist, and that it specifically excludes the
  inline Additional Option GO layers — not a generic/broken empty state."
  ```
- **File đính kèm cho claim này:** không có.

## 5.2 Evidence chung, không thuộc claim nào

- Jira TIB-5467: https://ownego.atlassian.net/browse/TIB-5467
- Testlane task TIB-157 (project teeinblue/TIB), 32 test case tổng, 8 trong số đó nằm trong CCR này.
- Không có PII/token/credential nào trong evidence trên — chỉ có tên nội bộ dev (`[REDACTED]`) từ comment Jira, chấp nhận được.

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [x] Đây là một thứ gỡ độc lập (toàn bộ hành vi ADD của TIB-5467), mọi claim cùng product teeinblue
- [x] 4.1 trả lời trung thực — mọi claim có cả po_dev_confirm và test_case
- [x] 4.2 đã điền
- [x] Mức độ gấp: MEDIUM (theo người gửi)
- [x] Evidence đã rà soát, không có PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp = số test case PASS liệt kê, không làm tròn
- [x] Build/ngày resolve ghi rõ (SDK bundle fingerprint + ngày Jira + ngày Testlane); phần "không rõ version Portal/API cụ thể" được thừa nhận rõ
- [x] Đã ghi từ khoá đã tra canon (Phần 3) và lý do không tra được (repo làm việc không có knowledge base)
- [x] Mỗi claim ở "Quan sát được" có đúng 1 dòng ở Phần 1a với Claim ID duy nhất (CLAIM-01..08)
- [x] Mỗi Claim ID có đúng 1 block ở Phần 5.1
- [x] Mỗi Claim ID có dòng tương ứng ở Phần 1b
- [x] Cột "Nguồn & độ mạnh" ghi đúng 1 trong 5 trạng thái kèm trích dẫn
- [x] Mọi claim `po_dev_confirm`/`test_case` có ngày nguồn cụ thể ở 5.1
- [x] Không còn placeholder kiểu khung-ba-ngoặc-nhọn nào sót lại trong file
