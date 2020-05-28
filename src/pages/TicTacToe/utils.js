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

function idxToRowCol(idx) {
  return {
    row: Math.floor(idx / 3),
    col: idx % 3,
  };
}

export function findNearWin(board, player) {
  function areCoordsEqual(a, b) {
    return board[a.row][a.col] !== undefined && board[a.row][a.col] === board[b.row][b.col];
  }

  for (const condition of WIN_CONDITIONS) {
    const [a, b, c] = condition.map(idxToRowCol);
    if (
      areCoordsEqual(a, b) &&
      board[c.row][c.col] === undefined &&
      board[a.row][a.col] === player
    ) {
      return c;
    }
    if (
      areCoordsEqual(a, c) &&
      board[b.row][b.col] === undefined &&
      board[a.row][a.col] === player
    ) {
      return b;
    }
    if (
      areCoordsEqual(b, c) &&
      board[a.row][a.col] === undefined &&
      board[b.row][b.col] === player
    ) {
      return a;
    }
  }
  return undefined;
}

export function findWinner(board) {
  for (const condition of WIN_CONDITIONS) {
    const rowCol = idxToRowCol(condition[0]);
    const player = board[rowCol.row][rowCol.col];
    let won = true;
    for (const idx of condition) {
      const { row, col } = idxToRowCol(idx);
      if (board[row][col] !== player) {
        won = false;
        break;
      }
    }
    if (won && player !== undefined) {
      return player;
    }
  }
  return undefined;
}

export function isBoardFull(board) {
  for (const row of board) {
    for (const cell of row) {
      if (cell === undefined) {
        return false;
      }
    }
  }
  return true;
}

export function cloneBoard(board) {
  const newBoard = [];
  for (const row of board) {
    newBoard.push(row.slice());
  }
  return newBoard;
}
