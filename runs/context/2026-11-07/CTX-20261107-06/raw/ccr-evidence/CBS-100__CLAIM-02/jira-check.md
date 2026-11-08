# Jira check TIB-5561 (agent đọc 2026-11-07, chỉ đọc)

## Comment #55645 — chinhdt (dev), 2026-10-26T15:32 — dev summary
Link: https://ownego.atlassian.net/browse/TIB-5561?focusedCommentId=55645
Trích nguyên văn (mục Behaviour changes › Flux 4-megapixel limit on save):
> Flux 4-megapixel limit on save: when width × height exceeds 4,000,000 px, saving is rejected with "Flux dimension (width * height) must be less than 4.000.000 px (4 Megapixel)". This applies to:
> - Text-to-image and Multiple uploads layers whose provider is Flux, when saving the artwork.
> - Any global option, including a Single upload global option with a Flux Gen AI effect, which was not checked before.
> - Exactly 4,000,000 px (for example 2000×2000) is allowed.
> - Values left in the hidden Flux fields after switching the provider to GPT or Gemini do not block saving.

Trích nguyên văn (mục Known limitation):
> - The portal does not check the 4 MP limit before saving. The error comes from the server after Save is clicked.
> - When a global option fails to save, two toasts appear: the specific error and a generic "Failed to save global option." This happens for every save error on that page, not only this one.
> - Global options already saved with a Flux size over 4 MP will show this error on their next save until the size is reduced.

## Comment #55697 — chinhdt (dev), 2026-10-27T10:00 — "Dev answers (PO to confirm Q4, Q5, Q6)", trả lời câu hỏi QA #55693
Link: https://ownego.atlassian.net/browse/TIB-5561?focusedCommentId=55697
> Q4: The boundary is ≤ (2000×2000 passes). "must be less than" is the existing Single upload message, reused unchanged. Agree with "must not exceed 4.000.000 px (4 Megapixel)". This also changes the Single upload message. PO to confirm.
> Q7: Partly.
> - The 4 MP limit is checked on every save path: portal/REST and MCP, for both artworks and global options.

## Comment #55728 — phuongbb (QA), 2026-10-27 — hỏi PO Q4/Q5/Q6
Không có comment trả lời của PO sau đó (tổng 5 comment, comment cuối là #55728). => Text message cuối (Q4) CHƯA được PO chốt.

## Ghi chú
- Không thấy QA-3435 TC-16/TC-17 kèm build trong CCR; không dùng test_case làm nguồn S3.
- Không có comment id riêng cho dev summary trong CCR; agent xác định là #55645.
