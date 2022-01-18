import { OrderProduct } from "../entity/orderProuct";
import { OrderProductRepository } from "../repository/orderProduct.repository";
import { IOrderProductParam } from "../interafaces/order.interface";
import { Order } from "../entity/order";
import { Product } from "../entity/product";
import { IOrderProductCreateParams } from "../interafaces/orderProduct.interafaces";
export class OrderProductService {
    constructor(private readonly repository: OrderProductRepository) { }

    public async getAll(): Promise<OrderProduct[]> {
        return await this.repository.getAll();
    }

    public async getById(id: number): Promise<OrderProduct[]> {
        return await this.repository.getById(id);
    }

    public async getRelation(orderId: Order): Promise<OrderProduct[]> {
        return await this.repository.getRelation(orderId);
    }

    public async create(params: IOrderProductCreateParams[]): Promise<OrderProduct[]> {
        const paramsData: OrderProduct[] = [];
        params.forEach(p => {
            const orderProduct = new OrderProduct();
            Object.assign(orderProduct, p);
            paramsData.push(orderProduct);
        })
        return await this.repository.create(paramsData);
        // return paramsData;
    }

    public async delete(id: number[]): Promise<Boolean> {
        return await this.repository.delete(id);
    }
}