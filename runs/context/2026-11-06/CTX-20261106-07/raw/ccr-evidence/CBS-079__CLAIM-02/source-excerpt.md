Testlane task TIB-198, đọc qua MCP 2026-11-06:

TC-TIB-5719 passed: Message typed "Hello world" → paragraph 140; Message cleared → preview 66, 5 lines; payload layer-799667-data {lines:"", font_size:66} (not 140). Design blank, byte-identical to never-touched design; no enlarged text.
TC-TIB-5725 passed: Message = 5 spaces → value kept as spaces (payload font_size 140, lines "     "); preview and design show nothing, no fallback to default text, no enlarged text.
TC-TIB-5760 passed: Message typed → Paragraph mirrored; edited Paragraph directly → auto-fit to edited text; cleared Message → Paragraph value overwritten to "" → preview default text at 66 (29.4937px); payload font_size 66. No enlarged text. Design blank.
