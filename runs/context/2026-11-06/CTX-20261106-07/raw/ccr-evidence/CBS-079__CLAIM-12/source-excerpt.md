Jira TIB-5516 comment #53942, chauptm, 2026-10-09, đọc qua MCP 2026-11-06, trích nguyên văn (bỏ thẻ định dạng):

The pre-rendered file from the A1/A2 variant (photo-borders/{artwork_id}/{layer}-{hash}.png, generated through POST photo-border-masks) is removed. The SDK now draws the custom_shape border from the mask on a canvas, with no request to the server. This is option A4 in the description.
Why the file was dropped: the API rendered it without the layer's ratio, so it always used the default 0.1 and ignored the border size.
Fallback: if the mask cannot be read (e.g. it is served without CORS), the layer falls back to the /image_effect request as before.
