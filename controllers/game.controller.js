import db from "../database/db.js";

export async function getGames(req, res) {
  const { queryObject } = req.locals;

  try {

    const result = await db.query(queryObject);

    res.send(result.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    const game = await db.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.status(201).send(game.rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409);

    res.sendStatus(500);
  }
}
