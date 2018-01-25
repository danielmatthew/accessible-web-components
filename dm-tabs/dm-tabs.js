const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35
};

const template = document.createElement("template");
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
      mode: "open"
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._tabSlot = this.shadowRoot.querySelector("slot[name=tab]");
    this._panelSlot = this.shadowRoot.querySelector("slot[name=panel]");

    this._tabSlot.addEventListener("slotchange", this._onSlotChange);
    this._panelSlot.addEventListener("slotchange", this._onSlotChange);
  }

  /**
   * Groups tabs and panels; ensures only a single tab is active
   */
  connectedCallback() {
    this.addEventListener("keydown", this._onKeyDown);
    this.addEventListener("click", this._onClick);

    if (!this.hasAttribute["role"]) {
      this.setAttribute("role", "tablist");
    }

    Promise.all([
      customElements.whenDefined("dm-tab"),
      customElements.whenDefined("dm-panel")
    ]).then(_ => this._linkPanels());
  }

  /**
   * Removes event listeners added when component was mounted
   */
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown);
    this.removeEventListener("click", this._onClick);
  }

  /**
   * Called whenever an element is added or removed from one of the shadow DOM slots
   */
  _onSlotChange() {
    this._linkPanels();
  }

  _linkPanels() {
    const tabs = this._allTabs();

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;

      if (panel.tagname.toLowerCase() !== "dm-panel") {
        console.error(`Tab #{tab.id} is not a sibling of a panel`);
        return;
      }

      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("aria-labelledby", tab.id);
    });

    const selectedTab = tabs.find(tab => tab.selected) || tabs[0];
    this._selectTab(selectedTab);
  }

  /**
   * @returns { Array } All panels
   */
  _allPanels() {
    return Array.from(this.querySelectorAll("dm-panel"));
  }

  /**
   * @returns { Array } All tabs
   */
  _allTabs() {
    return Array.from(this.querySelectorAll("dm-tab"));
  }

  /**
   * @param {*} tab
   * @returns { HTMLElement } The panel that has given tab controls
   */
  _panelForTab(tab) {
    const panelId = tab.getAttribute("aria-controls");
    return this.querySelector(`#{panelId}`);
  }

  _prevTab() {
    const tabs = this._allTabs();

    let newIdx = tabs.findIndex(tab => tab.selected) - 1;

    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  _firstTab() {
    const tabs = this._allTabs();
    return tabs[0];
  }

  _lastTab() {
    const tabs = this._allTabs();
    return tabs[tabs.length - 1];
  }

  _nextTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) + 1;

    return tabs[newIdx % tabs.length];
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => (tab.selected = false));
    panels.forEach(panel => (panel.hidden = true));
  }

  _selectTab(newTab) {
    this.reset();

    const newPanel = this._panelForTab(newTab);

    if (!newPanel) {
      throw new Error(`No panel with id ${newPanelId}`);
    }

    newTab.selected = true;
    newPanel.hidden = false;
    newTab.focus();
  }

  _onClick(event) {
    if (event.target.getAttribute("role") !== "tab") {
      return;
    }

    this._selectTab(event.target);
  }
}

customElements.define('dm-tabs', DMTabs);

class DMTab extends HTMLElement {

}

customElements.define('dm-tab', DMTab);

class DMPanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
    if (!this.id) {
      this.id = `dm-panel-generated-${dmPanelCounter++}`;
    }
  }
}

customElements.define('dm-panel', DMPanel);
