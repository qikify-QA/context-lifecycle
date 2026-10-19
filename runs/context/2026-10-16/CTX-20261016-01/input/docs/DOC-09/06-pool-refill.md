# Pool refill — trả item đã resell về pool

> Khi khách resell một item trúng từ Group box chế độ pool, item đó có thể được **trả về hàng đợi** để người khác trúng lại. Có hai kiểu: AUTO (tự trả) và MANUAL (giữ trong "bộ đệm" đến khi áp dụng). File này giải thích điều kiện, từng bước, ví dụ số, và khác biệt production/staging. Tồn kho pool xem [04-inventory-and-pools](04-inventory-and-pools.md); resell xem [nhóm 04](../04-resell-refund-credit/00-overview.md). Về nhóm: [00-overview](00-overview.md).

## Khi nào refill áp dụng

Cần **đủ ba điều kiện** cùng lúc:

1. Box là Group, chế độ pool ("Items in a group are removed after pull").
2. Chọn **"Automatically deactivate box"** (nghĩa là box có "tự dừng khi cạn").
3. Dòng "When items are resold by customers:" đặt **"Automatically refill resold items in the group"**.

Lý do điều kiện 2: pool *không* tự dừng thì đã tự xáo lại nhóm cạn rồi, không cần trả item. Single và Bundle **không** có refill.

Lưu ý giao diện: box lưu trước khi có tuỳ chọn này có thể hiện "Automatically refill" nhưng server coi là tắt cho tới khi lưu form (lúc đó lưu thành bật). Box mới mặc định "Not refill resold items in the group".

## AUTO và MANUAL

| | AUTO (mặc định của server) | MANUAL |
|---|---|---|
| Khi khách resell xong | Item được trả về pool ngay | Item vào "bộ đệm chờ" (pending) |
| Ai quyết định | Hệ thống | Người vận hành gọi API áp dụng (có thể chọn từng item/số lượng) |
| Màn hình portal | Chỉ có bật/tắt "auto refill" | **Không có màn hình**; đặt bởi API/Mysbox team |
| Dùng khi | Muốn bán lại item resell ngay | Muốn kiểm tra hàng hoàn về rồi mới đưa lên bán |

API áp dụng cũng chạy được với box AUTO (áp dụng những gì đang chờ). Endpoint xem [nhóm 09](../09-integrations/00-overview-and-auth.md).

## Bước từng bước (AUTO)

1. Bình resell một item trong thời gian cho phép; hệ thống hoàn tiền/credit xong.
2. Nếu box đủ ba điều kiện, hệ thống **ghi nhận** item đó vào bộ đệm của box (theo từng nhóm và item). Mỗi lần resell chỉ được tính một lần dù job chạy lại.
3. AUTO: một job áp dụng bộ đệm ngay. MANUAL: dừng ở đây.
4. Áp dụng: item được tìm trong phần "đã bốc" của hàng đợi nhóm, đưa trở lại phần "còn bốc được" ở một vị trí ngẫu nhiên, nhóm không còn "cạn". Nếu item không còn nằm ở phần đã bốc, đơn vị đó bị bỏ (`discarded`).
5. Box đang bị deactivate vì cạn có thể được Activate lại (qua kiểm tra "inventory pools are exhausted").

## Ví dụ AUTO (Shop An, "Kuji 6")

Hiếm có Phượng và Rồng. Bình trúng Phượng, Dũng trúng Rồng → Hiếm cạn → box tự deactivate, product thành Draft. Refill đã bật.

1. Bình resell Phượng trong thời hạn. Bộ đệm: Hiếm → Phượng ×1.
2. AUTO áp dụng: hàng đợi Hiếm (đã bốc [Phượng, Rồng], con trỏ 2) → Phượng quay về phần còn bốc được; Hiếm còn 1 item.
3. An Activate box (qua được kiểm tra pool). Khách kế tiếp có thể trúng Phượng. Nếu refill tắt, Phượng ở lại đã bốc và box vẫn cạn.

Ví dụ hàng đợi: Hiếm [A, B, A, C], con trỏ 2 (A, B đã bốc). Resell A → con trỏ lùi 1, đổi chỗ, rồi A được chen vào một vị trí ngẫu nhiên trong phần còn bốc được: kết quả có thể là [B, C, A, A] hoặc [B, A, A, C]… B vẫn "đã bốc", A trở lại.

## Ví dụ MANUAL

Giả sử Hiếm cạn, hai khách resell Rồng và Phượng. Bộ đệm: Hiếm → Rồng ×1, Phượng ×1. Chi (support) kiểm tra hàng hoàn về, chỉ áp dụng Rồng: bộ đệm còn Phượng ×1, Rồng quay lại pool. Phượng chờ lần áp dụng sau.

## Item nào được trả, item nào không

| Tình huống giữa lúc mua và lúc resell | Trả lại? |
|---|---|
| Đổi cài đặt hiển thị/animation | Có |
| Đổi chế độ nhóm, thêm/bớt item khác, đổi deactivate/draft (vẫn pool) | Có (item đã bốc vẫn là đã bốc) |
| Chính item đó bị bỏ khỏi pool | Không |
| Đổi pool → draw → pool | Không (hàng đợi mới) |
| Refill đang tắt lúc khách resell (bật sau không "chạy lại") | Không |
| Đơn test/preview | Không |
| Item bị bỏ rồi thêm lại trước khi resell, vẫn pool | Có |

## Khác biệt production / staging

- **Staging** `[chỉ có trên staging]`: mỗi hàng đợi có một mã nhận dạng ("queue token"). Item được trả nếu mã của nó khớp hàng đợi hiện tại. Sửa box (miễn còn ở pool) không làm hỏng khớp.
- **Production:** khớp theo *version của box lúc mua*. Chỉ cần box được sửa (version mới) giữa lúc khách mua và lúc resell là lượt trả item bị bỏ qua âm thầm.
- Staging có lệnh vận hành `pool-refill:backfill-queue-tokens` (hỗ trợ `--box=` và `--dry-run`) để dán mã cho các lượt bốc cũ và phát lại các lượt resell bị bỏ. Lệnh bỏ qua những ca không chắc để tránh trả sai item (thà bỏ sót còn hơn thêm sai). Do dev/ops chạy, không có màn hình.

## Câu hỏi thường gặp

- **Bật refill sau khi khách đã resell có trả lại được không?** Không, chỉ áp dụng cho resell xảy ra khi refill đang bật.
- **Tắt refill thì sao?** Bộ đệm bị xoá.
- **Box Single bị resell có refill không?** Không; chỉ Group pool.
- **Vì sao Phượng không về?** Kiểm tra bảng "Item nào được trả" và (trên production) xem box có bị sửa sau khi mua không.
