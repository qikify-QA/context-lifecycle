# Promote code (mã cộng thêm quota)

> File này nói về **promote code**: mã cho shop thêm box miễn phí mỗi chu kỳ trong một số chu kỳ. Nó chỉ đổi quota, **không đổi giá** (đổi giá là việc của [billing discount](06-billing-discounts.md)). Quota gốc ở [01-plans-and-capacity.md](01-plans-and-capacity.md). Màn admin ở [08-admin/05](../08-admin-panel/05-plans-discounts-promo-charges.md). Về nhóm: [00-overview.md](00-overview.md).

## Ai tạo

Chỉ admin Ownego, ở "Marketing tools" > "Promote codes" (quyền: xem list, xem chi tiết, tạo, sửa, xoá).

| Trường | Ý nghĩa |
|---|---|
| Code | Duy nhất, tự viết HOA khi lưu. Merchant phải nhập đúng chữ HOA (tra cứu khớp tuyệt đối) |
| Description | Ghi chú |
| Free Boxes Per Cycle | Quota thêm mỗi chu kỳ (số nguyên >= 1) |
| Valid Cycles (-1 = unlimited) | Số chu kỳ còn hiệu lực. Mặc định -1 |
| Applicable Plans | Plan mà mã hợp lệ và còn sống |
| Type | `Immediate` hoặc `First upgrade` |
| Total Amount (Max Uses, -1 = unlimited) | Số lượt tối đa. Mặc định -1 |
| Application type | "All Stores" hoặc "Specific Stores" (kèm "Applicable Stores" theo domain shop, bắt buộc khi Specific) |
| Starts At / Ends At | Cửa sổ đổi mã (Ends sau Starts) |
| Active | Công tắc; tắt là ghi "deactivated" ngay |

Tab trên mỗi mã: Plans, Applicable Stores, Redemptions (chỉ đọc: shop, trạng thái, số chu kỳ, quota thêm, ngày kích hoạt, hết hạn, ngày đổi).

## Hai loại mã

| Loại | Khi merchant đổi | Hiệu lực |
|---|---|---|
| Immediate | Redemption **Active** ngay | Quota tăng lập tức (giữa chu kỳ: cộng vào quota hiện tại) |
| First upgrade | Redemption **Pending** | Chưa có gì; chỉ khi shop đăng ký một plan nằm trong danh sách của mã thì mới Active và cộng quota |

## Merchant dùng thế nào

Server có hai lời gọi: tra cứu mã (mô tả, loại, số box, số chu kỳ, plan) và đổi mã. **Không tìm thấy** màn hình nào trong portal cho merchant tự gõ promote code; trên thực tế việc đổi mã do support làm hoặc qua giao diện ngoài các repo đã đọc. *chưa xác nhận: kênh nào merchant thực sự dùng.*

Thứ tự kiểm tra khi đổi (mỗi lỗi báo "forbidden" kèm thông điệp):

```
1. hết lượt (Max Uses)
2. mã không Active / chưa tới Starts At / đã quá Ends At
3. "not available for your store" (Specific Stores mà shop không nằm trong)
4. shop đã đổi mã này rồi (Active hoặc Expired đều tính — mỗi shop một lần mãi mãi)
5. shop đang có một promote code Active khác (mỗi lúc chỉ 1 mã)
6. Immediate: plan HIỆN TẠI của shop phải nằm trong danh sách plan của mã (Free tính nếu có trong danh sách)
7. First upgrade: shop phải CHƯA TỪNG có bản ghi charge nào ("only available for first-time upgrades")
```

## Cấp thêm capacity và hết hạn

- Quota mỗi chu kỳ = quota plan + số box thêm của mã còn hiệu lực. Mỗi chu kỳ mới tự cộng lại.
- Hết hạn: -1 = không bao giờ; ngược lại hết vào cuối chu kỳ thứ N (`valid_cycles = 1` hết cuối chu kỳ hiện tại). Việc hết hạn "lười": không có job, được áp khi đổi plan hoặc đọc số liệu.
- Nếu plan của shop không còn nằm trong mã, hoặc mã bị xoá/tắt, redemption bị đánh dấu hết hạn ở lần đổi plan kế tiếp.
- Phần thêm chỉ là quota: +50 trên plan 100 box nghĩa là 150 box trước khi tính phí vượt.
- Mỗi lần đổi plan chỉ xét một redemption.


## Ví dụ

**Ví dụ 1 — Immediate (Shop Giang).** Mã `LAUNCH50`: Immediate, +50 box, 3 chu kỳ, áp dụng cho "Pro" (quota 100). Giang đang Pro, chu kỳ kết thúc 2026-11-10.
- Đổi mã: Active, quota 100 → 150 ngay, hết hạn 2027-01-09.
- Chu kỳ mới 11-10: 100 + 50; rồi 12-10 lại 100 + 50; sau 2027-01-09 về 100.
- Chu kỳ đầu bán 160 box = 150 miễn phí + 10 box vượt × phí plan.

**Ví dụ 2 — First upgrade (Shop Hạnh).** Mã `NEWPRO`: First upgrade, +100 box, vĩnh viễn, áp dụng "Growth".
- Hạnh là shop mới, đổi mã → Pending, quota vẫn như cũ.
- Hạnh đăng ký Growth (quota 100) → Active, quota thành 200 mỗi chu kỳ, mãi mãi.

<a id="s4"></a>
**S4 — Shop An áp promote code.** An đang Growth (quota 100, used 60), support đổi giúp `LAUNCH50` (Immediate, +50, 3 chu kỳ). Quota thành 150 ngay, thẻ hiện `60 / 150`, mỗi chu kỳ trong 3 chu kỳ lại +50. Lỗi hay gặp: nhập chữ thường (không tìm thấy); đã có mã Active khác ("already has an active promote code"); shop Free mà mã không liệt kê Free ("Current plan is not eligible"). Phần giảm giá của An xem ở [06](06-billing-discounts.md#s4b).

## Câu hỏi thường gặp

- **Muốn tặng merchant một tháng box?** Tạo mã Immediate, Specific Stores, 1 chu kỳ; hoặc sửa tay Box Selling Capacity (sẽ bị xoá ở chu kỳ sau).
- **Quota thêm biến mất?** Redemption hết hạn hoặc shop đổi sang plan không nằm trong mã; xem tab Redemptions.
- **Mã First upgrade cứ Pending?** Shop chưa đăng ký plan trong danh sách mã; Pending vẫn tính vào Max Uses.
