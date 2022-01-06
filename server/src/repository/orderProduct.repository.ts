import { UpdateResult, Not, In } from "typeorm";
import { Order } from "../entity/order";
import { OrderProduct } from "../entity/orderProuct";

export class OrderProductRepository {
    async getById(id: number): Promise<OrderProduct[]> {
        return await OrderProduct.find({
            where: {
                orderId: id
            }
        });
    }

    async create(o: OrderProduct[]): Promise<OrderProduct[]> {
        return await OrderProduct.save(o);
    }
}