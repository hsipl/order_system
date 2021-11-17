import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 70, unique: true })
    tag: string;

    @Column({
        type: "tinyint",
        unsigned: true,
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