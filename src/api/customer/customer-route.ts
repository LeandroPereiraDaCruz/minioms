import { Router } from "express";
import {
  createCustomer,
  getCustomer,
  listCustomers,
} from "./customer-controller";

const route = Router();

route.post("/v1/customers", ...createCustomer());

route.get("/v1/customers", ...listCustomers());

route.get("/v1/customers/:customerUuid", ...getCustomer());

export default route;
