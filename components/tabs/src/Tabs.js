import { LitElement, html, css } from 'lit-element';

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35,
};

export class AwcTabs extends LitElement {
  static get properties() {
    return {
      vertical: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    this._onSlotChange = this._onSlotChange.bind(this);

    this.vertical = false;
  }

  firstUpdated() {
    this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');

    this._tabSlot.addEventListener('slotchange', this._onSlotChange);
    this._panelSlot.addEventListener('slotchange', this._onSlotChange);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(awc-panel) {
        flex-basis: 100%;
      }
    `;
  }

  render() {
    return html`
      <slot name="tab"></slot>
      <slot name="panel"></slot>
    `;
  }

  /**
   * Groups tabs and panels; ensures only a single tab is active
   */
  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tablist');
    }

    if (this.vertical) {
      this.setAttribute('aria-orientation', 'vertical');
    } else {
      this.setAttribute('aria-orientation', 'horizontal');
    }
  }

  /**
   * Removes event listeners added when component was mounted
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
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

      if (panel.tagName.toLowerCase() !== 'awc-panel') {
        return;
      }

      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    const selectedTab = tabs.find(tab => tab.selected) || tabs[0];
    this._selectTab(selectedTab);
  }

  /**
   * @returns { Array } All panels
   */
  _allPanels() {
    return Array.from(this.querySelectorAll('awc-panel'));
  }

  /**
   * @returns { Array } All tabs
   */
  _allTabs() {
    return Array.from(this.querySelectorAll('awc-tab'));
  }

  /**
   * @param {*} tab
   * @returns { HTMLElement } Panel element controlled by the tab
   */
  _panelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return this.querySelector(`#${panelId}`);
  }

  _prevTab() {
    const tabs = this._allTabs();

    const newIdx = tabs.findIndex(tab => tab.selected) - 1;

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
    const newIdx = tabs.findIndex(tab => tab.selected) + 1;

    return tabs[newIdx % tabs.length];
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();

    tabs.forEach(tab => {
      const currentTab = tab;

      currentTab.selected = false;

      return currentTab;
    });

    panels.forEach(panel => {
      const currentPanel = panel;

      currentPanel.hidden = true;

      return currentPanel;
    });
  }

  _selectTab(newTab) {
    const selectedTab = newTab;

    this.reset();

    const newPanel = this._panelForTab(selectedTab);

    if (!newPanel) {
      throw new Error(`No panel with id ${selectedTab.id}`);
    }

    selectedTab.selected = true;
    newPanel.hidden = false;
    selectedTab.focus();

    this.setAttribute('aria-labelledby', selectedTab.id);
  }

  _onKeyDown(event) {
    if (event.target.getAttribute('role') !== 'tab') {
      return;
    }

    if (event.altKey) {
      return;
    }

    let newTab;

    if (this.vertical) {
      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newTab = this._prevTab();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newTab = this._nextTab();
          break;

        case KEYCODE.HOME:
          newTab = this._firstTab();
          break;

        case KEYCODE.END:
          newTab = this._lastTab();
          break;

        default:
          return;
      }
    } else {
      switch (event.keyCode) {
        case KEYCODE.LEFT:
          newTab = this._prevTab();
          break;

        case KEYCODE.RIGHT:
          newTab = this._nextTab();
          break;

        case KEYCODE.HOME:
          newTab = this._firstTab();
          break;

        case KEYCODE.END:
          newTab = this._lastTab();
          break;

        default:
          return;
      }
    }

    event.preventDefault();
    this._selectTab(newTab);
  }

  _onClick(event) {
    if (event.target.getAttribute('role') !== 'tab') {
      return;
    }

    this._selectTab(event.target);
  }
}
