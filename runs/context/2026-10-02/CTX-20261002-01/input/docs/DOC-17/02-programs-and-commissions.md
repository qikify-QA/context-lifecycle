# Programs & Commissions (màn hình Program, Program Commission)

> Đây là 2 màn hình admin **có ảnh hưởng tài chính trực tiếp và ngay lập tức** — sai 1 field ở đây có thể làm mất khớp toàn bộ payout của 1 app, hoặc trả sai % hoa hồng cho hàng loạt affiliate. Nên đọc kỹ trước khi thao tác trên môi trường thật (production).

## Program — app Shopify đang được quảng bá

| Field | Ý nghĩa |
|---|---|
| `name`, `name_in_store` | Tên hiển thị nội bộ / tên hiển thị trên Shopify App Store |
| `slug` | **Khoá join với `app_slug` trong file CSV Payout của Shopify** |
| `ref_slug` / `ref_url` | Sinh link giới thiệu cho affiliate |
| `app_store_url`, `description`, `image` | Thông tin hiển thị cho affiliate chọn quảng bá |
| `visible` | Bật/tắt hiển thị (sửa nhanh qua switch trên danh sách) |

### Journey — Launching 1 Program mới (ra mắt 1 app mới cho chương trình affiliate)

Ví dụ cụ thể: Ownego vừa ra mắt app Shopify mới tên **"QuickShip Pro"**, slug thật trên Shopify Partner Dashboard là `quickship-pro`.

1. **Tạo Program**: vào màn hình Program → Create. Điền `name = "QuickShip Pro"`, và **quan trọng nhất**: `slug = "quickship-pro"` — phải khớp **chính xác từng ký tự** với giá trị Shopify sẽ gửi trong cột `App Slug` (hoặc `App Title` đã được map thủ công, xem [../03-payout-import/00-overview-and-upload-journey.md](../03-payout-import/00-overview-and-upload-journey.md)) của file CSV Payout. Điền thêm `app_store_url`, `description`, `image` để hiển thị đẹp trên trang Links của affiliate. Bật `visible = true` khi sẵn sàng cho affiliate quảng bá.
   - ⚠️ **Rủi ro cụ thể nếu gõ sai slug** (ví dụ gõ `quickship_pro` dùng gạch dưới thay vì gạch ngang, hoặc gõ nhầm `quick-ship-pro`): mọi dòng CSV Payout của app này sẽ **không khớp được `Customer`** nào (vì bước khớp dựa vào `Program.slug` đúng bằng `app_slug` trong CSV) → toàn bộ hoa hồng của app đó bị bỏ qua **âm thầm, không log, không cảnh báo** — admin sẽ chỉ phát hiện ra khi affiliate thắc mắc "sao tháng này tôi không thấy hoa hồng từ app X". Đây là lỗi khó phát hiện nhất trong toàn hệ thống vì không có gì báo lỗi ngay lúc nhập sai.
   - Khuyến nghị vận hành (suy luận hợp lý, không phải rule cứng trong code): sau khi tạo Program mới, nên upload thử 1 file CSV Payout nhỏ (hoặc chờ kỳ payout đầu tiên) và **chủ động kiểm tra** số "conversion created" trả về có khớp kỳ vọng hay không, thay vì tin tưởng slug đã đúng.
2. **Tạo Program Commission cho từng Level** — xem chi tiết bên dưới. Đây là bước **bắt buộc phải làm ngay sau khi tạo Program**, vì nếu chưa có `ProgramCommission` cho 1 tổ hợp `(Program, Level)`, dòng payout của affiliate đang ở Level đó sẽ **lỗi khi import** (không có rate để tính, xem [../02-commission/00-overview.md](../02-commission/00-overview.md), mục "Bước 2").

## Program Commission — cấu hình rate card (màn hình nghiệp vụ quan trọng nhất)

| Field | Ý nghĩa |
|---|---|
| `program_id`, `level_id` | 1 dòng cấu hình = rate cho đúng 1 cặp (Program, Level) |
| `percentage` | % hoa hồng recurring bình thường |
| `first_month_percentage` | % hoa hồng ưu đãi tháng đầu (thường cao hơn `percentage`) |
| `maximum_amount` | Cap **per-row** cho recurring/first-month |
| `handle_usage_charge` | Bật/tắt tính hoa hồng cho usage-charge của tổ hợp này |
| `usage_percentage` | % hoa hồng cho usage-charge (chỉ có ý nghĩa khi `handle_usage_charge = true`) |
| `usage_maximum_amount` | Cap **lifetime** theo affiliate cho tổng hoa hồng usage-charge |

### Ví dụ số liệu cụ thể — 1 rate card thực tế cho Program "QuickShip Pro"

Giả sử hệ thống có 3 Level (Level 1: 0-3 shop trả phí, Level 2: 4-15 shop, Level 3: 16+ shop) — admin cần tạo **3 dòng Program Commission riêng**, ví dụ:

| Level | `percentage` | `first_month_percentage` | `maximum_amount` | `handle_usage_charge` | `usage_percentage` | `usage_maximum_amount` |
|---|---|---|---|---|---|---|
| 1 | 10% | 15% | $50 | Tắt | — | — |
| 2 | 12% | 18% | $80 | Bật | 10% | $500 (lifetime) |
| 3 | 15% | 20% | $120 | Bật | 12% | $1000 (lifetime) |

Với rate card này: 1 affiliate Level 2 giới thiệu 1 shop trả phí $200/tháng recurring → nhận `min(200 × 12%, 80) = min(24, 80) = $24`/tháng. Nếu app này cũng tính phí usage và shop đó phát sinh $50 usage charge → affiliate Level 2 nhận thêm `50 × 10% = $5` (miễn là chưa vượt `usage_maximum_amount = $500` cộng dồn từ trước tới nay).

### Tại sao rate card theo cặp (Program × Level) chứ không phải 1 rate chung toàn hệ thống?

> *Suy luận business rationale (chưa xác nhận với PO):* mỗi app Shopify có biên lợi nhuận (margin) và chiến lược tăng trưởng khác nhau — app mới ra mắt cần affiliate tích cực quảng bá hơn nên có thể trả % cao hơn để khuyến khích, trong khi app đã ổn định có thể trả % thấp hơn. Đồng thời, việc trả % tăng dần theo Level (affiliate giới thiệu càng nhiều shop trả phí thì % càng cao) là cơ chế **giữ chân affiliate hiệu quả cao** (progressive incentive) — nếu chỉ có 1 rate chung, sẽ không tạo được động lực này. Nên xác nhận với PO nếu cần thay đổi chiến lược rate card cho 1 chương trình cụ thể, vì đây là quyết định ảnh hưởng trực tiếp tới chi phí acquisition của Ownego.

### Journey — Sửa rate card cho 1 Program đang hoạt động (tăng % để khuyến khích affiliate)

Ví dụ: Ops quyết định tăng `percentage` của "QuickShip Pro" Level 1 từ 10% lên 12% để thu hút thêm affiliate mới quảng bá app này.

1. Vào Program Commission → tìm đúng dòng `(QuickShip Pro, Level 1)`.
2. Sửa `percentage = 12`.
3. Lưu.
4. **Lưu ý quan trọng**: thay đổi này **chỉ áp dụng cho các dòng payout được import SAU thời điểm lưu** — mọi `Conversion` đã tạo trước đó vẫn giữ nguyên `percentage` cũ đã lưu trong DB tại thời điểm import, không tự động tính lại. Nếu cần áp dụng hồi tố, phải xử lý riêng (không có tính năng "recalculate" tự động trong admin panel).

### Bẫy dễ mắc — bật `handle_usage_charge` mà quên điền 2 field còn lại

Trên **form** (không phải danh sách), `handle_usage_charge` là switch bật/tắt được, kèm 2 field `usage_percentage`/`usage_maximum_amount` chỉ **bắt buộc khi switch đang bật** (ẩn/hiện bằng JS). Nếu admin bật switch này lên nhưng do thao tác nhanh bỏ sót 2 field kia (ví dụ bấm lưu trước khi JS kịp hiện field), hệ thống sẽ báo lỗi validate ngay khi submit — không cho lưu ở trạng thái thiếu. Đây là lý do trên **danh sách**, `handle_usage_charge` chỉ hiển thị dạng icon chỉ-xem (không phải switch bấm nhanh như `visible`) — nếu để switch bấm nhanh ở đây, nó sẽ bỏ qua toàn bộ validate `required_if` của form, có thể tạo ra trạng thái "bật usage charge nhưng không có rate" mà không ai biết cho tới khi có dòng usage charge thật đi qua và bị tính sai/tính $0.
