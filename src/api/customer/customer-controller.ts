import { CREATED, NOT_FOUND, OK } from "http-status";
import { persistCustomer, persistFindAllCustomers } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, findAllCustomerSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, CustomersFindAllRequestHandler } from "./customer-type";
import { createCustomerValidator, findAllCustomerValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

const findAllCustomers = (): CustomersFindAllRequestHandler[] => {
    return [
        findAllCustomerValidator(),
        persistFindAllCustomers,
        findAllCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

export {
    createCustomer,findAllCustomers,
};
