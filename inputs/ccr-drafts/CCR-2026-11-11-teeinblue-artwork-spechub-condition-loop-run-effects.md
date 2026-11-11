# Context Change Request: artwork-spechub-condition-loop-run-effects — đối chiếu spec-hub cho self-loop condition và quota/key của Run effects

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — CLAIM-02 và CLAIM-03 có thể ảnh hưởng tới cách viết checklist cho feature run-image-effects (quota và yêu cầu API key); cần Dev xác nhận trước khi sửa KB-814/KB-818. Người gửi: operator, qua `mcp__spec-hub__ask` ngày 2026-11-11 (log_id 166, 167, 168).

## Khối A — Hành vi

### CLAIM-01

- **Statement:** Condition giữa layer không được tạo vòng lặp (A phụ thuộc B, B phụ thuộc A); artwork không lưu được cho tới khi gỡ vòng lặp. Đây là validate ở tầng save (server), không chỉ là hạn chế UI.
- **Object / feature:** artwork/condition-cycle-validation
- **Quan hệ với canon:** `ADD` (củng cố KB-074 — LOW, "Self-loop (layer phụ thuộc chính nó) không tạo được qua UI, chưa test qua API")
- **Scope:** owner (merchant), portal (Artwork editor), api (save)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:conditional-options-no-loops`, `spec-hub:artwork-editor-layer-checks`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=166, rule id `conditional-options-no-loops` (feature `conditional-options`)
- **OQ:** NEEDS_CONFIRMATION — Vòng lặp bị chặn ở UI, ở save-time validation (server), hay cả hai? KB-074 ghi "chưa test qua API" — nếu chỉ chặn ở UI thì gọi trực tiếp API có thể tạo được self-loop, cần Dev xác nhận. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  conditional-options-no-loops: "Conditions may not loop (A depends on B and B on A); the artwork can't be saved until the loop is removed."
  ```

### CLAIM-02

- **Statement:** Shopper-facing photo upload có hiệu ứng AI/xử lý (background removal, AI filter) giới hạn mặc định 5 lần/giờ/shopper/option (không phải theo phút, không chia sẻ chung cho cả store) — khác đơn vị thời gian và phạm vi so với KB-814 ("Quota 5 lượt/phút dùng chung store"). Ngoài ra còn một giới hạn riêng theo network: tối đa 50 upload có effect/giờ/địa chỉ IP trên toàn bộ field và shop.
- **Object / feature:** artwork/run-image-effects
- **Quan hệ với canon:** `CONTRADICTS KB-814`? (cần làm rõ — có thể là 2 cơ chế rate-limit khác nhau: merchant tự bấm "Run effects" trong Artwork editor so với shopper upload ảnh có effect trên storefront)
- **Scope:** buyer (storefront, photo upload) và/hoặc owner/staff (Artwork editor, nút Run effects) — chưa rõ CLAIM này và KB-814 có nói về cùng một hành động hay không
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** spec-hub, đối chứng Jira TIB-4298 (2025-10-01, "Option to limit upload rate for Image Effects") và TIB-5533 (không ghi ngày cụ thể trong kết quả — xem Locator)
- **Locator:** spec-hub `mcp__spec-hub__ask` log_id=166, rule id `photo-upload-effect-rate-limit` (feature `photo-upload`) và `image-effects-rate-limit`/`photo-upload-network-limit` (log_id=166), `sure: green`
- **OQ:** CONFLICT — KB-814 (feature run-image-effects, trong Artwork editor — hành động của merchant/staff bấm nút "Run effects" trên 1 layer) và spec-hub `photo-upload-effect-rate-limit` (hành động của shopper upload ảnh có effect trên storefront) có phải là HAI cơ chế rate-limit khác nhau, hay KB-814 đang mô tả sai đơn vị/phạm vi của chính cơ chế shopper-facing này? Side A: KB-814 — merchant Run effects trong editor, "5 lượt/phút dùng chung store" / Side B: spec-hub — shopper upload có effect, "5/giờ/shopper/option" + riêng network-limit 50/giờ. — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  photo-upload-effect-rate-limit: "Uploads that run an AI or processing effect ... are limited per shopper, per option: 5 per hour by default, changeable per shop."
  photo-upload-network-limit: "Separately, effect uploads from one network (IP address) are capped at 50 per hour across all options and shops."
  ```

### CLAIM-03

- **Statement:** Teeinblue có remover ảnh (xoá nền) tích hợp sẵn, **không cần API key nào**. Chỉ khi merchant chọn dịch vụ xoá nền của bên thứ ba (remove.bg, Removal.AI, Cutout.Pro) hoặc gói "Teeinblue x Removal.ai" mới cần thiết lập key riêng cho dịch vụ đó; hiệu ứng từ dịch vụ ngoài mà thiếu key thì bị **bỏ qua âm thầm** (không lỗi), không phải bị chặn.
- **Object / feature:** artwork/run-image-effects
- **Quan hệ với canon:** `CONTRADICTS KB-818`? (KB-818 hiện ghi "Known limitation: Remove background + Face cutout đòi key Remove background" — cần làm rõ Face cutout có phải luôn cần key khác với Remove background không)
- **Scope:** owner (merchant), portal (Artwork editor, cấu hình Extra services)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** S2 (`qa_rule_ref`) — chỉ có `sources: [{kind: code}]`, không có Jira/ngày
- **Mã rule:** `spec-hub:image-effects-background-remover`, `spec-hub:image-effects-needs-key`
- **Người sở hữu (vai trò):** code (spec-hub đọc trực tiếp source code teeinblue-api)
- **Ngày ghi nhận:** 2026-11-11 (ngày truy vấn spec-hub)
- **Nơi mở lại được:** spec-hub `mcp__spec-hub__ask` log_id=168, rule id `image-effects-background-remover` và `image-effects-needs-key` (feature `image-effects`)
- **OQ:** CONFLICT — KB-818 nói Remove background + Face cutout "đòi key Remove background" như một hạn chế chung — spec-hub nói Teeinblue có remover built-in miễn phí/không cần key, chỉ dịch vụ ngoài mới cần. Face cutout cụ thể có bắt buộc dùng dịch vụ ngoài (luôn cần key) hay cũng có lựa chọn built-in giống Remove background? Side A: KB-818, quan sát QA trên staging / Side B: spec-hub `image-effects-background-remover` + `image-effects-needs-key` (S2, code). — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  image-effects-background-remover: "Background removal uses the remover the merchant picked: their own remove.bg, Removal.AI or Cutout.Pro account, Teeinblue's built-in remover, or the 'Teeinblue x Removal.ai' deal..."
  image-effects-needs-key: "An effect from an outside service only runs if the merchant has added their API key for that service; otherwise it is skipped silently. Teeinblue's own effects need no key."
  ```
