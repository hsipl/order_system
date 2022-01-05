import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    BaseEntity,
    ManyToMany,
    OneToMany,
    JoinTable
} from "typeorm";
import { OrderProduct } from "./orderProuct";
import { Store } from "./store";
import { Tag } from "./tag";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: "store_id" })
    storeId: number;

    @Column({ length: 64 })
    name: string;

    @Column({ type: "int", default: 0, })
    price: number;

    @Column({ length: 128, nullable: true, })
    image: string;

    @Column({
        type: "tinyint",
        unsigned: true,
        comment: "0: Chicken, 1: Processing, 2: Vegetable, 3: Other",
        default: 0,
    })
    category: number;

    @ManyToMany(() => Tag)
    @JoinTable({
        name: "product_tag",
        joinColumn: {
            name: "prodcut_id",
            referencedColumnName: "id"
        }, inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        }
    })
    tags: Tag[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.prodcutId)
    orderProducts: OrderProduct[];

    @Column({
        type: "tinyint",
        unsigned: true,
        comment: "0: Sell, 1: Not for sale",
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