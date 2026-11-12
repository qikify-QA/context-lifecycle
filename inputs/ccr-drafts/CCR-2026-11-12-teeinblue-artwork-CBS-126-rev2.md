# Context Change Request: artwork-warp-text-payload-mirror — chuyển khuôn từ CBS-038 (phần schema points và Mirror của Warp Text)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5325, QA-3378`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage layer-config-text; Proposal gốc CBS-038 không điền mức độ gấp, đây là mặc định của người chuyển khuôn, operator xác nhận. CLAIM-02 và CLAIM-03 có thể đã lỗi thời sau TIB-5325.

<!-- rev2 2026-11-12 của Proposal CBS-126: TIB-5325 Done 2026-10-15. Testlane task TIB-136 (QA-3378): TC-10 = TC-TIB-4191 và TC-34 = TC-TIB-4215 `passed` nhưng chỉ tick "[AI] ✅ AI"; TC-35..39 (Warp mode mới, TC-TIB-7551..7555) `not-run`. spec-hub không có rule nào về points hay Mirror của Warp Text (ask log_id 237). -->

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Payload `GET api/merchant/games/warp_text/<base64>.json` có `points` là mảng phẳng 20 số nguyên (10 điểm, mỗi điểm x rồi y), toạ độ pixel tuyệt đối trong [0,width]×[0,height] với width và height khoảng 1000, không phải 10 object `{x,y}` chuẩn hoá 0-1; resize layer không đổi `points`, `width`, `height`.
- **Object / feature:** artwork/layer-config-text
- **Quan hệ với canon:** `ADD` (canon chỉ có field list Warp Text KB-013 và CHK-003, chưa có schema points)
- **Scope:** buyer (storefront nhận payload), seller; api (payload warp_text), portal
- **Đã ship:** `SHIPPED` (đọc payload production 2026-09-30; TIB-5325 lên production 2026-10-19)
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** AI (đo bằng REPL và network), 2026-09-30 (production) và 2026-10-01 (staging)
- **Locator:** Knowledge QA local FACT-042; QA-3378 TC-10 ✅ AI 2026-10-01 (chạy trước lần giao QA lại TIB-5325 ngày 2026-10-12, TIB-5325 re-open 2026-10-08). Đọc 2 payload production của 2 layer độc lập (có giá trị 0 thật, loại khả năng chuẩn hoá 0-1) và 1 payload staging. QA yêu cầu verify lại sau khi AI từng chốt sai chuẩn hoá 0-1. Ghi chú từ khuôn cũ: không coi là hợp đồng API đã dev xác nhận; số phần tử 20 và không gian khoảng 1000×1000 chưa có tài liệu dev.
- **OQ:** NEEDS_CONFIRMATION — Payload warp_text có points là mảng phẳng 20 số, toạ độ pixel tuyệt đối trong khoảng 1000x1000, có phải hợp đồng API được Dev xác nhận không (chưa có tài liệu dev, chạy trước lần giao QA lại TIB-5325)? — Người trả lời: Dev.
- **Rule QA có chủ:** mã `FACT-042` · vai trò sở hữu: QA · ngày ghi nhận: 2026-09-30 · nơi mở lại được: Proposal CBS-126 CLAIM-01; task Testlane TIB-136 TC-TIB-4191, TC-TIB-4201 (rev2: xếp S2 theo quyết định operator 2026-11-12, không cần đường dẫn repo QA)
- **Nguồn bổ sung (rev2, một phần):** `po_dev_confirm` · Dev, Jira TIB-5325 comment 50374 "Summary cho QA" (tạo 2026-09-09, sửa 2026-10-09) · https://ownego.atlassian.net/browse/TIB-5325 · PR https://github.com/qikify/teeinblue-portal/pull/3637 · xác nhận payload render không đổi và vùng toạ độ 1000x1000; không nói `points` là mảng phẳng 20 số nguyên toạ độ tuyệt đối.
  > "* Không thay đổi. Endpoint render warp text vẫn nhận payload y như cũ, không đổi GraphQL/env/schema, không cần deploy kèm backend."
  > "Hệ quả: kéo điểm ra xa thì phần chữ nằm ngoài vùng 1000x1000 sẽ bị cắt trong ảnh render, đúng như khi chỉnh bằng dialog."
- **OQ (rev2):** Dev xác nhận `points` trong payload `warp_text` là mảng phẳng 20 số (10 điểm, x rồi y), toạ độ pixel tuyệt đối trong [0,width]×[0,height] với width=height=1000, và resize layer không đổi `points`/`width`/`height` không?
- **Trích nguyên văn:**
  ```
  Schema THẬT của `points` trong payload `GET api/merchant/games/warp_text/<base64>.json` là mảng PHẲNG 20 số nguyên (10 điểm × x,y liên tiếp), toạ độ PIXEL TUYỆT ĐỐI trong [0, `width`]×[0, `height`] — KHÔNG PHẢI mảng 10 object `{x,y}` chuẩn hoá 0-1. Verify trực tiếp trên PRODUCTION 2026-09-30 (QA-3378), đọc 2 payload thật của 2 layer Warp Text độc lập: `points=[100,400,300,400,500,400,700,400,900,400,100,600,300,800,500,800,700,800,900,600]` (`width=height=1000`) và `points=[100,300,300,0,500,300,700,0,900,300,100,500,300,700,500,900,700,700,900,500]`. Resize layer (kéo handle trên canvas) KHÔNG đổi `points`/`width`/`height` trong payload — xác nhận 2026-10-01 (QA-3378, TC-10, staging).
  ```

### CLAIM-02

- **Statement:** Popup Warp cũ của layer Warp Text có Mirror X và Mirror Y là 2 nút icon-only (`la-arrows-alt-h`, `la-arrows-alt-v`) trong nhóm nút cạnh nút Free dưới canvas preview, không có text hay attribute nào chứa chữ "mirror".
- **Object / feature:** artwork/layer-config-text
- **Quan hệ với canon:** `ADD` (canon chưa có)
- **Scope:** seller; portal (popup Warp cũ)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** QA chỉ vị trí trên ảnh chụp, 2026-09-30
- **Locator:** Knowledge QA local FACT-137 (QA-3378 TC-34). Có thể lỗi thời: TIB-5325 re-open 2026-10-08 thêm popover "Warp mode" mới, giao QA lại 2026-10-12, chưa biết popup cũ còn như vậy không. Lần chạy 2026-09-30 từng ghi ❌ vì tìm control bằng chữ "mirror" không thấy.
- **OQ:** NEEDS_CONFIRMATION — Popup Warp cũ có Mirror X và Mirror Y là hai nút icon-only vẫn còn như vậy sau TIB-5325 re-open (popover Warp mode mới) không? — Người trả lời: Dev.
- **Rule QA có chủ:** mã `FACT-137` · vai trò sở hữu: QA · ngày ghi nhận: 2026-09-30 · nơi mở lại được: Proposal CBS-126 CLAIM-02; task Testlane TIB-136 TC-TIB-4195, TC-TIB-4215 (rev2: xếp S2 theo quyết định operator 2026-11-12, không cần đường dẫn repo QA)
- **Nguồn liên quan (rev2):** Dev, Jira TIB-5325 comment 50374 "Summary cho QA" (tạo 2026-09-09, sửa 2026-10-09) · https://ownego.atlassian.net/browse/TIB-5325 · PR https://github.com/qikify/teeinblue-portal/pull/3637. Sau re-open, mirror trên canvas làm qua popover "Warp mode" (Free / Vertical / Horizontal); comment không nói popup cũ còn hai nút icon Mirror X/Y hay không.
  > "* Nút \"Warp\" trên thanh công cụ giờ mở một popover thay vì mở thẳng dialog. Popover gồm tiêu đề \"Warp mode\", ba lựa chọn Free / Vertical / Horizontal (mặc định Free), một dòng mô tả đổi theo lựa chọn, và nút \"Advanced editor\" mở đúng dialog như trước."
  > "* Mirror theo trục X/Y trước đây là giới hạn đã ghi nhận, nay đã làm xong qua Warp mode nên không còn là giới hạn."
- **OQ (rev2):** Dev: sau TIB-5325, dialog "Advanced editor" (popup Warp cũ) còn hai nút icon Mirror X (`la-arrows-alt-h`) và Mirror Y (`la-arrows-alt-v`) cạnh nút Free không, hay đã thay bằng lựa chọn Vertical/Horizontal của Warp mode?
- **Trích nguyên văn:**
  ```
  QA: "TC-34 mirror X/Y là cái t khoanh đỏ này này" (chỉ trên ảnh chụp popup Warp) — xác định đúng vị trí: btn-group 3 nút cuối popup, dưới canvas preview: `Free` (text) / icon `.la-arrows-alt-h` (Mirror X) / icon `.la-arrows-alt-v` (Mirror Y). Không có text/attribute nào chứa chữ "mirror" trong DOM.
  ```

### CLAIM-03

- **Statement:** Bật Mirror X trong popup Warp không tự lật các điểm sẵn có; chỉ khi kéo một điểm thì điểm đối xứng cập nhật x' = 2×centerX − x. Phần y của điểm đối xứng chưa rõ: mô tả ghi "y giữ nguyên", nhưng kết quả TC-34 ngày 2026-10-01 ghi y của cặp đổi theo y vừa kéo.
- **Object / feature:** artwork/layer-config-text
- **Quan hệ với canon:** `ADD` (canon chưa có)
- **Scope:** seller; portal (popup Warp, canvas preview), api (points)
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `QA_RULE`
- **Người xác nhận, ngày nguồn:** AI (REPL trên staging), 2026-09-30
- **Locator:** Knowledge QA local FACT-138; QA-3378 TC-34 ✅ AI 2026-10-01, trước lần giao QA lại TIB-5325 2026-10-12; không có tick `[QA]`. Có thể lỗi thời sau TIB-5325 (popover "Warp mode"). Ghi chú từ khuôn cũ: không coi công thức kèm "y giữ nguyên" là đã chốt; mô tả lệch với chính kết quả TC-34.
- **OQ:** CONFLICT — Khi bật Mirror X và kéo một điểm, y của điểm đối xứng giữ nguyên hay đổi theo y vừa kéo, và hành vi này còn đúng sau TIB-5325 không? — Người trả lời: Dev. Side A: mô tả ghi y giữ nguyên / Side B: kết quả QA-3378 TC-34 ngày 2026-10-01 ghi y của cặp đổi theo y vừa kéo.
- **Rule QA có chủ:** mã `FACT-138` · vai trò sở hữu: QA · ngày ghi nhận: 2026-09-30 · nơi mở lại được: Proposal CBS-126 CLAIM-03; task Testlane TIB-136 TC-TIB-4215 (rev2: xếp S2 theo quyết định operator 2026-11-12, không cần đường dẫn repo QA)
- **Nguồn liên quan (rev2):** Dev, Jira TIB-5325 comment 50374 "Summary cho QA" (tạo 2026-09-09, sửa 2026-10-09) · https://ownego.atlassian.net/browse/TIB-5325 · PR https://github.com/qikify/teeinblue-portal/pull/3637: "* Chế độ đã chọn áp dụng khi kéo điểm trên canvas: Vertical cho các điểm đối xứng qua trục dọc giữa, Horizontal qua trục ngang giữa, Free thì mỗi điểm chạy độc lập. Chế độ vẫn còn hiệu lực sau khi đóng popover." — nói về Warp mode mới, không nói về Mirror X của popup cũ.
- **Nhận xét (rev2):** số đo ở side A cũng cho y của điểm đối xứng bằng y vừa kéo (point[0] y 400→458.70, point[4] y 400→458.70), giống side B (436.5782). Hai bên khớp về số; chỗ lệch là chữ "y giữ nguyên" trong mô tả và trong expected của TC-TIB-4215 ("y giữ NGUYÊN giá trị y của điểm đó (không đổi theo điểm vừa kéo)").
- **OQ (rev2):** CONFLICT — Dev: khi mirror theo trục dọc (Mirror X cũ hoặc Warp mode Vertical), điểm đối xứng nhận x' = 2×centerX − x và y bằng đúng y của điểm vừa kéo phải không? Bật mirror có tự lật các điểm đã có không?
- **Trích nguyên văn:**
  ```
  Hành vi thật (AI verify bằng REPL, staging, 2026-09-30): bật Mirror X KHÔNG tự flip các điểm đã có sẵn (bấm xong `points` không đổi). Chỉ khi KÉO 1 điểm trong canvas preview của popup lúc Mirror X đang bật thì điểm ĐỐI XỨNG (mirror pair qua trục giữa X của shape) mới tự cập nhật theo: `x' = 2×centerX − x`, `y` giữ nguyên. Đo được: point[0] `(100,400)→(159.18,458.70)` kéo theo point[4] `(900,400)→(840.82,458.70)`.
  Kết quả TC-34 2026-10-01: y của point[4] đổi THEO đúng y vừa kéo (436.5782, giống hệt point[0]).
  ```
