export class HumanPlayer {
  constructor(name, play) {
    this.name = name;
    this.play = play;
  }

  // eslint-disable-next-line class-methods-use-this
  notify(state) {
    return state;
  }

  /**
   * Hints to play the cell indicated by the `hints` parameters.
   *
   * @param {Object} state The current state
   * @param  {...any} hints The row and column indices clicked
   *
   * @returns {Object} The new state
   */
  hint(state, ...hints) {
    return this.play(state, this.name, ...hints);
  }
}
