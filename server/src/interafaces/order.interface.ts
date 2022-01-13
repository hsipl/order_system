import { OrderProduct } from "../entity/orderProuct";
import { Product } from "../entity/product";

interface IOrderParams {
    id?: number;
    storeId?: number;
    orderProducts?: number[] | OrderProduct[];
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
    productId: number;
    description: string;
}

export interface IOrderRequestParams extends IOrderParams {
    status: number;
    storeId: number;
    pay: number;
    products: IOrderProductParam[];
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