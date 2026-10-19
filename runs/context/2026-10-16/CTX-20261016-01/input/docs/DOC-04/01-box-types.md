# Các loại box và cách chọn

> Mysbox có 3 loại box: **Single**, **Bundle**, **Group** (trong code gọi là tier). File này giúp merchant chọn đúng loại và cho một ví dụ số mỗi loại: ai trúng gì, tồn kho giảm thế nào. Cách điền form xem [02-create-and-publish](02-create-and-publish.md); thuật toán chọn nâng cao xem [05-picking-modes](05-picking-modes.md). Về nhóm: [00-overview](00-overview.md).

## Bước 1 — Merchant thấy gì khi chọn loại

Trong "Boxes" app hiện hai thẻ: **"Single box"** ("A mystery box with one randomly chosen item.") và **"Bundle box"** ("A mystery box with multiple items, each one randomly picked from a different set."). Loại thứ ba, Group, nằm **bên trong Single box**: radio "Randomization method" → **"Random by group(s)"**.

```
Nếu shop KHÔNG thấy radio "Randomization method"
   → tuỳ chọn nhóm (Group) chưa được bật cho shop → nhờ Mysbox team bật
Nếu thấy
   → "Random by single item(s)" = Single | "Random by group(s)" = Group
```

## Bảng chọn nhanh

| Merchant muốn | Chọn | "Track quantity" ở Shopify | Item cần | Tồn kho |
|---|---|---|---|---|
| 1 prize/hộp, tỉ lệ cố định, bán mãi | Single | OFF | % mỗi item, tổng 100% | Không hết; tỉ lệ không đổi |
| 1 prize/hộp, số lượng thật có hạn | Single | ON | số lượng mỗi item, tổng = tồn kho Shopify | Mỗi lần bán trừ đúng item trúng |
| Nhiều prize/hộp (figure + sticker + quà) | Bundle (2-20 set) | ON hoặc OFF | mỗi set điền như trên | Trừ 1 item **ở mỗi set** |
| Độ hiếm, item trúng lại nhiều lần | Group, "Items in a group can be duplicated after pull" (draw) | không dùng để tính tỉ lệ | nhóm có chance %, item hoặc collection | Mysbox không giới hạn; chỉ Shopify giới hạn |
| Độ hiếm, mỗi item trúng đúng 1 lần (kiểu ichiban-kuji) | Group, "Items in a group are removed after pull" (pool) | nên ON | tổng item ≥ tồn kho | Trúng là mất khỏi nhóm |
| Lấy prize từ cả collection | Group + "Select by specific collection" | tuỳ | 1 collection mỗi nhóm | Collection được chụp lại lúc save/sync |

## Ví dụ 1 — Single, tracked (Shop An, "Hộp keychain")

Tồn kho Shopify của hộp: **10**. Item: Keychain A × 5, B × 3, C × 2 (tổng 10 = tồn kho). Chance hiển thị: A 50%, B 30%, C 20%.

- Bình mua 1 hộp. Server bốc một số ngẫu nhiên từ 1 đến 10 rồi đi theo số lượng cộng dồn (1-5 → A, 6-8 → B, 9-10 → C). Giả sử ra **7** → Bình trúng **B**.
- Tồn kho item còn A 5, B 2, C 2 (tổng 9). Người mua kế tiếp: A 5/9 = 55,6%, B 22,2%, C 22,2%.
- Hộp cuối cùng chắc chắn là item còn sót lại.

## Ví dụ 2 — Single, untracked

Sticker 60%, Pin 30%, Poster 10% (tổng 100%). Mỗi đơn là một lần tung độc lập: số ngẫu nhiên 0,62 → vượt 0,6 của Sticker, nằm trong 0,6-0,9 → **Pin**. Không có tồn kho item nào bị trừ; merchant tự giữ đủ hàng prize ở Shopify.

## Ví dụ 3 — Bundle, tracked ("Hộp figure + sticker")

Tồn kho hộp 10. **Prize #1**: Figure A × 6, Figure B × 4. **Prize #2**: Sticker X × 7, Sticker Y × 3. Mỗi set cộng đúng 10.

- Bình mua 1 hộp: set 1 tung độc lập (ra 8 → B), set 2 tung độc lập (ra 2 → X). Bình nhận **Figure B + Sticker X**.
- Sau đó: set 1 còn A 6, B 3; set 2 còn X 6, Y 3 — mỗi set còn 9. Mỗi hộp luôn trừ 1 item ở **mỗi** set.
- Bundle untracked: mỗi set cộng 100% và tung độc lập như Single.

## Ví dụ 4 — Group, chế độ draw (loot box)

Nhóm mặc định: Common 50% (10 item), Rare 30% (6 item), Epic 15% (3), Legendary 5% (2).

- Server tung chance nhóm: số 0,62 rơi vào khoảng 0,5-0,8 → nhóm **Rare**. Rồi chọn ngẫu nhiên đều 1 trong 6 item của Rare (mỗi item 1/6 = 16,7% trong nhóm).
- Xác suất thực của một item Rare = 30% × 1/6 = 5%.
- "Có hoàn lại": item đó vẫn có thể trúng tiếp lần sau, nhiều khách cùng trúng một Legendary. Box không tự hết.

## Ví dụ 5 — Group, chế độ pool (ichiban-kuji)

Tồn kho hộp 6; nhóm "Hiếm" 50% (Rồng, Phượng), nhóm "Thường" 50% (Mèo, Chó, Gà, Vịt) — tổng 6 item ≥ tồn kho (bắt buộc ≥, không cho ít hơn). Mỗi nhóm có một hàng đợi xáo trộn; trúng item nào là item đó rời khỏi hàng. Khi một nhóm hết thì xảy ra gì: xem [04-inventory-and-pools](04-inventory-and-pools.md#nhóm-hết-item-pool-mode).

## Phân biệt "loại box" và "category"

Loại (Single/Bundle/Group) quyết định **cách chọn prize**. Category quyết định **cách giao**: "Instantly opening box" (số, khách mở online, có animation và buyback) hoặc "Sealed box" (vật lý, prize ẩn, ship sau, không animation/buyback). Hai thứ độc lập: loại nào cũng có thể là số hoặc vật lý. Xem [nhóm 03](../03-orders-and-reveal/05-physical-vs-digital.md).

## Câu hỏi thường gặp

- **Single và Bundle khác gì nếu Bundle chỉ có 1 set?** Portal bắt Bundle có ít nhất 2 set; một prize/hộp thì dùng Single.
- **Đổi từ "single item" sang "group" có giữ item đã chọn không?** Không, đổi chế độ sẽ reset danh sách item.
- **Giới hạn số item/nhóm?** Chỉ biết Bundle tối đa 20 set. *chưa xác nhận: giới hạn số item mỗi set và số nhóm Group (server không đặt trần)*.
