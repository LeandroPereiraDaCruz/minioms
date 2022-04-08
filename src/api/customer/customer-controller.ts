import { CREATED, NOT_FOUND, OK } from "http-status";
import { persistCustomer, listBaseCustomerById, listAllBaseCustomers } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, paginationSerializer, listAllCustomersSerializer, listCustomerByidSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, ListAllCustomersRequestHandler, ListCustomerByIdRequestHandler } from "./customer-type";
import { createCustomerValidator, listCustomerByIdValidator, listAllCustomersValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

const listAllCustomers = (): ListAllCustomersRequestHandler [] => {
    return [
        listAllCustomersValidator(),
        paginationSerializer,
        listAllBaseCustomers,
        listAllCustomersSerializer,
        (req, res) => {
            res.status(OK).json(res.locals.customerToRespond);
        },
    ];
}

const listCustomerById = (): ListCustomerByIdRequestHandler [] => {
    return [
        listCustomerByIdValidator(),
        listBaseCustomerById,
        listCustomerByidSerializer,
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
    createCustomer, listAllCustomers, listCustomerById
};
