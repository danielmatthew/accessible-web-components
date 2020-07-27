# Tabs

[![Published on npm](https://img.shields.io/npm/v/@accessible-web-components/tabs.svg)](https://www.npmjs.com/package/@accessible-web-components/tabs)

Custom Elements to represent a [tablist](https://www.w3.org/TR/wai-aria/#tablist), [tab](https://www.w3.org/TR/wai-aria/#tab), and [tabpanel](https://www.w3.org/TR/wai-aria/#tabpanel).

## Demo
https://v505e.csb.app/

## Operation

By default, the `tablist` has `aria-orientation="horizontal"` applied.

- `tablist` and the visible `tabpanel` are labelled by the active tab
- Focus is applied on active tab element (`tabindex="-1"`)
- Left: move to previous tab
- Right: move to next tab
- Space/Enter: activate
- Home: first
- End: last

When `aria-orientation="vertical"` is set, the following keyboard controls are also supported:

- Up: move to previous tab
- Down: move to next tab

## Browser Support

Tested in:

- macOS 10.15.2, Safari 13.0.4, VoiceOver
- Win 10, Firefox 78.0.2, NVDA
- Win 10, Chrome 84.0.4147.89, NVDA
- Win 10, Chrome 84.0.4147.89, JAWS 2020.2006.12
- Win 10, Edge 18.17763, JAWS 2020.2006.12

### Firefox
Firefox maps `tablist` to `pagetablist`, `tab` to `pagetab`, `tabpanel` to `propertypage`

## Usage

You'll want to use a polyfill to help older browsers figure out what to do, and with the source being supplied as an ES Module, there's no IE 11 support.

### JavaScript

```js
// app.js
import { AwcTabs, AwcTab, AwcPanel } from '@accessible-web-components/tabs';

window.customElements.define('awc-tabs', AwcTabs);
window.customElements.define('awc-tab', AwcTab);
window.customElements.define('awc-panel', AwcPanel);
```

### HTML

```html
<awc-tabs>
  <awc-tab role="heading" slot="tab" id="my-first-tab" >Tab 1</awc-tab>
  <awc-panel role="region" slot="panel" id="my-first-panel">
    <h2>My first tab</h2>
    <p>Here is some text…</p>
    <ul>
      <li>…and a list</p>
    </ul>

    <button type="button">I am a focusable element within the tab</button>
  </awc-panel>

  <awc-tab role="heading" slot="tab">Tab 2</awc-tab>
  <awc-panel role="region" slot="panel">Content 2</awc-panel>

  <awc-tab role="heading" slot="tab">Tab 3</awc-tab>
  <awc-panel role="region" slot="panel">Content 3</awc-panel>
</awc-tabs>
```
