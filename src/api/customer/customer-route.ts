import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomersById,
} from "./customer-controller";

const route = Router();

route.post("/v1/customers", ...createCustomer());
route.get("/v1/customers", ...getAllCustomers());
route.get("/v1/customers/:id", ...getCustomersById());

export default route;
