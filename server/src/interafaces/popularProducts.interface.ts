interface IPopularProductsParams {
    id?: number;
    turnoverId?: number;
    name?: string;
    quantity?: number;
    ranking?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface IPopularProductParams extends IPopularProductsParams {
    name: string;
    quantity: number;
    ranking: number;
}

export interface IPopularProductCreateParams extends IPopularProductsParams {
    turnoverId: number;
    name: string;
    quantity: number;
    ranking: number;
}

export interface IPopularProductDict {
    name: number;
    quantity: number;
}