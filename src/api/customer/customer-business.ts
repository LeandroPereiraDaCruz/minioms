import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, CustomersFindAllRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const persistFindAllCustomers: CustomersFindAllRequestHandler = async (req, res, next) => {
    
    try {       
        const off = req.query.offset
        const lim = req.query.limit
        const users:Customer[] = await Customer.findAll({limit: parseInt(lim) || undefined, offset: parseInt(off) || undefined});
        res.locals.customerToFindAll = users;
        next();
    } catch(error) {
        next(error);
    }
}

export {
    persistCustomer,persistFindAllCustomers
}