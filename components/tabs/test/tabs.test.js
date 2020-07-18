import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../awc-tabs.js';

describe('awc-tabs', () => {
  const markup = html`
    <awc-tabs>
      <awc-tab role="heading" slot="tab"></awc-tab>
      <awc-panel role="region" slot="panel"></awc-panel>
    </awc-tabs>
  `;

  it('should initialise its markup correctly', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).dom.to.equal(`
      <awc-tabs role="tablist" aria-labelledby="awc-tab-generated-1">
        <awc-tab
          aria-controls="awc-panel-generated-1"
          id="awc-tab-generated-1"
          role="tab"
          selected=""
          slot="tab"
          tabindex="0">
        </awc-tab>
        <awc-panel
          aria-labelledby="awc-tab-generated-1"
          id="awc-panel-generated-1"
          role="tabpanel"
          slot="panel">
        </awc-panel>
      </awc-tabs>
    `);
  });

  it('has a static shadow-dom', async () => {
    const el = await fixture(html` <awc-tabs></awc-tabs> `);

    expect(el).shadowDom.to.equal(`
      <slot name="tab"></slot>
      <slot name="panel"></slot>
    `);
  });

  it('should pass an automated accessibility test', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).to.be.accessible();
  });
});
