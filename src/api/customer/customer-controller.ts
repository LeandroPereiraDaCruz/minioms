import { CREATED, FOUND } from "http-status";
import { persistCustomer } from "./customer-business";
import { createCustomerDeserializer, findAllIdCustomerDeserializer, findByIdCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, findAllCustomerSerializer, findByIdCustomerSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindByIdRequestHandler } from "./customer-type";
import { createCustomerValidator, findByIdCustomerValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

const findAllCustomer = (): CustomerFindAllRequestHandler[] => {
    return [
        findAllIdCustomerDeserializer,
        findAllCustomer,
        findAllCustomerSerializer,
        (req, res) => { res.status(FOUND).json(res.locals.customerToRespond) }
    ]
}

const findByIdCustomer = (): CustomerFindByIdRequestHandler[] => {
    return [
        findByIdCustomerValidator(),
        findByIdCustomerDeserializer,
        findByIdCustomer,
        findByIdCustomerSerializer,
        (req, res) => { res.status(FOUND).json(res.locals.customerToRespond) }
    ]
}

export {
    createCustomer,
    findAllCustomer,
    findByIdCustomer
};
