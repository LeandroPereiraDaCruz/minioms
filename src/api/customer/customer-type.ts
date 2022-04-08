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
>

type CustomerFindError = {
    statusCode: string;
    message: string;
}

type CustomersFindByPk = {
    uuid: string;
}

type CustomersFindRequest = {
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

type CustomersFindResponse = CustomersFindRequest & {
    uuid: string;
    createdAt: string;
    updatedAt: string;
}

export type CustomersFindRequestHandler = RequestHandler<
    CustomersFindByPk, // path params
    CustomersFindResponse | CustomerFindError,  // response
    CustomersFindRequest, // request
    {}, // query params
    {
        customerToPK: CustomersFindByPk
        customerFindError: CustomerFindError,
        customerFind: CustomerAttributes,
        customerToRespond: CustomersFindResponse
    }
>


type CustomerFindAll = Array<CustomerAttributes>;

type CustomersFindAllResponse = Array<CustomerAttributes>;

type CustomerFindAllError = {
    statusCode: string;
    message: string;
}

export type CustomersFindAllRequestHandler = RequestHandler<
    {}, // path params
    CustomersFindAllResponse | CustomerFindAllError,  // response
    {}, // request
    {}, // query params
    {
        customerToFindAll: CustomerFindAll,
        customerFindAllError: CustomerFindAllError,
        customerToRespond: CustomersFindAllResponse
    }
>
;