# Context Change Request: artwork-populate-initialofword-astral — ký tự astral làm vỡ glyph ở họ token initialofword (CCR 2/2 của QA-3364)

- **Product:** `teeinblue`
- **Object:** `artwork`
- **Ticket:** `TIB-5331 (QA-3364)`
- **Các khối có trong file:** `A`

## Mức độ gấp

`LOW` — dọn canon: hành vi có sẵn từ trước, không phải thay đổi của TIB-5331, chưa ai verify độc lập và không chặn test. Proposal gốc (CBS-053) không chọn mức gấp (để mẫu trống), mức này do người soạn lại đề xuất.

Liên hệ: đây là CCR 2/2 của một cặp với CCR token `{{value.initialofword.X}}` (Proposal CBS-052, có task TIB-104); file này chỉ chứa phần astral, không gộp claim của CBS-052.

# Khối A — Hành vi

### CLAIM-01

- **Statement:** Ký tự astral (ngoài Basic Multilingual Plane: emoji, chữ toán học dạng mathematical alphanumeric) ở đầu từ làm `{{value.initialofword.X}}` trả nửa surrogate pair (`word[0]`) nên hiển thị glyph vỡ; dev tự thử `😀 Sophie` tại `.1` trả một `\ud83d` đơn lẻ.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập); portal (artwork editor Live Preview và artwork render, mọi token initialofword); storefront, mockup: chưa rõ, dev không đề cập
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), mô tả sau 1 lần tự thử, không phải sign-off PO, 2026-09-09
- **Locator:** Jira TIB-5331 comment giangnth 2026-09-09 'Change & test cases', mục Notes 'Inherited limitation, not a regression: astral characters' | https://ownego.atlassian.net/browse/TIB-5331?focusedCommentId=50379 | Ghi chú: QA chưa tự gõ ký tự astral lần nào, không có TC; không coi 'inherited, not a regression' là kết luận cuối rằng đây không phải bug cần sửa (nhận định kỹ thuật của 1 dev, chưa qua PO). Dev không nói `firstword`/`lastword` bị cùng lỗi, không suy ra. Quyết định local 'Emoji: KHÔNG cần test' (QA chốt 2026-08-20, decisions.md; bối cảnh là TIB-5312: bộ lọc ký tự theo font của SDK cắt emoji trước khi encode, một cơ chế khác) chỉ là phạm vi test của QA, không phải hành vi sản phẩm nên không thành claim; chưa ai đối chiếu hai cơ chế có cùng lớp rủi ro không. OPEN QUESTION cho QA/PO: emoji trong tên có phải kịch bản thật không, nếu có thì mở ticket riêng như dev gợi ý. Build hash: không rõ; môi trường quan sát: không rõ (dev không ghi staging hay production). Canon: KB-078, CHK-007 liệt kê các template initialofword nhưng không nói gì về ký tự astral. (CCR cũ: CBS-053 CLAIM-01)
- **OQ:** OPEN_ISSUE — Emoji trong tên có phải kịch bản thật không, và nếu có thì có mở ticket riêng cho lỗi astral của `initialofword.X` như dev gợi ý không? 'Inherited limitation, not a regression' mới là nhận định của 1 dev, chưa qua PO. — Người trả lời: PO. 
- **Trích nguyên văn:**
  ```
  Dev giangnth (comment 2026-09-09 'Change & test cases', mục Notes — mô tả, không phải sign-off PO): - **Inherited limitation, not a regression: astral characters.** Taking the initial with `word[0]` returns half a surrogate pair for characters outside the Basic Multilingual Plane — an emoji or a mathematical letter renders as a broken glyph. Verified: `😀 Sophie` at `.1` returns a lone `\ud83d`. The existing `{{value.initialofword}}` has exactly the same flaw (`😀 Sophie` gives `\ud83dS`), so this is shared, pre-existing behaviour rather than something this branch adds. Accented Latin and Vietnamese characters are unaffected (`É`, `Đ` work). Worth a separate ticket if emoji in names is a real scenario.
  ```

### CLAIM-02

- **Statement:** Cùng lỗi astral đã có sẵn ở `{{value.initialofword}}` (bare): `😀 Sophie` ra `\ud83dS`, nên là hành vi dùng chung có từ trước, không phải regression do nhánh TIB-5331.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập); portal (artwork editor Live Preview và artwork render)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), mô tả; QA chỉ dẫn lại (BR-9 trong 01-analysis.md, không tự verify), 2026-09-09
- **Locator:** Jira TIB-5331 comment giangnth 2026-09-09 (Notes); outputs/QA-3364/01-analysis.md BR-9 | https://ownego.atlassian.net/browse/TIB-5331?focusedCommentId=50379 | Ghi chú: QA chưa tự đối chiếu bare token trước/sau; BR-9 chỉ dẫn lại lời dev ('Confirmed / N/A per scope') và dẫn chiếu 'standing QA rule', không tự verify cơ chế. (CCR cũ: CBS-053 CLAIM-02)
- **OQ:** NEEDS_CONFIRMATION — Lỗi astral có sẵn ở `{{value.initialofword}}` (bare) từ trước, không phải regression do nhánh TIB-5331, có đúng không? Claim không có nguồn, chưa ai đối chiếu bare token trước/sau. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  Dev giangnth (comment 2026-09-09 'Change & test cases', mục Notes — mô tả, không phải sign-off PO): The existing `{{value.initialofword}}` has exactly the same flaw (`😀 Sophie` gives `\ud83dS`), so this is shared, pre-existing behaviour rather than something this branch adds.
  outputs/QA-3364/01-analysis.md: - BR-9: Astral-character truncation is a shared pre-existing flaw, not new; out of scope to fix or test as a "new" bug (and emoji are excluded from testing entirely per standing QA rule). [Confirmed / N/A per scope]
  ```

### CLAIM-03

- **Statement:** Chữ Latin có dấu và tiếng Việt (`É`, `Đ`) không bị ảnh hưởng bởi lỗi astral, vẫn lấy đúng chữ đầu.
- **Object / feature:** artwork/populate-values
- **Quan hệ với canon:** `ADD`
- **Scope:** buyer (giá trị nhập); portal (artwork editor Live Preview và artwork render)
- **Đã ship:** `SHIPPED`
- **Loại nguồn:** `KHÔNG CÓ NGUỒN`
- **Người xác nhận, ngày nguồn:** Dev (giangnth), mô tả, 2026-09-09
- **Locator:** Jira TIB-5331 comment giangnth 2026-09-09 (Notes); outputs/QA-3364/01-analysis.md | https://ownego.atlassian.net/browse/TIB-5331?focusedCommentId=50379 | Ghi chú: chỉ là lời dev; QA-3364 không có TC nào kiểm chữ có dấu/tiếng Việt cho token này; không coi là đã verify độc lập. (CCR cũ: CBS-053 CLAIM-03)
- **OQ:** NEEDS_CONFIRMATION — Chữ Latin có dấu và tiếng Việt (`É`, `Đ`) không bị ảnh hưởng bởi lỗi astral có đúng không? Chỉ là lời dev, chưa có TC kiểm độc lập. — Người trả lời: Dev. 
- **Trích nguyên văn:**
  ```
  Dev giangnth (comment 2026-09-09 'Change & test cases', mục Notes — mô tả, không phải sign-off PO): Accented Latin and Vietnamese characters are unaffected (`É`, `Đ` work).
  outputs/QA-3364/01-analysis.md: - **Inherited, pre-existing, NOT a regression:** astral characters (e.g. emoji, math letters) at a word's initial position render as a broken half-surrogate glyph — identical flaw already present in `{{value.initialofword}}`. Accented Latin/Vietnamese (É, Đ) are unaffected and work correctly.
  ```
