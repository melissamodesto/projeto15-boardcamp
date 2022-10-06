import db from "../database/db.js";
import { newCategorySchema } from "../schemas/newCategory.schema.js";

export async function validateCategory(req, res, next) {

  try {
    await newCategorySchema.validateAsync(req.body);
  } catch (err) {
    res.sendStatus(500);
  }
  next();
}

export async function validateUniqueCategory(req, res, next) {
  const { name } = req.body;

  try {
    const category = await db.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );

    if (category.rowCount > 0) {
      return res.sendStatus(409);
    }

  } catch (err) {
    res.sendStatus(500);
  }
  next();
}
