import { GetCustomersAllRequestHandler } from "../api/customer/customer-type";

export type PaginationParams = {
    offset: string;
    limit: string;
};
  
export type PaginationParamsSerializer = {
    offset: number;
    limit: number;
};

