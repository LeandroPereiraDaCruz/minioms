import { Router } from 'express';
import { createCustomer, getCustomersAll } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...getCustomersAll());

export default route;