import { CREATED } from "http-status";
import { OK } from "http-status";
import { NOT_FOUND } from "http-status";
import { persistCustomer } from "./customer-business";
import { persistFindAllCustomers } from "./customer-business";
import { persistFindCustomers } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { findCustomersDeserializer } from "./customer-deserializer";
import { createCustomerSerializer } from "./customer-serializer";
import { findAllCustomerSerializer } from "./customer-serializer";
import { findCustomerSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler } from "./customer-type";
import { CustomersFindAllRequestHandler } from "./customer-type";
import { CustomersFindRequestHandler } from "./customer-type";
import { createCustomerValidator } from "./customer-validator";
import { findCustomerValidator } from "./customer-validator";

const createCustomer = (): CustomerCreationRequestHandler[] => {
    return [
        createCustomerValidator(),
        createCustomerDeserializer,
        persistCustomer,
        createCustomerSerializer,
        (req, res) => { res.status(CREATED).json(res.locals.customerToRespond) }
    ]
}

const findCustomers = (): CustomersFindRequestHandler[] => {
    return [
        findCustomerValidator(),
        findCustomersDeserializer,
        persistFindCustomers,
        findCustomerSerializer,
        (req, res) => { 
            if(res.locals.customerToRespond == undefined){
                res.status(NOT_FOUND).json(res.locals.customerFindError)
            } else {
                res.status(OK).json(res.locals.customerToRespond)
            }
        }
    ]
}

const findAllCustomers = (): CustomersFindAllRequestHandler[] => {
    return [
        persistFindAllCustomers,
        findAllCustomerSerializer,
        (req, res) => { 
            if(res.locals.customerToRespond == undefined){
                res.status(NOT_FOUND).json(res.locals.customerFindAllError)
            } else {
                res.status(OK).json(res.locals.customerToRespond)
            }
        }
    ]
}

export {
    createCustomer,
    findAllCustomers,
    findCustomers
};
