# Plans, Charges, Discounts, Promote codes

> Bốn màn hình liên quan **tiền và quyền lợi** của merchant. Plan và Charge nằm trong menu **Payment**; Discount và Promote code nằm trong **Marketing tools**. File này nói thao tác trên panel; cơ chế tính tiền xem [plans & billing](../05-plans-billing/00-overview.md). Thuộc nhóm [admin panel](00-overview.md).

Tóm tắt khác biệt dễ nhầm:

| Màn | Đổi cái gì | Không đổi cái gì |
|---|---|---|
| Plan | Cái merchant **có thể mua** | Điều khoản của người đã mua (đã chụp lại lúc họ đồng ý) |
| Charge | Chỉ xem | Không ai tạo/sửa/xóa được |
| Discount | **Giá** subscription và/hoặc ngày trial | Capacity |
| Promote code | **Capacity** (số box miễn phí mỗi chu kỳ) | Giá |

## 1. Charges (chỉ đọc)

Tab: All / Recurring / One Time / Usage. Cột: id, shop id, charge id, cờ test, status, giá, tiền tệ, mô tả, charge tham chiếu, ngày. Dùng để đối chiếu với Shopify Partner khi nghi ngờ lệch. Ý nghĩa trạng thái: [billing cycle & charges](../05-plans-billing/03-billing-cycle-and-charges.md). Từ trang Shop cũng có tab Charges lọc sẵn theo shop đó ([02](02-shops-users.md)).


## 2. Plans

**Danh sách.** Tab All / Recurring / One Time. Cột: id, name, slug, type, price, currency, interval (30 ngày hoặc năm), thứ tự hiển thị, công tắc **Visible**, Plus, Shopify Paid, Test. Filter: visible, interval, test.

- Công tắc **Visible** bật/tắt plan trên trang Pricing của merchant **ngay lập tức** (hiện "Visibility updated"). Người đang dùng plan không bị ảnh hưởng.

**Form tạo/sửa:**

| Section | Trường chính |
|---|---|
| Overview | name, slug, description, label, type (Recurring/One-time), interval, order |
| Trial and status | trial days; công tắc Test, Visible, **On install** (plan mặc định/Free), Plus, Shopify-paid |
| Info (giá) | price, currency (mặc định USD), ký hiệu, **capped amount** (trần phí usage mỗi chu kỳ mà Shopify áp), terms, discount type/value/intervals, usage fee type/value, **Box Selling Capacity (bắt buộc)**; với giá theo giá trị box: ngưỡng (USD), phí tối thiểu (USD), % phí (hai trường sau bắt buộc khi đã có ngưỡng) |
| Features | class CSS thêm và danh sách gạch đầu dòng tính năng (active, tên, HTML, class) |

Luật quan trọng:

- Điều khoản được **chụp lại** lúc merchant đồng ý. Sửa plan **không** đổi giá người đang dùng; subscription mới (kể cả cùng merchant đăng ký lại) mới theo điều khoản mới.
- **"On install" phải có đúng một plan.** Thiếu plan mặc định thì cài mới bị hỏng.

Ví dụ giá theo giá trị box (ngưỡng $50, tối thiểu $0.50, 2%): box $30 → phí $0.50; box $50 → $1.00; box $120 → $2.40; quà tặng $0 → $0.50. Cơ chế: [usage pricing](../05-plans-billing/02-usage-pricing.md).

## 3. Discounts (giảm giá subscription)

Giảm **giá subscription** (phần trăm hoặc số tiền cố định) và/hoặc cộng ngày trial. Merchant nhập mã trong hộp nhập mã (discount code) ở portal; Shopify áp giảm giá ở trang duyệt.

| Trường | Ghi chú |
|---|---|
| code | luôn lưu **chữ HOA** |
| plans áp dụng, starts/ends | |
| **Active** | có hiệu lực **ngay khi gạt công tắc**, kể cả chưa bấm Save |
| total uses | **mặc định 0 = hết lượt**; gõ **-1** để không giới hạn |
| type, value, intervals | Percentage hoặc Amount; áp trong bao nhiêu kỳ |
| extra trial days | ngày trial thêm |
| application type | All, hoặc Limited (bắt buộc kèm danh sách shop; chọn All sẽ xóa danh sách và cảnh báo) |

Có tab xem plans, shop đã dùng, shop được phép. Mã id 1 "extend trial" (+7 ngày) được app dùng riêng: **không xóa, không dùng lại cho mục đích khác**. Chi tiết: [billing discounts](../05-plans-billing/06-billing-discounts.md).

## 4. Promote codes (tặng capacity)

Tặng **số box miễn phí mỗi chu kỳ**, không giảm hóa đơn.

| Trường | Ghi chú |
|---|---|
| code | **phân biệt hoa/thường**, lưu đúng như gõ |
| free boxes per cycle | ít nhất 1 |
| valid cycles | số chu kỳ; -1 = vĩnh viễn |
| plans áp dụng | |
| **type** | *Immediate*: tặng ngay (plan phải nằm trong danh sách); *First upgrade*: tặng khi merchant lần đầu subscribe plan trong danh sách và chưa từng có charge |
| total uses | -1 = không giới hạn |
| application type | All stores / Specific stores (kèm danh sách) |
| start, end, **Active** (có hiệu lực ngay) | |

Tab **Redemptions**: shop, trạng thái (Pending / Active / Expired), số chu kỳ, capacity thêm, ngày kích hoạt/hết hạn/đổi. Chi tiết: [promote codes](../05-plans-billing/05-promote-codes.md).


## Ví dụ: Chi tặng capacity cho Shop An

Shop An (plan Pro, capacity 100/chu kỳ) sắp chạy chiến dịch. Chi muốn tặng 50 box. Cô tạo promote code `SPRING`, type **Immediate**, 50 free boxes, valid cycles 3, plans = Pro, application type = Specific stores (chỉ Shop An), total uses 1, **Active**. An nhập mã: capacity thành **150** ngay và giữ 150 trong 3 chu kỳ, sau đó về 100. Hóa đơn của An **không giảm**. Muốn giảm giá thì Chi phải tạo **Discount** riêng, ví dụ `LAUNCH20` Percentage 20 trong 3 kỳ, plan $29 → Shopify tính $23.20 × 3 kỳ rồi $29; và nhớ đặt total uses = -1 hoặc số lượt thật, nếu để 0 mã báo "hết lượt" ngay.

## Câu hỏi thường gặp

- **Mã giảm giá báo hết lượt ngay?** Total uses mặc định 0; đặt -1.
- **Tắt Visible nhưng khách cũ vẫn trả plan đó?** Đúng, Visible chỉ ảnh hưởng trang Pricing.
- **Mã promote bị từ chối "forbidden"?** Đọc thông báo: hết lượt, chưa active, hết hạn, shop không thuộc danh sách, đã dùng rồi, plan hiện tại không đủ điều kiện, hoặc sai hoa/thường.
- **Muốn đổi plan của shop?** Panel không đổi trực tiếp; dùng "Generate recurring payment link" ([02](02-shops-users.md)).
