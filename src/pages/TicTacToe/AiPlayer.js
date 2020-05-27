export class AiPlayer {
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
