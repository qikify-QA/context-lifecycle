# Jira TIB-5566 — trích đọc qua MCP Atlassian (chỉ đọc), 2026-11-07

## Comment 55231 — chinhdt (dev), 2026-10-21T14:04:57+0700 — dev summary
Behaviour changes
- Destination layer has the same aspect ratio as the source layer (within 5%): the photo keeps the buyer's position. If the two layers differ in pixel size, the position and size scale with the layer.
- Destination layer has a different aspect ratio: the photo still resets to its default position (fill/fit per the layer's fit mode), and the ratio warning message still shows. The 5% threshold is the same one the warning uses, so a kept position never shows the warning and a reset one always does.
- Destination layer already holds this same photo with a position of its own (the buyer visited that template before): that position is kept as-is. It is not replaced by the position from the template the buyer just left.
- Applies to "Upload Photo" layers with Photo reposition and to "Multiple Uploads" layers with reposition. Crop and direct-upload layers are unchanged.
Known limitations
- A position only carries from the template the buyer just left. Example: the buyer adjusts in template A, switches to B (different ratio, so it resets), then to C (same ratio as A). C gets the default position, not A's. This is by design: the position is never copied to a layer of a different shape.
- When the buyer goes back to a template they already visited, it keeps the position it had and does not pick up a newer adjustment made elsewhere. This is deliberate, so an adjustment the buyer made in that template is never overwritten.
- Global Option photo layers are not covered by this change. Per-layer positions for Global Options are handled in TIB-5416.
Staging note: TIB-5416 has been temporarily reverted on staging (SDK build-staging) so this issue can be tested on its own.

## Comment 55234 — phuongbb (QA), 2026-10-21T14:40:57+0700 — câu hỏi
(Trích các câu liên quan; quy ước trả lời ghi trong comment: "Qn: <câu trả lời> · ok Qn (đồng ý đề xuất) · Qn A (chọn phương án)")
- Q4. If the buyer uploads a new (different) photo in A after B already holds a position for the old photo, does B take A's position (same ratio) or the default position? — chọn: A) B takes A's position · B) B uses the default position — QA đề xuất: B takes A's position, because the 'same photo keeps its own position' rule no longer applies
- Q5. Do the cart preview, 'Edit design' from the cart and the order design / final print file use the kept position? — chọn: A) Yes · B) No — QA đề xuất: Yes - the kept position is saved in the customization data sent with Add to cart

## Comment 55235 — chinhdt (dev), 2026-10-21T14:52:58+0700 — trả lời
Q1: ok — abs(sourceRatio - destRatio) / destRatio <= 0.05, destination layer as base, same function as the ratio warning; exactly 5% counts as the same ratio (keep, no warning).
Q2: the position is stored as relative 0–1 values of the layer box, so it scales uniformly with the destination layer. Within the 5% tolerance the photo may stretch by up to 5%.
Q3: a Multiple Uploads reposition layer holds one combined image with one position — there are no per-slot positions, so slot count does not matter.
ok Q4
ok Q5
Q6: A — same sync path. The sync runs whenever the selected template changes, whether the buyer picks it directly or a Size/option change maps to another template or artwork. Confirmed by reading the code, please cover it in testing.
Q7: B — a visit counts: once B has shown this photo (carried or default position), it keeps that position; in the example B shows left. (c) does not apply: the sync only writes into the currently selected template, so a template the buyer never visited holds no photo or position, and a populate target (TIB-5302) is skipped by the sync and follows the populate rules instead.
Q8: neither — the photo does not sync between different field types at all (Upload Photo reposition / Photo Cropper / Multiple Uploads), unchanged by this issue.
