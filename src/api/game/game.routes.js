import { Router } from "express";

import gameController from "./game.controller";
import { calculatePlayerMove, calculateComputerMove, convertGameBoardToArray } from "../../middleware";

const gameRouter = Router();

gameRouter.get('/play', convertGameBoardToArray, calculatePlayerMove, calculateComputerMove, gameController.playWithComputer);

export { gameRouter };
