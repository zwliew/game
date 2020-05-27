import { LitElement, html, css } from 'lit-element';
import { INIT_STATE, play, ENDED } from './game.js';

function convertPlayerNumToSymbol(cell) {
  switch (cell) {
    case 0:
      return 'X';
    case 1:
      return 'O';
    default:
      return '';
  }
}

export class TicTacToe extends LitElement {
  static get properties() {
    return {
      board: { type: Array },
      gameState: { type: Number },
      winner: { type: Number },
      curPlayer: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .cell {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        width: 64px;
        height: 64px;
        background-color: #ccc;
        margin: 4px 2px;
        border-radius: 4px;
        vertical-align: top;
        border: none;
      }

      .cell:hover {
        cursor: pointer;
      }

      button {
        display: inline-block;
      }
    `;
  }

  updateState({ board, gameState, winner, curPlayer }) {
    this.board = board;
    this.gameState = gameState;
    this.winner = winner;
    this.curPlayer = curPlayer;
    this.state = { board, gameState, winner, curPlayer };
  }

  constructor() {
    super();

    this.updateState(INIT_STATE);
  }

  render() {
    const player = convertPlayerNumToSymbol(this.curPlayer);

    let endingMessage = '';
    if (this.gameState === ENDED) {
      let status;
      if (this.winner !== undefined) {
        status = `Player ${convertPlayerNumToSymbol(this.winner)} won!`;
      } else {
        status = "It's a tie!";
      }
      endingMessage = html`
        <div>
          <p>${status}</p>
          <button @click="${() => this.updateState(INIT_STATE)}">Restart</button>
        </div>
      `;
    }

    const board = this.board.flatMap(
      (row, rowIdx) =>
        html`
          <div>
            ${row.map(
              (_, colIdx) => html`
                <button
                  class="cell"
                  @click="${() => this.updateState(play(this.state, rowIdx, colIdx))}"
                >
                  ${convertPlayerNumToSymbol(this.board[rowIdx][colIdx])}
                </button>
              `,
            )}
          </div>
        `,
    );
    return html`
      <h1>Tic-Tac-Toe</h1>
      Player ${player}'s turn. ${board} ${endingMessage}
    `;
  }
}
