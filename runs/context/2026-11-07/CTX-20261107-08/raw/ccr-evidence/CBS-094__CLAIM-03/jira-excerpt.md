Jira TIB-5573, comment #56094 (Q1, Q7) và #56104 (mục 1, trả lời QA #56103), chinhdt (dev), 2026-10-30. Đối chiếu bằng orchestrator qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

Q1: Outage only, for now. With "Auto-switch to a backup model" ON and 2.1 counted as down, generation runs on Nano Banana 2, the saved model stays 2.1 and fallback_model is recorded; with the toggle OFF there is no fallback and the error is shown. Retirement does not apply yet: 2.1 has no retirement entry. If Google retires it later, the TIB-5554 migration + email runs with the successor chosen then. My earlier "retired or unavailable" wording was too loose.

Q7: Yes, the seeder maps 2.1 → Nano Banana 2 (nano_banana_31). Dev will run it on staging for testing.

#56104: 1. Fallback test: no need to re-test here. The fallback logic is unchanged from TIB-5554 and already covered there. Nano Banana 2.1 only needs its backup set up in Admin > Settings (`genai_model_fallbacks`: 2.1 → Nano Banana 2).
