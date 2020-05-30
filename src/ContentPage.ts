import { LitElement, html, css, TemplateResult } from 'lit-element';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-list-item.js';

export class ContentPage extends LitElement {
  static styles = css`
    .page-link {
      text-decoration: none;
    }
  `;

  render(): TemplateResult {
    return html`
      <p>Please select a game to play.</p>
      <mwc-list>
        <a href="/tic-tac-toe" class="page-link"
          ><mwc-list-item>Tic-tac-toe</mwc-list-item></a
        >
        <a href="/hangman" class="page-link"
          ><mwc-list-item>Hangman</mwc-list-item></a
        >
      </mwc-list>
    `;
  }
}
