---
name: ctx-evidence
description: Thu evidence cho một run QA context — explore portal/storefront/API/DB/code, ingest tài liệu dev, hoặc phân rã scope. Dùng từ ctx-run ở làn bootstrap. Gate C1/C2 (và C1-DOC/C2-DOC).
---

# ctx-evidence

Mỗi surface là một reference; spawn một subagent native cho mỗi việc, brief nó đọc đúng reference đó, playbook của product và `contracts/qa-context-contract.md` § liên quan. Explorer độc lập chạy song song được. Luật mỗi surface (mutation policy, account guard, ID `ACT/SCN/OBS/DSEC/CLAIM`, "không làm") nằm trong reference, không chép lại ở đây.

| Việc | Reference | Gate |
|---|---|---|
| Phân rã object/feature/discovery unit (BROAD, DOC) | `references/scope-planner.md` | — |
| Portal: feature theo user goal, SCN/ACT, UI trước/sau, network thô | `references/portal.md` | C1 |
| Storefront: option, preview, pricing, add-to-cart | `references/storefront.md` | C1 |
| API: gắn nhãn network, map ACT-ID, request/response shape | `references/api.md` | C2 |
| DB: data model, state trước/sau mỗi ACT được chọn (read-only) | `references/db.md` | C2 |
| Code/config: trả lời MỘT câu hỏi cụ thể, có file:line + revision | `references/code.md` | C2 |
| Tài liệu: claim trích dẫn được từ MỘT doc đã đóng băng | `references/doc-ingest.md` | C1-DOC, C2-DOC |

Quy tắc chung: chỉ ghi trong thư mục run; redaction (§6) trước khi ghi; explore chỉ dispatch surface có trong `modes.allowed_explorers` và `explore.surfaces` của product; mode doc không sinh `ACT/SCN/OBS` và `raw/` phải rỗng. Sau mỗi subagent: `validate-run.mjs --stage doc` (mode doc) hoặc kiểm gate trong `contracts/gates.md`; FAIL → retry đúng phần thiếu.
