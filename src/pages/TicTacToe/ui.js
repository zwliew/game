import { LitElement, html, css } from 'lit-element';
import { init, ENDED } from './game.js';
import '@material/mwc-switch';
import '@material/mwc-formfield';

export class TicTacToe extends LitElement {
  static get properties() {
    return {
      board: { type: Array },
      gameState: { type: Number },
      winner: { type: Number },
      curPlayer: { type: Number },
      ai: { type: Boolean },
      players: { type: Array },
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

  updateState({ board, gameState, winner, curPlayer, players }) {
    this.board = board;
    this.gameState = gameState;
    this.winner = winner;
    this.curPlayer = curPlayer;
    this.players = players;
    this.state = { board, gameState, winner, curPlayer, players };
  }

  constructor() {
    super();

    this.restartGame();
  }

  restartGame() {
    this.updateState(init(this.ai));
  }

  render() {
    let endingMessage = '';
    if (this.gameState === ENDED) {
      let status;
      if (this.winner !== undefined) {
        status = `Player ${this.players[this.winner].name} won!`;
      } else {
        status = "It's a tie!";
      }
      endingMessage = html`
        <div>
          <p>${status}</p>
          <button @click="${this.restartGame}">Restart</button>
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
                  @click="${() =>
                    this.updateState(
                      this.players[this.curPlayer].hint(this.state, rowIdx, colIdx),
                    )}"
                >
                  ${this.board[rowIdx][colIdx]}
                </button>
              `,
            )}
          </div>
        `,
    );

    return html`
      <h1>Tic-Tac-Toe</h1>
      <div>
        <mwc-formfield label="${this.ai ? 'vs AI' : 'vs human'}">
          <mwc-switch
            ?checked=${this.ai}
            @change="${() => {
              this.ai = !this.ai;
              this.restartGame();
            }}"
          ></mwc-switch>
        </mwc-formfield>
      </div>
      Player ${this.players[this.curPlayer].name}'s turn. ${board} ${endingMessage}
    `;
  }
}
