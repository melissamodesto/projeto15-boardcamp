import db from "../database/db.js";
import {newCategorySchema} from '../schemas/newCategory.schema.js';

export async function validateCategory(req, res, next) {

  try {
    await newCategorySchema.validateAsync(req.body);
  } catch (err) {
    res.sendStatus(400);
  }
  next();
}

export async function validateUniqueCategory(req, res, next) {

  try {
    const category = await db.query(
      `SELECT * FROM categories WHERE name = '${req.body.name}'`      
    );

    if (category.rowCount > 0) {
      return res.sendStatus(409);
    }

  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}
