import { CREATED, NOT_FOUND, OK } from "http-status";
import { getCustomerAllBusiness, getCustomerByIdBusiness, persistCustomer } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, getAllCustomersSerializer, getCustomerByIdSerializer, paginationSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomerByIdRequestHandler, GetCustomersAllRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomerByIdValidator, getCustomersAllValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}


const getCustomersAll = (): GetCustomersAllRequestHandler [] => {
    return [
        getCustomersAllValidator(),
        paginationSerializer,
        getCustomerAllBusiness,
        getAllCustomersSerializer,
        (req, res) => {
            res.status(OK).json(res.locals.customerToRespond);
        },
    ];
};

const getCustomerById = (): GetCustomerByIdRequestHandler [] => {
    return [
        getCustomerByIdValidator(),
        getCustomerByIdBusiness,
        getCustomerByIdSerializer,
        (req, res) => {
            if (!res.locals.customerToRespond) {
                res.status(NOT_FOUND).json(res.locals.customerToRespond);
            } else {
                res.status(OK).json(res.locals.customerToRespond);
            }
        },
    ];
};

export {
    createCustomer,
    getCustomersAll,
    getCustomerById
}
