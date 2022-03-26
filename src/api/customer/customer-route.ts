import { Router } from 'express';
import { createCustomer, getCustomer } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...getCustomer());

export default route;