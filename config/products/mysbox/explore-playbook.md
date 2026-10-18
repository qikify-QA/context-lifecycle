# Explore playbook — mysbox

Hướng dẫn riêng của Mysbox cho các explorer runtime. Cấu hình máy đọc nằm ở `config/products/mysbox.json` → `explore`, `environments`, `credentials`, `defaults`. Hành vi kỳ vọng đã publish nằm ở `knowledge/products/mysbox/` (v1, nguồn tài liệu dev) — explore để **xác minh** nó trên staging, không chép lại.

Không ghi giá trị credential, email, domain store hay tên người thật vào file này — chỉ ghi tên biến môi trường.

## 1. Surfaces và entry point

| Surface | Base URL (env) | Entry point | Ghi chú |
|---|---|---|---|
| portal (merchant app) | `MYS_SHOPIFY_ADMIN_APP_URL` (trang app trong Shopify admin của store dev) | menu trái: Dashboard, Manage boxes, Manage orders, Analytics, Content & Translation, Style Settings, General Settings, Feature Requests, Pricing | chạy trong **iframe** Shopify admin; route duy nhất tài liệu nêu: `/general-settings`. Đang onboarding thì chỉ hiện Dashboard |
| storefront — widget | `MYS_STORE_DOMAIN` (storefront có password `MYS_STOREFRONT_PASSWORD`) | trang product của variant là box | theme app embed "Mysbox App" bắt buộc; block "Mysbox list box item", "Buy box by store credit", "Mysbox recent pulls" |
| storefront — trang khách | `https://<MYS_STORE_DOMAIN>/apps/mysbox/orders` và `/apps/mysbox/orders/...` | "Your orders", filter All / Not unboxed yet / Unboxed, "Multi-unbox", "Next unbox", "Open more", "Skip", "Resell" | app proxy (Vue app trong theme); khách vãng lai vào bằng magic link `?parameters=` |
| storefront — thank-you / order status | sau checkout test order | block hiện "Please wait while we fetch your box data" → (≤30s, khi server bốc thăm xong) "Unbox your mystery box now!" + link **Multi-unbox** (`/apps/mysbox/orders/<order_id>/winner?parameters=…`, `openAll: true`) và **Unbox** dưới từng box (`/apps/mysbox/orders/<order_id>/<box_version_id>/<n>/open?parameters=…`) | mở reveal ở **tab mới**; block poll 5s/lần tối đa 30s |
| storefront — trang reveal | link Unbox ở trên | "Roll to get your lucky items" + animation theo box (Carousel/Drawing/Card flip/Gacha/None) + nút "Unbox" → "Skip" → "🎉 Congratulations! Your lucky item is revealed 🎉", tên item, "Chance: xx.xx%", "Open more", "Share unboxing", "Back" | "Back" → chi tiết đơn khách "Order #<n> · Paid", "Unbox your mystery boxes — x / y unboxed"; mũi tên back → "Your orders" (All / Not unboxed yet / Unboxed, "View details") |
| storefront — customer account | trang tài khoản khách | block "Unbox alert", "Items purchased with store credit" | cần session customer do operator bàn giao |
| Shopify admin — order block | trang đơn trong Shopify admin | block "Mysbox prizes", action "Open mystery box" → "Unbox all boxes" | **chỉ quan sát**, không bấm (xem §5) |
| api | `MYS_API_BASE` (phải bằng `environments.staging.expected_api_base`) | — | không có OpenAPI; chỉ runtime-trace từ network của portal/storefront |

Không bật: admin panel Filament (`/admin`, chỉ "Sign in with Slack"), DB, code. Production là stop condition cho mọi surface. Nếu `environments.staging.expected_api_base` còn `null` → không chạy explore, trả `BLOCKED` và hỏi operator host backend staging.

## 2. Auth và xác minh account

- **Không tự login.** Shopify admin có 2FA; operator login trong browser Playwright của run rồi báo bàn giao. Explorer chỉ dùng session đã có. Session customer account (buyer `logged_in_customer`) cũng do operator bàn giao.
- Merchant app gọi backend bằng Shopify session token (tự cấp bởi App Bridge trong iframe) — không tự dựng header `Authorization`. Token hết hạn → app tự quay về Shopify; nếu bị đẩy sang màn OAuth/"re-authorize" thì **DỪNG** (shop đang bị cờ re-auth, mọi thứ của shop dừng).
- **Xác minh account — bước bắt buộc đầu tiên, và sau MỖI lần bàn giao session:**
  1. URL Shopify admin chứa `/store/<MYS_STORE_HANDLE>/`.
  2. Storefront mở đúng host `MYS_STORE_DOMAIN`.
  3. Store là **development store** (dev store chỉ có test subscription và cho phép Bogus Gateway). Không xác định được → coi như không phải.
  Sai bất kỳ điều nào → DỪNG, `BLOCKED`. Không đổi sang store khác kể cả khi account operator có nhiều store.
- Bị chặn bởi permission classifier (không đọc được trang login, không mở được admin) → không thử vòng; trả `BLOCKED` để operator xử lý.
- Magic link: chỉ dùng link gửi tới `MYS_TEST_BUYER_EMAIL` của đơn test do run tạo. Link có token sống 1 năm — coi như credential: redact `?parameters=` khỏi mọi evidence.

## 3. Object map

Danh sách object hợp lệ: `knowledge/products/mysbox/_registry.json`.

| `object_key` | Surface chính | State cần để quan sát |
|---|---|---|
| `merchant-app` | portal | onboarding wizard chỉ hiện khi shop chưa có box; Dashboard ("Setup guide N / 3 completed", "Box sales limit"), General Settings (Auto-Unbox, Buyback limit time, Order prize information, Koin, Shopify Flow; bar Save/Discard) |
| `box` | portal | "Create new box" → trang Manage boxes (thẻ **Single box** / **Bundle box**, mỗi thẻ có Manage / Create; group/tier là *Randomization method* "Random by group(s)" bên trong form, không phải thẻ riêng) → form Box settings (`/boxes/box-settings?type=single`, sau lưu `/boxes/box-settings/<id>`). Product box: "create a new product" mở modal **Add product** của Shopify — đặt title `QA-…`. Prize: "Browse" chọn product làm item, nhập Quantity (boxes) → Chance tự tính theo tỉ lệ quantity, bộ đếm `n/<tồn kho box>`. Box Active không sửa/xoá được → "Deactivate box" trước |
| `storefront-widget` | storefront + portal (Style Settings, Content & Translation — chỉ gói trả phí) | theme embed ON, block đã đặt, box Active, shop chưa vượt capacity |
| `order-draw` | storefront (checkout test order) + portal Manage orders | đơn **paid** chứa box đang Active lúc thanh toán; "{opened}/{total} boxes opened" |
| `reveal` | storefront trang khách, thank-you block, magic link | như `order-draw`; auto-unbox chạy theo lịch job — không chờ trong run |
| `resell-refund-credit` | storefront trang khách | gói trả phí + box digital bật "Buy back function" + box đã mở + cửa sổ resell còn hạn (mặc định 24h từ lúc paid). Đường Koin: KHÔNG làm (cần lưu Koin key — cấm) |
| `plans-billing` | portal Pricing | **chỉ đọc**: tab Monthly/Annually, plan hiện tại, "Box sales limit". Không bấm "Choose this plan" / Confirm & Downgrade / Cancel subscription |
| `automation-growth` | portal + storefront | recent pulls feed (block "Mysbox recent pulls"); Flow toggle mặc định OFF và **không bật**; share unboxing chỉ có trên staging, cần customer đăng nhập |
| `admin-panel` | — | surface chưa bật → `NOT_COVERED` |
| `integrations` | network (webhook do Shopify gọi server-to-server) | không quan sát trực tiếp được từ browser; chỉ suy ra qua hệ quả (đơn xuất hiện sau `orders/paid`) và ghi `NOT_OBSERVED` cho phần còn lại |

Ghi rõ store và box/order id dùng trong `portal_context`/`storefront_context`. Id của run cũ có thể đã đổi trạng thái (box bị unpublish khi vượt capacity) — luôn lấy lại từ portal.

## 4. Vocabulary

| Thuật ngữ | Nghĩa |
|---|---|
| Box | một **variant** Shopify được đánh dấu là mystery box |
| Digital box ("Instantly opening box") / Physical box ("Sealed box") | reveal trên web / quà giấu kín, ghi vào metafield đơn |
| Box version | bản chụp bất biến cấu hình box mỗi lần lưu; đơn nhớ version lúc mua |
| Draw / pull | bốc thăm — xảy ra khi webhook `orders/paid` về server, **không** phải lúc khách bấm mở |
| Unbox / reveal / open | lúc hiển thị kết quả; về kỹ thuật chỉ đóng dấu "đã mở" |
| Redeem vs unbox | redeem = khách tự mở (quà vào đơn sau khi hết cửa sổ resell); unbox = merchant/job/Flow mở (bỏ qua cửa sổ, kết thúc resell) |
| Status đơn | QUEUED (quà chưa đủ trên đơn Shopify), COMPLETED (quà đã vào đơn), FAILED; opening request PENDING = đang thêm quà |
| Resell / buyback | khách bán lại box/món trong cửa sổ resell → store credit Shopify + note "Buyback Refund" |
| Capacity / "Box sales limit" | số box miễn phí mỗi chu kỳ 30 ngày; *Used* khác *Total sold in cycle* |
| Test order | mặc định bị loại khỏi capacity, billing, analytics ("Exclude Test Order" ON) nhưng **vẫn bốc thăm và vẫn trừ inventory** |
| Preview order | đơn test tag `mysbox-preview-order` tạo từ "Preview by test order" |
| "User" trong network/payload | = **shop** (merchant), không phải người dùng; khách cuối = customer |

Nhóm feature theo user goal của merchant (tạo và bán box, theo dõi đơn) và của khách (mua, mở, bán lại), không theo control.

## 5. Mutation guard riêng

`defaults.mutation_policy = SAFE_REVERSIBLE_ONLY`, cộng **đúng một** ngoại lệ có chủ đích:

**Được phép — test order trên development store.** Đây là authorization riêng cho `checkout_boundary: bogus_gateway_test_order`:
- chỉ sau khi §2 xác minh đúng store và store là development store;
- chỉ cổng **Shopify Bogus Gateway** (thẻ test của Bogus Gateway). Thấy cổng thanh toán thật hoặc ô thẻ của processor thật → DỪNG trước khi nhập gì;
- buyer email = `MYS_TEST_BUYER_EMAIL`, tên/địa chỉ dạng `QA Test`; chỉ mua box có tiền tố `QA-`;
- tối đa 3 đơn mỗi run, mỗi đơn ≤ 3 box, trừ khi bootstrap-request ghi số khác;
- ghi `ACT-ID`/`SF-ACT-ID` cho từng đơn; cleanup = ghi retention (đơn test không xoá được) + archive đơn trong Shopify admin nếu run cho phép; `cleanup_result` ghi rõ.

**Được phép (đảo ngược được):** tạo product/variant + box tên `QA-…` — lưu ý **Save lần đầu của box Single/Bundle mới tự publish thành Active** (`POST /api/boxes` rồi `POST /api/boxes/<id>/publish`), dù combobox Status đang hiện Draft; cleanup = "Deactivate box" (về Draft) và đặt product `QA-` về Draft/Archive nếu run cho phép; dùng product sẵn có của store làm **prize item** được (chỉ tham chiếu), nhưng không gắn box vào product không phải `QA-`; sửa General Settings / Style Settings rồi Discard hoặc khôi phục đúng giá trị cũ (ghi giá trị trước khi sửa); Unbox và Resell **trên đơn test của chính run**.

**Được phép (operator duyệt 2026-10-18) — luôn ghi giá trị trước và khôi phục đúng giá trị cũ trong cùng run:**
- General Settings: tick/bỏ tick "Enable auto-unbox" (và quan sát hệ quả trên đơn test của run), rồi khôi phục.
- Box `QA-` của run: "Deactivate box" rồi Save khi box đang Draft; **xoá box `QA-` do chính run tạo** (sau khi đã quan sát xong, ghi ACT riêng).
- Style Settings: bật "Show recent pulls" để quan sát feed và các thiết lập con, rồi tắt lại.
- Dò quyền trên trang khách / app proxy **chỉ với đơn test của run**: sửa `order_id`, `box_version_id`, `token` hoặc `?parameters=` (vd token sai, order_id của đơn test khác của run) và ghi response. Không dùng order_id/token của đơn không phải của run; chỉ GET/đọc hoặc action open/resell trên đơn của run.
Lưu ý: các action này từng bị permission classifier của agent chặn dù playbook cho phép — bị chặn lại thì ghi `blocked_by_classifier`, không thử vòng.

**Cấm (`defaults.forbidden_actions`):**
- `charge`, `plan_change`: "Choose this plan", Upgrade/Downgrade (downgrade gửi usage charge ngay), "Cancel subscription", rời Early-bird (vĩnh viễn).
- `real_payment`: mọi cổng ngoài Bogus Gateway.
- `delete_non_qa_data`: xoá box/product/đơn không phải của run.
- `save_koin_key`: lưu Koin key tự tạo automatic discount; đường "Buy box by store credit" và debit Koin không revert được.
- `enable_shopify_flow`: bật "Enable Mysbox triggers in Shopify Flow".
- `theme_change`: bật/tắt theme embed, thêm/bỏ block, sửa checkout/customer account editor. Embed và block là **precondition do operator chuẩn bị**; thiếu → `NOT_COVERED` + ghi lại.
- `edit_shopify_order`: action "Open mystery box" / "Unbox all boxes" trên trang đơn Shopify admin, "Open all boxes" trên đơn không phải của run.
- `uninstall`, `admin_panel_write`, `send_notification_to_real_customer`. Email hệ thống Shopify/Mysbox sinh ra từ đơn test gửi tới `MYS_TEST_BUYER_EMAIL` là chấp nhận được.

Action không có trong danh sách được phép và không có đường cleanup rõ → DỪNG, ghi `blocking_issues`.

## 6. Network / API hints

- Request tới `MYS_API_BASE`, tới các host trong `environments.staging.additional_api_hosts` (`staging-api.mysbox.io` — trang thank-you/khách; `staging-proxy.mysbox.io` — asset/proxy trang khách; operator xác nhận 2026-10-18 là backend staging thật) và tới `https://<MYS_STORE_DOMAIN>/apps/mysbox/...` (app proxy) là ứng viên `mapped`.
- Proxy API mà trang khách gọi (prefix `https://<MYS_STORE_DOMAIN>/apps/mysbox/api/`): `box-versions/<id>`, `translations/{general-settings,unboxing,buyback-widget,order,share-unboxing}?locale=`, `shopify/product-variants?ids=…`, **`POST unopened-boxes/open?order_id=&box_version_id=&quantity=`** (response có `winning_bundles[].winning_items[].linked_id` = variant prize, `total_opened`, `opened_at`, `resold_at`, `batch_id` — kết quả đã có từ lúc bốc thăm, open chỉ đóng dấu), `orders/<id>?page=&limit=`, `orders/<id>/resellable/exists`. Đối chiếu `linked_id` với `shopify/product-variants` để biết món trúng.
- Merchant app gọi `MYS_API_BASE/api/...` (`GET /api/boxes`, `POST /api/boxes`, `POST /api/boxes/<id>/publish`, `GET /api/boxes/<id>`).
- Storefront widget đọc **metafield** (variant `mysbox.box`, `recent_pulls_current`; shop `mysbox.config`, `subscription`, `capabilities`) và Storefront API bằng public token — nhiều hành vi không có request riêng tới backend Mysbox.
- `polling`: thank-you block (5s/lần, tối đa 30s); trang resell tự reload khi countdown hết.
- `unrelated`: request của Shopify admin chrome, analytics, theme asset, `monorail`/`trekkie`.
- Webhook (`orders/paid`, `app/uninstalled`, `shop/update`, `bulk_operations/finish`, compliance) là server-to-server — không xuất hiện trong network browser; đừng ghi là "không có webhook".
- `?parameters=` (magic link) là JSON **base64 thường, không ký**, chứa `order_id`, `customer_id`, `token`, `path` (+ `box_version_id`/`openAll`) — giải mã được bằng mắt, nên redact toàn bộ giá trị trong URL, screenshot thanh địa chỉ và network.
- Redact: Shopify session token (JWT trong header), `?parameters=` của magic link, `id_token`/`hmac`/`signature` trong query app proxy, email/địa chỉ buyer.

## 7. Gotchas

- Portal trong iframe `iframe[name="app-iframe"]`: snapshot/selector phải vào đúng frame của app, không phải DOM Shopify admin. Modal Shopify (Add product, resource picker) nằm ở DOM admin, ngoài iframe. Thanh "Unsaved changes" của Shopify có thể còn hiện vài giây sau khi app đã lưu — xác nhận bằng network (`/api/boxes` 201) và URL có id, không bằng thanh đó.
- Kiểm development store: Settings → Plan hiện "Development store" dưới tên plan (mở ở tab riêng, chỉ đọc). Tiền tệ store theo cấu hình store (store staging hiện dùng ₫).
- Backend: portal gọi `MYS_API_BASE` + `/api/...` (vd `GET /api/boxes`, `POST /api/boxes`, `POST /api/boxes/<id>/publish`, `GET /api/boxes/<id>`).
- Box Active không sửa/xoá được → Deactivate trước. Settings (auto-unbox, cửa sổ resell) chỉ áp cho đơn **mới** — đã đóng băng vào box version của đơn cũ.
- Shop Free vượt capacity → **mọi box bị unpublish**, nâng gói hay giảm *used* không tự publish lại. Kiểm "Box sales limit" trước khi đặt đơn; đơn test thường không tính vào capacity nhưng vẫn trừ inventory.
- Storefront có password: nhập `MYS_STOREFRONT_PASSWORD` ở `/password` (session của Shopify admin không bỏ qua được trang này). Product handle = slug của title, vd `/products/qa-…`.
- Widget dùng custom element (`mysbox-inject-list-box-item`, `mysbox-inject-list-recent-pulls`, `mysbox-inject-buy-by-store-credit`) có **shadow root mở nhưng rỗng**; nội dung widget render ở **light DOM** (đọc được bằng accessibility snapshot / DOM thường, quan sát staging 2026-10-17, 1 mẫu — chưa chắc là cấu trúc ổn định). Kèm screenshot làm evidence, và console log `Mysbox - Listbox - …` / `Mysbox - RecentPulls - InjectListRecentPulls Mounted` để biết widget đã mount. Khối hiện: "Box items", thẻ item kèm "Chance: xx.xx%", "Powered by Mysbox". Block không có dữ liệu vẫn mount nhưng cao 0.
- Biến global trên storefront: `window.mysboxStore` và `window._Mysbox` (config widget, không chứa tên/email/order id của khách). Bản dịch trang khách gọi `translations/<group>?locale=default`; shop chưa có bản dịch tuỳ chỉnh thì trả `{"data": null}`.
- Dữ liệu widget không gọi `MYS_API_BASE`: config nhúng bằng Liquid (`script#mysbox-config`, `window.mysboxStore` với `mysboxProductPageData.variantMetafields`, `customer.storeCredit`, `mysboxRecentPulls`) + 2 query Storefront GraphQL `/api/<version>/graphql.json`: `getProducts` (variant kèm metafield `mysbox.box`) và `getVariants` (variant của prize item: title, price, image, availableForSale). Ghi nhãn `mapped` cho 2 query này.
- Add to cart: box vào cart như line item thường, **không có** properties/attributes Mysbox — bốc thăm chỉ xảy ra ở server sau `orders/paid`.
- Widget không hiện: kiểm theme embed, block, box Active, capacity — theo thứ tự đó — trước khi kết luận lỗi. Text "Your box items will be displayed here." chỉ hiện trong theme editor.
- Đơn vừa thanh toán có thể chưa mở được ngay (job `orders/paid` chạy queue); thank-you block poll tối đa 30s. Job lỗi không tự retry và chỉ thấy trong Horizon (surface chưa bật) → ghi `NOT_OBSERVED`, không kết luận.
- Job theo lịch (giờ server, giả định UTC): usage charge 00:00, auto-unbox + prize sync 00:00/08:00/16:00 (trễ tới 8h), Flow "unboxing soon" phút 30 mỗi giờ. Không chờ job trong run; hành vi phụ thuộc job ghi `NOT_OBSERVED` kèm thời điểm job kế tiếp.
- Quà vào đơn Shopify khi **mọi** box đã mở **và** hết cửa sổ resell. Box **không bật buyback** (bắt buộc trên Free/Early-bird) → quà được thêm ngay sau unbox: line item prize giá ₫0 qua discount **"MYSBOX: -100%"**, timeline đơn ghi "Staging Mysbox edited this order" + "sent an order edited email" (email tới buyer). Box có buyback → phải chờ cửa sổ resell, thường không quan sát được trong một run.
- Store staging đang ở gói **Free**: Analytics và Content & Translation hiện "… is not available in the Free plan"; "Enable buyback for this box" bị khoá → resell/buyback là `NOT_COVERED` (đổi gói bị cấm). Box sales limit "0 / 10"; đơn test Bogus Gateway **không** làm tăng con số này.
- Kiểm đơn ở 3 nơi: app Manage orders (cột Order, Date theo giờ máy, Fulfillment status, "Mystery box status" `x/y boxes opened`, Refund amount, Action; tab All/Unopened/Opened), trang khách `/apps/mysbox/orders`, và trang đơn Shopify admin (`/orders/<order_id>`: line item, discount MYSBOX, timeline). Block "Mysbox prizes" trên trang đơn admin không tự hiện — merchant phải ghim ở mục Blocks.
- Screenshot `fullPage` trên Shopify admin thường ra trắng; route app mới mở để trắng ~10s. Dùng screenshot viewport sau khi chờ, hoặc đọc accessibility snapshot.
- Rate limit trang khách: resell 20/phút/đơn; share 10 lần lấy link/phút. Số dư store credit > 15.000 USD chặn resell.
- Tính năng `[chỉ có trên staging]` (share unboxing, banner/notification, …) quan sát được trên staging nhưng **không** chứng minh hành vi production — ghi rõ trong observation.
- Repo nằm trong thư mục iCloud: kiểm `* 2.*` trong `raw/` sau run (bản sao do iCloud tạo).
