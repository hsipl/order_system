interface IProductParams {
    id?: number;
    name?: string;
    money?: number;
    image?: string | null;
    option?: number;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IProductCreateParams extends IProductParams {
    name: string;
    money: number;
    image: string | null;
    option: number;
    status: number;
}

export interface IProductUpdateParams extends IProductParams {
    name: string;
    money: number;
    image: string | null;
    option: number;
    status: number;
}

export interface IProductDeleteParams extends IProductParams {
    id: number
}