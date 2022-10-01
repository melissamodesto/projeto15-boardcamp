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
    if (game.rows.length) {
      res.sendStatus(409);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
}
