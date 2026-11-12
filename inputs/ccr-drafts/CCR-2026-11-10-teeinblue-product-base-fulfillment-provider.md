# Context Change Request: product-base — import catalog và kết nối provider (PosterFlow), gộp từ CBS-046 (khuôn cũ)

- **Product:** `teeinblue`
- **Object:** `product-base`
- **Ticket:** `TIB-4778, QA-3365`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — canon product-base chỉ có KB-015 (modal Import) và dòng feature-summary "Import product từ catalog nhà in — ngoài phạm vi đã khảo sát", thiếu coverage endpoint import, trang Fulfillments, import lại, schema list catalog. Proposal gốc CBS-046 không điền mức gấp (mục 4.4 để trống), đây là đề xuất khi chuyển khuôn, operator xác nhận.

# Khối A — Hành vi

Nguồn gốc chung: lấy từ knowledge QA local (product_facts.md), không phải quan sát trực tiếp của agent soạn CCR. Mọi lượt chạy trên staging với provider PosterFlow; production không rõ; build không rõ (sau lần TIB-4778 giao QA cuối 2026-09-14; TIB-4778 Passed 2026-10-09, Done 2026-10-13). Không có tick QA chứng minh hành vi, chỉ tick AI.

### CLAIM-01

- **Statement:** Import product từ catalog gọi POST /api/products/import (REST proxy trên backend TIB, body gồm fulfillment_id và catalog_id) chứ không phải PosterFlow trả trực tiếp cho browser, và tạo Product Base mang title, description, mockups, printareas, variants của catalog.
- **Object / feature:** product-base/MỚI: provider-catalog-import — Thuộc: modal Import product từ catalog nhà in, endpoint import, danh sách catalog, import lại; Không thuộc: kết nối và API key provider (product-base/MỚI: fulfillment-provider-connection), setup printarea và variant (product-base/printarea-definition, product-base/variant-catalog)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (modal Import product); portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-7 PASS 2026-10-08 (cũng 2026-10-07), staging; result_QA-3365_lane2-gha_auto_2026-10-08.md, result_QA-3365_gap-fix_2026-10-08.md; product_facts FACT-077. Canon: KB-015 chỉ ghi modal Import. Không đề xuất coi tên endpoint và body là hợp đồng API, chỉ quan sát qua test trên staging.
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  - [FACT-077] **Import product detail gọi `POST https://staging-api.teeinblue.com/api/products/import`** (REST proxy trên backend TIB, body `{"fulfillment_id":<id>,"catalog_id":"<id>"}`) — không phải PosterFlow trả trực tiếp cho browser. Áp dụng cho catalog id injection/path traversal testing.
  QA-3365 TC-7 — Get Catalog Detail — valid id — expected/kết quả ghi trong bảng TC: Product Base created by import carries the catalog's mockups/printareas/variants — confirmed 2026-10-08 via live Hasura introspection […]
  Tick trên Jira (QA-3365 TC-7): ✅
  ```

### CLAIM-02

- **Statement:** Trang Fulfillments cho phép đổi API key (rotate): Save key mới thì request sau dùng key mới, còn key sai bị từ chối bằng toast lỗi và key cũ được giữ.
- **Object / feature:** product-base/MỚI: fulfillment-provider-connection — Thuộc: trang Fulfillments (kết nối provider, API key, đổi key, quyền truy cập trang); Không thuộc: import catalog (product-base/MỚI: provider-catalog-import), request gửi nhà in khi có đơn (order/MỚI: fulfillment-provider-request)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (trang Fulfillments); portal, api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-43 PASS 2026-10-08 (cũng 2026-10-06, 2026-10-07), staging; result_QA-3365_lane2-gha_auto_2026-10-08.md; product_facts FACT-078.
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  - [FACT-078] **Trang Fulfillments có action đổi API key (rotate), KHÔNG có Disconnect; không có role/permission gate riêng cho trang này.**
  QA-3365 TC-43 — Rotate API key — subsequent requests use the new key, not cached — expected/kết quả ghi trong bảng TC: The next call fails with a clear auth error using key B — not silently still authenticating with the stale key A (proves the key isn't cached); consistent with TC-2's "clear error" standard
  Tick trên Jira (QA-3365 TC-43): ✅ AI — Rotate API key — subsequent requests use the new key, not cached
  result_QA-3365_lane2-gha_auto_2026-10-08.md TC-43: Save key B toast="Something went wrong!\nInvalid API key" · Sau reload, field có còn đúng key A gốc không: true · khôi phục API key gốc A sau thử rotate key B
  ```

### CLAIM-03

- **Statement:** Trang Fulfillments không có Disconnect và không có role hay permission gate riêng cho trang này.
- **Object / feature:** product-base/MỚI: fulfillment-provider-connection — Thuộc: trang Fulfillments (kết nối provider, API key, đổi key, quyền truy cập trang); Không thuộc: import catalog (product-base/MỚI: provider-catalog-import), request gửi nhà in khi có đơn (order/MỚI: fulfillment-provider-request)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (trang Fulfillments); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (không rõ tên, theo ghi chú QA về thread Slack #yennh-test), 2026-09-16; không có quote
- **Locator:** product_facts FACT-078; 01-analysis.md QA-3365; QA-3365 TC-29 (config PosterFlow scoped theo từng store) tick cuối ⏭️ QA 2026-10-07 vì cần store B độc lập, chưa dựng. Không đề xuất coi đây là spec hay dev đã xác nhận bằng văn bản.
- **OQ:** NEEDS_CONFIRMATION — Trang Fulfillments có thật sự không có Disconnect và không có role/permission gate riêng không? Nguồn là Dev nói qua Slack, không có quote, và TC-29 bị skip. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-078] **Trang Fulfillments có action đổi API key (rotate), KHÔNG có Disconnect; không có role/permission gate riêng cho trang này.**
  Tick trên Jira (QA-3365 TC-29): ⏭️ QA — QA quyet 2026-10-07: skip - can store B doc lap (dang nhap rieng), chua dung
  ```

### CLAIM-04

- **Statement:** Ô API key không mask sau khi Save và áp dụng chung cho mọi provider: GraphQL user_fulfillments { id api_key } qua portal proxy trả raw key cho customcat, printify, picanova, dreamship, printway, shirtee, posterflow, không provider nào mask.
- **Object / feature:** product-base/MỚI: fulfillment-provider-connection — Thuộc: trang Fulfillments (kết nối provider, API key, đổi key, quyền truy cập trang); Không thuộc: import catalog (product-base/MỚI: provider-catalog-import), request gửi nhà in khi có đơn (order/MỚI: fulfillment-provider-request)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (trang Fulfillments); portal, api (GraphQL)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến, đo qua GraphQL), 2026-09-30; không phải PO/Dev
- **Locator:** product_facts FACT-081; QA-3365 TC-26 tick cuối ⏭️; BUG-03 (QA đóng not_a_bug 2026-09-30 vì ngoài scope QA-3365/TIB-4778, không phải vì Dev/PO nói đúng). Khía cạnh bảo mật: API key hiển thị raw. Không đề xuất coi đây là chủ ý thiết kế. Câu hỏi mở: dev/PO có chấp nhận raw api_key trả về browser qua GraphQL user_fulfillments không?
- **OQ:** OPEN_ISSUE — Dev/PO có chấp nhận việc api_key trả raw về browser qua GraphQL user_fulfillments (không mask sau Save, mọi provider) là chủ ý thiết kế không? BUG-03 chỉ bị QA đóng vì ngoài scope. — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-081] **API key field KHÔNG mask sau khi Save; […]** **Áp dụng CHUNG mọi provider, không riêng PosterFlow** (xác nhận 2026-09-30, QA-3365 TC-26: GraphQL `{ user_fulfillments { id api_key } }` qua portal proxy trả raw key cho customcat/printify/picanova/dreamship/printway/shirtee/posterflow — không có provider nào mask).
  BUG-03 (mô tả): product_facts ghi field API key không mask sau Save; nếu team chấp nhận hiện key cho chính chủ thì có thể hạ severity — cần dev/PO xác nhận.
  ```

### CLAIM-05

- **Statement:** Khi nhập API key sai, toast lỗi chỉ báo lỗi chung và không echo lại giá trị đã nhập; toast thực tế quan sát là "Something went wrong! Invalid API key".
- **Object / feature:** product-base/MỚI: fulfillment-provider-connection — Thuộc: trang Fulfillments (kết nối provider, API key, đổi key, quyền truy cập trang); Không thuộc: import catalog (product-base/MỚI: provider-catalog-import), request gửi nhà in khi có đơn (order/MỚI: fulfillment-provider-request)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (trang Fulfillments); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-2 PASS 2026-10-02 (REPL) và TC-43 PASS 2026-10-08, staging; result_QA-3365_B1_repl_2026-10-02.md, result_QA-3365_lane2-gha_auto_2026-10-08.md; product_facts FACT-081. Toast thực tế "Something went wrong! Invalid API key" (chữ "API" khác FACT-081 "Invalid key", không coi "Invalid key" là nguyên văn); HTTP 400 còn kèm stack trace trong response body (BUG-02, QA dismissed vì platform-wide).
- **Căn cứ expected:** KHÔNG CÓ
- **OQ:** NEEDS_CONFIRMATION — Nguyên văn toast khi nhập key sai là "Something went wrong! Invalid API key" (quan sát) hay "Invalid key" (FACT-081)? Nguồn tự lệch nhau. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  - [FACT-081] **API key field KHÔNG mask sau khi Save; toast lỗi key sai chỉ báo "Invalid key", không echo lại giá trị đã nhập.**
  Tick trên Jira (QA-3365 TC-2): ✅ AI
  result_QA-3365_B1_repl_2026-10-02.md TC-2: ✅ AI — Nhập key rác → Save → HTTP 400, toast rõ ràng "Something went wrong! Invalid API key" — Nhánh "Save tự validate và reject với lỗi rõ" (1 trong 2 nhánh TC-2 chấp nhận). Response body kèm stack trace đầy đủ (cùng gốc lỗi với TC-5/BUG-02, QA dismissed vì platform-wide).
  ```

### CLAIM-06

- **Statement:** Import lại một catalog đã import không bị chặn và tạo Product Base thứ 2 (duplicate câm); hành vi này được ghi là PO chấp nhận, không phải bug.
- **Object / feature:** product-base/MỚI: provider-catalog-import — Thuộc: modal Import product từ catalog nhà in, endpoint import, danh sách catalog, import lại; Không thuộc: kết nối và API key provider (product-base/MỚI: fulfillment-provider-connection), setup printarea và variant (product-base/printarea-definition, product-base/variant-catalog)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (modal Import product); portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** PO (trangdh theo qna.json people, theo ghi chú QA; không có quote), 2026-09-16
- **Locator:** product_facts FACT-082; 03-testcases.md QA-3365 TC-45 (precondition, RQ14); BUG-14 re-check (hiện tượng 2 record cùng catalog_id, TC-45 spec đếm nhầm); không có TC kiểm riêng "import lại tạo bản 2". Không đề xuất coi đây là PO đã xác nhận bằng văn bản: chỉ có dòng "PO confirmed 2026-09-16 (RQ14)" trong precondition, không có tên/quote/link.
- **OQ:** NEEDS_CONFIRMATION — PO có thật sự chấp nhận import lại catalog đã import tạo Product Base thứ 2 (duplicate câm) không? Chỉ có dòng "PO confirmed 2026-09-16 (RQ14)" trong precondition, không có tên hay quote. — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  - [FACT-082] **Import lại một catalog đã import rồi KHÔNG bị chặn — tạo Product Base thứ 2 (duplicate câm), hành vi này được PO chấp nhận, không phải bug.**
  03-testcases.md QA-3365 TC-45 (precondition): PO confirmed 2026-09-16 (RQ14): re-importing an already-imported catalog is accepted behavior (creates a silent duplicate Product Base, not blocked) — so this TC only covers the reload-mid-import robustness angle, not duplicate detection
  BUG-14 (re-check): 2 record cùng `catalog_id` (mới + từ lượt chạy trước), cả hai đủ title/description — không phải half-created (RQ14 — re-import được PO chấp nhận, bản cũ không bị xoá)
  ```

### CLAIM-07

- **Statement:** Danh sách catalog có phân trang thật: GET /api/fulfillments/{id}/catalogs?page=&per_page= (portal proxy) và upstream GET /v1/catalogs?page=&per_page= trả meta.{page, per_page, total}, ví dụ thật total = 241, và portal hiện "Showing 1 to 20 of 241 entries" với đủ 241 item truy cập được qua các trang.
- **Object / feature:** product-base/MỚI: provider-catalog-import — Thuộc: modal Import product từ catalog nhà in, endpoint import, danh sách catalog, import lại; Không thuộc: kết nối và API key provider (product-base/MỚI: fulfillment-provider-connection), setup printarea và variant (product-base/printarea-definition, product-base/variant-catalog)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (modal Import product); api, portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (kết quả [AI]), 2026-10-08
- **Locator:** QA-3365 TC-6 PASS 2026-10-08 (cũng 2026-10-06, 2026-10-07), staging; result_QA-3365_lane2-gha_auto_2026-10-08.md; product_facts FACT-085; Jira TIB-4778 comment 51328 (dev huyenntk, 2026-09-18, ví dụ upstream, không phải sign-off). Canon KB-015 đã ghi offset và 241 entries.
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  QA-3365 TC-6 — List Catalogs — only active products shown, full catalog reachable across pages — expected/kết quả ghi trong bảng TC: Portal-rendered list count and names match the FULL raw API response (all pages, `meta.total` items) exactly — not just page 1 […]
  Tick trên Jira (QA-3365 TC-6): ✅ AI — List Catalogs — only active products shown, full catalog reachable across pages
  result_QA-3365_lane2-gha_auto_2026-10-08.md TC-06: API oracle: meta.total=241, thu thập được 241 item độc nhất qua 3 trang · Portal "Import product" dialog: Showing 1 to 20 of 241 entries
  Jira TIB-4778 comment 51328 (huyenntk, 2026-09-18), ví dụ upstream `curl … /teeinblue_api/v1/catalogs?page=2&per_page=3` → response có "meta": {"page": 2, "per_page": 3, "total": 241}
  ```

### CLAIM-08

- **Statement:** Response của portal proxy GET /api/fulfillments/{id}/catalogs chỉ có 4 field fulfillment_catalog_id, title, images, base_cost ở mọi per_page và không có variants hay availability (khác schema dev kể lại), nên muốn thấy availability phải import xong rồi tra products_by_pk (variants.available).
- **Object / feature:** product-base/MỚI: provider-catalog-import — Thuộc: modal Import product từ catalog nhà in, endpoint import, danh sách catalog, import lại; Không thuộc: kết nối và API key provider (product-base/MỚI: fulfillment-provider-connection), setup printarea và variant (product-base/printarea-definition, product-base/variant-catalog)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff/owner (portal proxy); api, db (GraphQL products_by_pk)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (Yến, đo trực tiếp qua REPL), 2026-10-08; không phải PO/Dev
- **Locator:** product_facts FACT-085 (đoạn "Sửa 2026-10-08"); result_QA-3365_TC-46_2026-10-08.md; QA-3365 TC-46 tick cuối ⏭️ (quét 241/241 item, 0 item available:false). Mới đo ở một provider (PosterFlow), chưa đo provider khác. Schema `variants[]`/`availability` trong FACT-085 trước đó chỉ lấy từ lời dev kể lại (Jira comment 2026-09-18), không coi là response portal gọi được. Câu hỏi mở: có endpoint nào lộ stock trước khi import không?
- **OQ:** OPEN_ISSUE — Có endpoint nào lộ stock/availability của catalog trước khi import không (endpoint list chỉ trả 4 field, mới đo ở PosterFlow)? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  **⚠️ Sửa 2026-10-08 (QA-3365 TC-46):** schema `variants[]`/`availability` trên chỉ lấy từ lời dev kể lại (Jira comment 2026-09-18), CHƯA từng tự verify qua đúng endpoint QA gọi được. Gọi thật `GET /api/fulfillments/[đã bỏ id]/catalogs?page=&per_page=` (proxy portal, dùng cookie/XSRF của session) qua CẢ 241/241 item, mọi `per_page` — response thật chỉ có 4 field `fulfillment_catalog_id`,`title`,`images`,`base_cost`, KHÔNG có `variants`/`availability` nào. Muốn thấy `availability` phải import xong rồi tra GraphQL `products_by_pk` (field `variants.available`, xem TC-7/TC-46) — endpoint list không lộ stock trước khi import.
  ```
