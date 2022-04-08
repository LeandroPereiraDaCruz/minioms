import { CREATED, OK, NOT_FOUND } from "http-status";
import {
  findAllCustomers,
  findCustomer,
  persistCustomer,
} from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import {
  createCustomerSerializer,
  findCustomerSerializer,
  listCustomersSerializer,
} from "./customer-serializer";
import {
  CustomerCreationRequestHandler,
  CustomerFindOneRequestHandler,
  CustomerListAllRequestHandler,
} from "./customer-type";
import {
  createCustomerValidator,
  findCustomerValidator,
  listCustomersValidator,
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

const listCustomers = (): CustomerListAllRequestHandler[] => {
  return [
    listCustomersValidator(),
    findAllCustomers,
    listCustomersSerializer,
    (req, res) => {
      const records = res.locals.listOfAllCustomersToRespond;
      if (records.length === 0) {
        res.status(NOT_FOUND).json(records);
      } else {
        res.status(OK).json(records);
      }
    },
  ];
};

const getCustomer = (): CustomerFindOneRequestHandler[] => {
  return [
    findCustomerValidator(),
    findCustomer,
    findCustomerSerializer,
    (req, res) => {
      const records = res.locals.findCustomerToRespond;
      if (!records) {
        res.status(NOT_FOUND).json(records);
      } else {
        res.status(OK).json(records);
      }
    },
  ];
};

export { createCustomer, listCustomers, getCustomer };
