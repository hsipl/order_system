import { Order } from "../entity/order";

interface IOrderProductParams {
    orderId?: number;
    description?: string;
    name?: string;
    price?: number;
}

export interface IOrderProductCreateParams extends IOrderProductParams {
    orderId?: number;
    description: string;
    name: string;
    price: number;
}