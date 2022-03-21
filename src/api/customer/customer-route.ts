import { Router } from 'express';
import { createCustomer, findAllCustomers } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...findAllCustomers()); ///v1/customers?offset=10&limit=1


export default route;