import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Product } from "./product";
import { Tag } from "./tag";

@Entity()
export class ProductTag {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    productId: number;

    @ManyToOne(() => Tag)
    @JoinColumn({ name: "tag_id" })
    tagtId: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;
}