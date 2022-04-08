import { NextFunction, Request, Response } from "express";
import {
  CustomerCreationRequestHandler,
  CustomerFindOneRequestHandler,
  CustomerListAllRequestHandler,
  CustomerAttributes,
} from "./customer-type";

const createCustomerSerializer: CustomerCreationRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customerCreated } = res.locals;
  res.locals.customerToRespond = {
    uuid: customerCreated.uuid,
    name: customerCreated.name,
    contact: {
      email: customerCreated.email,
      phone: customerCreated.phone,
    },
    document: {
      cpf: customerCreated.cpf,
      cnpj: customerCreated.cnpj,
    },
    createdAt: customerCreated.createdAt.toISOString(),
    updatedAt: customerCreated.updatedAt.toISOString(),
  };
  next();
};

const listCustomersSerializer: CustomerListAllRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { listOfAllCustomers } = res.locals;
  res.locals.listOfAllCustomersToRespond = listOfAllCustomers.map(
    (customer: CustomerAttributes) => ({
      uuid: customer.uuid,
      name: customer.name,
      contact: {
        email: customer.email,
        phone: customer.phone,
      },
      document: {
        cpf: customer.cpf,
        cnpj: customer.cnpj,
      },
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString(),
    })
  );
  next();
};

const findCustomerSerializer: CustomerFindOneRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { findCustomer } = res.locals;
  res.locals.findCustomerToRespond = findCustomer
    ? {
        uuid: findCustomer.uuid,
        name: findCustomer.name,
        contact: {
          email: findCustomer.email,
          phone: findCustomer.phone,
        },
        document: {
          cpf: findCustomer.cpf,
          cnpj: findCustomer.cnpj,
        },
        createdAt: findCustomer.createdAt.toISOString(),
        updatedAt: findCustomer.updatedAt.toISOString(),
      }
    : null;
  next();
};

export {
  createCustomerSerializer,
  listCustomersSerializer,
  findCustomerSerializer,
};
