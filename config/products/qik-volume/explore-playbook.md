# Explore playbook — qik-volume

Hướng dẫn riêng của Qikify Volume Discounts (QVL trên Testlane, QVD trên Jira) cho các explorer runtime. Cấu hình máy đọc nằm ở `config/products/qik-volume.json` → `explore`, `environments`, `credentials`, `defaults`. Hành vi kỳ vọng đã publish nằm ở `knowledge/products/qik-volume/` (v1, nguồn KB do QA biên soạn, live-test trên một store cũ) — explore để **xác minh** nó trên store staging hiện tại, không chép lại.

Không ghi giá trị credential, email, domain store hay tên người thật vào file này — chỉ ghi tên biến môi trường. Nguồn của các mục dưới đây là bộ tài liệu đóng băng trong `runs/context/2026-10-05/CTX-20261005-01/input/docs/` (ghi `DOC-xx`).

## 1. Surfaces và entry point

| Surface | Base URL (env) | Entry point | Ghi chú |
|---|---|---|---|
| portal (merchant app) | `QVL_SHOPIFY_ADMIN_APP_URL` (app **Staging BK Volume**, handle `staging-bk-volume`) | menu trái: Dashboard (Home), Manage offers, Translations, Variant swatches, Analytics, Feature requests | chạy trong **iframe** Shopify admin. Route đã biết: `/apps/staging-bk-volume` (Dashboard), `.../offers/create` (chọn template), `.../variant-swatches/setting/<OptionName>`. Route của Manage offers / Translations / Analytics / form offer sau khi lưu chưa ghi nhận — ghi lại ở run đầu |
| storefront — PDP widget | `QVL_STORE_DOMAIN` (có password `QVL_STOREFRONT_PASSWORD`) | trang product nằm trong trigger của offer | theme app embed của app phải **Active** (block "Qikify: Volume Discount"). Widget theo loại offer: tier card (Quantity Break), combo picker + popup (Multibuy), bảng/inline variant composer "TIER PRICING" / "VARIANTS" (Wholesale) |
| storefront — cart | `https://<QVL_STORE_DOMAIN>/cart` | sau Add to cart | discount Function áp **ngay trong cart** (mã kiểu `QIKIFY-xxxxxx`), tự tính lại khi đổi số lượng trong cart — không cần qua checkout để thấy discount |
| storefront — collection / recommendation | trang collection | badge trên ảnh product ("UP TO {discount} OFF", "MULTIBUY", "BULK SAVING") | badge bị ẩn khi offer ngoài lịch chạy |
| Shopify admin — store settings | `admin.shopify.com/store/<QVL_STORE_HANDLE>/settings/...` | Languages (nguồn ngôn ngữ của Translate Offers), Plan (kiểm development store) | **chỉ đọc** |
| Shopify theme editor | mở từ nút "Enable theme app" / "Enable theme app extension" (tab mới) | — | **chỉ quan sát**, không bấm Save (xem §5) |
| api | `QVL_API_BASE` (phải bằng `environments.staging.expected_api_base`) | — | không có OpenAPI; chỉ runtime-trace từ network của portal/storefront |

Không bật: Admin page/Config của Ownego (nơi đặt `ai_prompt_limit`, custom config SDK), Filament nội bộ, DB, code, Sidekick. Production là stop condition cho mọi surface. Nếu `environments.staging.expected_api_base` còn `null` → không chạy explore, trả `BLOCKED`.

## 2. Auth và xác minh account

- **Không tự login.** Shopify admin có 2FA; operator login trong browser Playwright của run rồi báo bàn giao. Explorer chỉ dùng session đã có.
- Merchant app gọi backend bằng Shopify session token do App Bridge cấp trong iframe — không tự dựng header `Authorization`. Bị đẩy sang màn OAuth/"re-authorize" hoặc màn cài app → **DỪNG**, `BLOCKED`.
- **Xác minh account — bước bắt buộc đầu tiên, và sau MỖI lần bàn giao session:**
  1. URL Shopify admin chứa `/store/<QVL_STORE_HANDLE>/`.
  2. App đang mở là `/apps/staging-bk-volume` (breadcrumb "Staging BK Volume"). Thấy app Volume Discounts **không** có tiền tố staging → đó là app production, **DỪNG**.
  3. Storefront mở đúng host `QVL_STORE_DOMAIN`.
  4. Store là **development store** (Settings → Plan, mở tab riêng, chỉ đọc). Không xác định được → coi như không phải.
  Sai bất kỳ điều nào → DỪNG, `BLOCKED`. Không đổi sang store khác kể cả khi account operator có nhiều store; đặc biệt **không dùng store cũ trong tài liệu** (`test-vl-1`) dù session có quyền vào.
- Bị chặn bởi permission classifier (không đọc được trang login, không mở được admin) → không thử vòng; trả `BLOCKED` để operator xử lý.
- Storefront: luôn vào **domain thật** qua trang `/password` bằng `QVL_STOREFRONT_PASSWORD`. Không dùng link "Preview on Online Store" (`products_preview`, có token bypass) — route đó không giữ locale và có thể không ghi analytics (DOC-07, DOC-08).

## 3. Object map

Danh sách object hợp lệ: `knowledge/products/qik-volume/_registry.json`.

| `object_key` | Surface chính | State cần để quan sát |
|---|---|---|
| `onboarding-dashboard` | portal Dashboard | onboarding ("Hello {Store name}!", "Create your first deal!") chỉ hiện khi store **chưa từng** có offer — xoá hết offer không làm nó quay lại; store staging đã có offer thì đánh `NOT_COVERED` cho nhánh onboarding. Dashboard: Theme Extension Status (Active/Inactive), Setup guide "N/2 completed", "Recently created offers" (5 offer mới nhất), số ATC 30 ngày |
| `discount-offers` | portal (form offer) + storefront (PDP, cart) | `.../offers/create` → 5 thẻ template: Quantity breaks for same product, Buy X get Y free, Volume discount for subscription, Multibuy (Mix & Match Combo), Wholesale pricing (B2B). 3 template đầu mở **cùng** form Quantity Break. Offer **không có Draft**: lưu là chạy (Running) nếu trong lịch. Cần product `QA-` nhiều variant; template subscription cần product đủ điều kiện subscription qua app subscription (Appstle) — thiếu → `NOT_COVERED` |
| `variant-swatches` | portal Variant swatches + storefront | empty state "Sync variants" khi chưa sync; bảng option (Variant options / Connected products / Swatch type / Customize); "Customize" mở **trang riêng**, không phải modal. Cấu hình theo **tên option toàn store** — đổi "Color" là đổi cho mọi product có option Color |
| `translate-offers` | portal Translations + storefront đổi locale | store phải có ≥2 ngôn ngữ published ở Shopify Settings → Languages; language switcher và tab "Offer(s)" chỉ hiện sau "View actions" → "Translation to another language" |
| `translate-portal` | portal Dashboard | dropdown "Language:" ở **cuối** trang Dashboard, 9 lựa chọn cố định; đổi xong phải trả về English |
| `analytics` | portal Analytics + network storefront | dữ liệu cần view/ATC thật trên storefront domain thật; "Order with offers"/"Additional revenue" cần đơn hoàn tất — ngoài checkout boundary → `NOT_OBSERVED` |
| `ai-offer-creation` | portal `.../offers/create` | **bị khoá trên development store** ("Not available on development stores…") → ghi lại thông báo, phần còn lại `NOT_COVERED` |
| `ask-for-review` | portal (overlay sau khi lưu offer AI) | phụ thuộc offer `isAiGenerated` → `NOT_COVERED` trên dev store |

Ghi rõ offer id (số trong URL / `offer_id` trong network), `shopify_discount_id`, product handle dùng trong `portal_context`/`storefront_context`. Id trong tài liệu (Offer 15/815, 816, 818, "Copper Light", "Clay Plant Pot") thuộc store cũ — không tồn tại trên store hiện tại, luôn lấy lại từ portal.

## 4. Vocabulary

| Thuật ngữ | Nghĩa |
|---|---|
| Offer | một cấu hình discount của app; mỗi offer = một **automatic discount** Shopify (hoặc discount code nếu support bật) |
| Offer type | Quantity Break (3 template), Multibuy – Mix & Match Combo, Wholesale Pricing (B2B) |
| Template | thẻ ở trang Create offer; chỉ pre-fill phần reward, không phải loại offer riêng |
| Trigger | phạm vi product mà offer áp. Quantity Break / Wholesale: 5 radio (All products, Collections, Product tags, Specific products, Custom trigger) + link "Exclude products". Multibuy: 3 radio (All products, Collection — chỉ 1, Specific products), không exclude |
| Tier | bậc số lượng → mức giảm. Quantity Break: ngưỡng, áp mức của bậc cao nhất đạt được cho **toàn bộ** số lượng của **một product** (gộp variant, không gộp product khác). Multibuy: **gộp mọi product** đủ điều kiện. Wholesale: khoảng Min–Max, không kiểm tra liên tục |
| Overlap | 2+ offer cùng trigger một product: cảnh báo không chặn; ở cart **chỉ một** discount thắng, chưa rõ quy tắc (NEEDS_CONFIRMATION) |
| Theme embed / app block | embed toàn app (bật trong theme editor) vs block của section — discount Function bỏ qua khi embed tắt (QVD-167) |
| Combination | cho phép offer cộng dồn với Order / Product / Shipping discount |
| Campaign scheduling | start/end theo timezone store; offer ngoài lịch không hiện, không áp |
| "Staging BK Volume" | tên app staging trong Shopify admin; "BK" là tên nội bộ cũ của app |

Nhóm feature theo user goal của merchant (tạo offer giảm giá, cho offer hiện trên store, theo dõi hiệu quả, bản địa hoá) và của shopper (chọn bậc, thấy giá, thêm vào cart với discount đúng), không theo control.

## 5. Mutation guard riêng

`defaults.mutation_policy = SAFE_REVERSIBLE_ONLY`. Run này **không** có ngoại lệ checkout: storefront dừng ở cart (`checkout_boundary: cart`).

**Được phép (đảo ngược được):**
- Tạo product / collection / tag tên `QA-…` trong Shopify admin để làm trigger; cleanup = xoá hoặc archive nếu run cho phép.
- Tạo offer `QA-…` mọi loại. Trigger chỉ trỏ vào product/collection/tag `QA-`. Trigger **All products** chỉ khi bootstrap-request ghi rõ, và xoá offer ngay khi quan sát xong. Cleanup = **xoá offer** (không có Draft); ghi offer id và `shopify_discount_id` trước khi xoá.
- Sửa offer `QA-` của chính run. Sửa offer có sẵn **không phải** của run: không — tạo offer mới thay vì sửa.
- Variant swatches: "Sync variants" được. Đổi swatch type / màu / ảnh chỉ trên option tên `QA-…` (tạo trên product `QA-`); option dùng chung như "Color" thì ghi giá trị cũ, sửa, rồi khôi phục đúng giá trị đó trong cùng run.
- Translations: sửa bản dịch của offer `QA-`; với Default content (dùng chung toàn store) thì ghi giá trị cũ rồi khôi phục.
- Portal language: đổi rồi trả về English trước khi kết thúc.
- Cart storefront: thêm/bớt/xoá line trong cart, xoá sạch cart khi xong.

**Cấm (`defaults.forbidden_actions`):**
- `theme_change`: bấm Save trong theme editor, bật/tắt app embed, thêm/bỏ block, đổi theme published. Embed và block là **precondition do operator chuẩn bị**. Test gating QVD-167 (embed tắt → không giảm giá) cần operator tự tắt/bật embed và bàn giao lại; không có → `NOT_COVERED`.
- `checkout` / `real_payment`: không bấm Checkout, không tạo đơn.
- `plan_change`, `charge`, `uninstall`: không đổi gói Shopify hay gói app, không gỡ app.
- `delete_non_qa_data`, `edit_non_qa_offer`: không xoá/sửa product, offer, collection không phải của run.
- `store_settings_change`: không thêm/bỏ/publish ngôn ngữ ở Settings → Languages, không đổi currency, timezone, market.
- `admin_config_write`: không đụng Admin page/Config (`ai_prompt_limit`, custom config SDK, `ENABLE_WHOLESALE_QTY_ENFORCE_OPTION`).
- `contact_support`: không gửi tin qua "Need help?" (mở chat support thật), không bấm "contact our support team to enable" (Custom CSS, discount code).
- `submit_feedback`: không gửi Feature requests, không gửi feedback/review App Store từ overlay Ask for Review.
- `install_third_party_app`: không bấm "Free to install" (Appstle, upsell).

Action không có trong danh sách được phép và không có đường cleanup rõ → DỪNG, ghi `blocking_issues`.

## 6. Network / API hints

- Request tới `QVL_API_BASE` và tới các host trong `environments.staging.additional_api_hosts` (`staging-bkv-embedded.qikify.com` — nơi tải document iframe của merchant app; operator xác nhận 2026-10-19 là host staging thật) là ứng viên `mapped`. Run đầu phải xác nhận qua network rằng portal thực sự gọi host này; khác → ghi unknowns và báo operator, không tự sửa config.
- Endpoint đã biết (DOC-08): `GET /api/order-analytics/summary`, `GET /api/order-analytics/graph` (`summary`=`quantity|revenue|revenue_usd`, `type`=`hourly|daily|weekly|monthly|yearly`), `GET /api/top-discount-tiers`, `GET /api/top-selling-variants`, `GET /api/events` (đếm theo `type` `view|add_to_cart`), mọi endpoint nhận `filter`. `start`/`end` là ISO 8601 có offset theo timezone store; graph trả đủ mọi ngày, ngày trống = 0.
- `POST /api/events` do SDK storefront gọi, body **form-encoded**: `shop`, `offer_id`, `type`, `shopify_discount_id`, `variants[i][shopify_product_id|shopify_variant_id|quantity]` (Multibuy). Mỗi widget trên trang bắn một `view`; một lần Add to cart từng bắn `add_to_cart` cho **mọi** offer trên trang — ghi đúng số request quan sát được. Host của call này chưa xác định (có thể là `QVL_API_BASE` hoặc app proxy của store) — ghi lại.
- Cart/discount: request Shopify `/cart/add.js`, `/cart/change.js`, `/cart.js` là hệ quả của action (gắn với ACT-ID); discount do Shopify Function tính ở server Shopify — không có request riêng tới backend app.
- Request nền cần gắn nhãn `polling`/`unrelated`: telemetry Shopify admin, App Bridge, `monorail`, chat widget support.
- Redact: Shopify session token (JWT trong header), `id_token`/`hmac`/`signature`/`session` trong query, token preview, email/địa chỉ, tên staff trong lời chào Dashboard ("Hi {staff name}!").

## 7. Gotchas

- Portal trong iframe `iframe[name="app-iframe"]`: snapshot/selector phải vào đúng frame app. Resource picker của Shopify (Browse product, collection) nằm ở DOM admin, ngoài iframe. Screenshot `fullPage` trên Shopify admin hay ra trắng — dùng screenshot viewport sau khi chờ, hoặc accessibility snapshot.
- Discount Function **gated theo theme embed** (QVD-167): widget không hiện / cart không giảm → kiểm theo thứ tự: embed Active (Dashboard → Theme Extension Status), offer trong lịch, product nằm trong trigger, không bị overlap với offer khác — trước khi kết luận lỗi. Form offer vẫn hiện cảnh báo "Automatic discounts work even if the app block is disabled…" — mâu thuẫn với QVD-167, đang NEEDS_CONFIRMATION, ghi nguyên văn, không tự phân xử.
- Overlap: 2–3 offer trùng trigger thì cả widget đều hiện nhưng cart chỉ áp **một** discount, thứ tự thắng từng đổi giữa 2 lần test (DOC-12). Muốn quan sát một offer riêng → đảm bảo product chỉ nằm trong trigger của offer đó. Muốn quan sát overlap → ghi đủ thứ tự thao tác (offer nào add trước) để sau đối chiếu.
- Shopify giới hạn **25 automatic discount** mỗi store; mỗi offer chiếm một. Xoá offer `QA-` sau mỗi run; nếu tạo offer báo lỗi giới hạn → DỪNG, ghi lại, không xoá offer của người khác.
- Multibuy: nút "+" / slot combo không phản hồi với click giả lập (`element.click()` trong evaluate) — dùng click thật của Playwright. "Pick" thêm thẳng vào **cart thật**.
- Wholesale trên Dawn render composer **inline** trên PDP, không có drawer như ticket; biến thể **cuối** có stepper số lượng riêng cho từng giá trị.
- Known issue còn mở: chuỗi thô kiểu `{ [Default Title]: "", }` hoặc `#hex { [Value]: "#hex", }` hiện dưới nút Add to cart, và swatch màu/ảnh không render (DOC-14). Gặp lại thì ghi là tái hiện known issue, không phải phát hiện mới; nếu **không** còn thấy thì ghi rõ — có thể đã fix.
- Giá trị âm ở ô Discount value của tier gõ/dán được (known issue) — không lưu offer với giá trị âm trên store dùng chung.
- Custom CSS và discount code: bị khoá sau "contact our support team to enable" — chỉ ghi trạng thái khoá.
- AI Offer Assistant và Ask for Review không chạy được trên development store — đây là hành vi đúng, không phải lỗi môi trường.
- Translate Offers: ngôn ngữ lấy từ Shopify Settings → Languages; muốn xem widget theo locale, vào domain thật với path `/<locale>/products/...` hoặc switcher của theme sau khi qua `/password`. Store chỉ có 1 ngôn ngữ → phần storefront `NOT_COVERED` (thêm ngôn ngữ bị cấm).
- Analytics không tăng ngay sau view/ATC (DOC-08) — chưa rõ do độ trễ, do loại trừ traffic preview hay lỗi. Ghi thời điểm action và thời điểm kiểm; không kết luận trong một lần kiểm.
- Bản ghi QA cũ trên store staging (option tên "Test Color", bản dịch kiểu "Item nè hẹ") là dữ liệu bẩn có sẵn, không phải hành vi sản phẩm — không đưa vào observation như default.
- Offer status hiển thị: Running / Expired (Portal tiếng Việt: "Đang chạy" / "Hết hạn"). Không có Draft — đừng tìm nút "Save as draft".
- Repo nằm trong thư mục iCloud: kiểm `* 2.*` trong `raw/` sau run (bản sao do iCloud tạo).
