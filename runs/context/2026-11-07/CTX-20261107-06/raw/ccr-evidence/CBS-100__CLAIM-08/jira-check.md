# Jira check TIB-5470 description (agent đọc 2026-11-07, chỉ đọc)

Ticket: https://ownego.atlassian.net/browse/TIB-5470 "Let users run image effects in the app" (status Done). Description do huyen.chu (PO) sửa; mọi lần sửa description trong changelog đều của huyen.chu.

## Bullet Global Option — mục Portal › Run effects
Changelog: bullet "When a layer uses an existing Global Option" và "Image effects (N)" xuất hiện lần đầu ở lần sửa description 2026-10-19T15:13 (huyen.chu).
> - When a layer uses an existing **Global Option**:
>   - Show `Run effects` next to `Image effects (N)` in the Global Option summary. N is the number of effects.
>   - Below, list the effects in the order defined in the Global Option: `[Effect name] · [Effect settings]`

Ngữ cảnh chung (mục Behavior, có từ trước):
> - Use the layer's current image as the input.
> - When processing succeeds, replace the current image with the generated result.
Spec không nói Global Option có bị đổi hay không khi chạy.

Mục Run effects chung:
> - Disabled (grayed out) when no effect is configured yet
> - Tooltip: "Applies all effects to the current image and replaces it.
Spec không nói tooltip cho Global Option 0 effect.

## Mục Update: Prompt variables › Saved values
Changelog: câu "per layer" xuất hiện lần đầu ở lần sửa description 2026-10-26T12:26 (huyen.chu).
> - Save the last-entered values separately for each layer. Values stay after each run.
> - For Global Options, values are stored per layer, not on the Global Option.
Ngữ cảnh: "If any effect prompt contains variables, `Run effects` opens a `Fill in variables` popover, for both normal and global options."
