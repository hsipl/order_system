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

    async getRelation(order: Order): Promise<OrderProduct[]> {
        return await OrderProduct.find({
            orderId: order
        });
    }

    async create(o: OrderProduct[]): Promise<OrderProduct[]> {
        return await OrderProduct.save(o);
    }

    async delete(id: number[]): Promise<Boolean> {
        const deleteRes = await OrderProduct.delete(id);
        return deleteRes ? true : false;

    }
}