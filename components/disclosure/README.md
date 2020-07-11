# Dropdown

## Aims
- Toggle should be a button.
- Toggle should have `aria-haspopup` attribute set to `true`.
- Should use keyboard model advocated under [ARIA Practices](https://www.w3.org/TR/wai-aria-practices/#menu)
-- Space or enter should toggle the menu
-- If button has focus, pressing down should open the menu, else moves focus within into the menu.
-- When menu is open, up and down controls move focus within the menu.
-- Menu can be closed by pressing `Escape`.
