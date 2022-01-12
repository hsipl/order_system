import { Order } from "../entity/order";

interface IOrderProductParams {
    orderId?: Order;
    description?: string;
    name?: string;
    price?: number;
}

export interface IOrderProductCreateParams extends IOrderProductParams {
    // orderId: Order;
    description: string;
    name: string;
    price: number;
}