import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64})
    name: string;

    @Column({type: "tinyint", unsigned: true, comment: "0: Branch Store, 1: Head Store", default: 0})
    type: number;

    @Column({type: "tinyint", unsigned: true, comment: "0: Opening, 1: Closing", default: 0})
    status: number;

    @CreateDateColumn({name: "createdAt"})
    createdAt: Date;

    @UpdateDateColumn({name: "updatedAt"})
    updatedAt: Date;

    @DeleteDateColumn({name: "deletedAt"})
    deletedAt: Date;
}

