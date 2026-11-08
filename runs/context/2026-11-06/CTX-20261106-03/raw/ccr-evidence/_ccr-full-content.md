# Context Change Request: Teeinblue, order

**Tiêu đề task:** `[CCR] PROFILE_GAP — order — backfill Edit customization, tracking provider`

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
- Object: `order` · Feature: `MỚI: edit-customization-after-order`, `MỚI: order-shopify-webhook-sync`, `review-and-initiate-fulfillment-portal`

**Quan sát được** `[AGENT]`

```
TIB-5510: Block checkout when a required addon product is missing from cart (Done)
  - CLAIM-01: Edit customization ở Thank You và Order status page: campaign Shopify product sửa được; campaign by product base link có hiện, click thì báo không hỗ trợ edit
TIB-5439: Fix ambiguous "order_item_activities" log for manual "sent" change vs "Confirm & Send" (Done)
  - CLAIM-02: Tracking từ provider không test được trên staging
TIB-5219: tiêu đề và status chưa tra
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
| `CLAIM-01` | loại: hành vi. Edit customization ở Thank You và Order status page: campaign Shopify product sửa được; campaign by product base link có hiện, click thì báo không hỗ trợ edit | storefront | `po_dev_confirm` | order/MỚI: edit-customization-after-order | `ADD` |
| `CLAIM-02` | loại: khác biệt môi trường. Tracking từ provider không test được trên staging | portal | `po_dev_confirm` | order/review-and-initiate-fulfillment-portal | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | order | MỚI: edit-customization-after-order | buyer | storefront | không có (OQ-order-011 nói về nút cùng tên ở Portal) |
| `CLAIM-02` | order | review-and-initiate-fulfillment-portal | merchant (owner/staff) | portal | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** api · portal · storefront

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Feature | Loại | Staging | Production | Cách test trên staging | Nguồn và ngày |
|---|---|---|---|---|---|---|
| `CLAIM-02` | `order/review-and-initiate-fulfillment-portal` | `NOT_TESTABLE` (mức: Case) | không có tracking thật từ provider; fulfill tay trên Shopify đi đường khác, không thay được | không rõ | không test được; case gắn env-blocked, status skipped | QA 2026-10-29, TIB-5439 |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5510 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5439 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5219 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 5; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - CLAIM-01: order/place-personalized-order-storefront KB-010 (OBSERVED_CURRENT, cập nhật 2026-09-13): "Sau khi thanh toán bằng Test Payment Gateway (card '1'/approved) ở storefront/GUEST/staging, quan sát thấy trang /thank-you hiển thị: Confirmation #JTEL87JY0, heading 'Thank you, QA!', 'Your order is confirmed', chi tiết contact/shipping/billing/payment method…"
  - CLAIM-02: không tìm thấy.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: Edit customization, Thank You, Order status page, customize
  - CLAIM-02: tracking, fulfilled, provider
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

**Mâu thuẫn giữa các nguồn, xử lý theo quy tắc lấy nguồn có ngày mới nhất:**

- CLAIM-01: File local 2026-10-29 ghi "không có cho product base"; rule #144 ngày 2026-08-27 và TC-TIB-982 ghi link vẫn hiện. QA chốt 2026-11-05 theo #144, mốc này mới nhất.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-11-05 (QA chốt vế product base); 2026-10-29 (dòng file local) | `po_dev_confirm` |
| `CLAIM-02` | QA | 2026-10-29 | `po_dev_confirm` |

Họ xác nhận chính xác điều gì: xem trích nguyên văn ở 5.1.

**Cần người xác nhận:**

- không có

## 4.2 KHÔNG đề xuất điều gì?

```
- Số liệu trong trích dẫn (limit, ngưỡng, cap thử nghiệm) là số tại thời điểm nguồn, không phải giá trị của mọi môi trường.
- feature_key và object_key ghi MỚI chỉ là đề xuất tên.
- Không đề xuất ghi đè canon. Claim CONTRADICTS giữ cả hai phía.
- Hướng dẫn test trong file local (hỏi cap thực tế, tên account, id data) không phải rule sản phẩm.
```

## 4.3 Đề xuất context nên nói gì `[AGENT soạn, BẠN duyệt]`

```
CLAIM-01: Sau order, buyer sửa customization ở Thank You page và Order status page với campaign Shopify product. Với campaign by product base, link Edit Customization vẫn hiện; click thì sang trang customize và báo không hỗ trợ edit: "Your design does not support edit for now, contact shop owner".
CLAIM-02: [NOT_TESTABLE] Môi trường test: không có tracking từ provider, fulfill tay trên Shopify đi đường khác nên không thay được; Production: không rõ; Cách test: không chạy.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 33; TC-TIB-965, TC-TIB-978, TC-TIB-981; TC-TIB-982; skill-rules-audit.md #144 và mục 3a
- **Link:** https://qa-hub.ownego.com/test-cases/TC-TIB-978
- **Ngày của nguồn (YYYY-MM-DD):** 2026-11-05 (QA chốt vế product base); 2026-10-29 (dòng file local)
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 33:
    ```
    - **Edit customization** chỉ ở Thank You page + Order status page, chỉ cho campaign Shopify product (không có cho product base, không có ở /cart). (người dùng 2026-10-29, TIB-5510)
    ```
  - Testlane TC-TIB-978, actualResult:
    ```
    The design is editable, as required for campaign by Shopify.
    ```
  - skill-rules-audit.md mục 3a, QA chốt 2026-11-05:
    ```
    Người dùng chốt 2026-11-05: với product base, link có hiện, click thì báo không hỗ trợ edit (khớp #144 và TC-TIB-982)
    ```
  - Testlane TC-TIB-982, expectedResult:
    ```
    Link is shown (by design), redirects to the customize page, which displays Your design does not support edit for now, contact shop owner
    ```
  - skill-rules-audit.md #144:
    ```
    Với campaign **by Product base**: link **vẫn hiển thị** (đúng thiết kế), click → sang trang customize → / hiện message `Your design does not support edit for now, contact shop owner`.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-02

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 55
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-29
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 55:
    ```
    | **Tracking từ provider** (fulfilled theo tracking) | Case | `env-blocked` → skipped. Fulfill tay trên Shopify đi đường khác, không thay được | người dùng 2026-10-29 TIB-5439 |
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
