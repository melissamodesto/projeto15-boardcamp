import { Router } from "express";
import {
  validateCategory,
  validateUniqueCategory,
} from "../middlewares/categories.middleware.js";
import {
  getCategories,
  postCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.post(
  "/categories",
  validateCategory,
  validateUniqueCategory,
  postCategory
);

export default router;
