import { CREATED, OK, NOT_FOUND } from "http-status";
import { persistCustomer, persistFindAllCustomers, persistFindCustomers } from "./customer-business";
import { createCustomerDeserializer, findCustomersDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, findAllCustomerSerializer, findCustomerSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, CustomersFindAllRequestHandler, CustomersFindRequestHandler} from "./customer-type";
import { createCustomerValidator, findAllCustomerValidator, findCustomerValidator } from "./customer-validator";

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
        (req, res) => { 
            if(res.locals.customerToRespond == undefined){
                res.status(NOT_FOUND).json(res.locals.customerError)
            } else {
                res.status(OK).json(res.locals.customerToRespond)
            }
        }
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
                res.status(NOT_FOUND).json(res.locals.customerError)
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
