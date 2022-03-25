import { GetCustomersAllRequestHandler } from "../api/customer/customer-type";

export type PaginationParams = {
    offset: string;
    limit: string;
};
  
export type PaginationParamsSerializer = {
    offset: number;
    limit: number;
};

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