import { Tag } from "../entity/tag";
import { ITagFieldParams } from "./tag";
interface IProductParams {
    id?: number;
    name?: string;
    price?: number;
    image?: string | null;
    storeId?: number;
    option?: number;
    status?: number;
    tags?: number[] | Tag[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IProductCreateParams extends IProductParams {
    name: string;
    price: number;
    image: string | null;
    storeId: number;
    category: number;
    status: number;
}

export interface IProudctUpdate extends IProductParams {
    id: number;
    name: string;
    price: number;
    image: string | null;
    storeId: number;
    option: number;
    status: number;
    tags: Tag[];
}


export interface IProductUpdateParams extends IProductParams {
    id: number;
    name: string;
    money: number;
    image: string | null;
    storeId: number;
    category: number;
    status: number;
}



export interface IProductDeleteParams extends IProductParams {
    id: number
}