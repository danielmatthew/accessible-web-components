import { LitElement, html, css } from 'lit-element';

export class DisclosureMenu extends LitElement {
  static get properties() {
    return {
      label: { type: String },
    };
  }

  static get styles() {
    return css`
      button {
        display: flex;
        align-items: center;
      }

      button:after {
        content: '';
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
        height: 0.5em;
        margin-left: 0.75em;
        width: 0.5em;
        transform: rotate(45deg);
      }

      button[aria-expanded='true']:after {
        transform: rotate(-90deg);
      }
    `;
  }

  constructor() {
    super();

    this.label = 'My button label';

    this._onSlotChange = this._onSlotChange.bind(this);

    //     this.toggleExpand(menu, false);

    //     menu.addEventListener('keydown', this.handleMenuKeyDown.bind(this));
    //     button.addEventListener('click', this.handleButtonClick.bind(this));
    //     button.addEventListener('keydown', this.handleButtonKeyDown.bind(this));
    //   }

    //   this.rootNode.addEventListener('focusout', this.handleBlur.bind(this));
  }

  get _trigger() {
    return this.shadowRoot.querySelector('button');
  }

  get _content() {
    return this.shadowRoot.querySelector('slot');
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    const childNodes = slot.assignedNodes({ flatten: true });

    return Array.prototype.filter.call(childNodes, node => node.nodeType === Node.ELEMENT_NODE);
  }

  firstUpdated() {
    this._trigger.setAttribute('aria-expanded', false);
    this._content.setAttribute('hidden', true);

    this._content.addEventListener('slotchange', this._onSlotChange);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  _onSlotChange() {
    this._linkContent();
  }

  _linkContent() {
    const slotContent = this._slottedChildren;

    slotContent[0].id = `awc-menu-${Date.now()}`;
    this._trigger.setAttribute('aria-controls', slotContent[0].id);
  }

  render() {
    return html`
      <button type="button" @click="${this.handleButtonClick}">${this.label}</button>
      <slot name="content"></slot>
    `;
  }

  toggleMenu(expanded) {
    this._trigger.setAttribute('aria-expanded', expanded);
    this._content.toggleAttribute('hidden');
  }

  toggleExpand(index, expanded) {
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }

    if (this.triggerNodes[index]) {
      this.openIndex = expanded ? index : null;
      this.triggerNodes[index].setAttribute('aria-expanded', expanded);
      this.toggleMenu(this.controlledNodes[index], expanded);
    }
  }

  // eslint-disable-next-line
  controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
          nodeList[nextIndex].focus();
        }
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      case 'End':
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
      default:
        break;
    }
  }

  handleBlur(event) {
    const menuContainsFocus = this.rootNode.contains(event.relatedTarget);

    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(false);
    }
  }

  handleButtonKeyDown(event) {
    const targetButtonIndex = this.triggerNodes.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      this.toggleExpand(false);
    } else if (
      this.useArrowKeys &&
      this.openIndex === targetButtonIndex &&
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      this.controlledNodes[this.openIndex].querySelector('a').focus();
    } else if (this.useArrowKeys) {
      this.controlFocusByKey(event, this.triggerNodes, targetButtonIndex);
    }
  }

  handleButtonClick(event) {
    const button = event.target;
    // const buttonIndex = this.triggerNodes.indexOf(button);
    const buttonExpanded = button.getAttribute('aria-expanded') === 'true';
    // this.toggleExpand(buttonIndex, !buttonExpanded);
    this.toggleMenu(!buttonExpanded);
  }

  handleMenuKeyDown(event) {
    if (this.openIndex === null) {
      return;
    }

    const menuLinks = Array.prototype.slice.call(
      this.controlledNodes[this.openIndex].querySelectorAll('a'),
    );
    const currentIndex = menuLinks.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      this.triggerNodes[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
    } else if (this.useArrowKeys) {
      this.controlFocusByKey(event, menuLinks, currentIndex);
    }
  }
}
