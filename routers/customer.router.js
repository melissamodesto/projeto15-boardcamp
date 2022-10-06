import { Router } from "express";
import {
  validateCustomer,
  validateUniqueCustomer,
  validateCpfConflictUpdate,
  setSearchQueryObject,
  setUpdateQueryObject,
} from '../middlewares/customers.middleware.js';

import {
  getCustomers,
  getCustomersById,
  postCustomer,
  putCustomer,
} from "../controllers/customer.controller.js";
import { setQueryOptionsFromQueryStrings } from '../middlewares/common.middleware.js';

const customerRouter = Router();

customerRouter.get(
  "/customers",
  setQueryOptionsFromQueryStrings,
  setSearchQueryObject,
  getCustomers
);
customerRouter.get("/customers/:id", setQueryOptionsFromQueryStrings, setSearchQueryObject, getCustomersById);
customerRouter.post(
  "/customers",
  validateCustomer,
  validateUniqueCustomer,
  postCustomer
);
customerRouter.put(
  "/customers/:id",
  validateCustomer,
  validateCpfConflictUpdate,
  setUpdateQueryObject,
  putCustomer
);

export default customerRouter;
