import { LitElement, html, css } from 'lit-element';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';

export class ContentPage extends LitElement {
  static get styles() {
    return css`
      .page-link {
        text-decoration: none;
      }
    `;
  }

  render() {
    return html`
      <p>Please select a game to play.</p>
      <mwc-list>
        <a href="/tic-tac-toe" class="page-link"><mwc-list-item>Tic-tac-toe</mwc-list-item></a>
        <a href="/hangman" class="page-link"><mwc-list-item>Hangman</mwc-list-item></a>
      </mwc-list>
    `;
  }
}
