import { CustomerCreationRequestHandler, GetCustomersAllRequestHandler, GetCustomerByIdRequestHandler } from "./customer-type";

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

const paginationSerializer: GetCustomersAllRequestHandler = (req, res, next) => {
    const PaginationParams = req.query;
    let offset = 0;
    let limit = 50;
  
    if (PaginationParams.offset) {
      offset = Number(PaginationParams.offset);
    }
  
    if (PaginationParams.limit) {
      limit = Number(PaginationParams.limit);
    }
  
    res.locals.paginationParamsSerializer = { offset, limit };
  
    next();
};

const getAllCustomersSerializer: GetCustomersAllRequestHandler = (req, res, next) => {
    const customersAll = res.locals.getCustomer;
    res.locals.customerToRespond = [];

    customersAll.map((customers) => {
        res.locals.customerToRespond.push({
            uuid: customers.uuid,
            name: customers.name,
            contact: {
                email: customers.email,
                phone: customers.phone,
            },
            document: {
                cpf: customers.cpf,
                cnpj: customers.cnpj,
            },
            createdAt: customers.createdAt.toISOString(),
            updatedAt: customers.updatedAt.toISOString(),
        });
    });

    next();
};

const getCustomerByidSerializer: GetCustomerByIdRequestHandler = (req, res, next) => {
    
    const customer = res.locals.getCustomer;

    if (customer) {
        res.locals.customerToRespond = {
            uuid: customer.uuid,
            name: customer.name,
            contact: {
              email: customer.email,
              phone: customer.phone,
            },
            document: {
              cpf: customer.cpf,
              cnpj: customer.cnpj,
            },
            createdAt: customer.createdAt.toISOString(),
            updatedAt: customer.updatedAt.toISOString(),
        };
    }
    
    next();
};

export {
    createCustomerSerializer, paginationSerializer, getAllCustomersSerializer, getCustomerByidSerializer
}