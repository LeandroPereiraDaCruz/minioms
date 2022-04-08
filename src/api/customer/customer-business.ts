import { NextFunction, Request, Response } from "express";
import { Customer } from "./customer-model";
import {
  CustomerCreationRequestHandler,
  CustomerFindOneRequestHandler,
  CustomerListAllRequestHandler,
} from "./customer-type";

const persistCustomer: CustomerCreationRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerToCreate } = res.locals;
    res.locals.customerCreated = await Customer.create(customerToCreate);
    next();
  } catch (error) {
    next(error);
  }
};

const findAllCustomers: CustomerListAllRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { offset = 0, limit = 50 } = req.query;
  try {
    res.locals.listOfAllCustomers = await Customer.findAll({
      offset: Number(offset),
      limit: Number(limit),
    });
    next();
  } catch (error) {
    next(error);
  }
};

const findCustomer: CustomerFindOneRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customerUuid } = req.params;
  try {
    res.locals.findCustomer = await Customer.findOne({
      where: { uuid: customerUuid },
    });
    next();
  } catch (error) {
    next(error);
  }
};

export { persistCustomer, findAllCustomers, findCustomer };
