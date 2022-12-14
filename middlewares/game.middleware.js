import db from '../database/db.js';
import { newGameSchema } from '../schemas/newGame.schema.js';

export async function validateGame(req, res, next) {

  try {
    await newGameSchema.validateAsync(req.body)
  } catch (err) {
    res.sendStatus(400);
  }
  next();
}

export async function validateUniqueGame(req, res, next) {
  const { name, categoryId } = req.body;

  try {
    const game = await db.query(`SELECT * FROM categories WHERE id = ${categoryId}`);
    
    if (game.rowCount === 0) {
      return res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(500);
  }

  try {
    const game = await db.query(`SELECT * FROM games WHERE name = '${name}'`);
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
