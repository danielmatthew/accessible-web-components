export class AwcPanel extends HTMLElement {
  constructor() {
    super();

    this.panelCounter = 0;
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');

    if (!this.id) {
      this.id = `awc-panel-generated-${this.panelCounter += 1}`;
    }
  }
}
