import { RequestHandler } from "express";
import { Model } from "sequelize-typescript";
import { Optional } from "sequelize/types";

export type CustomerAttributes = {
  uuid: string;
  name: string;
  cpf?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

type ListCustomerAttributes = CustomerAttributes[];

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

type CustomerResponse =
  | undefined
  | (CustomerCreationRequest & {
      uuid: string;
      createdAt: string;
      updatedAt: string;
    });

type CustomerListReponse = CustomerResponse[];

type CustomerListQueryParams = {
  offset?: string;
  limit?: string;
};

type CustomerFindOnePathParam = {
  customerUuid: string;
};

export abstract class CustomerModel extends Model<
  CustomerAttributes,
  CustomerCreationAttributes
> {}

export type CustomerCreationRequestHandler = RequestHandler<
  {}, // path params
  CustomerResponse, // response
  CustomerCreationRequest, // request
  {}, // query params
  {
    customerToCreate: CustomerCreationAttributes;
    customerCreated: CustomerAttributes;
    customerToRespond: CustomerResponse;
  }
>;

export type CustomerListAllRequestHandler = RequestHandler<
  {}, // path params
  CustomerListReponse, // response
  {}, // request
  CustomerListQueryParams, // query params
  {
    listOfAllCustomers: ListCustomerAttributes;
    listOfAllCustomersToRespond: CustomerListReponse;
  }
>;

export type CustomerFindOneRequestHandler = RequestHandler<
  CustomerFindOnePathParam, // path params
  CustomerResponse, // response
  {}, // request
  {}, // query params
  {
    findCustomer: CustomerAttributes;
    findCustomerToRespond: CustomerResponse;
  }
>;
