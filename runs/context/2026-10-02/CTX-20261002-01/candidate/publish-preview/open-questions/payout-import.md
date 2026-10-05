# Open Questions — payout-import Tổng: 59 mục (NEEDS_CONFIRMATION/CONFLICT/OPEN_ISSUE). Sinh từ bootstrap DOC_BOOTSTRAP đầu tiên cho qikfiliate. ## OQ-payout-import-001 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-001", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-004", "summary": "KNOWN DEFECT (KB-004, feature charge-type-classification): Không có gì đảm bảo Shopify giữ nguyên chuỗi đã quan sát (known defect). Theo tài liệu `payout - charge type reference` §`Cách phân loại — không có enum cố định`, không có gì đảm bảo Shopify sẽ luôn dùng đúng những chuỗi đã quan sát được — Shopify tự nêu rõ trong tài liệu của họ rằng cột/giá trị trong file export \"có thể thay đổi bất cứ lúc nào\"."
}
``` ## OQ-payout-import-002 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-002", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-012", "summary": "KNOWN DEFECT (KB-012, feature charge-type-classification): Cơ chế code-level: Str::contains(Str::lower(...), 'usage'/'one-time') — rủi ro âm thầm nhất. Theo tài liệu `known-issues-edge-cases` §A3, việc phân loại charge_type dựa vào `Str::contains(Str::lower($charge_type), 'usage')` / `'one-time'` — chuỗi con, không phân biệt hoa thường, không có enum cố định. Tài liệu tự đánh giá đây là rủi ro \"âm thầm\" nhất trong toàn hệ thống. Cùng cơ chế với KB-002/KB-003 (`qikfiliate/payout - charge type reference`), nhìn từ góc độ code."
}
``` ## OQ-payout-import-003 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-003", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-014", "summary": "KNOWN DEFECT (KB-014, feature charge-type-classification): charge_type mới không khớp 2 từ khoá → tự rơi vào recurring/first-month (known defect). Theo tài liệu `known-issues-edge-cases` §A3, nếu Shopify phát hành 1 charge_type mới không khớp cả 2 từ khoá hiện có (ví dụ \"App proration credit\"), dòng này sẽ tự động rơi vào nhánh recurring/first-month (vì không chứa \"usage\" và không chứa \"one-time\")."
}
``` ## OQ-payout-import-004 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-004", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-015", "summary": "KNOWN DEFECT (KB-015, feature charge-type-classification): Không có log cảnh báo cho charge_type lạ. Theo tài liệu `known-issues-edge-cases` §A3, không có log cảnh báo \"charge_type lạ chưa từng thấy\"."
}
``` ## OQ-payout-import-005 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-005", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-016", "summary": "KNOWN DEFECT (KB-016, feature charge-type-classification): charge_type refund/downgrade chứa usage → đi qua UsageCommissionCapper (known defect). Theo tài liệu `known-issues-edge-cases` §A3, nếu Shopify từng phát hành `charge_type` dạng \"App sale – usage refund\" (có chứa \"usage\"), dòng đó sẽ đi qua `UsageCommissionCapper` (nhánh usage) thay vì nhánh recurring như refund/downgrade thông thường."
}
``` ## OQ-payout-import-006 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-006", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-017", "summary": "KNOWN DEFECT (KB-017, feature charge-type-classification): Sai định tuyến không crash, chỉ ra sai số tiền — khó phát hiện. Theo tài liệu `known-issues-edge-cases` §A3, sai định tuyến charge_type không gây lỗi/crash mà chỉ ra số tiền hoa hồng sai, rất khó phát hiện qua kiểm tra thông thường."
}
``` ## OQ-payout-import-007 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-007", "type": "OPEN_ISSUE", "feature_id": "charge-type-classification", "kb_id": "KB-018", "summary": "KNOWN DEFECT (KB-018, feature charge-type-classification): Refund của usage charge: rủi ro định tuyến nhầm — chưa có dữ liệu thật, cần QA test + PO xác nhận. Theo tài liệu `payout - charge type reference` §`Trường hợp chưa có dữ liệu thật để xác nhận`, nếu Shopify đặt tên generic là \"App refund\" (không chứa \"usage\") cho dòng refund của 1 usage charge, dòng đó sẽ bị định tuyến NHẦM vào nhánh recurring/first-month thay vì nhánh usage — dùng sai rate (`percentage` recurring thay vì `usage_percentage`) và sai cơ chế cap (per-row thay vì lifetime). Tài liệu tự đánh giá đây là rủi ro thiết kế thực sự, không phải giả thuyết suông, cần được QA test ngay khi có dữ liệu thật đầu tiên chứa 1 dòng refund của usage charge, và nên được PO xác nhận hành vi mong muốn trước."
}
``` ## OQ-payout-import-008 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-008", "type": "OPEN_ISSUE", "feature_id": "customer-matching-and-dedup", "kb_id": "KB-005", "summary": "KNOWN DEFECT (KB-005, feature customer-matching-and-dedup): Dòng không khớp Customer không được ghi log (known defect). Theo tài liệu `payout - dedup and reconciliation` §`Cách khớp Customer cho 1 dòng payout mới`, dòng bị bỏ qua vì không khớp `Customer` không được ghi log. (Liên quan KB-024 của feature payout-csv-upload — cùng loại observability gap, khác nguyên nhân skip.)"
}
``` ## OQ-payout-import-009 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-009", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-007", "summary": "KNOWN DEFECT (KB-007, feature payout-csv-upload): App Title không dùng được làm khoá join (known defect). Theo tài liệu `known-issues-edge-cases` §A1, `App Title` không dùng làm khoá join được vì cùng 1 họ app có thể xuất hiện với casing khác nhau trong cùng 1 file thật (ví dụ đã quan sát: \"Qikify Upsell\" vs \"qikify Slide Cart\")."
}
``` ## OQ-payout-import-010 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-010", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-008", "summary": "KNOWN DEFECT (KB-008, feature payout-csv-upload): ShopifyPayoutImport::rules bắt buộc app_slug, không tự suy. Theo tài liệu `known-issues-edge-cases` §A1, `ShopifyPayoutImport::rules` bắt buộc `app_slug`; không có logic nào tự suy ra `app_slug` từ `App Title`."
}
``` ## OQ-payout-import-011 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-011", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-011", "summary": "KNOWN DEFECT (KB-011, feature payout-csv-upload): Bổ sung app_slug là gánh nặng thao tác thủ công (known defect framing). Theo tài liệu `known-issues-edge-cases` §A1, người upload phải tự bổ sung cột `app_slug` bằng tay (map thủ công ngoài hệ thống, ví dụ trên spreadsheet) trước khi đưa file vào admin — đây là bước thủ công bắt buộc, không có hỗ trợ tự động. Liên quan KB-009/KB-010 (cùng thao tác, `qikfiliate/payout - overview & upload journey` mô tả dạng journey bình thường; `qikfiliate/known issues edge cases` nêu lại dưới góc nhìn rủi ro vận hành)."
}
``` ## OQ-payout-import-012 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-012", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-024", "summary": "KNOWN DEFECT (KB-024, feature payout-csv-upload): Banner không liệt kê dòng bị bỏ qua (observability gap). Theo tài liệu `payout - overview & upload journey` §`Journey đầy đủ: Admin upload 1 file Payout mới`, banner kết quả chỉ báo số lượng tạo thành công, không liệt kê danh sách dòng bị bỏ qua; hiện tại không có cách nào từ giao diện để biết chính xác dòng nào bị bỏ (phải đối chiếu thủ công số dòng trong file gốc với số Conversion tạo ra, hoặc so sánh dữ liệu trực tiếp trong DB); tài liệu tự xếp loại đây là khoảng trống khả năng quan sát (observability) của hệ thống, không phải bug, nhưng là rủi ro vận hành thực tế đáng lưu ý."
}
``` ## OQ-payout-import-013 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-013", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-031", "summary": "KNOWN DEFECT (KB-031, feature payout-csv-upload): Chênh lệch $0.06 chưa giải thích được ở ví dụ usage (regression watch). Theo tài liệu `payout - charge type reference` §`Ví dụ số thực tế — Usage charge`, với ví dụ usage charge thật quan sát ngày 2026-08-05, công thức Partner Share cho ra $1.70 trong khi số thật là $1.64 (chênh khoảng $0.06); tài liệu tự ghi trường hợp này chưa giải thích được hoàn toàn, khả năng do làm tròn hoặc 1 khoản phí phụ không hiện rõ. Tài liệu cũng tự ghi công thức đã khớp chính xác (sai số 0) ở các ví dụ recurring/refund khác (KB-030 không bị nghi ngờ nói chung; chênh lệch này là cục bộ cho dữ liệu usage)."
}
``` ## OQ-payout-import-014 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-014", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-032", "summary": "KNOWN DEFECT (KB-032, feature payout-csv-upload): A1 cụ thể: thiếu app_slug → hoa hồng của app đó biến mất âm thầm cả kỳ. Theo tài liệu `known-issues-edge-cases` §A1, khi thiếu cột/giá trị `app_slug`: banner kết quả báo số conversion tạo ra KHÔNG bao gồm dòng đó, không có log nào, và không có cách nào từ UI xác định chính xác dòng nào đã bị bỏ qua và vì lý do gì (thiếu app_slug hay lý do khác); hệ quả nghiệp vụ là toàn bộ hoa hồng của app đó trong kỳ payout biến mất âm thầm. Đây là 1 trường hợp cụ thể, tái hiện được, của observability gap tổng quát ở KB-024."
}
``` ## OQ-payout-import-015 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-015", "type": "OPEN_ISSUE", "feature_id": "payout-csv-upload", "kb_id": "KB-033", "summary": "KNOWN DEFECT (KB-033, feature payout-csv-upload): A2 cụ thể: Partner Share rỗng → skip âm thầm, không phòng tránh được. Theo tài liệu `known-issues-edge-cases` §A2, trong 1 dòng dữ liệu thật quan sát được, `Partner Sale`, `Shopify Fee`, `Processing Fee` đều có giá trị nhưng `Partner Share` để trống; dòng đó fail validate `required` rồi bị skip âm thầm theo cùng cơ chế `onFailure` rỗng như A1; đây không phải lỗi quy trình con người (quên map) mà là dữ liệu gốc từ Shopify tự thiếu — không có cách nào phòng tránh trước khi upload."
}
``` ## OQ-payout-import-016 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-016", "type": "OPEN_ISSUE", "feature_id": "populate-reconcile-late-data", "kb_id": "KB-002", "summary": "KNOWN DEFECT (KB-002, feature populate-reconcile-late-data): Dễ nhầm giữa 2 màn hình Upload và Populate/reconcile (known defect). Theo tài liệu `payout - overview & upload journey` §`Khi nào dùng \"Upload payout file\" vs khi nào dùng \"Populate/reconcile\"`, đây là điểm rất dễ nhầm giữa 2 màn hình gần giống nhau trên cùng menu Conversion."
}
``` ## OQ-payout-import-017 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-017", "type": "OPEN_ISSUE", "feature_id": "populate-reconcile-late-data", "kb_id": "KB-005", "summary": "KNOWN DEFECT (KB-005, feature populate-reconcile-late-data): Dùng lại Upload payout file cho export sau sẽ tạo Conversion trùng (known defect). Theo tài liệu `payout - dedup and reconciliation` §`Màn hình \"Populate/reconcile\" — đối soát dữ liệu Shopify gửi trễ`, nếu dùng lại đúng màn hình \"Upload payout file\" (tạo mới) cho lần export sau, cơ chế dedup sẽ không nhận ra đây là dữ liệu cần cập nhật (vì rất có thể `partner_share` đã đổi, vượt quá sai số 0.005 cho phép), nên hệ thống sẽ hiểu nhầm là 1 dòng mới hoàn toàn và tạo Conversion trùng."
}
``` ## OQ-payout-import-018 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-018", "type": "OPEN_ISSUE", "feature_id": "populate-reconcile-late-data", "kb_id": "KB-011", "summary": "KNOWN DEFECT (KB-011, feature populate-reconcile-late-data): amount KHÔNG được tính lại khi populate (known defect). Theo tài liệu `payout - dedup and reconciliation` §`Kịch bản cụ thể: đối soát dữ liệu settle muộn cho kỳ tháng 7`, `amount` (số tiền hoa hồng affiliate đã nhận) KHÔNG bị tính lại khi populate, chỉ `percentage` hiển thị được cập nhật lại cho khớp với `partner_share` mới. Tài liệu chưa xác nhận có quy trình bù trừ nào cho chênh lệch này."
}
``` ## OQ-payout-import-019 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-019", "type": "OPEN_ISSUE", "feature_id": "populate-reconcile-late-data", "kb_id": "KB-018", "summary": "KNOWN DEFECT (KB-018, feature populate-reconcile-late-data): Bất đối xứng hành vi lỗi giữa 2 màn hình — nên PO xác nhận có chủ đích hay không. Theo tài liệu `payout - dedup and reconciliation` §`Khác biệt hành vi lỗi — điểm QA cần đặc biệt lưu ý`, sự bất đối xứng hành vi lỗi giữa 2 màn hình (Upload: skip âm thầm tiếp tục vs Populate: dừng toàn bộ ngay lập tức) là có thật, và nên được PO xác nhận có đúng ý định hay không."
}
``` ## OQ-payout-import-020 — OPEN_ISSUE ```json
{ "oq_id": "OQ-payout-import-020", "type": "OPEN_ISSUE", "feature_id": "populate-reconcile-late-data", "kb_id": "KB-019", "summary": "KNOWN DEFECT (KB-019, feature populate-reconcile-late-data): 1 dòng lỗi trong file populate chặn cập nhật MỌI dòng hợp lệ phía sau nó. Theo tài liệu `payout - dedup and reconciliation` §`Khác biệt hành vi lỗi — điểm QA cần đặc biệt lưu ý`, 1 dòng lỗi trong file populate (ví dụ 1 dòng thiếu `charge_creation_time` do lỗi export) sẽ chặn đứng việc cập nhật toàn bộ các dòng hợp lệ khác phía sau nó trong file, kể cả khi phần lớn file đó hoàn toàn hợp lệ."
}
``` ## OQ-payout-import-021 — CONFLICT ```json
{ "oq_id": "OQ-payout-import-021", "type": "CONFLICT", "feature_id": "customer-matching-and-dedup", "summary": "[OQ-payout-import-021] Vai tro cua charge_id trong co che dedup doi voi cac dong refund/downgrade.", "side_a": "`qikfiliate/payout - charge type reference` §Kich ban end-to-end refund: dedup KHONG dung charge_id lam khoa chinh cho cac dong loai refund/downgrade.", "side_b": "`qikfiliate/payout - dedup and reconciliation` §Co che chong trung: charge_id giong nhau LA 1 trong cac dieu kien AND bat buoc cua dedup; charge_id rong duoc coi la NULL khi so sanh."
}
``` ## OQ-payout-import-022 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-022", "type": "NEEDS_CONFIRMATION", "feature_id": "charge-type-classification", "check_ids": [ "CHK-CTC-005" ], "summary": "[NEEDS_CONFIRMATION] Charge Type chứa CẢ 'usage' và 'one-time' cùng lúc — nhánh nào được ưu tiên?. Khi 1 giá trị Charge Type chứa CẢ chuỗi con 'usage' và 'one-time', hệ thống ưu tiên nhánh nào (loại bỏ hoàn toàn hay vẫn tính usage-charge)? Cần đọc thứ tự điều kiện if/else thật trong code hoặc hỏi dev — hiện case này hoàn toàn giả định, chưa quan sát được dữ liệu thật dạng này."
}
``` ## OQ-payout-import-023 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-023", "type": "NEEDS_CONFIRMATION", "feature_id": "charge-type-classification", "check_ids": [ "CHK-CTC-011" ], "summary": "[NEEDS_CONFIRMATION — P1] Refund của 1 usage-charge: literal charge_type thực tế chưa từng quan sát — rủi ro định tuyến nhầm sang nhánh recurring/first-month. Khi có dòng refund của 1 usage-charge thật đầu tiên: (1) Shopify dùng literal charge_type nào cho dòng này (có chứa 'usage' hay không)? (2) Hành vi mong muốn của PO là gì nếu literal đó không chứa 'usage' — có cần thêm logic đặc biệt để nhận diện refund-of-usage hay giữ nguyên cơ chế match chuỗi con hiện tại? Đây là rủi ro tài chính trực tiếp (sai rate + sai cơ chế cap), cần QA test ngay khi có dữ liệu thật, và PO xác nhận trước khi dùng làm oracle chính thức."
}
``` ## OQ-payout-import-024 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-024", "type": "NEEDS_CONFIRMATION", "feature_id": "charge-type-classification", "check_ids": [ "CHK-CTC-012" ], "summary": "[NEEDS_CONFIRMATION] Hành vi phân loại khi cột Charge Type rỗng/null. Khi cột Charge Type của 1 dòng rỗng/null, hệ thống phân loại dòng đó vào nhánh nào, hay fail validate và skip (tương tự cơ chế thiếu field bắt buộc khác ở payout-csv-upload)? Cần dev xác nhận Str::contains(null, ...) không gây lỗi runtime và hành vi thực tế là gì."
}
``` ## OQ-payout-import-025 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-025", "type": "NEEDS_CONFIRMATION", "feature_id": "charge-type-classification", "check_ids": [ "CHK-CTC-013" ], "summary": "[NEEDS_CONFIRMATION] Cột Category có giá trị nào khác 'App revenue' không được xác nhận. Cột Category của file payout Shopify có những giá trị nào khác ngoài 'App revenue'? Nếu có giá trị khác, cơ chế phân loại charge_type có bị ảnh hưởng không?"
}
``` ## OQ-payout-import-026 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-026", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-005" ], "summary": "[NEEDS_CONFIRMATION] Hành vi khi upload file có đuôi không được hỗ trợ. Khi admin chọn file có đuôi không thuộc .csv/.txt/.xls/.xlsx, hệ thống báo lỗi gì (validation message ở tầng nào) hay chặn luôn ở input file picker của browser? Cần dev xác nhận để viết oracle cho case negative này."
}
``` ## OQ-payout-import-027 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-027", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-019" ], "summary": "[NEEDS_CONFIRMATION] Danh sách đầy đủ các lý do khiến 1 dòng bị bỏ qua chưa được xác nhận. Danh sách đầy đủ các lý do khiến 1 dòng payout CSV bị bỏ qua (skip) khi import là gì? Tài liệu hiện chỉ nêu 4 lý do (thiếu app_slug, thiếu partner_share, không khớp Customer, chứa 'one-time') và tự đánh dấu chưa đầy đủ bằng dấu '...'. Cần dev xác nhận toàn bộ điều kiện trong ShopifyPayoutImport::rules/onFailure để viết đủ test case negative."
}
``` ## OQ-payout-import-028 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-028", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-020" ], "summary": "[NEEDS_CONFIRMATION] Quyền truy cập route admin/conversion/form-upload theo role nào trong admin panel. Route admin/conversion/form-upload (và admin/conversion/form-upload-populate) được cấp quyền truy cập cho đúng role nào? Có chặn được truy cập từ role affiliate hoặc user chưa đăng nhập không? Đây là thao tác tạo/sửa Conversion (tiền hoa hồng) trực tiếp — cần dev xác nhận cơ chế authorization của 2 route này trước khi coi là an toàn."
}
``` ## OQ-payout-import-029 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-029", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-021" ], "summary": "[NEEDS_CONFIRMATION] Giới hạn kích thước file / số dòng tối đa / timeout khi import file lớn. Có giới hạn kích thước file, số dòng tối đa, hay timeout nào được cấu hình cho việc import file payout (cả Upload và Populate) không? Cần dev xác nhận để quyết có cần test boundary/performance riêng hay không."
}
``` ## OQ-payout-import-030 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-030", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-022" ], "summary": "[NEEDS_CONFIRMATION] Có audit trail (bảng DB lưu lịch sử từng lần upload) để đối soát 'lần import nào tạo Conversion nào' không. Có bảng DB nào lưu lịch sử từng lần upload file payout (ai, lúc nào, file nào, kết quả) hay không, cho cả Upload và Populate? Quyết định QA có thể đối soát 'lần import nào tạo Conversion nào' trên 1 đường dữ liệu tiền hay không."
}
``` ## OQ-payout-import-031 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-031", "type": "NEEDS_CONFIRMATION", "feature_id": "payout-csv-upload", "check_ids": [ "CHK-PCU-023" ], "summary": "[NEEDS_CONFIRMATION] Đơn vị tiền tệ của các cột tiền trong file payout — chỉ USD hay có quy đổi. Hệ thống xử lý đơn vị tiền tệ của các cột tiền trong file payout thế nào — chỉ hỗ trợ USD, hay có quy đổi đa tiền tệ? Cần xác nhận trước khi dựng test data cho các check tính Partner Share/commission."
}
``` ## OQ-payout-import-032 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-032", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-008" ], "summary": "[NEEDS_CONFIRMATION] Giá trị TTL thực tế của config('cache.conversion_time') không được tài liệu nêu. Giá trị thực tế (số giờ/phút) của config('cache.conversion_time') là bao nhiêu? Cần giá trị này để viết test boundary 'chạy lại populate sau N phút thì có được cập nhật lại hay không'."
}
``` ## OQ-payout-import-033 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-033", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-014" ], "summary": "[NEEDS_CONFIRMATION] Khi populate dừng giữa file do lỗi, không có công cụ xác định chính xác dòng nào đã cập nhật trước khi dừng. Khi populate báo lỗi và dừng giữa file, có công cụ/cơ chế nào (log, UI, export) giúp xác định chính xác dòng nào đã cập nhật và dòng nào chưa trước khi sửa lỗi và chạy lại? Ảnh hưởng trực tiếp tới quy trình khôi phục sau lỗi của Ops."
}
``` ## OQ-payout-import-034 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-034", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-016" ], "summary": "[NEEDS_CONFIRMATION — P1] Granularity của charge_creation_time trong khoá khớp populate (ngày hay timestamp đầy đủ) không được tài liệu nêu. Ở màn hình Populate/reconcile, charge_creation_time trong khoá khớp (customer_id, payout_date, charge_creation_time, date_from, date_to) được so theo NGÀY (như dedup của Upload) hay theo timestamp đầy đủ? Nếu khác granularity với Upload, dòng settle muộn hoàn toàn hợp lệ có thể bị bỏ sót âm thầm — cần dev xác nhận trong code trước khi coi đây là rủi ro thật."
}
``` ## OQ-payout-import-035 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-035", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-017" ], "summary": "[NEEDS_CONFIRMATION] Nguồn của date_from/date_to (2/5 field trong khoá khớp populate) trong file CSV chưa được xác nhận. date_from/date_to của Conversion (2 trong 5 field trong khoá khớp của populate) được xác định từ đâu trong file CSV populate (cột trực tiếp, hay tính toán từ payout_date/kỳ)? Cần xác nhận để dựng test data hợp lệ cho các check CHK-PRL-003/004/005."
}
``` ## OQ-payout-import-036 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-036", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-018" ], "summary": "[NEEDS_CONFIRMATION] Populate/reconcile có validate cột Charge Creation Time và tự sort dòng trước khi xử lý như Upload không. Màn hình Populate/reconcile có validate sự tồn tại của cột Charge Creation Time (báo lỗi ngay nếu thiếu, như Upload) và có tự sort dòng trước khi xử lý (như Upload) không? Tài liệu không xác nhận cho màn hình này — cần dev xác nhận trước khi viết test case negative tương tự CHK-PCU-008/009 cho Populate."
}
``` ## OQ-payout-import-037 — NEEDS_CONFIRMATION ```json
{ "oq_id": "OQ-payout-import-037", "type": "NEEDS_CONFIRMATION", "feature_id": "populate-reconcile-late-data", "check_ids": [ "CHK-PRL-019" ], "summary": "[NEEDS_CONFIRMATION — P1] Quyền truy cập route admin/conversion/form-upload-populate theo role nào trong admin panel. Route admin/conversion/form-upload-populate được cấp quyền truy cập cho đúng role nào? Có chặn được truy cập từ role affiliate hoặc user chưa đăng nhập không? (Cùng gap với CHK-PCU-020 của feature payout-csv-upload — route riêng, cần xác nhận riêng vì có thể có authorization rule khác nhau giữa 2 route.)"
}
```

## OQ-payout-import-038 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-038",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "charge-type-classification",
  "check_ids": [
    "charge-type-classification:CHK-CTC-007"
  ],
  "summary": "[REGRESSION-watch] charge_type mới không khớp 'usage' hay 'one-time' tự động rơi vào nhánh Recurring/First-month. KB item KB-014 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-CTC-007' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-039 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-039",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "charge-type-classification",
  "check_ids": [
    "charge-type-classification:CHK-CTC-008"
  ],
  "summary": "[REGRESSION-watch] Không có log cảnh báo khi gặp charge_type lạ chưa từng thấy. KB item KB-015 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-CTC-008' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-040 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-040",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "charge-type-classification",
  "check_ids": [
    "charge-type-classification:CHK-CTC-009"
  ],
  "summary": "[REGRESSION-watch] charge_type refund/downgrade chứa 'usage' bị định tuyến qua UsageCommissionCapper thay vì nhánh recurring. KB item KB-016 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-CTC-009' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-041 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-041",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": [
    "customer-matching-and-dedup",
    "populate-reconcile-late-data"
  ],
  "check_ids": [
    "customer-matching-and-dedup:CHK-CMD-003",
    "populate-reconcile-late-data:CHK-PRL-015"
  ],
  "summary": "[REGRESSION-watch] Dòng bị bỏ qua vì không khớp Customer không được ghi log. KB item KB-005 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-CMD-003' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-042 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-042",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "customer-matching-and-dedup",
  "check_ids": [
    "customer-matching-and-dedup:CHK-CMD-004"
  ],
  "summary": "Re-upload đúng file đã import trước đó không tạo Conversion trùng cho các dòng khớp đủ điều kiện dedup. Oracle STRONG cua check 'CHK-CMD-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-043 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-043",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-007"
  ],
  "summary": "[REGRESSION-watch] File format 'earnings' KHÔNG bổ sung cột app_slug: validator yêu cầu app_slug, mọi dòng fail và bị skip âm thầm. KB item KB-008, KB-011 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-007' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-044 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-044",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-010"
  ],
  "summary": "Hoa hồng của mỗi dòng tính theo rate HIỆN TẠI tại thời điểm import, không theo rate ở thời điểm charge creation. Oracle STRONG cua check 'CHK-PCU-010' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-045 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-045",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-011"
  ],
  "summary": "Partner Share tính đúng công thức Partner Sale − Shopify Fee − Processing Fee − Regulatory Operating Fee. Oracle STRONG cua check 'CHK-PCU-011' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-046 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-046",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-012"
  ],
  "summary": "[REGRESSION-watch] Dòng usage-charge có thể lệch ~$0.06 so với công thức Partner Share — chưa giải thích được. KB item KB-031 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-012' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-047 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-047",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-015"
  ],
  "summary": "[REGRESSION-watch] App Title không dùng được làm khoá join do casing khác nhau trong cùng 1 file thật. KB item KB-007 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-015' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-048 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-048",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-016"
  ],
  "summary": "[REGRESSION-watch] 1 dòng thiếu giá trị app_slug bị skip âm thầm → hoa hồng của app đó trong kỳ biến mất, không log, không hiện trên banner. KB item KB-008, KB-032 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-016' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-049 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-049",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-017"
  ],
  "summary": "[REGRESSION-watch] Cột Partner Share rỗng dù các cột tiền khác có giá trị → skip âm thầm, không phòng tránh được từ phía admin. KB item KB-033 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-017' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-050 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-050",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "payout-csv-upload",
  "check_ids": [
    "payout-csv-upload:CHK-PCU-024"
  ],
  "summary": "[REGRESSION-watch] Banner kết quả không liệt kê danh sách dòng bị bỏ qua — không có cách nào từ UI để biết chính xác dòng nào đã skip. KB item KB-024 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PCU-024' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-051 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-051",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-002"
  ],
  "summary": "[REGRESSION-watch] 2 màn hình Upload và Populate/reconcile dễ bị nhầm lẫn vì gần giống nhau trên cùng menu Conversion. KB item KB-002 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PRL-002' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-052 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-052",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-004"
  ],
  "summary": "Khi khớp, populate cập nhật partner_share, charge_creation_time, charge_type, charge_id của Conversion. Oracle STRONG cua check 'CHK-PRL-004' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-053 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-053",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-005"
  ],
  "summary": "Populate tính lại percentage = amount hiện có / partner_share mới × 100. Oracle STRONG cua check 'CHK-PRL-005' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-054 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-054",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-006"
  ],
  "summary": "[REGRESSION-watch] amount KHÔNG được tính lại khi populate — chỉ percentage hiển thị đổi, chưa xác nhận quy trình bù trừ. KB item KB-011 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PRL-006' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-055 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-055",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-007"
  ],
  "summary": "Mỗi Conversion chỉ được cập nhật qua populate 1 lần trong 1 khoảng thời gian (khoá idempotent conversion_id:{id}). Oracle STRONG cua check 'CHK-PRL-007' hien trace toi kb_id (KB-013) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-payout-import-056 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-056",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-009"
  ],
  "summary": "Chạy lại ĐÚNG file populate lần 2 (ngoài khung TTL hoặc với Conversion khác) không gây side-effect ngoài ý muốn cho các dòng chưa từng cập nhật. Oracle STRONG cua check 'CHK-PRL-009' hien trace toi kb_id (KB-013) co confirmation_source.derivation=code_artifact (suy ra tu doc code/schema, khong phai phat bieu nghiep vu tuong minh). Theo luat 'phanh derivation' cua C5, STRONG chi hop le khi MOI oracle kb_id deu CONFIRMED_EXPECTED va derivation=prose. Ha xuong BASELINE cho toi khi PO/Dev xac nhan hanh vi nay dung la chu y thiet ke, khong phai tac dung phu cua viec doc code."
}
```

## OQ-payout-import-057 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-057",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-011"
  ],
  "summary": "1 dòng lỗi validate trong file populate dừng TOÀN BỘ import ngay lập tức (throw exception). Oracle STRONG cua check 'CHK-PRL-011' hien chi dua tren KB item nguon dev_doc (toan bo KB cua run nay khong co spec_doc/po_dev_confirm/test_case nao). Theo luat C5, dev_doc khong duoc la oracle STRONG duy nhat cho check priority P1 (mat du lieu/tien/permission). Ha xuong BASELINE cho toi khi co test_case PASS xac nhan hanh vi, hoac PO/Dev xac nhan truc tiep (po_dev_confirm)."
}
```

## OQ-payout-import-058 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-058",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-012"
  ],
  "summary": "[REGRESSION-watch] 1 dòng lỗi trong file populate chặn cập nhật MỌI dòng hợp lệ phía SAU nó, kể cả khi phần lớn file hợp lệ. KB item KB-019 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PRL-012' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```

## OQ-payout-import-059 — NEEDS_CONFIRMATION

```json
{
  "oq_id": "OQ-payout-import-059",
  "type": "NEEDS_CONFIRMATION",
  "feature_id": "populate-reconcile-late-data",
  "check_ids": [
    "populate-reconcile-late-data:CHK-PRL-013"
  ],
  "summary": "[REGRESSION-watch] Bất đối xứng hành vi lỗi giữa Upload (skip âm thầm, tiếp tục) và Populate (dừng toàn bộ ngay lập tức) là có thật — cần PO xác nhận chủ đích. KB item KB-018 mang status=KNOWN_DEFECT da bi go khoi oracle.kb_ids (khong duoc dung lam oracle theo luat C5 'known_defect khong phai expected result'). Check 'CHK-PRL-013' hien khong con oracle hop le nao. Can PO/Dev xac nhan: hanh vi mo ta trong expected_result la known defect can tiep tuc theo doi (regression-watch, khong oracle) hay can mot kb_id CONFIRMED_EXPECTED khac thay the lam oracle."
}
```
