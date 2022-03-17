interface ITurnoverParams {
    id?: number;
    amount?: number;
    storeId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface ITurnoverCreateParams extends ITurnoverParams {
    amount: number;
    storeId: number;
}
