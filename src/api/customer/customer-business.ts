import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, GetCustomersAllRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const getCustomerAllBusiness: GetCustomersAllRequestHandler = async (req, res, next) => {
    try {
        const { offset, limit } = res.locals.paginationParamsSerializer;
        res.locals.getCustomer = await Customer.findAll({ offset, limit });
        next();
    } catch (error) {
        next(error);
    }
};

export {
    persistCustomer, 
    getCustomerAllBusiness
}