// Player numbers
const PLAYER0 = 0;
const PLAYER1 = 1;

// Game states
export const ENDED = 0;
const STARTED = 1;

// Board states
const WON = 0;
const TIE = 1;

export const INIT_STATE = {
  curPlayer: PLAYER0,
  gameState: STARTED,
  board: [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ],
  winner: undefined,
};

function cloneBoard(board) {
  const newBoard = [];
  for (const row of board) {
    newBoard.push(row.slice());
  }
  return newBoard;
}

/**
 * Advances to the next state given the current state parameters.
 *
 * @param {object} The current state
 *
 * @returns {object} The new state
 */
function nextState(state) {
  let boardState;

  // Is the game over yet?
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
      if (state.board[row][col] !== state.curPlayer) {
        won = false;
        break;
      }
    }

    if (won) {
      boardState = WON;
      break;
    }
  }

  // Otherwise, is the game tied?
  if (boardState === undefined) {
    let tied = true;
    for (const row of state.board) {
      for (const col of row) {
        if (col === undefined) {
          tied = false;
        }
      }
    }

    if (tied) {
      boardState = TIE;
    }
  }

  const newState = { ...state };

  switch (boardState) {
    case WON:
      newState.gameState = ENDED;
      newState.winner = state.curPlayer;
      break;
    case TIE:
      newState.gameState = ENDED;
      break;
    default:
      newState.curPlayer = state.curPlayer === PLAYER0 ? PLAYER1 : PLAYER0;
      break;
  }

  return newState;
}

/**
 * Plays the cell at row `row` and column `col` for the current player.
 *
 * @param {object} state The current state.
 * @param {number} row The row to play at
 * @param {number} col The column to play at
 *
 * @returns {object} The new state
 */
export function play(state, row, col) {
  if (state.board[row][col] !== undefined || state.gameState === ENDED) {
    // This cell cannot be played
    return state;
  }

  let newState = { ...state, board: cloneBoard(state.board) };

  newState.board[row][col] = state.curPlayer;
  newState = nextState(newState);

  return newState;
}
