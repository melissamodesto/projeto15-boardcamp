import { Router } from "express";
import {
  validateCustomer,
  validateUniqueCustomer,
  validateCpfConflictUpdate,
  setSearchQueryObject,
  setUpdateQueryObject,
} from "../middlewares/customer.middleware.js";

import {
  getCustomers,
  getCustomersById,
  postNewCustomer,
  putCustomer,
} from "../controllers/customer.controller.js";
import { setOrderQuery } from "../middlewares/common.middleware.js";

const customerRouter = Router();

customersRouter.get(
  "/customers",
  setOrderQuery,
  setSearchQueryObject,
  getCustomers
);
customerRouter.get("/customers/:id", getCustomersById);
customerRouter.post(
  "/customers",
  validateCustomer,
  validateUniqueCustomer,
  postNewCustomer
);
customerRouter.put(
  "/customers/:id",
  validateCustomer,
  validateCpfConflictUpdate,
  setUpdateQueryObject,
  putCustomer
);

export default customerRouter;
