<!-- Proposal CBS-001 (qa-hub-production get_proposal, fetched 2026-10-11). Content verbatim except §6 redaction: person handles (Dev, QA) and local home-directory prefix -> [REDACTED]. No tokens/emails/credentials present in source. -->

# Context Change Request (CCR) — TIB-5352: translation dictionary chuyển sang giao qua API khi ≥1000 key

Dùng khi canonical QA context (Product KB / Feature Profile / Checklist) **thiếu, sai, cũ hoặc mâu thuẫn** với thay đổi đã/sắp ship.

**Khuôn / phụ lục đã dùng:** khuôn = bundled canonical (`create-ccr/references/ccr-template.md`); phụ lục product = `[REDACTED]/Documents/work/teeinblue-context-builder/contracts/ccr-product-appendix.md` (tìm thấy). Canon tra từ `[REDACTED]/Documents/work/teeinblue-context-builder/knowledge/products/teeinblue/`.

**Cách gửi:** đính file này vào task liên quan trên QA Hub (field CCR) và bấm **Submit CCR**, rồi kéo Proposal (`CBS-<n>`) sang `In Progress` (kênh trigger thật, theo phụ lục). Skill `create-ccr` không tự submit.

**Tiêu đề task:** `[CCR] BEHAVIOR_CHANGE — translation/dynamic-translations — dictionary giao qua API translations/<locale>.json khi ≥1000 key (TIB-5352, đã lên staging, chưa merge)`

---

## Nhãn field

| Nhãn | Nghĩa |
|---|---|
| `[AGENT]` | Skill/agent tự điền từ ticket + canon + kết quả test. Người gửi soát lại. |
| `[BẠN]` | Cần phán đoán của con người. |

---

# Phần 0 — Cần mấy CCR? `[BẠN xác nhận, AGENT đề xuất]`

**Đề xuất: 1 CCR duy nhất** (product `teeinblue`, một ticket, một cơ chế).

| | Câu hỏi | Trả lời |
|---|---|---|
| Product | Cùng một product? | Có — `teeinblue` |
| Người gỡ | Context builder tự explore được, hay cần dev/PO? | Phần lớn explore được trên staging (đã có test case PASS làm nguồn). **Riêng CLAIM-03 (retry) cần Dev trả lời** thiết kế retry, nhưng claim đó đã ghi `KHÔNG CÓ NGUỒN` nên không chặn các claim còn lại |
| Điều kiện mở khoá | Một thông tin/việc nào làm nó xong? | Không có blocker cứng; Dev xác nhận thiết kế retry chỉ để nâng độ tin cậy CLAIM-03 |
| Vòng đời | Huỷ thì các claim còn giá trị riêng? | Còn — CLAIM-01/02/04/06/07/08 đã được verify độc lập trên staging |
| Artifact đích | Cùng KB một object? | Chủ yếu object `translation` (feature `dynamic-translations`). CLAIM-02/03/07/08 là hành vi SDK runtime nên đề xuất đặt ở object `sdk`. Nếu orchestrator yêu cầu một CCR cho mỗi object thì tách `sdk` ra — **người gửi quyết** |

---

# Phần 1 — Thấy gì

**Loại request** `[AGENT đề xuất, BẠN duyệt]`

**Loại:** `BEHAVIOR_CHANGE` (kèm `STALE_CONTEXT` cho KB-017 và `CHECKLIST_GAP` cho CHK-009 của translation/dynamic-translations)

**Object** `[AGENT]` — tra từ `knowledge/products/teeinblue/_registry.json`

- Product: `teeinblue`
- Object: `translation` · Feature: `dynamic-translations` (đề xuất thêm feature mới `MỚI: storefront-translation-delivery`)
- Object liên đới: `sdk` · Feature `storefront-buyer-facing` (cross-object, không tự đổi ranh giới)
- Registry không có alias khớp trực tiếp "translation_version", "translations/<locale>.json" hay "retry"; `translation` được chọn vì alias nó phủ Dynamic Translations/locale. Context version đang dùng: `translation` v1 (2026-09-21), `sdk` v5 (2026-09-28).

**Quan sát được** `[AGENT]`

```
TIB-5352 — "[UID] Optimize translation loading to improve INP performance by using API instead of Liquid rendering"
Loại: Improvement · Status: QA Review (không có resolutiondate) · created 2026-08-25 · updated 2026-10-01
3 PR đang OPEN (GitHub), 2 build thành công (cập nhật cuối 2026-10-01). Chưa merge/release theo thông tin Jira.

Mô tả ticket: trước đây storefront nhúng ~29k bản dịch vào HTML qua Liquid, ảnh hưởng INP và hiệu năng trang;
đề xuất đổi sang lấy bản dịch qua API (giống cách Boundless), app-extension ngừng render bản dịch trong Liquid,
gọi song song API translation và campaign, backend xử lý logic translation.

Comment dev ([REDACTED], 2026-10-01, comment id 52985) mô tả hành vi: bỏ key chưa dịch; mỗi locale xét riêng;
0 key đã dịch → chữ gốc; 1–999 → từ điển nhúng thẳng HTML, không gọi API; ≥1000 → HTML chỉ có "mã phiên bản",
SDK gọi API translations/<locale>.json?v=...; key có value rỗng không tính; ngưỡng 1000 chỉnh qua env var;
API lỗi hoặc >5s → widget vẫn hiện chữ gốc, "SDK chỉ thử lại đúng 1 lần"; mỗi lần lưu ở Portal sinh phiên bản mới;
embed (ngoài Shopify) vẫn gọi API như cũ, không có version; kèm danh sách lỗi sửa kèm và "không phải bug, cố ý".

QA đã chạy task Testlane TIB-162 (29 test case) trên staging linh-tib-staging, store non-Plus:
13 passed, 1 failed (TC-TIB-007), 15 blocked. Xem Phần 5.1.
```

- Nguồn: tổng hợp từ ticket + comment dev + 29 test case Testlane đã chạy trực tiếp trên staging (chạy bằng Playwright, đọc raw HTML, đọc Network, đọc bundle SDK).
- Thấy mấy lần / xác nhận trực tiếp mấy lần: **13 test case PASS** (TC-TIB-001, 002, 003, 005, 008, 009, 010, 011, 012, 017, 021, 027, 029), **1 FAIL** (TC-TIB-007), **15 blocked**.

**Thử gì mà KHÔNG tái hiện / chưa thử gì** `[AGENT + BẠN]`

```
CHƯA verify (blocked, thiếu data/môi trường):
- Locale mã vùng viết hoa với >=1000 key (pt-BR/zh-CN) gọi API (TC-TIB-013, 014): shop chỉ có en, vi, zh-TW (zh-TW chỉ 50 key).
- Locale 0 key (TC-TIB-004).
- Cart: cross-sell/addon translated (TC-TIB-006) và nhãn option/color của cross-sell variant selector (TC-TIB-016):
  campaign phụ 2746/2747 chưa gắn vào 2740. Từ khảo sát: cross-sell bật ở Portal → Store Settings → Product Page Settings
  → "Cross-sell Personalization" + metafield Shopify teeinblue.cross_sell_product (GID sản phẩm); addon nằm trong artwork layer option.
- Shop dùng product handle vs shop Liquid-synced (TC-TIB-015): chỉ có 1 shop.
- Embed ngoài Shopify (TC-TIB-022).
- Xoá locale lẻ / bulk save bỏ locale → Shopify translation cập nhật (TC-TIB-018, 019); đổi primary language (TC-TIB-020).
- XSS trong bản dịch (TC-TIB-026), permission cross-shop (TC-TIB-025), shop dữ liệu cũ trước deploy API (TC-TIB-028).
- Hiệu năng định lượng (TC-TIB-023): chưa có baseline trước fix, chưa đo INP.
- Chưa đo timeline "song song" campaign và translation một cách chặt (TC-TIB-001).
- Chưa chạy tổ hợp timeout + lần gọi thứ hai (TC-TIB-008).
```

## Phần 1a — Phạm vi thay đổi & ảnh hưởng ước tính `[AGENT]` — BẮT BUỘC

| Claim ID | Thay đổi / claim | Surface liên quan | Nguồn & độ mạnh | Object/feature/checklist bị ảnh hưởng | Quan hệ với canon |
|---|---|---|---|---|---|
| `CLAIM-01` | Cách giao dictionary theo số key đã dịch/locale: 0 → không bản dịch; 1–999 → nhúng trong HTML (`window.teeinblueShopTranslations`); ≥1000 → HTML chỉ có `translation_version`, SDK gọi `GET /api/merchant/translations/<locale>.json?shop=<domain>&v=<version>`; key value rỗng không tính; mỗi locale xét riêng | storefront, api | `test_case` — TC-TIB-001, 002, 003, 009, 011 PASS | translation/dynamic-translations (KB-017), checklist CHK-008/009/010 | `CONTRADICTS` KB-017 (KB-017 nói không có endpoint translations riêng; ghi nhận trên shop dưới ngưỡng nên có thể chỉ khác scope) |
| `CLAIM-02` | API translation lỗi (500/503/abort) hoặc >5s → widget vẫn render, hiện chữ gốc; timeout 5s bằng `headersTimeout:5e3`; khi timeout phát sinh 1 pageerror `signal is aborted without reason` nhưng trang vẫn hoạt động | storefront | `test_case` — TC-TIB-008 PASS (bundle mới 2026-10-07); vế "hiện chữ gốc" ở 500/503/abort quan sát trong TC-TIB-007 | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-03` | Retry: bundle mới có logic retry **lazy** — `lu(shop,locale)` cache promise theo `shop\|locale`, tối đa 2 lần fetch (`mK=2`); lần fetch thứ hai chỉ xảy ra khi có lần gọi `lu` kế tiếp trong cùng page session (vd mở cart "Edit design"). Một lần load trang product với API lỗi chỉ có **1 request**, không retry | storefront | `KHÔNG CÓ NGUỒN` — TC-TIB-007 FAILED so với expected "đúng 1 retry khi load" nên không dùng làm nguồn; dev chỉ nói "thử lại đúng 1 lần" | sdk/storefront-buyer-facing | `ADD` (chờ Dev xác nhận thiết kế) |
| `CLAIM-04` | Mỗi lần Save Dynamic Translations ở Portal sinh `translation_version` mới; HTML storefront nhận version mới trễ ~30–70 giây sau Save (trong lúc trễ vẫn thấy bản cũ); Save ở một locale không ghi đè locale khác (zh-TW=50, en=18 giữ nguyên) | portal, storefront | `test_case` — TC-TIB-010 PASS (2026-10-07) | translation/dynamic-translations | `ADD` |
| `CLAIM-05` | Hành vi endpoint `translations/<locale>.json` với đầu vào lạ: `v` thiếu/rỗng/sai/rác → 200 + full dictionary (có `v`: `cache-control: immutable, max-age=31536000, private`; không `v`: `max-age=900, private`); locale không tồn tại (`xx-YY`, `pt-BR`/`zh-CN` chưa publish) → 200 + dictionary primary (18 key); `zh-TW` và `zh-tw` đều 200; `..%2f..%2fx` → 404, `<script>` → 403 (Cloudflare), locale 300 ký tự → 404, `%00` → 400; không stack trace | api | `KHÔNG CÓ NGUỒN` — TC-TIB-024, 027 ghi `PO/DEV confirm`, chỉ thu thập hành vi | translation/dynamic-translations (KB-017), CHK-012 (permission) | `ADD` |
| `CLAIM-06` | Dynamic Translations (option title, placeholder, nhãn photo) hiển thị đã dịch trên storefront product page và cart edit modal, ở locale `vi` (≥1000, API path) và `zh-TW` (<1000, inline path) | storefront | `test_case` — TC-TIB-001, 005, 011, 012 PASS | translation/dynamic-translations, CHK-009 (Option Title sub-scope), OQ-translation-010 | `ADD` (trả lời OQ-translation-010; không phủ nhận KB-016 vì KB-016 là sub-scope Product base name) |
| `CLAIM-07` | Nhãn "Select a color" của photo layer nằm ngoài dictionary → hiện chữ gốc, không rỗng (cả inline và API path, cả vi/zh-TW/en, cả cart modal) | storefront | `test_case` — TC-TIB-021 PASS | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-08` | Khi trang render cả hai khối teeinblue (extension + script theme), dictionary chỉ in 1 lần trong HTML (`window.teeinblueShopTranslations` xuất hiện 1 lần) | storefront | `test_case` — TC-TIB-017 PASS (kết luận "có 2 khối" là suy luận từ dấu hiệu HTML) | sdk/storefront-buyer-facing | `ADD` |
| `CLAIM-09` | Hành vi dev nêu nhưng **chưa verify**: API trả đúng dictionary cho locale mã vùng viết hoa (trước đây 404); xoá locale (lẻ/bulk) → Shopify translation cập nhật; đổi primary language → đồng bộ lại; embed không đổi (có gọi API, không có version); "bug đã biết không sửa": so khớp hoa/thường metafield, shop inactive không tự sync lại | portal, storefront, api | `KHÔNG CÓ NGUỒN` — chỉ có comment dev, chưa có test PASS | translation/dynamic-translations, translation/language-locale-switcher | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | `translation` | `MỚI: storefront-translation-delivery` | buyer (guest) | storefront, api | KB-017 |
| `CLAIM-02` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | không có |
| `CLAIM-03` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | không có |
| `CLAIM-04` | `translation` | `dynamic-translations` | owner (Portal) + buyer (guest) | portal, storefront | không có |
| `CLAIM-05` | `translation` | `MỚI: storefront-translation-delivery` | buyer (guest; endpoint public) | api | KB-017 |
| `CLAIM-06` | `translation` | `dynamic-translations` | buyer (guest) | storefront | KB-016 (liên quan, không phủ nhận) |
| `CLAIM-07` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | không có |
| `CLAIM-08` | `sdk` | `storefront-buyer-facing` | buyer (guest) | storefront | không có |
| `CLAIM-09` | `translation` | `MỚI: storefront-translation-delivery` | owner (Portal) + buyer (guest) | portal, storefront, api | không có |

- Không claim nào ghi `SUPERSEDES`; teeinblue không bật ghi đè canon (phụ lục §1) nên `CONTRADICTS` giữ cả hai phía.
- Các item đề xuất tên `MỚI:` chỉ là gợi ý, agent xử lý CCR quyết định cuối.

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** Jira https://ownego.atlassian.net/browse/TIB-5352 · Testlane task `TIB-162` · campaign 2740 (artwork 4630), 2746 (cross-sell), 2747 (addon) trên staging · storefront `https://linh-tib-staging.myshopify.com/vi-vn/products/tib-5352-uid-optimize-translation-loading-to-improve-inp-performance-by-using-api-instead-of-liquid-rendering` · `/zh-zh/` cho locale zh-TW · API `https://staging-api.teeinblue.com/api/merchant/translations/<locale>.json?shop=linh-tib-staging.myshopify.com&v=<version>` · portal `/artwork-translations`.
- **Trạng thái đối tượng lúc đó:** campaign 2740 published; từ điển `vi` ở các mốc 1249 / 1000 / 999 / 995 key (đã đổi trong lúc test, hiện 995 non-empty), `zh-TW` 50 key, `en` 18 key (primary).
- **Environment:** staging (`linh-tib-staging.myshopify.com`, non-Plus).
- **Role liên quan:** buyer guest trên storefront; owner trên Portal (Dynamic Translations).
- **Surface:** `portal`, `storefront`, `api`.

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

**TIB-5352**

- **Build / version / ngày deploy:** SDK staging `app-v1.js` Last-Modified `Tue, 06 Oct 2026 07:59:53 GMT` (1687036 ký tự, bản chạy TC-001/005/008/011/012/017/021/027/029 vào 2026-10-06) và `Wed, 07 Oct 2026 08:36:29 GMT` (1698047 ký tự, bản chạy TC-002/003/007 rerun/008 rerun/009/010 vào 2026-10-07; bản này mới có logic retry lazy). Build API: không rõ. Deploy theo thứ tự SDK → API: không rõ, dev nói bắt buộc.
- **Ngày resolve/update cuối:** 2026-10-01 (updated). Chưa resolve.
- **Đã ship chưa:** chưa — Status "QA Review", 3 PR OPEN (cập nhật 2026-10-01); **đã deploy lên staging** (xác nhận bằng bundle chứa `translation_version`). Chưa có thông tin lên production. → claim vào KB dưới dạng hành vi staging/đề xuất, không đụng canon hiện tại.

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: `translation` v1 (published 2026-09-21, ZERO_DOC_BOOTSTRAP), `sdk` v5 (2026-09-28).
- Canon hiện nói:
  - KB-017 (translation/dynamic-translations): "Khi kiểm tra toàn bộ network traffic tới các domain của teeinblue (staging-api, staging-sdk, cdn) trên cả 2 lần load trang sản phẩm (en và vi), quan sát thấy chỉ có GET /api/merchant/campaigns/{productId}.json và GET /api/merchant/shopify/thumbmark cùng 2 script SDK bootstrap — KHÔNG có endpoint nào dạng 'get translations for locale X' riêng biệt trên storefront, trong ~340 request/lần load."
  - KB-016: "...chuỗi 'Vertical Framed Poster' vẫn hiển thị tiếng Anh nguyên bản... bản dịch tiếng Việt không xuất hiện ở đâu trên trang..." (sub-scope Product base name, UNRESOLVED/LOW).
  - OQ-translation-010 (NEEDS_CONFIRMATION): "Dynamic Translations sub-scope 'Option Title trong personalization form' có propagate ra storefront hay không... — chưa có campaign nào có Option Title tự do được test (checklist ref: CHK-009)."
  - CHK-009: Option Title sub-scope "CHƯA test".
  - Không tìm thấy statement nào trong `sdk` v5 nói về translation (0 kết quả cho "translat").
- Đã tra bằng từ khoá: `teeinblueShopTranslations`, `translation_version`, `translations/`, `liquid`, `1000`, `inline`, `nhúng`, `api/merchant`, `storefront`, `propagat`, `Option Title`, `locale`; trong `translation/feature-summary.md`, `translation/kb.json`, `translation/features/*/kb.json`, `translation/features/*/profile.json`, `translation/checklists/*.json`, `translation/open-questions.md`, `sdk/kb.json`, `sdk/feature-summary.md`.
- Lưu ý: `knowledge/` chỉ tra được bản local trong `teeinblue-context-builder`; chưa kiểm tra có bản mới hơn trên remote hay không.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

- Ai xác nhận: **Dev** (comment tự viết trong ticket) + **test case đã PASS** do QA chạy. **Không có PO/spec** xác nhận.
- Ở đâu, ngày nào: comment id 52985 của [REDACTED] ngày 2026-10-01 (vai trò của [REDACTED] là reporter của ticket, Jira không ghi rõ vai trò); test case PASS ngày 2026-10-06/07 trên staging (build ở Phần 3).
- Họ xác nhận chính xác điều gì (trích nguyên văn):
  > "Nếu API translation lỗi hoặc quá 5 giây chưa phản hồi thì widget vẫn hiện, nhưng ở chữ gốc. SDK chỉ thử lại đúng 1 lần."
  > "Ngưỡng tính theo số key chứ không theo dung lượng, nên 999 key dài vẫn được nhúng thẳng vào trang."
  > "Shop dưới ngưỡng không phát sinh request translation nào trong tab Network. Đó là đúng thiết kế."

Comment kỹ thuật này **không phải** PO/business sign-off. Vì vậy các claim chỉ dựa vào comment (CLAIM-03, 05, 09) ghi `KHÔNG CÓ NGUỒN`.

## 4.2 KHÔNG đề xuất điều gì?

```
- KHÔNG coi con số 1000 là hằng số cố định: dev nói chỉnh được qua env var; chưa biết tên biến và giá trị trên production.
- KHÔNG coi "retry đúng 1 lần" là xác nhận: staging quan sát retry lazy, chỉ ở lần gọi thứ hai trong cùng page session,
  không retry khi load trang; chưa có Dev xác nhận đó là thiết kế mong muốn.
- KHÔNG coi locale lạ trả 200 + dictionary primary (xx-YY, pt-BR/zh-CN chưa publish) là hành vi đúng; chỉ là quan sát.
- KHÔNG coi pageerror "signal is aborted without reason" là hành vi mong muốn.
- KHÔNG đề xuất kết quả đo INP hay kích thước HTML: chưa có baseline trước fix, chưa đo INP;
  số quan sát (HTML /vi-vn/ 288808 byte, translations/vi.json 62140 byte gzip) chỉ là số liệu tại thời điểm test.
- KHÔNG dùng tên object_key/feature_key `MỚI:` ở Phần 1b làm đã duyệt.
- KHÔNG coi CLAIM-09 (regional locale, xoá locale, đổi primary language, embed) là đã xác nhận: chưa có test PASS.
- KHÔNG đề xuất đóng OQ-translation-001/010 dựa trên claim này khi chưa có xác nhận thẩm quyền ngoài test.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
Với mỗi locale của shop, storefront chọn cách giao dictionary Dynamic Translations theo số key đã dịch có value không rỗng:
0 key → hiện chữ gốc; từ 1 đến 999 key → dictionary nhúng trong HTML (window.teeinblueShopTranslations), không gọi API;
từ 1000 key trở lên → HTML chỉ có translation_version và SDK gọi GET /api/merchant/translations/<locale>.json?shop=<domain>&v=<version>.
Khi API lỗi hoặc quá 5 giây, widget vẫn hiện bằng chữ gốc; retry chỉ quan sát thấy ở lần gọi kế tiếp trong cùng page session,
không khi load trang (chờ Dev xác nhận thiết kế). Mỗi lần lưu bản dịch ở Portal tạo translation_version mới, HTML storefront nhận sau khoảng 30–70 giây.
```

## 4.4 Mức độ gấp `[BẠN]`

**MEDIUM** (đề xuất, BẠN duyệt) — ảnh hưởng coverage của translation/SDK, chưa chặn test P0/P1; chưa thấy checklist/automation đang publish chạy sai (CHK-008/009/010 hiện chưa có expected).

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim

### CLAIM-01

- **Loại nguồn:** `test_case`
- **Locator:** Testlane TIB-162 — TC-TIB-001 (TC-TIB-4690), 002 (4691), 003 (4692), 009 (4698), 011 (4700)
- **Link:** https://ownego.atlassian.net/browse/TIB-5352 (ticket); test case trên Testlane task TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-06 (TC-001, TC-011) và 2026-10-07 (TC-002, 003, 009)
- **Người viết / người xác nhận:** QA ([REDACTED]) chạy; dev [REDACTED] mô tả hành vi
- **Trích nguyên văn:**
  ```
  TC-001 actualResult: Raw HTML ... window.teeinblueShopTranslations = { ...{"translation_version":"1791272596858"}, }, chỉ có version hash, không có dictionary. Chuỗi "QA5352" xuất hiện 0 lần trong HTML. ... SDK gọi GET https://staging-api.teeinblue.com/api/merchant/translations/vi.json?shop=linh-tib-staging.myshopify.com&v=1791272596858 (200)
  TC-002 (vi=1000 key): HTML chỉ có translation_version, SDK gọi translations/vi.json 1 lần.
  TC-003 (vi=999 key): window.teeinblueShopTranslations trong HTML chứa dictionary đầy đủ, 999 key; 0 request tới translations/vi.json.
  TC-009 (1000 key, 5 key rỗng): API trả 995 key; dictionary inline 995 key; 0 request.
  TC-011: /vi-vn/ (1249 key) gọi API; /zh-zh/ (zh-TW 50 key) có 50 key nhúng sẵn, 0 request translations.
  Dev ([REDACTED], 2026-10-01): "Số key đã dịch của một ngôn ngữ ... 999: Từ điển nhúng thẳng trong trang, không gọi API; 1000 trở lên: Chỉ có mã phiên bản, SDK gọi API translations/<locale>.json?v=..."
  ```
- **File đính kèm cho claim này:** không có (ảnh lưu local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/04-tc011-zh-zh.png`)

### CLAIM-02

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-008 (TC-TIB-4697); quan sát bổ sung ở TC-TIB-007 (TC-TIB-4696)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-07 (chạy lại trên bundle `Wed, 07 Oct 2026 08:36:29 GMT`; lần đầu 2026-10-06 cùng kết quả)
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-008 actualResult: Request translations/vi.json phát ra ~0.7–0.9s sau goto. Mốc 3s: widget chưa có label QA5352. Mốc 6s đến 18–20s: widget hiện text gốc 'QA5352 Your name', 'QA5352 Enter name', 'QA5352 Your photo' (khớp timeout 5s). ... 1 pageerror: "signal is aborted without reason" (AbortController 5s ...). Trang/widget vẫn hoạt động, không crash.
  TC-007 actualResult: mock 500 → 1 request (~0.9s); mock 503 → 1 request; network abort → 1 request. Widget render text gốc cả 3 lần.
  Code bundle: J1=(e,t,i)=>Bo(`merchant/translations/${t}.json?shop=${e}...`,{headersTimeout:5e3}).catch(()=>null)
  ```
- **File đính kèm cho claim này:** không có (local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/02-tc008-delay8s.png`, `05-tc007-cart-modal-api500.png`)

### CLAIM-03

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-007 (TC-TIB-4696, FAILED vs expected "exactly 1 retry (2 requests total)" khi load trang); đọc bundle `app-v1.js` Last-Modified `Wed, 07 Oct 2026 08:36:29 GMT`; comment dev id 52985
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** không rõ (nguồn là quan sát/đọc bundle chứ không phải tài liệu dev; comment dev ngày 2026-10-01 không nêu điều kiện retry)
- **Người viết / người xác nhận:** QA quan sát; Dev chưa xác nhận thiết kế
- **Trích nguyên văn:**
  ```
  Dev: "SDK chỉ thử lại đúng 1 lần."
  Bundle: hp=new Map,pT=new Map,mK=2;
  function lu(e,t){...const o=`${e}|${t}`;if(!hp.has(o)){const r=J1(e,t,i.version).catch(()=>null).then(n=>{if(n===null){const s=(pT.get(o)||0)+1;pT.set(o,s),s<mK&&hp.delete(o)}return S1(n)});hp.set(o,r)}return hp.get(o)}
  TC-007 actualResult: Cart /vi-vn/cart với API mock 500, bấm 'Edit design' 3 lần: sau lần 1: 1 request tổng; sau lần 2: 2; sau lần 3: vẫn 2. Một lần load trang chỉ có 1 request.
  ```
- **File đính kèm cho claim này:** không có (local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/05-tc007-cart-modal-api500.png`)

### CLAIM-04

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-010 (TC-TIB-4699)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-07
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-010 actualResult: Sửa value 'QA5352 Tên của bạn' → 'QA5352 Tên của bạn 2', Save ('saved'). API ngay sau Save: 1249 key, 'QA5352 Your name' = 'QA5352 Tên của bạn 2'. zh-TW vẫn 50, en vẫn 18. translation_version trong HTML: trước Save 1791281411496; HTML vẫn là 1791281411496 trong khoảng 30–45 giây, rồi đổi thành 1791365334318 ... Sau khi version đổi: SDK gọi translations/vi.json?…&v=1791365334318, widget hiện 'QA5352 Tên của bạn 2'.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-05

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** TC-TIB-024 (TC-TIB-4713), TC-TIB-027 (TC-TIB-4716), TC-TIB-013/014 (TC-TIB-4702/4703, phần API trực tiếp)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** không rõ (nguồn là quan sát chưa có xác nhận PO/Dev; chạy 2026-10-06/07)
- **Người viết / người xác nhận:** QA quan sát; Dev chưa xác nhận
- **Trích nguyên văn:**
  ```
  TC-027: v hiện tại, v=1, v rác, v 500 chữ số: đều 200, 1249 key, cache-control 'immutable, max-age=31536000, private'. Thiếu v và v rỗng: 200, 1249 key, cache-control 'max-age=900, private'.
  TC-024: translations/xx-YY.json → 200 application/json, 18 key (dictionary primary 'Acrylic Paw Ornament' → 'Acrylic Paw Ornament - en'); ..%2f..%2fx.json → 404; %3Cscript%3E.json → 403 (Cloudflare); locale 300 ký tự → 404; %00 → 400. Không thấy stack trace.
  TC-013: GET translations/zh-TW.json → 200, 50 key; translations/zh-tw.json → 200, 50 key. TC-014: zh-CN.json và pt-BR.json (chưa publish) → 200, 18 key primary.
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-001 (4690), 005 (4694), 011 (4700), 012 (4701)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-06
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-005: Modal hiển thị label/placeholder đã dịch: 'QA5352 Tên của bạn', 'QA5352 Nhập tên', 'QA5352 Ảnh của bạn'. Label 'Select a color' giữ chữ gốc.
  TC-012: en: 'QA5352 Your name', 'QA5352 Enter name', 'QA5352 Your photo'; vi: 'QA5352 Tên của bạn', 'QA5352 Nhập tên', 'QA5352 Ảnh của bạn'; zh-TW: placeholder 'QA5352 請輸入名字'. Không thấy label lẫn ngôn ngữ giữa các lần chuyển.
  ```
- **File đính kèm cho claim này:** không có (local: `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/03-tc005-cart-modal.png`)

### CLAIM-07

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-021 (TC-TIB-4710)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-06
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-021: API dictionary vi (1249 key), zh-TW (50 key) và en (18 key) đều không chứa chuỗi 'Select a color'. Storefront /vi-vn/ (API path), /zh-zh/ (inline path), /en-vn/: label hiển thị 'Select a color' (chữ gốc), không rỗng. Cart edit modal vi (TC-005) cũng 'Select a color'.
  Dev ([REDACTED]): "Nhãn "Select a color" của photo layer: nếu từ điển có nhưng thiếu đúng chuỗi này thì trước đây nhãn trống, giờ hiện chữ gốc."
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-08

- **Loại nguồn:** `test_case`
- **Locator:** TC-TIB-017 (TC-TIB-4706)
- **Link:** task Testlane TIB-162
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-06
- **Người viết / người xác nhận:** QA ([REDACTED])
- **Trích nguyên văn:**
  ```
  TC-017 actualResult: /zh-zh/ (zh-TW, 50 key), raw HTML: window.teeinblueShopTranslations = xuất hiện đúng 1 lần; key 'QA5352 Your name' xuất hiện 1 lần trong HTML. Có 2 lần window.teeinblueShop =, có khối app embed 'product-personalizer' của extension, và 4 cụm comment 'teeinblue scripts' ... Đây là dấu hiệu 2 khối teeinblue cùng được render (kết luận ... là suy luận ..., tôi không mở theme editor để xác nhận cấu hình 'enable for all pages').
  ```
- **File đính kèm cho claim này:** không có

### CLAIM-09

- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Locator:** comment dev id 52985 (mục "Lỗi sửa kèm" và "Không phải bug, cố ý như vậy"); TC-TIB-013, 018, 019, 020, 022 blocked
- **Link:** https://ownego.atlassian.net/browse/TIB-5352
- **Ngày của nguồn (YYYY-MM-DD):** không rõ (nguồn chưa đủ mạnh; comment dev ngày 2026-10-01)
- **Người viết / người xác nhận:** Dev ([REDACTED]) tự mô tả; QA chưa verify
- **Trích nguyên văn:**
  ```
  "Ngôn ngữ có mã vùng viết hoa (pt-BR, zh-CN): trước API trả 404 → giờ trả đúng từ điển. Nếu ngôn ngữ đó chưa có bản dịch thì trả từ điển của ngôn ngữ chính."
  "Xoá một ngôn ngữ dịch (xoá lẻ hoặc lưu hàng loạt) → bản dịch trên Shopify giờ được cập nhật lại."
  "Đổi ngôn ngữ chính của shop → bản dịch trên storefront đồng bộ lại theo ngôn ngữ mới."
  "Embed (ngoài Shopify): vẫn gọi API như cũ, không có mã phiên bản."
  "So khớp hoa/thường của mã ngôn ngữ khi ghi metafield chưa sửa, lỗi này có từ trước."
  "Shop inactive hoặc thiếu quyền đọc ngôn ngữ thì không tự đồng bộ lại khi hoạt động trở lại."
  ```
- **File đính kèm cho claim này:** không có

## 5.2 Evidence chung, không thuộc claim nào `[AGENT]`

- Jira TIB-5352: https://ownego.atlassian.net/browse/TIB-5352 (đã đọc description + comment id 52985 ngày 2026-10-01).
- Testlane task TIB-162 (29 test case TC-TIB-001..029, Testlane TC-TIB-4690..4718).
- Ảnh local (không đính kèm): `[REDACTED]/Documents/work/teeinblue-manual/evidence/TIB-5352/` (02, 03, 04, 05, 06).
- Phát hiện phụ (không phải claim): từ điển `vi` từng bị lệch khi dựng test data (Save ở một locale nghi ghi đè locale khác; đã xử lý, không có xác nhận nguyên nhân) — **chưa** coi là hành vi sản phẩm, chỉ ghi để agent không tin tuyệt đối dữ liệu `vi` ở các lần test đầu.
- Đã loại bỏ: customization id, tài khoản, mật khẩu storefront; chỉ giữ tên store test và URL staging.

---

# Tự kiểm trước khi gửi

`[BẠN]`:

- [ ] Đây thật sự là **một** thứ được gỡ độc lập, và mọi claim thuộc **cùng một product** (Phần 0)
- [ ] Đã trả lời 4.1 trung thực — kể cả khi câu trả lời là "không ai, chỉ là comment dev"
- [ ] Đã điền 4.2 (KHÔNG đề xuất điều gì)
- [ ] Đã chọn mức độ gấp (4.4)
- [ ] Evidence đã bỏ PII/token/credential

`[AGENT]`:

- [x] Số lần xác nhận trực tiếp là con số thật (13 PASS / 1 FAIL / 15 blocked)
- [x] Đã ghi build/ngày resolve hoặc thừa nhận "không rõ" cho từng ticket
- [x] Đã ghi rõ từ khoá đã tra canon
- [x] Mỗi claim có đúng 1 dòng ở Phần 1a, với `Claim ID` duy nhất (CLAIM-01..09)
- [x] Mỗi `Claim ID` có đúng 1 block ở Phần 5.1
- [x] Mỗi `Claim ID` có dòng tương ứng ở Phần 1b
- [x] Cột "Nguồn & độ mạnh" ghi đúng 1 trong 5 trạng thái, kèm trích dẫn cụ thể khi không phải `KHÔNG CÓ NGUỒN`
- [x] Claim `test_case` đều có ngày nguồn cụ thể ở 5.1
- [x] Không còn placeholder sót lại trong file
