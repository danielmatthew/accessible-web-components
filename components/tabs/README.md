# Tabs

https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel

## Requirements
### Keyboard
- Focus on active tab element
- Left arrow: previous
- Right arrow: next
- Space/Enter: activate
- Home: first
- End: last

#### Notes
- TODO: It is recommended that tabs activate automatically when they receive focus as long as their associated tab panels are displayed without noticeable latency.
- TODO: #18 If `aria-orientation=horizontal`, tablist does not listen for down/up to allow for normal browser scrolling

### Roles
- Container = `tablist`
- Each element has a role `tab` and contained within `tablist`
- Panel has role = `tabpanel`
- TODO: #19 tablist should be labelledby active tab
