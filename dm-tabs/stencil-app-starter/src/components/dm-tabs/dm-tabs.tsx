import {
  Component,
  Listen,
  Prop,
  State
} from '@stencil/core';

@Component({
  tag: 'dm-tabs',
  host: {
    role: 'tablist',
  }
})
export class DMTabs {
  @State() tabCount: Number;
  @State() panelCount: Number;

  @Listen('keydown')
  handleKeyDown(event: UIEvent) {
    console.log(event);
  }

  @Listen('click')
  handleClick(event: UIEvent) {
    console.log(event);
    this.selectTab(event.target);
  }

  selectTab(newTab) {
    newTab.selected = true;
    newTab.hidden = false;
    newTab.focus();
  }


  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  componentDidLoad() {
    console.log('The component has been loaded');
  }

  componentWillUpdate() {
    console.log('The component will update');
  }

  componentDidUpdate() {
    console.log('The component did update');
  }

  componentDidUnload() {
    console.log('The view has been removed from the DOM');
  }

  render() {
    return (
      <dm-tabs>
        <slot name="tab" />
        <slot name="panel" />
      </dm-tabs>
    );
  }
}

@Component({
  tag: 'dm-tab',
  host: {
    role: 'tab'
  }
})
export class DMTab {
  componentDidLoad() {

  }
}

@Component({
  tag: 'dm-panel',
  host: {
    role: 'tabpanel'
  }
})
export class DMPanel {
  componentDidLoad() {

  }
}
