import { CREATED, NOT_FOUND, OK } from "http-status";
import { getCustomersBusiness, persistCustomer, getCustomerByUuidBusiness } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, getCustomerByUuidSerializer, getCustomersSerializer, paginationSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomerByUuidRequestHandler, GetCustomersRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomerByUuidValidator, getCustomersValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

const getCustomer = (): GetCustomersRequestHandler[] =>{
    return [
        getCustomersValidator(),
        paginationSerializer,
        getCustomersBusiness,
        getCustomersSerializer,
        (req, res) => {
            res.status(OK).json(res.locals.customerToRespond);
        },
    ]
}

const getCustomerUuid = (): GetCustomerByUuidRequestHandler[] =>{
    return [
        getCustomerByUuidValidator(),
        getCustomerByUuidBusiness,
        getCustomerByUuidSerializer,
        (req, res) => {
            if (!res.locals.customerToRespond) {
                res.status(NOT_FOUND).json(res.locals.customerToRespond);
            } else {
                res.status(OK).json(res.locals.customerToRespond);
            }
        },
    ];
}

export {
    createCustomer,
    getCustomer,
    getCustomerUuid
};
