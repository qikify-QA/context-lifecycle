# Context Change Request: artwork-ownership-model — chuyển khuôn từ CBS-036 (phần mô hình sở hữu)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-4355, QA-3374`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage test cross-tenant/IDOR; Proposal gốc CBS-036 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. Canon OQ-artwork-099 chưa có hành vi permission nào được kiểm nên không có checklist publish chạy sai.

<!-- rev2 2026-11-12 của Proposal CBS-125: cả hai claim là rule P1 (quyền, cross-tenant/IDOR) nên không dùng S2, vẫn cần S3. Không tìm được S3: Testlane TIB-122 TC-54 = TC-TIB-3672 `skipped` (de-scope, QA chốt 2026-10-01); comment Dev ở TIB-4355 không nói ranh giới sở hữu; spec-hub có rule gần (ask log_id 231) nhưng không nói đúng hành vi, và có chỗ có thể trái claim (xem từng claim). -->

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Artwork và layer thuộc tài khoản merchant (user), không thuộc từng store: một user kết nối nhiều store truy cập và ghi artwork của chính mình qua bất kỳ store nào họ sở hữu.
- **Object / feature:** artwork/MỚI: artwork-ownership-model (Thuộc: ranh giới sở hữu artwork/layer theo user, hệ quả cho test cross-store; Không thuộc: tính năng quản lý store)
- **Quan hệ với canon:** `ADD` (OQ-artwork-099, OPEN_ISSUE: chưa kiểm hành vi permission hay cross-tenant nào)
- **Scope:** owner (merchant, nhiều store cùng user); api, db (artworks.user_id)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA, 2026-09-30
- **Locator:** Đính chính của QA khi review QA-3374 TC-54 (Jira dev TIB-4355). TC-54 ⏸️ vì không dựng được 2 user khác nhau, nên chưa có test case nào xác nhận. QA không phải PO/Dev. Knowledge QA local FACT-134. Ghi chú từ khuôn cũ: không coi là đã được Dev/PO duyệt; đây là lời QA. Tên store trong nguồn đã thay bằng [store test].
- **OQ:** OPEN_ISSUE — Artwork và layer thuộc tài khoản merchant (user) chứ không thuộc từng store, có phải thiết kế được Dev/PO duyệt không (chỉ là đính chính của QA, TC-54 chưa chạy vì không dựng được 2 user)? — Người trả lời: Dev.
- **spec-hub (rev2, đọc 2026-11-12):** không có rule nói đúng "artwork thuộc user, truy cập qua mọi store của user". Rule gần:
  > mcp v3, `mcp-same-rules` (green): "MCP tools work only on the token owner's data and follow the portal's rules; an id from another account is answered as not found."
  > artwork-editor v3, `artwork-editor-foreign-files-refused` (green): "An artwork cannot point to image files that belong to another shop (except shops linked to it). Saving fails with an 'Invalid templates value, Code HOALO1' message, and pasting such layers fails."
  > artwork-editor v3, mục permissions (không có rule id/sure): "Only see and change artworks of the shop they are signed in to. Files that belong to another shop are refused when saving."
- **Conflict có thể (rev2):** spec-hub dùng "shop" và "account" làm ranh giới. Nếu "shop" là từng store Shopify thì permission trên trái với Statement (artwork thuộc user, dùng qua mọi store của user); nếu "shop" là account thì khớp. "except shops linked to it" gợi ý có cơ chế liên kết shop.
- **OQ (rev2):** CONFLICT/NEEDS_CONFIRMATION — Dev: trong Teeinblue, artwork và layer gắn với account (user) hay với từng store? Một user có 2 store Shopify có đọc/ghi được artwork của mình qua cả hai store không, và "shop" trong spec-hub (`artwork-editor-foreign-files-refused`, permission artwork-editor) nghĩa là account hay store? Rule P1 nên cần câu trả lời Dev/PO nguyên văn có ngày, hoặc test case Testlane PASS với 2 user khác nhau kèm căn cứ expected.
- **Trích nguyên văn:**
  ```
  QA: "TC-54: accepts another store's layerId là đúng nếu nó cùng user đó. artwork lưu theo user, không theo store."
  Tức là ranh giới sở hữu dữ liệu artwork/layer của Teeinblue là tài khoản merchant (user), không phải từng store Shopify riêng lẻ — 1 user có thể kết nối nhiều store ([store test A], [store test B], cùng 1 user), và họ được phép truy cập/ghi artwork của chính mình qua BẤT KỲ store nào họ sở hữu.
  ```

### CLAIM-02

- **Statement:** Request tham chiếu artworkId hoặc layerId của store khác nhưng cùng user được chấp nhận (200/201) là đúng, không phải IDOR; IDOR thật chỉ tồn tại khi store kia thuộc user khác, và fixture QA hiện có (mọi store test cùng một user) không test được IDOR thật.
- **Object / feature:** artwork/MỚI: artwork-ownership-model (cùng phạm vi CLAIM-01)
- **Quan hệ với canon:** `ADD`
- **Scope:** owner (merchant, nhiều store cùng user); api
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA, 2026-09-30
- **Locator:** Hệ quả rút ra từ CLAIM-01, ghi vào knowledge QA local FACT-135 và FACT-136 bởi AI; chưa có test nào dùng 2 user khác nhau (QA-3374 TC-54 ⏸️). Ghi chú từ khuôn cũ: không coi là đủ để bỏ mọi test cross-tenant, IDOR thật giữa 2 user khác nhau chưa được kiểm. Có thể làm sai các checklist security cross-tenant của object khác nếu từng dùng cặp store cùng user làm "2 tenant": FACT-136 nêu hai bài học QA local (QA-3353 ngày 2026-09-09 và QA-3352 ngày 2026-09-28) dùng đúng cặp store này, còn chờ QA quyết có sửa hay không, chưa ai phân xử. Tên store trong nguồn đã thay bằng [store test].
- **OQ:** OPEN_ISSUE — Request cross-store cùng user trả 200/201 là đúng và IDOR thật chỉ có giữa 2 user khác nhau, có đúng không; hai bài học QA local dùng cặp store cùng user làm 2 tenant có cần sửa không (chưa ai phân xử)? — Người trả lời: QA lead.
- **Testlane (rev2):** TIB-122 (QA-3374) TC-54 = TC-TIB-3672 `skipped`: "De-scope (QA chốt 2026-10-01) — cần 2 merchant user khác nhau thật, không có fixture". Chưa có record nào test IDOR giữa 2 user.
- **spec-hub (rev2):** như CLAIM-01; `mcp-same-rules` (green) chỉ nói id của account khác bị trả not found qua MCP, không nói request cross-store cùng user.
- **OQ (rev2):** Dev: request tham chiếu `artworkId`/`layerId` của store khác nhưng cùng user trả 200/201 là đúng thiết kế, và request với id của user khác bị từ chối (403/404) không? QA lead: hai bài học QA-3353 và QA-3352 dùng cặp store cùng user làm "2 tenant" có cần sửa không? Rule P1, cần S3.
- **Trích nguyên văn:**
  ```
  mọi test "cross-store layerId/artworkId accepted → tưởng IDOR" phải xác minh store B có thuộc CÙNG user với store A không trước khi kết luận là lỗ hổng. Nếu 2 store cùng user (như mọi cặp [store test]-* trong bộ fixture QA hiện có) → hành vi 200/201 là ĐÚNG, không phải bug. IDOR thật chỉ tồn tại khi store B thuộc user/merchant KHÁC thật sự (khách hàng khác của Teeinblue) — bộ fixture QA hiện tại (toàn bộ store test đều chung 1 user) không có khả năng test được kịch bản IDOR thật này cho tới khi có 2 tài khoản merchant riêng biệt.
  ```
