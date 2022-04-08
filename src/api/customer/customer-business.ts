import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindOneRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const getCustomerById: CustomerFindOneRequestHandler = async (req, res ,next) => {
    try {
        const uuid = req.params.id;
        res.locals.customerFind = await Customer.findByPk(uuid);
        next();
    } catch(error){
        next(error);
    }
}

const getAllCustomers: CustomerFindAllRequestHandler = async(req, res, next) => {
    try {
        const { offset, limit } = res.locals.paginationParamsSerializer;
        res.locals.customerFindAll = await Customer.findAll({ offset, limit });
        next();
    } catch(error) {
        next(error);
    }
};

export {
    persistCustomer,
    getCustomerById,
    getAllCustomers
}