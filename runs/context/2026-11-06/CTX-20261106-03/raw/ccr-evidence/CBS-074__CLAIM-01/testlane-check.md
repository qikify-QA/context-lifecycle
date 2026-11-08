# Đối chiếu Testlane cho CBS-074__CLAIM-01

Orchestrator đọc trực tiếp qua MCP testlane ngày 2026-11-06 (list_test_cases TIB-042, TIB-254). Nguyên trạng, chỉ bỏ thẻ HTML. Không phải nguồn do CCR khai thêm: chỉ để reviewer (không có MCP) đối chiếu quote của CCR.

## TC-TIB-965 (task TIB-042) status=passed
title: TC-TIB-004 — [Regression] Surface matrix unchanged after migration
steps: Preconditions: Both stores; new version deployed. Compare block availability per page against the pre-migration matrix (Checkout = CIP only; Thank You / Order Status = all 3).
expectedResult: Matrix identical to before migration. Any extension gaining or losing a surface is a defect.
actualResult: PASS — 2026-08-27, store linh-tib-checkout , profile profile 2 . Surface matrix after the migration matches the documented behaviour exactly: Extension Checkout Thank You Order Status Customization Image Preview ✅ rendered ✅ rendered ✅ rendered Edit Customization ❌ not offered ✅ rendered ✅ rendered (after block added to Items ) Digital Download ❌ not offered — ✅ rendered Checkout page confirmed to offer only Customization Image Preview: searching the checkout editor block picker for customization , digital and edit all returned No results under the teeinblue apps, and no teeinblue group appeared in that section's picker at all. No extension gained or lost a surface as a result of this migration.

## TC-TIB-978 (task TIB-042) status=passed
title: TC-TIB-017 — [Happy] Thank You: EC button, campaign by Shopify
steps: Preconditions: Campaign by Shopify; EC block on Thank You page; order placed. Open Thank You page. Click Edit Customization.
expectedResult: Redirects to customize.teeinblue.com/customize and the design is editable.
actualResult: PASS — 2026-08-27, Thank You page of order #Q8ZYNUUEZ , campaign by Shopify . The Customize link rendered on the line item with a well-formed URL: customize.teeinblue.com/customize?customization-id=bc46d761-020b-46a6-a4bb-dac563e1034e&product-id=9674192814320&shop=linh-tib-checkout.myshopify.com The design is editable, as required for campaign by Shopify. Opening the same params on the staging host ( staging-sdk.teeinblue.com/customize/ , per the staging convention) loaded a fully editable customizer: template select on Template 2 , text field pre-filled with TIB5215SHOPIFY , list selections Beagle and australian Kelpie preserved, with Preview and Update cart actions available. Clear contrast with campaign by Product base (TC-TIB-982), where the same flow instead shows Your design does not support edit for now, contact shop owner . The campaign-type branching behaves exactly as specified. Evidence: evidence/TIB-5215/exec/TIB-5215-exec-09-by-shopify-editable.png

## TC-TIB-981 (task TIB-042) status=passed
title: TC-TIB-020 — [Happy] Order Status: EC button, campaign by Shopify
steps: Open Order Status page for an order with a campaign-by-Shopify item. Click Edit Customization.
expectedResult: Same behaviour as Thank You page — redirect and edit both work.
actualResult: PASS — 2026-08-27, Order Status page of order #1086 , campaign by Shopify . After the Edit Customization block was added to the Items container of the Order Status page, the extension renders on the line item as Customization edit link (the documented default label, since Button label is empty), pointing to: customize.teeinblue.com/customize?customization-id=bc46d761-020b-46a6-a4bb-dac563e1034e&product-id=9674192814320&shop=linh-tib-checkout.myshopify.com Same customization-id and product-id as the Thank You page for this order, and the design opens editable on the staging host — behaviour matches Thank You page exactly, which is what this case requires. Customization Image Preview also renders alongside it as view . Digital Download is correctly absent: this campaign has no digital addon property. Evidence: evidence/TIB-5215/exec/TIB-5215-exec-07-orderstatus-all-three.png

## TC-TIB-982 (task TIB-042) status=passed
title: TC-TIB-021 — [Negative] Campaign by Product base → link shows → unsupported message
steps: Preconditions: Order containing a campaign-by-Product-base item; EC block added. Open Thank You page. Confirm the Edit Customization link is visible. Click it.
expectedResult: Link is shown (by design), redirects to the customize page, which displays Your design does not support edit for now, contact shop owner . A hidden link here is the defect, not the visible one.
actualResult: PASS — 2026-08-27, store linh-tib-checkout , order #K083L2E2L , campaign 2567 (by Product base). Retracting an earlier FAIL on this case. It was logged as a defect that the button navigates to the production host customize.teeinblue.com . That is accepted behaviour on staging — confirmed by the store owner. When testing on staging, QA swaps the host to staging-sdk.teeinblue.com/customize/ by hand; the button pointing at the production customize link is expected, not a bug. Both halves of the case pass: The Edit Customization link is shown on the campaign-by-Product-base line item — correct, since a hidden link would be the defect. Opening it on the staging host with the same params renders exactly the expected copy: Your design does not support edit for now, contact shop owner URL verified: https://staging-sdk.teeinblue.com/customize/?customization-id=827b9bef-de14-4ea0-8b80-8a5e1e0995f4&product-id=10222251737328&shop=linh-tib-checkout.myshopify.com Evidence: evidence/TIB-5215/exec/TIB-5215-exec-03-staging-customize-unsupported-msg.png Staging convention for anyone re-running this: take the link the extension emits, replace customize.teeinblue.com/customize with staging-sdk.teeinblue.com/customize/ , keep the query string as-is.
## TC-TIB-7191 (task TIB-254, TIB-5510) status=skipped
title: TC-TIB-016 — [Regression] Edit customization from cart → checkout OK
actualResult: Edit customization chỉ hiện ở Thank You page / Order status page và chỉ áp dụng cho campaign Shopify product (người dùng xác nhận 2026-10-29); campaign 3247 là product base nên không có luồng edit từ cart. Precondition của case không áp dụng. Quan sát trước đó: dòng parent trên /cart không có link/nút edit, không có property _customization_edit_link; mở URL ?customization-id=… rồi ATC chỉ tạo thêm bộ dòng mới (parent + addon theo customization mới), bộ dòng cũ giữ nguyên.

## TC-TIB-980 (task TIB-042) status=skipped
title: TC-TIB-019 — [Happy] Edit → save → artwork overwritten
actualResult: Out of scope for TIB-5215 — artwork overwrite is existing business behaviour, unaffected by the UI migration. Keep for full extension regression.

## Task TIB-042 notes (trích)
Open with PO/Dev (non-blocking): Classic vs New customer accounts — both in scope? Is Edit Customization gated by fulfillment status? (artwork is overwritten, so this is a real production risk) Backward compat for orders placed before deploy?
