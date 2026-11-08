Testlane TC-TIB-5443 (task TIB-180), status passed, đọc bằng list_test_cases ngày 2026-11-06. Lượt chạy staging 2026-10-13 08:27Z, record không ghi build. Trích actualResult (đã bỏ thẻ HTML, bỏ tên shop):
- Picanova trên staging đã đổi tên hiển thị thành merchOne (route /fulfillments/picanova, fulfillment id 6).
- Products → Import product → chọn MERCHONE. Toast: "Something went wrong!" + [merchOne] 401 Unauthorized. HTTP status 400.
- Body: {"message":"[merchOne] 401 Unauthorized","provider":"picanova","provider_error":"401 Unauthorized"}
- label trong message/toast là [merchOne] thay vì [Picanova], vì label lấy theo display_name. field provider là "picanova" (tên nội bộ), khác label hiển thị "merchOne".
- Thay toàn bộ ghi nhận cũ: nội dung "Picanova không có trên staging" trước đây là sai, vì merchOne chính là Picanova.
