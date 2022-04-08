import { 
    CustomerCreationRequestHandler, 
    GetCustomersAllRequestHandler, 
    GetCustomerByIdRequestHandler 
} from "./customer-type";

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
    const paginationParams = req.query;
    const pagination = {
        offset: 0,
        limit: 50,
    }
  
    pagination.offset = paginationParams.offset ? Number(paginationParams.offset): pagination.offset;
    pagination.limit = paginationParams.limit ? Number(paginationParams.limit) : pagination.limit;
  
    res.locals.pagination = pagination;
  
    next();
}

const getAllCustomersSerializer: GetCustomersAllRequestHandler = (req, res, next) => {
    const customers = res.locals.getCustomer;
    res.locals.customerToRespond = [];

    customers.map((customer) => {
        res.locals.customerToRespond.push({
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
        });
    });

    next();
}

const getCustomerByIdSerializer: GetCustomerByIdRequestHandler = (req, res, next) => {
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
        }
    }
    
    next();
}

export {
    createCustomerSerializer,
    paginationSerializer,
    getAllCustomersSerializer,
    getCustomerByIdSerializer
}