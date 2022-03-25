import { Router } from 'express';
import { createCustomer, getCustomerById, getCustomersAll } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...getCustomersAll());
route.get('v1/customers/:id', ...getCustomerById());

export default route;