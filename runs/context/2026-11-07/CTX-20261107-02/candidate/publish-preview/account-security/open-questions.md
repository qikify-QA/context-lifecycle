# Open Questions — Account & Security

Các mục dưới đây còn mở. Mục đã có lời dev trả lời một phần thì ghi rõ phần đã trả lời và phần còn mở. Không dùng phần còn mở làm expected result.

## Tóm tắt

| Loại | Số lượng |
|---|---|
| CONFLICT | 1 |
| NEEDS_CONFIRMATION | 32 |
| OPEN_ISSUE | 24 |
| **Tổng** | **57** |

## OQ-account-security-001 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-001","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Social login flow chưa được khám phá: \"Continue with Google\" chỉ được đọc từ DOM, chưa click nên chưa biết luồng và kết quả. Lời dev về Google login nay ở `social-login` (KB-022 đến KB-029, KB-038), flow vẫn chưa quan sát; KB-025, KB-038 là known defect theo lời dev."}
```

## OQ-account-security-002 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-002","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Chưa quan sát login với account bật 2FA và luồng /login/two-factor; quan sát hiện có chỉ ở trạng thái 2FA off."}
```

## OQ-account-security-003 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-003","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Các trang /forgot-password, /register, /resend-verification chưa được mở nên chưa có quan sát về form và luồng của chúng."}
```

## OQ-account-security-004 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-004","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Cookie session chưa được xác nhận lại: capture của POST /api/login và các request sau đó không có Set-Cookie hay Cookie, nên cơ chế cookie session không kiểm được từ evidence lần này."}
```

## OQ-account-security-005 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-005","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Chưa có quan sát cho nhánh lỗi của login: submit form /login bằng store domain, sai credential, thiếu Turnstile, rate limit. Hiện chỉ có một sample thành công ở /login?staff=true. Giới hạn field, reload và hết hạn session cũng chưa có quan sát."}
```

## OQ-account-security-006 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-006","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Form store domain tại /login như KB-002 (tiêu đề, field, hậu tố, nút) có phải hành vi đúng không? Việc không thấy widget Turnstile trong ảnh và snapshot trong khi cửa sổ thao tác có request tới challenges.cloudflare.com có phải hành vi đúng không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-007 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-007","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Các link trên /login như KB-003 có phải đúng đường vào mong muốn không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-008 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-008","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Form email và password tại /login?staff=true như KB-004 có phải hành vi đúng không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-009 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-009","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Widget Cloudflare trong form /login?staff=true hiện trạng thái \"Success!\" như KB-005 có phải hành vi đúng của staging không? Cần Dev xác nhận."}
```

## OQ-account-security-010 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-010","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Các link trên /login?staff=true như KB-006 có phải đúng đường vào mong muốn không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-011 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-011","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Luồng đăng nhập thành công như KB-008 (POST /api/login 200, URL về /, GET /api/user 200, GET /api/staff 200) có phải hành vi đúng không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-012 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-012","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Account 2FA off đăng nhập không qua bước 2FA như KB-009 có phải hành vi đúng không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-013 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-013","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Tập request khi mở trực tiếp /login?staff=true như KB-007 có phải hành vi đúng không, hay chỉ là chi tiết triển khai có thể đổi? Cần Dev xác nhận."}
```

## OQ-account-security-014 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-014","type":"NEEDS_CONFIRMATION","feature_id":"portal-login-paths","summary":"Mở /campaigns khi chưa có session như KB-001 có phải hành vi đúng không, và quy tắc này có áp cho các route khác không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-015 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-015","type":"OPEN_ISSUE","feature_id":"portal-login-paths","summary":"Chuỗi request ngay sau login chưa có body để đọc: 3 POST /api/graphql chưa biết operation name và có ghi dữ liệu hay không; POST /api/assistant/session-token trả 404 chưa rõ tác dụng."}
```

## OQ-account-security-016 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-016","type":"OPEN_ISSUE","feature_id":"confirm-password-dialog","summary":"Chưa quan sát được dialog xác nhận password: 12 trigger đã thử chỉ dừng ở mở trang/form, không submit, và dialog không xuất hiện. Chưa biết entry point, hiển thị, field, nút, hành vi Cancel, hiệu lực, validation, cũng chưa biết vì sao dialog không xuất hiện ở các trigger này. Cần operator cho phép một thao tác cụ thể có cleanup để quan sát. Màn /mcp chưa được thử làm trigger. Các item phủ định chỉ phủ bước mở trang/form, không dùng làm oracle cho kết luận action không cần xác nhận password. KB-016 đến KB-020 có lời dev về hiệu lực, validation, nhóm action và hidden username; dialog vẫn chưa quan sát được. Route và bước của từng action ở OQ-account-security-035."}
```

## OQ-account-security-017 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-017","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Chưa quan sát staff không có password: chưa biết cột Security và đường đăng nhập của loại staff này ra sao."}
```

## OQ-account-security-018 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-018","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Tập chip của cột Security chưa đầy đủ: mới thấy 2 dòng, chưa thấy chip cho trạng thái 2FA bật hay staff không password."}
```

## OQ-account-security-019 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-019","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Cần xác nhận nghĩa của từng chip, quy tắc hiển thị và nguồn dữ liệu của chip, gồm \"Shopify SSO\"; 2 dòng không đủ để gắn chip với field API. KB-030, KB-032 trả lời một phần theo lời dev; quy tắc chung một chip cho mỗi cách đăng nhập ở KB-031 mới là đề xuất, xem OQ-account-security-057. Nguồn dữ liệu của chip vẫn mở."}
```

## OQ-account-security-020 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-020","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Cần xác nhận quy tắc cập nhật Last login: một lần quan sát cho thấy sau khi login thành công, cột Last login của dòng account đang login và field last_login_at của GET /api/staff vẫn là một mốc trước lần login đó. Không có giá trị từ API trước login để so."}
```

## OQ-account-security-021 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-021","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Select \"Show ... entries\" trên /staffs hiển thị trống trong ảnh chụp; chưa rõ do UI hay do lớp che phía client khi chụp."}
```

## OQ-account-security-022 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-022","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Trang danh sách staff như KB-013 (route, tiêu đề, các cột, GET /api/staffs 200) có phải hành vi đúng không? Cần PO hoặc Dev xác nhận."}
```

## OQ-account-security-023 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-023","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Sau khi hover chip trong cột Security không có tooltip hay popover hiển thị như KB-015, đây có phải hành vi đúng không? Cần PO xác nhận."}
```

## OQ-account-security-024 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-024","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Danh sách staff chưa có quan sát cho: nhiều dòng và phân trang, reload, dữ liệu sau khi trạng thái bảo mật đổi, và đối chiếu chip với API."}
```

## OQ-account-security-025 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-025","type":"OPEN_ISSUE","feature_id":null,"summary":"Multi-store chưa được khám phá; nằm ngoài scope lần này."}
```

## OQ-account-security-026 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-026","type":"OPEN_ISSUE","feature_id":null,"summary":"Acting-user chưa được khám phá: response login có key acting_user_id và request sau login có header x-acting-user-id, nhưng chưa kiểm server xử lý ra sao. KB-021 có lời dev về header x-acting-user-id, chưa quan sát; phần còn mở ở OQ-account-security-036, OQ-account-security-037."}
```

## OQ-account-security-027 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-027","type":"OPEN_ISSUE","feature_id":null,"summary":"Hasura permission chưa được khám phá; nằm ngoài scope lần này. KB-033 đến KB-036 có lời dev, chưa quan sát; phần còn mở ở OQ-account-security-040 đến OQ-account-security-043."}
```

## OQ-account-security-028 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-028","type":"OPEN_ISSUE","feature_id":null,"summary":"Billing webhook chưa được khám phá; nằm ngoài scope lần này. KB-037 có lời dev, chưa quan sát; phần còn mở ở OQ-account-security-038, OQ-account-security-039."}
```

## OQ-account-security-029 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-029","type":"OPEN_ISSUE","feature_id":null,"summary":"Chưa có quan sát với role khác owner: mọi item của object hiện chỉ từ một account role owner."}
```

## OQ-account-security-030 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-030","type":"OPEN_ISSUE","feature_id":null,"summary":"Response GET /api/user có một nhóm cấu hình riêng của account, gồm cả field nhạy cảm. Giá trị đã che khi capture nên chưa biết response có trả giá trị thật về browser hay không. Cần Dev xác nhận."}
```

## OQ-account-security-031 — CONFLICT

```json
{"oq_id":"OQ-account-security-031","type":"CONFLICT","feature_id":"portal-login-paths","summary":"Method của request tới /api/assistant/session-token ngay sau login: capture network và console ghi khác nhau, chưa chọn bên.","side_a":"Capture network ghi POST /api/assistant/session-token trả 404.","side_b":"Console error ghi GET cho cùng route."}
```

## OQ-account-security-032 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-032","type":"OPEN_ISSUE","feature_id":"social-login","summary":"KB-025 là known defect theo lời dev: tại 2026-10-27 callback Google chưa kiểm OAuth state, state sai hoặc thiếu bị bỏ qua. Jira TIB-5644 (kiểm state) đang QA Review khi đọc ngày 2026-11-07. Thay đổi kiểm state đã lên môi trường nào, và với state sai hoặc thiếu thì hành vi đúng là gì? KB-025 không làm oracle. Liên quan: CHK-013. Cần dev xác nhận."}
```

## OQ-account-security-033 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-033","type":"NEEDS_CONFIRMATION","feature_id":"confirm-password-dialog","summary":"Hiệu lực 15 phút của KB-016 tính từ mốc nào, áp theo phiên, tài khoản hay nhóm action, và hết 15 phút thì action tiếp theo xử lý ra sao? Liên quan: CHK-011, CHK-012. Cần dev xác nhận."}
```

## OQ-account-security-034 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-034","type":"NEEDS_CONFIRMATION","feature_id":"confirm-password-dialog","summary":"Request xác nhận password dùng method và đường dẫn nào, status ra sao, và password sai không phải khoảng trắng hiện gì? KB-017, KB-020 chưa nêu. Liên quan: CHK-008, CHK-009. Cần dev xác nhận."}
```

## OQ-account-security-035 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-035","type":"OPEN_ISSUE","feature_id":"confirm-password-dialog","summary":"Từng action của KB-019 nằm ở route nào, dialog hiện ở bước nào? \"Xác nhận mã email\" nằm sau bước bật 2FA nên CHK-004 chưa chấm được. Liên quan: CHK-001 đến CHK-005. Cần dev chỉ route và bước, hoặc cần quan sát trên staging."}
```

## OQ-account-security-036 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-036","type":"NEEDS_CONFIRMATION","feature_id":"acting-user-organisation","summary":"Ngoài print area, staff đã duyệt ghi được những data nào khác của org qua header x-acting-user-id? KB-021 chỉ nêu ví dụ print area. Liên quan: CHK-002. Cần dev xác nhận."}
```

## OQ-account-security-037 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-037","type":"NEEDS_CONFIRMATION","feature_id":"acting-user-organisation","summary":"Header x-acting-user-id có hiệu lực trên những route nào, và body của response 403 ra sao? KB-021 chỉ nêu status. Liên quan: CHK-001, CHK-003. Cần dev xác nhận."}
```

## OQ-account-security-038 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-038","type":"OPEN_ISSUE","feature_id":"billing-webhook","summary":"Handler webhook price.created nằm ở endpoint nào, và trên môi trường test kích hoạt hai trường hợp của KB-037 bằng cách nào? Chưa có đường test. Liên quan: CHK-001, CHK-002. Cần dev chỉ đường test."}
```

## OQ-account-security-039 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-039","type":"NEEDS_CONFIRMATION","feature_id":"billing-webhook","summary":"\"Xử lý đúng như trước\" với giá tạo tay gồm những kết quả nào, tiêu chí nhận diện giá usage charge là gì, và khi bỏ qua thì trả gì cho Paddle? KB-037 chưa nêu. Liên quan: CHK-001, CHK-002. Cần dev xác nhận."}
```

## OQ-account-security-040 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-040","type":"NEEDS_CONFIRMATION","feature_id":"hasura-permission","summary":"Những mutation và cột ảnh nào thuộc phạm vi KB-033? KB-033 chỉ nêu ví dụ field \"url\", chưa có danh sách. Liên quan: CHK-001. Cần dev xác nhận."}
```

## OQ-account-security-041 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-041","type":"NEEDS_CONFIRMATION","feature_id":"hasura-permission","summary":"Đọc các cột ảnh qua GraphQL có còn được không? KB-033 chỉ nói về ghi. Cần dev xác nhận."}
```

## OQ-account-security-042 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-042","type":"NEEDS_CONFIRMATION","feature_id":"hasura-permission","summary":"\"User\" của KB-033, KB-034, KB-036 ứng với role nào của portal, và Hasura GraphQL endpoint ở địa chỉ nào? Liên quan: CHK-001, CHK-002, CHK-004. Cần dev xác nhận."}
```

## OQ-account-security-043 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-043","type":"NEEDS_CONFIRMATION","feature_id":"hasura-permission","summary":"33 bảng đã gỡ khỏi Hasura ở KB-035 gồm những bảng nào, và query vào các bảng đó trả gì? Liên quan: CHK-003. Cần dev xác nhận."}
```

## OQ-account-security-044 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-044","type":"NEEDS_CONFIRMATION","feature_id":"social-login","summary":"Sau 2026-10-27, Staff vẫn không có trạng thái locked hay suspended chứ? KB-023 dựa trên câu của dev viết \"today\". Cần dev xác nhận."}
```

## OQ-account-security-045 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-045","type":"NEEDS_CONFIRMATION","feature_id":"social-login","summary":"GOOGLE_OAUTH_RATE_LIMIT đang đặt giá trị nào trên staging và production, và vượt limit nhận response gì? KB-026 chỉ nêu mặc định. Liên quan: CHK-011, CHK-012. Cần dev xác nhận."}
```

## OQ-account-security-046 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-046","type":"NEEDS_CONFIRMATION","feature_id":"social-login","summary":"Text hiển thị của oauth_failed, invite_pending, no_account là gì, và các mã này có đọc ở social_error như email_unverified không? Liên quan: KB-022, KB-024, KB-027; CHK-003, CHK-004, CHK-005, CHK-009. Cần dev xác nhận."}
```

## OQ-account-security-047 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-047","type":"OPEN_ISSUE","feature_id":"social-login","summary":"KB-038 là known defect theo lời dev: sau F5 toast hiện lại vì tham số social_error còn trên URL, dev gọi đây là vấn đề đã biết, ưu tiên thấp. Chấp nhận lâu dài hay sẽ sửa? KB-038 không dùng làm expected. Liên quan: CHK-014. Cần PO hoặc dev xác nhận."}
```

## OQ-account-security-048 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-048","type":"OPEN_ISSUE","feature_id":"social-login","summary":"Chưa có check cho limit riêng của bước 2FA (KB-026) và vế không trim của KB-024, vì Google không trả email có khoảng trắng nên chưa có đường test. Cần dev chỉ cách test nếu có."}
```

## OQ-account-security-049 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-049","type":"NEEDS_CONFIRMATION","feature_id":"social-login","summary":"Staff chưa verify về /login?social_error=email_unverified, toast nhắc \"Re-send verification email\" bên dưới (KB-029); KB-006 thấy link đó ở /login?staff=true, KB-003 không liệt kê ở /login. Trang đích có hiện link đó không? Liên quan: CHK-007. Cần dev xác nhận hoặc quan sát trang có tham số."}
```

## OQ-account-security-050 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-050","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Các quy tắc chip ở KB-030, KB-032 và đề xuất chưa xác nhận ở KB-031 áp dụng khi xem bằng role nào? Nguồn không nêu role, quan sát hiện chỉ role owner. Liên quan: CHK-004 đến CHK-009. Cần dev xác nhận."}
```

## OQ-account-security-051 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-051","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Nhãn chip khi 2FA bật là gì? KB-030 chỉ nói \"chip 2FA thật\". Liên quan: CHK-004. Cần dev xác nhận."}
```

## OQ-account-security-052 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-052","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"Khi Shopify là cách vào duy nhất, dòng staff hiện những chip nào? Hiện chỉ có đề xuất chưa xác nhận ở KB-031, xem OQ-account-security-057. Liên quan: CHK-007. Cần dev xác nhận."}
```

## OQ-account-security-053 — OPEN_ISSUE

```json
{"oq_id":"OQ-account-security-053","type":"OPEN_ISSUE","feature_id":"staff-security-status","summary":"Ngày gốc của các phát biểu ở KB-030, KB-032 chưa rõ: ngày ghi là ngày sửa cuối của comment Jira. Cần dev cho biết nếu các phát biểu cũ hơn ngày đã ghi. Ngày gốc của KB-031 nằm ở OQ-account-security-057."}
```

## OQ-account-security-054 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-054","type":"NEEDS_CONFIRMATION","feature_id":"_object-level","summary":"Role áp dụng của KB-020, KB-022 đến KB-029, KB-037 và KB-038 là gì? Nguồn không nêu role nên các item này ghi role unspecified. KB-030 đến KB-032 có câu hỏi riêng ở OQ-account-security-050. Cần PO hoặc dev xác nhận."}
```

## OQ-account-security-055 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-055","type":"NEEDS_CONFIRMATION","feature_id":"_object-level","summary":"Hành vi của KB-016 đến KB-038 đã lên production chưa, từ build và ngày nào? Chưa có thông tin build và ngày deploy của TIB-5628, TIB-5500, TIB-5334, TIB-5507, TIB-4938. Cần PO hoặc dev xác nhận."}
```

## OQ-account-security-056 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-056","type":"NEEDS_CONFIRMATION","feature_id":"_object-level","summary":"Các hành vi chạm permission, xác thực, billing hoặc mất dữ liệu ở KB-016, KB-019, KB-021, KB-022, KB-024, KB-029, KB-033 đến KB-037 có đúng ý định sản phẩm không? Hiện chỉ có lời dev. KB-025 là known defect, xem OQ-account-security-032. Cần PO xác nhận."}
```

## OQ-account-security-057 — NEEDS_CONFIRMATION

```json
{"oq_id":"OQ-account-security-057","type":"NEEDS_CONFIRMATION","feature_id":"staff-security-status","summary":"KB-031 là đề xuất chưa xác nhận: cột Security hiện một chip cho mỗi cách đăng nhập (Password, Shopify SSO, Google sau lần Google login đầu tiên của staff), rồi tới chip 2FA; \"2FA via Shopify\" chỉ hiện khi Shopify là cách vào duy nhất của staff. Câu này chỉ có ở description của Jira TIB-5334, không có comment id, ngày gốc chưa rõ. Quy tắc này có đúng không? KB-031 không làm oracle tới khi có câu trả lời. Liên quan: CHK-004, CHK-007. Cần dev hoặc PO xác nhận nguyên văn, kèm người viết và ngày."}
```
