import { LitElement, html, css, property, TemplateResult } from 'lit-element';
import { installRouter } from 'pwa-helpers/router';

export class JustGame extends LitElement {
  @property({ type: String }) page = '/';

  static styles = css`
    :host {
      text-align: center;
    }

    .footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      padding-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-item {
      margin-right: 8px;
    }

    .page-link {
      text-decoration: none;
      color: inherit;
    }

    .page-link:hover {
      text-decoration: underline;
    }
  `;

  constructor() {
    super();

    installRouter(({ pathname }: { pathname: string }) => {
      this.page = pathname;
    });
  }

  render(): TemplateResult {
    let page;
    switch (this.page) {
      case '/tic-tac-toe':
        page = html` <tic-tac-toe></tic-tac-toe> `;
        break;
      case '/hangman':
        page = html`<hangman-page></hangman-page>`;
        break;
      default:
        page = html` <content-page></content-page> `;
        break;
    }

    return html`
      <h1><a href="/" class="page-link">🎮 Just Game! 🎮</a></h1>
      ${page}
      <footer class="footer">
        <span class="footer-item">
          Made in Singapore by
          <a href="https://teeny-thoughts.netlify.app">zwliew</a>.
        </span>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=zwliew&amp;repo=just-game.netlify.app&amp;type=star&amp;count=true"
          frameborder="0"
          scrolling="0"
          width="170px"
          height="20px"
        ></iframe>
      </footer>
    `;
  }
}
