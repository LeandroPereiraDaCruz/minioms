import { CustomerCreationRequestHandler, GetCustomersRequestHandler } from "./customer-type";

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

const paginationSerializer: GetCustomersRequestHandler = (req, res, next) => {
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

const getCustomersSerializer: GetCustomersRequestHandler = (req, res, next) => {
    const customers = res.locals.getCustomer;
    res.locals.customerToRespond = [];

    customers.map((customers) => {
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

export {
    createCustomerSerializer,
    paginationSerializer,
    getCustomersSerializer
}