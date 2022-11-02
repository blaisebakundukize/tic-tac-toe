export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const SYMBOLS = {
  PLAYER: 'X',
  COMPUTER: 'O',
  EMPTY: '',
};

export const GAME_STATE = {
  INCOMPLETE: 'INCOMPLETE',
  WON: 'GAME_WON',
  COMPUTER_WON: SYMBOLS.COMPUTER,
  PLAYER_WON: SYMBOLS.PLAYER,
  TIE: 'GAME_DRAW'
};

export const GAME_BOARD_LENGTH = 9;

const MAX_MOVES = 9;

export const POSSIBLE_WIN_MOVES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

