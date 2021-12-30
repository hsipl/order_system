import { UpdateResult, Not } from "typeorm";
import { Order } from "../entity/order";

const field: (keyof Order)[] = ["id", "storeId", "description", "status"];

export class OrderRepository {
    async getAll(): Promise<Order[]> {
        return await Order.find({
            relations: ["products"],
            where: { status: 0 },
            select: field
        })
    }

}