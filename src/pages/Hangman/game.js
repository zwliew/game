// Dictionary sourced from https://www.hangmanwords.com/words
const WORDS = [
  "abruptly",
  "absurd",
  "abyss",
  "affix",
  "askew",
  "avenue",
  "awkward",
  "axiom",
  "azure",
  "bagpipes",
  "bandwagon",
  "banjo",
  "bayou",
  "beekeeper",
  "bikini",
  "blitz",
  "blizzard",
  "boggle",
  "bookworm",
  "boxcar",
  "boxful",
  "buckaroo",
  "buffalo",
  "buffoon",
  "buxom",
  "buzzard",
  "buzzing",
  "buzzwords",
  "caliph",
  "cobweb",
  "cockiness",
  "croquet",
  "crypt",
  "curacao",
  "cycle",
  "daiquiri",
  "dirndl",
  "disavow",
  "dizzying",
  "duplex",
  "dwarves",
  "embezzle",
  "equip",
  "espionage",
  "euouae",
  "exodus",
  "faking",
  "fishhook",
  "fixable",
  "fjord",
  "flapjack",
  "flopping",
  "fluffiness",
  "flyby",
  "foxglove",
  "frazzled",
  "frizzled",
  "fuchsia",
  "funny",
  "gabby",
  "galaxy",
  "galvanize",
  "gazebo",
  "giaour",
  "gizmo",
  "glowworm",
  "glyph",
  "gnarly",
  "gnostic",
  "gossip",
  "grogginess",
  "haiku",
  "haphazard",
  "hyphen",
  "iatrogenic",
  "icebox",
  "injury",
  "ivory",
  "ivy",
  "jackpot",
  "jaundice",
  "jawbreaker",
  "jaywalk",
  "jazziest",
  "jazzy",
  "jelly",
  "jigsaw",
  "jinx",
  "jiujitsu",
  "jockey",
  "jogging",
  "joking",
  "jovial",
  "joyful",
  "juicy",
  "jukebox",
  "jumbo",
  "kayak",
  "kazoo",
  "keyhole",
  "khaki",
  "kilobyte",
  "kiosk",
  "kitsch",
  "kiwifruit",
  "klutz",
  "knapsack",
  "larynx",
  "lengths",
  "lucky",
  "luxury",
  "lymph",
  "marquis",
  "matrix",
  "megahertz",
  "microwave",
  "mnemonic",
  "mystify",
  "naphtha",
  "nightclub",
  "nowadays",
  "numbskull",
  "nymph",
  "onyx",
  "ovary",
  "oxidize",
  "oxygen",
  "pajama",
  "peekaboo",
  "phlegm",
  "pixel",
  "pizazz",
  "pneumonia",
  "polka",
  "pshaw",
  "psyche",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quips",
  "quixotic",
  "quiz",
  "quizzes",
  "quorum",
  "razzmatazz",
  "rhubarb",
  "rhythm",
  "rickshaw",
  "schnapps",
  "scratch",
  "shiv",
  "snazzy",
  "sphinx",
  "spritz",
  "squawk",
  "staff",
  "strength",
  "strengths",
  "stretch",
  "stronghold",
  "stymied",
  "subway",
  "swivel",
  "syndrome",
  "thriftless",
  "thumbscrew",
  "topaz",
  "transcript",
  "transgress",
  "transplant",
  "triphthong",
  "twelfth",
  "twelfths",
  "unknown",
  "unworthy",
  "unzip",
  "uptown",
  "vaporize",
  "vixen",
  "vodka",
  "voodoo",
  "vortex",
  "voyeurism",
  "walkway",
  "waltz",
  "wave",
  "wavy",
  "waxy",
  "wellspring",
  "wheezy",
  "whiskey",
  "whizzing",
  "whomever",
  "wimpy",
  "witchcraft",
  "wizard",
  "woozy",
  "wristwatch",
  "wyvern",
  "xylophone",
  "yachtsman",
  "yippee",
  "yoked",
  "youthful",
  "yummy",
  "zephyr",
  "zigzag",
  "zigzagging",
  "zilch",
  "zipper",
  "zodiac",
  "zombie",
];

// Game states
export const WON = 0;
export const LOST = 1;
const ONGOING = 2;

/**
 * Initializes a new game state.
 * @returns {Object} The new game state
 */
export function init() {
  const wordIdx = Math.floor(Math.random() * WORDS.length);
  const curGuessArr = [];
  for (let i = 0; i < WORDS[wordIdx].length; i += 1) {
    curGuessArr.push("_");
  }
  const state = {
    curGuess: curGuessArr.join(""),
    targetWord: WORDS[wordIdx],
    livesLeft: 5,
    gameState: ONGOING,
  };
  return state;
}

/**
 * Advances to the next appropriate game state.
 * @param {Object} state The current game state
 * @returns {Object} The next game state
 */
function nextState(state) {
  // Has the entire target word been guessed?
  let { gameState } = state;
  let fullyGuessed = true;
  for (const c of state.curGuess) {
    if (c === "_") {
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
 * @param {Object} state The current game state
 * @param {String} ch The newly guessed character
 * @returns {Object} The next game state
 */
export function guess(state, ch) {
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
  newState.curGuess = newCurGuess.join("");
  return nextState(newState);
}
