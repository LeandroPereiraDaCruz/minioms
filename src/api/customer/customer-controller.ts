import { CREATED, OK } from "http-status";
import { getCustomersBusiness, persistCustomer } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, getCustomersSerializer, paginationSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomersRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomersValidator } from "./customer-validator";

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

export {
    createCustomer,
    getCustomer
};
