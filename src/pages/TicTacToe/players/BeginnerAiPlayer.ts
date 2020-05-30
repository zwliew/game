import { Player, Play } from './Player.js';
import { State } from '../game.js';

export class BeginnerAiPlayer implements Player {
  name: string;
  play: Play;

  constructor(name: string, play: Play) {
    this.name = name;
    this.play = play;
  }

  /**
   * Notifies the player of his turn. In the case of the AI, it also makes a move.
   * Specific to the beginner AI, this player makes random moves all the time.
   *
   * @param {State} state The current state of the game
   *
   * @returns {State} The new state of the game
   */
  notify(state: State): State {
    let row;
    let col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (state.board[row][col] !== undefined);
    return this.play(state, this.name, row, col);
  }

  // eslint-disable-next-line class-methods-use-this
  hint(state: State): State {
    return state;
  }
}
