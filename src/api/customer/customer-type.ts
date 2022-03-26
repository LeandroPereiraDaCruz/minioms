import { RequestHandler } from "express";
import { Model } from "sequelize-typescript"
import { Optional } from "sequelize/types"

type CustomerAttributes = {
    uuid: string;
    name: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

type CustomerCreationAttributes = Optional<CustomerAttributes, 'uuid' | 'createdAt' | 'updatedAt'>;

type CustomerCreationRequest = {
    name: string;
    document: {
        cpf?: string;
        cnpj?: string;
    },
    contact: {
        email: string;
        phone?: string;
    }
}

type CustomerResponse = CustomerCreationRequest & {
    uuid: string;
    createdAt: string;
    updatedAt: string;
}

type PaginationParams = {
    offset: string;
    limit: string;
};

export type PaginationParamsSerializer = {
    offset: number;
    limit: number;
};

export abstract class CustomerModel extends Model<CustomerAttributes, CustomerCreationAttributes>{};

export type CustomerCreationRequestHandler = RequestHandler<
    {}, // path params
    CustomerResponse, // response
    CustomerCreationRequest, // request
    {}, // query params
    {
        customerToCreate: CustomerCreationAttributes
        customerCreated: CustomerAttributes,
        customerToRespond: CustomerResponse
    }
>;

export type GetAllCustomerRequestHandler = RequestHandler<
  {}, // path params
  CustomerResponse[], // response
  {}, // request
  PaginationParams, // query params
  {
    paginationParamsSerializer: PaginationParamsSerializer;
    getCustomer: CustomerAttributes[];
    customersToRespond: CustomerResponse[];
  }
>;

export type GetCustomerByIdRequestHandler = RequestHandler<
  { id: string }, // path params
  CustomerResponse, // response
  {}, // request
  {}, // query params
  {
    getCustomer: CustomerAttributes | null;
    customerToRespond: CustomerResponse;
  }
>;