# Object: Global Option (product: teeinblue) — Feature Profile Summary
**Published context version:** 2
- **Context version:** 2 (published 2026-10-18, env: staging). Version 1 là bootstrap zero-doc (2026-09-16).
- **Features (3):** `global-option-instance-management`, `artwork-personalization-global-option-link`, `global-option-additional-option-items`.
- **Nguồn:** phần lớn là `OBSERVED_CURRENT` từ bootstrap; CBS-004 bổ sung các mục `CONFIRMED_EXPECTED` có test case PASS (staging, 2026-10-08 / 2026-10-11) cho Additional Option.
- **1 conflict mở chặn check edit-save:** `OQ-global-option-022` (CONF-CBS-004-01) — Save trên trang Edit còn gửi mutation do client dựng (KB-006) hay đã qua API validation (KB-034). Đến khi PO/Dev quyết, các check edit-save (CHK-01-007, 011, 014, 021–023) không có oracle.
- **Cần PO xác nhận:** hành vi có thể mất dữ liệu khi đổi nguồn item và bulk delete (`OQ-global-option-037`), Option Title có bắt buộc không (`OQ-global-option-026`).
- **Chưa phủ:** store Shopify Plus, các loại Global Option khác Single-line Text cho edit-save, GO nguồn category tạo trước TIB-5467.

---

## global-option-instance-management
Tạo, sửa, nhân bản, xoá và phân loại Global Option instance trên portal. Sau khi tạo một Additional Option, portal mở trang Edit của nó (KB-033). Đường edit-save đang có conflict (xem trên).

## artwork-personalization-global-option-link
Gắn Global Option vào layer artwork qua "Use an existing global option". Với Additional Option: order hiển thị dòng `<Option Title>: <item>`; Conditional Setting dùng item inline cho "is any of"; Quick-fill không đề xuất layer Additional Option.

## global-option-additional-option-items
Chọn nguồn item (inline hoặc category) cho Additional Option — đổi nguồn hiện dialog cảnh báo và xoá Default value, quay lại nguồn cũ khôi phục dữ liệu cũ; bulk upload thumbnail khớp theo tên file, bulk delete item đã tick; thứ tự item (kéo thả, Sort A→Z) được lưu và hiển thị trên storefront sau Update campaign.
