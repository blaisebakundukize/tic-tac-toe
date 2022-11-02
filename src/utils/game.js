import { GAME_BOARD_LENGTH, RESULT, SYMBOLS, MAX_MOVES, GAME_STATE, POSSIBLE_WIN_MOVES } from '../constants';

export const createEmptyGameBoard = () => {
  return Array(GAME_BOARD_LENGTH).fill("");
};

/**
 * Add a player sign to a board
 * @param {*} gameBoard 
 * @param {*} symbol 
 * @param {*} index 
 * @returns 
 */
export const addSignOnBoard = (gameBoard, symbol, index) => {
  let firstPartOfBoard = gameBoard.substr(0, index);
  let lastPartOfBoard = gameBoard.substr(index + 1);

  let newBoard = firstPartOfBoard + symbol + lastPartOfBoard;
  return newBoard;
}

/**
 * Count number of Moves in the game board
 * @param {string} gameBoard e.g., 'XOX   O  '
 * @returns number
 */
export const countGameBoardMoves = (gameBoard = '') => {
  return [...gameBoard].filter(c => c === SYMBOLS.COMPUTER || c === SYMBOLS.PLAYER).length;
}

export const isDraw = (moveCount) => {
  return moveCount === MAX_MOVES;
};

export const checkResult = (gameBoard, moveCount) => {

  const board = gameBoard.map(symbol => {
    if (symbol === "") return " ";
    return symbol
  }).join("");

  if (isDraw(moveCount)) return {
    gameState: GAME_STATE.TIE,
    board
  }

  for (let i = 0; i < POSSIBLE_WIN_MOVES.length; i++) {
    const [x, w, z] = POSSIBLE_WIN_MOVES[i];

    console.log(POSSIBLE_WIN_MOVES[i]);
    console.log(x, w, z);
    console.log(gameBoard[x]);


    if (gameBoard[x] === SYMBOLS.EMPTY &&
      gameBoard[w] === SYMBOLS.EMPTY &&
      gameBoard[z] === SYMBOLS.EMPTY) {
      continue;
    }

    if (gameBoard[x] === gameBoard[w] && gameBoard[x] === gameBoard[z]) {
      let winner = SYMBOLS.COMPUTER;

      if (gameBoard[x] === SYMBOLS.PLAYER) {
        winner = SYMBOLS.PLAYER;
      }

      return {
        gameState: GAME_STATE.WON,
        winner,
        board,
        winSpaces: [x, w, z]
      };
    }
  }
  return {
    gameState: GAME_STATE.INCOMPLETE,
    board
  };
}

// Calculate the best move for the computer to fill
export const calculateComputerTurn = (gameBoard, moveCount) => {
  let computerSpace = canWin(gameBoard, SYMBOLS.COMPUTER);
  console.log('passed Can Win')

  // Computer is winning
  if (Number.isInteger(computerSpace)) return computerSpace;

  // Computer is blocking
  computerSpace = canWin(gameBoard, SYMBOLS.PLAYER)
  console.log(gameBoard);
  if (Number.isInteger(computerSpace)) return computerSpace;
  console.log('passed Can Win')

  // Computer is blocking fork
  computerSpace = canBlockFork(gameBoard, moveCount);
  if (Number.isInteger(computerSpace)) return computerSpace;

  console.log('passed Can block fork')

  // Computer can center
  computerSpace = canFillCenter(gameBoard);
  if (Number.isInteger(computerSpace)) return computerSpace;

  console.log('passed Can fill center')

  // Computer can fill opposite Corner
  computerSpace = canFillOppositeCorner(gameBoard);
  if (Number.isInteger(computerSpace)) return computerSpace;

  console.log('passed Can fill opposite corner')

  // Computer can fill empty corner
  computerSpace = canFillEmptyCorner(gameBoard);
  if (Number.isInteger(computerSpace)) return computerSpace;

  console.log('passed Can fill empty corner')

  // Computer can fill empty side
  computerSpace = canFillEmptySide(gameBoard);
  if (Number.isInteger(computerSpace)) return computerSpace;

  console.log('passed Can fill empty side')

  return null;
}

export const convertCordToGridBoardIndex = (row, col) => {
  return row * 3 + col;
};

const rowGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;
  // console.log('row get third index to win', gameBoard)
  // Check rows
  for (let i = 0; i < 3; i++) {
    count = 0;

    for (let j = 0; j < 3; j++) {
      if (gameBoard[convertCordToGridBoardIndex(i, j)] === symbol) {
        count++;
      } else if (gameBoard[convertCordToGridBoardIndex(i, j)] === SYMBOLS.EMPTY) {
        // console.log('row get third index to win', gameBoard)
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

  // console.log('row get third index to win', gameBoard)

  return nextIndexToWin;
}

const columnGetThirdIndexToWin = (gameBoard, symbol) => {
  let count = 0, nextIndexToWin = null;
  let row, col;

  // Check rows
  for (let i = 0; i < 3; i++) {
    count = 0;

    for (let j = 0; j < 3; j++) {
      if (gameBoard[convertCordToGridBoardIndex(j, i)] === symbol) {
        count++;
      } else if (gameBoard[convertCordToGridBoardIndex(j, i)] === SYMBOLS.EMPTY) {
        row = i;
        col = j;
      } else {
        count--;
      }
    }

    console.log("Row Col: ", row, col, symbol);

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
  console.log('Col third index to win: ', columnThirdIndexToWin)
  if (columnThirdIndexToWin) return columnThirdIndexToWin;

  // check left diag
  const leftDiagThirdIndexToWin = leftDiagGetThirdIndexToWin(gameBoard, symbol);
  console.log('left third index to win: ', leftDiagThirdIndexToWin)
  if (leftDiagThirdIndexToWin) return leftDiagThirdIndexToWin;

  // check right diag
  const rightDiagThirdIndexToWin = rightDiagGetThirdIndexToWin(gameBoard, symbol);
  if (rightDiagThirdIndexToWin) return rightDiagThirdIndexToWin;

  return null;
}


const canBlockFork = (gameBoard, moveCount) => {
  if (moveCount === 3) {
    if (
      gameBoard[convertCordToGridBoardIndex(0, 0)] === SYMBOLS.PLAYER &&
      gameBoard[convertCordToGridBoardIndex(1, 1)] === SYMBOLS.COMPUTER &&
      gameBoard[convertCordToGridBoardIndex(2, 2)] === SYMBOLS.PLAYER
    ) {
      return canFillEmptySide(gameBoard);
    }

    if (
      gameBoard[convertCordToGridBoardIndex(2, 0)] === SYMBOLS.PLAYER &&
      gameBoard[convertCordToGridBoardIndex(1, 1)] === SYMBOLS.COMPUTER &&
      gameBoard[convertCordToGridBoardIndex(0, 2)] === SYMBOLS.PLAYER
    ) {
      return canFillEmptySide(gameBoard);
    }

    if (
      gameBoard[convertCordToGridBoardIndex(1, 2)] === SYMBOLS.PLAYER &&
      gameBoard[convertCordToGridBoardIndex(2, 1)] === SYMBOLS.PLAYER
    ) {
      return convertCordToGridBoardIndex(2, 2);
    }
  }
  return null;
}

function canFillCenter(gameBoard) {
  if (gameBoard[convertCordToGridBoardIndex(1, 1)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(1, 1);
  }
  return false;
}

function canFillEmptySide(gameBoard) {
  if (gameBoard[convertCordToGridBoardIndex(0, 1)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(0, 1);
  }

  if (gameBoard[convertCordToGridBoardIndex(1, 0)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(1, 0);
  }

  if (gameBoard[convertCordToGridBoardIndex(1, 2)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(1, 2);
  }

  if (gameBoard[convertCordToGridBoardIndex(2, 1)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(2, 1);
  }

  return null;
}

function canFillEmptyCorner(gameBoard) {
  if (gameBoard[convertCordToGridBoardIndex(0, 0)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(0, 0);
  }

  if (gameBoard[convertCordToGridBoardIndex(0, 2)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(0, 2);
  }

  if (gameBoard[convertCordToGridBoardIndex(2, 0)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(2, 0);
  }

  if (gameBoard[convertCordToGridBoardIndex(2, 2)] === SYMBOLS.EMPTY) {
    return convertCordToGridBoardIndex(2, 2);
  }

  return null;
}

function canFillOppositeCorner(gameBoard) {
  if (
    gameBoard[convertCordToGridBoardIndex(0, 0)] === SYMBOLS.PLAYER &&
    gameBoard[convertCordToGridBoardIndex(2, 2)] === SYMBOLS.EMPTY
  ) {
    return convertCordToGridBoardIndex(2, 2);
  }

  if (
    gameBoard[convertCordToGridBoardIndex(2, 2)] === SYMBOLS.PLAYER &&
    gameBoard[convertCordToGridBoardIndex(0, 0)] === SYMBOLS.EMPTY
  ) {
    return convertCordToGridBoardIndex(0, 0);
  }

  if (
    gameBoard[convertCordToGridBoardIndex(0, 2)] === SYMBOLS.PLAYER &&
    gameBoard[convertCordToGridBoardIndex(2, 0)] === SYMBOLS.EMPTY
  ) {
    return convertCordToGridBoardIndex(2, 0);
  }

  if (
    gameBoard[convertCordToGridBoardIndex(2, 0)] === SYMBOLS.PLAYER &&
    gameBoard[convertCordToGridBoardIndex(0, 2)] === SYMBOLS.EMPTY
  ) {
    return convertCordToGridBoardIndex(0, 2);
  }

  return null;
}