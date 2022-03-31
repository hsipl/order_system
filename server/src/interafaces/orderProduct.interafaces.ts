import { Order } from "../entity/order";

interface IOrderProductParams {
    orderId?: number;
    description?: string;
    name?: string;
    price?: number;
    quantity?: number;
}

export interface IOrderProductCreateParams extends IOrderProductParams {
    orderId?: number;
    description: string;
    name: string;
    price: number;
    quantity: number;
}