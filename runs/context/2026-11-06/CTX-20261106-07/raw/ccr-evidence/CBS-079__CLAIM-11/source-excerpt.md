Jira TIB-5465 comment #55232, chinhdt, 2026-10-21, đọc qua MCP 2026-11-06, trích nguyên văn:

"Some ImagenHub variables have no matching layer": shown when a variable has no matching layer
A Global Option layer counts as a match through the Global Option's own title.
The same matching rule applies to the existing per-field warnings in the ImagenHub template field and the Gen AI / Text to Image prompt fields.
On opening an artwork in the editor, every ImagenHub template used by the artwork's own layers is re-checked. This covers Photo/Clipart layers with an ImagenHub effect, and Text to Image or Multiple Uploads layers set to the ImagenHub provider.
