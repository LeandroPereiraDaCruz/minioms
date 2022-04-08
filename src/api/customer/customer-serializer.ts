import { CustomerCreationRequestHandler, CustomerFindAllRequestHandler, CustomerFindOneRequestHandler } from "./customer-type";

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

const findCustomerSerializer: CustomerFindOneRequestHandler = (req, res, next) => {
    const { customerFind } = res.locals;
    if (customerFind !== null) {
        res.locals.customerToRespond = {
            uuid: customerFind.uuid,
            name: customerFind.name,
            contact: {
                email: customerFind.email,
                phone: customerFind.phone
            },
            document: {
                cpf: customerFind.cpf,
                cnpj: customerFind.cnpj
            },
            createdAt: customerFind.createdAt.toISOString(),
            updatedAt: customerFind.updatedAt.toISOString()
        }
    }
    next();
}

const findAllCustomersSerializer: CustomerFindAllRequestHandler = (req, res, next) => {

    const allCustomers = res.locals.customerFindAll;

    res.locals.customersToRespond = [];

    allCustomers.map((customer) => {
        if (customer !== null) {
            res.locals.customersToRespond.push(
                {
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
        }
    });
    next();
}

export {
    createCustomerSerializer,
    findCustomerSerializer,
    findAllCustomersSerializer
}