import { Router } from "express";
import {
  validateCategory,
  validateUniqueCategory,
} from "../middlewares/categories.middleware.js";
import {
  getCategories,
  postCategory,
} from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post(
  "/categories",
  validateCategory,
  validateUniqueCategory,
  postCategory
);

export default categoriesRouter;
