# Object: Open API (product: teeinblue) — Feature Profile Summary
**Published context version:** 1

- **Object:** API cho merchant dưới `/openapi/v1`, gọi bằng token. Phạm vi hiện có: xác thực token, tra cứu layer image và clipart, upload asset. Các nhóm route khác chưa có danh sách route đầy đủ và chưa có quan sát (đã biết `GET /openapi/v1/customizations/{uuid}` từ `_flows/storefront-sdk.md`, chưa gọi), xem OQ-open-api-013.
- **Quan sát:** staging, role `merchant-owner`, một account, một token, chỉ tầng API. Chưa có quan sát trên production hay tầng UI.
- **Không có knowledge nào là expected:** 42 KB item (39 `OBSERVED_CURRENT`, 3 `INFERRED`), 0 `CONFIRMED_EXPECTED`, 45 check (28 `BASELINE`, 17 `NONE`). Đa số hành vi chỉ có một sample. Hành vi hiện tại không phải expected requirement.
- **Giới hạn về account:** `GET /api/user` trả 401 với token Open API, nên account chỉ xác minh gián tiếp qua đường dẫn lưu trữ của asset. Store không xác minh được qua Open API. Xem OQ-open-api-008.
- **Open question:** 47 mục ở `open-questions.md`.

---

## `open-api-asset-upload` — Upload và tra cứu asset qua Open API

**Entry points:** `GET /openapi/v1/layer-images`, `/layer-image-categories`, `/clipart-categories`, `/cliparts`; `POST /openapi/v1/uploads`; `POST` và `DELETE` trên `/openapi/v1/layer-images`. Token trong biến `TIB_FULL_ACCESS_TOKEN`.

**Đã quan sát:**
1. Xác thực: có token thì route đọc trả 200; không token thì 401 hoặc 302 tới `/api/login` tuỳ header Accept.
2. Tra cứu: list layer image và clipart, phân trang cursor, đổi sang dạng page khi có search; `search` trên `cliparts` trả 422.
3. Upload: `POST /uploads`, PUT file lên `upload_url`, rồi finalize bằng `POST /layer-images` với `upload_id`. Finalize trước khi PUT trả 422.
4. Trùng tên: `on_duplicate=skip` trả lại asset đã có. Xoá: `DELETE` asset do chính token tạo trả 204.
5. Quota: header `x-ratelimit-limit` và `x-ratelimit-remaining` trên staging. Chưa có quan sát khi vượt ngưỡng.

**Không dùng làm oracle:** KB-027, KB-033, KB-034 (`INFERRED`/`LOW`), vì host `oe-cdn.sgp1.digitaloceanspaces.com` và `cdn.ownego.com` chưa được xác nhận, xem OQ-open-api-001 và OQ-open-api-002.
**Conflict:** KB-007 `UNRESOLVED` trong CONF-open-api-001, khác artwork KB-057 về spec và token Open API, xem OQ-open-api-003.
**Chưa quan sát:** cô lập tenant, ability của token, nhánh `file` và `url` của finalize, vòng đời `upload_id` sau `expires_at`, việc dọn object tạm dưới `temporary-files/` (OQ-open-api-004, OQ-open-api-047).
**Checklist:** 45 check, 28 `BASELINE`, 17 `NONE`. Năm check cần layer image tạo qua bước PUT giữ `NONE` tới khi host được xác nhận (OQ-open-api-001). **KB:** KB-001 đến KB-042.
