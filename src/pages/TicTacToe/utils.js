export function findWinner(board) {
  function idxToRowCol(idx) {
    return {
      row: Math.floor(idx / 3),
      col: idx % 3,
    };
  }
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
