# Tabs

## Demo
https://v505e.csb.app/

## Usage

```js
import { AwcTabs, AwcTab, AwcPanel } from '@accessible-web-components/tabs';

window.customElements.define('awc-tabs', AwcTabs);
window.customElements.define('awc-tab', AwcTab);
window.customElements.define('awc-panel', AwcPanel);
```

```html
<awc-tabs>
  <awc-tab role="heading" slot="tab">Tab 1</awc-tab>
  <awc-panel role="region" slot="panel">
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

## Requirements

As defined at https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel

### Keyboard
- Focus on active tab element
- Left arrow: previous
- Right arrow: next
- Space/Enter: activate
- Home: first
- End: last

#### Notes
- TODO: #18 If `aria-orientation=horizontal`, tablist does not listen for down/up to allow for normal browser scrolling

### Roles
- Container = `tablist`
- Each element has a role `tab` and contained within `tablist`
- Panel has role = `tabpanel`
- TODO: #19 tablist should be `labelledby` active tab
