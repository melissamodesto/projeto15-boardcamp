import { newCustomersSchema } from '../schemas/newCustomers.schema.js';
import db from "../database/db.js";

export async function validateCustomer(req, res, next) {

  try {
    await newCustomersSchema.validateAsync(req.body);
  } catch (err) {
    res.sendStatus(400);
  }
  next();
}

export async function validadeUniqueCustomer(req, res, next) {
  const { cpf } = req.body;

  try {
    const customer = await db.query("SELECT * FROM customers WHERE cpf = $1", [
      cpf,
    ]);
    if (customer.rowCount > 0) {
      res.sendStatus(409);
    } else {
    }
  } catch (err) {
    res.sendStatus(500);
  }
  next();
}

export async function setSearchQueryObject(req, res, next) {
  const { cpf } = req.query;
  const { id } = req.params;

  const { queryOptions } = res.locals;
  let where = "";
  const values = [];

  if (cpf) {
    where = "WHERE customers.cpf ILIKE $1";
    values.push(`%${cpf}%`);
  }

  if (id) {
    where = "WHERE customers.id = $1";
    values.push(id);
  }

  if (cpf && id) {
    return res.sendStatus(400);
  }

  const text = `SELECT customers.*,
  count(rentals."rentDate") as "rentalsCount"
  FROM customers
  LEFT JOIN rentals on rentals."customerId" = customers.id
  ${where}
  GROUP BY customers.id
  ${queryOptions}`

  res.locals.queryObject = { text, values };
  next();
}

export async function setUpdateQueryObject(req, res, next) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const text = `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5 RETURNING *`;

  const values = [name, phone, cpf, birthday, id];

  res.locals.queryObject = { text, values };
  next();
}

export async function validateCpfConflictUpdate(req, res, next) {
  const { id } = req.params;
  const { cpf } = req.body;

  try {
    const customer = await db.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id != $2",
      [cpf, id]
    );
    if (customer.rowCount > 0) {
      res.sendStatus(409);
    } else {
    }
  } catch (err) {
    res.sendStatus(500);
  }
  next();
}
