Testlane TC-TIB-4853 actualResult, đọc qua MCP 2026-11-06:

Env: staging MCP, get-layer-schema-tool format full, 2026-10-08.
Observed: 8/9 types (warp-text, spiral-text, shape-text, clock, scrabble-crossword, scrabble-single-line, word-cloud, word-search): typography note default {family: "Roboto", variant: "regular"}, no size; example family Roboto, variant regular.
calendar: note default {family: "Heebo", variant: "regular"}, example Heebo/regular (no size).

Testlane TC-TIB-4858 expectedResult: warp-text Pacifico → Roboto, calendar Heebo → Roboto, curve-text variant 700 → regular; size values identical to baseline
Testlane TC-TIB-4858 actualResult: calendar: Heebo/regular unchanged vs prod (no size in both)
