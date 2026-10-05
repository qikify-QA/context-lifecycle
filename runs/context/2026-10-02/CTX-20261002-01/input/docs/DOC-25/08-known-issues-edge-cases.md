# Known Issues & Edge Cases

> Tổng hợp các rủi ro/edge case đã xác nhận từ source code (không phải suy đoán) — nên đọc trước khi viết test case hoặc trước khi thay đổi logic liên quan. Mỗi mục viết theo format: **Hiện trạng** (code làm gì) → **Vì sao xảy ra** (nguyên nhân kỹ thuật) → **Kịch bản tái hiện** (dữ liệu cụ thể, từng bước) → **Ảnh hưởng nghiệp vụ** (tại sao PO/QA cần quan tâm).

## A. Liên quan tới import CSV Payout

### A1. Thiếu cột `App Slug` trong format CSV mới ("earnings" export)

- **Hiện trạng**: format CSV mới của Shopify (19 cột, tên file `<period>-earnings-<date>.csv`) không có cột `App Slug`, chỉ có `App Title`. `App Title` không dùng làm khoá join được vì cùng 1 họ app có thể xuất hiện với casing khác nhau trong cùng 1 file thật (ví dụ đã quan sát: `"Qikify Upsell"` vs `"qikify Slide Cart"`).
- **Vì sao xảy ra**: `ShopifyPayoutImport::rules()` bắt buộc `app_slug`; không có logic nào tự suy ra `app_slug` từ `App Title`. Người upload phải tự bổ sung cột `app_slug` bằng tay (map thủ công ngoài hệ thống, ví dụ trên spreadsheet) trước khi đưa file vào admin.
- **Kịch bản tái hiện cụ thể**:
  1. Chuẩn bị file "earnings" export thật (19 cột, không có `App Slug`) chứa 1 dòng cho shop `test-shop.myshopify.com`, `App Title = "B2B Manager"`, `Partner Share = 45.00`.
  2. KHÔNG bổ sung cột `app_slug` (mô phỏng người upload quên bước map thủ công).
  3. Upload qua màn "Upload payout file" (admin panel).
  4. **Kết quả quan sát được**: banner kết quả báo số conversion tạo ra KHÔNG bao gồm dòng này, không có log nào, không có cách nào từ UI xác định chính xác dòng nào đã bị bỏ qua và vì lý do gì (thiếu app_slug hay lý do khác).
- **Ảnh hưởng nghiệp vụ**: toàn bộ hoa hồng của app đó trong kỳ payout biến mất âm thầm. Nếu Ownego ra app mới và người tải file quên cập nhật bảng map App Title → app_slug, affiliate quảng bá app đó sẽ **không được cộng hoa hồng tháng đó mà không ai biết**, cho tới khi affiliate tự thắc mắc.

### A2. `Partner Share` có thể rỗng dù các cột tiền khác có giá trị

- **Hiện trạng**: đã quan sát dữ liệu thật (dev store `prod-tungot-01.myshopify.com`, app "Duos B2B Management"): `Partner Sale = $7.99`, `Shopify Fee = $0.23`, `Processing Fee = $0.50` đều có giá trị, nhưng `Partner Share` **để trống**.
- **Vì sao xảy ra**: có thể do charge chưa settle xong phía Shopify tại thời điểm export, hoặc app đang ở ngưỡng 0% revenue-share nên Shopify chưa tính field này — **chưa xác nhận được nguyên nhân chính xác, cần hỏi Shopify support hoặc quan sát thêm**.
- **Kịch bản tái hiện**: file có 1 dòng đủ mọi cột tiền khác nhưng `Partner Share` rỗng → dòng fail validate `required` → skip âm thầm giống A1 (cùng cơ chế `onFailure()` rỗng).
- **Ảnh hưởng nghiệp vụ**: giống A1 — mất hoa hồng 1 dòng mà không ai biết. Khác A1 ở chỗ đây không phải lỗi quy trình con người (quên map), mà là dữ liệu gốc từ Shopify tự thiếu — không có cách nào phòng tránh trước khi upload.

### A3. `charge_type` không có enum cố định — chỉ match substring

- **Hiện trạng**: phân loại dựa vào `Str::contains(Str::lower($charge_type), 'usage')` / `'one-time'` — chuỗi con, không phân biệt hoa thường, trên field `Charge Type` do Shopify đặt tên tự do (Shopify tuyên bố không cam kết ổn định các giá trị/cột trong export này).
- **Kịch bản tái hiện (giả định)**: nếu Shopify phát hành 1 charge_type mới không khớp cả 2 từ khoá hiện có, ví dụ `"App proration credit"` — dòng này sẽ **tự động rơi vào nhánh recurring/first-month** (vì không chứa "usage" và không chứa "one-time"), dù về bản chất có thể cần xử lý khác. Không có log cảnh báo "charge_type lạ chưa từng thấy".
- **Trường hợp đặc biệt cần lưu ý riêng**: refund/downgrade của 1 usage charge — nếu Shopify từng phát hành `charge_type` dạng `"App sale – usage refund"` (có chứa "usage"), dòng đó sẽ đi qua `UsageCommissionCapper` (nhánh usage) thay vì nhánh recurring như refund/downgrade thông thường. **Case này chưa có dữ liệu thật để xác nhận literal string — mysbox chưa từng phát sinh refund nào tính đến thời điểm viết tài liệu này.** Khi có dữ liệu thật đầu tiên dạng này, nên đối chiếu ngay xem có đi đúng nhánh cap lifetime hay không.
- **Ảnh hưởng nghiệp vụ**: rủi ro "âm thầm" nhất trong toàn hệ thống — sai định tuyến không gây lỗi/crash, chỉ ra số tiền hoa hồng sai mà rất khó phát hiện qua kiểm tra thông thường.

### A4. `handle_usage_charge = false` khiến dòng usage biến mất hoàn toàn, không tạo Conversion

- **Hiện trạng**: nếu `ProgramCommission` của `(Program, Level)` đó có `handle_usage_charge = false` (mặc định khi tạo mới), mọi dòng `charge_type` chứa "usage" của tổ hợp này bị bỏ qua trong `model()` (return `null`).
- **Phân biệt với A1/A2**: đây là hành vi **có chủ đích** ở tầng nghiệp vụ (Program/Level đó chưa được bật tính hoa hồng usage), không phải lỗi thiếu dữ liệu. Kết quả cuối giống nhau (không có Conversion) nên dễ nhầm khi debug — QA cần kiểm tra `ProgramCommission.handle_usage_charge` trước khi kết luận đây là bug loại A1/A2 hay hành vi đúng thiết kế.
- **Kịch bản tái hiện**: Program "B2B Manager" Level 1 có `handle_usage_charge = false`. Upload file có 1 dòng `charge_type = "App sale – usage"`, `partner_share = $30` cho shop thuộc Program+Level này → xác nhận KHÔNG có Conversion nào được tạo, banner không báo lỗi gì (im lặng, không phải "bị skip do lỗi", mà "bị skip do cấu hình").

## B. Liên quan tới tính hoa hồng

### B1. Cap usage-charge là LIFETIME, không phải theo kỳ

- Xem ví dụ số đầy đủ, chạy qua nhiều kỳ liên tiếp, ở [02-commission/03-usage-charge.md](02-commission/03-usage-charge.md).
- **Kịch bản tái hiện tối thiểu**: `usage_maximum_amount = $100`. Kỳ 1: affiliate nhận đủ $100 usage-commission (từ 1 hoặc nhiều shop). Kỳ 2: cùng affiliate, Program đó, có thêm 1 dòng usage mới từ 1 shop KHÁC, `raw_amount` tính ra $15 → kỳ vọng: `amount = $0`, `is_capped = true` (không phải $15, dù là shop khác và kỳ khác).
- **Ảnh hưởng nghiệp vụ**: đây là điểm dễ bị hiểu nhầm nhất khi trao đổi với PO — nếu PO nghĩ cap là "mỗi tháng tối đa $X" thì kỳ vọng sai hoàn toàn so với hành vi thật ("tổng cả đời tối đa $X"). Cần chốt lại với PO xem đây có đúng ý định thiết kế không trước khi launch feature usage-charge cho Program mới.

### B2. Thiếu `ProgramCommission` cho 1 (Program, Level) cụ thể → không có fallback

- **Kịch bản tái hiện**: Program "B2B Manager" đã cấu hình `ProgramCommission` cho Level 1, Level 2, nhưng CHƯA cấu hình cho Level 3. 1 affiliate vừa lên Level 3 (đủ `min_paid_customers`), có thêm 1 charge mới từ 1 shop thuộc Program này → import sẽ lỗi tại dòng này (không có rate để tính) vì `$program_commission` là `null`.
- **Ảnh hưởng nghiệp vụ**: khi thêm 1 Level mới vào hệ thống (ví dụ mở Level 4 cho affiliate VIP), **phải nhớ tạo `ProgramCommission` cho MỌI Program hiện có ở Level mới đó** — nếu quên dù chỉ 1 Program, toàn bộ payout tháng đó của affiliate ở Program bị thiếu cấu hình sẽ lỗi khi import.

### B3. `isFirstMonth()` chỉ áp dụng đúng 2 trường hợp — dễ viết sai test/kỳ vọng sai

- Xem 3 ví dụ timeline cụ thể (ngày tháng thật) ở [02-commission/02-recurring-and-first-month.md](02-commission/02-recurring-and-first-month.md).
- **Kỳ vọng sai thường gặp**: "mọi charge trong 30 ngày đầu đều được tính first-month" — **SAI**. Chỉ (a) dòng dương đầu tiên của customer, HOẶC (b) dòng âm (refund/downgrade) đầu tiên trong 30 ngày mới được first-month. Một charge dương ở tháng thứ 2 vẫn nằm trong 30 ngày kể từ charge đầu (do Shopify gửi dữ liệu trễ/lệch thứ tự) **vẫn KHÔNG được** first-month.

## C. Liên quan tới Invoice/thanh toán

### C1. Huỷ invoice từ trạng thái `approved` KHÔNG hoàn lại balance

- **Kịch bản tái hiện**: affiliate có `balance = $120`, tạo `Invoice` `amount = $120` → balance về $0. Admin chuyển status invoice sang `approved` (bước duyệt trung gian). Sau đó vì lý do nào đó (ví dụ affiliate cung cấp sai thông tin thanh toán), admin huỷ (`cancel`) invoice đang ở `approved` → **balance vẫn là $0**, không được hoàn lại — trong khi nếu huỷ ngay từ lúc còn `pending`, balance sẽ được hoàn về $120.
- **Cần xác nhận với PO**: đây có phải hành vi cố ý (once `approved` = tiền coi như đã cam kết chi, huỷ sau đó là sự cố vận hành cần xử lý tay ngoài hệ thống, ví dụ admin tự cộng lại balance thủ công) hay là một gap thực sự cần vá code? Nếu là gap, ảnh hưởng tài chính trực tiếp tới affiliate.

### C2. Không có tích hợp cổng thanh toán thật — mọi thanh toán là thao tác tay ngoài hệ thống

- **Kịch bản tái hiện**: đổi status 1 invoice từ `pending` thẳng sang `completed` **không hề gọi bất kỳ API PayPal/ngân hàng nào** — hệ thống chỉ ghi nhận admin "khai báo" đã thanh toán. Có thể test: đổi status sang `completed` cho 1 invoice mà chưa thực sự chuyển tiền — hệ thống chấp nhận bình thường, affiliate vẫn nhận được email "thanh toán hoàn tất" dù chưa nhận tiền thật.
- **Ảnh hưởng nghiệp vụ**: rủi ro hoàn toàn nằm ở quy trình vận hành con người, không có gì ở tầng code chặn thao tác nhầm (quên chuyển tiền mà đổi status, hoặc chuyển tiền rồi quên đổi status).

## D. Liên quan tới API tích hợp (client app)

### D1. `POST /api/customer-events` không validate `name` theo enum

- **Hiện trạng**: model `CustomerEvent` định nghĩa đúng 6 giá trị hợp lệ (`installed`, `uninstalled`, `reinstalled`, `subscribed`, `upgraded`, `canceled`), nhưng `StoreCustomerEventRequest` chỉ validate `name` là `required`, không có `in:...`.
- **Kịch bản tái hiện**: gửi `POST /api/customer-events` với `{"customer_related_id": "test-shop.myshopify.com", "program_slug": "b2b-manager", "name": "subcribed"}` (thiếu chữ "s", lỗi chính tả cố ý) → **API vẫn trả về thành công**, tạo `CustomerEvent` với `name = "subcribed"` (sai chính tả, lưu nguyên văn).
- **Ảnh hưởng nghiệp vụ**: trạng thái shop hiển thị trên cả admin panel lẫn affiliate dashboard (cột "status", màu nhãn) sẽ không nhận diện được giá trị lạ này (không khớp bất kỳ label màu nào đã định nghĩa) — hiển thị trống hoặc mặc định, gây khó hiểu cho cả affiliate lẫn admin, mà phía client app gọi API không hề nhận được lỗi nào để biết mình đã gửi sai.

### D2. `POST /api/customers` không validate `program_slug` tồn tại

- **Kịch bản tái hiện**: gửi `POST /api/customers` với `program_slug: "khong-ton-tai-123"` (slug không khớp Program nào) → do thiếu rule `exists:programs,slug`, request có khả năng gây lỗi runtime (500) thay vì trả lỗi validate rõ ràng (422) cho client app biết chính xác vì sao thất bại.
- **Ảnh hưởng nghiệp vụ**: client app khó phân biệt "lỗi hệ thống Qikfiliate" với "chính client app gửi sai dữ liệu" — làm chậm quá trình debug khi có sự cố tích hợp.

### D3. API key dùng chung, không phân biệt client app

- **Hiện trạng**: chỉ 1 secret (`config('app.api_key')`) cho MỌI client app gọi vào 5 endpoint tích hợp — không có API key riêng theo app, không rate limit, không chữ ký request.
- **Ảnh hưởng nghiệp vụ**: (1) nếu key này lộ, bất kỳ ai cũng gọi được kể cả xoá customer (`DELETE /api/customers`) của app khác; (2) nếu có sự cố (ví dụ 1 client app gửi dữ liệu sai hàng loạt), không có cách nào từ log phân biệt request đến từ app nào để khoanh vùng điều tra.

## E. Liên quan tới admin panel

### E1. `Grid\Column::switch()` (bấm trực tiếp trên danh sách) bỏ qua validate `required_if` của form

- **Kịch bản tái hiện**: trên danh sách `Program`, bấm trực tiếp switch `visible` để bật/tắt — thao tác này gửi request PUT chỉ đúng 1 cột đó, không đi qua toàn bộ validate của form sửa. Áp dụng tương tự cho `PaymentMethod.visible`.
- **Vì sao KHÔNG áp dụng cho `ProgramCommission.handle_usage_charge`**: cột này đã được đổi sang icon chỉ-xem (không bấm được) đúng vì lý do trên — nếu vẫn để switch bấm nhanh, admin có thể bật `handle_usage_charge = true` mà không đi qua bước bắt buộc nhập `usage_percentage`/`usage_maximum_amount`, dẫn tới tính hoa hồng usage sai (rate = null → lỗi hoặc $0 tuỳ cách code xử lý null).

### E2. `is_capped` không hiển thị ở đâu trong admin

- Admin không có cách nhìn nhanh 1 dòng Conversion loại `usage` có bị cap hay không (chỉ affiliate dashboard mới thấy badge "cap reached"). Muốn biết, admin phải tự tính `partner_share × usage_percentage` rồi so với `amount` hiển thị — thao tác thủ công, dễ sai khi có nhiều dòng.

### E3. Hiển thị số liệu ở màn hình Program Commission chưa đồng nhất format với các màn hình khác

- **Kịch bản tái hiện**: tạo 1 `ProgramCommission` với `maximum_amount = -4.31` (giá trị âm bất thường, hoặc do lỗi nhập liệu) → trên danh sách, các màn Conversion/Invoice sẽ hiển thị `-$4.31` (đúng chuẩn), nhưng màn Program Commission hiển thị `$-4.31` (nối chuỗi thô) — khác định dạng, dễ gây nhầm khi đọc nhanh dù không sai dữ liệu.

### E4. Một vài controller còn code chết (dead code) — không ảnh hưởng hành vi nhưng dễ gây nhầm khi đọc code

- `CustomerEventController::form()/edit()` và `TrackingInformationController::form()` tồn tại trong code nhưng route `edit`/`update` đã bị loại khỏi `routes.php` — không bao giờ được gọi tới. `ExampleController` là scaffold mặc định của `encore/laravel-admin`, không gắn route nào. `ConfirmPasswordController` (auth) cũng không được đăng ký route nào ở cả web lẫn API. Không phải bug, chỉ là điểm cần lưu ý nếu ai đó đọc code và tưởng đây là tính năng đang hoạt động.

## F. Liên quan tới affiliate dashboard (frontend)

### F1. Frontend hardcode ID của PayPal (`1`) và Payoneer (`2`) để áp điều kiện rút tiền riêng

- **Hiện trạng**: `PayoutBlock.vue` gán cứng "PayPal (`payment_method_id === 1`) cần balance > $50 mới rút được", "Payoneer (`id === 2`) không giới hạn" — hardcode theo ID, không đọc field nào từ `PaymentMethod` để suy ra điều kiện này.
- **Kịch bản tái hiện**: admin xoá `PaymentMethod#1` (PayPal) rồi tạo lại — bản ghi mới nhận ID khác (ví dụ `#15`, vì auto-increment không tái sử dụng ID cũ). Từ lúc này, frontend không còn nhận diện được `#15` là "PayPal", điều kiện hiển thị "cần balance > $50" trên UI sẽ **không áp dụng đúng** dù điều kiện thật ở backend (`InvoiceService::canCreateByUser`, hoàn toàn không phụ thuộc ID cụ thể nào) vẫn tính đúng.
- **Ảnh hưởng nghiệp vụ**: affiliate có thể thấy thông báo điều kiện rút tiền sai lệch trên UI (hiển thị sai ngưỡng cần đạt) dù backend vẫn chặn/cho phép đúng — gây nhầm lẫn trải nghiệm nhưng không gây sai số tiền thực tế.
