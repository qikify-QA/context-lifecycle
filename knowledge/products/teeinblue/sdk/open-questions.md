# Open Questions — SDK

## OQ-sdk-001 — CONFLICT

```json
{
  "oq_id": "OQ-sdk-001",
  "type": "CONFLICT",
  "feature_id": "object-level (storefront-buyer-facing + product-page-settings-config)",
  "summary": "SDK version thực sự đang được serve cho từng store (instance 609 / linh-explorer.myshopify.com vs instance 613 / linh-explorer-2.myshopify.com) trên campaign 2595 — 3 nguồn evidence mâu thuẫn nhau, UNRESOLVED. Trực tiếp implicate tính CURRENT của KB-004/KB-005/KB-007/KB-010/KB-011 (nhãn 'store1 = SDK v1') và của mọi capability/check phân biệt v1/v2 theo store. Tương ứng conflict_group CFL-004 trên các KB item (KB-004/KB-007/KB-010/KB-011 phía cũ; KB-037/KB-040 phía mới). Chỉ orchestrator + reviewer được quyết resolution; KHÔNG tự chọn phía, KHÔNG tự đánh dấu KB nào là stale, KHÔNG dùng nhãn v1/v2 theo store làm điều kiện rẽ nhánh chắc chắn cho store1 trước khi có resolution.",
  "side_a": "store1 (instance 609) chạy storefront SDK v1 (nested radiogroup ~10 clipart, lightbox mockup TĨNH kiểu PhotoSwipe, header x-sdk-version: 1.0.3, script tag app-v1.js, container class tee-campaign-v1); store2 (instance 613) chạy SDK v2 (grouped_clipart grid ~9 clipart, SVG mockup sống với id artwork-layer--layer-<n>, script tag app-v2.js, container class tee-campaign-v2). Quan sát trực tiếp storefront runtime của campaign 2595, 2026-09-12 — HIGH confidence TẠI THỜI ĐIỂM ghi nhận, phía cũ nhất.",
  "side_b": "GET /api/instances?trashed (portal, 2026-09-21) trả field sdk_version = 2 cho CẢ instance 609 và 613; instance.config object được ghi nhận giống hệt nhau giữa 2 instance trong sample này. LOW confidence — chỉ 1 sample full-body, không byte-diff độc lập.",
  "side_c": "Storefront runtime re-check 2026-09-21 trên CÙNG URL campaign 2595 đã dùng để lập side_a: store1 nay serve https://staging-sdk.teeinblue.com/shopify/app-v2.js (+ async.js?v=2) và container class 'tee-campaign tee-campaign-v2 tee-customization-wrapper' — ngược hẳn marker app-v1.js/tee-campaign-v1 của side_a; store2 không đổi (vẫn v2). Toàn bộ DOM personalization quan sát được (element id, field label, số clipart, giá, CSS custom property) nay byte-identical giữa 2 store, cross-check bằng 2 lượt script độc lập. HIGH confidence, mới nhất, hội tụ với side_b.",
  "related": "CHK-038 (storefront-buyer-facing), CHK-021 (product-page-settings-config)"
}
```

## OQ-sdk-002 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-002",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Object sdk hiện chỉ có 3 feature profile (storefront-buyer-facing, product-page-settings-config, genai-personalization-runtime). Không rõ SDK còn bề mặt/feature nào khác chưa vào scope — cần qa-context-scope-planner xác nhận đây đã là toàn bộ phạm vi object hay còn thiếu. '3/3 feature có profile' KHÔNG phải tín hiệu completeness cấp object."
}
```

## OQ-sdk-003 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-003",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Data layer (DB) NOT_OBSERVED hoàn toàn cho cả object — mọi state chỉ dựa trên response API, localStorage và DOM; chưa có xác nhận nào qua DB thật (không có access trong phạm vi các lần khám phá tới nay)."
}
```

## OQ-sdk-004 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-004",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Toàn bộ evidence buyer-facing của object chỉ đến từ 1 campaign duy nhất (campaign 2595, by product base). CHƯA xác nhận kiến thức này áp dụng y hệt cho product Shopify gốc (by-shopify flow) — đây là giả định ngầm của việc tách object sdk (SDK độc lập với loại campaign) và chưa được test chéo."
}
```

## OQ-sdk-005 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-005",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Các chiều biến thiên phổ biến chưa test ở bất kỳ feature nào: buyer đã login, market/locale/currency ngoài US/USD/en, mobile/tablet viewport, và role portal khác owner. 0% coverage — không suy diễn hành vi cho các chiều này."
}
```

## OQ-sdk-006 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-006",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Template coverage: mọi evidence về dependency 2 cấp, grouped_clipart 2-step và preview mechanism chỉ dựa trên template option 1-2 của campaign 2595; template option 3 chưa từng được test trên bất kỳ store nào. Chưa rõ các cơ chế đã ghi nhận có generalize sang template khác hay chỉ đúng cho template này."
}
```

## OQ-sdk-007 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-007",
  "type": "OPEN_ISSUE",
  "feature_id": "object-level",
  "summary": "Cross-object pointer (KHÔNG thuộc dữ liệu object sdk, nêu ở đây để downstream biết): companion feature của genai-personalization-runtime là FEAT-13-layer-config-image bên object artwork đang có 1 conflict UNRESOLVED (artwork CONF-CBS003-01, corroborated bởi global-option) cần authority quyết định. Khi dựng test case cho genai-personalization-runtime phải đọc kèm profile/checklist của companion feature đó."
}
```

## OQ-sdk-008 — CONFLICT

```json
{
  "oq_id": "OQ-sdk-008",
  "type": "CONFLICT",
  "feature_id": "storefront-buyer-facing",
  "summary": "Store1 (SDK v1, campaign 2595): Add-to-cart có hoàn tất thành công được hay không sau khi điền đủ mọi field cá nhân hoá. UNRESOLVED — conflict_group CFL-001 trên KB-005 (phía automation); phía còn lại là lời khai manual-test của user, KHÔNG có KB item tương ứng nên được giữ nguyên văn tại đây. Cần (a) một lần re-test thật bằng thao tác click/type từng bước (không .fill()/force-check hàng loạt) để thu evidence nhất quán hoặc mâu thuẫn với lời khai user, hoặc (b) code-config-explorer/api-explorer review logic validate client-side của staging-sdk.teeinblue.com/shopify/app-v1.js. KHÔNG kết luận ATC store1 PASS hay FAIL trước đó.",
  "side_a": "Add-to-cart BỊ CHẶN: banner lỗi chung 'Error: Some fields are required or invalid data' vẫn xuất hiện và click ADD TO CART bắn 0 network request, kể cả sau khi mọi field required hiển thị đã điền/checked đầy đủ, không còn lỗi inline riêng lẻ. Tái hiện với 2 cấu hình template khác nhau (template-277843/1-cat, template-578330/2-cat), nhiều kỹ thuật chọn/dispatch event khác nhau. Nguồn: storefront-explorer store1, phiên automated (Playwright headless), HIGH confidence.",
  "side_b": "Add-to-cart hoạt động BÌNH THƯỜNG khi test bằng tay (mouse/keyboard thật), bao gồm 1 lần deliberate recheck điền đủ mọi field trước khi submit. Nguồn: user, manual interactive test trên store1 (báo cáo bằng lời qua orchestrator, không do storefront-explorer trực tiếp thực hiện hay chứng kiến), LOW confidence, không có evidence file.",
  "related": "CHK-007 (storefront-buyer-facing), KB-005, KB-006 (hypothesis INFERRED, không phải một phía)"
}
```

## OQ-sdk-009 — CONFLICT

```json
{
  "oq_id": "OQ-sdk-009",
  "type": "CONFLICT",
  "feature_id": "storefront-buyer-facing",
  "summary": "Store2 (SDK v2, campaign 2595): tên nhóm option cấp cha 'Poster - Woman and dog clipart template' không khớp nhãn các field con 'Choose Cat Breed #1/#2' / 'Cat Name #1/#2' trong cùng khung template. UNRESOLVED. Cần xác nhận từ merchant/PM đây là lỗi copy khi tạo campaign hay quy ước đặt tên nội bộ không nhất quán của template config; hoặc code-config-explorer kiểm tra nguồn config template xem 'dog' có phải leftover/placeholder text. KHÔNG tự chọn nhãn nào làm chuẩn, KHÔNG coi đây là bug đã xác nhận. Lưu ý: không có KB item nào trong object mang 2 phía này (chúng chỉ tồn tại ở entry này và ở CHK-017), nên không có conflict_group tương ứng trong features/*/kb.json.",
  "side_a": "Heading cấp cha của template hiển thị 'Poster - Woman and dog clipart template' (nói tới 'dog'). Nguồn: storefront-explorer store2, MEDIUM confidence.",
  "side_b": "Các field cá nhân hoá con trong cùng khung lại dùng nhãn 'Choose Cat Breed #1/#2', 'Cat Name #1/#2' (nói tới 'cat'). Nguồn: storefront-explorer store2, MEDIUM confidence.",
  "related": "CHK-017 (storefront-buyer-facing)"
}
```

## OQ-sdk-010 — CONFLICT

```json
{
  "oq_id": "OQ-sdk-010",
  "type": "CONFLICT",
  "feature_id": "storefront-buyer-facing",
  "summary": "Store2 (SDK v2, campaign 2595): liệu Add-to-cart trên store2 thực sự đã là đường đi 'known-working' từ lần quan sát 2026-09-12, hay lần thử ATC ĐẦU TIÊN (2026-09-12, lượt localStorage) thất bại thật vì thiếu bước click con của field grouped_clipart. UNRESOLVED — conflict_group CFL-003 trên KB-008 và KB-018. Hai khả năng KHÔNG xác nhận: (a) tooling lần trước có thể đã vô tình bao gồm bước click con như phần của thao tác click thumbnail nhóm mà không ghi chú tách riêng; (b) synthetic/scripted click có thể khác pointer click thật về số lần re-render DOM. Cần orchestrator/reviewer đối chiếu lại log tương tác thực tế của lần quan sát trước. Ghi chú (CHƯA XÁC NHẬN, KHÔNG merge): dạng 'dependency 2 tầng cần thao tác thêm' ở đây CÓ THỂ liên quan tới hypothesis 'automation-interaction gap' của OQ-sdk-008 (KB-006) nhưng là 2 field/2 SDK version khác nhau.",
  "side_a": "Framing kế thừa: store2/SDK v2 add-to-cart 'đã biết ATC thành công' từ lần quan sát 2026-09-12, ngụ ý đường đi ATC store2 là baseline đã ổn định, không cần re-verify (KB-008: ATC hoàn tất thành công đầu-cuối). LOW confidence cho phần framing.",
  "side_b": "Khi điền đủ 8 field cá nhân hoá trên store2 (guest, campaign 2595, SDK v2) NHƯNG chỉ click radio nhóm của 3 field grouped_clipart (Hairstyle, Cat Breed #1, Cat Breed #2) mà KHÔNG click thêm thumbnail con, rồi bấm ADD TO CART: banner lỗi 'Error: Some fields are required or invalid data' + lỗi inline 'This field is required!' dưới cả 3 field; GET /cart.js ngay sau đó cho item_count=0; log network xác nhận ZERO request tới POST /api/merchant/shopify/customization. Đây là lần thử ĐẦU TIÊN, không phải lỗi giả lập; ATC chỉ thành công ở lần thử THỨ HAI sau khi thêm bước click con (KB-018). HIGH confidence, corroborated cross-layer.",
  "related": "CHK-032 (storefront-buyer-facing), KB-008, KB-018"
}
```

## OQ-sdk-011 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-011",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Pre-flight check khi theme app-block CHƯA enable (enabled=false) hoặc endpoint lỗi — chưa test — Chưa có instance nào ở trạng thái app-block chưa enable trong scope run này để test case negative của pre-flight gate — cần chuẩn bị fixture instance riêng ở lần chạy sau, KHÔNG phải vấn đề credential.",
  "related": "CHK-015 (storefront-buyer-facing)"
}
```

## OQ-sdk-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Coverage gap: template 1 và 3 chưa test (cả 2 SDK); đường 'edit personalization từ cart' chưa xác nhận tồn tại (SDK v2) — Template 1/3 chưa từng được test — không rõ có cùng pattern dependency 2 cấp như template 2 hay không, đây là gap coverage cụ thể của run này (không phải thiếu credential). Đường edit-from-cart trên SDK v2 không tìm thấy trong phiên test này nhưng chưa đủ để kết luận 'không tồn tại' — cần tìm kỹ hơn (vd kiểm tra theme section khác, hoặc hỏi PO/Dev về UX dự kiến).",
  "related": "CHK-018 (storefront-buyer-facing)"
}
```

## OQ-sdk-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Hành vi field cá nhân hoá khi buyer đổi variant SAU KHI đã điền — reset hay giữ nguyên? (chưa test, cả 2 SDK) — Interaction sequence phổ biến của buyer thật (điền field rồi đổi ý variant) chưa từng được test ở cả 2 SDK trong bất kỳ run nào — không rõ hệ thống reset field hay giữ nguyên; có thể lộ bug reset-state không đúng nếu không nhất quán.",
  "related": "CHK-019 (storefront-buyer-facing)"
}
```

## OQ-sdk-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Buyer đã login, non-US market/locale/currency, mobile/tablet viewport — chưa test — Toàn bộ evidence FEAT-07 tới nay chỉ ở guest/desktop/US-default. 3 chiều biến thiên phổ biến này (login state, market/locale, viewport) hoàn toàn chưa kiểm chứng — đây là gap coverage cụ thể của lần khám phá này, KHÔNG phải thiếu credential storefront.",
  "related": "CHK-020 (storefront-buyer-facing)"
}
```

## OQ-sdk-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Storefront phân biệt đúng campaign ĐÃ publish (truy cập/mua được) với object CHƯA publish (không truy cập được) — chưa re-test với credential hợp lệ trong run này — Chưa test lại case unpublished VỚI credential storefront hợp lệ trong run này — chỉ có evidence 'không credential' (route-agnostic block, cả published/unpublished) từ run trước. KB-001 hiện tại (run này) chỉ xác nhận gate được vượt qua cho campaign 2595 ĐÃ publish; KHÔNG có observation nào trong run này về việc truy cập 1 object unpublished SAU KHI đã có credential hợp lệ. Cần thực hiện lại phép so sánh trực tiếp (1 object published + 1 object unpublished, cùng credential) trước khi có thể kết luận storefront có phân biệt đúng published/unpublished hay không.",
  "related": "CHK-021 (storefront-buyer-facing)"
}
```

## OQ-sdk-016 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-016",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "'Generate test design' / preview storefront trước khi publish — chưa khám phá — Hoàn toàn chưa được khám phá trong bất kỳ run nào, kể cả run này — KHÔNG liên quan tới credential storefront (đây là 1 entry point khác, có thể ở phía portal, chưa từng được thử). Cần xác định entry point cụ thể trước khi có thể viết check thật với oracle rõ ràng.",
  "related": "CHK-022 (storefront-buyer-facing)"
}
```

## OQ-sdk-017 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-017",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "storefront-buyer-facing",
  "summary": "Gap: Post-ATC persistence của localStorage draft trên SDK v1 (store1) — CHƯA xác nhận vì store1 chưa từng tới ATC trong bất kỳ run nào — SDK v1 (store1) chưa từng tới được bước Add-to-cart trong bất kỳ run nào (kể cả run này — dừng trước ATC theo chủ đích để tránh re-trigger CFL-001) — không có evidence nào để xác nhận hay phủ nhận hành vi post-ATC persistence tương tự SDK v2 (KB-021). Đây là gap coverage phụ thuộc trực tiếp vào việc CFL-001 được giải quyết trước; KHÔNG suy diễn hành vi SDK v1 giống SDK v2 dù cơ chế localStorage khác (KB-014..017, KB-019) đã xác nhận giống nhau.",
  "related": "CHK-030 (storefront-buyer-facing)"
}
```

## OQ-sdk-018 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-018",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "TTL/expiry của localStorage draft ('teeinblue-customizations', 'teeinblue-global-options'): cả 2 store chỉ có field 'timestamp' (epoch ms, last-write), không có field expiry nào và chưa thực hiện phép chờ dài hạn. Việc entry có bao giờ bị prune theo tuổi hay không là NOT_OBSERVED — cố ý không suy diễn theo bất kỳ hướng nào."
}
```

## OQ-sdk-019 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-019",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "Hành vi ghi localStorage khi CHỈ click radio nhóm của field grouped_clipart (chưa click thumbnail con): có ghi giá trị placeholder nào trước bước click con, hay không ghi gì tới khi chọn con — chưa cô lập được ở granularity đó (2 click luôn nằm trong cùng cửa sổ ~600ms trước mỗi lần dump)."
}
```

## OQ-sdk-020 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-020",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "Field-remount pre-fill (KB-020) chỉ xác nhận cho field dạng text (Woman Name); CHƯA xác nhận cho field dạng radio/clipart/grouped_clipart — không suy diễn là giống nhau."
}
```

## OQ-sdk-021 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-021",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "Full contract của endpoint server-sync lúc ATC (POST /api/merchant/shopify/customization): request/response body, auth mechanism và error-path (4xx/5xx) chưa quan sát được — format network capture đã dùng không lưu headers/status/body cho entry nào. Chỉ có presence/absence tại thời điểm ATC."
}
```

## OQ-sdk-022 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-022",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "Liệu store1 (SDK v1) có gọi POST /api/merchant/shopify/customization (hay endpoint tương đương) tại thời điểm ATC của chính nó hay không — store1 chưa từng tới được bước ATC trong bất kỳ lần khám phá nào, nên toàn bộ chuỗi server-sync/post-ATC của SDK v1 là NOT_OBSERVED (phụ thuộc OQ-sdk-008)."
}
```

## OQ-sdk-023 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-023",
  "type": "OPEN_ISSUE",
  "feature_id": "storefront-buyer-facing",
  "summary": "Cross-origin isolation giữa store1 và store2 (2 origin riêng, localStorage không chia sẻ) được khẳng định như hành vi browser mặc định nhưng KHÔNG được test trực tiếp — đây là assumption, không phải OBSERVED_CURRENT cùng lần khám phá."
}
```

## OQ-sdk-024 — CONFLICT

```json
{
  "oq_id": "OQ-sdk-024",
  "type": "CONFLICT",
  "feature_id": "product-page-settings-config",
  "summary": "Config schema khai báo của GET /api/settings (config_registry.instance.config, ~38 key kèm metadata type/default/description/group) KHÔNG khớp payload .config thực tế trả về bởi GET /api/instances?trashed (~27 key quan sát cho instance 609/613) — chỉ 1 tên key ('add_design_links') xuất hiện ở cả 2 tập, và bản thân key đó cũng chưa khớp được với control UI cụ thể nào trong 67 control đã quan sát. UNRESOLVED — conflict_group CFL-005 trên KB-038 và KB-039. Cần code-config-explorer/backend source xác nhận: /api/instances chỉ trả key đã set (bỏ schema default chưa set)? hay 2 'instance.config' là 2 namespace khác nhau? hay schema đang stale/aspirational? KHÔNG tự resolve, giữ cả 2 phía.",
  "side_a": "config_registry.instance.config (GET /api/settings) khai báo ~38 key config cấp instance dưới dạng schema dictionary, gồm những key đọc như ứng viên hợp lý cho các control Product Page Settings đã quan sát (vd show_cross_sell, group='Storefront SDK', có thể khớp control 'Show Cross-sell Personalization') — nhưng đây là schema tài liệu/aspirational, CHƯA xác nhận là thứ trang /product-page-settings thực sự đọc/ghi. LOW confidence.",
  "side_b": "Object .config thực tế do GET /api/instances?trashed trả về cho instance 609 và 613 chỉ chứa ~27 key (style_variants, preview_content, add_design_links, atc_border_radius, ..., show_assigned_variant_images_only) — không có key nào tên show_cross_sell và không khớp phần lớn 38 entry schema theo đúng tên. LOW confidence.",
  "related": "CHK-020 (product-page-settings-config), KB-038, KB-039"
}
```

## OQ-sdk-025 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-025",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "product-page-settings-config",
  "summary": "Gap: luong Upload logo day du (chon file, preview, luu) hoan toan chua test -- khong co duong revert an toan xac dinh duoc trong run nay — Upload logo chua tung duoc click trong bat ky run nao vi khong xac nhan duoc duong revert don gian trong pham vi SAFE_REVERSIBLE_ONLY ma khong keo theo nguy co phai Save (forbidden_actions). Can lam ro voi PO/Dev quy trinh revert an toan (hoac 1 test-instance rieng khong anh huong du lieu that) truoc khi viet duoc test case that cho luong nay.",
  "related": "CHK-012 (product-page-settings-config)"
}
```

## OQ-sdk-026 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-026",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "product-page-settings-config",
  "summary": "Gap: gia tri hex chinh xac cua ~13 color-picker va lua chon dang chon cua cac icon-only swatch (Font size, Toggle style, Alignment, Field's border radius) KHONG doc duoc qua accessibility tree — Accessibility tree khong phan biet duoc gia tri hex cua color-picker hay lua chon dang active cua icon-only swatch trong run nay -- chi xac nhan duoc su hien dien/cau truc (xem CHK-013/014/015), khong xac nhan duoc gia tri dang chon. Can 1 phuong phap doc khac (DOM inspection truc tiep qua DevTools Protocol, hoac code review) o lan chay sau truoc khi co the viet oracle 'gia tri hien tai phai la X' cho cac field nay.",
  "related": "CHK-016 (product-page-settings-config)"
}
```

## OQ-sdk-027 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-027",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "product-page-settings-config",
  "summary": "Tuong quan (INFERRED, KHONG PHAI contract da xac nhan) giua ~27 key trong .config va cac control UI da quan sat -- khong duoc dung nhu data contract field-by-field — Binding giua .config (~27 key, APIOP-001) va 67 control UI CHI la tuong quan theo ten/gia tri (INFERRED), KHONG PHAI 1 data contract da xac nhan field-by-field qua code reference hay qua response cua Save (write-path chua tung duoc test, xem CHK-022). KHONG duoc viet oracle 'thay doi checkbox X se ghi dung key Y trong .config' cho toi khi co code reference tu code-config-explorer hoac quan sat truc tiep response cua Save. Ngoai ra, .config THUC TE (~27 key) khong khop config_registry SCHEMA (~38 key, APIOP-002) -- xem CHK-020 (CFL-005) -- can resolve truoc khi coi bat ky key nao trong so ~11 key con lai cua schema la 'se xuat hien khi merchant thay doi tu UI'.",
  "related": "CHK-018 (product-page-settings-config)"
}
```

## OQ-sdk-028 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-028",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "product-page-settings-config",
  "summary": "Gap: write-path (Save/Reset) hoan toan chua co evidence -- nut hien dien/enabled nhung chua tung duoc click — Save/Reset hoan toan chua co evidence trong bat ky run nao tinh toi nay (forbidden_actions cua exploration_policy). Moi gia dinh ve hanh vi luu/validate-khi-luu (bao gom co goi APIOP-001 dang PUT/POST khong, co field nao trong .config duoc ghi, co validation loi nao khong) deu la suy dien, KHONG co evidence. Can explicit policy tu orchestrator/PO cho phep 1 lan mutation co kiem soat (vd tren test-instance rieng) truoc khi co the viet duoc test case that cho write-path nay.",
  "related": "CHK-022 (product-page-settings-config)"
}
```

## OQ-sdk-029 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-029",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "product-page-settings-config",
  "summary": "Gap: bien thien permission/role tren /product-page-settings hoan toan chua duoc quan sat -- chi 1 role (owner) duoc test — Chi role owner (Linh explorer, user_id 266) duoc test trong run nay -- khong co credential role khac (TIB_USER_A_*/TIB_USER_B_*) san co. Khong co evidence nao cho biet role thap hon co bi gioi han xem/sua control nao tren trang nay hay khong. Can credential role khac o lan chay sau truoc khi viet duoc test case PERMISSION that cho trang nay.",
  "related": "CHK-023 (product-page-settings-config)"
}
```

## OQ-sdk-030 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-030",
  "type": "OPEN_ISSUE",
  "feature_id": "product-page-settings-config",
  "summary": "Các giá trị khác của dropdown 'Form type' (popup / expand-collapse) và mọi sub-field chúng có thể hé lộ (KB-026) chưa được thử — time-boxed out, zero evidence."
}
```

## OQ-sdk-031 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-031",
  "type": "OPEN_ISSUE",
  "feature_id": "product-page-settings-config",
  "summary": "Các trang 'Store Settings' lân cận (General Settings, Product Page Content, Customization Image, Shipping Methods, Inventory Locations, SKU Mapping) nằm ngoài object target đã khám phá — zero evidence, không suy diễn hành vi."
}
```

## OQ-sdk-032 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-032",
  "type": "OPEN_ISSUE",
  "feature_id": "product-page-settings-config",
  "summary": "Entry point thứ hai ngay trên trang — link '(Switch store?)' cạnh heading 'For store: <store>' — chưa test riêng hành vi click (chỉ dùng sidebar store switcher). DOM tách biệt với sidebar switcher nên không suy diễn hành vi giống nhau."
}
```

## OQ-sdk-033 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-033",
  "type": "OPEN_ISSUE",
  "feature_id": "product-page-settings-config",
  "summary": "Liệu store thứ 3 trở lên có xuất hiện trong store switcher với account khác hay không — account đang test được xác nhận exhaustively là đúng 2 store (KB-024), không tổng quát hoá cho account khác."
}
```

## OQ-sdk-034 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-034",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION] Text to Image (AI) qua Live Preview — chưa test nhập prompt MỚI qua chính surface này — CHK-002 chỉ quan sát generate dùng prompt ĐÃ LƯU sẵn ở portal — chưa test khả năng nhập prompt mới qua chính Live Preview widget (nếu UI có field này). Ảnh hưởng thiết kế test case cho luồng buyer tự tuỳ biến prompt (nếu tính năng này tồn tại).",
  "related": "CHK-003 (genai-personalization-runtime)"
}
```

## OQ-sdk-035 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-035",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION, GAP] TIB-5339 — so sánh sync vs async giữa route chính và route fallback KHI route fallback THÀNH CÔNG — Trong lần thử duy nhất (CHK-004/005), CẢ HAI route (chính và fallback) đều fail cùng lý do (ảnh bị client re-encode xuống dưới ngưỡng 10000 byte trước khi tới cả 2 route). Route fallback multipart THẬT SỰ TỒN TẠI và được tự động thử khi route chính lỗi (xác nhận ở CHK-005), nhưng chưa có lần route fallback THÀNH CÔNG để so sánh downstream GenAI generate là sync hay async. KHÔNG suy diễn kết quả so sánh — cần fixture/ảnh input phù hợp hơn và nguyên nhân lỗi khác ở run tiếp theo.",
  "related": "CHK-006 (genai-personalization-runtime)"
}
```

## OQ-sdk-036 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-036",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION] 'Select a previously generated image' với ≥2 item lịch sử — gallery/modal thật sự hiển thị gì, chưa thử — Với chỉ 1 item lịch sử (CHK-007), bấm nút 'Select a previously generated image' KHÔNG mở gallery/modal riêng biệt quan sát được — chưa ép mở gallery với ≥2 item để biết UI thật sự hiển thị gì. Chỉ có evidence cho trường hợp 1 item; chưa biết UI khi có nhiều lựa chọn lịch sử.",
  "related": "CHK-008 (genai-personalization-runtime)"
}
```

## OQ-sdk-037 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-037",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION, GAP] 'Duplicate & Share' (TIB-5326) — control không tìm thấy ở Live Preview widget — 'Duplicate & Share' (TIB-5326) KHÔNG tìm thấy ở CẢ portal editor lẫn storefront Live Preview cho layer Text to Image (AI)/Multiple Uploads — 2 agent độc lập cùng không tìm thấy, KHÔNG kết luận feature không tồn tại (có thể bị gate bởi điều kiện chưa trigger: nhiều biến thể generated, cart/order thật, plan cụ thể). Cần hỏi dev/PO trước khi viết test case chính thức. (Trùng với CHK-053 trong checklist layer-config-image.json — cùng 1 gap quan sát từ 2 bề mặt khác nhau, KHÔNG phải duplicate giả tạo để tăng số lượng.)",
  "related": "CHK-009 (genai-personalization-runtime)"
}
```

## OQ-sdk-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION] Ngưỡng '>=2 ảnh' để enable nút Generate — ngưỡng thật hay chỉ render-lag nhất thời? — CHK-010 chỉ 1 sample (Maximum photos=3) — chưa phân biệt được đây là ngưỡng thật (>=2 ảnh bắt buộc bất kể Maximum photos config) hay chỉ là render-lag nhất thời. KHÔNG suy thành validation rule tổng quát tới khi có ≥2 sample độc lập ở cấu hình khác nhau.",
  "related": "CHK-011 (genai-personalization-runtime)"
}
```

## OQ-sdk-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION] Toàn bộ feature — hành vi có giữ nguyên trên guest session thật hay không (hiện chỉ staff-authenticated proxy) — TOÀN BỘ evidence của feature này là staff-authenticated PROXY cho buyer (account Linh explorer dùng Live Preview widget), KHÔNG PHẢI guest session thật — mọi rate-limit, session-boundary, hoặc UI khác biệt trên theme Shopify thật CHƯA được loại trừ. KHÔNG dùng làm oracle 100% cho hành vi buyer thật tới khi có test với guest session.",
  "related": "CHK-013 (genai-personalization-runtime)"
}
```

## OQ-sdk-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[NEW, NEEDS_CONFIRMATION] Mọi finding về Generate/upload chỉ xác nhận cho Gemini — chưa test OpenAI/Flux/ImagenHub qua runtime này — Toàn bộ finding về async job+polling/minimum-filesize/select-previous-image trong checklist này CHỈ phản ánh hành vi CỦA Gemini (assumption 'rẻ nhất' để test, không có nguồn giá xác nhận) — chưa xác nhận cho OpenAI/Flux/ImagenHub. Rủi ro tổng quát hoá sai nếu provider khác có endpoint/shape/validation khác.",
  "related": "CHK-014 (genai-personalization-runtime)"
}
```

## OQ-sdk-041 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-041",
  "type": "OPEN_ISSUE",
  "feature_id": "genai-personalization-runtime",
  "summary": "Thứ tự resize/crop khi bật 'Set minimum size' (minimum-resolution) trên layer Multiple Uploads (TIB-5188) HOÀN TOÀN CHƯA TEST — cần bật option đó bên companion feature của object artwork trước khi có thể quan sát."
}
```

## OQ-sdk-042 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-042",
  "type": "OPEN_ISSUE",
  "feature_id": "genai-personalization-runtime",
  "summary": "Add-to-cart / cart / checkout-boundary của luồng GenAI hoàn toàn KHÔNG chạm tới được: Live Preview widget là preview cấp artwork, không gắn product/campaign/cart. Đây là giới hạn cấu trúc của surface đã dùng, không phải policy — cần quyền publish có kiểm soát (hoặc guest session thật trên PDP) ở lần chạy sau. Không viết check nào cho phần này (0 evidence tuyệt đối)."
}
```

## OQ-sdk-043 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-043",
  "type": "OPEN_ISSUE",
  "feature_id": "genai-personalization-runtime",
  "summary": "Persistence/reload của state runtime (job history, danh sách ảnh đã generate) sau khi reload trang: 0 evidence — Live Preview widget chưa được test reload giữa các bước, nên dimension STATE_DATA bị loại khỏi checklist thay vì viết check giả định."
}
```

## OQ-sdk-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] Root-cause collision fallback-ID theo device-info (KB-049): fixture ≥2 visitor dùng thiết bị/khu vực tương tự, upload AI-effect trước khi thumbmark fetch xong — ID fallback được sinh ra có thực sự collide giữa các visitor không? Hiện tượng chỉ được báo cáo qua Jira TIB-5460 (description + comment id 51194, huyenntk, 2026-09-17/18), CHƯA reproduce độc lập trên fixture nhiều device/visitor trong bất kỳ run nào. Đồng thời cần xác nhận vai trò kỹ thuật (dev/PM) của huyenntk trước khi dùng KB-049 làm oracle cho test case.",
  "related": "CHK-018 (genai-personalization-runtime), KB-049"
}
```

## OQ-sdk-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] KB-050 phần 1 (fix TIB-5460, ĐANG QA Review, CHƯA SHIP): sau khi ticket ship, fallback ID có thực sự random-per-browser (khác nhau giữa các visitor cùng thiết bị) thay vì suy từ device-info không? Cần re-verify bằng >=1/13 test case Testlane task TIB-116 (TC-TIB-3296..TC-TIB-3308, hiện 0/13 đã chạy) PASS đúng hành vi tương ứng trước khi coi đây là capability đã hoạt động.",
  "related": "CHK-019 (genai-personalization-runtime), KB-050"
}
```

## OQ-sdk-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] KB-050 phần 2 (fix TIB-5460, ĐANG QA Review, CHƯA SHIP): sau khi ticket ship, request GET /merchant/{platform}/thumbmark có thực sự fire ngay khi page load (thay vì lazy khi upload đầu tiên như hiện tại) không? Chưa có môi trường nào để quan sát timing thật tại thời điểm ghi nhận (2026-09-28).",
  "related": "CHK-020 (genai-personalization-runtime), KB-050"
}
```

## OQ-sdk-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] KB-050 phần 3 (fix TIB-5460, ĐANG QA Review, CHƯA SHIP): sau khi ticket ship, SDK có retry đúng 1 lần khi network-error/5xx lúc fetch thumbmark, và KHÔNG retry khi 429 không? Chưa verify được logic retry thật tại thời điểm ghi nhận.",
  "related": "CHK-021 (genai-personalization-runtime), KB-050"
}
```

## OQ-sdk-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-sdk-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] End-to-end re-verify sau khi TIB-5460 ship: lặp lại đúng fixture đã dùng để phát hiện collision fallback-ID (KB-049, CHK-018) — collision còn tái diễn không? Phụ thuộc CẢ 2 điều kiện: CHK-018 đã chạy ít nhất 1 lần để có baseline 'trước fix', VÀ TIB-5460 đã ship — hiện CẢ 2 đều chưa thoả.",
  "related": "CHK-022 (genai-personalization-runtime), KB-050, KB-049"
}
```

## OQ-sdk-049 — OPEN_ISSUE

```json
{
  "oq_id": "OQ-sdk-049",
  "type": "OPEN_ISSUE",
  "feature_id": "genai-personalization-runtime",
  "summary": "[CCR CBS-005/TIB-5460] Follow-up chưa có ticket con Jira riêng: endpoint issuance thumbmark (GET /merchant/{platform}/thumbmark) rate-limit theo IP (không theo shop/visitor) — dev tự nêu (hedged, dùng từ 'occasionally'), buyer đứng sau CGNAT/mobile carrier share IP có thể VẪN OCCASIONALLY rơi vào dùng ID fallback (KB-049) dù fix TIB-5460 (KB-050) đã ship. Giá trị cụ thể (số lượt/window) của rate-limit theo IP CHƯA được Dev nêu rõ. Khuyến khích người gửi CCR/PO tạo ticket con Jira riêng để theo dõi độc lập với TIB-5460.",
  "related": "CHK-023 (genai-personalization-runtime), KB-052"
}
```

