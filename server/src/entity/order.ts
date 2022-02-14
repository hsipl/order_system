import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    BaseEntity,
    ManyToOne,
    OneToMany
} from "typeorm";
import { OrderProduct } from "./orderProuct";
// import { Product } from "./product";
import { Store } from "./store";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: "store_id" })
    storeId: number;

    @Column({
        unsigned: true,
        type: "tinyint",
        comment: "0: Unpaid 1:Pay",
        default: 0,
    })
    pay: number;

    @Column({
        unsigned: true,
        type: "tinyint",
        comment: "0: Not Delete 1:Delete",
        default: 0,
    })
    status: number;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.orderId)
    orderProducts: OrderProduct[];

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;

}