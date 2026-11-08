# Đối chiếu Jira TIB-5282 (đọc 2026-11-06, read-only)

Orchestrator đọc lại ticket vì Phần 3 của CCR ghi "tiêu đề và status chưa tra".

- Status hiện tại: `Re-open`. Issue type: `Improvement` (đổi từ `Bug` ngày 2026-11-04).
- Lịch sử status: Code Review -> QA Review (2026-10-16) -> Re-open (2026-10-26, QA).
- Pull request gắn với ticket: 1 PR, state `OPEN` (cập nhật cuối 2026-10-16). Dữ liệu Development panel có cờ isStale.
- Sprint hiện tại: TIB Sprint 186, state `future` (2026-12-28 tới 2027-01-11).
- Tiêu đề cũ: `[Boundless] Reflect new artwork after duplicating Product to each mockup in Product`.
- Tiêu đề mới (2026-11-04, PO): `Add Replace artwork action in campaigns by platform products & Boundless products`.

## Comment #54805, dev, 2026-10-16 (nguồn của CCR)

Quote dòng #5 và #6 trong CCR khớp comment, chỉ khác định dạng nghiêng.

Câu ngay trước đoạn CCR trích, giới hạn phạm vi của comment:

```
Scope: Boundless campaigns only (platform_products), which can only ever have a single artwork per campaign. Shopify and Etsy campaigns are explicitly unaffected by this change.
```

Bước verify của comment về replace:

```
Replace the campaign's artwork with a different one (remove the old one, add a new one) → the mockup updates to show the new artwork (not blank, not the old one) without needing to re-place it.
```

## Comment #55605, QA, 2026-10-26 (lúc chuyển Re-open)

```
PO chưa chốt solution mà AM đưa ra, chưa có acceptance criteria, issue này cũng không phải bug.
```

## Description do PO viết lại 2026-11-04, sau comment của dev

```
In campaigns by platform products (Shopify/Etsy) and Boundless products, the only way to change an artwork is to remove it and add a new one. Removing an artwork also removes its layer from the mockups, which is correct behavior, so the merchant has to open each mockup and place the new artwork again.
```

```
Campaigns by Product Base don't have this problem: artwork is placed through print areas, and the print areas stay on the mockup when the artwork is removed, so a new artwork shows up on the mockup automatically.
```

## Kết luận cho plan

- Vế 1 (mockup chỉ hiện artwork sau "Add Artwork" trong editor của mockup): độc lập với fix theo lời dev, description của PO không trái. Nạp, giới hạn ở campaign Boundless. Không áp cho Campaign by Product Base.
- Vế 2 (replace/remove cập nhật mockup): chưa ship theo dữ liệu Jira (Re-open, PR OPEN, sprint future), và phần replace trái với description PO viết sau đó. Không nạp, mở OQ OPEN_ISSUE.
- "Boundless một artwork mỗi campaign" (Phần 1a): CCR không trích nguyên văn, không có trong 4.3. Không nạp.

## Bổ sung sau review vòng 2

Lần viết lại 2026-11-04 còn thêm 11 acceptance criteria vào description, về action Replace artwork (icon, phạm vi Shopify/Etsy/Boundless, thứ tự, mockup, tỉ lệ, storefront, order cũ). Trích hai AC liên quan mockup:

```
When the old artwork is placed in several mockups, all of them show the new artwork. A mockup without the old artwork doesn't change.
```

```
In campaigns by Product Base, the icon doesn't appear.
```

Nhãn "PO" ở trên: người viết lại là người quản lý sprint của ticket; Jira không ghi vai trò. Comment QA "PO chưa chốt" có trước lần viết lại nên không phản ánh trạng thái sau 2026-11-04.
