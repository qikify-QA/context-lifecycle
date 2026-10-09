<!-- testlane knowledge KB-356 · kind=feature-profile · tag=Pricing · status=draft · sourceUrl=https://github.com/ownego/qa-knowledge-work/blob/18e5531b0531cc8ed211d45de290a9aecfdf837c/kb/DUOS/features/10-pricing-plans.md · createdAt=2026-10-08T07:51:52.874Z · updatedAt=2026-10-08T09:38:02.558Z -->

# 10. Pricing & Subscription (trang pricing, module, plan)

**Status:** in-review

Phân tích ngày 2026-10-07 từ Jira 3 đợt giá — Epic DUOS-320 (Mar 2026: DUOS-329,
332, 333, 364, 365, 369, 375), Epic DUOS-377 (Non-Plus Apr 2026: DUOS-378,
380, 381), Epic DUOS-430 (Oct 2026: DUOS-431, kèm DUOS-427) — cùng DUOS-123,
124 (2025); bản phân tích task QA Hub DUOS-005 (cập nhật 2026-10-02/05, 76
case, 5 passed); knowledge QA Hub KB-001 (draft) + KB-002 (active, Dev haild
05/10/2026); `references/apps/DUOS.md` § 1. Đã đối chiếu inventory
2026-10-08 (store `stg-duos-plus-2`, Free plan) — phần ✅/🟡/❌ xem
`inventory/DUOS.md` (§ 2.2, 2.17). Chỉ quan sát trang "Subscription" ở
trạng thái store Plus + Free (chỉ đọc); store non-Plus, store đã subscribe,
modal cancel, discount code **chưa verify**.

## Purpose

Trang **pricing** trong Duos Portal để merchant chọn module trả phí (modular
pricing), xem ước tính và subscribe qua Shopify Billing; app khoá / mở tính
năng theo module đã mua và theo Shopify plan (Plus / non-Plus). Bảng giá đã
đổi 3 lần trong 2026 — luôn đối chiếu đợt hiện hành.

## Business Rules

### Lịch sử bảng giá (USD/tháng)

| Module | Mar 2026 (DUOS-320, Plus) | Apr 2026 (DUOS-377) Basic / Grow / Advanced / Plus | Oct 2026 (DUOS-430) non-Plus / Plus |
|---|---|---|---|
| User & Permission | Free, luôn chọn | Free mọi tier (Plus + VAT validation) | $90 / $150 |
| B2B Registration | $49 | Free mọi tier | $30 / $50 |
| B2B Quote Request | $79 | $9 / $19 / $39 / $69 | $30 / $50 |
| Quick order CSV & SKU Order | $69 | $19 / $29 / $49 / $79 | $70 / $100 |
| B2B Shopping List | $99 | $29 / $49 / $69 / $99 | $90 / $150 |
| B2B Finance & Credit | $149 | $39 / $69 / $99 / $149 | $100 / $200 |
| Tổng (6 module) | — | — | $410 / $700; 10% off → $369 / $630 |

- `references/apps/DUOS.md` § 1 mô tả bảng Apr 2026 (áp từ 15/04/2026) —
  **sẽ lỗi thời** khi Oct 2026 áp dụng (RISK-10 task DUOS-005).
  ⚠ Lệch staging 2026-10-08: trang "Subscription" của store Plus
  `stg-duos-plus-2` đã hiển thị giá Oct 2026 — "Users & permissions"
  $150.00, "B2B Registration" $50.00, "B2B Quote request" $50.00, "CSV & SKU
  Quick order" $100.00, "B2B Shopping list" $150.00, "B2B Finance & credit"
  $200.00; checkbox U&P không còn "check sẵn, $0.00" — trong khi rule "User &
  Permission Free hay trả phí" còn tranh chấp (inventory/DUOS.md § 2.17,
  § 5 #1) — Need confirm PO.
- Mar 2026: yearly giảm 20%; monthly 4 module 5%, 6 module 10% (User &
  Permission tính vào số module); **không free plan / trial**, chỉ free cho
  dev store / Plus sandbox. — DUOS-320 comment Ashley 2026-03-23.
- Apr 2026: Portal tự detect Shopify plan và hiển thị giá đúng tier; plan
  ngoài 4 tier (Custom, Affiliate…) → giá Plus + card "Contact us to activate
  free testing"; **trial 30 ngày chỉ khi chọn ALL extension**; annual 20%;
  bundle như Plus. — DUOS-377 description. (**Corrected** "không trial" của
  Mar 2026.)
- Oct 2026 (đề xuất, Epic To Do): customization gộp vào giá; chỉ 2 tier Plus /
  non-Plus ("hiển thị cho Advanced"); 2 module free lên trả phí; "giữ nguyên
  discount 4 ext ~5%, 6 ext ~10% ~30-day trial". — DUOS-430 description.
- Store subscribe trước khi đổi giá vẫn bị Shopify charge giá cũ tới khi đổi
  plan; đổi pricing áp một loạt, ai vào trang cũng thấy giá mới. — haptt
  02/10/2026 (KB-001 draft).

### Trang pricing (DUOS-329, 365)

- Title "Subscription", subtitle "See costs and savings with our usage
  calculator.", link "Help Center", card "Add items to your estimate", nút
  "Select all"; panel "Estimate" toggle Monthly/Yearly. — DUOS-329.
  ⚠ Lệch staging 2026-10-08 (store Plus, Free plan): **không thấy** "Select
  all", panel "Estimate", toggle Monthly/Yearly, giá gạch, banner
  early-bird / trial; panel tên "Current subscription" (badge `Free`, "No
  items selected", "Subtotal" "-", "Total: $0 /mo"); item chia 3 nhóm
  "Company setup" / "B2B ordering" / "Finance & credit", 6 checkbox đều
  disabled; card "Get in touch with us" + "Contact sales". Có thể do store
  Free + Plus (inventory/DUOS.md § 2.17, § 5 #3) — Need confirm Dev toggle
  Monthly/Yearly còn không.
- "User & permission" check sẵn, disabled, "$0.00"; "Subscribe" disable khi
  chỉ có module free. — DUOS-329 (Mar 2026; sẽ đổi khi U&P trả phí).
- Store Free (selection disable): bỏ chọn mọi item, badge "Free", CTA "Build
  my subscription". — DUOS-365 (Ashley 2026-03-25).
  ⚠ Lệch staging 2026-10-08: CTA thật là **"Build my plan"** (badge `Free`,
  "No items selected" khớp) (inventory/DUOS.md § 2.17, § 5 #2) — Need confirm
  (đổi label chủ đích hay regression).
- Đã subscribe: modal cancel "Are you sure to cancel your plan?" / "Please
  note that canceling your subscription will deactivate all B2B features on
  your store." / [Contact sales] [Confirm cancellation]; nút "Add more items";
  không đổi gì → disable "Subscribe new pack". — DUOS-329.
- Extension chưa mua bị disable ở List extensions, Notifications, Translate.
  — DUOS-329 comment haild 2026-03-05.
  ⚠ Lệch staging 2026-10-08: store Free, 8 extension `Inactive` — row ở
  "B2B extensions hub" vẫn mở được trang cài đặt, alert "B2B extensions in
  Free plan are available for testing and setup only." / "…you can set up
  and save extension. However, to activate this extension on your online
  store, please upgrade to the Premium plan."; switch Notifications và tab
  Translations không disabled (inventory/DUOS.md § 2.2, 2.15, 2.16, § 5 #5) —
  Need confirm "disable" nghĩa là Inactive trên storefront hay khoá UI
  Portal. Copy "Premium plan" lệch mô hình modular — nghi vấn, xem known
  issues (§ 5 #4).
- Early-bird: banner "Your store is in Early-bird plan" (giữ quyền 6 module
  core, module mới là add-on), tự chọn mọi module. — DUOS-333.
- Discount code trên trang pricing (DUOS-369, QA Review) — chỉ có ảnh.

### SuggestedPlans + "30-day free trial unlocked" (DUOS-378, KB-002 active)

- 2 pack gợi ý ở đầu trang; chọn pack → tự chọn module; thêm/bớt module → bỏ
  chọn pack; chọn pack đầy đủ → banner "30-day free trial unlocked". — DUOS-378.
- Điều kiện hiện (code `src/pages/NewPricing.vue`):
  `!isShopifyPlus && (!isOldPlan || isFreeUser) && !isPartnerDevelopment && planName`;
  `isShopifyPlus` = true nếu `shopify_plus`, plan `Plus Trial`, `test`, hoặc
  `staff`. → Store dev thông thường **không thấy** SuggestedPlans. — Dev haild,
  Slack 05/10/2026 (KB-002). **Đã xác nhận Dev.**
- Banner trial cần thêm: chọn đủ mọi extension + `charge` chưa có
  `trial_ends_on`; đang trial thì hiện số ngày trial còn lại. — KB-002.
- Tên 2 pack + danh sách module từng pack: `Need confirm` (ticket không ghi).

### Story DUOS-431 — Pricing page update (PASS 2026-10-06)

- Bỏ giá gạch ở User & Permission; setting discount admin = 0% → FE không
  render "~150~ 150". — DUOS-431 description + haild 02/10. QA pass
  TC-DUOS-303, 304.
- Info banner dưới "Bill monthly at…": "As one of our early partners, your
  original subscription stays $168/mo as we agreed until you change your
  plan." — DUOS-431 description.
- **Corrected (Dev, chưa PO chốt):** banner hiện khi có charge active,
  `charge.price > 0`, và `charge.price` ≠ giá mới tính từ `plan.extensions`;
  số tiền + chu kỳ lấy động từ `charge.price` + `charge.interval`; không dùng
  `plan.price` (BE cập nhật khi store khác chọn cùng tổ hợp); mọi plan trả phí
  đều là custom plan "Custom: xxxx" nên "store có custom plan" (description)
  không phân biệt được. — haptt 02/10 09:42 (KB-001 **draft**). QA pass
  TC-DUOS-306, 307.

### Non-Plus — giới hạn & banner

- Chỉ 2 tính năng checkout cần Shopify Plus (block by permission, block by
  credit); non-Plus hiển thị disabled. — references/apps/DUOS.md.
- Banner "Shopify Plus required for this feature" ở trang User and permission
  và trang credit limit (DUOS-381); điều kiện chỉ `!isShopifyPlus` (KB-002).
  Key lang `non_plus_banner` ("Your current Shopify plan does not support…")
  có trong `content.json` nhưng **chưa component nào dùng** (KB-002).
- **Lỗi thời:** DUOS-123 (2025) khoá hoàn toàn non-Plus — đã bị thay bởi
  DUOS-375 / DUOS-377. Admin có setting "test" theo store để unlock (haild
  2025-06-20). Dev store không được approve charge (DUOS-124).
- DUOS-375 "Update permanent free" (04/2026): mở free mọi install trong
  "launch window", banner "You've earned FREE access to all features!" chỉ
  cho store pricing cũ + Free plan (haild 2026-04-03).
- Book onboarding/demo call chỉ hiện cho Plus và Advanced (DUOS-79, 387).

## Edge Cases

- Bundle discount Oct 2026 còn hay bỏ (Epic "giữ" vs Ashley "chắc là mình cx
  không giảm giá nữa", staging 0%)? `Need confirm` PO — **Blocker** (GAP-02).
- `charge.price` trước hay sau bundle discount? `Need confirm` Dev — Blocker
  (GAP-03).
- Basic / Grow / dev store dùng giá tier nào khi chỉ còn Plus / non-Plus?
  `Need confirm` PO — Blocker (GAP-01).
- Câu "early partners" áp cho mọi store giá cũ hay chỉ early-bird? `Need confirm`
  (GAP-05).
- "Change your plan" là thao tác nào? `Need confirm` (GAP-07).
- Merchant cũ đang dùng free Registration / U&P có bị khoá / tính phí? Từ
  ngày nào? `Need confirm` (GAP-06).
- U&P còn bắt buộc khi trả phí? Subscribe enable theo điều kiện nào?
  `Need confirm` (GAP-13).
- Annual 20% còn không; plan Custom/Affiliate giá nào; trial reinstall?
  `Need confirm` (GAP-11, 12).
- `isOldPlan` xác định thế nào? `Need confirm` (KB-002).
- Lệch staging 2026-10-08 chờ chốt: inventory/DUOS.md § 5 #1 (giá Oct 2026
  đã lên staging), #2 ("Build my plan"), #3 (không có Select all / Estimate /
  Monthly-Yearly), #5 (extension chưa mua không bị khoá UI) — xem dòng ⚠ ở
  Business Rules.
- DUOS-375 "permanent free" có còn hiệu lực với store vào trong launch window
  khi Oct 2026 tính phí? `Need confirm`.
- Discount code (DUOS-369) cộng dồn với bundle / annual thế nào? `Need confirm`.

## Testability Notes

- Giả lập non-Plus phía FE (chỉ đổi FE, reload là mất): DevTools → chọn iframe
  app → `Object.assign(window.shopifyAppEmbedded.user, { shopify_plus: false,
  partner_development: false, test: false, plan_name: 'basic',
  plan_display_name: 'Basic', charge: {} })` → sang trang khác rồi quay lại
  Pricing. — KB-002 (Dev haild 05/10/2026).
- Trước khi admin staging cấu hình giá mới, giá mới = giá cũ → không store nào
  thấy banner DUOS-431 (RISK-03).
- Verdict bản phân tích: Not Ready 7/14 (3 Blocker, 13 Major).
- Store `stg-duos-plus-2` (2026-10-08) đang **Free plan** của app ("Current
  subscription: Free") — inventory/DUOS.md § 0, § 2.17.

## Known Issues

Xem [known-issues.md](../known-issues/known-issues.md), tag `pricing-plans`.

## Related Jira Tickets

- [DUOS-98](https://ownego.atlassian.net/browse/DUOS-98) — Pricing, Epic (Done) — đợt 2025, không đọc chi tiết.
- [DUOS-123](https://ownego.atlassian.net/browse/DUOS-123) — Update limitation for non-Plus stores, Story (Done) — lỗi thời.
- [DUOS-124](https://ownego.atlassian.net/browse/DUOS-124) — [BE] Block charge approvals for development stores, Story (Done).
- [DUOS-320](https://ownego.atlassian.net/browse/DUOS-320) — Shopify Plus - Pricing Mar 2026, Epic (PASS) — modular pricing.
- [DUOS-329](https://ownego.atlassian.net/browse/DUOS-329), [DUOS-332](https://ownego.atlassian.net/browse/DUOS-332), [DUOS-333](https://ownego.atlassian.net/browse/DUOS-333), [DUOS-364](https://ownego.atlassian.net/browse/DUOS-364), [DUOS-365](https://ownego.atlassian.net/browse/DUOS-365), [DUOS-375](https://ownego.atlassian.net/browse/DUOS-375) — Story (Done) — trang pricing, access control, early-bird, banner, Free plan, permanent free.
- [DUOS-369](https://ownego.atlassian.net/browse/DUOS-369) — [Portal] Discount code apply in pricing page, Story (QA Review) — chỉ ảnh.
- [DUOS-377](https://ownego.atlassian.net/browse/DUOS-377) — Non-Plus Pricing, Epic (Done); [DUOS-378](https://ownego.atlassian.net/browse/DUOS-378), [DUOS-380](https://ownego.atlassian.net/browse/DUOS-380), [DUOS-381](https://ownego.atlassian.net/browse/DUOS-381) — Story (Done).
- [DUOS-430](https://ownego.atlassian.net/browse/DUOS-430) — Pricing Oct 2026, Epic (To Do) — đề xuất.
- [DUOS-431](https://ownego.atlassian.net/browse/DUOS-431) — Pricing page update, Story (PASS) — banner giữ giá cũ.
- [DUOS-427](https://ownego.atlassian.net/browse/DUOS-427) — Pricing update, Story (To Do) — trống, có thể trùng DUOS-430/431.

## Source

- Jira DUOS (Atlassian MCP), đọc 2026-10-07.
- QA Hub task DUOS-005 + KB-001, KB-002, đọc 2026-10-07.
- `references/apps/DUOS.md` § 1.
- `knowledge-work/inventory/DUOS.md` (build 2026-10-08) § 2.2, 2.17, § 5 #1–5.
