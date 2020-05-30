import { HumanPlayer } from "./HumanPlayer.js";
import { BeginnerAiPlayer } from "./BeginnerAiPlayer.js";
import { AdvancedAiPlayer } from "./AdvancedAiPlayer.js";
import { findWinner, isBoardFull, cloneBoard } from "./utils.js";
import { IntermediateAiPlayer } from "./IntermediateAiPlayer.js";

// Game modes
export const OFFLINE_HUMAN = 0;
const BEGINNER_AI = 1;
const INTERMEDIATE_AI = 2;
const ADVANCED_AI = 3;
export const GAME_MODES = [
  {
    id: OFFLINE_HUMAN,
    name: "Offline human",
  },
  {
    id: BEGINNER_AI,
    name: "Beginner AI",
  },
  {
    id: INTERMEDIATE_AI,
    name: "Intermediate AI",
  },
  {
    id: ADVANCED_AI,
    name: "Advanced AI",
  },
];

// Game states
export const ENDED = 0;
const STARTED = 1;

// Board states
const WON = 0;
const TIE = 1;

/**
 * Advances to the next state given the current state parameters.
 *
 * @param {object} state The current state
 *
 * @returns {object} The new state
 */
function nextState(state) {
  let boardState;

  // Is the game over yet?
  const winner = findWinner(state.board);
  if (winner !== undefined) {
    boardState = WON;
  } else if (isBoardFull(state.board)) {
    boardState = TIE;
  }

  let newState = { ...state };

  switch (boardState) {
    case WON:
      newState.gameState = ENDED;
      newState.winner = state.curPlayer;
      break;
    case TIE:
      newState.gameState = ENDED;
      break;
    default:
      newState.curPlayer = 1 - state.curPlayer;
      newState = newState.players[newState.curPlayer].notify(newState);
      break;
  }

  return newState;
}

/**
 * Plays the cell at row `row` and column `col` for the current player.
 *
 * @param {object} state The current state.
 * @param {String} playerName The name of the current player
 * @param {number} row The row to play at
 * @param {number} col The column to play at
 *
 * @returns {object} The new state
 */
export function play(state, playerName, row, col) {
  if (
    state.board[row][col] !== undefined ||
    state.gameState === ENDED ||
    state.players[state.curPlayer].name !== playerName
  ) {
    // This cell cannot be played
    return state;
  }

  const newState = { ...state, board: cloneBoard(state.board) };
  newState.board[row][col] = state.players[state.curPlayer].name;

  return nextState(newState);
}

/**
 * Returns a newly initialized game state.
 *
 * @param {Number} opponentId The ID of the opponent to play against.
 *
 * @returns {Object} The newly initialized game state
 */
export function init(opponentId) {
  let state = {
    curPlayer: 0,
    gameState: STARTED,
    board: [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ],
    winner: undefined,
    players: [new HumanPlayer("X", play)],
  };

  let opponentPlayer;
  switch (opponentId) {
    case BEGINNER_AI:
      opponentPlayer = new BeginnerAiPlayer("O", play);
      break;
    case INTERMEDIATE_AI:
      opponentPlayer = new IntermediateAiPlayer("O", play);
      break;
    case ADVANCED_AI:
      opponentPlayer = new AdvancedAiPlayer("O", play);
      break;
    default:
      opponentPlayer = new HumanPlayer("O", play);
      break;
  }
  state.players.push(opponentPlayer);

  state = state.players[state.curPlayer].notify(state);

  return state;
}
