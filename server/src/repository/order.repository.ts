import { UpdateResult, Not } from "typeorm";
import { Order } from "../entity/order";

const field: (keyof Order)[] = ["id", "storeId", "status", "pay"];

export class OrderRepository {
    async getAll(): Promise<Order[]> {
        return await Order.find({
            relations: ["orderProducts"],
            where: { status: 0 },
            select: field
        })
    }

    async getById(id: number): Promise<Order | undefined> {
        return await Order.findOne({
            relations: ["orderProducts"],
            where: { status: 0, id: id },
            select: field
        })
    }

    async getByStoreId(storeId: number): Promise<Order[]> {
        return await Order.find({
            relations: ["orderProducts"],
            where: { storeId: storeId, status: 0 },
            select: field
        })
    }

    async create(o: Order): Promise<Order> {
        return await Order.save(o);
    }
    async update(o: Order): Promise<Order> {
        return await Order.save(o);
    }
    async delete(o: Order): Promise<UpdateResult | undefined> {
        return await Order.update(o.id, o);
    }
}