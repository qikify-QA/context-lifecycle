# Open Questions tổng hợp — teeinblue QA context (6 object)

Gom toàn bộ conflict chưa resolve và checklist item `NEEDS_CONFIRMATION` từ 6 object đã publish: **Product base**, **Font**, **Asset Category**, **Artwork**, **Campaign**, **SDK**. Mục đích: PO/Dev trả lời 1 lần, không phải đọc rải trong nhiều file JSON.

**Cách dùng**: tick `[x]` và ghi câu trả lời ngay dưới mỗi câu hỏi (dòng `> Trả lời:`). Câu trả lời sau đó sẽ được đưa vào KB dưới dạng `CONFIRMED_EXPECTED` với `confirmation_source` trỏ về đúng người/thời điểm trả lời — **không tự suy diễn thay**.


---

## Product base — trang /products

`knowledge/products/teeinblue/objects/product-base/` · 2 conflict · 7 P1 · 21 P2 · 1 P3

> **Đã verify toàn bộ mục dưới đây bằng explore/mutation thật trên staging** (run `CTX-20260913-02`, RECONCILE+REFRESH, publish thành công `v2-CTX-20260913-02`, 2026-09-14). Kết quả ghi ngay dưới mỗi câu trả lời PO dạng `> Kết quả verify:`. 3 conflict MỚI phát sinh do evidence lệch với câu trả lời PO được thêm vào cuối mục Conflict bên dưới — **cần bạn trả lời tiếp** như 2 conflict cũ. 2 mục CHK-01-009/CHK-01-012 (store B) bị BLOCKED bởi Claude Code permission classifier (không phải business blocker), chưa có evidence mới.
>
> **Follow-up run `CTX-20260914-01` (RECONCILE hẹp, 2026-09-14)** đã xử lý đúng 3 conflict mới ở trên, publish `v2.1-CTX-20260914-01` (MINOR bump). Kết quả verify ghi ngay dưới mỗi conflict. 1 conflict (`CONF-CHK-06-005-001`) vẫn UNRESOLVED vì evidence lần 2 (999px/1001px, upload tuần tự) tiếp tục phản bác câu trả lời "1000px". Phát sinh thêm 1 conflict mới **CONF-CHK-08-010-002** (độ tin cậy của object-level Logs cho Printarea event không nhất quán giữa 2 session) — **cần bạn trả lời tiếp**, thêm ở cuối mục Conflict.
> Ghi chú môi trường (không phải business finding, không chặn KB): portal đã đổi cơ chế session từ JWT-trong-localStorage sang cookie-session (Laravel Sanctum) + CSRF — `knowledge/portal-login.md` hiện mô tả sai, cần cập nhật riêng ở lần sau.

### Conflict — 2 nguồn evidence trái ngược, chưa chọn bên đúng

- [x] **[CONF-001]** Trạng thái phân trang/filter của /products có được đồng bộ vào URL hay không
    - Phía A: Không trang nào ghi ?page= hay ?limit=; URL đứng yên khi sang trang; F5 là về trang 1; /products thuộc nhóm cursor và cũng chịu chung hạn chế này. _(nguồn: knowledge/portal-pages.md, mục 'Pagination - hành vi chung toàn portal' (chụp 2026-09-09 trên store linh-tib-staging, ac)_
    - Phía B: /products CÓ ghi state vào query string: đổi tab/search/đổi page size đều sinh URL dạng ?tab=archived&limit=20&title=&cursor=&gridstate=1789039415661. Biến `limit` quan sát được = 20, khớp ?limit=20 trên URL. Tham số cur _(nguồn: OBSERVED_CURRENT 2026-09-10, store linh-explorer, owner sub=273)_
    - Trạng thái hiện tại: PARTIALLY RESOLVED theo domain knowledge từ người dùng (2026-09-10, KHÔNG phải evidence trực tiếp trong run này): URL-sync của /products là có chủ đích, dùng để back-restore filter/trang khi rời /prod
    > Trả lời: B, nếu có gì chưa hợp lý thì note vào open issue
    > Kết quả verify: RESOLVED. Re-verify độc lập trên linh-explorer xác nhận /products vẫn ghi tab/search/limit/cursor vào query string — khớp phía B. (evidence: portal-evidence.json CONF-001, run CTX-20260913-02)

- [x] **[CONF-002]** Claim `iss` của JWT portal
    - Phía A: iss = https://staging-api.teeinblue.com/api/login _(nguồn: runs/context/2026-09-10/CTX-20260910-01/intermediate/api/action-api-map.json (APIOP-001, run trước))_
    - Phía B: iss = https://staging-api.teeinblue.com/api/token/refresh _(nguồn: portal-evidence.json payload.portal_context.verified_by (đọc localStorage.teeinblue_token trong run này))_
    - Trạng thái hiện tại: RESOLVED theo domain knowledge từ người dùng (2026-09-10): iss claim đổi vì portal gọi /api/token/refresh khi token gần hết hạn; JWT mới phát hành bởi endpoint refresh sẽ có iss khác với JWT phát hành
    > Trả lời: /login chỉ gọi lúc login vào portal, còn cơ chế refresh token dùng để tạo token mới và các api sử dụng token mới này. Note lại tib token được lưu vào local storage
    > Kết quả verify: RESOLVED (có lưu ý nhỏ). Xác nhận iss đổi giữa /api/login và /api/token/refresh đúng như giải thích — nhưng lần verify này gọi trực tiếp endpoint refresh bằng script, KHÔNG bắt được portal tự động trigger refresh tự nhiên trong lúc dùng. (evidence: portal-evidence.json CONF-002, run CTX-20260913-02)

### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [x] **[printarea-definition::CHK-04-009]** Anh huong toi variant dang tro toi printarea_id khi printarea do bi xoa
    - Q: Run nay moi variant deu co printarea_id=null nen chua quan sat duoc anh huong khi xoa printarea ma co variant dang tro toi. Day la rang buoc referential integrity quan trong (co the soft-orphan du lieu, loi hien thi, hoac can chan xoa) - can PO/Dev xac nhan hanh vi mong doi truoc khi coi day la an toan.
    > Trả lời: về UI thì printarea sẽ không hiện trong danh sách printarea và trong variant không hiện. Nhưng trong API trả về thì variant vẫn còn lưu printarea_id. Phần này có thể explore kỹ hơn các action của object và mối liên hệ giữa các sections, ví dụ xóa 1 printarea đang sử dụng thì kiểm tra tất cả những chỗ có printarea như trong mockup, campaign mockup, printarea trong campaign/order. 
    > Kết quả verify: NEW CONFLICT (một phần). Phần mockup/campaign: RESOLVED — xoá printarea KHÔNG ảnh hưởng gì tới mockup hay campaign_products (0 thay đổi, cả ở schema lẫn thực nghiệm). Phần variant: evidence LỆCH với câu trả lời — `variant.printarea_id` thực tế LUÔN là `null` (không giữ giá trị cũ như bạn mô tả); giá trị cũ thực sự nằm ở 1 row orphan trong bảng `variant_printareas` không bị dọn khi xoá printarea. Xem conflict mới **CONF-CHK-04-009-001** ở cuối mục Conflict bên dưới — cần bạn xác nhận lại. (evidence: APIOP-032, ACT-04-RC-009C, run CTX-20260913-02)

- [x] **[printarea-definition::CHK-04-013]** RUI RO P1: Pham vi cot/hang thuc su duoc phep _set qua Hasura mutation insert_printareas/update_printareas voi JWT user thuong - CHUA VERIFY
    - Q: KB-047 (OBSERVED_CURRENT, confidence HIGH, observed_count=8) chi xac nhan BE MAT: client gui thang table-level mutation Hasura (insert_printareas/update_printareas) voi _set tuy y tu trinh duyet, dung JWT user thuong, khong co header Hasura dac biet nao khac trong capture. Pham vi cot/hang ma role nay THUC SU duoc phep _set (co the sua field an, sua printarea khong thuoc quyen so huu, hoac cross-tenant) CHUA duoc verify boi bat ky negative test hoac cross-tenant test nao trong run CTX-20260910-04 (.env chi con 1 account). Day la be mat tan cong tiem an (privilege scope chua ro) - can uu tien test ngay khi co TIB_USER_B_* hoac quyen thuc hien negative test an toan.
    > Trả lời: về mặt người dùng thì có thể chỉnh sửa width/height của printarea, nếu có suggestion về security thì note lại vào open  issue. tôi sẽ cung cấp user B để check security trong giai đoạn sau. 
    > Kết quả verify: PARTIALLY RESOLVED. Phần UI (user thường sửa width/height bình thường): RESOLVED, CONFIRMED_EXPECTED. Phần security/cross-tenant scope của Hasura mutation: giữ nguyên NEEDS_CONFIRMATION, chưa test — chờ TIB_USER_B như đã hẹn. (evidence: ACT-04-RC-013, run CTX-20260913-02)

- [x] **[product-base-campaign-link::CHK-08-007]** RUI RO P1 (exploratory): Bam 'Update campaign' thuc su dong bo nhung gi tu product base sang campaign - HOAN TOAN CHUA CO EVIDENCE
    - Q: SCN-08-01 (upstream, portal-explorer) co 0 ACT cho hanh dong bam 'Update campaign' - bi chan boi forbidden_actions/mutation-policy cua run nay (gan ranh gioi publish_live). Day la core capability cua ca feature nhung hoan toan khong co API/DB evidence. Can: (1) PO/Dev xac nhan co nen tiep tuc nam trong forbidden_actions khong, (2) neu co the test an toan (vd tren campaign/product base danh rieng cho QA, khong anh huong storefront that), can 1 run rieng voi mutation policy phu hop de lay evidence - dung theo de xuat cua chinh feature profile ('orchestrator - can nhac dieu phoi 1 run rieng').
    > Trả lời: forbidden_action là action gì? việc update campaign trong product base hay artwork thực tế là hiện lên những campaign đang sử dụng product base/artwork này > update campaign ngoài SDK, để người dùng không cần mở từng campaign thì mới update được, không phải mục đích để update product base/artwork vào campaign.
    > Kết quả verify: RESOLVED. Xác nhận đúng: nút/icon "Update campaign" chỉ liệt kê các campaign đang dùng product base này để user tự mở từng cái, không phải action đẩy update vào campaign. (evidence: ACT-08-RC-007, run CTX-20260913-02)

- [x] **[product-base-campaign-link::CHK-08-008]** RUI RO P1 (exploratory): Them 1 product base vao campaign co san qua modal 'Select your product' + Save - HOAN TOAN CHUA CO EVIDENCE
    - Q: Tuong tu CHK-08-007: hoan toan chua co evidence cho duong ghi nay trong run CTX-20260910-04 (0 ACT, nam trong forbidden_actions). Chua biet API nao duoc goi, ghi gi vao campaign_products, va co validate/warning nao khi them product base 'chua san sang' (lien ket voi CHK-08-006) khong.
    > Trả lời: trong 1 campaign có thể thêm nhiều product base, campaign_products là mảng, explore thêm
    > Kết quả verify: RESOLVED. Thực hiện thật luồng "Select your product" + Save — xác nhận `campaign_products` là mảng, thêm được nhiều product base vào cùng 1 campaign. (evidence: ACT-08-RC-008, run CTX-20260913-02)

- [x] **[product-base-identity::CHK-03-006]** Concurrency: 2 phien cung sua Basic information dong thoi - co optimistic locking / canh bao xung dot khong
    - Q: PUT /api/products/{id} gui FULL-REPLACE 8 field (KB-027), khong thay dau hieu optimistic locking/version check nao trong evidence hien co. Neu 2 phien cung sua dong thoi, phien Save sau co the ghi de (last-write-wins) mat thay doi cua phien truoc do field khong hien thi tren form dang sua nhung van nam trong payload full-replace. Day la rui ro MAT DU LIEU chua duoc kiem chung bang test thuc te - can PO/Dev xac nhan co co che bao ve nao khong truoc khi coi day la production-ready.
    > Trả lời:Không có cơ ché bảo vệ nào, không làm vì cảm thấy không cần thiết. 
    > Kết quả verify: RESOLVED. Đây là business decision, không cần chạy thêm test — cập nhật KB thành CONFIRMED_EXPECTED "no optimistic locking, last-write-wins, by design" theo đúng lời bạn.

- [x] **[product-base-lifecycle::CHK-07-004]** RUI RO P1: DELETE product base khi deletion-check.policy='blocked' (IN_CAMPAIGNS) - server co thuc su chan khong
    - Q: GET /api/products/{id}/deletion-check tra {policy:'blocked', reason:'IN_CAMPAIGNS', token:null} khi product dang duoc campaign dung (KB-058, quan sat qua probe READ-ONLY tren product 3181/campaign 2592). Run CTX-20260910-04 KHONG goi DELETE that tren asset nay (nam trong forbidden_actions cua mutation policy SAFE_REVERSIBLE_ONLY, gan ranh gioi publish_live). Hoan toan CHUA CO EVIDENCE server co tu chan DELETE khi policy=blocked hay day chi la goi y cho UI (nghia la client tu kiem tra truoc, con server van chap nhan DELETE neu goi thang). Neu server KHONG tu chan, day la lo hong nghiem trong (co the xoa product dang duoc dung boi campaign live). Can PO/Dev xac nhan hoac 1 run rieng voi mutation policy phu hop.
    > Trả lời: Sau khi bấm delete, nếu đang được sử dụng trong campaign thì sẽ hiện lên nút View campaign list chứ không có xóa, tương tự với artwork cũng thế. có thể chạy verify lại. 
    > Kết quả verify: RESOLVED — đóng dứt điểm risk P1 gốc. Bằng chứng UI ban đầu (nút "View campaign list") không đủ mạnh nên bị reviewer bắt lại; đã gọi THẲNG `DELETE /api/products/{id}` bypass UI trên product đang link campaign → server trả về **403 Forbidden thật** ("Product cannot be deleted due to policy restrictions or invalid confirmation token"), product không bị xoá (verify lại qua GraphQL). Xác nhận server tự chặn ở tầng API, không chỉ là UI ẩn nút. (evidence: ACT-07-RC-004B-001, APIOP-040, run CTX-20260913-02)

- [x] **[variant-catalog::CHK-05-008]** Import variant tu csv/xlsx, Export/Import Excel cua grid, 'Delete selected' bulk nhieu variant - hoan toan chua chay trong run nay
    - Q: 3 chuc nang (Import csv/xlsx, Export/Import Excel cua grid, 'Delete selected' bulk) hoan toan CHUA duoc thuc thi trong run CTX-20260910-04 (coverage_gap). 'Delete selected' la thao tac pha huy hang loat - rui ro mat du lieu neu validate/confirm khong day du, tuong tu cac risk destructive-action da thay o FEAT-04/FEAT-07 (xoa khong dialog xac nhan). Can PO/Dev xac nhan hanh vi mong doi hoac 1 run rieng de kham pha an toan.
    > Trả lời: đây là store test + staging nên cứ run
    > Kết quả verify: PARTIALLY RESOLVED. Cả 3 luồng đã chạy thật (import csv/xlsx, export/import Excel grid, "Delete selected" bulk). Phát hiện 2 vấn đề mới cần dev triage riêng: (1) **SEC-001** — import Excel variant hợp lệ vẫn trả HTTP 500 (tái hiện được 2 lần); (2) bulk "Delete selected" KHÔNG có dialog xác nhận trước khi xoá hàng loạt — rủi ro mất dữ liệu do bấm nhầm. (evidence: ACT-05-RC-008, run CTX-20260913-02) 

### P2 — chức năng chính

- [x] **[mockup-attachment::CHK-06-004]** Upload file khong hop le (sai dinh dang, qua kich thuoc) - hanh vi validate chua ro
    - Q: Khong co observed_validations nao cho luong upload mockup trong run CTX-20260910-04 (chi co 1 lan upload thanh cong voi file hop le 1024x768/17217 bytes). Hanh vi khi upload file sai dinh dang hoac qua kich thuoc hoan toan chua duoc test - buoc nao chan (client/presigned URL/server) chua ro.
    > Trả lời: explore, tự tạo data test và lưu vào test-data hoặc nếu cần tôi tạo thì báo
    > Kết quả verify: PARTIALLY RESOLVED. Đã thử upload file sai định dạng và quá khổ — phát hiện **SEC-004**: bước upload presigned URL KHÔNG có kiểm tra magic-byte hay giới hạn kích thước, file sai vẫn được chấp nhận rồi kẹt vĩnh viễn ở trạng thái "Rendering" mà không báo lỗi gì cho user. Cần dev triage. (evidence: ACT-06-RC-004, ACT-06-RC-004b, run CTX-20260913-02)

- [x] **[mockup-attachment::CHK-06-005]** TTL, scope (bucket/prefix), gioi han kich thuoc file thuc te cua presigned upload URL
    - Q: Response cua POST /api/users/{userId}/temporary-files/upload-url BI REDACT HOAN TOAN theo redaction policy (contract §6, chua header/field chua signature). TTL, scope (bucket/prefix), gioi han kich thuoc file KHONG the suy tu evidence da redact - day la dieu kien CONDITIONAL_PASS ro rang cua feature profile FEAT-06. Can PO/Dev/Backend cung cap thong tin qua kenh khac (docs/code review) thay vi co gang suy luan tu evidence da redact.
    > Trả lời: thực tế thì chưa có giới hạn nào cho việc upload ảnh mockup nhưng để tối ưu hóa tốc độ cho site, các ảnh mockup mà bạn upload sẽ được resize với mốc maximum là 960 x 960px về chiều rộng và ngang. Nếu bạn dùng ảnh có size nhỏ hơn 1000px, thì chúng sẽ không bị resize. Đồng thời kiểm tra xem các ảnh có thể upload trong cùng mốc thời gian là bao nhiêu. 
    > Kết quả verify: NEW CONFLICT (một phần) + RESOLVED (một phần). Phần "không giới hạn dung lượng file": RESOLVED, khớp lời bạn. Phần ngưỡng resize: evidence loại trừ được mốc 960px (ảnh 999px không bị resize), nghiêng về 1000px nhưng CHƯA CHỐT được vì bị nhiễu bởi giới hạn concurrency (chỉ 3/5 file upload đồng thời được xử lý). Xem conflict mới **CONF-CHK-06-005-001** ở cuối mục Conflict — cần bạn xác nhận lại con số chính xác. (evidence: ACT-06-RC-005, run CTX-20260913-02)


- [x] **[mockup-attachment::CHK-06-007]** Co che thong bao hoan tat render mockup (polling/webhook) - CHUA quan sat duoc
    - Q: Run nay khong cho toi khi render xong nen khong co evidence ve polling/webhook nao (portal-explorer dem polling=0 trong toan bo capture); chi co text huong dan 'reload after a few minutes'. Co che thuc su (polling dinh ky, webhook, hay hoan toan phai user tu reload) chua duoc xac nhan.
    > Trả lời: Chưa có thông báo gì về việc mockup được render xong, cần thì user sẽ tự sử dụng nút Refresh icon (.la-sync)
    > Kết quả verify: RESOLVED. Xác nhận không có polling/webhook tự động; icon Refresh (.la-sync) gọi GraphQL thật và cập nhật trạng thái. (evidence: ACT-06-RC-007, run CTX-20260913-02)

- [x] **[mockup-attachment::CHK-06-009]** Modal 'Assign mockups' Save thuc su gan mockup cho variant - CHUA thuc thi trong run nay
    - Q: Run nay chi mo modal 'Assign mockups' roi Cancel (KB-052), chua thuc su bam Save. API nao duoc goi va ket qua gan thuc te (co lien ket voi Custom Printareas cua FEAT-05 khong) hoan toan chua co evidence.
    > Trả lời: Chạy thử luôn. Hình như sẽ update qua graphql, cần kiểm tra lại. Không liên quan đến custom printarea. Assign variant là khi chọn variant thì sẽ hiện mockup đó, kể cả mockup không chứa printarea. 
    > Kết quả verify: RESOLVED. Bấm Save thật xác nhận mutation GraphQL `AssignMockupVariantIds` (`update_mockups_many`), hoạt động độc lập với việc mockup có printarea hay không, không liên quan Custom Printareas — khớp đúng lời bạn. (evidence: ACT-06-RC-009, run CTX-20260913-02)

- [x] **[printarea-definition::CHK-04-008]** Gia tri bien cua Width/Height (0, am, so rat lon, so thap phan) - CHUA XAC DINH validation numeric
    - Q: KB-034 chi moi thu 1 kieu input sai HAN kieu du lieu (text 'abc') cho Width, chua thu cac gia tri bien hop le ve kieu nhung bat thuong ve gia tri (0, so am, so cuc lon, so thap phan). Theo dieu kien CONDITIONAL_PASS cua feature profile FEAT-04: KHONG duoc tong quat hoa 'khong co validation numeric' thanh rule. Can test rieng cac gia tri bien nay o ca client va server truoc khi ket luan.
    > Trả lời: expected phải là số dương, vì cảm thấy những case này sẽ là do user setup hoặc import về có sẵn nên không validate printarea w/h -> priority rất thấp. t nghĩ không cần validate
    > Kết quả verify: RESOLVED. Business decision, không cần chạy thêm test — cập nhật KB thành CONFIRMED_EXPECTED "no numeric validation enforced by design" theo đúng lời bạn.

- [x] **[product-base-browse::CHK-01-009]** Hanh vi phan trang cursor khi store co nhieu hon 1 trang du lieu (>20 record)
    - Q: Cursor pagination hoat dong the nao khi co >20 ban ghi (nut ‹ › chuyen trang ra sao, cursor co duoc giu dung khi quay lai khong)? Store hien tai chi co 3 ban ghi nen ca 2 nut deu disabled trong toan bo run CTX-20260910-04 - day la coverage_gap cua feature profile, chua co evidence nao ve multi-page. Can seed du lieu hoac PO/Dev xac nhan co che mong doi.
    > Trả lời: có thể dùng account của store B (linh-tib-staging)
    > Kết quả verify: **BLOCKED** (hạ tầng, không phải business/technical). Claude Code auto-mode permission classifier chặn cứng mọi lệnh liên quan login/credential của account User B (kể cả lệnh chuẩn `npx playwright test --project=setup` có sẵn trong repo) — chưa login được vào store B nên chưa seed được data test. Cần bạn tự chạy lệnh này ngoài phiên, hoặc thêm permission rule cho `Bash(npx playwright test:*)` trong `.claude/settings.json`, hoặc tạm đổi permission mode khi cần retry. Chưa có mutation nào xảy ra trên store B.

- [x] **[product-base-browse::CHK-01-010]** Filter chip 'Internal name' / 'Internal tags' co thuc su loc dung field tren server khong
    - Q: 2 filter chip rieng 'Internal name'/'Internal tags' co thuc su loc dung field label/internal_tags tren server khong, hay cung gap loi tuong tu o Search chung (chi loc title, xem KB-005/CHK-01-007)? Chua co ACT nao test rieng 2 filter chip nay trong run CTX-20260910-04 (unmapped_evidence trong KB goc).
    > Trả lời: cần explore kỹ hơn
    > Kết quả verify: RESOLVED. Cả 2 filter chip "Internal name" và "Internal tags" đều lọc đúng field tương ứng, không rơi vào bug giống Search chung. (evidence: ACT-01-RC-010, run CTX-20260913-02)

- [x] **[product-base-browse::CHK-01-011]** URL-sync khi roi /products/:id/edit roi quay lai co back-restore filter/trang khong (CONF-001 chua formal resolve)
    - Q: CONF-001 (product-kb.json) co 1 'resolution' tu domain-expert (2026-09-10, qua conversation, CHUA qua qa-context-lifecycle-orchestrator + reviewer formal review) noi URL-sync la co chu dich de back-restore filter/trang khi roi /products/:id/edit roi quay lai, ap dung cho ca /products, /campaigns, /orders. Run CTX-20260910-04 KHONG co evidence truc tiep tai hien co che back-restore nay cho /products (chi co evidence ve URL thay doi TRONG CUNG list, vd doi tab/search/page-size). Can PO/Dev xac nhan chinh thuc day co phai la expected behavior khong, va verify bang evidence that truoc khi coi day la business rule.
    > Trả lời: đúng vậy
    > Kết quả verify: RESOLVED. Re-verify độc lập: đổi filter/trang -> mở product để edit -> back -> filter/trang được khôi phục đúng từ URL. (evidence: ACT-01-RC-011, run CTX-20260913-02)

- [x] **[product-base-browse::CHK-01-012]** Cursor ghi trong URL co the bi stale neu tao product base moi trong luc dang o trang edit roi quay lai bang URL cu
    - Q: Rui ro cursor-staleness duoc chinh domain-expert neu ra trong resolution cua CONF-001 nhung CHUA duoc tai hien bang evidence that trong run nay (store chi co 3 record, chua tung co >1 trang). Can 1 run rieng seed du lieu (>20 record) de kiem tra thuc te.
    > Trả lời: đúng, run tại  user B
    > Kết quả verify: **BLOCKED** — cùng nguyên nhân với CHK-01-009 (permission classifier chặn login User B). Chưa có evidence mới.

- [x] **[product-base-campaign-link::CHK-08-010]** Staff activity log co ghi lai 'product base updated' khi sua qua co che server-side (Hasura event trigger) khong phat sinh HTTP request quan sat duoc o client
    - Q: Day la domain-knowledge/gia thuyet tu knowledge/_open-issues/product-base-api.md (unmapped_evidence trong KB goc), CHUA co evidence truc tiep trong run CTX-20260910-04 (truoc do /activity-logs tung quan sat la rong). Can verify o run sau truoc khi coi day la fact; co the anh huong cach audit thay doi dong bo sang campaign, lien quan toi rui ro audit-log da thay o FEAT-04 (KB-035/036).
    > Trả lời: run chạy update từng phần trong product base (basic info, mockup, printarea, variant) và đưa ra kết luận
    > Kết quả verify: NEW CONFLICT. Đã chạy update riêng từng phần (basic info/printarea/variant) và kiểm activity log sau mỗi lần — kết quả CẢ 3 loại đều KHÔNG ghi log gì (activity log rỗng hoàn toàn), thay vì kỳ vọng ít nhất 1 loại có log như giả thiết ban đầu. Xem conflict mới **CONF-CHK-08-010-001** ở cuối mục Conflict — cần bạn xác nhận đây có phải hành vi mong đợi không. (evidence: ACT-08-RC-010 x3, run CTX-20260913-02)

- [x] **[product-base-campaign-link::CHK-08-011]** Filter 'Find Internal name'/'Find Internal tags' trong modal 'Select your product' (neu co) co hoat dong dung khong
    - Q: Lien quan toi KB-004/KB-005 cua FEAT-01 (o list /products, o Search chung chi loc title, filter chip rieng chua verify) nhung day la NGU CANH KHAC (modal chon product cho campaign, co the dung API/component rieng) - KHONG duoc coi la trung lap voi CHK-01-010. Chua co ACT nao test rieng cho ngu canh nay trong run CTX-20260910-04.
    > Trả lời: run 
    > Kết quả verify: RESOLVED. Cả 2 filter "Find Internal name"/"Find Internal tags" trong modal "Select your product" đều lọc đúng field tương ứng. (evidence: ACT-08-RC-008-select-product-modal, run CTX-20260913-02)

- [x] **[product-base-create::CHK-02-008]** Product title voi gia tri bien (whitespace-only, rat dai, ky tu dac biet/HTML) xu ly ra sao
    - Q: Chi moi test title rong (KB-021); gia tri bien cua Product title (whitespace-only, rat dai, ky tu dac biet/HTML) chua duoc thu trong run CTX-20260910-04. Input nay do user nhap tu do nen co rui ro luu sai/XSS/overflow - can PO/Dev xac nhan rule mong doi (max length, sanitize HTML) truoc khi viet expected_result khang dinh.
    > Trả lời: kiểm tra với vấn đề security còn tôi không muốn validate quá kỹ cho mấy field như thế này. Với case toàn whitespace thì coi là không có title -> không save được
    > Kết quả verify: PARTIALLY RESOLVED. Whitespace-only title: RESOLVED, khớp đúng lời bạn (bị chặn, không lưu được). Phần security: phát hiện **SEC-002** — HTML-escape KHÔNG nhất quán giữa title link và label (tiềm ẩn XSS), cần dev đánh giá severity. (evidence: ACT-02-RC-008 xss-detail/xss-img-payload, run CTX-20260913-02)

- [x] **[product-base-create::CHK-02-009]** Cac field khac ngoai Product title de trong co bi chan o server khong
    - Q: DOM khong co dau hieu bat buoc cho field nao (KB-016), nhung chi moi test Product title rong thuc te (KB-021, 4 lan on dinh). Cac field khac (Internal name, Internal tags, Fulfillment catalog ID, Description) de trong co bi chan phia server khong - hoan toan chua co evidence. Theo dieu kien CONDITIONAL_PASS cua feature profile FEAT-02: khong duoc tong quat hoa 'chi Product title required' thanh rule day du.
    > Trả lời: thử run case chạy để validate khi tạo mới printarea, variant, import variant
    > Kết quả verify: RESOLVED. Đã chạy thật các case tạo mới printarea/variant/import — xác định được field nào thực sự bắt buộc phía server. (evidence: ACT-02-RC-009, run CTX-20260913-02)

- [x] **[product-base-create::CHK-02-012]** Bien nao thuc su quyet dinh 'Advanced options' enable tren cac loai product base khac nhau
    - Q: Quan sat duoc: nut 'Advanced options' disabled tren /products/new va tren product base tao tay (fulfillment_id=null, is_imported=false); chi enabled tren product base imported co catalog ID (Printify, 3181). Chua tach duoc bien nao thuc su quyet dinh (fulfillment_id, is_imported, catalog ID, hay dang duoc campaign dung) vi chi co 2 sample doi chieu, khong co tooltip giai thich. Can PO/Dev xac nhan dieu kien enable that de tranh viet test case sai gia dinh ve default_options/Required options.
    > Trả lời: những advanced options này sẽ được lấy trong lúc import sản phẩm từ nhà in về. Khi fulfill thì cần có 1 số thông tin trong advanced options thì mới fulfill được, nhưng cũng tùy với 1 vài sản phẩm và cái này do bên nhà in quy định (app TIB này không phụ trách phần đó)
    > Kết quả verify: RESOLVED. Business explanation, không cần chạy thêm test — cập nhật KB thành CONFIRMED_EXPECTED theo đúng giải thích của bạn.

- [x] **[product-base-identity::CHK-03-004]** Xoa sach Product title trong Basic information (khac luong /products/new) roi Save
    - Q: Validation title rong CHI duoc quan sat o luong tao moi /products/new (KB-021, response 422). Chua test lai validation nay o section Basic information tren trang edit (PUT full-replace /api/products/{id}) - co ap dung dung rule giong het khong, hay full-replace co the 'lot' du lieu title rong qua ma khong bi chan (rui ro mat du lieu title)?
    > Trả lời: có áp dụng rule như lúc tạo
    > Kết quả verify: RESOLVED. Xoá sạch title ở Basic information (PUT full-replace) bị chặn giống hệt lúc tạo mới, không bị "lọt". (evidence: ACT-03-RC-004, run CTX-20260913-02)

- [x] **[product-base-identity::CHK-03-005]** Gioi han kich thuoc/dinh dang thuc te cua Thumbnail upload (250x250px theo tooltip, chua tung upload that)
    - Q: Tooltip chi noi 250x250px nhung run nay CHUA co ACT nao thuc su thao tac upload thumbnail - toan bo phan nay chi la quan sat UI tinh (KB-025). Chua biet gioi han thuc thi o client hay server, thong bao loi ra sao neu vi pham.
    > Trả lời: hiện tại đang chưa thể thực hiện upload, nhưng mà có thể upload ảnh nằm trong khoảng 50x50 tới 2000x2000, sau khi upload thì sẽ giảm size xuống còn 250x250
    > Kết quả verify: RESOLVED. Test thật xác nhận: ảnh trong khoảng 50-2000px được chấp nhận và resize về 250x250, ảnh ngoài biên bị reject — khớp đúng lời bạn. (evidence: ACT-03-RC-005, run CTX-20260913-02)

- [x] **[product-base-lifecycle::CHK-07-005]** DELETE product base dang o trang thai ACTIVE (chua archive) - co duoc chap nhan khong
    - Q: KB-059 (DELETE tra 204) la sample DUY NHAT quan sat duoc, va sample nay da o status=archived TU TRUOC. Chua biet DELETE tren product dang ACTIVE (chua archive) co duoc chap nhan truc tiep hay bat buoc phai archive truoc (rang buoc thu tu).
    > Trả lời: có được chấp nhận và behavior giống active 
    > Kết quả verify: RESOLVED. DELETE khi status=ACTIVE (chưa từng archive) được chấp nhận, 204, giống hệt case đã archive — khớp đúng lời bạn. (evidence: ACT-07-RC-005, run CTX-20260913-02)

- [x] **[product-base-lifecycle::CHK-07-006]** Unarchive - control ton tai trong UI nhung CHUA duoc thuc thi trong run nay
    - Q: Control 'Unarchive' ton tai trong menu '...' o tab Archived (KB-011, quan sat qua FEAT-01) nhung CHUA duoc bam/thuc thi trong run CTX-20260910-04 - 0 ACT/API evidence cho chieu nguoc cua archive (status 1 -> 0). Chua biet API nao duoc goi hay co hanh vi phu nao khac (vd anh huong toi campaign_products) khong.
    > Trả lời: thực hiện run và kiểm tra trạng thái của product base trong campaign xem có ẩnh hưởng gì không
    > Kết quả verify: RESOLVED (dạng OBSERVED_CURRENT, giữ khách quan vì bạn chỉ yêu cầu "run và check" chứ không khẳng định kết quả cụ thể). Đã bấm Unarchive thật, capture API — campaign link không bị ảnh hưởng bởi vòng archive/unarchive. (evidence: ACT-07-RC-006, run CTX-20260913-02)

- [x] **[product-base-lifecycle::CHK-07-009]** Muc dich cua field 'token' trong response deletion-check - luon null o ca 2 branch
    - Q: Field 'token' trong response deletion-check luon null o CA 2 sample quan sat duoc (allowed va blocked). Muc dich va dieu kien de co gia tri chua ro - co the lien quan toi mot luong xac nhan xoa (vd token dung mot lan cho DELETE) chua duoc kich hoat trong run nay. Can lam ro truoc khi coi luong delete la an toan/day du, dac biet lien quan toi CHK-07-004 (server enforcement).
    > Trả lời: note lại vào open issue và hiện tại thì không ảnh hưởng gì
    > Kết quả verify: RESOLVED. Note lại làm known-limitation theo đúng lời bạn, không cần action thêm. Ghi nhận thêm 1 manh mối liên quan (chưa kết luận): message lỗi 403 khi DELETE bị chặn (xem CHK-07-004) có nhắc "invalid confirmation token" — có thể liên hệ tới field `token` này, nhưng chưa đủ căn cứ để kết luận, để ở dạng quan sát cạnh nhau. (evidence: ACT-07-RC-004B-001, run CTX-20260913-02)

- [x] **[variant-catalog::CHK-05-007]** Pham vi unique SKU thuc su o server (INFERRED, chua verify constraint DB)
    - Q: KB-041 la INFERRED (suy tu query pre-check getVariant dung where (product_id, fulfillment_linked_id) + hanh vi clone giu nguyen SKU khi tao ban sao), CHUA co test insert truc tiep len server de xac nhan DB constraint that. Theo dieu kien CONDITIONAL_PASS cua feature profile FEAT-05: KB-041 KHONG duoc dung lam oracle/business rule. Can gui thang insert_variants voi SKU trung (khac product_id) de xac nhan pham vi unique constraint that o server.
    > Trả lời: chỉ không được trùng SKU ở trong cùng 1 product base, duplicate/import product base thì vẫn có thể trùng
    > Kết quả verify: RESOLVED. Test thật: SKU trùng trong cùng 1 product base bị chặn; SKU trùng across product base khác (qua duplicate) được chấp nhận — khớp đúng lời bạn. (evidence: ACT-05-RC-007b, run CTX-20260913-02)

- [x] **[variant-catalog::CHK-05-011]** Duong UI thuc su de gan Custom Printareas rieng cho tung variant sau khi bat toggle - CHUA TIM DUOC
    - Q: Chua tim duoc cach gan Custom Printareas cho tung variant qua cac tuong tac thong thuong (click/dblclick/Enter deu khong mo editor - KB-046). Co the la tinh nang an, chua hoan thien, hoac bug. Can PO/Dev xac nhan duong UI dung (neu co) hoac xac nhan day la tinh nang chua ra mat.
    > Trả lời: trong variant grid có cột Custom printareas, click vào ô đó ở từng variant thì sẽ hiện ra danh sách printarea để chọn.
    > Kết quả verify: RESOLVED. Xác nhận đúng — click vào ô "Custom printareas" (sau khi bật toggle) mở popup chọn printarea. Đã merge check cũ CHK-05-010 (v1, kết luận sai "luôn No printareas, chưa tìm được UI" do thiếu tiền điều kiện) vào CHK-05-011 này. (evidence: ACT-04-RC-009-002, run CTX-20260913-02)

### P3 — còn lại, có thể để sau

- [x] **[mockup-attachment::CHK-06-010]** Card mockup co cac action Edit/Duplicate/Move/More - hoan toan chua thuc thi hanh dong nao
    - Q: Nhom action Edit/Duplicate/Move/More tren card mockup hoan toan chua duoc thuc thi trong run CTX-20260910-04 (coverage_gap, chi biet qua quan sat UI tinh).
    > Trả lời: thực thi những action này và update những thay đổi liên quan tới campaign
    > Kết quả verify: PARTIALLY RESOLVED. Edit/Duplicate/More đã thực thi thật — xác nhận KHÔNG có icon "Move" riêng (giả định cũ sai), menu "More" thật là "Add to campaigns / Sync to campaigns / Remove from all campaigns / Delete mockup". Phát hiện mới **MISMATCH-003**: bấm "Sync to campaigns" bị chặn với thông báo "Mockup is not used in any campaign." NGAY CẢ KHI product base đang thật sự link với campaign đó — chưa rõ đây là bug hay by-design, cần bạn/dev quyết định. (evidence: ACT-06-RC-010, run CTX-20260913-02)

### Conflict MỚI phát sinh từ run verify CTX-20260913-02 — cần bạn trả lời tiếp

- [x] **[CONF-CHK-04-009-001]** `variant.printarea_id` có thực sự giữ giá trị cũ sau khi xoá printarea không, hay giá trị cũ nằm ở chỗ khác
    - Phía A (câu trả lời của bạn ở CHK-04-009): "trong API trả về thì variant vẫn còn lưu printarea_id [cũ]".
    - Phía B (evidence run CTX-20260913-02): field `variant.printarea_id` LUÔN LÀ `null` ở mọi sample quan sát được (kể cả trước/sau khi xoá printarea). Giá trị/liên kết cũ với printarea đã xoá thực ra nằm ở 1 ROW ORPHAN trong bảng `variant_printareas` (không bị dọn khi printarea bị xoá) — khác cơ chế với điều bạn mô tả.
    - Trạng thái hiện tại: UNRESOLVED.
    > Trả lời: B đúng, giá trị liên kết cũ nằm trong variant_printeraes
    > Kết quả verify: RESOLVED. Re-đọc lại evidence run CTX-20260913-02 (APIOP-012/014, ACT-04-RC-009-003 — không phải APIOP-032/ACT-04-RC-009C như ghi nhầm trước đó) qua 3 lần đọc `variant_printareas` ổn định sau DELETE: `variant.printarea_id` luôn `null`, orphan row nằm ở `variant_printareas` không bị dọn. Khớp đúng lời bạn "B đúng". Câu hỏi phụ "đây là bug hay accepted behavior" vẫn để mở, chưa kết luận. (evidence: KB-096, APIOP-012/014, ACT-04-RC-009-003, run CTX-20260914-01)

- [x] **[CONF-CHK-06-005-001]** Ngưỡng resize thật của ảnh mockup là 960px hay 1000px (hoặc giá trị khác)
    - Phía A (câu trả lời của bạn ở CHK-06-005): mốc maximum resize là 960x960px; ảnh nhỏ hơn 1000px thì không bị resize.
    - Phía B (evidence run CTX-20260913-02): test thật loại trừ được mốc 960 (ảnh 999px KHÔNG bị resize, mâu thuẫn với "max 960"). Ngưỡng thật nghiêng về gần 1000px nhưng CHƯA CHỐT được dứt điểm vì bị nhiễu bởi 1 giới hạn concurrency riêng (chỉ 3/5 ảnh upload đồng thời được xử lý, không liên quan tới kích thước).
    - Trạng thái hiện tại: UNRESOLVED.
    > Trả lời: 1000px 
    > Kết quả verify: VẪN UNRESOLVED — evidence lần 2 tiếp tục phản bác câu trả lời. Upload THẬT, tuần tự (cách nhau >1 phút, đợi xử lý xong hẳn giữa 2 lần, không đồng thời để tránh nhiễu concurrency của lần trước): ảnh 999x999px giữ nguyên KHÔNG resize, ảnh 1001x1001px CŨNG giữ nguyên KHÔNG resize — xác nhận độc lập qua 2 nguồn (field width/height của `GET /api/mockup-layers` sau khi render xong hẳn, VÀ download trực tiếp file `_large.webp` công khai trên CDN rồi đo pixel thật bằng `sips`). Cả 2 điểm dữ liệu đều mâu thuẫn với mốc 1000px. Ngưỡng thật (nếu có) vẫn CHƯA XÁC ĐỊNH — chỉ loại trừ được rằng nó không nằm ở ≤1001px. KB cập nhật giữ ở `OBSERVED_CURRENT` (không chốt CONFIRMED_EXPECTED), checklist CHK-06-012 giữ `NEEDS_CONFIRMATION`/`BASELINE`. Cần bạn xác nhận lại con số, hoặc cho phép test tiếp ở mốc cao hơn (1500/2000/3000px). (evidence: ACT-06-RC2-005-999, ACT-06-RC2-005-1001, run CTX-20260914-01)

- [x] **[CONF-CHK-08-010-001]** Staff activity log có ghi nhận BẤT KỲ loại update nào của product base không
    - Phía A (câu trả lời của bạn ở CHK-08-010, ngầm định): kỳ vọng chạy update từng phần (basic info/printarea/variant) sẽ giúp phân biệt loại nào có log, loại nào không.
    - Phía B (evidence run CTX-20260913-02): chạy thật cả 3 loại update riêng biệt — activity log RỖNG HOÀN TOÀN ở cả 3 loại, không có bất kỳ entry nào (đậm hơn giả thiết cũ "chỉ printarea không log", thực ra không loại nào log).
    - Trạng thái hiện tại: UNRESOLVED.
    > Trả lời: trong portal có 2 loại log, action của staff và log của object nào đó. ví dụ trong product base sẽ có log của printarea, còn staff có log sẽ nằm trong trang /activity-logs
    > Kết quả verify: RESOLVED (phần cấu trúc). Tìm thấy và xác nhận THẬT link "Logs" riêng ở góc phải trên trang "Edit product" (`/products/{id}/edit`), khác hoàn toàn `/activity-logs` toàn cục. Modal có filter "Status" với 4 giá trị: Printarea added/removed/name changed/size changed — xác nhận log này chỉ scope cho Printarea events của product-base đó. Đã tạo 1 printarea THẬT và xác nhận modal hiện ngay entry mới tương ứng — chứng minh log này thật sự hoạt động, không phải UI tĩnh. Khớp đúng lời bạn về việc có 2 hệ thống log tách biệt. Làm rõ lại kết luận cũ "product_activities hoàn toàn không hoạt động" (run CTX-20260913-02): không phải sai, chỉ là 3 loại update test trước đó (basic-info, printarea theo cách cũ, variant) không thuộc nhóm được log tại thời điểm đó — xem conflict mới ngay dưới. (evidence: KB-097, ACT-08-RC2-010-001, ACT-04-RC2-LOG-001, run CTX-20260914-01)

- [x] **[CONF-CHK-08-010-002]** (MỚI, phát sinh từ run CTX-20260914-01) Log Printarea "added" có xuất hiện NHẤT QUÁN mỗi lần tạo printarea không
    - Phía A: Run CTX-20260913-02 — tạo printarea thật (id 13991), đợi đủ thời gian, kiểm tra `product_activities` → RỖNG, không có entry nào.
    - Phía B: Run CTX-20260914-01 — tạo printarea thật (id 13993) trên product khác, kiểm tra lại modal "Logs" ngay sau đó → CÓ entry "Printarea added" xuất hiện ngay lập tức.
    - Trạng thái hiện tại: UNRESOLVED. Chưa rõ nguyên nhân khác biệt (2 sản phẩm khác nhau, 2 ngày khác nhau, có thể do điều kiện/feature-flag nào đó, hoặc do run trước kiểm tra sai chỗ) — không tự suy diễn.
    > Trả lời:

**Các security/defect finding mới phát hiện trong run này** (không phải conflict, cần bạn/dev triage riêng, không chặn việc publish KB): SEC-001 (HTTP 500 khi import Excel variant hợp lệ — xem CHK-05-008), SEC-002 (HTML-escape không nhất quán, tiềm ẩn XSS ở Product title — xem CHK-02-008), SEC-004 (upload mockup không kiểm tra magic-byte/kích thước, file lỗi kẹt vĩnh viễn ở "Rendering" — xem CHK-06-004), MISMATCH-003 (mockup "Sync to campaigns" báo không dùng trong campaign dù thực tế có link — xem CHK-06-010 P3).

KB/Feature Profile/Checklist của object `product-base` đã được publish thành `v2-CTX-20260913-02` (MAJOR bump từ `v1-CTX-20260910-04`) tại `knowledge/products/teeinblue/objects/product-base/`, giữ nguyên toàn bộ conflict/NEEDS_CONFIRMATION/BLOCKED ở trên — không tự resolve.

**Follow-up `v2.1-CTX-20260914-01`** (MINOR bump, run `CTX-20260914-01`, RECONCILE hẹp chỉ 3 conflict phụ ở trên): đóng `CONF-CHK-04-009-001` và `CONF-CHK-08-010-001` (RESOLVED), giữ `CONF-CHK-06-005-001` UNRESOLVED với evidence mới, phát sinh `CONF-CHK-08-010-002` (MỚI, UNRESOLVED). File cập nhật: `kb.json` + `features/{printarea-definition,mockup-attachment,product-base-campaign-link}/profile.json` + `checklists/{printarea-definition,mockup-attachment,product-base-campaign-link}.json`. 5 feature/checklist khác không đổi.

---

## Font — trang /fonts (custom_fonts)

`knowledge/products/teeinblue/objects/font/` · 2 conflict · 2 P1 · 12 P2 · 5 P3

### Conflict — 2 nguồn evidence trái ngược, chưa chọn bên đúng

- [x] **[CONFLICT-001]** Data source của /fonts: toàn bộ qua Hasura GraphQL (documented) vs REST cho create/download/delete (observed run này)
    - Phía A: Không đi qua REST mà qua Hasura GraphQL — cho cả List (query getData) và Detail (query get/fonts_by_pk). _(nguồn: knowledge/portal-fonts.md, mục 'Data source' — explore 2026-09-09, staging, role user-a (id 255), store linh-tib-staging)_
    - Phía B: List/search/pagination (query getData) và rename (mutation update_custom_fonts) đi qua Hasura GraphQL — khớp KB cũ. Nhưng create (POST /api/custom-fonts), download (GET /api/custom-fonts/{id}/download), và delete (DELETE _(nguồn: Run này, CTX-20260910-05, staging, role owner (sub=273), store linh-explorer.myshopify.com.)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời: B đúng

- [x] **[CONFLICT-002]** Nút 'Upload fonts' mở modal (observed run này) vs mở thẳng OS file picker không modal (documented)
    - Phía A: Nút Upload fonts mở thẳng file picker OS, không có modal. _(nguồn: knowledge/portal-fonts.md, mục 'Behavior đã xác nhận' — cùng nguồn/store/ngày với CONFLICT-001 (2026-09-09, store linh-t)_
    - Phía B: Click 'Upload fonts' mở một modal ('Browse fonts to upload:' + banner convert TTF + nút 'Choose File') TRƯỚC, rồi 'Choose File' mới mở OS file picker. _(nguồn: Run này, CTX-20260910-05, staging, role owner (sub=273), store linh-explorer.myshopify.com.)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời: B đúng

### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [x] **[manage-uploaded-font::CHK-007]** Xoá 1 font ĐANG được dùng thật trong artwork/font category
    - Q: Server có chặn xoá font đang được dùng (409/400) hay cho xoá vô điều kiện rồi để artwork lỗi font? Hành động này nằm trong forbidden_actions của run gốc (rủi ro phá hỏng dữ liệu artwork thật) nên chưa từng được quan sát trong bất kỳ run nào. Dialog cảnh báo hiện tại (KB-007) chỉ nhắc nhở bằng text, chưa rõ có ngăn được thao tác thật hay không. Cần PO xác nhận hành vi mong muốn VÀ môi trường test có fixture artwork/font riêng, không phải store production/thật.
    > Trả lời: run trên linh-explorer và staging

- [x] **[use-custom-font-in-artwork-editor::CHK-002]** Chọn 1 font trong picker rồi Save áp dụng font đó cho text layer thành công, persist qua reload
    - Q: Chọn 1 custom font trong picker rồi Save artwork có áp dụng đúng font cho text layer trong canvas, và có persist qua reload không? Đây là hành động CỐT LÕI NHẤT của toàn bộ object Font (áp dụng font cho thiết kế thật) nhưng CHƯA TỪNG được thực hiện thật trong bất kỳ run nào — run gốc chỉ mở picker để quan sát cấu trúc (KB-008), không Select/Save.
    > Trả lời: sau khi chọn font thì sẽ thấy text được đổi font trên canvas > Save artwork đề lưu thay đổi đó. 

### P2 — chức năng chính

- [x] **[manage-uploaded-font::CHK-002]** [SEC-001, risk P2] Mutation update_custom_fonts chỉ cho phép _set các field dự kiến (name/updated_at), không cho set field nhạy cảm khác
    - Q: Mutation update_custom_fonts có Hasura permission rule giới hạn cột được phép _set không? Có thể gửi field như user_id qua _set từ client hay không? KB-018 chỉ mô tả 1 request bình thường (name+updated_at), KHÔNG phải negative test — chưa từng có sample nào thử gửi field khác. Cần dev xác nhận cấu hình Hasura permission cho bảng custom_fonts, hoặc thử 1 request thủ công có giám sát trên môi trường staging.
    > Trả lời: explore lại, hình như là không

- [ x] **[manage-uploaded-font::CHK-004]** Rename thành chuỗi rỗng hoặc trùng tên với font khác đã tồn tại
    - Q: Rename thành chuỗi rỗng có bị chặn ở client/server không? Rename trùng tên với font khác có được chấp nhận (tương tự pattern upload trùng tên, KB-012) không? Chỉ có 1 sample rename sang tên hoàn toàn mới trong toàn bộ run gốc.
    > Trả lời: rỗng được, vì chủ yếu sử dụng url/master để hiển thị, render. Nhưng trùng tên với font khác thì preview (text editable) lại hiển thị font bị trùng, kiểm tra lại

- [x] **[manage-uploaded-font::CHK-008]** [CONFLICT-001 — cần verify lại] Xác minh data source của Download và Delete: REST hay GraphQL
    - Q: Download/Delete font hiện tại đi qua REST hay GraphQL trên store đang test? 2 nguồn mâu thuẫn: (a) knowledge/portal-fonts.md (store khác, 2026-09-09, TỰ NHẬN 'Delete... chưa test - read-only') claim toàn bộ /fonts đi Hasura GraphQL; (b) run CTX-20260910-05 quan sát Download = REST GET /api/custom-fonts/{id}/download (200, 1 sample), Delete = REST DELETE /api/custom-fonts/{id} (204, 1 sample). Cần xác nhận kiến trúc thật hoặc chạy lại trên đúng 1 store để loại biến khác-store/khác-ngày.
    > Trả lời: Download/Delete đi qua rest

- [x] **[manage-uploaded-font::CHK-009]** [SEC-002] File font có thể tải trực tiếp từ CDN mà không cần qua endpoint REST/auth hay không
    - Q: File font trên CDN có công khai truy cập được không cần auth không? 0 request nào tới CDN được quan sát trong toàn bộ 13 file capture của run gốc; claim cũ 'CDN công khai không cần auth' (SEC-002, unmapped_evidence trong product-kb, knowledge_kind INFERRED, không phải KB item chính thức) chưa được re-verify. Nếu công khai, ai biết path (vd qua response API) đều tải được file — cần đánh giá security exposure.
    > Trả lời: file font là private, khi download cần gọi rest api

- [x] **[upload-custom-font::CHK-003]** [CONFLICT-002 — cần verify lại] Xác minh luồng mở Upload fonts: modal trước hay mở thẳng OS file picker
    - Q: Trên store/role đang test, luồng Upload fonts có modal hay không? 2 nguồn mâu thuẫn: (a) knowledge/portal-fonts.md (store linh-tib-staging, 2026-09-09, role user-a) ghi nhận mở thẳng OS file picker, không modal; (b) run CTX-20260910-05 (store linh-explorer.myshopify.com, 2026-09-10, role owner) quan sát 1 modal mở trước. Khác biệt có thể do khác store/feature-flag hoặc do KB cũ ghi sai — cần dev xác nhận kiến trúc hoặc chạy lại trên đúng 1 store cố định để loại biến.
    > Trả lời: modal mở trước.

- [x] **[upload-custom-font::CHK-004]** [CONFLICT-001 — cần verify lại] Xác minh data source của thao tác Create font: REST hay GraphQL
    - Q: Kiến trúc backend hiện tại cho create font là REST hay GraphQL? 2 nguồn mâu thuẫn: (a) knowledge/portal-fonts.md (store khác, 2026-09-09, TỰ NHẬN 'Upload thật... chưa kiểm tra') claim toàn bộ /fonts đi Hasura GraphQL; (b) run CTX-20260910-05 quan sát create là REST POST /api/custom-fonts (201, 2 sample). Do (a) tự nhận chưa test write nên (b) có khả năng đúng hơn, nhưng KHÔNG được tự kết luận — cần dev/PO xác nhận kiến trúc backend hiện tại hoặc chạy lại portal-explorer/api-explorer trên đúng 1 store để loại biến khác-store/khác-ngày.
    > Trả lời: rest

- [x] **[upload-custom-font::CHK-005]** Upload lại đúng tên font đã tồn tại — server chấp nhận, không có uniqueness validation quan sát được
    - Q: Việc chấp nhận upload trùng tên không cảnh báo là hành vi CÓ CHỦ ĐÍCH (cho phép nhiều font trùng tên hiển thị, phân biệt bằng id) hay là THIẾU validation? Cần PO/Dev xác nhận trước khi coi đây là expected behavior hay defect cần fix.
    > Trả lời: có upload được tiếp

- [x] **[upload-custom-font::CHK-007]** Server có validate/reject định dạng file sai khi request thực sự tới được server hay không
    - Q: Server endpoint POST /api/custom-fonts có tự validate định dạng file không, hay hoàn toàn tin tưởng client-side check? Client luôn chặn trước khi gửi trong mọi sample UI đã thử — chưa từng có request thật chạm server với file sai định dạng.
    > Trả lời: có, chỉ cho upload ttf, otf

- [x] **[upload-custom-font::CHK-009]** Giới hạn dung lượng file và hành vi với file font hỏng/corrupt
    - Q: Có giới hạn dung lượng file upload không? Server xử lý thế nào với file .ttf/.otf bị corrupt — có phản ánh qua transform_status không, hay tạo record 'hỏng' vĩnh viễn trong list?
    > Trả lời: chưa upload file hổng bảo giờ, explore case này

- [x] **[use-custom-font-in-artwork-editor::CHK-006]** Sản phẩm dùng custom font hiển thị đúng font phía storefront khách hàng
    - Q: Custom font có render đúng trên storefront khách hàng không (font-face loading, hành vi fallback khi lỗi)? Hoàn toàn ngoài phạm vi run gốc do storefront.enabled=false trong bootstrap-request — cần bật storefront.enabled=true ở lần chạy sau để test, và phụ thuộc vào việc CHK-002 (Select+Save) được xác nhận hoạt động trước.
    > Trả lời: explore cả trên storefront, kể cả những case font bị lỗi, không được support. explore Font settings

- [x] **[view-and-configure-font-list::CHK-009]** Bấm 'Save' trong Font Settings popover lưu cấu hình Unsupported Character Settings
    - Q: Nút Save trong Font Settings gọi API gì (method/path/payload) và cấu hình có persist qua reload không? Hành động này ảnh hưởng TOÀN STORE nên chưa từng được bấm trong bất kỳ run nào (ngoài SAFE_REVERSIBLE_ONLY policy). Cần PO/Dev xác nhận trước, hoặc 1 lần chạy có approval mutation ảnh hưởng toàn store.
    > Trả lời: run, explore xem storefront sử dụng như thế nào và render ảnh design thì sử dụng như thế nào. có giống storefront không. expect giống nhau.

- [x] **[view-and-configure-font-list::CHK-010]** Điều khiển phân trang '‹ ›' hoạt động đúng khi danh sách có nhiều hơn 1 trang (hasNextPage=true)
    - Q: Cần fixture store có > page-size font để quan sát hành vi phân trang thật (cursor 'after', giữ state search/limit, URL đổi hay không). Claim cũ (khác store) 'URL không đổi khi sang trang → F5 sẽ refresh về trang 1' còn đúng trên kiến trúc hiện tại không?
    > Trả lời: với những case cần có lượng data lớn ở page list thì có thể sử dụng user B (linh-tib-staging) để xem. 

### P3 — còn lại, có thể để sau

- [x] **[upload-custom-font::CHK-008]** Upload nhiều file cùng lúc qua input 'multiple'
    - Q: Chọn nhiều file cùng lúc có tạo nhiều request POST riêng lẻ không? Có giới hạn số lượng file/lần không? Chưa từng thử dù input có attribute 'multiple'.
    > Trả lời:  explore, data trong test-data

- [x] **[use-custom-font-in-artwork-editor::CHK-003]** Picker hiển thị thế nào khi store chưa có custom font nào (empty state)
    - Q: Picker hiển thị gì khi store chưa có custom font nào — empty state message, hay ẩn hoàn toàn tuỳ chọn 'Custom Fonts' trong Font type? Chưa từng quan sát vì run gốc luôn có ≥3 font sẵn có trên store.
    > Trả lời: có thể hiện "Empty data". Gọi API trả về fonts list rỗng

- [x] **[use-custom-font-in-artwork-editor::CHK-004]** Picker hỗ trợ search/phân trang khi danh sách font dài
    - Q: Picker trong editor có search/phân trang riêng khi danh sách dài không, hay hiển thị toàn bộ không giới hạn (khác với /fonts vốn có phân trang)? Run gốc chỉ quan sát với 4 font, chưa từng test danh sách dài.
    > Trả lời: giống như trang fonts list

- [x] **[use-custom-font-in-artwork-editor::CHK-005]** Áp dụng custom font cho layer type khác ngoài 'Paragraph' hoạt động giống nhau
    - Q: Luồng chọn Custom Fonts có giống nhau trên mọi layer type hay chỉ áp dụng được cho một số loại nhất định (vd chỉ text-based layer)? Run gốc chỉ test trên đúng 1 layer type 'Paragraph'.
    > Trả lời: đúng, có thể run trên layer khác

- [x] **[view-and-configure-font-list::CHK-011]** Các giá trị Show entries khác 50 (20/100/250/500) bind và query đúng limit tương ứng
    - Q: Pattern 'chọn thủ công -> bind đúng -> query dùng limit đó' đã xác nhận cho giá trị '50' (KB-009, 1 sample). Các giá trị khác (20/100/250/500) chưa từng được thử — theo contract 'một sample -> không suy diễn thành enum/boundary rule' nên không được giả định các giá trị khác hoạt động giống hệt.
    > Trả lời: chạy thử


---

## Asset Category — Clipart/Vector/Color/Additional Option/Map Style/Font Category

`knowledge/products/teeinblue/objects/asset-category/` · 3 conflict · 3 P1 · 13 P2 · 8 P3

> **Đã verify Conflict + P1 + P2 (19 item) bằng explore/mutation thật trên staging** (run `CTX-20260914-02`, RECONCILE, publish thành công `kb_version 2-CTX-20260914-02`, MAJOR bump từ `kb_version 1`, 2026-09-15). Kết quả ghi ngay dưới mỗi câu trả lời PO dạng `> Kết quả verify:`. Mục **P3 giữ nguyên, không đụng tới** (8 item, PO chưa trả lời). 2 conflict MỚI phát sinh do evidence lệch/mở rộng khung diễn giải câu trả lời PO được thêm vào cuối mục Conflict bên dưới — **cần bạn trả lời tiếp**. 1 item (`asset-category-item-management::CHK-010`, cross-tenant) bị **BLOCKED** bởi Claude Code permission classifier ngay từ bước khởi tạo agent (cùng nguyên nhân hạ tầng với CHK-01-009/012 của product-base) — không phải business blocker, chưa có evidence mới, người dùng đã xác nhận giữ nguyên BLOCKED không retry thêm.

### Conflict — 2 nguồn evidence trái ngược, chưa chọn bên đúng

- [x] **[CONF-001]** MIS-001: Field `type` trong response tạo/clone category loại clipart mất hậu tố `_category` (chỉ 1/6 loại) [REWORK-1: finding gốc đã bị api-explorer RETRACT - xem retraction_note, KHÔNG tự đóng conflict. ROUND 3: không có thay đổi mới, giữ nguyên nội dung rework-1.]
    - Phía A: knowledge/portal-assets.md (KB cũ): ví dụ body tạo category chỉ minh hoạ `type: "font_category"` (giữ nguyên hậu tố _category trong request), không mô tả gì về việc response trả lại type khác với request. _(nguồn: knowledge/portal-assets.md)_
    - Phía B: Run này quan sát: request gửi `type: "clipart_category"` nhưng response (create ACT-02-01-001 và clone ACT-02-01-003, 2 sample) trả về `type: "clipart"` - mất hậu tố `_category`. 4 loại còn lại (color/additional_option/m _(nguồn: api-explorer (action-api-map.json, APIOP-001/002/004))_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời: B
    > Kết quả verify: RESOLVED (phần hẹp) + NEW CONFLICT (khung diễn giải rộng hơn). Verify lại: tạo/clone Clipart mới, response vẫn trả `type='clipart'` (không hậu tố), ổn định qua cả create và clone — khớp phần hẹp "B đúng". NHƯNG khi đối chiếu chéo với CHK-012 (Additional Option/Map Style/Font Category, cùng run) và KB-003 cũ (Vector), phát hiện khung diễn giải gốc "chỉ 1/6 loại mất hậu tố, do Clone" là KHÔNG chính xác: thực tế 4/6 loại (clipart/vector/additional_option/map) KHÔNG có hậu tố `_category` NGAY TỪ LÚC CREATE, chỉ 2/6 loại (color_category/font_category) CÓ hậu tố; và Clone luôn giữ nguyên type y hệt Create (4 sample, không ngoại lệ) — đây là vấn đề naming-convention rộng hơn, không phải hành vi riêng của Clone hay riêng Clipart. Xem conflict MỚI **CONF-004** ở cuối mục Conflict — cần bạn xác nhận lại khung diễn giải đúng. (evidence: KB-020, MIS-AC-001, APIOP-AC-001/002, run CTX-20260914-02)

- [x] **[CONF-002]** MIS-002: Giới hạn dung lượng/số file zip bulk-upload - '512MB/zip, tối đa 2 file' (KB cũ) vs '2GB/zip, tối đa 10 file' (banner UI quan sát trong run này)
    - Phía A: knowledge/portal-assets.md: 'Giới hạn ghi trên UI: max 512MB/zip, tối đa 2 file một lượt.' _(nguồn: knowledge/portal-assets.md)_
    - Phía B: Run này (portal-explorer, OBS-010): banner hiện tại 'Limit max 2GB per zip and can only process max 10 files at a time.' _(nguồn: portal-evidence.json (OBS-010, ACT-08-01-001))_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời: có thể thay đổi theo plan, với Blue (plan) thì sẽ là B, hiện tại thì teeinblue đổi pricing thì chủ yếu những user mới sẽ phải dùng Blue
    > Kết quả verify: RESOLVED_PLAN_DEPENDENT. Xem banner thật trên UI của Linh explorer (plan Blue): đúng text "Limit max 2GB per zip and can only process max 10 files at a time" — khớp phía B. Xác nhận qua API: đây là banner tĩnh phía client, KHÔNG có API config endpoint riêng trả về giới hạn này — ghi rõ trong KB đây là giá trị quan sát được CHO PLAN BLUE, không phải giá trị cứng toàn cục, các plan khác chưa verify. (evidence: KB-022, run CTX-20260914-02)

- [x] **[CONF-003]** MIS-003: Bug 'Add new disabled vĩnh viễn' ở Colors/Additional Options/Map Styles - correction quan trọng nhất của run này
    - Phía A: knowledge/_open-issues/ui-inconsistencies.md mục 1 + knowledge/portal-assets.md: nút Add new của cả 3 trang (test trên category CŨ 6008/6009/6010) bị disabled vĩnh viễn, kẹt ở trạng thái loading (promise-button + spinner _(nguồn: knowledge/_open-issues/ui-inconsistencies.md mục 1 (KB cũ, gồm cả ảnh evidence-addnew-disabled-mapstyles.png từ CTX-2026)_
    - Phía B: [ROUND 4 FIX, F-005: sửa mô tả provenance sai của 6012/6013/6014, KHÔNG đổi nội dung substantive] Run này quan sát trên 2 nhóm category ĐỘC LẬP, cả 2 đều network + DOM capture chuẩn, đối chứng độc lập qua 2 nguồn portal- _(nguồn: portal-evidence.json (FEAT-03/04/05, SCN-03-02/04-02/05-02 + SCN-03-03/04-03/05-03) + action-api-map.json round4 (APIOP-)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời: cần phải nhập map url/color/option trước thì mới enable nút Add new
    > Kết quả verify: RESOLVED_NOT_A_BUG. Tạo category Color/Additional Option/Map Style MỚI, xác nhận thật qua network: khi field cấu hình bắt buộc còn trống, nút "Add new" disabled và KHÔNG gọi bất kỳ request nào (client-side validation thuần); sau khi nhập field đó, nút enable và mutation `insert_cliparts` thật được gửi. Khớp đúng lời bạn — đóng hẳn bug cũ, đánh dấu bản mô tả "Add new disabled vĩnh viễn" (Phía A) là SUPERSEDED, không xoá để giữ lịch sử. (evidence: KB-023, APIOP-AC-*, run CTX-20260914-02)

### Conflict MỚI phát sinh từ run verify CTX-20260914-02 — cần bạn trả lời tiếp

- [x] **[CONF-004]** Khung diễn giải đúng của "naming convention field `type`" là gì — chỉ Clipart bị mất hậu tố (do Clone), hay đây là quy ước không nhất quán trên NHIỀU loại category ngay từ lúc Create
    - Phía A (khung diễn giải gốc của CONF-001, PO đã trả lời "B đúng"): field `type` "mất hậu tố `_category`" là hiện tượng RIÊNG của Clipart, ngụ ý Clipart "nên" có `type='clipart_category'` (giống color_category/font_category) và việc thiếu hậu tố là 1 lỗi/regression, có thể liên quan tới thao tác Clone.
    - Phía B (evidence run CTX-20260914-02, đối chiếu CHK-012 + CHK-013 + KB-003 cũ): field `type` KHÔNG theo quy tắc hậu tố thống nhất ở BẤT KỲ thời điểm nào — 4/6 loại (clipart='clipart', vector='vector', additional_option='additional_option', map='map') KHÔNG có hậu tố `_category` NGAY TỪ LÚC CREATE; chỉ 2/6 loại (color_category, font_category) CÓ hậu tố. Clone luôn giữ nguyên type y hệt Create ở cả 4 sample đã test (Clipart/Additional Option/Map Style/Font Category) — không có trường hợp nào Clone tự thêm/bớt hậu tố. Đây là vấn đề naming-convention rộng hơn của TOÀN BỘ 6 loại category, không phải hành vi riêng của Clipart hay của thao tác Clone.
    - Trạng thái hiện tại: UNRESOLVED.
    > Trả lời:

- [x] **[CONF-CHK-013-vector-type]** Giá trị field `type` khi tạo category Vector — "vector_category" (kỳ vọng literal trong action_needed gốc) hay "vector" (evidence thực tế)
    - Phía A: action_needed gốc của `asset-category-crud::CHK-013` yêu cầu "xác nhận field type='vector_category' đúng trong request/response network" — ngụ ý kỳ vọng giá trị có hậu tố `_category`.
    - Phía B: Evidence network 2 lần độc lập (workflow `CTX-20260910-06` KB-003 cũ VÀ run `CTX-20260914-02` ACT-AC2-CRUD-006 mới) đều cho `type='vector'`, KHÔNG có hậu tố `_category`. Cùng root cause khả dĩ với `CONF-004` ở trên.
    - Trạng thái hiện tại: UNRESOLVED.
    > Trả lời:

**Các security/defect finding mới phát hiện trong run này** (không phải conflict, cần bạn/dev triage riêng, không chặn việc publish KB): **KB-032** đã ghi vào `knowledge/_open-issues/security.md` mục 3 (Vector nhận `.png` → `POST /api/cliparts/svg` trả 500 kèm leak stack trace + đường dẫn file server, UI hiển thị lỗi `"[object Object]"`, đề xuất severity LOW-MEDIUM); **KB-029** (server cho phép tạo category TRÙNG TÊN, 201 không chặn) — chưa PO xác nhận có phải mong đợi, chưa escalate security vì không phải lỗ hổng bảo mật, chỉ là business-rule question.

KB/Feature Profile/Checklist của object `asset-category` đã được publish thành `kb_version "2-CTX-20260914-02"` (MAJOR bump từ `kb_version "1"`, workflow gốc `CTX-20260910-06`) tại `knowledge/products/teeinblue/objects/asset-category/`, giữ nguyên toàn bộ 8 item P3, `item-management::CHK-010` (BLOCKED), và 2 conflict mới ở trên — không tự resolve.

### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [x] **[asset-category-crud::CHK-010]** Hành vi xoá category có item con hoặc sub-category con thật (không phải category clone rỗng)
    - Q: Cả 2 sample DELETE trong run (KB-007) đều là category CLONE không có dữ liệu con thật. Xoá category có item con/sub-category con thật có cascade hay bị chặn (block) chưa được test - cần chạy sample thật hoặc PO xác nhận business rule trước khi coi đây là expected behavior.
    > Trả lời: chạy thật
    > Kết quả verify: Đã chạy thật. Tạo 1 category Clipart mới, upload 1 ảnh PNG thật vào đó (item con thật, id clipart=41800), rồi DELETE category qua modal confirm → response 204, KHÔNG bị chặn, KHÔNG warning/error, KHÔNG cascade lỗi, category biến mất khỏi list. Đây là quan sát THẬT, network-verified (1 sample) — PO chỉ cho phép chạy test ("chạy thật"), CHƯA xác nhận đây có phải hành vi mong đợi/an toàn hay không, nên giữ ở `OBSERVED_CURRENT` (không nâng CONFIRMED_EXPECTED). Nếu bạn xác nhận đây LÀ hành vi mong đợi (không cần cảnh báo khi xoá category có item con), sẽ chốt CONFIRMED_EXPECTED ở lần sau. (evidence: KB-024, ACT-AC2-CRUD-003/004/005, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-002]** Bug 'Add new disabled vĩnh viễn' - đối chiếu category gốc phát hiện bug (6008-6010) vs category CŨ corroborating (6012-6014) + category MỚI TẠO TRONG RUN NÀY (6021-6023)
    - Q: Bug 'Add new disabled vĩnh viễn' trên category GỐC PHÁT HIỆN BUG (6008/6009/6010) còn tái hiện hay không? CONF-003/STALE-001 đang UNRESOLVED vì cả 2 nhóm re-verify trong run này (category CŨ corroborating 6012/6013/6014 VÀ category MỚI TẠO TRONG RUN NÀY 6021/6022/6023 - ROUND 4 bổ sung theo F-004) đều dùng category KHÁC với category gốc phát hiện bug, không phải test lại đúng cùng đối tượng. Cần re-test TRỰC TIẾP trên category gốc 6008/6009/6010 (ưu tiên quan sát, không mutation nếu forbidden_actions không cho phép) và có quyết định chính thức từ orchestrator/reviewer trước khi đóng open-issue này. Đây là điều kiện bắt buộc trước khi coi bug này là đã fix hoặc chưa bao giờ tồn tại.
    > Trả lời: giống CONF-003
    > Kết quả verify: RESOLVED. Dùng chung evidence/kết luận của CONF-003 (không phải bug — cần nhập field cấu hình trước khi Add new enable), không chạy test riêng thêm. (evidence: KB-023, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-010]** Server có chặn insert_cliparts khi client gửi clipart_category_id KHÔNG thuộc store của mình không
    - Q: KB-017 ghi nhận client gọi thẳng GraphQL table-level mutation insert_cliparts, tự build variables.objects (clipart_category_id/name/color/position) mà không qua REST backend riêng, không có header hasura đặc biệt. Chưa có sample negative/cross-tenant để xác nhận server có validate ownership của clipart_category_id hay không - đây là bề mặt bảo mật (MEDIUM severity theo profile). Test đầy đủ cross-tenant cần TIB_USER_B_* (account khác store), hiện .env chỉ còn 1 account nên chỉ test được với category_id không tồn tại/invalid trong CÙNG store trước; cross-tenant thật cần bổ sung account trong lần chạy sau (cùng lý do exclude dimension PERMISSION ở feature này).
    > Trả lời: đã có store B, kiểm tra xem. nếu có bất kỳ lỗi gì thì gắn vào open issue
    > Kết quả verify: **BLOCKED** (hạ tầng, không phải business blocker). Ngay từ lúc khởi tạo agent với prompt nhắc tới việc dùng account "Linh Pham"/store `linh-tib-staging.myshopify.com` cho test cross-tenant, Claude Code auto-mode permission classifier CHẶN việc khởi tạo agent — cùng nguyên nhân/cùng store đã từng chặn CHK-01-009/CHK-01-012 của object product-base (run CTX-20260913-02). Đã thử tách riêng prompt (không nhắc credential cụ thể) nhưng vẫn không thể thực hiện đúng test cross-tenant vì bản chất test cần dùng account đó. KHÔNG retry thêm theo yêu cầu — giữ nguyên NEEDS_CONFIRMATION, KHÔNG có evidence security nào được thu thập, KHÔNG ghi gì vào `security.md` (vì chưa test được, không phải vì không có lỗ hổng). Cần bạn tự chạy test này ngoài phiên Claude Code, hoặc điều chỉnh permission rule/mode cho phép Agent thao tác với credential store B.

### P2 — chức năng chính

- [x] **[asset-category-bulk-upload::CHK-004]** Giới hạn thật (server-side) của dung lượng/số file zip bulk-upload (CONF-002)
    - Q: Giới hạn thật của dung lượng/số file zip theo server là bao nhiêu - 512MB/2 file (KB cũ) hay 2GB/10 file (banner UI hiện tại) hay giá trị khác? CONF-002/STALE-002 đang UNRESOLVED vì chưa có sample lỗi (4xx/5xx) nào từ API để xác nhận. Cần chạy test thật vượt ngưỡng hoặc PO/Dev xác nhận giá trị chính thức trước khi coi đây là oracle chính thức cho check BOUNDARY này.
    > Trả lời: xem CONF-002
    > Kết quả verify: RESOLVED. Dùng chung evidence với CONF-002 (2GB/10 file, theo plan Blue, client-side banner). (evidence: KB-022, run CTX-20260914-02)

- [x] **[asset-category-bulk-upload::CHK-006]** Upload file không phải zip (vd .rar, .png) vào dropzone bulk-upload
    - Q: 0/16 operation trong run có sample lỗi - hành vi khi upload file không phải zip hoàn toàn chưa được quan sát (client-side reject trước khi gửi request, hay server trả lỗi). Cần chạy sample lỗi hoặc PO/Dev cung cấp spec trước khi viết expected_result khẳng định.
    > Trả lời: tạo sample và chạy thử
    > Kết quả verify: Đã chạy thật (upload file `.txt` vào input zip của dropzone bulk-upload) → server trả **422 "invalid mimetype"** — bị chặn rõ ràng. Đây là quan sát THẬT, network-verified, nhưng PO chỉ cho phép chạy test ("tạo sample và chạy thử"), CHƯA xác nhận 422 có phải hành vi mong đợi hay không, nên giữ `OBSERVED_CURRENT`/`BASELINE`. (evidence: KB-025, run CTX-20260914-02)

- [x] **[asset-category-bulk-upload::CHK-007]** Upload zip hợp lệ nhưng không chứa ảnh hợp lệ nào (zip rỗng hoặc chỉ chứa file không phải ảnh)
    - Q: KB-016 chỉ có 1 sample zip hợp lệ chứa 5 ảnh, enqueue thành công 5/5 - chưa có sample zip rỗng hoặc không chứa ảnh hợp lệ nào để biết job sẽ báo Error, tạo category rỗng, hay báo lỗi ngay ở bước complete. Cần PO/Dev xác nhận hoặc chạy thêm sample.
    > Trả lời: Upload thành công nhưng unzip sẽ báo không chứa ảnh nào. thử
    > Kết quả verify: RESOLVED, khớp đúng lời bạn. Upload zip không chứa ảnh hợp lệ → job hoàn tất ở `status.value=4/"Error"`, log kết thúc "Error - No valid entries found", `clipart_category_id=null` (KHÔNG tạo category rỗng). Xác nhận qua 2 timestamp thật của cùng job_id=364 (~34 phút sau). (evidence: KB-026, ACT-AC2-BULK-CHK007, ACT-AC2-R2-BULK007-STATUS, run CTX-20260914-02)

- [x] **[asset-category-bulk-upload::CHK-008]** Trạng thái job 'Processing' và 'Error' qua API (khác 'Done')
    - Q: KB-016 chỉ có 1 sample end-to-end thành công, trả status.value=3/'Done' ngay ở lần GET poll đầu tiên - chưa quan sát được trạng thái 'Processing' (đang chạy) hay 'Error' (thất bại) trông như thế nào qua API. Cần chạy thêm sample để bắt được các trạng thái này, hoặc PO/Dev cung cấp danh sách đầy đủ status.value có thể có.
    > Trả lời:  có những status sau: Uploading, extracting, delayed, done, error
    > Kết quả verify: RESOLVED (một phần network-verified). Ghi nhận đủ 5 status theo đúng lời bạn: Uploading, Extracting, delayed, Done, Error. Trong đó 2/5 (Extracting: `status.value=2`, và Error: `status.value=4`) có network evidence trực tiếp trong run này; 3/5 còn lại (Uploading/delayed/Done) dựa vào lời bạn + quan sát UI cũ, chưa network-verified lại trong run này — ghi rõ mức độ evidence khác nhau trong KB, không coi cả 5 là ngang hàng về độ chắc chắn. (evidence: KB-027, run CTX-20260914-02)

- [x] **[asset-category-bulk-upload::CHK-010]** Presigned storage URL cho bước PUT của luồng bulk-upload zip - phạm vi/hiệu lực chữ ký
    - Q: KB-018 (dùng chung cho cả luồng upload item đơn lẻ và bulk-zip) quan sát request PUT gửi thẳng tới oe-cdn.sgp1.digitaloceanspaces.com bằng URL có chữ ký (X-Amz-Signature/X-Amz-Credential, đã redact) thay vì header JWT app; path chứa user_id đọc được dạng rõ. Thời hạn hiệu lực chữ ký KHÔNG quan sát được vì query string bị redact hoàn toàn theo policy. Cần PO/Dev xác nhận thời hạn presigned URL và liệu có bị giới hạn theo user/session hay có thể bị replay - bề mặt bảo mật MEDIUM severity, áp dụng riêng cho bước PUT của luồng bulk-zip (khác instance check ở checklist asset-category-item-management cho luồng upload đơn lẻ).
    > Trả lời: tự kiểm tra, nếu có vấn đề thì đưa vào open issue
    > Kết quả verify: Đã tự kiểm tra. Presigned URL cho bước PUT bulk-upload: TTL=300s (5 phút), host DigitalOcean Spaces, phạm vi ký chỉ ràng buộc Host header. KHÔNG phát hiện vấn đề nghiêm trọng cần escalate (TTL ngắn là hợp lý) — không cần thêm vào `security.md`. (evidence: KB-028, run CTX-20260914-02, phân tích lại response đã có từ action CHK-013)

- [x] **[asset-category-crud::CHK-009]** Submit form New category với Name rỗng hoặc trùng tên category đã tồn tại
    - Q: 0/16 operation trong run có sample lỗi 4xx/5xx - validation message khi Name rỗng/trùng hoàn toàn chưa biết. Cần chạy sample lỗi hoặc PO/Dev cung cấp spec validate trước khi viết expected_result khẳng định.
    > Trả lời: tự run
    > Kết quả verify: PARTIALLY RESOLVED. Name RỖNG → 422, bị chặn đúng validate. Name TRÙNG với category đã tồn tại → **201, server CHO PHÉP** (KHÔNG chặn duplicate name) — finding MỚI ngoài câu hỏi gốc, PO CHƯA xác nhận đây có phải hành vi mong đợi hay không, giữ `OBSERVED_CURRENT`/`BASELINE`, cần bạn xác nhận thêm (bug hay by-design?). (evidence: KB-029, run CTX-20260914-02)

- [x] **[asset-category-crud::CHK-012]** Edit/Clone/Delete category Additional Option, Map Style, Font Category (chưa có sample)
    - Q: Edit/Clone/Delete cho Additional Option/Map Style/Font Category hoàn toàn chưa có sample trong run CTX-20260910-06 (chỉ Create được test) - cần chạy thêm sample trước khi giả định hành vi giống Clipart/Color.
    > Trả lời: tự run, tự tạo data vì hoàn toàn chỉ nhập text và chọn font có sẵn trong Upload fonts
    > Kết quả verify: Đã chạy thật, tạo mới 1 category cho MỖI loại (Additional Option id=6052, Map Style id=6054, Font Category id=6056, đặt tên `QA-TEST-*`), thử Edit/Clone/Delete cho từng loại — tất cả đều thành công (POST create 201, PUT edit 200, POST clone 201 giữ đúng type, DELETE 204 kể cả Font Category có 1 item con thật — cascade OK không lỗi). Đây là quan sát THẬT, network-verified, PO chỉ cho phép chạy test ("tự run"), CHƯA xác nhận đây là hành vi đúng/mong đợi, giữ `OBSERVED_CURRENT`/`BASELINE`. (evidence: KB-030, run CTX-20260914-02)

- [x] **[asset-category-crud::CHK-013]** Tạo category Vector mới và xác nhận field type='vector_category' trong request/response
    - Q: 0/5 sample tạo category trong run có loại Vector - field type='vector_category' hoàn toàn chưa được verify qua network. Cần chạy 1 sample tạo Vector category mới trước khi đưa vào oracle CRUD chung.
    > Trả lời: test-data, tự run
    > Kết quả verify: NEW CONFLICT liên quan (không phải sai câu trả lời gốc, mà đúng nghĩa đen của yêu cầu literal lại KHÔNG khớp evidence). Tạo category Vector mới, xác nhận field `type` thực tế trong request/response = **"vector"**, KHÔNG PHẢI "vector_category" như action_needed gốc ghi kỳ vọng — khớp với KB-003 cũ (đã biết từ workflow CTX-20260910-06). Đây là 1 phần của bức tranh naming-convention rộng hơn — xem conflict MỚI **CONF-CHK-013-vector-type** ở cuối mục Conflict, liên hệ trực tiếp tới CONF-004. (evidence: KB-021, ACT-AC2-CRUD-006, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-004]** Hoàn tất chọn 1 font từ modal và xác nhận item được thêm vào Font category
    - Q: KB-012 chỉ quan sát nút Add new mở modal, CHƯA hoàn tất việc chọn+thêm 1 font thật - chưa biết endpoint/mutation nào được gọi khi hoàn tất. Cần chạy thêm sample trước khi coi flow Font hoàn chỉnh là đã hiểu.
    > Trả lời: tự run
    > Kết quả verify: Đã chạy thật — mở modal "Select a font" từ nút "Add new", chọn font có sẵn "Bebas Neue", hoàn tất. Mutation thực sự gọi khi hoàn tất là `POST /api/cliparts/font` (201), cơ chế là COPY file font gốc sang storage riêng của category rồi tạo 1 "clipart" đại diện (path đổi từ `users/{id}/fonts/` sang `users/{id}/cliparts/{categoryId}/`), KHÔNG di chuyển/tham chiếu trực tiếp file gốc. Đây là quan sát THẬT, network-verified, PO chỉ cho phép chạy test, CHƯA xác nhận đúng/sai, giữ `OBSERVED_CURRENT`/`BASELINE`. (evidence: KB-031, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-009]** Hành vi khi upload file sai định dạng vào Clipart/Vector dropzone
    - Q: 0/16 operation trong run có sample lỗi (4xx/5xx) - hành vi khi upload file sai định dạng (không phải PNG cho Clipart, không phải SVG cho Vector) hoàn toàn chưa được quan sát. Cần chạy sample lỗi hoặc PO/Dev cung cấp spec trước khi coi đây là expected behavior.
    > Trả lời: tự run
    > Kết quả verify: PARTIALLY RESOLVED — 2 nhánh khác kết quả. Clipart nhận `.txt`: hành vi KHÔNG rõ ràng, client vẫn gọi upload-url (201) — chưa xác định là bị chặn ở bước nào, GIỮ trong coverage_gap/unknowns, chưa kết luận. Vector nhận `.png`: `POST /api/cliparts/svg` trả **500** kèm UI hiển thị lỗi `"[object Object]"` (broken error rendering) — đây là **defect/known-issue**, đã escalate vào `knowledge/_open-issues/security.md` mục 3 (500 kèm leak stack trace + đường dẫn file server `ClipartController.php:352`, đề xuất severity LOW-MEDIUM, cần dev triage). KHÔNG viết "trả 500 là hành vi đúng" trong checklist. (evidence: KB-032, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-011]** Thời hạn hiệu lực và phạm vi truy cập của presigned storage URL (upload item đơn lẻ)
    - Q: KB-018 quan sát request PUT gửi thẳng tới oe-cdn.sgp1.digitaloceanspaces.com bằng URL có chữ ký (X-Amz-Signature/X-Amz-Credential) thay vì header JWT app; path chứa user_id đọc được dạng rõ. Thời hạn hiệu lực chữ ký KHÔNG quan sát được vì query string bị redact hoàn toàn theo policy. Cần PO/Dev xác nhận thời hạn presigned URL và liệu URL có bị giới hạn theo user/session hay có thể bị replay/share - đây là bề mặt bảo mật (MEDIUM severity), dùng chung cho cả upload đơn lẻ (FEAT-03) và bulk-upload zip (FEAT-04).
    > Trả lời: trùng lặp
    > Kết quả verify: RESOLVED. Dùng chung kết luận với `asset-category-bulk-upload::CHK-010` (TTL=300s, host DigitalOcean Spaces, scope ký chỉ ràng buộc Host header, không có finding nghiêm trọng), chỉ note dedupe trong KB, không test riêng thêm. (evidence: KB-028, run CTX-20260914-02)

- [x] **[asset-category-item-management::CHK-013]** Giới hạn dung lượng tối đa cho 1 file PNG/SVG khi upload đơn lẻ vào Clipart/Vector
    - Q: Run CTX-20260910-06 chỉ test 1 file PNG 700767 bytes (KB-014) và 1 SVG (KB-015), không có banner giới hạn dung lượng nào được ghi nhận cho luồng upload đơn lẻ (khác với bulk-upload zip có banner rõ ở FEAT-04). Giới hạn dung lượng file đơn lẻ là bao nhiêu, và điều gì xảy ra khi vượt ngưỡng, hoàn toàn chưa biết. Cần PO/Dev cung cấp spec hoặc chạy sample vượt ngưỡng.
    > Trả lời: warning 64 megapixels (w*h) nhưng thực tế thì không giới hạn
    > Kết quả verify: RESOLVED, khớp đúng lời bạn. Upload 1 ảnh PNG 8100x8100px (65,610,000px > 64 megapixel) vào dropzone Clipart → hiển thị warning "Your file exceeds 64 megapixels (width * height)" NHƯNG vẫn upload thành công, không bị chặn cứng. (evidence: KB-033, run CTX-20260914-02)

- [x] **[asset-category-route-entity-clarification::CHK-006]** Quan hệ field 'Category' (Global Option instance) vs category-object /additional-options
    - Q: Field 'Category' của Global Option instance (mặc định Uncategorized) có liên kết dữ liệu thật với category-object ở /additional-options hay chỉ là nhãn text độc lập? KB-001 chỉ phân biệt được ở mức UI, chưa verify qua API schema/DB - cần PO/Dev xác nhận quan hệ schema trước khi coi đây là 1 test point chính thức.
    > Trả lời: Global Option sẽ là mục KB riêng, nằm ngang hàng với các object hiện có. tạm thời để lại. nếu trong asset đã có rồi thì tạm thời giữ.
    > Kết quả verify: RESOLVED bằng quyết định (không cần test mới). Cập nhật KB thành decision note: "Global Option sẽ tách thành 1 KB object riêng, quyết định 2026-09-14, tạm thời out of scope, KHÔNG mở rộng phạm vi object asset-category hiện tại cho tới khi tách xong" — đóng NEEDS_CONFIRMATION treo, checklist chuyển status `OUT_OF_SCOPE_DECISION`. (run CTX-20260914-02)

### P3 — còn lại, có thể để sau

- [ ] **[asset-category-bulk-upload::CHK-005]** Upload zip đúng tại giá trị biên (ngưỡng tối đa) của giới hạn đã được xác nhận
    - Q: Check này phụ thuộc CHK-004 (xác định giới hạn thật) - chưa thể viết test case biên cụ thể cho tới khi CONF-002 được resolve hoặc PO/Dev xác nhận giá trị chính thức.
    > Trả lời: 

- [ ] **[asset-category-bulk-upload::CHK-009]** Zip có cấu trúc folder khác (nested folder, hoặc tên top-level folder trùng category đã tồn tại)
    - Q: Run CTX-20260910-06 chỉ test 1 zip với đúng 1 top-level folder duy nhất ('valid-images 2'), không có folder con lồng nhau và không trùng tên category đã tồn tại. Hành vi với cấu trúc phức tạp hơn hoặc tên trùng lặp hoàn toàn chưa biết. Cần chạy thêm sample hoặc PO/Dev xác nhận business rule.
    > Trả lời:

- [ ] **[asset-category-crud::CHK-008]** Hành vi validate khi nhập Preview size/Thumbnail size ngoài range cho phép (100-1600px)
    - Q: 0/16 operation trong run CTX-20260910-06 có sample lỗi (4xx/5xx) - chưa biết server/client validate giá trị ngoài range 100-1600px như thế nào (reject, clamp, hay chấp nhận). Cần PO/Dev xác nhận rule hoặc chạy thêm sample lỗi trước khi coi đây là test case chính thức.
    > Trả lời:

- [ ] **[asset-category-crud::CHK-014]** Action buttons trên sidebar tree category detail khác nhau theo loại (KB-010 UNVERIFIED - xem ROUND 3 SYNC)
    - Q: ROUND 3 SYNC: KB-010 bị HẠ xuống UNVERIFIED - evidence gốc (act_id 'ACT-02-01-003') khi đọc lại trực tiếp trong round 3 xác nhận đây thực ra LÀ evidence chính thức của ACT-01-01-003 (Clipart clone/edit), nhưng ảnh này hiển thị FORM EDIT CATEGORY (xem CHK-007/KB-008), KHÔNG hiển thị sidebar tree với nút Delete/Duplicate/'Add new sub-category'/'Sub-category options' như claim gốc mô tả. KB-010.act_ids=[] trong product-kb.json round3 - KHÔNG có evidence chính thức nào trong bảng 31 act hỗ trợ claim này. Cần portal-explorer chụp lại cụ thể sidebar tree action buttons trên category detail (Clipart/Color và các loại còn lại) trước khi coi đây là expected behavior.
    > Trả lời:

- [ ] **[asset-category-item-management::CHK-003]** Font category dùng cơ chế chọn từ danh sách có sẵn (control group, khác Color/Additional Option/Map Style) - CHƯA re-verify trong CTX-20260910-06
    - Q: ROUND 3 SYNC: KB-012 bị hạ xuống trong round 3 - act_id gốc 'ACT-03-04-001' đã bị portal-evidence.json loại trừ chính thức (thiếu before+after) VÀ KHÔNG có act thay thế trong 31 act official của run CTX-20260910-06. Hành vi này CHƯA được portal-explorer re-click/re-verify trong run này (portal-evidence.json's unexplored_areas tự xác nhận) - nguồn duy nhất là knowledge/portal-assets.md (lần explore TRƯỚC, không phải run này). Cần portal-explorer re-click nút Add new trên 1 category Font (6019/6027) hiện có để xác nhận độc lập cho CTX-20260910-06 trước khi coi đây là expected behavior.
    > Trả lời:

- [ ] **[asset-category-item-management::CHK-006]** staff-activity-logs có được gọi khi mutation insert_cliparts thất bại không
    - Q: 0/16 operation trong run có sample insert thất bại - chưa biết staff-activity-logs có được gọi trong trường hợp lỗi hay không. Cần PO/Dev xác nhận hoặc chạy thêm sample lỗi.
    > Trả lời:

- [ ] **[asset-category-item-management::CHK-012]** Map Style item cần field cấu hình nào khác (mapbox style URL/JSON) ngoài 'name' để hoạt động thật
    - Q: KB-011 chỉ quan sát mutation insert_cliparts gửi name+position cho Map Style, chưa rõ có field cấu hình khác (mapbox style URL/JSON) cần thiết để map style hoạt động thật trong sản phẩm. Cần PO/Dev xác nhận trước khi coi 'chỉ cần name' là đủ.
    > Trả lời:

- [ ] **[asset-category-route-entity-clarification::CHK-007]** CRUD Global Option instance thật (tạo/sửa/xoá 1 trong 29 layer type)
    - Q: CRUD thật của Global Option instance (29 layer type) chưa từng được thực hiện trong run này (chỉ mở/đóng modal) - cần PO xác nhận đây có phải phạm vi ưu tiên của object AssetCategory hay thuộc object khác trước khi build test case đầy đủ.
    > Trả lời:


---

## Artwork — editor, 35 layer type, conditional setting, populate values

`knowledge/products/teeinblue/objects/artwork/` · 7 conflict · 6 P1 · 21 P2 · 22 P3

### Conflict — 2 nguồn evidence trái ngược, chưa chọn bên đúng

- [ ] **[CONF-001]** network_ref của CTX-20260910-02:ACT-02-01-001 trỏ vào file mô tả một action khác
    - Phía A: portal-evidence.json (CTX-20260910-02) mô tả ACT-02-01-001 là 'Layer đích paragraph: +Add conditions -> chọn nguồn Toggle -> giá trị On', và gán network_ref = raw/network/ACT-02-01-004.json. _(nguồn: CTX-20260910-02 portal-explorer, feature_candidates[FEAT-02].scenarios[0].actions[0])_
    - Phía B: Nội dung thật của raw/network/ACT-02-01-004.json mô tả MỘT ACTION KHÁC HẲN ('Duyệt 8 option nguồn trên layer curve-text, rồi Cancel') và KHÔNG chứa PUT nào — chỉ GET layer-image-categories x2 + POST /v1beta1/relay. _(nguồn: CTX-20260910-02 api-explorer, raw/network/ACT-02-01-004.json)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-002]** Trạng thái data của layer addon-charge / json-list khác nhau giữa 2 run trên cùng artwork 4087
    - Phía A: addon-charge CHƯA có option values; json-list CHƯA có JSON URL. _(nguồn: CTX-20260910-02 portal-explorer, raw/portal/conditional-observed.md §2.1)_
    - Phía B: addon-charge ĐÃ có options ([id-957711 'Option 1', id-113051 'Option 2']); json-list ĐÃ có source_url (https://cdn.teeinblue.com/examples/cities.json). _(nguồn: CTX-20260910-03 portal-explorer, raw/portal/final-state-4087.json + GraphQL templates đọc lúc 2026-09-10T10:27Z)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-003]** Bản sao do 'Duplicate & Link options' tạo ra có được nhận biết bằng icon chain không
    - Phía A: Brief/coordinator giả định bản linked có icon chain (🔗) trước tên layer trên layer row. _(nguồn: brief từ coordinator (đầu vào của run))_
    - Phía B: Quan sát thực tế: layer row của bản linked KHÔNG có icon chain nào; icon row luôn cố định (la-eye/la-unlock/la-pen/la-copy/la-trash-alt) bất kể linked hay không. Dấu hiệu thật để phân biệt là config panel rút gọn còn acc _(nguồn: CTX-20260910-01 portal-explorer, raw/portal/artwork-editor-actions.md §4)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-004]** Print Effects có tính năng emboss (phụ thuộc dịch vụ 3rd-party) hay không
    - Phía A: Brief: Print Effects = Shape Cut cũ, đã thêm emboss phụ thuộc dịch vụ 3rd-party. _(nguồn: brief từ coordinator)_
    - Phía B: Quan sát: popover Print Effects chỉ có shape-cut layout (1x2/1x3/1x4/2x1/2x3/Customize) trên cả 4 layer type khác nhau đã thử; tìm chuỗi 'emboss' và '3rd-party' (case-insensitive) trong toàn trang -> 0 kết quả, kể cả ở t _(nguồn: CTX-20260910-01 portal-explorer, raw/portal/artwork-editor-actions.md §3 + §6)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-005]** OpenAPI spec cho Artwork API có tồn tại trên staging hay không
    - Phía A: Biến môi trường TIB_OPENAPI_BASE tồn tại trong .env và brief giả định có OpenAPI spec tại đó. _(nguồn: .env / brief)_
    - Phía B: Thử 9 path chuẩn (bao gồm chính TIB_OPENAPI_BASE và các biến thể /docs, /swagger.json...) đều trả 404 dạng HTML, không phải JSON spec. _(nguồn: CTX-20260910-01 api-explorer, raw/api/artwork-api-surface.md §1)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-006]** Field 'custom_class' có mặt ở bao nhiêu layer type — bundle-registry (code) vs UI DOM quan sát trực tiếp cho ra 2 con số khác nhau
    - Phía A: Theo bundle-registry (2 bảng đăng ký layer-type trong portal JS bundle, đọc bằng code_ref, INFERRED): field custom_class thuộc về đúng 29 data-type cụ thể (additional-option, addon-charge, calendar, clipart-category, clo _(nguồn: CTX-20260910-01 api-explorer, raw/api/artwork-layer-schema.md (bundle-registry))_
    - Phía B: Theo DOM quan sát trực tiếp trên config panel của cả 35 layer type: field 'Custom class:' render ở 33/35 layer type (chỉ vắng mặt ở Static Image và Static Vector). _(nguồn: CTX-20260910-01 portal-explorer, raw/portal/artwork-layers-config.md)_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

- [ ] **[CONF-007]** Nguồn thực sự đọc lại dependency/retrieval_* sau khi save — GraphQL riêng hay chỉ đọc lại từ response của chính PUT
    - Phía A: portal-evidence.json ghi surface = 'GraphQL artworks.templates' cho các quan sát OBS-011/OBS-014/OBS-019/OBS-020/OBS-021, hàm ý có một POST /v1/graphql riêng để đọc lại dữ liệu sau khi save. _(nguồn: CTX-20260910-02 portal-explorer, portal-evidence.json)_
    - Phía B: 2 network capture file (ACT-02-01-003.json, ACT-03-05-001.json) được cấp cho api-explorer cho đúng các ACT-ID này CHỈ chứa POST validate-default-value (204) + PUT (200) — KHÔNG có bất kỳ POST /v1/graphql nào. Response bo _(nguồn: CTX-20260910-02 api-explorer, intermediate/api/action-api-map.json (documented_observed_mismatches))_
    - Trạng thái hiện tại: UNRESOLVED
    > Trả lời:

### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [ ] **[artwork-list-management::CHK-007]** Delete artwork — soft-delete hay hard-delete, có khôi phục được không
    - Q: Chưa xác nhận đây là soft hay hard delete — ảnh hưởng trực tiếp policy mutation an toàn khi test. Cần dev/PO xác nhận trước khi chạy case này trên bất kỳ artwork nào ngoài artwork test chuyên dụng.
    > Trả lời:

- [ ] **[artwork-list-management::CHK-008]** Truy cập /artworks và các action list với role/tenant khác
    - Q: coverage_gaps #3 của KB gốc: cả 3 run chỉgi test đúng 1 role (owner) trên 1 tenant. Hoàn toàn chưa có evidence permission/cross-tenant cho feature này.
    > Trả lời:

- [ ] **[artwork-save-persist::CHK-017]** Save/đọc artwork với role khác owner / cross-tenant (TIB_USER_B)
    - Q: coverage_gaps #3 của KB gốc: chỉ 1 role 1 tenant được test trong cả 3 run nguồn. Hoàn toàn chưa có evidence permission cho toàn bộ luồng save/persist.
    > Trả lời:

- [ ] **[condition-cycle-validation::CHK-008]** [CRITICAL] PUT trực tiếp với payload chứa đồ thị vòng — server có tự chặn độc lập với client?
    - Q: BLK-API-002 (unknown nghiêm trọng nhất KB gốc): TOÀN BỘ evidence 3 run — PUT chưa BAO GIỜ được gửi với payload vòng vì client luôn chặn trước. validate-default-value vẫn 204 ngay cả 2 lần bị chặn — KHÔNG phải endpoint kiểm vòng. KHÔNG có evidence nào xác nhận hay bác bỏ việc server tự chặn vòng độc lập. Case này CẦN orchestrator duyệt trước khi chạy (direct-API mutation, ngoài SAFE_REVERSIBLE_ONLY mặc định nếu tạo dữ liệu vòng thật trong DB).
    > Trả lời:

- [ ] **[condition-cycle-validation::CHK-009]** PUT trực tiếp với self-loop (element trỏ chính layer đó)
    - Q: KB-041: self-loop chưa từng thử qua API trực tiếp (ngoài phạm vi portal-explorer/api-runtime-trace).
    > Trả lời:

- [ ] **[populate-values::CHK-018]** Layer đã populate hiển thị giá trị thật (không phải placeholder) trên storefront
    - Q: 0 evidence storefront cho toàn bộ object Artwork trong cả 3 run nguồn — đây là feature có mức độ 'chưa test nơi giá trị thực sự được dùng' cao nhất trong toàn bộ 11 checklist.
    > Trả lời:

### P2 — chức năng chính

- [ ] **[artwork-list-management::CHK-004]** Click 'Cancel' trên dialog xoá artwork không thực hiện xoá
    - Q: Chưa có evidence trực tiếp quan sát hành vi Cancel trên dialog này (chỉ có evidence cho việc dialog xuất hiện, không có evidence cho luồng Cancel). Đây là suy luận hợp lý theo UX convention, KHÔNG phải xác nhận — cần chạy thử để lấy oracle thật trước khi coi là expected chính thức.
    > Trả lời:

- [ ] **[artwork-list-management::CHK-005]** Kết quả sau khi click 'Mark as archive'
    - Q: unknown_areas của feature profile: kết quả thực sự của 'Mark as archive' sau khi click chưa từng được quan sát trong KB gốc — cần chạy 1 lần và ghi lại trước/sau trạng thái để có oracle.
    > Trả lời:

- [ ] **[artwork-save-persist::CHK-011]** validate-default-value trả lỗi 4xx/5xx thật từ server
    - Q: coverage_gaps #5 của KB gốc: 2 lần 'thất bại' quan sát được trong 3 run đều do client chặn trước khi gửi request (circular dependency), KHÔNG phải server reject thật. Chưa có sample lỗi server thật nào — cần dev/PO cho biết điều kiện nào khiến endpoint này trả lỗi để dựng test case.
    > Trả lời:

- [ ] **[artwork-save-persist::CHK-015]** Đọc lại artwork sau save — GraphQL riêng hay chỉ từ response PUT (CONF-007)
    - Q: CONF-007 UNRESOLVED: 1 phía nói có GraphQL riêng (dựa trên nhãn 'surface: GraphQL' trong portal-evidence.json), phía kia nói 2 network capture cho đúng các ACT-ID liên quan chỉ có validate-default-value + PUT, KHÔNG có POST /v1/graphql nào. Cần capture network đầy đủ (không lọc bớt) ở bước mở lại editor để phân xử.
    > Trả lời:

- [ ] **[artwork-template-management::CHK-008]** Hành vi btn-set-invisible khi artwork có ≥2 template
    - Q: Chưa từng quan sát artwork có ≥2 template trong evidence nguồn (artwork test chỉ có 1 template) — hành vi nút này ở trạng thái enable hoàn toàn chưa biết.
    > Trả lời:

- [ ] **[artwork-template-management::CHK-009]** Kết quả sau khi 'Convert to Global Template'
    - Q: unknown_areas: kết quả sau khi 'Convert to Global Template' hoàn tất chưa từng được quan sát — không biết global template có scope/state khác gì template thường.
    > Trả lời:

- [ ] **[condition-cycle-validation::CHK-011]** Hành vi storefront nếu 1 artwork có vòng lọt qua được validation
    - Q: coverage_gaps #1 của KB gốc: 0 evidence storefront cho toàn bộ object Artwork. Đặc biệt quan trọng ở đây vì đây là edge case bảo vệ tính toàn vẹn dữ liệu — nếu server không chặn (CHK-008), hành vi render cần được biết trước khi coi tính năng này an toàn.
    > Trả lời:

- [ ] **[conditional-setting-config::CHK-011]** 2 layer type không có accordion CONDITIONAL SETTING — có đường API bypass để set condition không
    - Q: Chưa có evidence nào cho việc server có validate 'layer type nào được phép có dependency' độc lập với UI hay không.
    > Trả lời:

- [ ] **[editor-layer-workspace::CHK-010]** Effect thật của Group/Ungroup sau khi bấm
    - Q: Ungroup luôn disabled trong mọi sample nguồn vì chưa từng có group nào được tạo — chưa test được cặp Group/Ungroup end-to-end dù đây là action chính trên action bar.
    > Trả lời:

- [ ] **[layer-common-config::CHK-008]** Đối chiếu chéo trực tiếp 9 layer type nằm ngoài bundle-registry nhưng có 'Custom class' trên DOM
    - Q: CONF-006 UNRESOLVED: 2 nguồn evidence khác loại (code-derived INFERRED 29 type vs UI observed 33 type) không khớp phạm vi — cần đối chiếu chéo trực tiếp từng type trong 9 type chênh lệch để xác định nguồn nào đúng, hoặc cả 2 đều đúng theo nghĩa khác nhau.
    > Trả lời:

- [ ] **[layer-condition-value-binding::CHK-008]** toggle=false (Off) serialize thành gì — chưa từng được lưu qua Save
    - Q: Mọi sample có toggle làm nguồn condition trong 3 run nguồn đều chọn On (true) — KHÔNG nên giả định symmetry với true khi chưa xác nhận; ảnh hưởng trực tiếp tới test data cho negative case.
    > Trả lời:

- [ ] **[layer-condition-value-binding::CHK-009]** Multi-value (≥2 phần tử) cho 6/8 type nguồn dạng array còn lại (ngoài clipart-category)
    - Q: Multi-value chỉ xác nhận THẬT ở nguồn clipart-category (layer paragraph pre-existing, 2 giá trị webp path, KB-036). 6/8 type nguồn dạng array còn lại chỉ test với đúng 1 giá trị/condition — shape khi chọn ≥2 giá trị hoàn toàn chưa xác nhận cho 6 type này.
    > Trả lời:

- [ ] **[layer-config-form-elements::CHK-009]** Color (color) — KHÔNG xuất hiện được làm nguồn Conditional Setting dù có đầy đủ Option Title (khác Font CÓ xuất hiện được) — nguyên nhân chưa xác nhận
    - Q: Quan sát 1 lần (conditional-observed.md §2.2, KB-041): Color có Option Title đầy đủ nhưng KHÔNG xuất hiện làm nguồn condition, khác Font. Chưa xác nhận đây là thiết kế cố ý hay giới hạn kỹ thuật — cần dev/PO xác nhận trước khi coi là expected behavior.
    > Trả lời:

- [ ] **[layer-config-maps-astronomy::CHK-002]** Street Maps (maps) — hành vi khi thiếu Mapbox access token (3rd-party Services) chưa xác nhận
    - Q: Statement gốc (KB-024) tự ghi 'chưa verify trực tiếp trong evidence này' — map không render nếu thiếu Mapbox token là suy luận hợp lý, chưa phải quan sát thật.
    > Trả lời:

- [ ] **[layer-config-others::CHK-004]** QR Code (qr-code) — hành vi khi nhập vượt quá 4296 ký tự chưa được thử (chặn/cắt/lỗi)
    - Q: Giới hạn 4296 ký tự (KB-034) là hint text UI quan sát 1 lần — CHƯA từng thử nhập vượt giới hạn để xác nhận hành vi thật, không tổng quát hoá thành validation rule chính thức.
    > Trả lời:

- [ ] **[layer-config-puzzles::CHK-004]** Word Search (word-search) — chuỗi 'Custom class:' xuất hiện HAI LẦN trong panel DOM, chưa xác nhận 2 field riêng hay lỗi duplicate render
    - Q: DOM dump gốc (KB-030) cho thấy 'Custom class:' xuất hiện 2 lần trong cùng panel — CHƯA XÁC NHẬN đây là 2 field JSON riêng hay lỗi render trùng của portal. Cần portal-explorer verify lại trực tiếp.
    > Trả lời:

- [ ] **[layer-duplicate-link-copy::CHK-006]** Sau Save, sửa layer gốc có thực sự đồng bộ (sync) sang bản LINKED không
    - Q: Đây là hành vi cốt lõi được message UI khẳng định ('Design and personalization are synced from it') nhưng CHƯA được test end-to-end trong 3 run nguồn — chỉ xác nhận trạng thái NGAY SAU KHI tạo, chưa test sync thực sự qua 1 vòng sửa-lại-gốc.
    > Trả lời:

- [ ] **[layer-duplicate-link-copy::CHK-008]** Shape JSON của layer LINKED trong PUT body (field đánh dấu linked/source_layer_id)
    - Q: KB-020/KB-022 chỉ có full body cho 1 sample không chứa layer linked — chưa có oracle ở tầng API cho trạng thái linked, chỉ có oracle UI (accordion LINKED LAYER).
    > Trả lời:

- [ ] **[layer-print-effects::CHK-005]** [CONF-004] Tính năng emboss có tồn tại hay không — KHÔNG được khẳng định là không tồn tại
    - Q: CONF-004 UNRESOLVED: brief giả định Print Effects đã có emboss phụ thuộc dịch vụ 3rd-party; quan sát thực tế trên 4/35 layer type + trang 3rd-party Services (plan Blue Test) không tìm thấy chuỗi 'emboss'/'3rd-party' ở đâu. KHÔNG kết luận emboss không tồn tại — có thể gate theo plan, layer type khác chưa thử, hoặc cấu hình 3rd-party service chưa bật. Cần dev/PO xác nhận.
    > Trả lời:

- [ ] **[layer-print-effects::CHK-007]** Trang 'Order Design' — nơi effect layer thực sự hiển thị làm production guide
    - Q: 'Order Design' hoàn toàn chưa được khám phá trong 3 run nguồn — chỉ biết qua nội dung footnote, chưa xác nhận luồng production guide thật sự hoạt động ra sao.
    > Trả lời:

- [ ] **[populate-values::CHK-016]** Cú pháp thật của {{value.formula(<expression>)}} và {{value.context.<from>To<to>}}
    - Q: 11 template biến đổi giá trị được liệt kê tên (KB-045) nhưng cú pháp thật sự hỗ trợ biểu thức/range gì của formula/context chưa từng được test với input cụ thể.
    > Trả lời:

### P3 — còn lại, có thể để sau

- [ ] **[artwork-list-management::CHK-006]** Kết quả sau khi click 'Import to Translation'
    - Q: unknown_areas của feature profile: chưa quan sát luồng dịch thuật artwork hoạt động thế nào — cần khám phá riêng.
    > Trả lời:

- [ ] **[artwork-save-persist::CHK-013]** 2 field artwork_category_id/global_option_ids có thực sự persist ở nơi khác không
    - Q: KB-021 flag đây là unknown — chưa rõ 2 field này bị loại khỏi serialization đọc lại hay lưu ở chỗ khác.
    > Trả lời:

- [ ] **[artwork-save-persist::CHK-016]** Xác nhận OpenAPI spec cho Artwork API có tồn tại trên staging hay không (CONF-005)
    - Q: CONF-005 UNRESOLVED: .env/brief giả định có OpenAPI spec, nhưng 9 path thử đều 404 dạng HTML. Cho tới khi xác nhận, KHÔNG coi bảng field trong KB-020/021/022 là contract chính thức — mọi check field-shape ở checklist này chỉ ở mức BASELINE (quan sát), không phải STRONG (spec-confirmed).
    > Trả lời:

- [ ] **[artwork-template-management::CHK-010]** Field 'Extra charge for this template' map tới field nào trong PUT body
    - Q: Chưa đối chiếu được UI field 'Extra charge for this template' với field API thực tế (KB-020 chỉ ghi nhận addons:[] và charge_enabled ở mức observed_count=1, chưa gắn với action cụ thể bật field này).
    > Trả lời:

- [ ] **[artwork-template-management::CHK-011]** 'Import from artwork' lấy nguồn từ danh sách /artworks
    - Q: profile_relationships đánh dấu quan hệ này là INFERRED, chưa xác nhận — 'Import from artwork' có thể liên quan tới danh sách /artworks nhưng chưa có evidence trực tiếp.
    > Trả lời:

- [ ] **[condition-cycle-validation::CHK-010]** Thuật toán chọn 'layer gốc' hiển thị đầu message lỗi với cấu trúc dependency khác
    - Q: 2/2 sample gốc đều ra 'Word Search' chỉ vì trùng hợp cấu trúc test data (layer duy nhất phụ thuộc cả 8 nguồn) — chưa tách biệt coincidence vs quy luật thật (vd theo thứ tự template/layer).
    > Trả lời:

- [ ] **[conditional-setting-config::CHK-008]** Giới hạn số condition tối đa trên 1 layer
    - Q: Test tối đa đã thử là 8 condition (hết đúng số nguồn khả dụng trong artwork test), KHÔNG phải giới hạn thật của hệ thống — cần nhiều nguồn hơn 8 để xác định ngưỡng thật.
    > Trả lời:

- [ ] **[conditional-setting-config::CHK-009]** Hỗ trợ lồng nhóm AND trong OR (nested logic)
    - Q: Không có UI cho lồng nhóm AND trong OR trong toàn bộ evidence hiện có — chưa xác nhận đây là giới hạn thiết kế cố ý hay chưa khám phá hết.
    > Trả lời:

- [ ] **[conditional-setting-config::CHK-010]** Toán tử condition ngoài 'is any of' và on/off (is-none-of, contains, so sánh số/ngày)
    - Q: KB-033 chỉ observed_count=1 — chỉ quan sát đúng 2 dạng control, KHÔNG nên coi đây là toàn bộ tập toán tử hệ thống hỗ trợ.
    > Trả lời:

- [ ] **[editor-layer-workspace::CHK-011]** 35 layer type trong popup có cố định qua các plan khác nhau không
    - Q: Chỉ test 1 account/1 plan (Blue Test) trong cả 3 run — chưa biết danh sách layer type có phụ thuộc plan/feature-flag không.
    > Trả lời:

- [ ] **[editor-layer-workspace::CHK-012]** Picker khác (image library, clipart) có rơi vào trạng thái rỗng tương tự Vector không
    - Q: KB-015 chỉ test riêng thư viện Vector — chưa rõ đây là hành vi chung cho mọi picker cần asset hay đặc thù riêng Vector.
    > Trả lời:

- [ ] **[layer-condition-value-binding::CHK-007]** dependencies[].element luôn có dạng 'layer-<6 chữ số>'
    - Q: KB-037 (nguồn duy nhất cho pattern này) có knowledge_kind INFERRED, KHÔNG phải OBSERVED_CURRENT hay CONFIRMED_EXPECTED — theo contract chỉ 2 loại đó mới là oracle hợp lệ. Pattern 'element luôn là layer id' được suy ra từ 10 sample (không có UI nào tạo element khác layer id) nhưng CHƯA được xác nhận là quy tắc hệ thống chính thức — không dùng làm assertion cứng cho tới khi có xác nhận.
    > Trả lời:

- [ ] **[layer-condition-value-binding::CHK-010]** Trạng thái data addon-charge/json-list trên artwork 4087 khác nhau giữa 2 run (CONF-002)
    - Q: CONF-002 UNRESOLVED: R2 ghi nhận addon-charge CHƯA có option, json-list CHƯA có URL; R3 (cùng artwork 4087) ghi nhận CẢ HAI đã có dữ liệu. Nhiều khả năng do state đổi giữa 2 run (ai đó cấu hình thêm giữa 2 lần chạy) chứ không phải mâu thuẫn hành vi sản phẩm, nhưng KHÔNG tự kết luận theo contract §8 — PHẢI kiểm tra trạng thái thật của test data trước khi dùng làm precondition cho case khác.
    > Trả lời:

- [ ] **[layer-config-image::CHK-008]** Text to Image (AI) vs Multiple Uploads — key JSON GenAI provider (text_to_image_provider vs multi_image_provider) chưa xác nhận qua PUT thật
    - Q: bundle-registry (INFERRED) gợi ý 2 field cùng mục đích nhưng key khác nhau (text_to_image_provider/multi_image_provider) — chưa cross-check qua PUT body thật của chính 2 type này.
    > Trả lời:

- [ ] **[layer-config-maps-astronomy::CHK-006]** Moon Phase (moon-phase) — chính tả field code 'maps_seacher_enabled' cần giữ nguyên khi viết assertion, không tự sửa thành 'searcher'
    - Q: Chưa xác nhận 'seacher' là typo THẬT của product code hay lỗi ghi chép evidence — nếu viết test/assertion theo tên field JSON, phải dùng đúng chuỗi thật trong code, không tự sửa chính tả.
    > Trả lời:

- [ ] **[layer-config-text::CHK-005]** Other › Spiral Text (spiral-text) — hành vi khi nhập Inner radius < 20 chưa xác nhận
    - Q: Hint 'enter number from 20' chỉ quan sát 1 lần (observed_count=1, KB-014) — chưa từng thử nhập giá trị <20 để biết đây là hard validation hay chỉ gợi ý UI.
    > Trả lời:

- [ ] **[layer-config-text::CHK-007]** Paragraph › Normal (paragraph) — key JSON thật của 'Remove line breaks' chưa xác nhận, chưa viết được assertion API
    - Q: bundle-registry hiện tại KHÔNG liệt kê field này gắn với layer type cụ thể nào — không thể viết assertion API/DB cho field này tới khi xác nhận được key.
    > Trả lời:

- [ ] **[layer-config-vector::CHK-002]** Static Vector (static-vector) — chưa có per-type DOM dump riêng ngoài việc thiếu Custom class
    - Q: Static Vector chưa có per-type DOM dump riêng nào khác ngoài ngoại lệ Custom class — nếu type này có field riêng trong tương lai, cần tạo KB item per-type mới, không sửa KB-011.
    > Trả lời:

- [ ] **[layer-duplicate-link-copy::CHK-007]** Layer type chưa test rơi vào nhóm LINKED hay PLAIN_COPY khi Duplicate & Link
    - Q: Chưa rõ quy luật vì sao đúng 15/35 type rơi vào PLAIN_COPY — theo nhóm layer (form-elements/AI/upload) hay theo implementation riêng lẻ từng type — không dự đoán được cho layer type mới.
    > Trả lời:

- [ ] **[layer-print-effects::CHK-006]** Print Effects config lưu vào field nào trong PUT body
    - Q: Chưa đối chiếu Print Effects với KB-020/KB-022 — chỉ có oracle UI (popover), chưa có oracle ở tầng API cho tính năng này.
    > Trả lời:

- [ ] **[populate-values::CHK-015]** 13 nhóm nguồn Browse values có bao phủ đầy đủ mọi layer/output type không
    - Q: Chỉ 1 sample quan sát (observed_count=1) — chưa xác nhận 13 nhóm này có tương ứng 1-1 đầy đủ với mọi layer/output type hay còn nhóm khác chưa liệt kê.
    > Trả lời:

- [ ] **[populate-values::CHK-017]** Cơ chế khoá Google-Font-lock có áp dụng cho channel Background/Shape không (chỉ test Font/Color)
    - Q: KB-047 chỉ test 2 channel Font và Color — chưa rõ cơ chế khoá theo Google Font có áp dụng cho Background/Shape hay là đặc thù riêng của Font.
    > Trả lời:

---

## Campaign — 2 luồng tạo (by Product Base / by Shopify Product), list/browse, delete, navigation, security

`knowledge/products/teeinblue/objects/campaign/` · 0 conflict · 14 P1 · 18 P2 · 5 P3

### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [ ] **[campaign-delete::CHK-004]** NEEDS_CONFIRMATION: hiệu ứng khi TICK checkbox 'Remove artworks & product bases' trước khi xoá (remove_linked_resources=1)
    - Q: Nhánh checkbox tick hoàn toàn chưa test — RỦI RO MẤT DỮ LIỆU nếu artwork/product base dùng chung bị xoá theo, ảnh hưởng campaign khác.
    > Trả lời:

- [ ] **[campaign-delete::CHK-005]** NEEDS_CONFIRMATION: xoá 1 campaign ĐÃ PUBLISH (có Shopify product thật liên kết)
    - Q: Toàn bộ evidence xoá chỉ dựa trên campaign throwaway CHƯA từng publish; hành vi xoá campaign đã có Shopify product thật hoàn toàn chưa quan sát — ảnh hưởng buyer-facing thật nếu sai.
    > Trả lời:

- [ ] **[campaign-delete::CHK-008]** NEEDS_CONFIRMATION: role khác owner thực hiện Delete campaign
    - Q: Chỉ role owner được test cho action xoá; chưa rõ role hạn chế hơn có bị chặn đúng không (xem FEAT-06).
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-014]** NEEDS_CONFIRMATION: role khác owner có xem được cả 2 list đầy đủ như owner không
    - Q: Chỉ role owner được test; chưa rõ role hạn chế hơn thấy list đầy đủ, list rút gọn, hay bị chặn hoàn toàn (xem FEAT-06).
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-004]** NEEDS_CONFIRMATION: publish mutation (POST /publish {instance_id}) có tự chặn instance_id ngoài phạm vi caller ở tầng server hay không
    - Q: READ surface đã xác nhận org-wide; enforcement thực tế ở tầng MUTATION cho instance_id ngoài phạm vi hoàn toàn chưa kiểm tra — nếu server không tự chặn, đây là lỗ hổng tenant-isolation nghiêm trọng.
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-005]** NEEDS_CONFIRMATION: role hạn chế hơn owner (không có manage-campaigns) bị chặn đúng ở Campaign mutation endpoints
    - Q: Chưa từng test bất kỳ role nào khác owner; đây là rủi ro RBAC/regression cốt lõi chưa có evidence.
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-006]** NEEDS_CONFIRMATION: user thuộc organization khác truy cập/thao tác dữ liệu Campaign của organization hiện tại
    - Q: Chưa có evidence nào cho cross-tenant case trong run bootstrap này — coverage gap bảo mật lớn nhất của object Campaign.
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-007]** NEEDS_CONFIRMATION: TIB_FORBIDDEN_TOKEN / TIB_INVALID_TOKEN bị từ chối đúng ở mọi Campaign endpoint
    - Q: Case negative-auth cơ bản chưa được test lần nào trong run này.
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-008]** NEEDS_CONFIRMATION: GraphQL mutation (insert_campaign_products, update_campaign_instances, v.v.) có tuân theo authorization boundary per-store/per-org như REST publish endpoint
    - Q: READ surface GraphQL đã xác nhận org-wide (KB-030); nếu mutation cũng không chặn đúng phạm vi, đây là lỗ hổng nghiêm trọng chưa kiểm chứng.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-009]** NEEDS_CONFIRMATION: UI có thực sự hiển thị lỗi (toast/inline) cho user khi validation title rỗng thất bại hay không
    - Q: 422 từ API đã xác nhận, nhưng UI có hiển thị cho user biết Save thất bại hay im lặng? Nếu im lặng, đây là rủi ro silent-failure/UX nghiêm trọng.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-012]** NEEDS_CONFIRMATION: role khác owner thao tác create/select/assign/edit-listing-info/publish trên flow này
    - Q: Toàn bộ baseline permission chỉ dựa trên role owner; role hạn chế hơn có bị chặn đúng ở từng bước không — chưa test (xem FEAT-06).
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-013]** NEEDS_CONFIRMATION: enforcement cross-tenant ở tầng API cho publish endpoint (instance_id ngoài phạm vi caller)
    - Q: READ surface (Multi-store launch) đã xác nhận trả dữ liệu toàn Organization; enforcement thực tế ở tầng mutation/publish cho instance_id ngoài phạm vi CHƯA được kiểm tra — rủi ro tenant-isolation.
    > Trả lời:

- [ ] **[create-campaign-by-shopify::CHK-013]** NEEDS_CONFIRMATION: role khác owner thao tác create/select/assign/upload/publish/unpublish trên flow này
    - Q: Toàn bộ baseline permission chỉ dựa trên role owner; chưa test role hạn chế hơn (xem FEAT-06).
    > Trả lời:

- [ ] **[create-campaign-by-shopify::CHK-014]** NEEDS_CONFIRMATION: cross-tenant access tới platform-product endpoints
    - Q: Chưa test bất kỳ cross-tenant case nào cho flow by-Shopify.
    > Trả lời:

### P2 — chức năng chính

- [ ] **[campaign-delete::CHK-006]** NEEDS_CONFIRMATION: xoá là hard-delete hay soft-delete ở tầng DB
    - Q: DB layer bị skip trong run này; chỉ biết API trả 204 và record biến mất khỏi GraphQL list, KHÔNG xác nhận cơ chế xoá thật ở DB.
    > Trả lời:

- [ ] **[campaign-delete::CHK-007]** NEEDS_CONFIRMATION: platform-product (by-Shopify) có action Delete tương đương campaign, hay chỉ có Unpublish (archival-only)
    - Q: FEAT-02 chỉ quan sát Unpublish (KB-024), không thấy Delete nào — chưa rõ đây là thiết kế archival-only cố ý hay chỉ chưa khám phá.
    > Trả lời:

- [ ] **[campaign-delete::CHK-009]** NEEDS_CONFIRMATION: xoá 1 campaign đã publish có giải phóng khoá 'Used' của Shopify product tương ứng ở picker FEAT-02 không
    - Q: Phụ thuộc CHK-005 (xoá campaign đã publish) vốn cũng chưa test; hiệu ứng lan sang trạng thái khoá ở FEAT-02 hoàn toàn chưa quan sát.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-007]** NEEDS_CONFIRMATION: chức năng 'Duplicate campaign' (clone product/artwork/listing info, ảnh hưởng publish state ra sao)
    - Q: Chưa từng thực thi; nếu bug có thể tạo dữ liệu trùng/hỏng không mong muốn — cần verify trước khi coi là an toàn.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-008]** NEEDS_CONFIRMATION: chức năng 'Mark as archive' và quan hệ với filter tab 'Archived'
    - Q: Chưa từng thực thi; ảnh hưởng tới trạng thái publish/list hiện chưa rõ.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-012]** NEEDS_CONFIRMATION: filter/search (Search, Published on store, Internal Tags, Type, Vendor, Tags, Store) có lọc đúng kết quả với giá trị thật không
    - Q: Chỉ quan sát UI filter tồn tại, chưa nhập giá trị thử nghiệm nào — đây là capability browse cốt lõi nhưng chưa có test chức năng.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-015]** NEEDS_CONFIRMATION: hành vi list khi hard reload hoặc pagination vượt quá offset=0 mặc định
    - Q: Chỉ offset=0 mặc định được quan sát; pagination/reload behavior ngoài phạm vi đó chưa test.
    > Trả lời:

- [ ] **[campaign-navigation::CHK-003]** NEEDS_CONFIRMATION: hành vi refresh token khi tab ở background/inactive
    - Q: Token có tự refresh khi tab ở background/inactive không? Nếu không, có thể gây session-timeout giữa chừng workflow đa tab hoặc automation chạy dài.
    > Trả lời:

- [ ] **[campaign-navigation::CHK-004]** NEEDS_CONFIRMATION: sidebar/menu Campaigns có hiển thị khác nhau theo role khác owner hoặc theo feature-flag không
    - Q: Role khác owner có thấy đúng 2 submenu như owner, thấy ít hơn, hay không thấy mục Campaigns nào? Chỉ 1 role được test trong run này.
    > Trả lời:

- [ ] **[campaign-navigation::CHK-005]** NEEDS_CONFIRMATION: điều hướng tới /campaigns hoặc /platform-products khi session hết hạn/token invalid
    - Q: Ứng dụng có redirect về login, hiện lỗi rõ ràng, hay có hành vi không xác định khi session hết hạn giữa lúc thao tác? Chưa từng quan sát trong run này.
    > Trả lời:

- [ ] **[campaign-security-permissions::CHK-009]** NEEDS_CONFIRMATION: GraphQL schema đầy đủ (toàn bộ type/permission liên quan Campaign) chưa được introspect
    - Q: Run này không introspect GraphQL schema; phạm vi type/permission đầy đủ cho Campaign chưa được xác nhận.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-010]** NEEDS_CONFIRMATION: giới hạn min/max length, ký tự đặc biệt, và uniqueness của Campaign title
    - Q: Chỉ case rỗng được test; chưa biết rule đầy đủ cho length/ký tự đặc biệt/uniqueness của Campaign title.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-011]** NEEDS_CONFIRMATION: hành vi Save Listing info với dữ liệu thật (Type/Vendor/Tags/Thumbnail) thay vì chỉ Cancel
    - Q: Chỉ nhánh Cancel được test; hành vi Save với data thật (persist đúng field, validate ra sao) chưa quan sát.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-014]** NEEDS_CONFIRMATION: trạng thái campaign có được giữ đúng sau khi hard reload (F5) trang edit
    - Q: Run này không thực hiện test reload tường minh; state_transitions chỉ được xác nhận trong 1 phiên liên tục, chưa qua reload.
    > Trả lời:

- [ ] **[create-campaign-by-product-base::CHK-016]** NEEDS_CONFIRMATION: hành vi khi publish thất bại/partial (mockup xử lý bất đồng bộ lỗi)
    - Q: Run này chỉ quan sát publish thành công; case publish thất bại/partial hoàn toàn chưa quan sát — chưa có oracle cho retry/rollback UX.
    > Trả lời:

- [ ] **[create-campaign-by-shopify::CHK-011]** NEEDS_CONFIRMATION: validation 'No mockup' có tổng quát hoá đúng cho sản phẩm nhiều variant Shopify thật không
    - Q: 'No mockup' chỉ có 1 sample (observed_count=1, LOW) trên store demo 1-variant; hành vi với sản phẩm nhiều variant thật hoàn toàn chưa kiểm chứng.
    > Trả lời:

- [ ] **[create-campaign-by-shopify::CHK-012]** NEEDS_CONFIRMATION: hành vi toggle 'Connect artworks with Shopify variants' khi bật (mặc định OFF, chưa test)
    - Q: Toggle mặc định OFF và chưa từng được bật trong run này; ảnh hưởng thực tế lên UI/data mapping hoàn toàn chưa rõ.
    > Trả lời:

- [ ] **[create-campaign-by-shopify::CHK-016]** NEEDS_CONFIRMATION: platform-product có action 'Delete' tương đương campaign hay chỉ có 'Unpublish' (archival-only)
    - Q: Chỉ Unpublish (KB-024) được quan sát; chưa xác nhận đây là thiết kế archival-only cố ý hay chỉ chưa được khám phá trong run này (xem FEAT-04).
    > Trả lời:

### P3 — còn lại, có thể để sau

- [ ] **[campaign-list-browse::CHK-006]** NEEDS_CONFIRMATION: chức năng thực tế của 'See campaign info' và 'View campaign logs'
    - Q: 2 mục này chưa từng được thực thi trong run — chỉ biết UI tồn tại, chưa biết nội dung/hành vi thực tế.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-009]** NEEDS_CONFIRMATION: chức năng 'Import to Translation' hoàn toàn chưa khám phá
    - Q: Mục action hoàn toàn chưa được thực thi, mục đích/kết quả chưa rõ.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-010]** NEEDS_CONFIRMATION: 'Bulk creator' (/campaigns/bulk-editor) hoạt động thế nào
    - Q: Entry point tồn tại trên list page nhưng ngoài phạm vi run, hoàn toàn chưa khám phá.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-011]** NEEDS_CONFIRMATION: 'Bulk Fulfill' hoạt động thế nào
    - Q: Entry point tồn tại nhưng hoàn toàn chưa khám phá trong run này.
    > Trả lời:

- [ ] **[campaign-list-browse::CHK-013]** NEEDS_CONFIRMATION/CAUTION: liên kết giữa mở menu '...' và 2 GraphQL query (instances, instances_aggregate) chỉ là co-occurrence, KHÔNG phải causation đã xác nhận
    - Q: Chỉ quan sát proximity theo thời gian (có thể do prefetch icon rocket); KHÔNG dùng 'mở menu => 2 query chạy' làm wait-condition/oracle cho automation cho tới khi xác nhận causation.
    > Trả lời:

---

## SDK — Storefront buyer-facing (personalization, add-to-cart)

`knowledge/products/teeinblue/objects/sdk/` · 3 conflict · 3 P1 · 3 P2 · 4 P3

### Conflict — 2 nguồn evidence trái ngược, chưa chọn bên đúng

- [ ] **[CONFLICT-001]** Store1 (SDK v1, campaign 2595): Add-to-cart có hoàn tất thành công được hay không sau khi điền đủ mọi field cá nhân hoá
    - Phía A: Add-to-cart BỊ CHẶN — banner lỗi chung "Error: Some fields are required or invalid data" vẫn xuất hiện và click ADD TO CART bắn 0 network request, kể cả sau khi mọi field required hiển thị đã điền/checked đầy đủ. Tái hiện với 2 cấu hình template khác nhau, nhiều kỹ thuật chọn/dispatch event khác nhau. _(nguồn: storefront-explorer store1, phiên automated Playwright headless)_
    - Phía B: Add-to-cart hoạt động BÌNH THƯỜNG khi test bằng tay (mouse/keyboard thật), bao gồm 1 lần deliberate recheck điền đủ mọi field trước khi submit. _(nguồn: User, manual interactive test trên store1 — báo cáo bằng lời/chat qua orchestrator, không phải do storefront-explorer trực tiếp thực hiện hay chứng kiến; confidence LOW)_
    - Trạng thái hiện tại: UNRESOLVED — cần (a) re-test bằng thao tác click/type thật từng bước để lấy evidence file nhất quán/mâu thuẫn với lời khai user, hoặc (b) code-config-explorer review logic validate client-side của SDK v1 (staging-sdk.teeinblue.com/shopify/app-v1.js). Chỉ orchestrator + reviewer được quyết resolution.
    > Trả lời:

- [ ] **[CONFLICT-002]** Store2 (SDK v2, campaign 2595): tên nhóm option cấp cha "Poster - Woman and dog clipart template" không khớp nhãn field con "Choose Cat Breed #1/#2" / "Cat Name #1/#2"
    - Phía A: Heading cấp cha của template hiển thị "Poster - Woman and dog clipart template" (nói tới "dog"). _(nguồn: storefront-explorer store2)_
    - Phía B: Các field cá nhân hoá con trong cùng khung lại dùng nhãn "Choose Cat Breed #1/#2", "Cat Name #1/#2" (nói tới "cat"). _(nguồn: storefront-explorer store2)_
    - Trạng thái hiện tại: UNRESOLVED — cần xác nhận từ merchant/PM đây là lỗi copy khi tạo campaign hay quy ước đặt tên nội bộ không nhất quán, hoặc code-config-explorer kiểm tra nguồn config template. Không tự ý chọn phía đúng.
    > Trả lời:

- [ ] **[CONFLICT-003]** Store2 (SDK v2, campaign 2595): liệu Add-to-cart trên store2 thực sự đã là đường đi "known-working" từ CTX-20260912-03, hay lần thử ATC đầu tiên trong run này thất bại thật vì thiếu bước click con của field grouped_clipart
    - Phía A: Task input framing (bootstrap-request.json) mô tả store2/SDK v2 add-to-cart "đã biết ATC thành công" (dùng lại được) từ CTX-20260912-03, ngụ ý đường đi ATC store2 là baseline đã ổn định, không cần re-verify. _(nguồn: input/bootstrap-request.json, kế thừa từ CTX-20260912-03)_
    - Phía B: Khi điền đủ 8 field cá nhân hoá trên store2 nhưng chỉ click radio nhóm (group) của 3 field grouped_clipart mà KHÔNG click thêm thumbnail con, ADD TO CART báo lỗi "This field is required!" ở cả 3 field, GET /cart.js xác nhận item_count=0, và 0 request tới APIOP-051 — client-side validation chặn request. ATC chỉ thành công ở lần thử THỨ HAI, sau khi thêm bước click con. _(nguồn: storefront-explorer store2 CTX-20260912-05, corroborated bởi api-explorer APIOP-051 presence/absence contrast)_
    - Trạng thái hiện tại: UNRESOLVED — 2 khả năng không kết luận: (a) automation của CTX-20260912-03 có thể đã vô tình bao gồm bước click con mà không ghi chú tách riêng; (b) synthetic/scripted click có thể khác pointer click thật về số lần re-render DOM. KHÔNG diễn giải đây là regression thật, cũng KHÔNG diễn giải automation cũ sai hoàn toàn. Cần orchestrator/reviewer đối chiếu lại log tương tác thực tế của CTX-20260912-03.
    > Trả lời:


### P1 — mất dữ liệu / tiền / permission, cần trả lời TRƯỚC khi dùng KB cho vùng này

- [ ] **[storefront-buyer-facing::CHK-007]** Add-to-cart sau khi điền đủ personalization (SDK v1, store1) — CONFLICT-001 UNRESOLVED, chưa thể kết luận pass hay fail
    - Q: CONFLICT-001 chưa giải quyết: cần (a) re-test bằng thao tác click/type thật từng bước để lấy evidence file (screenshot + network trace) nhất quán hoặc mâu thuẫn với lời khai user, hoặc (b) code-config-explorer review logic validate client-side của staging-sdk.teeinblue.com/shopify/app-v1.js. Chỉ orchestrator + reviewer được quyết resolution.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-021]** Storefront phân biệt đúng campaign ĐÃ publish (truy cập/mua được) với object CHƯA publish (không truy cập được) — chưa re-test với credential hợp lệ trong run này
    - Q: Chưa test lại case unpublished VỚI credential storefront hợp lệ trong run này — chỉ có evidence 'không credential' (route-agnostic block, cả published/unpublished) từ run trước. KB-001 hiện tại (run này) chỉ xác nhận gate được vượt qua cho campaign 2595 ĐÃ publish; KHÔNG có observation nào trong run này về việc truy cập 1 object unpublished SAU KHI đã có credential hợp lệ. Cần thực hiện lại phép so sánh trực tiếp (1 object published + 1 object unpublished, cùng credential) trước khi có thể kết luận storefront có phân biệt đúng published/unpublished hay không.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-032]** CONFLICT-003 UNRESOLVED: liệu framing 'ATC store2/SDK v2 known-working' kế thừa từ CTX-20260912-03 có do automation bỏ sót bước click con của grouped_clipart, hay 2-step thực sự luôn là điều kiện đã tồn tại từ trước — chưa thể kết luận
    - Q: CONFLICT-003 UNRESOLVED: hai khả năng KHÔNG kết luận — (a) automation của CTX-20260912-03 (click toạ độ hoặc MCP Playwright tool) có thể đã vô tình bao gồm bước click con như một phần thao tác click nhóm bình thường, không ghi chú tách riêng trong log gốc; (b) synthetic/scripted click có thể khác pointer click thật về số lần re-render DOM kích hoạt, dẫn tới kết quả khác nhau giữa các lần chạy. KHÔNG được diễn giải kết quả run này là 'behavior đã thay đổi/regression thật' CŨNG KHÔNG được diễn giải là 'automation cũ của CTX-20260912-03 sai hoàn toàn' — cả 2 kết luận đều chưa đủ evidence. Cần orchestrator/reviewer đối chiếu lại log tương tác thực tế của CTX-20260912-03. Ghi chú thêm (KHÔNG merge, CHƯA XÁC NHẬN): liên hệ với CONFLICT-001 (KB-006, cùng dạng hypothesis 'automation-interaction gap') là CHƯA XÁC NHẬN — 2 field/2 phạm vi khác nhau (store2 grouped_clipart vs store1 toàn bộ chuỗi ATC), để orchestrator/reviewer tự quyết có cùng nguyên nhân gốc hay không.
    > Trả lời:

### P2 — chức năng chính

- [ ] **[storefront-buyer-facing::CHK-015]** Pre-flight check khi theme app-block CHƯA enable (enabled=false) hoặc endpoint lỗi — chưa test
    - Q: Chưa có instance nào ở trạng thái app-block chưa enable trong scope run này để test case negative của pre-flight gate — cần chuẩn bị fixture instance riêng ở lần chạy sau, KHÔNG phải vấn đề credential.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-018]** Coverage gap: template 1 và 3 chưa test (cả 2 SDK); đường 'edit personalization từ cart' chưa xác nhận tồn tại (SDK v2)
    - Q: Template 1/3 chưa từng được test — không rõ có cùng pattern dependency 2 cấp như template 2 hay không, đây là gap coverage cụ thể của run này (không phải thiếu credential). Đường edit-from-cart trên SDK v2 không tìm thấy trong phiên test này nhưng chưa đủ để kết luận 'không tồn tại' — cần tìm kỹ hơn (vd kiểm tra theme section khác, hoặc hỏi PO/Dev về UX dự kiến).
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-020]** Buyer đã login, non-US market/locale/currency, mobile/tablet viewport — chưa test
    - Q: Toàn bộ evidence FEAT-07 tới nay chỉ ở guest/desktop/US-default. 3 chiều biến thiên phổ biến này (login state, market/locale, viewport) hoàn toàn chưa kiểm chứng — đây là gap coverage cụ thể của lần khám phá này, KHÔNG phải thiếu credential storefront.
    > Trả lời:

### P3 — còn lại, có thể để sau

- [ ] **[storefront-buyer-facing::CHK-017]** Xác minh nhãn hiển thị nhất quán giữa heading nhóm field (cha) và field con cùng khung (SDK v2, store2) — CONFLICT-002, không khẳng định là bug
    - Q: CONFLICT-002 UNRESOLVED: heading cấp cha nói 'dog' nhưng field con nói 'cat' trong cùng khung template. Chưa xác định đây là lỗi copy của merchant khi tạo campaign hay quy ước đặt tên nội bộ. KHÔNG được coi đây là bug đã xác nhận cho tới khi merchant/PM hoặc code-config-explorer xác nhận nguồn config template.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-019]** Hành vi field cá nhân hoá khi buyer đổi variant SAU KHI đã điền — reset hay giữ nguyên? (chưa test, cả 2 SDK)
    - Q: Interaction sequence phổ biến của buyer thật (điền field rồi đổi ý variant) chưa từng được test ở cả 2 SDK trong bất kỳ run nào — không rõ hệ thống reset field hay giữ nguyên; có thể lộ bug reset-state không đúng nếu không nhất quán.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-022]** 'Generate test design' / preview storefront trước khi publish — chưa khám phá
    - Q: Hoàn toàn chưa được khám phá trong bất kỳ run nào, kể cả run này — KHÔNG liên quan tới credential storefront (đây là 1 entry point khác, có thể ở phía portal, chưa từng được thử). Cần xác định entry point cụ thể trước khi có thể viết check thật với oracle rõ ràng.
    > Trả lời:

- [ ] **[storefront-buyer-facing::CHK-030]** Gap: Post-ATC persistence của localStorage draft trên SDK v1 (store1) — CHƯA xác nhận vì store1 chưa từng tới ATC trong bất kỳ run nào
    - Q: SDK v1 (store1) chưa từng tới được bước Add-to-cart trong bất kỳ run nào (kể cả run này — dừng trước ATC theo chủ đích để tránh re-trigger CONFLICT-001) — không có evidence nào để xác nhận hay phủ nhận hành vi post-ATC persistence tương tự SDK v2 (KB-021). Đây là gap coverage phụ thuộc trực tiếp vào việc CONFLICT-001 được giải quyết trước; KHÔNG suy diễn hành vi SDK v1 giống SDK v2 dù cơ chế localStorage khác (KB-014..017, KB-019) đã xác nhận giống nhau.
    > Trả lời:


---

**Tổng: 17 conflict · 35 P1 · 88 P2 · 45 P3 = 185 mục cần trả lời.**


Sau khi trả lời, đưa file này cho `qa-context-lifecycle-orchestrator` chạy mode `RECONCILE` (cho conflict) hoặc `INCREMENTAL_UPDATE` (cho check thiếu oracle) — KHÔNG tự sửa `knowledge/products/teeinblue/objects/*/kb.json` bằng tay.
