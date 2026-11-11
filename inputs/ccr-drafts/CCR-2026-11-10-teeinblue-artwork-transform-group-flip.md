# Context Change Request: artwork-transform-group-flip — Flip H/V khi Group, flag flip, Save & Close, Reverse reposition

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5435 (QA-3362)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`MEDIUM` — ảnh hưởng coverage: canon chưa có check nào về Flip nhóm; Proposal gốc không chọn mức gấp, mức này do người soạn lại đề xuất.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Flip trong Transform popover lưu bằng 2 field boolean `flip_horizontal_enabled` / `flip_vertical_enabled` CHỈ trên layer ảnh (photo/clipart); text/curve-text KHÔNG BAO GIỜ có field này — Group flip chỉ dịch `left/top/rotate` của chúng
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); api · portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); lượt production 2026-09-28 không Save nên không kiểm lại vế này, 2026-09-17
- **Locator:** QA-3362 TC-12 (results/result_QA-3362_final_2026-09-17.md) · TC-1 (results/result_QA-3362_B1_2026-09-16.md); product_facts.md dòng 192 (FACT-064) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Không dùng TIB-4778 làm nguồn của hành vi flip: knowledge QA ghi nhầm key (TIB-4778 là 'API Integration with PosterFlow'; multi-layer flip theo Slack.md là TIB-4467). (CCR cũ: CBS-043 CLAIM-18)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **Trích nguyên văn:**
  ```
  QA-3362 TC-12 (result_QA-3362_final_2026-09-17): ✅ AI — F3 #<id> trước: text(100,100) photo(250,150) curve(100,900), curve path `M 0 200 a 100 100 0 0 1 0 -200 a 100 100 0 0 1 0 200`, textPath "AB". Group Flip H 3 layer → live: text **317**, photo **47** (mirror), curve **317**; Top 100/150/900 và rot 0 **không đổi**; curve path `d` **giống hệt**, textPath "AB", **không** có `scale(-1)` trên text/curve. Save → GraphQL text 317, photo 47 `fH=true`, curve-text 317 **không có field flip**. Thứ tự trái-phải đảo: trước text/curve(100)<photo(250), sau photo(47)<text/curve(317). Ảnh curve trước/sau: `evidence/ref_TIB-5435_TC-12_curve_before.png` / `_after.png` — hình cung giống nhau, chỉ đổi vị trí
  QA-3362 TC-1 (result_QA-3362_B1_2026-09-16): ✅ AI — before: text(100,100,0°) photo(250,150,0°); after Flip H: text(**330**,100,0°) photo(**60**,150,0°,flipH=true) — thứ tự trái-phải đảo (330>60, trước 100<250), Top/angle không đổi, chỉ photo có flag
  product_facts.md dòng 192: - [FACT-064] **Flip trong Transform popover lưu bằng 2 field boolean `flip_horizontal_enabled` / `flip_vertical_enabled` — CHỈ trên layer ảnh (photo/clipart). Text/curve-text KHÔNG BAO GIỜ có field này** — Group flip chỉ dịch `left/top/rotate` của chúng (BR-4). Đọc kết quả flip → dump GraphQL, đừng tìm flag trên text.
  ```

### CLAIM-02

- **Statement:** Mọi thay đổi trong Transform popover (Flip, Width/Height/Top/Left/Rotate) chỉ persist khi bấm 'Save & Close' (`.btn.btn-primary`) — KHÔNG autosave/debounce; nút này đóng editor về list artwork
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đo) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 193 (FACT-065) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 (CCR cũ: CBS-043 CLAIM-19)
- **OQ:** NEEDS_CONFIRMATION — Việc mọi thay đổi trong Transform popover chỉ persist khi bấm Save & Close (không autosave) chỉ là số đo QA, không có nguồn PO/Dev; đây có phải hành vi thiết kế không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 193: - [FACT-065] **Mọi thay đổi trong Transform popover (Flip, Width/Height/Top/Left/Rotate) chỉ persist khi bấm "Save & Close"** (`.btn.btn-primary`) — KHÔNG autosave/debounce, và nút này đóng editor về list artwork. Khác giả định "spinbutton autosave" từng dùng ở QA-3361.
  ```

### CLAIM-03

- **Statement:** Khi đổi `Apply for` (Group ⇄ Individual) lúc Flip đang tick, vị trí/góc được TÍNH LẠI từ vị trí gốc thật của layer theo công thức của mode MỚI (Group: mirror quanh tâm nhóm; Individual: lật tại chỗ), không giữ 'vị trí đang hiển thị'; đổi lại Group cho đúng giá trị như lần tick đầu; góc không đổi khi pre-rotated — QA quyết 2026-09-24, đóng BUG-126 là by design
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); quyết định 'by design' do QA (Yến) 2026-09-24, không phải PO/Dev, 2026-09-28
- **Locator:** QA-3362 TC-16 (release-verification.md, production; results/result_QA-3362_auto_2026-09-24.md, staging); outputs/QA-3362/01-analysis.md BR-2 (Extended 2026-09-24) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Hành vi cũ trong knowledge QA (FACT-066: đổi Apply for không chạy transform nào, BUG-01) đã lỗi thời sau quyết định QA 2026-09-24 (BUG-126 đóng by design); cố ý không đưa lên canon. Quyết định 'by design' là của QA, không phải PO/Dev. (CCR cũ: CBS-043 CLAIM-21)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Đổi Apply for (Group/Individual) khi Flip đang tick thì tính lại từ vị trí gốc theo mode mới là quyết định "by design" của QA (đóng BUG-126), không phải PO/Dev; PO/Dev có xác nhận không? — Người trả lời: PO.
- **Trích nguyên văn:**
  ```
  QA-3362 TC-16 (release-verification.md — Staging ✅ · Production ✅ PASS): Group Flip H (330/60) → đổi Individual khi đang tick: về đúng gốc 100/250, photo vẫn mirror → đổi lại Group: 330/60 y hệt step 1 (đúng QUYẾT ĐỊNH QA 2026-09-24, không tái hiện BUG-126)
  QA-3362 TC-16 (result_QA-3362_auto_2026-09-24): ✅ AI — [Edge] Switch Apply for: Group → Individual WHILE Flip is ticked (no untick first) — baseline text=(100,100) photo=(250,150) · step1(Group+FlipH) text=(330,100) photo=(60,150) · step3(→Individual) text=(100,100) photo=(250,150)<br>step5(→Group lại, không thao tác gì thêm) text=(330,100) photo=(60,150)
  outputs/QA-3362/01-analysis.md BR-2: Extended 2026-09-24 (QA decision, supersedes RQ3/RQ4 2026-09-16): switching Apply-for to Individual while Flip is ticked recomputes from the layer's TRUE original position/angle as if Individual+Flip were freshly ticked at that spot — not "keep whatever position it currently displays". Symmetric for switching back to Group. Verified on a pre-rotated layer too (angle unaffected).
  ```

### CLAIM-04

- **Statement:** Group flip: layer HIDDEN được đối xử NHƯ LOCKED — không vào bbox, không bị dịch chuyển (giữ nguyên vị trí/góc)
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); QA (Yến) chốt 2026-09-16 sửa lại RQ1 cũ, 2026-09-17
- **Locator:** QA-3362 TC-17 (results/result_QA-3362_B1_2026-09-16.md, result_QA-3362_auto_2026-09-17.md); product_facts.md dòng 196 (FACT-068) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | build hash: không rõ (QA không có quyền repo) (CCR cũ: CBS-043 CLAIM-23)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** CONFLICT — Layer HIDDEN trong Group flip có bị dịch chuyển hay không. Side A: RQ1 cũ "hidden layer's position IS still transformed" / Side B: QA chốt 2026-09-16 hidden được đối xử như locked, không vào bbox và giữ nguyên vị trí (TC-17); Dev chọn bên nào? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3362 TC-17 (result_QA-3362_B1_2026-09-16): ✅ AI — 3 layer chọn (text+photo+hidden layer-<id> tại 500,400). Flip H → text(**330**,100) photo(**60**,150,flipH=true) — **GIỐNG HỆT TC-1** (phần bbox-loại-trừ-hidden ĐÚNG, BR-7 confirmed). NHƯNG layer hidden **KHÔNG đổi vị trí** (giữ nguyên 500,400) — **trái với RQ1** ("hidden layer's position IS still transformed")
  QA-3362 TC-17 (result_QA-3362_auto_2026-09-17): ✅ AI — [Boundary] Group selection includes a HIDDEN layer — bbox must exclude it per BR-7 — before text=(100,100) photo=(250,150) hidden=(500,400) · after text=(330,100) photo=(60,150) hidden=(500,400)
  product_facts.md dòng 196: - [FACT-068] **Group flip: layer HIDDEN được đối xử NHƯ LOCKED — không vào bbox, không bị dịch chuyển (giữ nguyên vị trí/góc). User chốt 2026-09-16 (QA-3362 TC-17)**, sửa lại RQ1 cũ "hidden vẫn bị transform".
  ```

### CLAIM-05

- **Statement:** Góc khi Group flip: H hoặc V riêng → `rotate` đổi dấu (30° → −30°); H+V cùng lúc → `rotate` GIỮ NGUYÊN (30°), chỉ 2 flag bật; góc không phụ thuộc bbox
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** AI chạy ([AI]); 'khớp dev RQ10' theo ghi chú QA, chưa trích được quote dev, 2026-09-16
- **Locator:** QA-3362 TC-7 · TC-13 · TC-14 (results/result_QA-3362_B1_2026-09-16.md; chạy lại ✅ AI result_QA-3362_auto_2026-09-17.md); product_facts.md dòng 197 (FACT-069) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | build hash: không rõ (QA không có quyền repo) | Ghi chú: Ghi chú 'khớp dev RQ10' là theo QA, chưa trích được nguyên văn dev; không coi là dev sign-off. (CCR cũ: CBS-043 CLAIM-24)
- **Căn cứ expected:** KHÔNG CÓ (khuôn cũ không ghi ticket, comment hay câu trả lời PO/Dev mà expected của TC dựa vào)
- **OQ:** NEEDS_CONFIRMATION — Ghi chú "khớp dev RQ10" (góc đổi dấu khi flip H hoặc V riêng, giữ nguyên khi H+V) là theo QA, chưa trích được quote dev; Dev có xác nhận không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  QA-3362 TC-7 (result_QA-3362_B1_2026-09-16): ✅ AI — before: text(100,100,0°) photo(250,150,**30°**); Flip H → text(**344**,100,0°) photo(**74**,150,**−30°**,flipH=true) — angle đảo dấu chính xác, thứ tự trái-phải đảo, Top không đổi. Untick → text(100,100,0°) photo(250,150,30°,flipH=false) — revert byte-identical
  QA-3362 TC-14 (result_QA-3362_B1_2026-09-16): ✅ AI — Step 2 (H+V): text(**344**,**210**,0°) photo(**74**,**70**,**30°**,flipH+flipV=true) — angle **giữ nguyên 30°** (không +180, đúng RQ10), cả 2 trục đảo thứ tự. Step 4 (untick H, giữ V): text(100,**210**,0°) photo(250,**70**,**−30°**,flipV=true) — **TRÙNG KHỚP TUYỆT ĐỐI với kết quả TC-13** (đúng RQ8 stateless recompute)
  product_facts.md dòng 197: - [FACT-069] **Góc khi Group flip: H hoặc V riêng → `rotate` đổi dấu (30° → −30°); H+V cùng lúc → `rotate` GIỮ NGUYÊN (30°), chỉ 2 flag bật** (đo TC-7/13/14, khớp dev RQ10). Angle không phụ thuộc bbox.
  ```

### CLAIM-06

- **Statement:** Công thức pixel `newLeft = 2·cx − left − width` (BR-7) đúng đại số nhưng đo thật lệch ~20px/layer theo hướng ngược nhau, cơ chế chưa rõ → oracle test dùng invariant (thứ tự đảo quanh tâm nhóm + flag đúng layer + untick revert byte-identical), không assert pixel; chưa hỏi dev
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đo) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 198 (FACT-070) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | Ghi chú: Các con số pixel (lệch ~20px) là số đo, không phải spec; oracle test nên dùng invariant, chưa hỏi dev. (CCR cũ: CBS-043 CLAIM-25)
- **OQ:** OPEN_ISSUE — Công thức newLeft = 2·cx − left − width (BR-7) đúng đại số nhưng đo thật lệch khoảng 20px mỗi layer theo hướng ngược nhau, cơ chế chưa rõ và chưa hỏi dev; nguyên nhân độ lệch là gì và pixel nào mới đúng? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 198: - [FACT-070] **Công thức pixel `newLeft = 2·cx − left − width` (BR-7) đúng đại số nhưng đo thật lệch ~20px/layer theo hướng ngược nhau, cơ chế chưa rõ** → oracle test dùng invariant (thứ tự đảo quanh tâm nhóm + flag đúng layer + untick revert byte-identical), không assert pixel. Chưa hỏi dev vì không cần cho PASS/FAIL.
  ```

### CLAIM-07

- **Statement:** Checkbox 'Reverse reposition direction' xuất hiện trong popover Transform khi Flip H/V đang tick; tooltip ngay dưới: 'When on, this layer repositions in the opposite direction to the way the buyer moves it.' = đảo chiều reposition của BUYER trong dialog image placement, không liên quan vị trí layer trong editor
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); buyer (chiều reposition); portal · storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đọc tooltip) — không phải PO/Dev, 2026-09-17
- **Locator:** product_facts.md dòng 199 (FACT-071) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | Ghi chú: Liên quan CCR QA-3410 linked-copy-reposition-direction (không gộp claim ở đây). (CCR cũ: CBS-043 CLAIM-26)
- **OQ:** NEEDS_CONFIRMATION — Ý nghĩa checkbox "Reverse reposition direction" (đảo chiều reposition của buyer) chỉ suy từ tooltip, chưa có TC và chưa có nguồn PO/Dev; Dev có xác nhận hành vi phía buyer không? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 199: - [FACT-071] **Checkbox "Reverse reposition direction" xuất hiện trong popover Transform khi Flip H/V đang tick** — tooltip ngay dưới (đọc 2026-09-17, QA-3362): *"When on, this layer repositions in the opposite direction to the way the buyer moves it."* = đảo chiều reposition của BUYER trong dialog image placement (mũi tên ←→↑↓ / kéo), không liên quan vị trí layer trong editor. Chưa có TC.
  ```

### CLAIM-08

- **Statement:** Spinbutton Top/Left khi chỉ chọn 1 layer (nhất là text) hiện/ghi giá trị KHÁC field `top/left` thật (set 100 → GraphQL 153.89) — không dùng để reset toạ độ fixture
- **Object / feature:** MỚI: transform-multi-select — Thuộc: Flip H/V trong popover Transform khi Apply for = Group/Individual, flag flip_*_enabled, Save & Close, Reverse reposition direction. Không thuộc: box và selection (file artwork-transform-multi-select-boxes), Apply for và ô số (file artwork-transform-apply-mode).
- **Quan hệ với canon:** `ADD`
- **Scope:** seller (owner/staff); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA nội bộ (đo) — không phải PO/Dev, 2026-09-16
- **Locator:** product_facts.md dòng 200 (FACT-072) | https://ownego.atlassian.net/browse/TIB-5435 · https://ownego.atlassian.net/browse/QA-3362 | Ghi chú: Số đo (100 → 153.89) không phải spec; nguyên nhân chưa rõ. (CCR cũ: CBS-043 CLAIM-27)
- **OQ:** OPEN_ISSUE — Spinbutton Top/Left khi chọn 1 layer (nhất là text) ghi giá trị khác field top/left thật (set 100 thành 153.89 trong GraphQL), nguyên nhân chưa rõ; đây là hành vi mong muốn hay lỗi? — Người trả lời: Dev.
- **Trích nguyên văn:**
  ```
  product_facts.md dòng 200: - [FACT-072] **Spinbutton Top/Left khi chỉ chọn 1 layer (nhất là text) hiện/ghi giá trị KHÁC field `top/left` thật** (set 100 → GraphQL 153.89) — đừng dùng để reset toạ độ fixture; dùng Flip toggle hoặc rebuild qua API.
  ```
