import { Router } from "express";
import {
  validateCategory,
  validateUniqueCategory,
} from '../middlewares/categories.middleware.js';
import {
  getCategories,
  postCategory,
} from '../controllers/categories.controller.js';
import { setQueryOptionsFromQueryStrings } from '../middlewares/common.middleware.js';

const categoriesRouter = Router();

categoriesRouter.get("/categories", setQueryOptionsFromQueryStrings, getCategories);
categoriesRouter.post(
  "/categories",
  validateCategory,
  validateUniqueCategory,
  postCategory
);

export default categoriesRouter;
