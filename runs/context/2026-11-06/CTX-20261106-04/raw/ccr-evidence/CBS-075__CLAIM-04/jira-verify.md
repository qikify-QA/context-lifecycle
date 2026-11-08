# Đối chiếu Jira: TIB-5282 comment 54805 (A1, A2)

Đối chiếu do một agent riêng đọc trực tiếp Jira ngày 2026-11-06, không phải người. Agent không đọc jira-check.md hay file nào khác trong runs/, và không tạo, sửa, comment hay chuyển trạng thái issue nào.

Nguồn: `ownego.atlassian.net`, comment lấy ở dạng HTML, đọc thêm trường issue và changelog. Cách so: bỏ thẻ định dạng, giải entity, rồi đọc so từng chuỗi với nội dung thật (không dùng script diff).

## Comment 54805

- Tác giả: huyenntk (dev, accountId `[accountId đã bỏ]`). Khớp kỳ vọng.
- Tạo: 2026-10-16T15:30:14.112+0700. Khớp kỳ vọng.
- Sửa lần cuối: 2026-10-16T16:43:19.154+0700, cùng tác giả. Comment đã được sửa sau khi tạo khoảng 1 giờ 13 phút, trong cùng ngày. Kết quả dưới đây so với bản hiện tại; bản trước khi sửa không xem được.

## Kết quả từng chuỗi

| Mã | Kết quả | Vị trí trong comment |
|---|---|---|
| A1 | KHỚP | Đoạn "Important clarification" (câu đầu, câu hai) |
| A2 | KHỚP | Đoạn "Scope" |

A1 và A2 khớp đúng chữ, chỉ khác định dạng: trong A1, "Important clarification:" in đậm và "not" in nghiêng; trong A2, `platform_products` là thẻ code.

Hai chuỗi không phải toàn bộ đoạn. A1 còn câu tiếp theo trong comment: "This fix is about what happens after that: once a mockup already has an artwork placed on it, replacing or removing the campaign's artwork should now correctly update/clear it, instead of leaving it stale."

## Trạng thái hiện tại của TIB-5282

- Status: Re-open (nhóm To Do). Assignee: huyenntk.
- Updated: 2026-11-05T11:34:57.358+0700 (thay đổi cuối chỉ là Rank và Sprint).

## Comment mới hơn 54805

Chỉ có một: 55605, QA (accountId `[accountId đã bỏ]`), 2026-10-26T12:25:40.799+0700. Tổng số comment của issue là 2.

Comment này không sửa hay rút lại câu chữ của A1 và A2, và không nhắc tới hai nội dung đó. Nhưng nó bác bỏ fix mà 54805 mô tả:

> PO chưa chốt solution mà AM đưa ra, chưa có acceptance criteria, issue này cũng không phải bug.

> Dev chưa xử lý những case liên quan đến khác size artwork. Hiện tại, nếu khác size thì không thể chỉnh sửa được → đề xuất chỉ áp dụng với những artwork có cùng size/ratio thôi

Ngay sau đó (12:25:43 cùng ngày), QA chuyển issue từ QA Review sang Re-open và giao lại cho huyenntk. Changelog không có lần nào issue đạt Passed hay Done.

## Thay đổi sau comment không nằm trong comment (changelog)

Ngày 2026-11-04, accountId `[accountId đã bỏ]` đã viết lại ticket:

- Summary đổi từ "[Boundless] Reflect new artwork after duplicating Product to each mockup in Product" sang "Add Replace artwork action in campaigns by platform products & Boundless products".
- Issue type đổi từ Bug sang Improvement.
- Description viết lại toàn bộ và thêm 11 acceptance criteria.

Ảnh hưởng tới hai chuỗi:

- **A2, phần scope:** A2 nói fix chỉ áp dụng Boundless, Shopify và Etsy không bị ảnh hưởng. Description hiện tại đặt scope cho action mới là cả Shopify, Etsy và Boundless. Hai bên nói về hai việc khác nhau (fix PR teeinblue-api#4014 và action Replace artwork), nên đây không phải lời rút lại A2, nhưng A2 không mô tả scope hiện tại của ticket.
- **A2, phần "single artwork per campaign":** comment nói Boundless chỉ có một artwork mỗi campaign. Description dùng cách nói chung cho cả ba loại campaign ("Other artworks in the campaign don't change", AC "When a campaign has several artworks") và không tách riêng Boundless. Jira không xác nhận hay bác bỏ điều này.
- **A1:** description vẫn nhất quán với việc đặt artwork lên từng mockup là bước thủ công ("the merchant has to open each mockup and place the new artwork again"). Tuy nhiên nó mô tả tình trạng trước khi có action mới, và câu "unrelated to this fix" trong A1 gắn với fix đã bị re-open.

Lưu ý khi dùng làm bằng chứng: chuỗi A1 và A2 được trích đúng, nhưng chúng là lời dev tại thời điểm 2026-10-16 về một fix chưa qua QA, trên ticket đã đổi hướng. Jira không cho biết code của PR teeinblue-api#4014 hiện có đang chạy hay không.
