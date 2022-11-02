import { Router } from "express";

import { gameRouter } from "../game/game.routes";

const v1Router = Router();

v1Router.use('/game', gameRouter);

export { v1Router };
