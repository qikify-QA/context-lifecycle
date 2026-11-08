# Context Change Request: artwork-run-effects — gộp từ 1 Proposal khuôn cũ

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5470, QA-3406`
- **Các khối có trong file:** `A, C`

## Mức độ gấp

`MEDIUM` — mức cao nhất trong các Proposal gốc (MEDIUM); lý do gốc theo từng Proposal:

- CBS-029: MEDIUM — canon thiếu hoàn toàn tính năng đã ship (gap coverage); không có checklist đang publish nào kiểm hành vi này nên không có gì chạy sai ngay.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Nút Run effects hiện ở góc phải header "Image effects" của Photo layer customization Normal trên store không phải Etsy; không hiện cho layer Linked / No customization, không hiện trên store Etsy. "Always visible" của spec = luôn hiện dù đã cấu hình effect hay chưa (disabled tới khi có), không phải hiện cho mọi loại layer/store
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff (artwork editor); portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng Q1, chấp nhận implementation trong dev doc 2026-10-08. Phần "không hiện cho Global option" của dev doc bị spec 2026-10-19 đảo lại, không đưa vào canon. Bổ trợ TC-01 PASS 2026-10-15; Linked và No customization kiểm ở TC-80 (tạm dừng, 2/4 layer); Etsy chưa kiểm (TC-03 not-run) (CCR cũ: CBS-029 CLAIM-01)
- **Trích nguyên văn:**
  ```
  Câu hỏi: "Spec says the Run effects button is 'Always visible', but it is hidden for Global option / Linked / No customization Photo layers and on Etsy stores. Which is correct?"
  Q1: Accept the implementation. "Always visible" in the spec meant visible whether or not effects are configured (disabled until then), not across all layer types or stores.
  Implementation được chấp nhận (dev doc, giangnth, 2026-10-08):
  A **Run effects** button sits on the "Image effects" heading of a Photo layer whose customization type is Normal. It is not shown for Global option / Linked / No customization layers, nor on Etsy stores.
  (Phần "Global option" bị spec 2026-10-19 đảo lại — xem CLAIM-02.)
  ```

### CLAIM-02

- **Statement:** Nút disabled khi không dòng nào trong danh sách effect có chọn loại effect (tooltip vẫn là "Applies all effects to the current image and replaces it."); disabled khi ảnh layer chỉ tồn tại trong editor (PSD/Canva import chuyển sang Photo Upload, chưa Save) với tooltip "Save the artwork first to run effects on this image.", Save xong thì enabled; hover = nền primary blue, chữ trắng
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng ok Q2, ok Q7, đồng ý đề xuất trong comment 54545; hover theo spec. Bổ trợ TC-01, TC-04 PASS 2026-10-15. Tooltip PSD chưa thấy trực tiếp (TC-05 tạm dừng) (CCR cũ: CBS-029 CLAIM-03)
- **Trích nguyên văn:**
  ```
  ok Q2  
  ok Q3  
  ok Q5  
  ok Q7
  (dòng Q3, Q5 thuộc CLAIM-06, CLAIM-17)
  Câu hỏi + đề xuất được đồng ý (comment 54545, phuongbb, 2026-10-14):
  - **Q2.** When the button is disabled because no effect is selected, which tooltip shows? — QA đề xuất: Same 'Applies all effects to the current image and replaces it.'
  - **Q7.** Button is disabled for an unsaved PSD/Canva Photo Upload layer with tooltip 'Save the artwork first to run effects on this image.' — not in the spec. PO accepts? — QA đề xuất: Accept — an unsaved image has no server file to run on
  Spec (description, Run effects): "Disabled (grayed out) when no effect is configured yet … Hover: existing primary blue background with white text."
  ```

### CLAIM-03

- **Statement:** Một lượt chạy dùng ảnh gốc full-resolution hiện tại của layer (không phải preview, không phải bản HD), áp mọi effect tuần tự theo thứ tự danh sách; trong lúc chạy nút disabled và có progress bar % (ước lượng, dừng ở 95% tới khi xong) giữa header và effect đầu tiên; all or nothing
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button. Bổ trợ TC-06, TC-11 PASS 2026-10-15; TC-84 PASS 2026-10-28. Con số 95% là giá trị lúc ship do dev nêu. _flows/layers-image-photo.md dòng 109 đang nói ngược (xem notes) (CCR cũ: CBS-029 CLAIM-04)
- **Trích nguyên văn:**
  ```
  - A run applies every effect in the list, in order, to the layer's **original full-resolution image** (not the preview, and not the HD render).
  - While it runs, a progress bar with a percentage is shown under the heading (an estimate; it stops at 95% until the run ends) and the button is disabled.
  ...
  - All or nothing: if any effect fails (provider error, invalid API key), the image is kept and an error toast "Could not run effects" shows the provider's message for 10 seconds.
  ```

### CLAIM-04

- **Statement:** Chạy thành công: layer hiện ảnh đã xử lý, việc thay ảnh là một bước undo, kết quả lưu thành ảnh mới trong image library, ảnh trước đó trong library giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk) (liên quan: image-library)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button › On success. Bổ trợ TC-07 PASS 2026-10-15; TC-64 PASS 2026-10-28 (CCR cũ: CBS-029 CLAIM-05)
- **Trích nguyên văn:**
  ```
  - On success:
    - The layer shows the processed image. The replacement is one undo step.
    - The result is saved as a **new image in the image library**; the previous image stays in the library unchanged.
  ```

### CLAIM-05

- **Statement:** Chạy thành công thì HD tắt cho layer đó (bật lại HD thì dựng HD từ ảnh đã xử lý) và artwork không tự lưu: reload không Save → ảnh cũ; Save rồi reload → giữ ảnh đã xử lý
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-14
- **Locator:** Jira TIB-5470 comment huyen.chu 2026-10-14 dòng ok Q3, đồng ý câu Q3 trong comment 54545; chữ HD và không auto-save theo dev doc 2026-10-08. Bổ trợ TC-08 PASS 2026-10-15. "Bật lại HD dựng từ ảnh đã xử lý" chưa quan sát được (TC-09 tạm dừng), không đề xuất về phần này (CCR cũ: CBS-029 CLAIM-06)
- **Trích nguyên văn:**
  ```
  ok Q3
  Câu hỏi + đề xuất được đồng ý (comment 54545, phuongbb, 2026-10-14):
  - **Q3.** PO OK that a successful run switches HD off for the layer and does not auto-save the artwork (reload without Save loses the result)? — QA đề xuất: Yes, as implemented by dev
  Dev doc 2026-10-08: "HD is switched off for that layer. Turning HD back on builds the HD version from the processed image." · "The artwork is **not saved automatically**; the seller must click Save."
  ```

### CLAIM-06

- **Statement:** Undo một lượt chạy trả layer về đúng như trước: ảnh trước đó, và HD bật lại nếu trước đó đang bật; ảnh mà lượt chạy đã thêm vào library vẫn còn
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q8. Bổ trợ TC-06 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-07)
- **Trích nguyên văn:**
  ```
  - **Q8:** Undo restores the layer exactly as it was before the run: the previous image, and HD turned back on if it was on before. The image the run added to the library stays.
  ```

### CLAIM-07

- **Statement:** Mỗi lượt chạy lấy ảnh hiện tại của layer tại thời điểm chạy (chạy lại = chạy lên ảnh đã xử lý; muốn chạy từ ảnh trước thì Undo trước); đổi/thêm/xoá/sắp xếp effect không tự cập nhật ảnh
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-09-22
- **Locator:** description TIB-5470, mục Re-running effects và Effect configuration changes; 2026-09-22 là ngày tạo description, Jira không có ngày riêng từng mục, hai mục đã có khi QA fetch 2026-10-14. Bổ trợ TC-13 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-08)
- **Trích nguyên văn:**
  ```
  ###### Re-running effects
  
  - Every run uses the layer's current image **at the time of execution** as its input.
  - To run the effects again from the previous image, merchants must **Undo** the previous run first.
  
  ###### Effect configuration changes
  
  Changing, adding, removing, or reordering effects does not update the current image automatically. The image may remain out of sync until **Run effects** is run again.
  ```

### CLAIM-08

- **Statement:** Đóng layer editor / chọn layer khác / rời và mở lại artwork khi đang chạy: mở lại layer thấy progress bar, nút vẫn khoá tới khi xong; layer khác không bị ảnh hưởng. Reload trang khi đang chạy: bar mất, layer không bị thay, ảnh đã xử lý vẫn vào library khi xong. Layer chỉ được thay nếu đúng artwork đó đang mở lúc lượt chạy kết thúc; mở lại sau không áp kết quả
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q11; phần đóng/reload theo dev doc 2026-10-08 cùng tác giả. Không có kết quả chạy có ngày (TC-14, 15, 16 chỉ có status passed trên Testlane, không tính) (CCR cũ: CBS-029 CLAIM-09)
- **Trích nguyên văn:**
  ```
  - The layer is replaced only if the same artwork is open in the editor at the moment the run finishes. Reopening the artwork later does not apply the result; the result is only in the library.
  Ngữ cảnh — dev doc 2026-10-08 (cùng tác giả):
  - Closing the layer editor, selecting another layer, or reopening the artwork does not lose the run: reopening that layer shows the bar again and keeps the button locked until the run ends. Other layers are not affected.
  Reload the page during a run → the progress bar is gone and the layer is not replaced; the processed image still appears in the image library when the run ends.
  ```

### CLAIM-09

- **Statement:** Chưa xong ~6 phút sau khi bắt đầu xử lý, hoặc chưa bắt đầu sau 5 phút vì hàng đợi bận → toast "Timed out waiting for the effects to finish." (thời gian chờ hàng đợi không tính vào 6 phút). Job không bị huỷ: timeout hàng đợi → vẫn chạy sau, thành công thì ảnh vào library nhưng layer không bị thay; timeout xử lý → server đã dừng, không có ảnh mới
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q11; chữ toast theo dev doc 2026-10-08. QA không tái hiện được timeout thật: chỉ mô phỏng queue timeout bằng cách giả response poll (TC-19 tạm dừng 2026-10-21, không phải verdict); processing timeout chưa thử. 6 phút và 5 phút là giá trị lúc ship do dev nêu (CCR cũ: CBS-029 CLAIM-10)
- **Trích nguyên văn:**
  ```
  - **Q11:** The run is not cancelled; the editor just stops waiting.
    - If it timed out while waiting in the queue (5 min), it still runs later. If it succeeds, the new image appears in the library, but the layer is not replaced.
    - If it timed out while processing (about 6 min), the server has already stopped it, so no new image is added.
  Chữ toast — dev doc 2026-10-08:
  - If the run has not finished about 6 minutes after it starts processing, or has not started within 5 minutes because the queue is busy, the toast says "Timed out waiting for the effects to finish." Time spent waiting in the queue does not count toward the 6 minutes.
  ```

### CLAIM-10

- **Statement:** Một effect bất kỳ lỗi (lỗi provider, key sai) → giữ ảnh, toast lỗi "Could not run effects" kèm message của provider trong 10 giây; layer bị xoá hoặc không còn trong template hiện tại lúc lượt chạy xong → warning "The layer is no longer in the current template, so its image was not replaced."
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Run effects button. Bổ trợ TC-20 PASS 2026-10-21 cho warning layer mất; TC-17, 18 chỉ có status passed trên Testlane (CCR cũ: CBS-029 CLAIM-11)
- **Trích nguyên văn:**
  ```
  - All or nothing: if any effect fails (provider error, invalid API key), the image is kept and an error toast "Could not run effects" shows the provider's message for 10 seconds.
  ...
  - If the layer was deleted, or is no longer in the current template, when the run finishes: warning "The layer is no longer in the current template, so its image was not replaced."
  ```

### CLAIM-11

- **Statement:** Double-click Run effects (kể cả nút Run effects trong popover biến) → chỉ một lượt chạy
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Possible test cases › Run in progress across navigation. Bổ trợ TC-79 PASS 2026-10-28 (click của người dùng; dispatchEvent tổng hợp sinh 2 POST, không phải đường người dùng) (CCR cũ: CBS-029 CLAIM-12)
- **Trích nguyên văn:**
  ```
  Double-click Run effects on a chain whose prompt uses an option layer variable → only one run starts.
  ```

### CLAIM-12

- **Statement:** Một store bắt đầu tối đa 5 lượt chạy/phút (owner + mọi staff dùng chung; 5 là default, đổi được trong server config); lượt thứ 6 → toast "Too many requests! – Please retry after N second(s)". Mỗi lượt tính vào giới hạn upload layer image (default 1000 ảnh/ngày/store); hết giới hạn → toast "Too many requests! – Reach the limit 1000 records in 1 day. Wait until {date time} to try again or contact support to increase."; cả hai trường hợp không chạy, ảnh giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk) (liên quan: image-library)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner + staff (dùng chung quota store); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q10; số 5 lượt/phút từ dev doc 2026-10-08. Bổ trợ TC-21 PASS 2026-10-15, TC-23 PASS 2026-10-21. Toast 1000/ngày chưa ép được. Con số không phải hằng số sản phẩm (đổi được trong server config). Liên quan image-library KB-012 (quota theo ngày đang là suy đoán) và CHK-041, OQ-image-library-023; rate limit này khác sdk KB-051 (rate limit buyer) (CCR cũ: CBS-029 CLAIM-13)
- **Trích nguyên văn:**
  ```
  - **Q10:** A 6th run within a minute shows the error toast "Too many requests! – Please retry after N second(s)" (N = seconds left in that minute). When the upload limit is used up (default 1000 images per day per store), the toast is "Too many requests! – Reach the limit 1000 records in 1 day. Wait until {date time} to try again or contact support to increase." In both cases no run starts and the image is unchanged.
  Dev doc 2026-10-08:
  - A store can start at most **5 runs per minute**, shared by the owner and all staff. 5 is the default and can be changed in the server config. Each run also counts toward the layer image upload limit.
  ```

### CLAIM-13

- **Statement:** Quyền cần để chạy là Manage Artwork (Artworks → Manage trong staff role); staff không có quyền thì không mở được artwork editor (không bao giờ thấy nút), server cũng từ chối lượt chạy
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** staff (có / không có Manage Artwork); portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q4. Bổ trợ TC-22 PASS 2026-10-15 (CCR cũ: CBS-029 CLAIM-14)
- **Trích nguyên văn:**
  ```
  - **Q4:** Correction: there is no separate "create layer images" permission. The permission needed is **Manage Artwork** (Artworks → Manage in the staff role). Staff without it cannot open the artwork editor, so they never see the Run effects button (closest to A). The server also rejects a run from staff without this permission.
  ```

### CLAIM-14

- **Statement:** Trước khi chạy, mọi dịch vụ bên thứ ba trong chuỗi effect phải có API key ở Extras → Extra services; thiếu → không chạy, warning "Missing API key for {services}. Enter your API key in Extra services.". Dịch vụ được kiểm: Remove background (chưa chọn remover, hoặc chọn remove.bg / removal.ai / cutout.pro mà không có key; remover Teeinblue không cần key), Cutout.pro, ImagenHub, OpenAI, Flux, Gemini, "Gen AI Effect" (Default settings mà chưa chọn default provider). Effect Teeinblue không cần key. Server kiểm lại lúc bắt đầu: key bị xoá giữa chừng → lượt chạy lỗi cùng message, ảnh giữ nguyên
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing API key check before a run. Không có kết quả chạy có ngày (TC-25…30 chỉ có status passed trên Testlane). Face Cutout, Photo Enhancer có cần key không: chưa ai trả lời (PENDING-12), không đề xuất (CCR cũ: CBS-029 CLAIM-15)
- **Trích nguyên văn:**
  ```
  - If a service has no API key in Extras → Extra services, the run does not start and a warning toast says "Missing API key for **{services}**. Enter your API key in Extra services."
  - Services checked: Remove background (when no remover is chosen, or remove.bg / removal.ai / cutout.pro is chosen without its key; the Teeinblue removers need no key), Cutout.pro, ImagenHub, OpenAI, Flux, Gemini, and "Gen AI Effect" when a Gen AI effect uses Default settings and no default provider is chosen. Teeinblue effects need no key.
  - The server checks again when the run starts. If a key was removed meanwhile (e.g. in another tab), the run fails with "Missing API key for {service}. Enter your API key in Extra services." and the image is kept.
  ```

### CLAIM-15

- **Statement:** Thiếu nhiều key: `{services}` liệt kê mỗi dịch vụ một lần, cách nhau dấu phẩy, thứ tự cố định Remove background, Cutout.pro, ImagenHub, Gen AI Effect, OpenAI, Flux, Gemini
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-14
- **Locator:** Jira TIB-5470 comment giangnth 2026-10-14 dòng Q9 (CCR cũ: CBS-029 CLAIM-16)
- **Trích nguyên văn:**
  ```
  - **Q9:** Services are separated by commas, each listed once, always in this order: Remove background, Cutout.pro, ImagenHub, Gen AI Effect, OpenAI, Flux, Gemini. Example: "Missing API key for **Cutout.pro, OpenAI**. Enter your API key in Extra services."
  ```

### CLAIM-16

- **Statement:** Known limitation (không phải expected): chuỗi có cả Remove background và Face cutout vẫn đòi key Remove background dù server bỏ qua Remove background trong chuỗi đó; workaround = xoá effect Remove background. PO chấp nhận cho release này
- **Object / feature:** artwork/MỚI: run-image-effects — Thuộc: nút Run effects của Photo layer trong artwork editor (điều kiện hiển thị, một lượt chạy, kết quả, undo, lỗi, timeout, giới hạn, quyền, kiểm API key trước khi chạy); Không thuộc: cấu hình danh sách effect (layer-config-image), popover biến (run-effects-fill-in-variables), effect chạy trên storefront (sdk)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `dev_doc`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), 2026-10-08; PO (huyen.chu) ok Q5 2026-10-14 chấp nhận cho release
- **Locator:** "Change & test cases" v1 (tự sinh từ branch diff), Jira TIB-5470 comment giangnth, mục Missing API key check before a run › Known limitation. Known limitation, KHÔNG dùng làm expected: PO chấp nhận để release, không nói đây là hành vi đúng. TC-31 tạm dừng (CCR cũ: CBS-029 CLAIM-17)
- **Trích nguyên văn:**
  ```
  - Known limitation: a chain with both Remove background and Face cutout asks for a Remove background key even though the server skips Remove background in that chain. Deleting the Remove background effect is the workaround.
  PO chấp nhận (comment huyen.chu 2026-10-14): `ok Q5` — với câu hỏi trong comment 54545: "**Q5.** Known limitation: a chain with Remove background + Face cutout asks for a Remove background key although the server skips it. Accept for this release? — QA đề xuất: Accept; workaround = delete the Remove background effect (already disabled with Face Cutout per QA-750)"
  ```

### CLAIM-17

- **Statement:** Prompt của effect (layer Normal hoặc Global Option) có biến → bấm Run effects chưa chạy, mở popover `Fill in variables`, mô tả `Enter the values to use for this run.`; mỗi biến khớp option có thật một field (biến lặp lại chỉ 1 field), theo thứ tự xuất hiện, nhãn là token (vd `{{Name}}`); prompt không có biến → chạy thẳng như cũ; đóng popover (nút đóng, click ra ngoài, Esc) → không chạy
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-26
- **Locator:** description TIB-5470, mục Update: Prompt variables › Trigger, Fields. Thay toast "Can't run…" của dev doc 2026-10-08, không đưa toast cũ vào canon. Bổ trợ TC-57, 58, 65, 66 PASS 2026-10-28 build index.OMERs7BG.js; "đóng popover không chạy" và "không biến chạy thẳng" là kết quả test, spec không ghi nguyên chữ. ImagenHub template variable chưa thử (TC-78, PENDING-18). Liên quan artwork KB-113, KB-115 (CCR cũ: CBS-029 CLAIM-21)
- **Trích nguyên văn:**
  ```
  Replaces the `Can't run: {{variable}} has no default value…` toast in **Behavior**.
  
  **Trigger**
  
  - If any effect prompt contains variables, `Run effects` opens a `Fill in variables` popover, for both normal and global options.
  - Description: `Enter the values to use for this run.`
  
  **Fields**
  
  - Show one field per unique variable matched to an existing option, in order of appearance, labelled with its token (e.g. `{{Name}}`).
  ```

### CLAIM-18

- **Statement:** Field theo input type của option: text → ô text, Only numbers → ô number (chữ bị loại, field trống), Date picker → ô date, option layer → chọn trong item của nó. Đổi input type của option khi đã có giá trị lưu: field dùng type mới, giá trị lưu không hợp lệ bị bỏ → field trống + hint, Run disabled tới khi nhập giá trị hợp lệ
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-30
- **Locator:** QA-3406 (task TIB-193) TC-59, TC-74 PASS 2026-10-30, staging build assets/index.BMgdZMSW.js, kết quả retest BUG-01. Kết cục "giá trị lưu không hợp lệ thành trống" khớp đáp án đề xuất PENDING-20, PO chưa xác nhận riêng; fallback về default hợp lệ chưa thử. Build trước 2026-10-29 sai (BUG-01), đã fix (CCR cũ: CBS-029 CLAIM-22)
- **Căn cứ expected:** Spec TIB-5470 mục Update: Prompt variables, huyen.chu 2026-10-26: "The field follows the option's input type." và "use the updated input type and validate the saved value". Phần giá trị không hợp lệ thành trống: KHÔNG CÓ (PENDING-20)
- **Trích nguyên văn:**
  ```
  TC-59 | ✅ AI — retest after BUG-01 2026-10-30 build index.BMgdZMSW.js: Age is a number input that rejects `abc`, Date is a date picker | Var types popover (first open after load): `{{Name}}` `<input type="text">` `Anna`; `{{Age}}` `<input type="number">` `30`; `{{Date}}` `<input type="date">` `2026-10-28`; `{{Color}}` `<select>` `blue|Blue`, `red|Red`. Set `abc` in `{{Age}}`: value `` (browser drops it), hint `No valid default value. Enter one to run.`, popover Run effects `disabled=true`.
  TC-74 | ✅ AI — retest after BUG-01 2026-10-30 build index.BMgdZMSW.js: after Name → Only numbers, `Kai` is not used, field is empty with a hint, Run disabled until a number | … Step 2, Age back to number, Name → Only numbers (radio `number`, unsaved): `{{Name}}` `<input type="number">` value ``, hint `No valid default value. Enter one to run.`, popover Run effects `disabled=true`; `{{Age}}` number `45`. Typed `Kai` → value ``, Run disabled; `7` → value `7`, no hint, Run enabled
  Spec (description, Update: Prompt variables, huyen.chu 2026-10-26): "The field follows the option's input type." · "If the option changes (input type or name), use the updated input type and validate the saved value; if it is deleted, remove its field."
  ```

### CLAIM-19

- **Statement:** Field điền sẵn theo thứ tự: (1) giá trị nhập lần trước cho biến này trên layer này, (2) default của option, (3) không có thì trống kèm hint; `Run effects` trong popover disabled tới khi mọi field có giá trị; bấm → đóng popover và chạy, mỗi lần xuất hiện của biến được thay bằng giá trị đã nhập
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `spec_doc`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-26
- **Locator:** description TIB-5470, mục Update: Prompt variables › Fields, Run. Bổ trợ TC-60, 62, 64 PASS 2026-10-28 build index.OMERs7BG.js; TC-77 PASS 2026-10-28. Chữ hint thực tế đã đổi, xem CLAIM-25 (CCR cũ: CBS-029 CLAIM-23)
- **Trích nguyên văn:**
  ```
  - Prefill with the last entered value, then the option's default. If neither exists, show `No default value. Enter one to run.`
  ...
  **Run**
  
  - `Run effects` in the popover stays disabled until every field has a value.
  - Clicking `Run effects` closes the popover and runs the effects.
  ```

### CLAIM-20

- **Statement:** Giá trị chỉ gồm khoảng trắng (space, tab) bị coi là trống: Run effects của popover vẫn disabled
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-28
- **Locator:** QA-3406 TC-63 PASS 2026-10-28 build assets/index.OMERs7BG.js; spot check PASS 2026-10-30 build assets/index.BMgdZMSW.js. Spec chỉ nói "until every field has a value"; khớp đáp án QA đề xuất PENDING-19, PO CHƯA xác nhận (CCR cũ: CBS-029 CLAIM-24)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-63 | ✅ AI — retest after fix: whitespace-only keeps Run disabled | `"   "` → disabled; `"\t"` → disabled; `" \t "` → disabled (hint shown each time) | Set via native setter + `input` event; line-break case not re-run (first run: input strips it)
  TC-63 | ✅ AI — retest after BUG-01 2026-10-30: whitespace-only keeps Run disabled | Var nodef `{{Nick}}` = `"   "` → Run disabled | Spot check (spaces only)
  ```

### CLAIM-21

- **Statement:** Khác spec, chưa phân xử: build 2026-10-30 hiện hint `No valid default value. Enter one to run.` cho mọi field trống (kể cả option không có default); spec nói `No default value. Enter one to run.`
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `UNKNOWN`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** QA (phuongbb) quan sát, 2026-10-30; chưa ai xác nhận
- **Locator:** QA-3406 TC-61 tạm dừng 2026-10-30 build index.BMgdZMSW.js (không PASS); phía spec: description TIB-5470 mục Update: Prompt variables › Fields, 2026-10-26. Build 2026-10-28 còn hiện đúng chữ spec. Mâu thuẫn spec với build, giữ cả hai, KHÔNG dùng làm expected, chờ PO hoặc QA lead chọn (CCR cũ: CBS-029 CLAIM-25)
- **Trích nguyên văn:**
  ```
  TC-61 | ⏸️ AI — hint copy changed: `No valid default value. Enter one to run.` (spec: `No default value. Enter one to run.`); behaviour OK | Var nodef: `{{Nick}}` text, value ``, hint `No valid default value. Enter one to run.`, Run `disabled`, 0 POST.
  - **Hint copy changed:** the empty-field hint is now `No valid default value. Enter one to run.` in every case, including an option with no default at all (Nick). The spec (REQ-20, description 2026-10-26, reference image-20261026-054048.png) says `No default value. Enter one to run.`. This is a copy change made with the input-type fix, not a functional failure.
  Spec: "If neither exists, show `No default value. Enter one to run.`"
  ```

### CLAIM-22

- **Statement:** Biến không khớp option nào (gõ sai, option bị đổi tên hoặc bị xoá → token cũ không còn khớp, `{{School.color}}`, biến JSON list, template selector): không có field, không chặn lượt chạy, token giữ nguyên trong prompt gửi provider (giống storefront); popover có cả biến khớp thì chỉ hiện field biến khớp
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-28
- **Locator:** Jira TIB-5470 comment 55851 dòng Q1 B, trả lời câu hỏi giangnth cùng ngày. Bổ trợ TC-67, 75, 76 PASS 2026-10-28 build index.OMERs7BG.js. "Option đổi tên thành không khớp" là hệ quả của Q1 B (PENDING-21), PO không nói riêng. Build trước 09:47 UTC 2026-10-28 sai (BUG-03), đã fix. Đối chiếu sdk KB-415: storefront JSON List điền được variable, câu hỏi của dev xếp JSON list vào nhóm biến portal không khớp; khác surface, không chọn phía (CCR cũ: CBS-029 CLAIM-26)
- **Trích nguyên văn:**
  ```
  Q1 B. Keep as spec: don't show unmatched variables, same as the storefront (left as is). A plain text field would not indicate to the user that the variable is unmatched.
  Câu hỏi của dev (giangnth, 2026-10-28):
  - Problem: the AI then gets the raw `{{Hat}}` text in its prompt (the storefront leaves it as is too). It still costs a provider call and counts toward the run limit, and it usually means a typo or a renamed or deleted layer. This also covers `{{School.color}}`, JSON list variables and the template selector.
  ...
  - A) Plain text field, required (dev suggestion) · B) Hide and run, as in the spec
  Spec: "Unmatched variables are not shown and do not block the run." · "if it is deleted, remove its field."
  ```

### CLAIM-23

- **Statement:** Mọi biến trong prompt đều không khớp → không mở popover, bấm Run effects chạy thẳng, prompt giữ nguyên token
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal · api
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-28
- **Locator:** QA-3406 TC-68 PASS 2026-10-28 build assets/index.OMERs7BG.js. Khớp đáp án QA đề xuất PENDING-16, PO CHƯA xác nhận (spec có thể đọc là popover rỗng) (CCR cũ: CBS-029 CLAIM-27)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-68 | ✅ AI — retest after fix: all-unmatched prompt runs directly on the first click | Var unmatched → first click on header Run effects: no popover (0 `.run-effects-variables-popover` elements), header disabled, progress `17%`; body `prompt: "Portrait of {{Hat}}"` → 202 `{"id":"<id>","status":"pending"}`; completed → image `<image>`; Undo → `<image>` | Gemini run 2. Direct run = PENDING-16 suggested answer (🟡 assumption, not PO-confirmed)
  ```

### CLAIM-24

- **Statement:** Giá trị nhập lưu riêng từng layer; còn sau mỗi lượt chạy và sau khi mở lại artwork (không reload trang); xoá khi reload trang (popover quay về default, hoặc trống + hint); không chia sẻ sang browser, tab hoặc staff khác; không ghi vào default của option trong artwork
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `po_dev_confirm`
- **Người xác nhận, ngày nguồn:** PO (huyen.chu), 2026-10-28
- **Locator:** Jira TIB-5470 comment 55851 dòng Q2 A, chọn phiên bản dev mô tả cùng ngày. Bổ trợ TC-69, 70, 71, 72 PASS 2026-10-28 build index.OMERs7BG.js. "Không chia sẻ sang browser, tab, staff" chưa kiểm trực tiếp (CCR cũ: CBS-029 CLAIM-28)
- **Trích nguyên văn:**
  ```
  Q2 A. Clear on page reload.
  Phiên bản dev mà PO chọn (giangnth, 2026-10-28):
  - Dev's version: per layer, kept after running and after reopening the artwork, but **cleared on a page reload**, and not shared with another browser, tab or staff member. Keeping them past a reload would mean saving them in the artwork data (they would then only stick after Save) or in a new server store.
  - A) Clear on page reload (dev suggestion) · B) Keep after reload too
  Spec (2026-10-26): "Save the last-entered values separately for each layer. Values stay after each run." · "e.g. typing `Anna` for `{{Name}}` on layer 1 prefills `Anna` next time on layer 1 only; layer 2 starts from the option's default."
  ```

### CLAIM-25

- **Statement:** Giá trị nhập trong popover (kể cả giá trị đã lưu, hiện lại sau khi mở lại artwork) hiển thị như text thường: payload XSS / HTML không render, không chạy script; ô number / date loại bỏ payload
- **Object / feature:** artwork/MỚI: run-effects-fill-in-variables — Thuộc: popover "Fill in variables" khi bấm Run effects (field theo biến, điền sẵn, giá trị lưu, biến không khớp); Không thuộc: chèn biến vào prompt khi cấu hình (layer-config-image), thay biến trên storefront (sdk/genai-personalization-runtime)
- **Quan hệ với canon:** `ADD`
- **Scope:** store owner/staff; portal
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb), kết quả [AI], 2026-10-30 (TC-86), 2026-10-28 (TC-87)
- **Locator:** QA-3406 TC-86 PASS 2026-10-30 build assets/index.BMgdZMSW.js; TC-87 PASS 2026-10-28 build assets/index.OMERs7BG.js. Bổ trợ TC-88, TC-89, TC-50 PASS (CCR cũ: CBS-029 CLAIM-31)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-86 | ✅ AI — retest after BUG-01 2026-10-30: payloads stay text; number/date widgets reject them | Var nodef `{{Nick}}`: `<script>console.log('xss-test-QA')</script>`, `"><img src=x onerror=console.log('xss-test-QA')>`, `<b>bold</b>`, `<iframe src="https://example.com"></iframe>` → value equals the payload for each, Run enabled. New widgets: `{{Age}}` (number) = X2 → value ``, `{{Date}}` (date) = X1 → value ``, Run disabled. +0 `script/svg/iframe/img/b/style` in the document, 0 `img[src="x"]`, 0 `xss-test-QA` console logs
  TC-87 | ✅ AI — retest after fix: saved X2 re-rendered as text, gone after reload | Step 1: Cancel → reopen <id> in the SPA → Var nodef `{{Nick}}` value = literal X2, 0 `img` in popover, label `{{Nick}}`, 0 `img[src="x"]`, 0 `xss-test-QA` logs. Step 2: reload → `{{Nick}}` value `` + hint `No default value. Enter one to run.`, Run disabled, 0 `img[src="x"]`
  ```

# Khối C — Guide, flow

| File | Hành động | Nội dung | Lý do |
|---|---|---|---|
| `_flows/layers-image-photo.md mục Image effects` | sửa | Đoạn cũ: "Row effect = `.repeater-item-sort-column`, xoá `button.repeater-remove` (không confirm). Nút `Run effects` chỉ chạy thử trên preview." → Đoạn mới: "Row effect = `.repeater-item-sort-column`, xoá `button.repeater-remove` (không confirm). Nút `Run effects` chạy mọi effect theo thứ tự trên ảnh gốc của layer (không phải preview); xong thì layer hiện ảnh đã xử lý, việc thay ảnh là một bước undo, kết quả lưu thành ảnh mới trong image library." | Flow ngược với claim Run effects trong file này (từ CBS-029 CLAIM-04, CLAIM-05; TIB-5470) |
