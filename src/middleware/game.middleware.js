import { GAME_STATE, SYMBOLS } from "../constants";
import { countGameBoardMoves, checkResult, calculateComputerTurn, createEmptyGameBoard } from "../utils"

/**
 * Middleware to calculate player result after playing
 * @param {object} req expect board property in query 
 * @param {*} res 
 * @param {*} next 
 */
export const calculatePlayerMove = (req, res, next) => {
  const { board } = req.query;

  if (board) {
    const countedMoves = countGameBoardMoves(board);

    const result = checkResult(board, countedMoves);

    console.log(result)

    req.gameResult = result;
  }

  next();
};

/**
 * Middleware to calculate computer move
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const calculateComputerMove = (req, res, next) => {
  let { board } = req.query;
  let gameResult = req.gameResult;

  let isComputerMadeFirstMove = false;
  const countedMoves = countGameBoardMoves(board) || 0;
  // Computer starts the game if no board
  if (!board) {
    board = createEmptyGameBoard();
    isComputerMadeFirstMove = true;
  }
  console.log('board after player: ', board)
  if (gameResult && gameResult.gameState === GAME_STATE.INCOMPLETE || isComputerMadeFirstMove) {
    // console.log('countedMoves: ', gameResult)
    const computerSpace = calculateComputerTurn(board, countedMoves);
    board[computerSpace] = SYMBOLS.COMPUTER;

    console.log('board: ', board, isComputerMadeFirstMove, countedMoves, 'index space: ', computerSpace)

    // if (isComputerMadeFirstMove) {
    //   req.query.board = board;
    //   req.isComputerMadeFirstMove = isComputerMadeFirstMove;
    // }
    // check result after computer plays
    const result = checkResult(board, countedMoves);
    req.gameResult = result;
  }

  next();
}

/**
 * Middleware to convert the board from string to an array
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const convertGameBoardToArray = (req, res, next) => {
  let { board } = req.query;
  if (board) {
    board = [...board].map(symbol => symbol.trim());
    console.log("converted board: ", board);
    req.query.board = board;
    next();
  }
  next();
}