import { Router } from 'express';
import { createCustomer, getCustomer, getCustomerUuid } from './customer-controller';

const route = Router();

route.post('/v1/customers', ...createCustomer());
route.get('/v1/customers', ...getCustomer());
route.get('/v1/customers/:customerUuid', ...getCustomerUuid());

export default route;