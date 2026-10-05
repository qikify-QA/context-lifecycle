# Open Questions — admin-console Tổng: 15 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-admin-console-001 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-001", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-home-dashboard", "check_ids": [ "CHK-003" ], "summary": "Bảng sự kiện khi tổng số sự kiện customer thực tế ít hơn 10. Khi tổng số sự kiện customer thực tế ít hơn 10, bảng trên trang chủ admin hiển thị bao nhiêu dòng (ít hơn 10, hay có placeholder)? Và '10' là cố định hay cấu hình được?"
}
``` ## OQ-admin-console-002 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-002", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-home-dashboard", "check_ids": [ "CHK-004" ], "summary": "Vai trò không phải admin (hoặc chưa đăng nhập) không truy cập được trang chủ admin. Cơ chế đăng nhập/cấp tài khoản admin panel là gì (route, ai cấp, session/TTL, 2FA), và truy cập '/admin' khi không đủ quyền/chưa đăng nhập trả về hành vi nào?"
}
``` ## OQ-admin-console-003 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-003", "type": "NEEDS_CONFIRMATION", "feature_id": "admin-home-dashboard", "check_ids": [ "CHK-005" ], "summary": "Phạm vi đếm của 5 ô số liệu có loại trừ bản ghi soft-delete/Disapproved/cancelled hay không. 5 ô số liệu tổng trên trang chủ admin đếm trên phạm vi nào — có tính record đã soft-delete (customer), affiliate Disapproved, invoice đã cancel hay không?"
}
``` ## OQ-admin-console-004 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-004", "type": "NEEDS_CONFIRMATION", "feature_id": "data-maintenance-commands", "check_ids": [ "CHK-005" ], "summary": "Từ chối xác nhận (abort) ở prompt của conversion-type:update. Khi người chạy từ chối/huỷ prompt xác nhận của `conversion-type:update`, lệnh có đảm bảo không đổi gì (exit sạch) không, hay có khả năng đã ghi một phần trước khi bị huỷ?"
}
``` ## OQ-admin-console-005 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-005", "type": "NEEDS_CONFIRMATION", "feature_id": "data-maintenance-commands", "check_ids": [ "CHK-006" ], "summary": "user-level:update với affiliate đang is_vip=true. `user-level:update` có HẠ bậc affiliate không hay chỉ nâng bậc, và affiliate đang is_vip=true có bị lệnh này ghi đè level không?"
}
``` ## OQ-admin-console-006 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-006", "type": "NEEDS_CONFIRMATION", "feature_id": "data-maintenance-commands", "check_ids": [ "CHK-008" ], "summary": "4 console command có để lại log/audit truy vết (ai chạy, lúc nào, bao nhiêu dòng bị đổi) không. 4 console command bảo trì có để lại log/audit (ai chạy, lúc nào, bao nhiêu dòng bị đổi) không, và có chạy được trên production mà không cần phê duyệt không?"
}
``` ## OQ-admin-console-007 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-007", "type": "NEEDS_CONFIRMATION", "feature_id": "data-maintenance-commands", "check_ids": [ "CHK-009" ], "summary": "Lệnh lịch sử tapfiliate:sync có còn chạy được (rủi ro chạy nhầm nhập dữ liệu cũ) không. Lệnh `tapfiliate:sync` còn tồn tại trong codebase (còn chạy được) hay đã bị xoá? Nếu còn, chạy nhầm có nhập dữ liệu cũ vào hệ thống tiền không?"
}
``` ## OQ-admin-console-008 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-008", "type": "NEEDS_CONFIRMATION", "feature_id": "data-maintenance-commands", "check_ids": [ "CHK-010" ], "summary": "conversion-type:update có tính lại amount/percentage theo rate card khi đổi type không. `conversion-type:update` có tính lại amount/percentage của Conversion theo rate card khi đổi type không, hay chỉ sửa đúng cột type và giữ nguyên số tiền cũ?"
}
``` ## OQ-admin-console-009 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-009", "type": "NEEDS_CONFIRMATION", "feature_id": "embedded-version-cache-bust", "check_ids": [ "CHK-002" ], "summary": "Nhập giá trị Embedded Version không theo khuyến nghị (không phải timestamp/số phiên bản). Form Embedded Version có validate định dạng giá trị nhập không, hay nhận chuỗi bất kỳ như tài liệu hedge nêu ('thường dùng timestamp hoặc số phiên bản')?"
}
``` ## OQ-admin-console-010 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-010", "type": "NEEDS_CONFIRMATION", "feature_id": "embedded-version-cache-bust", "check_ids": [ "CHK-003" ], "summary": "Nhập giá trị rất dài hoặc chứa ký tự đặc biệt vào ô Embedded Version. Ô nhập Embedded Version có giới hạn độ dài hoặc ràng buộc ký tự nào không (ví dụ chặn HTML/script để tránh lưu giá trị gây lỗi phía SPA)?"
}
``` ## OQ-admin-console-011 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-admin-console-011", "type": "NEEDS_CONFIRMATION", "feature_id": "embedded-version-cache-bust", "check_ids": [ "CHK-006" ], "summary": "Giá trị Embedded Version đã lưu vẫn hiển thị đúng khi admin tải lại trang quản trị. Sau khi lưu, giá trị Embedded Version có được hiển thị lại đúng trong ô nhập khi admin tải lại trang quản trị không (persist & redisplay), hay ô luôn trống chờ nhập mới?"
}
```

## OQ-admin-console-012 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-console-012",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "data-maintenance-commands",
  "check_ids": [
    "data-maintenance-commands:CHK-001"
  ],
  "summary": "Chạy user-level:update nâng level affiliate đủ điều kiện ngay lập tức, xử lý theo lô 100. Oracle STRONG cua check 'CHK-001' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-admin-console-013 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-console-013",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "data-maintenance-commands",
  "check_ids": [
    "data-maintenance-commands:CHK-002"
  ],
  "summary": "Chạy conversion-type:update backfill type theo cửa sổ 30 ngày, bỏ qua dòng usage, có hỏi xác nhận. Oracle STRONG cua check 'CHK-002' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-admin-console-014 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-console-014",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "data-maintenance-commands",
    "embedded-version-cache-bust"
  ],
  "check_ids": [
    "data-maintenance-commands:CHK-004",
    "embedded-version-cache-bust:CHK-004"
  ],
  "summary": "Admin portal thông thường không có bất kỳ nút/API nào để chạy 3 lệnh console bảo trì. Oracle STRONG cua check 'CHK-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-admin-console-015 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-admin-console-015",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "embedded-version-cache-bust",
  "check_ids": [
    "embedded-version-cache-bust:CHK-005"
  ],
  "summary": "Bất kỳ admin nào đều thực hiện được việc lưu Embedded Version mà không cần phê duyệt/quyền đặc biệt. Oracle STRONG cua check 'CHK-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```
