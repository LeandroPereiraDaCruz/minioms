import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { createCustomer } from './customer-controller';
import { findAllCustomers } from './customer-controller';
import { findCustomers } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers/:uuid', ...findCustomers());
route.get('/v1/customers', ...findAllCustomers());


export default route;