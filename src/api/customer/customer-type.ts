import { RequestHandler } from "express";
import { Model } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import {
  PaginationParams,
  PaginationParamsSerializer,
} from "../../util/types/paginationHelpers";

type CustomerAttributes = {
  uuid: string;
  name: string;
  cpf?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

type CustomerCreationAttributes = Optional<
  CustomerAttributes,
  "uuid" | "createdAt" | "updatedAt"
>;

type CustomerCreationRequest = {
  name: string;
  document: {
    cpf?: string;
    cnpj?: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
};

export type CustomerResponse = CustomerCreationRequest & {
  uuid: string;
  createdAt: string;
  updatedAt: string;
};

export abstract class CustomerModel extends Model<
  CustomerAttributes,
  CustomerCreationAttributes
> {}

// params
// response
// body
// query
// locals

export type CustomerCreationRequestHandler = RequestHandler<
  {},
  CustomerResponse,
  CustomerCreationRequest,
  {},
  {
    customerToCreate: CustomerCreationAttributes;
    customerCreated: CustomerAttributes;
    customerToRespond: CustomerResponse;
  }
>;

export type GetAllCustomerRequestHandler = RequestHandler<
  {},
  CustomerResponse[],
  {},
  PaginationParams,
  {
    paginationParamsSerializer: PaginationParamsSerializer;
    getCustomer: CustomerAttributes[];
    customersToRespond: CustomerResponse[];
  }
>;

export type GetCustomerRequestHandler = RequestHandler<
  { id: string },
  CustomerResponse,
  {},
  {},
  {
    getCustomer: CustomerAttributes | null;
    customerToRespond: CustomerResponse;
  }
>;
