Testlane TC-TIB-5710, đọc qua MCP 2026-11-06 (run 2026-10-14):

expectedResult note: SVG needs a design format change, confirmed by user. The value "SVG" was picked by name. A vector format can't be saved while raster layers exist (API 400).
actualResult: Design format "SVG" → PUT 200; after reload the format is SVG and the layer persists. Order: status Ready, error_message null, design is an .svg file (HTTP 200, image/svg+xml).
Reference: before the raster layers were removed, saving design format SVG returned HTTP 400 "…set to vector format but contains raster layers". Earlier SVG orders with the default PNG_RGB format → "Line item cannot generate design".
