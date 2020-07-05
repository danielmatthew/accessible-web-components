import { html, LitElement, css } from 'lit-element';

class Alert extends LitElement {
  static get properties() {
    return {
      message: {
        type: String,
      },
      title: {
        type: String,
      },
      polite: {
        type: Boolean,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 1em;
        padding: 1em;
        border-left: 2px solid red;
        background-color: rgba(255, 0, 0, 0.2);
      }

      .alert__title {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .alert__message {
        margin: 0;
      }
    `;
  }

  render() {
    return html`
    <div role="alert">
      <span class="alert__title">${this.title}</span>
      <p class="alert__message">${this.message}</p>
    </div>`;
  }
}

window.customElements.define('dm-alert', Alert);
