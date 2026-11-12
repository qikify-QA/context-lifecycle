# Context Change Request: artwork-api-delete-ratelimit — chuyển khuôn từ CBS-036 (phần xoá và rate limit) — rev2 (bổ sung nguồn spec-hub 2026-11-12)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** không có
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage API xoá artwork; Proposal gốc CBS-036 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Canon KB-061 chưa nói rate limit có thực thi nên không có checklist đang publish chạy sai.

> Ghi chú rev2: bản này giữ nội dung Proposal CBS-107 (status blocked, run CTX-20261111-15), bổ sung nguồn S3 từ spec-hub (đọc 2026-11-12, contract §3 "Rule spec-hub"). Tên cá nhân trong bản gốc được thay bằng vai trò. Phần hành vi spec-hub không nói tới vẫn giữ nguồn cũ kèm OQ.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Artwork đang gắn campaign thì không xoá được: `DELETE /api/artworks/{id}` trả 403 với trang HTML "Forbidden" của Laravel (không phải JSON), còn artwork không gắn campaign thì xoá được (204).
- **Object / feature:** artwork/artwork-list-management
- **Quan hệ với canon:** `ADD` (KB-047 chỉ có dialog xác nhận xoá trên UI, không nói bị chặn)
- **Scope:** owner (merchant); api (REST DELETE), db (bảng liên kết artwork với campaign)
- **Đã ship:** `SHIPPED` (vế "bị chặn khi đang dùng", theo spec-hub đọc từ code live); vế "403 trang HTML" `UNKNOWN`
- **Loại nguồn:** `po_dev_confirm` (rule spec-hub `sure: green`, contract §3 "Rule spec-hub") — áp cho vế "artwork đang gắn campaign không xoá được". Vế "403 + trang HTML Laravel, không phải JSON" vẫn chỉ là quan sát của QA (`KHÔNG CÓ NGUỒN`).
- **Người xác nhận, ngày nguồn:** spec-hub (sources: code; reviewed_by: spec-update), đọc 2026-11-12. Quan sát gốc: QA, 2026-09-07.
- **Locator:** spec-hub project `teeinblue`, feature `artwork-editor` (version 3), rule `artwork-editor-delete-blocked-when-used`, `sure: green`, `log_id` 234 (ask "Can a merchant delete an artwork that is used in a campaign?..."), cũng trả ở `log_id` 233. Quan sát gốc: knowledge QA local FACT-049, QA đo tay bằng API trên staging, đối chứng 1 artwork có row liên kết campaign (403) với 2 artwork không có row (204); không ticket, không test case, build không rõ. Ghi chú từ khuôn cũ: không coi 403 và trang HTML là hành vi PO/Dev chủ đích; câu "nên có thông báo tử tế khi xoá artwork đang dùng" là kỳ vọng của QA.
- **Rule QA có chủ:** (chỉ cho vế quan sát 403 HTML; claim là P1 mất dữ liệu nên vế này không được dùng S2) FACT-049 · owner_role QA · recorded_on 2026-09-07 · locator Proposal CBS-107 CLAIM-01
- **OQ:** OPEN_ISSUE — 403 HTML khi xoá artwork đang gắn campaign có phải thiết kế không, và UI portal phải hiện thông báo gì trong trường hợp này (nguồn chỉ là quan sát của QA, chưa ship rõ)? — Người trả lời: Dev.
- **OQ:** CONFLICT (một phần) — spec-hub `artwork-editor-delete-blocked-when-used` nói "The error names the reason" và portal hiện "remove it from all campaigns first" kèm 'View campaigns list'; QA đo `DELETE /api/artworks/{id}` nhận trang HTML "Forbidden" trần của Laravel. Câu hỏi cho Dev: khi gọi thẳng `DELETE /api/artworks/{id}` cho artwork đang gắn campaign, response đúng thiết kế là gì (status code, body JSON có nêu lý do không), và trang HTML 403 có phải lỗi không? — Người trả lời: Dev. Side A: spec-hub rule (lỗi nêu lý do) / Side B: QA đo 2026-09-07 (403 HTML trần).
- **Trích nguyên văn:**
  ```
  spec-hub artwork-editor-delete-blocked-when-used (green): "An artwork cannot be deleted while it is used in a campaign through a product base, used by a platform product, has been used for an order design, or has duplicates made from it. The error names the reason; for duplicates it lists their names."
  spec-hub ví dụ của rule: when "The artwork is in a campaign" → then "The portal asks to remove it from all campaigns first and offers 'View campaigns list'."
  Quan sát QA (FACT-049): Artwork ĐANG GẮN CAMPAIGN thì không xoá được — `DELETE /api/artworks/{id}` trả 403 (đo 2026-09-07). Trả về trang HTML "Forbidden" của Laravel, không phải JSON, nên log lỗi trông như hỏng auth/CORS chứ không giống "bị chặn có chủ đích". Đo đối chứng: aw#3797 (1 row `campaign_artwork_printareas`) → 403; aw#3804 và #3808 (0 row) → 204.
  ```

### CLAIM-02

- **Statement:** API artwork có rate limit: POST tạo artwork liên tiếp (4 artwork trong hai lượt sát nhau) trả 429 "Too Many Requests" dạng trang HTML. Theo spec-hub, ngưỡng là 5 lần tạo hoặc duplicate artwork mỗi phút cho mỗi staff, 60 lần lưu thay đổi artwork có sẵn mỗi phút (setting server); vượt ngưỡng bị từ chối tới hết phút.
- **Object / feature:** artwork/artwork-save-persist
- **Quan hệ với canon:** `CONTRADICTS KB-061` (KB-061, 2026-09-10, INFERRED: header liệt kê tên các header rate-limit nhưng chưa đủ evidence kết luận có rate limit thực thi)
- **Scope:** owner (merchant), staff; api (REST POST /api/artworks), portal (Save)
- **Đã ship:** `SHIPPED` (spec-hub đọc code live)
- **Loại nguồn:** `po_dev_confirm` (rule spec-hub `sure: green`) — cho vế "có rate limit thực thi" và ngưỡng. Vế "429 dạng trang HTML, không phải JSON" vẫn là quan sát QA.
- **Người xác nhận, ngày nguồn:** spec-hub (sources: code; reviewed_by: spec-update), đọc 2026-11-12. Quan sát gốc: QA, 2026-09-07.
- **Locator:** spec-hub project `teeinblue`, feature `artwork-editor` (version 3), rule `artwork-editor-save-rate-limit`, `sure: green`, `log_id` 236 (ask "Is there a rate limit on the artwork API (429 ...)?"). Cùng feature, mục permissions: "Saving a new artwork or duplicating one is limited to 5 times a minute per staff member; saving changes to an existing artwork to 60 times a minute by default." Liên quan nhưng khác phạm vi: rule `open-api-rate` (feature `open-api`, green) "The API allows 60 requests a minute per account." — chỉ cho Public API bằng token. Quan sát gốc: knowledge QA local FACT-050, QA đo khi dựng fixture trên staging.
- **Rule QA có chủ:** (cho vế quan sát 429 HTML) FACT-050 · owner_role QA · recorded_on 2026-09-07 · locator Proposal CBS-107 CLAIM-02
- **OQ:** NEEDS_CONFIRMATION — Spec-hub ghi ngưỡng 60 lần/phút cho lưu artwork có sẵn là setting server: production có cùng giá trị không (spec-hub cũng đang mở câu này cho Dev)? Và 429 trả trang HTML thay vì JSON có phải thiết kế không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  spec-hub artwork-editor-save-rate-limit (green): "Each staff member can save a new artwork or duplicate an artwork at most 5 times a minute, and save changes to an existing artwork at most 60 times a minute (a setting on the server). Over the limit the request is refused until the minute is up."
  Quan sát QA (FACT-050): API artwork có rate limit — POST liên tiếp trả 429 "Too Many Requests" (đo 2026-09-07). Dựng 4 artwork hai lượt sát nhau là dính; cũng là trang HTML, không phải JSON.
  ```

### CLAIM-03

- **Statement:** Xoá artwork là soft delete: artwork vào Trash chứ không bị xoá hẳn; `DELETE /api/artworks/{id}` để row vẫn còn trong GraphQL với `deleted_at` được set, nên query thiếu filter `deleted_at:{_is_null:true}` thấy cả bản đã xoá.
- **Object / feature:** artwork/artwork-list-management
- **Quan hệ với canon:** `ADD` (trả lời OQ-artwork-016, NEEDS_CONFIRMATION: chưa xác nhận soft hay hard delete)
- **Scope:** owner (merchant); api (REST DELETE, GraphQL artworks), db (artworks.deleted_at)
- **Đã ship:** `SHIPPED` (vế "vào Trash, không xoá hẳn", theo spec-hub); vế GraphQL/`deleted_at` là quan sát
- **Loại nguồn:** `po_dev_confirm` (rule spec-hub `sure: green`) — cho vế soft delete. Chi tiết `deleted_at` trên GraphQL vẫn là quan sát QA.
- **Người xác nhận, ngày nguồn:** spec-hub (sources: code; reviewed_by: spec-update), đọc 2026-11-12. Quan sát gốc: QA, 2026-09-07.
- **Locator:** spec-hub project `teeinblue`, feature `artwork-editor` (version 3), rule `artwork-editor-delete-to-trash`, `sure: green`, `log_id` 233 (ask "Is deleting an artwork a soft delete (deleted_at) or hard delete?"). Cùng lần ask có rule `trash-permanent-cleanup` (feature `trash`, green, version chưa đọc): artwork bị xoá hẳn sau 365 ngày bởi cleanup hằng ngày (server default). Quan sát gốc: ghi chú quyết định QA local (mục DEC-PRE), khi dựng và dọn fixture bằng API; phần "chốt 2026-09-07" trong nguồn chỉ là quyết định không sửa call site query cũ.
- **Rule QA có chủ:** (cho vế quan sát GraphQL/`deleted_at`; claim P1 nên vế này không dùng S2) DEC-PRE · owner_role QA · recorded_on 2026-09-07 · locator Proposal CBS-107 CLAIM-03
- **OQ:** NEEDS_CONFIRMATION — Spec-hub xác nhận xoá artwork chuyển vào Trash. Còn cần Dev xác nhận: cơ chế đó là cột `deleted_at` trên bảng artworks (GraphQL vẫn trả row nếu không lọc), và sau 365 ngày row bị xoá hẳn khỏi DB? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  spec-hub artwork-editor-delete-to-trash (green): "Deleting an artwork moves it to the trash rather than removing it for good."
  spec-hub trash-permanent-cleanup (green): "Items are removed for good by daily cleanups after their type's retention time, counted from deletion: campaigns and platform products after 30 days, cliparts and clipart categories after 60 days, artworks and product bases after 365 days (server defaults)."
  Quan sát QA: `DELETE /api/artworks/{id}` là **soft delete** — row vẫn còn trong GraphQL, chỉ set `deleted_at`; query thiếu `deleted_at:{_is_null:true}` thấy cả xác chết.
  ```
