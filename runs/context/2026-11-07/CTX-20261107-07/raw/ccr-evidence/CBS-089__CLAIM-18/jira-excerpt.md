Jira TIB-5554 description (spec PO, mục "Portal"). Đối chiếu bằng agent 2026-11-07, chép nguyên văn. Ngày viết description không xác định từ view đã đọc. Chỉ là căn cứ expected bổ trợ; claim xếp S1 vì kết quả test không ghi build.

- Toggle: `Auto-switch to a backup model during temporary outages`
- Default state: OFF
- Description under the toggle: `When your selected AI model is temporarily unreachable, keep generating with the nearest available model, then switch back to your model automatically once it recovers. Your saved model selection is never changed.`
- Activate scope: applies to the account's active AI service and model. While the toggle is off, generation fails as it does today when the model is unreachable.
