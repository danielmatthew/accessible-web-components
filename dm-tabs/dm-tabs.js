const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35,
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-wrap: wrap;
    }

    ::slotted(dm-tab-panel) {
      flex-basis: 100%;
    }
  </style>
  <slot name="tab"></slot>
  <slot name="panel"></slot>
`;

class DMTabs extends HTMLElement {
  constructor() {
    super();

    this._onSlotChange = this._onSlotChange.bind(this);

    this.attachShadow({
      mode: 'open',
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');

    this._tabSlot.addEventListener('slotchange', this._onSlotChange);
    this._panelSlot.addEventListener('slotchange', this._onSlotChange);
  }
}
