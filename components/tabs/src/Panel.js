let dmPanelCounter = 0;

export class AwcPanel extends HTMLElement {
  // constructor() {
  //   super();
  // }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');

    if (!this.id) {
      this.id = `dm-panel-generated-${dmPanelCounter += 1}`;
    }
  }
}
