import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../awc-disclosure.js';

describe('awc-disclosure', () => {
  const timestamp = 12345;

  const markup = html`
    <awc-disclosure>
      <button>Toggle content</button>
      <div slot="content" id="${timestamp}">Hidden content</div>
    </awc-tabs>
  `;

  xit('should initialise its markup correctly', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).dom.to.equal(`
    <awc-disclosure>
      <button>Toggle content</button>
      <div slot="content" id="${timestamp}">Hidden content</div>
    </awc-tabs>
    `);
  });

  it('has a static shadow-dom', async () => {
    const el = await fixture(html` <awc-disclosure></awc-disclosure> `);

    expect(el).shadowDom.to.equal(`
      <button aria-expanded="false" type="button">My button label</button>
      <slot hidden="true" name="content"></slot>
    `);
  });

  it('should pass an automated accessibility test', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).to.be.accessible();
  });
});
