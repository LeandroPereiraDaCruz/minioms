import { Router } from 'express';
import { createCustomer, findAllCustomer, findByIdCustomer } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...findAllCustomer());
route.get('/v1/customers/{customerUuid}', ...findByIdCustomer());

export default route;