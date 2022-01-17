import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    BaseEntity,
    PrimaryGeneratedColumn
} from "typeorm";
import { Order } from "./order";

@Entity('order_product')
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, nullable: true })
    description: string;

    // @ManyToOne(() => Order, order => order.orderProducts, {
    //     onUpdate: 'CASCADE'
    // })
    @Column({ name: 'order_id' })
    orderId: number;
    // orderId: Order;

    @Column({ length: 64 })
    name: string;

    @Column({ type: "int", default: 0, })
    price: number;
}