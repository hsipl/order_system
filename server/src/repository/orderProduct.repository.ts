import { UpdateResult, Not, In } from "typeorm";
import { Order } from "../entity/order";
import { OrderProduct } from "../entity/orderProuct";

const field: (keyof OrderProduct)[] = ["id", "name", "price", "description", "orderId"];

export class OrderProductRepository {
    async getAll(): Promise<OrderProduct[]> {
        return await OrderProduct.find({ select: field });
    }

    async getById(id: number): Promise<OrderProduct[]> {
        return await OrderProduct.find({
            where: {
                orderId: id
            },
            select: field
        });
    }
    async getByIds(ids: number[]): Promise<OrderProduct[]> {
        return await OrderProduct.find({
            where: {
                id: In(ids)
            },
            select: field
        });
    }

    async getRelation(orderId: Order): Promise<OrderProduct[]> {
        return await OrderProduct.find({
            where: {
                orderId
            }
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