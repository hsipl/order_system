import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Handover extends BaseEntity{
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ type: "int" })
    sysmoney: number;

    @Column({ type: "int" })
    realcash: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
        comment: '0: Opening, 1: Closing',
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
