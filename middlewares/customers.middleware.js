import { newCustomersSchema } from "../schemas/newCustomers.schema";
import db from "../database/db";

export async function validateCustomer(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await newCustomersSchema.validateAsync({
      name,
      phone,
      cpf,
      birthday,
    });
    next();
  } catch (err) {
    res.sendStatus(400);
  }
}

export async function validadeUniqueCustomer(req, res, next) {
  const { cpf } = req.body;

  try {
    const customer = await db.query("SELECT * FROM customers WHERE cpf = $1", [
      cpf,
    ]);
    if (customer.rows.length) {
      res.sendStatus(409);
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function setSearchQueryObject(req, res, next) {
  const { cpf } = req.query;
  const { id } = req.params;

  let where;
  const values = [];

  if (cpf) {
    where = "WHERE cpf ILIKE $1";
    values.push(`%${cpf}%`);
  }

  if (id) {
    where = "WHERE id = $1";
    values.push(id);
  }

  if (cpf && id) {
    return res.sendStatus(400);
  }

  const text = `SELECT * FROM customers ${where || ""}`;

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
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
}
