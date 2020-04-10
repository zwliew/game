import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers/router';

export class JustGame extends LitElement {
  static get properties() {
    return { page: { type: String } };
  }

  static get styles() {
    return css`
      :host {
        text-align: center;
      }

      .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        margin-bottom: 8px;
      }
    `;
  }

  constructor() {
    super();

    installRouter(({ pathname }) => {
      this.page = pathname;
    });
  }

  render() {
    let page;
    switch (this.page) {
      case '/tic-tac-toe':
        page = html`
          <tic-tac-toe></tic-tac-toe>
        `;
        break;
      case '/snake':
        page = html`
          <snake-game></snake-game>
        `;
        break;
      default:
        page = html`
          <content-page></content-page>
        `;
        break;
    }

    return html`
      ${page}
      <footer class="footer">
        Made in Singapore by <a href="https://teeny-thoughts.netlify.app">zwliew</a>.
      </footer>
    `;
  }
}
