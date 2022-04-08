import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler } from "./customer-type";
import { CustomersFindAllRequestHandler } from "./customer-type";
import { CustomersFindRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const persistFindCustomers: CustomersFindRequestHandler = async (req, res, next) => {
    try {
        const { customerToPK } = res.locals;
        const users = await Customer.findByPk(customerToPK.uuid);
        if(users != null){
            res.locals.customerFind = users;
        }
        next();
    } catch(error) {
        next(error);
    }
}


const persistFindAllCustomers: CustomersFindAllRequestHandler = async (req, res, next) => {
    try {       
        const users:Customer[] = await Customer.findAll();
        res.locals.customerToFindAll = users;
        next();
    } catch(error) {
        next(error);
    }
}


export {
    persistCustomer,
    persistFindAllCustomers,
    persistFindCustomers
}