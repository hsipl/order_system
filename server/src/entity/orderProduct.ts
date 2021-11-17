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
<<<<<<< HEAD
=======

>>>>>>> 1c1c257406f06ca5749cb6617c70fe2e9feccd12
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