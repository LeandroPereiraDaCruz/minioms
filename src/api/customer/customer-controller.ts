import { CREATED, OK } from "http-status";
import { getCustomerAllBusiness, persistCustomer } from "./customer-business";
import { createCustomerDeserializer } from "./customer-deserializer";
import { createCustomerSerializer, getAllCustomersSerializer, paginationSerializer } from "./customer-serializer";
import { CustomerCreationRequestHandler, GetCustomersAllRequestHandler } from "./customer-type";
import { createCustomerValidator, getCustomersAllValidator } from "./customer-validator";

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

export {
    createCustomer,
    getCustomersAll
}
