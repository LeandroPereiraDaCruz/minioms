import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindByIdRequestHandler } from "./customer-type";

const createCustomerSerializer: CustomerCreationRequestHandler = (req, res, next) => {
    const { customerCreated } = res.locals;
    res.locals.customerToRespond = {
        uuid: customerCreated.uuid,
        name: customerCreated.name,
        contact: {
            email: customerCreated.email,
            phone: customerCreated.phone
        },
        document: {
            cpf: customerCreated.cpf,
            cnpj: customerCreated.cnpj
        },
        createdAt: customerCreated.createdAt.toISOString(),
        updatedAt: customerCreated.updatedAt.toISOString()
    }
    next();
}

const findAllCustomerSerializer: CustomerFindAllRequestHandler = (req, res, next) => {
    const { customersFound, limit } = res.locals;
    
    customersFound.forEach(customer => {
        res.locals.customerToRespond.push({
            uuid: customer.uuid,
            name: customer.name,
            contact: {
                email: customer.email,
                phone: customer.phone
            },
            document: {
                cpf: customer.cpf,
                cnpj: customer.cnpj
            },
            createdAt: customer.createdAt.toISOString(),
            updatedAt: customer.updatedAt.toISOString()
        })
    })

    res.locals.offset = customersFound.length;
    res.locals.limit = limit;
    next();
}

const findByIdCustomerSerializer: CustomerFindByIdRequestHandler = (req, res, next) => {
    const { customerFound } = res.locals;
    if( customerFound ){
        res.locals.customerToRespond = {
            uuid: customerFound.uuid,
            name: customerFound.name,
            contact: {
                email: customerFound.email,
                phone: customerFound.phone
            },
            document: {
                cpf: customerFound.cpf,
                cnpj: customerFound.cnpj
            },
            createdAt: customerFound.createdAt.toISOString(),
            updatedAt: customerFound.updatedAt.toISOString()
        }
    }
    
    next();
}

export {
    createCustomerSerializer,
    findAllCustomerSerializer,
    findByIdCustomerSerializer
}