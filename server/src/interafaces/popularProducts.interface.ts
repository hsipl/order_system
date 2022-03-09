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

export interface IPopularProductParams extends IPopularProductsParams{
    turnoverId: number;
    name: string;
    quantity: number;
    ranking: number;
}