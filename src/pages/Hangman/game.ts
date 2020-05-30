export interface State {
  curGuess: string;
  targetWord: string;
  livesLeft: number;
  gameState: number;
}

// Game states
export const WON = 0;
export const LOST = 1;
const ONGOING = 2;

async function fetchRandomWord() {
  const res = await fetch('https://zwliew.com/just-game/hangman/word');
  const text = await res.text();
  return text;
}

/**
 * Initializes a new game state.
 * @returns {Promise<State>} The new game state
 */
export async function init(): Promise<State> {
  const targetWord = await fetchRandomWord();
  const curGuessArr = [];
  for (let i = 0; i < targetWord.length; i += 1) {
    curGuessArr.push('_');
  }
  const state = {
    curGuess: curGuessArr.join(''),
    targetWord,
    livesLeft: 5,
    gameState: ONGOING,
  };
  return state;
}

/**
 * Advances to the next appropriate game state.
 * @param {State} state The current game state
 * @returns {State} The next game state
 */
function nextState(state: State): State {
  // Has the entire target word been guessed?
  let { gameState } = state;
  let fullyGuessed = true;
  for (const c of state.curGuess) {
    if (c === '_') {
      fullyGuessed = false;
      break;
    }
  }

  if (fullyGuessed) {
    gameState = WON;
  } else if (state.livesLeft === 0) {
    gameState = LOST;
  }

  const newState = { ...state, gameState };
  return newState;
}

/**
 * Submits a guess.
 * @param {State} state The current game state
 * @param {String} ch The newly guessed character
 * @returns {State} The next game state
 */
export function guess(state: State, ch: string): State {
  const newState = { ...state };
  const newCurGuess = Array.from(state.curGuess);
  let matched = false;
  for (let i = 0; i < state.targetWord.length; i += 1) {
    if (state.targetWord[i] === ch) {
      newCurGuess[i] = ch;
      matched = true;
    }
  }

  // Does the guess match any character in the target word?
  if (!matched) {
    newState.livesLeft -= 1;
  }
  newState.curGuess = newCurGuess.join('');
  return nextState(newState);
}
