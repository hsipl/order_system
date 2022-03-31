import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    BaseEntity,
    PrimaryGeneratedColumn
} from "typeorm";
import { Order } from "./order";

/**
 * @swagger
 *   components:
 *     schemas:
 *       OrderProducts:
 *         type: object
 *         properties:
 *           id: 
 *             type: integer
 *             format: number
 *           description:
 *             type: string
 *             nullable: true
 *             length: 128
 *           orderId:
 *             $ref: '#/components/schemas/Order'
 *           name:
 *             type: string
 *           price:
 *             type: integr
 *             format: number
 */

@Entity('order_product')
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128, nullable: true })
    description: string;

    @ManyToOne(() => Order, { nullable: false, cascade: true })
    @JoinColumn({ name: 'order_id' })
    orderId: Order;

    @Column({ length: 64 })
    name: string;

    @Column({ type: "int", default: 0, })
    price: number;

    @Column({ type: "int", default: 0, })
    quantity: number;
}