# Context Change Request: Teeinblue, translation

**Tiêu đề task:** `[CCR] PROFILE_GAP — translation — backfill Dynamic Translations`

Khuôn: bundled canonical `references/ccr-template.md` của skill `create-ccr`. Phụ lục: `context-lifecycle/knowledge/how-to-request/ccr-product-appendix.md`. Bản nháp local, chưa submit. Trích dẫn Jira lấy từ comment, đã bỏ thẻ định dạng; `[...]` trong trích dẫn là phần che tên account hoặc id theo yêu cầu.

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

Đề xuất 1 CCR cho object này, vì CCR chạm cùng object sẽ bị lock. Mọi claim cùng product `teeinblue`. 

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `PROFILE_GAP`

**Object** `[AGENT]`

- Product: `teeinblue`
- Object: `translation` · Feature: `dynamic-translations`, `language-locale-switcher`

**Quan sát được** `[AGENT]`

```
TIB-5585: Stop trimming leading and trailing spaces in Dynamic Translation input (Done)
  - CLAIM-01: Danh sách, tên ngôn ngữ đồng bộ từ Shopify; Portal không có UI add/rename/xoá; không sinh case này
  - CLAIM-07: Phạm vi field dịch và cách lưu bản dịch
TIB-5608: Allow translating the date picker format in Dynamic Translation (Passed)
  - CLAIM-03: Import to Translation gợi ý key format cho date layer từ Global Option như layer thường
  - CLAIM-04: Key dịch placeholder date picker chỉ khớp chuỗi format viết thường
TIB-5583: Fix prompt variable reading translated option value instead of original (Done)
  - CLAIM-06: JSON List: Dynamic Translations chỉ dịch label, item dropdown giữ text gốc
TIB-5414: tiêu đề và status chưa tra
  - CLAIM-07: Phạm vi field dịch và cách lưu bản dịch
TIB-5352: tiêu đề và status chưa tra
  - CLAIM-09: SDK khi API translations lỗi hoặc chậm
```

- Nguồn: tổng hợp từ `rules/tib-product-behaviors.md`, `rules/env-capabilities.md`, Jira và Testlane. KHÔNG PHẢI quan sát trực tiếp của người soạn CCR trên môi trường thật.
- Thấy mấy lần / xác nhận trực tiếp mấy lần: 0 lần do người soạn CCR tự verify. Lượt chạy test ghi ở 5.1.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
Đợt backfill này không chạy lại gì trên staging hay production. Các vế chưa có TC PASS ghi ở từng claim trong 5.1.
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | loại: scope test. Danh sách, tên ngôn ngữ đồng bộ từ Shopify; Portal không có UI add/rename/xoá; không sinh case này | portal | `po_dev_confirm` | translation/language-locale-switcher | `ADD` |
| `CLAIM-03` | loại: hành vi. Import to Translation gợi ý key format cho date layer từ Global Option như layer thường | portal | `test_case` | translation/dynamic-translations | `ADD` |
| `CLAIM-04` | loại: hành vi. Key dịch placeholder date picker chỉ khớp chuỗi format viết thường | storefront | `po_dev_confirm` | translation/dynamic-translations | `ADD` |
| `CLAIM-06` | loại: hành vi. JSON List: Dynamic Translations chỉ dịch label, item dropdown giữ text gốc | storefront | `po_dev_confirm` | translation/dynamic-translations | `ADD` |
| `CLAIM-07` | loại: hành vi. Phạm vi field dịch và cách lưu bản dịch | portal · storefront | `po_dev_confirm` | translation/dynamic-translations | `ADD` |
| `CLAIM-09` | loại: hành vi. SDK khi API translations lỗi hoặc chậm | storefront | `po_dev_confirm` | translation/dynamic-translations | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | translation | language-locale-switcher | QA (phạm vi test), merchant | portal | không có (vế danh sách locale trùng một phần KB-003) |
| `CLAIM-03` | translation | dynamic-translations | merchant (owner/staff) | portal | không có (liên quan KB-020) |
| `CLAIM-04` | translation | dynamic-translations | buyer | storefront | không có |
| `CLAIM-06` | translation | dynamic-translations | buyer | storefront | không có (liên quan artwork KB-039) |
| `CLAIM-07` | translation | dynamic-translations | không rõ | portal | liên quan KB-010 (OBSERVED_CURRENT) |
| `CLAIM-09` | translation | dynamic-translations | không rõ | storefront | liên quan KB-053 storefront-buyer-facing (CONFIRMED_EXPECTED, chỉ phủ vế >5s; vế retry 1 lần chưa có) |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** portal · storefront

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

không có

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5585 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5608 | không rõ | 2026-11-05 | Jira Passed, task Testlane ready-to-deploy, chưa rõ đã deploy |
| TIB-5583 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5414 | không rõ | không rõ | không rõ |
| TIB-5352 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 2; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: translation/language-locale-switcher KB-003 (OBSERVED_CURRENT, cập nhật 2026-09-21): "Khi role owner mở combobox 'Languages from [store] \| [store]:' trên /product-page-content (và tương tự trên /artwork-translations), quan sát thấy đúng 2 option 'English'/'Vietnamese', được backing bởi GET /api/instances/[id]/shop-local…"
  - CLAIM-03: translation/dynamic-translations KB-020 (PROPOSED, cập nhật 2026-09-21): "Theo thông tin do user (domain expert nội bộ) cung cấp trực tiếp qua chat ngày 2026-09-21, sau khi context đã publish lần đầu và không qua bước khảo sát trực tiếp nào: cơ chế import thật cho Dynamic Translations tên là 'Import to Translations', và nằm trên các…"
  - CLAIM-06: artwork/layer-config-form-elements KB-039 (OBSERVED_CURRENT, cập nhật 2026-09-10): "json-list có ghi chú mục đích 'This layer loads a list of options from a JSON file you provide. No layer shows up on the artwork'. Field riêng: 'JSON File URL:' + 'Load preview', 'Placeholder text:', 'Option display template:' (Available Value/Preview.../New Y…"
  - CLAIM-04, CLAIM-07, CLAIM-09: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: shop-locales, ngôn ngữ, language, locale, add language, Languages from
  - CLAIM-03: Import to Translation, date picker, form_input_type, dd.mm.yyyy
  - CLAIM-04: date picker, placeholder, dd.mm.yyyy, translateByArtworkTranslation
  - CLAIM-06: JSON List, json-list, translated value
  - CLAIM-07: layer-translation
  - CLAIM-09: translation-delivery-threshold
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-01: File local 2026-10-30 mới hơn comment huytv #55043 ngày 2026-10-19 ("gồm thêm, sửa, xoá ngôn ngữ"). Claim theo file local.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-30 | `po_dev_confirm` |
| `CLAIM-03` | QA | 2026-11-05 | `test_case` |
| `CLAIM-04` | huytv (dev); QA chấp nhận 2026-11-05 | 2026-11-04 | `po_dev_confirm` |
| `CLAIM-06` | QA | 2026-10-26 | `po_dev_confirm` |
| `CLAIM-07` | chauptm, huytv (dev) | 2026-09-09, 2026-10-19 | `po_dev_confirm` |
| `CLAIM-09` | huytv (dev) | 2026-10-01 | `po_dev_confirm` |

Họ xác nhận chính xác điều gì: xem trích nguyên văn ở 5.1.

**Cần người xác nhận:**


## 4.2 KHÔNG đề xuất điều gì?

```
- Số liệu trong trích dẫn (limit, ngưỡng, cap thử nghiệm) là số tại thời điểm nguồn, không phải giá trị của mọi môi trường.
- feature_key và object_key ghi MỚI chỉ là đề xuất tên.
- Không đề xuất ghi đè canon. Claim CONTRADICTS giữ cả hai phía.
- Hướng dẫn test trong file local (hỏi cap thực tế, tên account, id data) không phải rule sản phẩm.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
CLAIM-01: Danh sách và tên ngôn ngữ của Dynamic Translations đồng bộ từ Shopify; Portal không có UI add, rename, xoá ngôn ngữ, nên không sinh case cho thao tác này.
CLAIM-03: Import to Translation gợi ý key format (vd dd.mm.yyyy) cho date layer đến từ Global Option giống date layer thường, mỗi format một lần.
CLAIM-04: Key dịch placeholder date picker khớp nguyên chuỗi format viết thường (dd.mm.yyyy). Entry DD.MM.YYYY hoặc dd.MM.yyyy không có tác dụng.
CLAIM-06: Với layer JSON List, Dynamic Translations chỉ dịch label; item trong dropdown (name) luôn giữ text gốc.
CLAIM-07: Thay đổi chỉ bỏ prefix và suffix, mọi field translatable khác không đổi. Giá trị dịch thủ công trong Extras → Dynamic Translations giữ khoảng trắng đầu/cuối khi Save (còn sau reload, render nguyên trạng trên storefront). Vẫn bị trim theo chủ định: output của Auto translate và các bản dịch đã lưu ở dạng trim trước fix (không có migration, merchant phải nhập lại). Giá trị chỉ gồm khoảng trắng được tính là bản dịch thật, nên storefront hiện title trống thay vì fallback về source. Thay đổi áp cho toàn bộ thao tác Save của trang (gồm xoá row, mọi platform), phạm vi ảnh hưởng là cả màn hình chứ không chỉ ô nhập value.
CLAIM-09: API lỗi hoặc quá 5s thì widget vẫn render text gốc; SDK retry đúng một lần. Embed (non-Shopify) vẫn gọi API như trước, không có version hash.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 38
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 38:
    ```
    - Danh sách và tên ngôn ngữ đồng bộ từ Shopify; Portal không có UI add/rename/xoá ngôn ngữ → không sinh case này. (người dùng 2026-10-30, TIB-5585)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `test_case`
- **Locator:** TC-TIB-8308 (task TIB-290), Re-run 2026-11-05; Jira TIB-5608 comment #56471
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-8308
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-05
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - Testlane TC-TIB-8308, expectedResult:
    ```
    Offers the option's format (dd.mm.yyyy), same as a normal date layer, once even if a normal date layer has the same format.
    ```
  - Testlane TC-TIB-8308, actualResult:
    ```
    GO 1155 (dd/MM/yyyy) và layer thường cùng format: dd/mm/yyyy xuất hiện 1 lần.
    ```
  - Jira TIB-5608 comment #56471, huytv (dev), 2026-11-05:
    ```
    BUG-497: Import to Translation on an artwork now offers the date picker key (for example dd.mm.yyyy) for a date layer that comes from a Global Option, the same as for a normal date layer.
    ```
  - rules/tib-product-behaviors.md dòng 40:
    ```
    - **Import to Translation với date layer:** layer Global Option phải gợi ý key format như layer thường. (người dùng 2026-11-04, TIB-5608)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5608 comment #56400; TC-TIB-8314 (task TIB-290)
- **Link:** https://ownego.atlassian.net/browse/TIB-5608?focusedCommentId=56400
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-04
- **Người viết / người xác nhận:** huytv (dev); QA chấp nhận 2026-11-05
- **Trích nguyên văn:**
  - Jira TIB-5608 comment #56400, huytv (dev), 2026-11-04:
    ```
    The lookup is the whole lowercased string (dd.mm.yyyy), the text buyers see today; a single-letter entry in the dictionary never matches.
    ```
  - Testlane TC-TIB-8314, actualResult:
    ```
    Dictionary vi (thêm qua trang Dynamic Translations, Save 200): DD.MM.YYYY → A, dd.MM.yyyy → B; chưa có dd.mm.yyyy.
    ```
  - Testlane TC-TIB-8314, actualResult:
    ```
    Không entry nào áp dụng.
    ```
  - rules/tib-product-behaviors.md dòng 41:
    ```
    - Key dịch placeholder date picker: chỉ key format viết thường có tác dụng (`dd.mm.yyyy`); `DD.MM.YYYY`, `dd.MM.yyyy` không áp. (người dùng 2026-11-05, TIB-5608)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 43
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-26
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 43:
    ```
    - **JSON List:** Dynamic Translations chỉ dịch label; item trong dropdown (`name`) luôn giữ text gốc. Không viết case "translated JSON List value". (người dùng 2026-10-26, TIB-5583)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-07

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5414, TIB-5585; skill-rules-audit.md #43, #45, #46, #47, #49 (rule `layer-translation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5414?focusedCommentId=50357
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-09, 2026-10-19
- **Người viết / người xác nhận:** chauptm, huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5414 comment #50357, chauptm (dev), 2026-09-09 (dòng #43):
    ```
    prefix and suffix were removed from LAYER_TRANSLATABLE_FIELDS (src/transformer/translation/layer.js).  They were the odd ones out in that list — every other entry is form copy (form_label, form_placeholder, input_hint, *_label, name) shown only inside the personalization form.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #45):
    ```
    Giờ dấu cách người dùng nhập ở ô bản dịch được giữ nguyên khi Save, reload vẫn còn, và hiển thị đúng như vậy trên storefront.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #46):
    ```
    Bản dịch cũ đã bị cắt dấu cách vẫn giữ nguyên, merchant muốn có dấu cách thì phải nhập lại. Chỉ áp dụng cho bản dịch nhập tay. Kết quả của Auto translate vẫn bị cắt dấu cách đầu/cuối như trước.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #47):
    ```
    Ô dịch chỉ chứa dấu cách (␣) giờ được lưu như một bản dịch, nên trên storefront tiêu đề option hiển thị thành khoảng trắng thay vì quay về tiêu đề gốc.
    ```
  - Jira TIB-5585 comment #55043, huytv (dev), 2026-10-19 (dòng #49):
    ```
    Rủi ro lớn nhất: thay đổi áp dụng cho toàn bộ thao tác Save ở trang Dynamic Translations, không riêng ô bản dịch. Save bản dịch ở Dynamic Translations, trên mọi nền tảng (Shopify và các nền tảng khác), gồm thêm, sửa, xoá ngôn ngữ và xoá dòng dịch
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5352; skill-rules-audit.md #177, #178 (rule `translation-delivery-threshold`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5352?focusedCommentId=52985
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-01
- **Người viết / người xác nhận:** huytv (dev)
- **Trích nguyên văn:**
  - Jira TIB-5352 comment #52985, huytv (dev), 2026-10-01 (dòng #177):
    ```
    Nếu API translation lỗi hoặc quá 5 giây chưa phản hồi thì widget vẫn hiện, nhưng ở chữ gốc. SDK chỉ thử lại đúng 1 lần.
    ```
  - Jira TIB-5352 comment #52985, huytv (dev), 2026-10-01 (dòng #178):
    ```
    Embed (ngoài Shopify): vẫn gọi API như cũ, không có mã phiên bản.
    ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

không có

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật
- [x] Đã ghi build/ngày update hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi từ khoá tra canon
- [x] Mỗi claim có đúng 1 dòng ở Phần 1a, 1 dòng ở Phần 1b, 1 block ở Phần 5.1
- [x] Cột nguồn ghi đúng 1 trong 5 trạng thái
- [x] Phần 2a và 2b đã điền
- [x] Không còn placeholder
