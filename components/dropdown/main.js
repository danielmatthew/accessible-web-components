import { LitElement, html, css } from 'lit-element';

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35,
};

class DMDisclosure extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
  }

  render() {}

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
  }
}

window.customElements.define('dm-disclosure', DMDisclosure);
