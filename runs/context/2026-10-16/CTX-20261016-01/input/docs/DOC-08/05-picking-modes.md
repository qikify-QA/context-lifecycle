# Picking mode — cách chọn item khi bốc thăm

> "Picking mode" quyết định thuật toán server dùng để chọn prize cho mỗi hộp: có cho trùng trong một đơn không, có tính tới nhiều set cùng lúc không, nhóm Group trả lại hay giữ lại item. File này gom tất cả mode, ví dụ số cho mỗi mode, và đánh dấu cái nào chỉ có trên staging. Loại box xem [01-box-types](01-box-types.md); tồn kho xem [04-inventory-and-pools](04-inventory-and-pools.md). Về nhóm: [00-overview](00-overview.md).

## Bảng các mode

| Áp dụng cho | Mode | Merchant chỉnh ở đâu | Tóm tắt |
|---|---|---|---|
| Single / Bundle | Mặc định (nội bộ: "simple"/"binned") | không cần chỉnh | Mỗi hộp bốc độc lập, theo số lượng còn lại (tracked) hoặc theo % (untracked) |
| Single / Bundle | "Unique in an order" | "Advanced Settings" → tick "Ensure that each item selected within an order is unique and not duplicated." | Trong **một đơn** nhiều hộp, item không lặp cho đến khi đã ra hết các item của set |
| Bundle | "Unique across pools" `[chỉ có trên staging]` | **Không có màn hình**; đặt qua API / Mysbox team | Trải đều item trùng giữa các set, một hộp không chứa cùng item hai lần nếu kho cho phép |
| Group | draw | "Items in a group can be duplicated after pull" | Item có hoàn lại, bốc không giới hạn |
| Group | pool | "Items in a group are removed after pull" | Item đã trúng rời nhóm |
| Group pool | Refill / Redistribute / Deactivate | "When one of groups has been all revealed" | Xem [04](04-inventory-and-pools.md) |

Mode "Unique" chỉ có ý nghĩa khi một đơn mua **nhiều hộp cùng variant**. Mode mặc định "binned" có cùng xác suất với "simple" (cơ chế chia ô chỉ là chi tiết bên trong), merchant không thu lợi gì khi phân biệt.

## Bước 1 — Mặc định (simple/binned)

- **Tracked:** server bốc số nguyên từ 1 đến tổng còn lại, đi theo số lượng cộng dồn. Ví dụ set {A:3, B:2} tổng 5, ra 4 → A đã chiếm 1-3, B chiếm 4-5 → trúng **B**; set còn {A:3, B:1}.
- **Untracked:** bốc số thập phân 0-1, đi theo chance cộng dồn. {A:0,5, B:0,3, C:0,2}, ra 0,62 → **B**.
- Bundle có nhiều set thì mỗi set tung **độc lập** (có thể trùng item giữa các set).

## Bước 2 — "Unique in an order"

Ví dụ: Shop An có set tracked {A:3, B:1} (tồn kho 4). Bình mua **3 hộp trong một đơn**.

```
Không bật Unique: có thể ra A, A, A.
Bật Unique:
  Hộp 1: bốc theo số lượng còn lại → giả sử A (còn A2, B1)
  Hộp 2: A đã ra rồi, chỉ còn ứng viên B → bắt buộc B (B hết)
  Hộp 3: đã ra đủ cả hai nên đặt lại danh sách, bốc từ kho còn → A
  Kết quả: A, B, A
```

Với untracked, các hộp trong đơn bốc theo chance nhưng bỏ qua item đã ra trong vòng hiện tại.

Lưu ý nghiệp vụ: "Unique" không có trong Group box (portal ẩn tuỳ chọn này).

## Bước 3 — "Unique across pools" `[chỉ có trên staging]`

Dùng cho Bundle khi **cùng một item nằm ở nhiều set**. Mục tiêu: chia đều số đơn vị của item cho các hộp còn lại.

Ví dụ (Shop An, Bundle tracked, tồn kho 3): Set 1 {A:2, B:1}, Set 2 {A:1, B:2}.

1. Tổng A = 3, B = 3, còn 3 hộp → mỗi hộp phải có A đúng 1 lần và B đúng 1 lần.
2. Hộp có "A ở set 1 + A ở set 2" là không khả thi nên **không bao giờ được bốc**.
3. Kết quả cả 3 hộp: mỗi hộp gồm một A và một B (thứ tự tuỳ set), không hộp nào A+A hay B+B.

Ví dụ 2: Set 1 {A:2, B:1}, Set 2 {C:3}, 3 hộp. C xuất hiện ở cả 3 hộp; A ở 2 trong 3 hộp; B ở 1 hộp (floor/ceil của tổng chia số hộp còn lại).

Cách hoạt động: mỗi lần bốc, hệ thống kiểm tra "các hộp còn lại vẫn chia được không" trước khi chọn ứng viên; nếu mọi phương án đều không chia được, hộp đó rỗng. Untracked: xếp hạng ứng viên theo "số lần đã ra trong lượt, rồi ngẫu nhiên theo chance"; nếu hết cách tránh trùng thì vẫn lấy ứng viên tốt nhất.

Giá trị mặc định của box mới là **không** dùng mode này, và hiện không có chỗ bật trong portal. Chỉ dùng khi Mysbox team đã đặt cho box.

## Bước 4 — Group: draw, pool, shared, independent

- **draw:** tung nhóm theo chance, chọn item đều trong nhóm, có hoàn lại. Ví dụ ở [01](01-box-types.md).
- **pool:** mỗi nhóm có hàng đợi xáo sẵn; lấy item kế tiếp trong hàng.
- **Independent vs shared** (portal không gọi tên này, nó nằm sau lựa chọn "When one of groups has been all revealed"):

| Lựa chọn trên UI | Cơ chế bên trong | Khi nhóm cạn |
|---|---|---|
| "Refill the group" | independent | Nhóm cạn được xáo lại khi tung trúng nó |
| "Continuously randomize items in the remaining groups" | shared | Bỏ qua nhóm cạn; hết mọi nhóm mới xáo lại tất cả |
| "Automatically deactivate box" | independent + tự tắt | **Nhóm đầu tiên** cạn là tắt box, dù nhóm khác còn |

- Mỗi lần tung nhóm có thể lấy nhiều item (số "pick_count"); mặc định 1 và portal không có ô chỉnh. *chưa xác nhận: ai đặt giá trị khác 1 nếu cần.*

## Câu hỏi thường gặp

- **Khách mua 5 hộp, sao có hai hộp giống nhau?** Mode mặc định cho phép; bật "Unique in an order" nếu muốn tránh.
- **Bật "Unique in an order" có làm chance thay đổi?** Có, trong phạm vi một đơn, vì item đã ra bị loại tạm thời.
- **Có thể bật "Unique across pools" trên production?** Chưa: code mode này chưa lên production.
