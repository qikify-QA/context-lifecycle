# TIB-5282: description và 11 acceptance criteria (read-only, 2026-11-06)

Orchestrator đọc qua Atlassian MCP ngày 2026-11-06, không phải người đối chiếu. Chép nguyên văn nội dung chữ, bỏ thẻ định dạng và ảnh. Lưu theo finding F-08. Không dùng làm expected trong run này. Vai trò người viết lại ticket 2026-11-04 chưa xác định.

Summary: Add Replace artwork action in campaigns by platform products & Boundless products
Status: Re-open. Issue type: Improvement. Updated: 2026-11-05T11:34:57.358+0700. Sprint chưa đóng: TIB Sprint 186 (future). Development panel: 1 PR OPEN, isStale true.

## Case

In campaigns by platform products (Shopify/Etsy) and Boundless products, the only way to change an artwork is to remove it and add a new one. Removing an artwork also removes its layer from the mockups, which is correct behavior, so the merchant has to open each mockup and place the new artwork again.

Campaigns by Product Base don't have this problem: artwork is placed through print areas, and the print areas stay on the mockup when the artwork is removed, so a new artwork shows up on the mockup automatically.

## Solution

Add a `Replace artwork` action for each artwork in campaigns by platform products (Shopify/Etsy) and Boundless products. Campaigns by Product Base are not in scope.

When a merchant replaces an artwork:

- Only that artwork is replaced. Other artworks in the campaign don't change.
- The new artwork keeps the old artwork's order and connected variants.
- The new artwork replaces the old one in every mockup where the old one is placed. Mockups without the old artwork don't change.
- Same aspect ratio: keep the previous position and size.
- Different aspect ratio: use contain mode. The new artwork fits fully inside the old artwork's bounding box, centered, with no crop or distortion.

## Portal

In `STEP 1: ADD ARTWORK`, on each artwork row:

- Add an icon `la-exchange-alt` to the left of the remove (`X`) icon. Keep a clear gap between the two.
- Hovering shows the tooltip `Replace artwork`.
- Clicking it opens the same artwork list as `Select artwork`. Choosing an artwork replaces the current one right away.

## Acceptance Criteria

1. In campaigns by Shopify products, Etsy products and Boundless products, each artwork row in `STEP 1: ADD ARTWORK` shows the `la-exchange-alt` icon with the tooltip `Replace artwork`.
2. In campaigns by Product Base, the icon doesn't appear.
3. When the merchant opens the artwork list from the icon and closes it without choosing, nothing in the campaign changes.
4. When a campaign has several artworks and the merchant replaces one, the new artwork takes the old artwork's place in the order and keeps its connected variants. The other artworks and their connected variants don't change.
5. When the old artwork is placed in several mockups, all of them show the new artwork. A mockup without the old artwork doesn't change.
6. In a mockup with other layers, the new artwork takes the old artwork's stacking order, and the other layers don't move or resize.
7. When the old and new artworks have the same ratio but different resolutions (1000×1000 to 3000×3000), the new artwork has the same position and size on the mockup as the old one.
8. When the new artwork is wider than the old one (1:1 to 2:1), it matches the width of the old bounding box and is centered vertically, with no crop or distortion.
9. When the new artwork is taller than the old one (1:1 to 1:2), it matches the height of the old bounding box and is centered horizontally, with no crop or distortion.
10. In a published campaign, after the merchant updates the campaign to sync the change, the storefront shows the new artwork in both personalization and mockup previews.
11. Orders placed before the replacement keep their original design.
