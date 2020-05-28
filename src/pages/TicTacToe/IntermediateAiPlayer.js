import { findNearWin } from './utils.js';

export class IntermediateAiPlayer {
  constructor(name, play) {
    this.name = name;
    this.play = play;
  }

  /**
   * Notifies the player of his turn. In the case of the AI, it also makes a move.
   * Specific to the intermediate AI, this player makes random moves unless it sees
   * an immediate opportunity to block a win or to secure a win.
   *
   * @param {Object} state The current state of the game
   *
   * @returns {Object} The new state of the game
   */
  notify(state) {
    let coords = findNearWin(state.board, this.name);
    if (coords !== undefined) {
      return this.play(state, this.name, coords.row, coords.col);
    }

    const otherPlayer = state.players[1 - state.curPlayer].name;
    coords = findNearWin(state.board, otherPlayer);
    if (coords !== undefined) {
      return this.play(state, this.name, coords.row, coords.col);
    }

    let row;
    let col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (state.board[row][col] !== undefined);
    return this.play(state, this.name, row, col);
  }

  // eslint-disable-next-line class-methods-use-this
  hint(state) {
    return state;
  }
}
