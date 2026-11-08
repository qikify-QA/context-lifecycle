Jira TIB-5554, comment #54687, chinhdt (dev), created 2026-10-15T17:43:04+07:00, trả lời câu hỏi QA ở #54670 (phuongbb, 2026-10-15). Đối chiếu bằng agent qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

ok Q2. Note: a run with `--user-id` does not stamp `migrated_at`, so it can be repeated. While `migrate_at` is set to today, the save rule and the default model apply to every account on staging, not only the ones in the run.
