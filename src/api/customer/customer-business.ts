import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, ListAllCustomersRequestHandler, ListCustomerByIdRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const listBaseCustomerById: ListCustomerByIdRequestHandler = async (req, res, next) => {
    try {
        const { id: uuid } = req.params;
        res.locals.listCustomer = await Customer.findByPk(uuid);
        next();
    } catch (error) {
        next(error);
    }
 };

const listAllBaseCustomers: ListAllCustomersRequestHandler = async (req, res, next) => {
    try {
        const { offset, limit } = res.locals.paginationParamsSerializer;
        res.locals.listCustomer = await Customer.findAll({ offset, limit });
        next();
    } catch (error) {
        next(error);
    }
}

export {
    persistCustomer, listBaseCustomerById, listAllBaseCustomers
}