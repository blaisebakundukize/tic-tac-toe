import { Router } from "express";

import gameController from "./game.controller";
import { calculatePlayerMove, calculateComputerMove, convertGameBoardToArray } from "../../middleware";
import { validateBoard } from "./game.validations";

const gameRouter = Router();

gameRouter.get('/play', validateBoard, convertGameBoardToArray, calculatePlayerMove, calculateComputerMove, gameController.playWithComputer);

export { gameRouter };
