import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity('order_product')
export class OrderProduct {
    @Column({ length: 128, nullable: true })
    description: string;

    @ManyToOne(() => Order, order => order.orderProducts, { primary: true })
    @JoinColumn({ name: 'order_id' })
    orderId: Order;

    @ManyToOne(() => Product, product => product.orderProducts, { primary: true })
    @JoinColumn({ name: 'prodcut_id' })
    prodcutId: Product;
}