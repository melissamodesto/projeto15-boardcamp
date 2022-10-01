import db from "../database/db";
import { newCategorySchema } from "../schemas/newCategory.schema";

export async function validateCategory(req, res, next) {
  const { name } = req.body;

  try {
    const category = await db.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );

    if (category.rows.length) {
      return res.sendStatus(409);
    }

    const { error } = newCategorySchema.validateAsync(req.body);

    if (error) {
      return res.sendStatus(400);
    }

    next();
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function validateUniqueCategory(req, res, next) {
  const { name } = req.body;

  try {
    const category = await db.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );

    if (category.rows.length) {
      return res.sendStatus(409);
    }

    next();
  } catch (err) {
    res.sendStatus(500);
  }
}
