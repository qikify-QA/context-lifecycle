# Jira check TIB-5566 (agent đọc 2026-11-07, chỉ đọc)

## Comment #55234 — phuongbb (QA), 2026-10-21 — câu hỏi
> Q9. On staging (TIB-5416 reverted), do Global Option photo layers still reset to the default position on every template switch, as in TIB-5220? — chọn: A) Yes · B) No — QA đề xuất: Yes - reset as in TIB-5220

## Comment #55235 — chinhdt (dev), 2026-10-21T14:52 — trả lời
Link: https://ownego.atlassian.net/browse/TIB-5566?focusedCommentId=55235
> Q9: B — on staging (TIB-5416 reverted) Global Option photo layers share one position across templates, and it stays as-is on a template switch; on a layer of another ratio it may look stretched, which is the existing bug TIB-5416 fixes.

## Comment #55231 — chinhdt (dev), 2026-10-21 — dev summary (ngữ cảnh)
> Global Option photo layers are not covered by this change. Per-layer positions for Global Options are handled in TIB-5416.
> Staging note: TIB-5416 has been temporarily reverted on staging (SDK build-staging) so this issue can be tested on its own.

Khớp từng chữ với CCR. Câu trả lời mô tả hành vi hiện tại là bug cũ, không phải expected; không ai nói TIB-5416 đã lên lại staging.
