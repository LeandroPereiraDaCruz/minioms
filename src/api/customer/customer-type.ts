import { RequestHandler } from "express";
import { Model } from "sequelize-typescript"
import { Optional } from "sequelize/types"
import { PaginationParams, PaginationParamsSerializer } from "../../util/paginationHelpers";

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

export type GetCustomersAllRequestHandler = RequestHandler<
    {},
    CustomerResponse[],
    {},
    PaginationParams,
    {
        paginationParamsSerializer: PaginationParamsSerializer;
        getCustomer: CustomerAttributes[];
        customerToRespond: CustomerResponse[];      
    }
>;

export type GetCustomerByIdRequestHandler = RequestHandler<
    { id: string },
    CustomerResponse,
    {},
    {},
    {
        getCustomer: CustomerAttributes | null;
        customerToRespond: CustomerResponse;
    }
>;