Testlane, task TIB-180, đọc bằng list_test_cases ngày 2026-11-06; các record không ghi build. Trích actualResult (đã bỏ thẻ HTML, tên store):
TC-TIB-5445 passed, staging 2026-10-13 ~09:52Z:
- Nhánh key teeinblue: DEV đổi key Shirtee/Printbelle sai trong .env staging. Chạy trên account onboarding, account này chưa connect fulfillment nào (dialog hiện "Connect API" thay vì "API Connected").
- Shirtee: GET /api/fulfillments/19/catalogs?page=1&per_page=20 → 400. Toast [Shirtee] Invalid Api key.
- Printbelle: GET /api/fulfillments/28/catalogs?... → 400. Toast [Printbelle] User does not exist or incorrect password.
TC-TIB-5441 passed, staging 2026-10-13 08:20Z: key Printful sai đặt trong DB (user_fulfillments), catalog 400, toast [Printful] The access token provided is invalid.
TC-TIB-5449 passed, expectedResult ghi: CustomCat key owner (merchant vs teeinblue) unclear — PO/DEV confirm.
