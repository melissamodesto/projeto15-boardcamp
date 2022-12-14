import db from '../database/db.js';

export async function getCategories(req, res) {

  const { queryOptions } = res.locals;
  
  const text = `SELECT * FROM categories ${queryOptions}`;

  try {
    const result = await db.query(text);
    res.send(result.rows);

  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postCategory(req, res) {
  const { name } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO categories (name) VALUES ($1)`,
      [name]
    );
    res.sendStatus(201);
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409);

    res.sendStatus(500);
  }
}
