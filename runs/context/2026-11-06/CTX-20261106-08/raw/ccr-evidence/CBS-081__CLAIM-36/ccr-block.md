### CLAIM-10

- **Loại nguồn** (đúng 1): `po_dev_confirm`
- **Locator:** Jira TIB-5349; skill-rules-audit.md #14, #21, #23, #27, #28, #29, #30, #31, #32, #33, #34, #35 (rule `form-artwork-navigation`)
- **Link:** https://ownego.atlassian.net/browse/TIB-5349
- **Ngày của nguồn (YYYY-MM-DD):** 2026-09-30
- **Người viết / người xác nhận:** QA
- **Trích nguyên văn:**
  - skill-rules-audit.md #14, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Toggle + tên menu lưu per Product Base**, không còn ở cấp campaign. Popup Quick navigation có thêm ô `Menu Item's name`, chỉ hiện khi toggle bật, **auto-save khi blur hoặc Enter**, giới hạn **255 ký tự**. Toggle và ô tên **lưu độc lập**; lưu lỗi thì revert về giá trị cũ.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Giờ seller bật/tắt và đặt tên menu riêng cho từng Product Base trong campaign, ngay trong popup Quick navigation. Ô mới là "Menu Item's name", chỉ hiện khi toggle đang bật, tự lưu khi rời ô hoặc bấm Enter.
    ```
  - skill-rules-audit.md #21, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Dynamic Translation**: key phải là **nguyên cả chuỗi kể cả `{{index}}`** (vd key `customize #{{index}}` → value `customize en #{{index}}`). Key thiếu `{{index}}` → mất số thứ tự; key chỉ là `customize` → không dịch. Tên menu **không tự xuất hiện** trong danh sách Dynamic Translation, seller phải tự gõ key. Portal luôn hiển thị/lưu **tên gốc của seller**, không bị bản dịch ghi đè.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Dịch tên menu phải dùng nguyên cả chuỗi làm key, kể cả {{index}}. Ví dụ key customize #{{index}} → value customize en #{{index}}. Nếu chỉ thêm key customize thì tên sẽ không được dịch. Bản dịch thiếu {{index}} thì mất số thứ tự.
    ```
  - skill-rules-audit.md #23, rule `form-artwork-navigation`, nguồn ghi: dev comment 2026-09-30, huytv, TIB-5349:
    ```
    **Hàm xoá cache campaign dùng chung** từng lỗi & dừng giữa chừng với campaign có store liên kết chưa đầy đủ (chưa publish xong). Hàm này dùng chung cho: **sửa artwork**, **đồng bộ ảnh sản phẩm Shopify/Etsy**, **lệnh sync campaign lên store** → 3 flow này phải regression.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Hàm xoá cache campaign dùng chung: hàm này từng bị lỗi và dừng giữa chừng với campaign có store liên kết chưa đầy đủ (chưa publish xong). Hàm được dùng cho: sửa artwork, đồng bộ ảnh sản phẩm Shopify/Etsy, và lệnh sync campaign lên store. Với các campaign đó, cache giờ được xoá đúng thay vì lỗi.
    ```
  - skill-rules-audit.md #27, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Mỗi Product Base có popup Quick navigation RIÊNG** (không phải 1 popup liệt kê hết các PB).
    ```
  - skill-rules-audit.md #28, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Nhiều `{{index}}` trong 1 chuỗi ⇒ điền đúng index vào TẤT CẢ vị trí.** Vd `Design {{index}} of {{index}}` → nav `Design 1 of 1`.
    ```
  - skill-rules-audit.md #29, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Tên dài trên nav mobile ⇒ xuống dòng (wrap)**, không truncate/ellipsis.
    ```
  - skill-rules-audit.md #30, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Auto-save có toast thông báo.**
    ```
  - skill-rules-audit.md #31, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Ticket KHÔNG chạm order / generated artwork / print file** — chỉ là form copy trên storefront. Bỏ nhóm regression đó khỏi scope.
    ```
  - skill-rules-audit.md #32, rule `form-artwork-navigation`, nguồn ghi: TIB-5349, 2026-09-30, qua QA (mục Trả lời bổ sung):
    ```
    **Sau khi "xoá cache ngay" vẫn có thể còn layer cache khác** ⇒ case cache phải hard-reload + retry trước khi kết luận, đừng fail ngay lần đầu.
    ```
  - skill-rules-audit.md #33, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    **Thời điểm auto-save: theo dev — lưu khi RỜI Ô (blur) hoặc bấm Enter.** Gõ xong mà không blur/Enter rồi reload ⇒ **mất giá trị**. (Bản "gõ xong là save" đã bị bác.)
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Ô mới là "Menu Item's name", chỉ hiện khi toggle đang bật, tự lưu khi rời ô hoặc bấm Enter.
    ```
  - skill-rules-audit.md #34, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    **PB 1 artwork sau migration**: nút toggle **vẫn disabled**, nhưng giá trị ON đã được migrate nằm sẵn ⇒ **thêm artwork thứ 2 vào PB đó thì nav tự được enable**, seller không phải bật tay.
    ```
  - skill-rules-audit.md #35, rule `form-artwork-navigation`, nguồn ghi: theo dev, TIB-5349, 2026-09-30 (mục Chốt bổ sung, vòng 2):
    ```
    PB **cũ** (đã qua migration, ON dormant) + thêm artwork ⇒ nav **ON**. / PB **mới toanh** thêm vào campaign ⇒ nav **OFF**.
    ```
  - Jira TIB-5349 comment #52793, huytv, 2026-09-30, khớp một phần:
    ```
    Product Base mới thêm vào campaign có sẵn thì navigation mặc định tắt, phải bật riêng.
    ```
- **File đính kèm cho claim này:** không có

