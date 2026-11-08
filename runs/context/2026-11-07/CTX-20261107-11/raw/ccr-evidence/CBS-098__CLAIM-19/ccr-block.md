### CLAIM-19

- **Statement:** Tên file upload chứa payload XSS, HTML hay traversal không render ở form, sau đổi template và ở cart (server đổi tên file); SVG chứa script và HTML đổi đuôi .jpg bị từ chối với thông báo "Cannot upload because the image is too small. Please upload a bigger image", không chạy script; payload trong text layer sync hiển thị literal.
- **Object / feature:** sdk/storefront-buyer-facing
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer, storefront
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `test_case`
- **Người xác nhận, ngày nguồn:** QA (phuongbb, kết quả [AI] do máy chạy trên Chrome của QA), 2026-10-21
- **Locator:** QA-3415 TC-31, TC-32, TC-33 trong result_QA-3415_B1-S1-clean_2026-10-21.md; staging SDK app-v1.js Last-Modified 2026-10-21 05:56:15 GMT, Chrome sạch. Phần order design của TC-33 dùng đơn tạo trên SDK cũ, không tính vào claim. Thông báo "too small" chỉ ghi đúng chữ đang hiện, không đề xuất đó là thông báo đúng cho file sai định dạng. (CCR cũ: CBS-026 CLAIM-20)
- **Căn cứ expected:** KHÔNG CÓ
- **Trích nguyên văn:**
  ```
  TC-31 | ✅ AI — tên file payload không render ở đâu, không chạy | 10 payload + baseline (`setInputFiles({name,mimeType,buffer})`): server đổi tên (`wa:customers/uploads/261021_<random>.png`); tên không có trong DOM (text/HTML) ở form T1, sau switch T2s, ở /cart (`namesInHtml=0`, `namesInText=0`, `namesInProps=0` — properties chỉ `_customization_id`, `_tib_design_link_1`) và sau reload /cart; `script,svg,iframe` 227–228 không đổi trước/sau upload/switch mọi case (dao động 1 cả ở baseline); console 0 dòng `xss-test-QA` / `1`; customization 201, cart/add 200
  TC-32 | ✅ AI — SVG chứa script / HTML đổi đuôi .jpg bị từ chối, không chạy script | `fx-script.svg`, `fx-script-big.svg`, `fx-html-as.jpg`: field báo "Cannot upload because the image is too small. Please upload a bigger image", popup không mở, 0 request upload/customization, T1 và T2s không có ảnh; console 0 dòng `xss-test-QA`
  TC-33 | ✅ AI — 8 payload text hiển thị literal ở field, preview, sau reload; order design dùng lại order cũ [đã bỏ id đơn] | T11 `#layer-<id>` → T12 `#layer-<id>`: value = payload (độ dài khớp, 10000 ký tự nhận đủ), preview `<text>` chứa payload literal (`{{7*7}}`, `${7*7}`, `<%= 7*7 %>`, `#{7*7}` không thành `49`), `script,svg,iframe` 227/228 không tăng, console sạch (không `xss-test-QA`/`1`)
  ```
