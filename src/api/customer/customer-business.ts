import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, GetCustomerByUuidRequestHandler, GetCustomersRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const getCustomersBusiness: GetCustomersRequestHandler = async (req, res, next) => {
    try {
        const { offset, limit } = res.locals.paginationParamsSerializer;
        res.locals.getCustomer = await Customer.findAll({ offset, limit });
        next();
    } catch (error) {
        next(error);
    }
};

const getCustomerByUuidBusiness: GetCustomerByUuidRequestHandler = async (req, res, next) => {
    try {
        const { customerUuid: uuid } = req.params;
        res.locals.getCustomer = await Customer.findByPk(uuid);
        next();
    } catch (error) {
        next(error);
    }
};

export {
    persistCustomer,
    getCustomersBusiness,
    getCustomerByUuidBusiness
}