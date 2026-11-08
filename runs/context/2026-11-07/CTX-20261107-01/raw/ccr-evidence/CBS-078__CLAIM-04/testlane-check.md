Agent đọc Testlane bằng list_test_cases ngày 2026-11-07. TC không ghi build, nên không đủ làm test_case. "người dùng xác nhận" và "QA (người dùng) chốt" là ghi chú ngôi thứ ba.

TC-TIB-7522 (task TIB-265), status passed, lần chạy 4, 2026-10-29 05:03-05:05 UTC trên staging. Quan sát trực tiếp: Open API lần upload thứ 3 lúc 05:04:33 trả 429 "Reach the limit 25 records in 1 day. Wait until 2026-10-29 09:13:21 to try again or contact support to increase.", retry-after: 14927. Luồng portal lúc 05:04:46 trả 429 body giống hệt.
TC ghi: "Suy luận (chưa xác minh): limit = 25 khớp với 25 lượt upload thành công trong cửa sổ (21 ảnh cũ + 11300 + 11337 + 11339 + 11340)."
TC không có quan sát nào đo mốc "Wait until" so với lượt upload cũ nhất.

Mâu thuẫn nguồn: Jira TIB-5536 #55888 (dev, 2026-10-28) ghi "per 24 h from the first upload"; CCR Phần 3 tự chọn theo nguồn mới hơn. Ngày mới hơn không làm ghi chú ngôi thứ ba thành nguồn thẩm quyền, nên giữ cả hai phía (§8).
