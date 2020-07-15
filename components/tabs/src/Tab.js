export class AwcTab extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();

    this.tabCounter = 0;
  }

  connectedCallback() {
    // Element changes role to tab
    this.setAttribute('role', 'tab');

    if (!this.id) {
      this.id = `awc-tab-generated-${this.tabCounter += 1}`;
    }

    this.setAttribute('aria-selected', 'false');
    this.setAttribute('tabindex', -1);
    this._upgradeProperty('selected');
  }

  _upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback() {
    const value = this.hasAttribute('selected');
    this.setAttribute('aria-selected', value);
    this.setAttribute('tabindex', value ? 0 : -1);
  }

  set selected(value) {
    // eslint-disable-next-line
    value = Boolean(value);
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  get selected() {
    return this.hasAttribute('selected');
  }
}
