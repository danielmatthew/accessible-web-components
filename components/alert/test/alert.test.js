import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../awc-alert.js';

describe('awc-alert', () => {
  const markup = html`<awc-alert title="Test title" message="Test message"></awc-alert>`;

  it('should initialise its markup correctly', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).dom.to.equal(`
      <awc-alert
        message="Test message"
        title="Test title">
      </awc-alert>
    `);
  });

  it('has a static shadow-dom', async () => {
    const el = await fixture(html` <awc-alert></awc-alert> `);

    expect(el).shadowDom.to.equal(`
      <div role="alert">
        <p class="alert__message">
        </p>
      </div>
    `);
  });

  it('should pass an automated accessibility test', async () => {
    const el = await fixture(markup);

    await elementUpdated(el);

    expect(el).to.be.accessible();
  });
});
