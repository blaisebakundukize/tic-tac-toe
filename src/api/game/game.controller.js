import createHttpError from "http-errors";

import { STATUS_CODES } from "../../constants"
import { jsonResponse } from "../../utils"

/**
 * Game controller class handles players' moves
 */
export class GameController {

  playWithComputer = (req, res, next) => {
    try {
      let result = req.gameResult;
      return jsonResponse({
        res,
        status: STATUS_CODES.OK,
        data: {
          ...result
        }
      });
    } catch (error) {
      return next(
        createHttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not continue the game due to internal error'
        )
      );
    }
  }
}

const gameController = new GameController();

export default gameController;
