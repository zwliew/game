import { LitElement, html, css, property, TemplateResult } from 'lit-element';
import { init, ENDED, OFFLINE_HUMAN, GAME_MODES, State } from './game.js';
import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-button';

export class TicTacToe extends LitElement {
  // Game logic
  @property({ type: Array }) board: State['board'] | undefined;
  @property({ type: Number }) gameState: State['gameState'] | undefined;
  @property({ type: Number }) winner: State['winner'] | undefined;
  @property({ type: Number }) curPlayer: State['curPlayer'] | undefined;
  @property({ type: Array }) players: State['players'] | undefined;
  @property({ type: Object }) state: State | undefined;

  // UI
  @property({ type: Boolean }) menuOpen = false;
  @property({ type: Number }) opponentId = OFFLINE_HUMAN;

  static styles = css`
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

  updateState({ board, gameState, winner, curPlayer, players }: State): void {
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

  restartGame(): void {
    this.updateState(init(this.opponentId));
  }

  updateOpponent(opponentId: number): void {
    this.opponentId = opponentId;
    this.restartGame();
  }

  render(): TemplateResult {
    let endingMessage: TemplateResult | string = '';
    if (this.gameState === ENDED) {
      let status;
      if (this.winner !== undefined) {
        status = `Player ${this.players![this.winner].name} won!`;
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

    const board: TemplateResult[] = this.board!.flatMap(
      (row: (string | undefined)[], rowIdx: number) =>
        html`
          <div>
            ${row.map(
              (_, colIdx) => html`
                <button
                  class="cell"
                  @click="${() =>
                    this.updateState(
                      this.players![this.curPlayer!].hint(
                        this.state!,
                        rowIdx,
                        colIdx
                      )
                    )}"
                >
                  ${this.board![rowIdx][colIdx]}
                </button>
              `
            )}
          </div>
        `
    );

    const gameModes = GAME_MODES.flatMap(
      ({ id, name }: { id: number; name: string }) => html`
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
          @click="${(): void => {
            this.menuOpen = !this.menuOpen;
          }}"
          >${GAME_MODES[this.opponentId].name}</mwc-button
        >
        <mwc-menu
          activatable
          ?open="${this.menuOpen}"
          @open="${(): void => {
            this.menuOpen = true;
          }}"
          @closed="${(): void => {
            this.menuOpen = false;
          }}"
          @selected="${({ detail }: { detail: { index: number } }): void => {
            this.updateOpponent(detail.index);
          }}"
          >${gameModes}</mwc-menu
        >
      </div>
      Player ${this.players![this.curPlayer!].name}'s turn. ${board}
      ${endingMessage}
    `;
  }
}
