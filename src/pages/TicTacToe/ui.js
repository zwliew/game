import { LitElement, html, css } from "lit-element";
import { init, ENDED, OFFLINE_HUMAN, GAME_MODES } from "./game.js";
import "@material/mwc-menu";
import "@material/mwc-list";
import "@material/mwc-button";

export class TicTacToe extends LitElement {
  static get properties() {
    return {
      // Game logic
      board: { type: Array },
      gameState: { type: Number },
      winner: { type: Number },
      curPlayer: { type: Number },
      ai: { type: Boolean },
      players: { type: Array },

      // UI
      menuOpen: { type: Boolean },
      opponentId: { type: Number },
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

      .opponent-menu {
        max-width: 500px;
        position: relative;
        margin: 0 auto;
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

    this.updateOpponent(OFFLINE_HUMAN);
  }

  restartGame() {
    this.updateState(init(this.opponentId));
  }

  updateOpponent(opponentId) {
    this.opponentId = opponentId;
    this.restartGame();
  }

  render() {
    let endingMessage = "";
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
          <mwc-button @click="${this.restartGame}" raised>Restart</mwc-button>
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
                      this.players[this.curPlayer].hint(
                        this.state,
                        rowIdx,
                        colIdx
                      )
                    )}"
                >
                  ${this.board[rowIdx][colIdx]}
                </button>
              `
            )}
          </div>
        `
    );

    const gameModes = GAME_MODES.flatMap(
      ({ id, name }) => html`
        <mwc-list-item
          ?selected="${this.opponentId === id}"
          ?activated="${this.opponentId === id}"
          >${name}</mwc-list-item
        >
      `
    );

    return html`
      <h1>Tic-Tac-Toe</h1>
      <div class="opponent-menu">
        <mwc-button
          @click="${() => {
            this.menuOpen = !this.menuOpen;
          }}"
          >${GAME_MODES[this.opponentId].name}</mwc-button
        >
        <mwc-menu
          activatable
          ?open="${this.menuOpen}"
          @open="${() => {
            this.menuOpen = true;
          }}"
          @closed="${() => {
            this.menuOpen = false;
          }}"
          @selected="${(event) => {
            this.updateOpponent(event.detail.index);
          }}"
          >${gameModes}</mwc-menu
        >
      </div>
      Player ${this.players[this.curPlayer].name}'s turn. ${board}
      ${endingMessage}
    `;
  }
}
