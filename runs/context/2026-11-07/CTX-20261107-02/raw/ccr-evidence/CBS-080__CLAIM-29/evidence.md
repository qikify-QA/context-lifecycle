# CBS-080__CLAIM-29

Bậc: S3

Đánh giá: Tách từ CLAIM-15. S3 po_dev_confirm. CCR không ghi người xác nhận; agent đọc Jira tìm thấy QA plan do dev tinhpt viết, so khớp từng chữ, sửa cuối 2026-10-15.

Nguồn: Jira TIB-5507 comment #53879, tinhpt (dev), 2026-10-15
Link: https://ownego.atlassian.net/browse/TIB-5507?focusedCommentId=53879
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

Direct Hasura deletes are rejected: with a valid user session, each of these mutations must fail (e.g. field "delete_images" not found in type: 'mutation_root') and the row must still exist:
delete_images, delete_layer_images, delete_layer_image_categories, delete_mockup_layer_categories, delete_cliparts, delete_campaign_artwork_printareas, delete_campaign_mockup_printareas, delete_printareas, delete_blueprints, delete_variants, delete_mockup_printareas, delete_variant_printareas (and their _by_pk variants).
