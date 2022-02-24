import { OrderProduct } from "../entity/orderProuct";
import { Product } from "../entity/product";
import { IOrderProductCreateParams } from "./orderProduct.interafaces";

interface IOrderParams {
    id?: number;
    storeId?: number;
    // orderProducts?: number[] | OrderProduct[];
    pay?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
interface orderProduct {
    id?: number;
    description?: string;
}
export interface IOrderProductParam {
    id?: number;
    price?: number;
    name?: string;
    productId?: number;
    description: string;
}

export interface IOrderRequestParams extends IOrderParams {
    status: number;
    storeId: number;
    pay: number;
    products: IOrderProductParam[];
}

export interface IOrderRespone extends IOrderParams {
    id: number;
    pay: number;
    status: number;
    orderProducts: OrderProduct[];
}

export interface IOrderCreateParams extends IOrderParams {
    storeId: number;
    pay: number;
    status: number;
}
export interface IOrderUpdateParams extends IOrderParams {
    id: number;
    storeId: number;
    pay: number;
    status: number;
}
export interface IOrderDeleteParams extends IOrderParams {
    id: number
}