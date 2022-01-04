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
    ManyToMany,
    JoinTable,
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

    // @Column({ length: 128 })
    // description: string;


    // @ManyToMany(() => Product)
    // @JoinTable({
    //     name: "order_product",
    //     joinColumn: {
    //         name: "order_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "product_id",
    //         referencedColumnName: "id"
    //     }

    // })
    @OneToMany(() => OrderProduct, orderProduct => orderProduct.prodcutId)
    orderProducts: OrderProduct[];

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

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;

}