export default class DropdownMenu {
  constructor(domNode) {
    this.rootNode = domNode;
    this.triggerNodes = [];
    this.controlledNodes = [];
    this.openIndex = null;
    this.useArrowKeys = true;

    const buttons = this.rootNode.querySelectorAll('button[aria-expanded][aria-controls]');

    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i];
      const menu = button.parentNode.querySelector('ul');
      if (menu) {
        this.triggerNodes.push(button);
        this.controlledNodes.push(menu);

        button.setAttribute('aria-expanded', 'false');
        this.toggleExpand(menu, false);
        this.rootNode.classList.add('js-dropdown-menu--active');
        menu.classList.add('js-blog__category__menu--active');

        menu.addEventListener('keydown', this.handleMenuKeyDown.bind(this));
        button.addEventListener('click', this.handleButtonClick.bind(this));
        button.addEventListener('keydown', this.handleButtonKeyDown.bind(this));
      }

      this.rootNode.addEventListener('focusout', this.handleBlur.bind(this));
    }
  }

  // eslint-disable-next-line
  toggleMenu(domNode, show) {
    if (domNode) {
      domNode.setAttribute('hidden', !show);
    }
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
    const buttonIndex = this.triggerNodes.indexOf(button);
    const buttonExpanded = button.getAttribute('aria-expanded') === 'true';
    this.toggleExpand(buttonIndex, !buttonExpanded);
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

  updateKeyControls(useArrowKeys) {
    this.useArrowKeys = useArrowKeys;
  }
}
