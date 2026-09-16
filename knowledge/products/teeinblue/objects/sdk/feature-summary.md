# Object: SDK (product: teeinblue) — Feature Profile Summary

- **Published context version:** 2 (INCREMENTAL_UPDATE, `CTX-20260912-05`, 2026-09-12, env: staging) — version 1 gốc `CTX-20260912-04` (knowledge-restructure, tách ra từ object Campaign)
- **Mode:** v1 hình thành từ tách object Campaign (không phải explore mới); v2 là INCREMENTAL_UPDATE bổ sung evidence thật (localStorage, grouped_clipart 2-step, post-ATC persistence, server sync) trên nền v1, không phải structural rewrite
- **Actor test:** `guest` (storefront, không login) trên cả 2 store — store1 = SDK v1, store2 = SDK v2 — và `owner` (portal, multi-store launch). **Chưa test buyer đã login.**
- **CHỈ 1/1 feature có profile.** Object `sdk` hiện chỉ có đúng **FEAT-07 — storefront-buyer-facing** được profile hoá. Không có FEAT-00…06/08+ nào khác cho object này trong repo — đây là tín hiệu completeness quan trọng: **coverage cấp object đang ở mức tối thiểu**, mọi khía cạnh khác của SDK ngoài phạm vi 1 feature này (nếu tồn tại) CHƯA được khám phá.
- **Checklist:** thư mục `checklists/` chỉ có đúng 1 file `storefront-buyer-facing.json` — khớp 1-1 với feature duy nhất, không có checklist nào khác.

---

## FEAT-07 — Campaign Storefront / Buyer-Facing Behavior
**Goal:** Buyer/guest xem và tương tác với sản phẩm của 1 campaign đã publish trên storefront — vượt password-gate, xem trang sản phẩm, personalize (kể cả draft cá nhân hoá đệm tạm ở client), preview mockup, add-to-cart, cart.

**Entry points:**
- `linh-explorer.myshopify.com` (store1) / `linh-explorer-2.myshopify.com` (store2) → `/password` → route sản phẩm campaign 2595 (cần `TIB_STORE_PASSWORD` hợp lệ)
- URL sản phẩm thật đã publish (xác nhận qua href DOM + GraphQL `campaign_instances.handle/platform_linked_id`)
- `GET /api/merchant/campaigns/{platformProductId}.json` — bootstrap config cá nhân hoá, **public, không cần auth**

**Capabilities:**
1. Vượt password-gate, xem trang sản phẩm đã publish (cả 2 store)
2. Personalization: chọn variant + dependency 2 cấp, radiogroup lồng ~10 clipart (SDK v1, store1)
3. Personalization: cặp cha-con là 1 đơn vị required duy nhất, grid ~9 clipart (SDK v2, store2)
4. Client-side draft persistence qua localStorage (`teeinblue-customizations`, `teeinblue-global-options`) — **capability hiếm KHÔNG tách v1/v2**, hành vi/shape giống hệt nhau ở cả 2 SDK; ghi đồng bộ khi click (radio/clipart), chỉ ghi khi blur (field text)
5. grouped_clipart cần đủ 2 bước (radio nhóm + click thumbnail con) mới thực sự hợp lệ (SDK v2) — thiếu bước con làm ATC fail thật, ZERO request tới APIOP-051 (chặn client-side)
6. Artwork preview: lightbox mockup TĨNH (SDK v1) vs SVG sống map theo layer-id (SDK v2) — 2 cơ chế hoàn toàn khác nhau
7. Pricing display: giá theo variant cập nhật đúng; giá ATC khớp hiển thị, tăng tuyến tính theo quantity (SDK v2, 1 sample)
8. Add-to-cart (SDK v1) — **CHƯA xác nhận hoàn tất**, banner lỗi + 0 network request, tái hiện 2 template (CONFLICT-001)
9. Add-to-cart (SDK v2) — hoàn tất thành công toàn trình, NHƯNG lần thử đầu tiên trong run này fail thật do thiếu click con grouped_clipart (CONFLICT-003)
10. Post-ATC persistence: localStorage giữ nguyên byte-identical sau ATC thành công lẫn sau clear cart (chỉ xác nhận SDK v2)
11. Server sync tại ATC: `POST .../shopify/customization` (APIOP-051) chỉ fire đúng lúc ATC (SDK v2), absent khi ATC fail do validation client-side
12. Cart handoff/line-item: chỉ có property nội bộ `_`-prefix, không tìm thấy "edit personalization từ cart" (chỉ SDK v2 — SDK v1 chưa từng chạm network layer)
13. Multi-store publish pre-flight check: `GET /themes/app-block-enabled` trước khi cho publish (portal, owner, 1 sample thành công)
14. Publish tạo Shopify product độc lập theo từng store (platform_linked_id riêng biệt, xác nhận 2 nguồn)

**Coverage:**
storefront guest SDK v1 (store1) ✅ · storefront guest SDK v2 (store2) ✅ · localStorage draft persistence (cả 2 store) ✅ · post-ATC persistence SDK v2 ✅ / SDK v1 ❌ · portal owner multi-store launch ✅ · api store1 ✅ · api store2 (+APIOP-051 presence/absence) ✅ · APIOP-051 full contract (body/auth/error-path) ❌ · **data layer ❌ (toàn bộ)** · template 1 & 3 (cả 2 store, kể cả 2-step grouped_clipart) ❌ · field-remount pre-fill cho radio/clipart ❌ (chỉ xác nhận field text, 1 sample) · TTL/expiry localStorage ❌ · buyer logged-in ❌ · non-US market/locale/currency ❌ · mobile/tablet viewport ❌ · edit-from-cart (SDK v2) ❌

**Confidence:** MEDIUM

**Risks/Unknowns:**
- **(P1) CONFLICT-001 UNRESOLVED** — SDK v1 (store1) add-to-cart CHƯA rõ hoạt động hay không: evidence automation HIGH-weight (0 network request, tái hiện 2 template) mâu thuẫn lời khai manual-test LOW-weight của user (không có file evidence). Không có bằng chứng mới ở v2.
- **(P1) CONFLICT-003 UNRESOLVED (mới)** — lần ATC đầu tiên store2/SDK v2 trong run này fail thật (thiếu click con grouped_clipart), mâu thuẫn khung "ATC store2 đã known-working" kế thừa từ run trước; 2 khả năng đều INFERRED, chưa kết luận, và liên hệ với CONFLICT-001 cũng CHƯA xác nhận.
- CONFLICT-002 UNRESOLVED — nhãn heading cha "dog" vs field con "cat" (store2) không khớp, chưa rõ lỗi copy hay quy ước nội bộ.
- Endpoint bootstrap config cá nhân hoá không yêu cầu authorization — public data exposure tiềm ẩn, chưa khẳng định là defect.
- TTL/expiry thật của localStorage draft, hành vi group-click-alone (chỉ click radio nhóm), field-remount pre-fill cho field non-text — đều CHƯA xác định.
- Template 1/3, buyer logged-in, market/locale/currency khác, mobile/tablet viewport, "edit từ cart" trên SDK v2 — hoàn toàn chưa test.
- Toàn bộ hành vi post-ATC/server-sync/grouped_clipart-2-step trên SDK v1 CHƯA xác nhận vì store1 chưa từng tới được bước ATC trong bất kỳ run nào tính tới nay.

**Gate:** CONDITIONAL_PASS, kèm điều kiện bắt buộc cho bước tiếp theo:
- context-quality-reviewer phải review CONFLICT-003 cùng CONFLICT-001/002 trước khi publish thay version 1
- checklist ATC của SDK v2 BẮT BUỘC tách rõ bước "click radio nhóm" và "click thumbnail con" thành 2 case riêng (không gộp ngầm)
- KHÔNG được viết case khẳng định ATC store1 PASS/FAIL dứt khoát — chỉ "needs manual re-verification (CONFLICT-001)"
- oracle liên quan nhãn field template store2 phải ghi chú rõ mâu thuẫn dog/cat (CONFLICT-002), không chọn 1 nhãn làm chuẩn
- knowledge-diff-analyzer phải highlight đây là update bổ sung cơ chế mới + conflict mới, không phải patch nhỏ

---

## Gaps ở cấp Object (áp dụng cho toàn bộ object `sdk`)

| Gap | Ghi chú |
|---|---|
| **Chỉ có 1 feature profile** | Object `sdk` mới chỉ profile hoá FEAT-07 (storefront-buyer-facing). Không rõ SDK còn feature nào khác chưa được đưa vào scope — cần qa-context-scope-planner xác nhận đây đã là toàn bộ phạm vi object hay còn thiếu. |
| **Data layer (DB)** | NOT_OBSERVED hoàn toàn — mọi state chỉ dựa trên response API/localStorage/DOM, chưa xác nhận qua DB thật |
| **CONFLICT-003 UNRESOLVED** (theo `publish_conditions_applied`) | Grouped_clipart 2-step KHÔNG được diễn giải là xác nhận hay phủ nhận baseline "store2 ATC works" từ run trước |
| **Post-ATC persistence & APIOP-051** (theo `publish_conditions_applied`) | Chỉ xác nhận trên SDK v2 — SDK v1 chưa từng tới ATC trong bất kỳ run nào tính tới nay |
| **TTL/expiry localStorage** (theo `publish_conditions_applied`) | Vẫn NOT_OBSERVED |
| **Template coverage** | Toàn bộ evidence dependency 2 cấp & 2-step grouped_clipart chỉ dựa trên 1-2 template (chủ yếu template 2); template 1/3 hoàn toàn chưa test trên cả 2 SDK |
| **Biến thiên phổ biến chưa test** | buyer logged-in, market/locale/currency ngoài US-default, mobile/tablet viewport — 0% coverage |
| **APIOP-051 contract** | Chỉ quan sát được presence/absence lúc ATC; full request/response body, auth, error-path (4xx/5xx) chưa test |

**Kết luận nhanh cho reviewer:** object `sdk` đang ở giai đoạn coverage rất sớm — 1 feature, 2 conflict UNRESOLVED nghiêm trọng liên quan trực tiếp tới add-to-cart (trụ cột của luồng mua hàng), và toàn bộ data layer + nhiều biến thiên phổ biến (device, locale, logged-in) chưa được chạm tới.
