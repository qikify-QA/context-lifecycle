# Object: Campaign (product: teeinblue) — Feature Profile Summary

- **Published context version:** 1 (bootstrap, `CTX-20260912-02`, 2026-09-12, env: staging)
- **Mode:** ZERO_DOC_BOOTSTRAP — toàn bộ profile là OBSERVED_CURRENT (chưa có CONFIRMED_EXPECTED nào từ spec/PO/dev)
- **Actor test trong toàn bộ run:** duy nhất role `owner` (Linh explorer, sub=273), 1 organization
- **6/7+ feature đã có profile.** FEAT-05 không tồn tại (nhảy số, chưa giải thích), FEAT-07 (storefront buyer-facing) **chưa có file profile** — bị chặn vì storefront password-protected, trạng thái UNKNOWN/PARTIAL.

---

## FEAT-00 — Campaign Navigation & Session Access
**Goal:** Mở đúng entry point cho 1 trong 2 flow tạo Campaign, duy trì phiên portal hợp lệ.
**Entry points:** Sidebar `Campaigns` → `by Product Base` (`/campaigns`) · `by Shopify Products` (`/platform-products`)

**Capabilities:**
- Điều hướng tới 2 entry point tạo campaign tách biệt
- Duy trì phiên (JWT tự refresh nền qua `POST /api/token/refresh`, TTL 900s)

**Coverage:** portal ✅ · api ✅ · non-owner ❌ · data ❌
**Confidence:** LOW (cả 2 KB nguồn chỉ observed_count=1)
**Risks/Unknowns:**
- Sidebar có khác theo role/feature-flag khác owner không — chưa test
- Token có refresh khi tab background/inactive không — chưa quan sát

**Gate:** PASS

---

## FEAT-01 — Create Campaign by Product Base
**Goal:** Tạo campaign gắn Product Base có sẵn, gán artwork theo print area, publish 1 hoặc nhiều store.
**Entry points:** `/campaigns/new` → redirect `/campaigns/{id}/edit`

**Capabilities:**
1. Tạo campaign shell với title (2 field: title bắt buộc, tags optional)
2. Chọn Product Base, xem Print Areas riêng biệt (khác FEAT-02)
3. Gán artwork theo print area (batch) — "Select artwork for all" → ready to launch
4. Cấu hình Listing info (tuỳ chọn, không bắt buộc để launch)
5. Publish qua Multi-store launch dialog — **per-store**, không batch (`{instance_id}` mỗi lần gọi)

**Coverage:** portal (draft/ready/published) ✅ · api ✅ · data ❌ · storefront (guest) ❌ · non-owner ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- Toast lỗi 422 (title rỗng) có hiển thị cho user không — chưa xác nhận, chỉ biết API trả lỗi
- Validation đầy đủ Campaign title (min/max, ký tự đặc biệt, uniqueness) — chỉ test case rỗng
- Multi-store publish đồng thời hay bắt buộc từng store — chỉ quan sát 1-store call
- Publish thất bại/partial — chưa quan sát

**Gate:** CONDITIONAL_PASS (không tổng quát hoá validation title; không dùng suy đoán header sau publish làm oracle)

---

## FEAT-02 — Create Campaign by Shopify Product
**Goal:** Tạo campaign gắn 1 sản phẩm Shopify thật, gán artwork phẳng (không print area), upload mockup, publish trực tiếp lên store cố định.
**Entry points:** `/platform-products` (empty state) → `/platform-products/new`

**Capabilities:**
1. Chọn store + sản phẩm Shopify thật (không có bước print area; sản phẩm đã publish qua FEAT-01 bị khoá "Used")
2. Tạo platform-product shell
3. Gán artwork phẳng cho toàn sản phẩm (đối lập print-area của FEAT-01)
4. Resolve validation "No mockup" bằng upload + assign mockup
5. Publish trực tiếp — **không** dialog chọn store (khác FEAT-01)
6. Unpublish (reversible)

**Coverage:** portal (draft/artwork/published-unpublished) ✅ · api ✅ · data ❌ · multi-variant product ❌ · storefront (guest) ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- Toggle "Connect artworks with Shopify variants" khi bật — chưa test
- Mockup per-variant với sản phẩm nhiều variant thật — store demo chỉ có 1 variant
- Validation "No mockup" chỉ 1 sample — chưa tổng quát hoá

**Gate:** CONDITIONAL_PASS (không tổng quát hoá "No mockup"; không dùng per-variant behavior chưa test làm oracle)

---

## FEAT-03 — Browse & Manage Campaign Lists
**Goal:** Xem/lọc/tìm danh sách campaign (cả 2 loại) để theo dõi trạng thái và truy cập action quản lý.
**Entry points:** `/campaigns` · `/platform-products`

**Capabilities:**
1. Danh sách by-product-base: filter tabs All/Published/Unpublished/Archived/Update required + filter Search/Store/Type/Vendor/Tags
2. Danh sách by-shopify: filter tabs chỉ All/Published/Unpublished (không Archived) + filter Search/Tags/Store
3. Row actions: icon rocket (Multi-store launch), edit, overflow `...` (See info, View logs, Duplicate, Mark as archive, Import to Translation, Delete) — **chỉ Delete được thực thi**

**Coverage:** portal (empty/non-empty) ✅ · api ✅ · filter/search applied ❌ · data ❌
**Confidence:** MEDIUM
**Risks/Unknowns:**
- 5/6 action-menu item chưa từng thực thi — zero coverage chức năng
- Liên kết mở menu `...` ↔ 2 GraphQL query là INFERRED (proximity), chưa xác nhận nhân-quả
- Bulk creator (`/campaigns/bulk-editor`) và Bulk Fulfill — hoàn toàn chưa khám phá
- Filter/search chưa test với giá trị thật

**Gate:** CONDITIONAL_PASS (không dùng liên kết INFERRED làm oracle; filter/action-menu phụ đánh dấu "existence only")

---

## FEAT-04 — Delete Campaign (by Product Base)
**Goal:** Xoá vĩnh viễn 1 campaign by-product-base, tuỳ chọn xoá kèm artwork/product base liên kết.
**Entry points:** `/campaigns` → row `...` → "Delete campaign"

**Capabilities:**
1. Xoá campaign không kèm tài nguyên liên kết (mặc định, checkbox unchecked) — `DELETE /api/campaigns/{id}?remove_linked_resources=0` → 204

**Coverage:** portal (unchecked, throwaway) ✅ · api ✅ · checkbox checked ❌ · campaign đã published ❌ · data ❌
**Confidence:** LOW (chỉ 1 kb_id, 1 lần thực thi)
**Risks/Unknowns:**
- `remove_linked_resources=1` (checkbox tick) — hoàn toàn chưa test, rủi ro mất dữ liệu dùng chung
- Xoá 1 campaign đã publish (có Shopify product thật) — chưa quan sát
- Platform-product (FEAT-02) có Delete tương đương hay chỉ có Unpublish — chưa xác nhận là thiết kế cố ý

**Gate:** CONDITIONAL_PASS (không tổng quát hoá hành vi xoá; flag rõ nhánh checked/published-campaign là chưa có oracle)

---

## FEAT-06 — Campaign Security & Permission Model
**Goal:** Đảm bảo đúng role/phạm vi được phép thao tác Campaign (cross-cutting, áp dụng cho FEAT-01/02/04).
**Entry points:** n/a (quan sát qua `GET /api/staff` + GraphQL của Multi-store launch)

**Capabilities:**
1. Owner có toàn quyền CRUD/publish trên cả 2 flow (`view-campaigns`/`manage-campaigns`)
2. ⚠️ READ surface của Multi-store launch trả dữ liệu **toàn Organization** (bao gồm store ngoài phạm vi, vd `linh-explorer-2`)

**Coverage:** api/portal (owner) ✅ · non-owner/staff hạn chế ❌ · cross-tenant ❌ · invalid/forbidden token ❌
**Confidence:** MEDIUM
**Risks/Unknowns (P1):**
- RBAC negative-case (role khác owner) — chưa test trên **bất kỳ** endpoint Campaign nào
- GraphQL mutation có tuân theo authorization boundary per-store/per-org như REST publish không — chưa test
- READ surface org-wide có phải lỗ hổng tenant-isolation nếu enforcement chỉ ở UI — chưa xác nhận
- `TIB_FORBIDDEN_TOKEN`/`TIB_INVALID_TOKEN` — chưa test trên endpoint nào

**Gate:** CONDITIONAL_PASS — đây là **gap bảo mật lớn nhất** của object Campaign, ưu tiên cao cho lần refresh kế tiếp

---

## Gaps ở cấp Object (áp dụng cho MỌI feature trên)

| Gap | Ghi chú |
|---|---|
| **Data layer (DB)** | NOT_OBSERVED cho toàn bộ 6 feature — mọi state_delta chỉ dựa trên response API/GraphQL, chưa xác nhận qua DB thật (db-explorer bị skip, không có read-only DB access) |
| **Code-level facts** | code-config-explorer bị skip (không có source code app trong repo này) |
| **RBAC / cross-tenant / invalid-token** | Chưa test độc lập trên bất kỳ endpoint Campaign nào — P1 risk (xem FEAT-06) |
| **Storefront buyer-facing (FEAT-07)** | Chưa có profile — bị chặn vì storefront password-protected, không có credential trong scope run này. **Không được diễn giải là đã cover** |
| **FEAT-05** | Bị nhảy số trong sequence (FEAT-04 → FEAT-06), chưa có giải thích — reviewer đánh dấu MINOR, không block |
| **Checklist confidence** | 45/80 check (56%) là NEEDS_CONFIRMATION — baseline observed 1 phiên, chưa phải business rule đã confirm |

**Review độc lập:** context-quality-reviewer → verdict `APPROVED_WITH_CONDITIONS` (đã fix 2 lần redaction PII/signed-URL trước publish).
