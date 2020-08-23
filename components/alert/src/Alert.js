import { html, LitElement, css } from 'lit-element';

export class AwcAlert extends LitElement {
  static get properties() {
    return {
      message: {
        type: String,
      },
      title: {
        type: String,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .alert__title {
        font-weight: bold;
      }
    `;
  }

  render() {
    return html` <div role="alert">
      ${this.title ? html`<span class="alert__title">${this.title}</span>` : null}
      <p class="alert__message">${this.message}</p>
    </div>`;
  }
}
