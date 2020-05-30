import { findWinner, isBoardFull, cloneBoard } from '../utils.js';
import { Player, Play } from './Player.js';
import { State, Board } from '../game.js';

export class AdvancedAiPlayer implements Player {
  name: string;
  play: Play;

  constructor(name: string, play: Play) {
    this.name = name;
    this.play = play;
  }

  /**
   * Notifies the player of his turn. In the case of the AI, it also makes a move.
   * Specific to the advanced AI, this player uses minimax to determine the
   * not-so-but-optimally-enough moves to make.
   *
   * @param {Object} state The current state of the game
   *
   * @returns {Object} The new state of the game
   */
  notify(state: State): State {
    const otherPlayer = state.players[1 - state.curPlayer].name;
    const curPlayer = this.name;

    function minimax(
      board: Board,
      maximizing: boolean
    ): { row: number | undefined; col: number | undefined; val: number } {
      const winner = findWinner(board);
      if (winner !== undefined) {
        return {
          val: winner === curPlayer ? 1 : -1,
          row: undefined,
          col: undefined,
        };
      }
      if (isBoardFull(board)) {
        return { val: 0, row: undefined, col: undefined };
      }

      const newBoard = cloneBoard(board);
      let best:
        | {
            row: number | undefined;
            col: number | undefined;
            val: number;
          }
        | undefined;
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
      return best!;
    }

    const { row, col } = minimax(state.board, true);
    if (row !== undefined && col !== undefined) {
      return this.play(state, this.name, row, col);
    }
    return state;
  }

  // eslint-disable-next-line class-methods-use-this
  hint(state: State): State {
    return state;
  }
}
