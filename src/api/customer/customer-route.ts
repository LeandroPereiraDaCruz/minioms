import { Router } from 'express';
import { createCustomer, listCustomerById, 
    listAllCustomers} from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());

route.get('/v1/customers', ...listAllCustomers());

route.get('/v1/customers/:id', ...listCustomerById());

export default route;