import { Router } from 'express';
import { createCustomer, findAllCustomers, findOneCustomer } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers',...findAllCustomers());
route.get('/v1/customers/:id', ...findOneCustomer())

export default route;