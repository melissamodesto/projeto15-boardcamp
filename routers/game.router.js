import { Router } from "express";
import {
  validateGame,
  validateUniqueGame,
} from "../middlewares/game.middleware.js";

import { getGames, postGame } from "../controllers/game.controller.js";

const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.post("/", validateGame, validateUniqueGame, postGame);

export default gameRouter;
