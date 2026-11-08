# Context Change Request: Chuẩn hoá cascade hiển thị của Group layer xuống layer con

- **Ticket:** [TIB-5584](https://ownego.atlassian.net/browse/TIB-5584)
- **Người gửi:** chienct
- **Ngày gửi:** 2026-10-16

---

## 1. What changed: Cái gì đã thay đổi

**Trước đây:**
Context chỉ mô tả Group layer ở phạm vi Group Mask (TIB-5403): Group gom layer con và mask của Group clip nội dung bên trong, nhưng không có quy tắc chung nào cho việc ẩn/hiện Group lan xuống layer con. Theo ghi nhận build 30/09 trong `artwork.md`, Group đang ẩn vẫn cho bấm `Edit mask`, và theo TIB-5581 thì mắt của layer con nằm dưới Group ẩn bị **khoá** kèm tooltip "show the group first". Hành vi render khi Group ẩn mà cờ `visible` của con vẫn ON thì lệch nhau giữa canvas Artwork Editor, buyer preview storefront, print file và MCP form preview; context chưa có thông tin về trạng thái hiển thị hiệu dụng (effective visibility) cũng như về cách layer thiếu key `visible` hoặc layer/Group có cờ `null` ở linked template được xử lý.

**Hiện tại:**
Toàn hệ thống dùng **một** quy tắc hiển thị duy nhất: một layer chỉ render khi cờ `visible` của chính nó ON **VÀ** mọi Group tổ tiên (tới tận gốc) đều ON — AND toàn chuỗi với Group lồng nhiều cấp. Ẩn/hiện Group chỉ đổi cờ của chính Group, **không ghi đè** cờ `visible` của layer con; hiện Group lại thì mỗi con trở về đúng trạng thái seller để lại, và layer tự ẩn nằm dưới Group ẩn thì sau khi hiện Group vẫn ẩn. Ẩn/hiện một layer con chỉ đổi đúng layer đó, Group và các con khác không đổi; ẩn **hết** con thì Group **không** tự OFF — mắt Group vẫn ON và canvas không vẽ gì cho Group. Group ẩn thì mask của Group cũng ngừng áp, nút `Edit mask` bị disable, không hiện box drag/resize/rotate, không align được, quick toolbar không có transform/align cho nội dung Group và chọn một con của Group ẩn trong panel cũng không mở quick editor; Group đang hiện có con tự ẩn thì chọn Group và kéo vẫn di chuyển mọi con, kể cả con tự ẩn; lock và display setting (preview / design / form only) của Group **vẫn** cascade xuống con. Trong layer panel, dòng con nằm dưới Group ẩn hiển thị **mờ (dimmed)**, mắt con ON hiển thị màu **amber**, mắt OFF giữ icon gạch chéo, và mắt con **vẫn click được** — khoá toggle cùng tooltip "show the group first" của TIB-5581 đã bị gỡ. Group rỗng: toggle không render gì, không tự đổi cờ của nó và layer panel không có tín hiệu riêng nào. Undo/Redo sau khi toggle mắt Group khôi phục đúng cờ riêng của từng con. Thiếu giá trị `visible` thì mặc định là **visible**, dùng chung cho renderer và portal; ngoại lệ duy nhất là linked template — cờ `visible` `null` **kế thừa** trạng thái từ global template (global ẩn Group thì linked cũng ẩn), áp cho cả layer thường và Group, và seller ở linked template **bật lại được** layer/Group đang ẩn do kế thừa, sau khi bật thì cờ ở linked thành `true` và hết kế thừa cho layer/Group đó. Phía SDK, layer bị ẩn hiệu dụng (tự ẩn hoặc do Group cha) **không có form field**, condition trỏ vào nó không bao giờ pass, required field nằm trong Group ẩn không chặn Add to cart, và con dưới Group ẩn dù có condition "Show this layer on first load" hay condition buyer-side thoả thì vẫn ẩn; MCP form preview hành xử giống storefront form. Render khớp nhau giữa editor preview, buyer preview và print file. Quy tắc áp cho cả Campaign Editor preview, mockup render — **kể cả Group trong mockup editor**, vì mockup có bộ layer riêng — artwork 1.0 có Group, và MCP `render-design-preview` (tiêu chí đủ là output khớp print file). PSD import có folder ẩn giữ expected: Group ẩn + cờ con vẫn ON (mắt amber) — TIB-5342 đã Passed.

**Loại thay đổi:** Cập nhật

---

## 2. Where it was seen: Thay đổi nằm ở đâu trong sản phẩm

- **Module:** Artwork
- **Vị trí trong module:** Artwork editor → Layer panel → Group layer → Visibility (mắt ẩn/hiện)
- **Module khác bị ảnh hưởng:** Storefront SDK (buyer preview, form field, condition); Order (print file PNG & PDF, emboss / shape-cut layout); Campaign (Campaign Editor preview); Mockup (Group trong mockup editor, mockup render); MCP tools (`render-design-preview`, form preview); Assets (PSD import folder ẩn); Global template ↔ linked template

---

## 3. Proposal: Đề xuất xử lý

- **Phần context cần thay đổi:**
  - `teeinblue/TIB automation/context/artwork.md` → mục "Group Mask" và mục mới "Group layer visibility (effective visibility)"
  - `teeinblue/TIB automation/context/storefront-sdk.md` → mục về form field & condition của layer
  - `teeinblue/TIB automation/context/mockup.md` → mục về layer trong mockup editor
  - `teeinblue/TIB automation/context/campaign.md` → mục về Campaign Editor preview
- **Hành động đề xuất:**
  - `artwork.md`: **thêm** mục "Group layer visibility (effective visibility)"; **sửa** mục "Group Mask" ở hai điểm — Group ẩn thì mask ngừng áp và `Edit mask` bị disable; **xoá** ghi nhận cũ về việc mắt layer con bị khoá kèm tooltip "show the group first" (TIB-5581) và về việc Group ẩn vẫn cho bấm `Edit mask` (build 30/09).
  - `storefront-sdk.md`: **thêm** đoạn về layer ẩn hiệu dụng không sinh form field và ảnh hưởng tới condition / required field.
  - `mockup.md`: **thêm** đoạn về cascade hiển thị của Group trong mockup editor.
  - `campaign.md`: **thêm** một câu về Campaign Editor preview theo effective visibility.
- **Nội dung đề xuất:**

**`artwork.md` → thêm mục "Group layer visibility (effective visibility)"**

> ### Group layer visibility (effective visibility)
>
> - Một layer chỉ render khi cờ `visible` của chính nó ON **VÀ** mọi Group tổ tiên (tới tận gốc) đều ON. Với Group lồng nhiều cấp, điều kiện là AND của toàn chuỗi. Gọi là *effective visibility*.
> - Mỗi layer và mỗi Group giữ cờ `visible` **riêng**; không thao tác nào ghi đè cờ của layer khác (mô hình Figma / Photoshop / Canva).
>   - Ẩn/hiện Group chỉ đổi cờ của Group: mọi con (kể cả Group lồng) ngừng/bắt đầu render nhưng giữ nguyên cờ riêng → hiện Group lại thì chỉ con có cờ ON mới hiện.
>   - Layer tự ẩn (cờ riêng OFF) nằm dưới Group ẩn: hiện Group lên thì nó **vẫn ẩn**.
>   - Ẩn/hiện một layer con chỉ đổi đúng layer đó; Group và các con khác không đổi.
> - Layer panel khi Group ẩn: dòng của các con hiển thị **mờ (dimmed)**; mắt con ON hiển thị màu **amber**, mắt OFF giữ icon gạch chéo; mắt con **vẫn click được** (không khoá, không tooltip).
> - Ẩn **hết** layer con thì Group **không** tự OFF (mắt Group vẫn ON, canvas trống).
> - Group ẩn còn kéo theo: không hiện box drag/resize/rotate, không align được, quick toolbar không có transform/align cho nội dung Group, chọn một con của Group ẩn không mở quick editor, nút `Edit mask` **disable**.
> - Group đang hiện có con tự ẩn: chọn Group và kéo thì mọi con di chuyển cùng, kể cả con tự ẩn.
> - Lock và display setting (preview / design / form only) của Group **vẫn cascade** xuống layer con.
> - Group rỗng: toggle mắt không render gì, không tự đổi cờ của Group, và layer panel không có tín hiệu riêng nào.
> - Undo/Redo sau khi toggle mắt Group khôi phục đúng cờ riêng của từng layer con.
> - Thiếu key `visible` → mặc định **visible**; renderer và portal dùng chung mặc định này. Ngoại lệ: linked template (xem bên dưới).
> - Linked template: cờ `visible` = `null` **kế thừa** trạng thái từ global template (global ẩn Group → linked cũng ẩn), áp cho **cả layer thường và Group**. Seller ở linked template **bật lại được** layer/Group đang ẩn do kế thừa; sau khi bật, cờ ở linked thành `true` và layer/Group đó hết kế thừa.
> - Render khớp nhau giữa editor preview (canvas), buyer preview (storefront) và print file. Quy tắc áp cho cả Campaign Editor preview, mockup render, artwork 1.0 có Group, và MCP `render-design-preview` (đủ khi output khớp print file).
> - PSD import có folder ẩn: artwork nhận được là Group ẩn + cờ của layer con giữ **ON** (mắt amber).
> - Nguồn: TIB-5584 (chuẩn cuối). TIB-5584 thay thế hoàn toàn phần Portal của TIB-5581.

**`artwork.md` → sửa mục "Group Mask"**

> - Group ẩn → mask của Group **cũng ngừng áp**; không có trường hợp mất mask mà layer con vẫn vẽ.
> - Group ẩn → nút `Edit mask` **disable**.
> - (Gỡ) Ghi nhận cũ "mắt layer con dưới Group ẩn bị khoá, tooltip *show the group first*" (TIB-5581) và "Group ẩn vẫn bấm được `Edit mask`" (build 30/09) **không còn đúng**.

**`storefront-sdk.md` → thêm**

> - Layer bị ẩn **hiệu dụng** (tự ẩn, hoặc do một Group cha đang ẩn) **không sinh form field** trên storefront form; condition trỏ vào layer đó **không bao giờ pass**. MCP form preview hành xử giống storefront form.
> - Required field nằm trong Group ẩn **không** chặn Add to cart (vì field không tồn tại).
> - Layer con nằm dưới Group ẩn, dù có condition "Show this layer on first load" hoặc condition buyer-side thoả, **vẫn ẩn** (AND với trạng thái của Group).

**`mockup.md` → thêm**

> - Mockup có bộ layer riêng và quy tắc effective visibility áp **cho Group trong mockup editor**, không chỉ cho artwork được render vào mockup: ẩn một Group trong mockup editor thì các layer con của mockup ngừng render theo cùng quy tắc như Artwork Editor.

**`campaign.md` → thêm**

> - Campaign Editor preview render theo effective visibility của layer/Group (xem `artwork.md` → "Group layer visibility").

- **Lý do:** TIB-5584 chuẩn hoá một quy tắc hiển thị duy nhất cho layer trong Group trên mọi bề mặt (portal canvas, layer panel, buyer preview, form, print file, Campaign Editor preview, mockup render, MCP preview), thay vì hành vi lệch nhau sau TIB-5403/TIB-5581; đồng thời đảo ngược quyết định khoá toggle của TIB-5581 và chốt cách xử lý cờ `visible` thiếu giá trị / `null` ở linked template. PR portal #3819, SDK #2123 + hotfix #2120, API #4015 đã merge vào `build-staging`; QA plan của dev sửa lại lúc 11:39 16/10 chốt thêm trường hợp ẩn hết con và selection.
- **Điểm còn chưa chắc:**
  - **Q13** — QA plan bản sửa 11:39 thêm **linked layer** ("Link with another layer") theo visibility của layer nguồn: nguồn tự ẩn hoặc bị Group cha ẩn → layer link không render ở editor, storefront, print file; dòng panel mờ + mắt amber + tooltip báo nguồn đang ẩn; chọn nó không có box, quick transform/align hay quick editor; mắt riêng vẫn bấm được; nằm trong Group đang hiện thì vẫn đi theo khi kéo Group. Áp cho AW 1.0 và 2.0. Ticket không nhắc phần này, PO chưa xác nhận là chủ đích, chưa có câu chữ tooltip, và Development còn 3 PR OPEN (16:14 16/10) nên chưa chắc staging đã có code → **chưa** đưa vào đề xuất context.
  - **Q9** — Khi cờ `visible` ở linked template **đã được set cụ thể** (true/false, không còn `null`) mà sau đó global template đổi trạng thái của Group/layer đó: linked **đổi theo global** hay **giữ giá trị riêng**? Chưa chốt nên phần này chưa đưa vào đề xuất.
  - **Q10 (b)** — **Artwork 1.0 có thực sự hỗ trợ Group hay không** chưa được trả lời (vòng 3 echo lại nguyên câu hỏi). Nếu không hỗ trợ thì phải bỏ artwork 1.0 khỏi phạm vi; nếu có thì chưa rõ layer panel 1.0 có dimmed + mắt amber như 2.0 hay chỉ render đúng cascade.
  - **Q11** — Repair command `artwork:show-hidden-groups-with-visible-children` đã chạy nên staging có thể **không còn** artwork ở đúng trạng thái `Group visible:false` + con `visible:true`. Chưa chốt việc QA tự dựng trạng thái đó qua MCP/API có được coi là data hợp lệ, hay dev/PO chỉ định artwork/instance cụ thể.
  - **Q12** — Mockup trong TIB là ảnh render sẵn: sau khi ẩn một Group trong mockup editor, mockup đã render ở Campaign và storefront **tự cập nhật** hay phải re-render tay (bulk re-render / sync campaign)? Chưa chốt nên phần "mockup đã render/cache" chưa đưa vào context.
  - Mockup editor (R19): case TC-TIB-6073 đang ở trạng thái Passed nhưng actualResult vẫn ghi lần chạy **Fail** kèm **BUG-325** (mockup editor hiển thị layer phẳng, ẩn Group "MKG" không làm con ngừng render). Cần chạy lại xác nhận trước khi áp đoạn `mockup.md`.
  - Artwork 1.0 có Group: chưa có case nào xác nhận (chờ Q10).
  - Ẩn hết con (Group vẫn ON), chọn con của Group ẩn không mở quick editor, kéo Group có con tự ẩn: chốt từ QA plan bản sửa 11:39, **chưa có case chạy xác nhận** (TC-TIB-6159…6162 vừa thêm, đang `not-run`; linked layer ở TC-TIB-6163…6174).
