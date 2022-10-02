import db from "../database/db";
import { newGameSchema } from "../schemas/newGame.schema.js";

export async function validateGame(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await newGameSchema.validateAsync({
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    });
    next();
  } catch (err) {
    res.sendStatus(400);
  }
}

export async function validadeUniqueGame(req, res, next) {
  const { name, categoryId } = req.body;

  try {
    const game = await db.query("SELECT * FROM games WHERE name = $1", [name]);
    if (game.rows.length) {
      res.sendStatus(409);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }

  try {
    const game = await db.query('SELECT * FROM games WHERE "categoryId" = $1', [
      categoryId,
    ]);
    if (game.rowCount > 0) {
      res.sendStatus(409);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function setSearchQueryObject(req, res, next) {
  const { name } = req.query;

  const { orderQuery } = req.locals;

  const text = `SELECT games.*, categories.name as categoryName
  FROM categories 
  JOIN games ON games."categoryId" = categories.id
  WHERE games.name ILIKE $1 ${orderQuery}
  `;
  const values = [name ? `%${name}%` : "%"];

  res.locals.queryObject = { text, values };
  next();
}
