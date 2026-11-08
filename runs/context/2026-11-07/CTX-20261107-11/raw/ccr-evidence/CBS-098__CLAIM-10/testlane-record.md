# Testlane — list_test_cases (chỉ đọc), 2026-11-07

## Task TIB-223 (QA-3415, TIB-5566)
Lưu ý: field `status` của MỌI test case trong task này là "passed", kể cả TC-06 (actualResult ❌), TC-30 (❌), TC-28/TC-29 (⏸️) và TC-14..TC-25, TC-27, TC-34 (actualResult null, chưa chạy). Field status không phản ánh kết quả; kết quả thật đọc ở actualResult.
- TC-TIB-6339 TC-01 actualResult: "[AI] ✅ AI — T2s keeps T1's reposition, no ratio warning (current SDK 2026-10-21 05:56)"
- TC-TIB-6340 TC-02: "[AI] ✅ AI — T2 (2000²) giữ position tương đối của T1, ảnh không méo, không warning"
- TC-TIB-6341 TC-03: "[AI] ✅ AI — T3 (2:1 Cover) reset default + warning"; expected ghi warning dạng cắt ngắn "Your photo doesn't match this design's aspect ratio…"
- TC-TIB-6342 TC-04: "[AI] ✅ AI — T3c (2:1 Contain) reset default Contain + warning"
- TC-TIB-6343 TC-05: "[AI] ✅ AI — 4.9% (T4 1000×1049): giữ position, không warning"
- TC-TIB-6344 TC-06: expected "Position kept ... no warning"; actualResult "[AI] ❌ AI — đúng 5% (T5 1000×1050): reset default + HIỆN warning (2/2 context)"
- TC-TIB-6345 TC-07: "[AI] ✅ AI — 5.1% (T6 1000×1051): reset default + warning"
- TC-TIB-6346 TC-08: "[AI] ✅ AI — T7 (1052×1000, 4.94% theo đích / 5.2% theo nguồn): giữ position, không warning"
- TC-TIB-6347 TC-09: "[AI] ✅ AI — trong ngưỡng ảnh méo 4.67% ≤ 5%, không skew/xoay, không bị crop thêm"
- TC-TIB-6348 TC-10: "[AI] ✅ AI — round-trip: T2s giữ vị trí riêng"
- TC-TIB-6349 TC-11: "[AI] ✅ AI — chỉ ghé T2s (không chỉnh) cũng cố định vị trí"
- TC-TIB-6350 TC-12: "[AI] ✅ AI — T1 → T3 → T2: T2 ở default, không lấy position T1"
- TC-TIB-6351 TC-13: "[AI] ✅ AI — ảnh mới ở T1 → T2s nhận ảnh mới + position mới của T1"
- TC-TIB-6352..6362 TC-14..TC-24: actualResult null (chưa chạy)
- TC-TIB-6364 TC-26: "[AI] ✅ AI — switch nhanh T2s↔T1 ×3 không chờ: T2s cuối giữ position T1"
- TC-TIB-6366 TC-28: actualResult "[AI] ⏸️ AI — portal not reachable" (CCR trích file kết quả ghi desktop popup + mobile ✅; record Testlane chỉ có ⏸️)
- TC-TIB-6368 TC-30: "[AI] ❌ AI — position sửa tay không bị clamp/bỏ qua; "abc" gây lỗi console; thumbnail cart mất ảnh / lệch (2/2 con…"
- TC-TIB-6369 TC-31 ✅, TC-TIB-6370 TC-32 ✅, TC-TIB-6371 TC-33 ✅ (order design dùng order cũ)
- TC-TIB-6373 TC-35: "[AI] ✅ AI — after reload + reselecting T2s: same photo, same position, no warning"
- TC-TIB-6374 TC-36: "[AI] ✅ AI — xoá ảnh ở T1 → T2s rỗng, không warning; ảnh mới ở T2s bắt đầu ở default"
- TC-TIB-6375 TC-37: "[AI] ✅ AI — T14: layer 1:1 giữ position T1, layer 2:1 reset + warning chỉ ở layer đó"

## Task TIB-166 (QA-3394, TIB-5501)
- TC-TIB-4832 TC-26: "[AI] ✅ AI — đổi màu 5 lần trong 3,5s: mọi lần 5/5 layer inline, 0 ref treo, 0 id trùng, màu cuối đúng, không vùng t…"
- TC-TIB-4824 TC-18: "[AI] ✅ AI — chưa áp màu: cả 5 vector render qua ` `, không inline, không id nào bị prefix"
- TC-TIB-4822 TC-16 (url('#id') / marker-*): status passed, actualResult rỗng (chưa có kết quả)
- TC-TIB-4811 TC-05: status failed, bugId BUG-255, actualResult rỗng
- TC-TIB-4807 TC-01 / TC-TIB-4809 TC-03: TC-03 actualResult "⏸️ AI — cần 2 Color option riêng"
