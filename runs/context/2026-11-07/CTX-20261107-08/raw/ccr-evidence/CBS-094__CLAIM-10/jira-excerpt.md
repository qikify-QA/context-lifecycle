Jira TIB-5561, comment #55697 (dev, 2026-10-27, mở đầu 'Dev answers (PO to confirm Q4, Q5, Q6)') và #55645 Known limitation (dev, 2026-10-26). PO chưa trả lời: comment cuối (#55728, phuongbb, 2026-10-27) là QA hỏi PO trangdh Q4/Q5/Q6. Đối chiếu bằng orchestrator qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

Q6: Only affects layers that saved a resolution on pro and then switched to 31. The value is visible in the dropdown. PO to confirm it is accepted, and that Text-to-image is beta-only.

(#55645 Known limitation) A Text-to-image layer that still holds a Gemini resolution chosen while the account was on nano_banana_pro will now use that resolution when the account is on nano_banana_31. Before this change it was ignored.
