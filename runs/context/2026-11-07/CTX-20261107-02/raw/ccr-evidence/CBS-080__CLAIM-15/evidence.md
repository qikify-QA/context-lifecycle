# CBS-080__CLAIM-15

Bậc: S3

Đánh giá: S3 po_dev_confirm. CCR không ghi người xác nhận; agent đọc Jira tìm thấy QA plan do dev tinhpt viết, so khớp từng chữ, sửa cuối 2026-10-15. CCR gộp 4 hành vi, plan tách CLAIM-29..31.

Nguồn: Jira TIB-5507 comment #53879, tinhpt (dev), 2026-10-15
Link: https://ownego.atlassian.net/browse/TIB-5507?focusedCommentId=53879
Đối chiếu: agent đọc trực tiếp Jira 2026-11-07

Trích nguyên văn:

Using a valid user session token against the Hasura GraphQL endpoint, each mutation below must fail with a permission/validation error (e.g. field "url" not found in type ...), and the DB value must not change:

Ngữ cảnh cùng comment #53879 (agent đọc trực tiếp Jira 2026-11-07), danh sách mutation ngay sau câu trích:

update_images / insert_images setting url, master or thumbnail
update_layer_images / insert_layer_images setting url, master, thumbnail or deleted_at
update_mockups / insert_mockups setting url, master or thumbnail
update_campaign_mockups / insert_campaign_mockups setting master
update_campaigns setting featured_image_url, featured_image_thumbnail or deleted_at
insert_campaign_artwork_printareas setting deleted_at
update_instances setting watermark_url or watermark_thumbnail
update_mockup_printareas / insert_mockup_printareas setting url, masked_image or masked_background
update_campaign_mockup_printareas / insert_campaign_mockup_printareas setting url, masked_image or masked_background
update_order_item_artworks setting url

Reading these fields via GraphQL queries must still work.
