import { CREATED, NOT_FOUND, OK } from "http-status";
import {
  getAllCustomersBusiness,
  getCustomerById,
  persistCustomer,
} from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import {
  createCustomerSerializer,
  getAllCustomersSerializer,
  getCustomerSerializer,
  paginationSerializer,
} from "./customer-serializer";
import {
  CustomerCreationRequestHandler,
  GetAllCustomerRequestHandler,
  GetCustomerRequestHandler,
} from "./customer-type";
import {
  createCustomerValidator,
  getAllCustomersValidator,
  getCustomerValidator,
} from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
  return [
    createCustomerValidator(),
    createCustomerDeserializer,
    persistCustomer,
    createCustomerSerializer,
    (req, res) => {
      res.status(CREATED).json(res.locals.customerToRespond);
    },
  ];
};

const getAllCustomers = (): GetAllCustomerRequestHandler[] => {
  return [
    getAllCustomersValidator(),
    paginationSerializer,
    getAllCustomersBusiness,
    getAllCustomersSerializer,
    (req, res) => {
      res.status(OK).json(res.locals.customersToRespond);
    },
  ];
};

const getCustomersById = (): GetCustomerRequestHandler[] => {
  return [
    getCustomerValidator(),
    getCustomerById,
    getCustomerSerializer,
    (req, res) => {
      if (!res.locals.customerToRespond) {
        res.status(NOT_FOUND).json(res.locals.customerToRespond);
      } else {
        res.status(OK).json(res.locals.customerToRespond);
      }
    },
  ];
};

export { createCustomer, getAllCustomers, getCustomersById };
