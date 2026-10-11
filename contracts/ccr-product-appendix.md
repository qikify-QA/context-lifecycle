# CCR — phụ lục product

Dành cho QA member gửi Context Change Request. Khuôn CCR đầy đủ thuộc skill `create-ccr` (`references/ccr-template.md`) và dùng chung cho mọi product; file này chỉ cấp những thứ riêng của repo context builder.

## 1. Product nhận CCR

Bảng sinh tự động từ cấu hình product (`node scripts/sync-appendix.mjs`) — không sửa tay.

<!-- products:start -->
| `product_key` | Nhãn | Key trên QA Hub | Nguồn knowledge | Environment context builder dùng | CCR được ghi đè canon (§12.5) |
|---|---|---|---|---|---|
| `duos` | Duos B2B | `DUOS` | tài liệu (doc-first) | `documented` | có |
| `imagenhub` | ImagenHub | `IGH` | tài liệu (doc-first) | `documented` | có |
| `mailtro` | Mailtro | `MTRO` | tài liệu (doc-first) | `documented` | có |
| `qik-volume` | Qikify Volume Discounts | `QVL` | tài liệu (doc-first) | `documented` | có |
| `qikfiliate` | Qikfiliate | `QAF` | tài liệu (doc-first) | `documented` | có |
| `teeinblue` | Teeinblue | `TIB` | explore (portal-explorer, storefront-explorer, api-explorer, db-explorer, code-config-explorer) | `staging` | không — CCR mâu thuẫn canon luôn giữ cả hai phía |
<!-- products:end -->

`object_key` hợp lệ tra ở `products/<product_key>/_registry.json` trong repo knowledge. Không khớp cái nào thì mô tả bằng lời, **đừng bịa** key.

Product phục vụ nhiều brand trên cùng codebase (vd qikfiliate): claim chỉ đúng cho một brand phải nói rõ brand nào — nó được ghi vào `scope.brand` thay vì publish như hành vi cốt lõi.

## 2. Những gì KHÔNG cần hỏi người gửi

- **Environment:** context builder luôn dùng environment trong bảng trên. Mục "Phần 2 — Thấy nó ở đâu" chỉ là dữ kiện về nơi *bạn* quan sát; ghi `production` hoặc `không rõ` đều hợp lệ và không bao giờ là lý do bị trả `NEEDS_INFO`.
- **Mutation policy, account dùng để explore, có capture network/DB không:** là chính sách của bên sở hữu môi trường.

## 3. Cách gửi

1. Soạn CCR bằng skill `create-ccr`, đính file vào task liên quan trên QA Hub.
2. Bấm **Submit CCR** → QA Hub tạo một Proposal (`CBS-<n>`) ở cột `Todo` của tab "Context Builder Board".
3. **Kéo Proposal sang `In Progress`** khi sẵn sàng. Đây là tín hiệu duy nhất để context builder nhặt CCR; Proposal ở `Todo` không được xử lý.
4. Kết quả trả về ngay trên Proposal: `published` (kèm version mới) hoặc `blocked` (kèm lý do: thiếu thông tin, conflict, bị từ chối hoặc hoãn).

Nhiều CCR cùng lúc thì kéo hết sang `In Progress` được — CCR chạm object khác nhau chạy song song; CCR chạm cùng object với một CCR đang chạy sẽ nhận `CONFLICT` và cần kéo lại sau.

Một CCR chỉ thuộc một product. CCR chạm nhiều product → tách thành nhiều CCR.

## 4. Mức độ gấp

| Mức | Nghĩa |
|---|---|
| `HIGH` | Đang chặn test P0/P1, hoặc một checklist/automation đang publish có thể **chạy sai ngay lúc này** |
| `MEDIUM` | Ảnh hưởng coverage, chưa chặn ai |
| `LOW` | Cải thiện dần, dọn canon |

## 5. Khi CCR mâu thuẫn với canon

Cột cuối của bảng ở mục 1 cho biết CCR có thể **ghi đè** canon hay không.

- **Có:** CCR có nguồn mạnh hơn hoặc mới hơn có thể thay statement cũ; statement cũ được giữ nguyên văn trong `CHANGELOG.md` của object.
- **Không:** CCR mâu thuẫn canon luôn được giữ song song với canon, chờ người phân xử.

Dù product nào, các trường hợp sau luôn cần người quyết, không tự ghi đè: nguồn `test_case` bị một tài liệu dev nói ngược · item chạm permission/tiền/mất dữ liệu · conflict đang mở · item là oracle mạnh duy nhất của một check · scope khác nhau (khi đó là item mới) · topic nằm trong danh sách cấm ghi đè của product.

Vì vậy **ngày của nguồn** ở mục 5.1 của CCR phải chính xác: đó là ngày tài liệu được viết, ngày comment PO/Dev, hoặc ngày chạy test case — **không** phải ngày ticket được resolve. Lấy sai ngày sẽ làm ghi đè sai chiều, và sai im lặng.

## 6. Mọi thứ cần thiết phải nằm TRONG file CCR

Knowledge sau khi publish tự chứa hoàn toàn: file CCR, Proposal và tài liệu gửi kèm đều có thể bị xoá mà knowledge vẫn dùng được. Hệ quả: phần **trích nguyên văn** ở mục 5.1 là thứ sống sót, còn link thì không. Claim chỉ có link mà không có quote sẽ thành provenance rỗng ngay khi nguồn bị dọn.
