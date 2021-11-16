import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./user";
@Entity()
export class Handover {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ type: "int" })
    sysmoney: number;

    @Column({ type: "int" })
    realcash: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;
}