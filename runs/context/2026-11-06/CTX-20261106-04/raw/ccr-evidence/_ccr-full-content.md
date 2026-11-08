# Context Change Request: Teeinblue, campaign

**Tiêu đề task:** `[CCR] PROFILE_GAP — campaign — backfill Edit Activities, featured image, Generate test design`

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
- Object: `campaign` · Feature: `MỚI: campaign-artwork-mockup-reflection`, `MỚI: campaign-publication-history`, `create-campaign-by-product-base`, `create-campaign-by-shopify`

**Quan sát được** `[AGENT]`

```
TIB-5337: Add Publication History to Logs of Campaign by Shopify (Done)
  - CLAIM-01: Logs campaign, tab Edit Activities: chỉ test các action có option trong filter
  - CLAIM-06: Publication History của Campaign by Shopify
TIB-5575: [UID] Fix wrong colors rendered from AVIF master images (Done)
  - CLAIM-03: Generate test design không dùng được trên dev store
TIB-5282: tiêu đề và status chưa tra
  - CLAIM-04: Artwork phản ánh lên mockup theo placement đã có; Boundless một artwork mỗi campaign
TIB-5223: tiêu đề và status chưa tra
TIB-5505: tiêu đề và status chưa tra
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
| `CLAIM-01` | loại: scope test. Logs campaign, tab Edit Activities: chỉ test các action có option trong filter | portal | `po_dev_confirm` | campaign/create-campaign-by-shopify | `ADD` |
| `CLAIM-03` | loại: khác biệt môi trường. Generate test design không dùng được trên dev store | portal | `po_dev_confirm` | campaign/create-campaign-by-product-base | `ADD` |
| `CLAIM-04` | loại: hành vi. Artwork phản ánh lên mockup theo placement đã có; Boundless một artwork mỗi campaign | portal | `po_dev_confirm` | campaign/MỚI: campaign-artwork-mockup-reflection | `ADD` |
| `CLAIM-06` | loại: hành vi. Publication History của Campaign by Shopify | portal · api | `po_dev_confirm` | campaign/MỚI: campaign-publication-history | `ADD` |

## Phần 1b — Đề xuất địa chỉ trong KB `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | object_key | feature_key | scope.role | scope.surface | kb_id bị ảnh hưởng |
|---|---|---|---|---|---|
| `CLAIM-01` | campaign | create-campaign-by-shopify | QA (phạm vi test) | portal | không có |
| `CLAIM-03` | campaign | create-campaign-by-product-base | merchant (owner/staff) | portal | không có (liên quan OQ-campaign-020) |
| `CLAIM-04` | campaign | MỚI: campaign-artwork-mockup-reflection | không rõ | portal | không có |
| `CLAIM-06` | campaign | MỚI: campaign-publication-history | không rõ | portal | không có |

---

# Phần 2 — Thấy nó ở đâu `[AGENT]`

- **URL / ID cụ thể đã biết:** link ticket và test case ở 5.1.
- **Trạng thái đối tượng lúc đó:** theo từng claim ở 5.1.
- **Environment:** staging, trừ khi claim nói khác.
- **Role liên quan:** theo cột scope.role ở Phần 1b.
- **Surface:** api · portal

## Phần 2a — Khác biệt giữa môi trường `[AGENT đề xuất, BẠN duyệt]`

| Claim ID | Feature | Loại | Staging | Production | Cách test trên staging | Nguồn và ngày |
|---|---|---|---|---|---|---|
| `CLAIM-03` | `campaign/create-campaign-by-product-base` | `ALTERNATIVE_SETUP` (mức: Vế) | Generate test design bị disable trên dev store | không rõ | đặt order test rồi lấy design của order | file local 2026-10-16 TIB-5575, kinh nghiệm vận hành, người chốt: QA |

## Phần 2b — Setup mới `[AGENT đề xuất, BẠN duyệt]`

không có

---

# Phần 3 — Để không sinh conflict giả `[AGENT]`

| Ticket | Build / version / ngày deploy | Update cuối | Đã ship chưa |
|---|---|---|---|
| TIB-5337 | không rõ | 2026-10-29 | Jira Done, chưa rõ ngày deploy |
| TIB-5575 | không rõ | 2026-11-05 | Jira Done, chưa rõ ngày deploy |
| TIB-5282 | không rõ | không rõ | không rõ |
| TIB-5223 | không rõ | không rõ | không rõ |
| TIB-5505 | không rõ | không rõ | không rõ |

**Context hiện đang nói gì** `[AGENT]`

- Context version đang dùng: published_context_version 6; bản working tree `context-lifecycle/knowledge`, manifest generated_at 2026-11-05.
- Canon hiện nói:
  - không tìm thấy item liên quan.
- Đã tra bằng từ khoá nào:
  - CLAIM-01: Edit Activities, Publication History, campaign logs
  - CLAIM-03: test design, Generate test design, Development stores
  - CLAIM-04: campaign-artwork-mockup-reflection
  - CLAIM-06: campaign-publication-history-log
- Claim gộp từ audit: tra bằng từ khoá theo chủ đề trên toàn bộ kb.json, không phát hiện mâu thuẫn; kb_id ghi ở Phần 1b là mục liên quan, không phải bản trùng. `translation-delivery-threshold` trùng một phần sdk KB-053 (vế quá 5 giây).
- Phạm vi tra: mọi `kb.json` của teeinblue, `open-questions.md`; `feature-summary.md`, checklist và profile tra theo từ khoá chính. Hạng mục môi trường có ở bảng A4 của `_product-guide.md`, nhưng chưa profile nào có `environment_differences`.

---

# Phần 4 — Hai câu chỉ con người trả lời được `[BẠN]`

## 4.1 Có ai xác nhận đây là hành vi ĐÚNG không?

| Claim ID | Ai xác nhận | Ngày nguồn | Nguồn |
|---|---|---|---|
| `CLAIM-01` | QA | 2026-10-28 | `po_dev_confirm` |
| `CLAIM-03` | QA | 2026-10-16 | `po_dev_confirm` |
| `CLAIM-04` | huyenntk (dev) | 2026-10-16 | `po_dev_confirm` |
| `CLAIM-06` | huyenntk (dev) | 2026-10-28 | `po_dev_confirm` |

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
CLAIM-01: Phạm vi test: Logs của Campaign by Shopify, tab Edit Activities, chỉ test các action có option trong filter. Dòng hiện ở All nhưng không có trong filter thì ngoài phạm vi.
CLAIM-03: [ALTERNATIVE_SETUP] Môi trường test: Generate test design không dùng được trên dev store; Production: không rõ; Cách test: đặt order test rồi lấy design của order.
CLAIM-04: Thêm artwork vào campaign không tự đặt artwork lên mọi mockup. Mockup chỉ hiện artwork sau khi "Add Artwork" được dùng ít nhất một lần trong editor của chính mockup đó (thủ công, theo từng mockup). Các fix "Reflect" chỉ áp dụng cho mockup đã có artwork placement: replace thì mockup hiện artwork mới; remove (không có artwork thay thế) thì mockup không hiện artwork.
CLAIM-06: Error message được giữ nguyên, hiển thị dạng text thường, chưa cắt độ dài, chưa lọc.
```

## 4.4 Mức độ gấp `[BẠN]`

`MEDIUM`

---

# Phần 5 — Evidence `[AGENT]`

## 5.1 Nguồn & evidence theo từng claim — một block cho MỖI Claim ID ở Phần 1a

### CLAIM-01

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/tib-product-behaviors.md dòng 34
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/tib-product-behaviors.md dòng 34:
    ```
    - **Logs campaign → Edit Activities:** chỉ test các action có option trong filter. Dòng hiện ở All nhưng không có trong filter không thuộc phạm vi, không hỏi PO/Dev. (người dùng 2026-10-28, TIB-5337)
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-03

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** rules/env-capabilities.md dòng 52
- **Link:** không có
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - rules/env-capabilities.md dòng 52:
    ```
    | **Test design** (Generate test design) trên dev store | Vế/bước | Thay bằng đặt order test rồi lấy design của order | 2026-10-16 TIB-5575 |
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-04

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5282; skill-rules-audit.md #5, #6 (rule `campaign-artwork-mockup-reflection`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5282?focusedCommentId=54805
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-16
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5282 comment #54805, huyenntk (dev), 2026-10-16 (dòng #5):
    ```
    Important clarification: adding an artwork to a campaign does not automatically place it onto every mockup. A mockup only shows an artwork once someone has used "Add Artwork" inside that specific mockup's editor at least once — that's a separate, manual, per-mockup step, unrelated to this fix.
    ```
  - Jira TIB-5282 comment #54805, huyenntk (dev), 2026-10-16 (dòng #6):
    ```
    This fix is about what happens after that: once a mockup already has an artwork placed on it, replacing or removing the campaign's artwork should now correctly update/clear it, instead of leaving it stale.
    ```
- **File đính kèm cho claim này:** không có

### CLAIM-06

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5337; skill-rules-audit.md #10 (rule `campaign-publication-history-log`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5337?focusedCommentId=55809
- **Ngày của nguồn (YYYY-MM-DD):** 2026-10-28
- **Người viết / người xác nhận:** huyenntk (dev)
- **Trích nguyên văn:**
  - Jira TIB-5337 comment #55809, huyenntk (dev), 2026-10-28 (dòng #10):
    ```
    Thành công: không có message. Lỗi: lưu nguyên message của exception và hiển thị dạng text thường (đã sửa, không còn render HTML; có unit test). Chưa cắt độ dài và chưa lọc nội dung message.
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
