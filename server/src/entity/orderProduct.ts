import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";
@Entity()
export class orderProduct {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;
    
    @OneToOne(() => Order)
    @JoinColumn({ name: "order_id" })
    orderId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    productId: number;

    @Column({
        unsigned: true,
        type: "tinyint",
        default: 0,
    })
    status: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;
}