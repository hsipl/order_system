import { Product } from "../entity/product";

interface IOrderParams {
    id?: number;
    storeId?: number;
    description?: string;
    products?: number[] | Product[];
    pay?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IOrderCreateParams extends IOrderParams{
    storeId: number;
    description: string;
    pay: number;
    status: number;
}

export interface IOrderDeleteParams extends IOrderParams {
    id: number
}