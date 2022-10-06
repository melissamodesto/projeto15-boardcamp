import { Router } from "express";
import {
  validateGame,
  validateUniqueGame,
  setSearchQueryObject,
} from '../middlewares/game.middleware.js';
import { setQueryOptionsFromQueryStrings } from '../middlewares/common.middleware.js';

import { getGames, postGame } from '../controllers/game.controller.js';

const gameRouter = Router();

gameRouter.get("/games", setQueryOptionsFromQueryStrings, setSearchQueryObject, getGames);
gameRouter.post("/games", validateGame, validateUniqueGame, postGame);

export default gameRouter;
