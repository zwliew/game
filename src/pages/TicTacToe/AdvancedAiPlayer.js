import { findWinner, isBoardFull, cloneBoard } from './utils.js';

export class AdvancedAiPlayer {
  constructor(name, play) {
    this.name = name;
    this.play = play;
  }

  /**
   * Notifies the player of his turn. In the case of the AI, it also makes a move.
   *
   * @param {Object} state The current state of the game
   *
   * @returns {Object} The new state of the game
   */
  notify(state) {
    const otherPlayer =
      state.players[0].name === this.name ? state.players[1].name : state.players[0].name;
    const curPlayer = this.name;

    function minimax(board, maximizing) {
      const winner = findWinner(board);
      if (winner !== undefined) {
        return { val: winner === curPlayer ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY };
      }
      if (isBoardFull(board)) {
        return { val: 0 };
      }

      const newBoard = cloneBoard(board);
      let best;
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
          if (board[row][col] === undefined) {
            newBoard[row][col] = maximizing ? curPlayer : otherPlayer;
            const res = minimax(newBoard, !maximizing);
            if (
              best === undefined ||
              (maximizing && best.val < res.val) ||
              (!maximizing && best.val > res.val)
            ) {
              best = { row, col, val: res.val };
            }
            newBoard[row][col] = undefined;
          }
        }
      }
      return best;
    }

    const { row, col } = minimax(state.board, true);
    if (row !== undefined && col !== undefined) {
      return this.play(state, this.name, row, col);
    }
    return state;
  }

  // eslint-disable-next-line class-methods-use-this
  hint(state) {
    return state;
  }
}
