import db from "../database/db";

export async function getCategories(req, res) {
  try {
    const categories = await db.query("SELECT * FROM categories");
    res.send(categories.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postCategory(req, res) {
  const { name } = req.body;

  try {
    const category = await db.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).send(category.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
}
