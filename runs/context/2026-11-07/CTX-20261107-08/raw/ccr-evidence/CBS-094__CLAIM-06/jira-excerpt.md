Jira TIB-5561, comment #55645, chinhdt (dev), created 2026-10-26T15:32:35+07:00 (dev notes Context / Behaviour changes / Known limitation). Đối chiếu bằng orchestrator qua Jira MCP (chỉ đọc) 2026-11-07, chép nguyên văn, bỏ thẻ định dạng.

Why the GPT/Gemini Resolution dropdown starts on a "Default" option. Leaving it on "Default" means the image is generated exactly as it was before this change, so existing layers are not affected. "Default" is its own state, not another name for one of the listed sizes, because no listed choice gives the same result:
- GPT, Default: one of 3 fixed sizes, 1024×1024, 1536×1024 or 1024×1536, whichever is closest to the layer ratio. Picking 1K instead follows the exact layer ratio with a longest side of about 1024px, which is a different image size.
- Gemini nano_banana_31, Default: no size is sent and Gemini uses its own default. This is not the same as picking any value.
- Gemini nano_banana_pro, Default: stays at 2K, the same as before.
- Flux, Default: the width/height fields are left empty and the size comes from the layer ratio, as before.
