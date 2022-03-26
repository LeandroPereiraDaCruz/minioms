import { CREATED, OK, NOT_FOUND } from "http-status";
import { persistCustomer, getCustomerAllBusinees, getCustomerByIdBusiness } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, paginationSerializer, getAllCustomersSerializer, getCustomerByIdSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomersAllRequestHandler, GetCustomerByIdRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomersAllValidator, getCustomerByIdValidator } from "./customer-validator";

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
        getCustomerAllBusinees,
        getAllCustomersSerializer,
        (req, res) => {
            res.status(OK).json(res.locals.customerToRespond);
        },
    ];
}

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
}

export {
    createCustomer,
    getCustomersAll,
    getCustomerById
};
