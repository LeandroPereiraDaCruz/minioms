import { CustomerCreationRequestHandler } from "./customer-type";
import { CustomersFindRequestHandler } from "./customer-type";

const createCustomerDeserializer: CustomerCreationRequestHandler  = (req, res, next) => {
    res.locals.customerToCreate = {
        name: req.body.name,
        ...req.body.contact,
        ...req.body.document
    }
    next();
}


const findCustomersDeserializer: CustomersFindRequestHandler  = (req, res, next) => {
    res.locals.customerToPK = {uuid: req.params.uuid}
    next();
}

export {
    createCustomerDeserializer,
    findCustomersDeserializer
}