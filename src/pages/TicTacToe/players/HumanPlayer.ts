import { Play, Player } from './Player.js';
import type { State } from '../game.js';

export class HumanPlayer implements Player {
  name: string;
  play: Play;

  constructor(name: string, play: Play) {
    this.name = name;
    this.play = play;
  }

  // eslint-disable-next-line class-methods-use-this
  notify(state: State): State {
    return state;
  }

  /**
   * Hints to play the cell indicated by the `hints` parameters.
   *
   * @param {State} state The current state
   * @param  {[row: number, col: number]} hints The row and column indices clicked
   *
   * @returns {Object} The new state
   */
  hint(state: State, ...hints: number[]): State {
    return this.play(state, this.name, hints[0], hints[1]);
  }
}
