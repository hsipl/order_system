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
interface IOrderProductParam {
    orderId?: number;
    productId?: number;
    description?: string;
}
export interface IOrderProductCreateParam extends IOrderProductParam {
    productId: number;
}

export interface IOrderCreateParams extends IOrderParams {
    storeId: number;
    pay: number;
    status: number;
    products: IOrderProductParam[];
}

export interface IOrderDeleteParams extends IOrderParams {
    id: number
}