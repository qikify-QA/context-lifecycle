Kiểm nguồn CLAIM-04, 2026-11-06:
- Jira TIB-5522: tiêu đề "Fix null layer image url from mockup import breaking campaign publish", status Done. Description và comment #54223 (tuanva, 2026-10-12, sửa 2026-10-13) không nói mockup_id null được chấp nhận, không nói publish dựa vào preview đã render, không nói Save không generate lại.
- Description của ticket, mục Expected result, ghi: "publish must not silently ship a broken mockup to the buyer." Claim nói còn preview cũ thì publish thành công là bình thường. Hai câu này cần người chốt.
- Block của claim chỉ có hai dòng skill-rules-audit do file ghi lại lời "người dùng chốt", không có trích lời người xác nhận, không có test case.
- Ngoài block, Testlane task TIB-203 có TC-TIB-5877, TC-TIB-5878, TC-TIB-5883, TC-TIB-5932 ghi quan sát liên quan, status passed, không ghi build. CCR không dẫn các case này, nên không dùng để xếp bậc claim. Nêu cho operator để soạn lại CCR.
