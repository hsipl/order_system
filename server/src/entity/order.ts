import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    BaseEntity,
    ManyToOne
} from "typeorm";
import { Store } from "./store";
<<<<<<< HEAD
=======

>>>>>>> 1c1c257406f06ca5749cb6617c70fe2e9feccd12
@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: "store_id" })
    storeId: number;

    @Column({ length: 128, unique: true })
    description: string;

    @Column({
        unsigned: true,
        type: "tinyint",
        comment: "0: Unpaid 1:Pay",
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