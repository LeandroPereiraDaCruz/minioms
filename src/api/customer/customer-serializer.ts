import { CustomerCreationRequestHandler } from "./customer-type";
import { CustomersFindAllRequestHandler } from "./customer-type";
import { CustomersFindRequestHandler } from "./customer-type";

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

const findCustomerSerializer: CustomersFindRequestHandler = (req, res, next) => {
    
    const { customerFind } = res.locals;
    if(customerFind != undefined){
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
    } else {
        res.locals.customerFindError = {
            statusCode: '404',
            message: 'Não Encontrado'
        }
    }
    next();
}

const findAllCustomerSerializer: CustomersFindAllRequestHandler = (req, res, next) => {
    const { customerToFindAll } = res.locals;
    if(res.locals.customerToFindAll.length == 0){
        res.locals.customerFindAllError = {
            statusCode: '404',
            message: 'Não Encontrado'
        }
    } else{
        res.locals.customerToRespond = res.locals.customerToFindAll
    }
    next();
}

export {
    createCustomerSerializer,
    findAllCustomerSerializer,
    findCustomerSerializer
}