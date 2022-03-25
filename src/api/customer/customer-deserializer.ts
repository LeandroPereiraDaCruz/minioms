import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindByIdRequestHandler } from "./customer-type";

const createCustomerDeserializer: CustomerCreationRequestHandler  = (req, res, next) => {
    res.locals.customerToCreate = {
        name: req.body.name,
        ...req.body.contact,
        ...req.body.document
    }
    next();
}

const findAllIdCustomerDeserializer: CustomerFindAllRequestHandler  = (req, res, next) => {
    res.locals.limit = req.params.limit;
    res.locals.offset = req.params.offset;
    next();
}

const findByIdCustomerDeserializer: CustomerFindByIdRequestHandler  = (req, res, next) => {
    res.locals.customerUuid = req.params.customerUuid;
    next();
}

export {
    findAllIdCustomerDeserializer,
    createCustomerDeserializer,
    findByIdCustomerDeserializer
}