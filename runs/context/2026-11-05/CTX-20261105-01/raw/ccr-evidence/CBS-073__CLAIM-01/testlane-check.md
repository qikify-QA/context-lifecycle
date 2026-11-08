# Đối chiếu Testlane (orchestrator, read-only, 2026-11-05, list_test_cases task TIB-217)

TC-TIB-6199 tồn tại, status passed, title "[Regression] Edit global option in Portal → all artworks updated".

expectedResult (Note): "campaign sync is required for storefront to pick up a global option edit (confirmed by user 2026-10-21)."
actualResult, dòng campaign 3069: "storefront kept old data (≥26 min) until campaign sync (05:35 UTC); after sync shows "Show pet name?" / "Yes please"."
actualResult, dòng campaign 3072: "storefront showed new label/option right after the edit (no sync)."
actualResult, kết: "Sync needed for storefront to reflect a global option edit = expected (confirmed by user). 3072 updating without sync is likely because its campaign JSON had no cache yet (not verified)."

Task TIB-217 chứa toàn bộ test case của TIB-5591 (tiêu đề case nêu [TIB-5591] trong data), nên ticket là ngữ cảnh chạy regression, không phải ticket của riêng hành vi sync.
