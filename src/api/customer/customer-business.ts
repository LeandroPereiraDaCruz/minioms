import { Customer } from "./customer-model";
import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindByIdRequestHandler } from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (req, res, next) => {
    try {
        const { customerToCreate } = res.locals;
        res.locals.customerCreated = await Customer.create(customerToCreate);
        next();
    } catch(error) {
        next(error);
    }
}

const findAllCustomer: CustomerFindAllRequestHandler = async (req, res, next) => {
    try {
        let{ offset, limit } =  res.locals;

        if(!offset) offset = 0;
        if(!limit) limit = 50;

        res.locals.customersFound = await Customer.findAll({ offset, limit });
        res.locals.offset = offset;
        res.locals.limit = limit;
        next();
    } catch(error) {
        next(error);
    }
}

const findByIdCustomer: CustomerFindByIdRequestHandler = async (req, res, next) => {
    try {
        const { customerUuid  } = res.locals;
        await Customer.findByPk(customerUuid).then(( result ) => {
            if(result?.uuid){
                res.locals.customerFound = result
            }            
        });
        next();
    } catch(error) {
        next(error);
    }
}

export {
    persistCustomer,
    findAllCustomer,
    findByIdCustomer
}