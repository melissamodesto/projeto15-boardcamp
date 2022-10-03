import db from "../database/db";
import { newGameSchema } from "../schemas/newGame.schema.js";

export async function validateGame(req, res, next) {

  try {
    await newGameSchema.validateAsync(req.body)
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
    }
  } catch (err) {
    res.sendStatus(500);
  }
  next();
}

export async function setSearchQueryObject(req, res, next) {
  const { name } = req.query;

  const { queryOptions } = req.locals;

  const text = `SELECT 
  games.*, 
  categories.name as categoryName, 
  count(rentals."rentDate") as "rentalsCount"
  FROM categories 
  JOIN games ON games."categoryId" = categories.id
  LEFT JOIN rentals on rentals."gameId" = games.id
  WHERE games.name ILIKE $1
  group by games.id, categories.name
  ${queryOptions}`

  const values = [name ? `%${name}%` : "%"];

  res.locals.queryObject = { text, values };
  next();
}
