import db from "../database/db.js";

export async function getCustomers(req, res) {
  const { queryObject } = res.locals;

  try {
    const result = await db.query(queryObject);
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getCustomersById(req, res) {
  const { queryObject } = res.locals;
  
  try {
    const result = await db.query(queryObject);

    if (result.rowCount === 0) return res.sendStatus(404);

    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customer = await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    )
    res.status(201).send(customer.rows[0]);
  } catch (err) {

    if(err.code === '23505') return res.sendStatus(409);
    res.sendStatus(500);
  }
}

export async function putCustomer(req, res) {
  const { queryObject } = res.locals;
  try {
    const result = await db.query(queryObject);

    if (result.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
