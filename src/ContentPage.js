import { LitElement, html, css } from 'lit-element';

export class ContentPage extends LitElement {
  static get styles() {
    return css`
      .page-list {
        padding: 0;
      }

      .page-list-item {
        margin: 0;
        list-style-type: none;
        font-weight: bold;
      }

      .page-link {
        color: inherit;
        text-decoration: none;
      }

      .page-link:hover {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html`
      <p>Please select a game to play.</p>
      <nav>
        <ul class="page-list">
          <li class="page-list-item"><a href="/tic-tac-toe" class="page-link">Tic-tac-toe</a></li>
          <li class="page-list-item"><a href="/snake" class="page-link">Snake</a></li>
        </ul>
      </nav>
    `;
  }
}
