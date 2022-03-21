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

// ---------------------------------------------------------------------------------------------------------------------- //

type CustomerError = {
    statusCode: number;
    error: string;
    message: string;
    validation: {
        params: {
            source: string;
            keys: Array<string>;
            message: string;
        }
    }
}

type CustomerFindAll = Array<CustomerAttributes>;

type CustomersFindAllResponse = Array<CustomerAttributes>

type CustomerFindAllQueryParms = {
    offset: string;
    limit: string;
}

export type CustomersFindAllRequestHandler = RequestHandler<
    {}, // path params
    CustomersFindAllResponse | CustomerError,  // response
    {}, // request
    CustomerFindAllQueryParms, // query params
    {
        customerToFindAll: CustomerFindAll,
        customerError: CustomerError,
        customerToRespond: CustomersFindAllResponse
    }
>

// ---------------------------------------------------------------------------------------------------------------------- //


;