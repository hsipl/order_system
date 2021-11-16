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
} from "typeorm";
import { Store } from "./store";
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
    money: number;

    @Column({ length: 128, unique: true })
    image: string;

    @Column({
        type: "tinyint",
        unsigned: true,
        comment: "0: Chicken, 1: Vegetable, 2: Processing, 3: Other",
        default: 0,
    })
    option: number;

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