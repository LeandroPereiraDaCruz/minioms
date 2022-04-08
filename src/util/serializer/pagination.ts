import { CustomerFindAllRequestHandler } from "../../api/customer/customer-type";

const paginationSerializer: CustomerFindAllRequestHandler = (req, res, next) => {
  const queryParams = req.query;

  let offset = queryParams.offset ? Number(queryParams.offset) : 0;
  let limit = queryParams.limit ? Number(queryParams.limit) : 50;

  res.locals.paginationParamsSerializer = { offset: offset, limit}

  next();

};

export {
  paginationSerializer
}