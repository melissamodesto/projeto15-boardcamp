import { Router } from "express";
import {
  validateRentalData,
  validateExistingCostumerAndGame,
  validateAvailableGame,
  setSearchQueryObject,
  validateExistingRental,
} from '../middlewares/rental.middleware.js';

import {
  getRentals,
  postNewRental,
  setRentalAsFinished,
  deleteRental,
} from '../controllers/rental.controller.js';

import { setQueryOptionsFromQueryStrings } from '../middlewares/common.middleware.js';

const rentalsRouter = Router();

rentalsRouter.get("/rentals", setQueryOptionsFromQueryStrings, setSearchQueryObject, getRentals);
rentalsRouter.post(
  "/rentals",
  validateRentalData,
  validateExistingCostumerAndGame,
  validateAvailableGame,
  postNewRental
);
rentalsRouter.post(
  "/rentals/:id/return",
  validateExistingRental,
  setRentalAsFinished
);
rentalsRouter.delete("/rentals/:id", validateExistingRental, deleteRental);

export default rentalsRouter;
