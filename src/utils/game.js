import { GAME_BOARD_LENGTH, RESULT, SYMBOLS } from '../constants';

export const createEmptyGameBoard = () => {
  return Array(GAME_BOARD_LENGTH).fill("");
};

export const convertCordToGridBoardIndex = (row, col) => {
  return row * 3 + col;
};

const rowGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;

  // Check rows
  for (let i = 0; i < 3; i++) {
    count = 0;

    for (let j = 0; j < 3; j++) {
      if (gameBoard(convertCordToGridBoardIndex(i, j)) === symbol) {
        count++;
      } else if (gameBoard(convertCordToGridBoardIndex(i, j)) === SYMBOLS.EMPTY) {
        row = i;
        col = j;
      } else {
        count--;
      }
    }

    // Third index to win if has two consecutive symbols on a row
    if (count === 2) {
      nextIndexToWin = convertCordToGridBoardIndex(row, col);
      return nextIndexToWin;
    }
  }

  return nextIndexToWin;
}

const columnGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;

  // Check rows
  for (let i = 0; i < 3; i++) {
    count = 0;

    for (let j = 0; j < 3; j++) {
      if (gameBoard(convertCordToGridBoardIndex(j, i)) === symbol) {
        count++;
      } else if (gameBoard(convertCordToGridBoardIndex(j, i)) === SYMBOLS.EMPTY) {
        row = i;
        col = j;
      } else {
        count--;
      }
    }

    // Third index to win if has two consecutive symbols on column
    if (count === 2) {
      nextIndexToWin = convertCordToGridBoardIndex(row, col);
      return nextIndexToWin;
    }
  }

  return nextIndexToWin;
}


const leftDiagGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;

  for (let i = 0; i < 3; ++i) {
    if (gameBoard[convertCordToGridBoardIndex(i, i)] === symbol) {
      count++;
    } else if (gameBoard[convertCordToGridBoardIndex(i, i)] === SYMBOLS.EMPTY) {
      row = i;
      col = i;
    } else {
      count--;
    }
  }

  // Third index to win if has two consecutive symbols on the left diagonal
  if (count === 2) {
    nextIndexToWin = convertCordToGridBoardIndex(row, col);
    return nextIndexToWin;
  }

  return nextIndexToWin;
}

const rightDiagGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;

  for (let i = 0; i < 3; ++i) {
    if (gameBoard[convertCordToGridBoardIndex(i, 3 - 1 - i)] === symbol) {
      count++;
    } else if (gameBoard[convertCordToGridBoardIndex(i, 3 - 1 - i)] === SYMBOLS.EMPTY) {
      row = i;
      col = 3 - 1 - i;
    } else {
      count--;
    }
  }

  // Third index to win if has two consecutive symbols on the right diagonal
  if (count === 2) {
    nextIndexToWin = convertCordToGridBoardIndex(row, col);
    return nextIndexToWin;
  }

  return nextIndexToWin;
}



const canWin = (gameBoard, symbol) => {
  // check rows
  const rowThirdIndexToWin = rowGetThirdIndexToWin(gameBoard, symbol)
  if (rowThirdIndexToWin) return rowThirdIndexToWin;

  // Check cols
  const columnThirdIndexToWin = columnGetThirdIndexToWin(gameBoard, symbol)
  if (columnThirdIndexToWin) return columnThirdIndexToWin;

  // check left diag
  const leftDiagThirdIndexToWin = leftDiagGetThirdIndexToWin(gameBoard, symbol);
  if (leftDiagThirdIndexToWin) return leftDiagThirdIndexToWin;

  // check right diag
  const rightDiagThirdIndexToWin = rightDiagGetThirdIndexToWin(gameBoard, symbol);
  if (rightDiagThirdIndexToWin) return rightDiagThirdIndexToWin;

  return null;
}

