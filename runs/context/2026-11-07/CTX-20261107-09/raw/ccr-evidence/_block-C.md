# Khối C


| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_flows/layers-image-photo.md mục Image effects` | sửa | Đoạn cũ: "Row effect = `.repeater-item-sort-column`, xoá `button.repeater-remove` (không confirm). Nút `Run effects` chỉ chạy thử trên preview." → Đoạn mới: "Row effect = `.repeater-item-sort-column`, xoá `button.repeater-remove` (không confirm). Nút `Run effects` chạy mọi effect theo thứ tự trên ảnh gốc của layer (không phải preview); xong thì layer hiện ảnh đã xử lý, việc thay ảnh là một bước undo, kết quả lưu thành ảnh mới trong image library." | Flow ngược với claim Run effects trong file này (từ CBS-029 CLAIM-04, CLAIM-05; TIB-5470) |
