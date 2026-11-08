Testlane TC-TIB-5705 actualResult, đọc qua MCP 2026-11-06 (run 2026-10-14):

Editor → "+ Layer" → VECTOR → Static Vector → dialog "Upload a vector". Upload pipelou-logo.svg → Dropzone message "Your file is uploaded, we are generating file preview, reload after few minutes". No error.
After Reload in the dialog, pipelou-logo appears in the vector list. Selecting it adds a layer named "pipelou-logo" of type static-vector, which renders in the editor canvas.
Save & Close → PUT /api/artworks/4957 200 (design_format left at "rgb" / PNG_RGB). Reopened the editor: the "pipelou-logo" layer is still in the layer list and the SVG is loaded on the canvas → persists.
