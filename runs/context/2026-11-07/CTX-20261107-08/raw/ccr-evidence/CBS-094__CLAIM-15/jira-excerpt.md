Jira TIB-5554, comment #54687, chinhdt (dev), 2026-10-15. Đối chiếu bằng orchestrator qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

Q7: Dev will simulate the provider errors on staging and add a backup mapping for QA's own user only (per-user override in `genai_model_fallbacks`). The failure counter is still shared by all accounts on that model. `model_not_found` is never counted: GPT returns it when the key has no access to the model, which a backup on the same key would not fix.
