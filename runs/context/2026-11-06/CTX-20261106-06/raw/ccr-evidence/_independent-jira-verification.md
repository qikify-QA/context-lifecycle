# Kiểm độc lập trích dẫn Jira, run CTX-20261106-06

- Người kiểm: agent kiểm độc lập (subagent chỉ đọc), không phải orchestrator hay verifier của run.
- Nguồn: Atlassian MCP `listJiraIssueComments`, cloudId `ownego.atlassian.net`, gọi trực tiếp cho TIB-5500 (4 comment, isLast=true) và TIB-5548 (1 comment, isLast=true).
- Thời điểm gọi API: ngay trước 2026-11-06T17:24:23Z (2026-11-07T00:24:23+0700), mốc lấy cùng lượt gọi.
- Không dùng bản chép của orchestrator: không đọc `raw/ccr-evidence/**/jira-check.md`, trước và sau khi so. Không đọc `_ccr-full-content.md`.
- Input so: `input/ccr-fastpath-plan.json`, sha256 `9f11f5597b3cf3b3a61cdcdcb1f4489b07d9fa1a7b6e3987ddac58736f7f6e22`, mtime 2026-11-07T00:24:13 (+0700). Hash không đổi giữa đầu và cuối lần kiểm. Plan sửa sau hash này thì kết quả dưới đây không tự áp dụng.
- Chỉ đọc Jira. Không tạo hay sửa gì trên Jira.

## Cách so

Body TIB-5500 trả về dạng HTML, TIB-5548 dạng markdown. Trước khi so: bỏ thẻ HTML, giải mã entity (`&quot;`, `&gt;`), bỏ `**` và backtick. Sau đó kiểm quote là chuỗi con chính xác của body bằng script chạy trong bộ nhớ, phân biệt hoa thường và dấu câu. Cả 11 quote đều ở dạng Unicode NFC. Ký tự đặc biệt trong quote chỉ có `→` và `–`.

Giới hạn: kết quả API không ghi thẳng ra đĩa được, nên đoạn body đưa vào script là bản do agent này chép từ kết quả tool. Không có file dump thô để kiểm lại bằng máy.

## Metadata comment

| Comment | Issue | Tác giả | Tạo | Sửa | Đã sửa sau khi tạo |
| --- | --- | --- | --- | --- | --- |
| #53876 | TIB-5548 | tinhpt | 2026-10-08T17:19:45.821+0700 | 2026-10-13T17:50:35.125+0700 | Có, người sửa là tinhpt |
| #55437 | TIB-5500 | tuanva | 2026-10-23T09:39:45.921+0700 | 2026-10-23T09:39:45.921+0700 | Không |
| #56108 | TIB-5500 | tuanva | 2026-10-30T15:00:20.631+0700 | 2026-10-30T15:00:20.631+0700 | Không |

Cả ba comment không có giới hạn hiển thị (`jsdPublic: true`). API chỉ trả tên hiển thị, nên phần "(dev)" trong `authored_by` không xác minh được từ nguồn này.

## Kết quả từng quote

14 ref trong plan (3 ở mức claim, 11 trong `legs[]`), gom thành 11 quote duy nhất. Leg `customcat-key-owner` và `observed-unconnected-account` của CLAIM-02 có `confirmation_source: null`, không có gì để so.

| # | Comment | Dùng ở | Khớp từng chữ | Khác biệt chỉ do định dạng |
| --- | --- | --- | --- | --- |
| Q1 | #53876 | claims[1], claims[1].legs[1] | Có | Không có |
| Q2 | #53876 | claims[1].legs[0] | Có | `**` quanh "Extras → Fulfillments" |
| Q3 | #56108 | claims[4], claims[4].legs[1] | Có | `<strong>` quanh nhãn, `&gt;` thành `>` |
| Q4 | #55437 | claims[4].legs[0] | Có | Không có (ngoài thẻ `li`/`p`) |
| Q5 | #55437 | claims[4].legs[2] | Có | Không có (ngoài thẻ `li`/`p`) |
| Q6 | #56108 | claims[4].legs[3] | Có | `<strong>` quanh nhãn |
| Q7 | #56108 | claims[4].legs[4] | Có | `<strong>` quanh nhãn |
| Q8 | #56108 | claims[4].legs[5] | Có | `<strong>` quanh nhãn, `&quot;` thành `"` |
| Q9 | #56108 | claims[4].legs[6] | Có | `<strong>` quanh nhãn |
| Q10 | #56108 | claims[5], claims[5].legs[1] | Có | `<strong>` quanh nhãn, `&quot;` thành `"` |
| Q11 | #55437 | claims[5].legs[0] | Có | `<code>` quanh "dpi" |

Nội dung quote:

- Q1: The merchant can't trigger these from the UI, because these providers use teeinblue's own key.
- Q2: These are the providers where the merchant enters their own key in Extras → Fulfillments.
- Q3: Ngưỡng 9000 px (Printify, Picanova/merchOne): chỉ cần width hoặc height > 9000 (lớn hơn hẳn, không tính bằng 9000) thì cả hai cạnh giảm một nửa và DPI = 150.
- Q4: DPI chỉ đổi resolution ghi trong file export, không đổi kích thước pixel của print area. Muốn file đúng kích thước in thật thì width/height cũng phải khớp DPI đó.
- Q5: Provider chỉ cho width/height như Printbelle không có DPI trong API nên import vẫn mặc định 300, seller phải tự sửa theo file TIFF gốc.
- Q6: Provider trả DPI ngoài khoảng (vd 600): lúc lấy danh sách print area từ provider, BE tự đổi về 300 trước khi trả cho popup Import, nên import không lỗi và print area được DPI 300.
- Q7: PDF 150 DPI to gấp đôi (336 pt → 672 pt): đúng hành vi mong muốn. Giữ nguyên số pixel mà hạ DPI một nửa thì khổ in thật gấp đôi (đã ghi ở Known limitations).
- Q8: Activity log "null": DPI trống giờ ghi là 300, ví dụ Changed dpi from "300" to "150"; xoá trống ghi "150" → "300".
- Q9: Activity log do browser ghi qua GraphQL: đây là cách portal đang ghi mọi activity của product từ trước (width/height, thêm/xoá print area), ticket này không đổi. Nếu cần chuyển sang server ghi thì nên tách ticket riêng.
- Q10: DPI ngoài 72–300 không báo lỗi: FE giờ chặn đúng khoảng 72–300 ở cả sửa inline lẫn form New printarea, message "DPI must be a whole number from 72 to 300", không gửi mutation.
- Q11: Thêm cột dpi (cho phép trống) vào bảng printareas. Print area đã có từ trước giữ trống và vẫn export 300 DPI như cũ.

Tổng: 11/11 khớp từng chữ. Không có lệch nguyên văn.

## Lệch metadata và điểm cần lưu ý

1. `authored_on` của #53876 là 2026-10-13, trùng ngày sửa. Ngày tạo là 2026-10-08. Ba ref dùng comment này đều mang ngày sửa. Comment có dòng "Updated 13 Oct" nói về đổi 502 sang 503 ở case 3.5. API không trả lịch sử sửa, nên không xác định được Q1 và Q2 có từ bản 08/10 hay không; chỉ xác nhận được hai câu có trong bản hiện tại.
2. `authored_on` của #55437 và #56108 khớp ngày tạo, và hai comment chưa sửa. `authored_by` khớp tên hiển thị ở cả ba comment.
3. Q7 dừng ngay trước câu ngoại lệ trong cùng mục: "Với Printify import thì pixel cũng giảm một nửa nên khổ in giữ nguyên." Quote vẫn đúng nguyên văn. Leg `pdf-page-size` của CLAIM-05 không có `statement_basis`, và `statement_limits` không nhắc ngoại lệ này. Nếu item KB viết PDF 150 DPI luôn to gấp đôi thì rộng hơn lời dev.
4. Q10 dừng trước câu "Nếu mutation lỗi vì lý do khác cũng hiện thông báo lỗi, không còn im lặng." Câu này chỉ bổ sung, không đổi nghĩa quote.
5. #56108 thay thế một phần #55437: message cũ "DPI must be a positive whole number" ở #55437 được đổi thành message ở Q10. Không quote nào của plan dùng message cũ.

## Mục 4: comment #53876 của TIB-5548

Nguyên văn theo body markdown API trả về.

Tiêu đề mục 1:

```
### 1. Invalid merchant API key (Printful, ShineOn, Picanova)
```

Tiêu đề và câu dẫn mục 3:

```
### 3. Provider-side errors (staging only, needs a dev)

The merchant can't trigger these from the UI, because these providers use teeinblue's own key. A dev can change the key or URL in the staging `.env` temporarily.
```

Các dòng 3.1 đến 3.6:

```
| # | Setup | Expected toast |
| --- | --- | --- |
| 3.1 | Invalid `MERCHIZE_CATALOG_API_KEY` | `[Merchize] Unauthorized: Invalid username or password` |
| 3.2 | Invalid `MARKETPRINT_PARTNER_TOKEN` | `[MarketPrint] Unauthorized. Partner token is missing or invalid` |
| 3.3 | Invalid CustomCat key | `[CustomCat] Access denied, check the API key in Extras/Fulfillments` (403). It used to say "Cannot find product". |
| 3.4 | Invalid Printify key | `[Printify] Unauthenticated` |
| 3.5 | Point a provider's API URL at an unreachable host (e.g. `https://10.255.255.1/`), or at a URL that returns a 5xx | `[<Provider>] Could not connect` (or the provider's own error text), status **503**. **The toast must appear**, and the Network tab must show our JSON body, not a Cloudflare HTML page. |
| 3.6 | Invalid Shirtee or Printbelle key (both answer HTTP 200 with an error code) | `[Shirtee] Invalid Api key` / `[Printbelle] User does not exist or incorrect password.` Status 400. |
```

| Tên | Nằm dưới mục 3 | Dòng |
| --- | --- | --- |
| Merchize | Có | 3.1 |
| MarketPrint | Có | 3.2 |
| Printify | Có | 3.4 |
| Shirtee | Có | 3.6 |
| Printbelle | Có | 3.6 |

Ghi chú:

- `statement_basis` của leg `teeinblue-key-group` (dòng 3.1, 3.2, 3.4, 3.6) khớp với comment. `statement_basis` của leg `merchant-key-group` (Printful, ShineOn, Picanova) khớp tiêu đề mục 1.
- CustomCat cũng nằm dưới mục 3 (dòng 3.3), trong khi toast của chính dòng đó bảo kiểm key ở Extras/Fulfillments. Plan đã tách thành leg `customcat-key-owner`, mô tả leg đúng với comment.
- Dòng 3.5 không nêu tên provider cụ thể.
- Merchize, Printify và CustomCat còn xuất hiện ở dòng 2.1 (regression với "valid keys"), nên không chỉ có ở mục 3.

## Lần kiểm bổ sung: 5 câu TIB-5500

- Người kiểm: cùng agent kiểm độc lập, theo yêu cầu bổ sung của agent đã giao việc. Vẫn chỉ đọc, vẫn không đọc `raw/ccr-evidence/**/jira-check.md`.
- Thời điểm gọi API: gọi lại `listJiraIssueComments` cho TIB-5500 (4 comment, isLast=true), ngay trước 2026-11-06T17:35:46Z (2026-11-07T00:35:46+0700). Không dùng kết quả lần trước.
- Metadata của cả 4 comment không đổi so với lần gọi trước.
- Hash tại 2026-11-06T17:35:46Z:
  - `candidate/product-kb/product-base-browse.json`: sha256 `6346319928b7950c3f21ebc3fc0779e21a95c8ecf488f486e203cf4573133762`, mtime 2026-11-07T00:25:38 (+0700)
  - `candidate/product-kb/printarea-definition.json`: sha256 `5a0cb1b17dc866009569f0be7eef5776c3845152e1bc02ebe5922742e1220e04`, mtime 2026-11-07T00:25:29 (+0700)
  - `input/ccr-fastpath-plan.json`: sha256 không đổi so với lần kiểm đầu.
- Cách so và giới hạn giống phần đầu file. Chưa đọc nội dung hai file candidate, chỉ lấy hash.

| # | Comment | Câu | Khớp từng chữ | Khác biệt chỉ do định dạng | Tác giả | Tạo | Sửa |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | #55437 | File design export (PNG/JPG/PDF và thumbnail) ghi resolution theo DPI của print area, trống thì dùng 300. | Có | Không có (ngoài thẻ `li`/`p`) | tuanva | 2026-10-23T09:39:45.921+0700 | Chưa sửa |
| 2 | #55437 | Product Base > Edit > bảng Printareas có thêm cột DPI (có tooltip). Print area cũ hiển thị "300" màu mờ. | Có | `&gt;` thành `>`, `&quot;` thành `"` | tuanva | 2026-10-23T09:39:45.921+0700 | Chưa sửa |
| 3 | #55437 | Print area đã có trước khi deploy để trống DPI và hiển thị 300 mặc định. Không tự đổi DPI cho print area đã import trước đó, seller phải tự sửa nếu cần. | Có | Không có (ngoài thẻ `li`/`p`) | tuanva | 2026-10-23T09:39:45.921+0700 | Chưa sửa |
| 4 | #56108 | Khoảng 72–300: đúng chủ đích, BE validate và DB constraint cùng khoảng này. | Có | `<strong>` quanh nhãn | tuanva | 2026-10-30T15:00:20.631+0700 | Chưa sửa |
| 5 | #56080 | DB chặn bằng constraint printareas_dpi_check (72–300), nhưng UI không báo lỗi gì, popup cứ mở. | Có | `<code>` quanh tên constraint | linhpt | 2026-10-30T11:39:21.246+0700 | 2026-10-30T12:07:59.677+0700, người sửa là linhpt |

Tổng: 5/5 khớp từng chữ.

Lưu ý:

- Câu 5 nằm trong báo cáo "QA staging: kết quả + câu hỏi còn mở", tức quan sát của QA, không phải lời dev. Lời dev về khoảng 72–300 là câu 4. Phần "UI không báo lỗi" của câu 5 đã được #56108 sửa: FE giờ chặn khoảng này kèm message.
- #56080 được sửa sau khi tạo khoảng 28 phút và trước #56108. API không có lịch sử sửa, nên không biết câu 5 có từ bản đầu không.

### #56108 có sửa nội dung 3 câu của #55437 không

Đã đọc toàn bộ #56108. Không câu nào bị sửa hay phủ định.

| Câu #55437 | Kết luận | Đoạn liên quan trong #56108 |
| --- | --- | --- |
| 1. Resolution theo DPI, trống dùng 300 | Không sửa | Mục PDF 150 DPI nói về khổ in khi hạ DPI, cùng chiều với câu 1. Không nhắc lại quy tắc ghi resolution hay giá trị trống. |
| 2. Print area cũ hiển thị "300" màu mờ | Không sửa | "bảng hiện đủ dòng kèm cột DPI (trống thì hiện 300)" nói về trang Products detail, không phải Product Base > Edit, và không nhắc màu mờ. Mục Activity log nói về log. Vì vậy #56108 không xác nhận lại, cũng không đổi, chi tiết "màu mờ". |
| 3. Không tự đổi DPI cho print area đã import | Không sửa | Print area 12683: "chị xoá trống ô DPI là về lại 300" là thao tác tay, cùng chiều. "BE tự đổi về 300" chỉ áp dụng lúc lấy danh sách từ provider cho popup Import, không phải print area đã import. |

Phần của #55437 mà #56108 có đổi nằm ngoài 3 câu này: khoảng chặn và message lỗi của DPI ("DPI must be a positive whole number" thành "DPI must be a whole number from 72 to 300").
