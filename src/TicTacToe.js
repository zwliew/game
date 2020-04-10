import { LitElement, html, css } from 'lit-element';

// Game states
const STARTED = 0;
const ENDED = 1;

export class TicTacToe extends LitElement {
  static get properties() {
    return {
      board: { type: Array },
      curPlayer: { type: Number },
      gameState: { type: Number },
      winner: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
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

  constructor() {
    super();
    this.restartGame();
  }

  restartGame() {
    this.board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    this.curPlayer = 0;
    this.gameState = STARTED;
    this.winner = null;
  }

  handleCellClick({ target }) {
    const { row, col } = target.dataset;
    if (this.gameState === ENDED || this.board[row][col] === 0 || this.board[row][col] === 1) {
      // The cell has already been clicked before
      return;
    }

    this.board[row][col] = this.curPlayer;
    const hasWon = this.hasPlayerWon();
    if (hasWon) {
      this.gameState = ENDED;
      this.winner = this.curPlayer;
    } else if (this.isBoardFull()) {
      this.gameState = ENDED;
    }
    this.curPlayer = this.curPlayer ? 0 : 1;
  }

  hasPlayerWon() {
    const WIN_CONDITIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const condition of WIN_CONDITIONS) {
      let won = true;
      for (const idx of condition) {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        if (this.board[row][col] !== this.curPlayer) {
          won = false;
          break;
        }
      }
      if (won) {
        return true;
      }
    }
    return false;
  }

  isBoardFull() {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell !== 0 && cell !== 1) {
          return false;
        }
      }
    }
    return true;
  }

  convertCellToSymbol(cell) {
    switch (cell) {
      case 0:
        return 'X';
      case 1:
        return 'O';
      default:
        return '';
    }
  }

  render() {
    let winningMessage = '';
    if (this.winner !== null) {
      winningMessage = html`
        <div>
          <p>Player ${this.winner} won!</p>
          <button @click="${this.restartGame}">Restart</button>
        </div>
      `;
    }

    const cells = this.board.flatMap(
      (row, rowIdx) =>
        html`
          <div>
            ${row.map(
              (cell, colIdx) => html`
                <button
                  class="cell"
                  @click="${this.handleCellClick}"
                  data-row="${rowIdx}"
                  data-col="${colIdx}"
                >
                  ${this.convertCellToSymbol(this.board[rowIdx][colIdx])}
                </button>
              `,
            )}
          </div>
        `,
    );
    return html`
      <h1>Tic-Tac-Toe</h1>
      ${cells} ${winningMessage}
    `;
  }
}