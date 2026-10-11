# Decision log

Ghi lại **quyết định** và **lý do**, không phải mô tả hiện trạng (hiện trạng ở `contracts/` và `README.md`). Mục 6 giữ các vi phạm tồn đọng đã biết (Known debt) — contract chỉ nói luật, không đếm vi phạm. Đọc file này khi bạn định đổi một luật và muốn biết nó được đặt ra để chặn cái gì.

Mỗi quyết định ghi: ai quyết · quyết gì · vì sao · hệ quả phải chấp nhận.

Phiên làm việc gốc: **2026-09-30 → 2026-10-02**, mở rộng repo từ "context builder cho riêng teeinblue" thành "một repo, N product, hai đường sinh knowledge (explore-first và doc-first)".

---

## 1. Chủ repo quyết

### 1.1 Một repo, N product-key — không clone mỗi product một repo

Trước đó contract §12.1 nói *"mỗi product có repo/context-builder agent riêng"*. Bỏ. Tập product = `config/products/*.json` có `status: "ACTIVE"`.

**Vì sao:** 12 agent definition × N repo nghĩa là mỗi lần sửa contract phải copy N lần, và chúng sẽ lệch nhau.

**Hệ quả:** mất hàng rào "repo này chỉ biết một product_id". Hàng rào mới phải là **gate tường minh** (proposal có `projectId` không khớp config nào → skip, ghi log), không phải một câu văn trong agent definition.

### 1.2 Tài liệu dev gen từ source code là nguồn thẩm quyền → `CONFIRMED_EXPECTED`

**Vì sao:** không có nó thì KB doc-first mãi là `OBSERVED_CURRENT`, tức `usable_as_oracle: false`, tức làm xong vẫn không dùng được làm expected result. teeinblue đã ở trạng thái đó: 450 item, 28 confirmed.

**Rủi ro đã nêu và chủ repo vẫn chọn:** tài liệu sinh từ code **mô tả cả bug như thể đúng**. Hướng thiệt hại ngược với thiếu knowledge — test fail khi sản phẩm đang chạy đúng, rồi QA đi "sửa" thứ không sai.

**Bốn phanh được cài để đổi lấy quyết định này:**
- `confirmation_source.type: "dev_doc"` tách khỏi `spec_doc` → grep ra được về sau item nào dựa vào tài liệu dev
- `usable_as_oracle: "DOC_ONLY"` trong `manifest.json` khi 100% item confirmed đến từ `dev_doc`
- Gate C5 chỉ cho `oracle_strength: STRONG` khi `derivation: "prose"`; rule lấy từ code artifact bị hạ `BASELINE`
- `claim_kind: known_defect` không bao giờ lên `CONFIRMED_EXPECTED`

Xoá một trong bốn phanh này là xoá thứ duy nhất làm rủi ro trên **nhìn thấy được**.

### 1.3 CCR kèm doc/diff dev là đủ để publish — không explore lại

Gate C0.5 đổi bản chất: boolean `fastpath` → thang độ mạnh `S3`/`S1`/`S0` (§12.3a).

**Hệ quả quan trọng:** claim `S1` (chỉ có ảnh/capture người gửi tự chụp) **vẫn được nạp** vào KB dưới dạng `OBSERVED_CURRENT`/`LOW` + open question, **không explore**. Trước đó luật là "phải explore lại". Đổi vì product doc-first không có môi trường nào để explore.

### 1.4 CCR thắng nếu nguồn mạnh hơn — §12.5 supersede

Thay §12.4 rule 1 (*"không bao giờ tự resolve conflict"*) **chỉ** cho product có `supersede_policy.enabled: true`. teeinblue giữ luật cũ.

**Rủi ro:** cả đường ghi đè canon treo trên `confirmation_source.authored_on` — một chuỗi ngày do người gửi gõ. Gõ sai, hoặc lấy `resolutiondate` của ticket thay cho ngày tài liệu, là đủ để đảo chiều supersede, **im lặng**, và theo hướng "CCR thắng".

**Chống đỡ:** 6 blocker ở §12.5 STEP 6 · reviewer phải resolve `ref` và đọc ngày **từ nguồn**, không từ CCR · không resolve được → `CONDITIONAL_PASS`, tuyệt đối không PASS im lặng · CHANGELOG phải trích nguyên văn statement cũ.

### 1.5 Pilot doc-first = `qikfiliate`

Fact riêng của qikfiliate (brand instance, bộ tài liệu v1, admin không phân vai) nằm ở `config/products/qikfiliate.json` → `doc_input`; các mục 1.7–1.9 dưới đây chỉ giữ phần lý do.

### 1.6 teeinblue để nguyên — không backfill, không chạy lại bootstrap

**Ngoại lệ đã dùng:** sửa hygiene (quyết định 2.3, 2.10) — đổi `ccr_ref`, bỏ link chết. Đó là sửa **con trỏ**, không sửa nội dung knowledge.

### 1.7 Qikfiliate là hệ thống dùng chung — chỉ MỘT KB

Qikfiliate phục vụ nhiều brand; `koin-partners` (brand Koin, client app `mysbox`) là **một instance** có portal/admin riêng nhưng feature cốt lõi giống nhau.

**Vấn đề phát sinh từ đây:** bộ tài liệu được viết **từ instance koin-partners**, nên có claim chỉ đúng cho Koin. Tài liệu tự thừa nhận: *"form này từng dùng chung cho nhiều brand (Qikify, Teeinblue) trước khi repo được tách riêng chỉ phục vụ Koin"*. Đã xác định ≥5 vùng: khảo sát signup 4 câu, template email Brevo, `config('admin.affiliate_reward.koin')`, literal `koin` trong blocklist regex `ref`, ghi chú lịch sử form.

→ sinh ra `scope.brand` (quyết định 2.12).

### 1.8 Bộ tài liệu = `v1`, `generated_at: 2026-08-20`, không có commit sha

**Hệ quả phải biết:** không có sha thì `authored_on` của **mọi** claim đều là 2026-08-20. Theo §12.5, KB sinh từ bộ này **supersede được bởi CCR mới hơn, nhưng không bao giờ supersede ngược lại cái gì**. Chấp nhận được cho bootstrap lần đầu; lần gen sau xin dev kèm sha.

### 1.9 Admin panel không phân vai ops — mọi admin quyền như nhau

Ghi vào `config/products/qikfiliate.json` → `doc_input.confirmed_facts[]` dạng `po_dev_confirm`.

**Điểm yếu:** `ref` là *"chủ repo xác nhận trực tiếp trong phiên làm việc 2026-09-30"* — không có link bền vững. Nên neo lại bằng một comment/ticket, nếu không reviewer sẽ trả `CONDITIONAL_PASS` cho mọi item dựa vào nó.

### 1.10 `knowledge/` phải tự chứa hoàn toàn

Mạnh hơn §5a cũ (chỉ cấm trỏ `runs/`): tài liệu dev, file CCR, Proposal, `runs/`, `docs-input/` **đều xoá được** mà `knowledge/` vẫn dùng được.

**Hệ quả thiết kế:** `confirmation_source.ref` phải là **câu trích dẫn tự mô tả**, không phải con trỏ phân giải được. Và **phần trích nguyên văn trong CCR** trở thành thứ duy nhất sống sót — một claim chỉ có link mà không có quote sẽ thành provenance rỗng ngay khi nguồn bị dọn.

---

## 2. Quyết định kỹ thuật (tôi quyết, chủ repo uỷ quyền)

### 2.1 `SEC-ID` → `DSEC-ID` cho doc section

Tôi đặt `SEC-ID` ở bản đầu, rồi phát hiện **`SEC-<nnn>` đã dùng sẵn với nghĩa "security finding"**: 22 file dưới `knowledge/`, 40 dưới `runs/`. Đổi sang `DSEC-` (doc section).

**Vì sao không giữ:** trùng namespace làm mọi audit grep sau này vừa false-positive vừa **che leak thật**. Đã xảy ra: 19 false positive khi test.

**Luật rút ra, đã ghi vào §4:** đặt thêm ID mới thì grep cả `knowledge/` và `runs/` trước.

### 2.2 `CCR_INGEST` là mode mới, không sửa tiêu chí `INCREMENTAL_UPDATE`

**Vì sao, 3 lý do cứng:**
1. `mode` được ghi vào `publish-meta.json` và là **thứ duy nhất** consumer thấy để biết version đó sinh ra thế nào. `artwork/publish-meta.json` hiện là `INCREMENTAL_UPDATE` với nghĩa "đã explore hẹp, có quan sát thật" — đổi tiêu chí làm mọi version cũ đổi nghĩa **hồi tố**.
2. Gate applicability đối nghịch: `INCREMENTAL_UPDATE` vẫn PHẢI FAIL C1/C2 khi thiếu ACT-ID; `CCR_INGEST` phải `NOT_APPLICABLE`. Một mode không mang được hai luật ngược nhau.
3. Supersede chỉ được phép ở mode doc-based.

### 2.3 `ccr_ref` cho item bootstrap = `"bootstrap"`, không `"bootstrap:<object>-v1"`

Ban đầu tôi nghiêng phương án có version. Đổi ý: **`-v1` là thông tin tôi tự bịa** — không map được tin cậy run → `published_context_version`.

**Vì sao `"bootstrap"` đủ:** `last_updated.date` đã phân biệt các đợt khác ngày (artwork: 2026-09-10 vs 2026-09-21). Chỉ 3 run **cùng ngày** bị gộp, mà đó đúng là một đợt bootstrap trong một ngày. "Item này đến từ run nào" **chính là** cơ chế nội bộ không được publish — mất nó là đúng.

Bịa dữ liệu để giữ một phân biệt vốn thuộc `runs/` thì tệ hơn là mất nó.

→ §5a khai đúng **3 quy ước**: mã CCR · `bootstrap` · `user-annotation`.

### 2.4 Product mới bắt đầu ở `status: "ONBOARDING"`

**Vì sao:** khi `qa_hub.project_id` còn placeholder, để `ACTIVE` sẽ khiến orchestrator gọi QA Hub bằng chuỗi `<<< ĐIỀN >>>`; và `CCR_INGEST` đòi có base version nên chưa có gì để nhặt. Chuyển `ACTIVE` sau bootstrap đầu tiên. (qikfiliate đi đúng đường này và đã `ACTIVE` từ 2026-10-05; `_template.json` mặc định `ONBOARDING`.)

### 2.5 `confirmation_source`: publish `authored_on`, KHÔNG publish `quote`

**`authored_on` phải có:** không có nó, supersede của CCR *lần sau* không có gì để so và rơi về `last_updated.date` = **ngày publish**. Một doc viết 2026-08-01 publish 2026-09-28 sẽ trông "mới hơn" doc viết 2026-09-15. Lỗi im lặng, **hướng sai**, làm supersede đảo chiều.

**`quote` không publish, 2 lý do:** (a) `knowledge/` nói sự thật hiện tại, không nói quá trình; (b) thực dụng — quote từ doc dev có thể chứa `act_id`, `gate`, hay đường `runs/context` và sẽ trip `FORBIDDEN_PATTERNS` ở một chỗ hoàn toàn vô tội.

### 2.6 `FORBIDDEN_PATTERNS` soi dạng **key JSON**, không `\b<name>\b`

Contract §5a liệt 20+ tên; script cũ có 5. Bổ sung đủ, nhưng **không copy nguyên dạng** — đã xác minh trên dữ liệu thật là sẽ vỡ publish ngay:

- `\bgate\b` → **62 hit** chữ "gate" trong `knowledge/`, trong đó đang publish: `_registry.json` *"password gate"*, `order/.../profile.json` *"should gate regression test design"*, `artwork/open-questions.md` *"bị gate bởi"*.
- `ent_id` không word-bounded → trúng `fulfillment_id`/`parent_id`, **12 hit** trong `product-base/**`.

→ tên field chỉ soi `"<name>":` và chỉ trong `.json`. Đường dẫn soi cả `.json` lẫn `.md`.

**Luật rút ra:** cách grep quan trọng ngang nội dung grep. Danh sách giờ nằm ở `contracts/forbidden-fields.json`, dùng chung cho `publish-knowledge.mjs` và `scripts/ctx/audit-preview.mjs` (xem 2.18) — reviewer không tự dựng danh sách riêng, và cũng không chạy `publish-knowledge.mjs` cho C6 vì script đó ghi manifest vào `knowledge/`.

### 2.7 Check mới mặc định WARN, không blocking

`PUBLISH_STRICT_IDS=1` và `PUBLISH_STRICT_SELFCONTAINED=1` để bật blocking.

**Vì sao:** biến thành blocking ngay sẽ chặn publish cả 9 object teeinblue cho tới khi ai đó sửa nội dung knowledge — đó là quyết định của chủ repo, không phải hệ quả phụ của việc tôi thêm gate. **Luôn đo trước khi siết.**

(Sau khi lớp 1–3 đã dọn, `PUBLISH_STRICT_SELFCONTAINED=1` bật được an toàn — không còn vi phạm.)

### 2.8 Một khuôn CCR (ở skill) + một phụ lục (ở repo)

**Bug gốc:** skill `create-ccr` tìm khuôn ở `contracts/context-change-request.template.md`, nhưng QA member nhận nó ở `how-to-request/` trong bản clone. Nên khi skill chạy ở repo consumer — **đúng nơi duy nhất member có template** — nó không tìm thấy và **âm thầm** rơi về bản bundled.

→ khuôn đầy đủ **chỉ** ở `~/.claude/skills/create-ccr/references/ccr-template.md`; repo giữ `contracts/ccr-product-appendix.md`. Xoá `contracts/context-change-request.template.{md,json}`.

**Ràng buộc cứng đi kèm:** tên mục trong khuôn **không được đổi** — §12.3/§12.3a bắt orchestrator đọc theo đúng tên mục và trả `NEEDS_INFO` nêu đúng tên mục. Hai khuôn song song đã lệch tên (*"Phần 4 — Hai câu chỉ **con người** trả lời được"* vs *"...chỉ **bạn** trả lời được"*), làm lời `NEEDS_INFO` trỏ vào mục không tồn tại.

Và **fallback không được im lặng**: skill phải nói ra nó dùng khuôn nào, phụ lục nào, tìm thấy ở đâu.

### 2.9 `known_defect` chặn ở cả 3 tầng

`doc-ingest-explorer` gán `claim_kind: known_defect` → `qa-knowledge-normalizer` ép `OBSERVED_CURRENT` + `status: KNOWN_DEFECT` → Gate C5 cấm dùng làm oracle.

**Vì sao 3 tầng:** chặn một tầng là đủ để lọt. Nhận nhầm một defect đã biết thành `capability` nghĩa là biến bug thành oracle mà daily agent sẽ đi **bảo vệ** — cách hỏng tệ nhất của cả mode doc. Bộ tài liệu qikfiliate có 15 defect loại này.

### 2.10 Lớp 3 (tên file trần): phân loại từng chỗ, không xoá hàng loạt

24 tên, **giữ 13** vì không phải vi phạm: `file.png` (input của scenario), `cart.json` (endpoint Shopify), `cities.json` (CDN của sản phẩm), và 4 checklist **có thật trong gói publish**. Chỉ 11 là vi phạm.

**Vì sao không xoá hàng loạt:** regex đường dẫn của tôi lúc đầu bắt cả từ vựng sản phẩm (`products/need_sync`, `review/cart`, `input/string/time`). Xoá nhầm là mất thông tin thật.

**Nguyên tắc sửa:** bỏ con trỏ, **giữ nội dung**. Không chỗ nào bị xoá thông tin — `escalate vào knowledge/_open-issues/security.md mục 3` → `mở open question OQ-asset-category-020` (id có thật trong gói publish).

### 2.11 Gate `C1-DOC`/`C2-DOC` là gate ID riêng; C3/C4/C5 là nhánh trong gate

C1/C2 có tiêu chí **rời nhau 100%** (before/after state + network classification vs verify quote). Một gate ID mang 2 thân khác nhau làm `gate-results.json` mất tự-mô-tả — thấy `C1-DOC` trong verdict là biết ngay "run doc-only". C3 chia sẻ 5/6 tiêu chí nên tách là nhân bản, sửa 1 tiêu chí phải sửa 2 chỗ.

### 2.12 Thêm `scope.brand` vào §5a

Optional, `null` = core. **Vì sao cần:** một product phục vụ nhiều brand trên cùng codebase, và bộ tài liệu được viết từ **một instance**. Không có field này thì hành vi chỉ có ở một brand sẽ publish như oracle cốt lõi, và QA của brand khác test một thứ không tồn tại bên họ — **loại sai mà `usable_as_oracle` không bắt được**, vì item đó vẫn `CONFIRMED_EXPECTED` hợp lệ.

### 2.13 Hợp nhất 2 parser `open-questions.md` về bản brace-balanced

`ops-board` parse brace-balanced, `generate-manifest` đòi fence ```` ```json ````. Một entry không fence sẽ **hiện trên board nhưng mất khỏi** `consolidated-open-questions.md` — tức mất khỏi bản gửi PO/Dev. Chọn bản rộng hơn làm `scripts/lib/open-questions.mjs`; §5a vẫn **yêu cầu người ghi dùng fence** (parser rộng là lưới an toàn, không phải giấy phép viết lỏng).

May là 319/319 entry hiện tại đều fence đúng — lệch chưa gây mất dữ liệu, nhưng là bẫy.

### 2.14 `resolved_requests` derive từ `CHANGELOG.md`

Phương án **bị loại:** đọc-merge từ `manifest.json` cũ — làm manifest thành source of truth của chính nó, không rebuild-from-scratch được, tăng vô hạn, manifest hỏng là mất sạch.

### 2.15 Thêm tầng **product** vào §5 — optional, chưa ai dùng

`products/<key>/_product-kb.json` + `_product-summary.md`, ngang hàng `objects/`.

**Vì sao cần:** bộ tài liệu qikfiliate có mục *Key vocabulary* — *"'Customer' trong code = một SHOP, không phải khách hàng cuối"*, *"'User' = AFFILIATE/PARTNER"*, *"Payout (Shopify) ≠ Invoice (Qikfiliate)"*. Đây là knowledge mức product: nhét vào một object thì **chọn object nào?**, nhân bản vào mọi object thì vi phạm dedupe và sẽ lệch nhau sau vài lần update. Một QA đọc KB item của object `conversion` mà không biết "Customer = SHOP" sẽ hiểu sai **mọi** item có chữ customer.

**Về folder `objects/`:** bản đầu của quyết định này đề xuất thêm tầng `objects/` để tách namespace. Không làm: object nằm trực tiếp dưới `products/<key>/`, và namespace được tách bằng quy ước tiền tố `_` cho mọi file mức product (§5) — `generate-manifest.mjs` bỏ qua entry `_`-prefix nên quy ước được thực thi, không cần migrate file nào.

Để **optional** vì chưa product nào dùng; `teeinblue` không bắt buộc tạo. Nhưng `generate-manifest.mjs` đã đọc/đếm nó rồi (xem 2.16) — nếu không thì ai ghi file đó sẽ thấy nó im lặng không vào manifest.

Ba tầng giờ khai tường minh: **product** (vocabulary/actor/ranh giới) → **object** (boundary-set xuyên sub-type, hạ tầng cross-cutting, định danh) → **feature** (hành vi theo user goal).

### 2.16 `kb.json` mức object rỗng → cảnh báo, không FAIL

5/9 object (`campaign`, `global-option`, `product-base`, `sdk`, `translation`) có object-level `kb.json` = `[]`.

**Đã loại trừ:** không mất dữ liệu (tổng đúng 450 item, mọi item nằm trong feature shard) · không do phiên này gây ra (đã rỗng trong backup) · **không che lỗi dedupe** — đo chéo topic giữa các feature trong cùng object cho 0 cặp trùng ≥60% ở sdk/global-option/translation; 2 cặp ở product-base/campaign thực ra là fact **đối lập có chủ đích** (phân trang offset vs cursor).

**Nguyên nhân:** `[]` là **placeholder** để thoả yêu cầu "kb.json phải tồn tại và là mảng" của `generate-manifest.mjs`. `artwork/CHANGELOG.md` ghi rõ có bước rút trích (*"object-level kb.json (7 shared boundary/mechanism items)"*); `sdk/CHANGELOG.md` chỉ ghi *"tách kb.json theo từng feature"* — không nhắc tầng object. Khả năng cao bước rút trích **chưa từng chạy** cho 5 object này.

**Quyết định:** cảnh báo trong `issues[]`, **không** đổi `status`. Vì `[]` **hợp lệ** về nguyên tắc (object có thể thật sự không có fact dùng chung), nhưng nó không phân biệt được "đã rà, không có" với "chưa ai rà" — và sự mơ hồ đó không được im lặng. Làm bước rút trích thật là **sửa nội dung KB teeinblue**, thuộc quyết định 1.6 → chờ chủ repo.

### 2.17 `knowledge/` thành submodule `qikify-QA/qa-knowledge` (2026-10-06)

Trước đây `knowledge/` được track trong repo build, và `publish-knowledge.mjs` bắt repo build phải sạch + đã push rồi mới clone `qa-knowledge` và copy sang. Hệ quả: mỗi lần update knowledge đều kéo theo một commit ở repo build.

**Quyết định (chủ repo chọn):** tách bằng `git subtree split` (giữ lịch sử) sang `qa-knowledge`, gắn lại dưới dạng submodule cùng path `knowledge/` — agent và script không đổi path. `--push` giờ commit/tag/push trong submodule; sha repo build chỉ ghi vào commit message để tra ngược, không còn bắt buộc đã push.

**Hệ quả cần biết:** `qa-knowledge` giờ chứa cả `_open-issues/` (trước không publish). 3 file trong đó (`product-base-api.md`, `security.md`, `ui-inconsistencies.md`) còn đường dẫn `runs/context` — leak scan §5a **không** quét `_open-issues/` (giữ phạm vi cũ: `products/**`, `manifest.json`, `how-to-request/**`). Còn mở: strip các đường dẫn đó, hoặc chuyển `_open-issues/` ra khỏi repo consumer.

### 2.18 Tái cấu trúc 2026-10-11: mỗi luật một chỗ, việc tất định thành script

**Bối cảnh:** orchestrator chép lại phần lớn contract và các bản chép đã lệch nhau (C0.5 ở orchestrator và normalizer còn dùng `fastpath`/`confidence_source` sau khi contract đã đổi sang S-tier); danh sách field cấm có 5 bản; thứ tự pipeline khiến reviewer audit supersede **trước** khi supersede được áp.

**Quyết định (chủ repo duyệt):**
- Contract tách thành `qa-context-contract.md` (lõi) + `ccr-protocol.md` (§12.1–12.4) + `supersede.md` (§12.5) + `gates.md` (§12.6 + định nghĩa gate). Số mục § giữ nguyên để tham chiếu cũ vẫn đúng.
- Việc tất định chuyển thành script trong `scripts/ctx/` (run-id, lock, đóng băng doc, publish strip + áp resolution, audit preview, publish). Agent gọi script thay vì tự làm bằng prompt. Danh sách field cấm là `contracts/forbidden-fields.json`.
- Thứ tự: checklist → diff → strip (áp resolution) → reviewer → publish. Checklist không còn phụ thuộc output của diff.
- Luật producer sở hữu (phanh `derivation`, luật oracle P1/KNOWN_DEFECT, `observed_validations` rỗng ở mode doc) chuyển vào agent producer; gate C4/C5 chỉ kiểm lại. Thay cho quyết định cũ "không sửa checklist/profile builder, đặt ràng buộc ở reviewer" — cách cũ đảm bảo mọi run doc phải rework một vòng.
- Carry-forward base: ở run có base, shard của feature bị chạm = toàn bộ base + delta, vì publish copy cả file.
- Mỗi mode một bên mint `FEATURE-ID`: portal-explorer (explore), orchestrator (doc/CCR).
- Khác biệt giữa product nằm ở `config/products/<key>.json` + `config/products/<key>/explore-playbook.md`; agent product-neutral. Không tách orchestrator theo product: lifecycle (lock, strip, gate, phản hồi board) phải giống hệt nhau.
- Trigger CCR duy nhất của luồng tự động là kéo Proposal sang In Progress trên QA Hub; chạy tay qua `inputs/ccr-drafts/`.
- `qa-flow-1-context-lifecycle.md` và `qa-subagent-catalog.md` (tài liệu thiết kế ban đầu) bị xoá — contract + agent definition thay thế hoàn toàn; git giữ lịch sử.

**Hệ quả:** `publish-strip.mjs` cần `candidate/oq-assignments.json` để gắn `oq_id` vào check/unknown_area (việc gộp OQ cần phán đoán nên vẫn do orchestrator quyết). Mọi `confirmation_source` trong candidate phải có `ref.citation` (hoặc `ref.locator` dạng citation) vì strip lấy `ref` từ đó.

---

## 3. Phát hiện làm đổi thiết kế

| Phát hiện | Hệ quả |
|---|---|
| **`project_id` teeinblue trong contract/memory là SAI** — `proj-5a26d73c-...` **không tồn tại** trên production; đúng là `proj-7082bc68-...` | Filter `project_id` lâu nay trông như đang chạy nhưng không khớp gì. Giờ đọc từ config. |
| **4 tool Context Board từng không tồn tại** trên `qa-hub-production` (2026-09-30: `Unknown tool`) | Từ 2026-10-11 đã có trên `qa-hub-production` và `testlane`. Bài học: thiếu tool thì kiểm `tools/list` trước, đừng chẩn đoán thành lỗi token. |
| **`ops-board` đọc thiếu `primary_object_key`** | `CTX-20260926-01` (thực ra là object `artwork`) bị fallback dán nhãn `sdk`, rồi đọc `open-questions.md` của object khác để kết luận "done". Đã sửa: 99 OQ của artwork thay vì 49 của sdk. |
| **`confidence_source` vs `confirmation_source` lệch nhau** — reviewer audit field thứ nhất, normalizer ghi field thứ hai | Reviewer đang audit một field **producer không bao giờ ghi**. Hợp nhất, và khai enum **một chỗ duy nhất** ở §3 — việc lặp lại enum chính là nguyên nhân gốc. |
| **28 item `CONFIRMED_EXPECTED` không có `confirmation_source`** (`product-base` 21, `asset-category` 6, `global-option` 1) | Luật mới tạo ngay 28 vi phạm tồn đọng → grandfathering tường minh, `rank()` cho chúng = 2 không phải 3. |
| **`resolved_requests` bị xoá mỗi lần regenerate** | Giá trị `["CBS-005"]` là sửa tay, và thiếu CBS-003/004. Derive từ CHANGELOG ra đủ 3. |
| **Tài liệu dev nằm trên QA Hub project context**, không phải đĩa | `doc_sources[].source` phải nhận `qa-hub:project-context`. Vẫn phải tải về + đóng băng `sha256` vào `input/docs/<DOC-ID>/`. |
| **`08-known-issues-edge-cases.md` có 15 defect kèm kịch bản tái hiện** | Sinh ra `claim_kind: known_defect` (quyết định 2.9). |
| **Published knowledge trỏ vào memory riêng của operator** (`teeinblue-portal-login.md`, `teeinblue-account-scope.md` ở `~/.claude/`) | Consumer không có file đó, và việc trỏ vào còn để lộ chúng tồn tại. Đổi thành mô tả. |
| **`layer-type-config-{multiple-uploads,text-to-image}.json` không tồn tại** trong gói publish | 3 cross-ref chết mà regex đường dẫn không bắt (không có dấu `/`). |
| Mode **`KNOWLEDGE_RESTRUCTURE`** có thật trong `runs/` nhưng chưa từng khai ở §10 | Đã khai ở §10 là mode lịch sử (2026-10-11). |
| `translation` dùng quy ước `ccr_ref` thứ tư: `user-annotation:2026-09-21` | Đã chuẩn hoá thành `user-annotation`. |

---

## 4. Cố tình KHÔNG làm

- **Không thêm field vào `publish-meta.json`.** Mode là thô, `confirmation_source` mới là chính xác.
- **Không đổi enum `type` của `knowledge-diff.json`** — `review/` cũ đang dùng; thêm field `resolution` thay vì phá enum.
- **Không thêm `code_ref`** vào enum authority — code do explorer đọc là `INFERRED` theo §9.
- **Không backfill 28 item legacy ngay** — grandfather, và nên có task riêng cho `product-base` (21 item).
- **Không đổi `raw/` để chứa doc** — doc thô vào `input/docs/`, artifact vào `intermediate/doc/`. `raw/` rỗng là invariant kiểm được của doc-only run.

---

## 5. Còn mở

| Việc | Chặn bởi |
|---|---|
| Rút trích tầng object cho 5 object đang `[]` (quyết định 2.16) | Chủ repo quyết (đụng nội dung KB teeinblue) |
| Có dùng tầng product (`_product-kb.json`) hay không — tôi thêm dạng optional, chủ repo chưa duyệt | Chủ repo quyết |
| `CCR_INGEST` end-to-end qua Proposal thật | Tool đã có (2026-10-11); cần một lần chạy thật để xác nhận |
| Bật `PUBLISH_STRICT_SELFCONTAINED=1` thành blocking | An toàn ngay (0 vi phạm) — chỉ cần chủ repo đồng ý |
| Neo quyết định 1.9 (admin không phân vai) bằng comment/ticket có link | — |
| Backfill `confirmation_source` cho 28 item legacy | Quyết định của chủ repo |
| Token QA Hub đang plaintext trong `.mcp.json` ở working tree (chưa từng được commit — đã kiểm `git log` 2026-10-11) | Chuyển sang `${QA_HUB_MCP_TOKEN}` (env expansion) hoặc `claude mcp add --scope local`; chưa làm vì cần biến đó có trong env của Claude Code trước, nếu không MCP sẽ hỏng. Không commit `.mcp.json` khi còn token |

---

## 6. Known debt — vi phạm tồn đọng đã biết

Contract chỉ nói luật; các con số dưới đây là trạng thái dữ liệu tại thời điểm ghi, không phải luật.

| Ghi ngày | Vi phạm | Xử lý hiện tại |
|---|---|---|
| 2026-09-30 | 28 item `CONFIRMED_EXPECTED` trong `knowledge/products/teeinblue/` không có `confirmation_source` (`product-base` 21, `asset-category` 6, `global-option` 1) | Grandfather: luật áp cho item tạo mới/sửa; `rank()` = 2 (§12.5) nên mọi cặp với chúng thành `CONFLICTED` |
| 2026-09-30 | ~112 file teeinblue có `last_updated.ccr_ref` dạng `bootstrap:CTX-...` | `publish-knowledge.mjs` WARN (blocking khi `PUBLISH_STRICT_IDS=1`); sửa là quyết định riêng của chủ repo |
| 2026-09-30 | `SEC-<nnn>` đã dùng với nghĩa "security finding" (22 file `knowledge/`, 40 file `runs/`) | Lý do ID doc section là `DSEC-` (2.1) |
| 2026-09-30 | 240 KB item có `related_kb_ids`, 42 item đang `CONFLICTED` | Lý do supersede phải giữ `kb_id` và đưa item cũ vào CHANGELOG (§12.5) |
| 2026-10-06 | 3 file `knowledge/_open-issues/` còn đường `runs/context` | Leak scan chưa quét `_open-issues/` (2.17) |
| 2026-10-11 | `knowledge/products/teeinblue/font/CHANGELOG.md` nhắc định danh account explore (`sub=…`) | Chờ chủ repo quyết sửa (đụng nội dung `knowledge/`) |
| 2026-10-11 | 7 `feature-summary.md` của teeinblue (artwork, asset-category, campaign, font, order, sdk, translation) chưa có dòng 2 `**Published context version:** N` | `audit-preview.mjs` coi là BLOCKING cho object được publish lại; sửa khi object đó có run kế tiếp |
| 2026-10-11 | `teeinblue/global-option` và `teeinblue/product-base` thiếu `publish-meta.json` → `UNPUBLISHED` trong manifest | `generate-manifest --check` FAIL; cần bổ sung khi chủ repo quyết |
| 2026-10-11 | 4 run cũ (`CTX-20260909-01`, `CTX-20260910-01/02/03`) không có `run-manifest.json`; 11 manifest dùng `ctx_run_id` thay vì `run_id` | `ops-board` đọc cả hai key; run mới dùng `scripts/ctx/new-run.mjs` |

## 7. Sự cố đã xảy ra

**2026-09-10 — publish trái phép.** Nội dung của object `font` và `product-base` từng được ghi vào `knowledge/` ngoài quy trình publish. Bản bị ghi được giữ ở `runs/_archive/incident-2026-09-10-unauthorized-publish/`. Đây là lý do cho luật "chỉ orchestrator được ghi `knowledge/`, chỉ khi `publish_allowed: true` và lock còn thuộc run" (§5), và giờ là lý do `publish-apply.mjs` tự kiểm verdict + lock trước khi copy.
