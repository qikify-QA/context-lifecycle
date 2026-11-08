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

## OQ-sdk-050 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-050", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Các hành vi SDK về translations nạp từ CCR CBS-001 (KB-053..KB-060) mới được verify trên staging cho TIB-5352 (Jira status QA Review, 3 PR còn OPEN, chỉ deploy staging); chưa release production. Cần re-verify (hoặc xác nhận) sau khi TIB-5352 lên production; trong lúc đó không dùng các item này để đánh giá hành vi production.", "kb_ids": ["KB-053", "KB-054", "KB-055", "KB-056", "KB-057", "KB-058", "KB-059", "KB-060"]}
```

## OQ-sdk-051 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-051", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Fallback chữ gốc khi API translations trả 500/503 hoặc bị abort (KB-054) chỉ quan sát trong test case FAILED TC-TIB-4696; cần test PASS hoặc Dev/PO xác nhận trước khi làm oracle.", "kb_ids": ["KB-054"]}
```

## OQ-sdk-052 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-052", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Khi translations API timeout, console có pageerror 'signal is aborted without reason' (KB-055). CCR 4.2 nói không coi đây là hành vi mong muốn. Cần Dev xác nhận đây là lỗi cần sửa hay chấp nhận được.", "kb_ids": ["KB-055"]}
```

## OQ-sdk-053 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-053", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Thiết kế retry khi fetch translations lỗi: staging quan sát retry lazy (tối đa 2 fetch, lần 2 chỉ ở lần gọi kế tiếp trong cùng page session, không retry khi load trang — KB-057), trong khi Dev mô tả 'SDK chỉ thử lại đúng 1 lần' không nêu điều kiện và test case TC-TIB-4696 FAILED vì kỳ vọng '1 retry khi load'. Cần Dev xác nhận hành vi retry mong muốn.", "kb_ids": ["KB-057"]}
```

## OQ-sdk-054 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-054", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Dictionary inline chỉ in 1 lần trong HTML /zh-zh/ (KB-059); điều kiện 'trang render cả theme app extension và theme script' (KB-060) chỉ suy từ dấu hiệu HTML, chưa mở theme editor xác nhận cấu hình. Cần owner chấp nhận dấu hiệu HTML, hoặc chạy lại với cấu hình theme đã xác nhận.", "kb_ids": ["KB-059", "KB-060"]}
```

## OQ-sdk-055 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-055", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Mốc 5 giây (timeout headers đọc từ bundle, KB-056) có phải ngưỡng chính thức không, và widget hiển thị gì khi response translations đến ngay dưới 5 giây?", "kb_ids": ["KB-056", "KB-053"]}
```

## OQ-sdk-056 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-056", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Chưa kiểm trường hợp translations API timeout lúc load rồi buyer gọi lần thứ hai trong cùng page session (vd 'Edit design' trong cart): widget có lấy được bản dịch không hay vẫn hiện chữ gốc?", "kb_ids": ["KB-057"]}
```

## OQ-sdk-057 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-057", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Mọi evidence về fallback/retry/nhãn thiếu của translations (KB-053..KB-058) đến từ bundle app-v1.js; bundle app-v2.js chưa được kiểm.", "kb_ids": ["KB-053", "KB-054", "KB-055", "KB-056", "KB-057", "KB-058"]}
```

## OQ-sdk-058 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-058", "type": "NEEDS_CONFIRMATION", "feature_id": "open-platform-customization-callback", "summary": "Với customization từ 2 artwork trở lên: design_urls có đúng 1 phần tử cho mỗi artwork không, thứ tự có theo thứ tự artwork trong form không, mỗi URL có lấy đuôi theo design_format riêng của artwork khi các artwork khác định dạng không, và nền tảng có cho phép design_format khác nhau trong cùng customization không? Mới verify được trường hợp 1 artwork (KB-061); phần nhiều artwork chỉ đọc từ bundle (KB-062), các test case nhiều artwork đều skipped.", "kb_ids": ["KB-062"]}
```

## OQ-sdk-059 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-059", "type": "NEEDS_CONFIRMATION", "feature_id": "open-platform-customization-callback", "summary": "Khi 1 artwork trong customization nhiều artwork tạo design thất bại, design_urls xử lý thế nào (bỏ phần tử, null, cờ lỗi, hay chặn cả payload)? Yêu cầu không định nghĩa, test case tương ứng skipped.", "kb_ids": ["KB-062"]}
```

## OQ-sdk-060 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-060", "type": "NEEDS_CONFIRMATION", "feature_id": "open-platform-customization-callback", "summary": "Bảng ánh xạ design_format → đuôi file của open-platform SDK (svg, eps, ai, jpeg, jpeg_cmyk*, pdf giữ định dạng; còn lại mặc định png) có đúng là hành vi chủ đích không? Mới quan sát nhánh 'rgb' → .png; phần còn lại chỉ đọc từ bundle (KB-063).", "kb_ids": ["KB-063"]}
```

## OQ-sdk-061 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-061", "type": "NEEDS_CONFIRMATION", "feature_id": "open-platform-customization-callback", "summary": "Khi widget open-platform chạy trong iframe, payload (kể cả design_urls) có được gửi tới trang cha qua window.parent.postMessage không, và payload đầy đủ gồm những key nào? Mới quan sát nhánh gọi trực tiếp window.teeinblue.onCustomizationCreated (KB-064).", "kb_ids": ["KB-064"]}
```

## OQ-sdk-062 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-062", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Bundle Shopify theme-embed app-v1.js không có design_urls / onCustomizationCreated, và hằng EVENT_CUSTOMIZATION_CREATED được định nghĩa nhưng không được dispatch (KB-065). Đây là phạm vi chủ đích của TIB-5427 (chỉ open-platform) hay là thiếu sót cần bổ sung cho kênh theme-embed? Cần Dev/PO trả lời.", "kb_ids": ["KB-065", "KB-009"]}
```

## OQ-sdk-063 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-063", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Bundle app-v2.js có giống app-v1.js về design_urls / onCustomizationCreated / EVENT_CUSTOMIZATION_CREATED không? KB-065 chỉ kiểm app-v1.js, trong khi store đang serve app-v2.js (KB-040).", "kb_ids": ["KB-065", "KB-040"]}
```

## OQ-sdk-064 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-064", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Ở kênh theme-embed, cart line-item property _tib_design_link_N (KB-009) có phải cơ chế giao design link theo từng artwork duy nhất không? Điều này mới chỉ suy ra từ việc grep bundle không thấy cơ chế khác.", "kb_ids": ["KB-065", "KB-009"]}
```

## OQ-sdk-065 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-065", "type": "OPEN_ISSUE", "feature_id": "open-platform-customization-callback", "summary": "Kiểm soát truy cập của design URL trả trong design_urls/design_url chưa có kết luận: test case bảo mật (một design URL có dùng được để lần ra design của customization khác hay không) đang bị chặn chờ PO/Dev. Chưa có oracle cho chiều PERMISSION của feature này.", "kb_ids": ["KB-061"]}
```

## OQ-sdk-066 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-066", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "'teeinblue-customizations' giữ tối đa bao nhiêu entry (người chạy test ghi khoảng 10, chưa đếm độc lập) và entry bị loại theo tiêu chí nào — timestamp cũ nhất hay thứ tự thêm? Check về draft localStorage khi buyer thao tác nhiều product cần biết giới hạn và thứ tự loại chính xác; hiện chỉ có 1 lượt quan sát, chưa có nguồn dev/spec.", "kb_ids": ["KB-066"]}
```

## OQ-sdk-067 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-067", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Giới hạn khoảng 10 entry có áp dụng cho key đồng hành 'teeinblue-global-options' và cho cả hai bundle app-v1.js / app-v2.js không? Quan sát KB-066 không ghi bundle/SDK version của store test và chỉ nói về 'teeinblue-customizations'; không được suy giới hạn sang key hay bundle khác khi viết check.", "kb_ids": ["KB-066", "KB-015"]}
```

## OQ-sdk-068 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-068", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Known defect BUG-321..324: field required trong Group ẩn vẫn chặn Add to cart (TC-TIB-6064 Fail 2026-10-16). Testlane hiện ghi passed và bugId đã bị gỡ khỏi case nhưng không có lần chạy lại có ngày. Bug đã fix chưa, fix trên build nào? Cần chạy lại TC-TIB-6063/6064 có ngày + build.", "kb_ids": ["KB-179"]}
```

## OQ-sdk-069 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-069", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Known defect BUG-321: field của layer con trong Group ẩn vẫn có trong form storefront, kể cả khi condition buyer-side thoả (TC-TIB-6066, TC-TIB-6067 Fail 2026-10-16; ghi chú '=>> Do bị cache' không có ngày chạy lại; TC-TIB-6065 rỗng). Đã fix chưa? Cần chạy lại có ngày; tách riêng hiệu ứng 'Show this layer on first load' khỏi condition.", "kb_ids": ["KB-180"]}
```

## OQ-sdk-070 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-070", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Hành vi đúng của form cá nhân hoá storefront khi artwork có Group ẩn là gì — form không có field của layer trong Group ẩn, required của các field đó không chặn Add to cart, condition trỏ vào layer ẩn hiệu dụng không bao giờ pass (như QA plan/ticket của dev mô tả) — PO có xác nhận không?", "kb_ids": ["KB-179", "KB-180"]}
```

## OQ-sdk-071 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-071", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Layer con bật 'Show this layer on first load' dưới Group ẩn, khi không gắn condition, phải hiện hay không ở lần load đầu, và có field trong form không? (lượt 2026-10-16 không hiện nhưng layer đó còn gắn condition nên chưa tách được hiệu ứng)", "kb_ids": []}
```

## OQ-sdk-072 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-072", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Buyer preview storefront theo effective visibility (TC-TIB-6068) có giữ nguyên trên build staging sau khi toàn bộ 6 PR của TIB-5584 merge, trên production khi TIB-5584 release, và trên cả hai bundle app-v1.js / app-v2.js không?", "kb_ids": ["KB-181"]}
```

## OQ-sdk-073 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-073", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Với 'Hide this layer on first load' TẮT và nguồn chưa trả lời, layer action Hide có hiện trên artwork preview trên build đã merge không? Nhánh này chỉ có tài liệu dev viết trước khi code còn đổi, chưa test case nào kiểm.", "kb_ids": ["KB-233"]}
```

## OQ-sdk-074 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-074", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "PO xác nhận trên build đã merge: điều kiện có nguồn đang bị ẩn được tính là không khớp, linked layer đi theo hiển thị cuối của layer gốc, điều kiện 2 cấp lan theo — và 'nguồn bị ẩn' có bao gồm nguồn nằm trong Group ẩn không (giao với known defect KB-180)? Chỉ có nguồn tài liệu dev.", "kb_ids": ["KB-235"]}
```

## OQ-sdk-075 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-075", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Layer không điều kiện và layer Show có giữ nguyên hành vi trên SDK đã có code Hide (bản từ 2026-10-28 03:01:11 GMT hoặc build đã merge) không? Test case regression mới chạy trên SDK cũ.", "kb_ids": ["KB-236"]}
```

## OQ-sdk-076 — NEEDS_CONFIRMATION

```json
{"oq_id": "OQ-sdk-076", "type": "NEEDS_CONFIRMATION", "feature_id": "storefront-buyer-facing", "summary": "Sau khi deploy production, storefront có thể chạy SDK cũ đã cache trong bao lâu (max-age=14400 hay khác), trong thời gian đó layer Hide hiển thị thế nào (một lượt quan sát cho thấy đảo chiều, BUG-429), và có cần cảnh báo merchant không?", "kb_ids": ["KB-237"]}
```

## OQ-sdk-077 — OPEN_ISSUE

```json
{"oq_id": "OQ-sdk-077", "type": "OPEN_ISSUE", "feature_id": "storefront-buyer-facing", "summary": "Các rule Hide trên storefront (KB-231, KB-232, KB-234) có giữ nguyên trên build staging sau khi 6 PR của TIB-5558 merge (2026-10-29), trên production khi TIB-5558 release, và trên bundle app-v1.js không? Lượt PASS duy nhất chạy trước khi merge, chỉ trên app-v2.js.", "kb_ids": ["KB-231", "KB-232", "KB-234"]}
```

## OQ-sdk-078 — CONFLICT

```json
{"oq_id":"OQ-sdk-078","type":"CONFLICT","feature_id":"product-page-settings-config","summary":"Chuỗi label của setting lọc media theo variant đang chọn mâu thuẫn giữa hai nguồn; teeinblue không tự supersede nên KB-025 và KB-318 đều UNRESOLVED, CHK-003 không có oracle cho tới khi PO chọn: (a) thay chuỗi trong KB-025 bằng KB-318, (b) giữ cả hai như hai thời điểm (thu phạm vi KB-025 thành 'trước tính năng gán video'), hay (c) giữ base. Chỉ phần chuỗi label bị tranh chấp; các giá trị control khác trong KB-025 không bị claim chạm.","kb_ids":["KB-025","KB-318"],"side_a":"KB-025 (base, quan sát 2026-09-21 trên store1/store2): label là 'Show only the assigned images of the selected variant'.","side_b":"KB-318 (test case PASS 2026-10-22, staging, trước khi các PR merge): label là 'Show only the assigned images and videos of the selected variant' và trang không còn chuỗi cũ."}
```

## OQ-sdk-079 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-079","type":"NEEDS_CONFIRMATION","feature_id":"product-page-settings-config","summary":"Dev xác nhận config key của setting lọc media theo variant vẫn là show_assigned_variant_images_only sau khi tính năng mở rộng sang video (bản đã merge). Mới chỉ thấy trong actualResult.","kb_ids":["KB-319"]}
```

## OQ-sdk-080 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-080","type":"OPEN_ISSUE","feature_id":"product-page-settings-config","summary":"Kết quả kiểm label của setting lọc media theo variant (TC-TIB-6423) chỉ có một lượt PASS trên staging 2026-10-22, trước khi 4 PR của TIB-5428 merge (2026-10-27); cần chạy lại trên bản đã merge / production (sau khi PO chốt conflict label).","kb_ids":["KB-318"]}
```

## OQ-sdk-081 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-081","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO/dev xác nhận: đổi assignment mockup/video ↔ variant có chủ ý cần Update/Sync campaign thì storefront mới phản ánh không? Mới chỉ là ghi chú trong actualResult.","kb_ids":["KB-321"]}
```

## OQ-sdk-082 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-082","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"Lỗi đã biết BUG-359: video bật 'Always load first' chỉ được focus nhưng vẫn ở vị trí thứ 2 trong gallery. Đã fix/retest chưa, trên bản nào? KB-327 không làm oracle.","kb_ids":["KB-327"]}
```

## OQ-sdk-083 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-083","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO xác nhận: video bật 'Always load first' và được gán cho variant đang chọn có phải đứng đầu gallery và là item focus không? Một trao đổi nội bộ có nêu như vậy nhưng chưa phải nguồn xác nhận; sau khi fix BUG-359 cần chạy lại case tương ứng.","kb_ids":["KB-327"]}
```

## OQ-sdk-084 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-084","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO xác nhận ý định (ảnh hưởng đơn hàng/fulfillment): khi variant chỉ được gán video, form cá nhân hoá và design của đơn hàng hoạt động thế nào? KB-323 chỉ xác nhận gallery và khu vực preview.","kb_ids":["KB-323"]}
```

## OQ-sdk-085 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-085","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"Các rule gallery theo variant (KB-320, KB-322..KB-326) chỉ có lượt PASS trên staging 2026-10-22, trước khi 4 PR của TIB-5428 merge (2026-10-27); cần chạy lại trên bản đã merge, production và từng bundle SDK.","kb_ids":["KB-320","KB-322","KB-323","KB-324","KB-325","KB-326"]}
```

## OQ-sdk-086 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-086","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Chạy lại sau merge/production: mọi quan sát và lượt PASS của TIB-5203 (payload campaign v2 + cache) đều chạy trên staging ngày 2026-10-28, TRƯỚC khi 2 PR merge 2026-10-29; chưa rõ dev có đẩy commit sau ~10:30 UTC không; production chưa kiểm. Cần chạy lại TC-TIB-7507 (shape response: có resource_type, không còn các field đã bỏ) trên build sau merge và trên production để xác nhận hành vi đã ship.","kb_ids":["KB-350","KB-352"]}
```

## OQ-sdk-087 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-087","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Response campaigns/{id}.json đã bỏ một số field (theo TC-TIB-7507). Chưa ai kiểm consumer nào khác (theme custom, renderer, public API) còn đọc các field đã bỏ — Dev/PO xác nhận không có consumer nào bị ảnh hưởng.","kb_ids":["KB-352"]}
```

## OQ-sdk-088 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-088","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Tập giá trị chính thức của resource_type (mới thấy \"campaign\" / \"platform_product\" ở 1 lượt chạy trước redeploy; TC-TIB-7507 không kiểm giá trị) — Dev xác nhận và chạy lại trên build đã merge.","kb_ids":["KB-351"]}
```

## OQ-sdk-089 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-089","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Danh sách key artworks[] chính thức của payload platform product sau thay đổi TIB-5203 — mới chỉ thấy trong actualResult của 1 lượt test.","kb_ids":["KB-353"]}
```

## OQ-sdk-090 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-090","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Shape artworks[]: URL v mới chỉ còn global_option_ids, nhưng URL ?v=1 SDK gọi vẫn có artworks[].global_options (BUG-437). Dev/PO xác nhận shape đúng và trạng thái BUG-437 (sửa/hoãn/chấp nhận); chạy lại trên URL SDK thật sau merge.","kb_ids":["KB-354"]}
```

## OQ-sdk-091 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-091","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"SDK được quan sát lấy platform product qua campaigns/{shopify product id}.json, lệch với kịch bản kiểm thử của dev (platform-products/{uuid}.json). Dev xác nhận endpoint chính thức và platform-products/{uuid}.json còn dùng ở trường hợp nào.","kb_ids":["KB-355"]}
```

## OQ-sdk-092 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-092","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO quyết ý định: sau Save artwork + Update/Sync campaign, URL ?v=1 SDK gọi vẫn trả bản cũ (BUG-446) trong khi URL v mới trả bản mới — storefront phải hiện thay đổi ngay hay chấp nhận độ trễ cache (bao lâu)? Rủi ro: buyer đặt hàng với design cũ. Trạng thái BUG-446 chưa rõ dù Jira Done. KB-321 (storefront phản ánh sau Update/Sync, quan sát 2026-10-22 trước khi có cache) có thể đã cũ — cần re-verify trên build sau merge.","kb_ids":["KB-356","KB-321"]}
```

## OQ-sdk-093 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-093","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO quyết ý định: sau sửa + Publish platform product, URL ?v=1 SDK gọi vẫn trả bản cũ (BUG-439) — đây là độ trễ cache chấp nhận được hay lỗi? Trạng thái BUG-439 chưa rõ; chạy lại sau merge.","kb_ids":["KB-357"]}
```

## OQ-sdk-094 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-094","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Nhóm hành vi form storefront với Global Option (form tải đủ, giống hệt sau reload, preview + payload customization, 2 layer dùng chung GO chỉ gửi 1 giá trị, GO tự điền khi mở campaign khác cùng trình duyệt) mới chỉ quan sát 1 lượt trên build trước redeploy mà dev yêu cầu recheck. Chạy lại trên build đã merge TIB-5203 và PO/Dev xác nhận đây là hành vi đúng.","kb_ids":["KB-358","KB-359","KB-360","KB-361","KB-362"]}
```

## OQ-sdk-095 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-095","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Campaign không dùng Global Option (1 input text): form chỉ có input thường và giá trị text còn sau reload — mới quan sát 1 lượt trước redeploy. Chạy lại sau merge và xác nhận hành vi đúng; lưu ý KB-019 (form template không khôi phục lựa chọn sau reload) là phạm vi khác (field phụ thuộc template).","kb_ids":["KB-363"]}
```

## OQ-sdk-096 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-096","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"Theo dõi BUG-310: trang storefront thật của platform product không render form personalization (console SyntaxError / \"TypeError: e is not iterable\"; tester ghi nguyên nhân là tên category chứa <script> không được escape — rủi ro XSS, buyer không mua được). Trạng thái fix chưa rõ; sau khi sửa cần chạy lại trên trang thật để cập nhật/retire KB-364. PO/Dev cho biết trạng thái và mức ưu tiên.","kb_ids":["KB-364"]}
```

## OQ-sdk-097 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-097","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Form platform product mới chỉ được thấy render trên HTML đã patch (né BUG-310); chưa có quan sát trên trang thật. Chạy lại trên trang thật (sau khi BUG-310 được xử lý hoặc với category sạch) trên build đã merge.","kb_ids":["KB-365"]}
```

## OQ-sdk-098 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-098","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Request /products/<id>.js trả 404 mỗi lần load campaign — chưa rõ là gì, có từ trước TIB-5203 không, và có phải lỗi cần theo dõi không.","kb_ids":["KB-366"]}
```

## OQ-sdk-099 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-099","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO/Dev xác nhận config.maps_api_key (Mapbox, tiền tố 'pk.') được phép xuất hiện trong response public không cần auth của campaigns/{id}.json; nếu chính sách là không public key nào thì đây là lỗi.","kb_ids":["KB-367"]}
```

## OQ-sdk-100 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-100","type":"NEEDS_CONFIRMATION","feature_id":"product-page-settings-config","summary":"PO quyết ý định: sau đổi setting store (PUT /api/instances/{id}/config 200), config trong URL SDK ?v=1 và link preload vẫn trả giá trị cũ (BUG-440) — setting phải áp dụng ngay sau reload hay chấp nhận độ trễ cache (bao lâu)? Trạng thái BUG-440 chưa rõ. KB-319 (quan sát 2026-10-22 trước khi có cache) có thể đã cũ — re-verify sau merge.","kb_ids":["KB-368","KB-319"]}
```

## OQ-sdk-101 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-101","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Storefront preview của sản phẩm có Group khoảng 250 layer: TC-TIB-7632 chỉ đếm DOM toàn trang, không tách popup Preview khỏi mockup chính, không so với trước fix. Cần kiểm lại phần tử thuộc popup Preview. Không dùng quan sát này để giải conflict của KB-011 hay thay mô tả KB-042.","kb_ids":["KB-394"]}
```

## OQ-sdk-102 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-102","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"Chạy lại sau merge và trên production cho storefront preview của sản phẩm có Group nhiều layer (lượt chạy 2026-10-29 trước khi PR thứ hai của TIB-5633 cập nhật lần cuối; ngày deploy production chưa rõ).","kb_ids":["KB-394"]}
```

## OQ-sdk-103 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-103","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Strava (route maps, strava-upload) có chạy được trên staging không, và trên production thế nào?","kb_ids":["KB-409"]}
```

## OQ-sdk-104 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-104","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"photo_endpoint=snap: Portal có setting nào cho giá trị này không, ai set được, URL snap trên staging có trùng URL photo-api không, và trên production trỏ đâu?","kb_ids":["KB-410"]}
```

## OQ-sdk-105 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-105","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Trên staging, photo-api và preconnect cdn có còn trỏ host production không, và ai được kiểm phía production? Config teeinblue cấm môi trường production, nên how_to_test của KB-411 chưa có người thực hiện.","kb_ids":["KB-411"]}
```

## OQ-sdk-106 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-106","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Số đo preconnect, connection reuse, TTFB có phải kết luận trên Chrome thật thay vì headless không, và quy tắc này áp cho những check nào?","kb_ids":["KB-412"]}
```

## OQ-sdk-107 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-107","type":"NEEDS_CONFIRMATION","feature_id":"required-addon-validation","summary":"Vế \"tab cũ, add-on từ hết hàng thành có hàng, SDK vẫn chặn ATC tới khi reload\" của KB-442 (TIB-5510 #55732, 2026-10-27) có chỉ đúng khi store đã đặt blockAtcUnavailableAddon = true không, sau khi #56209 (2026-11-02) đổi mặc định thành tắt?","kb_ids":["KB-442","KB-443"]}
```

## OQ-sdk-108 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-108","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Endpoint upload nào trả Retry-After, và endpoint nào expose header đó qua CORS?","kb_ids":["KB-451"]}
```

## OQ-sdk-109 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-109","type":"NEEDS_CONFIRMATION","feature_id":"required-addon-validation","summary":"Store chưa đặt blockAtcUnavailableAddon (mặc định tắt, KB-443), add-on hết hàng: bấm ATC thì sản phẩm chính có vào giỏ không, có message gì không, và buyer bị chặn ở đâu?","kb_ids":["KB-443"]}
```

## OQ-sdk-110 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-110","type":"NEEDS_CONFIRMATION","feature_id":"required-addon-validation","summary":"Function kiểm add-on đối chiếu child line bằng property nào: _tib_customization_id (KB-416) và _customization_id (KB-009, quan sát 2026-09-12 trên sản phẩm không nêu add-on) là hai property khác nhau hay cùng một property bị lệch tên?","kb_ids":["KB-416","KB-009"]}
```

## OQ-sdk-111 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-111","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Portal hiện có block General error messages với key request_rate_limited, request_rate_limited_retry_after trong product page content không? KB-449 (TIB-5539 #55557, 2026-10-23) nói có; KB-002 của object translation (2026-09-21) liệt kê 21 section không có block này.","kb_ids":["KB-449"]}
```

## OQ-sdk-112 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-112","type":"NEEDS_CONFIRMATION","feature_id":"form-artwork-navigation","summary":"Đổi toggle hoặc tên menu của Quick navigation thì URL SDK campaigns/{id}.json?v=1 có trả giá trị mới ngay không? KB-427 (TIB-5349 #52793, 2026-09-30, PR còn mở) nói cache được xoá ngay; KB-356, KB-357, KB-368 (2026-10-28) thấy URL này vẫn trả bản cũ sau các thao tác khác.","kb_ids":["KB-427","KB-356","KB-357","KB-368"]}
```

## OQ-sdk-113 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-113","type":"NEEDS_CONFIRMATION","feature_id":"form-artwork-navigation","summary":"Hàm xoá cache campaign dùng chung của KB-435 có xoá cache mà URL SDK ?v=1 đọc không, và có chạy với campaign có store liên kết đầy đủ không? KB-356 (2026-10-28) thấy URL này trả bản cũ sau sửa artwork + sync.","kb_ids":["KB-435","KB-356","KB-357"]}
```

## OQ-sdk-114 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-114","type":"OPEN_ISSUE","feature_id":"required-addon-validation","summary":"Điều kiện để rule Checkout (Function kiểm add-on, Lớp 2) chạy là gì? Comment dev TIB-5510 #55071 ghi cần kích hoạt rule trong Settings > Checkout, nhưng điều này chưa có trong KB. Rule đó bật ở đâu, và có điều kiện nào khác không?","kb_ids":["KB-416","KB-417"]}
```

## OQ-sdk-115 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-115","type":"OPEN_ISSUE","feature_id":"form-artwork-navigation","summary":"TIB-5349 merge và deploy lên staging ở build nào, ngày nào, và đã lên production chưa? Nguồn không nêu build và ngày deploy, nên chưa rõ 16 item của ticket này đã ship hay chưa. Comment nguồn #52793 ghi PR đang mở lúc viết.","kb_ids":["KB-413","KB-414","KB-422","KB-423","KB-424","KB-425","KB-426","KB-427","KB-428","KB-429","KB-430","KB-431","KB-432","KB-433","KB-434","KB-435"]}
```

## OQ-sdk-116 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-116","type":"OPEN_ISSUE","feature_id":"required-addon-validation","summary":"TIB-5510 merge và deploy lên staging ở build nào, ngày nào, và đã lên production chưa? Nguồn không nêu build và ngày deploy, nên chưa rõ 13 item của ticket này đã ship hay chưa.","kb_ids":["KB-416","KB-417","KB-437","KB-438","KB-439","KB-440","KB-441","KB-442","KB-443","KB-444","KB-445","KB-446","KB-455"]}
```

## OQ-sdk-117 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-117","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"TIB-5539 merge và deploy lên staging ở build nào, ngày nào, và đã lên production chưa? Nguồn không nêu build và ngày deploy, nên chưa rõ 7 item của ticket này đã ship hay chưa.","kb_ids":["KB-418","KB-419","KB-447","KB-448","KB-449","KB-450","KB-451"]}
```

## OQ-sdk-118 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-118","type":"OPEN_ISSUE","feature_id":"storefront-buyer-facing","summary":"TIB-5418 merge và deploy lên staging ở build nào, ngày nào, và đã lên production chưa? Nguồn không nêu build và ngày deploy, nên chưa rõ 6 item của ticket này đã ship hay chưa.","kb_ids":["KB-408","KB-420","KB-421","KB-452","KB-453","KB-454"]}
```

## OQ-sdk-119 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-119","type":"OPEN_ISSUE","feature_id":"genai-personalization-runtime","summary":"TIB-5583 merge và deploy lên staging ở build nào, ngày nào, và đã lên production chưa? Nguồn không nêu build và ngày deploy, nên chưa rõ 2 item của ticket này đã ship hay chưa.","kb_ids":["KB-415","KB-436"]}
```

## OQ-sdk-120 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-120","type":"NEEDS_CONFIRMATION","feature_id":"required-addon-validation","summary":"PO xác nhận ý định: đơn thiếu add-on hoặc add-on không đủ số lượng (parentQuantity * rate) phải bị chặn hoàn tất ở Checkout đúng như KB-416, KB-417 không? Hai item chạm đơn hàng, chỉ có nguồn dev.","kb_ids":["KB-416","KB-417"]}
```

## OQ-sdk-121 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-121","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"PO xác nhận ý định: popup cross-sell, khi tổ hợp option không tồn tại, phải tự chuyển sang variant có thật và luôn hiện giá thực của variant đó như KB-452 không? Item chạm giá, chỉ có nguồn dev.","kb_ids":["KB-452"]}
```

## OQ-sdk-122 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-122","type":"NEEDS_CONFIRMATION","feature_id":"form-artwork-navigation","summary":"Nhập quá 255 ký tự vào ô Menu Item's name thì ô chặn gõ hay báo lỗi khi lưu, và lỗi hiện ra thế nào?","kb_ids":["KB-431"]}
```

## OQ-sdk-123 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-123","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Nguyên văn mặc định của câu chung 429, câu 429 có thời gian, câu lỗi mạng và câu lỗi upload chung là gì? KB không có text, nên các check chỉ nêu được loại câu.","kb_ids":["KB-418","KB-447","KB-450","KB-451"]}
```

## OQ-sdk-124 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-124","type":"NEEDS_CONFIRMATION","feature_id":"storefront-buyer-facing","summary":"Cần cấu hình gì để popup cross-sell hiện trên storefront (ngoài checkbox Show Cross-sell Personalization của KB-028)? KB chưa có setup này.","kb_ids":["KB-420","KB-421"]}
```

## OQ-sdk-125 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-125","type":"NEEDS_CONFIRMATION","feature_id":"required-addon-validation","summary":"\"Áp dụng cho tất cả merchant\" của KB-455 (TIB-5510 #55732, 2026-10-27) còn đúng cho cả chặn ATC ở SDK và rule Checkout không, hay chỉ còn đúng cho rule Checkout, sau khi #56209 (2026-11-02, KB-443) đổi chặn ATC ở SDK thành mặc định tắt cho toàn bộ store?","kb_ids":["KB-455","KB-443"]}
```

## OQ-sdk-126 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-126","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Hành vi migration (successor, giữ cài đặt khác, picker disable model cũ) mới chỉ quan sát một lượt chạy QA-3408 TC-07/TC-14 không ghi build; chưa có nguồn xác nhận expected. Nếu PO coi việc migration tự đổi model đã lưu của merchant là thay đổi dữ liệu nhạy cảm thì cần nâng impact lên HIGH và hỏi owner.","kb_ids":["KB-458"],"needs":"Dev hoặc PO xác nhận nguyên văn hành vi migration, hoặc test case chạy lại có build ghi rõ."}
```

## OQ-sdk-127 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-127","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Model mặc định khi lưu không chọn model chỉ quan sát phía sau ngày migrate (QA-3408 TC-05), build không ghi; phía trước ngày migrate chưa test.","kb_ids":["KB-462"],"needs":"Dev hoặc PO xác nhận quy tắc model mặc định trước và sau ngày migrate; chạy lại phía trước ngày migrate."}
```

## OQ-sdk-128 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-128","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Validate key với model retired trả code model_retired và không chọn model thì validate theo model mặc định: chỉ có quan sát QA-3408 TC-06/TC-22, không có căn cứ expected, build không ghi.","kb_ids":["KB-463"],"needs":"Dev hoặc PO xác nhận response mong muốn của Validate key với model retired và khi không gửi model."}
```

## OQ-sdk-129 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-129","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Request lưu từ tab cũ còn gửi model retired: quan sát 200, lưu cài đặt khác, giữ model (QA-3408 TC-20), không có căn cứ expected.","kb_ids":["KB-465"],"needs":"Dev hoặc PO xác nhận đây là hành vi mong muốn của save rule sau ngày migrate."}
```

## OQ-sdk-130 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-130","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"API lưu Gen AI Effects đang nhận mọi giá trị model (id lạ, script, SQL/NoSQL) với 200 và lưu nguyên văn. Dev xác nhận ticket không đổi hành vi này, nhưng đó không phải mong muốn. Có nên chặn giá trị model không hợp lệ bằng 4xx không?","kb_ids":["KB-467"],"needs":"PO quyết có chặn 4xx cho giá trị model không hợp lệ (và theo ticket nào); đến lúc đó item không dùng làm expected."}
```

## OQ-sdk-131 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-131","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Toggle auto-switch (nhãn, mô tả, mặc định OFF, lưu/giữ sau reload) khớp spec PO trong description TIB-5554 theo đối chiếu, nhưng CCR không trích spec và build không ghi; mới là quan sát QA-3408 TC-01/TC-02.","kb_ids":["KB-469"],"needs":"Trích nguyên văn spec PO (label, Default state OFF, description) kèm ngày, hoặc test case chạy lại có build."}
```

## OQ-sdk-132 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-132","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Phạm vi toggle auto-switch: hiện tại 1 toggle cho mọi provider GenAI (1 field genai_auto_fallback), trong khi spec PO ghi \"applies to the account's active AI service and model\". Ý định là toggle theo service/model đang active hay 1 toggle cho mọi provider?","kb_ids":["KB-470"],"needs":"PO chốt phạm vi toggle."}
```

## OQ-sdk-133 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-133","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Id lưu nano_banana_21 của Nano Banana 2.1 chỉ là quan sát (QA-3442 TC-01), không có căn cứ expected.","kb_ids":["KB-471"],"needs":"Dev xác nhận id lưu của Nano Banana 2.1."}
```

## OQ-sdk-134 — CONFLICT

```json
{"oq_id":"OQ-sdk-134","type":"CONFLICT","feature_id":"genai-model-settings","summary":"Model Gemini sau migration: global-option/KB-031 (quan sát 2026-09-16, trước khi TIB-5554 ship) ghi job generate trả model='nano_banana' và global-option CHK-02-011 expect model='nano_banana'; sdk KB-459 (dev, Jira TIB-5554 comment #54687 Q9, 2026-10-15) nói account ở nano_banana được chuyển sang nano_banana_31. Lưu ý: \"KB-031\" ở đây là của object global-option, không phải sdk KB-031. Có thể chỉ là hai mốc thời gian khác nhau (giá trị cũ nano_banana khớp vế đầu của KB-459); điểm lệch thực là CHK-02-011 có còn đúng sau migrate_at không, chưa ai chạy lại sau 2026-10-16. Phía global-option chưa được đánh dấu vì object đó ngoài lock của run này.","kb_ids":["KB-459"],"needs":"PO quyết; hoặc một run có lock object global-option cập nhật KB-031 / CHK-02-011 theo model sau migration.","conflict_group":"CONF-CBS089-01","side_a":"global-option/KB-031 (feature artwork-personalization-global-option-link): job generate GO#862 trả model='nano_banana' (OBSERVED_CURRENT, LOW, 1 mẫu, 2026-09-16); global-option CHK-02-011 expect model='nano_banana'.","side_b":"sdk KB-459: giá trị lưu Gemini cũ là nano_banana, account ở nano_banana được chuyển sang nano_banana_31 (CONFIRMED_EXPECTED, po_dev_confirm 2026-10-15)."}
```

## OQ-sdk-135 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-135","type":"OPEN_ISSUE","feature_id":"genai-model-settings","summary":"migrated_at sau lượt chạy sạch và known limitation (account bị ép về model retired, email lần hai) chưa có người xác nhận, test case chưa chạy. Claim trong CCR thiếu người xác nhận nên chưa có KB item.","kb_ids":[],"needs":"Dev hoặc PO xác nhận nguyên văn, hoặc chạy TC-09/12/13/17 của QA-3408."}
```

## OQ-sdk-136 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-136","type":"OPEN_ISSUE","feature_id":"genai-model-settings","summary":"Từ ngày migrate chọn model retired bị 422 + toast retired: dev nói 422 nhưng QA-3408 TC-18, TC-21 (2026-10-16) ra 200. Claim trong CCR thiếu người xác nhận nên chưa có KB item.","kb_ids":[],"needs":"Dev nêu trạng thái tái hiện được 422 trên staging."}
```

## OQ-sdk-137 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-137","type":"OPEN_ISSUE","feature_id":"genai-model-settings","summary":"Email sau khi đổi model (1 email, nêu model cũ/mới, chỉ account có API key provider đó) chưa có người xác nhận, test case chưa chạy. Claim trong CCR thiếu người xác nhận nên chưa có KB item.","kb_ids":[],"needs":"Dev trả lời Q3 hoặc chạy TC-08/10/11/40 của QA-3408."}
```

## OQ-sdk-138 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-138","type":"OPEN_ISSUE","feature_id":"genai-model-settings","summary":"Admin > Settings từ chối giá trị sai của genai_model_retirements và genai_model_fallbacks chưa có người xác nhận; QA không có quyền Admin. Claim trong CCR thiếu người xác nhận nên chưa có KB item.","kb_ids":[],"needs":"Người có quyền Admin chạy TC-23/24/39/42, hoặc dev xác nhận nguyên văn."}
```

## OQ-sdk-139 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-139","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Key Gemini hợp lệ nhưng không có quyền với Nano Banana 2.1: Validate key có báo not valid với câu chung \"Key is not working. Please check & try again.\" như dev nói (KB-457) không? TC-26 của QA-3442 chưa chạy, cần fixture key không có quyền với 2.1. Testlane TC-TIB-7927 ghi quyết định QA 2026-11-01: không tạo được key Gemini không có quyền 2.1 trên staging.","kb_ids":["KB-457"]}
```

## OQ-sdk-140 — OPEN_ISSUE

```json
{"oq_id":"OQ-sdk-140","type":"OPEN_ISSUE","feature_id":"genai-model-settings","summary":"Feature genai-model-settings chưa có KB cho role khác merchant-owner, cross-tenant và production; mọi item scope staging. Không viết check cho các vùng này từ evidence hiện tại.","kb_ids":[]}
```

## OQ-sdk-141 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-sdk-141","type":"NEEDS_CONFIRMATION","feature_id":"genai-model-settings","summary":"Đặt migrate_at về ngày hiện tại trên staging làm quy tắc lưu và model mặc định áp cho MỌI account staging (KB-461). Các check cần chạy job migration hoặc cần phía trước ngày migrate (CHK-010..CHK-015) ai được chạy, trên account nào, và cần dev/admin phối hợp thế nào?","kb_ids":["KB-461","KB-466"]}
```
