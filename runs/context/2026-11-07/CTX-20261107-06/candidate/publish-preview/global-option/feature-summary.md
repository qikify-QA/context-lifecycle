# Object: Global Option (product: teeinblue) — Feature Profile Summary
**Published context version:** 5
- **Context version:** 5 (published 2026-11-07, env: staging). Version 1 là bootstrap zero-doc (2026-09-16); version 2 là CBS-004 (2026-10-18); version 3 là CBS-013 (TIB-5203); version 4 là CBS-073 (TIB-5591); version 5 là CBS-100 (TIB-5561, TIB-5566, TIB-5470).
- **Features (3):** `global-option-instance-management`, `artwork-personalization-global-option-link`, `global-option-additional-option-items`.
- **Nguồn:** phần lớn là `OBSERVED_CURRENT` từ bootstrap; CBS-004 bổ sung các mục `CONFIRMED_EXPECTED` có test case PASS (staging, 2026-10-08 / 2026-10-11) cho Additional Option.
- **1 conflict mở chặn check edit-save:** `OQ-global-option-022` (CONF-CBS-004-01) — Save trên trang Edit còn gửi mutation do client dựng (KB-006) hay đã qua API validation (KB-034). Đến khi PO/Dev quyết, các check edit-save (CHK-01-007, 011, 014, 021–023) không có oracle.
- **Cần PO xác nhận:** hành vi có thể mất dữ liệu khi đổi nguồn item và bulk delete (`OQ-global-option-037`), Option Title có bắt buộc không (`OQ-global-option-026`), storefront có cần sync campaign mới nhận thay đổi của Global Option không (`OQ-global-option-043`).
- **Chưa phủ:** store Shopify Plus, các loại Global Option khác Single-line Text cho edit-save, GO nguồn category tạo trước TIB-5467.

---

## global-option-instance-management
Tạo, sửa, nhân bản, xoá và phân loại Global Option instance trên portal. Sau khi tạo một Additional Option, portal mở trang Edit của nó (KB-033). Đường edit-save đang có conflict (xem trên). Save Global Option bị server chặn khi Flux width × height > 4 MP (biên ≤, mọi loại GO gồm Single upload có effect Flux, portal/REST và MCP; KB-720); text lỗi chưa chốt (`OQ-global-option-045`), hai toast khi lỗi là known defect (KB-722, `OQ-global-option-046`). MCP tạo được GO Multiple Uploads mà portal mở như form text (KB-723, chờ PO ở `OQ-global-option-047`). Sửa global option rồi storefront nhận thay đổi khi nào chưa được xác nhận: KB-372 (PROPOSED) ghi hai lượt khác nhau trong TC-TIB-6199, campaign 3069 giữ dữ liệu cũ tới khi sync, campaign 3072 hiện ngay; chờ PO ở `OQ-global-option-043`, CHK-01-025 chưa có oracle.

## artwork-personalization-global-option-link
Gắn Global Option vào layer artwork qua "Use an existing global option". Với Additional Option: order hiển thị dòng `<Option Title>: <item>`; Conditional Setting dùng item inline cho "is any of"; Quick-fill không đề xuất layer Additional Option.

- **Cập nhật CBS-100 (TIB-5470, TIB-5566):** layer dùng Global Option hiện `Run effects` cạnh `Image effects (N)` và liệt kê effect theo thứ tự của GO (KB-725); giá trị biến prompt của Run effects lưu theo layer, không trên GO (KB-727). Run effects không đổi GO và tooltip khi GO có 0 effect mới chỉ quan sát (KB-726, KB-728; `OQ-global-option-050`, `OQ-global-option-051`). Trên staging khi TIB-5416 đang revert, photo layer GO dùng chung position giữa các template là known defect (KB-724, `OQ-global-option-049`).
- **Cập nhật CBS-013 (TIB-5203):** campaign editor hiện layer Global Option kèm lựa chọn (KB-371, OBSERVED_CURRENT/LOW, 1 lượt trên staging trước redeploy) — chưa xác nhận, CHK-02-028 là NEEDS_CONFIRMATION (OQ-global-option-038).

## global-option-additional-option-items
Chọn nguồn item (inline hoặc category) cho Additional Option — đổi nguồn hiện dialog cảnh báo và xoá Default value, quay lại nguồn cũ khôi phục dữ liệu cũ; bulk upload thumbnail khớp theo tên file, bulk delete item đã tick; thứ tự item (kéo thả, Sort A→Z) được lưu và hiển thị trên storefront sau Update campaign.
