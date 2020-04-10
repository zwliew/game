import { LitElement, html } from 'lit-element';

export class ContentPage extends LitElement {
  render() {
    return html`
      <h1>🎮 Just Game! 🎮</h1>
      <p>Please select a game to play.</p>
      <nav>
        <ul>
          <li><a href="/tic-tac-toe">Tic-tac-toe</a></li>
          <li><a href="/snake">Snake</a></li>
        </ul>
      </nav>
    `;
  }
}
