import { CREATED, NOT_FOUND, OK } from "http-status";
import { persistCustomer, getCustomerByIdBusinees, getCustomerAllBusinees } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, getAllCustomersSerializer, getCustomerByidSerializer, paginationSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomersAllRequestHandler, GetCustomerByIdRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomersAllValidator, getCustomerByIdValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ];
};

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
};

const getCutomerById = (): GetCustomerByIdRequestHandler [] => {
    return [
        getCustomerByIdValidator(),
        getCustomerByIdBusinees,
        getCustomerByidSerializer,
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
    createCustomer, getCustomersAll, getCutomerById
};
