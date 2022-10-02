import db from "../database/db";

export async function getCustomers(req, res) {
  const { queryObject } = res.locals;
  const result = await db.query(queryObject);
  res.send(result.rows);
}

export async function getCustomerById(req, res) {
  const { queryObject } = res.locals;
  const result = await db.query(queryObject);

  if (result.rows.length) {
    res.send(result.rows[0]);
  }

  res.sendStatus(404);
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customer = await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, phone, cpf, birthday]
    );
    res.status(201).send(customer.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function putCustomer(req, res) {
  const { queryObject } = res.locals;
  const result = await query(queryObject);

  if (result.rows.length) {
    return res.sendStatus(404);
  }

  res.sendStatus(200);
}
